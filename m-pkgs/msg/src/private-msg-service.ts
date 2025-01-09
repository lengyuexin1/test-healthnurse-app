import type { GetHistoryMsgsOptions } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgLogServiceInterface'
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { TMessageSession } from './bean'
import { MessageList } from "./paper/msg-list"
import { TeamMessageService } from "./service/team-service"
import { SessionSDK } from "./sdk/session-sdk"
import { speek } from './tools/audio-tools'

//====================================================
// 接口定义
//====================================================

interface ICallback<T> {
    // eslint-disable-next-line no-unused-vars
    (data: T): void
}

//====================================================
// 核心类
//====================================================

/** 私信服务 */
class Service extends TeamMessageService {

    constructor() {
        super('privateMsg')
    }

    /** 收到新消息 */
    protected onReceiveMessage(message: IMMessage) {
        speek('滴滴！')
    }

    /** 收到新会话 */
    protected onNewChat(session: TMessageSession) {
        speek('有消息，请注意查收！')
    }

}

export const PrivateMsgService = new Service()

//====================================================
// 核心SDK
//====================================================



/** 私信会话 */
export const usePriMsgSessions = () => {
    return PrivateMsgService.data
}

/** 获取消息列表分页器 */
export const usePriMsgList = (to: string, limit:number, callback: ICallback<IMMessage>) => {
    const msgTypes = ['text', 'image', 'audio', 'video', 'custom']
    const options = { to, msgTypes, limit } as GetHistoryMsgsOptions
    options.asc = true
    options.reverse = false
    options.scene = 'team'

    SessionSDK.onMsg("IM__OnTeamMsg", (res) => {
        if (res.target === to) {
            if (msgTypes.includes(res.type)) {
                callback(res)
            }
        }
    })
    return new MessageList(options)
}
