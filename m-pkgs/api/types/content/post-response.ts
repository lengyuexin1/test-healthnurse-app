import type { operations } from './schema'

export interface IContentPostResponse {
    /** 内容创作 */
    "/v1/bc/admin/article/addContent": Required<operations["addContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容机构创造 */
    "/v1/bc/admin/article/addContentAccount": Required<operations["addContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容分类创造 */
    "/v1/bc/admin/article/addContentSort": Required<operations["addContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 机构列表 */
    "/v1/bc/admin/article/contentAccountList": Required<operations["contentAccountListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容审核 */
    "/v1/bc/admin/article/contentExamine": Required<operations["contentExamineUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容列表 */
    "/v1/bc/admin/article/contentList": Required<operations["contentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 分类列表 */
    "/v1/bc/admin/article/contentSortList": Required<operations["contentSortListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容状态操作 */
    "/v1/bc/admin/article/contentStatus": Required<operations["contentStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容下架 */
    "/v1/bc/admin/article/deleteContent": Required<operations["deleteContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容机构删除 */
    "/v1/bc/admin/article/deleteContentAccount": Required<operations["deleteContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容分类删除 */
    "/v1/bc/admin/article/deleteContentSort": Required<operations["deleteContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容修改 */
    "/v1/bc/admin/article/editContent": Required<operations["editContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容机构修改 */
    "/v1/bc/admin/article/editContentAccount": Required<operations["editContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容分类修改 */
    "/v1/bc/admin/article/editContentSort": Required<operations["editContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容删除 */
    "/v1/bc/admin/article/tDeleteContent": Required<operations["tDeleteContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论点赞 */
    "/v1/bc/app/article/commentLike": Required<operations["commentLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论列表 */
    "/v1/bc/app/article/commentList": Required<operations["commentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 评论回复列表 */
    "/v1/bc/app/article/commentRelyList": Required<operations["commentRelyListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 评论列表(分享) */
    "/v1/bc/app/article/commentShareList": Required<operations["commentShareListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 删除评论 */
    "/v1/bc/app/article/deleteComment": Required<operations["deleteCommentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 收藏 */
    "/v1/bc/app/article/favorite": Required<operations["favoriteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 收藏列表 */
    "/v1/bc/app/article/favoriteList": Required<operations["favoriteListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 关注 */
    "/v1/bc/app/article/follow": Required<operations["followUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 点赞 */
    "/v1/bc/app/article/getLike": Required<operations["getLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 点赞列表 */
    "/v1/bc/app/article/likeList": Required<operations["likeListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 回复 */
    "/v1/bc/app/article/recover": Required<operations["reviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 增加转发量 */
    "/v1/bc/app/article/retransmission": Required<operations["retransmissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论 */
    "/v1/bc/app/article/review": Required<operations["reviewUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 取消评论点赞 */
    "/v1/bc/app/article/unCommentLike": Required<operations["unCommentLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消收藏 */
    "/v1/bc/app/article/unFavorite": Required<operations["unFavoriteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消点赞 */
    "/v1/bc/app/article/unLike": Required<operations["unLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消关注 */
    "/v1/bc/app/article/unfollow": Required<operations["unfollowUsingPOST"]>['responses'][200]['content']['*/*']['data']

}
