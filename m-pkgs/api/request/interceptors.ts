import { ApiError, ReqOptions, RequestInterceptor } from '@bc/http'
import { PlatformManage } from '@bc/sys'
import { networkProvider } from '@bc/uni-tools'


//================================================
//接口定义
//================================================
const TOKEN_NAME = 'token'

//================================================
//token入参拦截器
//================================================

/** token入参拦截器 */
export class BCTokenRequestInterceptor extends RequestInterceptor {

    //获取token的方法，可用来实现针对不同接口提供不同的token
    protected getToken() {
        return PlatformManage.getToken()
    }

    protected async handleRequest(config: ReqOptions) {
        //拼接token
        return this.getToken().then((userBO) => {
            config.headers = config.headers || {}
            config.headers[TOKEN_NAME] = userBO.token
            return Promise.resolve(config)
        })
    }
}


/** URL拼装入参拦截器 */
export class BCURLRequestInterceptor extends RequestInterceptor {

    protected async handleRequest(config: ReqOptions) {
        //参数校验
        if (!import.meta.env.VITE_HTTP_BASE_URL) {
            const error = new Error('注意: VITE_HTTP_BASE_URL 需要在env文件内配置') as ApiError
            error.apiCode = 300000
            return Promise.reject(error)
        }
        /** api环境域名 */
        if (config.baseURL === undefined) {
            config.baseURL = import.meta.env.VITE_HTTP_BASE_URL
        }

        return Promise.resolve(config)
    }
}


/** 网络状态请求拦截器 */
export class BCNetworkInterceptor extends RequestInterceptor {

    protected handleRequest(options: ReqOptions): Promise<ReqOptions> {
        return networkProvider.getData().then((state) => {
            if (!state.isConnected) {
                const error = new Error('无网络') as ApiError
                error.apiCode = 300001
                return Promise.reject(error)
            }
            else {
                return Promise.resolve(options)
            }
        })
    }

}
