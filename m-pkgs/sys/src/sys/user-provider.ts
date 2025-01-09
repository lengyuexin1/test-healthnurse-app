import { CacheBuilder, DataProvider } from '@bc/base'
import { USER_MOD } from '../conf/cache'
import { sysEmitter } from '../events'


//================================================================================
/** 基本信息 */
//================================================================================

//常量
const CACHE_TIME = 7 * 24 * 60
const KEY_TOKEN = 'TOKEN_TOKEN'
//缓存
const cacheManage = CacheBuilder.uni.getInstance<ILoginToken>(USER_MOD)

//================================================================================
/** 用户授权 */
//================================================================================


//用户授权
const loginTokenProvider = new DataProvider<ILoginToken>()
//初始化
const readyProvider = new DataProvider<string>()
//是否需要登陆
const requireLoginProvider = new DataProvider<boolean>()
//登录成功的通知
const loginSuccessProvider = new DataProvider<string>()

class UserProvider {
    constructor() {
        const tokenObj = cacheManage.getCache(KEY_TOKEN)
        if (!tokenObj) {
            //更新状态: 需要登录
            requireLoginProvider.setData(true)
        }
        else {
            //更新状态: 不需要登录
            requireLoginProvider.setData(false)
            //更新: 授权; 不需要对本地存储做操作，仅需对内存做缓存
            loginTokenProvider.setData(tokenObj)
            //更新状态: 登录成功
            loginSuccessProvider.setData('')
            // 异步执行，避免其他地方监听不到事件
            setTimeout(() => {
                // 发送事件
                sysEmitter.emit('SYS_LOGIN_SUCCESS')
            }, 0)
        }
        //初始化成功
        readyProvider.setData('')
    }

    /**
     * 获取初始化状态
     * @return 触发then才能返回
     */
    private onReady() {
        return readyProvider.getData()
    }

    /**
     * 是否需要登录，用于初始化的时候判断：
     * 1. 是否唤起公众号授权
     * 2. 是否弹窗引导用户手机号密码登录
     * @return 根据then返回结果确定是否需要登陆; true为需要login, false为不需要login
     */
    async isRequireLogin() {
        return this.onReady().then(() => {
            return requireLoginProvider.getData()
        })
    }

    /**
     * 登录成功的通知
     * 1. 主要用于在个别特殊页面内使用（同时需要供授权和非授权场景访问的页面）
     * 2. 用于识别授权调用的时机
     * @return 触发then即为登录成功
     */
    async loginSuccess() {
        return this.onReady().then(() => {
            return loginSuccessProvider.getData()
        })
    }


    /**
     * 设置授权
     * @return 触发then即为设置成功: 可以开始做其他授权相关操作
     */
    async setToken(loginToken: ILoginToken) {
        return this.onReady().then(() => {
            // 存储本地
            cacheManage.setCache(KEY_TOKEN, loginToken, CACHE_TIME)
            // 更新: 授权
            loginTokenProvider.setData(loginToken)
            // 更新状态: 不需要登录
            requireLoginProvider.setData(false)
            // 更新状态: 登录成功
            loginSuccessProvider.setData('')
            // 发送事件
            sysEmitter.emit('SYS_LOGIN_SUCCESS')
            return Promise.resolve('')
        })
    }

    /**
     * 供项目内调用，在请求接口之前获取token
     * @returns
     */
    async getToken() {
        return this.onReady().then(() => {
            return loginTokenProvider.getData()
        })
    }

    /** 清除指定应用本地授权 */
    async clearStoreAuthorize() {
        cacheManage.delCache(KEY_TOKEN)
        //更新状态: 需要登录
        requireLoginProvider.setData(true)
        //重置: 清空授权
        loginTokenProvider.setData(undefined)
        //重置状态: 清除登录成功的状态
        loginSuccessProvider.setData(undefined)
        // 发送事件
        sysEmitter.emit('SYS_LOGIN_OUT')
        return Promise.resolve('')
    }

}

export const userProvider = new UserProvider()
