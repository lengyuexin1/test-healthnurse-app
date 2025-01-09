import type { operations } from './schema'

export interface IContentPostRequest {
    /** 投稿列表 */
    "/v1/bc/admin/activity/article/list": Required<operations["admin_article_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动操作状态 */
    "/v1/bc/admin/activity/audit": Required<operations["doAuditUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/activity/delete": Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动列表 */
    "/v1/bc/admin/activity/list": Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动新增修改 */
    "/v1/bc/admin/activity/save": Required<operations["doSaveUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动列表 */
    "/v1/bc/app/activity/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** 活动列表 */
    "/v1/bc/app/activity/my/list": Required<operations["my_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目列表 */
    "/v1/bc/app/article/category/get": Required<operations["getUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/article/categoryShow/delete": Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 添加 */
    "/v1/bc/admin/article/categoryShow/save": Required<operations["saveDataUsingPOST"]>['requestBody']['content']['application/json']

    /** 排序 */
    "/v1/bc/admin/article/categoryShow/sort": Required<operations["sortUsingPOST"]>['requestBody']['content']['application/json']

    /** 前台类目同步 */
    "/v1/bc/admin/article/categoryShow/syncCategoryToCategoryShow": Required<operations["syncCategoryToCategoryShowUsingPOST"]>['requestBody']

    /** 内容列表 */
    "/v1/bc/app/article/categoryShow/contentList": Required<operations["contentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容创作 */
    "/v1/bc/company/article/addContent": Required<operations["addContentUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构创作者数据 */
    "/v1/bc/company/article/articleDataLook": Required<operations["articleDataLookUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构创作者数据折线图 */
    "/v1/bc/company/article/articleUserDayLook": Required<operations["articleUserDayLookUsingPOST"]>['requestBody']['content']['application/json']

    /** 黑名单列表 */
    "/v1/bc/company/article/blacklistList": Required<operations["blacklistListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容列表 */
    "/v1/bc/company/article/contentList": Required<operations["contentListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容机构修改 */
    "/v1/bc/company/article/editContentAccount": Required<operations["editContentAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构创造者粉丝数据(昨日) */
    "/v1/bc/company/article/fansDataLook": Required<operations["fansDataLookUsingPOST"]>['requestBody']['content']['application/json']

    /** 粉丝列表 */
    "/v1/bc/company/article/fansList": Required<operations["fansListUsingPOST"]>['requestBody']['content']['application/json']

    /** 粉丝关注列表 */
    "/v1/bc/company/article/fansLogList": Required<operations["fansLogListUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构创造者粉丝数据折线图 */
    "/v1/bc/company/article/fansUserDayLook": Required<operations["fansUserDayLookUsingPOST"]>['requestBody']['content']['application/json']

    /** 关注 */
    "/v1/bc/company/article/follow": Required<operations["followUsingPOST"]>['requestBody']['content']['application/json']

    /** 首页 */
    "/v1/bc/company/article/homePage": Required<operations["homePageUsingPOST"]>['requestBody']['content']['application/json']

    /** 点赞列表 */
    "/v1/bc/company/article/likeLogList": Required<operations["likeLogListUsingPOST"]>['requestBody']['content']['application/json']

    /** 我的作品 */
    "/v1/bc/company/article/myContentList": Required<operations["myContentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 拉黑 */
    "/v1/bc/company/article/shield": Required<operations["shieldUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消关注 */
    "/v1/bc/company/article/unfollow": Required<operations["unfollowUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容创作 */
    "/v1/bc/admin/article/addContent": Required<operations["addContentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容机构创造 */
    "/v1/bc/admin/article/addContentAccount": Required<operations["addContentAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容分类创造 */
    "/v1/bc/admin/article/addContentSort": Required<operations["addContentSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 机构列表 */
    "/v1/bc/admin/article/contentAccountList": Required<operations["contentAccountListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容审核列表 */
    "/v1/bc/admin/article/contentAuditList": Required<operations["contentAuditListUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容审核 */
    "/v1/bc/admin/article/contentExamine": Required<operations["contentExamineUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容列表 */
    "/v1/bc/admin/article/contentList": Required<operations["contentListUsingPOST_2"]>['requestBody']['content']['application/json']

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
    "/v1/bc/admin/article/editContentAccount": Required<operations["editContentAccountUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容分类修改 */
    "/v1/bc/admin/article/editContentSort": Required<operations["editContentSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 我的作品 */
    "/v1/bc/admin/article/myContentList": Required<operations["myContentListUsingPOST_1"]>['requestBody']['content']['application/json']

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
    "/v1/bc/app/article/follow": Required<operations["followUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 点赞 */
    "/v1/bc/app/article/getLike": Required<operations["getLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 点赞列表 */
    "/v1/bc/app/article/likeList": Required<operations["likeListUsingPOST"]>['requestBody']['content']['application/json']

    /** 我的作品 */
    "/v1/bc/app/article/myContentList": Required<operations["myContentListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 官网-内容列表 */
    "/v1/bc/app/article/officialWebsite/contentList": Required<operations["officialWebsiteContentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 回复 */
    "/v1/bc/app/article/recover": Required<operations["recoverUsingPOST"]>['requestBody']['content']['application/json']

    /** 增加转发量 */
    "/v1/bc/app/article/retransmission": Required<operations["retransmissionUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论 */
    "/v1/bc/app/article/review": Required<operations["reviewUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消评论点赞 */
    "/v1/bc/app/article/unCommentLike": Required<operations["unCommentLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消收藏 */
    "/v1/bc/app/article/unFavorite": Required<operations["unFavoriteUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消点赞 */
    "/v1/bc/app/article/unLike": Required<operations["unLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消关注 */
    "/v1/bc/app/article/unfollow": Required<operations["unfollowUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 冻结 */
    "/v1/bc/admin/article/user/frozen": Required<operations["frozenUsingPOST"]>['requestBody']['content']['application/json']

    /** 内容创作 */
    "/v1/bc/app/article/user/addContent": Required<operations["addContentUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 添加机构 */
    "/v1/bc/app/article/user/addContentAccount": Required<operations["addContentAccountUsingPOST_1"]>['requestBody']

    /** 个人创作者数据 */
    "/v1/bc/app/article/user/articleDataLook": Required<operations["articleDataLookUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 个人创作者数据折线图 */
    "/v1/bc/app/article/user/articleUserDayLook": Required<operations["articleUserDayLookUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 机构列表 */
    "/v1/bc/app/article/user/contentAccountList": Required<operations["contentAccountListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容列表 */
    "/v1/bc/app/article/user/contentList": Required<operations["contentListUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 内容下架 */
    "/v1/bc/app/article/user/deleteContent": Required<operations["deleteContentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容修改 */
    "/v1/bc/app/article/user/editContent": Required<operations["editContentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 个人创造者粉丝数据(昨日) */
    "/v1/bc/app/article/user/fansDataLook": Required<operations["fansDataLookUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 粉丝列表 */
    "/v1/bc/app/article/user/fansList": Required<operations["fansListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 个人创造者粉丝数据折线图 */
    "/v1/bc/app/article/user/fansUserDayLook": Required<operations["fansUserDayLookUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 关注列表 */
    "/v1/bc/app/article/user/followList": Required<operations["followListUsingPOST"]>['requestBody']['content']['application/json']

    /** 首页 */
    "/v1/bc/app/article/user/homePage": Required<operations["homePageUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 内容删除 */
    "/v1/bc/app/article/user/tDeleteContent": Required<operations["tDeleteContentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 阅读时长 */
    "/v1/bc/app/article/user/viewTime": Required<operations["viewTimeUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建课程 */
    "/v1/bc/company/course/add": Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论列表 */
    "/v1/bc/company/course/commentList": Required<operations["commentListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 评论回复列表 */
    "/v1/bc/company/course/commentRelyList": Required<operations["commentRelyListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/company/course/del": Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除评论 */
    "/v1/bc/company/course/deleteComment": Required<operations["deleteCommentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 其他操作 */
    "/v1/bc/company/course/doAction": Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改课程 */
    "/v1/bc/company/course/edit": Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除历史发布 */
    "/v1/bc/company/course/historyDel": Required<operations["historyDelUsingPOST"]>['requestBody']['content']['application/json']

    /** 历史发布列表 */
    "/v1/bc/company/course/historyList": Required<operations["historyListUsingPOST"]>['requestBody']['content']['application/json']

    /** 课程列表 */
    "/v1/bc/company/course/list": Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 回复 */
    "/v1/bc/company/course/recover": Required<operations["recoverUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 强制下架 */
    "/v1/bc/admin/course/doForced": Required<operations["doForcedUsingPOST"]>['requestBody']['content']['application/json']

    /** 课程列表 */
    "/v1/bc/admin/course/list": Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 设置标签 */
    "/v1/bc/admin/course/setTag": Required<operations["setTagUsingPOST"]>['requestBody']['content']['application/json']

    /** 批量取消点赞 */
    "/v1/bc/app/course/batchUnLike": Required<operations["batchUnLikeUsingPOST"]>['requestBody']['content']['application/json']

    /** 评论列表 */
    "/v1/bc/app/course/commentList": Required<operations["commentListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 评论回复列表 */
    "/v1/bc/app/course/commentRelyList": Required<operations["commentRelyListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 删除评论 */
    "/v1/bc/app/course/deleteComment": Required<operations["deleteCommentUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 删除观看历史 */
    "/v1/bc/app/course/deleteView": Required<operations["deleteViewUsingPOST"]>['requestBody']['content']['application/json']

    /** 收藏 */
    "/v1/bc/app/course/favorite": Required<operations["favoriteUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 收藏列表 */
    "/v1/bc/app/course/favoriteList": Required<operations["favoriteListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 关注 */
    "/v1/bc/app/course/follow": Required<operations["followUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 关注列表 */
    "/v1/bc/app/course/followList": Required<operations["followListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 点赞 */
    "/v1/bc/app/course/getLike": Required<operations["getLikeUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 点赞列表 */
    "/v1/bc/app/course/likeList": Required<operations["likeListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 课程列表 */
    "/v1/bc/app/course/list": Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 回复 */
    "/v1/bc/app/course/recover": Required<operations["recoverUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 增加转发量 */
    "/v1/bc/app/course/retransmission": Required<operations["retransmissionUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 评论 */
    "/v1/bc/app/course/review": Required<operations["reviewUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 取消收藏 */
    "/v1/bc/app/course/unFavorite": Required<operations["unFavoriteUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 取消点赞 */
    "/v1/bc/app/course/unLike": Required<operations["unLikeUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 取消关注 */
    "/v1/bc/app/course/unfollow": Required<operations["unfollowUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 阅读列表 */
    "/v1/bc/app/course/viewList": Required<operations["viewListUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/app/my/course/list": Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']

}
