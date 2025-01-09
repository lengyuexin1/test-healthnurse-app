import type { operations } from './schema'

export interface IContentPostRequest {
    /** 内容创作 */
    "/v1/bc/admin/article/addContent": Required<operations["addContentUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容机构创造 */
    "/v1/bc/admin/article/addContentAccount": Required<operations["addContentAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容分类创造 */
    "/v1/bc/admin/article/addContentSort": Required<operations["addContentSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构列表 */
    "/v1/bc/admin/article/contentAccountList": Required<operations["contentAccountListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容审核 */
    "/v1/bc/admin/article/contentExamine": Required<operations["contentExamineUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容列表 */
    "/v1/bc/admin/article/contentList": Required<operations["contentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 分类列表 */
    "/v1/bc/admin/article/contentSortList": Required<operations["contentSortListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容状态操作 */
    "/v1/bc/admin/article/contentStatus": Required<operations["contentStatusUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容下架 */
    "/v1/bc/admin/article/deleteContent": Required<operations["deleteContentUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容机构删除 */
    "/v1/bc/admin/article/deleteContentAccount": Required<operations["deleteContentAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容分类删除 */
    "/v1/bc/admin/article/deleteContentSort": Required<operations["deleteContentSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容修改 */
    "/v1/bc/admin/article/editContent": Required<operations["editContentUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容机构修改 */
    "/v1/bc/admin/article/editContentAccount": Required<operations["editContentAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容分类修改 */
    "/v1/bc/admin/article/editContentSort": Required<operations["editContentSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容删除 */
    "/v1/bc/admin/article/tDeleteContent": Required<operations["tDeleteContentUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论点赞 */
    "/v1/bc/app/article/commentLike": Required<operations["commentLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论列表 */
    "/v1/bc/app/article/commentList": Required<operations["commentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论回复列表 */
    "/v1/bc/app/article/commentRelyList": Required<operations["commentRelyListUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论列表(分享) */
    "/v1/bc/app/article/commentShareList": Required<operations["commentShareListUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除评论 */
    "/v1/bc/app/article/deleteComment": Required<operations["deleteCommentUsingPOST"]>['requestBody']['content']['application/json']

    /** 收藏 */
    "/v1/bc/app/article/favorite": Required<operations["favoriteUsingPOST"]>['requestBody']['content']['application/json']

    /** 收藏列表 */
    "/v1/bc/app/article/favoriteList": Required<operations["favoriteListUsingPOST"]>['requestBody']['content']['application/json']

    /** 关注 */
    "/v1/bc/app/article/follow": Required<operations["followUsingPOST"]>['requestBody']['content']['application/json']

    /** 点赞 */
    "/v1/bc/app/article/getLike": Required<operations["getLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 点赞列表 */
    "/v1/bc/app/article/likeList": Required<operations["likeListUsingPOST"]>['requestBody']['content']['application/json']

    /** 回复 */
    "/v1/bc/app/article/recover": Required<operations["reviewUsingPOST"]>['requestBody']['content']['application/json']

    /** 增加转发量 */
    "/v1/bc/app/article/retransmission": Required<operations["retransmissionUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论 */
    "/v1/bc/app/article/review": Required<operations["reviewUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 取消评论点赞 */
    "/v1/bc/app/article/unCommentLike": Required<operations["unCommentLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消收藏 */
    "/v1/bc/app/article/unFavorite": Required<operations["unFavoriteUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消点赞 */
    "/v1/bc/app/article/unLike": Required<operations["unLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消关注 */
    "/v1/bc/app/article/unfollow": Required<operations["unfollowUsingPOST"]>['requestBody']['content']['application/json']

}
