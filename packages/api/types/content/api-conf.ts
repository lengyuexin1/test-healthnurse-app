export const CONTENT_API = {
    "activity-controller": {
        /** 投稿列表 */
        admin_article_listUsingPOST: "/v1/bc/admin/activity/article/list",
        /** 活动操作状态 */
        doAuditUsingPOST: "/v1/bc/admin/activity/audit",
        /** 删除 */
        deleteUsingPOST: "/v1/bc/admin/activity/delete",
        /** 活动详情 */
        admin_detailUsingGET: "/v1/bc/admin/activity/detail",
        /** 活动列表 */
        admin_listUsingPOST: "/v1/bc/admin/activity/list",
        /** 活动新增修改 */
        doSaveUsingPOST: "/v1/bc/admin/activity/save",
        /** 活动详情 */
        detailUsingGET: "/v1/bc/app/activity/detail",
        /** 活动列表 */
        listUsingPOST: "/v1/bc/app/activity/list",
        /** 活动列表 */
        my_listUsingPOST: "/v1/bc/app/activity/my/list"
    },
    "article-category-controller": {
        /** 类目列表 */
        getUsingPOST: "/v1/bc/app/article/category/get"
    },
    "article-category-show-controller": {
        /** 删除 */
        deleteUsingPOST_1: "/v1/bc/admin/article/categoryShow/delete",
        /** 列表 */
        listUsingGET: "/v1/bc/admin/article/categoryShow/list",
        /** 添加 */
        saveDataUsingPOST: "/v1/bc/admin/article/categoryShow/save",
        /** 排序 */
        sortUsingPOST: "/v1/bc/admin/article/categoryShow/sort",
        /** 前台类目同步 */
        syncCategoryToCategoryShowUsingPOST: "/v1/bc/admin/article/categoryShow/syncCategoryToCategoryShow",
        /** 内容列表 */
        contentListUsingPOST: "/v1/bc/app/article/categoryShow/contentList",
        /** 类目列表 */
        listUsingGET_1: "/v1/bc/app/article/categoryShow/list"
    },
    "article-company-controller": {
        /** 内容创作 */
        addContentUsingPOST: "/v1/bc/company/article/addContent",
        /** 机构创作者数据 */
        articleDataLookUsingPOST: "/v1/bc/company/article/articleDataLook",
        /** 机构创作者数据折线图 */
        articleUserDayLookUsingPOST: "/v1/bc/company/article/articleUserDayLook",
        /** 黑名单列表 */
        blacklistListUsingPOST: "/v1/bc/company/article/blacklistList",
        /** 内容列表 */
        contentListUsingPOST_1: "/v1/bc/company/article/contentList",
        /** 内容机构修改 */
        editContentAccountUsingPOST: "/v1/bc/company/article/editContentAccount",
        /** 机构创造者粉丝数据(昨日) */
        fansDataLookUsingPOST: "/v1/bc/company/article/fansDataLook",
        /** 粉丝列表 */
        fansListUsingPOST: "/v1/bc/company/article/fansList",
        /** 粉丝关注列表 */
        fansLogListUsingPOST: "/v1/bc/company/article/fansLogList",
        /** 机构创造者粉丝数据折线图 */
        fansUserDayLookUsingPOST: "/v1/bc/company/article/fansUserDayLook",
        /** 关注 */
        followUsingPOST: "/v1/bc/company/article/follow",
        /** 首页 */
        homePageUsingPOST: "/v1/bc/company/article/homePage",
        /** 点赞列表 */
        likeLogListUsingPOST: "/v1/bc/company/article/likeLogList",
        /** 我的作品 */
        myContentListUsingPOST: "/v1/bc/company/article/myContentList",
        /** 拉黑 */
        shieldUsingPOST: "/v1/bc/company/article/shield",
        /** 取消关注 */
        unfollowUsingPOST: "/v1/bc/company/article/unfollow",
        /** 作品统计 */
        workStatUsingGET: "/v1/bc/company/article/workStat"
    },
    "article-controller": {
        /** 内容创作 */
        addContentUsingPOST_1: "/v1/bc/admin/article/addContent",
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
        /** 内容审核列表 */
        contentAuditListUsingPOST: "/v1/bc/admin/article/contentAuditList",
        /** 内容详情 */
        contentDetailsUsingGET: "/v1/bc/admin/article/contentDetails",
        /** 内容详情 */
        contentDetailsByAuditUsingGET: "/v1/bc/admin/article/contentDetailsByAudit",
        /** 内容审核 */
        contentExamineUsingPOST: "/v1/bc/admin/article/contentExamine",
        /** 内容列表 */
        contentListUsingPOST_2: "/v1/bc/admin/article/contentList",
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
        editContentAccountUsingPOST_1: "/v1/bc/admin/article/editContentAccount",
        /** 内容分类修改 */
        editContentSortUsingPOST: "/v1/bc/admin/article/editContentSort",
        /** 我的作品 */
        myContentListUsingPOST_1: "/v1/bc/admin/article/myContentList",
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
        followUsingPOST_1: "/v1/bc/app/article/follow",
        /** 点赞 */
        getLikeUsingPOST: "/v1/bc/app/article/getLike",
        /** 点赞列表 */
        likeListUsingPOST: "/v1/bc/app/article/likeList",
        /** 我的作品 */
        myContentListUsingPOST_2: "/v1/bc/app/article/myContentList",
        /** 官网-内容详情 */
        officialWebsiteContentDetailUsingGET: "/v1/bc/app/article/officialWebsite/contentDetail",
        /** 官网-内容列表 */
        officialWebsiteContentListUsingPOST: "/v1/bc/app/article/officialWebsite/contentList",
        /** 官网-推荐列表 */
        officialWebsiteRecommendListUsingGET: "/v1/bc/app/article/officialWebsite/recommendList",
        /** 回复 */
        recoverUsingPOST: "/v1/bc/app/article/recover",
        /** 增加转发量 */
        retransmissionUsingPOST: "/v1/bc/app/article/retransmission",
        /** 评论 */
        reviewUsingPOST: "/v1/bc/app/article/review",
        /** 测试 */
        testUsingGET: "/v1/bc/app/article/test",
        /** 取消评论点赞 */
        unCommentLikeUsingPOST: "/v1/bc/app/article/unCommentLike",
        /** 取消收藏 */
        unFavoriteUsingPOST: "/v1/bc/app/article/unFavorite",
        /** 取消点赞 */
        unLikeUsingPOST: "/v1/bc/app/article/unLike",
        /** 取消关注 */
        unfollowUsingPOST_1: "/v1/bc/app/article/unfollow"
    },
    "article-user-controller": {
        /** 冻结 */
        frozenUsingPOST: "/v1/bc/admin/article/user/frozen",
        /** 用户是否关注/点赞 */
        userActionDataUsingGET: "/v1/bc/app/article/user/actionRecord",
        /** 内容创作 */
        addContentUsingPOST_2: "/v1/bc/app/article/user/addContent",
        /** 添加机构 */
        addContentAccountUsingPOST_1: "/v1/bc/app/article/user/addContentAccount",
        /** 个人创作者数据 */
        articleDataLookUsingPOST_1: "/v1/bc/app/article/user/articleDataLook",
        /** 个人创作者数据折线图 */
        articleUserDayLookUsingPOST_1: "/v1/bc/app/article/user/articleUserDayLook",
        /** 黑名单 */
        blacklistUsingGET: "/v1/bc/app/article/user/blacklist",
        /** 机构列表 */
        contentAccountListUsingPOST_1: "/v1/bc/app/article/user/contentAccountList",
        /** 内容列表 */
        contentListUsingPOST_3: "/v1/bc/app/article/user/contentList",
        /** 内容下架 */
        deleteContentUsingPOST_1: "/v1/bc/app/article/user/deleteContent",
        /** 内容修改 */
        editContentUsingPOST_1: "/v1/bc/app/article/user/editContent",
        /** 个人创造者粉丝数据(昨日) */
        fansDataLookUsingPOST_1: "/v1/bc/app/article/user/fansDataLook",
        /** 粉丝列表 */
        fansListUsingPOST_1: "/v1/bc/app/article/user/fansList",
        /** 个人创造者粉丝数据折线图 */
        fansUserDayLookUsingPOST_1: "/v1/bc/app/article/user/fansUserDayLook",
        /** 关注列表 */
        followListUsingPOST: "/v1/bc/app/article/user/followList",
        /** 首页 */
        homePageUsingPOST_1: "/v1/bc/app/article/user/homePage",
        /** 内容删除 */
        tDeleteContentUsingPOST_1: "/v1/bc/app/article/user/tDeleteContent",
        /** 阅读时长 */
        viewTimeUsingPOST: "/v1/bc/app/article/user/viewTime"
    },
    "course-company-controller": {
        /** 创建课程 */
        addUsingPOST: "/v1/bc/company/course/add",
        /** 评论列表 */
        commentListUsingPOST_1: "/v1/bc/company/course/commentList",
        /** 评论回复列表 */
        commentRelyListUsingPOST_1: "/v1/bc/company/course/commentRelyList",
        /** 删除 */
        delUsingPOST: "/v1/bc/company/course/del",
        /** 删除评论 */
        deleteCommentUsingPOST_1: "/v1/bc/company/course/deleteComment",
        /** 课程详情 */
        detailUsingGET_1: "/v1/bc/company/course/detail",
        /** 其他操作 */
        doActionUsingPOST: "/v1/bc/company/course/doAction",
        /** 修改课程 */
        editUsingPOST: "/v1/bc/company/course/edit",
        /** 删除历史发布 */
        historyDelUsingPOST: "/v1/bc/company/course/historyDel",
        /** 历史发布列表 */
        historyListUsingPOST: "/v1/bc/company/course/historyList",
        /** 课程列表 */
        listUsingPOST_1: "/v1/bc/company/course/list",
        /** 回复 */
        recoverUsingPOST_1: "/v1/bc/company/course/recover"
    },
    "course-controller": {
        /** 课程详情 */
        detailUsingGET_2: "/v1/bc/admin/course/detail",
        /** 强制下架 */
        doForcedUsingPOST: "/v1/bc/admin/course/doForced",
        /** 课程列表 */
        listUsingPOST_2: "/v1/bc/admin/course/list",
        /** 设置标签 */
        setTagUsingPOST: "/v1/bc/admin/course/setTag",
        /** 批量取消点赞 */
        batchUnLikeUsingPOST: "/v1/bc/app/course/batchUnLike",
        /** 评论列表 */
        commentListUsingPOST_2: "/v1/bc/app/course/commentList",
        /** 评论回复列表 */
        commentRelyListUsingPOST_2: "/v1/bc/app/course/commentRelyList",
        /** 删除评论 */
        deleteCommentUsingPOST_2: "/v1/bc/app/course/deleteComment",
        /** 删除观看历史 */
        deleteViewUsingPOST: "/v1/bc/app/course/deleteView",
        /** 课程详情 */
        detailUsingGET_3: "/v1/bc/app/course/detail",
        /** 收藏 */
        favoriteUsingPOST_1: "/v1/bc/app/course/favorite",
        /** 收藏列表 */
        favoriteListUsingPOST_1: "/v1/bc/app/course/favoriteList",
        /** 关注 */
        followUsingPOST_2: "/v1/bc/app/course/follow",
        /** 关注列表 */
        followListUsingPOST_1: "/v1/bc/app/course/followList",
        /** 点赞 */
        getLikeUsingPOST_1: "/v1/bc/app/course/getLike",
        /** 点赞列表 */
        likeListUsingPOST_1: "/v1/bc/app/course/likeList",
        /** 课程列表 */
        listUsingPOST_3: "/v1/bc/app/course/list",
        /** 回复 */
        recoverUsingPOST_2: "/v1/bc/app/course/recover",
        /** 增加转发量 */
        retransmissionUsingPOST_1: "/v1/bc/app/course/retransmission",
        /** 评论 */
        reviewUsingPOST_1: "/v1/bc/app/course/review",
        /** 取消收藏 */
        unFavoriteUsingPOST_1: "/v1/bc/app/course/unFavorite",
        /** 取消点赞 */
        unLikeUsingPOST_1: "/v1/bc/app/course/unLike",
        /** 取消关注 */
        unfollowUsingPOST_2: "/v1/bc/app/course/unfollow",
        /** 阅读列表 */
        viewListUsingPOST: "/v1/bc/app/course/viewList"
    },
    "my-course-controller": {
        /** 设置观看时长 */
        setDurationUsingGET: "/v1/bc/app/my/course/duration",
        /** 列表 */
        listByPageUsingPOST: "/v1/bc/app/my/course/list"
    },
    "reply-controller": {
        /** 活动详情 */
        replyUsingGET: "/v1/bc/app/reply/detail"
    }
}
