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

/** edit - post请求参数 */
export type _v1_bc_admin_customer_service_edit_post_req = Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_customer_service_edit_post_res = Required<operations["editUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

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

/** 结束会话 - post请求参数 */
export type _v1_bc_admin_im_session_end_post_req = Required<operations["sessionEndUsingPOST"]>['requestBody']['content']['application/json']
/** 结束会话 - post响应参数 */
export type _v1_bc_admin_im_session_end_post_res = Required<operations["sessionEndUsingPOST"]>['responses'][200]['content']['*/*']

/** 客服发起会话 - post请求参数 */
export type _v1_bc_admin_im_session_start_by_customer_service_post_req = Required<operations["sessionStartByCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']
/** 客服发起会话 - post响应参数 */
export type _v1_bc_admin_im_session_start_by_customer_service_post_res = Required<operations["sessionStartByCustomerServiceUsingPOST"]>['responses'][200]['content']['*/*']

/** 客服转客服 - post请求参数 */
export type _v1_bc_admin_im_transfer_customer_service_post_req = Required<operations["transferCustomerServiceUsingPOST"]>['requestBody']['content']['application/json']
/** 客服转客服 - post响应参数 */
export type _v1_bc_admin_im_transfer_customer_service_post_res = Required<operations["transferCustomerServiceUsingPOST"]>['responses'][200]['content']['*/*']

/** callback - post请求参数 */
export type _v1_bc_app_im_callback_post_req = Required<operations["callbackUsingPOST"]>['requestBody']['content']['application/json']
/** callback - post响应参数 */
export type _v1_bc_app_im_callback_post_res = Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']

/** 创作者私信用户 - post请求参数 */
export type _v1_bc_app_im_creatorPrivateMessageUser_post_req = Required<operations["creatorPrivateMessageUserUsingPOST"]>['requestBody']['content']['application/json']
/** 创作者私信用户 - post响应参数 */
export type _v1_bc_app_im_creatorPrivateMessageUser_post_res = Required<operations["creatorPrivateMessageUserUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 商家客户列表 - get请求参数 */
export type _v1_bc_app_im_custom_list_get_req = Required<operations["customListUsingGET"]>['parameters']['query']
/** 商家客户列表 - get响应参数 */
export type _v1_bc_app_im_custom_list_get_res = Required<operations["customListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取客服IM的token - get请求参数 */
export type _v1_bc_app_im_getCustomerServiceImToken_get_req = Required<operations["getCustomerServiceImTokenUsingGET_1"]>['parameters']['query']
/** 获取客服IM的token - get响应参数 */
export type _v1_bc_app_im_getCustomerServiceImToken_get_res = Required<operations["getCustomerServiceImTokenUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** getImToken - post请求参数 */
export type _v1_bc_app_im_getImToken_post_req = Required<operations["getImTokenUsingPOST"]>['requestBody']
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

/** 更新群成员 - post请求参数 */
export type _v1_bc_app_im_updateTeamMemberByTid_post_req = Required<operations["updateTeamMemberByTidUsingPOST"]>['requestBody']['content']['application/json']
/** 更新群成员 - post响应参数 */
export type _v1_bc_app_im_updateTeamMemberByTid_post_res = Required<operations["updateTeamMemberByTidUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 用户私信创作者 - post请求参数 */
export type _v1_bc_app_im_userPrivateMessageCreator_post_req = Required<operations["userPrivateMessageCreatorUsingPOST"]>['requestBody']['content']['application/json']
/** 用户私信创作者 - post响应参数 */
export type _v1_bc_app_im_userPrivateMessageCreator_post_res = Required<operations["userPrivateMessageCreatorUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** IM事件Log列表 - post请求参数 */
export type _v1_bc_admin_event_event_log_list_post_req = Required<operations["getEventLogListUsingPOST"]>['requestBody']['content']['application/json']
/** IM事件Log列表 - post响应参数 */
export type _v1_bc_admin_event_event_log_list_post_res = Required<operations["getEventLogListUsingPOST"]>['responses'][200]['content']['*/*']

/**  Message发送Log列表 - post请求参数 */
export type _v1_bc_admin_event_msg_log_list_post_req = Required<operations["getMsgSendLogListUsingPOST"]>['requestBody']['content']['application/json']
/**  Message发送Log列表 - post响应参数 */
export type _v1_bc_admin_event_msg_log_list_post_res = Required<operations["getMsgSendLogListUsingPOST"]>['responses'][200]['content']['*/*']

/** 发送模板 - post请求参数 */
export type _v1_bc_admin_event_send_message_post_req = Required<operations["sendMessageUsingPOST"]>['requestBody']['content']['application/json']
/** 发送模板 - post响应参数 */
export type _v1_bc_admin_event_send_message_post_res = Required<operations["sendMessageUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 模板参数 - get请求参数 */
export type _v1_bc_admin_event_template_params_get_req = Required<operations["getImTemplateParamsUsingGET"]>['parameters']['query']
/** 模板参数 - get响应参数 */
export type _v1_bc_admin_event_template_params_get_res = Required<operations["getImTemplateParamsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 测试事件发送 - get请求参数 */
export type _v1_bc_admin_event_test_send_get_req = Required<operations["testSendUsingGET"]>['parameters']['query']
/** 测试事件发送 - get响应参数 */
export type _v1_bc_admin_event_test_send_get_res = Required<operations["testSendUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 消息分类列表 - get请求参数 */
export type _v1_bc_template_category_list_get_req = Required<operations["categoryUsingGET"]>['parameters']['query']
/** 消息分类列表 - get响应参数 */
export type _v1_bc_template_category_list_get_res = Required<operations["categoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 事件列表 - get请求参数 */
export type _v1_bc_template_event_list_get_req = Required<operations["eventListUsingGET"]>['parameters']['query']
/** 事件列表 - get响应参数 */
export type _v1_bc_template_event_list_get_res = Required<operations["eventListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_template_message_detail_get_req = Required<operations["detailUsingGET_1"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_template_message_detail_get_res = Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_template_message_list_post_req = Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_template_message_list_post_res = Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_template_message_remove_post_req = Required<operations["batchRemoveUsingPOST"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_template_message_remove_post_res = Required<operations["batchRemoveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 保存模板 - post请求参数 */
export type _v1_bc_template_message_save_post_req = Required<operations["submitUsingPOST"]>['requestBody']['content']['application/json']
/** 保存模板 - post响应参数 */
export type _v1_bc_template_message_save_post_res = Required<operations["submitUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 消息接收对像列表 - get请求参数 */
export type _v1_bc_template_receiver_list_get_req = Required<operations["receiverUsingGET"]>['parameters']['query']
/** 消息接收对像列表 - get响应参数 */
export type _v1_bc_template_receiver_list_get_res = Required<operations["receiverUsingGET"]>['responses'][200]['content']['*/*']['data']

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

/** recall - post请求参数 */
export type _v1_bc_admin_notice_recall_post_req = Required<operations["recallUsingPOST"]>['requestBody']['content']['application/json']
/** recall - post响应参数 */
export type _v1_bc_admin_notice_recall_post_res = Required<operations["recallUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_notice_updateOrCreate_post_req = Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_notice_updateOrCreate_post_res = Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 添加可私信人员 - post请求参数 */
export type _v1_bc_admin_private_message_config_add_post_req = Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']
/** 添加可私信人员 - post响应参数 */
export type _v1_bc_admin_private_message_config_add_post_res = Required<operations["editUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 删除可私信人员 - post请求参数 */
export type _v1_bc_admin_private_message_config_del_post_req = Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除可私信人员 - post响应参数 */
export type _v1_bc_admin_private_message_config_del_post_res = Required<operations["delUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 可私信人员列表 - get请求参数 */
export type _v1_bc_admin_private_message_config_list_get_req = Required<operations["listUsingGET_1"]>['parameters']['query']
/** 可私信人员列表 - get响应参数 */
export type _v1_bc_admin_private_message_config_list_get_res = Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_qa_content_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET_1"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_qa_content_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_qa_content_del_post_req = Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_qa_content_del_post_res = Required<operations["delUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_qa_content_list_get_req = Required<operations["listUsingGET_2"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_qa_content_list_get_res = Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_qa_content_updateOrCreate_post_req = Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_qa_content_updateOrCreate_post_res = Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_qa_content_list_get_req = Required<operations["listUsingGET_3"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_qa_content_list_get_res = Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_short_sentence_edit_post_req = Required<operations["delUsingPOST_3"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_short_sentence_edit_post_res = Required<operations["delUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_short_sentence_list_get_req = Required<operations["listUsingGET_4"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_short_sentence_list_get_res = Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_short_sentence_list_get_req = Required<operations["listUsingGET_5"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_short_sentence_list_get_res = Required<operations["listUsingGET_5"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_template_sms_list_post_req = Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_template_sms_list_post_res = Required<operations["listByPageUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_template_sms_remove_post_req = Required<operations["batchRemoveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_template_sms_remove_post_res = Required<operations["batchRemoveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 保存模板 - post请求参数 */
export type _v1_bc_template_sms_save_post_req = Required<operations["submitUsingPOST_1"]>['requestBody']['content']['application/json']
/** 保存模板 - post响应参数 */
export type _v1_bc_template_sms_save_post_res = Required<operations["submitUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** info - get请求参数 */
export type _v1_bc_admin_statistic_info_get_req = Required<operations["infoUsingGET"]>['parameters']['query']
/** info - get响应参数 */
export type _v1_bc_admin_statistic_info_get_res = Required<operations["infoUsingGET"]>['responses'][200]['content']['*/*']['data']

