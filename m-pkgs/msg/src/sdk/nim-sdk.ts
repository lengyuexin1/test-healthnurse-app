// IM 能力，包括单聊、群聊、通讯录等
// @ts-ignore
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_UNIAPP_SDK'
import type NIM from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK'
import type { NIMInitializeOptions } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/NIMInterface'
// IM 能力，包括单聊、群聊、通讯录等
import { DataProvider, PromiseProvider } from '@bc/base'
import { imProvider } from '@bc/sys'
import { onUnmounted } from 'vue'
import { Events, serviceEmitter } from '../events'


//====================================================
// 接口定义
//====================================================

interface ICallback<T> {
    // eslint-disable-next-line no-unused-vars
    (data: T): void
}

//====================================================
// 常量
//====================================================
const debug = true

// nim事件
const eventList: string[] = [
    'logined',
    'multiPortLogin',
    'kicked',
    'willReconnect',
    'disconnect',
    'msg',
    'syncdone',
    'proxyMsg', 'syncRoamingMsgs', 'syncOfflineMsgs',
    'syncMyNameCard', 'sessions', 'updateMyNameCard', 'updateBlackList', 'updateMuteList',
    'sysMsg', 'syncSysMsgs', 'syncFriend', 'friends', 'users', 'updateSystemMessages', 'sysMsgUnread', 'pushEvents',
    'msgReceipts', 'teamMsgReceipts', 'updateSession',
    'teams', 'myTeamMembers',
    'createTeam',
    'updateTeamMember', 'onTeamMsgReceipt',
    'updateTeam', 'addTeamMembers', 'updateTeamManagers', 'transferTeam', 'removeTeamMembers', 'dismissTeam', 'updateTeamMembersMute'
]

//====================================================
// 初始化
//====================================================


// 维护sdk对象
const instanceProvider = new PromiseProvider<NIM>()
instanceProvider.setCallback(() => {
    return imProvider.getToken().then((res) => {

        // 参数校验
        if (!import.meta.env.VITE_IM_APP_KEY) {
            throw new Error('注意: VITE_IM_APP_KEY 需要在env文件内配置')
        }
        const IM_APP_KEY = import.meta.env.VITE_IM_APP_KEY

        const conf = { appkey: IM_APP_KEY } as NIMInitializeOptions
        debug && console.warn('IM getToken: ', res)
        conf.account = res.accid
        conf.token = res.token
        conf.lbsUrls = [ "https://lbs.netease.im/lbs/wxwebconf.jsp" ]
        conf.linkUrl = "wlnimsc0.netease.im"
        if (debug) {
            //conf.debugLevel = "debug"
        }
        const instance = NIMSDK.getInstance(conf)
        return Promise.resolve(instance)
    })
})

// 维护sdk对象的连接状态
const connectProvider = new PromiseProvider<NIM>()
connectProvider.setCallback(() => {
    return instanceProvider.getData().then((instance) => {
        if (['connecting', 'connected', 'logined'].includes(instance.status)) {
            debug && console.warn('IM不能重复连接: ', instance.status)
            initEvent(instance)
            return Promise.resolve(instance)
        }
        else {
            initEvent(instance)
            return instance.connect().then(() => {
                debug && console.warn('IM连接成功: ', instance.status)
                return Promise.resolve(instance)
            })
        }
    })
})

// 维护sdk对象的准备状态
const readyProvider = new DataProvider<string>()

// 初始化监听事件, TODO 后续优化
const initEvent = (instance: NIM | any) => {
    eventList.forEach((key) => {
        instance.on(key, (res: any) => {
            console.log(`收到消息了${key}`, res)

            /** 成功登录 */
            key === 'logined' && serviceEmitter.emit("IM__LoginDone")

            /** 从云信服务端同步漫游消息、离线消息、好友关系等完成触发syncdone事件 */
            if (key === 'syncdone') {
                serviceEmitter.emit("IM__SyncDone")
                readyProvider.setData('success')
            }

            /** 更新会话列表 */
            if (key === 'updateSession') {
                res.scene === 'team' && serviceEmitter.emit("IM__UpdateTeamSession", res)
                res.scene === 'p2p' && serviceEmitter.emit("IM__UpdateSession", res)
            }

            /** 收到消息已读回执 */
            if (key === 'msgReceipts') {
                const receipt = res[0] || {}
                receipt.teamId && serviceEmitter.emit("IM__OnTeamMsgReceipts", res)
                receipt.sessionId && serviceEmitter.emit("IM__OnMsgReceipts", res)
            }

            /** 收到系统消息 */
            if (key === 'sysMsg') {
                serviceEmitter.emit("IM__OnSysMsg", res)
            }

            /** 收到新消息 */
            if (key === 'msg') {
                if (res.type === 'notification') {
                    console.log(res);
                    
                    if (["addTeamMembers", "leaveTeam", "removeTeamMembers"].includes(res.attach.type)) {
                        serviceEmitter.emit("IM__OnTeamMsgAddOrLeaveMembers", res)
                    }
                    else if (["dismissTeam"].includes(res.attach.type)) {
                        serviceEmitter.emit("IM__OnTeamMsgDismiss", res)
                    }
                    else if (['updateTeamMemberMute'].includes(res.attach.type)) {
                        serviceEmitter.emit("IM__OnTeamMsgMute", res)
                    }

                    /** 标记群通知已读, 防止出现徽标值错误，需要开通 */
                    // instance.msg.sendTeamMsgReceipt({
                    //     teamMsgReceipts: [{ idClient: res.idClient, idServer: res.idServer, teamId: res.target }]
                    // })
                    return
                }
                res.scene === 'team' && serviceEmitter.emit("IM__OnTeamMsg", res)
                res.scene === 'p2p' && serviceEmitter.emit("IM__OnMsg", res)
            }
        })
    })
}


//====================================================
// 核心SDK
//====================================================

export class IMSDK {

    /** 获取历史消息对象, 支持历史消息的查询及操作 */
    static async msgLogInsurance() {
        return this.connect().then((instance) => {
            return Promise.resolve(instance.msgLog)
        })
    }

    /** 获取消息对象, 支持消息操作类接口 */
    static async msgInsurance() {
        return this.ready().then((instance) => {
            return Promise.resolve(instance.msg)
        })
    }

    /** 获取会话对象 */
    static async sessionInsurance() {
        return this.ready().then((instance) => {
            return Promise.resolve(instance.session)
        })
    }

    /** 获取群组对象 */
    static async teamInsurance() {
        return this.ready().then((instance) => {
            return Promise.resolve(instance.team)
        })
    }

    /** 获取用户信息对象 */
    static async userInsurance() {
        return this.ready().then((instance) => {
            return Promise.resolve(instance.user)
        })
    }

    /** 消息监听 */
    static onMsg<Event extends keyof Events>(eventName: Event, callback: ICallback<Events[Event]>, autoUnmounted: boolean = true) {
        serviceEmitter.on(eventName, callback)

        // 自动注销
        if (autoUnmounted) {
            onUnmounted(() => {
                serviceEmitter.off(eventName, callback)
            })
        }
    }

    /** 发起连接 */
    static async connect() {
        return connectProvider.getData()
    }

    private static async ready() {
        return readyProvider.getData().then(() => {
            return this.getInstance()
        })
    }

    /** 获取sdk对象 */
    private static async getInstance() {
        return instanceProvider.getData()
    }

    /** 退出 */
    static async logout() {
        return IMSDK.getInstance().then((instance) => {
            connectProvider.reset()
            instanceProvider.reset()

            serviceEmitter.emit("IM__LogoutDone")
            if (['destroyed', 'unconnected'].includes(instance.status)) {
                debug && console.warn('IM连接不能重复关闭: ', instance.status)
                //回收实例，方便初始化
                return Promise.resolve('')
            }
            return instance.destroy().then(() => {
                debug && console.warn('IM连接关闭: ', instance.status)
                //回收实例，方便初始化
                return Promise.resolve('')
            })
        })
    }
}


