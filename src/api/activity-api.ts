import { openHttp,http } from "@bc/api"
import type { _v1_bc_app_activity_detail_get_req, _v1_bc_app_activity_list_get_req } from "@bc/api/types/order/api-types"

/**
 * 活动相关api
 * 
 */

/** 活动列表 */
export const getActivityList = (req: any) => {
    return http.order.get('/v1/bc/public/app/activity/list',req)
}

/** 活动详情 */
export const getActivityDetail = (req: _v1_bc_app_activity_detail_get_req) => {
    return http.order.get('/v1/bc/app/activity/detail',req)
}

/** 活动详情 */
export const activityDetail = (req: _v1_bc_app_activity_detail_get_req) => {
    return http.content.get('/v1/bc/app/activity/detail',req)
}
