import type { operations } from './schema'

/** edit - post请求参数 */
export type _v1_bc_admin_config_edit_post_req = Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_config_edit_post_res = Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** get - get请求参数 */
export type _v1_bc_admin_config_get_get_req = Required<operations["getUsingGET"]>['parameters']['query']
/** get - get响应参数 */
export type _v1_bc_admin_config_get_get_res = Required<operations["getUsingGET"]>['responses'][200]['content']['*/*']['data']

/** offlineNoticeDetail - get请求参数 */
export type _v1_bc_admin_config_offline_notice_detail_get_req = Required<operations["offlineNoticeDetailUsingGET"]>['parameters']['query']
/** offlineNoticeDetail - get响应参数 */
export type _v1_bc_admin_config_offline_notice_detail_get_res = Required<operations["offlineNoticeDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** offlineNoticeEdit - post请求参数 */
export type _v1_bc_admin_config_offline_notice_edit_post_req = Required<operations["offlineNoticeEditUsingPOST"]>['requestBody']['content']['application/json']
/** offlineNoticeEdit - post响应参数 */
export type _v1_bc_admin_config_offline_notice_edit_post_res = Required<operations["offlineNoticeEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** transferArtificialConfigDetail - get请求参数 */
export type _v1_bc_admin_config_transfer_artificial_config_detail_get_req = Required<operations["transferArtificialConfigDetailUsingGET"]>['parameters']['query']
/** transferArtificialConfigDetail - get响应参数 */
export type _v1_bc_admin_config_transfer_artificial_config_detail_get_res = Required<operations["transferArtificialConfigDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** transferArtificialConfigEdit - post请求参数 */
export type _v1_bc_admin_config_transfer_artificial_config_edit_post_req = Required<operations["transferArtificialConfigEditUsingPOST"]>['requestBody']['content']['application/json']
/** transferArtificialConfigEdit - post响应参数 */
export type _v1_bc_admin_config_transfer_artificial_config_edit_post_res = Required<operations["transferArtificialConfigEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** welcomeContentDetail - get请求参数 */
export type _v1_bc_admin_config_welcome_content_detail_get_req = Required<operations["welcomeContentDetailUsingGET"]>['parameters']['query']
/** welcomeContentDetail - get响应参数 */
export type _v1_bc_admin_config_welcome_content_detail_get_res = Required<operations["welcomeContentDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** welcomeContentEdit - post请求参数 */
export type _v1_bc_admin_config_welcome_content_edit_post_req = Required<operations["welcomeContentEditUsingPOST"]>['requestBody']['content']['application/json']
/** welcomeContentEdit - post响应参数 */
export type _v1_bc_admin_config_welcome_content_edit_post_res = Required<operations["welcomeContentEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** get - get请求参数 */
export type _v1_bc_app_config_get_get_req = Required<operations["getUsingGET_1"]>['parameters']['query']
/** get - get响应参数 */
export type _v1_bc_app_config_get_get_res = Required<operations["getUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** doPush - post请求参数 */
export type _v1_bc_app_config_push_post_req = Required<operations["doPushUsingPOST"]>['requestBody']['content']['application/json']
/** doPush - post响应参数 */
export type _v1_bc_app_config_push_post_res = Required<operations["doPushUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_customer_service_add_post_req = Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_customer_service_add_post_res = Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_customer_service_del_post_req = Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_customer_service_del_post_res = Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_customer_service_detail_get_req = Required<operations["detailUsingGET"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_customer_service_detail_get_res = Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_customer_service_doAction_post_req = Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_customer_service_doAction_post_res = Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** getStatus - get请求参数 */
export type _v1_bc_admin_customer_service_getStatus_get_req = Required<operations["getStatusUsingGET"]>['parameters']['query']
/** getStatus - get响应参数 */
export type _v1_bc_admin_customer_service_getStatus_get_res = Required<operations["getStatusUsingGET"]>['responses'][200]['content']['*/*']['data']

/** isExist - get请求参数 */
export type _v1_bc_admin_customer_service_isExist_get_req = Required<operations["isExistUsingGET"]>['parameters']['query']
/** isExist - get响应参数 */
export type _v1_bc_admin_customer_service_isExist_get_res = Required<operations["isExistUsingGET"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_customer_service_list_get_req = Required<operations["listUsingGET"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_customer_service_list_get_res = Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** statistic - get请求参数 */
export type _v1_bc_admin_customer_service_statistic_get_req = Required<operations["statisticUsingGET"]>['parameters']['query']
/** statistic - get响应参数 */
export type _v1_bc_admin_customer_service_statistic_get_res = Required<operations["statisticUsingGET"]>['responses'][200]['content']['*/*']['data']

/** sessionEnd - post请求参数 */
export type _v1_bc_admin_im_session_end_post_req = Required<operations["sessionEndUsingPOST"]>['requestBody']['content']['application/json']
/** sessionEnd - post响应参数 */
export type _v1_bc_admin_im_session_end_post_res = Required<operations["sessionEndUsingPOST"]>['responses'][200]['content']['*/*']

/** sessionStartByCustomerService - post请求参数 */
export type _v1_bc_admin_im_session_start_by_customer_service_post_req = Required<operations["sessionStartByCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']
/** sessionStartByCustomerService - post响应参数 */
export type _v1_bc_admin_im_session_start_by_customer_service_post_res = Required<operations["sessionStartByCustomerServiceUsingPOST"]>['responses'][200]['content']['*/*']

/** callback - post请求参数 */
export type _v1_bc_app_im_callback_post_req = Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']
/** callback - post响应参数 */
export type _v1_bc_app_im_callback_post_res = Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']

/** 商家客户列表 - get请求参数 */
export type _v1_bc_app_im_custom_list_get_req = Required<operations["customListUsingGET"]>['parameters']['query']
/** 商家客户列表 - get响应参数 */
export type _v1_bc_app_im_custom_list_get_res = Required<operations["customListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取客服IM的token - get请求参数 */
export type _v1_bc_app_im_getCustomerServiceImToken_get_req = Required<operations["getCustomerServiceImTokenUsingGET_1"]>['parameters']['query']
/** 获取客服IM的token - get响应参数 */
export type _v1_bc_app_im_getCustomerServiceImToken_get_res = Required<operations["getCustomerServiceImTokenUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** getImToken - post请求参数 */
export type _v1_bc_app_im_getImToken_post_req = Required<operations["getImTokenUsingPOST"]>['requestBody']['content']['application/json']
/** getImToken - post响应参数 */
export type _v1_bc_app_im_getImToken_post_res = Required<operations["getImTokenUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 群聊云端历史消息查询 - post请求参数 */
export type _v1_bc_app_im_history_query_team_msg_post_req = Required<operations["historyQueryTeamMsgUsingPOST"]>['requestBody']['content']['application/json']
/** 群聊云端历史消息查询 - post响应参数 */
export type _v1_bc_app_im_history_query_team_msg_post_res = Required<operations["historyQueryTeamMsgUsingPOST"]>['responses'][200]['content']['*/*']

/** 历史会话列表 - get请求参数 */
export type _v1_bc_app_im_history_session_list_get_req = Required<operations["historySessionListUsingGET"]>['parameters']['query']
/** 历史会话列表 - get响应参数 */
export type _v1_bc_app_im_history_session_list_get_res = Required<operations["historySessionListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** receiveMsg - post请求参数 */
export type _v1_bc_app_im_receive_msg_post_req = Required<operations["receiveMsgUsingPOST"]>['requestBody']['content']['application/json']
/** receiveMsg - post响应参数 */
export type _v1_bc_app_im_receive_msg_post_res = Required<operations["receiveMsgUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 发送简历消息 - post请求参数 */
export type _v1_bc_app_im_resume_message_post_req = Required<operations["resumeMessageUsingPOST"]>['requestBody']['content']['application/json']
/** 发送简历消息 - post响应参数 */
export type _v1_bc_app_im_resume_message_post_res = Required<operations["resumeMessageUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** robotSendMsg - post请求参数 */
export type _v1_bc_app_im_robotSendMsg_post_req = Required<operations["robotSendMsgUsingPOST"]>['requestBody']['content']['application/json']
/** robotSendMsg - post响应参数 */
export type _v1_bc_app_im_robotSendMsg_post_res = Required<operations["robotSendMsgUsingPOST"]>['responses'][200]['content']['*/*']

/** sendMsg - post请求参数 */
export type _v1_bc_app_im_sendMsg_post_req = Required<operations["sendMsgUsingPOST"]>['requestBody']['content']['application/json']
/** sendMsg - post响应参数 */
export type _v1_bc_app_im_sendMsg_post_res = Required<operations["sendMsgUsingPOST"]>['responses'][200]['content']['*/*']

/** sendBatchAttachMsg - post请求参数 */
export type _v1_bc_app_im_send_batch_attach_msg_post_req = Required<operations["sendBatchAttachMsgUsingPOST"]>['requestBody']['content']['application/json']
/** sendBatchAttachMsg - post响应参数 */
export type _v1_bc_app_im_send_batch_attach_msg_post_res = Required<operations["sendBatchAttachMsgUsingPOST"]>['responses'][200]['content']['*/*']

/** sessionEnd - post请求参数 */
export type _v1_bc_app_im_session_end_post_req = Required<operations["sessionEndUsingPOST_1"]>['requestBody']['content']['application/json']
/** sessionEnd - post响应参数 */
export type _v1_bc_app_im_session_end_post_res = Required<operations["sessionEndUsingPOST_1"]>['responses'][200]['content']['*/*']

/** sessionList - get请求参数 */
export type _v1_bc_app_im_session_list_get_req = Required<operations["sessionListUsingGET"]>['parameters']['query']
/** sessionList - get响应参数 */
export type _v1_bc_app_im_session_list_get_res = Required<operations["sessionListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** teamCreate - post请求参数 */
export type _v1_bc_app_im_team_create_post_req = Required<operations["teamCreateUsingPOST"]>['requestBody']['content']['application/json']
/** teamCreate - post响应参数 */
export type _v1_bc_app_im_team_create_post_res = Required<operations["teamCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** transferArtificial - post请求参数 */
export type _v1_bc_app_im_transfer_artificial_post_req = Required<operations["transferArtificialUsingPOST"]>['requestBody']['content']['application/json']
/** transferArtificial - post响应参数 */
export type _v1_bc_app_im_transfer_artificial_post_res = Required<operations["transferArtificialUsingPOST"]>['responses'][200]['content']['*/*']

/** transferArtificialConfigDetail - get请求参数 */
export type _v1_bc_app_im_transfer_artificial_config_detail_get_req = Required<operations["transferArtificialConfigDetailUsingGET_1"]>['parameters']['query']
/** transferArtificialConfigDetail - get响应参数 */
export type _v1_bc_app_im_transfer_artificial_config_detail_get_res = Required<operations["transferArtificialConfigDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** transferShop - post请求参数 */
export type _v1_bc_app_im_transfer_shop_post_req = Required<operations["transferShopUsingPOST"]>['requestBody']['content']['application/json']
/** transferShop - post响应参数 */
export type _v1_bc_app_im_transfer_shop_post_res = Required<operations["transferShopUsingPOST"]>['responses'][200]['content']['*/*']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_notice_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_notice_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_notice_doAction_post_req = Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_notice_doAction_post_res = Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_notice_list_post_req = Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_notice_list_post_res = Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_notice_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_notice_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_qa_content_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET_1"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_qa_content_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_qa_content_del_post_req = Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_qa_content_del_post_res = Required<operations["delUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_qa_content_list_get_req = Required<operations["listUsingGET_1"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_qa_content_list_get_res = Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_qa_content_updateOrCreate_post_req = Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_qa_content_updateOrCreate_post_res = Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_qa_content_list_get_req = Required<operations["listUsingGET_2"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_qa_content_list_get_res = Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_short_sentence_edit_post_req = Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_short_sentence_edit_post_res = Required<operations["delUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_short_sentence_list_get_req = Required<operations["listUsingGET_3"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_short_sentence_list_get_res = Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_short_sentence_list_get_req = Required<operations["listUsingGET_4"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_short_sentence_list_get_res = Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** info - get请求参数 */
export type _v1_bc_admin_statistic_info_get_req = Required<operations["infoUsingGET"]>['parameters']['query']
/** info - get响应参数 */
export type _v1_bc_admin_statistic_info_get_res = Required<operations["infoUsingGET"]>['responses'][200]['content']['*/*']['data']

