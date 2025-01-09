import type { operations } from './schema'

export interface IContentGetResponse {
    /** 活动详情 */
    "/v1/bc/admin/activity/detail": Required<operations["admin_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动详情 */
    "/v1/bc/app/activity/detail": Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/article/categoryShow/list": Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目列表 */
    "/v1/bc/app/article/categoryShow/list": Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 作品统计 */
    "/v1/bc/company/article/workStat": Required<operations["workStatUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容渠道查看 */
    "/v1/bc/admin/article/channel": Required<operations["channelUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 机构详情 */
    "/v1/bc/admin/article/contentAccountDetails": Required<operations["contentAccountDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetails": Required<operations["contentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetailsByAudit": Required<operations["contentDetailsByAuditUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容详情(分享) */
    "/v1/bc/admin/article/contentShareDetails": Required<operations["contentShareDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 分类详情 */
    "/v1/bc/admin/article/contentSortDetails": Required<operations["contentSortDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 官网-内容详情 */
    "/v1/bc/app/article/officialWebsite/contentDetail": Required<operations["officialWebsiteContentDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 官网-推荐列表 */
    "/v1/bc/app/article/officialWebsite/recommendList": Required<operations["officialWebsiteRecommendListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试 */
    "/v1/bc/app/article/test": Required<operations["testUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 用户是否关注/点赞 */
    "/v1/bc/app/article/user/actionRecord": Required<operations["userActionDataUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 黑名单 */
    "/v1/bc/app/article/user/blacklist": Required<operations["blacklistUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 课程详情 */
    "/v1/bc/company/course/detail": Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 课程详情 */
    "/v1/bc/admin/course/detail": Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 课程详情 */
    "/v1/bc/app/course/detail": Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 设置观看时长 */
    "/v1/bc/app/my/course/duration": Required<operations["setDurationUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 活动详情 */
    "/v1/bc/app/reply/detail": Required<operations["replyUsingGET"]>['responses'][200]['content']['*/*']['data']

}
