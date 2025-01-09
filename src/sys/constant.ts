//环境校验
if (!import.meta.env.VITE_WEB_ENV) {
    throw new Error('注意: VITE_WEB_ENV 需要在env文件内配置')
}

//接口地址校验
// if (!import.meta.env.VITE_HTTP_BASE_URL) {
//     throw new Error('注意: VITE_HTTP_BASE_URL 需要在env文件内配置')
// }

export const PRJ_NAME = import.meta.env.VITE_PROJECT_NAME
export const PRJ_VERSION = import.meta.env.VITE_PROJECT_VERSION

export const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv
export const API_ENV = import.meta.env.VITE_API_ENV as TEnv
export const API_HTTP_BASE_URL = import.meta.env.VITE_HTTP_BASE_URL || ''
export const ARMS_PID = import.meta.env.VITE_ARMS_PID
export const IM_APP_KEY = import.meta.env.VITE_IM_APP_KEY
export const WEIXIN_OPEN = import.meta.env.VITE_WEIXIN_OPEN


// console.groupCollapsed('env:')
console.warn('PRJ_NAME: ', PRJ_NAME)
console.warn('PRJ_VERSION: ', PRJ_VERSION)
console.warn('WEB_ENV: ', WEB_ENV)
console.warn('API_ENV: ', API_ENV)
console.warn('API_HTTP_BASE_URL: ', API_HTTP_BASE_URL)
console.warn('ARMS_PID: ', ARMS_PID)
console.warn('IM_APP_KEY: ', IM_APP_KEY)
console.warn('WEIXIN_OPEN: ', WEIXIN_OPEN)
// console.groupEnd()


const res = uni.getSystemInfoSync()

export const APP_VERSION = res.appVersion
export const APP_VERSION_CODE = Number(res.appVersionCode)

console.warn('getSystemInfoSync: ', res)
console.warn('APP_VERSION: ', APP_VERSION)
console.warn('APP_VERSION_CODE: ', APP_VERSION_CODE)


export const APP_CODE = `client`
export const APP_TAG = `${APP_CODE}.app_${APP_VERSION}`
