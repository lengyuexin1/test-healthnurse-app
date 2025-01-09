import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { Session } from "nim-web-sdk-ng/dist/NIM_BROWSER_SDK/SessionServiceInterface"
import type { TMessageSession, TSessionScene } from "../bean"
import { reactive } from "vue"
import { MessageService } from './message-service'
import { serviceEmitter } from "../events"
import { SessionSDK, parseP2pScene } from '../sdk/session-sdk'

//====================================================
// 接口定义
//====================================================
export interface IData {
    /** 未读消息数 */
    unread: number
    sessions: TMessageSession[]
    /** 单聊场景会话ids, 冗余字段 */
    sessionIds: string[]
}

//====================================================
// 常量
//====================================================
const debug = true


//====================================================
// 核心类
//====================================================

export class P2pMessageService extends MessageService {

    data: IData
    protected scene: TSessionScene
    private TAG: TSessionScene

    constructor(scene: TSessionScene) {
        super(scene)
        this.data = reactive<IData>({ unread: 0, sessions: [], sessionIds: [] })
        this.scene = scene
        this.TAG = scene
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
        SessionSDK.getSessionByScene([this.scene]).then((sessions) => {
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

    /** 是否新加入会话 */
    private isJoinChat(session: Session) {
        // 不存在的会话则为新会话
        if (!this.isExistSession(session.id)) {
            // 再判断场景
            const scene = parseP2pScene(session.to)
            return this.scene === scene
        }
        return false
    }

    /** 添加会话 */
    private addSession(session: Session) {
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

    /** 更新会话信息 */
    private updateSession = (session: Session) => {
        const targetIndex = this.data.sessions.findIndex(item => item.session.id === session.id)
        if (targetIndex >= 0) {
            const target = this.data.sessions[targetIndex]
            const p2pSession = { session, info: target.info, scene: target.scene } as TMessageSession
            this.data.sessions.splice(targetIndex, 1, p2pSession)
            debug && console.warn(`${this.TAG} - 会话更新: `, targetIndex, p2pSession)
        }
        else {
            console.error(`${this.TAG} - 会话更新 - 会话不存在, 异常: `, targetIndex, session)
        }
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

        // 监听事件, 处理群会话更新
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
    }

    /** 收到新消息 */
    protected onReceiveMessage(message: IMMessage) {

    }

    /** 收到新会话 */
    protected onNewChat(session: TMessageSession) {

    }



}

