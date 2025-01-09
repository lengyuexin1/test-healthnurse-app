import { uniEmitter, type Events } from './src/event'

//====================================================
// 事件导出
//====================================================
export interface ICallback<T> {
    // eslint-disable-next-line no-unused-vars
    (data: T): void
}

/** 添加uni事件请求监听 */
export const onUniEvent = <Event extends keyof Events>(eventName: Event, callback: ICallback<Events[Event]>) => {
    uniEmitter.on(eventName, callback)
}

//====================================================
// 库文件导出
//====================================================
/** uni网络工具类 */
export * from './src/tools/network-tools'
/** uni网络请求工具类 */
export * from './src/uni-adapter'
/** uni页面工具类 */
export * from './src/page-controller'
