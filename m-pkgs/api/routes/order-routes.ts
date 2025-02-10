import { pageController } from '@bc/uni-tools'

/**
 *
 * 订单相关路由
 * 组件内跳转
 *
 */


export const gotoOrderDetail = (itemId:string) => {
    const route = {
        path: '/pagesOrder/pages/serviceOrderDetail/serviceOrderDetail',
        query: { itemId }
    }as any
    return pageController.push(route)

}

/** 跳转到 去评价 */
export const gotoComment = (query: any) => {
    const route = {
        path: "/pagesUser/pages/comment/comment",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 去评价 */
export const gotoCommentGoods = (query: any) => {
    const route = {
        path: "/pagesUser/pages/comment/commentGoods",
        query
    } as any
    return pageController.push(route)
}
