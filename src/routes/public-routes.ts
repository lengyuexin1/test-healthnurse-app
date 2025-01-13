import { pageController } from '@bc/uni-tools'

// #ifdef APP-PLUS
import { appLogins } from '@/libs/appLogin'
// #endif


//===============================================================
/** 个人中心相关路由 */
//===============================================================

/** 跳转到 登录页 */
interface loginQuery {
    logtype?: number,
    inviteId?: number | string,
    retainPage?: number,
    addUser?: number,
    toSaveRoute?: number,
}

/**
 * logtype => 登录方式 1或者没传表示 一键登录
 * inviteId => 邀请id 
 * retainPage => 表示保留跳转页
 * toSaveRoute => 表示跳转保留的路径
 */
export const gotoLogin = (query: loginQuery) => {
    
    let type : (null|number) = null

    // #ifdef MP-WEIXIN || H5
    type = 1
    // #endif

    // #ifdef APP-PLUS
    type = 2
    // #endif

    console.log('type',type);

    let path = ''

    if (type == 1) {
        // 处理一键登录
        if (query.logtype == 1 || !query.logtype) {
            path = '/pages/login/onekeyLogin'
        }
        if (query.logtype == 2) {
            path = '/pages/login/login'
        }
        const route = {
            path,
            query
        } as any
        
        if (query.retainPage == 1 && query.logtype != 2) {
            return pageController.push(route)
        }else if (query.retainPage == 1 && query.logtype == 2){
            return pageController.replace(route)
        }else{
            return pageController.reLaunch(route)
        }

    }else{
        // 处理手机号码登录
        if (query.logtype == 2) {
            path = '/pages/login/login'

            const route = {
                path,
                query
            } as any
            return pageController.reLaunch(route)
        }
        if (query.logtype == 1 || !query.logtype) {

            const route = {
                path : '/pages/login/login',
                query: { logtype: 2 }
            } as any
            return pageController.reLaunch(route)
            
            appLogins(()=>{
                console.log('app一键登录');
            })
        }

    }

    

    

}

/** 跳转到 首页 */
export const gotoIndex = () => {
    // path: '/pages/index/index'
    const route = {
        path: '/IndexPage/pages/index/index'
    } as any

    console.log('route.path',route.path);
    
    return pageController.reLaunch(route)
}

/** 跳转到 用户协议 */
export const gotoAgreement = (type: string) => {
    const route = {
        path: '/pages/public/rich-html',
        query: { type }
    }
    return pageController.push(route)
}

/** 跳转到 升级页 */
export const gotoUpdate = () => {
    const route = {
        path: '/pages/my/update',
        query: {}
    }
    return pageController.push(route)
}

/** 跳转到 设置 */
export const gotoSetting = () => {
    const route = {
        path: '/pagesUser/pages/setting/setting'
    } as any
    return pageController.push(route)
}

/** 通用设置 */
export const gotonotice = () => {
    const route = {
        path: '/pagesUser/pages/notice/notice'
    } as any
    return pageController.push(route)
}

/** 隐私管理 */
export const gotoPrivacySetting = () => {
    const route = {
        path: '/pagesUser/pages/privacySetting/privacySetting'
    } as any
    return pageController.push(route)
}

/** 举报管理 */
export const gotoReportList = () => {
    const route = {
        path: '/pagesUser/pages/reportList/reportList'
    } as any
    return pageController.push(route)
}

/** 举报管理 */
export const gotoReportDetail = (query: any) => {
    const route = {
        path: '/pagesUser/pages/reportList/reportDetail',
        query
    } as any
    return pageController.push(route)
}

/** 关于乐悠 */
export const gotoAboutLeyou = () => {
    const route = {
        path: '/pagesUser/pages/aboutleyou/aboutleyou'
    } as any
    return pageController.push(route)
}