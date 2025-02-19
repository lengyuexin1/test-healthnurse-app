import { openHttp, http } from "@bc/api"
import type { _v1_bc_app_common_getQrcode_get_req, _v1_bc_app_common_getWxMiniProgramSessionKey_get_req, _v1_bc_app_money_info_get_req, _v1_bc_app_user_detail_get_req, _v1_bc_app_reward_cash_get_req, _v1_bc_app_reward_transfer_post_req, _v1_bc_app_reward_record_post_req, _v1_bc_app_estimate_question_estimate_post_req, _v1_bc_app_reward_exist_get_req, _v1_bc_app_reward_info_post_req, _v1_bc_app_reward_advance_get_req, _v1_bc_app_reward_do_task_post_req, _v1_bc_app_reward_task_get_req, _v1_bc_app_user_edit_post_req, _v1_bc_app_favorite_shopAdd_post_req, _v1_bc_app_favorite_shopAdd_post_res, _v1_bc_app_favorite_isFavoriteItem_get_req, _v1_bc_api_invite_config_get_req, _v1_bc_api_invite_info_get_req, _v1_bc_api_invite_list_get_req, _v1_bc_api_invite_qrcode_get_req, _v1_bc_api_invite_share_post_req } from "@bc/api/types/user/api-types"
import { PlatformManage } from "@bc/sys"
const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv


/**
 * 用户中心类api
 *
 */

/* 获取通知状态 */
export const getNoticeConfig = () => {
    return http.message.get('/v1/bc/app/config/get')
}
/* 机构详情获取手机号码 */
export const sendMobileCode = (req) => {
    return http.user.get('/ali/sms/sendBindCode', req)
}
/* 设置通知状态 */
export const setNoticeConfig = (isPush: any) => {
    return http.message.post('/v1/bc/app/config/push', { isPush })
}

/* 被照护人档案 */
export const getpatientList = () => {
    return http.user.get('/v1/bc/app/patient/list')
}

/** 用户金额信息 **/
export const getMoneyInfo = async (req?: _v1_bc_app_money_info_get_req) => {
    return http.user.get('/v1/bc/app/money/info', req)
}
/** 用户金额信息 **/
export const getMoneyRecord = async (req: any) => {
    return http.user.post('/v1/bc/app/money/record', req)
}
/** 用户金额信息 **/
export const getUserTransfer = async (req: any) => {
    return http.user.post('/v1/bc/app/money/transfer', req)
}
/* 评估问题列表 */
export const estimateQuestionList = () => {
    return http.order.get('/v1/bc/app/estimate_question/list')
}
/* 提交评估 */
export const estimateQuestionEstimate = (req: _v1_bc_app_estimate_question_estimate_post_req) => {
    return http.user.post('/v1/bc/app/estimate_question/estimate', req)
}
/** 检查手机是否已有商户 **/
export const happyUnfollowed = async () => {
    return http.content.get('/v1/bc/app/happy/unfollowed')
}
/** 收支明细 **/
export const recordList = async (req: _v1_bc_app_reward_record_post_req) => {
    return http.user.post('/v1/bc/app/reward/record', req)
}
/** 提现 **/
export const rewardTransfer = async (req: _v1_bc_app_reward_transfer_post_req) => {
    return http.user.post('/v1/bc/app/reward/transfer', req)
}
/** 获取用户提现余额等信息 **/
export const rewardCash = async (req: _v1_bc_app_reward_cash_get_req) => {
    return http.user.get('/v1/bc/app/reward/user/cash', req)
}

/*获取微信seession */
// changev2
export const getWeixinSessionKey = (req: any) => {
    console.log('获取微信seession')

    return openHttp.user.get('/v1/bc/public/app/common/getWxMiniProgramSessionKey', req)
}

/* 获取用户信息 */
export const getDestroyInfo = (req: _v1_bc_app_user_detail_get_req) => {
    return http.user.get('/v1/bc/app/user/detail', req)
}

/** 编辑个人信息 **/
export const updateUserInfo = async (req: _v1_bc_app_user_edit_post_req) => {
    return http.user.post('/v1/bc/app/user/edit', req)
}

/** 检查是否存在签到活动 **/
export const rewardExist = async (req: _v1_bc_app_reward_exist_get_req) => {
    return openHttp.user.get('/v1/bc/public/app/reward/exist', req)
}
/** 签到及获取签到活动信息 **/
export const rewardInfo = async (req: _v1_bc_app_reward_info_post_req) => {
    return http.user.post('/v1/bc/app/reward/info', req)
}
/** 开启红包 **/
export const rewardAdvance = async (req: _v1_bc_app_reward_advance_get_req) => {
    return http.user.get('/v1/bc/app/reward/advance', req)
}
/** 做任务 **/
export const rewardtoTask = async (req: _v1_bc_app_reward_do_task_post_req) => {
    return http.user.post('/v1/bc/app/reward/do/task', req)
}
/** 领取任务 **/
export const rewardTask = async (req: _v1_bc_app_reward_task_get_req) => {
    return http.user.get('/v1/bc/app/reward/task', req)
}
/* 新建(修改)被照护人 */
// export const




/* 新版内容收藏列表(返回内容) */
export const favoriteList = (req: _v1_bc_app_happy_favoriteList_post_req) => {
    return http.content.post('/v1/bc/app/happy/favoriteList', req)
}

/** 新版内容点赞列表(返回内容) */
export const likeLists = (req: _v1_bc_app_happy_likeList_post_req) => {
    return http.content.post('/v1/bc/app/happy/likeList', req)
}

/** 取消收藏 */
export const unFavorite = (req: _v1_bc_app_happy_unfavorite_post_req) => {
    return http.content.post('/v1/bc/app/happy/unFavorite', req)
}

/** 观看历史 */
export const viewList = (req: _v1_bc_app_happy_viewList_post_req) => {
    return http.content.post('/v1/bc/app/happy/viewList', req)
}

/** 删除观看历史 */
export const deleteView = (req: _v1_bc_app_happy_deletView_post_req) => {
    return http.content.post('/v1/bc/app/happy/deleteView', req)
}


/** 取消点赞 */
export const unlike = (req: _v1_bc_app_happy_batchUnLike_post_req) => {
    return http.content.post('/v1/bc/app/happy/batchUnLike', req)
}

/** 足迹列表 */
export const browerHistoryList = (req: _v1_bc_app_item_browse_history_list_post_req) => {
    return http.user.post('/v1/bc/app/item_browse_history/list', req)
}

/** 删除足迹列表 */
export const delBrowerHistory = (req: _v1_bc_app_item_browse_history_del_post_req) => {
    return http.user.post('/v1/bc/app/item_browse_history/del', req)
}

/** 讨论列表（帖子列表） */
export const salonContentList = (req: _v1_bc_app_salon_salonContentList_post_req) => {
    return http.content.post('/v1/bc/app/salon/salonContentList', req)
}

/** 删除讨论列表（帖子列表） */
export const delPosts = (req: _v1_bc_app_post_delete_post_req) => {
    return http.content.post('/v1/bc/app/post/delete', req)
}

/** 沙龙成员列表 */
export const salonMemberList = (req: _v1_bc_app_salon_memberList_post_req) => {
    return http.content.post('/v1/bc/app/salon/memberList', req)
}

/** 移除成员出沙龙 */
export const delSalonMember = (req: _v1_bc_app_salon_delMember_post_req) => {
    return http.content.post('/v1/bc/app/salon/delMember', req)
}

/** 加入沙龙 */
export const joinSalon = (req: _v1_bc_app_salon_memberList_post_req) => {
    return http.content.post('/v1/bc/app/salon/addMember', req)
}

/** 退出沙龙 */
export const pushExitSalon = (req: _v1_bc_app_salon_exitSalon_post_req) => {
    return http.content.post('/v1/bc/app/salon/exitSalon', req)
}

/** 收藏-康养服务 */
export const healthFavoriteList = (req: _v1_bc_app_favorite_itemList_post_req) => {
    return http.user.post('/v1/bc/app/favorite/itemList', req)
}

/** 取消收藏-康养服务 */
export const unHealthFavorite = (req: _v1_bc_app_favorite_itemCancel_post_req) => {
    return http.user.post('/v1/bc/app/favorite/itemCancel', req)
}

/** 收藏-康养店铺 */
export const healthShopList = (req: _v1_bc_app_favorite_shopList_post_req) => {
    return http.user.post('/v1/bc/app/favorite/shopList', req)
}

/** 收藏-康养店铺 */
export const unHealthShop = (req: _v1_bc_app_favorite_shopCancel_post_req) => {
    return http.user.post('/v1/bc/app/favorite/shopCancel', req)
}

/** 添加收藏康养店铺 */
export const addHealthShop = (req: _v1_bc_app_favorite_shopAdd_post_req) => {
    return http.user.post('/v1/bc/app/favorite/shopAdd', req)
}

/** 收藏-康养店铺 */
export const addShop = (req: _v1_bc_app_favorite_shopAdd_post_req) => {
    return http.user.post('/v1/bc/app/favorite/shopAdd', req)
}

/** 康养囤-浏览记录 */
export const healthWatchHistory = (req: _v1_bc_app_shop_browse_history_list_post_req) => {
    return http.user.post('/v1/bc/app/shop_browse_history/list', req)
}

/** 康养囤-删除浏览记录 */
export const delHealthWatchHistory = (req: _v1_bc_app_shop_browse_history_del_post_req) => {
    return http.user.post('/v1/bc/app/shop_browse_history/del', req)
}

/** 待评价列表 */
export const waiCommentList = (req: _v1_bc_app_order_list_post_req) => {
    return http.order.post('/v1/bc/app/order/list', req)
}

/** 我的评价列表 */
export const myCommentList = (req: _v1_bc_api_comment_commodity_view_post_req) => {
    return http.user.post('/v1/bc/api/comment/commodity/view', req)
}

/** 删除评论 */
export const deleteComment = (req: _v1_bc_api_comment_delete_post_req) => {
    return http.user.post('/v1/bc/api/comment/delete', req)
}

/** 获取评分项 */
export const getScoreKey = (req: _v1_bc_app_comment_scorekey_get_req) => {
    return http.user.get('/v1/bc/api/comment/scorekey', req)
}

/** 提交评论 */
export const submitComment = (req: _v1_bc_api_comment_commodity_save_post_req) => {
    return http.user.post('/v1/bc/api/comment/commodity/save', req)
}

/** 分享二维码 */
// changev2
export const getQrcode = (page: string) => {

    let QRversion = ''
    // #ifdef MP-WEIXIN
    // 获取小程序当前帐号信息
    const miniProgram = wx.getAccountInfoSync().miniProgram
    QRversion = miniProgram.envVersion
    // #endif

    // #ifdef APP-PLUS
    QRversion = 'release' // 正式版
    // QRversion = 'trial' // 体验版
    // QRversion = 'develop' // 开发版
    // #endif

    const req: any = {
        page,
        envVersion: QRversion
    }

    return http.user.get('/v1/bc/public/app/common/getQrcode', req)
}

/** 获取已领取的优惠券、已过期/使用的优惠券 **/
export const getAlreadyCoupon = (req: _v1_bc_app_coupon_granted_list_post_req) => {
    return http.order.post('/v1/bc/app/coupon/granted/list', req)
}

/** 领取优惠券 */
export const takeCoupon = (req: _v1_bc_app_coupon_collect_post_req) => {
    return http.order.post('/v1/bc/app/coupon/collect', req)
}


/** 是否收藏 */
export const isFavoriteItem = (req: _v1_bc_app_favorite_isFavoriteItem_get_req) => {
    return http.user.get('/v1/bc/app/favorite/isFavoriteItem', req)
}

/** 搜索推荐关键字 */
export const recommend = (req: any) => {
    return http.user.get('/v1/bc/app/shop/recommend', req)
}

/** 模糊查询列表 */
// changev2
export const happylike = (req: any) => {
    return http.get('api/search/v1/bc/public/es/happy/like', req)
}

export const featuredList = (req: any) => {
    return http.post('api/order/v1/bc/public/search/featured/list', req)
}

/** 搜索结果列表 */
// changev2
export const happysearch = (req: any, isRequireLogin: boolean) => {
    if (isRequireLogin) {
        // return openHttp.post('api/search/v1/bc/public/es/happy/search', req)
        return openHttp.post('api/search/v1/bc/public/es/new/search', req)
    }
    return http.post('api/search/v1/bc/public/es/new/search', req)
}

/** 地区列表 */
export const getSonList = (req: any) => {
    return http.user.get('/v1/bc/app/district/getSonList', req)
}

/** 推荐好友列表 */
export const recommendationList = (req: any) => {
    return http.content.post('/v1/bc/app/friends/recommendationList', req)
}

/** 通讯录好友 */
export const addressBookList = (req: any) => {
    return http.content.post('/v1/bc/app/friends/addressBookList', req)
}

/** 关注推荐列表 */
export const followRecommendList = (req: any) => {
    return http.content.post('/v1/bc/app/recommend/recommendationList', req)
}

/** 关注推荐看一看 */
export const followContentList = (req: any) => {
    return http.content.post('/v1/bc/app/recommend/contentList', req)
}

/** 附近店铺推荐 */
// changev2
export const nearbyGoods = (req: any) => {
    return openHttp.post('api/search/v1/bc/public/es/shop/list', req)
}

/** 提交定位 */
export const Postlocation = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/location', req)
}

/** 附近发现内容列表 */
// changev2
export const nearbyList = (req: any, isRequireLogin: boolean = true) => {
    if (isRequireLogin) {
        return openHttp.post('api/search/v1/bc/public/es/nearby/list', req)
    }
    return http.post('api/search/v1/bc/public/es/nearby/list', req)
}

/** 附近的人列表 */
export const peopleList = (req: any) => {
    return http.content.post('/v1/bc/app/nearby/list', req)
}

/** 添加第三方回答-讯飞 */
export const saveChatXunFei = (req: any) => {
    return http.content.post('/v1/bc/app/chat/saveChat', req)
}

/** 关联店铺列表 */
export const relationList = (req: any) => {
    return http.user.post('/v1/bc/app/shop/searchByDistance', req)
}

/** 地区字典 */
export const amapcity = (req: any) => {
    return http.user.get('/v1/bc/amap/city', req)
}

/** 我的群聊列表 */
export const myGroupChatList = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/my/list', req)
}

/** 群聊列表 */
export const groupChatList = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/list', req)
}

/** 群聊列表 */
export const getRandomChat = () => {
    return http.message.get('/v1/bc/app/group_chat/getRandom')
}

/** 创建群聊 */
export const createGroupChat = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/add', req)
}

/** 加入群聊 */
export const joinGroupChat = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/join', req)
}

/** 主动退群 */
export const leaveGroupChat = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/leave', req)
}

/** 解散群聊 */
export const removeGroupChat = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/remove', req)
}

/** 群聊详情 */
export const groupChatDetail = (req: any) => {
    return http.message.get('/v1/bc/app/group_chat/detail', req)
}

/** 邀请群聊 */
export const inviteMemberGroupChat = (req: any) => {
    return http.message.post('/v1/bc/app/group_chat/inviteMember', req)
}

/** AI聊-转文字 */
export const speechText = (req: any) => {
    return http.content.post('/v1/bc/app/chat/speechText', req)
}

/** 创建群聊基本信息 */
export const createChatBaseInfo = () => {
    return http.message.get('/v1/bc/app/group_chat/baseInfo')
}

/** 爱聊-编辑个人信息 */
export const loveChatUpdateUserInfo = (req: any) => {
    return http.content.post('/v1/bc/app/loveChat/account/saveOrUpdate', req)
}

/** 爱聊-保存择偶条件 */
export const loveChatUpdateConditions = (req: any) => {
    return http.content.post('/v1/bc/app/loveChat/conditions/saveOrUpdate', req)
}

/** 爱聊-保存择偶条件 */
export const interestsList = (req) => {
    return http.content.post('/v1/bc/app/loveChat/interests/list', req)
}

/** 爱聊-匹配 */
export const loveChatMatch = (req) => {
    return http.content.post('/v1/bc/app/loveChat/conditions/match', req)
}

/** 爱聊-用户实时经纬度 */
export const getRealCoordinate = (req) => {
    return http.content.get('/v1/bc/app/loveChat/account/getRealCoordinate', req)
}

/** 爱聊-保存用户实时经纬度 */
export const updateRealCoordinate = (req) => {
    return http.content.post('/v1/bc/app/loveChat/account/updateRealCoordinate', req)
}

/** 爱聊-获取匹配到用户信息 */
export const loveChatUserInfo = (req) => {
    return http.content.get('/v1/bc/app/loveChat/account/info', req)
}

/** 爱聊-获取匹配到用户信息的择偶条件 */
export const loveChatConditionsUserInfo = (req) => {
    return http.content.get('/v1/bc/app/loveChat/conditions/info', req)
}

/** 爱聊-获取资料完整状态 */
export const loveChatGetDataStatus = () => {
    return http.content.get('/v1/bc/app/loveChat/account/getDataStatus')
}

/** 爱聊-关注状态 */
export const updateFocusOnStatus = (req) => {
    return http.content.post('/v1/bc/app/loveChat/talk/updateFocusOnStatus', req)
}

/** 爱聊-我聊过的 */
export const loveChatTalkList = (req) => {
    return http.content.post('/v1/bc/app/loveChat/talk/list', req)
}

/** 爱聊-删除我聊过的 */
export const delLoveChatTalkList = (req) => {
    return http.content.post('/v1/bc/app/loveChat/talk/updateTalksStatus', req)
}

/** 爱聊-更新聊天对话状态 */
export const updateTalkStatus = (req) => {
    return http.content.post('/v1/bc/app/loveChat/talk/updateTalkStatus', req)
}

/** 邀请好友活动配置信息 */
export const inviteconfigDetail = (req: _v1_bc_api_invite_config_get_req) => {
    return http.user.get('/v1/bc/api/invite/config', req)
}

/** 邀请信息 */
export const inviteinfoDetail = (req: _v1_bc_api_invite_info_get_req) => {
    return http.user.get('/v1/bc/api/invite/info', req)
}

/** 邀请好友兑换记录 */
export const inviteList = (req: any) => {
    return http.user.get('/v1/bc/api/invite/list', req)
}

/** 邀请分享二维码 */
export const getqrcodeImg = (req: _v1_bc_api_invite_qrcode_get_req) => {
    return http.user.get('/v1/bc/api/invite/qrcode', req)
}

/** 邀请id */
export const getshareId = (req: _v1_bc_api_invite_share_post_req) => {
    return http.user.post('/v1/bc/api/invite/share', req)
}

/** 注销账号 */
export const cancellation = (req: any) => {
    // /v1/bc/company/shop/cancellation
    return http.user.post('/v1/bc/app/user/destroy', req)
}

/** 获取绑定授权信息 */
export const getsimpleInfo = (req: any) => {
    return http.user.get('/v1/bc/app/organization/simpleInfo', req)
}

/** 绑定商户提现 */
export const getMoneyBang = (req: any) => {
    return http.content.post('/v1/bc/app/money/bang', req)
}

/** 规则类目 */
export const ruleCategory = (req: any) => {
    return http.user.get('/v1/bc/public/public/article/category/tree', req)
}

/** 规则列表 */
export const ruleList = (req: any) => {
    return http.user.post('/v1/bc/public/public/article/list', req)
}

/** 规则详情 */
export const ruleDetail = (req: any) => {
    return http.user.get('/v1/bc/public/public/article/detail', req)
}

/** 问题反馈投诉 */
export const feedbackList = (req: any) => {
    return http.user.post('/v1/bc/api/complaint/list', req)
}

/** 获取投诉类型原因 */
export const getTypeReason = (req: any) => {
    return http.user.get('/v1/bc/api/complaint/typeReason', req)
}

/** 提交投诉类型原因 */
export const saveTypeReason = (req: any) => {
    return http.user.post('/v1/bc/api/complaint/save', req)
}

/** 获取投诉详情 */
export const getTypeReasonDetail = (req: any) => {
    return http.user.get('/v1/bc/api/complaint/details', req)
}

/** 社区朋友 */
export const communityFriendList = (req: any) => {
    return http.content.post('/v1/bc/app/community/friend/communityFriendList', req)
}

/** 收益列表(商家收益) */
export const getmoneyList = (req: any) => {
    return http.content.post('/v1/bc/app/money/list', req)
}

/** 收益详情(商家收益) */
export const getmoneyDetail = () => {
    return http.content.get('/v1/bc/app/money/detail')
}

/** 商家提现 */
export const moneytransfer = (req: any) => {
    return http.content.post('/v1/bc/app/money/transfer', req)
}

/** 签到红包-用户收益 */
export const getMoneyDetail = () => {
    return http.user.get('/v1/bc/app/reward/income')
}

/** 检测人脸 */
export const checkFacebody = (req: any) => {
    return http.get('api/user/ali/face/checkFacebody', req)
}

/** 数据上报 */
export const deviceRecord = (req: any) => {
    console.log('每次调用上报执行', WEB_ENV)

    const NullPromise = new Promise((resolve, reject) => { })

    // test环境不进行上报
    if (!(WEB_ENV == 'pre' || WEB_ENV == 'prod')) {
        return NullPromise
    }
    return openHttp.post('api/warehouse/v1/bc/public/device/record', req)
}

/** 获取推广 */
export const marketingDetail = (id: string) => {
    return openHttp.order.get('/public/app/marketing/detail', { id })
}

/** 举报列表 */
export const getReportList = (req: any) => {
    return http.content.post('/v1/bc/app/denounce/list', req)
}

/** 删除举报 */
export const delReport = (req: _v1_bc_app_item_browse_history_del_post_req) => {
    return http.content.post('/v1/bc/app/denounce/remove', req)
}

/** 举报详情 */
export const reportDetail = (id: string) => {
    return http.content.get('/v1/bc/app/denounce/detail', { id })
}

/** 认证详情 */
export const authDetail = () => {
    return http.user.get('/v1/bc/app/user/shopBinding/detail')
}

/** 用户绑定商家 */
export const authShopBinding = (req: any) => {
    return http.user.post('/v1/bc/app/user/shopBinding/bind', req)
}

/** 用户确认绑定商家 */
export const authShopVerifyBinding = (req: any) => {
    return http.user.post('/v1/bc/app/user/shopBinding/verifyBind', req)
}

/** 用户解绑商家 */
export const authUnbindShop = () => {
    return http.user.post('/v1/bc/app/user/shopBinding/unbind')
}

/* 资质 */
export const getLicence = (req: any) => {
    return http.user.get('/v1/bc/public/app/public/licence/content', req)
}
