import type { operations } from './schema'

export interface ISettlementPostRequest {
    /** 测试专用-付款退款单 */
    "/v1/bc/admin/account/PaymentRefundSlip": Required<operations["PaymentRefundSlipUsingPOST"]>['requestBody']['content']['application/json']

    /** 测试专用-付款单 */
    "/v1/bc/admin/account/PaymentSlip": Required<operations["PaymentSlipUsingPOST"]>['requestBody']['content']['application/json']

    /** 测试专用-收款退款单 */
    "/v1/bc/admin/account/ReceiptRefund": Required<operations["ReceiptRefundUsingPOST"]>['requestBody']['content']['application/json']

    /** 合同管理-设置手续费 */
    "/v1/bc/admin/account/commissionConfig": Required<operations["commissionConfigUsingPOST"]>['requestBody']['content']['application/json']

    /** 获取设置列表-分页 */
    "/v1/bc/admin/account/getConfigList": Required<operations["getConfigListUsingPOST"]>['requestBody']['content']['application/json']

    /** 测试专用-收款单 */
    "/v1/bc/admin/account/receipt": Required<operations["receiptUsingPOST"]>['requestBody']['content']['application/json']

    /** 保证金设置 */
    "/v1/bc/admin/account/setMarginConfig": Required<operations["setMarginConfigUsingPOST"]>['requestBody']['content']['application/json']

    /** 商家手续费列表 */
    "/v1/bc/admin/account/supplierCommissionListPage": Required<operations["supplierCommissionListPageUsingPOST"]>['requestBody']['content']['application/json']

    /** 收支明细 */
    "/v1/bc/admin/accountLog/moneyDetail": Required<operations["moneyDetailUsingPOST"]>['requestBody']['content']['application/json']

    /** 收支明细-金额统计 */
    "/v1/bc/admin/accountLog/moneyDetailCount": Required<operations["moneyDetailCountUsingPOST"]>['requestBody']['content']['application/json']

    /** 银行编码 */
    "/v1/bc/company/cpcn/bankCode": Required<operations["bankCodeUsingPOST"]>['requestBody']

    /** bindBank */
    "/v1/bc/company/cpcn/bindBank": Required<operations["bindBankUsingPOST"]>['requestBody']['content']['application/json']

    /** 企业分类类别 */
    "/v1/bc/company/cpcn/corporationCategory": Required<operations["corporationCategoryUsingPOST"]>['requestBody']

    /** 结算银行设置 */
    "/v1/bc/company/cpcn/createAccount": Required<operations["createAccountUsingPOST"]>['requestBody']['content']['application/json']

    /** createResult */
    "/v1/bc/company/cpcn/createResult": Required<operations["createResultUsingPOST"]>['requestBody']['content']['application/json']

    /** createTrade */
    "/v1/bc/company/cpcn/createTrade": Required<operations["createTradeUsingPOST"]>['requestBody']['content']['application/json']

    /** 银行卡管理 */
    "/v1/bc/company/cpcn/getBankInfoList": Required<operations["getBankInfoListUsingPOST"]>['requestBody']

    /** 获取详情 */
    "/v1/bc/company/cpcn/getDetail": Required<operations["getDetailUsingPOST"]>['requestBody']

    /** 测试-退款 */
    "/v1/bc/company/cpcn/refund": Required<operations["tx5026UsingPOST"]>['requestBody']['content']['application/json']

    /** 支付查询 */
    "/v1/bc/company/cpcn/tx5016": Required<operations["tx5016UsingPOST"]>['parameters']['query']

    /** 延迟分账 */
    "/v1/bc/company/cpcn/tx5031": Required<operations["tx5031UsingPOST"]>['requestBody']['content']['application/json']

    /** 测试接口-影印件采集 */
    "/v1/bc/company/cpcn/uploadImageToCpcn": Required<operations["uploadImageToCpcnUsingPOST"]>['parameters']['query']

    /** 确认 */
    "/v1/bc/admin/invoice/commissionConfirm": Required<operations["commissionConfirmUsingPOST"]>['requestBody']['content']['application/json']

    /** 开票 */
    "/v1/bc/admin/invoice/commissionCreate": Required<operations["commissionCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票确认 */
    "/v1/bc/admin/invoice/confirm": Required<operations["confirmUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票审核 */
    "/v1/bc/admin/invoice/doAction": Required<operations["doActionUsingPOST"]>['requestBody']['content']['application/json']

    /** 导出发票列表 */
    "/v1/bc/admin/invoice/exportList": Required<operations["exportListUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票列表 */
    "/v1/bc/admin/invoice/list": Required<operations["listUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票信息设置 */
    "/v1/bc/admin/invoice/setTitle": Required<operations["setTitleUsingPOST"]>['requestBody']['content']['application/json']

    /** 申请发票 */
    "/v1/bc/app/invoice/add": Required<operations["addUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票记录 */
    "/v1/bc/app/invoice/list": Required<operations["listUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 订单发票开票 */
    "/v1/bc/company/invoice/add": Required<operations["addUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 平台开票列表 */
    "/v1/bc/company/invoice/commissionList": Required<operations["commissionListUsingPOST"]>['requestBody']['content']['application/json']

    /** 确认开票 */
    "/v1/bc/company/invoice/discountConfirm": Required<operations["discountConfirmUsingPOST"]>['requestBody']['content']['application/json']

    /** 开票 */
    "/v1/bc/company/invoice/discountCreate": Required<operations["discountCreateUsingPOST"]>['requestBody']['content']['application/json']

    /** 营销费用发票列表 */
    "/v1/bc/company/invoice/discountList": Required<operations["discountListUsingPOST"]>['requestBody']['content']['application/json']

    /** 订单发票列表 */
    "/v1/bc/company/invoice/personalApplyList": Required<operations["personalApplyListUsingPOST"]>['requestBody']['content']['application/json']

    /** 发票信息设置 */
    "/v1/bc/company/invoice/setTitle": Required<operations["setTitleUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 收支明细 */
    "/v1/bc/company/moneyDetail/getList": Required<operations["supplierListUsingPOST"]>['requestBody']['content']['application/json']

    /** 收支明细统计 */
    "/v1/bc/company/moneyDetail/getListCount": Required<operations["supplierListCountUsingPOST"]>['requestBody']['content']['application/json']

    /** 可提现商户列表 */
    "/v1/bc/server/worker_money/enable_withdrawal_company_list": Required<operations["getEnableWithdrawalCompanyListUsingPOST"]>['requestBody']['content']['application/json']

    /** 收支明细 */
    "/v1/bc/server/worker_money/list": Required<operations["listUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 结果通知 */
    "/v1/bc/public/cpcnNotice": Required<operations["doPostUsingPOST"]>['parameters']['query']

    /** 待结算单 */
    "/v1/bc/admin/receipt/getPendingList": Required<operations["getPendingListUsingPOST"]>['requestBody']['content']['application/json']

    /** 手续费结算 */
    "/v1/bc/admin/receipt/platform/commissionList": Required<operations["commissionListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 平台开票 */
    "/v1/bc/company/receipt/commissionList": Required<operations["discountDetailUsingPOST"]>['requestBody']['content']['application/json']

    /** 导出待结算单 */
    "/v1/bc/company/receipt/exportPendingList": Required<operations["exportUsingPOST"]>['requestBody']['content']['application/json']

    /** 待结算单 */
    "/v1/bc/company/receipt/getPendingList": Required<operations["getPendingListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 结算确认详情预览 */
    "/v1/bc/admin/statement/commissionConfirmPreview": Required<operations["commissionConfirmPreviewUsingPOST"]>['requestBody']['content']['application/json']

    /** 手续费结算-待处理账单 */
    "/v1/bc/admin/statement/commissionList": Required<operations["commissionListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 结算周期设置 */
    "/v1/bc/admin/statement/cycleConfig": Required<operations["cycleConfigUsingPOST"]>['requestBody']['content']['application/json']

    /** 票据详情-订单列表 */
    "/v1/bc/admin/statement/discountDetail": Required<operations["discountDetailUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 营销费用管理 */
    "/v1/bc/admin/statement/discountList": Required<operations["discountListUsingPOST_1"]>['requestBody']['content']['application/json']

    /** 账单统计 */
    "/v1/bc/admin/statement/list": Required<operations["listUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 平台发票详情预览 */
    "/v1/bc/admin/statement/previewDetail": Required<operations["previewDetailUsingPOST"]>['requestBody']['content']['application/json']

    /** 服务费账单 */
    "/v1/bc/company/statement/commissionList": Required<operations["commissionListUsingPOST_3"]>['requestBody']['content']['application/json']

    /** 营销费用待开票账单 */
    "/v1/bc/company/statement/discountList": Required<operations["discountListUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 账单列表 */
    "/v1/bc/company/statement/list": Required<operations["listUsingPOST_4"]>['requestBody']['content']['application/json']

    /** 个人提现-批量确认打款 */
    "/v1/bc/company/withdrawal/personal/batchPay": Required<operations["batchPayUsingPOST"]>['requestBody']['content']['application/json']

    /** 个人提现-状态修改 */
    "/v1/bc/company/withdrawal/personal/doAction": Required<operations["personalDoActionUsingPOST"]>['requestBody']['content']['application/json']

    /** 个人提现-提现列表 */
    "/v1/bc/company/withdrawal/personal/list": Required<operations["personalListUsingPOST"]>['requestBody']['content']['application/json']

    /** 提现 */
    "/v1/bc/server/withdrawal/add": Required<operations["addUsingPOST_2"]>['requestBody']['content']['application/json']

    /** 提现列表 */
    "/v1/bc/server/withdrawal/list": Required<operations["listUsingPOST_5"]>['requestBody']['content']['application/json']

}
