import type { operations } from './schema'

/** 测试专用-付款退款单 - post请求参数 */
export type _v1_bc_admin_account_PaymentRefundSlip_post_req = Required<operations["PaymentRefundSlipUsingPOST"]>['requestBody']['content']['application/json']
/** 测试专用-付款退款单 - post响应参数 */
export type _v1_bc_admin_account_PaymentRefundSlip_post_res = Required<operations["PaymentRefundSlipUsingPOST"]>['responses'][200]['content']

/** 测试专用-付款单 - post请求参数 */
export type _v1_bc_admin_account_PaymentSlip_post_req = Required<operations["PaymentSlipUsingPOST"]>['requestBody']['content']['application/json']
/** 测试专用-付款单 - post响应参数 */
export type _v1_bc_admin_account_PaymentSlip_post_res = Required<operations["PaymentSlipUsingPOST"]>['responses'][200]['content']

/** 测试专用-收款退款单 - post请求参数 */
export type _v1_bc_admin_account_ReceiptRefund_post_req = Required<operations["ReceiptRefundUsingPOST"]>['requestBody']['content']['application/json']
/** 测试专用-收款退款单 - post响应参数 */
export type _v1_bc_admin_account_ReceiptRefund_post_res = Required<operations["ReceiptRefundUsingPOST"]>['responses'][200]['content']

/** 合同管理-设置手续费 - post请求参数 */
export type _v1_bc_admin_account_commissionConfig_post_req = Required<operations["commissionConfigUsingPOST"]>['requestBody']['content']['application/json']
/** 合同管理-设置手续费 - post响应参数 */
export type _v1_bc_admin_account_commissionConfig_post_res = Required<operations["commissionConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 合同管理-手续费设置列表 - get请求参数 */
export type _v1_bc_admin_account_commissionConfigList_get_req = Required<operations["commissionConfigListUsingGET"]>['parameters']['query']
/** 合同管理-手续费设置列表 - get响应参数 */
export type _v1_bc_admin_account_commissionConfigList_get_res = Required<operations["commissionConfigListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 测试专用-待结算单 - get请求参数 */
export type _v1_bc_admin_account_createStatement_get_req = Required<operations["createStatementUsingGET"]>['parameters']['query']
/** 测试专用-待结算单 - get响应参数 */
export type _v1_bc_admin_account_createStatement_get_res = Required<operations["createStatementUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取设置列表-分页 - post请求参数 */
export type _v1_bc_admin_account_getConfigList_post_req = Required<operations["getConfigListUsingPOST"]>['requestBody']['content']['application/json']
/** 获取设置列表-分页 - post响应参数 */
export type _v1_bc_admin_account_getConfigList_post_res = Required<operations["getConfigListUsingPOST"]>['responses'][200]['content']['*/*']

/** 初始化数据，财务自动化上线之后删除 - get请求参数 */
export type _v1_bc_admin_account_initData_get_req = Required<operations["initDataUsingGET"]>['parameters']['query']
/** 初始化数据，财务自动化上线之后删除 - get响应参数 */
export type _v1_bc_admin_account_initData_get_res = Required<operations["initDataUsingGET"]>['responses'][200]['content']

/** 保证金设置列表 - get请求参数 */
export type _v1_bc_admin_account_marginConfigList_get_req = Required<operations["marginConfigListUsingGET"]>['parameters']['query']
/** 保证金设置列表 - get响应参数 */
export type _v1_bc_admin_account_marginConfigList_get_res = Required<operations["marginConfigListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保证金退还列表 - post请求参数 */
export type _v1_bc_admin_account_marginRefundList_post_req = Required<operations["marginRefundListUsingPOST"]>['requestBody']['content']['application/json']
/** 保证金退还列表 - post响应参数 */
export type _v1_bc_admin_account_marginRefundList_post_res = Required<operations["marginRefundListUsingPOST"]>['responses'][200]['content']['*/*']

/** 测试专用-提前结算 - get请求参数 */
export type _v1_bc_admin_account_preStatement_get_req = Required<operations["preStatementUsingGET"]>['parameters']['query']
/** 测试专用-提前结算 - get响应参数 */
export type _v1_bc_admin_account_preStatement_get_res = Required<operations["preStatementUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 测试专用-收款单 - post请求参数 */
export type _v1_bc_admin_account_receipt_post_req = Required<operations["receiptUsingPOST"]>['requestBody']['content']['application/json']
/** 测试专用-收款单 - post响应参数 */
export type _v1_bc_admin_account_receipt_post_res = Required<operations["receiptUsingPOST"]>['responses'][200]['content']

/** 测试专用-收款退款单v2 - post请求参数 */
export type _v1_bc_admin_account_receiptRefundV2_post_req = Required<operations["receiptUsingPOST_1"]>['requestBody']['content']['application/json']
/** 测试专用-收款退款单v2 - post响应参数 */
export type _v1_bc_admin_account_receiptRefundV2_post_res = Required<operations["receiptUsingPOST_1"]>['responses'][200]['content']

/** 测试专用-收款单v2 - post请求参数 */
export type _v1_bc_admin_account_receiptV2_post_req = Required<operations["receiptUsingPOST_2"]>['requestBody']['content']['application/json']
/** 测试专用-收款单v2 - post响应参数 */
export type _v1_bc_admin_account_receiptV2_post_res = Required<operations["receiptUsingPOST_2"]>['responses'][200]['content']

/** 保证金设置 - post请求参数 */
export type _v1_bc_admin_account_setMarginConfig_post_req = Required<operations["setMarginConfigUsingPOST"]>['requestBody']['content']['application/json']
/** 保证金设置 - post响应参数 */
export type _v1_bc_admin_account_setMarginConfig_post_res = Required<operations["setMarginConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 商家手续费活动记录 - get请求参数 */
export type _v1_bc_admin_account_supplierCommissionActivityLog_get_req = Required<operations["getSupplierCommissionActivityLogUsingGET"]>['parameters']['query']
/** 商家手续费活动记录 - get响应参数 */
export type _v1_bc_admin_account_supplierCommissionActivityLog_get_res = Required<operations["getSupplierCommissionActivityLogUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 商家手续费列表 - get请求参数 */
export type _v1_bc_admin_account_supplierCommissionList_get_req = Required<operations["supplierCommissionListUsingGET"]>['parameters']['query']
/** 商家手续费列表 - get响应参数 */
export type _v1_bc_admin_account_supplierCommissionList_get_res = Required<operations["supplierCommissionListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 商家手续费列表 - post请求参数 */
export type _v1_bc_admin_account_supplierCommissionListPage_post_req = Required<operations["supplierCommissionListPageUsingPOST"]>['requestBody']['content']['application/json']
/** 商家手续费列表 - post响应参数 */
export type _v1_bc_admin_account_supplierCommissionListPage_post_res = Required<operations["supplierCommissionListPageUsingPOST"]>['responses'][200]['content']['*/*']

/** 是否满足保证金退还条件 - get请求参数 */
export type _v1_bc_company_account_canRefundMargin_get_req = Required<operations["canRefundMarginUsingGET"]>['parameters']['query']
/** 是否满足保证金退还条件 - get响应参数 */
export type _v1_bc_company_account_canRefundMargin_get_res = Required<operations["canRefundMarginUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取保证金账户 - get请求参数 */
export type _v1_bc_company_account_getMarginAccount_get_req = Required<operations["getMarginAccountUsingGET"]>['parameters']['query']
/** 获取保证金账户 - get响应参数 */
export type _v1_bc_company_account_getMarginAccount_get_res = Required<operations["getMarginAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保证金账单列表 - get请求参数 */
export type _v1_bc_company_account_marginOrderList_get_req = Required<operations["getMarginOrderListUsingGET"]>['parameters']['query']
/** 保证金账单列表 - get响应参数 */
export type _v1_bc_company_account_marginOrderList_get_res = Required<operations["getMarginOrderListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 保证金退还申请 - get请求参数 */
export type _v1_bc_company_account_marginRefundApply_get_req = Required<operations["marginRefundApplyUsingGET"]>['parameters']['query']
/** 保证金退还申请 - get响应参数 */
export type _v1_bc_company_account_marginRefundApply_get_res = Required<operations["marginRefundApplyUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 账户余额信息 - get请求参数 */
export type _v1_bc_server_account_moneyDetail_get_req = Required<operations["moneyDetailUsingGET"]>['parameters']['query']
/** 账户余额信息 - get响应参数 */
export type _v1_bc_server_account_moneyDetail_get_res = Required<operations["moneyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 收支明细 - post请求参数 */
export type _v1_bc_admin_accountLog_moneyDetail_post_req = Required<operations["moneyDetailUsingPOST"]>['requestBody']['content']['application/json']
/** 收支明细 - post响应参数 */
export type _v1_bc_admin_accountLog_moneyDetail_post_res = Required<operations["moneyDetailUsingPOST"]>['responses'][200]['content']['*/*']

/** 收支明细-金额统计 - post请求参数 */
export type _v1_bc_admin_accountLog_moneyDetailCount_post_req = Required<operations["moneyDetailCountUsingPOST"]>['requestBody']['content']['application/json']
/** 收支明细-金额统计 - post响应参数 */
export type _v1_bc_admin_accountLog_moneyDetailCount_post_res = Required<operations["moneyDetailCountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 收入详情 - get请求参数 */
export type _v1_bc_server_accountLog_worker_money_detail_get_req = Required<operations["workerMoneyDetailUsingGET"]>['parameters']['query']
/** 收入详情 - get响应参数 */
export type _v1_bc_server_accountLog_worker_money_detail_get_res = Required<operations["workerMoneyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 银行编码 - post请求参数 */
export type _v1_bc_company_cpcn_bankCode_post_req = Required<operations["bankCodeUsingPOST"]>['requestBody']
/** 银行编码 - post响应参数 */
export type _v1_bc_company_cpcn_bankCode_post_res = Required<operations["bankCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 中金分账-自动任务异常时，可使用此接口继续执行 - get请求参数 */
export type _v1_bc_company_cpcn_batchSplitTask_get_req = Required<operations["batchSplitTaskUsingGET"]>['parameters']['query']
/** 中金分账-自动任务异常时，可使用此接口继续执行 - get响应参数 */
export type _v1_bc_company_cpcn_batchSplitTask_get_res = Required<operations["batchSplitTaskUsingGET"]>['responses'][200]['content']

/** 测试-批量提现 - get请求参数 */
export type _v1_bc_company_cpcn_batchWithdrawal_get_req = Required<operations["batchWithdrawalUsingGET"]>['parameters']['query']
/** 测试-批量提现 - get响应参数 */
export type _v1_bc_company_cpcn_batchWithdrawal_get_res = Required<operations["batchWithdrawalUsingGET"]>['responses'][200]['content']['*/*']['data']

/** bindBank - post请求参数 */
export type _v1_bc_company_cpcn_bindBank_post_req = Required<operations["bindBankUsingPOST"]>['requestBody']['content']['application/json']
/** bindBank - post响应参数 */
export type _v1_bc_company_cpcn_bindBank_post_res = Required<operations["bindBankUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 绑卡确认 - get请求参数 */
export type _v1_bc_company_cpcn_confirmBindBank_get_req = Required<operations["confirmBindBankUsingGET"]>['parameters']['query']
/** 绑卡确认 - get响应参数 */
export type _v1_bc_company_cpcn_confirmBindBank_get_res = Required<operations["confirmBindBankUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 企业分类类别 - post请求参数 */
export type _v1_bc_company_cpcn_corporationCategory_post_req = Required<operations["corporationCategoryUsingPOST"]>['requestBody']
/** 企业分类类别 - post响应参数 */
export type _v1_bc_company_cpcn_corporationCategory_post_res = Required<operations["corporationCategoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 结算银行设置 - post请求参数 */
export type _v1_bc_company_cpcn_createAccount_post_req = Required<operations["createAccountUsingPOST"]>['requestBody']['content']['application/json']
/** 结算银行设置 - post响应参数 */
export type _v1_bc_company_cpcn_createAccount_post_res = Required<operations["createAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** createResult - post请求参数 */
export type _v1_bc_company_cpcn_createResult_post_req = Required<operations["createResultUsingPOST"]>['requestBody']['content']['application/json']
/** createResult - post响应参数 */
export type _v1_bc_company_cpcn_createResult_post_res = Required<operations["createResultUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** createTrade - post请求参数 */
export type _v1_bc_company_cpcn_createTrade_post_req = Required<operations["createTradeUsingPOST"]>['requestBody']['content']['application/json']
/** createTrade - post响应参数 */
export type _v1_bc_company_cpcn_createTrade_post_res = Required<operations["createTradeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 银行卡管理 - post请求参数 */
export type _v1_bc_company_cpcn_getBankInfoList_post_req = Required<operations["getBankInfoListUsingPOST"]>['requestBody']
/** 银行卡管理 - post响应参数 */
export type _v1_bc_company_cpcn_getBankInfoList_post_res = Required<operations["getBankInfoListUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 提现列表 - post请求参数 */
export type _v1_bc_company_cpcn_getCompanyList_post_req = Required<operations["getCompanyListUsingPOST"]>['requestBody']['content']['application/json']
/** 提现列表 - post响应参数 */
export type _v1_bc_company_cpcn_getCompanyList_post_res = Required<operations["getCompanyListUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取详情 - post请求参数 */
export type _v1_bc_company_cpcn_getDetail_post_req = Required<operations["getDetailUsingPOST"]>['requestBody']
/** 获取详情 - post响应参数 */
export type _v1_bc_company_cpcn_getDetail_post_res = Required<operations["getDetailUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 获取账户基本信息和余额 - get请求参数 */
export type _v1_bc_company_cpcn_getShopSimpleInfoAndBalance_get_req = Required<operations["getShopSimpleInfoAndBalanceUsingGET"]>['parameters']['query']
/** 获取账户基本信息和余额 - get响应参数 */
export type _v1_bc_company_cpcn_getShopSimpleInfoAndBalance_get_res = Required<operations["getShopSimpleInfoAndBalanceUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 测试-退款 - post请求参数 */
export type _v1_bc_company_cpcn_refund_post_req = Required<operations["tx5026UsingPOST"]>['requestBody']['content']['application/json']
/** 测试-退款 - post响应参数 */
export type _v1_bc_company_cpcn_refund_post_res = Required<operations["tx5026UsingPOST"]>['responses'][200]['content']

/** 测试-提现查询 - get请求参数 */
export type _v1_bc_company_cpcn_tx4656_get_req = Required<operations["tx4656UsingGET"]>['parameters']['query']
/** 测试-提现查询 - get响应参数 */
export type _v1_bc_company_cpcn_tx4656_get_res = Required<operations["tx4656UsingGET"]>['responses'][200]['content']['*/*']['data']

/** 用户信息查询 - get请求参数 */
export type _v1_bc_company_cpcn_tx4691_get_req = Required<operations["tx4691UsingGET"]>['parameters']['query']
/** 用户信息查询 - get响应参数 */
export type _v1_bc_company_cpcn_tx4691_get_res = Required<operations["tx4691UsingGET"]>['responses'][200]['content']['*/*']['data']

/** 支付查询 - post请求参数 */
export type _v1_bc_company_cpcn_tx5016_post_req = Required<operations["tx5016UsingPOST"]>['parameters']['query']
/** 支付查询 - post响应参数 */
export type _v1_bc_company_cpcn_tx5016_post_res = Required<operations["tx5016UsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 测试-退款查询 - get请求参数 */
export type _v1_bc_company_cpcn_tx5026_get_req = Required<operations["tx5026UsingGET"]>['parameters']['query']
/** 测试-退款查询 - get响应参数 */
export type _v1_bc_company_cpcn_tx5026_get_res = Required<operations["tx5026UsingGET"]>['responses'][200]['content']['*/*']

/** 延迟分账 - post请求参数 */
export type _v1_bc_company_cpcn_tx5031_post_req = Required<operations["tx5031UsingPOST"]>['requestBody']['content']['application/json']
/** 延迟分账 - post响应参数 */
export type _v1_bc_company_cpcn_tx5031_post_res = Required<operations["tx5031UsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 测试接口-影印件采集 - post请求参数 */
export type _v1_bc_company_cpcn_uploadImageToCpcn_post_req = Required<operations["uploadImageToCpcnUsingPOST"]>['parameters']['query']
/** 测试接口-影印件采集 - post响应参数 */
export type _v1_bc_company_cpcn_uploadImageToCpcn_post_res = Required<operations["uploadImageToCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 提现 - get请求参数 */
export type _v1_bc_company_cpcn_withdrawal_get_req = Required<operations["withdrawalUsingGET"]>['parameters']['query']
/** 提现 - get响应参数 */
export type _v1_bc_company_cpcn_withdrawal_get_res = Required<operations["withdrawalUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 撤销 - get请求参数 */
export type _v1_bc_admin_invoice_commissionCancel_get_req = Required<operations["commissionCancelUsingGET"]>['parameters']['query']
/** 撤销 - get响应参数 */
export type _v1_bc_admin_invoice_commissionCancel_get_res = Required<operations["commissionCancelUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 确认 - post请求参数 */
export type _v1_bc_admin_invoice_commissionConfirm_post_req = Required<operations["commissionConfirmUsingPOST"]>['requestBody']['content']['application/json']
/** 确认 - post响应参数 */
export type _v1_bc_admin_invoice_commissionConfirm_post_res = Required<operations["commissionConfirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 开票 - post请求参数 */
export type _v1_bc_admin_invoice_commissionCreate_post_req = Required<operations["commissionCreateUsingPOST"]>['requestBody']['content']['application/json']
/** 开票 - post响应参数 */
export type _v1_bc_admin_invoice_commissionCreate_post_res = Required<operations["commissionCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 发票确认 - post请求参数 */
export type _v1_bc_admin_invoice_confirm_post_req = Required<operations["confirmUsingPOST"]>['requestBody']['content']['application/json']
/** 发票确认 - post响应参数 */
export type _v1_bc_admin_invoice_confirm_post_res = Required<operations["confirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 营销费用详情 - get请求参数 */
export type _v1_bc_admin_invoice_discountDetail_get_req = Required<operations["discountDetailUsingGET"]>['parameters']['query']
/** 营销费用详情 - get响应参数 */
export type _v1_bc_admin_invoice_discountDetail_get_res = Required<operations["discountDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 发票审核 - post请求参数 */
export type _v1_bc_admin_invoice_doAction_post_req = Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']
/** 发票审核 - post响应参数 */
export type _v1_bc_admin_invoice_doAction_post_res = Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 导出发票列表 - post请求参数 */
export type _v1_bc_admin_invoice_exportList_post_req = Required<operations["exportListUsingPOST"]>['requestBody']['content']['application/json']
/** 导出发票列表 - post响应参数 */
export type _v1_bc_admin_invoice_exportList_post_res = Required<operations["exportListUsingPOST"]>['responses'][200]['content']

/** 导出发票列表 - get请求参数 */
export type _v1_bc_admin_invoice_exportListByGet_get_req = Required<operations["exportListUsingGET"]>['parameters']['query']
/** 导出发票列表 - get响应参数 */
export type _v1_bc_admin_invoice_exportListByGet_get_res = Required<operations["exportListUsingGET"]>['responses'][200]['content']

/** 获取商家发票信息设置 - get请求参数 */
export type _v1_bc_admin_invoice_getSupplierTitle_get_req = Required<operations["getSupplierTitleUsingGET"]>['parameters']['query']
/** 获取商家发票信息设置 - get响应参数 */
export type _v1_bc_admin_invoice_getSupplierTitle_get_res = Required<operations["getSupplierTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取发票信息设置 - get请求参数 */
export type _v1_bc_admin_invoice_getTitle_get_req = Required<operations["getTitleUsingGET"]>['parameters']['query']
/** 获取发票信息设置 - get响应参数 */
export type _v1_bc_admin_invoice_getTitle_get_res = Required<operations["getTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 发票列表 - post请求参数 */
export type _v1_bc_admin_invoice_list_post_req = Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']
/** 发票列表 - post响应参数 */
export type _v1_bc_admin_invoice_list_post_res = Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

/** 发票信息设置 - post请求参数 */
export type _v1_bc_admin_invoice_setTitle_post_req = Required<operations["setTitleUsingPOST"]>['requestBody']['content']['application/json']
/** 发票信息设置 - post响应参数 */
export type _v1_bc_admin_invoice_setTitle_post_res = Required<operations["setTitleUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 申请发票 - post请求参数 */
export type _v1_bc_app_invoice_add_post_req = Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']
/** 申请发票 - post响应参数 */
export type _v1_bc_app_invoice_add_post_res = Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 开票详情 - get请求参数 */
export type _v1_bc_app_invoice_detail_get_req = Required<operations["detailUsingGET"]>['parameters']['query']
/** 开票详情 - get响应参数 */
export type _v1_bc_app_invoice_detail_get_res = Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 发票记录 - post请求参数 */
export type _v1_bc_app_invoice_list_post_req = Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']
/** 发票记录 - post响应参数 */
export type _v1_bc_app_invoice_list_post_res = Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 订单发票开票 - post请求参数 */
export type _v1_bc_company_invoice_add_post_req = Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']
/** 订单发票开票 - post响应参数 */
export type _v1_bc_company_invoice_add_post_res = Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 订单发票开票-发票云 - get请求参数 */
export type _v1_bc_company_invoice_autoCreate_get_req = Required<operations["autoCreateUsingGET"]>['parameters']['query']
/** 订单发票开票-发票云 - get响应参数 */
export type _v1_bc_company_invoice_autoCreate_get_res = Required<operations["autoCreateUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 平台开票列表 - post请求参数 */
export type _v1_bc_company_invoice_commissionList_post_req = Required<operations["commissionListUsingPOST"]>['requestBody']['content']['application/json']
/** 平台开票列表 - post响应参数 */
export type _v1_bc_company_invoice_commissionList_post_res = Required<operations["commissionListUsingPOST"]>['responses'][200]['content']['*/*']

/** 查询发票云开票结果 - get请求参数 */
export type _v1_bc_company_invoice_createResult_get_req = Required<operations["createResultUsingGET"]>['parameters']['query']
/** 查询发票云开票结果 - get响应参数 */
export type _v1_bc_company_invoice_createResult_get_res = Required<operations["createResultUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 撤销开票 - get请求参数 */
export type _v1_bc_company_invoice_discountCancel_get_req = Required<operations["discountCancelUsingGET"]>['parameters']['query']
/** 撤销开票 - get响应参数 */
export type _v1_bc_company_invoice_discountCancel_get_res = Required<operations["discountCancelUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 确认开票-上传发票 - post请求参数 */
export type _v1_bc_company_invoice_discountConfirm_post_req = Required<operations["discountConfirmUsingPOST"]>['requestBody']['content']['application/json']
/** 确认开票-上传发票 - post响应参数 */
export type _v1_bc_company_invoice_discountConfirm_post_res = Required<operations["discountConfirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 开票-生成票据 - post请求参数 */
export type _v1_bc_company_invoice_discountCreate_post_req = Required<operations["discountCreateUsingPOST"]>['requestBody']['content']['application/json']
/** 开票-生成票据 - post响应参数 */
export type _v1_bc_company_invoice_discountCreate_post_res = Required<operations["discountCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 历史处理记录详情 - get请求参数 */
export type _v1_bc_company_invoice_discountDetail_get_req = Required<operations["discountDetailUsingGET_1"]>['parameters']['query']
/** 历史处理记录详情 - get响应参数 */
export type _v1_bc_company_invoice_discountDetail_get_res = Required<operations["discountDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 营销费用发票列表 - post请求参数 */
export type _v1_bc_company_invoice_discountList_post_req = Required<operations["discountListUsingPOST"]>['requestBody']['content']['application/json']
/** 营销费用发票列表 - post响应参数 */
export type _v1_bc_company_invoice_discountList_post_res = Required<operations["discountListUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取平台发票信息设置 - get请求参数 */
export type _v1_bc_company_invoice_getPlatformTitle_get_req = Required<operations["getPlatformTitleUsingGET"]>['parameters']['query']
/** 获取平台发票信息设置 - get响应参数 */
export type _v1_bc_company_invoice_getPlatformTitle_get_res = Required<operations["getPlatformTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 获取发票信息设置 - get请求参数 */
export type _v1_bc_company_invoice_getTitle_get_req = Required<operations["getTitleUsingGET_1"]>['parameters']['query']
/** 获取发票信息设置 - get响应参数 */
export type _v1_bc_company_invoice_getTitle_get_res = Required<operations["getTitleUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 订单发票列表 - post请求参数 */
export type _v1_bc_company_invoice_personalApplyList_post_req = Required<operations["personalApplyListUsingPOST"]>['requestBody']['content']['application/json']
/** 订单发票列表 - post响应参数 */
export type _v1_bc_company_invoice_personalApplyList_post_res = Required<operations["personalApplyListUsingPOST"]>['responses'][200]['content']['*/*']

/** 订单发票详情 - get请求参数 */
export type _v1_bc_company_invoice_personalDetail_get_req = Required<operations["personalDetailUsingGET"]>['parameters']['query']
/** 订单发票详情 - get响应参数 */
export type _v1_bc_company_invoice_personalDetail_get_res = Required<operations["personalDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 发票信息设置 - post请求参数 */
export type _v1_bc_company_invoice_setTitle_post_req = Required<operations["setTitleUsingPOST_1"]>['requestBody']['content']['application/json']
/** 发票信息设置 - post响应参数 */
export type _v1_bc_company_invoice_setTitle_post_res = Required<operations["setTitleUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

/** 发票识别 - post请求参数 */
export type _v1_bc_admin_kingdee_Check_post_req = Required<operations["CheckUsingPOST"]>['parameters']['query']
/** 发票识别 - post响应参数 */
export type _v1_bc_admin_kingdee_Check_post_res = Required<operations["CheckUsingPOST"]>['responses'][200]['content']['*/*']

/** api116 - post请求参数 */
export type _v1_bc_admin_kingdee_api116_post_req = Required<operations["api116UsingPOST"]>['requestBody']
/** api116 - post响应参数 */
export type _v1_bc_admin_kingdee_api116_post_res = Required<operations["api116UsingPOST"]>['responses'][200]['content']['*/*']

/** api2 - post请求参数 */
export type _v1_bc_admin_kingdee_api2_post_req = Required<operations["api2UsingPOST"]>['requestBody']['content']['application/json']
/** api2 - post响应参数 */
export type _v1_bc_admin_kingdee_api2_post_res = Required<operations["api2UsingPOST"]>['responses'][200]['content']['*/*']

/** createInvoice - post请求参数 */
export type _v1_bc_admin_kingdee_createInvoice_post_req = Required<operations["createInvoiceUsingPOST"]>['requestBody']['content']['application/json']
/** createInvoice - post响应参数 */
export type _v1_bc_admin_kingdee_createInvoice_post_res = Required<operations["createInvoiceUsingPOST"]>['responses'][200]['content']['*/*']

/** createResult - post请求参数 */
export type _v1_bc_admin_kingdee_createResult_post_req = Required<operations["createResultUsingPOST_1"]>['parameters']['query']
/** createResult - post响应参数 */
export type _v1_bc_admin_kingdee_createResult_post_res = Required<operations["createResultUsingPOST_1"]>['responses'][200]['content']['*/*']

/** getInvoiceToken - post请求参数 */
export type _v1_bc_admin_kingdee_invoiceApi_post_req = Required<operations["getInvoiceTokenUsingPOST"]>['requestBody']['content']['application/json']
/** getInvoiceToken - post响应参数 */
export type _v1_bc_admin_kingdee_invoiceApi_post_res = Required<operations["getInvoiceTokenUsingPOST"]>['responses'][200]['content']['*/*']

/** push - post请求参数 */
export type _v1_bc_admin_kingdee_push_post_req = Required<operations["pushUsingPOST"]>['requestBody']['content']['application/json']
/** push - post响应参数 */
export type _v1_bc_admin_kingdee_push_post_res = Required<operations["pushUsingPOST"]>['responses'][200]['content']['*/*']

/** query - post请求参数 */
export type _v1_bc_admin_kingdee_query_post_req = Required<operations["queryUsingPOST"]>['requestBody']['content']['application/json']
/** query - post响应参数 */
export type _v1_bc_admin_kingdee_query_post_res = Required<operations["queryUsingPOST"]>['responses'][200]['content']['*/*']

/** save - post请求参数 */
export type _v1_bc_admin_kingdee_save_post_req = Required<operations["saveUsingPOST"]>['requestBody']['content']['application/json']
/** save - post响应参数 */
export type _v1_bc_admin_kingdee_save_post_res = Required<operations["saveUsingPOST"]>['responses'][200]['content']['*/*']

/** saveCustomer - get请求参数 */
export type _v1_bc_admin_kingdee_saveCustomer_get_req = Required<operations["saveCustomerUsingGET"]>['parameters']['query']
/** saveCustomer - get响应参数 */
export type _v1_bc_admin_kingdee_saveCustomer_get_res = Required<operations["saveCustomerUsingGET"]>['responses'][200]['content']['*/*']

/** 同步供应商 - get请求参数 */
export type _v1_bc_admin_kingdee_saveSupplier_get_req = Required<operations["saveSupplierUsingGET"]>['parameters']['query']
/** 同步供应商 - get响应参数 */
export type _v1_bc_admin_kingdee_saveSupplier_get_res = Required<operations["saveSupplierUsingGET"]>['responses'][200]['content']['*/*']

/** syncCommission - post请求参数 */
export type _v1_bc_admin_kingdee_syncCommission_post_req = Required<operations["syncCommissionUsingPOST"]>['requestBody']['content']['application/json']
/** syncCommission - post响应参数 */
export type _v1_bc_admin_kingdee_syncCommission_post_res = Required<operations["syncCommissionUsingPOST"]>['responses'][200]['content']

/** 同步手续费账单到金蝶应收单 - get请求参数 */
export type _v1_bc_admin_kingdee_syncCommissionToKingdeeReceivable_get_req = Required<operations["syncCommissionToKingdeeReceivableUsingGET"]>['parameters']['query']
/** 同步手续费账单到金蝶应收单 - get响应参数 */
export type _v1_bc_admin_kingdee_syncCommissionToKingdeeReceivable_get_res = Required<operations["syncCommissionToKingdeeReceivableUsingGET"]>['responses'][200]['content']

/** syncCpcnCommission - post请求参数 */
export type _v1_bc_admin_kingdee_syncCpcnCommission_post_req = Required<operations["syncCpcnCommissionUsingPOST"]>['requestBody']
/** syncCpcnCommission - post响应参数 */
export type _v1_bc_admin_kingdee_syncCpcnCommission_post_res = Required<operations["syncCpcnCommissionUsingPOST"]>['responses'][200]['content']

/** syncCpcnCommissionByTradeId - post请求参数 */
export type _v1_bc_admin_kingdee_syncCpcnCommissionByTradeId_post_req = Required<operations["syncCpcnCommissionByTradeIdUsingPOST"]>['parameters']['query']
/** syncCpcnCommissionByTradeId - post响应参数 */
export type _v1_bc_admin_kingdee_syncCpcnCommissionByTradeId_post_res = Required<operations["syncCpcnCommissionByTradeIdUsingPOST"]>['responses'][200]['content']

/** syncInvoice - post请求参数 */
export type _v1_bc_admin_kingdee_syncInvoice_post_req = Required<operations["syncInvoiceUsingPOST"]>['parameters']['query']
/** syncInvoice - post响应参数 */
export type _v1_bc_admin_kingdee_syncInvoice_post_res = Required<operations["syncInvoiceUsingPOST"]>['responses'][200]['content']

/** 同步金蝶数据 - post请求参数 */
export type _v1_bc_admin_kingdee_syncKingData_post_req = Required<operations["getKingdeeInvoiceListUsingPOST"]>['requestBody']
/** 同步金蝶数据 - post响应参数 */
export type _v1_bc_admin_kingdee_syncKingData_post_res = Required<operations["getKingdeeInvoiceListUsingPOST"]>['responses'][200]['content']

/** 同步营销费用到金蝶应收单 - post请求参数 */
export type _v1_bc_admin_kingdee_syncPlatformDiscountToKingdeePayable_post_req = Required<operations["syncPlatformDiscountToKingdeePayableUsingPOST"]>['parameters']['query']
/** 同步营销费用到金蝶应收单 - post响应参数 */
export type _v1_bc_admin_kingdee_syncPlatformDiscountToKingdeePayable_post_res = Required<operations["syncPlatformDiscountToKingdeePayableUsingPOST"]>['responses'][200]['content']

/** 同步供应商 - get请求参数 */
export type _v1_bc_admin_kingdee_updateInvoiceFromServer_get_req = Required<operations["updateInvoiceFromServerUsingGET"]>['parameters']['query']
/** 同步供应商 - get响应参数 */
export type _v1_bc_admin_kingdee_updateInvoiceFromServer_get_res = Required<operations["updateInvoiceFromServerUsingGET"]>['responses'][200]['content']['*/*']

/** view - post请求参数 */
export type _v1_bc_admin_kingdee_view_post_req = Required<operations["viewUsingPOST"]>['requestBody']['content']['application/json']
/** view - post响应参数 */
export type _v1_bc_admin_kingdee_view_post_res = Required<operations["viewUsingPOST"]>['responses'][200]['content']['*/*']

/** 获取发票云账户 - get请求参数 */
export type _v1_bc_company_kingdee_getInvoiceAccount_get_req = Required<operations["getInvoiceAccountUsingGET"]>['parameters']['query']
/** 获取发票云账户 - get响应参数 */
export type _v1_bc_company_kingdee_getInvoiceAccount_get_res = Required<operations["getInvoiceAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 设置商品税收编码 - post请求参数 */
export type _v1_bc_company_kingdee_setProductTaxCode_post_req = Required<operations["setProductTaxCodeUsingPOST"]>['requestBody']['content']['application/json']
/** 设置商品税收编码 - post响应参数 */
export type _v1_bc_company_kingdee_setProductTaxCode_post_res = Required<operations["setProductTaxCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 税收分类编码列表 - post请求参数 */
export type _v1_bc_company_kingdee_taxCodeList_post_req = Required<operations["taxCodeListUsingPOST"]>['requestBody']['content']['application/json']
/** 税收分类编码列表 - post响应参数 */
export type _v1_bc_company_kingdee_taxCodeList_post_res = Required<operations["taxCodeListUsingPOST"]>['responses'][200]['content']['*/*']

/** 收支明细 - post请求参数 */
export type _v1_bc_company_moneyDetail_getList_post_req = Required<operations["supplierListUsingPOST"]>['requestBody']['content']['application/json']
/** 收支明细 - post响应参数 */
export type _v1_bc_company_moneyDetail_getList_post_res = Required<operations["supplierListUsingPOST"]>['responses'][200]['content']['*/*']

/** 收支明细统计 - post请求参数 */
export type _v1_bc_company_moneyDetail_getListCount_post_req = Required<operations["supplierListCountUsingPOST"]>['requestBody']['content']['application/json']
/** 收支明细统计 - post响应参数 */
export type _v1_bc_company_moneyDetail_getListCount_post_res = Required<operations["supplierListCountUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 费用明细-收支明细关联的应收应付记录 - get请求参数 */
export type _v1_bc_company_moneyDetail_getMoneyDetailRelationLog_get_req = Required<operations["getMoneyDetailRelationLogUsingGET"]>['parameters']['query']
/** 费用明细-收支明细关联的应收应付记录 - get响应参数 */
export type _v1_bc_company_moneyDetail_getMoneyDetailRelationLog_get_res = Required<operations["getMoneyDetailRelationLogUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 可提现商户列表 - post请求参数 */
export type _v1_bc_server_worker_money_enable_withdrawal_company_list_post_req = Required<operations["getEnableWithdrawalCompanyListUsingPOST"]>['requestBody']['content']['application/json']
/** 可提现商户列表 - post响应参数 */
export type _v1_bc_server_worker_money_enable_withdrawal_company_list_post_res = Required<operations["getEnableWithdrawalCompanyListUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 可提现工单列表 - get请求参数 */
export type _v1_bc_server_worker_money_enable_withdrawal_job_list_get_req = Required<operations["getEnableWithdrawalJobListUsingGET"]>['parameters']['query']
/** 可提现工单列表 - get响应参数 */
export type _v1_bc_server_worker_money_enable_withdrawal_job_list_get_res = Required<operations["getEnableWithdrawalJobListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 收支明细 - post请求参数 */
export type _v1_bc_server_worker_money_list_post_req = Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']
/** 收支明细 - post响应参数 */
export type _v1_bc_server_worker_money_list_post_res = Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 提现工单列表 - get请求参数 */
export type _v1_bc_server_worker_money_withdrawal_job_list_get_req = Required<operations["getWithdrawalJobListUsingGET"]>['parameters']['query']
/** 提现工单列表 - get响应参数 */
export type _v1_bc_server_worker_money_withdrawal_job_list_get_res = Required<operations["getWithdrawalJobListUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 结果通知 - get请求参数 */
export type _v1_bc_public_cpcnNotice_get_req = Required<operations["doGetUsingGET"]>['parameters']['query']
/** 结果通知 - get响应参数 */
export type _v1_bc_public_cpcnNotice_get_res = Required<operations["doGetUsingGET"]>['responses'][200]['content']['*/*']

/** 结果通知 - post请求参数 */
export type _v1_bc_public_cpcnNotice_post_req = Required<operations["doPostUsingPOST"]>['parameters']['query']
/** 结果通知 - post响应参数 */
export type _v1_bc_public_cpcnNotice_post_res = Required<operations["doPostUsingPOST"]>['responses'][200]['content']['*/*']

/** 发票云回调 - get请求参数 */
export type _v1_bc_public_invoiceCallback_get_req = Required<operations["invoiceCallbackUsingGET"]>['parameters']['query']
/** 发票云回调 - get响应参数 */
export type _v1_bc_public_invoiceCallback_get_res = Required<operations["invoiceCallbackUsingGET"]>['responses'][200]['content']['*/*']

/** 发票云回调 - post请求参数 */
export type _v1_bc_public_invoiceCallback_post_req = Required<operations["invoiceCallbackUsingPOST"]>['requestBody']['content']['application/json']
/** 发票云回调 - post响应参数 */
export type _v1_bc_public_invoiceCallback_post_res = Required<operations["invoiceCallbackUsingPOST"]>['responses'][200]['content']['*/*']

/** 待结算单 - post请求参数 */
export type _v1_bc_admin_receipt_getPendingList_post_req = Required<operations["getPendingListUsingPOST"]>['requestBody']['content']['application/json']
/** 待结算单 - post响应参数 */
export type _v1_bc_admin_receipt_getPendingList_post_res = Required<operations["getPendingListUsingPOST"]>['responses'][200]['content']['*/*']

/** 手续费结算 - post请求参数 */
export type _v1_bc_admin_receipt_platform_commissionList_post_req = Required<operations["commissionListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 手续费结算 - post响应参数 */
export type _v1_bc_admin_receipt_platform_commissionList_post_res = Required<operations["commissionListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 平台开票 - post请求参数 */
export type _v1_bc_company_receipt_commissionList_post_req = Required<operations["discountDetailUsingPOST"]>['requestBody']['content']['application/json']
/** 平台开票 - post响应参数 */
export type _v1_bc_company_receipt_commissionList_post_res = Required<operations["discountDetailUsingPOST"]>['responses'][200]['content']['*/*']

/** 导出待结算单 - post请求参数 */
export type _v1_bc_company_receipt_exportPendingList_post_req = Required<operations["exportUsingPOST"]>['requestBody']['content']['application/json']
/** 导出待结算单 - post响应参数 */
export type _v1_bc_company_receipt_exportPendingList_post_res = Required<operations["exportUsingPOST"]>['responses'][200]['content']

/** 待结算单 - post请求参数 */
export type _v1_bc_company_receipt_getPendingList_post_req = Required<operations["getPendingListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 待结算单 - post响应参数 */
export type _v1_bc_company_receipt_getPendingList_post_res = Required<operations["getPendingListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 结算确认 - get请求参数 */
export type _v1_bc_admin_statement_commissionConfirm_get_req = Required<operations["commissionConfirmUsingGET"]>['parameters']['query']
/** 结算确认 - get响应参数 */
export type _v1_bc_admin_statement_commissionConfirm_get_res = Required<operations["commissionConfirmUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 结算确认详情预览 - post请求参数 */
export type _v1_bc_admin_statement_commissionConfirmPreview_post_req = Required<operations["commissionConfirmPreviewUsingPOST"]>['requestBody']['content']['application/json']
/** 结算确认详情预览 - post响应参数 */
export type _v1_bc_admin_statement_commissionConfirmPreview_post_res = Required<operations["commissionConfirmPreviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 手续费结算-待处理账单 - post请求参数 */
export type _v1_bc_admin_statement_commissionList_post_req = Required<operations["commissionListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 手续费结算-待处理账单 - post响应参数 */
export type _v1_bc_admin_statement_commissionList_post_res = Required<operations["commissionListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 结算周期设置 - post请求参数 */
export type _v1_bc_admin_statement_cycleConfig_post_req = Required<operations["cycleConfigUsingPOST"]>['requestBody']['content']['application/json']
/** 结算周期设置 - post响应参数 */
export type _v1_bc_admin_statement_cycleConfig_post_res = Required<operations["cycleConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 账单详情 - get请求参数 */
export type _v1_bc_admin_statement_detail_get_req = Required<operations["detailUsingGET_2"]>['parameters']['query']
/** 账单详情 - get响应参数 */
export type _v1_bc_admin_statement_detail_get_res = Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

/** 票据详情-订单列表 - post请求参数 */
export type _v1_bc_admin_statement_discountDetail_post_req = Required<operations["discountDetailUsingPOST_1"]>['requestBody']['content']['application/json']
/** 票据详情-订单列表 - post响应参数 */
export type _v1_bc_admin_statement_discountDetail_post_res = Required<operations["discountDetailUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 营销费用管理 - post请求参数 */
export type _v1_bc_admin_statement_discountList_post_req = Required<operations["discountListUsingPOST_1"]>['requestBody']['content']['application/json']
/** 营销费用管理 - post响应参数 */
export type _v1_bc_admin_statement_discountList_post_res = Required<operations["discountListUsingPOST_1"]>['responses'][200]['content']['*/*']

/** 获取结算周期设置 - get请求参数 */
export type _v1_bc_admin_statement_getCycleConfig_get_req = Required<operations["getCycleConfigUsingGET"]>['parameters']['query']
/** 获取结算周期设置 - get响应参数 */
export type _v1_bc_admin_statement_getCycleConfig_get_res = Required<operations["getCycleConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

/** 账单统计 - post请求参数 */
export type _v1_bc_admin_statement_list_post_req = Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']
/** 账单统计 - post响应参数 */
export type _v1_bc_admin_statement_list_post_res = Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 平台发票详情预览 - post请求参数 */
export type _v1_bc_admin_statement_previewDetail_post_req = Required<operations["previewDetailUsingPOST"]>['requestBody']['content']['application/json']
/** 平台发票详情预览 - post响应参数 */
export type _v1_bc_admin_statement_previewDetail_post_res = Required<operations["previewDetailUsingPOST"]>['responses'][200]['content']['*/*']

/** 服务费账单 - post请求参数 */
export type _v1_bc_company_statement_commissionList_post_req = Required<operations["commissionListUsingPOST_3"]>['requestBody']['content']['application/json']
/** 服务费账单 - post响应参数 */
export type _v1_bc_company_statement_commissionList_post_res = Required<operations["commissionListUsingPOST_3"]>['responses'][200]['content']['*/*']

/** 账单详情 - get请求参数 */
export type _v1_bc_company_statement_detail_get_req = Required<operations["detailUsingGET_3"]>['parameters']['query']
/** 账单详情 - get响应参数 */
export type _v1_bc_company_statement_detail_get_res = Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

/** 营销费用待开票账单 - post请求参数 */
export type _v1_bc_company_statement_discountList_post_req = Required<operations["discountListUsingPOST_2"]>['requestBody']['content']['application/json']
/** 营销费用待开票账单 - post响应参数 */
export type _v1_bc_company_statement_discountList_post_res = Required<operations["discountListUsingPOST_2"]>['responses'][200]['content']['*/*']

/** 账单列表 - post请求参数 */
export type _v1_bc_company_statement_list_post_req = Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']
/** 账单列表 - post响应参数 */
export type _v1_bc_company_statement_list_post_res = Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']

/** 个人提现-批量确认打款 - post请求参数 */
export type _v1_bc_company_withdrawal_personal_batchPay_post_req = Required<operations["batchPayUsingPOST"]>['requestBody']['content']['application/json']
/** 个人提现-批量确认打款 - post响应参数 */
export type _v1_bc_company_withdrawal_personal_batchPay_post_res = Required<operations["batchPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 个人提现-提现详情 - get请求参数 */
export type _v1_bc_company_withdrawal_personal_detail_get_req = Required<operations["personalDetailUsingGET_1"]>['parameters']['query']
/** 个人提现-提现详情 - get响应参数 */
export type _v1_bc_company_withdrawal_personal_detail_get_res = Required<operations["personalDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

/** 个人提现-状态修改 - post请求参数 */
export type _v1_bc_company_withdrawal_personal_doAction_post_req = Required<operations["personalDoActionUsingPOST"]>['requestBody']['content']['application/json']
/** 个人提现-状态修改 - post响应参数 */
export type _v1_bc_company_withdrawal_personal_doAction_post_res = Required<operations["personalDoActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

/** 个人提现-提现列表 - post请求参数 */
export type _v1_bc_company_withdrawal_personal_list_post_req = Required<operations["personalListUsingPOST"]>['requestBody']['content']['application/json']
/** 个人提现-提现列表 - post响应参数 */
export type _v1_bc_company_withdrawal_personal_list_post_res = Required<operations["personalListUsingPOST"]>['responses'][200]['content']['*/*']

/** 提现 - post请求参数 */
export type _v1_bc_server_withdrawal_add_post_req = Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']
/** 提现 - post响应参数 */
export type _v1_bc_server_withdrawal_add_post_res = Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

/** 提现列表 - post请求参数 */
export type _v1_bc_server_withdrawal_list_post_req = Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']
/** 提现列表 - post响应参数 */
export type _v1_bc_server_withdrawal_list_post_res = Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

