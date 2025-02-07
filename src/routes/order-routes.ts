import { pageController } from '@bc/uni-tools'

/**
 *
 * 订单相关路由
 *
 */

// 订单管理列表
export const gotoorderList = (typeIndex:number = 0) => {
    const route = {
        path: '/pagesOrder/pages/orderList/orderList',
        query: {
            typeIndex
        }
    } as any
    return pageController.push(route)
}


/**
 * itemId ==> 表示订单id
 * isdel ==> 表示路由切换模式
 *
 */

// 服务订单详情
export const gotoOrderDetail = (itemId:string, isdel:boolean = false) => {
    const route = {
        path: '/pagesOrder/pages/service/orderDetail/serviceOrderDetail',
        query: { itemId }
    }as any
    return isdel ? pageController.replace(route) : pageController.push(route)
}


/**
 * itemId ==> 表示订单id
 * isdel ==> 表示路由切换模式
 *
 */

// 适品订单详情
export const GoodsOrderDetail = (itemId:string, isdel:boolean = false) => {
    const route = {
        path: '/pagesOrder/pages/goodsOrderDetail/goodsOrderDetail',
        query: { itemId }
    }as any
    return isdel ? pageController.replace(route) : pageController.push(route)
}

// 服务下单结算
export const gotoBalanceOrder = (uniqueId:any, handle:number = 1) => {
    const route = {
        path: '/pagesOrder/pages/balanceOrder/balanceOrder',
        query: { uniqueId, handle }
    }as any
    return pageController.push(route)
}

// 商品下单结算
export const gotoBalanceGood = (uniqueId:any) => {
    const route = {
        path: '/pagesOrder/pages/balanceGoods/balanceGoods',
        query: { uniqueId }
    }as any
    return pageController.push(route)
}

// 课程下单结算
export const gotoBalanceCourse = (itemId:string) => {
    const route = {
        path: '/pagesOrder/pages/balanceOrder/balanceCourse',
        query: { itemId }
    }as any
    return pageController.push(route)
}

// 课程订单详情
export const courseOrderDetail = (orderId:string) => {
    const route = {
        path: '/pagesOrder/pages/courseOrderDetail/courseOrderDetail',
        query: { orderId }
    }as any
    return pageController.push(route)
}

// 康养订单退款
export const torefundOrder = (query:any) => {
    const route = {
        path: '/pagesOrder/pages/refundOrder/refundOrder',
        query
    }as any
    return pageController.push(route)
}



/**
 * 商品订单退款
 * 接收订单中 商品整个单品对象(临时对象)
 *
 */
export const gotorefundShopOrder = (query:any) => {
    const route = {
        path: '/pagesOrder/pages/refundOrder/refundGoodsOrder',
        query
    }as any
    return pageController.push(route)
}


/**
 * 积分商品兑换记录详情
 *
 */
export const gotoexchangeDetail = (query:any) => {
    const route = {
        path: '/pagesOrder/pages/exchangeDetail/exchangeDetail',
        query
    }as any
    return pageController.push(route)
}

/**
 * 适品退款详情
 *
 *
 */
export const gotorefundDetail = (query:any) => {
    const route = {
        path: '/pagesOrder/pages/refundDetail/refundDetail',
        query
    }as any
    return pageController.push(route)
}


/* 跳转到 开具发票 */
export const gotoInvoice = (query: any) => {
    const rotue = {
        path: "/pagesOrder/pages/invoice/invoice",
        query
    } as any
    return pageController.push(rotue)
}

/* 跳转到 发票详情 */
export const gotoInvoiceDetails = (query: { id: number }) => {
    const rotue = {
        path: "/pagesOrder/pages/invoice/invoiceDetails",
        query
    } as any
    return pageController.push(rotue)
}

/** 跳转到 开票记录 */
export const gotoInvoiceHistory: any = () => {
    const route = {
        path: '/pagesOrder/pages/invoice/invoiceHistory',
        query: {}
    }
    return pageController.push(route)
}
