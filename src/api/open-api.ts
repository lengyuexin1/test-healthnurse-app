import type { 
    _ali_sms_sendLoginCode_get_req,
    _v1_bc_app_user_mobileCodeLogin_post_req,
    _v1_bc_company_admin_customerServiceLogin_post_req,
    _v1_bc_public_customerServiceAccountLogin_post_req,
    } from "@bc/api/types/user/api-types"
import { openHttp, http } from "@bc/api"
import { APP_CODE, APP_VERSION } from "@/sys/constant"
import { compareVersions } from "@/sys/versionCompare"



//================================================================================
/** 登录类 */
//================================================================================

/** 用户登录 */
export const userLogin = (req:any) =>{
    return openHttp.user.post('/v1/bc/public/app/user/login',req)
}

/** 验证码登录 */
// changev2
export const codeLogin = (req: any) => {
    return openHttp.user.post('/v1/bc/public/app/user/mobileCodeLogin', req)
}

/** 获取手机验证码 */
// changev2
export const userGetCode = (req: any) => {
    return openHttp.user.get('/ali/public/sms/sendLoginCode', req)
}

/** 获取手机号码 */
export const getWxPhoneNumber = (req:any) => {
    return openHttp.user.post('/v1/bc/public/app/user/getPhoneNumber',req)
}

/** 获取im授权 */
export const getImToken = () => {
    return http.message.post('/v1/bc/app/im/getImToken')
}

/** 切换账号 */
export const mutiMobileLogin = (req:any) => {
    return openHttp.user.post('/v1/bc/public/app/user/mutiMobileLogin',req)
}

/** 获取微信session */
export const getWechatOpenid = (req: any) => {
    return http.user.get('/v1/bc/app/user/getWechatOpenid', req)
}


//================================================================================
/** 操作类 */
//================================================================================


/** 获取app最新版本 */
const getNewVersionApi = () => {
    //传递最小版本号, 便于后端检测升级
    const req = { appCode: APP_CODE, currentVersion: APP_VERSION }
    return openHttp.get('api/user/app/getNewVersion', req)
}

export const getNewVersion = async () => {
    return getNewVersionApi().then((res) => {
        if (!res || !res.version) {
            return Promise.reject(new Error('没有新版本'))
        }

        const result = compareVersions(res.version, APP_VERSION)
        if (result === 1) {
            // 发现新版本
            return Promise.resolve(res)
        }
        else {
            // 相等
            return Promise.reject(new Error('没有新版本'))
        }
    })
}


/** 获取二维码路径 */
export const getQRPage = (req: any) => {
    return http.user.get('/v1/bc/public/app/common/getPage', req)
}


