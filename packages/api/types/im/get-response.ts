import type { operations } from './schema'

export interface IImGetResponse {
    /** get */
    "/v1/bc/admin/config/get": Required<operations["getUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** offlineNoticeDetail */
    "/v1/bc/admin/config/offline_notice_detail": Required<operations["offlineNoticeDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** transferArtificialConfigDetail */
    "/v1/bc/admin/config/transfer_artificial_config_detail": Required<operations["transferArtificialConfigDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** welcomeContentDetail */
    "/v1/bc/admin/config/welcome_content_detail": Required<operations["welcomeContentDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** get */
    "/v1/bc/app/config/get": Required<operations["getUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/customer_service/detail": Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getStatus */
    "/v1/bc/admin/customer_service/getStatus": Required<operations["getStatusUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** isExist */
    "/v1/bc/admin/customer_service/isExist": Required<operations["isExistUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/customer_service/list": Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** statistic */
    "/v1/bc/admin/customer_service/statistic": Required<operations["statisticUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 商家客户列表 */
    "/v1/bc/app/im/custom_list": Required<operations["customListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取客服IM的token */
    "/v1/bc/app/im/getCustomerServiceImToken": Required<operations["getCustomerServiceImTokenUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 历史会话列表 */
    "/v1/bc/app/im/history_session_list": Required<operations["historySessionListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** sessionList */
    "/v1/bc/app/im/session_list": Required<operations["sessionListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** transferArtificialConfigDetail */
    "/v1/bc/app/im/transfer_artificial_config_detail": Required<operations["transferArtificialConfigDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 模板参数 */
    "/v1/bc/admin/event/template_params": Required<operations["getImTemplateParamsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试事件发送 */
    "/v1/bc/admin/event/test_send": Required<operations["testSendUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 消息分类列表 */
    "/v1/bc/template/category/list": Required<operations["categoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 事件列表 */
    "/v1/bc/template/event/list": Required<operations["eventListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/template/message/detail": Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 消息接收对像列表 */
    "/v1/bc/template/receiver/list": Required<operations["receiverUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** conditionCollection */
    "/v1/bc/admin/notice/conditionCollection": Required<operations["conditionCollectionUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 可私信人员列表 */
    "/v1/bc/admin/private_message_config/list": Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** conditionCollection */
    "/v1/bc/admin/qa_content/conditionCollection": Required<operations["conditionCollectionUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/qa_content/list": Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/app/qa_content/list": Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/short_sentence/list": Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/app/short_sentence/list": Required<operations["listUsingGET_5"]>['responses'][200]['content']['*/*']['data']

    /** info */
    "/v1/bc/admin/statistic/info": Required<operations["infoUsingGET"]>['responses'][200]['content']['*/*']['data']

}
