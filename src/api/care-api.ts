import { http } from "@bc/api"
import { INVOICE_API, SERVICE_API } from "./conf/care-conf.js"


/** 申请发票 */
export const addInvoice = async (params: any) => {
    return http.order.post(INVOICE_API.addInvoice, params)
}

/** 发票详情 */
export const invoiceDetail = async (params: { id: number }) => {
    return http.order.get(INVOICE_API.invoiceDetail, params)
}

/** 发票列表 */
export const invoiceList = async (params: any) => {
    return http.settlement.post(INVOICE_API.invoiceList, params)
}

/** 取消开票 */
export const cancelInvoice = async (params: { id: number }) => {
    return http.order.post(INVOICE_API.cancelInvoice, params)
}

/* 获取子区域列表 */
export const getAreaList = async (parentId: number) => {
    return http.user.get('/v1/bc/app/district/getSonList', { parentId }) as Promise<[]>
}
import { PromiseProvider } from "@/libs/provider"
const areaData = new PromiseProvider<[]>().setCallback(() => {
    return getAreaList(440100)
})

export const getAreaDict = async () => {
    return areaData.getData()
}
/** 区分小程序获取类目 二级类目 */
export const getCategoryShowList = (req: any) => {
    return http.order.get('/v1/bc/public/app/category_show/list', req)
}

/* 计算价格 */
export const getCalculation = async (req: any) => {
    return http.order.post('/v1/bc/app/order/price/calculation', req) as Promise<any>
}


/** 获取支付店铺的优惠券 */
export const getCouponGranted = (params: any) => {
    return  http.order.post('/v1/bc/app/coupon/use/list', params) as Promise<any>
}
/** 获取支付平台的优惠券 */
export const getPlatCoupon = (params: any) => {
    return http.order.post('/v1/bc/app/coupon/use/platform', params) as Promise<any>
}
/* 服务列表 */
export const getSerListAll = (params: any) => {
    return http.post('api/search/v1/bc/public/es/item/list', params) as Promise<[]>
}

export const getswiperList = async (placementLocation: number) => {
    return http.order.get('/v1/bc/public/app/activity/list', { placementLocation })
}

//================================================================================
/** 营销活动 */
//================================================================================
/* 超值购，品牌馆列表数据 */
export const getactiviList = async (id: number) => {
    return http.get('api/order/v1/bc/public/app/activity/detail', { id })
}
