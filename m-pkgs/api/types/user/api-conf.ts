export const USER_API = {
    "activity-controller": {
        /** 活动操作状态 */
        doActionUsingPOST: "/v1/bc/admin/activity/action",
        /** 活动详情 */
        admin_detailUsingGET: "/v1/bc/admin/activity/detail",
        /** 审核活动报名 */
        admin_auditUsingPOST: "/v1/bc/admin/activity/enroll/audit",
        /** 取消活动报名 */
        cancelUsingPOST_1: "/v1/bc/admin/activity/enroll/cancel",
        /** 报名数据详情 */
        admin_enroll_dataUsingGET: "/v1/bc/admin/activity/enroll/detail",
        /** 报名列表 */
        enroll_admin_listUsingPOST: "/v1/bc/admin/activity/enroll/list",
        /** 活动列表 */
        admin_listUsingPOST: "/v1/bc/admin/activity/list",
        /** 活动新增修改 */
        doSaveUsingPOST: "/v1/bc/admin/activity/save",
        /** 活动详情 */
        detailUsingGET: "/v1/bc/company/activity/detail",
        /** 活动报名 */
        enrollUsingPOST: "/v1/bc/company/activity/enroll",
        /** 取消活动报名 */
        cancelUsingPOST_2: "/v1/bc/company/activity/enroll/cancel",
        /** 活动报名数据 */
        enroll_dataUsingGET: "/v1/bc/company/activity/enroll/data",
        /** 活动报名列表 */
        enroll_listUsingGET: "/v1/bc/company/activity/enroll/list",
        /** 活动列表 */
        listUsingPOST: "/v1/bc/company/activity/list"
    },
    "ad-controller": {
        /** 位置列表 */
        configListUsingGET: "/v1/bc/admin/ad/config/list",
        /** 删除位置 */
        deleteConfigUsingPOST: "/v1/bc/admin/ad/delete/config",
        /** 列表 */
        admin_listUsingPOST_1: "/v1/bc/admin/ad/list",
        /** 保存位置 */
        saveConfigUsingPOST: "/v1/bc/admin/ad/save/config",
        /** 时间段 */
        getAdTimesUsingGET: "/v1/bc/admin/ad/times"
    },
    "admin-user-controller": {
        /** 管理员登录 */
        accountLoginUsingPOST: "/v1/bc/company/admin/accountLogin",
        /** 二维码登录提交 */
        auditLoginCodeUsingPOST: "/v1/bc/company/admin/auditLoginCode",
        /** 免密登录 */
        autoLoginUsingPOST: "/v1/bc/company/admin/autoLogin",
        /** 检查二维码状态 */
        checkLoginCodeUsingPOST: "/v1/bc/company/admin/checkLoginCode",
        /** 获取登录二维码 */
        createLoginCodeUsingGET: "/v1/bc/company/admin/createLoginCode",
        /** 客服app登录 */
        customerServiceLoginUsingPOST: "/v1/bc/company/admin/customerServiceLogin",
        /** 管理员登录 */
        fillApplyCodeUsingPOST: "/v1/bc/company/admin/fillApplyCode",
        /** 获取用户信息 */
        getUserInfoUsingGET: "/v1/bc/company/admin/getUserInfo",
        /** 管理员登录 */
        mobileLoginUsingPOST: "/v1/bc/company/admin/login",
        /** 管理员登录 */
        loginOrRegisterUsingPOST: "/v1/bc/company/admin/loginOrRegister",
        /** 退出登录 */
        loginOutUsingGET: "/v1/bc/company/admin/loginOut",
        /** 管理员登录 */
        simpleAccountLoginUsingPOST: "/v1/bc/company/admin/simpleAccountLogin",
        /** 管理员登录(无应用编码) */
        simpleLoginUsingPOST: "/v1/bc/company/admin/simpleLogin",
        /** 管理员登录 */
        loginOrRegisterUsingPOST_1: "/v1/bc/company/admin/simpleLoginOrRegister",
        /** 管理员登录 */
        updateUserInfoUsingPOST: "/v1/bc/company/admin/updateUserInfo"
    },
    "agency-init-controller": {
        /** excel数据导入 */
        importByExcelUsingPOST: "/v1/bc/admin/agencyInit/importByExcel",
        /** demo 数据测试 */
        testUsingGET: "/v1/bc/admin/agencyInit/test"
    },
    "amap-controller": {
        /** city */
        cityUsingGET: "/v1/bc/amap/city",
        /** district */
        districtUsingGET: "/v1/bc/amap/district",
        /** province */
        provinceUsingGET: "/v1/bc/amap/province",
        /** street */
        streetUsingGET: "/v1/bc/amap/street"
    },
    "app-version-controller": {
        /** getNewVersion */
        getNewVersionUsingGET: "/app/getNewVersion",
        /** 详情 */
        detailUsingGET_1: "/v1/bc/admin/appVersion/detail",
        /** 列表 */
        listUsingPOST_1: "/v1/bc/admin/appVersion/list",
        /** 最新版本列表 */
        newVersionListUsingPOST: "/v1/bc/admin/appVersion/newVersionList",
        /** 新建/编辑版本 */
        updateOrCreateUsingPOST: "/v1/bc/admin/appVersion/updateOrCreate"
    },
    "apply-controller": {
        /** detail */
        detailUsingGET_2: "/v1/bc/admin/apply/detail",
        /** 应用列表 */
        listUsingPOST_2: "/v1/bc/admin/apply/list",
        /** test */
        testUsingGET_1: "/v1/bc/admin/apply/test",
        /** updateOrCreate */
        updateOrCreateUsingPOST_1: "/v1/bc/admin/apply/updateOrCreate"
    },
    "article-controller": {
        /** categoryTree */
        categoryTreeUsingGET: "/v1/bc/admin/article/category/tree",
        /** create */
        createUsingPOST: "/v1/bc/admin/article/create",
        /** delete */
        deleteUsingPOST: "/v1/bc/admin/article/delete",
        /** detail */
        detailUsingGET_3: "/v1/bc/admin/article/detail",
        /** list */
        listUsingPOST_3: "/v1/bc/admin/article/list",
        /** modify */
        modifyUsingPOST: "/v1/bc/admin/article/modify"
    },
    "bc-config-controller": {
        /** 关于我们 */
        aboutUsUsingGET: "/v1/bc/app/config/aboutUs"
    },
    "category-certificate-controller": {
        /** 获取类目资质证书 */
        getByCategoryIdsUsingPOST: "/v1/bc/company/category/certificate/getByCategoryIds"
    },
    "certificate-controller": {
        /** 类目资质详情 */
        categoryCertificateDetailUsingGET: "/v1/bc/admin/certificate/categoryCertificateDetail",
        /** 类目资质列表 */
        categoryCertificateListUsingPOST: "/v1/bc/admin/certificate/categoryCertificateList",
        /** 类目资质列表 */
        editCategoryUsingPOST: "/v1/bc/admin/certificate/editCategory",
        /** 新增/修改工种证书 */
        editWorkerTypeUsingPOST: "/v1/bc/admin/certificate/editWorkerType",
        /** 证书详情 */
        workerTypeCertificateDetailUsingGET: "/v1/bc/admin/certificate/workerTypeCertificateDetail",
        /** 工种证书列表 */
        workerTypeCertificateListUsingPOST: "/v1/bc/admin/certificate/workerTypeCertificateList",
        /** 证书模板删除 */
        removeUsingPOST: "/v1/bc/company/certificate/remove",
        /** 证书模板新增或修改 */
        saveOrUpdateUsingPOST: "/v1/bc/company/certificate/saveOrUpdate"
    },
    "证书资质经营范围": {
        /** 经营范围查询 */
        getUsingPOST: "/v1/bc/company/certificate/scope/get"
    },
    "comment-controller": {
        /** 申诉审核 */
        auditUsingPOST: "/v1/bc/admin/comment/appeal/audit",
        /** 申诉详情 */
        appealDetailsUsingGET: "/v1/bc/admin/comment/appeal/details",
        /** 申诉查询 */
        appealListUsingPOST: "/v1/bc/admin/comment/appeal/list",
        /** 订单评价列表 */
        commodityListUsingPOST: "/v1/bc/admin/comment/commodity/list",
        /** 订单评价列表 */
        commodityListUsingPOST_1: "/v1/bc/api/comment/commodity/list",
        /** 订单评价提交 */
        commoditySaveUsingPOST: "/v1/bc/api/comment/commodity/save",
        /** 店铺商品评价 */
        commodityViewUsingPOST: "/v1/bc/api/comment/commodity/view",
        /** delete */
        deleteUsingPOST_1: "/v1/bc/api/comment/delete",
        /** Look */
        LookUsingPOST: "/v1/bc/api/comment/look",
        /** score */
        scoreUsingGET: "/v1/bc/api/comment/score",
        /** scorekey */
        scorekeyUsingGET: "/v1/bc/api/comment/scorekey",
        /** tags */
        tagsUsingGET: "/v1/bc/api/comment/tags",
        /** 申诉查询 */
        appealListUsingPOST_1: "/v1/bc/company/comment/appeal/list",
        /** 申诉提交 */
        markUsingPOST: "/v1/bc/company/comment/appeal/mark",
        /** 申诉举证 */
        proofUsingPOST: "/v1/bc/company/comment/appeal/proof",
        /** 订单评价列表 */
        commodityListUsingPOST_2: "/v1/bc/company/comment/commodity/list",
        /** 订单评价回复 */
        commodityReplyUsingPOST: "/v1/bc/company/comment/commodity/reply",
        /** 默认好评 */
        defaultPraiseUsingGET_1: "/v1/bc/company/comment/defaultPraise",
        /** 工单所需展示 */
        jobCommentLookUsingGET: "/v1/bc/company/comment/jobCommentLook",
        /** 店铺的好评率 */
        shopCommentRateUsingGET: "/v1/bc/company/comment/shopCommentRate",
        /** 店铺评分 */
        shopScoreUsingGET: "/v1/bc/company/comment/shopScore",
        /** 服务人员的评价 */
        workCommentUsingPOST: "/v1/bc/company/comment/workComment"
    },
    "common-controller": {
        /** 获取分享路径 */
        getPageUsingGET: "/v1/bc/app/common/getPage",
        /** 获取分享二维码 */
        getQrcodeUsingGET: "/v1/bc/app/common/getQrcode",
        /** 获取店铺基础信息 */
        getBaseInfoUsingGET: "/v1/bc/app/common/getShopInfo",
        /** 根据分类id获取店铺列表 */
        getShopListBycategoryIdUsingGET: "/v1/bc/app/common/getShopListBycategoryId",
        /** 获取所有一级服务类目 */
        getStairCategoryUsingGET_1: "/v1/bc/app/common/getStairCategory",
        /** 获取二维码 */
        getWxCodeUsingGET: "/v1/bc/app/common/getWXQrcode",
        /** 登录凭证校验 */
        getWxMiniProgramSessionKeyUsingGET: "/v1/bc/app/common/getWxMiniProgramSessionKey",
        /** 新店列表 */
        newListUsingGET: "/v1/bc/app/common/newList",
        /** 优选店铺 */
        preferredListUsingGET: "/v1/bc/app/common/preferredList",
        /** 隐私政策 */
        privacyPolicyUsingGET: "/v1/bc/app/common/privacyPolicy",
        /** 用户协议 */
        userAgreementUsingGET: "/v1/bc/app/common/userAgreement",
        /** 授权协议 */
        authorizationListUsingGET: "/v1/bc/company/common/authorizationList",
        /** 获取所有区域地址 */
        getAllDistrictUsingGET: "/v1/bc/company/common/getAllDistrict"
    },
    "complaint-controller": {
        /** 处理 */
        do_handleUsingPOST: "/v1/bc/admin/complaint/handle",
        /** 列表 */
        listByPageUsingPOST: "/v1/bc/admin/complaint/list",
        /** 纠纷详情 */
        detailsUsingGET: "/v1/bc/api/complaint/details",
        /** 纠纷列表 */
        listUsingPOST_4: "/v1/bc/api/complaint/list",
        /** save */
        saveUsingPOST: "/v1/bc/api/complaint/save",
        /** typeReasonList */
        typeReasonListUsingGET: "/v1/bc/api/complaint/typeReason"
    },
    "consumer-controller": {
        /** 修改客户状态 */
        changeStatusUsingPOST: "/v1/bc/admin/consumer/changeStatus",
        /** 客户信息详情 */
        listUsingGET: "/v1/bc/admin/consumer/detail",
        /** 发放优惠券 */
        distributeCouponUsingPOST: "/v1/bc/admin/consumer/distributeCoupon",
        /** 获取配置 */
        getConfigUsingGET: "/v1/bc/admin/consumer/getConfig",
        /** 获取导入结果 */
        getImportResultUsingGET: "/v1/bc/admin/consumer/getImportResult",
        /** 获取统计数据 */
        getStatisticsUsingGET_1: "/v1/bc/admin/consumer/getStatistics",
        /** 手动处理导入数据-测试 */
        handleDataUsingGET: "/v1/bc/admin/consumer/handleData",
        /** 导入客户 */
        importThirdConsumerUsingPOST_1: "/v1/bc/admin/consumer/importData",
        /** 导入客户 */
        importThirdConsumerUsingPOST: "/v1/bc/admin/consumer/importThirdConsumer",
        /** 活动邀请 */
        inviteActivityUsingPOST: "/v1/bc/admin/consumer/inviteActivity",
        /** 邀请注册 */
        inviteRegisterUsingPOST: "/v1/bc/admin/consumer/inviteRegister",
        /** 客户信息管理 */
        listUsingPOST_5: "/v1/bc/admin/consumer/list",
        /** 客户关系详情 */
        thirdDetailUsingGET: "/v1/bc/admin/consumer/thirdDetail",
        /** 客户关系管理 */
        thirdListUsingPOST: "/v1/bc/admin/consumer/thirdList"
    },
    "contain-tag-controller": {
        /** 收住标签删除 */
        deleteUsingPOST_2: "/v1/bc/admin/containTag/delete",
        /** 收住标签详情 */
        detailUsingGET_4: "/v1/bc/admin/containTag/detail",
        /** 收住标签列表 */
        listUsingPOST_6: "/v1/bc/admin/containTag/list",
        /** 收住标签新增 */
        saveUsingPOST_1: "/v1/bc/admin/containTag/save",
        /** 收住标签修改 */
        updateUsingPOST: "/v1/bc/admin/containTag/update"
    },
    "contract-controller": {
        /** 合同详情 */
        getListUsingGET: "/v1/bc/admin/contract/detail",
        /** 合同列表 */
        getListUsingPOST: "/v1/bc/admin/contract/list",
        /** 合同模板详情 */
        getTemplateDetailUsingGET: "/v1/bc/admin/contract/template/detail",
        /** 新增、修改合同模板 */
        editTemplateUsingPOST: "/v1/bc/admin/contract/template/edit",
        /** 合同模板列表 */
        getTemplateListUsingGET: "/v1/bc/admin/contract/template/list",
        /** callback */
        callbackUsingPOST: "/v1/bc/api/contract/sign/callback"
    },
    "类目、资质证书数据迁移": {
        /** 类目数据迁移 */
        categoriesUsingGET: "/v1/bc/company/dataMigration/categories",
        /** 证书数据迁移 */
        certificatesUsingGET: "/v1/bc/company/dataMigration/certificates",
        /** 店铺关联关系更新 */
        relevanceUpdateUsingGET: "/v1/bc/company/dataMigration/relevanceUpdate"
    },
    "district-controller": {
        /** 获取子区域列表 */
        getSonListUsingGET: "/v1/bc/app/district/getSonList",
        /** 获取子区域列表 */
        getSonListUsingGET_1: "/v1/bc/company/district/getSonList"
    },
    "上传": {
        /** compareFaceVerify */
        compareFaceVerifyUsingPOST: "/ali/face/compareFaceVerify",
        /** describeFaceVerify */
        describeFaceVerifyUsingGET: "/ali/face/describeFaceVerify",
        /** initFaceVerifyIdPlus */
        initFaceVerifyIdPlusUsingPOST: "/ali/face/initFaceVerifyIdPlus",
        /** recognizeBankCard */
        recognizeBankCardUsingPOST: "/ali/ocr/recognizeBankCard",
        /** recognizeBasic */
        recognizeBasicUsingPOST: "/ali/ocr/recognizeBasic",
        /** recognizeIdCard */
        recognizeIdCardUsingPOST: "/ali/ocr/recognizeIdCard"
    },
    "favorite-controller": {
        /** 是否收藏服务 */
        isFavoriteItemUsingGET: "/v1/bc/app/favorite/isFavoriteItem",
        /** 收藏服务 */
        itemAddUsingPOST: "/v1/bc/app/favorite/itemAdd",
        /** 取消收藏服务 */
        itemCancelUsingPOST: "/v1/bc/app/favorite/itemCancel",
        /** 服务列表 */
        itemListUsingPOST: "/v1/bc/app/favorite/itemList",
        /** 收藏店鋪 */
        shopAddUsingPOST: "/v1/bc/app/favorite/shopAdd",
        /** 取消收藏店鋪 */
        shopCancelUsingPOST: "/v1/bc/app/favorite/shopCancel",
        /** 店鋪列表 */
        shopListUsingPOST: "/v1/bc/app/favorite/shopList"
    },
    "feedback-controller": {
        /** 确认 */
        doActionUsingPOST_1: "/v1/bc/admin/feedback/doAction",
        /** 列表 */
        listByPageUsingPOST_1: "/v1/bc/admin/feedback/list",
        /** 添加 */
        addUsingPOST: "/v1/bc/company/feedback/add",
        /** 记录 */
        listUsingPOST_7: "/v1/bc/company/feedback/list",
        /** 类型 */
        getTypeUsingGET: "/v1/bc/company/feedback/type",
        /** 添加 */
        addUsingPOST_1: "/v1/bc/server/feedback/add",
        /** 记录 */
        listUsingPOST_8: "/v1/bc/server/feedback/list",
        /** 类型 */
        getTypeUsingGET_1: "/v1/bc/server/feedback/type"
    },
    "invite-controller": {
        /** config */
        configUsingGET: "/v1/bc/admin/invite/config",
        /** save_config */
        save_configUsingPOST: "/v1/bc/admin/invite/config/save",
        /** detail */
        detailUsingGET_5: "/v1/bc/admin/invite/detail",
        /** list */
        listUsingPOST_9: "/v1/bc/admin/invite/list",
        /** userList */
        userListUsingGET: "/v1/bc/admin/invite/user/list",
        /** config */
        configUsingGET_1: "/v1/bc/api/invite/config",
        /** info */
        infoUsingGET: "/v1/bc/api/invite/info",
        /** list */
        listUsingGET_1: "/v1/bc/api/invite/list",
        /** qrcode */
        qrcodeUsingGET: "/v1/bc/api/invite/qrcode",
        /** share */
        shareUsingPOST: "/v1/bc/api/invite/share"
    },
    "item-browse-history-controller": {
        /** 加入足迹 */
        addUsingPOST_2: "/v1/bc/app/item_browse_history/add",
        /** 删除足迹 */
        personalDoActionUsingPOST: "/v1/bc/app/item_browse_history/del",
        /** 足迹列表-按天分组 */
        getListGroupByDateUsingPOST: "/v1/bc/app/item_browse_history/getListGroupByDate",
        /** 足迹列表 */
        listUsingPOST_10: "/v1/bc/app/item_browse_history/list"
    },
    "licence-controller": {
        /** 修改平台资质 */
        editUsingPOST: "/v1/bc/admin/licence/edit",
        /** 平台合规管理 */
        getAllUsingGET: "/v1/bc/admin/licence/getAll"
    },
    "marketing-controller": {
        /** 关闭 */
        closeUsingPOST: "/v1/bc/admin/marketing/close",
        /** 推广详情 */
        admin__detailUsingGET: "/v1/bc/admin/marketing/detail",
        /** 推广列表 */
        admin_listUsingPOST_2: "/v1/bc/admin/marketing/list",
        /** 新增修改 */
        doSaveUsingPOST_2: "/v1/bc/admin/marketing/save"
    },
    "menu-controller": {
        /** apply_list */
        apply_listUsingGET: "/v1/bc/admin/menu/apply/list",
        /** delete */
        deleteUsingPOST_3: "/v1/bc/admin/menu/delete",
        /** all */
        allUsingGET: "/v1/bc/admin/menu/list/all",
        /** tree */
        treeUsingGET: "/v1/bc/admin/menu/tree",
        /** adminTree */
        adminTreeUsingGET: "/v1/bc/admin/menu/tree/admin",
        /** adminTree1 */
        adminTree1UsingGET: "/v1/bc/admin/menu/tree/admin1",
        /** treeAll */
        treeAllUsingGET: "/v1/bc/admin/menu/tree/all",
        /** updateOrCreate */
        updateOrCreateUsingPOST_2: "/v1/bc/admin/menu/updateOrCreate"
    },
    "operation-log-controller": {
        /** list */
        listUsingPOST_11: "/v1/bc/admin/operation/log/list"
    },
    "日志rpc接口": {
        /** history */
        historyUsingGET: "/history"
    },
    "organization-category-controller": {
        /** 经营服务类目列表 */
        getUsingGET: "/v1/bc/company/organization/category/get",
        /** 经营服务类目列表 */
        listUsingGET_2: "/v1/bc/company/organization/category/list",
        /** 新增经营服务类目 */
        saveUsingPOST_2: "/v1/bc/company/organization/category/save"
    },
    "organization-category-log-controller": {
        /** 经营服务类目列表 */
        getByIdUsingGET: "/v1/bc/admin/organization/category/getById"
    },
    "organization-controller": {
        /** 商家店铺入驻登录或注册 */
        agencyOrHealthDataCleanUsingGET: "/v1/bc/admin/organization/agencyOrHealthDataClean",
        /** 平台/商家店铺入驻审核 */
        auditEnteringUsingPOST: "/v1/bc/admin/organization/auditEntering",
        /** 平台/商家详情 */
        detailUsingGET_6: "/v1/bc/admin/organization/detail",
        /** getUpdateLog */
        getUpdateLogUsingGET: "/v1/bc/admin/organization/getUpdateLog",
        /** 获取佣金比例列表 */
        getWorkerCommissionListUsingPOST: "/v1/bc/admin/organization/getWorkerCommissionList",
        /** 平台/商家列表 */
        listUsingPOST_12: "/v1/bc/admin/organization/list",
        /** 商家店铺入驻登录或注册 */
        loginOrRegisterUsingPOST_2: "/v1/bc/admin/organization/loginOrRegister",
        /** 平台/商家店铺入驻审核 */
        auditEnteringSetUsingPOST: "/v1/bc/admin/organization/set/auditEntering",
        /** 平台/商家详情 */
        detailSetUsingGET: "/v1/bc/admin/organization/set/detail",
        /** 平台/商家列表 */
        listSetUsingPOST: "/v1/bc/admin/organization/set/list",
        /** 设置佣金比例 */
        setWorkerCommissionUsingPOST: "/v1/bc/admin/organization/setWorkerCommission",
        /** 获取所有一级服务类目 */
        getAllCategoryUsingGET: "/v1/bc/app/organization/getAllCategory",
        /** 获取所有一级服务类目 */
        getStairCategoryUsingGET_2: "/v1/bc/app/organization/getStairCategory",
        /** 根据注册用户查询平台/商家详情 */
        detailByUserUsingGET: "/v1/bc/company/organization/detailByUser",
        /** 获取所有一级服务类目 */
        getAllCategoryUsingGET_1: "/v1/bc/company/organization/getAllCategory",
        /** 查询审核记录 */
        getAuditDetailUsingGET: "/v1/bc/company/organization/getAuditDetail",
        /** 查询审核记录 */
        getAuditRecordUsingGET: "/v1/bc/company/organization/getAuditRecord",
        /** 获取所有一级服务类目 */
        getStairCategoryUsingGET_3: "/v1/bc/company/organization/getStairCategory",
        /** 查询商家店铺状态 */
        getStateUsingGET: "/v1/bc/company/organization/getState",
        /** 商家主体详情 */
        infoUsingGET_1: "/v1/bc/company/organization/info",
        /** 平台/商家修改 */
        modifyUsingPOST_1: "/v1/bc/company/organization/modify",
        /** 平台/商家新增 */
        saveUsingPOST_3: "/v1/bc/company/organization/save",
        /** 商家主体修改 */
        settingUsingPOST: "/v1/bc/company/organization/setting",
        /** 获取所有一级服务类目 */
        getAllCategoryUsingGET_2: "/v1/bc/server/organization/getAllCategory",
        /** 获取所有一级服务类目 */
        getStairCategoryUsingGET_4: "/v1/bc/server/organization/getStairCategory",
        /** 根据商家编号获取门店工种信息 */
        getWorkerTypeUsingGET: "/v1/bc/server/organization/getWorkerType",
        /** 获取服务人员关联的门店列表 */
        simpleListUsingPOST: "/v1/bc/server/organization/simpleList"
    },
    "organization-worker-controller": {
        /** 冻结服务人员 */
        auditFreezeUsingPOST: "/v1/bc/admin/organization/worker/auditFreeze",
        /** 查询服务人员详情 */
        getWorkersUsingPOST_1: "/v1/bc/admin/organization/worker/detail",
        /** 查询已入驻店铺的服务人员列表 */
        getWorkersUsingPOST: "/v1/bc/admin/organization/worker/getWorkers",
        /** 服务人员入驻审核 */
        auditJoiningUsingPOST: "/v1/bc/company/organization/worker/auditJoining",
        /** 服务人员查询 */
        auditListUsingPOST: "/v1/bc/company/organization/worker/auditList",
        /** 服务人员信息更新审核 */
        auditUpdatingUsingPOST: "/v1/bc/company/organization/worker/auditUpdating",
        /** 服务人员详情 */
        detailUsingGET_7: "/v1/bc/company/organization/worker/detail",
        /** 店铺服务人员批量解绑 */
        disemployUsingPOST: "/v1/bc/company/organization/worker/disemploy",
        /** 服务人员查询 */
        simpleListUsingPOST_1: "/v1/bc/company/organization/worker/simpleList",
        /** 新增或更新服务人员关联门店 */
        editUsingPOST_1: "/v1/bc/server/organization/worker/edit",
        /** 根据商家编号获取服务人员选定的工种信息 */
        getWorkerDetailUsingGET: "/v1/bc/server/organization/worker/getWorkerDetail"
    },
    "patient-controller": {
        /** 删除被照护人 */
        delUsingGET: "/v1/bc/app/patient/del",
        /** 被照护人详情 */
        getDetailUsingGET: "/v1/bc/app/patient/detail",
        /** 新增、修改被照护人 */
        editUsingPOST_2: "/v1/bc/app/patient/edit",
        /** 被照护人列表 */
        getListUsingGET_1: "/v1/bc/app/patient/list"
    },
    "public-controller": {
        /** categoryTree */
        categoryTreeUsingGET_1: "/v1/bc/public/article/category/tree",
        /** detail */
        detailUsingGET_9: "/v1/bc/public/article/detail",
        /** list */
        listUsingPOST_13: "/v1/bc/public/article/list",
        /** convertToBase64 */
        convertToBase64UsingPOST: "/v1/bc/public/convertToBase64",
        /** 客服app账号密码登录 */
        customerServiceAccountLoginUsingPOST: "/v1/bc/public/customerServiceAccountLogin",
        /** categoryTree */
        categoryTreeUsingGET_2: "/v1/bc/app/public/article/category/tree",
        /** list */
        listUsingPOST_14: "/v1/bc/app/public/article/list",
        /** licence */
        licenceUsingGET: "/v1/bc/app/public/licence",
        /** categoryTree */
        categoryTreeUsingGET_3: "/v1/bc/merchant/public/article/category/tree",
        /** detail */
        detailUsingGET_10: "/v1/bc/merchant/public/article/detail",
        /** list */
        listUsingPOST_15: "/v1/bc/merchant/public/article/list",
        /** categoryTree */
        categoryTreeUsingGET_4: "/v1/bc/server/public/article/category/tree",
        /** detail */
        detailUsingGET_11: "/v1/bc/server/public/article/detail",
        /** list */
        listUsingPOST_16: "/v1/bc/server/public/article/list"
    },
    "resume-controller": {
        /** 服务人员其他简历-店铺 */
        workerDetailUsingGET: "/v1/bc/admin/resume/worker/company",
        /** 服务人员简历详情 */
        detailUsingGET_12: "/v1/bc/admin/resume/worker/detail",
        /** 服务人员简历列表 */
        listUsingGET_3: "/v1/bc/admin/resume/worker/list",
        /** 简历详情 */
        detailUsingGET_13: "/v1/bc/app/resume/detail",
        /** 简历详情 */
        detailUsingGET_14: "/v1/bc/company/resume/detail",
        /** 简历详情 */
        workerDetailUsingGET_1: "/v1/bc/company/resume/detail/worker",
        /** 更新简历 */
        UpdateUsingPOST: "/v1/bc/company/resume/update",
        /** 简历详情 */
        detailUsingGET_15: "/v1/bc/server/resume/detail",
        /** 更新简历 */
        UpdateUsingPOST_1: "/v1/bc/server/resume/update"
    },
    "role-controller": {
        /** bindUser */
        bindUserUsingPOST: "/v1/bc/admin/role/bindUser",
        /** remove */
        removeUsingPOST_1: "/v1/bc/admin/role/delete",
        /** detail */
        detailUsingGET_16: "/v1/bc/admin/role/detail",
        /** 角色列表 */
        listUsingPOST_17: "/v1/bc/admin/role/list",
        /** bindMenu */
        bindMenuUsingPOST: "/v1/bc/admin/role/menu/bind",
        /** getMenuIdsByRoleId */
        getMenuIdsByRoleIdUsingGET: "/v1/bc/admin/role/menu/list",
        /** updateOrCreate */
        updateOrCreateUsingPOST_3: "/v1/bc/admin/role/updateOrCreate"
    },
    "shop-business-card-controller": {
        /** 店铺名片审核详情 */
        auditDetailUsingGET: "/v1/bc/admin/shop/card/auditDetail",
        /** 店铺名片审核信息 */
        auditInfoUsingPOST: "/v1/bc/admin/shop/card/auditInfo",
        /** 店铺名片审核列表 */
        getAuditListUsingPOST: "/v1/bc/admin/shop/card/getAuditList",
        /** 店铺名片详情 */
        detailUsingGET_17: "/v1/bc/company/shop/card/detail",
        /** 店铺名片更改记录 */
        getRecordsUsingPOST: "/v1/bc/company/shop/card/getRecords",
        /** 店铺名片更改记录详情 */
        recordDetailUsingGET: "/v1/bc/company/shop/card/recordDetail",
        /** 店铺名片修改 */
        saveOrUpdateUsingPOST_1: "/v1/bc/company/shop/card/saveOrUpdate"
    },
    "shop-controller": {
        /** 店铺协议 */
        agreementUsingGET: "/v1/bc/admin/shop/agreement",
        /** 店铺信息修改审核 */
        auditUsingPOST_1: "/v1/bc/admin/shop/audit",
        /** 店铺列表 */
        getListUsingPOST_1: "/v1/bc/admin/shop/getList",
        /** 初始化手续费合同-上线删除 */
        initCommissionDataUsingGET: "/v1/bc/admin/shop/initCommissionData",
        /** 保证金账户初始化 */
        initMarginAccountUsingGET: "/v1/bc/admin/shop/initMarginAccount",
        /** 店铺信息修改列表查询 */
        listUsingPOST_18: "/v1/bc/admin/shop/list",
        /** 店铺手续费合同 */
        marginAgreementUsingGET: "/v1/bc/admin/shop/marginAgreement",
        /** 搜索机构 */
        organizationListUsingPOST: "/v1/bc/admin/shop/organizationList",
        /** 获取店铺基础信息 */
        getBaseInfoUsingGET_4: "/v1/bc/app/shop/getBaseInfo",
        /** 店铺信息修改 */
        modifyUsingPOST_2: "/v1/bc/app/shop/modify",
        /** 机构详情 */
        organizationDetailUsingGET: "/v1/bc/app/shop/organizationDetail",
        /** 搜索机构 */
        organizationListUsingPOST_1: "/v1/bc/app/shop/organizationList",
        /** 店铺协议 */
        agreementUsingGET_1: "/v1/bc/company/shop/agreement",
        /** 店铺注销 */
        cancellationUsingPOST: "/v1/bc/company/shop/cancellation",
        /** 商品下架查询 */
        checkUndercarriageUsingGET: "/v1/bc/company/shop/checkUndercarriage",
        /** 店铺认领 */
        claimUsingGET: "/v1/bc/company/shop/claim",
        /** 店铺紧急联系设置 */
        emergencyContactUsingPOST: "/v1/bc/company/shop/contact",
        /** 店铺详情 */
        detailUsingGET_18: "/v1/bc/company/shop/detail",
        /** 店铺设置 */
        editUsingPOST_3: "/v1/bc/company/shop/edit",
        /** 店铺商品配送地址设置 */
        editShippingAddressUsingPOST: "/v1/bc/company/shop/editShippingAddress",
        /** 店铺商品配送地址查询 */
        getShippingAddressUsingGET_1: "/v1/bc/company/shop/getShippingAddress",
        /** 获取店铺的类目 */
        getShopCategoryUsingGET_1: "/v1/bc/company/shop/getShopCategory",
        /** 获取店铺的二级类目 */
        getShopCategoryByIdUsingGET: "/v1/bc/company/shop/getShopCategoryById",
        /** 获取店铺类目树型 */
        getItreeUsingGET: "/v1/bc/company/shop/getShopItreeCategory",
        /** 获取店铺的一级类目 */
        getShopParentCategoryUsingGET: "/v1/bc/company/shop/getShopParentCategory",
        /** 获取符合条件的服务人员 */
        getShopWorkerUsingPOST_1: "/v1/bc/company/shop/getShopWorker",
        /** 店铺信息修改 */
        modifyUsingPOST_3: "/v1/bc/company/shop/modify",
        /** 材料提交列表 */
        platformOrderUsingGET: "/v1/bc/company/shop/platformOrder",
        /** 紧急联系 */
        workerShopContactListUsingGET: "/v1/bc/server/shop/contact",
        /** 获取服务人员的店铺列表 */
        getByWorkerAndAddressUsingPOST_1: "/v1/bc/server/shop/getByWorkerAndAddress",
        /** 搜索店铺 */
        getListByKeywordsUsingPOST_1: "/v1/bc/server/shop/getListByKeywords",
        /** 获取店铺的职业列表 */
        getWorkerTypeUsingGET_1: "/v1/bc/server/shop/getWorkerType"
    },
    "shop-facility-controller": {
        /** 机构设施删除 */
        deleteUsingPOST_4: "/v1/bc/company/shop/facility/delete",
        /** 机构设施详情 */
        detailUsingGET_19: "/v1/bc/company/shop/facility/detail",
        /** 机构设施列表 */
        listUsingPOST_19: "/v1/bc/company/shop/facility/list",
        /** 机构设施新增 */
        saveUsingPOST_4: "/v1/bc/company/shop/facility/save",
        /** 机构设施修改 */
        updateUsingPOST_1: "/v1/bc/company/shop/facility/update"
    },
    "shop-license-controller": {
        /** 店铺资质详情 */
        detailUsingGET_20: "/v1/bc/company/shop/license/detail",
        /** 店铺资质列表 */
        listUsingPOST_20: "/v1/bc/company/shop/license/list"
    },
    "shop-stat-controller": {
        /** overview */
        overviewUsingGET: "/v1/bc/company/stat/overview"
    },
    "短信": {
        /** getMobileFromToken */
        getMobileFromTokenUsingGET: "/ali/sms/getMobileFromToken",
        /** sendBankCardCode */
        sendBankCardCodeUsingGET: "/ali/sms/sendBankCardCode",
        /** sendBindCode */
        sendBindCodeUsingGET: "/ali/sms/sendBindCode",
        /** sendLoginCode */
        sendLoginCodeUsingGET: "/ali/sms/sendLoginCode",
        /** sendRegisterCode */
        sendRegisterCodeUsingGET: "/ali/sms/sendRegisterCode"
    },
    "stat-controller": {
        /** accountStat */
        accountStatUsingGET: "/v1/bc/admin/stat/account",
        /** settled */
        settledUsingGET: "/v1/bc/admin/stat/settled"
    },
    "test-controller": {
        /** initBusinessCardPrice */
        initBusinessCardPriceUsingGET: "/v1/bc/admin/test/initBusinessCardPrice",
        /** accountStat */
        accountStatUsingGET_1: "/v1/bc/admin/test/testz"
    },
    "upload-controller": {
        /** fetchStsUploadCredential */
        fetchStsUploadCredentialUsingGET: "/v1/bc/oss/sts/upload/credential",
        /** fetchStsViewCredential */
        fetchStsViewCredentialUsingGET: "/v1/bc/oss/sts/view/credential",
        /** uploadOssFrom */
        uploadOssFromUsingGET: "/v1/bc/oss/url/upload"
    },
    "user-address-controller": {
        /** 用户地址列表 */
        getUserAddressListUsingGET_1: "/v1/bc/admin/user/address/list",
        /** 添加地址 */
        addUsingPOST_3: "/v1/bc/app/address/add",
        /** 地址删除 */
        delUsingGET_1: "/v1/bc/app/address/del",
        /** 地址详情 */
        detailUsingGET_21: "/v1/bc/app/address/detail",
        /** 地址修改 */
        addUsingPOST_4: "/v1/bc/app/address/edit",
        /** 地址列表 */
        listUsingGET_4: "/v1/bc/app/address/list"
    },
    "user-controller": {
        /** addSubAccount */
        addSubAccountUsingPOST: "/v1/bc/admin/account/add/subaccount",
        /** del */
        delUsingPOST: "/v1/bc/admin/account/del",
        /** detail */
        detailUsingGET_22: "/v1/bc/admin/account/detail",
        /** doAction */
        doActionUsingPOST_2: "/v1/bc/admin/account/doAction",
        /** editSubAccount */
        editSubAccountUsingPOST: "/v1/bc/admin/account/edit/subaccount",
        /** list */
        listUsingPOST_21: "/v1/bc/admin/account/list",
        /** getMenuIdsByUserId */
        getMenuIdsByUserIdUsingGET: "/v1/bc/admin/account/menu/list",
        /** organizationList */
        organizationListUsingGET: "/v1/bc/admin/account/organization/list",
        /** getPermissionsByUserId */
        getPermissionsByUserIdUsingGET: "/v1/bc/admin/account/permission/list",
        /** setDefaultAvatar */
        setDefaultAvatarUsingGET: "/v1/bc/admin/account/setDefaultAvatar",
        /** userInfo */
        userInfoUsingGET: "/v1/bc/admin/account/user/info",
        /** wxkLogin */
        wxkLoginUsingPOST: "/v1/bc/admin/account/wxkLogin",
        /** 用户注销 */
        destroyUsingPOST: "/v1/bc/app/user/destroy",
        /** 获取用户详情 */
        detailUsingGET_23: "/v1/bc/app/user/detail",
        /** 修改用户信息 */
        editUsingPOST_4: "/v1/bc/app/user/edit",
        /** 手机号快速验证 */
        getPhoneNumberUsingPOST: "/v1/bc/app/user/getPhoneNumber",
        /** 登录 */
        loginUsingPOST: "/v1/bc/app/user/login",
        /** 短信验证码登录 */
        mobileCodeLoginUsingPOST: "/v1/bc/app/user/mobileCodeLogin",
        /** 手机号一键登录 */
        mobileQuicklyLoginUsingPOST: "/v1/bc/app/user/mobileQuicklyLogin",
        /** 无感登录 */
        refreshLoginUsingPOST: "/v1/bc/app/user/refreshLogin",
        /** 微信授权登录 */
        wechatLoginUsingPOST: "/v1/bc/app/user/wechatLogin"
    },
    "worker-bank-card-controller": {
        /** 银行卡详情 */
        detailUsingGET_24: "/v1/bc/server/workerBankCard/detail",
        /** 绑定银行卡 */
        editUsingPOST_5: "/v1/bc/server/workerBankCard/edit"
    },
    "worker-certificate-controller": {
        /** 获取申请详情 */
        applyDetailUsingGET: "/v1/bc/server/workerCertificate/applyDetail"
    },
    "worker-company-controller": {
        /** 配置字典List */
        configListUsingGET_1: "/v1/bc/company/company/configList",
        /** 配置字典 */
        configMapUsingGET: "/v1/bc/company/company/configMap"
    },
    "worker-config-list-controller": {
        /** getLanguageList */
        getLanguageListUsingGET_1: "/v1/bc/app/workerConfig/getLanguageList",
        /** getOriginList */
        getOriginListUsingGET_1: "/v1/bc/app/workerConfig/getOriginList"
    },
    "worker-controller": {
        /** 申请入驻店铺 */
        applyEnterShopUsingPOST: "/v1/bc/server/worker/applyEnterShop",
        /** 自动登录 */
        autoLoginUsingPOST_1: "/v1/bc/server/worker/autoLogin",
        /** 背景审查 */
        backgroundCheckUsingGET: "/v1/bc/server/worker/backgroundCheck",
        /** 服务人员注销 */
        cancellationUsingPOST_1: "/v1/bc/server/worker/cancellation",
        /** 人脸 + 身份证认证 */
        certificateByCertifyIdUsingGET: "/v1/bc/server/worker/certificateByCertifyId",
        /** 认证主页 */
        certificationInfoUsingGET: "/v1/bc/server/worker/certificationInfo",
        /** 获取详情 */
        detailUsingGET_25: "/v1/bc/server/worker/detail",
        /** 修改行业 */
        editIndustryUsingPOST: "/v1/bc/server/worker/editIndustry",
        /** 获取职业 */
        getWorkerTypeUsingGET_2: "/v1/bc/server/worker/getWorkerType",
        /** 登录 */
        loginUsingPOST_1: "/v1/bc/server/worker/login",
        /** 手机号一键登录 */
        mobileQuicklyLoginUsingPOST_1: "/v1/bc/server/worker/mobileQuicklyLogin",
        /** 手机号注册 */
        registerUsingPOST: "/v1/bc/server/worker/register",
        /** 人脸识别照片保存 */
        saveFaceImageUsingPOST: "/v1/bc/server/worker/saveFaceImage"
    },
    "worker-type-controller": {
        /** delete */
        deleteUsingPOST_5: "/v1/bc/admin/workerType/delete",
        /** 详情 */
        detailUsingGET_26: "/v1/bc/admin/workerType/detail",
        /** 工种列表 */
        listUsingPOST_22: "/v1/bc/admin/workerType/list",
        /** 详情 */
        roleUsingGET: "/v1/bc/admin/workerType/role",
        /** 工种角色列表 */
        roleListUsingGET: "/v1/bc/admin/workerType/roleList",
        /** 工种角色列表 */
        roleListLikeCategoryUsingGET: "/v1/bc/admin/workerType/roleListLikeCategory",
        /** 新增或修改 */
        saveUsingPOST_5: "/v1/bc/admin/workerType/save",
        /** 根据行业获取工种 */
        getCertificateListUsingGET: "/v1/bc/server/workerType/getCertificateList"
    }
}
