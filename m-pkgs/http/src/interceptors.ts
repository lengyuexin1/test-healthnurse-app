import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiError, ReqOptions, Interceptor, HttpInstance } from './bean'
import { httpEmitter } from './event'

//================================================
//接口定义
//================================================
const RESPONSE_ERROR_MESSAGE = '请求响应失败, 请稍后再试!'
const REQUEST_ERROR_MESSAGE = '网络超时, 请稍后重试!'
const OTHER_ERROR_MESSAGE = '网络异常, 请联系客服!'
const S401_ERROR_MESSAGE = '授权已过期'
const S401_STATUS_CODE = 401

/**
 * 拦截器的抽象类
 * js文件内无法「implements 接口」，但是可以「extends 抽象类」
 */
export abstract class AbstractInterceptor implements Interceptor {
    //抽象方法
    // eslint-disable-next-line no-unused-vars
    abstract install(instance: HttpInstance): void
}

/** 统一处理响应异常 */
const __handleResponseError = (error: ApiError, config: ReqOptions, axiosResponse: AxiosResponse): Promise<any> => {
    if (axiosResponse.status === 400 && axiosResponse.data) {
        const response = axiosResponse.data as IResponse
        error.response = axiosResponse

        error.apiCode = response?.code
        error.apiResponse = response
        error.message = response?.message
        return Promise.reject(error)
    }

    if (axiosResponse.status > 401) {
        httpEmitter.emit('HTTP__API_RESPONSE_ERROR', { config, error, response: axiosResponse })
    }

    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    return Promise.reject(error)
}

//================================================
//标准拦截器
//================================================

/** 请求拦截器 */
export abstract class RequestInterceptor implements Interceptor {
    //@ts-ignore
    private instance: HttpInstance

    //可以统一处理请求信息
    // eslint-disable-next-line no-unused-vars
    protected abstract handleRequest(options: ReqOptions): Promise<ReqOptions>

    install(instance: HttpInstance) {
        this.instance = instance
        //请求拦截
        instance.interceptors.request.use((reqConf) => {
            const config = reqConf as ReqOptions
            return this.handleRequest(config) as any
        })
    }
}

/** 响应拦截器 */
export abstract class ResponseInterceptor implements Interceptor {

    //可以统一处理返回信息
    // eslint-disable-next-line no-unused-vars
    protected abstract handleResponse(response: AxiosResponse): any

    install(instance: HttpInstance): void {
        // 响应拦截
        instance.interceptors.response.use(axiosResponse => {
            const config = axiosResponse.config as InternalAxiosRequestConfig
            // 统一状态码异常处理逻辑
            if (axiosResponse.status >= 300) {
                const error = new Error() as AxiosError
                error.message = RESPONSE_ERROR_MESSAGE
                error.config = config
                error.response = axiosResponse
                error.request = axiosResponse.request
                return Promise.reject(error)
            }

            return this.handleResponse(axiosResponse)
        })
    }
}

/** 异常拦截器 */
export class ErrorInterceptor implements Interceptor {
    //@ts-ignore
    private instance: HttpInstance
    //统一处理异常信息
    private handleError(axiosError: AxiosError): Promise<any> {
        const config = axiosError.config as ReqOptions
        // 记录结束时间
        config && (config.__end = Date.now())

        const error = new Error() as ApiError
        error.response = axiosError.response
        error.apiResponse = axiosError.response?.data as any
        error.cause = axiosError

        if (axiosError.response) {
            error.message = RESPONSE_ERROR_MESSAGE
            return this.handleResponseError(error, config, axiosError.response)
        }
        else if (axiosError.request) {
            error.message = REQUEST_ERROR_MESSAGE
            return this.handleRequestError(error, config)
        }
        else {
            error.message = OTHER_ERROR_MESSAGE
            return this.handleUnknownError(error)
        }
    }

    /** 处理响应异常, 可继承 */
    protected handleResponseError(error: ApiError, config: ReqOptions, axiosResponse: AxiosResponse): Promise<any> {
        return __handleResponseError(error, config, axiosResponse)
    }
    /** 处理请求异常, 可继承 */
    protected handleRequestError(error: ApiError, config: ReqOptions): Promise<any> {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        httpEmitter.emit('HTTP__API_REQUEST_ERROR', { config, error })
        return Promise.reject(error)
    }
    /** 处理未知异常, 可继承 */
    protected handleUnknownError(error: ApiError): Promise<any> {
        // 未知异常
        httpEmitter.emit('HTTP__API_UNKNOWN_ERROR', { error })
        return Promise.reject(error)
    }

    install(instance: HttpInstance): void {
        this.instance = instance
        // 请求拦截
        instance.interceptors.request.use(config => {
            return Promise.resolve(config)
        }, error => {
            return this.handleError(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            return Promise.resolve(res)
        }, error => {
            return this.handleError(error)
        })
    }
}

//================================================
//扩展拦截器
//================================================


/**
 * token401拦截器
 * 可以 extends 这个拦截器实现 自定义的token失效后的处理逻辑
 */
export abstract class Token401ErrorInterceptor extends ErrorInterceptor {

    //刷新token，可以通过return Promise.reject()来不触发刷新token
    // eslint-disable-next-line no-unused-vars
    protected abstract refreshToken(error: ApiError, config: ReqOptions): Promise<any>

    protected handleResponseError(error: ApiError, config: ReqOptions, response: AxiosResponse<any, any>): Promise<any> {
        if (response.status === S401_STATUS_CODE) {
            error.message = S401_ERROR_MESSAGE
            //401自动刷新
            return this.refreshToken(error, config)
        }
        return super.handleResponseError(error, config, response)
    }
}

/** 统一响应实体拦截器 */
export class BCResponseInterceptor extends ResponseInterceptor {

    protected handleResponse(axiosResponse: AxiosResponse) {
        const data = axiosResponse.data as IResponse
        if (data !== undefined && (data as IApiPaperResponse).total !== undefined) {
            return Promise.resolve(data)
        }
        else if (data !== undefined) {
            return Promise.resolve(data.data)
        }
        return Promise.resolve(data)
    }

}

