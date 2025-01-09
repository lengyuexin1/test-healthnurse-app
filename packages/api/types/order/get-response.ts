import type { operations } from './schema'

export interface IOrderGetResponse {
    /** conditionCollection */
    "/v1/bc/admin/activity/conditionCollection": Required<operations["conditionCollectionUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/activity/detail": Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/app/activity/detail": Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/app/activity/list": Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** reason_view */
    "/v1/bc/admin/aftersale/reason/view": Required<operations["reason_viewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 换货物流查询 */
    "/v1/bc/api/aftersale/barterLogistics": Required<operations["barterLogisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** reason_list */
    "/v1/bc/api/aftersale/reason_list": Required<operations["reason_listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** record_list */
    "/v1/bc/api/aftersale/record_list": Required<operations["record_listUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 申请售后的数据 */
    "/v1/bc/api/aftersale/spt/addLook": Required<operations["sptAddLookUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯售后详情 */
    "/v1/bc/api/aftersale/sptApiDetails": Required<operations["sptDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试定时器 */
    "/v1/bc/api/aftersale/test": Required<operations["testUsingGET"]>['responses'][200]['content']

    /** type_list */
    "/v1/bc/api/aftersale/type_list": Required<operations["type_listUsingGET"]>['responses'][200]['content']['*/*']

    /** 适品屯售后地址展示 */
    "/v1/bc/company/aftersale/getAddress": Required<operations["getAddressUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** record_list */
    "/v1/bc/company/aftersale/record_list": Required<operations["record_listUsingGET_1"]>['responses'][200]['content']['*/*']

    /** 适品屯售后详情 */
    "/v1/bc/company/aftersale/sptDetails": Required<operations["sptDetailsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 售后详列表 */
    "/v1/bc/company/aftersale/sptDetailsByEntityId": Required<operations["sptDetailsByEntityUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** conditionCollection */
    "/v1/bc/admin/agency/conditionCollection": Required<operations["conditionCollectionUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/agency/detail": Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/app/agency/detail": Required<operations["detailUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** countCart */
    "/v1/bc/admin/cart/count": Required<operations["countCartUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 下单所需数据 */
    "/v1/bc/app/cart/purchase/view": Required<operations["getPurchaseInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 购物车列表 */
    "/v1/bc/app/cart/service/list": Required<operations["serviceListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 购物车列表 */
    "/v1/product/app/cart/list": Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 下单所需数据 */
    "/v1/product/app/cart/purchase/view": Required<operations["getPurchaseInfoUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 类目 */
    "/v1/bc/admin/category/all": Required<operations["allUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取类目佣金 */
    "/v1/bc/admin/category/commission": Required<operations["commissionUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 同步内容类目 */
    "/v1/bc/admin/category/syncContentCategory": Required<operations["syncContentCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目树 */
    "/v1/bc/admin/category/tree": Required<operations["treeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 分类列表 */
    "/v1/bc/app/category/getList": Required<operations["getListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取子类目的商品信息 */
    "/v1/bc/app/category/getSonListWithProduct": Required<operations["getSonListWithProductUsingGET"]>['responses'][200]['content']['*/*']

    /** getCategoryByIds */
    "/v1/bc/merchant/category/byIds": Required<operations["getCategoryByIdsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getCategoryTree */
    "/v1/bc/merchant/category/tree": Required<operations["getCategoryTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目 */
    "/v1/bc/server/category/list": Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/category_show/list": Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 同步内容前台类目 */
    "/v1/bc/admin/category_show/syncContentCategoryShow": Required<operations["syncContentCategoryShowUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 类目列表 */
    "/v1/bc/app/category_show/list": Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

    /** recommendProductList */
    "/v1/bc/app/category_show/recommend/product/list": Required<operations["recommendProductListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 店铺商品列表 */
    "/v1/bc/app/category_show/shop/product/list": Required<operations["shopProductListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 消息类型查看 */
    "/v1/bc/common/message/list": Required<operations["MessageTypeLookUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取二级分类 */
    "/v1/bc/app/common/getCategoryByPid": Required<operations["categoryListByPidUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取适品囤分类 */
    "/v1/bc/app/common/getProductCategory": Required<operations["getProductCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取一级分类 */
    "/v1/bc/app/common/getTopCategory": Required<operations["getListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** conditionCollection */
    "/v1/bc/admin/coupon/conditionCollection": Required<operations["conditionCollectionUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/coupon/detail": Required<operations["detailUsingGET_5"]>['responses'][200]['content']['*/*']['data']

    /** get_for_item */
    "/v1/bc/app/coupon/for/item": Required<operations["get_for_itemUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** categoryList */
    "/v1/bc/admin/estimate_question/categoryList": Required<operations["categoryListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/estimate_question/detail": Required<operations["detailUsingGET_6"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/app/estimate_question/list": Required<operations["listUsingGET_5"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/estimate_record/detail": Required<operations["detailUsingGET_7"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/estimate_record/list": Required<operations["listUsingGET_6"]>['responses'][200]['content']['*/*']['data']

    /** 快递公司查看 */
    "/v1/bc/app/kuaidi/express/company/list": Required<operations["ExpressLookUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 判断是否签收 */
    "/v1/bc/app/kuaidi/express/isSign": Required<operations["expressIsSignUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 判断是否签收 */
    "/v1/bc/app/kuaidi/express/isSign/nu": Required<operations["expressIsSignUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 订单 快递查看 */
    "/v1/bc/app/kuaidi/realtime/order/view": Required<operations["batchFetchExpressInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/health/detail": Required<operations["detailUsingGET_8"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/app/health/detail": Required<operations["detailUsingGET_9"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/home/mould/detail": Required<operations["detailUsingGET_10"]>['responses'][200]['content']['*/*']['data']

    /** 模板数据 */
    "/v1/bc/app/home/mould/data": Required<operations["getMouldUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 城市 */
    "/v1/bc/admin/hospital/city": Required<operations["cityUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 区 */
    "/v1/bc/admin/hospital/district": Required<operations["districtUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 等级 */
    "/v1/bc/admin/hospital/level": Required<operations["levelUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/image_space/detail": Required<operations["detailUsingGET_11"]>['responses'][200]['content']['*/*']['data']

    /** getItree */
    "/v1/bc/admin/image_space/list": Required<operations["getItreeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/audit/detail": Required<operations["detailUsingGET_12"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/merchant/item/detail": Required<operations["detailUsingGET_13"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/item/detail": Required<operations["detailUsingGET_14"]>['responses'][200]['content']['*/*']['data']

    /** clear cache */
    "/v1/bc/app/item/clear": Required<operations["clearUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务详情 */
    "/v1/bc/app/item/detail": Required<operations["detailUsingGET_15"]>['responses'][200]['content']['*/*']['data']

    /** 搜索框推荐 */
    "/v1/bc/app/item/featured": Required<operations["featuredUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 提前下单单位 */
    "/v1/bc/merchant/item/orderUnit": Required<operations["orderUnitUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 快照 */
    "/v1/bc/merchant/item/snapshot": Required<operations["snapshotUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 单位 */
    "/v1/bc/merchant/item/unit": Required<operations["unitUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** clockJobRecord */
    "/v1/bc/merchant/clock/clockJobRecord": Required<operations["clockJobRecordUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** jobClockWorker */
    "/v1/bc/merchant/clock/clockJobWorker": Required<operations["jobClockWorkerUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 排班统计 */
    "/v1/bc/merchant/clock/detail": Required<operations["detailUsingGET_16"]>['responses'][200]['content']['*/*']['data']

    /** planStatistics */
    "/v1/bc/merchant/clock/plan/statistics": Required<operations["planStatisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** planStatistics2 */
    "/v1/bc/merchant/clock/statistics": Required<operations["planStatistics2UsingGET"]>['responses'][200]['content']['*/*']['data']

    /** planStatistic */
    "/v1/bc/server/clock/statistics": Required<operations["planStatisticUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工单详情 */
    "/v1/bc/admin/job/detail": Required<operations["detailUsingGET_17"]>['responses'][200]['content']['*/*']['data']

    /** 任务详情 */
    "/v1/bc/merchant/job/detail": Required<operations["detailUsingGET_18"]>['responses'][200]['content']['*/*']['data']

    /** 工单费用设置 */
    "/v1/bc/merchant/job/fee": Required<operations["feeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员工单费用历史 */
    "/v1/bc/merchant/job/history": Required<operations["workerHistorySettleUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 任务详情 */
    "/v1/bc/merchant/job/paidDetail": Required<operations["paidDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 更新服务人员费用设置详情 */
    "/v1/bc/merchant/job/replaceWorkerList": Required<operations["replaceWorkerListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 个人工单统计 */
    "/v1/bc/merchant/job/total": Required<operations["workerJobSumUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取用户最新打卡工单id */
    "/v1/bc/server/job/clock/id": Required<operations["getJobIdUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取打卡信息 */
    "/v1/bc/server/job/clock/scope": Required<operations["getScopeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工单详情 */
    "/v1/bc/server/job/detail": Required<operations["detailUsingGET_19"]>['responses'][200]['content']['*/*']['data']

    /** 统计服务人员月工单数 */
    "/v1/bc/server/job/jobOrderStatistics": Required<operations["jobOrderStatisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员订单列表 */
    "/v1/bc/server/job/order": Required<operations["workerOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 个人工单统计 */
    "/v1/bc/server/job/total": Required<operations["workerJobSumUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 统计当前用户服务中数量 */
    "/v1/bc/server/job/wait": Required<operations["getWaitUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 任务详情 */
    "/v1/bc/server/task/detail": Required<operations["taskDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** selected */
    "/v1/bc/server/category/selected": Required<operations["selectedUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getFilter */
    "/v1/bc/server/job/filter": Required<operations["getFilterUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 预付单详情 */
    "/v1/bc/merchant/prepaid/detail": Required<operations["billDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 关联记录 */
    "/v1/bc/merchant/prepaid/history": Required<operations["prePayHistoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工单列表 */
    "/v1/bc/merchant/prepaid/job": Required<operations["jobListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员工单详情 */
    "/v1/bc/merchant/prepaid/job/detail": Required<operations["detailUsingGET_20"]>['responses'][200]['content']['*/*']['data']

    /** 服务人列表 */
    "/v1/bc/merchant/prepaid/worker": Required<operations["workerUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/merchant/recall/detail": Required<operations["detailUsingGET_21"]>['responses'][200]['content']['*/*']['data']

    /** 工单列表 */
    "/v1/bc/merchant/recall/job": Required<operations["jobListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 工单详情 */
    "/v1/bc/merchant/recall/job/detail": Required<operations["jobDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/server/recall/detail": Required<operations["detailUsingGET_22"]>['responses'][200]['content']['*/*']['data']

    /** N次结算单详情 */
    "/v1/bc/merchant/settle/detail": Required<operations["billDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 关联记录 */
    "/v1/bc/merchant/settle/history": Required<operations["prePayHistoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 工单结算历史记录 */
    "/v1/bc/merchant/settle/historyAll": Required<operations["prePayHistoryAllUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 工单列表 */
    "/v1/bc/merchant/settle/job": Required<operations["jobListUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 服务人员工单详情 */
    "/v1/bc/merchant/settle/job/detail": Required<operations["detailUsingGET_23"]>['responses'][200]['content']['*/*']['data']

    /** 服务人列表 */
    "/v1/bc/merchant/settle/worker": Required<operations["workerUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 状态 */
    "/v1/bc/admin/job/status": Required<operations["listUsingGET_7"]>['responses'][200]['content']['*/*']['data']

    /** 编辑保证金配置 */
    "/v1/bc/admin/margin/editConfig": Required<operations["editConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取保证金配置列表 */
    "/v1/bc/admin/margin/getConfigList": Required<operations["editConfigUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取支付结果 */
    "/v1/bc/admin/margin/getPayResult": Required<operations["getPayResultUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 保证金缴纳 */
    "/v1/bc/admin/margin/nativePay": Required<operations["nativePayUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 线下详情 */
    "/v1/bc/admin/marketing/offline/detail": Required<operations["admin_offline_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 线下物料详情 */
    "/v1/bc/admin/marketing/offline/material/detail": Required<operations["admin_material_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 线上详情 */
    "/v1/bc/admin/marketing/online/detail": Required<operations["admin_online_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 状态列表等查询条件 */
    "/v1/bc/admin/order/condition/collection": Required<operations["conditionCollectionUsingGET_3"]>['responses'][200]['content']['*/*']

    /** 订单详细 */
    "/v1/bc/admin/order/detail": Required<operations["detailUsingGET_24"]>['responses'][200]['content']['*/*']['data']

    /** entityDetail */
    "/v1/bc/admin/order/entity/detail": Required<operations["entityDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单类型 */
    "/v1/bc/admin/order/kind": Required<operations["getKindUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** subOrderAll */
    "/v1/bc/admin/order/sub_order/list": Required<operations["subOrderAllUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单数 */
    "/v1/bc/app/order/count": Required<operations["countOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单详细 */
    "/v1/bc/app/order/detail": Required<operations["detailUsingGET_25"]>['responses'][200]['content']['*/*']['data']

    /** entityDetail */
    "/v1/bc/app/order/entity/detail": Required<operations["entityDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 下单所需数据 */
    "/v1/bc/app/order/purchase/view": Required<operations["getPurchaseInfoUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** subOrderAll */
    "/v1/bc/app/order/sub_order/list": Required<operations["subOrderAllUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 状态列表等查询条件 */
    "/v1/bc/merchant/order/condition/collection": Required<operations["conditionCollectionUsingGET_4"]>['responses'][200]['content']['*/*']

    /** 订单详细 */
    "/v1/bc/merchant/order/detail": Required<operations["detailUsingGET_26"]>['responses'][200]['content']['*/*']['data']

    /** 求订单总价 */
    "/v1/bc/merchant/order/entity/price/calculation": Required<operations["getEntityPriceUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 被照护人详细 */
    "/v1/bc/merchant/order/patient": Required<operations["patientUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** subOrderAll */
    "/v1/bc/merchant/order/sub_order/list": Required<operations["subOrderAllUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** combinationOptionDetail */
    "/v1/product/admin/order/combination_option_detail": Required<operations["combinationOptionDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 下单所需数据 */
    "/v1/product/app/order/purchase/view": Required<operations["getPurchaseInfoUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 订单详细 */
    "/v1/product/merchant/order/detail": Required<operations["detailUsingGET_27"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/admin/organization/order/details": Required<operations["detailsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getPayResult */
    "/v1/bc/company/organization/order/pay/result": Required<operations["getPayResultUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** getFirstList */
    "/v1/bc/admin/organization/product/first/list": Required<operations["getFirstListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/popup_config/detail": Required<operations["detailUsingGET_28"]>['responses'][200]['content']['*/*']['data']

    /** appList */
    "/v1/bc/app/popup_config/list": Required<operations["appListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** conditionCollection */
    "/v1/bc/admin/product/conditionCollection": Required<operations["conditionCollectionUsingGET_5"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/product/detail": Required<operations["detailUsingGET_29"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/app/product/detail": Required<operations["detailUsingGET_30"]>['responses'][200]['content']['*/*']['data']

    /** recommendCategory */
    "/v1/bc/app/product/recommend/category": Required<operations["recommendCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** recommendProductCategory */
    "/v1/bc/app/product/recommend/product/category": Required<operations["recommendProductCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** usercaseDetail */
    "/v1/bc/app/product/usercase/detail": Required<operations["usercaseDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** combination_option_detail */
    "/v1/bc/admin/product_option/combination_option_detail": Required<operations["combination_option_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/app/product_option/option_detail": Required<operations["detailUsingGET_31"]>['responses'][200]['content']['*/*']['data']

    /** detail */
    "/v1/bc/admin/product_stock/detail": Required<operations["detailUsingGET_32"]>['responses'][200]['content']['*/*']['data']

    /** statistics */
    "/v1/bc/admin/product_stock/statistics": Required<operations["statisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** stockLog */
    "/v1/bc/admin/product_stock/stock_log": Required<operations["stockLogUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 状态列表等查询条件 */
    "/v1/bc/admin/refund/condition/collection": Required<operations["conditionCollectionUsingGET_6"]>['responses'][200]['content']['*/*']

    /** 找机构店铺数据统计 */
    "/v1/bc/merchant/item/stat/getShopStatistics": Required<operations["getShopStatisticsUsingGET"]>['responses'][200]['content']['*/*']

    /** overview */
    "/v1/bc/merchant/item/stat/overview": Required<operations["overviewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** APP店铺 Service订单总览 */
    "/v1/bc/merchant/order/stat/app_overview": Required<operations["appServiceOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 虚拟卡订单总览 */
    "/v1/bc/merchant/order/stat/cardOverview": Required<operations["cardOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** favorite */
    "/v1/bc/merchant/order/stat/favorite": Required<operations["favoriteUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单总览 */
    "/v1/bc/merchant/order/stat/overview": Required<operations["overviewUsingGET_1"]>['responses'][200]['content']['*/*']

    /** APP店铺 商品订单总览 */
    "/v1/product/merchant/order/stat/app_overview": Required<operations["appProductOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单总览 */
    "/v1/product/merchant/order/stat/overview": Required<operations["overviewUsingGET_2"]>['responses'][200]['content']['*/*']

    /** adm_detail */
    "/v1/bc/admin/tag/detail": Required<operations["adm_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** getItemTags */
    "/v1/bc/admin/tag/for_item": Required<operations["getItemTagsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** getItemTags */
    "/v1/bc/admin/tag/list": Required<operations["getItemTagsUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取模板属性 */
    "/v1/bc/merchant/template/attribute": Required<operations["getByCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 模板列表 */
    "/v1/bc/admin/template/list": Required<operations["listUsingGET_8"]>['responses'][200]['content']['*/*']['data']

    /** getItree */
    "/v1/bc/admin/video_space/list": Required<operations["getItreeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

}
