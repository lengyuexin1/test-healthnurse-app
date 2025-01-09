import { pageController } from '@bc/uni-tools'

/**
 * 
 * 康养相关路由
 * 
 */


export const gotoserviceDetail = (itemId: string) => {
    console.log('没有服务详情界面');
    return

    const route = {
        path: '/Service/pages/serviceDetail/serviceDetail',
        query: { itemId }
    } as any
    return pageController.push(route)
}

export const gotoShopDetail = (shopId: string) => {
    const route = {
        path: '/Mall/pages/shop/shopDetail',
        query: { shopId }
    } as any
    return pageController.push(route)
}


/**
 * 机构相关
 * 
 * 
 */

// 乐悠机构详情
export const gotoServiceStore = (query:any) => {
    const route = {
        path: '/Service/pages/Servicestore/ServicestoreDetail',
        query
    } as any
    return pageController.push(route) 
}



// 超值券详情
export const voucherDetails = (query:any) => {
    const route = {
        path: '/Service/pages/Servicestore/voucherDetails',
        query
    } as any
    return pageController.push(route) 
}

// 乐悠产品详情
export const gotohealthproductDetails = (query:any) => {
    const route = {
        path: '/Service/pages/Servicestore/healthproductDetails',
        query
    } as any
    return pageController.push(route) 
}

// 机构以及产品评论列表
export const serviceComment = (id:string,son:number = 1) => {
    const route = {
        path: '/Service/pages/Servicestore/serviceComment',
        query:{
            id,
            son
        }
    } as any
    return pageController.push(route) 
}

// 机构图集列表
export const toimgInstitution = (query:any) => {
    const route = {
        path: '/Service/pages/Servicestore/imgInstitution',
        query
    }as any
    return pageController.push(route) 
}

// 机构列表内页
export const toInnerPage = (query:any) => {
    const route = {
        path: '/Service/pages/InnerPage/InnerPage',
        query
    }as any
    return pageController.push(route) 
}




/**
 * 搜索相关
 * 
 * searchText 携带的关键词进入搜索页
 * tosearch 是否进入就直接搜索 1 是 0 否
 * 
 */
export const gotosearch = (query?:any) => {
    const route = {
        path: '/Service/pages/search/search',
        query
    } as any
    return pageController.push(route)
}

/**
 * 康养屯 康养服务页面
 */
export const gotoserviceLnnerPage = (query:any) => {
    const route = {
        path: '/Service/pages/InnerPage/serviceLnnerPage',
        query
    } as any
    return pageController.push(route)
}

/**
 * 康养屯 康养服务子页面
 */
 export const gotoserviceLnnerSonPage = (query:any) => {
    const route = {
        path: '/Service/pages/InnerPage/serviceLnnerSonPage',
        query
    } as any
    return pageController.push(route)
}

/**
 * 老播会
 * 
 */
export const gotoServiceExpo = () => {
    const route = {
        path: '/Service/pages/serviceExpo/serviceExpo',
        query: {}
    } as any
    return pageController.push(route)
}

/**
 * 扫码跳转
 * 
 */
export const gotoScanCode = (path:any,query:any) => {
    const route = {
        path,
        query
    } as any

    console.log('route',route);
    

    return pageController.push(route)
}

/**
 * 直播精选
 * 
 */
export const gotoLiveSelection = () => {
    const route = {
        path: '/Service/pages/liveSelection/liveSelection',
        query: {}
    } as any
    return pageController.push(route)
}
