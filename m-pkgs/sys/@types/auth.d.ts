/* eslint-disable no-unused-vars */
/** 用户授权 */
interface ILoginToken {
    applyId: number
    /** token */
    token: string
    /** token失效时间, 一般8小时失效 */
    tokenExpireTime: string
    /** 刷新token */
    refreshToken: string
    /** 刷新token失效时间, 一般15天失效 */
    refreshTokenExpireTime: string
    //userId
    id: string
    //组织id
    organizationId: string
}


interface IIMToken {
    /** 网易id */
    accid: string
    /** token */
    token: string
}
