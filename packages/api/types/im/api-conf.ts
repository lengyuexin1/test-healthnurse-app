export const IM_API = {
    "config-controller": {
        /** edit */
        editUsingPOST: "/v1/bc/admin/config/edit",
        /** get */
        getUsingGET: "/v1/bc/admin/config/get",
        /** offlineNoticeDetail */
        offlineNoticeDetailUsingGET: "/v1/bc/admin/config/offline_notice_detail",
        /** offlineNoticeEdit */
        offlineNoticeEditUsingPOST: "/v1/bc/admin/config/offline_notice_edit",
        /** transferArtificialConfigDetail */
        transferArtificialConfigDetailUsingGET: "/v1/bc/admin/config/transfer_artificial_config_detail",
        /** transferArtificialConfigEdit */
        transferArtificialConfigEditUsingPOST: "/v1/bc/admin/config/transfer_artificial_config_edit",
        /** welcomeContentDetail */
        welcomeContentDetailUsingGET: "/v1/bc/admin/config/welcome_content_detail",
        /** welcomeContentEdit */
        welcomeContentEditUsingPOST: "/v1/bc/admin/config/welcome_content_edit",
        /** get */
        getUsingGET_1: "/v1/bc/app/config/get",
        /** doPush */
        doPushUsingPOST: "/v1/bc/app/config/push"
    },
    "customer-service-controller": {
        /** add */
        addUsingPOST: "/v1/bc/admin/customer_service/add",
        /** del */
        delUsingPOST: "/v1/bc/admin/customer_service/del",
        /** detail */
        detailUsingGET: "/v1/bc/admin/customer_service/detail",
        /** doAction */
        doActionUsingPOST: "/v1/bc/admin/customer_service/doAction",
        /** edit */
        editUsingPOST_1: "/v1/bc/admin/customer_service/edit",
        /** getStatus */
        getStatusUsingGET: "/v1/bc/admin/customer_service/getStatus",
        /** isExist */
        isExistUsingGET: "/v1/bc/admin/customer_service/isExist",
        /** list */
        listUsingGET: "/v1/bc/admin/customer_service/list",
        /** statistic */
        statisticUsingGET: "/v1/bc/admin/customer_service/statistic"
    },
    "im-controller": {
        /** 结束会话 */
        sessionEndUsingPOST: "/v1/bc/admin/im/session_end",
        /** 客服发起会话 */
        sessionStartByCustomerServiceUsingPOST: "/v1/bc/admin/im/session_start_by_customer_service",
        /** 客服转客服 */
        transferCustomerServiceUsingPOST: "/v1/bc/admin/im/transfer_customer_service",
        /** callback */
        callbackUsingPOST: "/v1/bc/app/im/callback",
        /** 创作者私信用户 */
        creatorPrivateMessageUserUsingPOST: "/v1/bc/app/im/creatorPrivateMessageUser",
        /** 商家客户列表 */
        customListUsingGET: "/v1/bc/app/im/custom_list",
        /** 获取客服IM的token */
        getCustomerServiceImTokenUsingGET_1: "/v1/bc/app/im/getCustomerServiceImToken",
        /** getImToken */
        getImTokenUsingPOST: "/v1/bc/app/im/getImToken",
        /** 群聊云端历史消息查询 */
        historyQueryTeamMsgUsingPOST: "/v1/bc/app/im/history_query_team_msg",
        /** 历史会话列表 */
        historySessionListUsingGET: "/v1/bc/app/im/history_session_list",
        /** receiveMsg */
        receiveMsgUsingPOST: "/v1/bc/app/im/receive_msg",
        /** 发送简历消息 */
        resumeMessageUsingPOST: "/v1/bc/app/im/resume_message",
        /** robotSendMsg */
        robotSendMsgUsingPOST: "/v1/bc/app/im/robotSendMsg",
        /** sendMsg */
        sendMsgUsingPOST: "/v1/bc/app/im/sendMsg",
        /** sendBatchAttachMsg */
        sendBatchAttachMsgUsingPOST: "/v1/bc/app/im/send_batch_attach_msg",
        /** sessionEnd */
        sessionEndUsingPOST_1: "/v1/bc/app/im/session_end",
        /** sessionList */
        sessionListUsingGET: "/v1/bc/app/im/session_list",
        /** teamCreate */
        teamCreateUsingPOST: "/v1/bc/app/im/team_create",
        /** transferArtificial */
        transferArtificialUsingPOST: "/v1/bc/app/im/transfer_artificial",
        /** transferArtificialConfigDetail */
        transferArtificialConfigDetailUsingGET_1: "/v1/bc/app/im/transfer_artificial_config_detail",
        /** transferShop */
        transferShopUsingPOST: "/v1/bc/app/im/transfer_shop",
        /** 更新群成员 */
        updateTeamMemberByTidUsingPOST: "/v1/bc/app/im/updateTeamMemberByTid",
        /** 用户私信创作者 */
        userPrivateMessageCreatorUsingPOST: "/v1/bc/app/im/userPrivateMessageCreator"
    },
    "im-event-controller": {
        /** IM事件Log列表 */
        getEventLogListUsingPOST: "/v1/bc/admin/event/event_log/list",
        /**  Message发送Log列表 */
        getMsgSendLogListUsingPOST: "/v1/bc/admin/event/msg_log/list",
        /** 发送模板 */
        sendMessageUsingPOST: "/v1/bc/admin/event/send_message",
        /** 模板参数 */
        getImTemplateParamsUsingGET: "/v1/bc/admin/event/template_params",
        /** 测试事件发送 */
        testSendUsingGET: "/v1/bc/admin/event/test_send"
    },
    "message-template-controller": {
        /** 消息分类列表 */
        categoryUsingGET: "/v1/bc/template/category/list",
        /** 事件列表 */
        eventListUsingGET: "/v1/bc/template/event/list",
        /** 详情 */
        detailUsingGET_1: "/v1/bc/template/message/detail",
        /** 列表 */
        listByPageUsingPOST: "/v1/bc/template/message/list",
        /** 删除 */
        batchRemoveUsingPOST: "/v1/bc/template/message/remove",
        /** 保存模板 */
        submitUsingPOST: "/v1/bc/template/message/save",
        /** 消息接收对像列表 */
        receiverUsingGET: "/v1/bc/template/receiver/list"
    },
    "notice-controller": {
        /** conditionCollection */
        conditionCollectionUsingGET: "/v1/bc/admin/notice/conditionCollection",
        /** doAction */
        doActionUsingPOST_1: "/v1/bc/admin/notice/doAction",
        /** list */
        listUsingPOST: "/v1/bc/admin/notice/list",
        /** recall */
        recallUsingPOST: "/v1/bc/admin/notice/recall",
        /** updateOrCreate */
        updateOrCreateUsingPOST: "/v1/bc/admin/notice/updateOrCreate"
    },
    "private-message-config-controller": {
        /** 添加可私信人员 */
        editUsingPOST_2: "/v1/bc/admin/private_message_config/add",
        /** 删除可私信人员 */
        delUsingPOST_1: "/v1/bc/admin/private_message_config/del",
        /** 可私信人员列表 */
        listUsingGET_1: "/v1/bc/admin/private_message_config/list"
    },
    "qa-content-controller": {
        /** conditionCollection */
        conditionCollectionUsingGET_1: "/v1/bc/admin/qa_content/conditionCollection",
        /** del */
        delUsingPOST_2: "/v1/bc/admin/qa_content/del",
        /** list */
        listUsingGET_2: "/v1/bc/admin/qa_content/list",
        /** add */
        addUsingPOST_1: "/v1/bc/admin/qa_content/updateOrCreate",
        /** list */
        listUsingGET_3: "/v1/bc/app/qa_content/list"
    },
    "short-sentence-controller": {
        /** del */
        delUsingPOST_3: "/v1/bc/admin/short_sentence/edit",
        /** list */
        listUsingGET_4: "/v1/bc/admin/short_sentence/list",
        /** list */
        listUsingGET_5: "/v1/bc/app/short_sentence/list"
    },
    "sms-template-controller": {
        /** 列表 */
        listByPageUsingPOST_1: "/v1/bc/template/sms/list",
        /** 删除 */
        batchRemoveUsingPOST_1: "/v1/bc/template/sms/remove",
        /** 保存模板 */
        submitUsingPOST_1: "/v1/bc/template/sms/save"
    },
    "statistic-controller": {
        /** info */
        infoUsingGET: "/v1/bc/admin/statistic/info"
    }
}
