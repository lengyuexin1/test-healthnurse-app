import type { operations } from './schema'

/** 内容创作 - post请求参数 */
export type _v1_bc_admin_article_addContent_post_req = Required<operations["addContentUsingPOST"]>['requestBody']['content']['application/json']
/** 内容创作 - post响应参数 */
export type _v1_bc_admin_article_addContent_post_res = Required<operations["addContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

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

/** 内容详情 - get请求参数 */
export type _v1_bc_admin_article_contentDetails_get_req = Required<operations["contentDetailsUsingGET"]>['parameters']['query']
/** 内容详情 - get响应参数 */
export type _v1_bc_admin_article_contentDetails_get_res = Required<operations["contentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 内容审核 - post请求参数 */
export type _v1_bc_admin_article_contentExamine_post_req = Required<operations["contentExamineUsingPOST"]>['requestBody']['content']['application/json']
/** 内容审核 - post响应参数 */
export type _v1_bc_admin_article_contentExamine_post_res = Required<operations["contentExamineUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容列表 - post请求参数 */
export type _v1_bc_admin_article_contentList_post_req = Required<operations["contentListUsingPOST"]>['requestBody']['content']['application/json']
/** 内容列表 - post响应参数 */
export type _v1_bc_admin_article_contentList_post_res = Required<operations["contentListUsingPOST"]>['responses'][200]['content']['*/*']

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
export type _v1_bc_admin_article_editContentAccount_post_req = Required<operations["editContentAccountUsingPOST"]>['requestBody']['content']['application/json']
/** 内容机构修改 - post响应参数 */
export type _v1_bc_admin_article_editContentAccount_post_res = Required<operations["editContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 内容分类修改 - post请求参数 */
export type _v1_bc_admin_article_editContentSort_post_req = Required<operations["editContentSortUsingPOST"]>['requestBody']['content']['application/json']
/** 内容分类修改 - post响应参数 */
export type _v1_bc_admin_article_editContentSort_post_res = Required<operations["editContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

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
export type _v1_bc_app_article_follow_post_req = Required<operations["followUsingPOST"]>['requestBody']['content']['application/json']
/** 关注 - post响应参数 */
export type _v1_bc_app_article_follow_post_res = Required<operations["followUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 点赞 - post请求参数 */
export type _v1_bc_app_article_getLike_post_req = Required<operations["getLikeUsingPOST"]>['requestBody']['content']['application/json']
/** 点赞 - post响应参数 */
export type _v1_bc_app_article_getLike_post_res = Required<operations["getLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 点赞列表 - post请求参数 */
export type _v1_bc_app_article_likeList_post_req = Required<operations["likeListUsingPOST"]>['requestBody']['content']['application/json']
/** 点赞列表 - post响应参数 */
export type _v1_bc_app_article_likeList_post_res = Required<operations["likeListUsingPOST"]>['responses'][200]['content']['*/*']

/** 回复 - post请求参数 */
export type _v1_bc_app_article_recover_post_req = Required<operations["reviewUsingPOST"]>['requestBody']['content']['application/json']
/** 回复 - post响应参数 */
export type _v1_bc_app_article_recover_post_res = Required<operations["reviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 增加转发量 - post请求参数 */
export type _v1_bc_app_article_retransmission_post_req = Required<operations["retransmissionUsingPOST"]>['requestBody']['content']['application/json']
/** 增加转发量 - post响应参数 */
export type _v1_bc_app_article_retransmission_post_res = Required<operations["retransmissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 评论 - post请求参数 */
export type _v1_bc_app_article_review_post_req = Required<operations["reviewUsingPOST_1"]>['requestBody']['content']['application/json']
/** 评论 - post响应参数 */
export type _v1_bc_app_article_review_post_res = Required<operations["reviewUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

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
export type _v1_bc_app_article_unfollow_post_req = Required<operations["unfollowUsingPOST"]>['requestBody']['content']['application/json']
/** 取消关注 - post响应参数 */
export type _v1_bc_app_article_unfollow_post_res = Required<operations["unfollowUsingPOST"]>['responses'][200]['content']['*/*']['data']

