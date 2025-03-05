import { openHttp, http } from "@bc/api"
import type { _v1_bc_admin_article_contentList_post_req } from "@bc/api/types/content/api-types"
import type { _v1_bc_app_activity_list_get_req, _v1_bc_app_coupon_for_item_get_req, _v1_bc_app_health_detail_get_req, _v1_bc_app_health_list_post_req, _v1_bc_app_item_all_post_req, _v1_bc_app_item_detail_get_req, _v1_bc_public_app_item_detail_get_req } from "@bc/api/types/order/api-types"
import type { _v1_bc_api_comment_commodity_list_post_req, _v1_bc_api_comment_score_get_req, _v1_bc_app_favorite_itemAdd_post_req, _v1_bc_app_favorite_itemCancel_post_req, _v1_bc_app_shop_getBaseInfo_get_req, _v1_bc_app_shop_organizationDetail_get_req } from "@bc/api/types/user/api-types"

/**
 * 康养类型api
 *
 */


/** 乐悠康养类目 */
export const getcategoryList = (req:any) => {
    return openHttp.order.get('/v1/bc/app/category_show/list', req)
}
/** 服务列表 */
export const agencylist = (req:any) => {
    return openHttp.order.post('/v1/bc/public/app/agency/list', req)
}
/** 康养es列表 */
export const getOrganEsList = (req:any) => {
    return openHttp.post('api/search/v1/bc/public/es/shop/list', req)
}
/** 机构服务预约 */
export const prebookSave = (req:any) => {
    return http.order.post('/v1/bc/app/prebook/save', req)
}

/* 服务加入购物车 */
export const addServeCart = async (params: { optionId: string, hospitalId?: string }) => {
    return http.order.post('/v1/bc/app/cart/create', params)
}
/* 服务购物车列表 */
export const getCartServiceList = () => {
    return http.order.get('/v1/bc/app/cart/service/list')
}
/** 获取服务详情/服务规格列表 */
export const getServeDetail = async (req:any) => {
    return http.order.get('/v1/bc/public/app/item/detail', req)
}
// changev2
export const categoryShow = (req:any) => {
    // 云课堂
    return openHttp.content.get('/v1/bc/public/app/article/categoryShow/list', req)
}

/** 乐悠康养类目列表 */
export const getserviveList = (req:any) => {
    return http.order.post('/v1/bc/app/category_show/item/list', req)
}

/** 获取活动轮播 */
export const getactivitySwiper = (req:any) => {
    return http.order.get('/v1/bc/public/app/activity/list', req)
}

// 内容中心活动列表
export const activityList = (req: any) => {
    //
    return http.content.post('/v1/bc/app/activity/list/new', req)
}

// 内容中心我参与的活动列表
export const myActivityList = (req: any) => {
    // /v1/bc/app/activity/list/new
    return http.content.post('/v1/bc/app/activity/my/list', req)
}

// 活动详情
export const activityDetail = (req: _v1_bc_app_activity_detail_post_req) => {
    return http.content.get('/v1/bc/app/activity/detail', req)
}

// 获取内容分类列表
export const getcontentSortList = (req: _v1_bc_app_admin_article_contentSortList_post_req) => {
    return http.content.post('/v1/bc/admin/article/contentSortList', req)
}

// 服务详情
export const infoDetail = (req: _v1_bc_app_item_detail_get_req) => {
    return http.order.get('/v1/bc/app/item/detail', req)
}

//店铺详情
export const getBaseInfo = (req: _v1_bc_app_shop_getBaseInfo_get_req) => {
    return http.user.get('/v1/bc/app/shop/getBaseInfo', req)
}

// 猜你喜欢
export const getSerListAll = (req: _v1_bc_app_item_all_post_req) => {
    return http.order.post('/v1/bc/app/item/all', req)
}

// 评论得分
export const commentScore = (req: _v1_bc_api_comment_score_get_req) => {
    return http.user.get('/v1/bc/api/comment/score', req)
}

// 服务或商品评论列表
export const godsCommList = (req: _v1_bc_api_comment_commodity_list_post_req) => {
    return http.user.post('/v1/bc/api/comment/commodity/view', req)
}

// 加入足迹
export const addShopBrowerHistory = (req: _v1_bc_app_shop_brower_history_add_post_req) => {
    return http.user.post('/v1/bc/app/shop_browse_history/add', req)
}

// 加入足迹
export const addItemBrowerHistory = (req: _v1_bc_app_item_brower_history_add_post_req) => {
    return http.user.post('/v1/bc/app/item_browse_history/add', req)
}

// 收藏服务
export const collectService = (req: _v1_bc_app_favorite_itemAdd_post_req) => {
    return http.user.post('/v1/bc/app/favorite/itemAdd', req)
}

// 取消收藏服务
export const cancelCollect = (req: _v1_bc_app_favorite_itemCancel_post_req) => {
    return http.user.post('/v1/bc/app/favorite/itemCancel', req)
}

//获取分享二维码
// changev2
export const getQrcode = (req: any) => {
    return openHttp.user.get('/v1/bc/public/app/common/getQrcode', req)
}

// 服务优惠价列表
export const itemCouponList = (req: _v1_bc_app_coupon_for_item_get_req) => {
    return http.order.get('/v1/bc/app/coupon/for/item', req)
}

/** 照护人档案详情 id档案id */
export const getPatientDetail = (req: _v1_bc_app_patient_detail_get_req) => {
    return http.user.get('/v1/bc/app/patient/detail', req)
}

/** 编辑照护人档案 */
export const editPatient = (req: _v1_bc_app_patient_edit_post_req) => {
    return http.user.post('/v1/bc/app/patient/edit', req)
}

/** 删除照护人档案 */
export const delPatient = (req: _v1_bc_app_patient_del_post_req) => {
    return http.user.get('/v1/bc/app/patient/del', req)
}


/** 机构详情 */
// changev2
export const organizationDetail = (req:_v1_bc_app_shop_organizationDetail_get_req) => {
    return openHttp.user.get('/v1/bc/public/app/shop/organizationDetail', req)
}

/** 机构产品列表 */
export const healthlist = (req:_v1_bc_app_health_list_post_req) => {
    return openHttp.order.post('/v1/bc/public/app/health/list', req)
}

/** 机构产品详情 */
export const healthdetail = (req:_v1_bc_app_health_detail_get_req) => {
    return http.order.get('/v1/bc/app/health/detail', req)
}
/** 机构产品详情 */
export const agencydetail = (req:_v1_bc_app_health_detail_get_req) => {
    return http.order.get('/v1/bc/public/app/agency/detail', req)
}


/** 机构代金券详情 */
export const voucherdetail = (req:any) => {
    return http.order.get('/v1/bc/admin/health/voucher/detail', req)
}

/** 机构列表 */
// changev2
export const shoplist = (req:any) => {
    return openHttp.post('api/search/v1/bc/public/es/shop/list', req)
}

/** 机构推荐列表 */
export const organizationList = (req: _v1_bc_app_shop_organizationList_post_req) => {
    return http.user.post('/v1/bc/app/shop/organizationList', req)
}

/** 轮播搜索词 */
// changev2
export const featured = (req:any) => {
    return http.post('api/search/v1/bc/public/es/featured', req)
}

// 康养屯主页类目
export const servicePageChannel = (req:any) => {
    return openHttp.content.get('/v1/bc/public/page/channel', req)
}
