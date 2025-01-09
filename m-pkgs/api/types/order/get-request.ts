import type { operations } from './schema'

export interface IOrderGetRequest {
    /** conditionCollection */
    "/v1/bc/admin/activity/conditionCollection": Required<operations["conditionCollectionUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/activity/detail": Required<operations["detailUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/app/activity/detail": Required<operations["detailUsingGET_2"]>['parameters']['query']

    /** list */
    "/v1/bc/app/activity/list": Required<operations["listUsingGET"]>['parameters']['query']

    /** reason_view */
    "/v1/bc/admin/aftersale/reason/view": Required<operations["reason_viewUsingGET"]>['parameters']['query']

    /** 换货物流查询 */
    "/v1/bc/api/aftersale/barterLogistics": Required<operations["barterLogisticsUsingGET"]>['parameters']['query']

    /** reason_list */
    "/v1/bc/api/aftersale/reason_list": Required<operations["reason_listUsingGET"]>['parameters']['query']

    /** record_list */
    "/v1/bc/api/aftersale/record_list": Required<operations["record_listUsingGET"]>['parameters']['query']

    /** 申请售后的数据 */
    "/v1/bc/api/aftersale/spt/addLook": Required<operations["sptAddLookUsingGET"]>['parameters']['query']

    /** 适品屯售后详情 */
    "/v1/bc/api/aftersale/sptApiDetails": Required<operations["sptDetailsUsingGET"]>['parameters']['query']

    /** 测试定时器 */
    "/v1/bc/api/aftersale/test": Required<operations["testUsingGET"]>['parameters']['query']

    /** type_list */
    "/v1/bc/api/aftersale/type_list": Required<operations["type_listUsingGET"]>['parameters']['query']

    /** 适品屯售后地址展示 */
    "/v1/bc/company/aftersale/getAddress": Required<operations["getAddressUsingGET"]>['parameters']['query']

    /** record_list */
    "/v1/bc/company/aftersale/record_list": Required<operations["record_listUsingGET_1"]>['parameters']['query']

    /** 适品屯售后详情 */
    "/v1/bc/company/aftersale/sptDetails": Required<operations["sptDetailsUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/server/aftersale/detail": Required<operations["detailUsingGET_3"]>['parameters']['query']

    /** record_list */
    "/v1/bc/server/aftersale/record_list": Required<operations["record_listUsingGET_2"]>['parameters']['query']

    /** conditionCollection */
    "/v1/bc/admin/agency/conditionCollection": Required<operations["conditionCollectionUsingGET_1"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/agency/detail": Required<operations["detailUsingGET_4"]>['parameters']['query']

    /** detail */
    "/v1/bc/app/agency/detail": Required<operations["detailUsingGET_5"]>['parameters']['query']

    /** countCart */
    "/v1/bc/admin/cart/count": Required<operations["countCartUsingGET"]>['parameters']['query']

    /** 下单所需数据 */
    "/v1/bc/app/cart/purchase/view": Required<operations["getPurchaseInfoUsingGET"]>['parameters']['query']

    /** 购物车列表 */
    "/v1/bc/app/cart/service/list": Required<operations["serviceListUsingGET"]>['parameters']['query']

    /** 购物车列表 */
    "/v1/product/app/cart/list": Required<operations["listUsingGET_1"]>['parameters']['query']

    /** 下单所需数据 */
    "/v1/product/app/cart/purchase/view": Required<operations["getPurchaseInfoUsingGET_1"]>['parameters']['query']

    /** 类目 */
    "/v1/bc/admin/category/all": Required<operations["allUsingGET"]>['parameters']['query']

    /** 获取类目佣金 */
    "/v1/bc/admin/category/commission": Required<operations["commissionUsingGET"]>['parameters']['query']

    /** 类目树 */
    "/v1/bc/admin/category/tree": Required<operations["treeUsingGET"]>['parameters']['query']

    /** 分类列表 */
    "/v1/bc/app/category/getList": Required<operations["getListUsingGET"]>['parameters']['query']

    /** 获取子类目的商品信息 */
    "/v1/bc/app/category/getSonListWithProduct": Required<operations["getSonListWithProductUsingGET"]>['parameters']['query']

    /** getCategoryByIds */
    "/v1/bc/merchant/category/byIds": Required<operations["getCategoryByIdsUsingGET"]>['parameters']['query']

    /** getCategoryTree */
    "/v1/bc/merchant/category/tree": Required<operations["getCategoryTreeUsingGET"]>['parameters']['query']

    /** 类目 */
    "/v1/bc/server/category/list": Required<operations["listUsingGET_2"]>['parameters']['query']

    /** 消息类型查看 */
    "/v1/bc/common/message/list": Required<operations["MessageTypeLookUsingGET"]>['parameters']['query']

    /** 获取二级分类 */
    "/v1/bc/app/common/getCategoryByPid": Required<operations["categoryListByPidUsingGET"]>['parameters']['query']

    /** 获取适品囤分类 */
    "/v1/bc/app/common/getProductCategory": Required<operations["getProductCategoryUsingGET"]>['parameters']['query']

    /** 获取一级分类 */
    "/v1/bc/app/common/getTopCategory": Required<operations["getListUsingGET_1"]>['parameters']['query']

    /** conditionCollection */
    "/v1/bc/admin/coupon/conditionCollection": Required<operations["conditionCollectionUsingGET_2"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/coupon/detail": Required<operations["detailUsingGET_6"]>['parameters']['query']

    /** get_for_item */
    "/v1/bc/app/coupon/for/item": Required<operations["get_for_itemUsingGET"]>['parameters']['query']

    /** categoryList */
    "/v1/bc/admin/estimate_question/categoryList": Required<operations["categoryListUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/estimate_question/detail": Required<operations["detailUsingGET_7"]>['parameters']['query']

    /** list */
    "/v1/bc/app/estimate_question/list": Required<operations["listUsingGET_3"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/estimate_record/detail": Required<operations["detailUsingGET_8"]>['parameters']['query']

    /** list */
    "/v1/bc/admin/estimate_record/list": Required<operations["listUsingGET_4"]>['parameters']['query']

    /** 快递公司查看 */
    "/v1/bc/app/kuaidi/express/company/list": Required<operations["ExpressLookUsingGET"]>['parameters']['query']

    /** 判断是否签收 */
    "/v1/bc/app/kuaidi/express/isSign": Required<operations["expressIsSignUsingGET"]>['parameters']['query']

    /** 判断是否签收 */
    "/v1/bc/app/kuaidi/express/isSign/nu": Required<operations["expressIsSignUsingGET_1"]>['parameters']['query']

    /** 订单 快递查看 */
    "/v1/bc/app/kuaidi/realtime/order/view": Required<operations["batchFetchExpressInfoUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/health/detail": Required<operations["detailUsingGET_9"]>['parameters']['query']

    /** detail */
    "/v1/bc/app/health/detail": Required<operations["detailUsingGET_10"]>['parameters']['query']

    /** 城市 */
    "/v1/bc/admin/hospital/city": Required<operations["cityUsingGET"]>['parameters']['query']

    /** 区 */
    "/v1/bc/admin/hospital/district": Required<operations["districtUsingGET"]>['parameters']['query']

    /** 等级 */
    "/v1/bc/admin/hospital/level": Required<operations["levelUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/image_space/detail": Required<operations["detailUsingGET_11"]>['parameters']['query']

    /** getItree */
    "/v1/bc/admin/image_space/list": Required<operations["getItreeUsingGET"]>['parameters']['query']

    /** 详情 */
    "/v1/bc/admin/audit/detail": Required<operations["detailUsingGET_12"]>['parameters']['query']

    /** 详情 */
    "/v1/bc/merchant/item/detail": Required<operations["detailUsingGET_13"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/item/detail": Required<operations["detailUsingGET_14"]>['parameters']['query']

    /** clear cache */
    "/v1/bc/app/item/clear": Required<operations["clearUsingGET"]>['parameters']['query']

    /** 服务详情 */
    "/v1/bc/app/item/detail": Required<operations["detailUsingGET_15"]>['parameters']['query']

    /** 搜索框推荐 */
    "/v1/bc/app/item/featured": Required<operations["featuredUsingGET"]>['parameters']['query']

    /** 提前下单单位 */
    "/v1/bc/merchant/item/orderUnit": Required<operations["orderUnitUsingGET"]>['parameters']['query']

    /** 快照 */
    "/v1/bc/merchant/item/snapshot": Required<operations["snapshotUsingGET"]>['parameters']['query']

    /** 单位 */
    "/v1/bc/merchant/item/unit": Required<operations["unitUsingGET"]>['parameters']['query']

    /** clockJobRecord */
    "/v1/bc/merchant/clock/clockJobRecord": Required<operations["clockJobRecordUsingGET"]>['parameters']['query']

    /** jobClockWorker */
    "/v1/bc/merchant/clock/clockJobWorker": Required<operations["jobClockWorkerUsingGET"]>['parameters']['query']

    /** 排班统计 */
    "/v1/bc/merchant/clock/detail": Required<operations["detailUsingGET_16"]>['parameters']['query']

    /** planStatistics */
    "/v1/bc/merchant/clock/plan/statistics": Required<operations["planStatisticsUsingGET"]>['parameters']['query']

    /** planStatistics2 */
    "/v1/bc/merchant/clock/statistics": Required<operations["planStatistics2UsingGET"]>['parameters']['query']

    /** planStatistic */
    "/v1/bc/server/clock/statistics": Required<operations["planStatisticUsingGET"]>['parameters']['query']

    /** 工单详情 */
    "/v1/bc/admin/job/detail": Required<operations["detailUsingGET_17"]>['parameters']['query']

    /** 任务详情 */
    "/v1/bc/merchant/job/detail": Required<operations["detailUsingGET_18"]>['parameters']['query']

    /** 工单费用设置 */
    "/v1/bc/merchant/job/fee": Required<operations["feeUsingGET"]>['parameters']['query']

    /** 服务人员工单费用历史 */
    "/v1/bc/merchant/job/history": Required<operations["workerHistorySettleUsingGET"]>['parameters']['query']

    /** 任务详情 */
    "/v1/bc/merchant/job/paidDetail": Required<operations["paidDetailUsingGET"]>['parameters']['query']

    /** 更新服务人员费用设置详情 */
    "/v1/bc/merchant/job/replaceWorkerList": Required<operations["replaceWorkerListUsingGET"]>['parameters']['query']

    /** 个人工单统计 */
    "/v1/bc/merchant/job/total": Required<operations["workerJobSumUsingGET"]>['parameters']['query']

    /** 获取用户最新打卡工单id */
    "/v1/bc/server/job/clock/id": Required<operations["getJobIdUsingGET"]>['parameters']['query']

    /** 获取打卡信息 */
    "/v1/bc/server/job/clock/scope": Required<operations["getScopeUsingGET"]>['parameters']['query']

    /** 工单详情 */
    "/v1/bc/server/job/detail": Required<operations["detailUsingGET_19"]>['parameters']['query']

    /** 统计服务人员月工单数 */
    "/v1/bc/server/job/jobOrderStatistics": Required<operations["jobOrderStatisticsUsingGET"]>['parameters']['query']

    /** 服务人员订单列表 */
    "/v1/bc/server/job/order": Required<operations["workerOrderUsingGET"]>['parameters']['query']

    /** 个人工单统计 */
    "/v1/bc/server/job/total": Required<operations["workerJobSumUsingGET_1"]>['parameters']['query']

    /** 统计当前用户服务中数量 */
    "/v1/bc/server/job/wait": Required<operations["getWaitUsingGET"]>['parameters']['query']

    /** 任务详情 */
    "/v1/bc/server/task/detail": Required<operations["taskDetailUsingGET"]>['parameters']['query']

    /** selected */
    "/v1/bc/server/category/selected": Required<operations["selectedUsingGET"]>['parameters']['query']

    /** getFilter */
    "/v1/bc/server/job/filter": Required<operations["getFilterUsingGET"]>['parameters']['query']

    /** 预付单详情 */
    "/v1/bc/merchant/prepaid/detail": Required<operations["billDetailUsingGET"]>['parameters']['query']

    /** 关联记录 */
    "/v1/bc/merchant/prepaid/history": Required<operations["prePayHistoryUsingGET"]>['parameters']['query']

    /** 工单列表 */
    "/v1/bc/merchant/prepaid/job": Required<operations["jobListUsingGET"]>['parameters']['query']

    /** 服务人员工单详情 */
    "/v1/bc/merchant/prepaid/job/detail": Required<operations["detailUsingGET_20"]>['parameters']['query']

    /** 服务人列表 */
    "/v1/bc/merchant/prepaid/worker": Required<operations["workerUsingGET"]>['parameters']['query']

    /** 任务列表 */
    "/v1/bc/merchant/recall/detail": Required<operations["detailUsingGET_21"]>['parameters']['query']

    /** 工单列表 */
    "/v1/bc/merchant/recall/job": Required<operations["jobListUsingGET_1"]>['parameters']['query']

    /** 工单详情 */
    "/v1/bc/merchant/recall/job/detail": Required<operations["jobDetailUsingGET"]>['parameters']['query']

    /** 任务列表 */
    "/v1/bc/server/recall/detail": Required<operations["detailUsingGET_22"]>['parameters']['query']

    /** N次结算单详情 */
    "/v1/bc/merchant/settle/detail": Required<operations["billDetailUsingGET_1"]>['parameters']['query']

    /** 关联记录 */
    "/v1/bc/merchant/settle/history": Required<operations["prePayHistoryUsingGET_1"]>['parameters']['query']

    /** 工单结算历史记录 */
    "/v1/bc/merchant/settle/historyAll": Required<operations["prePayHistoryAllUsingGET"]>['parameters']['query']

    /** 工单列表 */
    "/v1/bc/merchant/settle/job": Required<operations["jobListUsingGET_2"]>['parameters']['query']

    /** 服务人员工单详情 */
    "/v1/bc/merchant/settle/job/detail": Required<operations["detailUsingGET_23"]>['parameters']['query']

    /** 服务人列表 */
    "/v1/bc/merchant/settle/worker": Required<operations["workerUsingGET_1"]>['parameters']['query']

    /** 状态 */
    "/v1/bc/admin/job/status": Required<operations["listUsingGET_5"]>['parameters']['query']

    /** 编辑保证金配置 */
    "/v1/bc/admin/margin/editConfig": Required<operations["editConfigUsingGET"]>['parameters']['query']

    /** 获取保证金配置列表 */
    "/v1/bc/admin/margin/getConfigList": Required<operations["editConfigUsingGET_1"]>['parameters']['query']

    /** 获取支付结果 */
    "/v1/bc/admin/margin/getPayResult": Required<operations["getPayResultUsingGET"]>['parameters']['query']

    /** 保证金缴纳 */
    "/v1/bc/admin/margin/nativePay": Required<operations["nativePayUsingGET"]>['parameters']['query']

    /** 线下详情 */
    "/v1/bc/admin/marketing/offline/detail": Required<operations["admin_offline_detailUsingGET"]>['parameters']['query']

    /** 线下物料详情 */
    "/v1/bc/admin/marketing/offline/material/detail": Required<operations["admin_material_detailUsingGET"]>['parameters']['query']

    /** 线上详情 */
    "/v1/bc/admin/marketing/online/detail": Required<operations["admin_online_detailUsingGET"]>['parameters']['query']

    /** 状态列表等查询条件 */
    "/v1/bc/admin/order/condition/collection": Required<operations["conditionCollectionUsingGET_3"]>['parameters']['query']

    /** 订单详细 */
    "/v1/bc/admin/order/detail": Required<operations["detailUsingGET_24"]>['parameters']['query']

    /** entityDetail */
    "/v1/bc/admin/order/entity/detail": Required<operations["entityDetailUsingGET"]>['parameters']['query']

    /** 订单类型 */
    "/v1/bc/admin/order/kind": Required<operations["getKindUsingGET"]>['parameters']['query']

    /** subOrderAll */
    "/v1/bc/admin/order/sub_order/list": Required<operations["subOrderAllUsingGET"]>['parameters']['query']

    /** 订单数 */
    "/v1/bc/app/order/count": Required<operations["countOrderUsingGET"]>['parameters']['query']

    /** 订单详细 */
    "/v1/bc/app/order/detail": Required<operations["detailUsingGET_25"]>['parameters']['query']

    /** entityDetail */
    "/v1/bc/app/order/entity/detail": Required<operations["entityDetailUsingGET_1"]>['parameters']['query']

    /** 下单所需数据 */
    "/v1/bc/app/order/purchase/view": Required<operations["getPurchaseInfoUsingGET_2"]>['parameters']['query']

    /** subOrderAll */
    "/v1/bc/app/order/sub_order/list": Required<operations["subOrderAllUsingGET_1"]>['parameters']['query']

    /** 状态列表等查询条件 */
    "/v1/bc/merchant/order/condition/collection": Required<operations["conditionCollectionUsingGET_4"]>['parameters']['query']

    /** 订单详细 */
    "/v1/bc/merchant/order/detail": Required<operations["detailUsingGET_26"]>['parameters']['query']

    /** 求订单总价 */
    "/v1/bc/merchant/order/entity/price/calculation": Required<operations["getEntityPriceUsingGET"]>['parameters']['query']

    /** 被照护人详细 */
    "/v1/bc/merchant/order/patient": Required<operations["patientUsingGET"]>['parameters']['query']

    /** subOrderAll */
    "/v1/bc/merchant/order/sub_order/list": Required<operations["subOrderAllUsingGET_2"]>['parameters']['query']

    /** combinationOptionDetail */
    "/v1/product/admin/order/combination_option_detail": Required<operations["combinationOptionDetailUsingGET"]>['parameters']['query']

    /** 下单所需数据 */
    "/v1/product/app/order/purchase/view": Required<operations["getPurchaseInfoUsingGET_3"]>['parameters']['query']

    /** 订单详细 */
    "/v1/product/merchant/order/detail": Required<operations["detailUsingGET_27"]>['parameters']['query']

    /** getPayResult */
    "/v1/bc/company/organization/order/pay/result": Required<operations["getPayResultUsingGET_1"]>['parameters']['query']

    /** getFirstList */
    "/v1/bc/admin/organization/product/first/list": Required<operations["getFirstListUsingGET"]>['parameters']['query']

    /** conditionCollection */
    "/v1/bc/admin/product/conditionCollection": Required<operations["conditionCollectionUsingGET_5"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/product/detail": Required<operations["detailUsingGET_28"]>['parameters']['query']

    /** detail */
    "/v1/bc/app/product/detail": Required<operations["detailUsingGET_29"]>['parameters']['query']

    /** recommendCategory */
    "/v1/bc/app/product/recommend/category": Required<operations["recommendCategoryUsingGET"]>['parameters']['query']

    /** recommendProductCategory */
    "/v1/bc/app/product/recommend/product/category": Required<operations["recommendProductCategoryUsingGET"]>['parameters']['query']

    /** usercaseDetail */
    "/v1/bc/app/product/usercase/detail": Required<operations["usercaseDetailUsingGET"]>['parameters']['query']

    /** combination_option_detail */
    "/v1/bc/admin/product_option/combination_option_detail": Required<operations["combination_option_detailUsingGET"]>['parameters']['query']

    /** detail */
    "/v1/bc/app/product_option/option_detail": Required<operations["detailUsingGET_30"]>['parameters']['query']

    /** detail */
    "/v1/bc/admin/product_stock/detail": Required<operations["detailUsingGET_31"]>['parameters']['query']

    /** statistics */
    "/v1/bc/admin/product_stock/statistics": Required<operations["statisticsUsingGET"]>['parameters']['query']

    /** stockLog */
    "/v1/bc/admin/product_stock/stock_log": Required<operations["stockLogUsingGET"]>['parameters']['query']

    /** 状态列表等查询条件 */
    "/v1/bc/admin/refund/condition/collection": Required<operations["conditionCollectionUsingGET_6"]>['parameters']['query']

    /** 找机构店铺数据统计 */
    "/v1/bc/merchant/item/stat/getShopStatistics": Required<operations["getShopStatisticsUsingGET"]>['parameters']['query']

    /** overview */
    "/v1/bc/merchant/item/stat/overview": Required<operations["overviewUsingGET"]>['parameters']['query']

    /** 虚拟卡订单总览 */
    "/v1/bc/merchant/order/stat/cardOverview": Required<operations["cardOverviewUsingGET"]>['parameters']['query']

    /** favorite */
    "/v1/bc/merchant/order/stat/favorite": Required<operations["favoriteUsingGET"]>['parameters']['query']

    /** 订单总览 */
    "/v1/bc/merchant/order/stat/overview": Required<operations["overviewUsingGET_1"]>['parameters']['query']

    /** 订单总览 */
    "/v1/product/merchant/order/stat/overview": Required<operations["overviewUsingGET_2"]>['parameters']['query']

    /** adm_detail */
    "/v1/bc/admin/tag/detail": Required<operations["adm_detailUsingGET"]>['parameters']['query']

    /** getItemTags */
    "/v1/bc/admin/tag/for_item": Required<operations["getItemTagsUsingGET_1"]>['parameters']['query']

    /** getItemTags */
    "/v1/bc/admin/tag/list": Required<operations["getItemTagsUsingGET"]>['parameters']['query']

    /** 获取模板属性 */
    "/v1/bc/merchant/template/attribute": Required<operations["getByCodeUsingGET"]>['parameters']['query']

    /** 模板列表 */
    "/v1/bc/admin/template/list": Required<operations["listUsingGET_6"]>['parameters']['query']

    /** getItree */
    "/v1/bc/admin/video_space/list": Required<operations["getItreeUsingGET_1"]>['parameters']['query']

}
