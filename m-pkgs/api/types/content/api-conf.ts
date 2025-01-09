export const CONTENT_API = {
    "article-controller": {
        /** 内容创作 */
        addContentUsingPOST: "/v1/bc/admin/article/addContent",
        /** 内容机构创造 */
        addContentAccountUsingPOST: "/v1/bc/admin/article/addContentAccount",
        /** 内容分类创造 */
        addContentSortUsingPOST: "/v1/bc/admin/article/addContentSort",
        /** 内容渠道查看 */
        channelUsingGET: "/v1/bc/admin/article/channel",
        /** 机构详情 */
        contentAccountDetailsUsingGET: "/v1/bc/admin/article/contentAccountDetails",
        /** 机构列表 */
        contentAccountListUsingPOST: "/v1/bc/admin/article/contentAccountList",
        /** 内容详情 */
        contentDetailsUsingGET: "/v1/bc/admin/article/contentDetails",
        /** 内容审核 */
        contentExamineUsingPOST: "/v1/bc/admin/article/contentExamine",
        /** 内容列表 */
        contentListUsingPOST: "/v1/bc/admin/article/contentList",
        /** 内容详情(分享) */
        contentShareDetailsUsingGET: "/v1/bc/admin/article/contentShareDetails",
        /** 分类详情 */
        contentSortDetailsUsingGET: "/v1/bc/admin/article/contentSortDetails",
        /** 分类列表 */
        contentSortListUsingPOST: "/v1/bc/admin/article/contentSortList",
        /** 内容状态操作 */
        contentStatusUsingPOST: "/v1/bc/admin/article/contentStatus",
        /** 内容下架 */
        deleteContentUsingPOST: "/v1/bc/admin/article/deleteContent",
        /** 内容机构删除 */
        deleteContentAccountUsingPOST: "/v1/bc/admin/article/deleteContentAccount",
        /** 内容分类删除 */
        deleteContentSortUsingPOST: "/v1/bc/admin/article/deleteContentSort",
        /** 内容修改 */
        editContentUsingPOST: "/v1/bc/admin/article/editContent",
        /** 内容机构修改 */
        editContentAccountUsingPOST: "/v1/bc/admin/article/editContentAccount",
        /** 内容分类修改 */
        editContentSortUsingPOST: "/v1/bc/admin/article/editContentSort",
        /** 内容删除 */
        tDeleteContentUsingPOST: "/v1/bc/admin/article/tDeleteContent",
        /** 评论点赞 */
        commentLikeUsingPOST: "/v1/bc/app/article/commentLike",
        /** 评论列表 */
        commentListUsingPOST: "/v1/bc/app/article/commentList",
        /** 评论回复列表 */
        commentRelyListUsingPOST: "/v1/bc/app/article/commentRelyList",
        /** 评论列表(分享) */
        commentShareListUsingPOST: "/v1/bc/app/article/commentShareList",
        /** 删除评论 */
        deleteCommentUsingPOST: "/v1/bc/app/article/deleteComment",
        /** 收藏 */
        favoriteUsingPOST: "/v1/bc/app/article/favorite",
        /** 收藏列表 */
        favoriteListUsingPOST: "/v1/bc/app/article/favoriteList",
        /** 关注 */
        followUsingPOST: "/v1/bc/app/article/follow",
        /** 点赞 */
        getLikeUsingPOST: "/v1/bc/app/article/getLike",
        /** 点赞列表 */
        likeListUsingPOST: "/v1/bc/app/article/likeList",
        /** 回复 */
        reviewUsingPOST: "/v1/bc/app/article/recover",
        /** 增加转发量 */
        retransmissionUsingPOST: "/v1/bc/app/article/retransmission",
        /** 评论 */
        reviewUsingPOST_1: "/v1/bc/app/article/review",
        /** 测试 */
        testUsingGET: "/v1/bc/app/article/test",
        /** 取消评论点赞 */
        unCommentLikeUsingPOST: "/v1/bc/app/article/unCommentLike",
        /** 取消收藏 */
        unFavoriteUsingPOST: "/v1/bc/app/article/unFavorite",
        /** 取消点赞 */
        unLikeUsingPOST: "/v1/bc/app/article/unLike",
        /** 取消关注 */
        unfollowUsingPOST: "/v1/bc/app/article/unfollow"
    }
}
