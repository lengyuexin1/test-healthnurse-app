import { AxiosError, type AxiosPromise, type AxiosRequestConfig, type AxiosResponse, type AxiosResponseHeaders } from 'axios'
import { UrlTools } from '@bc/base'


/** 转换请求方法 */
const transfer2Method = (method?: string) => {
    if (!method) {
        throw new Error('method is empty')
    }
    return method.toUpperCase() as 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
}

/** 实体转换 */
const transfer2UniRequest = (config: AxiosRequestConfig) => {
    const params = typeof config.params === 'object' ? config.params : {}
    const url = config.baseURL + UrlTools.buildUrlByParams(config.url || '', params)

    return {
        url,
        header: { ...config.headers },
        timeout: config.timeout,
        method: transfer2Method(config.method),
        data: config.data || {}
    } as UniNamespace.RequestOptions
}

/** uni的http请求方法 */
const uniRequest = (config: AxiosRequestConfig, options: UniNamespace.RequestOptions) => {
    return new Promise<AxiosResponse>((resolve, reject) => {
        const defaultOptions = {
            success: (res: UniNamespace.RequestSuccessCallbackResult) => {
                const response: AxiosResponse = {
                    data: res.data,
                    status: res.statusCode,
                    statusText: res.errMsg || 'OK',
                    headers: res.header as AxiosResponseHeaders,
                    config: config as any,
                    request: options
                }

                // TODO 待确定 - 小程序切换页面会导致正在处理中的请求返回状态码为0
                if (res.statusCode === 0) {
                    console.error('http--请求中断: ', response)
                    const axiosError = AxiosError.from('请求中断', AxiosError.ERR_CANCELED, config as any, response)
                    reject(axiosError)
                    return
                }
                resolve(response)
            },
            fail: (err: UniNamespace.GeneralCallbackResult) => {
                console.error('http--fail: ', err)
                console.error('http--fail-options: ', options)
                const axiosError = AxiosError.from(err.errMsg, AxiosError.ERR_BAD_REQUEST, config as any)
                reject(axiosError)
            }
        }

        const finalOptions = Object.assign({}, options, defaultOptions)
        let requestTask = uni.request(finalOptions)

        //支持取消
        if (config.signal) {
            config.signal.onabort = (cancel) => {
                if (!requestTask) {
                    return
                }
                // 取消请求
                requestTask.abort()
                reject(cancel)
                requestTask = undefined as any
            }
        }
    })
}

/** uni的axios适配器 */
export const uniAdapter = async (config: AxiosRequestConfig): AxiosPromise => {
    const request = transfer2UniRequest(config)
    return uniRequest(config, request)
}
