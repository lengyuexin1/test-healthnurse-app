import type { operations } from './schema'

/** add - post请求参数 */
export type _v1_bc_admin_activity_add_post_req = Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_activity_add_post_res = Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_activity_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_activity_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_activity_detail_get_req = Required<operations["detailUsingGET_1"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_activity_detail_get_res = Required<operations["detailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_activity_doAction_post_req = Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_activity_doAction_post_res = Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_activity_edit_post_req = Required<operations["editUsingPOST"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_activity_edit_post_res = Required<operations["editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_activity_list_post_req = Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_activity_list_post_res = Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

/** detail - get请求参数 */
export type _v1_bc_app_activity_detail_get_req = Required<operations["detailUsingGET_2"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_app_activity_detail_get_res = Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_activity_list_get_req = Required<operations["listUsingGET"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_activity_list_get_res = Required<operations["listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 合规部仲裁列表 - post请求参数 */
export type _v1_bc_admin_aftersale_arbitrate_HgList_post_req = Required<operations["arbitrateHgListUsingPOST"]>['requestBody']['content']['application/json']
/** 合规部仲裁列表 - post响应参数 */
export type _v1_bc_admin_aftersale_arbitrate_HgList_post_res = Required<operations["arbitrateHgListUsingPOST"]>['responses'][200]['content']['*/*']

/** 仲裁列表 - post请求参数 */
export type _v1_bc_admin_aftersale_arbitrate_List_post_req = Required<operations["arbitrateListUsingPOST"]>['requestBody']['content']['application/json']
/** 仲裁列表 - post响应参数 */
export type _v1_bc_admin_aftersale_arbitrate_List_post_res = Required<operations["arbitrateListUsingPOST"]>['responses'][200]['content']['*/*']

/** 合规部消息提醒 - post请求参数 */
export type _v1_bc_admin_aftersale_message_warn_post_req = Required<operations["messageWarnUsingPOST"]>['requestBody']['content']['application/json']
/** 合规部消息提醒 - post响应参数 */
export type _v1_bc_admin_aftersale_message_warn_post_res = Required<operations["messageWarnUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 仲裁 - post请求参数 */
export type _v1_bc_admin_aftersale_platform_arbitrate_post_req = Required<operations["adm_arbitrateUsingPOST"]>['requestBody']['content']['application/json']
/** 仲裁 - post响应参数 */
export type _v1_bc_admin_aftersale_platform_arbitrate_post_res = Required<operations["adm_arbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** reason_edit - post请求参数 */
export type _v1_bc_admin_aftersale_reason_edit_post_req = Required<operations["reason_editUsingPOST"]>['requestBody']['content']['application/json']
/** reason_edit - post响应参数 */
export type _v1_bc_admin_aftersale_reason_edit_post_res = Required<operations["reason_editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** reason_view - get请求参数 */
export type _v1_bc_admin_aftersale_reason_view_get_req = Required<operations["reason_viewUsingGET"]>['parameters']['query']
/** reason_view - get响应参数 */
export type _v1_bc_admin_aftersale_reason_view_get_res = Required<operations["reason_viewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** reason_list - post请求参数 */
export type _v1_bc_admin_aftersale_reason_list_post_req = Required<operations["reason_listUsingPOST"]>['requestBody']['content']['application/json']
/** reason_list - post响应参数 */
export type _v1_bc_admin_aftersale_reason_list_post_res = Required<operations["reason_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 适品屯售后列表 - post请求参数 */
export type _v1_bc_admin_aftersale_sptList_post_req = Required<operations["sptListUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯售后列表 - post响应参数 */
export type _v1_bc_admin_aftersale_sptList_post_res = Required<operations["sptListUsingPOST"]>['responses'][200]['content']['*/*']

/** type_edit - post请求参数 */
export type _v1_bc_admin_aftersale_type_edit_post_req = Required<operations["type_editUsingPOST"]>['requestBody']['content']['application/json']
/** type_edit - post响应参数 */
export type _v1_bc_admin_aftersale_type_edit_post_res = Required<operations["type_editUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** type_list - post请求参数 */
export type _v1_bc_admin_aftersale_type_list_post_req = Required<operations["type_listUsingPOST"]>['requestBody']['content']['application/json']
/** type_list - post响应参数 */
export type _v1_bc_admin_aftersale_type_list_post_res = Required<operations["type_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 申请仲裁 - post请求参数 */
export type _v1_bc_api_aftersale_ApplyFor_arbitration_post_req = Required<operations["arbitrateUsingPOST"]>['requestBody']['content']['application/json']
/** 申请仲裁 - post响应参数 */
export type _v1_bc_api_aftersale_ApplyFor_arbitration_post_res = Required<operations["arbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯确认收货 - post请求参数 */
export type _v1_bc_api_aftersale_afterConsent_post_req = Required<operations["afterConsentUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯确认收货 - post响应参数 */
export type _v1_bc_api_aftersale_afterConsent_post_res = Required<operations["afterConsentUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申请退款 - post请求参数 */
export type _v1_bc_api_aftersale_applyRefund_post_req = Required<operations["applyRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 申请退款 - post响应参数 */
export type _v1_bc_api_aftersale_applyRefund_post_res = Required<operations["applyRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 换货物流查询 - get请求参数 */
export type _v1_bc_api_aftersale_barterLogistics_get_req = Required<operations["barterLogisticsUsingGET"]>['parameters']['query']
/** 换货物流查询 - get响应参数 */
export type _v1_bc_api_aftersale_barterLogistics_get_res = Required<operations["barterLogisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 取消订单 - post请求参数 */
export type _v1_bc_api_aftersale_cancelOrder_post_req = Required<operations["cancelOrderUsingPOST"]>['requestBody']['content']['application/json']
/** 取消订单 - post响应参数 */
export type _v1_bc_api_aftersale_cancelOrder_post_res = Required<operations["cancelOrderUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** close - post请求参数 */
export type _v1_bc_api_aftersale_close_post_req = Required<operations["closeUsingPOST"]>['requestBody']['content']['application/json']
/** close - post响应参数 */
export type _v1_bc_api_aftersale_close_post_res = Required<operations["closeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** reason_list - get请求参数 */
export type _v1_bc_api_aftersale_reason_list_get_req = Required<operations["reason_listUsingGET"]>['parameters']['query']
/** reason_list - get响应参数 */
export type _v1_bc_api_aftersale_reason_list_get_res = Required<operations["reason_listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** record_list - get请求参数 */
export type _v1_bc_api_aftersale_record_list_get_req = Required<operations["record_listUsingGET"]>['parameters']['query']
/** record_list - get响应参数 */
export type _v1_bc_api_aftersale_record_list_get_res = Required<operations["record_listUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 申请售后（适品囤） - post请求参数 */
export type _v1_bc_api_aftersale_spt_add_post_req = Required<operations["sptAddUsingPOST"]>['requestBody']['content']['application/json']
/** 申请售后（适品囤） - post响应参数 */
export type _v1_bc_api_aftersale_spt_add_post_res = Required<operations["sptAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯去退货 - post请求参数 */
export type _v1_bc_api_aftersale_spt_addExpress_post_req = Required<operations["addExpressUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯去退货 - post响应参数 */
export type _v1_bc_api_aftersale_spt_addExpress_post_res = Required<operations["addExpressUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申请售后的数据 - get请求参数 */
export type _v1_bc_api_aftersale_spt_addLook_get_req = Required<operations["sptAddLookUsingGET"]>['parameters']['query']
/** 申请售后的数据 - get响应参数 */
export type _v1_bc_api_aftersale_spt_addLook_get_res = Required<operations["sptAddLookUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 申请售后的数据 - post请求参数 */
export type _v1_bc_api_aftersale_spt_addLook1_post_req = Required<operations["sptAddLook1UsingPOST"]>['requestBody']['content']['application/json']
/** 申请售后的数据 - post响应参数 */
export type _v1_bc_api_aftersale_spt_addLook1_post_res = Required<operations["sptAddLook1UsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 再次申请售后 - post请求参数 */
export type _v1_bc_api_aftersale_spt_againAdd_post_req = Required<operations["sptAgainAddUsingPOST"]>['requestBody']['content']['application/json']
/** 再次申请售后 - post响应参数 */
export type _v1_bc_api_aftersale_spt_againAdd_post_res = Required<operations["sptAgainAddUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后详情 - get请求参数 */
export type _v1_bc_api_aftersale_sptApiDetails_get_req = Required<operations["sptDetailsUsingGET"]>['parameters']['query']
/** 适品屯售后详情 - get响应参数 */
export type _v1_bc_api_aftersale_sptApiDetails_get_res = Required<operations["sptDetailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后列表 - post请求参数 */
export type _v1_bc_api_aftersale_sptApiList_post_req = Required<operations["sptApiListUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯售后列表 - post响应参数 */
export type _v1_bc_api_aftersale_sptApiList_post_res = Required<operations["sptApiListUsingPOST"]>['responses'][200]['content']['*/*']

/** 申请仲裁 - post请求参数 */
export type _v1_bc_api_aftersale_sptApplyFor_arbitration_post_req = Required<operations["sptArbitrateUsingPOST"]>['requestBody']['content']['application/json']
/** 申请仲裁 - post响应参数 */
export type _v1_bc_api_aftersale_sptApplyFor_arbitration_post_res = Required<operations["sptArbitrateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 测试定时器 - get请求参数 */
export type _v1_bc_api_aftersale_test_get_req = Required<operations["testUsingGET"]>['parameters']['query']
/** 测试定时器 - get响应参数 */
export type _v1_bc_api_aftersale_test_get_res = Required<operations["testUsingGET"]>['responses'][200]['content']

/** type_list - get请求参数 */
export type _v1_bc_api_aftersale_type_list_get_req = Required<operations["type_listUsingGET"]>['parameters']['query']
/** type_list - get响应参数 */
export type _v1_bc_api_aftersale_type_list_get_res = Required<operations["type_listUsingGET"]>['responses'][200]['content']['*/*']

/** 适品屯确认收货 - post请求参数 */
export type _v1_bc_company_aftersale_afterConsent_post_req = Required<operations["afterConsentUsingPOST_1"]>['requestBody']['content']['application/json']
/** 适品屯确认收货 - post响应参数 */
export type _v1_bc_company_aftersale_afterConsent_post_res = Required<operations["afterConsentUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 适品屯批量同意退款和退货 - post请求参数 */
export type _v1_bc_company_aftersale_bulk_refund_post_req = Required<operations["sptBulkRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯批量同意退款和退货 - post响应参数 */
export type _v1_bc_company_aftersale_bulk_refund_post_res = Required<operations["sptBulkRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后地址展示 - get请求参数 */
export type _v1_bc_company_aftersale_getAddress_get_req = Required<operations["getAddressUsingGET"]>['parameters']['query']
/** 适品屯售后地址展示 - get响应参数 */
export type _v1_bc_company_aftersale_getAddress_get_res = Required<operations["getAddressUsingGET"]>['responses'][200]['content']['*/*']['data']

/** no_pass - post请求参数 */
export type _v1_bc_company_aftersale_nopass_post_req = Required<operations["no_passUsingPOST"]>['requestBody']['content']['application/json']
/** no_pass - post响应参数 */
export type _v1_bc_company_aftersale_nopass_post_res = Required<operations["no_passUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** pass - post请求参数 */
export type _v1_bc_company_aftersale_pass_post_req = Required<operations["passUsingPOST"]>['requestBody']['content']['application/json']
/** pass - post响应参数 */
export type _v1_bc_company_aftersale_pass_post_res = Required<operations["passUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** record_list - get请求参数 */
export type _v1_bc_company_aftersale_record_list_get_req = Required<operations["record_listUsingGET_1"]>['parameters']['query']
/** record_list - get响应参数 */
export type _v1_bc_company_aftersale_record_list_get_res = Required<operations["record_listUsingGET_1"]>['responses'][200]['content']['*/*']

/** 拒绝收货 - post请求参数 */
export type _v1_bc_company_aftersale_refuseReceiveGoods_post_req = Required<operations["refuseReceiveGoodsUsingPOST"]>['requestBody']['content']['application/json']
/** 拒绝收货 - post响应参数 */
export type _v1_bc_company_aftersale_refuseReceiveGoods_post_res = Required<operations["refuseReceiveGoodsUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后地址设置 - post请求参数 */
export type _v1_bc_company_aftersale_setAddress_post_req = Required<operations["setAddressUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯售后地址设置 - post响应参数 */
export type _v1_bc_company_aftersale_setAddress_post_res = Required<operations["setAddressUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后详情 - get请求参数 */
export type _v1_bc_company_aftersale_sptDetails_get_req = Required<operations["sptDetailsUsingGET_1"]>['parameters']['query']
/** 适品屯售后详情 - get响应参数 */
export type _v1_bc_company_aftersale_sptDetails_get_res = Required<operations["sptDetailsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 售后详列表 - get请求参数 */
export type _v1_bc_company_aftersale_sptDetailsByEntityId_get_req = Required<operations["sptDetailsByEntityUsingGET"]>['parameters']['query']
/** 售后详列表 - get响应参数 */
export type _v1_bc_company_aftersale_sptDetailsByEntityId_get_res = Required<operations["sptDetailsByEntityUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 适品屯仲裁举证 - post请求参数 */
export type _v1_bc_company_aftersale_sptEvidence_post_req = Required<operations["sptPutEvidenceUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯仲裁举证 - post响应参数 */
export type _v1_bc_company_aftersale_sptEvidence_post_res = Required<operations["sptPutEvidenceUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯售后列表 - post请求参数 */
export type _v1_bc_company_aftersale_sptList_post_req = Required<operations["sptListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 适品屯售后列表 - post响应参数 */
export type _v1_bc_company_aftersale_sptList_post_res = Required<operations["sptListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 适品屯商户是否同意售后 - post请求参数 */
export type _v1_bc_company_aftersale_sptMerchantAudit_post_req = Required<operations["sptMerchantAuditUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯商户是否同意售后 - post响应参数 */
export type _v1_bc_company_aftersale_sptMerchantAudit_post_res = Required<operations["sptMerchantAuditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯直接退款 - post请求参数 */
export type _v1_bc_company_aftersale_sptPass_post_req = Required<operations["sptPassUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯直接退款 - post响应参数 */
export type _v1_bc_company_aftersale_sptPass_post_res = Required<operations["sptPassUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 适品屯去发货 - post请求参数 */
export type _v1_bc_company_aftersale_toDeliverGoods_post_req = Required<operations["toDeliverGoodsUsingPOST"]>['requestBody']['content']['application/json']
/** 适品屯去发货 - post响应参数 */
export type _v1_bc_company_aftersale_toDeliverGoods_post_res = Required<operations["toDeliverGoodsUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_agency_add_post_req = Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_agency_add_post_res = Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** audit - post请求参数 */
export type _v1_bc_admin_agency_audit_post_req = Required<operations["auditUsingPOST"]>['requestBody']['content']['application/json']
/** audit - post响应参数 */
export type _v1_bc_admin_agency_audit_post_res = Required<operations["auditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_agency_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET_1"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_agency_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_agency_detail_get_req = Required<operations["detailUsingGET_3"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_agency_detail_get_res = Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_agency_doAction_post_req = Required<operations["doActionUsingPOST_1"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_agency_doAction_post_res = Required<operations["doActionUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** doPublish - post请求参数 */
export type _v1_bc_admin_agency_doPublish_post_req = Required<operations["doPublishUsingPOST"]>['requestBody']['content']['application/json']
/** doPublish - post响应参数 */
export type _v1_bc_admin_agency_doPublish_post_res = Required<operations["doPublishUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_agency_edit_post_req = Required<operations["editUsingPOST_1"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_agency_edit_post_res = Required<operations["editUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_agency_list_post_req = Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_agency_list_post_res = Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

/** detail - get请求参数 */
export type _v1_bc_app_agency_detail_get_req = Required<operations["detailUsingGET_4"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_app_agency_detail_get_res = Required<operations["detailUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_app_agency_list_post_req = Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_app_agency_list_post_res = Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

/** countCart - get请求参数 */
export type _v1_bc_admin_cart_count_get_req = Required<operations["countCartUsingGET"]>['parameters']['query']
/** countCart - get响应参数 */
export type _v1_bc_admin_cart_count_get_res = Required<operations["countCartUsingGET"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_cart_list_post_req = Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_cart_list_post_res = Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 创建购物车 - post请求参数 */
export type _v1_bc_app_cart_create_post_req = Required<operations["createUsingPOST"]>['requestBody']['content']['application/json']
/** 创建购物车 - post响应参数 */
export type _v1_bc_app_cart_create_post_res = Required<operations["createUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 删除购物车 - post请求参数 */
export type _v1_bc_app_cart_delete_post_req = Required<operations["deleteUsingPOST"]>['requestBody']['content']['application/json']
/** 删除购物车 - post响应参数 */
export type _v1_bc_app_cart_delete_post_res = Required<operations["deleteUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 下单所需数据 - get请求参数 */
export type _v1_bc_app_cart_purchase_view_get_req = Required<operations["getPurchaseInfoUsingGET"]>['parameters']['query']
/** 下单所需数据 - get响应参数 */
export type _v1_bc_app_cart_purchase_view_get_res = Required<operations["getPurchaseInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 修改购物车数 - post请求参数 */
export type _v1_bc_app_cart_quantity_update_post_req = Required<operations["updateQuantityUsingPOST"]>['requestBody']['content']['application/json']
/** 修改购物车数 - post响应参数 */
export type _v1_bc_app_cart_quantity_update_post_res = Required<operations["updateQuantityUsingPOST"]>['responses'][200]['content']['*/*']

/** 购物车列表 - get请求参数 */
export type _v1_bc_app_cart_service_list_get_req = Required<operations["serviceListUsingGET"]>['parameters']['query']
/** 购物车列表 - get响应参数 */
export type _v1_bc_app_cart_service_list_get_res = Required<operations["serviceListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 创建购物车 - post请求参数 */
export type _v1_product_app_cart_create_post_req = Required<operations["createUsingPOST_1"]>['requestBody']['content']['application/json']
/** 创建购物车 - post响应参数 */
export type _v1_product_app_cart_create_post_res = Required<operations["createUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 购物车列表 - get请求参数 */
export type _v1_product_app_cart_list_get_req = Required<operations["listUsingGET_1"]>['parameters']['query']
/** 购物车列表 - get响应参数 */
export type _v1_product_app_cart_list_get_res = Required<operations["listUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 下单所需数据 - get请求参数 */
export type _v1_product_app_cart_purchase_view_get_req = Required<operations["getPurchaseInfoUsingGET_1"]>['parameters']['query']
/** 下单所需数据 - get响应参数 */
export type _v1_product_app_cart_purchase_view_get_res = Required<operations["getPurchaseInfoUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 修改购物车数 - post请求参数 */
export type _v1_product_app_cart_quantity_update_post_req = Required<operations["updateQuantityUsingPOST_1"]>['requestBody']['content']['application/json']
/** 修改购物车数 - post响应参数 */
export type _v1_product_app_cart_quantity_update_post_res = Required<operations["updateQuantityUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 添加 - post请求参数 */
export type _v1_bc_admin_category_add_post_req = Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_admin_category_add_post_res = Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 类目 - get请求参数 */
export type _v1_bc_admin_category_all_get_req = Required<operations["allUsingGET"]>['parameters']['query']
/** 类目 - get响应参数 */
export type _v1_bc_admin_category_all_get_res = Required<operations["allUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取类目佣金 - get请求参数 */
export type _v1_bc_admin_category_commission_get_req = Required<operations["commissionUsingGET"]>['parameters']['query']
/** 获取类目佣金 - get响应参数 */
export type _v1_bc_admin_category_commission_get_res = Required<operations["commissionUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取类目列表 - post请求参数 */
export type _v1_bc_admin_category_list_activity_post_req = Required<operations["listForActivityUsingPOST"]>['requestBody']['content']['application/json']
/** 获取类目列表 - post响应参数 */
export type _v1_bc_admin_category_list_activity_post_res = Required<operations["listForActivityUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 编辑 - post请求参数 */
export type _v1_bc_admin_category_modify_post_req = Required<operations["modifyUsingPOST"]>['requestBody']['content']['application/json']
/** 编辑 - post响应参数 */
export type _v1_bc_admin_category_modify_post_res = Required<operations["modifyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 类目删除 - post请求参数 */
export type _v1_bc_admin_category_remove_post_req = Required<operations["batchRemoveUsingPOST"]>['requestBody']['content']['application/json']
/** 类目删除 - post响应参数 */
export type _v1_bc_admin_category_remove_post_res = Required<operations["batchRemoveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 类目排序 - post请求参数 */
export type _v1_bc_admin_category_sort_post_req = Required<operations["batchSortUsingPOST"]>['requestBody']['content']['application/json']
/** 类目排序 - post响应参数 */
export type _v1_bc_admin_category_sort_post_res = Required<operations["batchSortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 类目上下架 - post请求参数 */
export type _v1_bc_admin_category_status_post_req = Required<operations["setStatusUsingPOST"]>['requestBody']['content']['application/json']
/** 类目上下架 - post响应参数 */
export type _v1_bc_admin_category_status_post_res = Required<operations["setStatusUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 同步内容类目 - get请求参数 */
export type _v1_bc_admin_category_syncContentCategory_get_req = Required<operations["syncContentCategoryUsingGET"]>['parameters']['query']
/** 同步内容类目 - get响应参数 */
export type _v1_bc_admin_category_syncContentCategory_get_res = Required<operations["syncContentCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 类目树 - get请求参数 */
export type _v1_bc_admin_category_tree_get_req = Required<operations["treeUsingGET"]>['parameters']['query']
/** 类目树 - get响应参数 */
export type _v1_bc_admin_category_tree_get_res = Required<operations["treeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 分类列表 - get请求参数 */
export type _v1_bc_app_category_getList_get_req = Required<operations["getListUsingGET"]>['parameters']['query']
/** 分类列表 - get响应参数 */
export type _v1_bc_app_category_getList_get_res = Required<operations["getListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取子类目的商品信息 - get请求参数 */
export type _v1_bc_app_category_getSonListWithProduct_get_req = Required<operations["getSonListWithProductUsingGET"]>['parameters']['query']
/** 获取子类目的商品信息 - get响应参数 */
export type _v1_bc_app_category_getSonListWithProduct_get_res = Required<operations["getSonListWithProductUsingGET"]>['responses'][200]['content']['*/*']

/** getCategoryByIds - get请求参数 */
export type _v1_bc_merchant_category_byIds_get_req = Required<operations["getCategoryByIdsUsingGET"]>['parameters']['query']
/** getCategoryByIds - get响应参数 */
export type _v1_bc_merchant_category_byIds_get_res = Required<operations["getCategoryByIdsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getCategoryTree - get请求参数 */
export type _v1_bc_merchant_category_tree_get_req = Required<operations["getCategoryTreeUsingGET"]>['parameters']['query']
/** getCategoryTree - get响应参数 */
export type _v1_bc_merchant_category_tree_get_res = Required<operations["getCategoryTreeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 类目 - get请求参数 */
export type _v1_bc_server_category_list_get_req = Required<operations["listUsingGET_2"]>['parameters']['query']
/** 类目 - get响应参数 */
export type _v1_bc_server_category_list_get_res = Required<operations["listUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_admin_category_show_delete_post_req = Required<operations["deleteUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_category_show_delete_post_res = Required<operations["deleteUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 列表 - get请求参数 */
export type _v1_bc_admin_category_show_list_get_req = Required<operations["listUsingGET_3"]>['parameters']['query']
/** 列表 - get响应参数 */
export type _v1_bc_admin_category_show_list_get_res = Required<operations["listUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 添加 - post请求参数 */
export type _v1_bc_admin_category_show_save_post_req = Required<operations["saveUsingPOST"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_admin_category_show_save_post_res = Required<operations["saveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 排序 - post请求参数 */
export type _v1_bc_admin_category_show_sort_post_req = Required<operations["sortUsingPOST"]>['requestBody']['content']['application/json']
/** 排序 - post响应参数 */
export type _v1_bc_admin_category_show_sort_post_res = Required<operations["sortUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 同步内容前台类目 - get请求参数 */
export type _v1_bc_admin_category_show_syncContentCategoryShow_get_req = Required<operations["syncContentCategoryShowUsingGET"]>['parameters']['query']
/** 同步内容前台类目 - get响应参数 */
export type _v1_bc_admin_category_show_syncContentCategoryShow_get_res = Required<operations["syncContentCategoryShowUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务列表 - post请求参数 */
export type _v1_bc_app_category_show_item_list_post_req = Required<operations["itemListUsingPOST"]>['requestBody']['content']['application/json']
/** 服务列表 - post响应参数 */
export type _v1_bc_app_category_show_item_list_post_res = Required<operations["itemListUsingPOST"]>['responses'][200]['content']['*/*']

/** 类目列表 - get请求参数 */
export type _v1_bc_app_category_show_list_get_req = Required<operations["listUsingGET_4"]>['parameters']['query']
/** 类目列表 - get响应参数 */
export type _v1_bc_app_category_show_list_get_res = Required<operations["listUsingGET_4"]>['responses'][200]['content']['*/*']['data']

/** 商品列表 - post请求参数 */
export type _v1_bc_app_category_show_product_list_post_req = Required<operations["productListUsingPOST"]>['requestBody']['content']['application/json']
/** 商品列表 - post响应参数 */
export type _v1_bc_app_category_show_product_list_post_res = Required<operations["productListUsingPOST"]>['responses'][200]['content']['*/*']

/** recommendProductList - get请求参数 */
export type _v1_bc_app_category_show_recommend_product_list_get_req = Required<operations["recommendProductListUsingGET"]>['parameters']['query']
/** recommendProductList - get响应参数 */
export type _v1_bc_app_category_show_recommend_product_list_get_res = Required<operations["recommendProductListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 店铺商品列表 - get请求参数 */
export type _v1_bc_app_category_show_shop_product_list_get_req = Required<operations["shopProductListUsingGET"]>['parameters']['query']
/** 店铺商品列表 - get响应参数 */
export type _v1_bc_app_category_show_shop_product_list_get_res = Required<operations["shopProductListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_company_comment_list_post_req = Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_company_comment_list_post_res = Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** 消息类型查看 - get请求参数 */
export type _v1_bc_common_message_list_get_req = Required<operations["MessageTypeLookUsingGET"]>['parameters']['query']
/** 消息类型查看 - get响应参数 */
export type _v1_bc_common_message_list_get_res = Required<operations["MessageTypeLookUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取二级分类 - get请求参数 */
export type _v1_bc_app_common_getCategoryByPid_get_req = Required<operations["categoryListByPidUsingGET"]>['parameters']['query']
/** 获取二级分类 - get响应参数 */
export type _v1_bc_app_common_getCategoryByPid_get_res = Required<operations["categoryListByPidUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取适品囤分类 - get请求参数 */
export type _v1_bc_app_common_getProductCategory_get_req = Required<operations["getProductCategoryUsingGET"]>['parameters']['query']
/** 获取适品囤分类 - get响应参数 */
export type _v1_bc_app_common_getProductCategory_get_res = Required<operations["getProductCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取子类目的商品信息 - post请求参数 */
export type _v1_bc_app_common_getSonListWithProduct_post_req = Required<operations["getSonListWithProductUsingPOST"]>['requestBody']['content']['application/json']
/** 获取子类目的商品信息 - post响应参数 */
export type _v1_bc_app_common_getSonListWithProduct_post_res = Required<operations["getSonListWithProductUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取一级分类 - get请求参数 */
export type _v1_bc_app_common_getTopCategory_get_req = Required<operations["getListUsingGET_1"]>['parameters']['query']
/** 获取一级分类 - get响应参数 */
export type _v1_bc_app_common_getTopCategory_get_res = Required<operations["getListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 服务列表 - post请求参数 */
export type _v1_bc_app_common_itemList_post_req = Required<operations["itemListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 服务列表 - post响应参数 */
export type _v1_bc_app_common_itemList_post_res = Required<operations["itemListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** addTotal - post请求参数 */
export type _v1_bc_admin_coupon_add_total_post_req = Required<operations["addTotalUsingPOST"]>['requestBody']['content']['application/json']
/** addTotal - post响应参数 */
export type _v1_bc_admin_coupon_add_total_post_res = Required<operations["addTotalUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_coupon_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET_2"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_coupon_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_coupon_delete_post_req = Required<operations["doActionUsingPOST_2"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_coupon_delete_post_res = Required<operations["doActionUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_coupon_detail_get_req = Required<operations["detailUsingGET_5"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_coupon_detail_get_res = Required<operations["detailUsingGET_5"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_coupon_doAction_post_req = Required<operations["doActionUsingPOST_3"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_coupon_doAction_post_res = Required<operations["doActionUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_coupon_list_post_req = Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_coupon_list_post_res = Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_coupon_save_post_req = Required<operations["updateOrCreateUsingPOST"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_coupon_save_post_res = Required<operations["updateOrCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** grantedUserList - post请求参数 */
export type _v1_bc_admin_coupon_user_list_post_req = Required<operations["grantedUserListUsingPOST"]>['requestBody']['content']['application/json']
/** grantedUserList - post响应参数 */
export type _v1_bc_admin_coupon_user_list_post_res = Required<operations["grantedUserListUsingPOST"]>['responses'][200]['content']['*/*']

/** checkCoupon - post请求参数 */
export type _v1_bc_app_coupon_check_post_req = Required<operations["checkCouponUsingPOST"]>['requestBody']['content']['application/json']
/** checkCoupon - post响应参数 */
export type _v1_bc_app_coupon_check_post_res = Required<operations["checkCouponUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** getCoupon - post请求参数 */
export type _v1_bc_app_coupon_collect_post_req = Required<operations["getCouponUsingPOST_1"]>['requestBody']['content']['application/json']
/** getCoupon - post响应参数 */
export type _v1_bc_app_coupon_collect_post_res = Required<operations["getCouponUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** get_for_item - get请求参数 */
export type _v1_bc_app_coupon_for_item_get_req = Required<operations["get_for_itemUsingGET"]>['parameters']['query']
/** get_for_item - get响应参数 */
export type _v1_bc_app_coupon_for_item_get_res = Required<operations["get_for_itemUsingGET"]>['responses'][200]['content']['*/*']['data']

/** granted_list - post请求参数 */
export type _v1_bc_app_coupon_granted_list_post_req = Required<operations["granted_listUsingPOST"]>['requestBody']['content']['application/json']
/** granted_list - post响应参数 */
export type _v1_bc_app_coupon_granted_list_post_res = Required<operations["granted_listUsingPOST"]>['responses'][200]['content']['*/*']

/** list - post请求参数 */
export type _v1_bc_app_coupon_list_post_req = Required<operations["listUsingPOST_6"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_app_coupon_list_post_res = Required<operations["listUsingPOST_6"]>['responses'][200]['content']['*/*']

/** getCouponGranted - post请求参数 */
export type _v1_bc_app_coupon_use_list_post_req = Required<operations["getCouponGrantedUsingPOST"]>['requestBody']['content']['application/json']
/** getCouponGranted - post响应参数 */
export type _v1_bc_app_coupon_use_list_post_res = Required<operations["getCouponGrantedUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** getPlatformGranted - post请求参数 */
export type _v1_bc_app_coupon_use_platform_post_req = Required<operations["getPlatformGrantedUsingPOST"]>['requestBody']['content']['application/json']
/** getPlatformGranted - post响应参数 */
export type _v1_bc_app_coupon_use_platform_post_res = Required<operations["getPlatformGrantedUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_estimate_grade_add_post_req = Required<operations["addUsingPOST_3"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_estimate_grade_add_post_res = Required<operations["addUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_estimate_grade_edit_post_req = Required<operations["editUsingPOST_2"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_estimate_grade_edit_post_res = Required<operations["editUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_estimate_grade_list_post_req = Required<operations["listUsingPOST_7"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_estimate_grade_list_post_res = Required<operations["listUsingPOST_7"]>['responses'][200]['content']['*/*']

/** add - post请求参数 */
export type _v1_bc_admin_estimate_question_add_post_req = Required<operations["addUsingPOST_4"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_estimate_question_add_post_res = Required<operations["addUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** categoryList - get请求参数 */
export type _v1_bc_admin_estimate_question_categoryList_get_req = Required<operations["categoryListUsingGET"]>['parameters']['query']
/** categoryList - get响应参数 */
export type _v1_bc_admin_estimate_question_categoryList_get_res = Required<operations["categoryListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_estimate_question_del_post_req = Required<operations["delUsingPOST"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_estimate_question_del_post_res = Required<operations["delUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_estimate_question_detail_get_req = Required<operations["detailUsingGET_6"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_estimate_question_detail_get_res = Required<operations["detailUsingGET_6"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_estimate_question_edit_post_req = Required<operations["editUsingPOST_3"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_estimate_question_edit_post_res = Required<operations["editUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_estimate_question_list_post_req = Required<operations["listUsingPOST_8"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_estimate_question_list_post_res = Required<operations["listUsingPOST_8"]>['responses'][200]['content']['*/*']

/** sort - post请求参数 */
export type _v1_bc_admin_estimate_question_sort_post_req = Required<operations["sortUsingPOST_1"]>['requestBody']['content']['application/json']
/** sort - post响应参数 */
export type _v1_bc_admin_estimate_question_sort_post_res = Required<operations["sortUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** estimate - post请求参数 */
export type _v1_bc_app_estimate_question_estimate_post_req = Required<operations["estimateUsingPOST"]>['requestBody']['content']['application/json']
/** estimate - post响应参数 */
export type _v1_bc_app_estimate_question_estimate_post_res = Required<operations["estimateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_app_estimate_question_list_get_req = Required<operations["listUsingGET_5"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_app_estimate_question_list_get_res = Required<operations["listUsingGET_5"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_estimate_record_detail_get_req = Required<operations["detailUsingGET_7"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_estimate_record_detail_get_res = Required<operations["detailUsingGET_7"]>['responses'][200]['content']['*/*']['data']

/** list - get请求参数 */
export type _v1_bc_admin_estimate_record_list_get_req = Required<operations["listUsingGET_6"]>['parameters']['query']
/** list - get响应参数 */
export type _v1_bc_admin_estimate_record_list_get_res = Required<operations["listUsingGET_6"]>['responses'][200]['content']['*/*']['data']

/** 快递100回调 - post请求参数 */
export type _v1_bc_app_kuaidi_express_callback_post_req = Required<operations["callbackUsingPOST"]>['requestBody']
/** 快递100回调 - post响应参数 */
export type _v1_bc_app_kuaidi_express_callback_post_res = Required<operations["callbackUsingPOST"]>['responses'][200]['content']['*/*']

/** 快递公司查看 - get请求参数 */
export type _v1_bc_app_kuaidi_express_company_list_get_req = Required<operations["ExpressLookUsingGET"]>['parameters']['query']
/** 快递公司查看 - get响应参数 */
export type _v1_bc_app_kuaidi_express_company_list_get_res = Required<operations["ExpressLookUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 判断是否签收 - get请求参数 */
export type _v1_bc_app_kuaidi_express_isSign_get_req = Required<operations["expressIsSignUsingGET"]>['parameters']['query']
/** 判断是否签收 - get响应参数 */
export type _v1_bc_app_kuaidi_express_isSign_get_res = Required<operations["expressIsSignUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 判断是否签收 - get请求参数 */
export type _v1_bc_app_kuaidi_express_isSign_nu_get_req = Required<operations["expressIsSignUsingGET_1"]>['parameters']['query']
/** 判断是否签收 - get响应参数 */
export type _v1_bc_app_kuaidi_express_isSign_nu_get_res = Required<operations["expressIsSignUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 快递100订阅 - post请求参数 */
export type _v1_bc_app_kuaidi_express_pushExpress_post_req = Required<operations["pushExpressUsingPOST"]>['requestBody']['content']['application/json']
/** 快递100订阅 - post响应参数 */
export type _v1_bc_app_kuaidi_express_pushExpress_post_res = Required<operations["pushExpressUsingPOST"]>['responses'][200]['content']['*/*']

/** 快递实时查看 - post请求参数 */
export type _v1_bc_app_kuaidi_express_realtimeLookExpress_post_req = Required<operations["RealtimeLookExpressUsingPOST"]>['requestBody']['content']['application/json']
/** 快递实时查看 - post响应参数 */
export type _v1_bc_app_kuaidi_express_realtimeLookExpress_post_res = Required<operations["RealtimeLookExpressUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 物流轨迹图 - post请求参数 */
export type _v1_bc_app_kuaidi_express_trajectory_post_req = Required<operations["expressTrajectoryUsingPOST"]>['requestBody']['content']['application/json']
/** 物流轨迹图 - post响应参数 */
export type _v1_bc_app_kuaidi_express_trajectory_post_res = Required<operations["expressTrajectoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单 快递查看 - get请求参数 */
export type _v1_bc_app_kuaidi_realtime_order_view_get_req = Required<operations["batchFetchExpressInfoUsingGET"]>['parameters']['query']
/** 订单 快递查看 - get响应参数 */
export type _v1_bc_app_kuaidi_realtime_order_view_get_res = Required<operations["batchFetchExpressInfoUsingGET"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_health_add_post_req = Required<operations["addUsingPOST_5"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_health_add_post_res = Required<operations["addUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** audit - post请求参数 */
export type _v1_bc_admin_health_audit_post_req = Required<operations["auditUsingPOST_1"]>['requestBody']['content']['application/json']
/** audit - post响应参数 */
export type _v1_bc_admin_health_audit_post_res = Required<operations["auditUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_health_detail_get_req = Required<operations["detailUsingGET_8"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_health_detail_get_res = Required<operations["detailUsingGET_8"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_health_doAction_post_req = Required<operations["doActionUsingPOST_4"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_health_doAction_post_res = Required<operations["doActionUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** doPublish - post请求参数 */
export type _v1_bc_admin_health_doPublish_post_req = Required<operations["doPublishUsingPOST_1"]>['requestBody']['content']['application/json']
/** doPublish - post响应参数 */
export type _v1_bc_admin_health_doPublish_post_res = Required<operations["doPublishUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_health_edit_post_req = Required<operations["editUsingPOST_4"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_health_edit_post_res = Required<operations["editUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_health_list_post_req = Required<operations["listUsingPOST_9"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_health_list_post_res = Required<operations["listUsingPOST_9"]>['responses'][200]['content']['*/*']

/** detail - get请求参数 */
export type _v1_bc_app_health_detail_get_req = Required<operations["detailUsingGET_9"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_app_health_detail_get_res = Required<operations["detailUsingGET_9"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_app_health_list_post_req = Required<operations["listUsingPOST_10"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_app_health_list_post_res = Required<operations["listUsingPOST_10"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_admin_home_mould_delete_post_req = Required<operations["deleteUsingPOST_2"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_home_mould_delete_post_res = Required<operations["deleteUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_admin_home_mould_detail_get_req = Required<operations["detailUsingGET_10"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_home_mould_detail_get_res = Required<operations["detailUsingGET_10"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_home_mould_list_post_req = Required<operations["listUsingPOST_11"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_home_mould_list_post_res = Required<operations["listUsingPOST_11"]>['responses'][200]['content']['*/*']

/** 发布 - post请求参数 */
export type _v1_bc_admin_home_mould_publish_post_req = Required<operations["sortUsingPOST_2"]>['requestBody']['content']['application/json']
/** 发布 - post响应参数 */
export type _v1_bc_admin_home_mould_publish_post_res = Required<operations["sortUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 添加 - post请求参数 */
export type _v1_bc_admin_home_mould_save_post_req = Required<operations["saveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 添加 - post响应参数 */
export type _v1_bc_admin_home_mould_save_post_res = Required<operations["saveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 模板数据 - get请求参数 */
export type _v1_bc_app_home_mould_data_get_req = Required<operations["getMouldUsingGET"]>['parameters']['query']
/** 模板数据 - get响应参数 */
export type _v1_bc_app_home_mould_data_get_res = Required<operations["getMouldUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 城市 - get请求参数 */
export type _v1_bc_admin_hospital_city_get_req = Required<operations["cityUsingGET"]>['parameters']['query']
/** 城市 - get响应参数 */
export type _v1_bc_admin_hospital_city_get_res = Required<operations["cityUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 创建 - post请求参数 */
export type _v1_bc_admin_hospital_create_post_req = Required<operations["createUsingPOST_2"]>['requestBody']['content']['application/json']
/** 创建 - post响应参数 */
export type _v1_bc_admin_hospital_create_post_res = Required<operations["createUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 区 - get请求参数 */
export type _v1_bc_admin_hospital_district_get_req = Required<operations["districtUsingGET"]>['parameters']['query']
/** 区 - get响应参数 */
export type _v1_bc_admin_hospital_district_get_res = Required<operations["districtUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 等级 - get请求参数 */
export type _v1_bc_admin_hospital_level_get_req = Required<operations["levelUsingGET"]>['parameters']['query']
/** 等级 - get响应参数 */
export type _v1_bc_admin_hospital_level_get_res = Required<operations["levelUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_hospital_list_post_req = Required<operations["listByPageUsingPOST"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_hospital_list_post_res = Required<operations["listByPageUsingPOST"]>['responses'][200]['content']['*/*']

/** 修改 - post请求参数 */
export type _v1_bc_admin_hospital_modify_post_req = Required<operations["modifyUsingPOST_1"]>['requestBody']['content']['application/json']
/** 修改 - post响应参数 */
export type _v1_bc_admin_hospital_modify_post_res = Required<operations["modifyUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_admin_hospital_remove_post_req = Required<operations["removeUsingPOST"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_hospital_remove_post_res = Required<operations["removeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 详情 - post请求参数 */
export type _v1_bc_app_hospital_detail_post_req = Required<operations["detailUsingPOST"]>['parameters']['query']
/** 详情 - post响应参数 */
export type _v1_bc_app_hospital_detail_post_res = Required<operations["detailUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_app_hospital_list_post_req = Required<operations["listByPageUsingPOST_1"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_app_hospital_list_post_res = Required<operations["listByPageUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 列表 - post请求参数 */
export type _v1_bc_merchant_hospital_list_post_req = Required<operations["listByPageUsingPOST_2"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_merchant_hospital_list_post_res = Required<operations["listByPageUsingPOST_2"]>['responses'][200]['content']['*/*']

/** addFile - post请求参数 */
export type _v1_bc_admin_image_space_add_file_post_req = Required<operations["addFileUsingPOST"]>['requestBody']['content']['application/json']
/** addFile - post响应参数 */
export type _v1_bc_admin_image_space_add_file_post_res = Required<operations["addFileUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** addFolder - post请求参数 */
export type _v1_bc_admin_image_space_add_folder_post_req = Required<operations["addFolderUsingPOST"]>['requestBody']['content']['application/json']
/** addFolder - post响应参数 */
export type _v1_bc_admin_image_space_add_folder_post_res = Required<operations["addFolderUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** addFile - post请求参数 */
export type _v1_bc_admin_image_space_del_post_req = Required<operations["addFileUsingPOST_1"]>['requestBody']['content']['application/json']
/** addFile - post响应参数 */
export type _v1_bc_admin_image_space_del_post_res = Required<operations["addFileUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_image_space_detail_get_req = Required<operations["detailUsingGET_11"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_image_space_detail_get_res = Required<operations["detailUsingGET_11"]>['responses'][200]['content']['*/*']['data']

/** getItree - get请求参数 */
export type _v1_bc_admin_image_space_list_get_req = Required<operations["getItreeUsingGET"]>['parameters']['query']
/** getItree - get响应参数 */
export type _v1_bc_admin_image_space_list_get_res = Required<operations["getItreeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_admin_audit_detail_get_req = Required<operations["detailUsingGET_12"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_audit_detail_get_res = Required<operations["detailUsingGET_12"]>['responses'][200]['content']['*/*']['data']

/** 通过/驳回 - post请求参数 */
export type _v1_bc_admin_audit_doAction_post_req = Required<operations["doActionUsingPOST_5"]>['requestBody']['content']['application/json']
/** 通过/驳回 - post响应参数 */
export type _v1_bc_admin_audit_doAction_post_res = Required<operations["doActionUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_audit_list_post_req = Required<operations["listByPageUsingPOST_3"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_audit_list_post_res = Required<operations["listByPageUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 列表 - post请求参数 */
export type _v1_bc_merchant_draft_list_post_req = Required<operations["listByPageUsingPOST_4"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_merchant_draft_list_post_res = Required<operations["listByPageUsingPOST_4"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_merchant_draft_remove_post_req = Required<operations["batchRemoveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_merchant_draft_remove_post_res = Required<operations["batchRemoveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_merchant_item_detail_get_req = Required<operations["detailUsingGET_13"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_merchant_item_detail_get_res = Required<operations["detailUsingGET_13"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_item_detail_get_req = Required<operations["detailUsingGET_14"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_item_detail_get_res = Required<operations["detailUsingGET_14"]>['responses'][200]['content']['*/*']['data']

/** 上架/下架 - post请求参数 */
export type _v1_bc_admin_item_doAction_post_req = Required<operations["doActionUsingPOST_6"]>['requestBody']['content']['application/json']
/** 上架/下架 - post响应参数 */
export type _v1_bc_admin_item_doAction_post_res = Required<operations["doActionUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_admin_item_list_post_req = Required<operations["listByPageUsingPOST_5"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_admin_item_list_post_res = Required<operations["listByPageUsingPOST_5"]>['responses'][200]['content']['*/*']

/** 服务列表 - post请求参数 */
export type _v1_bc_app_item_all_post_req = Required<operations["getAllListUsingPOST"]>['requestBody']['content']['application/json']
/** 服务列表 - post响应参数 */
export type _v1_bc_app_item_all_post_res = Required<operations["getAllListUsingPOST"]>['responses'][200]['content']['*/*']

/** clear cache - get请求参数 */
export type _v1_bc_app_item_clear_get_req = Required<operations["clearUsingGET"]>['parameters']['query']
/** clear cache - get响应参数 */
export type _v1_bc_app_item_clear_get_res = Required<operations["clearUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务详情 - get请求参数 */
export type _v1_bc_app_item_detail_get_req = Required<operations["detailUsingGET_15"]>['parameters']['query']
/** 服务详情 - get响应参数 */
export type _v1_bc_app_item_detail_get_res = Required<operations["detailUsingGET_15"]>['responses'][200]['content']['*/*']['data']

/** 获取服务供es 手动自动导入 - post请求参数 */
export type _v1_bc_app_item_es_list_post_req = Required<operations["getItemListUsingPOST"]>['requestBody']['content']['application/json']
/** 获取服务供es 手动自动导入 - post响应参数 */
export type _v1_bc_app_item_es_list_post_res = Required<operations["getItemListUsingPOST"]>['responses'][200]['content']['*/*']

/** 搜索框推荐 - get请求参数 */
export type _v1_bc_app_item_featured_get_req = Required<operations["featuredUsingGET"]>['parameters']['query']
/** 搜索框推荐 - get响应参数 */
export type _v1_bc_app_item_featured_get_res = Required<operations["featuredUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务列表 - post请求参数 */
export type _v1_bc_app_item_list_post_req = Required<operations["getListUsingPOST"]>['requestBody']['content']['application/json']
/** 服务列表 - post响应参数 */
export type _v1_bc_app_item_list_post_res = Required<operations["getListUsingPOST"]>['responses'][200]['content']['*/*']

/** 上架/下架 - post请求参数 */
export type _v1_bc_merchant_item_doAction_post_req = Required<operations["doActionUsingPOST_7"]>['requestBody']['content']['application/json']
/** 上架/下架 - post响应参数 */
export type _v1_bc_merchant_item_doAction_post_res = Required<operations["doActionUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

/** 上架/下架 - post请求参数 */
export type _v1_bc_merchant_item_doPublish_post_req = Required<operations["doPublishUsingPOST_2"]>['requestBody']['content']['application/json']
/** 上架/下架 - post响应参数 */
export type _v1_bc_merchant_item_doPublish_post_res = Required<operations["doPublishUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 添加服务规格 - post请求参数 */
export type _v1_bc_merchant_item_draft_post_req = Required<operations["draftUsingPOST"]>['requestBody']['content']['application/json']
/** 添加服务规格 - post响应参数 */
export type _v1_bc_merchant_item_draft_post_res = Required<operations["draftUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_merchant_item_list_post_req = Required<operations["listByPageUsingPOST_6"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_merchant_item_list_post_res = Required<operations["listByPageUsingPOST_6"]>['responses'][200]['content']['*/*']

/** 提前下单单位 - get请求参数 */
export type _v1_bc_merchant_item_orderUnit_get_req = Required<operations["orderUnitUsingGET"]>['parameters']['query']
/** 提前下单单位 - get响应参数 */
export type _v1_bc_merchant_item_orderUnit_get_res = Required<operations["orderUnitUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_merchant_item_remove_post_req = Required<operations["batchRemoveUsingPOST_2"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_merchant_item_remove_post_res = Required<operations["batchRemoveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 快照 - get请求参数 */
export type _v1_bc_merchant_item_snapshot_get_req = Required<operations["snapshotUsingGET"]>['parameters']['query']
/** 快照 - get响应参数 */
export type _v1_bc_merchant_item_snapshot_get_res = Required<operations["snapshotUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 编辑服务规格 - post请求参数 */
export type _v1_bc_merchant_item_submit_post_req = Required<operations["submitUsingPOST"]>['requestBody']['content']['application/json']
/** 编辑服务规格 - post响应参数 */
export type _v1_bc_merchant_item_submit_post_res = Required<operations["submitUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 单位 - get请求参数 */
export type _v1_bc_merchant_item_unit_get_req = Required<operations["unitUsingGET"]>['parameters']['query']
/** 单位 - get响应参数 */
export type _v1_bc_merchant_item_unit_get_res = Required<operations["unitUsingGET"]>['responses'][200]['content']['*/*']['data']

/** clockJobRecord - get请求参数 */
export type _v1_bc_merchant_clock_clockJobRecord_get_req = Required<operations["clockJobRecordUsingGET"]>['parameters']['query']
/** clockJobRecord - get响应参数 */
export type _v1_bc_merchant_clock_clockJobRecord_get_res = Required<operations["clockJobRecordUsingGET"]>['responses'][200]['content']['*/*']['data']

/** jobClockWorker - get请求参数 */
export type _v1_bc_merchant_clock_clockJobWorker_get_req = Required<operations["jobClockWorkerUsingGET"]>['parameters']['query']
/** jobClockWorker - get响应参数 */
export type _v1_bc_merchant_clock_clockJobWorker_get_res = Required<operations["jobClockWorkerUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 排班统计 - get请求参数 */
export type _v1_bc_merchant_clock_detail_get_req = Required<operations["detailUsingGET_16"]>['parameters']['query']
/** 排班统计 - get响应参数 */
export type _v1_bc_merchant_clock_detail_get_res = Required<operations["detailUsingGET_16"]>['responses'][200]['content']['*/*']['data']

/** 排班统计 - post请求参数 */
export type _v1_bc_merchant_clock_list_post_req = Required<operations["scheduleStatisticUsingPOST"]>['requestBody']['content']['application/json']
/** 排班统计 - post响应参数 */
export type _v1_bc_merchant_clock_list_post_res = Required<operations["scheduleStatisticUsingPOST"]>['responses'][200]['content']['*/*']

/** planStatistics - get请求参数 */
export type _v1_bc_merchant_clock_plan_statistics_get_req = Required<operations["planStatisticsUsingGET"]>['parameters']['query']
/** planStatistics - get响应参数 */
export type _v1_bc_merchant_clock_plan_statistics_get_res = Required<operations["planStatisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** planStatistics2 - get请求参数 */
export type _v1_bc_merchant_clock_statistics_get_req = Required<operations["planStatistics2UsingGET"]>['parameters']['query']
/** planStatistics2 - get响应参数 */
export type _v1_bc_merchant_clock_statistics_get_res = Required<operations["planStatistics2UsingGET"]>['responses'][200]['content']['*/*']['data']

/** planStatistic - get请求参数 */
export type _v1_bc_server_clock_statistics_get_req = Required<operations["planStatisticUsingGET"]>['parameters']['query']
/** planStatistic - get响应参数 */
export type _v1_bc_server_clock_statistics_get_res = Required<operations["planStatisticUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 结束工单 - post请求参数 */
export type _v1_bc_admin_job_close_post_req = Required<operations["closeJobUsingPOST"]>['requestBody']['content']['application/json']
/** 结束工单 - post响应参数 */
export type _v1_bc_admin_job_close_post_res = Required<operations["closeJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 工单详情 - get请求参数 */
export type _v1_bc_admin_job_detail_get_req = Required<operations["detailUsingGET_17"]>['parameters']['query']
/** 工单详情 - get响应参数 */
export type _v1_bc_admin_job_detail_get_res = Required<operations["detailUsingGET_17"]>['responses'][200]['content']['*/*']['data']

/** 工单列表 - post请求参数 */
export type _v1_bc_admin_job_list_post_req = Required<operations["listUsingPOST_12"]>['requestBody']['content']['application/json']
/** 工单列表 - post响应参数 */
export type _v1_bc_admin_job_list_post_res = Required<operations["listUsingPOST_12"]>['responses'][200]['content']['*/*']

/** 用户工单列表 - post请求参数 */
export type _v1_bc_admin_job_person_post_req = Required<operations["personJobListUsingPOST"]>['requestBody']['content']['application/json']
/** 用户工单列表 - post响应参数 */
export type _v1_bc_admin_job_person_post_res = Required<operations["personJobListUsingPOST"]>['responses'][200]['content']['*/*']

/** 授理工单 - post请求参数 */
export type _v1_bc_merchant_job_accepted_post_req = Required<operations["acceptedJobUsingPOST"]>['requestBody']['content']['application/json']
/** 授理工单 - post响应参数 */
export type _v1_bc_merchant_job_accepted_post_res = Required<operations["acceptedJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 指派 - post请求参数 */
export type _v1_bc_merchant_job_assign_post_req = Required<operations["assignUsingPOST"]>['requestBody']['content']['application/json']
/** 指派 - post响应参数 */
export type _v1_bc_merchant_job_assign_post_res = Required<operations["assignUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 取消工单 - post请求参数 */
export type _v1_bc_merchant_job_cancel_post_req = Required<operations["cancelUsingPOST"]>['requestBody']['content']['application/json']
/** 取消工单 - post响应参数 */
export type _v1_bc_merchant_job_cancel_post_res = Required<operations["cancelUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 任务详情 - get请求参数 */
export type _v1_bc_merchant_job_detail_get_req = Required<operations["detailUsingGET_18"]>['parameters']['query']
/** 任务详情 - get响应参数 */
export type _v1_bc_merchant_job_detail_get_res = Required<operations["detailUsingGET_18"]>['responses'][200]['content']['*/*']['data']

/** 工单费用设置 - get请求参数 */
export type _v1_bc_merchant_job_fee_get_req = Required<operations["feeUsingGET"]>['parameters']['query']
/** 工单费用设置 - get响应参数 */
export type _v1_bc_merchant_job_fee_get_res = Required<operations["feeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员工单费用历史 - get请求参数 */
export type _v1_bc_merchant_job_history_get_req = Required<operations["workerHistorySettleUsingGET"]>['parameters']['query']
/** 服务人员工单费用历史 - get响应参数 */
export type _v1_bc_merchant_job_history_get_res = Required<operations["workerHistorySettleUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 通知用户工单快结束 - post请求参数 */
export type _v1_bc_merchant_job_jobEndAlertUser_post_req = Required<operations["jobEndAlertUserUsingPOST"]>['requestBody']['content']['application/json']
/** 通知用户工单快结束 - post响应参数 */
export type _v1_bc_merchant_job_jobEndAlertUser_post_res = Required<operations["jobEndAlertUserUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - post请求参数 */
export type _v1_bc_merchant_job_list_post_req = Required<operations["listUsingPOST_13"]>['requestBody']['content']['application/json']
/** 任务列表 - post响应参数 */
export type _v1_bc_merchant_job_list_post_res = Required<operations["listUsingPOST_13"]>['responses'][200]['content']['*/*']

/** 休假设置 - post请求参数 */
export type _v1_bc_merchant_job_offDate_post_req = Required<operations["offDateUsingPOST"]>['requestBody']['content']['application/json']
/** 休假设置 - post响应参数 */
export type _v1_bc_merchant_job_offDate_post_res = Required<operations["offDateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 待结算列表 - post请求参数 */
export type _v1_bc_merchant_job_paid_post_req = Required<operations["paidListUsingPOST"]>['requestBody']['content']['application/json']
/** 待结算列表 - post响应参数 */
export type _v1_bc_merchant_job_paid_post_res = Required<operations["paidListUsingPOST"]>['responses'][200]['content']['*/*']

/** 任务详情 - get请求参数 */
export type _v1_bc_merchant_job_paidDetail_get_req = Required<operations["paidDetailUsingGET"]>['parameters']['query']
/** 任务详情 - get响应参数 */
export type _v1_bc_merchant_job_paidDetail_get_res = Required<operations["paidDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户工单列表 - post请求参数 */
export type _v1_bc_merchant_job_person_post_req = Required<operations["personJobListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 用户工单列表 - post响应参数 */
export type _v1_bc_merchant_job_person_post_res = Required<operations["personJobListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 工单服务中更换服务人员 - post请求参数 */
export type _v1_bc_merchant_job_replaceWorker_post_req = Required<operations["replaceWorkerUsingPOST"]>['requestBody']['content']['application/json']
/** 工单服务中更换服务人员 - post响应参数 */
export type _v1_bc_merchant_job_replaceWorker_post_res = Required<operations["replaceWorkerUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 更新服务人员费用设置详情 - get请求参数 */
export type _v1_bc_merchant_job_replaceWorkerList_get_req = Required<operations["replaceWorkerListUsingGET"]>['parameters']['query']
/** 更新服务人员费用设置详情 - get响应参数 */
export type _v1_bc_merchant_job_replaceWorkerList_get_res = Required<operations["replaceWorkerListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保存费用 - post请求参数 */
export type _v1_bc_merchant_job_settle_post_req = Required<operations["settleUsingPOST"]>['requestBody']['content']['application/json']
/** 保存费用 - post响应参数 */
export type _v1_bc_merchant_job_settle_post_res = Required<operations["settleUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 个人工单统计 - get请求参数 */
export type _v1_bc_merchant_job_total_get_req = Required<operations["workerJobSumUsingGET"]>['parameters']['query']
/** 个人工单统计 - get响应参数 */
export type _v1_bc_merchant_job_total_get_res = Required<operations["workerJobSumUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保存备注 - post请求参数 */
export type _v1_bc_merchant_job_update_post_req = Required<operations["updateJobUsingPOST_1"]>['requestBody']['content']['application/json']
/** 保存备注 - post响应参数 */
export type _v1_bc_merchant_job_update_post_res = Required<operations["updateJobUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 设置倒计时备注 - post请求参数 */
export type _v1_bc_merchant_job_updateGrabTime_post_req = Required<operations["updateJobUsingPOST"]>['requestBody']['content']['application/json']
/** 设置倒计时备注 - post响应参数 */
export type _v1_bc_merchant_job_updateGrabTime_post_res = Required<operations["updateJobUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取用户最新打卡工单id - get请求参数 */
export type _v1_bc_server_job_clock_id_get_req = Required<operations["getJobIdUsingGET"]>['parameters']['query']
/** 获取用户最新打卡工单id - get响应参数 */
export type _v1_bc_server_job_clock_id_get_res = Required<operations["getJobIdUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保存打卡信息 - post请求参数 */
export type _v1_bc_server_job_clock_save_post_req = Required<operations["clockSaveUsingPOST"]>['requestBody']['content']['application/json']
/** 保存打卡信息 - post响应参数 */
export type _v1_bc_server_job_clock_save_post_res = Required<operations["clockSaveUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取打卡信息 - get请求参数 */
export type _v1_bc_server_job_clock_scope_get_req = Required<operations["getScopeUsingGET"]>['parameters']['query']
/** 获取打卡信息 - get响应参数 */
export type _v1_bc_server_job_clock_scope_get_res = Required<operations["getScopeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 提交代跑物流信息 - post请求参数 */
export type _v1_bc_server_job_delivery_post_req = Required<operations["workerDeliveryUsingPOST"]>['requestBody']['content']['application/json']
/** 提交代跑物流信息 - post响应参数 */
export type _v1_bc_server_job_delivery_post_res = Required<operations["workerDeliveryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 工单详情 - get请求参数 */
export type _v1_bc_server_job_detail_get_req = Required<operations["detailUsingGET_19"]>['parameters']['query']
/** 工单详情 - get响应参数 */
export type _v1_bc_server_job_detail_get_res = Required<operations["detailUsingGET_19"]>['responses'][200]['content']['*/*']['data']

/** 提交工单完成 - post请求参数 */
export type _v1_bc_server_job_finish_post_req = Required<operations["doFinishUsingPOST"]>['requestBody']['content']['application/json']
/** 提交工单完成 - post响应参数 */
export type _v1_bc_server_job_finish_post_res = Required<operations["doFinishUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 任务大厅 - post请求参数 */
export type _v1_bc_server_job_hall_post_req = Required<operations["orderHallUsingPOST"]>['requestBody']['content']['application/json']
/** 任务大厅 - post响应参数 */
export type _v1_bc_server_job_hall_post_res = Required<operations["orderHallUsingPOST"]>['responses'][200]['content']['*/*']

/** 统计服务人员月工单数 - get请求参数 */
export type _v1_bc_server_job_jobOrderStatistics_get_req = Required<operations["jobOrderStatisticsUsingGET"]>['parameters']['query']
/** 统计服务人员月工单数 - get响应参数 */
export type _v1_bc_server_job_jobOrderStatistics_get_res = Required<operations["jobOrderStatisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员订单列表 - get请求参数 */
export type _v1_bc_server_job_order_get_req = Required<operations["workerOrderUsingGET"]>['parameters']['query']
/** 服务人员订单列表 - get响应参数 */
export type _v1_bc_server_job_order_get_res = Required<operations["workerOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户工单列表 - post请求参数 */
export type _v1_bc_server_job_person_post_req = Required<operations["personJobListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 用户工单列表 - post响应参数 */
export type _v1_bc_server_job_person_post_res = Required<operations["personJobListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 提交代跑取单实物信息 - post请求参数 */
export type _v1_bc_server_job_physical_post_req = Required<operations["workerPhysicalUsingPOST"]>['requestBody']['content']['application/json']
/** 提交代跑取单实物信息 - post响应参数 */
export type _v1_bc_server_job_physical_post_res = Required<operations["workerPhysicalUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 抢单 - post请求参数 */
export type _v1_bc_server_job_rush_post_req = Required<operations["rushOrderUsingPOST"]>['requestBody']['content']['application/json']
/** 抢单 - post响应参数 */
export type _v1_bc_server_job_rush_post_res = Required<operations["rushOrderUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 扫码更新工单状态 - post请求参数 */
export type _v1_bc_server_job_scanCode_post_req = Required<operations["scanCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 扫码更新工单状态 - post响应参数 */
export type _v1_bc_server_job_scanCode_post_res = Required<operations["scanCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - post请求参数 */
export type _v1_bc_server_job_task_post_req = Required<operations["listUsingPOST_14"]>['requestBody']['content']['application/json']
/** 任务列表 - post响应参数 */
export type _v1_bc_server_job_task_post_res = Required<operations["listUsingPOST_14"]>['responses'][200]['content']['*/*']

/** 个人工单统计 - get请求参数 */
export type _v1_bc_server_job_total_get_req = Required<operations["workerJobSumUsingGET_1"]>['parameters']['query']
/** 个人工单统计 - get响应参数 */
export type _v1_bc_server_job_total_get_res = Required<operations["workerJobSumUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 统计当前用户服务中数量 - get请求参数 */
export type _v1_bc_server_job_wait_get_req = Required<operations["getWaitUsingGET"]>['parameters']['query']
/** 统计当前用户服务中数量 - get响应参数 */
export type _v1_bc_server_job_wait_get_res = Required<operations["getWaitUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 任务详情 - get请求参数 */
export type _v1_bc_server_task_detail_get_req = Required<operations["taskDetailUsingGET"]>['parameters']['query']
/** 任务详情 - get响应参数 */
export type _v1_bc_server_task_detail_get_res = Required<operations["taskDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** save - post请求参数 */
export type _v1_bc_server_category_save_post_req = Required<operations["saveUsingPOST_2"]>['requestBody']['content']['application/json']
/** save - post响应参数 */
export type _v1_bc_server_category_save_post_res = Required<operations["saveUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** selected - get请求参数 */
export type _v1_bc_server_category_selected_get_req = Required<operations["selectedUsingGET"]>['parameters']['query']
/** selected - get响应参数 */
export type _v1_bc_server_category_selected_get_res = Required<operations["selectedUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getFilter - get请求参数 */
export type _v1_bc_server_job_filter_get_req = Required<operations["getFilterUsingGET"]>['parameters']['query']
/** getFilter - get响应参数 */
export type _v1_bc_server_job_filter_get_res = Required<operations["getFilterUsingGET"]>['responses'][200]['content']['*/*']['data']

/** setFilter - post请求参数 */
export type _v1_bc_server_job_filter_post_req = Required<operations["setFilterUsingPOST"]>['requestBody']['content']['application/json']
/** setFilter - post响应参数 */
export type _v1_bc_server_job_filter_post_res = Required<operations["setFilterUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 创建 - post请求参数 */
export type _v1_bc_merchant_prepaid_create_post_req = Required<operations["createUsingPOST_3"]>['requestBody']['content']['application/json']
/** 创建 - post响应参数 */
export type _v1_bc_merchant_prepaid_create_post_res = Required<operations["createUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 预付单详情 - get请求参数 */
export type _v1_bc_merchant_prepaid_detail_get_req = Required<operations["billDetailUsingGET"]>['parameters']['query']
/** 预付单详情 - get响应参数 */
export type _v1_bc_merchant_prepaid_detail_get_res = Required<operations["billDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 审核 - post请求参数 */
export type _v1_bc_merchant_prepaid_doAction_post_req = Required<operations["doActionUsingPOST_8"]>['requestBody']['content']['application/json']
/** 审核 - post响应参数 */
export type _v1_bc_merchant_prepaid_doAction_post_res = Required<operations["doActionUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

/** 关联记录 - get请求参数 */
export type _v1_bc_merchant_prepaid_history_get_req = Required<operations["prePayHistoryUsingGET"]>['parameters']['query']
/** 关联记录 - get响应参数 */
export type _v1_bc_merchant_prepaid_history_get_res = Required<operations["prePayHistoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 工单列表 - get请求参数 */
export type _v1_bc_merchant_prepaid_job_get_req = Required<operations["jobListUsingGET"]>['parameters']['query']
/** 工单列表 - get响应参数 */
export type _v1_bc_merchant_prepaid_job_get_res = Required<operations["jobListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 服务人员工单详情 - get请求参数 */
export type _v1_bc_merchant_prepaid_job_detail_get_req = Required<operations["detailUsingGET_20"]>['parameters']['query']
/** 服务人员工单详情 - get响应参数 */
export type _v1_bc_merchant_prepaid_job_detail_get_res = Required<operations["detailUsingGET_20"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_merchant_prepaid_list_post_req = Required<operations["listUsingPOST_15"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_merchant_prepaid_list_post_res = Required<operations["listUsingPOST_15"]>['responses'][200]['content']['*/*']

/** 服务人列表 - get请求参数 */
export type _v1_bc_merchant_prepaid_worker_get_req = Required<operations["workerUsingGET"]>['parameters']['query']
/** 服务人列表 - get响应参数 */
export type _v1_bc_merchant_prepaid_worker_get_res = Required<operations["workerUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 修改/添加回访 - post请求参数 */
export type _v1_bc_merchant_recall_add_post_req = Required<operations["addUsingPOST_6"]>['requestBody']['content']['application/json']
/** 修改/添加回访 - post响应参数 */
export type _v1_bc_merchant_recall_add_post_res = Required<operations["addUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - get请求参数 */
export type _v1_bc_merchant_recall_detail_get_req = Required<operations["detailUsingGET_21"]>['parameters']['query']
/** 任务列表 - get响应参数 */
export type _v1_bc_merchant_recall_detail_get_res = Required<operations["detailUsingGET_21"]>['responses'][200]['content']['*/*']['data']

/** 工单列表 - get请求参数 */
export type _v1_bc_merchant_recall_job_get_req = Required<operations["jobListUsingGET_1"]>['parameters']['query']
/** 工单列表 - get响应参数 */
export type _v1_bc_merchant_recall_job_get_res = Required<operations["jobListUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 工单详情 - get请求参数 */
export type _v1_bc_merchant_recall_job_detail_get_req = Required<operations["jobDetailUsingGET"]>['parameters']['query']
/** 工单详情 - get响应参数 */
export type _v1_bc_merchant_recall_job_detail_get_res = Required<operations["jobDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - post请求参数 */
export type _v1_bc_merchant_recall_list_post_req = Required<operations["listUsingPOST_16"]>['requestBody']['content']['application/json']
/** 任务列表 - post响应参数 */
export type _v1_bc_merchant_recall_list_post_res = Required<operations["listUsingPOST_16"]>['responses'][200]['content']['*/*']

/** 删除 - post请求参数 */
export type _v1_bc_merchant_recall_remove_post_req = Required<operations["removeUsingPOST_1"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_merchant_recall_remove_post_res = Required<operations["removeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - get请求参数 */
export type _v1_bc_server_recall_detail_get_req = Required<operations["detailUsingGET_22"]>['parameters']['query']
/** 任务列表 - get响应参数 */
export type _v1_bc_server_recall_detail_get_res = Required<operations["detailUsingGET_22"]>['responses'][200]['content']['*/*']['data']

/** 任务列表 - post请求参数 */
export type _v1_bc_server_recall_list_post_req = Required<operations["listUsingPOST_17"]>['requestBody']['content']['application/json']
/** 任务列表 - post响应参数 */
export type _v1_bc_server_recall_list_post_res = Required<operations["listUsingPOST_17"]>['responses'][200]['content']['*/*']

/** 修改/添加回访 - post请求参数 */
export type _v1_bc_server_recall_modify_post_req = Required<operations["modifyUsingPOST_2"]>['requestBody']['content']['application/json']
/** 修改/添加回访 - post响应参数 */
export type _v1_bc_server_recall_modify_post_res = Required<operations["modifyUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 创建 - post请求参数 */
export type _v1_bc_merchant_settle_create_post_req = Required<operations["createUsingPOST_4"]>['requestBody']['content']['application/json']
/** 创建 - post响应参数 */
export type _v1_bc_merchant_settle_create_post_res = Required<operations["createUsingPOST_4"]>['responses'][200]['content']['*/*']['data']

/** N次结算单详情 - get请求参数 */
export type _v1_bc_merchant_settle_detail_get_req = Required<operations["billDetailUsingGET_1"]>['parameters']['query']
/** N次结算单详情 - get响应参数 */
export type _v1_bc_merchant_settle_detail_get_res = Required<operations["billDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 审核 - post请求参数 */
export type _v1_bc_merchant_settle_doAction_post_req = Required<operations["doActionUsingPOST_9"]>['requestBody']['content']['application/json']
/** 审核 - post响应参数 */
export type _v1_bc_merchant_settle_doAction_post_res = Required<operations["doActionUsingPOST_9"]>['responses'][200]['content']['*/*']['data']

/** 关联记录 - get请求参数 */
export type _v1_bc_merchant_settle_history_get_req = Required<operations["prePayHistoryUsingGET_1"]>['parameters']['query']
/** 关联记录 - get响应参数 */
export type _v1_bc_merchant_settle_history_get_res = Required<operations["prePayHistoryUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 工单结算历史记录 - get请求参数 */
export type _v1_bc_merchant_settle_historyAll_get_req = Required<operations["prePayHistoryAllUsingGET"]>['parameters']['query']
/** 工单结算历史记录 - get响应参数 */
export type _v1_bc_merchant_settle_historyAll_get_res = Required<operations["prePayHistoryAllUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 工单列表 - get请求参数 */
export type _v1_bc_merchant_settle_job_get_req = Required<operations["jobListUsingGET_2"]>['parameters']['query']
/** 工单列表 - get响应参数 */
export type _v1_bc_merchant_settle_job_get_res = Required<operations["jobListUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 服务人员工单详情 - get请求参数 */
export type _v1_bc_merchant_settle_job_detail_get_req = Required<operations["detailUsingGET_23"]>['parameters']['query']
/** 服务人员工单详情 - get响应参数 */
export type _v1_bc_merchant_settle_job_detail_get_res = Required<operations["detailUsingGET_23"]>['responses'][200]['content']['*/*']['data']

/** 列表 - post请求参数 */
export type _v1_bc_merchant_settle_list_post_req = Required<operations["listUsingPOST_18"]>['requestBody']['content']['application/json']
/** 列表 - post响应参数 */
export type _v1_bc_merchant_settle_list_post_res = Required<operations["listUsingPOST_18"]>['responses'][200]['content']['*/*']

/** 服务人列表 - get请求参数 */
export type _v1_bc_merchant_settle_worker_get_req = Required<operations["workerUsingGET_1"]>['parameters']['query']
/** 服务人列表 - get响应参数 */
export type _v1_bc_merchant_settle_worker_get_res = Required<operations["workerUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 状态 - get请求参数 */
export type _v1_bc_admin_job_status_get_req = Required<operations["listUsingGET_7"]>['parameters']['query']
/** 状态 - get响应参数 */
export type _v1_bc_admin_job_status_get_res = Required<operations["listUsingGET_7"]>['responses'][200]['content']['*/*']['data']

/** 编辑保证金配置 - get请求参数 */
export type _v1_bc_admin_margin_editConfig_get_req = Required<operations["editConfigUsingGET"]>['parameters']['query']
/** 编辑保证金配置 - get响应参数 */
export type _v1_bc_admin_margin_editConfig_get_res = Required<operations["editConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取保证金配置列表 - get请求参数 */
export type _v1_bc_admin_margin_getConfigList_get_req = Required<operations["editConfigUsingGET_1"]>['parameters']['query']
/** 获取保证金配置列表 - get响应参数 */
export type _v1_bc_admin_margin_getConfigList_get_res = Required<operations["editConfigUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 获取支付结果 - get请求参数 */
export type _v1_bc_admin_margin_getPayResult_get_req = Required<operations["getPayResultUsingGET"]>['parameters']['query']
/** 获取支付结果 - get响应参数 */
export type _v1_bc_admin_margin_getPayResult_get_res = Required<operations["getPayResultUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保证金缴纳 - get请求参数 */
export type _v1_bc_admin_margin_nativePay_get_req = Required<operations["nativePayUsingGET"]>['parameters']['query']
/** 保证金缴纳 - get响应参数 */
export type _v1_bc_admin_margin_nativePay_get_res = Required<operations["nativePayUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 删除 - post请求参数 */
export type _v1_bc_admin_marketing_offline_delete_post_req = Required<operations["deleteUsingPOST_3"]>['requestBody']['content']['application/json']
/** 删除 - post响应参数 */
export type _v1_bc_admin_marketing_offline_delete_post_res = Required<operations["deleteUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 线下详情 - get请求参数 */
export type _v1_bc_admin_marketing_offline_detail_get_req = Required<operations["admin_offline_detailUsingGET"]>['parameters']['query']
/** 线下详情 - get响应参数 */
export type _v1_bc_admin_marketing_offline_detail_get_res = Required<operations["admin_offline_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 线下列表 - post请求参数 */
export type _v1_bc_admin_marketing_offline_list_post_req = Required<operations["admin_offline_listUsingPOST"]>['requestBody']['content']['application/json']
/** 线下列表 - post响应参数 */
export type _v1_bc_admin_marketing_offline_list_post_res = Required<operations["admin_offline_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 删除物料 - post请求参数 */
export type _v1_bc_admin_marketing_offline_material_delete_post_req = Required<operations["deleteMaterialUsingPOST"]>['requestBody']['content']['application/json']
/** 删除物料 - post响应参数 */
export type _v1_bc_admin_marketing_offline_material_delete_post_res = Required<operations["deleteMaterialUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 线下物料详情 - get请求参数 */
export type _v1_bc_admin_marketing_offline_material_detail_get_req = Required<operations["admin_material_detailUsingGET"]>['parameters']['query']
/** 线下物料详情 - get响应参数 */
export type _v1_bc_admin_marketing_offline_material_detail_get_res = Required<operations["admin_material_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 线下物料列表 - post请求参数 */
export type _v1_bc_admin_marketing_offline_material_list_post_req = Required<operations["admin_material_listUsingPOST"]>['requestBody']['content']['application/json']
/** 线下物料列表 - post响应参数 */
export type _v1_bc_admin_marketing_offline_material_list_post_res = Required<operations["admin_material_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 新增修改物料 - post请求参数 */
export type _v1_bc_admin_marketing_offline_material_save_post_req = Required<operations["doSaveMaterialUsingPOST"]>['requestBody']['content']['application/json']
/** 新增修改物料 - post响应参数 */
export type _v1_bc_admin_marketing_offline_material_save_post_res = Required<operations["doSaveMaterialUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 新增修改 - post请求参数 */
export type _v1_bc_admin_marketing_offline_save_post_req = Required<operations["doSaveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 新增修改 - post响应参数 */
export type _v1_bc_admin_marketing_offline_save_post_res = Required<operations["doSaveUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 新增修改投放场所 - post请求参数 */
export type _v1_bc_admin_marketing_offline_save_data_post_req = Required<operations["doSaveDataUsingPOST"]>['requestBody']['content']['application/json']
/** 新增修改投放场所 - post响应参数 */
export type _v1_bc_admin_marketing_offline_save_data_post_res = Required<operations["doSaveDataUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 线上推广删除 - post请求参数 */
export type _v1_bc_admin_marketing_online_delete_post_req = Required<operations["deleteOnlineUsingPOST"]>['requestBody']['content']['application/json']
/** 线上推广删除 - post响应参数 */
export type _v1_bc_admin_marketing_online_delete_post_res = Required<operations["deleteOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 线上详情 - get请求参数 */
export type _v1_bc_admin_marketing_online_detail_get_req = Required<operations["admin_online_detailUsingGET"]>['parameters']['query']
/** 线上详情 - get响应参数 */
export type _v1_bc_admin_marketing_online_detail_get_res = Required<operations["admin_online_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 线上列表 - post请求参数 */
export type _v1_bc_admin_marketing_online_list_post_req = Required<operations["admin_online_listUsingPOST"]>['requestBody']['content']['application/json']
/** 线上列表 - post响应参数 */
export type _v1_bc_admin_marketing_online_list_post_res = Required<operations["admin_online_listUsingPOST"]>['responses'][200]['content']['*/*']

/** 线上新增修改 - post请求参数 */
export type _v1_bc_admin_marketing_online_save_post_req = Required<operations["doSaveOnlineUsingPOST"]>['requestBody']['content']['application/json']
/** 线上新增修改 - post响应参数 */
export type _v1_bc_admin_marketing_online_save_post_res = Required<operations["doSaveOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 线上新增修改推广渠道 - post请求参数 */
export type _v1_bc_admin_marketing_online_save_data_post_req = Required<operations["doSaveDataOnlineUsingPOST"]>['requestBody']['content']['application/json']
/** 线上新增修改推广渠道 - post响应参数 */
export type _v1_bc_admin_marketing_online_save_data_post_res = Required<operations["doSaveDataOnlineUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 同意退款 - post请求参数 */
export type _v1_bc_merchant_cancel_audit_order_agree_refund_post_req = Required<operations["agreeRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 同意退款 - post响应参数 */
export type _v1_bc_merchant_cancel_audit_order_agree_refund_post_res = Required<operations["agreeRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 不同意退款 - post请求参数 */
export type _v1_bc_merchant_cancel_audit_order_disagree_refund_post_req = Required<operations["disagreeRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 不同意退款 - post响应参数 */
export type _v1_bc_merchant_cancel_audit_order_disagree_refund_post_res = Required<operations["disagreeRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 审核列表 - post请求参数 */
export type _v1_bc_merchant_cancel_audit_order_list_post_req = Required<operations["listUsingPOST_19"]>['requestBody']['content']['application/json']
/** 审核列表 - post响应参数 */
export type _v1_bc_merchant_cancel_audit_order_list_post_res = Required<operations["listUsingPOST_19"]>['responses'][200]['content']['*/*']

/** 核销 - post请求参数 */
export type _v1_bc_admin_order_cardConsume_post_req = Required<operations["cardConsumeUsingPOST"]>['requestBody']['content']['application/json']
/** 核销 - post响应参数 */
export type _v1_bc_admin_order_cardConsume_post_res = Required<operations["cardConsumeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 券号列表 - post请求参数 */
export type _v1_bc_admin_order_cardConsumeList_post_req = Required<operations["cardConsumeListUsingPOST"]>['requestBody']['content']['application/json']
/** 券号列表 - post响应参数 */
export type _v1_bc_admin_order_cardConsumeList_post_res = Required<operations["cardConsumeListUsingPOST"]>['responses'][200]['content']['*/*']

/** 状态列表等查询条件 - get请求参数 */
export type _v1_bc_admin_order_condition_collection_get_req = Required<operations["conditionCollectionUsingGET_3"]>['parameters']['query']
/** 状态列表等查询条件 - get响应参数 */
export type _v1_bc_admin_order_condition_collection_get_res = Required<operations["conditionCollectionUsingGET_3"]>['responses'][200]['content']['*/*']

/** 订单详细 - get请求参数 */
export type _v1_bc_admin_order_detail_get_req = Required<operations["detailUsingGET_24"]>['parameters']['query']
/** 订单详细 - get响应参数 */
export type _v1_bc_admin_order_detail_get_res = Required<operations["detailUsingGET_24"]>['responses'][200]['content']['*/*']['data']

/** entityDetail - get请求参数 */
export type _v1_bc_admin_order_entity_detail_get_req = Required<operations["entityDetailUsingGET"]>['parameters']['query']
/** entityDetail - get响应参数 */
export type _v1_bc_admin_order_entity_detail_get_res = Required<operations["entityDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单类型 - get请求参数 */
export type _v1_bc_admin_order_kind_get_req = Required<operations["getKindUsingGET"]>['parameters']['query']
/** 订单类型 - get响应参数 */
export type _v1_bc_admin_order_kind_get_res = Required<operations["getKindUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单列表 - post请求参数 */
export type _v1_bc_admin_order_list_post_req = Required<operations["listUsingPOST_20"]>['requestBody']['content']['application/json']
/** 订单列表 - post响应参数 */
export type _v1_bc_admin_order_list_post_res = Required<operations["listUsingPOST_20"]>['responses'][200]['content']['*/*']

/** operationLogList - post请求参数 */
export type _v1_bc_admin_order_operation_log_list_post_req = Required<operations["operationLogListUsingPOST"]>['requestBody']['content']['application/json']
/** operationLogList - post响应参数 */
export type _v1_bc_admin_order_operation_log_list_post_res = Required<operations["operationLogListUsingPOST"]>['responses'][200]['content']['*/*']

/** 帮客户续单 - post请求参数 */
export type _v1_bc_admin_order_renew_post_req = Required<operations["renewUsingPOST"]>['requestBody']['content']['application/json']
/** 帮客户续单 - post响应参数 */
export type _v1_bc_admin_order_renew_post_res = Required<operations["renewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** subOrderAll - get请求参数 */
export type _v1_bc_admin_order_sub_order_list_get_req = Required<operations["subOrderAllUsingGET"]>['parameters']['query']
/** subOrderAll - get响应参数 */
export type _v1_bc_admin_order_sub_order_list_get_res = Required<operations["subOrderAllUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 未评价列表 - post请求参数 */
export type _v1_bc_admin_order_wait_comment_list_post_req = Required<operations["waitCommentListUsingPOST"]>['requestBody']['content']['application/json']
/** 未评价列表 - post响应参数 */
export type _v1_bc_admin_order_wait_comment_list_post_res = Required<operations["waitCommentListUsingPOST"]>['responses'][200]['content']['*/*']

/** 可售后列表 - post请求参数 */
export type _v1_bc_app_order_after_saleable_list_post_req = Required<operations["afterSaleableListUsingPOST"]>['requestBody']['content']['application/json']
/** 可售后列表 - post响应参数 */
export type _v1_bc_app_order_after_saleable_list_post_res = Required<operations["afterSaleableListUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** cancel - post请求参数 */
export type _v1_bc_app_order_cancel_post_req = Required<operations["cancelUsingPOST_2"]>['requestBody']['content']['application/json']
/** cancel - post响应参数 */
export type _v1_bc_app_order_cancel_post_res = Required<operations["cancelUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 创建虚拟卡订单 - post请求参数 */
export type _v1_bc_app_order_cardCreate_post_req = Required<operations["createUsingPOST_5"]>['requestBody']['content']['application/json']
/** 创建虚拟卡订单 - post响应参数 */
export type _v1_bc_app_order_cardCreate_post_res = Required<operations["createUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** 虚拟卡订单退款 - post请求参数 */
export type _v1_bc_app_order_cardRefund_post_req = Required<operations["cardRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 虚拟卡订单退款 - post响应参数 */
export type _v1_bc_app_order_cardRefund_post_res = Required<operations["cardRefundUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单数 - get请求参数 */
export type _v1_bc_app_order_count_get_req = Required<operations["countOrderUsingGET"]>['parameters']['query']
/** 订单数 - get响应参数 */
export type _v1_bc_app_order_count_get_res = Required<operations["countOrderUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 创建课程订单 - post请求参数 */
export type _v1_bc_app_order_courseCreate_post_req = Required<operations["courseCreateUsingPOST"]>['requestBody']['content']['application/json']
/** 创建课程订单 - post响应参数 */
export type _v1_bc_app_order_courseCreate_post_res = Required<operations["courseCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 创建订单 - post请求参数 */
export type _v1_bc_app_order_create_post_req = Required<operations["createUsingPOST_6"]>['requestBody']['content']['application/json']
/** 创建订单 - post响应参数 */
export type _v1_bc_app_order_create_post_res = Required<operations["createUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

/** 订单详细 - get请求参数 */
export type _v1_bc_app_order_detail_get_req = Required<operations["detailUsingGET_25"]>['parameters']['query']
/** 订单详细 - get响应参数 */
export type _v1_bc_app_order_detail_get_res = Required<operations["detailUsingGET_25"]>['responses'][200]['content']['*/*']['data']

/** entityDetail - get请求参数 */
export type _v1_bc_app_order_entity_detail_get_req = Required<operations["entityDetailUsingGET_1"]>['parameters']['query']
/** entityDetail - get响应参数 */
export type _v1_bc_app_order_entity_detail_get_res = Required<operations["entityDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** helpCreate - post请求参数 */
export type _v1_bc_app_order_help_create_post_req = Required<operations["helpCreateUsingPOST"]>['requestBody']['content']['application/json']
/** helpCreate - post响应参数 */
export type _v1_bc_app_order_help_create_post_res = Required<operations["helpCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单列表 - post请求参数 */
export type _v1_bc_app_order_list_post_req = Required<operations["listUsingPOST_21"]>['requestBody']['content']['application/json']
/** 订单列表 - post响应参数 */
export type _v1_bc_app_order_list_post_res = Required<operations["listUsingPOST_21"]>['responses'][200]['content']['*/*']['data']

/** 修改订单 - post请求参数 */
export type _v1_bc_app_order_modify_post_req = Required<operations["modifyUsingPOST_3"]>['requestBody']['content']['application/json']
/** 修改订单 - post响应参数 */
export type _v1_bc_app_order_modify_post_res = Required<operations["modifyUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 求订单总价 - post请求参数 */
export type _v1_bc_app_order_price_calculation_post_req = Required<operations["priceCalculationUsingPOST"]>['requestBody']['content']['application/json']
/** 求订单总价 - post响应参数 */
export type _v1_bc_app_order_price_calculation_post_res = Required<operations["priceCalculationUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 求虚拟卡订单总价 - post请求参数 */
export type _v1_bc_app_order_price_cardCalculation_post_req = Required<operations["priceCalculationUsingPOST_1"]>['requestBody']['content']['application/json']
/** 求虚拟卡订单总价 - post响应参数 */
export type _v1_bc_app_order_price_cardCalculation_post_res = Required<operations["priceCalculationUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 求课程订单总价 - post请求参数 */
export type _v1_bc_app_order_price_courseCalculation_post_req = Required<operations["priceCourseCalculationUsingPOST"]>['requestBody']['content']['application/json']
/** 求课程订单总价 - post响应参数 */
export type _v1_bc_app_order_price_courseCalculation_post_res = Required<operations["priceCourseCalculationUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 下单所需数据 - get请求参数 */
export type _v1_bc_app_order_purchase_view_get_req = Required<operations["getPurchaseInfoUsingGET_2"]>['parameters']['query']
/** 下单所需数据 - get响应参数 */
export type _v1_bc_app_order_purchase_view_get_res = Required<operations["getPurchaseInfoUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 发送短信 - post请求参数 */
export type _v1_bc_app_order_send_sms_post_req = Required<operations["sendSmsUsingPOST"]>['requestBody']['content']['application/json']
/** 发送短信 - post响应参数 */
export type _v1_bc_app_order_send_sms_post_res = Required<operations["sendSmsUsingPOST"]>['responses'][200]['content']['*/*']

/** subOrderAll - get请求参数 */
export type _v1_bc_app_order_sub_order_list_get_req = Required<operations["subOrderAllUsingGET_1"]>['parameters']['query']
/** subOrderAll - get响应参数 */
export type _v1_bc_app_order_sub_order_list_get_res = Required<operations["subOrderAllUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 立刻使用 (多次单) - post请求参数 */
export type _v1_bc_app_order_use_now_post_req = Required<operations["useNowUsingPOST"]>['requestBody']['content']['application/json']
/** 立刻使用 (多次单) - post响应参数 */
export type _v1_bc_app_order_use_now_post_res = Required<operations["useNowUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** cancel - post请求参数 */
export type _v1_bc_merchant_order_cancel_post_req = Required<operations["cancelUsingPOST_3"]>['requestBody']['content']['application/json']
/** cancel - post响应参数 */
export type _v1_bc_merchant_order_cancel_post_res = Required<operations["cancelUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** 状态列表等查询条件 - get请求参数 */
export type _v1_bc_merchant_order_condition_collection_get_req = Required<operations["conditionCollectionUsingGET_4"]>['parameters']['query']
/** 状态列表等查询条件 - get响应参数 */
export type _v1_bc_merchant_order_condition_collection_get_res = Required<operations["conditionCollectionUsingGET_4"]>['responses'][200]['content']['*/*']

/** 订单详细 - get请求参数 */
export type _v1_bc_merchant_order_detail_get_req = Required<operations["detailUsingGET_26"]>['parameters']['query']
/** 订单详细 - get响应参数 */
export type _v1_bc_merchant_order_detail_get_res = Required<operations["detailUsingGET_26"]>['responses'][200]['content']['*/*']['data']

/** 求订单总价 - get请求参数 */
export type _v1_bc_merchant_order_entity_price_calculation_get_req = Required<operations["getEntityPriceUsingGET"]>['parameters']['query']
/** 求订单总价 - get响应参数 */
export type _v1_bc_merchant_order_entity_price_calculation_get_res = Required<operations["getEntityPriceUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单列表 - post请求参数 */
export type _v1_bc_merchant_order_list_post_req = Required<operations["listUsingPOST_22"]>['requestBody']['content']['application/json']
/** 订单列表 - post响应参数 */
export type _v1_bc_merchant_order_list_post_res = Required<operations["listUsingPOST_22"]>['responses'][200]['content']['*/*']

/** 订单修改最终实付金额 - post请求参数 */
export type _v1_bc_merchant_order_modify_entity_order_post_req = Required<operations["modifyEntityOrderUsingPOST"]>['requestBody']['content']['application/json']
/** 订单修改最终实付金额 - post响应参数 */
export type _v1_bc_merchant_order_modify_entity_order_post_res = Required<operations["modifyEntityOrderUsingPOST"]>['responses'][200]['content']['*/*']

/** 被照护人详细 - get请求参数 */
export type _v1_bc_merchant_order_patient_get_req = Required<operations["patientUsingGET"]>['parameters']['query']
/** 被照护人详细 - get响应参数 */
export type _v1_bc_merchant_order_patient_get_res = Required<operations["patientUsingGET"]>['responses'][200]['content']['*/*']['data']

/** subOrderAll - get请求参数 */
export type _v1_bc_merchant_order_sub_order_list_get_req = Required<operations["subOrderAllUsingGET_2"]>['parameters']['query']
/** subOrderAll - get响应参数 */
export type _v1_bc_merchant_order_sub_order_list_get_res = Required<operations["subOrderAllUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 订单更改 - post请求参数 */
export type _v1_bc_merchant_order_update_post_req = Required<operations["updateUsingPOST"]>['requestBody']['content']['application/json']
/** 订单更改 - post响应参数 */
export type _v1_bc_merchant_order_update_post_res = Required<operations["updateUsingPOST"]>['responses'][200]['content']['*/*']

/** 订单更改最终实付金额 - post请求参数 */
export type _v1_bc_merchant_order_update_paid_amount_post_req = Required<operations["updatePaidAmountUsingPOST"]>['requestBody']['content']['application/json']
/** 订单更改最终实付金额 - post响应参数 */
export type _v1_bc_merchant_order_update_paid_amount_post_res = Required<operations["updatePaidAmountUsingPOST"]>['responses'][200]['content']['*/*']

/** 未评价列表 - post请求参数 */
export type _v1_bc_merchant_order_wait_comment_list_post_req = Required<operations["waitCommentListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 未评价列表 - post响应参数 */
export type _v1_bc_merchant_order_wait_comment_list_post_res = Required<operations["waitCommentListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** combinationOptionDetail - get请求参数 */
export type _v1_product_admin_order_combination_option_detail_get_req = Required<operations["combinationOptionDetailUsingGET"]>['parameters']['query']
/** combinationOptionDetail - get响应参数 */
export type _v1_product_admin_order_combination_option_detail_get_res = Required<operations["combinationOptionDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单列表 - post请求参数 */
export type _v1_product_admin_order_list_post_req = Required<operations["listUsingPOST_23"]>['requestBody']['content']['application/json']
/** 订单列表 - post响应参数 */
export type _v1_product_admin_order_list_post_res = Required<operations["listUsingPOST_23"]>['responses'][200]['content']['*/*']

/** 确认收货 - post请求参数 */
export type _v1_product_app_order_confirm_receive_post_req = Required<operations["confirmReceiveUsingPOST"]>['requestBody']['content']['application/json']
/** 确认收货 - post响应参数 */
export type _v1_product_app_order_confirm_receive_post_res = Required<operations["confirmReceiveUsingPOST"]>['responses'][200]['content']['*/*']

/** 创建订单 - post请求参数 */
export type _v1_product_app_order_create_post_req = Required<operations["createUsingPOST_7"]>['requestBody']['content']['application/json']
/** 创建订单 - post响应参数 */
export type _v1_product_app_order_create_post_res = Required<operations["createUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

/** 延长收货 - post请求参数 */
export type _v1_product_app_order_delay_receive_post_req = Required<operations["doDelayReceiveUsingPOST"]>['requestBody']['content']['application/json']
/** 延长收货 - post响应参数 */
export type _v1_product_app_order_delay_receive_post_res = Required<operations["doDelayReceiveUsingPOST"]>['responses'][200]['content']['*/*']

/** 删除订单 - post请求参数 */
export type _v1_product_app_order_delete_post_req = Required<operations["deleteUsingPOST_4"]>['requestBody']['content']['application/json']
/** 删除订单 - post响应参数 */
export type _v1_product_app_order_delete_post_res = Required<operations["deleteUsingPOST_4"]>['responses'][200]['content']['*/*']

/** 修改订单 - post请求参数 */
export type _v1_product_app_order_modify_post_req = Required<operations["modifyUsingPOST_4"]>['requestBody']['content']['application/json']
/** 修改订单 - post响应参数 */
export type _v1_product_app_order_modify_post_res = Required<operations["modifyUsingPOST_4"]>['responses'][200]['content']['*/*']

/** 求订单总价 - post请求参数 */
export type _v1_product_app_order_price_calculation_post_req = Required<operations["priceCalculationUsingPOST_2"]>['requestBody']['content']['application/json']
/** 求订单总价 - post响应参数 */
export type _v1_product_app_order_price_calculation_post_res = Required<operations["priceCalculationUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 下单所需数据 - get请求参数 */
export type _v1_product_app_order_purchase_view_get_req = Required<operations["getPurchaseInfoUsingGET_3"]>['parameters']['query']
/** 下单所需数据 - get响应参数 */
export type _v1_product_app_order_purchase_view_get_res = Required<operations["getPurchaseInfoUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 延长收货 - post请求参数 */
export type _v1_product_merchant_order_delay_receive_post_req = Required<operations["doDelayReceiveUsingPOST_1"]>['requestBody']['content']['application/json']
/** 延长收货 - post响应参数 */
export type _v1_product_merchant_order_delay_receive_post_res = Required<operations["doDelayReceiveUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 发货 or 补发 - post请求参数 */
export type _v1_product_merchant_order_delivery_post_req = Required<operations["deliveryUsingPOST"]>['requestBody']['content']['application/json']
/** 发货 or 补发 - post响应参数 */
export type _v1_product_merchant_order_delivery_post_res = Required<operations["deliveryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单详细 - get请求参数 */
export type _v1_product_merchant_order_detail_get_req = Required<operations["detailUsingGET_27"]>['parameters']['query']
/** 订单详细 - get响应参数 */
export type _v1_product_merchant_order_detail_get_res = Required<operations["detailUsingGET_27"]>['responses'][200]['content']['*/*']['data']

/** 修改单号 - post请求参数 */
export type _v1_product_merchant_order_express_update_post_req = Required<operations["updateExpressUsingPOST"]>['requestBody']['content']['application/json']
/** 修改单号 - post响应参数 */
export type _v1_product_merchant_order_express_update_post_res = Required<operations["updateExpressUsingPOST"]>['responses'][200]['content']['*/*']

/** 订单列表 - post请求参数 */
export type _v1_product_merchant_order_list_post_req = Required<operations["listUsingPOST_24"]>['requestBody']['content']['application/json']
/** 订单列表 - post响应参数 */
export type _v1_product_merchant_order_list_post_res = Required<operations["listUsingPOST_24"]>['responses'][200]['content']['*/*']

/** 订单总览_访问数 - post请求参数 */
export type _v1_bc_admin_order_stat_accessor_cnt_post_req = Required<operations["getAccessorCntUsingPOST"]>['requestBody']['content']['application/json']
/** 订单总览_访问数 - post响应参数 */
export type _v1_bc_admin_order_stat_accessor_cnt_post_res = Required<operations["getAccessorCntUsingPOST"]>['responses'][200]['content']['*/*']

/** 订单总览 - post请求参数 */
export type _v1_bc_admin_order_stat_overview_post_req = Required<operations["overviewUsingPOST"]>['requestBody']
/** 订单总览 - post响应参数 */
export type _v1_bc_admin_order_stat_overview_post_res = Required<operations["overviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 订单总览_售额 - post请求参数 */
export type _v1_bc_admin_order_stat_sale_amount_post_req = Required<operations["getSaleAmountUsingPOST"]>['requestBody']['content']['application/json']
/** 订单总览_售额 - post响应参数 */
export type _v1_bc_admin_order_stat_sale_amount_post_res = Required<operations["getSaleAmountUsingPOST"]>['responses'][200]['content']['*/*']

/** 数据统计 - post请求参数 */
export type _v1_bc_admin_organization_order_amount_post_req = Required<operations["amountUsingPOST"]>['requestBody']['content']['application/json']
/** 数据统计 - post响应参数 */
export type _v1_bc_admin_organization_order_amount_post_res = Required<operations["amountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** createAd - post请求参数 */
export type _v1_bc_admin_organization_order_create_ad_post_req = Required<operations["createAdUsingPOST"]>['requestBody']['content']['application/json']
/** createAd - post响应参数 */
export type _v1_bc_admin_organization_order_create_ad_post_res = Required<operations["createAdUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 详情 - get请求参数 */
export type _v1_bc_admin_organization_order_details_get_req = Required<operations["detailsUsingGET"]>['parameters']['query']
/** 详情 - get响应参数 */
export type _v1_bc_admin_organization_order_details_get_res = Required<operations["detailsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 下架 - post请求参数 */
export type _v1_bc_admin_organization_order_dropped_post_req = Required<operations["droppedUsingPOST"]>['requestBody']['content']['application/json']
/** 下架 - post响应参数 */
export type _v1_bc_admin_organization_order_dropped_post_res = Required<operations["droppedUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** admin_list - post请求参数 */
export type _v1_bc_admin_organization_order_list_post_req = Required<operations["admin_listUsingPOST"]>['requestBody']['content']['application/json']
/** admin_list - post响应参数 */
export type _v1_bc_admin_organization_order_list_post_res = Required<operations["admin_listUsingPOST"]>['responses'][200]['content']['*/*']

/** ads_list - post请求参数 */
export type _v1_bc_company_organization_order_ads_post_req = Required<operations["ads_listUsingPOST"]>['requestBody']['content']['application/json']
/** ads_list - post响应参数 */
export type _v1_bc_company_organization_order_ads_post_res = Required<operations["ads_listUsingPOST"]>['responses'][200]['content']['*/*']

/** createSecurity - post请求参数 */
export type _v1_bc_company_organization_order_create_security_post_req = Required<operations["createSecurityUsingPOST"]>['requestBody']['content']['application/json']
/** createSecurity - post响应参数 */
export type _v1_bc_company_organization_order_create_security_post_res = Required<operations["createSecurityUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** saveServiceFee - post请求参数 */
export type _v1_bc_company_organization_order_create_servicefee_post_req = Required<operations["saveServiceFeeUsingPOST"]>['requestBody']['content']['application/json']
/** saveServiceFee - post响应参数 */
export type _v1_bc_company_organization_order_create_servicefee_post_res = Required<operations["saveServiceFeeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_company_organization_order_list_post_req = Required<operations["listUsingPOST_25"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_company_organization_order_list_post_res = Required<operations["listUsingPOST_25"]>['responses'][200]['content']['*/*']

/** nativePay - post请求参数 */
export type _v1_bc_company_organization_order_native_pay_post_req = Required<operations["nativePayUsingPOST"]>['requestBody']['content']['application/json']
/** nativePay - post响应参数 */
export type _v1_bc_company_organization_order_native_pay_post_res = Required<operations["nativePayUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** getPayResult - get请求参数 */
export type _v1_bc_company_organization_order_pay_result_get_req = Required<operations["getPayResultUsingGET_1"]>['parameters']['query']
/** getPayResult - get响应参数 */
export type _v1_bc_company_organization_order_pay_result_get_res = Required<operations["getPayResultUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** getFirstList - get请求参数 */
export type _v1_bc_admin_organization_product_first_list_get_req = Required<operations["getFirstListUsingGET"]>['parameters']['query']
/** getFirstList - get响应参数 */
export type _v1_bc_admin_organization_product_first_list_get_res = Required<operations["getFirstListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** admin_list - post请求参数 */
export type _v1_bc_admin_organization_product_list_post_req = Required<operations["admin_listUsingPOST_1"]>['requestBody']['content']['application/json']
/** admin_list - post响应参数 */
export type _v1_bc_admin_organization_product_list_post_res = Required<operations["admin_listUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** saveServiceFee - post请求参数 */
export type _v1_bc_admin_organization_product_save_servicefee_post_req = Required<operations["saveServiceFeeUsingPOST_1"]>['requestBody']['content']['application/json']
/** saveServiceFee - post响应参数 */
export type _v1_bc_admin_organization_product_save_servicefee_post_res = Required<operations["saveServiceFeeUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** checkPayResult - post请求参数 */
export type _v1_bc_app_payment_check_pay_result_post_req = Required<operations["checkPayResultUsingPOST"]>['requestBody']['content']['application/json']
/** checkPayResult - post响应参数 */
export type _v1_bc_app_payment_check_pay_result_post_res = Required<operations["checkPayResultUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** appWechatPayCpcn - post请求参数 */
export type _v1_bc_app_payment_cpcn_wechat_app_pay_post_req = Required<operations["appWechatPayCpcnUsingPOST"]>['requestBody']['content']['application/json']
/** appWechatPayCpcn - post响应参数 */
export type _v1_bc_app_payment_cpcn_wechat_app_pay_post_res = Required<operations["appWechatPayCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** jsApiWechatPayCpcn - post请求参数 */
export type _v1_bc_app_payment_cpcn_wechat_pay_post_req = Required<operations["jsApiWechatPayCpcnUsingPOST"]>['requestBody']['content']['application/json']
/** jsApiWechatPayCpcn - post响应参数 */
export type _v1_bc_app_payment_cpcn_wechat_pay_post_res = Required<operations["jsApiWechatPayCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** appWechatNotify - post请求参数 */
export type _v1_bc_app_payment_wechat_app_notify_post_req = Required<operations["appWechatNotifyUsingPOST"]>['requestBody']['content']['application/json']
/** appWechatNotify - post响应参数 */
export type _v1_bc_app_payment_wechat_app_notify_post_res = Required<operations["appWechatNotifyUsingPOST"]>['responses'][200]['content']['*/*']

/** appWechatPay - post请求参数 */
export type _v1_bc_app_payment_wechat_app_pay_post_req = Required<operations["appWechatPayUsingPOST"]>['requestBody']['content']['application/json']
/** appWechatPay - post响应参数 */
export type _v1_bc_app_payment_wechat_app_pay_post_res = Required<operations["appWechatPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** appWechatRefundNotify - post请求参数 */
export type _v1_bc_app_payment_wechat_app_refund_notify_post_req = Required<operations["appWechatRefundNotifyUsingPOST"]>['requestBody']['content']['application/json']
/** appWechatRefundNotify - post响应参数 */
export type _v1_bc_app_payment_wechat_app_refund_notify_post_res = Required<operations["appWechatRefundNotifyUsingPOST"]>['responses'][200]['content']['*/*']

/** wechatNativePayNotify - post请求参数 */
export type _v1_bc_app_payment_wechat_nativePayNotify_post_req = Required<operations["wechatNativePayNotifyUsingPOST"]>['requestBody']['content']['application/json']
/** wechatNativePayNotify - post响应参数 */
export type _v1_bc_app_payment_wechat_nativePayNotify_post_res = Required<operations["wechatNativePayNotifyUsingPOST"]>['responses'][200]['content']['*/*']

/** wechatNotify - post请求参数 */
export type _v1_bc_app_payment_wechat_notify_post_req = Required<operations["wechatNotifyUsingPOST"]>['requestBody']['content']['application/json']
/** wechatNotify - post响应参数 */
export type _v1_bc_app_payment_wechat_notify_post_res = Required<operations["wechatNotifyUsingPOST"]>['responses'][200]['content']['*/*']

/** jsApiWechatPay - post请求参数 */
export type _v1_bc_app_payment_wechat_pay_post_req = Required<operations["jsApiWechatPayUsingPOST"]>['requestBody']['content']['application/json']
/** jsApiWechatPay - post响应参数 */
export type _v1_bc_app_payment_wechat_pay_post_res = Required<operations["jsApiWechatPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** wechatRefundNotify - post请求参数 */
export type _v1_bc_app_payment_wechat_refund_notify_post_req = Required<operations["wechatRefundNotifyUsingPOST"]>['requestBody']['content']['application/json']
/** wechatRefundNotify - post响应参数 */
export type _v1_bc_app_payment_wechat_refund_notify_post_res = Required<operations["wechatRefundNotifyUsingPOST"]>['responses'][200]['content']['*/*']

/** add - post请求参数 */
export type _v1_bc_admin_popup_config_add_post_req = Required<operations["addUsingPOST_7"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_popup_config_add_post_res = Required<operations["addUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_popup_config_del_post_req = Required<operations["delUsingPOST_1"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_popup_config_del_post_res = Required<operations["delUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_popup_config_detail_get_req = Required<operations["detailUsingGET_28"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_popup_config_detail_get_res = Required<operations["detailUsingGET_28"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_popup_config_doAction_post_req = Required<operations["doActionUsingPOST_10"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_popup_config_doAction_post_res = Required<operations["doActionUsingPOST_10"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_popup_config_edit_post_req = Required<operations["editUsingPOST_5"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_popup_config_edit_post_res = Required<operations["editUsingPOST_5"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_popup_config_list_post_req = Required<operations["listUsingPOST_26"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_popup_config_list_post_res = Required<operations["listUsingPOST_26"]>['responses'][200]['content']['*/*']

/** appList - get请求参数 */
export type _v1_bc_app_popup_config_list_get_req = Required<operations["appListUsingGET"]>['parameters']['query']
/** appList - get响应参数 */
export type _v1_bc_app_popup_config_list_get_res = Required<operations["appListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** add - post请求参数 */
export type _v1_bc_admin_product_add_post_req = Required<operations["addUsingPOST_8"]>['requestBody']['content']['application/json']
/** add - post响应参数 */
export type _v1_bc_admin_product_add_post_res = Required<operations["addUsingPOST_8"]>['responses'][200]['content']['*/*']['data']

/** audit - post请求参数 */
export type _v1_bc_admin_product_audit_post_req = Required<operations["auditUsingPOST_2"]>['requestBody']['content']['application/json']
/** audit - post响应参数 */
export type _v1_bc_admin_product_audit_post_res = Required<operations["auditUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** conditionCollection - get请求参数 */
export type _v1_bc_admin_product_conditionCollection_get_req = Required<operations["conditionCollectionUsingGET_5"]>['parameters']['query']
/** conditionCollection - get响应参数 */
export type _v1_bc_admin_product_conditionCollection_get_res = Required<operations["conditionCollectionUsingGET_5"]>['responses'][200]['content']['*/*']['data']

/** copy - post请求参数 */
export type _v1_bc_admin_product_copy_post_req = Required<operations["copyUsingPOST"]>['requestBody']['content']['application/json']
/** copy - post响应参数 */
export type _v1_bc_admin_product_copy_post_res = Required<operations["copyUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** del - post请求参数 */
export type _v1_bc_admin_product_del_post_req = Required<operations["delUsingPOST_2"]>['requestBody']['content']['application/json']
/** del - post响应参数 */
export type _v1_bc_admin_product_del_post_res = Required<operations["delUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_product_detail_get_req = Required<operations["detailUsingGET_29"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_product_detail_get_res = Required<operations["detailUsingGET_29"]>['responses'][200]['content']['*/*']['data']

/** doAction - post请求参数 */
export type _v1_bc_admin_product_doAction_post_req = Required<operations["doActionUsingPOST_11"]>['requestBody']['content']['application/json']
/** doAction - post响应参数 */
export type _v1_bc_admin_product_doAction_post_res = Required<operations["doActionUsingPOST_11"]>['responses'][200]['content']['*/*']['data']

/** 发布 - post请求参数 */
export type _v1_bc_admin_product_doPublish_post_req = Required<operations["doPublishUsingPOST_3"]>['requestBody']['content']['application/json']
/** 发布 - post响应参数 */
export type _v1_bc_admin_product_doPublish_post_res = Required<operations["doPublishUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_product_edit_post_req = Required<operations["editUsingPOST_6"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_product_edit_post_res = Required<operations["editUsingPOST_6"]>['responses'][200]['content']['*/*']['data']

/** list - post请求参数 */
export type _v1_bc_admin_product_list_post_req = Required<operations["listUsingPOST_27"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_product_list_post_res = Required<operations["listUsingPOST_27"]>['responses'][200]['content']['*/*']

/** optionalList - post请求参数 */
export type _v1_bc_admin_product_optionalList_post_req = Required<operations["optionalListUsingPOST"]>['requestBody']['content']['application/json']
/** optionalList - post响应参数 */
export type _v1_bc_admin_product_optionalList_post_res = Required<operations["optionalListUsingPOST"]>['responses'][200]['content']['*/*']

/** 设置推荐 - post请求参数 */
export type _v1_bc_admin_product_setRecommend_post_req = Required<operations["setRecommendUsingPOST"]>['requestBody']['content']['application/json']
/** 设置推荐 - post响应参数 */
export type _v1_bc_admin_product_setRecommend_post_res = Required<operations["setRecommendUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 更新库存 - post请求参数 */
export type _v1_bc_admin_product_updateStock_post_req = Required<operations["updateStockUsingPOST"]>['requestBody']['content']['application/json']
/** 更新库存 - post响应参数 */
export type _v1_bc_admin_product_updateStock_post_res = Required<operations["updateStockUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** combinationProductList - post请求参数 */
export type _v1_bc_app_product_combination_product_list_post_req = Required<operations["combinationProductListUsingPOST"]>['requestBody']['content']['application/json']
/** combinationProductList - post响应参数 */
export type _v1_bc_app_product_combination_product_list_post_res = Required<operations["combinationProductListUsingPOST"]>['responses'][200]['content']['*/*']

/** detail - get请求参数 */
export type _v1_bc_app_product_detail_get_req = Required<operations["detailUsingGET_30"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_app_product_detail_get_res = Required<operations["detailUsingGET_30"]>['responses'][200]['content']['*/*']['data']

/** appList - post请求参数 */
export type _v1_bc_app_product_list_post_req = Required<operations["appListUsingPOST"]>['requestBody']['content']['application/json']
/** appList - post响应参数 */
export type _v1_bc_app_product_list_post_res = Required<operations["appListUsingPOST"]>['responses'][200]['content']['*/*']

/** recommendCategory - get请求参数 */
export type _v1_bc_app_product_recommend_category_get_req = Required<operations["recommendCategoryUsingGET"]>['parameters']['query']
/** recommendCategory - get响应参数 */
export type _v1_bc_app_product_recommend_category_get_res = Required<operations["recommendCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** recommendList - post请求参数 */
export type _v1_bc_app_product_recommend_list_post_req = Required<operations["recommendListUsingPOST"]>['requestBody']['content']['application/json']
/** recommendList - post响应参数 */
export type _v1_bc_app_product_recommend_list_post_res = Required<operations["recommendListUsingPOST"]>['responses'][200]['content']['*/*']

/** recommendProductCategory - get请求参数 */
export type _v1_bc_app_product_recommend_product_category_get_req = Required<operations["recommendProductCategoryUsingGET"]>['parameters']['query']
/** recommendProductCategory - get响应参数 */
export type _v1_bc_app_product_recommend_product_category_get_res = Required<operations["recommendProductCategoryUsingGET"]>['responses'][200]['content']['*/*']['data']

/** usercaseDetail - get请求参数 */
export type _v1_bc_app_product_usercase_detail_get_req = Required<operations["usercaseDetailUsingGET"]>['parameters']['query']
/** usercaseDetail - get响应参数 */
export type _v1_bc_app_product_usercase_detail_get_res = Required<operations["usercaseDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** usercaseList - post请求参数 */
export type _v1_bc_app_product_usercase_list_post_req = Required<operations["usercaseListUsingPOST"]>['requestBody']['content']['application/json']
/** usercaseList - post响应参数 */
export type _v1_bc_app_product_usercase_list_post_res = Required<operations["usercaseListUsingPOST"]>['responses'][200]['content']['*/*']

/** 税收分类编码规格列表 - post请求参数 */
export type _v1_bc_company_product_getOptionListWithTaxCode_post_req = Required<operations["getOptionListWithTaxCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 税收分类编码规格列表 - post响应参数 */
export type _v1_bc_company_product_getOptionListWithTaxCode_post_res = Required<operations["getOptionListWithTaxCodeUsingPOST"]>['responses'][200]['content']['*/*']

/** 设置商品税收编码 - post请求参数 */
export type _v1_bc_company_product_setProductTaxCode_post_req = Required<operations["setProductTaxCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 设置商品税收编码 - post响应参数 */
export type _v1_bc_company_product_setProductTaxCode_post_res = Required<operations["setProductTaxCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 税收分类编码列表 - post请求参数 */
export type _v1_bc_company_product_taxCodeList_post_req = Required<operations["taxCodeListUsingPOST"]>['requestBody']['content']['application/json']
/** 税收分类编码列表 - post响应参数 */
export type _v1_bc_company_product_taxCodeList_post_res = Required<operations["taxCodeListUsingPOST"]>['responses'][200]['content']['*/*']

/** combination_option_detail - get请求参数 */
export type _v1_bc_admin_product_option_combination_option_detail_get_req = Required<operations["combination_option_detailUsingGET"]>['parameters']['query']
/** combination_option_detail - get响应参数 */
export type _v1_bc_admin_product_option_combination_option_detail_get_res = Required<operations["combination_option_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** combinationOptionList - post请求参数 */
export type _v1_bc_app_product_option_combination_option_list_post_req = Required<operations["combinationOptionListUsingPOST"]>['requestBody']['content']['application/json']
/** combinationOptionList - post响应参数 */
export type _v1_bc_app_product_option_combination_option_list_post_res = Required<operations["combinationOptionListUsingPOST"]>['responses'][200]['content']['*/*']

/** detail - get请求参数 */
export type _v1_bc_app_product_option_option_detail_get_req = Required<operations["detailUsingGET_31"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_app_product_option_option_detail_get_res = Required<operations["detailUsingGET_31"]>['responses'][200]['content']['*/*']['data']

/** detail - get请求参数 */
export type _v1_bc_admin_product_stock_detail_get_req = Required<operations["detailUsingGET_32"]>['parameters']['query']
/** detail - get响应参数 */
export type _v1_bc_admin_product_stock_detail_get_res = Required<operations["detailUsingGET_32"]>['responses'][200]['content']['*/*']['data']

/** edit - post请求参数 */
export type _v1_bc_admin_product_stock_edit_post_req = Required<operations["editUsingPOST_7"]>['requestBody']['content']['application/json']
/** edit - post响应参数 */
export type _v1_bc_admin_product_stock_edit_post_res = Required<operations["editUsingPOST_7"]>['responses'][200]['content']['*/*']['data']

/** export - post请求参数 */
export type _v1_bc_admin_product_stock_export_post_req = Required<operations["exportUsingPOST"]>['requestBody']['content']['application/json']
/** export - post响应参数 */
export type _v1_bc_admin_product_stock_export_post_res = Required<operations["exportUsingPOST"]>['responses'][200]['content']

/** list - post请求参数 */
export type _v1_bc_admin_product_stock_list_post_req = Required<operations["listUsingPOST_28"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_product_stock_list_post_res = Required<operations["listUsingPOST_28"]>['responses'][200]['content']['*/*']

/** statistics - get请求参数 */
export type _v1_bc_admin_product_stock_statistics_get_req = Required<operations["statisticsUsingGET"]>['parameters']['query']
/** statistics - get响应参数 */
export type _v1_bc_admin_product_stock_statistics_get_res = Required<operations["statisticsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** stockLog - get请求参数 */
export type _v1_bc_admin_product_stock_stock_log_get_req = Required<operations["stockLogUsingGET"]>['parameters']['query']
/** stockLog - get响应参数 */
export type _v1_bc_admin_product_stock_stock_log_get_res = Required<operations["stockLogUsingGET"]>['responses'][200]['content']['*/*']['data']

/** warningValueEdit - post请求参数 */
export type _v1_bc_admin_product_stock_warning_value_edit_post_req = Required<operations["warningValueEditUsingPOST"]>['requestBody']['content']['application/json']
/** warningValueEdit - post响应参数 */
export type _v1_bc_admin_product_stock_warning_value_edit_post_res = Required<operations["warningValueEditUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 状态列表等查询条件 - get请求参数 */
export type _v1_bc_admin_refund_condition_collection_get_req = Required<operations["conditionCollectionUsingGET_6"]>['parameters']['query']
/** 状态列表等查询条件 - get响应参数 */
export type _v1_bc_admin_refund_condition_collection_get_res = Required<operations["conditionCollectionUsingGET_6"]>['responses'][200]['content']['*/*']

/** list - post请求参数 */
export type _v1_bc_admin_refund_list_post_req = Required<operations["listUsingPOST_29"]>['requestBody']['content']['application/json']
/** list - post响应参数 */
export type _v1_bc_admin_refund_list_post_res = Required<operations["listUsingPOST_29"]>['responses'][200]['content']['*/*']

/** 找机构店铺数据统计 - get请求参数 */
export type _v1_bc_merchant_item_stat_getShopStatistics_get_req = Required<operations["getShopStatisticsUsingGET"]>['parameters']['query']
/** 找机构店铺数据统计 - get响应参数 */
export type _v1_bc_merchant_item_stat_getShopStatistics_get_res = Required<operations["getShopStatisticsUsingGET"]>['responses'][200]['content']['*/*']

/** overview - get请求参数 */
export type _v1_bc_merchant_item_stat_overview_get_req = Required<operations["overviewUsingGET"]>['parameters']['query']
/** overview - get响应参数 */
export type _v1_bc_merchant_item_stat_overview_get_res = Required<operations["overviewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** APP店铺 Service订单总览 - get请求参数 */
export type _v1_bc_merchant_order_stat_app_overview_get_req = Required<operations["appServiceOverviewUsingGET"]>['parameters']['query']
/** APP店铺 Service订单总览 - get响应参数 */
export type _v1_bc_merchant_order_stat_app_overview_get_res = Required<operations["appServiceOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 虚拟卡订单总览 - get请求参数 */
export type _v1_bc_merchant_order_stat_cardOverview_get_req = Required<operations["cardOverviewUsingGET"]>['parameters']['query']
/** 虚拟卡订单总览 - get响应参数 */
export type _v1_bc_merchant_order_stat_cardOverview_get_res = Required<operations["cardOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** favorite - get请求参数 */
export type _v1_bc_merchant_order_stat_favorite_get_req = Required<operations["favoriteUsingGET"]>['parameters']['query']
/** favorite - get响应参数 */
export type _v1_bc_merchant_order_stat_favorite_get_res = Required<operations["favoriteUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单总览 - get请求参数 */
export type _v1_bc_merchant_order_stat_overview_get_req = Required<operations["overviewUsingGET_1"]>['parameters']['query']
/** 订单总览 - get响应参数 */
export type _v1_bc_merchant_order_stat_overview_get_res = Required<operations["overviewUsingGET_1"]>['responses'][200]['content']['*/*']

/** APP店铺 商品订单总览 - get请求参数 */
export type _v1_product_merchant_order_stat_app_overview_get_req = Required<operations["appProductOverviewUsingGET"]>['parameters']['query']
/** APP店铺 商品订单总览 - get响应参数 */
export type _v1_product_merchant_order_stat_app_overview_get_res = Required<operations["appProductOverviewUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 订单总览 - get请求参数 */
export type _v1_product_merchant_order_stat_overview_get_req = Required<operations["overviewUsingGET_2"]>['parameters']['query']
/** 订单总览 - get响应参数 */
export type _v1_product_merchant_order_stat_overview_get_res = Required<operations["overviewUsingGET_2"]>['responses'][200]['content']['*/*']

/** adm_detail - get请求参数 */
export type _v1_bc_admin_tag_detail_get_req = Required<operations["adm_detailUsingGET"]>['parameters']['query']
/** adm_detail - get响应参数 */
export type _v1_bc_admin_tag_detail_get_res = Required<operations["adm_detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** getItemTags - get请求参数 */
export type _v1_bc_admin_tag_for_item_get_req = Required<operations["getItemTagsUsingGET_1"]>['parameters']['query']
/** getItemTags - get响应参数 */
export type _v1_bc_admin_tag_for_item_get_res = Required<operations["getItemTagsUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** getItemTags - get请求参数 */
export type _v1_bc_admin_tag_list_get_req = Required<operations["getItemTagsUsingGET"]>['parameters']['query']
/** getItemTags - get响应参数 */
export type _v1_bc_admin_tag_list_get_res = Required<operations["getItemTagsUsingGET"]>['responses'][200]['content']['*/*']['data']

/** updateOrCreate - post请求参数 */
export type _v1_bc_admin_tag_save_post_req = Required<operations["updateOrCreateUsingPOST_1"]>['requestBody']['content']['application/json']
/** updateOrCreate - post响应参数 */
export type _v1_bc_admin_tag_save_post_res = Required<operations["updateOrCreateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** update - post请求参数 */
export type _v1_bc_admin_tag_update_post_req = Required<operations["updateUsingPOST_1"]>['requestBody']['content']['application/json']
/** update - post响应参数 */
export type _v1_bc_admin_tag_update_post_res = Required<operations["updateUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 获取模板属性 - get请求参数 */
export type _v1_bc_merchant_template_attribute_get_req = Required<operations["getByCodeUsingGET"]>['parameters']['query']
/** 获取模板属性 - get响应参数 */
export type _v1_bc_merchant_template_attribute_get_res = Required<operations["getByCodeUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 模板列表 - get请求参数 */
export type _v1_bc_admin_template_list_get_req = Required<operations["listUsingGET_8"]>['parameters']['query']
/** 模板列表 - get响应参数 */
export type _v1_bc_admin_template_list_get_res = Required<operations["listUsingGET_8"]>['responses'][200]['content']['*/*']['data']

/** addFile - post请求参数 */
export type _v1_bc_admin_video_space_add_file_post_req = Required<operations["addFileUsingPOST_2"]>['requestBody']['content']['application/json']
/** addFile - post响应参数 */
export type _v1_bc_admin_video_space_add_file_post_res = Required<operations["addFileUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** addFolder - post请求参数 */
export type _v1_bc_admin_video_space_add_folder_post_req = Required<operations["addFolderUsingPOST_1"]>['requestBody']['content']['application/json']
/** addFolder - post响应参数 */
export type _v1_bc_admin_video_space_add_folder_post_res = Required<operations["addFolderUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** addFile - post请求参数 */
export type _v1_bc_admin_video_space_del_post_req = Required<operations["addFileUsingPOST_3"]>['requestBody']['content']['application/json']
/** addFile - post响应参数 */
export type _v1_bc_admin_video_space_del_post_res = Required<operations["addFileUsingPOST_3"]>['responses'][200]['content']['*/*']['data']

/** getItree - get请求参数 */
export type _v1_bc_admin_video_space_list_get_req = Required<operations["getItreeUsingGET_1"]>['parameters']['query']
/** getItree - get响应参数 */
export type _v1_bc_admin_video_space_list_get_res = Required<operations["getItreeUsingGET_1"]>['responses'][200]['content']['*/*']['data']

