import { HttpRequest } from './src/http'
import { httpEmitter, type Events } from './src/event'
import type { ReqOptions } from './src/bean'

export const HttpBuilder = {
    create(config?: Partial<ReqOptions>): HttpRequest {
        return new HttpRequest(config as ReqOptions)
    }
}


export interface ICallback<T> {
    // eslint-disable-next-line no-unused-vars
    (data: T): void
}
/** 添加http事件请求监听 */
export const onHttpEvent = <Event extends keyof Events>(eventName: Event, callback: ICallback<Events[Event]>) => {
    httpEmitter.on(eventName, callback)
}


//单个导出
export * from './src/bean'
export * from './src/http'
export * from './src/interceptors'


export default HttpBuilder
