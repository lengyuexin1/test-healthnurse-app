import type { operations } from './schema'

export interface IImGetRequest {
    /** get */
    "/v1/bc/admin/config/get": Required<operations["getUsingGET"]>['parameters']['query']

    /** offlineNoticeDetail */
    "/v1/bc/admin/config/offline_notice_detail": Required<operations["offlineNoticeDetailUsingGET"]>['parameters']['query']

    /** transferArtificialConfigDetail */
    "/v1/bc/admin/config/transfer_artificial_config_detail": Required<operations["transferArtificialConfigDetailUsingGET"]>['parameters']['query']

    /** welcomeContentDetail */
    "/v1/bc/admin/config/welcome_content_detail": Required<operations["welcomeContentDetailUsingGET"]>['parameters']['query']

    /** get */
    "/v1/bc/app/config/get": Required<operations["getUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/customer_service/detail": Required<operations["detailUsingGET"]>['parameters']['query']

    /** getStatus */
    "/v1/bc/admin/customer_service/getStatus": Required<operations["getStatusUsingGET"]>['parameters']['query']

    /** isExist */
    "/v1/bc/admin/customer_service/isExist": Required<operations["isExistUsingGET"]>['parameters']['query']

    /** list */
    "/v1/bc/admin/customer_service/list": Required<operations["listUsingGET"]>['parameters']['query']

    /** statistic */
    "/v1/bc/admin/customer_service/statistic": Required<operations["statisticUsingGET"]>['parameters']['query']

    /** 商家客户列表 */
    "/v1/bc/app/im/custom_list": Required<operations["customListUsingGET"]>['parameters']['query']

    /** 获取客服IM的token */
    "/v1/bc/app/im/getCustomerServiceImToken": Required<operations["getCustomerServiceImTokenUsingGET_1"]>['parameters']['query']

    /** 历史会话列表 */
    "/v1/bc/app/im/history_session_list": Required<operations["historySessionListUsingGET"]>['parameters']['query']

    /** sessionList */
    "/v1/bc/app/im/session_list": Required<operations["sessionListUsingGET"]>['parameters']['query']

    /** transferArtificialConfigDetail */
    "/v1/bc/app/im/transfer_artificial_config_detail": Required<operations["transferArtificialConfigDetailUsingGET_1"]>['parameters']['query']

    /** conditionCollection */
    "/v1/bc/admin/notice/conditionCollection": Required<operations["conditionCollectionUsingGET"]>['parameters']['query']

    /** conditionCollection */
    "/v1/bc/admin/qa_content/conditionCollection": Required<operations["conditionCollectionUsingGET_1"]>['parameters']['query']

    /** list */
    "/v1/bc/admin/qa_content/list": Required<operations["listUsingGET_1"]>['parameters']['query']

    /** list */
    "/v1/bc/app/qa_content/list": Required<operations["listUsingGET_2"]>['parameters']['query']

    /** list */
    "/v1/bc/admin/short_sentence/list": Required<operations["listUsingGET_3"]>['parameters']['query']

    /** list */
    "/v1/bc/app/short_sentence/list": Required<operations["listUsingGET_4"]>['parameters']['query']

    /** info */
    "/v1/bc/admin/statistic/info": Required<operations["infoUsingGET"]>['parameters']['query']

}
