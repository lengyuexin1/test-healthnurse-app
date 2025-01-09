import type { GetHistoryMsgsOptions } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgLogServiceInterface'
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { TMessageSession } from './bean'
import { P2pMessageService } from './service/p2p-service'
import { speek } from './tools/audio-tools'
import { SessionSDK } from './sdk/session-sdk'
import { MessageList } from './paper/msg-list'

//====================================================
// 接口定义
//====================================================

interface ICallback<T> {
    (data: T): void
}

//====================================================
// 常量
//====================================================
const debug = true

//====================================================
// 核心类
//====================================================

/** 消息通知服务 */
class Service extends P2pMessageService {

    constructor() {
        super('p2p')
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

export const LoveChatService = new Service()

/** 消息通知的会话对象 */
export const useLoveChatSessions = () => {
    return LoveChatService.data
}

/** 获取消息列表分页器 */
export const useLoveChatList = (to: string, limit: number, callback: ICallback<IMMessage>) => {
    const msgTypes = ['text', 'image', 'audio', 'video', 'custom']
    const options = { to, msgTypes, limit } as GetHistoryMsgsOptions
    options.asc = true
    options.reverse = false
    options.scene = 'p2p'

    SessionSDK.onMsg('IM__OnMsg', (res) => {
        if (res.target === to) {
            debug && console.warn('通知 - 收到新消息: ', res.type, res)
            if (msgTypes.includes(res.type)) {
                callback(res)
            }
        }
    })
    return new MessageList(options)
}


