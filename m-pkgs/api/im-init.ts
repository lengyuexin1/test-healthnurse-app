import { imProvider, onSysEvent } from "@bc/sys"
import { http } from "./http-init"


/** 获取im授权 */
export const getImToken = () => {
    return http.message.post('/v1/bc/app/im/getImToken')
}


//====================================================
// 初始化
//====================================================

// im授权初始化
const init = () => {
    console.log(imProvider)
    imProvider.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            //需要登录
            getImToken().then((res) => {
                imProvider.setToken(res as any)
            })
        }
    })
}
init()
console.warn(' im init,')
// 登录成功后自动更新 im 的授权
onSysEvent('SYS_LOGIN_SUCCESS', () => {
    console.warn('login success, imProvider update')
    init()
})
