import mitt from 'mitt'
import type { IMMessage, TeamMsgReceipt, p2pMsgReceipt } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { Session } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/SessionServiceInterface'

//====================================================
// 事件定义
//====================================================


/**
 * 消息事件表
 */
export type Events = {
    /** 登录完成 */
    "IM__LoginDone": void
    /** 注销登录完成 */
    "IM__LogoutDone": void
    /** 同步完成 */
    "IM__SyncDone": void

    /** 单聊 - 更新会话列表 */
    "IM__UpdateSession": Session
    /** 单聊 - 收到新消息 */
    "IM__OnMsg": IMMessage
    /** 单聊 - 收到消息已读回执 */
    "IM__OnMsgReceipts": p2pMsgReceipt[]

    /** 群聊 - 更新会话列表 */
    "IM__UpdateTeamSession": Session
    /** 群聊 - 收到新消息 */
    "IM__OnTeamMsg": IMMessage
    /** 群聊 - 收到消息已读回执 */
    "IM__OnTeamMsgReceipts": TeamMsgReceipt[]
    /** 群聊 - 群成员变动 */
    "IM__OnTeamMsgAddOrLeaveMembers": IMMessage
    /** 群聊 - 解散群 */
    "IM__OnTeamMsgDismiss": IMMessage
    /** 群聊 - 禁言 */
    "IM__OnTeamMsgMute": IMMessage

    /** 系统通知 */
    "IM__OnSysMsg": IMMessage

    /** 消息服务 - 更新未读消息 */
    "MSG__UpdateUnRead": void
}

//====================================================
// 初始化
//====================================================

// 创建独立事件
export const serviceEmitter = mitt<Events>()
