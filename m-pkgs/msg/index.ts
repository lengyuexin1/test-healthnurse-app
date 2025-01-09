// import { Events, serviceEmitter } from './src/events'

// //====================================================
// // 事件导出
// //====================================================
// export interface ICallback<T> {
//     // eslint-disable-next-line no-unused-vars
//     (data: T): void
// }

// /** 添加uni事件请求监听 */
// export const onSysEvent = <Event extends keyof Events>(eventName: Event, callback: ICallback<Events[Event]>) => {
//     serviceEmitter.on(eventName, callback)
// }

//====================================================
// 库文件导出
//====================================================
/** sdk */
export * from './src/sdk/session-sdk'

/** 场景服务 */
export * from './src/customer-service'
export * from './src/private-msg-service'
export * from './src/notice-service'
export * from './src/loveChat-service'
export * from './src/friendsGroup-service'
export * from './src/session-list-service'

/** 实体 */
export * from './src/bean'

/** 分页控制器 */
export * from './src/paper/msg-list'
