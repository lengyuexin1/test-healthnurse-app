import { Events, sysEmitter } from './src/events'

//====================================================
// 事件导出
//====================================================
export interface ICallback<T> {
    // eslint-disable-next-line no-unused-vars
    (data: T): void
}

/** 添加uni事件请求监听 */
export const onSysEvent = <Event extends keyof Events>(eventName: Event, callback: ICallback<Events[Event]>) => {
    sysEmitter.on(eventName, callback)
}

//====================================================
// 库文件导出
//====================================================
/** im授权 */
export * from './src/sys/im-provider'
/** 用户授权 */
export * from './src/sys/platform'
