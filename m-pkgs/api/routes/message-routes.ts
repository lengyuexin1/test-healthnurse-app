import { pageController } from '@bc/uni-tools'



//===============================================================
/** 消息相关路由 */
//===============================================================


/** 跳转到 聊天页面 */
export const gotoChatPage = (to: string, label: string, tag?:string) => {
    const route = {
        path: '/IndexPage/pages/chat/chat-container',
        query: { to, label, tag }
    } as any
    return pageController.push(route)
}

/** 简历详情 */
export const gotoresumedetails = (workerId: string) => {
    const route = {
        path: '/pages/resume/resume',
        query: { workerId }
    } as any
    return pageController.push(route)
}

/** 订单详情 */
export const gotoOrderdetails = (orderId: string) => {
    const route = {
        path: '/pages/order/order',
        query: { orderId }
    } as any
    return pageController.push(route)
}

/** 物流信息 */
export const gotologistics = (orderId: string) => {
    const route = {
        path: '/pages/logistics/logistics',
        query: { orderId }
    } as any
    return pageController.push(route)
}
