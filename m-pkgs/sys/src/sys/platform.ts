import { imProvider } from './im-provider'
import { userProvider } from './user-provider'



//====================================================
// 核心类
//====================================================

export class PlatformManage {

    /**
     * 供项目内调用，在请求接口之前获取token
     * @returns
     */
    static async getToken() {
        return userProvider.getToken()
    }

    /**
     * 供项目内在登录成功时调用
     * @param loginToken
     */
    static async setToken(loginToken: ILoginToken): Promise<any> {
        return userProvider.setToken(loginToken)
    }

    /**
     * 是否需要登录，用于初始化的时候判断
     * @returns
     */
    static async isRequireLogin(): Promise<boolean> {
        return userProvider.isRequireLogin()
    }

    /**
     * 登录成功的通知
     * 1. 主要用于在个别特殊页面内使用（同时需要供授权和非授权场景访问的页面）
     * 2. 用于识别授权调用的时机
     * @returns
     */


    static async loginSuccess(): Promise<string> {
        return userProvider.loginSuccess()
    }

    static clearStoreAuthorize() {
        const promises = [userProvider.clearStoreAuthorize(), imProvider.clearStoreAuthorize()]
        return Promise.all(promises)
    }



}
