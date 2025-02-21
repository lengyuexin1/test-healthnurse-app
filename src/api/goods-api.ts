import { openHttp,http } from "@bc/api"
import type { _v1_bc_app_kuaidi_express_realtimeLookExpress_post_req, _v1_bc_app_kuaidi_realtime_order_view_get_req, _v1_bc_app_order_purchase_view_get_req, _v1_bc_app_product_detail_get_req, _v1_bc_app_product_option_option_detail_get_req, _v1_product_app_cart_create_post_req, _v1_product_app_cart_purchase_view_get_req, _v1_product_app_order_purchase_view_get_req } from "@bc/api/types/order/api-types"

/**
 * 适品相关api
 * 
 */
export const getgoodList = (req:any) => {
    return http.order.post('/v1/bc/app/category_show/product/list',req)
}

//================================================================================
/** 收货地址相关 */
//================================================================================

/** 收货地址列表 */
export const getAddressList = async () => {
    // const req = {} as any
    // shopId && (req.id = shopId)
    return http.user.get('/v1/bc/app/address/list')
}

/** 删除收货地址 */
export const delAddress = async (req: _v1_bc_app_address_del_post_req) => {
    return http.user.get('/v1/bc/app/address/del', req)
}

/* 添加收货地址 */
export const addAddress = async (req: _v1_bc_app_address_add_post_req) => {
    return http.user.post('/v1/bc/app/address/add', req)
}

/* 编辑收货地址 */
export const editAddress = async (req: _v1_bc_app_address_edit_post_req) => {
    return http.user.post('/v1/bc/app/address/edit', req)
}



/** 适品详情 */
export const goodsDetail = (req:_v1_bc_app_product_detail_get_req) => {
    return openHttp.order.get('/v1/bc/app/product/detail',req)
}

/** 获取商品规格 */
export const goodsSpecifications = (req:_v1_bc_app_product_option_option_detail_get_req) => {
    return http.order.get('/v1/bc/app/product_option/option_detail',req)
}

/** 添加商品到购物车 */
export const createGoodcart = (req:_v1_product_app_cart_create_post_req) => {
    return http.order.post('/v1/product/app/cart/create',req)
}

/** 商品下单所需参数 */
export const goodsPurchase = (req:_v1_product_app_order_purchase_view_get_req) => {
    return http.order.get('/v1/product/app/order/purchase/view',req)
}

/** 商品购物车下单所需参数 */
export const cartPurchase = (req:_v1_product_app_cart_purchase_view_get_req) => {
    return http.order.get('/v1/product/app/cart/purchase/view',req)
}


/** 商品列表 */
// changev2
export const productlist = (req:any) => {
    return http.post('api/search/v1/bc/public/es/product/list',req)
}

/* 商品列表(猜你喜欢) */
export const getGoodsList = (req: _v1_bc_app_product_list_post_req) => {
    return http.order.post('/v1/bc/app/product/list', req)
}
/* 购物车-商品列表 */
export const getGoodsCartList = () => {
    return http.order.get('/v1/product/app/cart/list')
}

/* 购物车-修改购物数 */
export const updateCartQuantity = (req: _v1_product_app_cart_quantity_update_post_req) => {
    return http.order.post('/v1/product/app/cart/quantity/update', req)
}

/* 购物车-删除商品 */
export const delCartGoods = (req: _v1_bc_app_cart_delete_post_req) => {
    return http.order.post('/v1/bc/app/cart/delete', req)
}

/* 购物车-提交订单 */
export const createOrder = (req: _v1_product_app_order_create_post_req) => {
    return http.order.post('/v1/product/app/order/create', req)
}

/* 分类-一级类目 */
export const getCategoryShowList = (req: _v1_bc_app_category_show_list_get_req) => {
    return openHttp.order.get('/v1/bc/app/category_show/list', req)
}

/* 分类-二级类目 */
export const getShopProductList = (req: _v1_bc_app_category_getList_get_req) => {
    return openHttp.order.get('/v1/bc/public/app/category_show/shop/product/list', req)
}

/** 康养囤首页推荐列表 */
// changev2
export const recommendList = (req:any) => {
    return openHttp.post('api/search/v1/bc/public/es/recommend/index',req)
}

/** 康养囤关注店铺列表 */
export const goodsfavoriteList = (req:any) => {
    return http.user.post('/v1/bc/app/favorite/favoriteList',req)
}

/** 商品订单物流查询 */
export const realtimeLookExpress = (req:_v1_bc_app_kuaidi_realtime_order_view_get_req) => {
    return http.order.get('/v1/bc/app/kuaidi/realtime/order/view',req)
}

/** 实时物流信息 */
export const realtimeLookExpressDetail = (req:_v1_bc_app_kuaidi_express_realtimeLookExpress_post_req) => {
    return http.order.post('/v1/bc/app/kuaidi/express/realtimeLookExpress',req)
}

/** 点评列表 */
export const organizationReviewsList = (req:any) => {
    return http.user.post('/v1/bc/app/shop/organizationReviewsList',req)
}

/** 全部类型的点评列表 */
export const organizationReviewsListAll = (req:any) => {
    return http.user.post('/v1/bc/app/shop/organizationReviewsListAll',req)
}

/** 积分商品 */
export const integrallist = (req:any) => {
    return http.content.post('/v1/bc/app/integral_product/list',req)
}

/** 积分详情 */
export const timePointsDetail = (req:any) => {
    return http.content.get('/v1/bc/app/chat/timePointsDetail',req)
}

/** 积分收支明细 */
export const timeDetailList = (req:any) => {
    return http.content.post('/v1/bc/app/chat/timeDetailList',req)
}

/** 积分商品兑换记录 */
export const integralGoodsList = (req:any) => {
    return http.content.post('/v1/bc/app/integral_product/order/list',req)
}

/** 积分商品详情 */
export const integralGoodsDetail = (req:any) => {
    return http.content.get('/v1/bc/app/integral_product/detail',req)
}

/** 兑换积分 */
export const integralOrderAdd = (req:any) => {
    return http.content.post('/v1/bc/app/integral_product/order/add',req)
}

/** 老博会类目 */
export const oldExpoCategory = (req:any) => {
    return http.user.post('/v1/bc/app/oldExpo/category/list',req)
}

/** 新品专区 */
export const productList = (req:any) => {
    return http.user.post('/v1/bc/app/oldExpo/new/productList',req)
}

/** 老博会列表 */
export const oldExpolist = (req:any) => {
    return http.user.post('/v1/bc/app/oldExpo/list',req)
}

/** 获取拼团信息 */
export const getGroupBuyInfo = (req:any) => {
    return http.order.get('/v1/bc/public/app/collage/item/info',req)
}

/** 商品拼团列表 */
export const getCollageItemList = (req:any) => {
    return http.order.get('/v1/bc/public/app/collage/order/list',req)
}

/** 拼团记录数据 */
export const getCollageRecord = (req:any) => {
    return http.order.get('/v1/bc/public/app/collage/order/record',req)
}

/** 开团 */
export const collageCreate = (req:any) => {
    return http.order.post('/v1/bc/app/collage/create',req)
}

/** 参团 */
export const collageJoin = (req:any) => {
    return http.order.post('/v1/bc/app/collage/join',req)
}
