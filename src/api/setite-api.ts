import { openHttp, http } from "@bc/api"

/** 页面装饰详情 */
export const setPageBank = (req: any) => {
    return openHttp.get('api/order/v1/bc/public/app/adorn/page/detail', { page: req })
}

// banner列表
export const bannerList = (req: any) => {
    return openHttp.post('api/order/v1/bc/public/app/adorn/banner/list', req)
}

// 导航栏
export const columnList = (req: any) => {
    return openHttp.post('api/order/v1/bc/public/app/adorn/column/list', req)
}

// 装饰类目详情
export const columnDetail = (req: any) => {
    return openHttp.get('api/order/v1/bc/public/app/adorn/column/detail', { id: req })
}

// 产品列表
export const productList = (req: any) => {
    return openHttp.post('api/search/v1/bc/public/es/product/list', req)
}

// 活动详情
export const activeDetailTow = (req: any) => {
    return http.get('api/order/v1/bc/public/app/activity/detail', { id: req })
}

// 活动详情
export const activeDetail = (req: any) => {
    return openHttp.get('api/order/v1/bc/public/app/activity/detail', { id: req })
}

// 优惠券
export const zqCouList = (req: any) => {
    return http.post('api/order/v1/bc/app/coupon/list', req)
}

// 所有栏目
export const allColm = (req: any) => {
    return openHttp.post('api/order/v1/bc/public/app/adorn/column/all', req)
}

// 领取优惠券
export const getCoupon = (req: any) => {
    return http.post('api/order/v1/bc/app/coupon/collect',  req )
}

