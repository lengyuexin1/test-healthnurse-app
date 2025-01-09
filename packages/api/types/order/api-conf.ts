export const ORDER_API = {
    "activity-controller": {
        /** add */
        addUsingPOST: "/v1/bc/admin/activity/add",
        /** conditionCollection */
        conditionCollectionUsingGET: "/v1/bc/admin/activity/conditionCollection",
        /** detail */
        detailUsingGET_1: "/v1/bc/admin/activity/detail",
        /** doAction */
        doActionUsingPOST: "/v1/bc/admin/activity/doAction",
        /** edit */
        editUsingPOST: "/v1/bc/admin/activity/edit",
        /** list */
        listUsingPOST: "/v1/bc/admin/activity/list",
        /** detail */
        detailUsingGET_2: "/v1/bc/app/activity/detail",
        /** list */
        listUsingGET: "/v1/bc/app/activity/list"
    },
    "after-sale-controller": {
        /** 合规部仲裁列表 */
        arbitrateHgListUsingPOST: "/v1/bc/admin/aftersale/arbitrate/HgList",
        /** 仲裁列表 */
        arbitrateListUsingPOST: "/v1/bc/admin/aftersale/arbitrate/List",
        /** 合规部消息提醒 */
        messageWarnUsingPOST: "/v1/bc/admin/aftersale/message/warn",
        /** 仲裁 */
        adm_arbitrateUsingPOST: "/v1/bc/admin/aftersale/platform/arbitrate",
        /** reason_edit */
        reason_editUsingPOST: "/v1/bc/admin/aftersale/reason/edit",
        /** reason_view */
        reason_viewUsingGET: "/v1/bc/admin/aftersale/reason/view",
        /** reason_list */
        reason_listUsingPOST: "/v1/bc/admin/aftersale/reason_list",
        /** 适品屯售后列表 */
        sptListUsingPOST: "/v1/bc/admin/aftersale/sptList",
        /** type_edit */
        type_editUsingPOST: "/v1/bc/admin/aftersale/type/edit",
        /** type_list */
        type_listUsingPOST: "/v1/bc/admin/aftersale/type/list",
        /** 申请仲裁 */
        arbitrateUsingPOST: "/v1/bc/api/aftersale/ApplyFor/arbitration",
        /** 适品屯确认收货 */
        afterConsentUsingPOST: "/v1/bc/api/aftersale/afterConsent",
        /** 申请退款 */
        applyRefundUsingPOST: "/v1/bc/api/aftersale/applyRefund",
        /** 换货物流查询 */
        barterLogisticsUsingGET: "/v1/bc/api/aftersale/barterLogistics",
        /** 取消订单 */
        cancelOrderUsingPOST: "/v1/bc/api/aftersale/cancelOrder",
        /** close */
        closeUsingPOST: "/v1/bc/api/aftersale/close",
        /** reason_list */
        reason_listUsingGET: "/v1/bc/api/aftersale/reason_list",
        /** record_list */
        record_listUsingGET: "/v1/bc/api/aftersale/record_list",
        /** 申请售后（适品囤） */
        sptAddUsingPOST: "/v1/bc/api/aftersale/spt/add",
        /** 适品屯去退货 */
        addExpressUsingPOST: "/v1/bc/api/aftersale/spt/addExpress",
        /** 申请售后的数据 */
        sptAddLookUsingGET: "/v1/bc/api/aftersale/spt/addLook",
        /** 申请售后的数据 */
        sptAddLook1UsingPOST: "/v1/bc/api/aftersale/spt/addLook1",
        /** 再次申请售后 */
        sptAgainAddUsingPOST: "/v1/bc/api/aftersale/spt/againAdd",
        /** 适品屯售后详情 */
        sptDetailsUsingGET: "/v1/bc/api/aftersale/sptApiDetails",
        /** 适品屯售后列表 */
        sptApiListUsingPOST: "/v1/bc/api/aftersale/sptApiList",
        /** 申请仲裁 */
        sptArbitrateUsingPOST: "/v1/bc/api/aftersale/sptApplyFor/arbitration",
        /** 测试定时器 */
        testUsingGET: "/v1/bc/api/aftersale/test",
        /** type_list */
        type_listUsingGET: "/v1/bc/api/aftersale/type_list",
        /** 适品屯确认收货 */
        afterConsentUsingPOST_1: "/v1/bc/company/aftersale/afterConsent",
        /** 适品屯批量同意退款和退货 */
        sptBulkRefundUsingPOST: "/v1/bc/company/aftersale/bulk/refund",
        /** 适品屯售后地址展示 */
        getAddressUsingGET: "/v1/bc/company/aftersale/getAddress",
        /** no_pass */
        no_passUsingPOST: "/v1/bc/company/aftersale/nopass",
        /** pass */
        passUsingPOST: "/v1/bc/company/aftersale/pass",
        /** record_list */
        record_listUsingGET_1: "/v1/bc/company/aftersale/record_list",
        /** 拒绝收货 */
        refuseReceiveGoodsUsingPOST: "/v1/bc/company/aftersale/refuseReceiveGoods",
        /** 适品屯售后地址设置 */
        setAddressUsingPOST: "/v1/bc/company/aftersale/setAddress",
        /** 适品屯售后详情 */
        sptDetailsUsingGET_1: "/v1/bc/company/aftersale/sptDetails",
        /** 售后详列表 */
        sptDetailsByEntityUsingGET: "/v1/bc/company/aftersale/sptDetailsByEntityId",
        /** 适品屯仲裁举证 */
        sptPutEvidenceUsingPOST: "/v1/bc/company/aftersale/sptEvidence",
        /** 适品屯售后列表 */
        sptListUsingPOST_1: "/v1/bc/company/aftersale/sptList",
        /** 适品屯商户是否同意售后 */
        sptMerchantAuditUsingPOST: "/v1/bc/company/aftersale/sptMerchantAudit",
        /** 适品屯直接退款 */
        sptPassUsingPOST: "/v1/bc/company/aftersale/sptPass",
        /** 适品屯去发货 */
        toDeliverGoodsUsingPOST: "/v1/bc/company/aftersale/toDeliverGoods"
    },
    "agency-controller": {
        /** add */
        addUsingPOST_1: "/v1/bc/admin/agency/add",
        /** audit */
        auditUsingPOST: "/v1/bc/admin/agency/audit",
        /** conditionCollection */
        conditionCollectionUsingGET_1: "/v1/bc/admin/agency/conditionCollection",
        /** detail */
        detailUsingGET_3: "/v1/bc/admin/agency/detail",
        /** doAction */
        doActionUsingPOST_1: "/v1/bc/admin/agency/doAction",
        /** doPublish */
        doPublishUsingPOST: "/v1/bc/admin/agency/doPublish",
        /** edit */
        editUsingPOST_1: "/v1/bc/admin/agency/edit",
        /** list */
        listUsingPOST_1: "/v1/bc/admin/agency/list",
        /** detail */
        detailUsingGET_4: "/v1/bc/app/agency/detail",
        /** list */
        listUsingPOST_2: "/v1/bc/app/agency/list"
    },
    "cart-controller": {
        /** countCart */
        countCartUsingGET: "/v1/bc/admin/cart/count",
        /** list */
        listUsingPOST_3: "/v1/bc/admin/cart/list",
        /** 创建购物车 */
        createUsingPOST: "/v1/bc/app/cart/create",
        /** 删除购物车 */
        deleteUsingPOST: "/v1/bc/app/cart/delete",
        /** 下单所需数据 */
        getPurchaseInfoUsingGET: "/v1/bc/app/cart/purchase/view",
        /** 修改购物车数 */
        updateQuantityUsingPOST: "/v1/bc/app/cart/quantity/update",
        /** 购物车列表 */
        serviceListUsingGET: "/v1/bc/app/cart/service/list",
        /** 创建购物车 */
        createUsingPOST_1: "/v1/product/app/cart/create",
        /** 购物车列表 */
        listUsingGET_1: "/v1/product/app/cart/list",
        /** 下单所需数据 */
        getPurchaseInfoUsingGET_1: "/v1/product/app/cart/purchase/view",
        /** 修改购物车数 */
        updateQuantityUsingPOST_1: "/v1/product/app/cart/quantity/update"
    },
    "category-controller": {
        /** 添加 */
        addUsingPOST_2: "/v1/bc/admin/category/add",
        /** 类目 */
        allUsingGET: "/v1/bc/admin/category/all",
        /** 获取类目佣金 */
        commissionUsingGET: "/v1/bc/admin/category/commission",
        /** 获取类目列表 */
        listForActivityUsingPOST: "/v1/bc/admin/category/list/activity",
        /** 编辑 */
        modifyUsingPOST: "/v1/bc/admin/category/modify",
        /** 类目删除 */
        batchRemoveUsingPOST: "/v1/bc/admin/category/remove",
        /** 类目排序 */
        batchSortUsingPOST: "/v1/bc/admin/category/sort",
        /** 类目上下架 */
        setStatusUsingPOST: "/v1/bc/admin/category/status",
        /** 同步内容类目 */
        syncContentCategoryUsingGET: "/v1/bc/admin/category/syncContentCategory",
        /** 类目树 */
        treeUsingGET: "/v1/bc/admin/category/tree",
        /** 分类列表 */
        getListUsingGET: "/v1/bc/app/category/getList",
        /** 获取子类目的商品信息 */
        getSonListWithProductUsingGET: "/v1/bc/app/category/getSonListWithProduct",
        /** getCategoryByIds */
        getCategoryByIdsUsingGET: "/v1/bc/merchant/category/byIds",
        /** getCategoryTree */
        getCategoryTreeUsingGET: "/v1/bc/merchant/category/tree",
        /** 类目 */
        listUsingGET_2: "/v1/bc/server/category/list"
    },
    "category-show-controller": {
        /** 删除 */
        deleteUsingPOST_1: "/v1/bc/admin/category_show/delete",
        /** 列表 */
        listUsingGET_3: "/v1/bc/admin/category_show/list",
        /** 添加 */
        saveUsingPOST: "/v1/bc/admin/category_show/save",
        /** 排序 */
        sortUsingPOST: "/v1/bc/admin/category_show/sort",
        /** 同步内容前台类目 */
        syncContentCategoryShowUsingGET: "/v1/bc/admin/category_show/syncContentCategoryShow",
        /** 服务列表 */
        itemListUsingPOST: "/v1/bc/app/category_show/item/list",
        /** 类目列表 */
        listUsingGET_4: "/v1/bc/app/category_show/list",
        /** 商品列表 */
        productListUsingPOST: "/v1/bc/app/category_show/product/list",
        /** recommendProductList */
        recommendProductListUsingGET: "/v1/bc/app/category_show/recommend/product/list",
        /** 店铺商品列表 */
        shopProductListUsingGET: "/v1/bc/app/category_show/shop/product/list"
    },
    "comment-controller": {
        /** list */
        listUsingPOST_4: "/v1/bc/company/comment/list"
    },
    "common-controller": {
        /** 消息类型查看 */
        MessageTypeLookUsingGET: "/v1/bc/common/message/list",
        /** 获取二级分类 */
        categoryListByPidUsingGET: "/v1/bc/app/common/getCategoryByPid",
        /** 获取适品囤分类 */
        getProductCategoryUsingGET: "/v1/bc/app/common/getProductCategory",
        /** 获取子类目的商品信息 */
        getSonListWithProductUsingPOST: "/v1/bc/app/common/getSonListWithProduct",
        /** 获取一级分类 */
        getListUsingGET_1: "/v1/bc/app/common/getTopCategory",
        /** 服务列表 */
        itemListUsingPOST_1: "/v1/bc/app/common/itemList"
    },
    "coupon-controller": {
        /** addTotal */
        addTotalUsingPOST: "/v1/bc/admin/coupon/add/total",
        /** conditionCollection */
        conditionCollectionUsingGET_2: "/v1/bc/admin/coupon/conditionCollection",
        /** doAction */
        doActionUsingPOST_2: "/v1/bc/admin/coupon/delete",
        /** detail */
        detailUsingGET_5: "/v1/bc/admin/coupon/detail",
        /** doAction */
        doActionUsingPOST_3: "/v1/bc/admin/coupon/doAction",
        /** list */
        listUsingPOST_5: "/v1/bc/admin/coupon/list",
        /** updateOrCreate */
        updateOrCreateUsingPOST: "/v1/bc/admin/coupon/save",
        /** grantedUserList */
        grantedUserListUsingPOST: "/v1/bc/admin/coupon/user/list",
        /** checkCoupon */
        checkCouponUsingPOST: "/v1/bc/app/coupon/check",
        /** getCoupon */
        getCouponUsingPOST_1: "/v1/bc/app/coupon/collect",
        /** get_for_item */
        get_for_itemUsingGET: "/v1/bc/app/coupon/for/item",
        /** granted_list */
        granted_listUsingPOST: "/v1/bc/app/coupon/granted/list",
        /** list */
        listUsingPOST_6: "/v1/bc/app/coupon/list",
        /** getCouponGranted */
        getCouponGrantedUsingPOST: "/v1/bc/app/coupon/use/list",
        /** getPlatformGranted */
        getPlatformGrantedUsingPOST: "/v1/bc/app/coupon/use/platform"
    },
    "estimate-grade-controller": {
        /** add */
        addUsingPOST_3: "/v1/bc/admin/estimate_grade/add",
        /** edit */
        editUsingPOST_2: "/v1/bc/admin/estimate_grade/edit",
        /** list */
        listUsingPOST_7: "/v1/bc/admin/estimate_grade/list"
    },
    "estimate-question-controller": {
        /** add */
        addUsingPOST_4: "/v1/bc/admin/estimate_question/add",
        /** categoryList */
        categoryListUsingGET: "/v1/bc/admin/estimate_question/categoryList",
        /** del */
        delUsingPOST: "/v1/bc/admin/estimate_question/del",
        /** detail */
        detailUsingGET_6: "/v1/bc/admin/estimate_question/detail",
        /** edit */
        editUsingPOST_3: "/v1/bc/admin/estimate_question/edit",
        /** list */
        listUsingPOST_8: "/v1/bc/admin/estimate_question/list",
        /** sort */
        sortUsingPOST_1: "/v1/bc/admin/estimate_question/sort",
        /** estimate */
        estimateUsingPOST: "/v1/bc/app/estimate_question/estimate",
        /** list */
        listUsingGET_5: "/v1/bc/app/estimate_question/list"
    },
    "estimate-record-controller": {
        /** detail */
        detailUsingGET_7: "/v1/bc/admin/estimate_record/detail",
        /** list */
        listUsingGET_6: "/v1/bc/admin/estimate_record/list"
    },
    "express-controller": {
        /** 快递100回调 */
        callbackUsingPOST: "/v1/bc/app/kuaidi/express/callback",
        /** 快递公司查看 */
        ExpressLookUsingGET: "/v1/bc/app/kuaidi/express/company/list",
        /** 判断是否签收 */
        expressIsSignUsingGET: "/v1/bc/app/kuaidi/express/isSign",
        /** 判断是否签收 */
        expressIsSignUsingGET_1: "/v1/bc/app/kuaidi/express/isSign/nu",
        /** 快递100订阅 */
        pushExpressUsingPOST: "/v1/bc/app/kuaidi/express/pushExpress",
        /** 快递实时查看 */
        RealtimeLookExpressUsingPOST: "/v1/bc/app/kuaidi/express/realtimeLookExpress",
        /** 物流轨迹图 */
        expressTrajectoryUsingPOST: "/v1/bc/app/kuaidi/express/trajectory",
        /** 订单 快递查看 */
        batchFetchExpressInfoUsingGET: "/v1/bc/app/kuaidi/realtime/order/view"
    },
    "health-controller": {
        /** add */
        addUsingPOST_5: "/v1/bc/admin/health/add",
        /** audit */
        auditUsingPOST_1: "/v1/bc/admin/health/audit",
        /** detail */
        detailUsingGET_8: "/v1/bc/admin/health/detail",
        /** doAction */
        doActionUsingPOST_4: "/v1/bc/admin/health/doAction",
        /** doPublish */
        doPublishUsingPOST_1: "/v1/bc/admin/health/doPublish",
        /** edit */
        editUsingPOST_4: "/v1/bc/admin/health/edit",
        /** list */
        listUsingPOST_9: "/v1/bc/admin/health/list",
        /** detail */
        detailUsingGET_9: "/v1/bc/app/health/detail",
        /** list */
        listUsingPOST_10: "/v1/bc/app/health/list"
    },
    "home-mould-controller": {
        /** 删除 */
        deleteUsingPOST_2: "/v1/bc/admin/home/mould/delete",
        /** 详情 */
        detailUsingGET_10: "/v1/bc/admin/home/mould/detail",
        /** 列表 */
        listUsingPOST_11: "/v1/bc/admin/home/mould/list",
        /** 发布 */
        sortUsingPOST_2: "/v1/bc/admin/home/mould/publish",
        /** 添加 */
        saveUsingPOST_1: "/v1/bc/admin/home/mould/save",
        /** 模板数据 */
        getMouldUsingGET: "/v1/bc/app/home/mould/data"
    },
    "hospital-controller": {
        /** 城市 */
        cityUsingGET: "/v1/bc/admin/hospital/city",
        /** 创建 */
        createUsingPOST_2: "/v1/bc/admin/hospital/create",
        /** 区 */
        districtUsingGET: "/v1/bc/admin/hospital/district",
        /** 等级 */
        levelUsingGET: "/v1/bc/admin/hospital/level",
        /** 列表 */
        listByPageUsingPOST: "/v1/bc/admin/hospital/list",
        /** 修改 */
        modifyUsingPOST_1: "/v1/bc/admin/hospital/modify",
        /** 删除 */
        removeUsingPOST: "/v1/bc/admin/hospital/remove",
        /** 详情 */
        detailUsingPOST: "/v1/bc/app/hospital/detail",
        /** 列表 */
        listByPageUsingPOST_1: "/v1/bc/app/hospital/list",
        /** 列表 */
        listByPageUsingPOST_2: "/v1/bc/merchant/hospital/list"
    },
    "image-space-controller": {
        /** addFile */
        addFileUsingPOST: "/v1/bc/admin/image_space/add_file",
        /** addFolder */
        addFolderUsingPOST: "/v1/bc/admin/image_space/add_folder",
        /** addFile */
        addFileUsingPOST_1: "/v1/bc/admin/image_space/del",
        /** detail */
        detailUsingGET_11: "/v1/bc/admin/image_space/detail",
        /** getItree */
        getItreeUsingGET: "/v1/bc/admin/image_space/list"
    },
    "item-audit-controller": {
        /** 详情 */
        detailUsingGET_12: "/v1/bc/admin/audit/detail",
        /** 通过/驳回 */
        doActionUsingPOST_5: "/v1/bc/admin/audit/doAction",
        /** 列表 */
        listByPageUsingPOST_3: "/v1/bc/admin/audit/list",
        /** 列表 */
        listByPageUsingPOST_4: "/v1/bc/merchant/draft/list",
        /** 删除 */
        batchRemoveUsingPOST_1: "/v1/bc/merchant/draft/remove",
        /** 详情 */
        detailUsingGET_13: "/v1/bc/merchant/item/detail"
    },
    "item-controller": {
        /** detail */
        detailUsingGET_14: "/v1/bc/admin/item/detail",
        /** 上架/下架 */
        doActionUsingPOST_6: "/v1/bc/admin/item/doAction",
        /** 列表 */
        listByPageUsingPOST_5: "/v1/bc/admin/item/list",
        /** 服务列表 */
        getAllListUsingPOST: "/v1/bc/app/item/all",
        /** clear cache */
        clearUsingGET: "/v1/bc/app/item/clear",
        /** 服务详情 */
        detailUsingGET_15: "/v1/bc/app/item/detail",
        /** 获取服务供es 手动自动导入 */
        getItemListUsingPOST: "/v1/bc/app/item/es/list",
        /** 搜索框推荐 */
        featuredUsingGET: "/v1/bc/app/item/featured",
        /** 服务列表 */
        getListUsingPOST: "/v1/bc/app/item/list",
        /** 上架/下架 */
        doActionUsingPOST_7: "/v1/bc/merchant/item/doAction",
        /** 上架/下架 */
        doPublishUsingPOST_2: "/v1/bc/merchant/item/doPublish",
        /** 添加服务规格 */
        draftUsingPOST: "/v1/bc/merchant/item/draft",
        /** 列表 */
        listByPageUsingPOST_6: "/v1/bc/merchant/item/list",
        /** 提前下单单位 */
        orderUnitUsingGET: "/v1/bc/merchant/item/orderUnit",
        /** 删除 */
        batchRemoveUsingPOST_2: "/v1/bc/merchant/item/remove",
        /** 快照 */
        snapshotUsingGET: "/v1/bc/merchant/item/snapshot",
        /** 编辑服务规格 */
        submitUsingPOST: "/v1/bc/merchant/item/submit",
        /** 单位 */
        unitUsingGET: "/v1/bc/merchant/item/unit"
    },
    "job-clock-controller": {
        /** clockJobRecord */
        clockJobRecordUsingGET: "/v1/bc/merchant/clock/clockJobRecord",
        /** jobClockWorker */
        jobClockWorkerUsingGET: "/v1/bc/merchant/clock/clockJobWorker",
        /** 排班统计 */
        detailUsingGET_16: "/v1/bc/merchant/clock/detail",
        /** 排班统计 */
        scheduleStatisticUsingPOST: "/v1/bc/merchant/clock/list",
        /** planStatistics */
        planStatisticsUsingGET: "/v1/bc/merchant/clock/plan/statistics",
        /** planStatistics2 */
        planStatistics2UsingGET: "/v1/bc/merchant/clock/statistics",
        /** planStatistic */
        planStatisticUsingGET: "/v1/bc/server/clock/statistics"
    },
    "job-controller": {
        /** 结束工单 */
        closeJobUsingPOST: "/v1/bc/admin/job/close",
        /** 工单详情 */
        detailUsingGET_17: "/v1/bc/admin/job/detail",
        /** 工单列表 */
        listUsingPOST_12: "/v1/bc/admin/job/list",
        /** 用户工单列表 */
        personJobListUsingPOST: "/v1/bc/admin/job/person",
        /** 授理工单 */
        acceptedJobUsingPOST: "/v1/bc/merchant/job/accepted",
        /** 指派 */
        assignUsingPOST: "/v1/bc/merchant/job/assign",
        /** 取消工单 */
        cancelUsingPOST: "/v1/bc/merchant/job/cancel",
        /** 任务详情 */
        detailUsingGET_18: "/v1/bc/merchant/job/detail",
        /** 工单费用设置 */
        feeUsingGET: "/v1/bc/merchant/job/fee",
        /** 服务人员工单费用历史 */
        workerHistorySettleUsingGET: "/v1/bc/merchant/job/history",
        /** 通知用户工单快结束 */
        jobEndAlertUserUsingPOST: "/v1/bc/merchant/job/jobEndAlertUser",
        /** 任务列表 */
        listUsingPOST_13: "/v1/bc/merchant/job/list",
        /** 休假设置 */
        offDateUsingPOST: "/v1/bc/merchant/job/offDate",
        /** 待结算列表 */
        paidListUsingPOST: "/v1/bc/merchant/job/paid",
        /** 任务详情 */
        paidDetailUsingGET: "/v1/bc/merchant/job/paidDetail",
        /** 用户工单列表 */
        personJobListUsingPOST_1: "/v1/bc/merchant/job/person",
        /** 工单服务中更换服务人员 */
        replaceWorkerUsingPOST: "/v1/bc/merchant/job/replaceWorker",
        /** 更新服务人员费用设置详情 */
        replaceWorkerListUsingGET: "/v1/bc/merchant/job/replaceWorkerList",
        /** 保存费用 */
        settleUsingPOST: "/v1/bc/merchant/job/settle",
        /** 个人工单统计 */
        workerJobSumUsingGET: "/v1/bc/merchant/job/total",
        /** 保存备注 */
        updateJobUsingPOST_1: "/v1/bc/merchant/job/update",
        /** 设置倒计时备注 */
        updateJobUsingPOST: "/v1/bc/merchant/job/updateGrabTime",
        /** 获取用户最新打卡工单id */
        getJobIdUsingGET: "/v1/bc/server/job/clock/id",
        /** 保存打卡信息 */
        clockSaveUsingPOST: "/v1/bc/server/job/clock/save",
        /** 获取打卡信息 */
        getScopeUsingGET: "/v1/bc/server/job/clock/scope",
        /** 提交代跑物流信息 */
        workerDeliveryUsingPOST: "/v1/bc/server/job/delivery",
        /** 工单详情 */
        detailUsingGET_19: "/v1/bc/server/job/detail",
        /** 提交工单完成 */
        doFinishUsingPOST: "/v1/bc/server/job/finish",
        /** 任务大厅 */
        orderHallUsingPOST: "/v1/bc/server/job/hall",
        /** 统计服务人员月工单数 */
        jobOrderStatisticsUsingGET: "/v1/bc/server/job/jobOrderStatistics",
        /** 服务人员订单列表 */
        workerOrderUsingGET: "/v1/bc/server/job/order",
        /** 用户工单列表 */
        personJobListUsingPOST_2: "/v1/bc/server/job/person",
        /** 提交代跑取单实物信息 */
        workerPhysicalUsingPOST: "/v1/bc/server/job/physical",
        /** 抢单 */
        rushOrderUsingPOST: "/v1/bc/server/job/rush",
        /** 扫码更新工单状态 */
        scanCodeUsingPOST: "/v1/bc/server/job/scanCode",
        /** 任务列表 */
        listUsingPOST_14: "/v1/bc/server/job/task",
        /** 个人工单统计 */
        workerJobSumUsingGET_1: "/v1/bc/server/job/total",
        /** 统计当前用户服务中数量 */
        getWaitUsingGET: "/v1/bc/server/job/wait",
        /** 任务详情 */
        taskDetailUsingGET: "/v1/bc/server/task/detail"
    },
    "job-filter-controller": {
        /** save */
        saveUsingPOST_2: "/v1/bc/server/category/save",
        /** selected */
        selectedUsingGET: "/v1/bc/server/category/selected",
        /** getFilter */
        getFilterUsingGET: "/v1/bc/server/job/filter",
        /** setFilter */
        setFilterUsingPOST: "/v1/bc/server/job/filter"
    },
    "job-prepaid-order-controller": {
        /** 创建 */
        createUsingPOST_3: "/v1/bc/merchant/prepaid/create",
        /** 预付单详情 */
        billDetailUsingGET: "/v1/bc/merchant/prepaid/detail",
        /** 审核 */
        doActionUsingPOST_8: "/v1/bc/merchant/prepaid/doAction",
        /** 关联记录 */
        prePayHistoryUsingGET: "/v1/bc/merchant/prepaid/history",
        /** 工单列表 */
        jobListUsingGET: "/v1/bc/merchant/prepaid/job",
        /** 服务人员工单详情 */
        detailUsingGET_20: "/v1/bc/merchant/prepaid/job/detail",
        /** 列表 */
        listUsingPOST_15: "/v1/bc/merchant/prepaid/list",
        /** 服务人列表 */
        workerUsingGET: "/v1/bc/merchant/prepaid/worker"
    },
    "job-recall-controller": {
        /** 修改/添加回访 */
        addUsingPOST_6: "/v1/bc/merchant/recall/add",
        /** 任务列表 */
        detailUsingGET_21: "/v1/bc/merchant/recall/detail",
        /** 工单列表 */
        jobListUsingGET_1: "/v1/bc/merchant/recall/job",
        /** 工单详情 */
        jobDetailUsingGET: "/v1/bc/merchant/recall/job/detail",
        /** 任务列表 */
        listUsingPOST_16: "/v1/bc/merchant/recall/list",
        /** 删除 */
        removeUsingPOST_1: "/v1/bc/merchant/recall/remove",
        /** 任务列表 */
        detailUsingGET_22: "/v1/bc/server/recall/detail",
        /** 任务列表 */
        listUsingPOST_17: "/v1/bc/server/recall/list",
        /** 修改/添加回访 */
        modifyUsingPOST_2: "/v1/bc/server/recall/modify"
    },
    "job-settle-n-controller": {
        /** 创建 */
        createUsingPOST_4: "/v1/bc/merchant/settle/create",
        /** N次结算单详情 */
        billDetailUsingGET_1: "/v1/bc/merchant/settle/detail",
        /** 审核 */
        doActionUsingPOST_9: "/v1/bc/merchant/settle/doAction",
        /** 关联记录 */
        prePayHistoryUsingGET_1: "/v1/bc/merchant/settle/history",
        /** 工单结算历史记录 */
        prePayHistoryAllUsingGET: "/v1/bc/merchant/settle/historyAll",
        /** 工单列表 */
        jobListUsingGET_2: "/v1/bc/merchant/settle/job",
        /** 服务人员工单详情 */
        detailUsingGET_23: "/v1/bc/merchant/settle/job/detail",
        /** 列表 */
        listUsingPOST_18: "/v1/bc/merchant/settle/list",
        /** 服务人列表 */
        workerUsingGET_1: "/v1/bc/merchant/settle/worker"
    },
    "job-status-controller": {
        /** 状态 */
        listUsingGET_7: "/v1/bc/admin/job/status"
    },
    "margin-order-controller": {
        /** 编辑保证金配置 */
        editConfigUsingGET: "/v1/bc/admin/margin/editConfig",
        /** 获取保证金配置列表 */
        editConfigUsingGET_1: "/v1/bc/admin/margin/getConfigList",
        /** 获取支付结果 */
        getPayResultUsingGET: "/v1/bc/admin/margin/getPayResult",
        /** 保证金缴纳 */
        nativePayUsingGET: "/v1/bc/admin/margin/nativePay"
    },
    "marketing-controller": {
        /** 删除 */
        deleteUsingPOST_3: "/v1/bc/admin/marketing/offline/delete",
        /** 线下详情 */
        admin_offline_detailUsingGET: "/v1/bc/admin/marketing/offline/detail",
        /** 线下列表 */
        admin_offline_listUsingPOST: "/v1/bc/admin/marketing/offline/list",
        /** 删除物料 */
        deleteMaterialUsingPOST: "/v1/bc/admin/marketing/offline/material/delete",
        /** 线下物料详情 */
        admin_material_detailUsingGET: "/v1/bc/admin/marketing/offline/material/detail",
        /** 线下物料列表 */
        admin_material_listUsingPOST: "/v1/bc/admin/marketing/offline/material/list",
        /** 新增修改物料 */
        doSaveMaterialUsingPOST: "/v1/bc/admin/marketing/offline/material/save",
        /** 新增修改 */
        doSaveUsingPOST_1: "/v1/bc/admin/marketing/offline/save",
        /** 新增修改投放场所 */
        doSaveDataUsingPOST: "/v1/bc/admin/marketing/offline/save/data",
        /** 线上推广删除 */
        deleteOnlineUsingPOST: "/v1/bc/admin/marketing/online/delete",
        /** 线上详情 */
        admin_online_detailUsingGET: "/v1/bc/admin/marketing/online/detail",
        /** 线上列表 */
        admin_online_listUsingPOST: "/v1/bc/admin/marketing/online/list",
        /** 线上新增修改 */
        doSaveOnlineUsingPOST: "/v1/bc/admin/marketing/online/save",
        /** 线上新增修改推广渠道 */
        doSaveDataOnlineUsingPOST: "/v1/bc/admin/marketing/online/save/data"
    },
    "order-cancel-audit-controller": {
        /** 同意退款 */
        agreeRefundUsingPOST: "/v1/bc/merchant/cancel/audit/order/agree/refund",
        /** 不同意退款 */
        disagreeRefundUsingPOST: "/v1/bc/merchant/cancel/audit/order/disagree/refund",
        /** 审核列表 */
        listUsingPOST_19: "/v1/bc/merchant/cancel/audit/order/list"
    },
    "order-controller": {
        /** 核销 */
        cardConsumeUsingPOST: "/v1/bc/admin/order/cardConsume",
        /** 券号列表 */
        cardConsumeListUsingPOST: "/v1/bc/admin/order/cardConsumeList",
        /** 状态列表等查询条件 */
        conditionCollectionUsingGET_3: "/v1/bc/admin/order/condition/collection",
        /** 订单详细 */
        detailUsingGET_24: "/v1/bc/admin/order/detail",
        /** entityDetail */
        entityDetailUsingGET: "/v1/bc/admin/order/entity/detail",
        /** 订单类型 */
        getKindUsingGET: "/v1/bc/admin/order/kind",
        /** 订单列表 */
        listUsingPOST_20: "/v1/bc/admin/order/list",
        /** operationLogList */
        operationLogListUsingPOST: "/v1/bc/admin/order/operation/log/list",
        /** 帮客户续单 */
        renewUsingPOST: "/v1/bc/admin/order/renew",
        /** subOrderAll */
        subOrderAllUsingGET: "/v1/bc/admin/order/sub_order/list",
        /** 未评价列表 */
        waitCommentListUsingPOST: "/v1/bc/admin/order/wait_comment/list",
        /** 可售后列表 */
        afterSaleableListUsingPOST: "/v1/bc/app/order/after/saleable/list",
        /** cancel */
        cancelUsingPOST_2: "/v1/bc/app/order/cancel",
        /** 创建虚拟卡订单 */
        createUsingPOST_5: "/v1/bc/app/order/cardCreate",
        /** 虚拟卡订单退款 */
        cardRefundUsingPOST: "/v1/bc/app/order/cardRefund",
        /** 订单数 */
        countOrderUsingGET: "/v1/bc/app/order/count",
        /** 创建课程订单 */
        courseCreateUsingPOST: "/v1/bc/app/order/courseCreate",
        /** 创建订单 */
        createUsingPOST_6: "/v1/bc/app/order/create",
        /** 订单详细 */
        detailUsingGET_25: "/v1/bc/app/order/detail",
        /** entityDetail */
        entityDetailUsingGET_1: "/v1/bc/app/order/entity/detail",
        /** helpCreate */
        helpCreateUsingPOST: "/v1/bc/app/order/help/create",
        /** 订单列表 */
        listUsingPOST_21: "/v1/bc/app/order/list",
        /** 修改订单 */
        modifyUsingPOST_3: "/v1/bc/app/order/modify",
        /** 求订单总价 */
        priceCalculationUsingPOST: "/v1/bc/app/order/price/calculation",
        /** 求虚拟卡订单总价 */
        priceCalculationUsingPOST_1: "/v1/bc/app/order/price/cardCalculation",
        /** 求课程订单总价 */
        priceCourseCalculationUsingPOST: "/v1/bc/app/order/price/courseCalculation",
        /** 下单所需数据 */
        getPurchaseInfoUsingGET_2: "/v1/bc/app/order/purchase/view",
        /** 发送短信 */
        sendSmsUsingPOST: "/v1/bc/app/order/send_sms",
        /** subOrderAll */
        subOrderAllUsingGET_1: "/v1/bc/app/order/sub_order/list",
        /** 立刻使用 (多次单) */
        useNowUsingPOST: "/v1/bc/app/order/use_now",
        /** cancel */
        cancelUsingPOST_3: "/v1/bc/merchant/order/cancel",
        /** 状态列表等查询条件 */
        conditionCollectionUsingGET_4: "/v1/bc/merchant/order/condition/collection",
        /** 订单详细 */
        detailUsingGET_26: "/v1/bc/merchant/order/detail",
        /** 求订单总价 */
        getEntityPriceUsingGET: "/v1/bc/merchant/order/entity/price/calculation",
        /** 订单列表 */
        listUsingPOST_22: "/v1/bc/merchant/order/list",
        /** 订单修改最终实付金额 */
        modifyEntityOrderUsingPOST: "/v1/bc/merchant/order/modify/entity/order",
        /** 被照护人详细 */
        patientUsingGET: "/v1/bc/merchant/order/patient",
        /** subOrderAll */
        subOrderAllUsingGET_2: "/v1/bc/merchant/order/sub_order/list",
        /** 订单更改 */
        updateUsingPOST: "/v1/bc/merchant/order/update",
        /** 订单更改最终实付金额 */
        updatePaidAmountUsingPOST: "/v1/bc/merchant/order/update_paid_amount",
        /** 未评价列表 */
        waitCommentListUsingPOST_1: "/v1/bc/merchant/order/wait_comment/list",
        /** combinationOptionDetail */
        combinationOptionDetailUsingGET: "/v1/product/admin/order/combination_option_detail",
        /** 订单列表 */
        listUsingPOST_23: "/v1/product/admin/order/list",
        /** 确认收货 */
        confirmReceiveUsingPOST: "/v1/product/app/order/confirm/receive",
        /** 创建订单 */
        createUsingPOST_7: "/v1/product/app/order/create",
        /** 延长收货 */
        doDelayReceiveUsingPOST: "/v1/product/app/order/delay/receive",
        /** 删除订单 */
        deleteUsingPOST_4: "/v1/product/app/order/delete",
        /** 修改订单 */
        modifyUsingPOST_4: "/v1/product/app/order/modify",
        /** 求订单总价 */
        priceCalculationUsingPOST_2: "/v1/product/app/order/price/calculation",
        /** 下单所需数据 */
        getPurchaseInfoUsingGET_3: "/v1/product/app/order/purchase/view",
        /** 延长收货 */
        doDelayReceiveUsingPOST_1: "/v1/product/merchant/order/delay/receive",
        /** 发货 or 补发 */
        deliveryUsingPOST: "/v1/product/merchant/order/delivery",
        /** 订单详细 */
        detailUsingGET_27: "/v1/product/merchant/order/detail",
        /** 修改单号 */
        updateExpressUsingPOST: "/v1/product/merchant/order/express/update",
        /** 订单列表 */
        listUsingPOST_24: "/v1/product/merchant/order/list"
    },
    "order-stat-controller": {
        /** 订单总览_访问数 */
        getAccessorCntUsingPOST: "/v1/bc/admin/order/stat/accessor/cnt",
        /** 订单总览 */
        overviewUsingPOST: "/v1/bc/admin/order/stat/overview",
        /** 订单总览_售额 */
        getSaleAmountUsingPOST: "/v1/bc/admin/order/stat/sale/amount"
    },
    "organization-order-controller": {
        /** 数据统计 */
        amountUsingPOST: "/v1/bc/admin/organization/order/amount",
        /** createAd */
        createAdUsingPOST: "/v1/bc/admin/organization/order/create/ad",
        /** 详情 */
        detailsUsingGET: "/v1/bc/admin/organization/order/details",
        /** 下架 */
        droppedUsingPOST: "/v1/bc/admin/organization/order/dropped",
        /** admin_list */
        admin_listUsingPOST: "/v1/bc/admin/organization/order/list",
        /** ads_list */
        ads_listUsingPOST: "/v1/bc/company/organization/order/ads",
        /** createSecurity */
        createSecurityUsingPOST: "/v1/bc/company/organization/order/create/security",
        /** saveServiceFee */
        saveServiceFeeUsingPOST: "/v1/bc/company/organization/order/create/servicefee",
        /** list */
        listUsingPOST_25: "/v1/bc/company/organization/order/list",
        /** nativePay */
        nativePayUsingPOST: "/v1/bc/company/organization/order/native/pay",
        /** getPayResult */
        getPayResultUsingGET_1: "/v1/bc/company/organization/order/pay/result"
    },
    "organization-product-controller": {
        /** getFirstList */
        getFirstListUsingGET: "/v1/bc/admin/organization/product/first/list",
        /** admin_list */
        admin_listUsingPOST_1: "/v1/bc/admin/organization/product/list",
        /** saveServiceFee */
        saveServiceFeeUsingPOST_1: "/v1/bc/admin/organization/product/save/servicefee"
    },
    "payment-controller": {
        /** checkPayResult */
        checkPayResultUsingPOST: "/v1/bc/app/payment/check/pay/result",
        /** appWechatPayCpcn */
        appWechatPayCpcnUsingPOST: "/v1/bc/app/payment/cpcn/wechat/app/pay",
        /** jsApiWechatPayCpcn */
        jsApiWechatPayCpcnUsingPOST: "/v1/bc/app/payment/cpcn/wechat/pay",
        /** appWechatNotify */
        appWechatNotifyUsingPOST: "/v1/bc/app/payment/wechat/app/notify",
        /** appWechatPay */
        appWechatPayUsingPOST: "/v1/bc/app/payment/wechat/app/pay",
        /** appWechatRefundNotify */
        appWechatRefundNotifyUsingPOST: "/v1/bc/app/payment/wechat/app/refund/notify",
        /** wechatNativePayNotify */
        wechatNativePayNotifyUsingPOST: "/v1/bc/app/payment/wechat/nativePayNotify",
        /** wechatNotify */
        wechatNotifyUsingPOST: "/v1/bc/app/payment/wechat/notify",
        /** jsApiWechatPay */
        jsApiWechatPayUsingPOST: "/v1/bc/app/payment/wechat/pay",
        /** wechatRefundNotify */
        wechatRefundNotifyUsingPOST: "/v1/bc/app/payment/wechat/refund/notify"
    },
    "popup-config-controller": {
        /** add */
        addUsingPOST_7: "/v1/bc/admin/popup_config/add",
        /** del */
        delUsingPOST_1: "/v1/bc/admin/popup_config/del",
        /** detail */
        detailUsingGET_28: "/v1/bc/admin/popup_config/detail",
        /** doAction */
        doActionUsingPOST_10: "/v1/bc/admin/popup_config/doAction",
        /** edit */
        editUsingPOST_5: "/v1/bc/admin/popup_config/edit",
        /** list */
        listUsingPOST_26: "/v1/bc/admin/popup_config/list",
        /** appList */
        appListUsingGET: "/v1/bc/app/popup_config/list"
    },
    "product-controller": {
        /** add */
        addUsingPOST_8: "/v1/bc/admin/product/add",
        /** audit */
        auditUsingPOST_2: "/v1/bc/admin/product/audit",
        /** conditionCollection */
        conditionCollectionUsingGET_5: "/v1/bc/admin/product/conditionCollection",
        /** copy */
        copyUsingPOST: "/v1/bc/admin/product/copy",
        /** del */
        delUsingPOST_2: "/v1/bc/admin/product/del",
        /** detail */
        detailUsingGET_29: "/v1/bc/admin/product/detail",
        /** doAction */
        doActionUsingPOST_11: "/v1/bc/admin/product/doAction",
        /** 发布 */
        doPublishUsingPOST_3: "/v1/bc/admin/product/doPublish",
        /** edit */
        editUsingPOST_6: "/v1/bc/admin/product/edit",
        /** list */
        listUsingPOST_27: "/v1/bc/admin/product/list",
        /** optionalList */
        optionalListUsingPOST: "/v1/bc/admin/product/optionalList",
        /** 设置推荐 */
        setRecommendUsingPOST: "/v1/bc/admin/product/setRecommend",
        /** 更新库存 */
        updateStockUsingPOST: "/v1/bc/admin/product/updateStock",
        /** combinationProductList */
        combinationProductListUsingPOST: "/v1/bc/app/product/combination_product_list",
        /** detail */
        detailUsingGET_30: "/v1/bc/app/product/detail",
        /** appList */
        appListUsingPOST: "/v1/bc/app/product/list",
        /** recommendCategory */
        recommendCategoryUsingGET: "/v1/bc/app/product/recommend/category",
        /** recommendList */
        recommendListUsingPOST: "/v1/bc/app/product/recommend/list",
        /** recommendProductCategory */
        recommendProductCategoryUsingGET: "/v1/bc/app/product/recommend/product/category",
        /** usercaseDetail */
        usercaseDetailUsingGET: "/v1/bc/app/product/usercase/detail",
        /** usercaseList */
        usercaseListUsingPOST: "/v1/bc/app/product/usercase/list",
        /** 税收分类编码规格列表 */
        getOptionListWithTaxCodeUsingPOST: "/v1/bc/company/product/getOptionListWithTaxCode",
        /** 设置商品税收编码 */
        setProductTaxCodeUsingPOST: "/v1/bc/company/product/setProductTaxCode",
        /** 税收分类编码列表 */
        taxCodeListUsingPOST: "/v1/bc/company/product/taxCodeList"
    },
    "product-option-controller": {
        /** combination_option_detail */
        combination_option_detailUsingGET: "/v1/bc/admin/product_option/combination_option_detail",
        /** combinationOptionList */
        combinationOptionListUsingPOST: "/v1/bc/app/product_option/combination_option_list",
        /** detail */
        detailUsingGET_31: "/v1/bc/app/product_option/option_detail"
    },
    "product-stock-controller": {
        /** detail */
        detailUsingGET_32: "/v1/bc/admin/product_stock/detail",
        /** edit */
        editUsingPOST_7: "/v1/bc/admin/product_stock/edit",
        /** export */
        exportUsingPOST: "/v1/bc/admin/product_stock/export",
        /** list */
        listUsingPOST_28: "/v1/bc/admin/product_stock/list",
        /** statistics */
        statisticsUsingGET: "/v1/bc/admin/product_stock/statistics",
        /** stockLog */
        stockLogUsingGET: "/v1/bc/admin/product_stock/stock_log",
        /** warningValueEdit */
        warningValueEditUsingPOST: "/v1/bc/admin/product_stock/warning_value_edit"
    },
    "refund-controller": {
        /** 状态列表等查询条件 */
        conditionCollectionUsingGET_6: "/v1/bc/admin/refund/condition/collection",
        /** list */
        listUsingPOST_29: "/v1/bc/admin/refund/list"
    },
    "shop-item-stat-controller": {
        /** 找机构店铺数据统计 */
        getShopStatisticsUsingGET: "/v1/bc/merchant/item/stat/getShopStatistics",
        /** overview */
        overviewUsingGET: "/v1/bc/merchant/item/stat/overview"
    },
    "shop-order-stat-controller": {
        /** APP店铺 Service订单总览 */
        appServiceOverviewUsingGET: "/v1/bc/merchant/order/stat/app_overview",
        /** 虚拟卡订单总览 */
        cardOverviewUsingGET: "/v1/bc/merchant/order/stat/cardOverview",
        /** favorite */
        favoriteUsingGET: "/v1/bc/merchant/order/stat/favorite",
        /** 订单总览 */
        overviewUsingGET_1: "/v1/bc/merchant/order/stat/overview",
        /** APP店铺 商品订单总览 */
        appProductOverviewUsingGET: "/v1/product/merchant/order/stat/app_overview",
        /** 订单总览 */
        overviewUsingGET_2: "/v1/product/merchant/order/stat/overview"
    },
    "tag-controller": {
        /** adm_detail */
        adm_detailUsingGET: "/v1/bc/admin/tag/detail",
        /** getItemTags */
        getItemTagsUsingGET_1: "/v1/bc/admin/tag/for_item",
        /** getItemTags */
        getItemTagsUsingGET: "/v1/bc/admin/tag/list",
        /** updateOrCreate */
        updateOrCreateUsingPOST_1: "/v1/bc/admin/tag/save",
        /** update */
        updateUsingPOST_1: "/v1/bc/admin/tag/update"
    },
    "template-attribute-controller": {
        /** 获取模板属性 */
        getByCodeUsingGET: "/v1/bc/merchant/template/attribute"
    },
    "template-controller": {
        /** 模板列表 */
        listUsingGET_8: "/v1/bc/admin/template/list"
    },
    "video-space-controller": {
        /** addFile */
        addFileUsingPOST_2: "/v1/bc/admin/video_space/add_file",
        /** addFolder */
        addFolderUsingPOST_1: "/v1/bc/admin/video_space/add_folder",
        /** addFile */
        addFileUsingPOST_3: "/v1/bc/admin/video_space/del",
        /** getItree */
        getItreeUsingGET_1: "/v1/bc/admin/video_space/list"
    }
}
