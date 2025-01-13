import type { ReqOptions, HttpInstance, UseApi, _ApiError } from './bean'
import { httpEmitter } from './event'
import axios, { AxiosHeaders, AxiosInstance } from 'axios'
import { ref } from 'vue'


interface Callback<T> {
    // eslint-disable-next-line no-unused-vars
    (res: T): void
}

const createUse = (promise: Promise<any>) => {
    const loading = ref(false)
    const data = ref()
    const error = ref<_ApiError>()
    const onData = ref<Callback<any>>(() => {})
    const onError = ref<Callback<_ApiError>>(() => {})
    const toastError = ref(true)

    loading.value = true
    promise.then((res) => {
        data.value = res
        onData.value(res)
    }).catch((err) => {
        error.value = err
        onError.value(err)
        if (toastError.value) {
            // TODO auto toast
        }
    }).finally(() => {
        // TODO 后续优化为整个请求过程，确保loading时间至少在500毫秒以上
        setTimeout(() => {
            loading.value = false
        }, 500)
    })

    return { loading, data, error, onData, onError, toastError } as unknown as UseApi<any>
}


//====================================================
// 核心类
//====================================================
export class HttpRequest implements HttpInstance {

    //@ts-ignore
    TAG: string
    //axios的实例
    private instance: AxiosInstance
    interceptors: AxiosInstance["interceptors"]

    constructor(options?: ReqOptions) {
        const config = options || {}
        this.initConfig(config as ReqOptions)
        this.instance = axios.create(config)
        //维持axios原有拦截器实现方式
        this.interceptors = this.instance.interceptors
        this.initInterceptors()
    }

    private initConfig(config: ReqOptions) {
        config.timeout = config.timeout || 60000
        config.headers = config.headers || AxiosHeaders.from()
        config.data = config.data || {}
        config.params = config.params || {}
        config.validateStatus = (status) => {
            return status >= 200 && status < 300
        }
    }

    private initInterceptors() {
        // 默认响应拦截
        this.instance.interceptors.response.use((response) => {
            const config = response.config as ReqOptions
            // 记录结束时间
            config.__end = Date.now()
            //发送 response 响应结果
            httpEmitter.emit('HTTP__API_RESPONSE', { config, response })
            return response
        })
    }

    private async __createRequest(options: ReqOptions): Promise<any> {
        options.__begin = Date.now()
        options.data = options.data || {}
        httpEmitter.emit('HTTP__API_START', { config: options })
        return this.instance.request(options).finally(() => {
            // 没有时间则补充时间
            options.__end || (options.__end = Date.now())
            httpEmitter.emit('HTTP__API_FINISH', { config: options })
        })
    }

    private __init(conf?: ReqOptions): any {
        const options = conf || {} as ReqOptions
        console.log(options.headers)
        options.headers = options.headers ? {
            ...options.headers,
            'platformKind': '1'
        } : {
            'content-type': 'application/json', // 默认值
            'platformKind': '1' // 平台划分 1表示照护 2表示乐悠

        }
        options.data = options.data || {}
        if (uni.getStorageSync('scene')) {
            options.data.sence = uni.getStorageSync('scene')
        }
        options.params = options.params || {}
        return options
    }

    //==========================================
    /** 实现axios常见方法 */
    //==========================================
    request(options: ReqOptions) {
        options.method = options.method || 'post'
        return this.__createRequest(options)
    }

    get(url: string, params?: any, options?: ReqOptions) {
        const config = options || {} as ReqOptions
        config.url = url
        config.headers = { 'platformKind': '1' } // 平台划分 1表示照护 2表示乐悠
        config.params = params
        config.method = config.method || 'get'
        return this.__createRequest(config)
    }

    post(url: string, data?: any, options?: ReqOptions) {
        const config = this.__init(options)
        config.url = url
        config.data = data
        config.method = config.method || 'post'
        return this.__createRequest(config)
    }
    //==========================================
    /** 同步请求 */
    useGet(url: string, params?: any, options?: ReqOptions) {
        return createUse(this.get(url, params, options))
    }
    /** 同步请求 */
    usePost(url: string, data?: any, options?: ReqOptions) {
        return createUse(this.post(url, data, options))
    }


}
