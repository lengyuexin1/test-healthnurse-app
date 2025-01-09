import mitt from 'mitt'
import { UserEvents } from "./user-events"
import { CareEvents } from './care-events'
import { CreateEvents } from './create-events'


/** 全局事件 */
export enum GlobalEvents {
    /** 更新tabbar徽标 */
    Refresh_Badge = 'Refresh_Badge',
    /** 更新购物车徽标数 */
    Refresh_ShoppingCart_Badge = 'Refresh_ShoppingCart_Badge',
    /** 添加商户分类 */
    Add_Merchant_Sort = 'Add_Merchant_Sort',
    /** 删除AI对话 */
    Del_Chat_Session = 'Del_Chat_Session',
    /** 清除AI上下文 */
    Del_Chat_Context = 'Del_Chat_Context',
    /** 加入群聊 */
    Join_Group_Chat = 'Join_Group_Chat',
    /** 退出群聊 */
    Leave_Group_Chat = 'Leave_Group_Chat',
    /** 爱聊完善个人信息 */
    Love_chat_UpateInfo = 'Love_chat_UpateInfo',
    /** 创建群聊 */
    Create_Group_chat = 'Create_Group_chat'
}

/**
 * 自定义事件表
 */
const WEvents = Object.values({ ...GlobalEvents, ...UserEvents, ...CareEvents, ...CreateEvents }) as string[]



interface GCallback<T, Y> {
    (obj: T): Y
}

/** 常用事件 */
interface WYEventListener extends GCallback<any, void> {
    (obj?: any): void
}


//====================================================
// 初始化
//====================================================

// 创建独立事件
const emitter = mitt()

export function dispatchWEvent(eventName: string, data?: any) {
    if (!WEvents.includes(eventName)) {
        throw new Error('自定义事件不存在, 必须在 event-registry 内定义: ' + eventName)
    }

    emitter.emit(eventName, data)
}

export function addWEventsListener(eventName: string, callback: WYEventListener) {
    emitter.on(eventName, callback)
}
