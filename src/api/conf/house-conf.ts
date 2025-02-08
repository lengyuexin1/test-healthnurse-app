
import { apiPrefix } from '@/api/api-config'

/** 服务 */
export const HOUSE_API = {
    houseType: `${apiPrefix.order}/public/app/item/type`,
    houseDetail: `${apiPrefix.order}/public/app/item/detail`,
    houseOption: `${apiPrefix.order}/public/app/item/option_list`,
    houseCreate: `${apiPrefix.order}/app/order/create`,
    patientDetail: `${apiPrefix.order}/app/order/patient/detail`, //照护人档案详情
    houseOrderDetail: `${apiPrefix.order}/app/order/detail`,
    houseOrderListL: `${apiPrefix.order}/app/order/list`,
    houseEditOrder: `${apiPrefix.order}/app/order/modify`,
    houseSaleClose: `${apiPrefix.order}/api/aftersale/close`,
    houseSaleType: `${apiPrefix.order}/api/aftersale/type_list`,
    houseSaleReason: `${apiPrefix.order}/api/aftersale/reason_list`,
    houseSaleAdd: `${apiPrefix.order}/api/aftersale/add`,
    houseSaleDetail: `${apiPrefix.order}/api/aftersale/detail`,
    houseRecordList: `${apiPrefix.order}/api/aftersale/record_list`,

    houseOrderPay: `${apiPrefix.order}/app/payment/cpcn/wechat/pay`, //支付小程序
    houseAppOrderPay: `${apiPrefix.order}/app/payment/cpcn/wechat/app/pay`, //中金支付APP
    // houseOrderPay: `${apiPrefix.order}/app/payment/wechat/pay`, //微信支付小程序
    // houseAppOrderPay: `${apiPrefix.order}/app/payment/wechat/app/pay`, //微信支付APP

    houseOrderCancel: `${apiPrefix.order}/app/order/cancel`,
    houseOrderNotify: `${apiPrefix.order}/app/payment/notify`,
    housePayResult: `${apiPrefix.order}/app/payment/check/pay/result`,
    houseCalculation: `${apiPrefix.order}/app/order/price/calculation`,

    houseCommentSave: `${apiPrefix.user}/api/comment/save`,
    houseCommentDelete: `${apiPrefix.user}/api/comment/delete`,
    hospitalList: `${apiPrefix.order}/public/hospital/list`,

    resumeDetail: `${apiPrefix.user}/app/resume/shop/detail`,

    getOrderKind: `${apiPrefix.order}/admin/order/kind`, //判断订单类型

    cardCreate: `${apiPrefix.order}/app/order/cardCreate`, //创建机构订单
    cardRefund: `${apiPrefix.order}/app/order/cardRefund` //机构订单申请退款

}

export const COMMON_API = {
    recommendBc9Option: `${apiPrefix.order}/app/item_option/list_by_type_id`,
    recommendBc1OptionJava: `${apiPrefix.order}/app/option/list_by_type_id`
}

// 多次使用订单的立即使用
export const CREAD_API = {
    usenow: `${apiPrefix.order}/app/order/use_now`,
    getusenowList: `${apiPrefix.order}/app/order/sub_order/list`
}
