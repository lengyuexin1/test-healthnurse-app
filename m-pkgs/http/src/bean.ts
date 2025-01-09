import type { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import type { Ref } from "vue"

// 通用异常类
export interface _ApiError extends Error {
    apiCode?: number
    apiResponse?: IResponse
}

export interface ApiError extends _ApiError {
    cause?: Error
    /** 请求工具返回的异常 */
    response?: AxiosResponse
}

/** 配置类 */
export type ReqOptions = AxiosRequestConfig & {
    /** 缓存有效时间，单位：分钟 */
    __cacheLimitTimes?: number

    /** 开始时间 */
    __begin?: number
    /** 结束时间 */
    __end?: number

}

export interface HttpInstance {
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    }
}

/** 拦截器统一安装接口 */
export interface Interceptor {
    // eslint-disable-next-line no-unused-vars
    install(instance: HttpInstance): void
}



interface Callback<T> {
    // eslint-disable-next-line no-unused-vars
    (res: T): void
}

export interface UseApi<T> {
    /** loading状态 */
    loading: Ref<boolean>
    /** 正常响应数据 */
    data: Ref<T>
    /** 获取数据的回调接口 */
    onData: Ref<Callback<T>>
    /** 异常数据 */
    error: Ref<_ApiError>
    /** 异常回调接口 */
    onError: Ref<Callback<_ApiError>>
    /** 异常时，是否自动吐司提示。默认为true */
    toastError: Ref<boolean>
}
