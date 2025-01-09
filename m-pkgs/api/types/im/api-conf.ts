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
        /** sessionEnd */
        sessionEndUsingPOST: "/v1/bc/admin/im/session_end",
        /** sessionStartByCustomerService */
        sessionStartByCustomerServiceUsingPOST: "/v1/bc/admin/im/session_start_by_customer_service",
        /** callback */
        callbackUsingPOST: "/v1/bc/app/im/callback",
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
        transferShopUsingPOST: "/v1/bc/app/im/transfer_shop"
    },
    "notice-controller": {
        /** conditionCollection */
        conditionCollectionUsingGET: "/v1/bc/admin/notice/conditionCollection",
        /** doAction */
        doActionUsingPOST_1: "/v1/bc/admin/notice/doAction",
        /** list */
        listUsingPOST: "/v1/bc/admin/notice/list",
        /** updateOrCreate */
        updateOrCreateUsingPOST: "/v1/bc/admin/notice/updateOrCreate"
    },
    "qa-content-controller": {
        /** conditionCollection */
        conditionCollectionUsingGET_1: "/v1/bc/admin/qa_content/conditionCollection",
        /** del */
        delUsingPOST_1: "/v1/bc/admin/qa_content/del",
        /** list */
        listUsingGET_1: "/v1/bc/admin/qa_content/list",
        /** add */
        addUsingPOST_1: "/v1/bc/admin/qa_content/updateOrCreate",
        /** list */
        listUsingGET_2: "/v1/bc/app/qa_content/list"
    },
    "short-sentence-controller": {
        /** del */
        delUsingPOST_2: "/v1/bc/admin/short_sentence/edit",
        /** list */
        listUsingGET_3: "/v1/bc/admin/short_sentence/list",
        /** list */
        listUsingGET_4: "/v1/bc/app/short_sentence/list"
    },
    "statistic-controller": {
        /** info */
        infoUsingGET: "/v1/bc/admin/statistic/info"
    }
}
