import { PromiseProvider } from '@bc/base'
import { Token401ErrorInterceptor, type ReqOptions, type ApiError } from '@bc/http'
import { PlatformManage } from '@bc/sys'
import { buildHttp } from '../http-adapter'
import { BCNetworkInterceptor, BCTokenRequestInterceptor } from '../request/interceptors'
import { openHttp } from '../index'
import { sysEmitter } from '@bc/sys/src/events'

//================================================
//http对象定义
//================================================

const refreshTokenInstance = buildHttp()
refreshTokenInstance.TAG = 'refresh'

//注入入参拦截器
new BCNetworkInterceptor().install(refreshTokenInstance) // 网络拦截
new BCTokenRequestInterceptor().install(refreshTokenInstance)

//================================================
//方法定义
//================================================

//刷新token
const refreshTokenApi = (refreshToken: string) => {
    return openHttp.user.post('/v1/bc/company/admin/uniAutoLogin', { refreshToken })
}

//防止并发调用
const refreshProvider = new PromiseProvider<ILoginToken>()
refreshProvider.setCallback(() => {
    return PlatformManage.getToken().then(async (oldToken) => {
        return refreshTokenApi(oldToken.refreshToken).then((res) => {
            const token = {
                ...res,
                id: res.id,
                token: res.token,
                tokenExpireTime: "",
                // 组织Id维护
                organizationId: oldToken.organizationId,
                refreshToken: res.refreshToken,
                refreshTokenExpireTime: res.refreshTokenExpired //这里要改成刷新token的有效时间
            } as ILoginToken

            //在这里存储token, 可避免被执行多次
            return PlatformManage.setToken(token).then(() => {
                return Promise.resolve(token)
            })
        }).catch((err) => {
            //接口异常时, 全局通知
            return PlatformManage.clearStoreAuthorize().then(() => {
                sysEmitter.emit('REFLESH_TOKEN_FAIL')
                return Promise.reject(err)
            })
        })
    })
})

//================================================
//401 token失效拦截器
//================================================

/** 401 token失效拦截器 */
export class BCToken401ErrorInterceptor extends Token401ErrorInterceptor {

    protected async refreshToken(_err: ApiError, config: ReqOptions) {
        return refreshProvider.getData().then(() => {
            //下一步，token重新请求
            console.warn('refreshProvider: ', config)
            return refreshTokenInstance.request(config)
        }).catch(async (err) => {
            //刷新异常时, 全局通知
            return PlatformManage.clearStoreAuthorize().then(() => {
                sysEmitter.emit('REFLESH_TOKEN_FAIL')
                return Promise.reject(err)
            })
        })
    }
}




