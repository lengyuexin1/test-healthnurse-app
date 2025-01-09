// IM 能力，包括单聊、群聊、通讯录等
import type { Session } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/SessionServiceInterface'
import type { GetHistoryMsgsOptions } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgLogServiceInterface'
import type { Team } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/TeamServiceInterface'
import type { UpdateMyInfoOptions, UserNameCard } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/UserServiceInterface'
import { type IIMUser, type TMessageSession, type TSessionInfo, type TSessionScene, type TP2PScene, type TTeamExtInfo, type TTeamScene, TEAM_SCENES, P2P_SCENE } from '../bean'
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import { IMSDK } from './nim-sdk'
import { imProvider } from '@bc/sys'
import { ObjectTool } from '@bc/base'
import { reactive, ref } from 'vue'

//====================================================
// 常量
//====================================================
const debug = true

/** 头像 */
const avatarMap = {} as Record<string, IIMUser>

//====================================================
// 方法
//====================================================

// 解析群场景
const parseTeamScene = (type: number): TTeamScene => {
    if ([1, 2].includes(type)) {
        //客服群
        return "customer"
    }
    else if ([3, 4, 5].includes(type)) {
        //私信群
        return "privateMsg"
    }
    else if ([6].includes(type)) {
        //兴趣群
        return "friendsGroup"
    }
    else if ([7].includes(type)) {
        //商家群
        /** TODO 待后端枚举确定后进行更新 */
        return "merchantGroup"
    }
    return "customer"
}

/** 解析群信息 */
const parseTeamInfo = (team :Team) => {
    const info = { name: '消息 - 异常会话' } as TTeamExtInfo

    if (team && team.serverExt) {
        try {
            const serverExt = JSON.parse(team.serverExt)
            
            //缓存头像
            avatarMap[team.owner] = { avatar: team.avatar, nickName: team.name }
            // 最新的群名称和头像是由后端统一更新到网易云信的
            info.subjectName = serverExt.name
            info.subjectAvatar = serverExt.thumb
            info.subjectType = serverExt.type

            info.teamScene = parseTeamScene(serverExt.type)

            info.owner = team.owner
            info.name = team.name
            info.avatar = team.avatar
            info.flag = serverExt.flag
            info.tag = serverExt.tag
            info.id = serverExt?.id ?? ''
        }
        catch (err) {
            console.error('消息 - 格式化群信息异常: ', err, team.serverExt)
        }
    }
    else {
        console.error('消息 - 群异常: ', team)
    }

    return info
}

/** 过滤群会话 */
const filterTeamSessions = async (sessions: Session[], scene: TTeamScene[]) => {
    if (sessions.length === 0 || scene.length === 0) {
        return Promise.resolve([])
    }
    return imProvider.getToken().then((user) => {
        const accountId = user.accid
        const filter1 = sessions.filter((session) => {
            return session.scene === 'team'
        })

        if (filter1.length === 0) {
            return Promise.resolve([])
        }

        const teamIds = filter1.map(item => item.to)
        // 获取群信息进一步区分场景
        return SessionSDK.getTeamsByIds(teamIds).then((teamMap) => {
            //二次过滤
            const finalSessions = [] as TMessageSession[]
            filter1.forEach((session) => {
                const teamExt = teamMap[session.to] || {} as TTeamExtInfo
                // 场景匹配
                if (scene.includes(teamExt.teamScene)) {
                    const info = { name: teamExt.name, avatar: teamExt.avatar } as TSessionInfo
                    //判断当前账号在群里属于: 顾客还是接待
                    if (accountId === teamExt.owner) {
                        info.name = teamExt.subjectName
                        info.avatar = teamExt.subjectAvatar
                    }
                    // 统一的会话信息
                    const teamSession = { session, info, teamExt, scene: teamExt.teamScene } as TMessageSession
                    finalSessions.push(teamSession)
                }
            })
            return Promise.resolve(finalSessions)
        })
    })
}


// 解析单聊场景
export const parseP2pScene = (accountId: string): TP2PScene => {
    if (accountId.includes("cmd_")) {
        //设备指令
        /** TODO 待后端枚举确定后进行更新 */
        return "deviceCmd"
    }
    else {
        const isEnvAccount = ObjectTool.handleEnvAccount(accountId)
        const numberId = parseInt(isEnvAccount)
        if (numberId === 80) {
            //事件
            /** TODO 待后端枚举确定后进行更新 */
            return "event"
        }
        else if (numberId < 10000) {
            //消息通知
            return "notice"
        }
        else {
            //单聊交友
            return "p2p"
        }
    }
}

/** 过滤单聊会话 */
const filterP2pSessions = async (sessions: Session[], scene: TP2PScene[]) => {
    if (sessions.length === 0 || scene.length === 0) {
        return Promise.resolve([])
    }
    const filter1 = sessions.filter((session) => {
        if (session.scene !== 'p2p') {
            return false
        }
        const p2pScene = parseP2pScene(session.to)
        return scene.includes(p2pScene)
    })

    if (filter1.length === 0) {
        return Promise.resolve([])
    }

    const accountIds = filter1.map(item => item.to)
    return SessionSDK.getUserByIds(accountIds).then((userMap) => {
        //二次过滤
        const finalSessions = [] as TMessageSession[]
        filter1.forEach((session) => {
            const p2pScene = parseP2pScene(session.to)
            const userCard = userMap[session.to] || {} as UserNameCard
            const info = { name: userCard.nick, avatar: userCard.avatar } as TSessionInfo
            // 统一会话实体
            const p2pSession = { session, info, scene: p2pScene } as TMessageSession
            finalSessions.push(p2pSession)
        })
        return Promise.resolve(finalSessions)
    })
}


//====================================================
// 核心SDK
//====================================================

/** 会话SDK */
export class SessionSDK extends IMSDK {

    /** 获取云端历史记录 */
    static async getHistoryMsg(options: GetHistoryMsgsOptions) {
        return this.msgLogInsurance().then((msgLog) => {
            return msgLog.getHistoryMsgs(options).then((msgs) => {
                debug && console.warn(`(${options.to})的历史记录: `, msgs)
                return Promise.resolve(msgs)
            })
        })
    }

    /** 获取消息已读回执状态 */
    static async getMsgReceipt(msg: IMMessage): Promise<TReceiptStatus> {
        if (msg.teamSpecializationInfo?.needACK === true) {
            return this.msgInsurance().then((msgInsurance) => {
                const teamMsgReceipt = { idClient: msg.idClient, idServer: msg.idServer, teamId: msg.to } as any
                return msgInsurance.getTeamMsgReadAccounts({ teamMsgReceipt }).then((res) => {
                    // 有数据可以当做已读, 已读和未读清单目前暂无需求!
                    return Promise.resolve(res.readAccounts.length > 0 ? 1 : 0)
                })
            })
        }
        return Promise.resolve(9)
    }

    /** 根据会话获取群信息 */
    static async getP2pSession(session: Session) {
        return this.getUserById(session.to).then((userCard) => {
            const p2pScene = parseP2pScene(session.to)
            const info = { name: userCard.nick, avatar: userCard.avatar } as TSessionInfo
            // 统一会话实体
            const p2pSession = { session, info, scene: p2pScene } as TMessageSession
            return Promise.resolve(p2pSession)
        })
    }

    /** 更新用户资料 */
    static async updateUserInfo(nameCard: UpdateMyInfoOptions) {
        return this.userInsurance().then((user) => {
            return user.updateMyNameCard(nameCard)
        })
    }

    /** 获取账号信息 */
    static async getUserById(accountId: string) {
        return this.userInsurance().then((user) => {
            return user.getUsersNameCardFromServer({ accounts: [accountId] }).then((infos) => {
                if (infos.length === 0) {
                    return Promise.reject(new Error('暂无用户'))
                }
                return Promise.resolve(infos[0])
            })
        })
    }

    /** 批量获取账号信息 */
    static async getUserByIds(accountIds: string[]) {
        return this.userInsurance().then((user) => {
            // 接口限量, 这里进行拆包
            const result = ObjectTool.splitArray<string>(accountIds, 100)
            const promises = result.map((resAccountIds) => {
                return user.getUsersNameCardFromServer({ accounts: resAccountIds })
            })
            return Promise.all(promises).then((res) => {
                const userMap = {} as Record<string, UserNameCard>
                res.flatMap(result => result).forEach((userCard) => {
                    userMap[userCard.account] = userCard
                    //缓存头像
                    avatarMap[userCard.account] = { avatar: userCard.avatar as any, nickName: userCard.nick as any }
                })
                return Promise.resolve(userMap)
            })
        })
    }

    /** 根据会话获取群信息 */
    static async getTeamSession(session: Session) {
        return this.getTeamById(session.to).then((teamExt) => {
            return imProvider.getToken().then((user) => {
                const accountId = user.accid
                const info = { name: teamExt.name, avatar: teamExt.avatar } as TSessionInfo
                //判断当前账号在群里属于: 顾客还是接待
                if (accountId === teamExt.owner) {
                    info.name = teamExt.subjectName
                    info.avatar = teamExt.subjectAvatar
                }
                const teamSession = { session, info, teamExt, scene: teamExt.teamScene } as TMessageSession
                return Promise.resolve(teamSession)
            })
        })
    }

    /** 获取群成员 */
    static async getTeamMemberById(teamId: string) {
        return this.teamInsurance().then((teamInsurance) => {
            return teamInsurance.getTeamMembers({ teamId }).then((team) => {
                if (team === undefined) {
                    return Promise.reject(new Error('群不存在'))
                }
                return Promise.resolve(team)
            })
        })
    }

    /** 获取群信息 */
    static async getTeamById(teamId: string) {
        return this.teamInsurance().then((teamInsurance) => {
            return teamInsurance.getTeamInfo({ teamId }).then((team) => {
                if (team === undefined) {
                    return Promise.reject(new Error('群不存在'))
                }
                return Promise.resolve(parseTeamInfo(team))
            })
        })
    }

    /** 批量获取群信息 */
    static async getTeamsByIds(teamIds: string[]) {
        return this.teamInsurance().then((team) => {
            // 接口限量, 这里进行拆包
            // TODO 这里不清楚为什么拆包, 可能云信文档更新了，解除了这个限制！后续调研后如果实际无限量则可以移除该逻辑
            const result = ObjectTool.splitArray<string>(teamIds, 10)
            const promises = result.map((resTeamIds) => {
                return team.getTeamsById({ teamIds: resTeamIds })
            })
            return Promise.all(promises).then((res) => {
                const teamMap = {} as Record<string, TTeamExtInfo>
                // flatmap数组合并
                res.flatMap(result => result.teams).forEach((team) => {
                    teamMap[team.teamId] = parseTeamInfo(team)
                })
                return Promise.resolve(teamMap)
            })
        })
    }

    /** 获取所有会话列表 */
    static async getAllSessions() {
        return this.sessionInsurance().then((session) => {
            const sessions = session.getAllSessions() || []
            return Promise.resolve(sessions)
        })
    }

    /** 获取指定场景的会话列表 */
    static async getSessionByScene(scene: TSessionScene[]) {
        // 场景拆分
        const teamScenes = ObjectTool.intersection(TEAM_SCENES, scene)
        const p2pScenes = ObjectTool.intersection(P2P_SCENE, scene)
        return this.getAllSessions().then((sessions) => {
            const teamPromise = filterTeamSessions(sessions, teamScenes)
            const p2pPromise = filterP2pSessions(sessions, p2pScenes)
            return Promise.all([teamPromise, p2pPromise]).then((arr) => {
                return Promise.resolve(arr.flatMap(item => item))
            })
        })
    }

    /** 删除会话 */
    static async delSession(sessionId: string) {
        return this.sessionInsurance().then((sessionInsurance) => {
            return sessionInsurance.deleteSession({ id: sessionId, isSyncToServer: true })
        })
    }

    /** 获取会话详情 */
    static async getSessionById(sessionId: string) {
        console.log('sessionId:' + sessionId)
        return this.sessionInsurance().then((session) => {
            return Promise.resolve(session.getSession({ id: sessionId })).then((session) => {
                if (session === undefined) {
                    return Promise.reject(new Error(`${sessionId} - 会话不存在`))
                }
                return Promise.resolve(session as any)
            })
        })
    }

    /** 获取会话详情(统一标准结构) */
    static async getMessgesSessionById(sessionId: string) {
        return this.getSessionById(sessionId).then((session) => {
            if (sessionId.includes('p2p')) {
                return this.getP2pSession(session)
            }
            return this.getTeamSession(session)
        })
    }

    /** 统计指定会话的未读数 */
    static async countSessionUnread(sessionIds: string[]) {
        let total = 0
        return this.getAllSessions().then((sessions) => {
            sessions.forEach(session => {
                if (sessionIds.includes(session.id)) {
                    total += session.unread
                }
            })
            return Promise.resolve(total)
        })
    }

    /** 清空指定会话未读数 */
    static async resetSessionUnread(sessionId: string) {
        return this.sessionInsurance().then((session) => {
            return session.resetSessionUnreadCount({ id: sessionId })
        })
    }

    /** 清空所有会话未读数 */
    static async resetAllSessionUnread() {
        return this.sessionInsurance().then((session) => {
            return session.resetAllSessionsUnreadCount()
        })
    }

}

/** 用户信息提供者 */
export const userInfoProvider = (to: string) => {
    const imUser = ref<IIMUser>({} as any)
    if (avatarMap[to]) {
        imUser.value = avatarMap[to]
    }

    SessionSDK.getUserById(to).then((info) => {
        // 最新的账号昵称和头像是由前端更新到网易云信的
        avatarMap[to] = { avatar: info.avatar as any, nickName: info.nick as any }
        imUser.value = avatarMap[to]
    })
    return imUser
}

/** 会话信息提供者 */
export const sessionProvider = (sessionId: string) => {
    const session = ref<Session>()
    const info = ref<TSessionInfo>()
    const teamExt = ref<TTeamExtInfo>()
    const scene = ref<TSessionScene>()

    SessionSDK.getMessgesSessionById(sessionId).then((msgSession) => {
        session.value = msgSession.session
        info.value = msgSession.info
        teamExt.value = msgSession.teamExt
        scene.value = msgSession.scene
    })

    return { session, info, teamExt, scene }
}

interface IMsgReceipt {
    status: TReceiptStatus
}

/** 消息已读回执事件 */
export const useMsgReceiptEvent = (msg: IMMessage) => {
    const data = reactive<IMsgReceipt>({ status: 9 })
    if (msg.idServer) {
        //发送成功后才有
        SessionSDK.getMsgReceipt(msg).then((res) => {
            data.status = res
        })
    }
    else {
        SessionSDK.onMsg("IM__OnTeamMsgReceipts", (res) => {
            const msgReceipt = res.find(item => item.idClient === msg.idClient)
            if (msgReceipt) {
                debug && console.warn('群场景 - 收到消息回执: ', msgReceipt)
                // 有数据可以当做已读, 已读和未读清单目前暂无需求!
                data.status = 1
            }
        })
    }

    return data
}
