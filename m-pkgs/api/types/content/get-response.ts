import type { operations } from './schema'

export interface IContentGetResponse {
    /** 内容渠道查看 */
    "/v1/bc/admin/article/channel": Required<operations["channelUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 机构详情 */
    "/v1/bc/admin/article/contentAccountDetails": Required<operations["contentAccountDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetails": Required<operations["contentDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 内容详情(分享) */
    "/v1/bc/admin/article/contentShareDetails": Required<operations["contentShareDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 分类详情 */
    "/v1/bc/admin/article/contentSortDetails": Required<operations["contentSortDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试 */
    "/v1/bc/app/article/test": Required<operations["testUsingGET"]>['responses'][200]['content']['*/*']['data']

}
