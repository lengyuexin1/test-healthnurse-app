import type { operations } from './schema'

export interface IOrderPostRequest {
    /** add */
    "/v1/bc/admin/activity/add": Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/activity/doAction": Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/activity/edit": Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/activity/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** 合规部仲裁列表 */
    "/v1/bc/admin/aftersale/arbitrate/HgList": Required<operations["arbitrateHgListUsingPOST"]>['requestBody']['content']['application/json']

    /** 仲裁列表 */
    "/v1/bc/admin/aftersale/arbitrate/List": Required<operations["arbitrateListUsingPOST"]>['requestBody']['content']['application/json']

    /** 合规部消息提醒 */
    "/v1/bc/admin/aftersale/message/warn": Required<operations["messageWarnUsingPOST"]>['requestBody']['content']['application/json']

    /** 仲裁 */
    "/v1/bc/admin/aftersale/platform/arbitrate": Required<operations["adm_arbitrateUsingPOST"]>['requestBody']['content']['application/json']

    /** reason_edit */
    "/v1/bc/admin/aftersale/reason/edit": Required<operations["reason_editUsingPOST"]>['requestBody']['content']['application/json']

    /** reason_list */
    "/v1/bc/admin/aftersale/reason_list": Required<operations["reason_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯售后列表 */
    "/v1/bc/admin/aftersale/sptList": Required<operations["sptListUsingPOST"]>['requestBody']['content']['application/json']

    /** type_edit */
    "/v1/bc/admin/aftersale/type/edit": Required<operations["type_editUsingPOST"]>['requestBody']['content']['application/json']

    /** type_list */
    "/v1/bc/admin/aftersale/type/list": Required<operations["type_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请仲裁 */
    "/v1/bc/api/aftersale/ApplyFor/arbitration": Required<operations["arbitrateUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯确认收货 */
    "/v1/bc/api/aftersale/afterConsent": Required<operations["afterConsentUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请退款 */
    "/v1/bc/api/aftersale/applyRefund": Required<operations["applyRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消订单 */
    "/v1/bc/api/aftersale/cancelOrder": Required<operations["cancelOrderUsingPOST"]>['requestBody']['content']['application/json']

    /** close */
    "/v1/bc/api/aftersale/close": Required<operations["closeUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请售后（适品囤） */
    "/v1/bc/api/aftersale/spt/add": Required<operations["sptAddUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯去退货 */
    "/v1/bc/api/aftersale/spt/addExpress": Required<operations["addExpressUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请售后的数据 */
    "/v1/bc/api/aftersale/spt/addLook1": Required<operations["sptAddLook1UsingPOST"]>['requestBody']['content']['application/json']

    /** 再次申请售后 */
    "/v1/bc/api/aftersale/spt/againAdd": Required<operations["sptAgainAddUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯售后列表 */
    "/v1/bc/api/aftersale/sptApiList": Required<operations["sptApiListUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请仲裁 */
    "/v1/bc/api/aftersale/sptApplyFor/arbitration": Required<operations["sptArbitrateUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯确认收货 */
    "/v1/bc/company/aftersale/afterConsent": Required<operations["afterConsentUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 适品屯批量同意退款和退货 */
    "/v1/bc/company/aftersale/bulk/refund": Required<operations["sptBulkRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** no_pass */
    "/v1/bc/company/aftersale/nopass": Required<operations["no_passUsingPOST"]>['requestBody']['content']['application/json']

    /** pass */
    "/v1/bc/company/aftersale/pass": Required<operations["passUsingPOST"]>['requestBody']['content']['application/json']

    /** 拒绝收货 */
    "/v1/bc/company/aftersale/refuseReceiveGoods": Required<operations["refuseReceiveGoodsUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯售后地址设置 */
    "/v1/bc/company/aftersale/setAddress": Required<operations["setAddressUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯仲裁举证 */
    "/v1/bc/company/aftersale/sptEvidence": Required<operations["sptPutEvidenceUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯售后列表 */
    "/v1/bc/company/aftersale/sptList": Required<operations["sptListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 适品屯商户是否同意售后 */
    "/v1/bc/company/aftersale/sptMerchantAudit": Required<operations["sptMerchantAuditUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯直接退款 */
    "/v1/bc/company/aftersale/sptPass": Required<operations["sptPassUsingPOST"]>['requestBody']['content']['application/json']

    /** 适品屯去发货 */
    "/v1/bc/company/aftersale/toDeliverGoods": Required<operations["toDeliverGoodsUsingPOST"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/agency/add": Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']

    /** audit */
    "/v1/bc/admin/agency/audit": Required<operations["auditUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/agency/doAction": Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']

    /** doPublish */
    "/v1/bc/admin/agency/doPublish": Required<operations["doPublishUsingPOST"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/agency/edit": Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/agency/list": Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/app/agency/list": Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/cart/list": Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 创建购物车 */
    "/v1/bc/app/cart/create": Required<operations["createUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除购物车 */
    "/v1/bc/app/cart/delete": Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改购物车数 */
    "/v1/bc/app/cart/quantity/update": Required<operations["updateQuantityUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建购物车 */
    "/v1/product/app/cart/create": Required<operations["createUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 修改购物车数 */
    "/v1/product/app/cart/quantity/update": Required<operations["updateQuantityUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 添加 */
    "/v1/bc/admin/category/add": Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 获取类目列表 */
    "/v1/bc/admin/category/list/activity": Required<operations["listForActivityUsingPOST"]>['requestBody']['content']['application/json']

    /** 编辑 */
    "/v1/bc/admin/category/modify": Required<operations["modifyUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目删除 */
    "/v1/bc/admin/category/remove": Required<operations["batchRemoveUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目排序 */
    "/v1/bc/admin/category/sort": Required<operations["batchSortUsingPOST"]>['requestBody']['content']['application/json']

    /** 类目上下架 */
    "/v1/bc/admin/category/status": Required<operations["setStatusUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/category_show/delete": Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 添加 */
    "/v1/bc/admin/category_show/save": Required<operations["saveUsingPOST"]>['requestBody']['content']['application/json']

    /** 排序 */
    "/v1/bc/admin/category_show/sort": Required<operations["sortUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务列表 */
    "/v1/bc/app/category_show/item/list": Required<operations["itemListUsingPOST"]>['requestBody']['content']['application/json']

    /** 商品列表 */
    "/v1/bc/app/category_show/product/list": Required<operations["productListUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/company/comment/list": Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 获取子类目的商品信息 */
    "/v1/bc/app/common/getSonListWithProduct": Required<operations["getSonListWithProductUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务列表 */
    "/v1/bc/app/common/itemList": Required<operations["itemListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** addTotal */
    "/v1/bc/admin/coupon/add/total": Required<operations["addTotalUsingPOST"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/coupon/delete": Required<operations["doActionUsingPOST_2"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/coupon/doAction": Required<operations["doActionUsingPOST_3"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/coupon/list": Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/coupon/save": Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** grantedUserList */
    "/v1/bc/admin/coupon/user/list": Required<operations["grantedUserListUsingPOST"]>['requestBody']['content']['application/json']

    /** checkCoupon */
    "/v1/bc/app/coupon/check": Required<operations["checkCouponUsingPOST"]>['requestBody']['content']['application/json']

    /** getCoupon */
    "/v1/bc/app/coupon/collect": Required<operations["getCouponUsingPOST_1"]>['requestBody']['content']['application/json']

    /** granted_list */
    "/v1/bc/app/coupon/granted/list": Required<operations["granted_listUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/app/coupon/list": Required<operations["listUsingPOST_6"]>['requestBody']['content']['application/json']

    /** getCouponGranted */
    "/v1/bc/app/coupon/use/list": Required<operations["getCouponGrantedUsingPOST"]>['requestBody']['content']['application/json']

    /** getPlatformGranted */
    "/v1/bc/app/coupon/use/platform": Required<operations["getPlatformGrantedUsingPOST"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/estimate_grade/add": Required<operations["addUsingPOST_3"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/estimate_grade/edit": Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/estimate_grade/list": Required<operations["listUsingPOST_7"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/estimate_question/add": Required<operations["addUsingPOST_4"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/estimate_question/del": Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/estimate_question/edit": Required<operations["editUsingPOST_3"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/estimate_question/list": Required<operations["listUsingPOST_8"]>['requestBody']['content']['application/json']

    /** sort */
    "/v1/bc/admin/estimate_question/sort": Required<operations["sortUsingPOST_1"]>['requestBody']['content']['application/json']

    /** estimate */
    "/v1/bc/app/estimate_question/estimate": Required<operations["estimateUsingPOST"]>['requestBody']['content']['application/json']

    /** 快递100回调 */
    "/v1/bc/app/kuaidi/express/callback": Required<operations["callbackUsingPOST"]>['requestBody']

    /** 快递100订阅 */
    "/v1/bc/app/kuaidi/express/pushExpress": Required<operations["pushExpressUsingPOST"]>['requestBody']['content']['application/json']

    /** 快递实时查看 */
    "/v1/bc/app/kuaidi/express/realtimeLookExpress": Required<operations["RealtimeLookExpressUsingPOST"]>['requestBody']['content']['application/json']

    /** 物流轨迹图 */
    "/v1/bc/app/kuaidi/express/trajectory": Required<operations["expressTrajectoryUsingPOST"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/health/add": Required<operations["addUsingPOST_5"]>['requestBody']['content']['application/json']

    /** audit */
    "/v1/bc/admin/health/audit": Required<operations["auditUsingPOST_1"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/health/doAction": Required<operations["doActionUsingPOST_4"]>['requestBody']['content']['application/json']

    /** doPublish */
    "/v1/bc/admin/health/doPublish": Required<operations["doPublishUsingPOST_1"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/health/edit": Required<operations["editUsingPOST_4"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/health/list": Required<operations["listUsingPOST_9"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/app/health/list": Required<operations["listUsingPOST_10"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/home/mould/delete": Required<operations["deleteUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/home/mould/list": Required<operations["listUsingPOST_11"]>['requestBody']['content']['application/json']

    /** 发布 */
    "/v1/bc/admin/home/mould/publish": Required<operations["sortUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 添加 */
    "/v1/bc/admin/home/mould/save": Required<operations["saveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 创建 */
    "/v1/bc/admin/hospital/create": Required<operations["createUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/hospital/list": Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改 */
    "/v1/bc/admin/hospital/modify": Required<operations["modifyUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/hospital/remove": Required<operations["removeUsingPOST"]>['requestBody']['content']['application/json']

    /** 详情 */
    "/v1/bc/app/hospital/detail": Required<operations["detailUsingPOST"]>['parameters']['query']

    /** 列表 */
    "/v1/bc/app/hospital/list": Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/merchant/hospital/list": Required<operations["listByPageUsingPOST_2"]>['requestBody']['content']['application/json']

    /** addFile */
    "/v1/bc/admin/image_space/add_file": Required<operations["addFileUsingPOST"]>['requestBody']['content']['application/json']

    /** addFolder */
    "/v1/bc/admin/image_space/add_folder": Required<operations["addFolderUsingPOST"]>['requestBody']['content']['application/json']

    /** addFile */
    "/v1/bc/admin/image_space/del": Required<operations["addFileUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 通过/驳回 */
    "/v1/bc/admin/audit/doAction": Required<operations["doActionUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/audit/list": Required<operations["listByPageUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/merchant/draft/list": Required<operations["listByPageUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/merchant/draft/remove": Required<operations["batchRemoveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 上架/下架 */
    "/v1/bc/admin/item/doAction": Required<operations["doActionUsingPOST_6"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/admin/item/list": Required<operations["listByPageUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 服务列表 */
    "/v1/bc/app/item/all": Required<operations["getAllListUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取服务供es 手动自动导入 */
    "/v1/bc/app/item/es/list": Required<operations["getItemListUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务列表 */
    "/v1/bc/app/item/list": Required<operations["getListUsingPOST"]>['requestBody']['content']['application/json']

    /** 上架/下架 */
    "/v1/bc/merchant/item/doAction": Required<operations["doActionUsingPOST_7"]>['requestBody']['content']['application/json']

    /** 上架/下架 */
    "/v1/bc/merchant/item/doPublish": Required<operations["doPublishUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 添加服务规格 */
    "/v1/bc/merchant/item/draft": Required<operations["draftUsingPOST"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/merchant/item/list": Required<operations["listByPageUsingPOST_6"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/merchant/item/remove": Required<operations["batchRemoveUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 编辑服务规格 */
    "/v1/bc/merchant/item/submit": Required<operations["submitUsingPOST"]>['requestBody']['content']['application/json']

    /** 排班统计 */
    "/v1/bc/merchant/clock/list": Required<operations["scheduleStatisticUsingPOST"]>['requestBody']['content']['application/json']

    /** 结束工单 */
    "/v1/bc/admin/job/close": Required<operations["closeJobUsingPOST"]>['requestBody']['content']['application/json']

    /** 工单列表 */
    "/v1/bc/admin/job/list": Required<operations["listUsingPOST_12"]>['requestBody']['content']['application/json']

    /** 用户工单列表 */
    "/v1/bc/admin/job/person": Required<operations["personJobListUsingPOST"]>['requestBody']['content']['application/json']

    /** 授理工单 */
    "/v1/bc/merchant/job/accepted": Required<operations["acceptedJobUsingPOST"]>['requestBody']['content']['application/json']

    /** 指派 */
    "/v1/bc/merchant/job/assign": Required<operations["assignUsingPOST"]>['requestBody']['content']['application/json']

    /** 取消工单 */
    "/v1/bc/merchant/job/cancel": Required<operations["cancelUsingPOST"]>['requestBody']['content']['application/json']

    /** 通知用户工单快结束 */
    "/v1/bc/merchant/job/jobEndAlertUser": Required<operations["jobEndAlertUserUsingPOST"]>['requestBody']['content']['application/json']

    /** 任务列表 */
    "/v1/bc/merchant/job/list": Required<operations["listUsingPOST_13"]>['requestBody']['content']['application/json']

    /** 休假设置 */
    "/v1/bc/merchant/job/offDate": Required<operations["offDateUsingPOST"]>['requestBody']['content']['application/json']

    /** 待结算列表 */
    "/v1/bc/merchant/job/paid": Required<operations["paidListUsingPOST"]>['requestBody']['content']['application/json']

    /** 用户工单列表 */
    "/v1/bc/merchant/job/person": Required<operations["personJobListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 工单服务中更换服务人员 */
    "/v1/bc/merchant/job/replaceWorker": Required<operations["replaceWorkerUsingPOST"]>['requestBody']['content']['application/json']

    /** 保存费用 */
    "/v1/bc/merchant/job/settle": Required<operations["settleUsingPOST"]>['requestBody']['content']['application/json']

    /** 保存备注 */
    "/v1/bc/merchant/job/update": Required<operations["updateJobUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 设置倒计时备注 */
    "/v1/bc/merchant/job/updateGrabTime": Required<operations["updateJobUsingPOST"]>['requestBody']['content']['application/json']

    /** 保存打卡信息 */
    "/v1/bc/server/job/clock/save": Required<operations["clockSaveUsingPOST"]>['requestBody']['content']['application/json']

    /** 提交代跑物流信息 */
    "/v1/bc/server/job/delivery": Required<operations["workerDeliveryUsingPOST"]>['requestBody']['content']['application/json']

    /** 提交工单完成 */
    "/v1/bc/server/job/finish": Required<operations["doFinishUsingPOST"]>['requestBody']['content']['application/json']

    /** 任务大厅 */
    "/v1/bc/server/job/hall": Required<operations["orderHallUsingPOST"]>['requestBody']['content']['application/json']

    /** 用户工单列表 */
    "/v1/bc/server/job/person": Required<operations["personJobListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 提交代跑取单实物信息 */
    "/v1/bc/server/job/physical": Required<operations["workerPhysicalUsingPOST"]>['requestBody']['content']['application/json']

    /** 抢单 */
    "/v1/bc/server/job/rush": Required<operations["rushOrderUsingPOST"]>['requestBody']['content']['application/json']

    /** 扫码更新工单状态 */
    "/v1/bc/server/job/scanCode": Required<operations["scanCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 任务列表 */
    "/v1/bc/server/job/task": Required<operations["listUsingPOST_14"]>['requestBody']['content']['application/json']

    /** save */
    "/v1/bc/server/category/save": Required<operations["saveUsingPOST_2"]>['requestBody']['content']['application/json']

    /** setFilter */
    "/v1/bc/server/job/filter": Required<operations["setFilterUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建 */
    "/v1/bc/merchant/prepaid/create": Required<operations["createUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 审核 */
    "/v1/bc/merchant/prepaid/doAction": Required<operations["doActionUsingPOST_8"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/merchant/prepaid/list": Required<operations["listUsingPOST_15"]>['requestBody']['content']['application/json']

    /** 修改/添加回访 */
    "/v1/bc/merchant/recall/add": Required<operations["addUsingPOST_6"]>['requestBody']['content']['application/json']

    /** 任务列表 */
    "/v1/bc/merchant/recall/list": Required<operations["listUsingPOST_16"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/merchant/recall/remove": Required<operations["removeUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 任务列表 */
    "/v1/bc/server/recall/list": Required<operations["listUsingPOST_17"]>['requestBody']['content']['application/json']

    /** 修改/添加回访 */
    "/v1/bc/server/recall/modify": Required<operations["modifyUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 创建 */
    "/v1/bc/merchant/settle/create": Required<operations["createUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 审核 */
    "/v1/bc/merchant/settle/doAction": Required<operations["doActionUsingPOST_9"]>['requestBody']['content']['application/json']

    /** 列表 */
    "/v1/bc/merchant/settle/list": Required<operations["listUsingPOST_18"]>['requestBody']['content']['application/json']

    /** 删除 */
    "/v1/bc/admin/marketing/offline/delete": Required<operations["deleteUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 线下列表 */
    "/v1/bc/admin/marketing/offline/list": Required<operations["admin_offline_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除物料 */
    "/v1/bc/admin/marketing/offline/material/delete": Required<operations["deleteMaterialUsingPOST"]>['requestBody']['content']['application/json']

    /** 线下物料列表 */
    "/v1/bc/admin/marketing/offline/material/list": Required<operations["admin_material_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 新增修改物料 */
    "/v1/bc/admin/marketing/offline/material/save": Required<operations["doSaveMaterialUsingPOST"]>['requestBody']['content']['application/json']

    /** 新增修改 */
    "/v1/bc/admin/marketing/offline/save": Required<operations["doSaveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 新增修改投放场所 */
    "/v1/bc/admin/marketing/offline/save/data": Required<operations["doSaveDataUsingPOST"]>['requestBody']['content']['application/json']

    /** 线上推广删除 */
    "/v1/bc/admin/marketing/online/delete": Required<operations["deleteOnlineUsingPOST"]>['requestBody']['content']['application/json']

    /** 线上列表 */
    "/v1/bc/admin/marketing/online/list": Required<operations["admin_online_listUsingPOST"]>['requestBody']['content']['application/json']

    /** 线上新增修改 */
    "/v1/bc/admin/marketing/online/save": Required<operations["doSaveOnlineUsingPOST"]>['requestBody']['content']['application/json']

    /** 线上新增修改推广渠道 */
    "/v1/bc/admin/marketing/online/save/data": Required<operations["doSaveDataOnlineUsingPOST"]>['requestBody']['content']['application/json']

    /** 同意退款 */
    "/v1/bc/merchant/cancel/audit/order/agree/refund": Required<operations["agreeRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** 不同意退款 */
    "/v1/bc/merchant/cancel/audit/order/disagree/refund": Required<operations["disagreeRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** 审核列表 */
    "/v1/bc/merchant/cancel/audit/order/list": Required<operations["listUsingPOST_19"]>['requestBody']['content']['application/json']

    /** 核销 */
    "/v1/bc/admin/order/cardConsume": Required<operations["cardConsumeUsingPOST"]>['requestBody']['content']['application/json']

    /** 券号列表 */
    "/v1/bc/admin/order/cardConsumeList": Required<operations["cardConsumeListUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单列表 */
    "/v1/bc/admin/order/list": Required<operations["listUsingPOST_20"]>['requestBody']['content']['application/json']

    /** operationLogList */
    "/v1/bc/admin/order/operation/log/list": Required<operations["operationLogListUsingPOST"]>['requestBody']['content']['application/json']

    /** 帮客户续单 */
    "/v1/bc/admin/order/renew": Required<operations["renewUsingPOST"]>['requestBody']['content']['application/json']

    /** 未评价列表 */
    "/v1/bc/admin/order/wait_comment/list": Required<operations["waitCommentListUsingPOST"]>['requestBody']['content']['application/json']

    /** 可售后列表 */
    "/v1/bc/app/order/after/saleable/list": Required<operations["afterSaleableListUsingPOST"]>['requestBody']['content']['application/json']

    /** cancel */
    "/v1/bc/app/order/cancel": Required<operations["cancelUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 创建虚拟卡订单 */
    "/v1/bc/app/order/cardCreate": Required<operations["createUsingPOST_5"]>['requestBody']['content']['application/json']

    /** 虚拟卡订单退款 */
    "/v1/bc/app/order/cardRefund": Required<operations["cardRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建课程订单 */
    "/v1/bc/app/order/courseCreate": Required<operations["courseCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建订单 */
    "/v1/bc/app/order/create": Required<operations["createUsingPOST_6"]>['requestBody']['content']['application/json']

    /** helpCreate */
    "/v1/bc/app/order/help/create": Required<operations["helpCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单列表 */
    "/v1/bc/app/order/list": Required<operations["listUsingPOST_21"]>['requestBody']['content']['application/json']

    /** 修改订单 */
    "/v1/bc/app/order/modify": Required<operations["modifyUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 求订单总价 */
    "/v1/bc/app/order/price/calculation": Required<operations["priceCalculationUsingPOST"]>['requestBody']['content']['application/json']

    /** 求虚拟卡订单总价 */
    "/v1/bc/app/order/price/cardCalculation": Required<operations["priceCalculationUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 求课程订单总价 */
    "/v1/bc/app/order/price/courseCalculation": Required<operations["priceCourseCalculationUsingPOST"]>['requestBody']['content']['application/json']

    /** 发送短信 */
    "/v1/bc/app/order/send_sms": Required<operations["sendSmsUsingPOST"]>['requestBody']['content']['application/json']

    /** 立刻使用 (多次单) */
    "/v1/bc/app/order/use_now": Required<operations["useNowUsingPOST"]>['requestBody']['content']['application/json']

    /** cancel */
    "/v1/bc/merchant/order/cancel": Required<operations["cancelUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 订单列表 */
    "/v1/bc/merchant/order/list": Required<operations["listUsingPOST_22"]>['requestBody']['content']['application/json']

    /** 订单修改最终实付金额 */
    "/v1/bc/merchant/order/modify/entity/order": Required<operations["modifyEntityOrderUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单更改 */
    "/v1/bc/merchant/order/update": Required<operations["updateUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单更改最终实付金额 */
    "/v1/bc/merchant/order/update_paid_amount": Required<operations["updatePaidAmountUsingPOST"]>['requestBody']['content']['application/json']

    /** 未评价列表 */
    "/v1/bc/merchant/order/wait_comment/list": Required<operations["waitCommentListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 订单列表 */
    "/v1/product/admin/order/list": Required<operations["listUsingPOST_23"]>['requestBody']['content']['application/json']

    /** 确认收货 */
    "/v1/product/app/order/confirm/receive": Required<operations["confirmReceiveUsingPOST"]>['requestBody']['content']['application/json']

    /** 创建订单 */
    "/v1/product/app/order/create": Required<operations["createUsingPOST_7"]>['requestBody']['content']['application/json']

    /** 延长收货 */
    "/v1/product/app/order/delay/receive": Required<operations["doDelayReceiveUsingPOST"]>['requestBody']['content']['application/json']

    /** 删除订单 */
    "/v1/product/app/order/delete": Required<operations["deleteUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 修改订单 */
    "/v1/product/app/order/modify": Required<operations["modifyUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 求订单总价 */
    "/v1/product/app/order/price/calculation": Required<operations["priceCalculationUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 延长收货 */
    "/v1/product/merchant/order/delay/receive": Required<operations["doDelayReceiveUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 发货 or 补发 */
    "/v1/product/merchant/order/delivery": Required<operations["deliveryUsingPOST"]>['requestBody']['content']['application/json']

    /** 修改单号 */
    "/v1/product/merchant/order/express/update": Required<operations["updateExpressUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单列表 */
    "/v1/product/merchant/order/list": Required<operations["listUsingPOST_24"]>['requestBody']['content']['application/json']

    /** 订单总览_访问数 */
    "/v1/bc/admin/order/stat/accessor/cnt": Required<operations["getAccessorCntUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单总览 */
    "/v1/bc/admin/order/stat/overview": Required<operations["overviewUsingPOST"]>['requestBody']

    /** 订单总览_售额 */
    "/v1/bc/admin/order/stat/sale/amount": Required<operations["getSaleAmountUsingPOST"]>['requestBody']['content']['application/json']

    /** 数据统计 */
    "/v1/bc/admin/organization/order/amount": Required<operations["amountUsingPOST"]>['requestBody']['content']['application/json']

    /** createAd */
    "/v1/bc/admin/organization/order/create/ad": Required<operations["createAdUsingPOST"]>['requestBody']['content']['application/json']

    /** 下架 */
    "/v1/bc/admin/organization/order/dropped": Required<operations["droppedUsingPOST"]>['requestBody']['content']['application/json']

    /** admin_list */
    "/v1/bc/admin/organization/order/list": Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']

    /** ads_list */
    "/v1/bc/company/organization/order/ads": Required<operations["ads_listUsingPOST"]>['requestBody']['content']['application/json']

    /** createSecurity */
    "/v1/bc/company/organization/order/create/security": Required<operations["createSecurityUsingPOST"]>['requestBody']['content']['application/json']

    /** saveServiceFee */
    "/v1/bc/company/organization/order/create/servicefee": Required<operations["saveServiceFeeUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/company/organization/order/list": Required<operations["listUsingPOST_25"]>['requestBody']['content']['application/json']

    /** nativePay */
    "/v1/bc/company/organization/order/native/pay": Required<operations["nativePayUsingPOST"]>['requestBody']['content']['application/json']

    /** admin_list */
    "/v1/bc/admin/organization/product/list": Required<operations["admin_listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** saveServiceFee */
    "/v1/bc/admin/organization/product/save/servicefee": Required<operations["saveServiceFeeUsingPOST_1"]>['requestBody']['content']['application/json']

    /** checkPayResult */
    "/v1/bc/app/payment/check/pay/result": Required<operations["checkPayResultUsingPOST"]>['requestBody']['content']['application/json']

    /** appWechatPayCpcn */
    "/v1/bc/app/payment/cpcn/wechat/app/pay": Required<operations["appWechatPayCpcnUsingPOST"]>['requestBody']['content']['application/json']

    /** jsApiWechatPayCpcn */
    "/v1/bc/app/payment/cpcn/wechat/pay": Required<operations["jsApiWechatPayCpcnUsingPOST"]>['requestBody']['content']['application/json']

    /** appWechatNotify */
    "/v1/bc/app/payment/wechat/app/notify": Required<operations["appWechatNotifyUsingPOST"]>['requestBody']['content']['application/json']

    /** appWechatPay */
    "/v1/bc/app/payment/wechat/app/pay": Required<operations["appWechatPayUsingPOST"]>['requestBody']['content']['application/json']

    /** appWechatRefundNotify */
    "/v1/bc/app/payment/wechat/app/refund/notify": Required<operations["appWechatRefundNotifyUsingPOST"]>['requestBody']['content']['application/json']

    /** wechatNativePayNotify */
    "/v1/bc/app/payment/wechat/nativePayNotify": Required<operations["wechatNativePayNotifyUsingPOST"]>['requestBody']['content']['application/json']

    /** wechatNotify */
    "/v1/bc/app/payment/wechat/notify": Required<operations["wechatNotifyUsingPOST"]>['requestBody']['content']['application/json']

    /** jsApiWechatPay */
    "/v1/bc/app/payment/wechat/pay": Required<operations["jsApiWechatPayUsingPOST"]>['requestBody']['content']['application/json']

    /** wechatRefundNotify */
    "/v1/bc/app/payment/wechat/refund/notify": Required<operations["wechatRefundNotifyUsingPOST"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/popup_config/add": Required<operations["addUsingPOST_7"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/popup_config/del": Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/popup_config/doAction": Required<operations["doActionUsingPOST_10"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/popup_config/edit": Required<operations["editUsingPOST_5"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/popup_config/list": Required<operations["listUsingPOST_26"]>['requestBody']['content']['application/json']

    /** add */
    "/v1/bc/admin/product/add": Required<operations["addUsingPOST_8"]>['requestBody']['content']['application/json']

    /** audit */
    "/v1/bc/admin/product/audit": Required<operations["auditUsingPOST_2"]>['requestBody']['content']['application/json']

    /** copy */
    "/v1/bc/admin/product/copy": Required<operations["copyUsingPOST"]>['requestBody']['content']['application/json']

    /** del */
    "/v1/bc/admin/product/del": Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']

    /** doAction */
    "/v1/bc/admin/product/doAction": Required<operations["doActionUsingPOST_11"]>['requestBody']['content']['application/json']

    /** 发布 */
    "/v1/bc/admin/product/doPublish": Required<operations["doPublishUsingPOST_3"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/product/edit": Required<operations["editUsingPOST_6"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/product/list": Required<operations["listUsingPOST_27"]>['requestBody']['content']['application/json']

    /** optionalList */
    "/v1/bc/admin/product/optionalList": Required<operations["optionalListUsingPOST"]>['requestBody']['content']['application/json']

    /** 设置推荐 */
    "/v1/bc/admin/product/setRecommend": Required<operations["setRecommendUsingPOST"]>['requestBody']['content']['application/json']

    /** 更新库存 */
    "/v1/bc/admin/product/updateStock": Required<operations["updateStockUsingPOST"]>['requestBody']['content']['application/json']

    /** combinationProductList */
    "/v1/bc/app/product/combination_product_list": Required<operations["combinationProductListUsingPOST"]>['requestBody']['content']['application/json']

    /** appList */
    "/v1/bc/app/product/list": Required<operations["appListUsingPOST"]>['requestBody']['content']['application/json']

    /** recommendList */
    "/v1/bc/app/product/recommend/list": Required<operations["recommendListUsingPOST"]>['requestBody']['content']['application/json']

    /** usercaseList */
    "/v1/bc/app/product/usercase/list": Required<operations["usercaseListUsingPOST"]>['requestBody']['content']['application/json']

    /** 税收分类编码规格列表 */
    "/v1/bc/company/product/getOptionListWithTaxCode": Required<operations["getOptionListWithTaxCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 设置商品税收编码 */
    "/v1/bc/company/product/setProductTaxCode": Required<operations["setProductTaxCodeUsingPOST"]>['requestBody']['content']['application/json']

    /** 税收分类编码列表 */
    "/v1/bc/company/product/taxCodeList": Required<operations["taxCodeListUsingPOST"]>['requestBody']['content']['application/json']

    /** combinationOptionList */
    "/v1/bc/app/product_option/combination_option_list": Required<operations["combinationOptionListUsingPOST"]>['requestBody']['content']['application/json']

    /** edit */
    "/v1/bc/admin/product_stock/edit": Required<operations["editUsingPOST_7"]>['requestBody']['content']['application/json']

    /** export */
    "/v1/bc/admin/product_stock/export": Required<operations["exportUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/product_stock/list": Required<operations["listUsingPOST_28"]>['requestBody']['content']['application/json']

    /** warningValueEdit */
    "/v1/bc/admin/product_stock/warning_value_edit": Required<operations["warningValueEditUsingPOST"]>['requestBody']['content']['application/json']

    /** list */
    "/v1/bc/admin/refund/list": Required<operations["listUsingPOST_29"]>['requestBody']['content']['application/json']

    /** updateOrCreate */
    "/v1/bc/admin/tag/save": Required<operations["updateOrCreateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** update */
    "/v1/bc/admin/tag/update": Required<operations["updateUsingPOST_1"]>['requestBody']['content']['application/json']

    /** addFile */
    "/v1/bc/admin/video_space/add_file": Required<operations["addFileUsingPOST_2"]>['requestBody']['content']['application/json']

    /** addFolder */
    "/v1/bc/admin/video_space/add_folder": Required<operations["addFolderUsingPOST_1"]>['requestBody']['content']['application/json']

    /** addFile */
    "/v1/bc/admin/video_space/del": Required<operations["addFileUsingPOST_3"]>['requestBody']['content']['application/json']

}
