import { pageController } from "@bc/uni-tools"

//===============================================================
/** 首页相关路由 */
//===============================================================

/** 跳转到 频道(泛内容) */
export const gotoChannel = () => {
    const route = {
        path: '/Channel/pages/channel/channel',
        query: {}
    } as any
    return pageController.isTokenPush(route)
}

export const gotoIntelligent = () => {
    const route = {
        path: '/Channel/pages/channel/intelligent',
        query: {}
    } as any
    return pageController.isTokenPush(route)
}

/** 频道文章详情 */
export const gotoArticledetails = (itemId: any, content: string | null = null, taskId: string) => {
    const route = {
        path: '/pagesCnt/pages/articledetails/articledetails',
        query: { itemId, taskId }
    } as any
    // return pageController.isTokenPush(route)
    if (!content) {
        console.log('保存历史记录')

        return pageController.isTokenPush(route)
    }
    else {
        console.log('不保存历史记录')

        return pageController.logingPush(route, content)
    }
}

/** 博主个人中心 */
/**
 * isuser 0不是本人,1是本人
 * accountId 当isuser传入0必传
 * isFans 是否已关注该博主 0未关注 1已关注
 */
interface bloggerQuery {
    isuser: number,
    accountId?: string,
    isFans: number,
}

export const gotobloggerPage = (query: bloggerQuery) => {
    console.log('query', query)

    const route = {
        path: '/Channel/pages/channel/bloggerPage',
        query
    } as any

    return pageController.isTokenPush(route)
}

/** 关注/粉丝列表 */
/**
 * query传入
 * type  1关注列表,2粉丝列表
 * isuser 0不是本人,1是本人
 * accountId 当isuser传入0必传
 *
 */
interface dataQuery {
    type: number,
    isuser: number,
    accountId?: string
}

export const gotodataManage = (query: dataQuery) => {
    const route = {
        path: '/Channel/pages/channel/dataManage',
        query
    } as any

    return pageController.isTokenPush(route)
}


/** 机构详情 */
export const gotochoiceDetails = (itemId: any, isAd: any = 0, tologin = false) => {
    const route = {
        path: '/Channel/pages/orderConfirm/choiceDetails',
        query: { itemId, isAd }
    } as any
    if (!tologin) {
        return pageController.isTokenPush(route)
    }
    else {
        return pageController.logingPush(route, '请先登录')
    }
}
/** 产品详情 */
export const gotoproductDetails = (itemId: any, shopId: any, shopName: any, tologin = false) => {
    const route = {
        path: '/Channel/pages/orderConfirm/productDetails',
        query: { itemId, shopId, shopName }
    } as any
    if (!tologin) {
        return pageController.isTokenPush(route)
    }
    else {
        return pageController.logingPush(route, '请先登录')
    }
}
/**机构文字详情 */
export const gototextInstitution = (itemId: any) => {
    const route = {
        path: '/pagesService/pages/Servicestore/setUpTextDetails',
        query: { itemId }
    } as any
    return pageController.push(route)
}
/**机构图集 */
export const gotoimgdetails = (itemId: any) => {
    const route = {
        path: '/Channel/pages/orderConfirm/imgInstitution',
        query: { itemId }
    } as any
    return pageController.isTokenPush(route)
}
/** 康养详情 */
export const gotohealthDetails = (itemId: any, isAd: any = 0, tologin = false) => {
    const route = {
        path: '/Channel/pages/orderConfirm/healthDetails',
        query: { itemId, isAd }
    } as any
    if (!tologin) {
        return pageController.isTokenPush(route)
    }
    return pageController.isTokenPush(route)
}
/** 超值券详情 */
export const gotovoucherDetails = (id: any, tologin = false) => {
    const route = {
        path: '/Channel/pages/orderConfirm/voucherDetails',
        query: { id }
    } as any
    if (!tologin) {
        return pageController.isTokenPush(route)
    }
    return pageController.isTokenPush(route)
}
/** 康养产品详情*/
export const gotohealthproductDetails = (itemId: any, tologin = false) => {
    const route = {
        path: '/Channel/pages/orderConfirm/healthproductDetails',
        query: { itemId }
    } as any
    if (!tologin) {
        return pageController.isTokenPush(route)
    }
    return pageController.isTokenPush(route)
}
/** 康养产品评论 */
// son ： 2产品的评论 1整个机构的评论

export const gotohealthComment = (itemId: any, son = 1) => {
    const route = {
        path: '/Channel/pages/orderConfirm/healthComment',
        query: { itemId, son }
    } as any
    return pageController.isTokenPush(route)
}


/** 重新加载 */
export const reLaunchIndex = () => {
    const route = {
        path: '/pages/index/index',
        query: {}
    } as any
    return pageController.reLaunch(route)
}

/** 跳转到 搜索 */
export const gotoSearch = (key?: string, type?: number) => {
    const route = {
        path: '/Mall/pages/search/search',
        query: {
            key: key,
            type: type //1 直接搜索 ，null 待搜索
        }
    } as any
    return pageController.push(route)
}

/** 跳转到 消息 */
export const gotoMessage = () => {
    const route = {
        path: '/pages/message/message',
        query: {}
    } as any
    return pageController.push(route)
}
/** 跳转到 搜索 */
export const gotoShip = (key?: string, type?: number) => {
    const route = {
        path: '/Mall/pages/serviceCategory/goodsCategory',
        query: {
            key: key,
            type: type //1 直接搜索 ，null 待搜索
        }
    } as any
    return pageController.isTokenPush(route)
}
