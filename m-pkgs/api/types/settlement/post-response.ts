import type { operations } from './schema'

export interface ISettlementPostResponse {
    /** 测试专用-付款退款单 */
    "/v1/bc/admin/account/PaymentRefundSlip": Required<operations["PaymentRefundSlipUsingPOST"]>['responses'][200]['content']

    /** 测试专用-付款单 */
    "/v1/bc/admin/account/PaymentSlip": Required<operations["PaymentSlipUsingPOST"]>['responses'][200]['content']

    /** 测试专用-收款退款单 */
    "/v1/bc/admin/account/ReceiptRefund": Required<operations["ReceiptRefundUsingPOST"]>['responses'][200]['content']

    /** 合同管理-设置手续费 */
    "/v1/bc/admin/account/commissionConfig": Required<operations["commissionConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取设置列表-分页 */
    "/v1/bc/admin/account/getConfigList": Required<operations["getConfigListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 测试专用-收款单 */
    "/v1/bc/admin/account/receipt": Required<operations["receiptUsingPOST"]>['responses'][200]['content']

    /** 保证金设置 */
    "/v1/bc/admin/account/setMarginConfig": Required<operations["setMarginConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 商家手续费列表 */
    "/v1/bc/admin/account/supplierCommissionListPage": Required<operations["supplierCommissionListPageUsingPOST"]>['responses'][200]['content']['*/*']

    /** 收支明细 */
    "/v1/bc/admin/accountLog/moneyDetail": Required<operations["moneyDetailUsingPOST"]>['responses'][200]['content']['*/*']

    /** 收支明细-金额统计 */
    "/v1/bc/admin/accountLog/moneyDetailCount": Required<operations["moneyDetailCountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 银行编码 */
    "/v1/bc/company/cpcn/bankCode": Required<operations["bankCodeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** bindBank */
    "/v1/bc/company/cpcn/bindBank": Required<operations["bindBankUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 企业分类类别 */
    "/v1/bc/company/cpcn/corporationCategory": Required<operations["corporationCategoryUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 结算银行设置 */
    "/v1/bc/company/cpcn/createAccount": Required<operations["createAccountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** createResult */
    "/v1/bc/company/cpcn/createResult": Required<operations["createResultUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** createTrade */
    "/v1/bc/company/cpcn/createTrade": Required<operations["createTradeUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 银行卡管理 */
    "/v1/bc/company/cpcn/getBankInfoList": Required<operations["getBankInfoListUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 获取详情 */
    "/v1/bc/company/cpcn/getDetail": Required<operations["getDetailUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 测试-退款 */
    "/v1/bc/company/cpcn/refund": Required<operations["tx5026UsingPOST"]>['responses'][200]['content']

    /** 支付查询 */
    "/v1/bc/company/cpcn/tx5016": Required<operations["tx5016UsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 延迟分账 */
    "/v1/bc/company/cpcn/tx5031": Required<operations["tx5031UsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 测试接口-影印件采集 */
    "/v1/bc/company/cpcn/uploadImageToCpcn": Required<operations["uploadImageToCpcnUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 确认 */
    "/v1/bc/admin/invoice/commissionConfirm": Required<operations["commissionConfirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 开票 */
    "/v1/bc/admin/invoice/commissionCreate": Required<operations["commissionCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发票确认 */
    "/v1/bc/admin/invoice/confirm": Required<operations["confirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发票审核 */
    "/v1/bc/admin/invoice/doAction": Required<operations["doActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 导出发票列表 */
    "/v1/bc/admin/invoice/exportList": Required<operations["exportListUsingPOST"]>['responses'][200]['content']

    /** 发票列表 */
    "/v1/bc/admin/invoice/list": Required<operations["listUsingPOST"]>['responses'][200]['content']['*/*']

    /** 发票信息设置 */
    "/v1/bc/admin/invoice/setTitle": Required<operations["setTitleUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 申请发票 */
    "/v1/bc/app/invoice/add": Required<operations["addUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 发票记录 */
    "/v1/bc/app/invoice/list": Required<operations["listUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 订单发票开票 */
    "/v1/bc/company/invoice/add": Required<operations["addUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 平台开票列表 */
    "/v1/bc/company/invoice/commissionList": Required<operations["commissionListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 确认开票 */
    "/v1/bc/company/invoice/discountConfirm": Required<operations["discountConfirmUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 开票 */
    "/v1/bc/company/invoice/discountCreate": Required<operations["discountCreateUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 营销费用发票列表 */
    "/v1/bc/company/invoice/discountList": Required<operations["discountListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 订单发票列表 */
    "/v1/bc/company/invoice/personalApplyList": Required<operations["personalApplyListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 发票信息设置 */
    "/v1/bc/company/invoice/setTitle": Required<operations["setTitleUsingPOST_1"]>['responses'][200]['content']['*/*']['data']

    /** 收支明细 */
    "/v1/bc/company/moneyDetail/getList": Required<operations["supplierListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 收支明细统计 */
    "/v1/bc/company/moneyDetail/getListCount": Required<operations["supplierListCountUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 可提现商户列表 */
    "/v1/bc/server/worker_money/enable_withdrawal_company_list": Required<operations["getEnableWithdrawalCompanyListUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 收支明细 */
    "/v1/bc/server/worker_money/list": Required<operations["listUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 结果通知 */
    "/v1/bc/public/cpcnNotice": Required<operations["doPostUsingPOST"]>['responses'][200]['content']['*/*']

    /** 待结算单 */
    "/v1/bc/admin/receipt/getPendingList": Required<operations["getPendingListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 手续费结算 */
    "/v1/bc/admin/receipt/platform/commissionList": Required<operations["commissionListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 平台开票 */
    "/v1/bc/company/receipt/commissionList": Required<operations["discountDetailUsingPOST"]>['responses'][200]['content']['*/*']

    /** 导出待结算单 */
    "/v1/bc/company/receipt/exportPendingList": Required<operations["exportUsingPOST"]>['responses'][200]['content']

    /** 待结算单 */
    "/v1/bc/company/receipt/getPendingList": Required<operations["getPendingListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 结算确认详情预览 */
    "/v1/bc/admin/statement/commissionConfirmPreview": Required<operations["commissionConfirmPreviewUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 手续费结算-待处理账单 */
    "/v1/bc/admin/statement/commissionList": Required<operations["commissionListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 结算周期设置 */
    "/v1/bc/admin/statement/cycleConfig": Required<operations["cycleConfigUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 票据详情-订单列表 */
    "/v1/bc/admin/statement/discountDetail": Required<operations["discountDetailUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 营销费用管理 */
    "/v1/bc/admin/statement/discountList": Required<operations["discountListUsingPOST_1"]>['responses'][200]['content']['*/*']

    /** 账单统计 */
    "/v1/bc/admin/statement/list": Required<operations["listUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 平台发票详情预览 */
    "/v1/bc/admin/statement/previewDetail": Required<operations["previewDetailUsingPOST"]>['responses'][200]['content']['*/*']

    /** 服务费账单 */
    "/v1/bc/company/statement/commissionList": Required<operations["commissionListUsingPOST_3"]>['responses'][200]['content']['*/*']

    /** 营销费用待开票账单 */
    "/v1/bc/company/statement/discountList": Required<operations["discountListUsingPOST_2"]>['responses'][200]['content']['*/*']

    /** 账单列表 */
    "/v1/bc/company/statement/list": Required<operations["listUsingPOST_4"]>['responses'][200]['content']['*/*']

    /** 个人提现-批量确认打款 */
    "/v1/bc/company/withdrawal/personal/batchPay": Required<operations["batchPayUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 个人提现-状态修改 */
    "/v1/bc/company/withdrawal/personal/doAction": Required<operations["personalDoActionUsingPOST"]>['responses'][200]['content']['*/*']['data']

    /** 个人提现-提现列表 */
    "/v1/bc/company/withdrawal/personal/list": Required<operations["personalListUsingPOST"]>['responses'][200]['content']['*/*']

    /** 提现 */
    "/v1/bc/server/withdrawal/add": Required<operations["addUsingPOST_2"]>['responses'][200]['content']['*/*']['data']

    /** 提现列表 */
    "/v1/bc/server/withdrawal/list": Required<operations["listUsingPOST_5"]>['responses'][200]['content']['*/*']

}
