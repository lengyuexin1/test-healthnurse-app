
import HttpBuilder, { type HttpRequest, type ReqOptions } from '@bc/http'
import { uniAdapter } from '@bc/uni-tools'
import type { ContentApi, MessageApi, OrderApi, SettlementApi, UserApi } from './types'

//================================================================================
/** 接口定义 */
//================================================================================
export interface MyHttpRequest {
    user: UserApi
    message: MessageApi
    settlement: SettlementApi

    order: OrderApi
    content: ContentApi
}

//================================================================================
/** 方法 */
//================================================================================
/** 创建http请求对象 */
export const buildHttp = (config?: ReqOptions) => {
    config = config || {}
    config.timeout = 10000
    config.adapter = uniAdapter
    const http = HttpBuilder.create(config) as MyHttpRequest & HttpRequest

    http.user = {
        get: (url, params, options) => {
            return http.get(`api/user${url}`, params, options)
        },
        post: (url, params, options) => {
            return http.post(`api/user${url}`, params, options)
        },
        useGet: (url, params, options) => {
            return http.useGet(`api/user${url}`, params, options)
        },
        usePost: (url, params, options) => {
            return http.usePost(`api/user${url}`, params, options)
        }
    }
    http.message = {
        get: (url, params, options) => {
            return http.get(`api/im${url}`, params, options)
        },
        post: (url, params, options) => {
            return http.post(`api/im${url}`, params, options)
        },
        useGet: (url, params, options) => {
            return http.useGet(`api/im${url}`, params, options)
        },
        usePost: (url, params, options) => {
            return http.usePost(`api/im${url}`, params, options)
        }
    }
    http.settlement = {
        get: (url, params, options) => {
            return http.get(`api/settlement${url}`, params, options)
        },
        post: (url, params, options) => {
            return http.post(`api/settlement${url}`, params, options)
        },
        useGet: (url, params, options) => {
            return http.useGet(`api/settlement${url}`, params, options)
        },
        usePost: (url, params, options) => {
            return http.usePost(`api/settlement${url}`, params, options)
        }
    }

    http.order = {
        get: (url, params, options) => {
            return http.get(`api/order${url}`, params, options)
        },
        post: (url, params, options) => {
            return http.post(`api/order${url}`, params, options)
        },
        useGet: (url, params, options) => {
            return http.useGet(`api/order${url}`, params, options)
        },
        usePost: (url, params, options) => {
            return http.usePost(`api/order${url}`, params, options)
        }
    }
    http.content = {
        get: (url, params, options) => {
            return http.get(`api/content${url}`, params, options)
        },
        post: (url, params, options) => {
            return http.post(`api/content${url}`, params, options)
        },
        useGet: (url, params, options) => {
            return http.useGet(`api/content${url}`, params, options)
        },
        usePost: (url, params, options) => {
            return http.usePost(`api/content${url}`, params, options)
        }
    }

    return http
}

