import { pageController } from '@bc/uni-tools'

/**
 *
 * 适品相关路由
 *
 */

export const gotogoodsDetail = (itemId: string, livePlayId?: string) => {
    const route = {
        path: '/pagesGoods/pages/goodsDetail/goodsDetail',
        query: { itemId, livePlayId }
    } as any
    return pageController.push(route)
}
export const gotoserviceDetail = (itemId: string, livePlayId?: string) => {
    const route = {
        path: '/pagesService/pages/serviceDetail/serviceDetail',
        query: { itemId, livePlayId }
    } as any
    return pageController.push(route)
}

// 跳转到 购物车
export const gotoShoppingCart = () => {
    const route = {
        path: '/pagesGoods/pages/shoppingCart/shoppingCart',
        query: {}
    } as any
    return pageController.push(route)
}
// 跳转到 签到红包
export const gotoRegister = (query?: any) => {
    const route = {
        path: '/pagesCnt/pages/redEnvelope/register',
        query
    } as any
    return pageController.push(route)
}
// 跳转到 分类
export const gotoGoodsSort = () => {
    const route = {
        path: '/pagesMall/pages/sort/sort',
        query: {}
    } as any
    return pageController.push(route)
}

// 跳转到 优选店铺
export const gotoGoodsPerferShop = () => {
    const route = {
        path: '/pagesMall/pages/perferShop/perferShop',
        query: {}
    } as any
    return pageController.push(route)
}

// 订单物流
export const gotoSalePutlogis = (query: any) => {
    const route = {
        path: '/pagesGoods/pages/logistics/logistics',
        query
    } as any
    return pageController.push(route)
}
// 服务评论列表
export const gotoserviceComment = (query: any) => {
    const route = {
        path: '/pagesService/pages/serviceComment/serviceComment',
        query
    } as any
    return pageController.push(route)
}

// 商品评论列表
export const gotogoodsComment = (query: any) => {
    const route = {
        path: '/pagesGoods/pages/goodsComment/goodsComment',
        query
    } as any
    return pageController.push(route)
}

// 跳转点评列表
export const gotogoodsRanking = () => {
    const route = {
        path: '/pagesGoods/pages/goodsRanking/goodsRanking',
        query: {}
    } as any
    return pageController.push(route)
}

// 点评规格
export const gotorankingDetail = () => {
    const route = {
        path: '/pagesGoods/pages/goodsRanking/rankingDetail',
        query: {}
    } as any
    return pageController.push(route)
}

// 积分商城
export const gotointegralMallGoods = () => {
    const route = {
        path: '/pagesGoods/pages/integralMall/integralMallGoods',
        query: {}
    } as any
    return pageController.push(route)
}

// 积分明细/兑换记录
export const gotomyIntegral = () => {
    const route = {
        path: '/pagesGoods/pages/integralMall/myIntegral',
        query: {}
    } as any
    return pageController.push(route)
}

// 积分商品详情
export const gotointegralGoodsDetail = (query: any) => {
    const route = {
        path: '/pagesGoods/pages/integralMall/integralGoodsDetail',
        query
    } as any
    return pageController.push(route)
}

// 兑换积分商品
export const tobalanceRule = (query: any) => {
    const route = {
        path: '/pagesGoods/pages/integralMall/balanceRule',
        query
    } as any
    return pageController.push(route)
}

// 积分物流详情
export const gotointegralLogistics = (query: any) => {
    const route = {
        path: '/pagesGoods/pages/integralLogistics/integralLogistics',
        query
    } as any
    return pageController.push(route)
}

// 积分规则
export const gotointegralRule = () => {
    const route = {
        path: '/pagesGoods/pages/integralMall/integralRule',
        query: {}
    } as any
    return pageController.push(route)
}
