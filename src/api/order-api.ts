import { http } from "@bc/api"
import type {
    _v1_bc_api_aftersale_afterConsent_post_req,
    _v1_bc_api_aftersale_applyRefund_post_req,
    _v1_bc_api_aftersale_close_post_req,
    _v1_bc_api_aftersale_reason_list_get_req,
    _v1_bc_api_aftersale_record_list_get_req,
    _v1_bc_api_aftersale_spt_add_post_req,
    _v1_bc_api_aftersale_spt_addExpress_post_req,
    _v1_bc_api_aftersale_spt_againAdd_post_req,
    _v1_bc_api_aftersale_sptApiDetails_get_req,
    _v1_bc_api_aftersale_sptApiList_post_req,
    _v1_bc_api_aftersale_sptApplyFor_arbitration_post_req,
    _v1_bc_app_cart_purchase_view_get_req,
    _v1_bc_app_coupon_collect_post_req,
    _v1_bc_app_coupon_use_list_post_req,
    _v1_bc_app_coupon_use_platform_post_req,
    _v1_bc_app_kuaidi_express_company_list_get_req,
    _v1_bc_app_order_after_saleable_list_post_req,
    _v1_bc_app_order_cancel_post_req,
    _v1_bc_app_order_cardRefund_post_req,
    _v1_bc_app_order_create_post_req,
    _v1_bc_app_order_detail_get_req,
    _v1_bc_app_order_list_post_req,
    _v1_bc_app_order_purchase_view_get_req,
    _v1_bc_app_payment_check_pay_result_post_req,
    _v1_product_app_order_confirm_receive_post_req,
    _v1_product_app_order_create_post_req,
    _v1_product_app_order_delay_receive_post_req,
    _v1_product_app_order_modify_post_req,
    _v1_product_app_order_price_calculation_post_req
} from "@bc/api/types/order/api-types"
import type { _v1_bc_app_shop_getBaseInfo_get_req } from "@bc/api/types/user/api-types"

const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv


/**
 * 订单类型api
 *
 */

/**
 * 服务订单、商品订单数量
 * */
export const getordercount = (kind: string) => {
    return http.order.get('/v1/bc/app/order/count', { kind })
}

export const getserviceOrderList = (req:_v1_bc_app_order_list_post_req) => {
    return http.order.post('/v1/bc/app/order/list', req)
}

export const getserviceOrderDetail = (req:_v1_bc_app_order_detail_get_req) => {
    return http.order.get('/v1/bc/app/order/detail', req)
}

export const takeCoupon = (req:_v1_bc_app_coupon_collect_post_req) => {
    return http.order.post('/v1/bc/app/coupon/collect', req)
}

// 获取订单配置(非购物车)
export const orderEntityConfig = (req:_v1_bc_app_order_purchase_view_get_req) => {
    return http.order.get('/v1/bc/app/order/purchase/view', req)
}

// 获取订单配置(购物车)
export const cartEntityConfig = (req:_v1_bc_app_cart_purchase_view_get_req) => {
    return http.order.get('/v1/bc/app/cart/purchase/view', req)
}

export const getBaseInfo = (req:_v1_bc_app_shop_getBaseInfo_get_req) => {
    return http.user.get('/v1/bc/app/shop/getBaseInfo', req)
}

/** 下单的店铺优惠卷 */
export const getCouponGranted = (req:_v1_bc_app_coupon_use_list_post_req) => {
    return http.order.post('/v1/bc/app/coupon/use/list', req)
}

/** 下单的平台优惠券 */
export const getPlatCoupon = (req:_v1_bc_app_coupon_use_platform_post_req) => {
    return http.order.post('/v1/bc/app/coupon/use/platform', req)
}


/** 下单计算价格 */
export const goodsCalculation = (req:_v1_product_app_order_price_calculation_post_req) => {
    return http.order.post('/v1/product/app/order/price/calculation', req)
}


/**
 * 创建订单
 */

/** 获取订单配置 */
export const getOrderEntityConfig = (optionId: string, isCard?: boolean) => {
    if (isCard) {
        return http.order.get('/v1/bc/app/cart/purchase/view', { entityId: optionId })
    }

    return http.order.get('/v1/bc/app/order/purchase/view', { optionId })
}


/* 服务 - 下单 */
export const createOrder = async (req: _v1_bc_app_order_create_post_req) => {
    return http.order.post('/v1/bc/app/order/create', req)
}

/** 机构下单 */
export const cardCreateOrder = async (req: _v1_bc_app_order_cardCreate_post_req) => {
    return http.order.post('/v1/bc/app/order/cardCreate', req)
}

/** 适品下单 */
export const submitOrder = async (req:_v1_product_app_order_create_post_req) => {
    return http.order.post('/v1/product/app/order/create', req)
}


/** 订单支付 微信小程序/App */
export const houseOrderPay = async (req: any) => {
    // #ifdef MP-WEIXIN
    // return http.order.post('/v1/bc/app/payment/wechat/pay', req) // 微信

    // if (WEB_ENV == 'test') {
    //     return http.order.post('/v1/bc/app/payment/cpcn/wechat/pay', req) // 微信中金
    // }
    return http.order.post('/v1/bc/app/payment/cpcn/wechat/pay', req) // 微信中金
    // #endif
    // #ifdef APP-PLUS
    // return http.order.post('/v1/bc/app/payment/cpcn/wechat/app/pay', req)// APP中金
    return http.order.post('/v1/bc/app/payment/wechat/app/pay', req)// 微信
    // #endif
}



/** 订单支付结果 */
export const housePayResult = (req:_v1_bc_app_payment_check_pay_result_post_req) => {
    return http.order.post('/v1/bc/app/payment/check/pay/result', req)
}

/** 云课堂下单 */
export const courseCreate = (req:any) => {
    return http.order.post('/v1/bc/app/order/courseCreate', req)
}

/** 订单取消原因 */
export const getAftersaleReason = (req:_v1_bc_api_aftersale_reason_list_get_req) => {
    return http.order.get('/v1/bc/api/aftersale/reason_list', req)
}

/** 整个订单取消 */
export const houseOrderCancel = (req:_v1_bc_app_order_cancel_post_req) => {
    return http.order.post('/v1/bc/app/order/cancel', req)
}

/** 订单实体取消 */
export const applyRefund = (req:_v1_bc_api_aftersale_applyRefund_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/applyRefund', req)
}

/** 机构订单退款 */
export const cardRefund = (req:_v1_bc_app_order_cardRefund_post_req) => {
    return http.order.post('/v1/bc/app/order/cardRefund', req)
}



/**
 *
 * 售后类型
 * */


// 可申请售后
export const saleableList = (req:_v1_bc_app_order_after_saleable_list_post_req) => {
    return http.order.post('/v1/bc/app/order/after/saleable/list', req)
}


// 售后中/售后记录
export const sptApiList = (req:_v1_bc_api_aftersale_sptApiList_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/sptApiList', req)
}

// 关闭售后
export const closeAftersale = (req:_v1_bc_api_aftersale_close_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/close', req)
}

// 售后确认收货
export const afterConsent = (req:_v1_bc_api_aftersale_afterConsent_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/afterConsent', req)
}

// 获取物流公司
export const expressCompany = (req:_v1_bc_app_kuaidi_express_company_list_get_req) => {
    return http.order.get('/v1/bc/app/kuaidi/express/company/list', req)
}

// 售后退货添加物流信息
export const addExpress = (req:_v1_bc_api_aftersale_spt_addExpress_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/spt/addExpress', req)
}

// 售后详情(记录列表)
export const getSaleLog = (req:_v1_bc_api_aftersale_record_list_get_req) => {
    return http.order.get('/v1/bc/api/aftersale/record_list', req)
}

// 最后一次售后详情
export const getSaleDetail = (req:_v1_bc_api_aftersale_sptApiDetails_get_req) => {
    return http.order.get('/v1/bc/api/aftersale/sptApiDetails', req)
}

// 再次售后
export const saleAgainAdd = (req:_v1_bc_api_aftersale_spt_againAdd_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/spt/againAdd', req)
}

// 修改售后/申请售后
export const applyAftersale = (req:_v1_bc_api_aftersale_spt_add_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/spt/add', req)
}

// 申请仲裁
export const sptApplyFor = (req:_v1_bc_api_aftersale_sptApplyFor_arbitration_post_req) => {
    return http.order.post('/v1/bc/api/aftersale/sptApplyFor/arbitration', req)
}

// 延迟收货
export const delayReceive = (req:_v1_product_app_order_delay_receive_post_req) => {
    return http.order.post('/v1/product/app/order/delay/receive', req)
}

// 订单确认收货
export const confirmReceipt = (req:_v1_product_app_order_confirm_receive_post_req) => {
    return http.order.post('/v1/product/app/order/confirm/receive', req)
}

// 商品订单修改地址
export const editGodsOrder = (req:_v1_product_app_order_modify_post_req) => {
    return http.order.post('/v1/product/app/order/modify', req)
}
// 商品订单修改地址
export const editOrderModify = (req:_v1_bc_app_order_modify_post_req) => {
    return http.order.post('/v1/bc/app/order/modify', req)
}
// 商品订单修改地址
export const getQrCodeCreate = (req:_v1_bc_app_QRCode_create_post_req) => {
    return http.order.post('/v1/bc/app/QRCode/create', req)
}

// 积分商品兑换详情
export const integralOrderDetail = (req:any) => {
    return http.content.get('/v1/bc/app/integral_product/order/detail', req)
}

// 积分商品确认收货
export const confirmReceive = (req:any) => {
    return http.content.post('/v1/bc/app/integral_product/order/confirmReceive', req)
}

// 适品退款详情
export const sptDetailsByEntityId = (req:any) => {
    return http.order.get('/v1/bc/company/aftersale/sptDetailsByEntityId', req)
}



