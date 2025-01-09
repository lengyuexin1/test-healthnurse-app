import { openHttp,http } from "@bc/api"
import type { _v1_bc_app_activity_list_get_req } from "@bc/api/types/order/api-types"

/**
 * 康养类型api
 * 组件内请求api
 */



/** 获取活动轮播 */
export const getactivitySwiper = (req:_v1_bc_app_activity_list_get_req) =>{
    return http.order.get('/v1/bc/app/activity/list',req)
}

/** 获取对应类目产品列表 */
export const getserviceList = (req:any) =>{
    return http.order.post('/v1/bc/app/category_show/item/list',req)
}

