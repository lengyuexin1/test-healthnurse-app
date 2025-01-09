import type { operations } from './schema'

export interface ISettlementGetRequest {
    /** 合同管理-手续费设置列表 */
    "/v1/bc/admin/account/commissionConfigList": Required<operations["commissionConfigListUsingGET"]>['parameters']['query']

    /** 测试专用-待结算单 */
    "/v1/bc/admin/account/createStatement": Required<operations["createStatementUsingGET"]>['parameters']['query']

    /** 初始化数据，上线之后可以上除 */
    "/v1/bc/admin/account/initCommissionData": Required<operations["initCommissionDataUsingGET"]>['parameters']['query']

    /** 保证金设置列表 */
    "/v1/bc/admin/account/marginConfigList": Required<operations["marginConfigListUsingGET"]>['parameters']['query']

    /** 测试专用-提前结算 */
    "/v1/bc/admin/account/preStatement": Required<operations["preStatementUsingGET"]>['parameters']['query']

    /** 商家手续费活动记录 */
    "/v1/bc/admin/account/supplierCommissionActivityLog": Required<operations["getSupplierCommissionActivityLogUsingGET"]>['parameters']['query']

    /** 商家手续费列表 */
    "/v1/bc/admin/account/supplierCommissionList": Required<operations["supplierCommissionListUsingGET"]>['parameters']['query']

    /** 获取保证金账户 */
    "/v1/bc/company/account/getMarginAccount": Required<operations["getMarginAccountUsingGET"]>['parameters']['query']

    /** 账户余额信息 */
    "/v1/bc/server/account/moneyDetail": Required<operations["moneyDetailUsingGET"]>['parameters']['query']

    /** 收入详情 */
    "/v1/bc/server/accountLog/worker_money_detail": Required<operations["workerMoneyDetailUsingGET"]>['parameters']['query']

    /** 测试-中金分账 */
    "/v1/bc/company/cpcn/batchSplitTask": Required<operations["batchSplitTaskUsingGET"]>['parameters']['query']

    /** 测试-批量提现 */
    "/v1/bc/company/cpcn/batchWithdrawal": Required<operations["batchWithdrawalUsingGET"]>['parameters']['query']

    /** 绑卡确认 */
    "/v1/bc/company/cpcn/confirmBindBank": Required<operations["confirmBindBankUsingGET"]>['parameters']['query']

    /** 测试-提现查询 */
    "/v1/bc/company/cpcn/tx4656": Required<operations["tx4656UsingGET"]>['parameters']['query']

    /** 用户信息查询 */
    "/v1/bc/company/cpcn/tx4691": Required<operations["tx4691UsingGET"]>['parameters']['query']

    /** 测试-退款查询 */
    "/v1/bc/company/cpcn/tx5026": Required<operations["tx5026UsingGET"]>['parameters']['query']

    /** 撤销 */
    "/v1/bc/admin/invoice/commissionCancel": Required<operations["commissionCancelUsingGET"]>['parameters']['query']

    /** 营销费用详情 */
    "/v1/bc/admin/invoice/discountDetail": Required<operations["discountDetailUsingGET"]>['parameters']['query']

    /** 导出发票列表 */
    "/v1/bc/admin/invoice/exportListByGet": Required<operations["exportListUsingGET"]>['parameters']['query']

    /** 获取商家发票信息设置 */
    "/v1/bc/admin/invoice/getSupplierTitle": Required<operations["getSupplierTitleUsingGET"]>['parameters']['query']

    /** 获取发票信息设置 */
    "/v1/bc/admin/invoice/getTitle": Required<operations["getTitleUsingGET"]>['parameters']['query']

    /** 开票详情 */
    "/v1/bc/app/invoice/detail": Required<operations["detailUsingGET"]>['parameters']['query']

    /** 撤销开票 */
    "/v1/bc/company/invoice/discountCancel": Required<operations["discountCancelUsingGET"]>['parameters']['query']

    /** 历史处理记录详情 */
    "/v1/bc/company/invoice/discountDetail": Required<operations["discountDetailUsingGET_1"]>['parameters']['query']

    /** 获取平台发票信息设置 */
    "/v1/bc/company/invoice/getPlatformTitle": Required<operations["getPlatformTitleUsingGET"]>['parameters']['query']

    /** 获取发票信息设置 */
    "/v1/bc/company/invoice/getTitle": Required<operations["getTitleUsingGET_1"]>['parameters']['query']

    /** 订单发票详情 */
    "/v1/bc/company/invoice/personalDetail": Required<operations["personalDetailUsingGET"]>['parameters']['query']

    /** 费用明细-收支明细关联的应收应付记录 */
    "/v1/bc/company/moneyDetail/getMoneyDetailRelationLog": Required<operations["getMoneyDetailRelationLogUsingGET"]>['parameters']['query']

    /** 可提现工单列表 */
    "/v1/bc/server/worker_money/enable_withdrawal_job_list": Required<operations["getEnableWithdrawalJobListUsingGET"]>['parameters']['query']

    /** 提现工单列表 */
    "/v1/bc/server/worker_money/withdrawal_job_list": Required<operations["getWithdrawalJobListUsingGET"]>['parameters']['query']

    /** 结果通知 */
    "/v1/bc/public/cpcnNotice": Required<operations["doGetUsingGET"]>['parameters']['query']

    /** 结算确认 */
    "/v1/bc/admin/statement/commissionConfirm": Required<operations["commissionConfirmUsingGET"]>['parameters']['query']

    /** 账单详情 */
    "/v1/bc/admin/statement/detail": Required<operations["detailUsingGET_2"]>['parameters']['query']

    /** 获取结算周期设置 */
    "/v1/bc/admin/statement/getCycleConfig": Required<operations["getCycleConfigUsingGET"]>['parameters']['query']

    /** 账单详情 */
    "/v1/bc/company/statement/detail": Required<operations["detailUsingGET_3"]>['parameters']['query']

    /** 个人提现-提现详情 */
    "/v1/bc/company/withdrawal/personal/detail": Required<operations["personalDetailUsingGET_1"]>['parameters']['query']

}
