import type { operations } from './schema'

export interface IImPostResponse {
    /** edit */
    "/v1/bc/admin/config/edit": Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** offlineNoticeEdit */
    "/v1/bc/admin/config/offline_notice_edit": Required<operations["offlineNoticeEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** transferArtificialConfigEdit */
    "/v1/bc/admin/config/transfer_artificial_config_edit": Required<operations["transferArtificialConfigEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** welcomeContentEdit */
    "/v1/bc/admin/config/welcome_content_edit": Required<operations["welcomeContentEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doPush */
    "/v1/bc/app/config/push": Required<operations["doPushUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** add */
    "/v1/bc/admin/customer_service/add": Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/customer_service/del": Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/customer_service/doAction": Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** sessionEnd */
    "/v1/bc/admin/im/session_end": Required<operations["sessionEndUsingPOST"]>['responses'][200]['content']['*/*']

    /** sessionStartByCustomerService */
    "/v1/bc/admin/im/session_start_by_customer_service": Required<operations["sessionStartByCustomerServiceUsingPOST"]>['responses'][200]['content']['*/*']

    /** callback */
    "/v1/bc/app/im/callback": Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']

    /** getImToken */
    "/v1/bc/app/im/getImToken": Required<operations["getImTokenUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 群聊云端历史消息查询 */
    "/v1/bc/app/im/history_query_team_msg": Required<operations["historyQueryTeamMsgUsingPOST"]>['responses'][200]['content']['*/*']

    /** receiveMsg */
    "/v1/bc/app/im/receive_msg": Required<operations["receiveMsgUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发送简历消息 */
    "/v1/bc/app/im/resume_message": Required<operations["resumeMessageUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** robotSendMsg */
    "/v1/bc/app/im/robotSendMsg": Required<operations["robotSendMsgUsingPOST"]>['responses'][200]['content']['*/*']

    /** sendMsg */
    "/v1/bc/app/im/sendMsg": Required<operations["sendMsgUsingPOST"]>['responses'][200]['content']['*/*']

    /** sendBatchAttachMsg */
    "/v1/bc/app/im/send_batch_attach_msg": Required<operations["sendBatchAttachMsgUsingPOST"]>['responses'][200]['content']['*/*']

    /** sessionEnd */
    "/v1/bc/app/im/session_end": Required<operations["sessionEndUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** teamCreate */
    "/v1/bc/app/im/team_create": Required<operations["teamCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** transferArtificial */
    "/v1/bc/app/im/transfer_artificial": Required<operations["transferArtificialUsingPOST"]>['responses'][200]['content']['*/*']

    /** transferShop */
    "/v1/bc/app/im/transfer_shop": Required<operations["transferShopUsingPOST"]>['responses'][200]['content']['*/*']

    /** doAction */
    "/v1/bc/admin/notice/doAction": Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/notice/list": Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

    /** updateOrCreate */
    "/v1/bc/admin/notice/updateOrCreate": Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/qa_content/del": Required<operations["delUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** add */
    "/v1/bc/admin/qa_content/updateOrCreate": Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/short_sentence/edit": Required<operations["delUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

}
