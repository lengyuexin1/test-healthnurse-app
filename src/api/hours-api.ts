import { HOUSE_API, COMMON_API, CREAD_API } from "./conf/house-conf"

import { openHttp, http } from "@bc/api"



//================================================================================
/** 家政 */
//================================================================================


/* 下单 */
interface IHouseCreateReq {
    /* 备注 */
    note: string
    /* 优惠券列表 */
    userCouponIds: []
    entity: {
        /* 购物车id */
        entityId?: string
        /* 规格id */
        optionId: string
        /* 数量 */
        quantity: number
    }
    attr: {
        /* 上门时间 */
        utcVisitStart?: string
        /* 地址id */
        addressId?: number
        /* 照护人id */
        patientId?: number
    }
}

/* 编辑订单 */
interface IHouseEditOrderReq {
    orderId: number
    note: string
    utcVisitStart: number
    utcVisitEnd: number
    addressId: number
}



/** 被照护人档案详情 */
export const getPatientDetail = async (req: any) => {
    return http.get(HOUSE_API.patientDetail, req) as Promise<any>
}

/* 服务 - 下单 */
export const goHouseCreate = async (req: IHouseCreateReq) => {
    return http.post(HOUSE_API.houseCreate, req) as Promise<IHouseCreateData>
}

/** 机构下单 */
export const gocardCreate = async (req: any) => {
    return http.post(HOUSE_API.cardCreate, req) as Promise<any>
}

/** 机构申请退款 */
export const cardRefund = async (req: any) => {
    return http.post(HOUSE_API.cardRefund, req)
}


/* 多次使用订单的立即使用 */
export const gouseNow = async (req: any) => {
    return http.post(CREAD_API.usenow, req) as Promise<any>
}

/* 多次使用订单拆分后的订单记录列表 */
export const getuseNowlist = async (req: any) => {
    return http.get(CREAD_API.getusenowList, req) as Promise<any>
}


/* 家政订单列表 */
export const getHouseOrderListL = async (req: any) => {
    return http.post(HOUSE_API.houseOrderListL, req) as Promise<[]>
}


/* 家政订单详情 */
export const getHouseOrderDetail = async (req: any) => {
    return http.get(HOUSE_API.houseOrderDetail, req) as Promise<IOrderDetailData>
}


/* 家政订单编辑 */
export const houseEditOrder = async (req: IHouseEditOrderReq) => {
    return http.post(HOUSE_API.houseEditOrder, req) as Promise<void>
}


/* 家政取消订单 */
export const houseOrderCancel = async (req: any) => {
    return http.post(HOUSE_API.houseOrderCancel, req) as Promise<void>
}


/* 订单支付 微信小程序/App */
export const houseOrderPay = async (req: any) => {
    // #ifdef MP-WEIXIN
    return http.post(HOUSE_API.houseOrderPay, req) as Promise<IHouseOrderPay>
    // #endif
    // #ifdef APP-PLUS
    return javaHttp.post(HOUSE_API.houseAppOrderPay, req) as Promise<IHouseOrderPay>
    // #endif
}


/* 家政订单 支付结果 */
export const housePayResult = async (req: any) => {
    return http.post(HOUSE_API.housePayResult, req) as Promise<IHousePayResult>
}


interface CalculationReq {
    entity: {
        quantity: number
        optionId: string
    }
    userRelCouponIds: []
}
/* 计算价格 */
export const getCalculation = async (req: CalculationReq) => {
    return http.post(HOUSE_API.houseCalculation, req) as Promise<IHouseCalculation>
}


/* 家政订单支付回调 */
export const houseOrderNotify = async (req: any) => {
    return http.post(HOUSE_API.houseOrderNotify, req)
}


/**
 * 获取订单类型
 * @param orderId //订单id
 * @returns 1 | 2 | 3 | 4 // 1[server] 2[mall] 3[卡券/康养] 4[课堂]
 */
export const getOrderKind = (orderId: string) => {
    return http.get(HOUSE_API.getOrderKind, { orderId })
}



/* 取消售后 家政 */
export const houseSaleClose = async (req: any) => {
    return http.post(HOUSE_API.houseSaleClose, req) as Promise<void>
}


/* 家政售后类型 */
export const houseAsleType = async (req: any) => {
    return http.get(HOUSE_API.houseSaleType, req)
}


/* 家政售后原因 */
export const houseSaleReason = async (req: any) => {
    return http.get(HOUSE_API.houseSaleReason, req)
}


/* 申请家政售后 */
export const houseSaleAdd = async (req: any) => {
    return http.post(HOUSE_API.houseSaleAdd, req) as Promise<void>
}


/* 家政 售后详情 */
export const houseSaleDetail = async (req: any) => {
    return http.get(HOUSE_API.houseSaleDetail, req)
}

/* 家政 售后记录 */
export const houseRecordList = async (req: any) => {
    return http.get(HOUSE_API.houseRecordList, req)
}


/* 发布家政评论 */
export const houseCommentSave = async (req: any) => {
    return http.post(HOUSE_API.houseCommentSave, req) as Promise<IHouseCommentSave>
}


/* 删除家政评论 */
export const houseCommentDelete = async (req: any) => {
    return http.post(HOUSE_API.houseCommentDelete, req) as Promise<void>
}


interface BC9OpenitReq {
    query: any
    pageNumber: number
    pageSize: number
}
/* 家政服务推荐规格列表 */
export const getBc9OPtion = async (req: BC9OpenitReq) => {
    return http.post(COMMON_API.recommendBc9Option, req) as Promise<IRecommendBc9Option>
}

/** 获取医院列表 */
export const getHospitalList = (params: any) => {
    return http.post(HOUSE_API.hospitalList, params) as Promise<IHospital>
}


/* 获取服务人员简历 */
export const getResumeDetail = (req: any) => {
    return javaHttp.get(HOUSE_API.resumeDetail, req)
}

