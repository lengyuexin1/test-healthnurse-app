import type { operations } from './schema'

export interface IContentGetRequest {
    /** 内容渠道查看 */
    "/v1/bc/admin/article/channel": Required<operations["channelUsingGET"]>['parameters']['query']

    /** 机构详情 */
    "/v1/bc/admin/article/contentAccountDetails": Required<operations["contentAccountDetailsUsingGET"]>['parameters']['query']

    /** 内容详情 */
    "/v1/bc/admin/article/contentDetails": Required<operations["contentDetailsUsingGET"]>['parameters']['query']

    /** 内容详情(分享) */
    "/v1/bc/admin/article/contentShareDetails": Required<operations["contentShareDetailsUsingGET"]>['parameters']['query']

    /** 分类详情 */
    "/v1/bc/admin/article/contentSortDetails": Required<operations["contentSortDetailsUsingGET"]>['parameters']['query']

    /** 测试 */
    "/v1/bc/app/article/test": Required<operations["testUsingGET"]>['parameters']['query']

}
