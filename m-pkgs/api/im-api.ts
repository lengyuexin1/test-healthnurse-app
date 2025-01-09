import { http } from "@bc/api"
import type {
    _v1_bc_admin_customer_service_detail_get_req,
    _v1_bc_admin_customer_service_doAction_post_req,
    _v1_bc_admin_im_session_end_post_req,
    _v1_bc_admin_im_session_start_by_customer_service_post_req,
    _v1_bc_app_im_custom_list_get_req,
    _v1_bc_app_im_history_query_team_msg_post_req,
    _v1_bc_app_im_transfer_shop_post_req
} from "./types/im/api-types"
import type { _v1_bc_admin_product_list_post_req, _v1_bc_merchant_item_list_post_req, _v1_bc_merchant_order_list_post_req, _v1_product_merchant_order_list_post_req } from "./types/order/api-types"
import type { _v1_bc_company_admin_updateUserInfo_post_req, _v1_bc_company_organization_worker_auditList_post_req } from "./types/user/api-types"
import { SessionSDK } from "@bc/msg"



//====================================================
// api
//====================================================

/** 获取今日咨询数 */
export const todayConsultQuantity = () => {
    return http.message.get('/v1/bc/admin/customer_service/statistic')
}

/** 客服详情 */
export const customerStatus = (req: _v1_bc_admin_customer_service_detail_get_req) => {
    return http.message.get('/v1/bc/admin/customer_service/detail', req)
}

/** 上下线 */
export const onOffLine = (req: _v1_bc_admin_customer_service_doAction_post_req) => {
    return http.message.post('/v1/bc/admin/customer_service/doAction', req)
}

/** 获取历史会话 */
export const historySession = () => {
    return http.message.get('/v1/bc/app/im/history_session_list')
}

/** 获取商家客户 */
export const userSession = (req: _v1_bc_app_im_custom_list_get_req) => {
    return http.message.get('/v1/bc/app/im/custom_list', req)
}

/** 获取历史会话 */
export const historyMsgList = (req: _v1_bc_app_im_history_query_team_msg_post_req) => {
    return http.message.post('/v1/bc/app/im/history_query_team_msg', req)
}

// 重新发起会话
export const sessionStartByCustomerService = (req: _v1_bc_admin_im_session_start_by_customer_service_post_req) => {
    return http.message.post('/v1/bc/admin/im/session_start_by_customer_service', req)
}

//结束会话
const closeChatApi = (req: _v1_bc_admin_im_session_end_post_req) => {
    return http.message.post('/v1/bc/admin/im/session_end', req)
}
export const closeChat = (to: string) => {
    const sessionId = `team-${to}`
    return closeChatApi({ tid: to as any }).catch((err) => {
        if (err.apiCode === 404) {
            // 群不存在
            SessionSDK.delSession(sessionId)
            return Promise.resolve()
        }
        return Promise.reject(err)
    })
}

//转店铺客服
export const transferShop = (req: _v1_bc_app_im_transfer_shop_post_req) => {
    return http.message.post('/v1/bc/app/im/transfer_shop', req)
}

// 更新客服信息
export const editCustomerService = (req: _v1_bc_admin_customer_service_post_req) => {
    return http.message.post('/v1/bc/admin/customer_service/edit', req)
}





//================================================================================
/** 订单，简历 */
//================================================================================

// 产品列表(服务)
export const getproductList = (req: _v1_bc_merchant_item_list_post_req) => {
    return http.order.post('/v1/bc/merchant/item/list', req)
}
// 订单列表(服务)
export const getorderList = (req: _v1_bc_merchant_order_list_post_req) => {
    return http.order.post('/v1/bc/merchant/order/list', req)
}

// 产品列表(商品)
export const getgoodList = (req: _v1_bc_admin_product_list_post_req) => {
    return http.order.post('/v1/bc/admin/product/list', req)
}

// 订单列表(商品)
export const getgoodOrderList = (req: _v1_product_merchant_order_list_post_req) => {
    return http.order.post('/v1/product/merchant/order/list', req)
}


// 订单详情(商家)
export const getmerchantorderdetail = (req: any) => {
    return http.order.get('/v1/bc/merchant/order/detail', req)
}

// 订单详情(平台)
export const getadminorderdetail = (req: any) => {
    return http.order.get('/v1/bc/admin/order/detail', req)
}

// 物流信息
export const getrealtime = (req: any) => {
    return http.order.get('/v1/bc/app/kuaidi/realtime/order/view', req)
}


// 获取修改价格
export const getchangeprice = (req: any) => {
    return http.order.get('/v1/bc/merchant/order/entity/price/calculation', req)
}

// 提交修改价格
export const updateprice = (req: any) => {
    return http.order.post('/v1/bc/merchant/order/update_paid_amount', req)
}

// 简历列表
export const getauditList = (req: _v1_bc_company_organization_worker_auditList_post_req) => {
    return http.user.post('/v1/bc/company/organization/worker/auditList', req)
}

// 客服列表
export const getCustomerServiceList = (req: _v1_bc_admin_customer_service_list_get_req) => {
    return http.message.get('/v1/bc/admin/customer_service/list', req)
}

// 客服转客服
export const transferCustomerService = (req: _v1_bc_admin_im_transfer_customer_service_post_req) => {
    return http.message.post('/v1/bc/admin/im/transfer_customer_service', req)
}

/** 更新群成员 */
export const updateTeamMember = (req: _v1_bc_app_im_updateTeamMemberByTid_post_req) => {
    return http.message.post('/v1/bc/app/im/updateTeamMemberByTid', req)
}

/** 结束会话 */
export const sessionEnd = (req: _v1_bc_app_im_session_end_post_req) => {
    return http.message.post('/v1/bc/app/im/session_end', req)
}

/** 机器人发消息 */
export const robotSendMsg = (req: _v1_bc_app_im_robotSendMsg_post_req) => {
    return http.message.post('/v1/bc/app/im/robotSendMsg', req)
}

/** 获取转人工客服配置 */
export const transferArtificialConfigDetail = (req: _v1_bc_app_im_transfer_artificial_config_detail_get_req) => {
    return http.message.get('/v1/bc/app/im/transfer_artificial_config_detail', req)
}

/** 转人工客服 */
export const imTransferArtificial = (req: _v1_bc_app_im_transfer_artificial_post_req) => {
    return http.message.post('/v1/bc/app/im/transfer_artificial', req)
}

/** 猜你想问 */
export const qaContentList = (req: _v1_bc_public_app_qa_content_list_get_req) => {
    return http.message.get('/v1/bc/public/app/qa_content/list', req)
}

/** 获取短句列表 */
export const shortSentenceList = (req: _v1_bc_public_app_short_sentence_list_get_req) => {
    return http.message.get('/v1/bc/public/app/short_sentence/list', req)
}

// 简历详情
export const getresumedetail = (req: any) => {
    return http.user.get('/v1/bc/app/resume/detail', req)
}

// 获取配置字典
export const getconfigMap = () => {
    return http.user.get('/v1/bc/company/company/configMap')
}

// 照护人信息
export const getPatientDetail = (req:any) => {
    return http.order.get('/v1/bc/merchant/order/patient', req)
}

/** 爱聊-查找爱聊账号列表信息 */
export const loveChatAccountInfo = (req: any) => {
    return http.content.post('/v1/bc/app/loveChat/account/simpleInfos', req)
}

