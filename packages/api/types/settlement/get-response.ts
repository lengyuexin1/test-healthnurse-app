import type { operations } from './schema'

export interface ISettlementGetResponse {
    /** 合同管理-手续费设置列表 */
    "/v1/bc/admin/account/commissionConfigList": Required<operations["commissionConfigListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试专用-待结算单 */
    "/v1/bc/admin/account/createStatement": Required<operations["createStatementUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 初始化数据，财务自动化上线之后删除 */
    "/v1/bc/admin/account/initData": Required<operations["initDataUsingGET"]>['responses'][200]['content']

    /** 保证金设置列表 */
    "/v1/bc/admin/account/marginConfigList": Required<operations["marginConfigListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试专用-提前结算 */
    "/v1/bc/admin/account/preStatement": Required<operations["preStatementUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 商家手续费活动记录 */
    "/v1/bc/admin/account/supplierCommissionActivityLog": Required<operations["getSupplierCommissionActivityLogUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 商家手续费列表 */
    "/v1/bc/admin/account/supplierCommissionList": Required<operations["supplierCommissionListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 是否满足保证金退还条件 */
    "/v1/bc/company/account/canRefundMargin": Required<operations["canRefundMarginUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取保证金账户 */
    "/v1/bc/company/account/getMarginAccount": Required<operations["getMarginAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 保证金账单列表 */
    "/v1/bc/company/account/marginOrderList": Required<operations["getMarginOrderListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 保证金退还申请 */
    "/v1/bc/company/account/marginRefundApply": Required<operations["marginRefundApplyUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 账户余额信息 */
    "/v1/bc/server/account/moneyDetail": Required<operations["moneyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 收入详情 */
    "/v1/bc/server/accountLog/worker_money_detail": Required<operations["workerMoneyDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 中金分账-自动任务异常时，可使用此接口继续执行 */
    "/v1/bc/company/cpcn/batchSplitTask": Required<operations["batchSplitTaskUsingGET"]>['responses'][200]['content']

    /** 测试-批量提现 */
    "/v1/bc/company/cpcn/batchWithdrawal": Required<operations["batchWithdrawalUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 绑卡确认 */
    "/v1/bc/company/cpcn/confirmBindBank": Required<operations["confirmBindBankUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取账户基本信息和余额 */
    "/v1/bc/company/cpcn/getShopSimpleInfoAndBalance": Required<operations["getShopSimpleInfoAndBalanceUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试-提现查询 */
    "/v1/bc/company/cpcn/tx4656": Required<operations["tx4656UsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 用户信息查询 */
    "/v1/bc/company/cpcn/tx4691": Required<operations["tx4691UsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 测试-退款查询 */
    "/v1/bc/company/cpcn/tx5026": Required<operations["tx5026UsingGET"]>['responses'][200]['content']['*/*']

    /** 提现 */
    "/v1/bc/company/cpcn/withdrawal": Required<operations["withdrawalUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 撤销 */
    "/v1/bc/admin/invoice/commissionCancel": Required<operations["commissionCancelUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 营销费用详情 */
    "/v1/bc/admin/invoice/discountDetail": Required<operations["discountDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 导出发票列表 */
    "/v1/bc/admin/invoice/exportListByGet": Required<operations["exportListUsingGET"]>['responses'][200]['content']

    /** 获取商家发票信息设置 */
    "/v1/bc/admin/invoice/getSupplierTitle": Required<operations["getSupplierTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取发票信息设置 */
    "/v1/bc/admin/invoice/getTitle": Required<operations["getTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 开票详情 */
    "/v1/bc/app/invoice/detail": Required<operations["detailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 订单发票开票-发票云 */
    "/v1/bc/company/invoice/autoCreate": Required<operations["autoCreateUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 查询发票云开票结果 */
    "/v1/bc/company/invoice/createResult": Required<operations["createResultUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 撤销开票 */
    "/v1/bc/company/invoice/discountCancel": Required<operations["discountCancelUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 历史处理记录详情 */
    "/v1/bc/company/invoice/discountDetail": Required<operations["discountDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 获取平台发票信息设置 */
    "/v1/bc/company/invoice/getPlatformTitle": Required<operations["getPlatformTitleUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 获取发票信息设置 */
    "/v1/bc/company/invoice/getTitle": Required<operations["getTitleUsingGET_1"]>['responses'][200]['content']['*/*']['data']

    /** 订单发票详情 */
    "/v1/bc/company/invoice/personalDetail": Required<operations["personalDetailUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** saveCustomer */
    "/v1/bc/admin/kingdee/saveCustomer": Required<operations["saveCustomerUsingGET"]>['responses'][200]['content']['*/*']

    /** 同步供应商 */
    "/v1/bc/admin/kingdee/saveSupplier": Required<operations["saveSupplierUsingGET"]>['responses'][200]['content']['*/*']

    /** 同步手续费账单到金蝶应收单 */
    "/v1/bc/admin/kingdee/syncCommissionToKingdeeReceivable": Required<operations["syncCommissionToKingdeeReceivableUsingGET"]>['responses'][200]['content']

    /** 同步供应商 */
    "/v1/bc/admin/kingdee/updateInvoiceFromServer": Required<operations["updateInvoiceFromServerUsingGET"]>['responses'][200]['content']['*/*']

    /** 获取发票云账户 */
    "/v1/bc/company/kingdee/getInvoiceAccount": Required<operations["getInvoiceAccountUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 费用明细-收支明细关联的应收应付记录 */
    "/v1/bc/company/moneyDetail/getMoneyDetailRelationLog": Required<operations["getMoneyDetailRelationLogUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 可提现工单列表 */
    "/v1/bc/server/worker_money/enable_withdrawal_job_list": Required<operations["getEnableWithdrawalJobListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 提现工单列表 */
    "/v1/bc/server/worker_money/withdrawal_job_list": Required<operations["getWithdrawalJobListUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 结果通知 */
    "/v1/bc/public/cpcnNotice": Required<operations["doGetUsingGET"]>['responses'][200]['content']['*/*']

    /** 发票云回调 */
    "/v1/bc/public/invoiceCallback": Required<operations["invoiceCallbackUsingGET"]>['responses'][200]['content']['*/*']

    /** 结算确认 */
    "/v1/bc/admin/statement/commissionConfirm": Required<operations["commissionConfirmUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 账单详情 */
    "/v1/bc/admin/statement/detail": Required<operations["detailUsingGET_2"]>['responses'][200]['content']['*/*']['data']

    /** 获取结算周期设置 */
    "/v1/bc/admin/statement/getCycleConfig": Required<operations["getCycleConfigUsingGET"]>['responses'][200]['content']['*/*']['data']

    /** 账单详情 */
    "/v1/bc/company/statement/detail": Required<operations["detailUsingGET_3"]>['responses'][200]['content']['*/*']['data']

    /** 个人提现-提现详情 */
    "/v1/bc/company/withdrawal/personal/detail": Required<operations["personalDetailUsingGET_1"]>['responses'][200]['content']['*/*']['data']

}
