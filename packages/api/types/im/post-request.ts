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

    /** edit */
    "/v1/bc/admin/customer_service/edit": Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 结束会话 */
    "/v1/bc/admin/im/session_end": Required<operations["sessionEndUsingPOST"]>['requestBody']['content']['application/json']

    /** 客服发起会话 */
    "/v1/bc/admin/im/session_start_by_customer_service": Required<operations["sessionStartByCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']

    /** 客服转客服 */
    "/v1/bc/admin/im/transfer_customer_service": Required<operations["transferCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']

    /** callback */
    "/v1/bc/app/im/callback": Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']

    /** 创作者私信用户 */
    "/v1/bc/app/im/creatorPrivateMessageUser": Required<operations["creatorPrivateMessageUserUsingPOST"]>['requestBody']['content']['application/json']

    /** getImToken */
    "/v1/bc/app/im/getImToken": Required<operations["getImTokenUsingPOST"]>['requestBody']

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

    /** 更新群成员 */
    "/v1/bc/app/im/updateTeamMemberByTid": Required<operations["updateTeamMemberByTidUsingPOST"]>['requestBody']['content']['application/json']

    /** 用户私信创作者 */
    "/v1/bc/app/im/userPrivateMessageCreator": Required<operations["userPrivateMessageCreatorUsingPOST"]>['requestBody']['content']['application/json']

    /** IM事件Log列表 */
    "/v1/bc/admin/event/event_log/list": Required<operations["getEventLogListUsingPOST"]>['requestBody']['content']['application/json']

    /**  Message发送Log列表 */
    "/v1/bc/admin/event/msg_log/list": Required<operations["getMsgSendLogListUsingPOST"]>['requestBody']['content']['application/json']

    /** 发送模板 */
    "/v1/bc/admin/event/send_message": Required<operations["sendMessageUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/template/message/list": Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/template/message/remove": Required<operations["batchRemoveUsingPOST"]>['requestBody']['content']['application/json']

    /** 保存模板 */
    "/v1/bc/template/message/save": Required<operations["submitUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/notice/doAction": Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/notice/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** recall */
    "/v1/bc/admin/notice/recall": Required<operations["recallUsingPOST"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/notice/updateOrCreate": Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 添加可私信人员 */
    "/v1/bc/admin/private_message_config/add": Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 删除可私信人员 */
    "/v1/bc/admin/private_message_config/del": Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/qa_content/del": Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/qa_content/updateOrCreate": Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/short_sentence/edit": Required<operations["delUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/template/sms/list": Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/template/sms/remove": Required<operations["batchRemoveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 保存模板 */
    "/v1/bc/template/sms/save": Required<operations["submitUsingPOST_1"]>['requestBody']['content']['application/json']

}
