import type { operations } from './schema'

export interface IImPostRequest {
    /** edit */
    "/v1/bc/admin/config/edit": Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']

    /** offlineNoticeEdit */
    "/v1/bc/admin/config/offline_notice_edit": Required<operations["offlineNoticeEditUsingPOST"]>['requestBody']['content']['application/json']

    /** transferArtificialConfigEdit */
    "/v1/bc/admin/config/transfer_artificial_config_edit": Required<operations["transferArtificialConfigEditUsingPOST"]>['requestBody']['content']['application/json']

    /** welcomeContentEdit */
    "/v1/bc/admin/config/welcome_content_edit": Required<operations["welcomeContentEditUsingPOST"]>['requestBody']['content']['application/json']

    /** doPush */
    "/v1/bc/app/config/push": Required<operations["doPushUsingPOST"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/customer_service/add": Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/customer_service/del": Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/customer_service/doAction": Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']

    /** sessionEnd */
    "/v1/bc/admin/im/session_end": Required<operations["sessionEndUsingPOST"]>['requestBody']['content']['application/json']

    /** sessionStartByCustomerService */
    "/v1/bc/admin/im/session_start_by_customer_service": Required<operations["sessionStartByCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']

    /** callback */
    "/v1/bc/app/im/callback": Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']

    /** getImToken */
    "/v1/bc/app/im/getImToken": Required<operations["getImTokenUsingPOST"]>['requestBody']['content']['application/json']

    /** 群聊云端历史消息查询 */
    "/v1/bc/app/im/history_query_team_msg": Required<operations["historyQueryTeamMsgUsingPOST"]>['requestBody']['content']['application/json']

    /** receiveMsg */
    "/v1/bc/app/im/receive_msg": Required<operations["receiveMsgUsingPOST"]>['requestBody']['content']['application/json']

    /** 发送简历消息 */
    "/v1/bc/app/im/resume_message": Required<operations["resumeMessageUsingPOST"]>['requestBody']['content']['application/json']

    /** robotSendMsg */
    "/v1/bc/app/im/robotSendMsg": Required<operations["robotSendMsgUsingPOST"]>['requestBody']['content']['application/json']

    /** sendMsg */
    "/v1/bc/app/im/sendMsg": Required<operations["sendMsgUsingPOST"]>['requestBody']['content']['application/json']

    /** sendBatchAttachMsg */
    "/v1/bc/app/im/send_batch_attach_msg": Required<operations["sendBatchAttachMsgUsingPOST"]>['requestBody']['content']['application/json']

    /** sessionEnd */
    "/v1/bc/app/im/session_end": Required<operations["sessionEndUsingPOST_1"]>['requestBody']['content']['application/json']

    /** teamCreate */
    "/v1/bc/app/im/team_create": Required<operations["teamCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** transferArtificial */
    "/v1/bc/app/im/transfer_artificial": Required<operations["transferArtificialUsingPOST"]>['requestBody']['content']['application/json']

    /** transferShop */
    "/v1/bc/app/im/transfer_shop": Required<operations["transferShopUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/notice/doAction": Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/notice/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/notice/updateOrCreate": Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/qa_content/del": Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/qa_content/updateOrCreate": Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/short_sentence/edit": Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']

}
