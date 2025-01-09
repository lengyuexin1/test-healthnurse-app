import type { operations } from './schema'

export interface IContentGetRequest {
    /** 活动详情 */
    "/v1/bc/admin/activity/detail": Required<operations["admin_detailUsingGET"]>['parameters']['query']

    /** 活动详情 */
    "/v1/bc/app/activity/detail": Required<operations["detailUsingGET"]>['parameters']['query']

    /** 列表 */
    "/v1/bc/admin/article/categoryShow/list": Required<operations["listUsingGET"]>['parameters']['query']

    /** 类目列表 */
    "/v1/bc/app/article/categoryShow/list": Required<operations["listUsingGET_1"]>['parameters']['query']

    /** 作品统计 */
    "/v1/bc/company/article/workStat": Required<operations["workStatUsingGET"]>['parameters']['query']

    /** 内容渠道查看 */
    "/v1/bc/admin/article/channel": Required<operations["channelUsingGET"]>['parameters']['query']

    /** 机构详情 */
    "/v1/bc/admin/article/contentAccountDetails": Required<operations["contentAccountDetailsUsingGET"]>['parameters']['query']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetails": Required<operations["contentDetailsUsingGET"]>['parameters']['query']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetailsByAudit": Required<operations["contentDetailsByAuditUsingGET"]>['parameters']['query']

    /** 内容详情(分享) */
    "/v1/bc/admin/article/contentShareDetails": Required<operations["contentShareDetailsUsingGET"]>['parameters']['query']

    /** 分类详情 */
    "/v1/bc/admin/article/contentSortDetails": Required<operations["contentSortDetailsUsingGET"]>['parameters']['query']

    /** 官网-内容详情 */
    "/v1/bc/app/article/officialWebsite/contentDetail": Required<operations["officialWebsiteContentDetailUsingGET"]>['parameters']['query']

    /** 官网-推荐列表 */
    "/v1/bc/app/article/officialWebsite/recommendList": Required<operations["officialWebsiteRecommendListUsingGET"]>['parameters']['query']

    /** 测试 */
    "/v1/bc/app/article/test": Required<operations["testUsingGET"]>['parameters']['query']

    /** 用户是否关注/点赞 */
    "/v1/bc/app/article/user/actionRecord": Required<operations["userActionDataUsingGET"]>['parameters']['query']

    /** 黑名单 */
    "/v1/bc/app/article/user/blacklist": Required<operations["blacklistUsingGET"]>['parameters']['query']

    /** 课程详情 */
    "/v1/bc/company/course/detail": Required<operations["detailUsingGET_1"]>['parameters']['query']

    /** 课程详情 */
    "/v1/bc/admin/course/detail": Required<operations["detailUsingGET_2"]>['parameters']['query']

    /** 课程详情 */
    "/v1/bc/app/course/detail": Required<operations["detailUsingGET_3"]>['parameters']['query']

    /** 设置观看时长 */
    "/v1/bc/app/my/course/duration": Required<operations["setDurationUsingGET"]>['parameters']['query']

    /** 活动详情 */
    "/v1/bc/app/reply/detail": Required<operations["replyUsingGET"]>['parameters']['query']

}
