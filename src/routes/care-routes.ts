import { pageController }  from '@bc/uni-tools'



interface ICommentListQuery {
    orderid: string
    score: string
    shopId?: string
}

interface IHandleSuccessQuery {
    orderId: string
    payChannelId: string
}

interface IOrderConfirmQuery {
    order_id: number
    entity_id: number
    paypath?: number
}

interface IPlayBillQuery {
    deploy: string
    sharid: number
}



interface IAfterSalesDetailsQuery {
    id: number
    item_id: number
    genre: number
}


interface INurseDetailQuery {
    id: number
}


//===============================================================
/** 照护相关路由 */
//===============================================================

interface ISerDetaQuery {
    /* 服务id */
    itemId: string
    /** 陪诊医院信息 */
    hospital?: string
}
/**
 * 跳转到被照护人情况
 **/
export const gotoSituation = (query: ISerDetaQuery) => {
    const route = {
        path: '/Mall/pages/service/situation',
        query
    } as any
    return pageController.push(route)
}
/**
 * 跳转到被照护人信息
 **/
export const gotoMentInfo = (query: ISerDetaQuery) => {
    const route = {
        path: '/Mall/pages/service/assessmentInfo',
        query
    } as any
    return pageController.push(route)
}
/**
 * 跳转到被照护人信息
 **/
export const gotoCaregiver = (query: ISerDetaQuery) => {
    const route = {
        path: '/Mall/pages/service/caregiver',
        query
    } as any
    return pageController.push(route)
}
/**
 * 跳转到选择服务人员
 **/
export const gotoServicePersonal = (query: ISerDetaQuery) => {
    const route = {
        path: '/Mall/pages/service/servicePersonal',
        query
    } as any
    return pageController.push(route)
}

/**
 * 跳转到 照护详情
 **/
export const gotoServeDetail = (query: ISerDetaQuery) => {
    const route = {
        path: '/Mall/pages/service/serviceProject',
        query
    } as any
    return pageController.push(route)
}
/**
 * 跳转到 签到红包提现
 **/
export const gotoWithdrawall = (rewardId: number) => {
    const route = {
        path: '/Channel/pages/redEnvelope/withdrawal',
        query: { rewardId }
    } as any
    return pageController.push(route)
}
/**
 * 跳转到 推广详情
 **/
export const gotoWithdrawalWallet = () => {
    const route = {
        path: '/Channel/pages/redEnvelope/withdrawalWallet',
        query: {  }
    } as any
    return pageController.push(route)
}
export const gotoTaskRecord = (rewardId: number) => {
    const route = {
        path: '/Channel/pages/redEnvelope/taskRecord',
        query: { rewardId }
    } as any
    return pageController.push(route)
}
/** 跳转到 收益提现 */
export const gotowithdrawalIncome = (query: any) => {
    const route = {
        path: '/Channel/pages/redEnvelope/withdrawalIncome',
        query
    } as any
    return pageController.push(route)
}
/** 跳转到 活动规则 */
export const gotoctivityRules = (query: ISerDetaQuery) => {
    const route = {
        path: '/Channel/pages/redEnvelope/activityRules',
        query
    } as any
    return pageController.push(route)
}
/** 跳转到 照护首页 */
export const gotoServeSwiper = (parentId: number, typeId: number, activityId: number, colnum: number, title: string, hotTag: any, taskId?:number) => {
    const route = {
        path: '/pagesMall/pages/service/serviceTab',
        query: { parentId, typeId, activityId, colnum, title, hotTag, taskId }
    } as any
    return pageController.push(route)
}
/** 适老改造首页  */
export const gotoChangeTab = (parentId: number, typeId: number, activityId: number) => {
    const route = {
        path: '/Mall/pages/service/changeTab',
        query: { parentId, typeId, activityId }
    } as any
    return pageController.push(route)
}
/** 找机构 */
export const gotoChoiceHospital = (templateId: any) => {
    const route = {
        path: '/Channel/pages/orderConfirm/choiceHospital',
        query: { templateId }
    } as any
    return pageController.push(route)
}



/** 改造专区 */
export const gotoRenovationpage = () => {
    const route = {
        path: '/Mall/pages/service/Renovationpage',
        query: { test: 132 }
    } as any
    return pageController.isTokenPush(route)
}
/** 跳转到 评论列表 */
export const gotoCommentList = (query: ICommentListQuery) => {
    const route = {
        path: '/User/pages/comment/serveCommentList',
        query
    } as any
    return pageController.push(route)
}


/** 跳转到 支付成功 */
export const gotoHandleSuccess = (query: IHandleSuccessQuery, type?: string) => {
    const route = {
        path: '/Order/pages/handleSuccess/handleSuccess',
        query
    } as any

    if (type == 'replace') { return pageController.replace(route) }

    return pageController.push(route)
}

/** 跳转到 订单确认 */
export const gotoOrderConfirm = (orderId: string, type?: string) => {
    /* const route = {
        path: '/Order/pages/confirmOrder/confirmOrder',
        query: { orderId }
    } as any
    if (type == 'replace') { return pageController.replace(route) }
    return pageController.push(route) */
}


/* 跳转到 福利中心（福利中心切换为邀请新人） */
export const gotoWelfare = () => {
    // /User/pages/invitation/invitation  邀请新人
    // /User/pages/welfare/welfare  福利中心
    const route = {
        path: '/User/pages/invitation/invitation',
        query: {}
    } as any
    // return pageController.isTokenPush(route)
    return pageController.push(route)
}

/** 跳转到 优惠券 */
export const gotoCoupon = () => {
    const route = {
        path: '/User/pages/coupon/coupon',
        query: {}
    } as any
    return pageController.push(route)
}


/** 重定向到 首页 */
export const gotoIndex = () => {
    const route = {
        path: '/pages/daybreak/daybreak',
        query: {}
    } as any
    return pageController.replace(route)
}
/**  */
export const loginToIndex = () => {
    const route = {
        path: '/pages/daybreak/daybreak',
        query: {}
    } as any
    return pageController.isTokenPush(route)
}


/** 频道重定向回首页 */
export const gobackIndex = (tabids: number, taskId:number) => {
    const route = {
        path: '/pages/daybreak/daybreak',
        query: { tabids, taskId }
    } as any
    return pageController.reLaunch(route)
}

/** 跳转到 生成海报 */
export const gotoPlayBill = (query: IPlayBillQuery) => {
    const route = {
        path: '/User/pages/playbill/playbill',
        query
    } as any
    return pageController.push(route)
}
/** 跳转到 生成海报 */
export const gotoInvitation = (query: any) => {
    const route = {
        path: '/User/pages/invitation/activityRules',
        query
    } as any
    return pageController.push(route)
}
/** 跳转到 活动规则 */
// export const gotoPlayBill = (query: IPlayBillQuery) => {
//     const route = {
//         path: '/User/pages/playbill/playbill',
//         query
//     } as any
//     return pageController.push(route)
// }


interface IPatientEditQuery {
    /* 档案id */
    id?: number
    /* 0新增 1编辑 */
    type: 0 | 1
    /* 编辑档案下标 */
    index?: number
}

/** 跳转到 新建/编辑照护人档案 */
export const gotoPatientEdit = (query: IPatientEditQuery) => {
    const route = {
        path: "/User/pages/ElderlyFiles/ElderlyDetail",
        query
    } as any
    return pageController.push(route)
}


/** 跳转到 护工详情 */
export const gotoNurseDetail = (query: INurseDetailQuery) => {
    const route = {
        path: '/Worker/pages/nurse/nurseDetail',
        query
    } as any
    return pageController.push(route)
}


// import { gotochoiceDetails, gotohealthDetails } from '@/route/plateform-routes'
// /* 店铺类型 2：服务 3：商品 12：机构 13：康养 */
// type TShopApply = 2 | 3 | 12 | 13

// /** 跳转到 店铺详情 */
// export const gotoAttendShop = (id: string, applyId?: TShopApply) => {
//     if (applyId === 12) {
//         return gotochoiceDetails(id)
//     }
//     if (applyId === 13) {
//         return gotohealthDetails(id)
//     }
//     const route = {
//         path: '/Mall/pages/attendShop/attendShop',
//         query: { id }
//     }
//     return pageController.push(route)
// }


/** 跳转到 照护店铺列表 */
export const gotoSellerList = (query: { sortId: string, typeName?: string, typeId: string, item?: string, parentId: number, taskId?:number }) => {
    const route = {
        path: '/Mall/pages/attendShop/attendShopList',
        query
    }
    return pageController.push(route)
}

/** 跳转到 照护确认订单页
 *  query: { optionId: string, adresMation?: string  }
 * handle： 1默认值表示正常的服务下单，2表示找康养服务下单
 *
 */
export const gotoBalanceOrder = (uniqueId: string, handle = 1, typeId = 1, convenType?:any) => {
    const route = {
        path: '/Order/pages/confirmOrder/balanceOrder',
        query: { uniqueId, handle, typeId, convenType }
    }
    return pageController.isTokenPush(route)
}


/** 跳转到 服务商城
 *  query: { optionId: string, adresMation?: string  }
 */
export const gotoServiceCategory = (parentId: number, typeId: number) => {
    const route = {
        path: '/Mall/pages/serviceCategory/serviceCategory',
        query: { parentId, typeId }
    }
    return pageController.push(route)
}


/** 跳转到 商城分类
 */
export const gotoGoodsCategory = (parentId: number, typeId: number) => {
    const route = {
        path: '/Mall/pages/serviceCategory/goodsCategory',
        query: { parentId, typeId }
    }
    return pageController.push(route)
}

/* 商品分类列表
 * id: 分类id
 * itemName: 分类名称
 * listType: 列表类型 1商品二级分类列表 2新品
*/
export const gotoGoodsTabul = (id: string, itemName: string, listType: number) => {
    const route = {
        path: '/Mall/pages/serviceCategory/goodsTabul',
        query: { id, itemName, listType }
    }
    return pageController.push(route)
}

// 适老改造案例
export const gotoAdaptList = () => {
    const route = {
        path: '/Mall/pages/adapt/adaptList',
        query: {}
    }
    return pageController.push(route)
}

/* 案例详情 */
export const gotoAdaptDetail = (id: string) => {
    const route = {
        path: '/Mall/pages/adapt/adaptDetail',
        query: { id }
    }
    return pageController.push(route)
}


/* 跳转服务人员简历 */
export const gotoWorkerInfo = (id: string, shopId: string) => {
    const route = {
        path: '/Order/pages/workInfo/workInfo',
        query: { id, shopId: shopId }
    }
    return pageController.push(route)
}


/* 使用详情 */
export const gotousageDetails = (query: any) => {
    const route = {
        path: '/Order/pages/usageDetails/usageDetails',
        query
    }
    return pageController.push(route)
}

/* 确认服务 */
export const gotoserviceConfirmed = (query: any) => {
    const route = {
        path: '/Order/pages/serviceConfirmed/serviceConfirmed',
        query
    }
    return pageController.push(route)
}

export const gotoPlatformExplosive = () => {
    const route = {
        path: '/pages/platform/platformExplosive',
        query: {}
    }
    return pageController.push(route)
}

// 康养百科分类
export const gotoScienceAssort = () => {
    const route = {
        path: '/Mall/pages/science/assort',
        query: {}
    }
    return pageController.push(route)
}


export const gotoScienceProduct = (query: { id: string, name: string }) => {
    const route = {
        path: '/Mall/pages/science/product',
        query
    }
    return pageController.push(route)
}
export const gotoScienceDetail = (query: { id: string }) => {
    const route = {
        path: '/Mall/pages/science/productDetail',
        query
    }
    return pageController.push(route)
}

export const gotoCaption = (query: { id: string }) => {
    const route = {
        path: '/Mall/pages/science/caption',
        query
    }
    return pageController.push(route)
}


export const gotoProblem = (query: { id: string }) => {
    const route = {
        path: '/Mall/pages/science/problem',
        query
    }
    return pageController.push(route)
}

// 问题详情 pid:百科id, qid:问题id
export const gotoProblemDetail = (query: { pid: string, qid: string }) => {
    const route = {
        path: '/Mall/pages/science/problemDetail',
        query
    }
    return pageController.push(route)
}
