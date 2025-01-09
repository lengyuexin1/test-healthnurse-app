import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { Session } from "nim-web-sdk-ng/dist/NIM_BROWSER_SDK/SessionServiceInterface"
import type { TMessageSession, TSessionScene } from "./bean"
import { reactive } from "vue"
import { serviceEmitter } from "./events"
import { SessionSDK, parseP2pScene } from './sdk/session-sdk'

//====================================================
// 接口定义
//====================================================
export interface IData {
    /** 未读消息数 */
    unread: number
    sessions: TMessageSession[]
    /** 单聊+群聊场景会话ids, 冗余字段 */
    sessionIds: string[]
}

//====================================================
// 常量
//====================================================
const debug = true


//====================================================
// 核心类
//====================================================

export class SessionListService {

    data: IData
    protected scenes: TSessionScene[]
    private TAG: string

    constructor(scenes: TSessionScene[]) {
        this.data = reactive<IData>({ unread: 0, sessions: [], sessionIds: [] })
        this.scenes = scenes
        this.TAG = 'SessionList'
        this.initEvent()
    }

    private clear() {
        //清除数据
        this.data.unread = 0
        this.data.sessionIds = []
        this.data.sessions = []
    }

    private initSession() {
        this.clear()
        //初始化
        SessionSDK.getSessionByScene(this.scenes).then((sessions) => {
            // 根据最后一条消息时间排序
            sessions.sort((a: any, b: any) => b.session?.lastMsg?.time - a.session?.lastMsg?.time)
            
            this.data.sessions = sessions
            sessions.forEach(session => {
                this.data.sessionIds.push(session.session.id)
                this.data.unread += session.session.unread
            })
            debug && console.warn(`${this.TAG} - 初始化成功, 初始化未读数 `)
        }).catch((err) => {
            console.error(`${this.TAG} - 初始化异常:`, err)
            return Promise.reject(err)
        })
    }

    /** 已存在会话 */
    private isExistSession(sessionId: string) {
        return this.data.sessionIds.includes(sessionId)
    }

    /** 是否关闭会话 */
    private isCloseTeamChat(session: Session) {
        if (session.lastMsg?.type === 'notification') {
            return ['removeTeamMembers', 'leaveTeam', 'dismissTeam'].includes(session.lastMsg?.attach?.type)
        }
        return false
    }


    //======================================================================
    /** 是否新加入的群会话 */
    private isJoinTeamChat(session: Session) {
        if (session.lastMsg?.type === 'notification') {
            return ['addTeamMembers', 'updateTeam'].includes(session.lastMsg?.attach?.type)
        }
        return false
    }
    /** 是否新加入的单聊会话 */
    private isJoinP2pChat(session: Session) {
        // 不存在的会话则为新会话
        if (!this.isExistSession(session.id)) {
            // 再判断场景   // 单聊在这里「 isJoinP2pChat 」过滤场景,群聊在『 addTeamSession 』过滤场景
            const scene = parseP2pScene(session.to)
            return this.scenes.includes(scene)
        }
        return false
    }
    /** 是否新加入会话 */
    private isJoinChat(session: Session) {
        if (session.scene === 'team') {
            return this.isJoinTeamChat(session)
        }
        else if (session.scene === 'superTeam') {
            return this.isJoinTeamChat(session)
        }
        else {
            return this.isJoinP2pChat(session)
        }
    }
    //======================================================================


    //======================================================================
    /** 添加单聊会话 */
    private addP2pSession(session: Session) {
        if (this.isExistSession(session.id)) {
            debug && console.error(`${this.TAG} - 会话更新 - 新接入会话已存在, 异常: `, session, this.data.sessionIds)
            return
        }

        this.data.sessionIds.push(session.id)
        return SessionSDK.getP2pSession(session).then((p2pSession) => {
            debug && console.warn(`${this.TAG} - 会话更新 - 新接入会话: `, p2pSession)
            this.data.unread += session.unread
            this.data.sessions.unshift(p2pSession)
            this.onNewChat(p2pSession)
        })
    }
    /** 添加群聊会话 */
    private addTeamSession(session: Session) {
        if (this.isExistSession(session.id)) {
            debug && console.error(`${this.TAG} - 会话更新 - 新接入会话已存在, 异常: `, session, this.data.sessionIds)
            return
        }

        return SessionSDK.getTeamSession(session).then((teamSession) => {
            // 群聊在这里『 addTeamSession 』过滤场景，单聊在「 isJoinP2pChat 」过滤场景
            // if (this.scenes.includes(teamSession.scene)) {
            //     return
            // }

            this.data.sessionIds.push(session.id)
            debug && console.warn(`${this.TAG} - 会话更新 - 新接入会话: `, teamSession)
            this.data.unread += session.unread
            this.data.sessions.unshift(teamSession)
            this.onNewChat(teamSession)
        })
    }
    /** 添加会话 */
    private addSession(session: Session) {
        if (session.scene === 'team') {
            return this.addTeamSession(session)
        }
        else if (session.scene === 'superTeam') {
            return this.addTeamSession(session)
        }
        else {
            return this.addP2pSession(session)
        }
    }
    //======================================================================


    /** 更新会话信息 */
    private updateSession = (session: Session) => {
        const targetIndex = this.data.sessions.findIndex(item => item.session.id === session.id)
        if (targetIndex >= 0) {
            const target = this.data.sessions[targetIndex]
            const teamOrP2pSession = { session, info: target.info, teamExt: target.teamExt, scene: target.scene } as TMessageSession
            this.data.sessions.splice(targetIndex, 1)
            // 把新的消息会话置顶
            this.data.sessions.unshift(teamOrP2pSession)
            debug && console.warn(`${this.TAG} - 会话更新: `, targetIndex, teamOrP2pSession)
        }
        else {
            console.error(`${this.TAG} - 会话更新 - 会话不存在, 异常: `, targetIndex, session)
        }
    }

    /** 移除会话 */
    private removeTeamSession(session: Session) {
        // 移除id
        const idIndex = this.data.sessionIds.indexOf(session.id)
        idIndex >= 0 && this.data.sessionIds.splice(idIndex, 1)
        //移除会话
        const sessionIndex = this.data.sessions.findIndex(item => item.session.id === session.id)
        sessionIndex >= 0 && this.data.sessions.splice(sessionIndex, 1)
        debug && console.warn(`${this.TAG} - 会话更新 - 关闭会话: `, session)
    }

    /** 更新未读消息数 */
    private updateUnread() {
        SessionSDK.countSessionUnread(this.data.sessionIds).then((unread) => {
            this.data.unread = unread
            serviceEmitter.emit('MSG__UpdateUnRead')
        })
    }

    private initEvent() {
        // 监听事件, 进行初始化
        SessionSDK.onMsg("IM__SyncDone", () => {
            this.initSession()
        }, false)

        // 监听事件, 进行注销
        SessionSDK.onMsg("IM__LogoutDone", () => {
            debug && console.warn(`${this.TAG} - 注销成功, 清除数据`)
            //清除数据
            this.clear()
        }, false)

        // 监听事件, 处理单聊消息
        SessionSDK.onMsg("IM__OnMsg", (message) => {
            if (this.isExistSession(message.sessionId)) {
                debug && console.warn(`${this.TAG} - 收到新消息: `, message)
                // 更新会话未读数
                this.updateUnread()
                this.onReceiveMessage(message)
            }
        }, false)
        // 监听事件, 处理群消息
        SessionSDK.onMsg("IM__OnTeamMsg", (message) => {
            if (this.isExistSession(message.sessionId)) {
                debug && console.warn(`${this.TAG} - 收到新消息: `, message)
                // 更新会话未读数
                this.updateUnread()
                this.onReceiveMessage(message)
            }
        }, false)

        // 监听事件, 处理单聊会话更新
        SessionSDK.onMsg("IM__UpdateSession", (session) => {
            if (this.isJoinChat(session)) {
                this.addSession(session)
            }
            else if (session.lastMsg?.status === 'sending') {
                // 发送中的会话更新，无需处理
                debug && console.warn(`${this.TAG} - 会话更新 - 消息发送中: `, session)
            }
            else {
                debug && console.warn(`${this.TAG} - 会话更新: `, session)
                // 更新会话未读数
                this.updateUnread()
                // 对话中
                this.updateSession(session)
            }
        }, false)

        // 监听事件, 处理群会话更新
        SessionSDK.onMsg("IM__UpdateTeamSession", (session) => {
            if (this.isJoinChat(session)) {
                this.addSession(session)
            }
            else if (this.isExistSession(session.id)) {
                if (this.isCloseTeamChat(session)) {
                    this.removeTeamSession(session)
                }
                else if (session.lastMsg?.status === 'sending') {
                    // 发送中的会话更新，无需处理
                    debug && console.warn(`${this.TAG} - 会话更新 - 消息发送中: `, session)
                }
                else {
                    debug && console.warn(`${this.TAG} - 会话更新 - 未读数: `, session)
                    // 更新会话未读数
                    this.updateUnread()
                    if (session.lastMsg?.type !== `notification`) {
                        // 对话中
                        this.updateSession(session)
                    }
                }
            }
        }, false)
    }

    /** 收到新消息 */
    protected onReceiveMessage(message: IMMessage) {

    }

    /** 收到新会话 */
    protected onNewChat(session: TMessageSession) {

    }


}

export const SessionList = new SessionListService(['customer', 'friendsGroup', 'privateMsg', 'p2p'])

/** 会话列表 */
export const useSessionsList = () => {
    return SessionList.data
}

