import mitt from 'mitt'
import type { ReqOptions, ApiError } from './bean'
import type { AxiosResponse } from 'axios'


//====================================================
// 接口定义
//====================================================

interface RequestEvent {
    /** 请求体配置信息 */
    config: ReqOptions
}
interface ErrorEvent {
    /** 接口异常 */
    error: ApiError
}

type ErrorRequestEvent = RequestEvent & ErrorEvent

type ResponseEvent = RequestEvent & {
    /** 接口响应结果 */
    response: AxiosResponse
}
type ErrorResponseEvent = ErrorRequestEvent & {
    /** 接口响应结果 */
    response: AxiosResponse
}

//====================================================
// 事件定义
//====================================================

export type Events = {
    /** API发起请求 */
    "HTTP__API_START": RequestEvent
    /** API响应 */
    "HTTP__API_RESPONSE": ResponseEvent
    /** API请求完成 */
    "HTTP__API_FINISH": RequestEvent

    /** API请求异常 */
    "HTTP__API_REQUEST_ERROR": ErrorRequestEvent
    /** API响应异常 */
    "HTTP__API_RESPONSE_ERROR": ErrorResponseEvent
    /** 未知异常 */
    "HTTP__API_UNKNOWN_ERROR": ErrorEvent
}

//====================================================
// 初始化
//====================================================


// 创建独立事件
export const httpEmitter = mitt<Events>()
