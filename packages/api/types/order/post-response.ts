import type { operations } from './schema'

export interface IOrderPostResponse {
    /** add */
    "/v1/bc/admin/activity/add": Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/activity/doAction": Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/activity/edit": Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/activity/list": Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 合规部仲裁列表 */
    "/v1/bc/admin/aftersale/arbitrate/HgList": Required<operations["arbitrateHgListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 仲裁列表 */
    "/v1/bc/admin/aftersale/arbitrate/List": Required<operations["arbitrateListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 合规部消息提醒 */
    "/v1/bc/admin/aftersale/message/warn": Required<operations["messageWarnUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 仲裁 */
    "/v1/bc/admin/aftersale/platform/arbitrate": Required<operations["adm_arbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** reason_edit */
    "/v1/bc/admin/aftersale/reason/edit": Required<operations["reason_editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** reason_list */
    "/v1/bc/admin/aftersale/reason_list": Required<operations["reason_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 适品屯售后列表 */
    "/v1/bc/admin/aftersale/sptList": Required<operations["sptListUsingPOST"]>['responses'][200]['content']['*/*']

    /** type_edit */
    "/v1/bc/admin/aftersale/type/edit": Required<operations["type_editUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** type_list */
    "/v1/bc/admin/aftersale/type/list": Required<operations["type_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 申请仲裁 */
    "/v1/bc/api/aftersale/ApplyFor/arbitration": Required<operations["arbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯确认收货 */
    "/v1/bc/api/aftersale/afterConsent": Required<operations["afterConsentUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申请退款 */
    "/v1/bc/api/aftersale/applyRefund": Required<operations["applyRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消订单 */
    "/v1/bc/api/aftersale/cancelOrder": Required<operations["cancelOrderUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** close */
    "/v1/bc/api/aftersale/close": Required<operations["closeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申请售后（适品囤） */
    "/v1/bc/api/aftersale/spt/add": Required<operations["sptAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯去退货 */
    "/v1/bc/api/aftersale/spt/addExpress": Required<operations["addExpressUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申请售后的数据 */
    "/v1/bc/api/aftersale/spt/addLook1": Required<operations["sptAddLook1UsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 再次申请售后 */
    "/v1/bc/api/aftersale/spt/againAdd": Required<operations["sptAgainAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯售后列表 */
    "/v1/bc/api/aftersale/sptApiList": Required<operations["sptApiListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 申请仲裁 */
    "/v1/bc/api/aftersale/sptApplyFor/arbitration": Required<operations["sptArbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯确认收货 */
    "/v1/bc/company/aftersale/afterConsent": Required<operations["afterConsentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯批量同意退款和退货 */
    "/v1/bc/company/aftersale/bulk/refund": Required<operations["sptBulkRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** no_pass */
    "/v1/bc/company/aftersale/nopass": Required<operations["no_passUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** pass */
    "/v1/bc/company/aftersale/pass": Required<operations["passUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 拒绝收货 */
    "/v1/bc/company/aftersale/refuseReceiveGoods": Required<operations["refuseReceiveGoodsUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯售后地址设置 */
    "/v1/bc/company/aftersale/setAddress": Required<operations["setAddressUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯仲裁举证 */
    "/v1/bc/company/aftersale/sptEvidence": Required<operations["sptPutEvidenceUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯售后列表 */
    "/v1/bc/company/aftersale/sptList": Required<operations["sptListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 适品屯商户是否同意售后 */
    "/v1/bc/company/aftersale/sptMerchantAudit": Required<operations["sptMerchantAuditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯直接退款 */
    "/v1/bc/company/aftersale/sptPass": Required<operations["sptPassUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 适品屯去发货 */
    "/v1/bc/company/aftersale/toDeliverGoods": Required<operations["toDeliverGoodsUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** add */
    "/v1/bc/admin/agency/add": Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** audit */
    "/v1/bc/admin/agency/audit": Required<operations["auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/agency/doAction": Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** doPublish */
    "/v1/bc/admin/agency/doPublish": Required<operations["doPublishUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/agency/edit": Required<operations["editUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/agency/list": Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/app/agency/list": Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/admin/cart/list": Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 创建购物车 */
    "/v1/bc/app/cart/create": Required<operations["createUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除购物车 */
    "/v1/bc/app/cart/delete": Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 修改购物车数 */
    "/v1/bc/app/cart/quantity/update": Required<operations["updateQuantityUsingPOST"]>['responses'][200]['content']['*/*']

    /** 创建购物车 */
    "/v1/product/app/cart/create": Required<operations["createUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 修改购物车数 */
    "/v1/product/app/cart/quantity/update": Required<operations["updateQuantityUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 添加 */
    "/v1/bc/admin/category/add": Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 获取类目列表 */
    "/v1/bc/admin/category/list/activity": Required<operations["listForActivityUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 编辑 */
    "/v1/bc/admin/category/modify": Required<operations["modifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 类目删除 */
    "/v1/bc/admin/category/remove": Required<operations["batchRemoveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 类目排序 */
    "/v1/bc/admin/category/sort": Required<operations["batchSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 类目上下架 */
    "/v1/bc/admin/category/status": Required<operations["setStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 删除 */
    "/v1/bc/admin/category_show/delete": Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 添加 */
    "/v1/bc/admin/category_show/save": Required<operations["saveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 排序 */
    "/v1/bc/admin/category_show/sort": Required<operations["sortUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 服务列表 */
    "/v1/bc/app/category_show/item/list": Required<operations["itemListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 商品列表 */
    "/v1/bc/app/category_show/product/list": Required<operations["productListUsingPOST"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/company/comment/list": Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** 获取子类目的商品信息 */
    "/v1/bc/app/common/getSonListWithProduct": Required<operations["getSonListWithProductUsingPOST"]>['responses'][200]['content']['*/*']

    /** 服务列表 */
    "/v1/bc/app/common/itemList": Required<operations["itemListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** addTotal */
    "/v1/bc/admin/coupon/add/total": Required<operations["addTotalUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/coupon/delete": Required<operations["doActionUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/coupon/doAction": Required<operations["doActionUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/coupon/list": Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

    /** updateOrCreate */
    "/v1/bc/admin/coupon/save": Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** grantedUserList */
    "/v1/bc/admin/coupon/user/list": Required<operations["grantedUserListUsingPOST"]>['responses'][200]['content']['*/*']

    /** checkCoupon */
    "/v1/bc/app/coupon/check": Required<operations["checkCouponUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** getCoupon */
    "/v1/bc/app/coupon/collect": Required<operations["getCouponUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** granted_list */
    "/v1/bc/app/coupon/granted/list": Required<operations["granted_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/app/coupon/list": Required<operations["listUsingPOST_6"]>['responses'][200]['content']['*/*']

    /** getCouponGranted */
    "/v1/bc/app/coupon/use/list": Required<operations["getCouponGrantedUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** getPlatformGranted */
    "/v1/bc/app/coupon/use/platform": Required<operations["getPlatformGrantedUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** add */
    "/v1/bc/admin/estimate_grade/add": Required<operations["addUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/estimate_grade/edit": Required<operations["editUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/estimate_grade/list": Required<operations["listUsingPOST_7"]>['responses'][200]['content']['*/*']

    /** add */
    "/v1/bc/admin/estimate_question/add": Required<operations["addUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/estimate_question/del": Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/estimate_question/edit": Required<operations["editUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/estimate_question/list": Required<operations["listUsingPOST_8"]>['responses'][200]['content']['*/*']

    /** sort */
    "/v1/bc/admin/estimate_question/sort": Required<operations["sortUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** estimate */
    "/v1/bc/app/estimate_question/estimate": Required<operations["estimateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 快递100回调 */
    "/v1/bc/app/kuaidi/express/callback": Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']

    /** 快递100订阅 */
    "/v1/bc/app/kuaidi/express/pushExpress": Required<operations["pushExpressUsingPOST"]>['responses'][200]['content']['*/*']

    /** 快递实时查看 */
    "/v1/bc/app/kuaidi/express/realtimeLookExpress": Required<operations["RealtimeLookExpressUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 物流轨迹图 */
    "/v1/bc/app/kuaidi/express/trajectory": Required<operations["expressTrajectoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** add */
    "/v1/bc/admin/health/add": Required<operations["addUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** audit */
    "/v1/bc/admin/health/audit": Required<operations["auditUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/health/doAction": Required<operations["doActionUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** doPublish */
    "/v1/bc/admin/health/doPublish": Required<operations["doPublishUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/health/edit": Required<operations["editUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/health/list": Required<operations["listUsingPOST_9"]>['responses'][200]['content']['*/*']

    /** list */
    "/v1/bc/app/health/list": Required<operations["listUsingPOST_10"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/admin/home/mould/delete": Required<operations["deleteUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/home/mould/list": Required<operations["listUsingPOST_11"]>['responses'][200]['content']['*/*']

    /** 发布 */
    "/v1/bc/admin/home/mould/publish": Required<operations["sortUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 添加 */
    "/v1/bc/admin/home/mould/save": Required<operations["saveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 创建 */
    "/v1/bc/admin/hospital/create": Required<operations["createUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/hospital/list": Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

    /** 修改 */
    "/v1/bc/admin/hospital/modify": Required<operations["modifyUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 删除 */
    "/v1/bc/admin/hospital/remove": Required<operations["removeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 详情 */
    "/v1/bc/app/hospital/detail": Required<operations["detailUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/app/hospital/list": Required<operations["listByPageUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 列表 */
    "/v1/bc/merchant/hospital/list": Required<operations["listByPageUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** addFile */
    "/v1/bc/admin/image_space/add_file": Required<operations["addFileUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** addFolder */
    "/v1/bc/admin/image_space/add_folder": Required<operations["addFolderUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** addFile */
    "/v1/bc/admin/image_space/del": Required<operations["addFileUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 通过/驳回 */
    "/v1/bc/admin/audit/doAction": Required<operations["doActionUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/audit/list": Required<operations["listByPageUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 列表 */
    "/v1/bc/merchant/draft/list": Required<operations["listByPageUsingPOST_4"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/merchant/draft/remove": Required<operations["batchRemoveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 上架/下架 */
    "/v1/bc/admin/item/doAction": Required<operations["doActionUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/admin/item/list": Required<operations["listByPageUsingPOST_5"]>['responses'][200]['content']['*/*']

    /** 服务列表 */
    "/v1/bc/app/item/all": Required<operations["getAllListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 获取服务供es 手动自动导入 */
    "/v1/bc/app/item/es/list": Required<operations["getItemListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 服务列表 */
    "/v1/bc/app/item/list": Required<operations["getListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 上架/下架 */
    "/v1/bc/merchant/item/doAction": Required<operations["doActionUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

    /** 上架/下架 */
    "/v1/bc/merchant/item/doPublish": Required<operations["doPublishUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 添加服务规格 */
    "/v1/bc/merchant/item/draft": Required<operations["draftUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/merchant/item/list": Required<operations["listByPageUsingPOST_6"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/merchant/item/remove": Required<operations["batchRemoveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 编辑服务规格 */
    "/v1/bc/merchant/item/submit": Required<operations["submitUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 排班统计 */
    "/v1/bc/merchant/clock/list": Required<operations["scheduleStatisticUsingPOST"]>['responses'][200]['content']['*/*']

    /** 结束工单 */
    "/v1/bc/admin/job/close": Required<operations["closeJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 工单列表 */
    "/v1/bc/admin/job/list": Required<operations["listUsingPOST_12"]>['responses'][200]['content']['*/*']

    /** 用户工单列表 */
    "/v1/bc/admin/job/person": Required<operations["personJobListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 授理工单 */
    "/v1/bc/merchant/job/accepted": Required<operations["acceptedJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 指派 */
    "/v1/bc/merchant/job/assign": Required<operations["assignUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 取消工单 */
    "/v1/bc/merchant/job/cancel": Required<operations["cancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 通知用户工单快结束 */
    "/v1/bc/merchant/job/jobEndAlertUser": Required<operations["jobEndAlertUserUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/merchant/job/list": Required<operations["listUsingPOST_13"]>['responses'][200]['content']['*/*']

    /** 休假设置 */
    "/v1/bc/merchant/job/offDate": Required<operations["offDateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 待结算列表 */
    "/v1/bc/merchant/job/paid": Required<operations["paidListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 用户工单列表 */
    "/v1/bc/merchant/job/person": Required<operations["personJobListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 工单服务中更换服务人员 */
    "/v1/bc/merchant/job/replaceWorker": Required<operations["replaceWorkerUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 保存费用 */
    "/v1/bc/merchant/job/settle": Required<operations["settleUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 保存备注 */
    "/v1/bc/merchant/job/update": Required<operations["updateJobUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 设置倒计时备注 */
    "/v1/bc/merchant/job/updateGrabTime": Required<operations["updateJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 保存打卡信息 */
    "/v1/bc/server/job/clock/save": Required<operations["clockSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 提交代跑物流信息 */
    "/v1/bc/server/job/delivery": Required<operations["workerDeliveryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 提交工单完成 */
    "/v1/bc/server/job/finish": Required<operations["doFinishUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 任务大厅 */
    "/v1/bc/server/job/hall": Required<operations["orderHallUsingPOST"]>['responses'][200]['content']['*/*']

    /** 用户工单列表 */
    "/v1/bc/server/job/person": Required<operations["personJobListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 提交代跑取单实物信息 */
    "/v1/bc/server/job/physical": Required<operations["workerPhysicalUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 抢单 */
    "/v1/bc/server/job/rush": Required<operations["rushOrderUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 扫码更新工单状态 */
    "/v1/bc/server/job/scanCode": Required<operations["scanCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/server/job/task": Required<operations["listUsingPOST_14"]>['responses'][200]['content']['*/*']

    /** save */
    "/v1/bc/server/category/save": Required<operations["saveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** setFilter */
    "/v1/bc/server/job/filter": Required<operations["setFilterUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 创建 */
    "/v1/bc/merchant/prepaid/create": Required<operations["createUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 审核 */
    "/v1/bc/merchant/prepaid/doAction": Required<operations["doActionUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/merchant/prepaid/list": Required<operations["listUsingPOST_15"]>['responses'][200]['content']['*/*']

    /** 修改/添加回访 */
    "/v1/bc/merchant/recall/add": Required<operations["addUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/merchant/recall/list": Required<operations["listUsingPOST_16"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/merchant/recall/remove": Required<operations["removeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 任务列表 */
    "/v1/bc/server/recall/list": Required<operations["listUsingPOST_17"]>['responses'][200]['content']['*/*']

    /** 修改/添加回访 */
    "/v1/bc/server/recall/modify": Required<operations["modifyUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 创建 */
    "/v1/bc/merchant/settle/create": Required<operations["createUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

    /** 审核 */
    "/v1/bc/merchant/settle/doAction": Required<operations["doActionUsingPOST_9"]>['responses'][200]['content']['*/*']['data']

    /** 列表 */
    "/v1/bc/merchant/settle/list": Required<operations["listUsingPOST_18"]>['responses'][200]['content']['*/*']

    /** 删除 */
    "/v1/bc/admin/marketing/offline/delete": Required<operations["deleteUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 线下列表 */
    "/v1/bc/admin/marketing/offline/list": Required<operations["admin_offline_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 删除物料 */
    "/v1/bc/admin/marketing/offline/material/delete": Required<operations["deleteMaterialUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 线下物料列表 */
    "/v1/bc/admin/marketing/offline/material/list": Required<operations["admin_material_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 新增修改物料 */
    "/v1/bc/admin/marketing/offline/material/save": Required<operations["doSaveMaterialUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 新增修改 */
    "/v1/bc/admin/marketing/offline/save": Required<operations["doSaveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 新增修改投放场所 */
    "/v1/bc/admin/marketing/offline/save/data": Required<operations["doSaveDataUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 线上推广删除 */
    "/v1/bc/admin/marketing/online/delete": Required<operations["deleteOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 线上列表 */
    "/v1/bc/admin/marketing/online/list": Required<operations["admin_online_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 线上新增修改 */
    "/v1/bc/admin/marketing/online/save": Required<operations["doSaveOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 线上新增修改推广渠道 */
    "/v1/bc/admin/marketing/online/save/data": Required<operations["doSaveDataOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 同意退款 */
    "/v1/bc/merchant/cancel/audit/order/agree/refund": Required<operations["agreeRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 不同意退款 */
    "/v1/bc/merchant/cancel/audit/order/disagree/refund": Required<operations["disagreeRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 审核列表 */
    "/v1/bc/merchant/cancel/audit/order/list": Required<operations["listUsingPOST_19"]>['responses'][200]['content']['*/*']

    /** 核销 */
    "/v1/bc/admin/order/cardConsume": Required<operations["cardConsumeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 券号列表 */
    "/v1/bc/admin/order/cardConsumeList": Required<operations["cardConsumeListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单列表 */
    "/v1/bc/admin/order/list": Required<operations["listUsingPOST_20"]>['responses'][200]['content']['*/*']

    /** operationLogList */
    "/v1/bc/admin/order/operation/log/list": Required<operations["operationLogListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 帮客户续单 */
    "/v1/bc/admin/order/renew": Required<operations["renewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 未评价列表 */
    "/v1/bc/admin/order/wait_comment/list": Required<operations["waitCommentListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 可售后列表 */
    "/v1/bc/app/order/after/saleable/list": Required<operations["afterSaleableListUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** cancel */
    "/v1/bc/app/order/cancel": Required<operations["cancelUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 创建虚拟卡订单 */
    "/v1/bc/app/order/cardCreate": Required<operations["createUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** 虚拟卡订单退款 */
    "/v1/bc/app/order/cardRefund": Required<operations["cardRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 创建课程订单 */
    "/v1/bc/app/order/courseCreate": Required<operations["courseCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 创建订单 */
    "/v1/bc/app/order/create": Required<operations["createUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

    /** helpCreate */
    "/v1/bc/app/order/help/create": Required<operations["helpCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 订单列表 */
    "/v1/bc/app/order/list": Required<operations["listUsingPOST_21"]>['responses'][200]['content']['*/*']['data']

    /** 修改订单 */
    "/v1/bc/app/order/modify": Required<operations["modifyUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 求订单总价 */
    "/v1/bc/app/order/price/calculation": Required<operations["priceCalculationUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 求虚拟卡订单总价 */
    "/v1/bc/app/order/price/cardCalculation": Required<operations["priceCalculationUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 求课程订单总价 */
    "/v1/bc/app/order/price/courseCalculation": Required<operations["priceCourseCalculationUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发送短信 */
    "/v1/bc/app/order/send_sms": Required<operations["sendSmsUsingPOST"]>['responses'][200]['content']['*/*']

    /** 立刻使用 (多次单) */
    "/v1/bc/app/order/use_now": Required<operations["useNowUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** cancel */
    "/v1/bc/merchant/order/cancel": Required<operations["cancelUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** 订单列表 */
    "/v1/bc/merchant/order/list": Required<operations["listUsingPOST_22"]>['responses'][200]['content']['*/*']

    /** 订单修改最终实付金额 */
    "/v1/bc/merchant/order/modify/entity/order": Required<operations["modifyEntityOrderUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单更改 */
    "/v1/bc/merchant/order/update": Required<operations["updateUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单更改最终实付金额 */
    "/v1/bc/merchant/order/update_paid_amount": Required<operations["updatePaidAmountUsingPOST"]>['responses'][200]['content']['*/*']

    /** 未评价列表 */
    "/v1/bc/merchant/order/wait_comment/list": Required<operations["waitCommentListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 订单列表 */
    "/v1/product/admin/order/list": Required<operations["listUsingPOST_23"]>['responses'][200]['content']['*/*']

    /** 确认收货 */
    "/v1/product/app/order/confirm/receive": Required<operations["confirmReceiveUsingPOST"]>['responses'][200]['content']['*/*']

    /** 创建订单 */
    "/v1/product/app/order/create": Required<operations["createUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

    /** 延长收货 */
    "/v1/product/app/order/delay/receive": Required<operations["doDelayReceiveUsingPOST"]>['responses'][200]['content']['*/*']

    /** 删除订单 */
    "/v1/product/app/order/delete": Required<operations["deleteUsingPOST_4"]>['responses'][200]['content']['*/*']

    /** 修改订单 */
    "/v1/product/app/order/modify": Required<operations["modifyUsingPOST_4"]>['responses'][200]['content']['*/*']

    /** 求订单总价 */
    "/v1/product/app/order/price/calculation": Required<operations["priceCalculationUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 延长收货 */
    "/v1/product/merchant/order/delay/receive": Required<operations["doDelayReceiveUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 发货 or 补发 */
    "/v1/product/merchant/order/delivery": Required<operations["deliveryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 修改单号 */
    "/v1/product/merchant/order/express/update": Required<operations["updateExpressUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单列表 */
    "/v1/product/merchant/order/list": Required<operations["listUsingPOST_24"]>['responses'][200]['content']['*/*']

    /** 订单总览_访问数 */
    "/v1/bc/admin/order/stat/accessor/cnt": Required<operations["getAccessorCntUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单总览 */
    "/v1/bc/admin/order/stat/overview": Required<operations["overviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 订单总览_售额 */
    "/v1/bc/admin/order/stat/sale/amount": Required<operations["getSaleAmountUsingPOST"]>['responses'][200]['content']['*/*']

    /** 数据统计 */
    "/v1/bc/admin/organization/order/amount": Required<operations["amountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** createAd */
    "/v1/bc/admin/organization/order/create/ad": Required<operations["createAdUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 下架 */
    "/v1/bc/admin/organization/order/dropped": Required<operations["droppedUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** admin_list */
    "/v1/bc/admin/organization/order/list": Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** ads_list */
    "/v1/bc/company/organization/order/ads": Required<operations["ads_listUsingPOST"]>['responses'][200]['content']['*/*']

    /** createSecurity */
    "/v1/bc/company/organization/order/create/security": Required<operations["createSecurityUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** saveServiceFee */
    "/v1/bc/company/organization/order/create/servicefee": Required<operations["saveServiceFeeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/company/organization/order/list": Required<operations["listUsingPOST_25"]>['responses'][200]['content']['*/*']

    /** nativePay */
    "/v1/bc/company/organization/order/native/pay": Required<operations["nativePayUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** admin_list */
    "/v1/bc/admin/organization/product/list": Required<operations["admin_listUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** saveServiceFee */
    "/v1/bc/admin/organization/product/save/servicefee": Required<operations["saveServiceFeeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** checkPayResult */
    "/v1/bc/app/payment/check/pay/result": Required<operations["checkPayResultUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** appWechatPayCpcn */
    "/v1/bc/app/payment/cpcn/wechat/app/pay": Required<operations["appWechatPayCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** jsApiWechatPayCpcn */
    "/v1/bc/app/payment/cpcn/wechat/pay": Required<operations["jsApiWechatPayCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** appWechatNotify */
    "/v1/bc/app/payment/wechat/app/notify": Required<operations["appWechatNotifyUsingPOST"]>['responses'][200]['content']['*/*']

    /** appWechatPay */
    "/v1/bc/app/payment/wechat/app/pay": Required<operations["appWechatPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** appWechatRefundNotify */
    "/v1/bc/app/payment/wechat/app/refund/notify": Required<operations["appWechatRefundNotifyUsingPOST"]>['responses'][200]['content']['*/*']

    /** wechatNativePayNotify */
    "/v1/bc/app/payment/wechat/nativePayNotify": Required<operations["wechatNativePayNotifyUsingPOST"]>['responses'][200]['content']['*/*']

    /** wechatNotify */
    "/v1/bc/app/payment/wechat/notify": Required<operations["wechatNotifyUsingPOST"]>['responses'][200]['content']['*/*']

    /** jsApiWechatPay */
    "/v1/bc/app/payment/wechat/pay": Required<operations["jsApiWechatPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** wechatRefundNotify */
    "/v1/bc/app/payment/wechat/refund/notify": Required<operations["wechatRefundNotifyUsingPOST"]>['responses'][200]['content']['*/*']

    /** add */
    "/v1/bc/admin/popup_config/add": Required<operations["addUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/popup_config/del": Required<operations["delUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/popup_config/doAction": Required<operations["doActionUsingPOST_10"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/popup_config/edit": Required<operations["editUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/popup_config/list": Required<operations["listUsingPOST_26"]>['responses'][200]['content']['*/*']

    /** add */
    "/v1/bc/admin/product/add": Required<operations["addUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

    /** audit */
    "/v1/bc/admin/product/audit": Required<operations["auditUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** copy */
    "/v1/bc/admin/product/copy": Required<operations["copyUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** del */
    "/v1/bc/admin/product/del": Required<operations["delUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** doAction */
    "/v1/bc/admin/product/doAction": Required<operations["doActionUsingPOST_11"]>['responses'][200]['content']['*/*']['data']

    /** 发布 */
    "/v1/bc/admin/product/doPublish": Required<operations["doPublishUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

    /** edit */
    "/v1/bc/admin/product/edit": Required<operations["editUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/product/list": Required<operations["listUsingPOST_27"]>['responses'][200]['content']['*/*']

    /** optionalList */
    "/v1/bc/admin/product/optionalList": Required<operations["optionalListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 设置推荐 */
    "/v1/bc/admin/product/setRecommend": Required<operations["setRecommendUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 更新库存 */
    "/v1/bc/admin/product/updateStock": Required<operations["updateStockUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** combinationProductList */
    "/v1/bc/app/product/combination_product_list": Required<operations["combinationProductListUsingPOST"]>['responses'][200]['content']['*/*']

    /** appList */
    "/v1/bc/app/product/list": Required<operations["appListUsingPOST"]>['responses'][200]['content']['*/*']

    /** recommendList */
    "/v1/bc/app/product/recommend/list": Required<operations["recommendListUsingPOST"]>['responses'][200]['content']['*/*']

    /** usercaseList */
    "/v1/bc/app/product/usercase/list": Required<operations["usercaseListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 税收分类编码规格列表 */
    "/v1/bc/company/product/getOptionListWithTaxCode": Required<operations["getOptionListWithTaxCodeUsingPOST"]>['responses'][200]['content']['*/*']

    /** 设置商品税收编码 */
    "/v1/bc/company/product/setProductTaxCode": Required<operations["setProductTaxCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 税收分类编码列表 */
    "/v1/bc/company/product/taxCodeList": Required<operations["taxCodeListUsingPOST"]>['responses'][200]['content']['*/*']

    /** combinationOptionList */
    "/v1/bc/app/product_option/combination_option_list": Required<operations["combinationOptionListUsingPOST"]>['responses'][200]['content']['*/*']

    /** edit */
    "/v1/bc/admin/product_stock/edit": Required<operations["editUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

    /** export */
    "/v1/bc/admin/product_stock/export": Required<operations["exportUsingPOST"]>['responses'][200]['content']

    /** list */
    "/v1/bc/admin/product_stock/list": Required<operations["listUsingPOST_28"]>['responses'][200]['content']['*/*']

    /** warningValueEdit */
    "/v1/bc/admin/product_stock/warning_value_edit": Required<operations["warningValueEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** list */
    "/v1/bc/admin/refund/list": Required<operations["listUsingPOST_29"]>['responses'][200]['content']['*/*']

    /** updateOrCreate */
    "/v1/bc/admin/tag/save": Required<operations["updateOrCreateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** update */
    "/v1/bc/admin/tag/update": Required<operations["updateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** addFile */
    "/v1/bc/admin/video_space/add_file": Required<operations["addFileUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** addFolder */
    "/v1/bc/admin/video_space/add_folder": Required<operations["addFolderUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** addFile */
    "/v1/bc/admin/video_space/del": Required<operations["addFileUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

}
