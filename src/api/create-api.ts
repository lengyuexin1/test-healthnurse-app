import { openHttp, http } from "@bc/api"
import type {
    _v1_bc_admin_article_contentDetails_get_req,
    _v1_bc_admin_article_contentList_post_req,
    _v1_bc_admin_article_contentSortList_post_req,
    _v1_bc_app_article_commentLike_post_req,
    _v1_bc_app_article_commentList_post_req,
    _v1_bc_app_article_commentRelyList_post_req,
    _v1_bc_app_article_deleteComment_post_req,
    _v1_bc_app_article_favorite_post_req,
    _v1_bc_app_article_follow_post_req,
    _v1_bc_app_article_getLike_post_req,
    _v1_bc_app_article_recover_post_req,
    _v1_bc_app_article_retransmission_post_req,
    _v1_bc_app_article_review_post_req,
    _v1_bc_app_article_unCommentLike_post_req,
    _v1_bc_app_article_unFavorite_post_req,
    _v1_bc_app_article_unfollow_post_req,
    _v1_bc_app_article_unLike_post_req
} from "@bc/api/types/content/api-types"


/**
 * 内容类api
 *
 */

// 创建沙龙,百科,活动广场
// changev2
export const getsalonCategoryList = (req: any) => {
    return http.content.post('/v1/bc/public/article/category/getAll', req)
}
// 沙龙
// changev2
export const getcategoryShow = (req: any) => {
    return http.content.post('/v1/bc/public/app/article/categoryShow/getAll', req)
}

// 发现内容
export const getCreateList = (req: _v1_bc_admin_article_contentList_post_req) => {
    return http.content.post('/v1/bc/admin/article/contentList', req)
}

// 个人中心页面数据
export const homePage = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/homePage', req)
}

// 内容列表(传入状态)
export const contentList = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/contentList', req)
}

// 频道分类列表
export const getcontentSortList = (req: _v1_bc_admin_article_contentSortList_post_req) => {
    return http.content.post('/v1/bc/admin/article/contentSortList', req)
}

// 获取关注作者信息
export const contentAccountList = (req: _v1_bc_admin_article_contentList_post_req) => {
    return http.content.post('/v1/bc/admin/article/contentAccountList', req)
}

// 对应分类下内容列表
export const getcontentList = (req: any) => {
    return http.content.post('/v1/bc/app/article/contentList', req)
}

// 频道内容
export const getappcontentList = (req: any) => {
    return http.content.post('/v1/bc/app/article/contentList', req)
}

// 内容审核
export const articleAudit = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/audit', req)
}

// 内容创作
export const addContent = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/addContent', req)
}

// 获取所有类目
// changev2
export const categoryAll = (req: any) => {
    return http.content.post('/v1/bc/public/article/category/getAll', req)
}

// 内容修改
export const editContent = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/editContent', req)
}

// 内容详情
export const getcontentDetails = (req: _v1_bc_admin_article_contentDetails_get_req) => {
    return http.content.get('/v1/bc/admin/article/contentDetails', req)
}

// 内容评论列表
export const getcommentList = (req: _v1_bc_app_article_commentList_post_req) => {
    return http.content.post('/v1/bc/app/article/commentList', req)
}

// 内容回复的评论列表
export const commentRelyList = (req: _v1_bc_app_article_commentRelyList_post_req) => {
    return http.content.post('/v1/bc/app/article/commentRelyList', req)
}

// 取消评论点赞
export const unCommentLike = (req: _v1_bc_app_article_unCommentLike_post_req) => {
    return http.content.post('/v1/bc/app/article/unCommentLike', req)
}

// 评论点赞
export const commentLike = (req: _v1_bc_app_article_commentLike_post_req) => {
    return http.content.post('/v1/bc/app/article/commentLike', req)
}

// 评论删除(包括)
export const deleteComment = (req: _v1_bc_app_article_deleteComment_post_req) => {
    return http.content.post('/v1/bc/app/article/deleteComment', req)
}

// 回复评论
export const postrecover = (req: _v1_bc_app_article_recover_post_req) => {
    return http.content.post('/v1/bc/app/article/recover', req)
}

// 发布文章评论
export const postreview = (req: _v1_bc_app_article_review_post_req) => {
    return http.content.post('/v1/bc/app/article/review', req)
}

// 文章收藏
export const favorite = (req: _v1_bc_app_article_favorite_post_req) => {
    return http.content.post('/v1/bc/app/article/favorite', req)
}

// 文章取消收藏
export const unFavorite = (req: _v1_bc_app_article_unFavorite_post_req) => {
    return http.content.post('/v1/bc/app/article/unFavorite', req)
}

// 文章点赞
export const getLike = (req: _v1_bc_app_article_getLike_post_req) => {
    return http.content.post('/v1/bc/app/article/getLike', req)
}

// 文章取消点赞
export const unLike = (req: _v1_bc_app_article_unLike_post_req) => {
    return http.content.post('/v1/bc/app/article/unLike', req)
}

// 个体创作者关注列表
export const followList = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/followList', req)
}

// 个体创作者粉丝列表
export const fansList = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/fansList', req)
}

// 取消关注
export const unfollow = (req: _v1_bc_app_article_unfollow_post_req) => {
    return http.content.post('/v1/bc/app/article/unfollow', req)
}

// 关注
export const follow = (req: _v1_bc_app_article_follow_post_req) => {
    return http.content.post('/v1/bc/app/article/follow', req)
}

/** 创作者私信用户 */
export const createorLetterUser = async (req: _v1_bc_app_im_creatorPrivateMessageUser_post_req) => {
    return http.message.post('/v1/bc/app/im/creatorPrivateMessageUser', req)
}

/** 用户私信创作者 */
export const userLetterCreator = async (req: _v1_bc_app_im_userPrivateMessageCreator_post_req) => {
    return http.message.post('/v1/bc/app/im/userPrivateMessageCreator', req)
}

// 云课堂列表
export const getcourselist = (req: any) => {
    return http.content.post('/v1/bc/app/course/list', req)
}

// es云课堂列表(白名单请求)
// changev2
export const getescourselist = (req: any) => {
    return openHttp.post('api/search/v1/bc/public/es/course/list', req)
}


// 关注作者列表(传入状态返回不同类型作者)
export const getcoursefollowList = (req: any) => {
    return http.content.post('/v1/bc/app/course/followList', req)
}

// 课程详情
export const getvideoDetail = (req: any) => {
    return http.content.get('/v1/bc/app/course/detail', req)
}

// 课程点赞
export const getcourseLike = (req: any) => {
    return http.content.post('/v1/bc/app/course/getLike', req)
}

// 课程取消点赞
export const uncourseList = (req: any) => {
    return http.content.post('/v1/bc/app/course/unLike', req)
}

// 课程收藏
export const favoritecourse = (req: any) => {
    return http.content.post('/v1/bc/app/course/favorite', req)
}

// 课程取消收藏
export const unFavoritecourse = (req: any) => {
    return http.content.post('/v1/bc/app/course/unFavorite', req)
}

// 关注课程
export const coursefollow = (req: any) => {
    return http.content.post('/v1/bc/app/course/follow', req)
}

// 取消关注课程
export const courseunfollow = (req: any) => {
    return http.content.post('/v1/bc/app/course/unfollow', req)
}

// 课程评论列表
export const coursecommentList = (req: any) => {
    return http.content.post('/v1/bc/app/course/commentList', req)
}

// 评论课程
export const coursereview = (req: any) => {
    return http.content.post('/v1/bc/app/course/review', req)
}

// 添加机构账号
export const addContentAccount = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/addContentAccount', req)
}

// 内容类分享，包括云课堂
export const retransmission = (req: _v1_bc_app_article_retransmission_post_req) => {
    return http.content.post('/v1/bc/app/article/retransmission', req)
}

/** 云课堂已购买课程列表 */
export const getbuycourseList = (req: any) => {
    return http.content.post('/v1/bc/app/my/course/list', req)
}

/** 云课程已购买课程详情 */
export const buycourseDetail = (req: any) => {
    return http.content.get('/v1/bc/app/my/course/detail', req)
}

/** 云课程已购买订单课程详情 */
export const courseorderDetail = (req: any) => {
    return http.content.get('/v1/bc/app/my/course/orderDetail', req)
}

/** 创建沙龙 */
export const creatsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/circle/submit', req)
}

/** 我创建的沙龙 */
export const getmyCreateSalon = (req: any) => {
    return http.content.post('/v1/bc/app/circle/list', req)
}

/** 修改沙龙 */
export const circlesubmit = (req: any) => {
    return http.content.post('/v1/bc/app/circle/submit', req)
}

/** 修改详情 */
export const getauditdetail = (req: any) => {
    return http.content.get('/v1/bc/app/circle/audit/detail', req)
}

/** 撤销沙龙创建审核 */
export const delcirclecancel = (req: any) => {
    return http.content.post('/v1/bc/app/circle/cancel', req)
}

/** 删除创建的沙龙 */
export const delsalon = (req: any) => {
    return http.content.post('/v1/bc/app/circle/remove', req)
}

/** 申请解散沙龙 */
export const applydismissed = (req: any) => {
    return http.content.post('/v1/bc/app/circle/apply/dismissed', req)
}

/** 撤销沙龙解散申请 */
export const delapplycancel = (req: any) => {
    return http.content.post('/v1/bc/app/circle/apply/cancel', req)
}

/** 沙龙详情 */
export const getsalonDetail = (req: any) => {
    return http.content.get('/v1/bc/app/salon/detail', req)
}

/** 沙龙列表 */
// changev2
export const getSalonList = (req: any) => {
    return http.content.post('/v1/bc/public/salon/list', req)
}

/** 沙龙列表(返回直播数据) */
export const getSalonliveList = (req: any) => {
    return http.post('api/search/v1/bc/public/es/salon/list', req)
}

/** 沙龙关注的作者发布的帖子 */
export const getFollowsalonList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/salonFollowContentList', req)
}

/** 沙龙详情的讨论列表 */
export const getsalonContentList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/salonContentList', req)
}

/** 创建沙龙帖子 */
export const pushsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/post/submit', req)
}

/** 我创建的沙龙帖子 */
export const getsubmitList = (req: any) => {
    return http.content.post('/v1/bc/app/post/list', req)
}

/** 删除我创建的沙龙帖子 */
export const delsalonPosts = (req: any) => {
    return http.content.post('/v1/bc/app/post/remove', req)
}

/** 获取编辑的沙龙帖子详情 */
export const geteditPostsDetail = (req: any) => {
    return http.content.get('/v1/bc/app/post/audit/detail', req)
}

/** 编辑沙龙帖子 */
export const pusheditPosts = (req: any) => {
    return http.content.post('/v1/bc/app/post/submit', req)
}
/** 沙龙帖子详情 */
export const getsaloncontentDetails = (req: any) => {
    return http.content.get('/v1/bc/app/salon/contentDetails', req)
}

/** 沙龙帖子评论列表 */
export const getsaloncommentList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/commentList', req)
}

/** 沙龙帖子评论的回复列表 */
export const getsaloncommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/commentRelyList', req)
}

/** 沙龙帖子点赞列表 */
export const getsalonlikeList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/likeList', req)
}

/** 沙龙帖子收藏列表 */
export const getfavoriteList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/favoriteList', req)
}

/** 发布沙龙帖子的评论 */
export const postsalonreview = (req: any) => {
    return http.content.post('/v1/bc/app/salon/review', req)
}

/** 沙龙帖子评论回复 */
export const postsalonrecover = (req: any) => {
    return http.content.post('/v1/bc/app/salon/recover', req)
}

// 删除沙龙帖子评论
export const deletesalonComment = (req: any) => {
    return http.content.post('/v1/bc/app/salon/deleteComment', req)
}

// 沙龙评论取消点赞
export const unsalonCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/salon/unCommentLike', req)
}

// 沙龙评论点赞
export const salonCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/salon/commentLike', req)
}

// 沙龙帖子收藏
export const salonfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/salon/favorite', req)
}

// 沙龙帖子取消收藏
export const unsalonfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/salon/unFavorite', req)
}

// 沙龙帖子点赞
export const salongetLike = (req: any) => {
    return http.content.post('/v1/bc/app/salon/getLike', req)
}

// 沙龙帖子取消点赞
export const unsalongetLike = (req: any) => {
    return http.content.post('/v1/bc/app/salon/unLike', req)
}

// 关注沙龙帖子作者
export const salonfollow = (req: any) => {
    return http.content.post('/v1/bc/app/salon/follow', req)
}

// 取消关注沙龙帖子作者
export const unsalonfollow = (req: any) => {
    return http.content.post('/v1/bc/app/salon/unfollow', req)
}

// 沙龙我关注的作者列表
export const salonfollowList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/followList', req)
}

// 我加入的沙龙列表
export const getJoinsalonList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/listByAccountID', req)
}

/** 粉丝列表 */
export const salonFansList = (req: any) => {
    return http.content.post('/v1/bc/app/salon/fansList', req)
}

/** 邀请好友 */
export const inviteFriends = (req: any) => {
    return http.content.post('/v1/bc/app/salon/inviteMember', req)
}

/** 清空新内容红点 */
export const clearResDot = (req: any) => {
    return http.content.post('/v1/bc/app/happy/clearResDot', req)
}


/** 频道热榜列表 */
// changev2
export const getranklist = (req: any) => {
    return openHttp.post('api/search/v1/bc/public/es/rank/list', req)
}

/** 频道列表 */
// changev2
export const escontentlist = (req: any, isRequireLogin?: boolean) => {
    if (isRequireLogin) {
        return openHttp.post('api/search/v1/bc/public/es/content/list', req)
    }
    else {
        return http.post('api/search/v1/bc/public/es/content/list', req)
    }
}

/** es频道列表检查是否收藏等数据 */
export const actionRecord = (req: any) => {
    return http.content.get('/v1/bc/app/article/user/actionRecord', req)
}


/** 频道内容发布预览 */
export const getarticlePreview = (req: any) => {
    // /v1/bc/app/article/user/contentPreviewDetails
    return openHttp.content.get('/v1/bc/public/contentPreviewDetails', req)
}

/** 我的作品(个体创作者 包含审核 草稿状态等作品) */
export const myContentList = (req: _v1_bc_app_article_myContentList_post_req) => {
    return http.content.post('/v1/bc/app/article/myContentList', req)
}

/** 删除草稿 */
export const delMyContentList = (req: _v1_bc_app_article_user_tDeleteContent_post_req) => {
    return http.content.post('/v1/bc/app/article/user/tDeleteContent', req)
}

// 获取草稿内容详情
export const getDraftDetails = (req: _v1_bc_app_article_contentDetailsByDraft_get_req) => {
    return http.content.get('/v1/bc/app/article/contentDetailsByDraft', req)
}

// 获取人脸识别的certifyId
export const initFaceVerifyIdPlus = (req: _api_user_ali_face_initFaceVerifyIdPlus_post_req) => {
    return http.post('api/user/ali/face/initFaceVerifyIdPlus', req)
}

// 进行人脸识别
export const certificateByCertifyId = (req: _v1_bc_app_user_certificateByCertifyId_get_req) => {
    return http.user.get('/v1/bc/app/user/certificateByCertifyId', req)
}

/** 创作学堂-推荐 */
export const schoolRecList = (req: _v1_bc_app_article_article_recList_post_req) => {
    return http.user.post('/v1/bc/app/article/article/recList', req)
}

/** 创作学堂-新手入门、创作技巧、创作活动 */
export const schoolList = (req: _v1_bc_app_article_article_list_post_req) => {
    return http.user.post('/v1/bc/app/article/article/list', req)
}

/** 创作学堂-详情 */
export const schoolDetail = (req: _v1_bc_app_article_detail_get_req) => {
    return http.user.get('/v1/bc/app/article/detail', req)
}

/** 创作学堂-添加阅读记录 */
export const schoolAddView = (req: _v1_bc_app_article_addView_post_req) => {
    return http.user.post('/v1/bc/app/article/addView', req)
}

/** 评论设置 */
export const commentSet = (req: _v1_bc_app_article_user_commentSet_post_req) => {
    return http.content.post('/v1/bc/app/article/user/commentSet', req)
}

/** 创作者删除草稿 */
export const tDeleteContent = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/tDeleteContent', req)
}

/** 创作者下架内容 */
export const deleteContent = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/deleteContent', req)
}

/** 创作者撤销内容 */
export const articlecancel = (req: any) => {
    return http.content.post('/v1/bc/app/article/cancel', req)
}

/** 创作者提交审核 */
export const contentStatus = (req: any) => {
    return http.content.post('/v1/bc/admin/article/contentStatus', req)
}


/** 添加内容预览 */
export const articleaddView = (req: any) => {
    return http.content.post('/v1/bc/app/article/addView', req)
}

/** 个体创造者数据(作品) */
export const articleDataLook = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/articleDataLook', req)
}

/** 折线图数据(作品) */
export const articleUserDayLook = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/articleUserDayLook', req)
}

/** 粉丝数据 */
export const fansDataLook = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/fansDataLook', req)
}

/** 粉丝数据折线图 */
export const fansUserDayLook = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/fansUserDayLook', req)
}

/** 修改作品状态为是否'仅我可见' */
export const oneselfLook = (req: any) => {
    return http.content.post('/v1/bc/company/article/oneselfLook', req)
}

/** 记录预览时间 */
export const viewTime = (req: any) => {
    return http.content.post('/v1/bc/app/article/user/viewTime', req)
}

// 获取全部分类
export const getAllCategory = (req: any) => {
    return http.user.get('/v1/bc/company/organization/getAllCategory', req)
}

/** 身份证识别 */
export const getRecognizeIdCard = (req: any) => {
    return http.post('api/user/ali/ocr/recognizeIdCard', req)
}

/** 营业执照识别 */
export const recognizeBusinessLicense = (req: any, header: any) => {
    return http.post('api/user/ali/ocr/recognizeBusinessLicense', req, header)
}

/** 商户入驻 */
export const addAdminOrganization = (req: any) => {
    return http.user.post('/v1/bc/app/user/addAdminOrganization', req)
}

/** 证书列表 */
export const certificateList = async (req: any) => {
    return http.user.post('/v1/bc/company/category/certificate/getByCategoryIds', req)
}

/** 聊天号首页列表 */
// changev2
export const chatList = (req: any) => {
    return openHttp.post('api/search/v1/bc/public/es/chat/list', req)
}

/** 发布聊天号 */
export const upsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/submit', req)
}

/** 聊天号草稿 */
export const editsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/draft', req)
}

/** 我发布的聊天号 */
export const upChatList = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/list', req)
}

/** 聊天详情 */
export const chatcontentDetails = (req: any) => {
    return http.content.get('/v1/bc/app/chat/contentDetails', req)
}

/** 白名单聊天详情 */
export const contentShareDetails = (req: any) => {
    return openHttp.content.get('/v1/bc/admin/article/contentShareDetails', req)
}

/** 聊天点赞列表 */
export const chatlikeList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/likeList', req)
}

/** 聊天评论列表 */
export const chatcommentList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/commentList', req)
}

/** 聊天评论的回复列表 */
export const chatcommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/commentRelyList', req)
}

/** 发布聊天的评论 */
export const postChatreview = (req: any) => {
    return http.content.post('/v1/bc/app/chat/review', req)
}

/** 删除聊天评论 */
export const deletechatComment = (req: any) => {
    return http.content.post('/v1/bc/app/chat/deleteComment', req)
}

/** 聊天评论回复 */
export const postchatrecover = (req: any) => {
    return http.content.post('/v1/bc/app/chat/recover', req)
}

// 聊天评论取消点赞
export const unchatCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/chat/unCommentLike', req)
}

// 聊天评论点赞
export const chatCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/chat/commentLike', req)
}

// 聊天帖子收藏
export const chatfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/chat/favorite', req)
}

// 聊天帖子取消收藏
export const unchatfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/chat/unFavorite', req)
}

// 聊天帖子点赞
export const chatgetLike = (req: any) => {
    return http.content.post('/v1/bc/app/chat/getLike', req)
}

// 聊天帖子取消点赞
export const unchatgetLike = (req: any) => {
    return http.content.post('/v1/bc/app/chat/unLike', req)
}

// 关注聊天号作者
export const chatfollow = (req: any) => {
    return http.content.post('/v1/bc/app/chat/follow', req)
}

// 取消关注聊天号作者
export const unchatfollow = (req: any) => {
    return http.content.post('/v1/bc/app/chat/unfollow', req)
}

/** 聊天收藏列表 */
export const chatfavoriteList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/favoriteList', req)
}

/** 聊天号草稿列表 */
export const chatDraftList = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/draft/list', req)
}

// 获取草稿内容详情
export const getChatauditdetail = (req: any) => {
    return http.content.get('/v1/bc/app/shaking/audit/detail', req)
}

/** 编辑聊天号内容 */
export const Chatshakingsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/submit', req)
}

/** 编辑聊天号草稿内容 */
export const Chatshakingdraft = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/draft', req)
}

/** 删除聊天号内容 */
export const delchatshaking = (req: any) => {
    return http.content.post('/v1/bc/app/shaking/remove', req)
}

// 聊天号我关注的作者列表
export const chatfollowList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/followList', req)
}

/** 聊天号评论的回复列表 */
export const getchatcommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/chat/commentRelyList', req)
}

/** 发布发现内容 */
export const Finddiscoversubmit = (req: any) => {
    return http.content.post('/v1/bc/app/discover/submit', req)
}

/** 创建发现草稿内容 */
export const Finddiscoverdraft = (req: any) => {
    return http.content.post('/v1/bc/app/discover/draft', req)
}

/** 编辑发布发现内容 */
export const editFinddiscoversubmit = (req: any) => {
    return http.content.post('/v1/bc/app/discover/submit', req)
}

/** 编辑发现草稿内容 */
export const editFinddiscoverdraft = (req: any) => {
    return http.content.post('/v1/bc/app/discover/draft', req)
}

/** 获取编辑内容 */
export const getFindauditdetail = (req: any) => {
    return http.content.get('/v1/bc/app/discover/audit/detail', req)
}

/** 我发布发现内容 */
export const discoverList = (req: any) => {
    return http.content.post('/v1/bc/app/discover/list', req)
}

/** 删除我发布的发现内容 */
export const deldiscover = (req: any) => {
    return http.content.post('/v1/bc/app/discover/remove', req)
}

/** 发现内容草稿列表 */
export const findDraftlist = (req: any) => {
    return http.content.post('/v1/bc/app/discover/draft/list', req)
}

/** 发现详情 */
export const findcontentDetails = (req: any) => {
    return http.content.get('/v1/bc/app/find/contentDetails', req)
}

/** 发现点赞列表 */
export const findlikeList = (req: any) => {
    return http.content.post('/v1/bc/app/find/likeList', req)
}

/** 发现评论列表 */
export const findcommentList = (req: any) => {
    return http.content.post('/v1/bc/app/find/commentList', req)
}

/** 发现评论的回复列表 */
export const findcommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/find/commentRelyList', req)
}

/** 发布发现的评论 */
export const postFindreview = (req: any) => {
    return http.content.post('/v1/bc/app/find/review', req)
}

/** 删除发现评论 */
export const deletefindComment = (req: any) => {
    return http.content.post('/v1/bc/app/find/deleteComment', req)
}

/** 发现评论回复 */
export const postfindrecover = (req: any) => {
    return http.content.post('/v1/bc/app/find/recover', req)
}

// 发现评论取消点赞
export const unfindCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/find/unCommentLike', req)
}

// 发现评论点赞
export const findCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/find/commentLike', req)
}

// 发现帖子收藏
export const findfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/find/favorite', req)
}

// 发现帖子取消收藏
export const unfindfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/find/unFavorite', req)
}

// 发现帖子点赞
export const findgetLike = (req: any) => {
    return http.content.post('/v1/bc/app/find/getLike', req)
}

// 发现帖子取消点赞
export const unfindgetLike = (req: any) => {
    return http.content.post('/v1/bc/app/find/unLike', req)
}

// 关注发现作者
export const findfollow = (req: any) => {
    return http.content.post('/v1/bc/app/find/follow', req)
}

// 取消关注发现作者
export const unfindfollow = (req: any) => {
    return http.content.post('/v1/bc/app/find/unfollow', req)
}

/** 发现收藏列表 */
export const findfavoriteList = (req: any) => {
    return http.content.post('/v1/bc/app/find/favoriteList', req)
}

// 发现内容我关注的作者列表
export const findfollowList = (req: any) => {
    return http.content.post('/v1/bc/app/find/followList', req)
}

// 创意短片标签列表
export const tagList = (req: any) => {
    return http.content.post('/v1/bc/app/tag/list', req)
}

/** 发布短片 */
export const creativesubmit = (req: any) => {
    return http.content.post('/v1/bc/app/creative/submit', req)
}

/** 短片草稿 */
export const creativedraft = (req: any) => {
    return http.content.post('/v1/bc/app/creative/draft', req)
}

/** 编辑短片 */
export const editcreativesubmit = (req: any) => {
    return http.content.post('/v1/bc/app/creative/submit', req)
}

/** 编辑短片草稿 */
export const editcreativedraft = (req: any) => {
    return http.content.post('/v1/bc/app/creative/draft', req)
}

/** 获取短片编辑内容 */
export const getcreativedetail = (req: any) => {
    return http.content.get('/v1/bc/app/creative/audit/detail', req)
}

/** 我发布的创意短片 */
export const creativelist = (req: any) => {
    return http.content.post('/v1/bc/app/creative/list', req)
}

/** 删除我发布的创意短片 */
export const creativeRemove = (req: any) => {
    return http.content.post('/v1/bc/app/creative/remove', req)
}

/** 创意短片草稿列表 */
export const creativeDraftlist = (req: any) => {
    return http.content.post('/v1/bc/app/creative/draft/list', req)
}

/** 短片详情 */
export const creativecontentDetails = (req: any) => {
    return http.content.get('/v1/bc/app/creative/contentDetails', req)
}

/** 短片点赞列表 */
export const creativelikeList = (req: any) => {
    return http.content.post('/v1/bc/app/creative/likeList', req)
}

/** 短片评论列表 */
export const creativecommentList = (req: any) => {
    return http.content.post('/v1/bc/app/creative/commentList', req)
}

/** 短片评论的回复列表 */
export const creativecommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/creative/commentRelyList', req)
}

/** 发布短片的评论 */
export const postCreativereview = (req: any) => {
    return http.content.post('/v1/bc/app/creative/review', req)
}

/** 删除短片评论 */
export const deletecreativeComment = (req: any) => {
    return http.content.post('/v1/bc/app/creative/deleteComment', req)
}

/** 短片评论回复 */
export const postcreativerecover = (req: any) => {
    return http.content.post('/v1/bc/app/creative/recover', req)
}

// 短片评论取消点赞
export const uncreativeCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/creative/unCommentLike', req)
}

// 短片评论点赞
export const creativeCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/creative/commentLike', req)
}

// 短片帖子收藏
export const creativefavorite = (req: any) => {
    return http.content.post('/v1/bc/app/creative/favorite', req)
}

// 短片帖子取消收藏
export const uncreativefavorite = (req: any) => {
    return http.content.post('/v1/bc/app/creative/unFavorite', req)
}

// 短片帖子点赞
export const creativegetLike = (req: any) => {
    return http.content.post('/v1/bc/app/creative/getLike', req)
}

// 短片帖子取消点赞
export const uncreativegetLike = (req: any) => {
    return http.content.post('/v1/bc/app/creative/unLike', req)
}

// 关注短片作者
export const creativefollow = (req: any) => {
    return http.content.post('/v1/bc/app/creative/follow', req)
}

// 取消关注短片作者
export const uncreativefollow = (req: any) => {
    return http.content.post('/v1/bc/app/creative/unfollow', req)
}

/** 短片收藏列表 */
export const creativefavoriteList = (req: any) => {
    return http.content.post('/v1/bc/app/creative/favoriteList', req)
}

/** 短片内容我关注的作者列表 */
export const creativefollowList = (req: any) => {
    return http.content.post('/v1/bc/app/creative/followList', req)
}

/** 创意短片列表 */
export const createVideoList = (req: any, isRequireLogin: boolean = true) => {
    if (isRequireLogin) {
        return openHttp.post('api/search/v1/bc/public/es/creative/list', req)
    }
    return http.post('api/search/v1/bc/public/es/creative/list', req)

}

/** 创建享老记圈子 */
export const addenjoy = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/add', req)
}

/** 享老记圈子详情 */
export const enjoydetail = (req: any) => {
    return http.content.get('/v1/bc/app/enjoy_old_circle/detail', req)
}

/** 圈子内容创建 */
export const enjoysubmit = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/content/submit', req)
}

/** 发布列表 */
export const enjoyList = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/content/list', req)
}

/** 享老记点赞列表 */
export const getlivelikeList = (req: any) => {
    return http.content.post('/v1/bc/app/live/likeList', req)
}

/** 享老记评论列表 */
export const getlivecommentList = (req: any) => {
    return http.content.post('/v1/bc/app/live/commentList', req)
}

/** 享老记发评论 */
export const pushreview = (req: any) => {
    return http.content.post('/v1/bc/app/live/review', req)
}

/** 享老记回复 */
export const pushrecover = (req: any) => {
    return http.content.post('/v1/bc/app/live/recover', req)
}

/** 享老记点赞 */
export const livegetLike = (req: any) => {
    return http.content.post('/v1/bc/app/live/getLike', req)
}

/** 享老记取消点赞 */
export const liveunLike = (req: any) => {
    return http.content.post('/v1/bc/app/happy/batchUnLike', req)
}

/** 加入享老纪 */
export const joinEnjoy = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/join', req)
}

/** 享老记成员列表 */
export const memberList = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/member/list', req)
}

/** 享老记详情 */
export const getenjoyDetail = (req: any) => {
    return http.content.get('/v1/bc/app/enjoy_old_circle/content/detail', req)
}

/** 修改享老记个人信息(包括修改背景图) */
export const editmember = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/member/edit', req)
}

/** 享老记相册 */
export const cloudPhoto1List = (req: any) => {
    return http.content.post('/v1/bc/app/live/cloudPhoto', req)
}

/** 共享的享老记相册 */
export const circleCloudPhoto = (req: any) => {
    return http.content.post('/v1/bc/app/live/circleCloudPhoto', req)
}

/** 享老记成员权限列表 */
export const permissionList = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/member/permission/list', req)
}

/** 修改成员权限 */
export const permissionEdit = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/member/permission/edit', req)
}

/** 享老记内容取消修改 */
export const contentdel = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/content/del', req)
}

/** 享老记内容评论删除 */
export const enjoydelComment = (req: any) => {
    return http.content.post('/v1/bc/app/live/deleteComment', req)
}

/** 享老记解散圈子 */
export const removeEnjoy = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/remove', req)
}

/** 享老记退出圈子 */
export const leaveEnjoy = (req: any) => {
    return http.content.post('/v1/bc/app/enjoy_old_circle/leave', req)
}

/** 创作学堂类目 */
export const createSchoolTag = (req: any) => {
    return http.user.get('/v1/bc/public/app/public/article/category/tree', req)
}

/** 总关注内容(传入类型区分内容) */
export const followContentList = (req: any) => {
    return http.content.post('/v1/bc/app/happy/followContentList', req)
}

/** 首页轮播图列表 */
export const indexBannerList = (req: any) => {
    return openHttp.content.post('/v1/bc/public/banner/list', req)
}

/** 新版发布，编辑内容 */
export const newpostUp = (req: any) => {
    return http.content.post('/v1/bc/app/content/submit', req)
}

/** 新版内容编辑详情 */
export const newgetDetail = (req: any) => {
    return http.content.get('/v1/bc/app/content/audit/detail', req)
}

/** 新版创建，编辑草稿 */
export const newSavedraft = (req: any) => {
    return http.content.post('/v1/bc/app/content/draft', req)
}

/** 新版发布列表 */
export const getnewContentList = (req: any) => {
    return http.content.post('/v1/bc/app/article/myContentList', req)
}

/** 新版草稿列表 */
export const getnewDraftList = (req: any) => {
    return http.content.post('/v1/bc/app/content/draft/list', req)
}

/** 新版内容删除 */
export const delnewContent = (req: any) => {
    return http.content.post('/v1/bc/app/content/remove', req)
}

/** 云课堂新版类目 */
export const newCourseCategory = (req: any) => {
    return http.order.get('/v1/bc/public/app/category_show/getAll', req)
}

/** 新版发布内容详情 */
export const getnewContentDetail = (req: any, isRequireLogin: boolean) => {
    if (isRequireLogin) {
        return openHttp.content.get('/v1/bc/public/content/detail', req)
    }
    return http.content.get('/v1/bc/public/content/detail', req)

}

/** 新版发布内容评论列表 */
export const getnewcommentList = (req: any) => {
    return http.content.post('/v1/bc/app/happy/commentList', req)
}

/** 新版发布内容回复的评论列表 */
export const getnewcommentRelyList = (req: any) => {
    return http.content.post('/v1/bc/app/happy/commentRelyList', req)
}

// 新版发布内容回复评论
export const postnewrecover = (req: any) => {
    return http.content.post('/v1/bc/app/happy/recover', req)
}

// 新版发布内容发布文章评论
export const postnewreview = (req: any) => {
    return http.content.post('/v1/bc/app/happy/review', req)
}

// 新版发布内容取消评论点赞
export const unnewCommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/happy/unCommentLike', req)
}

// 新版发布内容评论点赞
export const newcommentLike = (req: any) => {
    return http.content.post('/v1/bc/app/happy/commentLike', req)
}

// 新版发布内容评论删除(包括)
export const deletenewComment = (req: any) => {
    return http.content.post('/v1/bc/app/happy/deleteComment', req)
}

// 文章收藏
export const newfavorite = (req: any) => {
    return http.content.post('/v1/bc/app/happy/favorite', req)
}

// 新版发布内容文章取消收藏
export const unnewFavorite = (req: any) => {
    return http.content.post('/v1/bc/app/happy/unFavorite', req)
}

// 新版发布内容文章点赞
export const getnewLike = (req: any) => {
    return http.content.post('/v1/bc/app/happy/getLike', req)
}

// 新版发布内容文章取消点赞
export const unnewLike = (req: any) => {
    return http.content.post('/v1/bc/app/happy/batchUnLike', req)
}

// 新版发布内容取消关注
export const unnewfollow = (req: any) => {
    return http.content.post('/v1/bc/app/happy/unfollow', req)
}

// 新版发布内容关注
export const newfollow = (req: any) => {
    return http.content.post('/v1/bc/app/happy/follow', req)
}

// 康养囤内容列表
export const healthContentList = (req: any, isRequireLogin: boolean) => {
    if (isRequireLogin) {
        return openHttp.post('api/search/v1/bc/public/es/health/list', req)
    }
    return http.post('api/search/v1/bc/public/es/health/list', req)
}

// 播报上报
export const voiceContentListen = (req: any) => {
    return http.content.get('/v1/bc/public/content/listen', req)
}

// 举报理由
export const getReportList = (req: any) => {
    return http.content.post('/v1/bc/app/report/reasons/list', req)
}

// 举报提交
export const postReportsubmit = (req: any) => {
    return http.content.post('/v1/bc/app/denounce/submit', req)
}

// 音频列表
export const getaudioList = (req: any) => {
    return http.content.post('/v1/bc/app/audio/list', req)
}

// 讨论分区列表
export const getdiscussionList = (req:any,isRequireLogin:boolean = false) => {
    if (isRequireLogin) {
        return openHttp.content.get('/v1/bc/public/discussion/list', req)
    }
    return http.content.get('/v1/bc/public/discussion/list', req)
}

// 讨论内容列表
export const discussionContentList = (req:any,isRequireLogin:boolean = false) => {
    if (isRequireLogin) {
        return openHttp.content.post('/v1/bc/public/discussion/content/list',req)
    }
    return http.content.post('/v1/bc/public/discussion/content/list',req)
}

// 讨论区模块列表
export const discussionDetailList = (req:any,isRequireLogin:boolean = false) => {
    if (isRequireLogin) {
        return openHttp.post('/v1/bc/app/discussion/post/list',req)
    }
    return http.content.post('/v1/bc/app/discussion/post/list',req)
}

// 发布讨论内容
export const upDiscussion = (req:any) => {
    return http.content.post('/v1/bc/app/content/submit',req)
}