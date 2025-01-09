import type { operations } from './schema'

/** 投稿列表 - post请求参数 */
export type _v1_bc_admin_activity_article_list_post_req = Required<operations["admin_article_listUsingPOST"]>['requestBody']['content']['application/json']
/** 投稿列表 - post响应参数 */
export type _v1_bc_admin_activity_article_list_post_res = Required<operations["admin_article_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动操作状态 - post请求参数 */
export type _v1_bc_admin_activity_audit_post_req = Required<operations["doAuditUsingPOST"]>['requestBody']['content']['application/json']
/** 活动操作状态 - post响应参数 */
export type _v1_bc_admin_activity_audit_post_res = Required<operations["doAuditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_admin_activity_delete_post_req = Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_activity_delete_post_res = Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动详情 - get请求参数 */
export type _v1_bc_admin_activity_detail_get_req = Required<operations["admin_detailUsingGET"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_admin_activity_detail_get_res = Required<operations["admin_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 活动列表 - post请求参数 */
export type _v1_bc_admin_activity_list_post_req = Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']
/** 活动列表 - post响应参数 */
export type _v1_bc_admin_activity_list_post_res = Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动新增修改 - post请求参数 */
export type _v1_bc_admin_activity_save_post_req = Required<operations["doSaveUsingPOST"]>['requestBody']['content']['application/json']
/** 活动新增修改 - post响应参数 */
export type _v1_bc_admin_activity_save_post_res = Required<operations["doSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 活动详情 - get请求参数 */
export type _v1_bc_app_activity_detail_get_req = Required<operations["detailUsingGET"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_app_activity_detail_get_res = Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 活动列表 - post请求参数 */
export type _v1_bc_app_activity_list_post_req = Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']
/** 活动列表 - post响应参数 */
export type _v1_bc_app_activity_list_post_res = Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动列表 - post请求参数 */
export type _v1_bc_app_activity_my_list_post_req = Required<operations["my_listUsingPOST"]>['requestBody']['content']['application/json']
/** 活动列表 - post响应参数 */
export type _v1_bc_app_activity_my_list_post_res = Required<operations["my_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 类目列表 - post请求参数 */
export type _v1_bc_app_article_category_get_post_req = Required<operations["getUsingPOST"]>['requestBody']['content']['application/json']
/** 类目列表 - post响应参数 */
export type _v1_bc_app_article_category_get_post_res = Required<operations["getUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_admin_article_categoryShow_delete_post_req = Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_article_categoryShow_delete_post_res = Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 列表 - get请求参数 */
export type _v1_bc_admin_article_categoryShow_list_get_req = Required<operations["listUsingGET"]>['parameters']['query']
/** 列表 - get响应参数 */
export type _v1_bc_admin_article_categoryShow_list_get_res = Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 添加 - post请求参数 */
export type _v1_bc_admin_article_categoryShow_save_post_req = Required<operations["saveDataUsingPOST"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_admin_article_categoryShow_save_post_res = Required<operations["saveDataUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 排序 - post请求参数 */
export type _v1_bc_admin_article_categoryShow_sort_post_req = Required<operations["sortUsingPOST"]>['requestBody']['content']['application/json']
/** 排序 - post响应参数 */
export type _v1_bc_admin_article_categoryShow_sort_post_res = Required<operations["sortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 前台类目同步 - post请求参数 */
export type _v1_bc_admin_article_categoryShow_syncCategoryToCategoryShow_post_req = Required<operations["syncCategoryToCategoryShowUsingPOST"]>['requestBody']
/** 前台类目同步 - post响应参数 */
export type _v1_bc_admin_article_categoryShow_syncCategoryToCategoryShow_post_res = Required<operations["syncCategoryToCategoryShowUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容列表 - post请求参数 */
export type _v1_bc_app_article_categoryShow_contentList_post_req = Required<operations["contentListUsingPOST"]>['requestBody']['content']['application/json']
/** 内容列表 - post响应参数 */
export type _v1_bc_app_article_categoryShow_contentList_post_res = Required<operations["contentListUsingPOST"]>['responses'][200]['content']['*/*']

/** 类目列表 - get请求参数 */
export type _v1_bc_app_article_categoryShow_list_get_req = Required<operations["listUsingGET_1"]>['parameters']['query']
/** 类目列表 - get响应参数 */
export type _v1_bc_app_article_categoryShow_list_get_res = Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 内容创作 - post请求参数 */
export type _v1_bc_company_article_addContent_post_req = Required<operations["addContentUsingPOST"]>['requestBody']['content']['application/json']
/** 内容创作 - post响应参数 */
export type _v1_bc_company_article_addContent_post_res = Required<operations["addContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 机构创作者数据 - post请求参数 */
export type _v1_bc_company_article_articleDataLook_post_req = Required<operations["articleDataLookUsingPOST"]>['requestBody']['content']['application/json']
/** 机构创作者数据 - post响应参数 */
export type _v1_bc_company_article_articleDataLook_post_res = Required<operations["articleDataLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 机构创作者数据折线图 - post请求参数 */
export type _v1_bc_company_article_articleUserDayLook_post_req = Required<operations["articleUserDayLookUsingPOST"]>['requestBody']['content']['application/json']
/** 机构创作者数据折线图 - post响应参数 */
export type _v1_bc_company_article_articleUserDayLook_post_res = Required<operations["articleUserDayLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 黑名单列表 - post请求参数 */
export type _v1_bc_company_article_blacklistList_post_req = Required<operations["blacklistListUsingPOST"]>['requestBody']['content']['application/json']
/** 黑名单列表 - post响应参数 */
export type _v1_bc_company_article_blacklistList_post_res = Required<operations["blacklistListUsingPOST"]>['responses'][200]['content']['*/*']

/** 内容列表 - post请求参数 */
export type _v1_bc_company_article_contentList_post_req = Required<operations["contentListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容列表 - post响应参数 */
export type _v1_bc_company_article_contentList_post_res = Required<operations["contentListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 内容机构修改 - post请求参数 */
export type _v1_bc_company_article_editContentAccount_post_req = Required<operations["editContentAccountUsingPOST"]>['requestBody']['content']['application/json']
/** 内容机构修改 - post响应参数 */
export type _v1_bc_company_article_editContentAccount_post_res = Required<operations["editContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 机构创造者粉丝数据(昨日) - post请求参数 */
export type _v1_bc_company_article_fansDataLook_post_req = Required<operations["fansDataLookUsingPOST"]>['requestBody']['content']['application/json']
/** 机构创造者粉丝数据(昨日) - post响应参数 */
export type _v1_bc_company_article_fansDataLook_post_res = Required<operations["fansDataLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 粉丝列表 - post请求参数 */
export type _v1_bc_company_article_fansList_post_req = Required<operations["fansListUsingPOST"]>['requestBody']['content']['application/json']
/** 粉丝列表 - post响应参数 */
export type _v1_bc_company_article_fansList_post_res = Required<operations["fansListUsingPOST"]>['responses'][200]['content']['*/*']

/** 粉丝关注列表 - post请求参数 */
export type _v1_bc_company_article_fansLogList_post_req = Required<operations["fansLogListUsingPOST"]>['requestBody']['content']['application/json']
/** 粉丝关注列表 - post响应参数 */
export type _v1_bc_company_article_fansLogList_post_res = Required<operations["fansLogListUsingPOST"]>['responses'][200]['content']['*/*']

/** 机构创造者粉丝数据折线图 - post请求参数 */
export type _v1_bc_company_article_fansUserDayLook_post_req = Required<operations["fansUserDayLookUsingPOST"]>['requestBody']['content']['application/json']
/** 机构创造者粉丝数据折线图 - post响应参数 */
export type _v1_bc_company_article_fansUserDayLook_post_res = Required<operations["fansUserDayLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 关注 - post请求参数 */
export type _v1_bc_company_article_follow_post_req = Required<operations["followUsingPOST"]>['requestBody']['content']['application/json']
/** 关注 - post响应参数 */
export type _v1_bc_company_article_follow_post_res = Required<operations["followUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 首页 - post请求参数 */
export type _v1_bc_company_article_homePage_post_req = Required<operations["homePageUsingPOST"]>['requestBody']['content']['application/json']
/** 首页 - post响应参数 */
export type _v1_bc_company_article_homePage_post_res = Required<operations["homePageUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 点赞列表 - post请求参数 */
export type _v1_bc_company_article_likeLogList_post_req = Required<operations["likeLogListUsingPOST"]>['requestBody']['content']['application/json']
/** 点赞列表 - post响应参数 */
export type _v1_bc_company_article_likeLogList_post_res = Required<operations["likeLogListUsingPOST"]>['responses'][200]['content']['*/*']

/** 我的作品 - post请求参数 */
export type _v1_bc_company_article_myContentList_post_req = Required<operations["myContentListUsingPOST"]>['requestBody']['content']['application/json']
/** 我的作品 - post响应参数 */
export type _v1_bc_company_article_myContentList_post_res = Required<operations["myContentListUsingPOST"]>['responses'][200]['content']['*/*']

/** 拉黑 - post请求参数 */
export type _v1_bc_company_article_shield_post_req = Required<operations["shieldUsingPOST"]>['requestBody']['content']['application/json']
/** 拉黑 - post响应参数 */
export type _v1_bc_company_article_shield_post_res = Required<operations["shieldUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消关注 - post请求参数 */
export type _v1_bc_company_article_unfollow_post_req = Required<operations["unfollowUsingPOST"]>['requestBody']['content']['application/json']
/** 取消关注 - post响应参数 */
export type _v1_bc_company_article_unfollow_post_res = Required<operations["unfollowUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 作品统计 - get请求参数 */
export type _v1_bc_company_article_workStat_get_req = Required<operations["workStatUsingGET"]>['parameters']['query']
/** 作品统计 - get响应参数 */
export type _v1_bc_company_article_workStat_get_res = Required<operations["workStatUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 内容创作 - post请求参数 */
export type _v1_bc_admin_article_addContent_post_req = Required<operations["addContentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容创作 - post响应参数 */
export type _v1_bc_admin_article_addContent_post_res = Required<operations["addContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 内容机构创造 - post请求参数 */
export type _v1_bc_admin_article_addContentAccount_post_req = Required<operations["addContentAccountUsingPOST"]>['requestBody']['content']['application/json']
/** 内容机构创造 - post响应参数 */
export type _v1_bc_admin_article_addContentAccount_post_res = Required<operations["addContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容分类创造 - post请求参数 */
export type _v1_bc_admin_article_addContentSort_post_req = Required<operations["addContentSortUsingPOST"]>['requestBody']['content']['application/json']
/** 内容分类创造 - post响应参数 */
export type _v1_bc_admin_article_addContentSort_post_res = Required<operations["addContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容渠道查看 - get请求参数 */
export type _v1_bc_admin_article_channel_get_req = Required<operations["channelUsingGET"]>['parameters']['query']
/** 内容渠道查看 - get响应参数 */
export type _v1_bc_admin_article_channel_get_res = Required<operations["channelUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 机构详情 - get请求参数 */
export type _v1_bc_admin_article_contentAccountDetails_get_req = Required<operations["contentAccountDetailsUsingGET"]>['parameters']['query']
/** 机构详情 - get响应参数 */
export type _v1_bc_admin_article_contentAccountDetails_get_res = Required<operations["contentAccountDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 机构列表 - post请求参数 */
export type _v1_bc_admin_article_contentAccountList_post_req = Required<operations["contentAccountListUsingPOST"]>['requestBody']['content']['application/json']
/** 机构列表 - post响应参数 */
export type _v1_bc_admin_article_contentAccountList_post_res = Required<operations["contentAccountListUsingPOST"]>['responses'][200]['content']['*/*']

/** 内容审核列表 - post请求参数 */
export type _v1_bc_admin_article_contentAuditList_post_req = Required<operations["contentAuditListUsingPOST"]>['requestBody']['content']['application/json']
/** 内容审核列表 - post响应参数 */
export type _v1_bc_admin_article_contentAuditList_post_res = Required<operations["contentAuditListUsingPOST"]>['responses'][200]['content']['*/*']

/** 内容详情 - get请求参数 */
export type _v1_bc_admin_article_contentDetails_get_req = Required<operations["contentDetailsUsingGET"]>['parameters']['query']
/** 内容详情 - get响应参数 */
export type _v1_bc_admin_article_contentDetails_get_res = Required<operations["contentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 内容详情 - get请求参数 */
export type _v1_bc_admin_article_contentDetailsByAudit_get_req = Required<operations["contentDetailsByAuditUsingGET"]>['parameters']['query']
/** 内容详情 - get响应参数 */
export type _v1_bc_admin_article_contentDetailsByAudit_get_res = Required<operations["contentDetailsByAuditUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 内容审核 - post请求参数 */
export type _v1_bc_admin_article_contentExamine_post_req = Required<operations["contentExamineUsingPOST"]>['requestBody']['content']['application/json']
/** 内容审核 - post响应参数 */
export type _v1_bc_admin_article_contentExamine_post_res = Required<operations["contentExamineUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容列表 - post请求参数 */
export type _v1_bc_admin_article_contentList_post_req = Required<operations["contentListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 内容列表 - post响应参数 */
export type _v1_bc_admin_article_contentList_post_res = Required<operations["contentListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 内容详情(分享) - get请求参数 */
export type _v1_bc_admin_article_contentShareDetails_get_req = Required<operations["contentShareDetailsUsingGET"]>['parameters']['query']
/** 内容详情(分享) - get响应参数 */
export type _v1_bc_admin_article_contentShareDetails_get_res = Required<operations["contentShareDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 分类详情 - get请求参数 */
export type _v1_bc_admin_article_contentSortDetails_get_req = Required<operations["contentSortDetailsUsingGET"]>['parameters']['query']
/** 分类详情 - get响应参数 */
export type _v1_bc_admin_article_contentSortDetails_get_res = Required<operations["contentSortDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 分类列表 - post请求参数 */
export type _v1_bc_admin_article_contentSortList_post_req = Required<operations["contentSortListUsingPOST"]>['requestBody']['content']['application/json']
/** 分类列表 - post响应参数 */
export type _v1_bc_admin_article_contentSortList_post_res = Required<operations["contentSortListUsingPOST"]>['responses'][200]['content']['*/*']

/** 内容状态操作 - post请求参数 */
export type _v1_bc_admin_article_contentStatus_post_req = Required<operations["contentStatusUsingPOST"]>['requestBody']['content']['application/json']
/** 内容状态操作 - post响应参数 */
export type _v1_bc_admin_article_contentStatus_post_res = Required<operations["contentStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容下架 - post请求参数 */
export type _v1_bc_admin_article_deleteContent_post_req = Required<operations["deleteContentUsingPOST"]>['requestBody']['content']['application/json']
/** 内容下架 - post响应参数 */
export type _v1_bc_admin_article_deleteContent_post_res = Required<operations["deleteContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容机构删除 - post请求参数 */
export type _v1_bc_admin_article_deleteContentAccount_post_req = Required<operations["deleteContentAccountUsingPOST"]>['requestBody']['content']['application/json']
/** 内容机构删除 - post响应参数 */
export type _v1_bc_admin_article_deleteContentAccount_post_res = Required<operations["deleteContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容分类删除 - post请求参数 */
export type _v1_bc_admin_article_deleteContentSort_post_req = Required<operations["deleteContentSortUsingPOST"]>['requestBody']['content']['application/json']
/** 内容分类删除 - post响应参数 */
export type _v1_bc_admin_article_deleteContentSort_post_res = Required<operations["deleteContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容修改 - post请求参数 */
export type _v1_bc_admin_article_editContent_post_req = Required<operations["editContentUsingPOST"]>['requestBody']['content']['application/json']
/** 内容修改 - post响应参数 */
export type _v1_bc_admin_article_editContent_post_res = Required<operations["editContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容机构修改 - post请求参数 */
export type _v1_bc_admin_article_editContentAccount_post_req = Required<operations["editContentAccountUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容机构修改 - post响应参数 */
export type _v1_bc_admin_article_editContentAccount_post_res = Required<operations["editContentAccountUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 内容分类修改 - post请求参数 */
export type _v1_bc_admin_article_editContentSort_post_req = Required<operations["editContentSortUsingPOST"]>['requestBody']['content']['application/json']
/** 内容分类修改 - post响应参数 */
export type _v1_bc_admin_article_editContentSort_post_res = Required<operations["editContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 我的作品 - post请求参数 */
export type _v1_bc_admin_article_myContentList_post_req = Required<operations["myContentListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 我的作品 - post响应参数 */
export type _v1_bc_admin_article_myContentList_post_res = Required<operations["myContentListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 内容删除 - post请求参数 */
export type _v1_bc_admin_article_tDeleteContent_post_req = Required<operations["tDeleteContentUsingPOST"]>['requestBody']['content']['application/json']
/** 内容删除 - post响应参数 */
export type _v1_bc_admin_article_tDeleteContent_post_res = Required<operations["tDeleteContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论点赞 - post请求参数 */
export type _v1_bc_app_article_commentLike_post_req = Required<operations["commentLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 评论点赞 - post响应参数 */
export type _v1_bc_app_article_commentLike_post_res = Required<operations["commentLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论列表 - post请求参数 */
export type _v1_bc_app_article_commentList_post_req = Required<operations["commentListUsingPOST"]>['requestBody']['content']['application/json']
/** 评论列表 - post响应参数 */
export type _v1_bc_app_article_commentList_post_res = Required<operations["commentListUsingPOST"]>['responses'][200]['content']['*/*']

/** 评论回复列表 - post请求参数 */
export type _v1_bc_app_article_commentRelyList_post_req = Required<operations["commentRelyListUsingPOST"]>['requestBody']['content']['application/json']
/** 评论回复列表 - post响应参数 */
export type _v1_bc_app_article_commentRelyList_post_res = Required<operations["commentRelyListUsingPOST"]>['responses'][200]['content']['*/*']

/** 评论列表(分享) - post请求参数 */
export type _v1_bc_app_article_commentShareList_post_req = Required<operations["commentShareListUsingPOST"]>['requestBody']['content']['application/json']
/** 评论列表(分享) - post响应参数 */
export type _v1_bc_app_article_commentShareList_post_res = Required<operations["commentShareListUsingPOST"]>['responses'][200]['content']['*/*']

/** 删除评论 - post请求参数 */
export type _v1_bc_app_article_deleteComment_post_req = Required<operations["deleteCommentUsingPOST"]>['requestBody']['content']['application/json']
/** 删除评论 - post响应参数 */
export type _v1_bc_app_article_deleteComment_post_res = Required<operations["deleteCommentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 收藏 - post请求参数 */
export type _v1_bc_app_article_favorite_post_req = Required<operations["favoriteUsingPOST"]>['requestBody']['content']['application/json']
/** 收藏 - post响应参数 */
export type _v1_bc_app_article_favorite_post_res = Required<operations["favoriteUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 收藏列表 - post请求参数 */
export type _v1_bc_app_article_favoriteList_post_req = Required<operations["favoriteListUsingPOST"]>['requestBody']['content']['application/json']
/** 收藏列表 - post响应参数 */
export type _v1_bc_app_article_favoriteList_post_res = Required<operations["favoriteListUsingPOST"]>['responses'][200]['content']['*/*']

/** 关注 - post请求参数 */
export type _v1_bc_app_article_follow_post_req = Required<operations["followUsingPOST_1"]>['requestBody']['content']['application/json']
/** 关注 - post响应参数 */
export type _v1_bc_app_article_follow_post_res = Required<operations["followUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 点赞 - post请求参数 */
export type _v1_bc_app_article_getLike_post_req = Required<operations["getLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 点赞 - post响应参数 */
export type _v1_bc_app_article_getLike_post_res = Required<operations["getLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 点赞列表 - post请求参数 */
export type _v1_bc_app_article_likeList_post_req = Required<operations["likeListUsingPOST"]>['requestBody']['content']['application/json']
/** 点赞列表 - post响应参数 */
export type _v1_bc_app_article_likeList_post_res = Required<operations["likeListUsingPOST"]>['responses'][200]['content']['*/*']

/** 我的作品 - post请求参数 */
export type _v1_bc_app_article_myContentList_post_req = Required<operations["myContentListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 我的作品 - post响应参数 */
export type _v1_bc_app_article_myContentList_post_res = Required<operations["myContentListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 官网-内容详情 - get请求参数 */
export type _v1_bc_app_article_officialWebsite_contentDetail_get_req = Required<operations["officialWebsiteContentDetailUsingGET"]>['parameters']['query']
/** 官网-内容详情 - get响应参数 */
export type _v1_bc_app_article_officialWebsite_contentDetail_get_res = Required<operations["officialWebsiteContentDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 官网-内容列表 - post请求参数 */
export type _v1_bc_app_article_officialWebsite_contentList_post_req = Required<operations["officialWebsiteContentListUsingPOST"]>['requestBody']['content']['application/json']
/** 官网-内容列表 - post响应参数 */
export type _v1_bc_app_article_officialWebsite_contentList_post_res = Required<operations["officialWebsiteContentListUsingPOST"]>['responses'][200]['content']['*/*']

/** 官网-推荐列表 - get请求参数 */
export type _v1_bc_app_article_officialWebsite_recommendList_get_req = Required<operations["officialWebsiteRecommendListUsingGET"]>['parameters']['query']
/** 官网-推荐列表 - get响应参数 */
export type _v1_bc_app_article_officialWebsite_recommendList_get_res = Required<operations["officialWebsiteRecommendListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 回复 - post请求参数 */
export type _v1_bc_app_article_recover_post_req = Required<operations["recoverUsingPOST"]>['requestBody']['content']['application/json']
/** 回复 - post响应参数 */
export type _v1_bc_app_article_recover_post_res = Required<operations["recoverUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 增加转发量 - post请求参数 */
export type _v1_bc_app_article_retransmission_post_req = Required<operations["retransmissionUsingPOST"]>['requestBody']['content']['application/json']
/** 增加转发量 - post响应参数 */
export type _v1_bc_app_article_retransmission_post_res = Required<operations["retransmissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论 - post请求参数 */
export type _v1_bc_app_article_review_post_req = Required<operations["reviewUsingPOST"]>['requestBody']['content']['application/json']
/** 评论 - post响应参数 */
export type _v1_bc_app_article_review_post_res = Required<operations["reviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 测试 - get请求参数 */
export type _v1_bc_app_article_test_get_req = Required<operations["testUsingGET"]>['parameters']['query']
/** 测试 - get响应参数 */
export type _v1_bc_app_article_test_get_res = Required<operations["testUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 取消评论点赞 - post请求参数 */
export type _v1_bc_app_article_unCommentLike_post_req = Required<operations["unCommentLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 取消评论点赞 - post响应参数 */
export type _v1_bc_app_article_unCommentLike_post_res = Required<operations["unCommentLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消收藏 - post请求参数 */
export type _v1_bc_app_article_unFavorite_post_req = Required<operations["unFavoriteUsingPOST"]>['requestBody']['content']['application/json']
/** 取消收藏 - post响应参数 */
export type _v1_bc_app_article_unFavorite_post_res = Required<operations["unFavoriteUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消点赞 - post请求参数 */
export type _v1_bc_app_article_unLike_post_req = Required<operations["unLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 取消点赞 - post响应参数 */
export type _v1_bc_app_article_unLike_post_res = Required<operations["unLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消关注 - post请求参数 */
export type _v1_bc_app_article_unfollow_post_req = Required<operations["unfollowUsingPOST_1"]>['requestBody']['content']['application/json']
/** 取消关注 - post响应参数 */
export type _v1_bc_app_article_unfollow_post_res = Required<operations["unfollowUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 冻结 - post请求参数 */
export type _v1_bc_admin_article_user_frozen_post_req = Required<operations["frozenUsingPOST"]>['requestBody']['content']['application/json']
/** 冻结 - post响应参数 */
export type _v1_bc_admin_article_user_frozen_post_res = Required<operations["frozenUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 用户是否关注/点赞 - get请求参数 */
export type _v1_bc_app_article_user_actionRecord_get_req = Required<operations["userActionDataUsingGET"]>['parameters']['query']
/** 用户是否关注/点赞 - get响应参数 */
export type _v1_bc_app_article_user_actionRecord_get_res = Required<operations["userActionDataUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 内容创作 - post请求参数 */
export type _v1_bc_app_article_user_addContent_post_req = Required<operations["addContentUsingPOST_2"]>['requestBody']['content']['application/json']
/** 内容创作 - post响应参数 */
export type _v1_bc_app_article_user_addContent_post_res = Required<operations["addContentUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 添加机构 - post请求参数 */
export type _v1_bc_app_article_user_addContentAccount_post_req = Required<operations["addContentAccountUsingPOST_1"]>['requestBody']
/** 添加机构 - post响应参数 */
export type _v1_bc_app_article_user_addContentAccount_post_res = Required<operations["addContentAccountUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 个人创作者数据 - post请求参数 */
export type _v1_bc_app_article_user_articleDataLook_post_req = Required<operations["articleDataLookUsingPOST_1"]>['requestBody']['content']['application/json']
/** 个人创作者数据 - post响应参数 */
export type _v1_bc_app_article_user_articleDataLook_post_res = Required<operations["articleDataLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 个人创作者数据折线图 - post请求参数 */
export type _v1_bc_app_article_user_articleUserDayLook_post_req = Required<operations["articleUserDayLookUsingPOST_1"]>['requestBody']['content']['application/json']
/** 个人创作者数据折线图 - post响应参数 */
export type _v1_bc_app_article_user_articleUserDayLook_post_res = Required<operations["articleUserDayLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 黑名单 - get请求参数 */
export type _v1_bc_app_article_user_blacklist_get_req = Required<operations["blacklistUsingGET"]>['parameters']['query']
/** 黑名单 - get响应参数 */
export type _v1_bc_app_article_user_blacklist_get_res = Required<operations["blacklistUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 机构列表 - post请求参数 */
export type _v1_bc_app_article_user_contentAccountList_post_req = Required<operations["contentAccountListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 机构列表 - post响应参数 */
export type _v1_bc_app_article_user_contentAccountList_post_res = Required<operations["contentAccountListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 内容列表 - post请求参数 */
export type _v1_bc_app_article_user_contentList_post_req = Required<operations["contentListUsingPOST_3"]>['requestBody']['content']['application/json']
/** 内容列表 - post响应参数 */
export type _v1_bc_app_article_user_contentList_post_res = Required<operations["contentListUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 内容下架 - post请求参数 */
export type _v1_bc_app_article_user_deleteContent_post_req = Required<operations["deleteContentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容下架 - post响应参数 */
export type _v1_bc_app_article_user_deleteContent_post_res = Required<operations["deleteContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 内容修改 - post请求参数 */
export type _v1_bc_app_article_user_editContent_post_req = Required<operations["editContentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容修改 - post响应参数 */
export type _v1_bc_app_article_user_editContent_post_res = Required<operations["editContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 个人创造者粉丝数据(昨日) - post请求参数 */
export type _v1_bc_app_article_user_fansDataLook_post_req = Required<operations["fansDataLookUsingPOST_1"]>['requestBody']['content']['application/json']
/** 个人创造者粉丝数据(昨日) - post响应参数 */
export type _v1_bc_app_article_user_fansDataLook_post_res = Required<operations["fansDataLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 粉丝列表 - post请求参数 */
export type _v1_bc_app_article_user_fansList_post_req = Required<operations["fansListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 粉丝列表 - post响应参数 */
export type _v1_bc_app_article_user_fansList_post_res = Required<operations["fansListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 个人创造者粉丝数据折线图 - post请求参数 */
export type _v1_bc_app_article_user_fansUserDayLook_post_req = Required<operations["fansUserDayLookUsingPOST_1"]>['requestBody']['content']['application/json']
/** 个人创造者粉丝数据折线图 - post响应参数 */
export type _v1_bc_app_article_user_fansUserDayLook_post_res = Required<operations["fansUserDayLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 关注列表 - post请求参数 */
export type _v1_bc_app_article_user_followList_post_req = Required<operations["followListUsingPOST"]>['requestBody']['content']['application/json']
/** 关注列表 - post响应参数 */
export type _v1_bc_app_article_user_followList_post_res = Required<operations["followListUsingPOST"]>['responses'][200]['content']['*/*']

/** 首页 - post请求参数 */
export type _v1_bc_app_article_user_homePage_post_req = Required<operations["homePageUsingPOST_1"]>['requestBody']['content']['application/json']
/** 首页 - post响应参数 */
export type _v1_bc_app_article_user_homePage_post_res = Required<operations["homePageUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 内容删除 - post请求参数 */
export type _v1_bc_app_article_user_tDeleteContent_post_req = Required<operations["tDeleteContentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 内容删除 - post响应参数 */
export type _v1_bc_app_article_user_tDeleteContent_post_res = Required<operations["tDeleteContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 阅读时长 - post请求参数 */
export type _v1_bc_app_article_user_viewTime_post_req = Required<operations["viewTimeUsingPOST"]>['requestBody']['content']['application/json']
/** 阅读时长 - post响应参数 */
export type _v1_bc_app_article_user_viewTime_post_res = Required<operations["viewTimeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 创建课程 - post请求参数 */
export type _v1_bc_company_course_add_post_req = Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']
/** 创建课程 - post响应参数 */
export type _v1_bc_company_course_add_post_res = Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论列表 - post请求参数 */
export type _v1_bc_company_course_commentList_post_req = Required<operations["commentListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 评论列表 - post响应参数 */
export type _v1_bc_company_course_commentList_post_res = Required<operations["commentListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 评论回复列表 - post请求参数 */
export type _v1_bc_company_course_commentRelyList_post_req = Required<operations["commentRelyListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 评论回复列表 - post响应参数 */
export type _v1_bc_company_course_commentRelyList_post_res = Required<operations["commentRelyListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_company_course_del_post_req = Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_company_course_del_post_res = Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 删除评论 - post请求参数 */
export type _v1_bc_company_course_deleteComment_post_req = Required<operations["deleteCommentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除评论 - post响应参数 */
export type _v1_bc_company_course_deleteComment_post_res = Required<operations["deleteCommentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 课程详情 - get请求参数 */
export type _v1_bc_company_course_detail_get_req = Required<operations["detailUsingGET_1"]>['parameters']['query']
/** 课程详情 - get响应参数 */
export type _v1_bc_company_course_detail_get_res = Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 其他操作 - post请求参数 */
export type _v1_bc_company_course_doAction_post_req = Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']
/** 其他操作 - post响应参数 */
export type _v1_bc_company_course_doAction_post_res = Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 修改课程 - post请求参数 */
export type _v1_bc_company_course_edit_post_req = Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']
/** 修改课程 - post响应参数 */
export type _v1_bc_company_course_edit_post_res = Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 删除历史发布 - post请求参数 */
export type _v1_bc_company_course_historyDel_post_req = Required<operations["historyDelUsingPOST"]>['requestBody']['content']['application/json']
/** 删除历史发布 - post响应参数 */
export type _v1_bc_company_course_historyDel_post_res = Required<operations["historyDelUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 历史发布列表 - post请求参数 */
export type _v1_bc_company_course_historyList_post_req = Required<operations["historyListUsingPOST"]>['requestBody']['content']['application/json']
/** 历史发布列表 - post响应参数 */
export type _v1_bc_company_course_historyList_post_res = Required<operations["historyListUsingPOST"]>['responses'][200]['content']['*/*']

/** 课程列表 - post请求参数 */
export type _v1_bc_company_course_list_post_req = Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']
/** 课程列表 - post响应参数 */
export type _v1_bc_company_course_list_post_res = Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 回复 - post请求参数 */
export type _v1_bc_company_course_recover_post_req = Required<operations["recoverUsingPOST_1"]>['requestBody']['content']['application/json']
/** 回复 - post响应参数 */
export type _v1_bc_company_course_recover_post_res = Required<operations["recoverUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 课程详情 - get请求参数 */
export type _v1_bc_admin_course_detail_get_req = Required<operations["detailUsingGET_2"]>['parameters']['query']
/** 课程详情 - get响应参数 */
export type _v1_bc_admin_course_detail_get_res = Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 强制下架 - post请求参数 */
export type _v1_bc_admin_course_doForced_post_req = Required<operations["doForcedUsingPOST"]>['requestBody']['content']['application/json']
/** 强制下架 - post响应参数 */
export type _v1_bc_admin_course_doForced_post_res = Required<operations["doForcedUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 课程列表 - post请求参数 */
export type _v1_bc_admin_course_list_post_req = Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']
/** 课程列表 - post响应参数 */
export type _v1_bc_admin_course_list_post_res = Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 设置标签 - post请求参数 */
export type _v1_bc_admin_course_setTag_post_req = Required<operations["setTagUsingPOST"]>['requestBody']['content']['application/json']
/** 设置标签 - post响应参数 */
export type _v1_bc_admin_course_setTag_post_res = Required<operations["setTagUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 批量取消点赞 - post请求参数 */
export type _v1_bc_app_course_batchUnLike_post_req = Required<operations["batchUnLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 批量取消点赞 - post响应参数 */
export type _v1_bc_app_course_batchUnLike_post_res = Required<operations["batchUnLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论列表 - post请求参数 */
export type _v1_bc_app_course_commentList_post_req = Required<operations["commentListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 评论列表 - post响应参数 */
export type _v1_bc_app_course_commentList_post_res = Required<operations["commentListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 评论回复列表 - post请求参数 */
export type _v1_bc_app_course_commentRelyList_post_req = Required<operations["commentRelyListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 评论回复列表 - post响应参数 */
export type _v1_bc_app_course_commentRelyList_post_res = Required<operations["commentRelyListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 删除评论 - post请求参数 */
export type _v1_bc_app_course_deleteComment_post_req = Required<operations["deleteCommentUsingPOST_2"]>['requestBody']['content']['application/json']
/** 删除评论 - post响应参数 */
export type _v1_bc_app_course_deleteComment_post_res = Required<operations["deleteCommentUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 删除观看历史 - post请求参数 */
export type _v1_bc_app_course_deleteView_post_req = Required<operations["deleteViewUsingPOST"]>['requestBody']['content']['application/json']
/** 删除观看历史 - post响应参数 */
export type _v1_bc_app_course_deleteView_post_res = Required<operations["deleteViewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 课程详情 - get请求参数 */
export type _v1_bc_app_course_detail_get_req = Required<operations["detailUsingGET_3"]>['parameters']['query']
/** 课程详情 - get响应参数 */
export type _v1_bc_app_course_detail_get_res = Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 收藏 - post请求参数 */
export type _v1_bc_app_course_favorite_post_req = Required<operations["favoriteUsingPOST_1"]>['requestBody']['content']['application/json']
/** 收藏 - post响应参数 */
export type _v1_bc_app_course_favorite_post_res = Required<operations["favoriteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 收藏列表 - post请求参数 */
export type _v1_bc_app_course_favoriteList_post_req = Required<operations["favoriteListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 收藏列表 - post响应参数 */
export type _v1_bc_app_course_favoriteList_post_res = Required<operations["favoriteListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 关注 - post请求参数 */
export type _v1_bc_app_course_follow_post_req = Required<operations["followUsingPOST_2"]>['requestBody']['content']['application/json']
/** 关注 - post响应参数 */
export type _v1_bc_app_course_follow_post_res = Required<operations["followUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 关注列表 - post请求参数 */
export type _v1_bc_app_course_followList_post_req = Required<operations["followListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 关注列表 - post响应参数 */
export type _v1_bc_app_course_followList_post_res = Required<operations["followListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 点赞 - post请求参数 */
export type _v1_bc_app_course_getLike_post_req = Required<operations["getLikeUsingPOST_1"]>['requestBody']['content']['application/json']
/** 点赞 - post响应参数 */
export type _v1_bc_app_course_getLike_post_res = Required<operations["getLikeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 点赞列表 - post请求参数 */
export type _v1_bc_app_course_likeList_post_req = Required<operations["likeListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 点赞列表 - post响应参数 */
export type _v1_bc_app_course_likeList_post_res = Required<operations["likeListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 课程列表 - post请求参数 */
export type _v1_bc_app_course_list_post_req = Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']
/** 课程列表 - post响应参数 */
export type _v1_bc_app_course_list_post_res = Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 回复 - post请求参数 */
export type _v1_bc_app_course_recover_post_req = Required<operations["recoverUsingPOST_2"]>['requestBody']['content']['application/json']
/** 回复 - post响应参数 */
export type _v1_bc_app_course_recover_post_res = Required<operations["recoverUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 增加转发量 - post请求参数 */
export type _v1_bc_app_course_retransmission_post_req = Required<operations["retransmissionUsingPOST_1"]>['requestBody']['content']['application/json']
/** 增加转发量 - post响应参数 */
export type _v1_bc_app_course_retransmission_post_res = Required<operations["retransmissionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 评论 - post请求参数 */
export type _v1_bc_app_course_review_post_req = Required<operations["reviewUsingPOST_1"]>['requestBody']['content']['application/json']
/** 评论 - post响应参数 */
export type _v1_bc_app_course_review_post_res = Required<operations["reviewUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 取消收藏 - post请求参数 */
export type _v1_bc_app_course_unFavorite_post_req = Required<operations["unFavoriteUsingPOST_1"]>['requestBody']['content']['application/json']
/** 取消收藏 - post响应参数 */
export type _v1_bc_app_course_unFavorite_post_res = Required<operations["unFavoriteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 取消点赞 - post请求参数 */
export type _v1_bc_app_course_unLike_post_req = Required<operations["unLikeUsingPOST_1"]>['requestBody']['content']['application/json']
/** 取消点赞 - post响应参数 */
export type _v1_bc_app_course_unLike_post_res = Required<operations["unLikeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 取消关注 - post请求参数 */
export type _v1_bc_app_course_unfollow_post_req = Required<operations["unfollowUsingPOST_2"]>['requestBody']['content']['application/json']
/** 取消关注 - post响应参数 */
export type _v1_bc_app_course_unfollow_post_res = Required<operations["unfollowUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 阅读列表 - post请求参数 */
export type _v1_bc_app_course_viewList_post_req = Required<operations["viewListUsingPOST"]>['requestBody']['content']['application/json']
/** 阅读列表 - post响应参数 */
export type _v1_bc_app_course_viewList_post_res = Required<operations["viewListUsingPOST"]>['responses'][200]['content']['*/*']

/** 设置观看时长 - get请求参数 */
export type _v1_bc_app_my_course_duration_get_req = Required<operations["setDurationUsingGET"]>['parameters']['query']
/** 设置观看时长 - get响应参数 */
export type _v1_bc_app_my_course_duration_get_res = Required<operations["setDurationUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_app_my_course_list_post_req = Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_app_my_course_list_post_res = Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

/** 活动详情 - get请求参数 */
export type _v1_bc_app_reply_detail_get_req = Required<operations["replyUsingGET"]>['parameters']['query']
/** 活动详情 - get响应参数 */
export type _v1_bc_app_reply_detail_get_res = Required<operations["replyUsingGET"]>['responses'][200]['content']['*/*']['data']

