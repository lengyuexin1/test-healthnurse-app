import type { operations } from './schema'

export interface IContentPostResponse {
    /** 投稿列表 */
    "/v1/bc/admin/activity/article/list": Required<operations["admin_article_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 活动操作状态 */
    "/v1/bc/admin/activity/audit": Required<operations["doAuditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除 */
    "/v1/bc/admin/activity/delete": Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 活动列表 */
    "/v1/bc/admin/activity/list": Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 活动新增修改 */
    "/v1/bc/admin/activity/save": Required<operations["doSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 活动列表 */
    "/v1/bc/app/activity/list": Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 活动列表 */
    "/v1/bc/app/activity/my/list": Required<operations["my_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 类目列表 */
    "/v1/bc/app/article/category/get": Required<operations["getUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除 */
    "/v1/bc/admin/article/categoryShow/delete": Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 添加 */
    "/v1/bc/admin/article/categoryShow/save": Required<operations["saveDataUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 排序 */
    "/v1/bc/admin/article/categoryShow/sort": Required<operations["sortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 前台类目同步 */
    "/v1/bc/admin/article/categoryShow/syncCategoryToCategoryShow": Required<operations["syncCategoryToCategoryShowUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容列表 */
    "/v1/bc/app/article/categoryShow/contentList": Required<operations["contentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容创作 */
    "/v1/bc/company/article/addContent": Required<operations["addContentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 机构创作者数据 */
    "/v1/bc/company/article/articleDataLook": Required<operations["articleDataLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 机构创作者数据折线图 */
    "/v1/bc/company/article/articleUserDayLook": Required<operations["articleUserDayLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 黑名单列表 */
    "/v1/bc/company/article/blacklistList": Required<operations["blacklistListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容列表 */
    "/v1/bc/company/article/contentList": Required<operations["contentListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 内容机构修改 */
    "/v1/bc/company/article/editContentAccount": Required<operations["editContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 机构创造者粉丝数据(昨日) */
    "/v1/bc/company/article/fansDataLook": Required<operations["fansDataLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 粉丝列表 */
    "/v1/bc/company/article/fansList": Required<operations["fansListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 粉丝关注列表 */
    "/v1/bc/company/article/fansLogList": Required<operations["fansLogListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 机构创造者粉丝数据折线图 */
    "/v1/bc/company/article/fansUserDayLook": Required<operations["fansUserDayLookUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 关注 */
    "/v1/bc/company/article/follow": Required<operations["followUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 首页 */
    "/v1/bc/company/article/homePage": Required<operations["homePageUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 点赞列表 */
    "/v1/bc/company/article/likeLogList": Required<operations["likeLogListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 我的作品 */
    "/v1/bc/company/article/myContentList": Required<operations["myContentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 拉黑 */
    "/v1/bc/company/article/shield": Required<operations["shieldUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消关注 */
    "/v1/bc/company/article/unfollow": Required<operations["unfollowUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容创作 */
    "/v1/bc/admin/article/addContent": Required<operations["addContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 内容机构创造 */
    "/v1/bc/admin/article/addContentAccount": Required<operations["addContentAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容分类创造 */
    "/v1/bc/admin/article/addContentSort": Required<operations["addContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 机构列表 */
    "/v1/bc/admin/article/contentAccountList": Required<operations["contentAccountListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容审核列表 */
    "/v1/bc/admin/article/contentAuditList": Required<operations["contentAuditListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 内容审核 */
    "/v1/bc/admin/article/contentExamine": Required<operations["contentExamineUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容列表 */
    "/v1/bc/admin/article/contentList": Required<operations["contentListUsingPOST_2"]>['responses'][200]['content']['*/*']

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
    "/v1/bc/admin/article/editContentAccount": Required<operations["editContentAccountUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 内容分类修改 */
    "/v1/bc/admin/article/editContentSort": Required<operations["editContentSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 我的作品 */
    "/v1/bc/admin/article/myContentList": Required<operations["myContentListUsingPOST_1"]>['responses'][200]['content']['*/*']

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
    "/v1/bc/app/article/follow": Required<operations["followUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 点赞 */
    "/v1/bc/app/article/getLike": Required<operations["getLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 点赞列表 */
    "/v1/bc/app/article/likeList": Required<operations["likeListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 我的作品 */
    "/v1/bc/app/article/myContentList": Required<operations["myContentListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 官网-内容列表 */
    "/v1/bc/app/article/officialWebsite/contentList": Required<operations["officialWebsiteContentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 回复 */
    "/v1/bc/app/article/recover": Required<operations["recoverUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 增加转发量 */
    "/v1/bc/app/article/retransmission": Required<operations["retransmissionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论 */
    "/v1/bc/app/article/review": Required<operations["reviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消评论点赞 */
    "/v1/bc/app/article/unCommentLike": Required<operations["unCommentLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消收藏 */
    "/v1/bc/app/article/unFavorite": Required<operations["unFavoriteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消点赞 */
    "/v1/bc/app/article/unLike": Required<operations["unLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消关注 */
    "/v1/bc/app/article/unfollow": Required<operations["unfollowUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 冻结 */
    "/v1/bc/admin/article/user/frozen": Required<operations["frozenUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 内容创作 */
    "/v1/bc/app/article/user/addContent": Required<operations["addContentUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 添加机构 */
    "/v1/bc/app/article/user/addContentAccount": Required<operations["addContentAccountUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 个人创作者数据 */
    "/v1/bc/app/article/user/articleDataLook": Required<operations["articleDataLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 个人创作者数据折线图 */
    "/v1/bc/app/article/user/articleUserDayLook": Required<operations["articleUserDayLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 机构列表 */
    "/v1/bc/app/article/user/contentAccountList": Required<operations["contentAccountListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 内容列表 */
    "/v1/bc/app/article/user/contentList": Required<operations["contentListUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 内容下架 */
    "/v1/bc/app/article/user/deleteContent": Required<operations["deleteContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 内容修改 */
    "/v1/bc/app/article/user/editContent": Required<operations["editContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 个人创造者粉丝数据(昨日) */
    "/v1/bc/app/article/user/fansDataLook": Required<operations["fansDataLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 粉丝列表 */
    "/v1/bc/app/article/user/fansList": Required<operations["fansListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 个人创造者粉丝数据折线图 */
    "/v1/bc/app/article/user/fansUserDayLook": Required<operations["fansUserDayLookUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 关注列表 */
    "/v1/bc/app/article/user/followList": Required<operations["followListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 首页 */
    "/v1/bc/app/article/user/homePage": Required<operations["homePageUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 内容删除 */
    "/v1/bc/app/article/user/tDeleteContent": Required<operations["tDeleteContentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 阅读时长 */
    "/v1/bc/app/article/user/viewTime": Required<operations["viewTimeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 创建课程 */
    "/v1/bc/company/course/add": Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论列表 */
    "/v1/bc/company/course/commentList": Required<operations["commentListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 评论回复列表 */
    "/v1/bc/company/course/commentRelyList": Required<operations["commentRelyListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/company/course/del": Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除评论 */
    "/v1/bc/company/course/deleteComment": Required<operations["deleteCommentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 其他操作 */
    "/v1/bc/company/course/doAction": Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 修改课程 */
    "/v1/bc/company/course/edit": Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除历史发布 */
    "/v1/bc/company/course/historyDel": Required<operations["historyDelUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 历史发布列表 */
    "/v1/bc/company/course/historyList": Required<operations["historyListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 课程列表 */
    "/v1/bc/company/course/list": Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 回复 */
    "/v1/bc/company/course/recover": Required<operations["recoverUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 强制下架 */
    "/v1/bc/admin/course/doForced": Required<operations["doForcedUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 课程列表 */
    "/v1/bc/admin/course/list": Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 设置标签 */
    "/v1/bc/admin/course/setTag": Required<operations["setTagUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 批量取消点赞 */
    "/v1/bc/app/course/batchUnLike": Required<operations["batchUnLikeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 评论列表 */
    "/v1/bc/app/course/commentList": Required<operations["commentListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 评论回复列表 */
    "/v1/bc/app/course/commentRelyList": Required<operations["commentRelyListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 删除评论 */
    "/v1/bc/app/course/deleteComment": Required<operations["deleteCommentUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 删除观看历史 */
    "/v1/bc/app/course/deleteView": Required<operations["deleteViewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 收藏 */
    "/v1/bc/app/course/favorite": Required<operations["favoriteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 收藏列表 */
    "/v1/bc/app/course/favoriteList": Required<operations["favoriteListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 关注 */
    "/v1/bc/app/course/follow": Required<operations["followUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 关注列表 */
    "/v1/bc/app/course/followList": Required<operations["followListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 点赞 */
    "/v1/bc/app/course/getLike": Required<operations["getLikeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 点赞列表 */
    "/v1/bc/app/course/likeList": Required<operations["likeListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 课程列表 */
    "/v1/bc/app/course/list": Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 回复 */
    "/v1/bc/app/course/recover": Required<operations["recoverUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 增加转发量 */
    "/v1/bc/app/course/retransmission": Required<operations["retransmissionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 评论 */
    "/v1/bc/app/course/review": Required<operations["reviewUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 取消收藏 */
    "/v1/bc/app/course/unFavorite": Required<operations["unFavoriteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 取消点赞 */
    "/v1/bc/app/course/unLike": Required<operations["unLikeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 取消关注 */
    "/v1/bc/app/course/unfollow": Required<operations["unfollowUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 阅读列表 */
    "/v1/bc/app/course/viewList": Required<operations["viewListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 列表 */
    "/v1/bc/app/my/course/list": Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

}
