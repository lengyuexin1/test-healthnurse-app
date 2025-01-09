import { pageController } from '@bc/uni-tools'

/**
 * 
 * 康养相关路由
 * 组件内跳转
 * 
 */


export const gotoserviceDetail = (itemId: string) => {
    const route = {
        path: '/Service/pages/serviceDetail/serviceDetail',
        query: { itemId }
    } as any
    return pageController.push(route)
}
