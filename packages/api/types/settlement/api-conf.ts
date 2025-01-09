export const SETTLEMENT_API = {
    "account-controller": {
        /** 测试专用-付款退款单 */
        PaymentRefundSlipUsingPOST: "/v1/bc/admin/account/PaymentRefundSlip",
        /** 测试专用-付款单 */
        PaymentSlipUsingPOST: "/v1/bc/admin/account/PaymentSlip",
        /** 测试专用-收款退款单 */
        ReceiptRefundUsingPOST: "/v1/bc/admin/account/ReceiptRefund",
        /** 合同管理-设置手续费 */
        commissionConfigUsingPOST: "/v1/bc/admin/account/commissionConfig",
        /** 合同管理-手续费设置列表 */
        commissionConfigListUsingGET: "/v1/bc/admin/account/commissionConfigList",
        /** 测试专用-待结算单 */
        createStatementUsingGET: "/v1/bc/admin/account/createStatement",
        /** 获取设置列表-分页 */
        getConfigListUsingPOST: "/v1/bc/admin/account/getConfigList",
        /** 初始化数据，财务自动化上线之后删除 */
        initDataUsingGET: "/v1/bc/admin/account/initData",
        /** 保证金设置列表 */
        marginConfigListUsingGET: "/v1/bc/admin/account/marginConfigList",
        /** 保证金退还列表 */
        marginRefundListUsingPOST: "/v1/bc/admin/account/marginRefundList",
        /** 测试专用-提前结算 */
        preStatementUsingGET: "/v1/bc/admin/account/preStatement",
        /** 测试专用-收款单 */
        receiptUsingPOST: "/v1/bc/admin/account/receipt",
        /** 测试专用-收款退款单v2 */
        receiptUsingPOST_1: "/v1/bc/admin/account/receiptRefundV2",
        /** 测试专用-收款单v2 */
        receiptUsingPOST_2: "/v1/bc/admin/account/receiptV2",
        /** 保证金设置 */
        setMarginConfigUsingPOST: "/v1/bc/admin/account/setMarginConfig",
        /** 商家手续费活动记录 */
        getSupplierCommissionActivityLogUsingGET: "/v1/bc/admin/account/supplierCommissionActivityLog",
        /** 商家手续费列表 */
        supplierCommissionListUsingGET: "/v1/bc/admin/account/supplierCommissionList",
        /** 商家手续费列表 */
        supplierCommissionListPageUsingPOST: "/v1/bc/admin/account/supplierCommissionListPage",
        /** 是否满足保证金退还条件 */
        canRefundMarginUsingGET: "/v1/bc/company/account/canRefundMargin",
        /** 获取保证金账户 */
        getMarginAccountUsingGET: "/v1/bc/company/account/getMarginAccount",
        /** 保证金账单列表 */
        getMarginOrderListUsingGET: "/v1/bc/company/account/marginOrderList",
        /** 保证金退还申请 */
        marginRefundApplyUsingGET: "/v1/bc/company/account/marginRefundApply",
        /** 账户余额信息 */
        moneyDetailUsingGET: "/v1/bc/server/account/moneyDetail"
    },
    "account-log-controller": {
        /** 收支明细 */
        moneyDetailUsingPOST: "/v1/bc/admin/accountLog/moneyDetail",
        /** 收支明细-金额统计 */
        moneyDetailCountUsingPOST: "/v1/bc/admin/accountLog/moneyDetailCount",
        /** 收入详情 */
        workerMoneyDetailUsingGET: "/v1/bc/server/accountLog/worker_money_detail"
    },
    "cpcn-controller": {
        /** 银行编码 */
        bankCodeUsingPOST: "/v1/bc/company/cpcn/bankCode",
        /** 中金分账-自动任务异常时，可使用此接口继续执行 */
        batchSplitTaskUsingGET: "/v1/bc/company/cpcn/batchSplitTask",
        /** 测试-批量提现 */
        batchWithdrawalUsingGET: "/v1/bc/company/cpcn/batchWithdrawal",
        /** bindBank */
        bindBankUsingPOST: "/v1/bc/company/cpcn/bindBank",
        /** 绑卡确认 */
        confirmBindBankUsingGET: "/v1/bc/company/cpcn/confirmBindBank",
        /** 企业分类类别 */
        corporationCategoryUsingPOST: "/v1/bc/company/cpcn/corporationCategory",
        /** 结算银行设置 */
        createAccountUsingPOST: "/v1/bc/company/cpcn/createAccount",
        /** createResult */
        createResultUsingPOST: "/v1/bc/company/cpcn/createResult",
        /** createTrade */
        createTradeUsingPOST: "/v1/bc/company/cpcn/createTrade",
        /** 银行卡管理 */
        getBankInfoListUsingPOST: "/v1/bc/company/cpcn/getBankInfoList",
        /** 提现列表 */
        getCompanyListUsingPOST: "/v1/bc/company/cpcn/getCompanyList",
        /** 获取详情 */
        getDetailUsingPOST: "/v1/bc/company/cpcn/getDetail",
        /** 获取账户基本信息和余额 */
        getShopSimpleInfoAndBalanceUsingGET: "/v1/bc/company/cpcn/getShopSimpleInfoAndBalance",
        /** 测试-退款 */
        tx5026UsingPOST: "/v1/bc/company/cpcn/refund",
        /** 测试-提现查询 */
        tx4656UsingGET: "/v1/bc/company/cpcn/tx4656",
        /** 用户信息查询 */
        tx4691UsingGET: "/v1/bc/company/cpcn/tx4691",
        /** 支付查询 */
        tx5016UsingPOST: "/v1/bc/company/cpcn/tx5016",
        /** 测试-退款查询 */
        tx5026UsingGET: "/v1/bc/company/cpcn/tx5026",
        /** 延迟分账 */
        tx5031UsingPOST: "/v1/bc/company/cpcn/tx5031",
        /** 测试接口-影印件采集 */
        uploadImageToCpcnUsingPOST: "/v1/bc/company/cpcn/uploadImageToCpcn",
        /** 提现 */
        withdrawalUsingGET: "/v1/bc/company/cpcn/withdrawal"
    },
    "invoice-controller": {
        /** 撤销 */
        commissionCancelUsingGET: "/v1/bc/admin/invoice/commissionCancel",
        /** 确认 */
        commissionConfirmUsingPOST: "/v1/bc/admin/invoice/commissionConfirm",
        /** 开票 */
        commissionCreateUsingPOST: "/v1/bc/admin/invoice/commissionCreate",
        /** 发票确认 */
        confirmUsingPOST: "/v1/bc/admin/invoice/confirm",
        /** 营销费用详情 */
        discountDetailUsingGET: "/v1/bc/admin/invoice/discountDetail",
        /** 发票审核 */
        doActionUsingPOST: "/v1/bc/admin/invoice/doAction",
        /** 导出发票列表 */
        exportListUsingPOST: "/v1/bc/admin/invoice/exportList",
        /** 导出发票列表 */
        exportListUsingGET: "/v1/bc/admin/invoice/exportListByGet",
        /** 获取商家发票信息设置 */
        getSupplierTitleUsingGET: "/v1/bc/admin/invoice/getSupplierTitle",
        /** 获取发票信息设置 */
        getTitleUsingGET: "/v1/bc/admin/invoice/getTitle",
        /** 发票列表 */
        listUsingPOST: "/v1/bc/admin/invoice/list",
        /** 发票信息设置 */
        setTitleUsingPOST: "/v1/bc/admin/invoice/setTitle",
        /** 申请发票 */
        addUsingPOST: "/v1/bc/app/invoice/add",
        /** 开票详情 */
        detailUsingGET: "/v1/bc/app/invoice/detail",
        /** 发票记录 */
        listUsingPOST_1: "/v1/bc/app/invoice/list",
        /** 订单发票开票 */
        addUsingPOST_1: "/v1/bc/company/invoice/add",
        /** 订单发票开票-发票云 */
        autoCreateUsingGET: "/v1/bc/company/invoice/autoCreate",
        /** 平台开票列表 */
        commissionListUsingPOST: "/v1/bc/company/invoice/commissionList",
        /** 查询发票云开票结果 */
        createResultUsingGET: "/v1/bc/company/invoice/createResult",
        /** 撤销开票 */
        discountCancelUsingGET: "/v1/bc/company/invoice/discountCancel",
        /** 确认开票-上传发票 */
        discountConfirmUsingPOST: "/v1/bc/company/invoice/discountConfirm",
        /** 开票-生成票据 */
        discountCreateUsingPOST: "/v1/bc/company/invoice/discountCreate",
        /** 历史处理记录详情 */
        discountDetailUsingGET_1: "/v1/bc/company/invoice/discountDetail",
        /** 营销费用发票列表 */
        discountListUsingPOST: "/v1/bc/company/invoice/discountList",
        /** 获取平台发票信息设置 */
        getPlatformTitleUsingGET: "/v1/bc/company/invoice/getPlatformTitle",
        /** 获取发票信息设置 */
        getTitleUsingGET_1: "/v1/bc/company/invoice/getTitle",
        /** 订单发票列表 */
        personalApplyListUsingPOST: "/v1/bc/company/invoice/personalApplyList",
        /** 订单发票详情 */
        personalDetailUsingGET: "/v1/bc/company/invoice/personalDetail",
        /** 发票信息设置 */
        setTitleUsingPOST_1: "/v1/bc/company/invoice/setTitle"
    },
    "kingdee-controller": {
        /** 发票识别 */
        CheckUsingPOST: "/v1/bc/admin/kingdee/Check",
        /** api116 */
        api116UsingPOST: "/v1/bc/admin/kingdee/api116",
        /** api2 */
        api2UsingPOST: "/v1/bc/admin/kingdee/api2",
        /** createInvoice */
        createInvoiceUsingPOST: "/v1/bc/admin/kingdee/createInvoice",
        /** createResult */
        createResultUsingPOST_1: "/v1/bc/admin/kingdee/createResult",
        /** getInvoiceToken */
        getInvoiceTokenUsingPOST: "/v1/bc/admin/kingdee/invoiceApi",
        /** push */
        pushUsingPOST: "/v1/bc/admin/kingdee/push",
        /** query */
        queryUsingPOST: "/v1/bc/admin/kingdee/query",
        /** save */
        saveUsingPOST: "/v1/bc/admin/kingdee/save",
        /** saveCustomer */
        saveCustomerUsingGET: "/v1/bc/admin/kingdee/saveCustomer",
        /** 同步供应商 */
        saveSupplierUsingGET: "/v1/bc/admin/kingdee/saveSupplier",
        /** syncCommission */
        syncCommissionUsingPOST: "/v1/bc/admin/kingdee/syncCommission",
        /** 同步手续费账单到金蝶应收单 */
        syncCommissionToKingdeeReceivableUsingGET: "/v1/bc/admin/kingdee/syncCommissionToKingdeeReceivable",
        /** syncCpcnCommission */
        syncCpcnCommissionUsingPOST: "/v1/bc/admin/kingdee/syncCpcnCommission",
        /** syncCpcnCommissionByTradeId */
        syncCpcnCommissionByTradeIdUsingPOST: "/v1/bc/admin/kingdee/syncCpcnCommissionByTradeId",
        /** syncInvoice */
        syncInvoiceUsingPOST: "/v1/bc/admin/kingdee/syncInvoice",
        /** 同步金蝶数据 */
        getKingdeeInvoiceListUsingPOST: "/v1/bc/admin/kingdee/syncKingData",
        /** 同步营销费用到金蝶应收单 */
        syncPlatformDiscountToKingdeePayableUsingPOST: "/v1/bc/admin/kingdee/syncPlatformDiscountToKingdeePayable",
        /** 同步供应商 */
        updateInvoiceFromServerUsingGET: "/v1/bc/admin/kingdee/updateInvoiceFromServer",
        /** view */
        viewUsingPOST: "/v1/bc/admin/kingdee/view",
        /** 获取发票云账户 */
        getInvoiceAccountUsingGET: "/v1/bc/company/kingdee/getInvoiceAccount",
        /** 设置商品税收编码 */
        setProductTaxCodeUsingPOST: "/v1/bc/company/kingdee/setProductTaxCode",
        /** 税收分类编码列表 */
        taxCodeListUsingPOST: "/v1/bc/company/kingdee/taxCodeList"
    },
    "money-detail-controller": {
        /** 收支明细 */
        supplierListUsingPOST: "/v1/bc/company/moneyDetail/getList",
        /** 收支明细统计 */
        supplierListCountUsingPOST: "/v1/bc/company/moneyDetail/getListCount",
        /** 费用明细-收支明细关联的应收应付记录 */
        getMoneyDetailRelationLogUsingGET: "/v1/bc/company/moneyDetail/getMoneyDetailRelationLog",
        /** 可提现商户列表 */
        getEnableWithdrawalCompanyListUsingPOST: "/v1/bc/server/worker_money/enable_withdrawal_company_list",
        /** 可提现工单列表 */
        getEnableWithdrawalJobListUsingGET: "/v1/bc/server/worker_money/enable_withdrawal_job_list",
        /** 收支明细 */
        listUsingPOST_2: "/v1/bc/server/worker_money/list",
        /** 提现工单列表 */
        getWithdrawalJobListUsingGET: "/v1/bc/server/worker_money/withdrawal_job_list"
    },
    "public-controller": {
        /** 结果通知 */
        doGetUsingGET: "/v1/bc/public/cpcnNotice",
        /** 结果通知 */
        doPostUsingPOST: "/v1/bc/public/cpcnNotice",
        /** 发票云回调 */
        invoiceCallbackUsingGET: "/v1/bc/public/invoiceCallback",
        /** 发票云回调 */
        invoiceCallbackUsingPOST: "/v1/bc/public/invoiceCallback"
    },
    "receipt-controller": {
        /** 待结算单 */
        getPendingListUsingPOST: "/v1/bc/admin/receipt/getPendingList",
        /** 手续费结算 */
        commissionListUsingPOST_1: "/v1/bc/admin/receipt/platform/commissionList",
        /** 平台开票 */
        discountDetailUsingPOST: "/v1/bc/company/receipt/commissionList",
        /** 导出待结算单 */
        exportUsingPOST: "/v1/bc/company/receipt/exportPendingList",
        /** 待结算单 */
        getPendingListUsingPOST_1: "/v1/bc/company/receipt/getPendingList"
    },
    "statement-controller": {
        /** 结算确认 */
        commissionConfirmUsingGET: "/v1/bc/admin/statement/commissionConfirm",
        /** 结算确认详情预览 */
        commissionConfirmPreviewUsingPOST: "/v1/bc/admin/statement/commissionConfirmPreview",
        /** 手续费结算-待处理账单 */
        commissionListUsingPOST_2: "/v1/bc/admin/statement/commissionList",
        /** 结算周期设置 */
        cycleConfigUsingPOST: "/v1/bc/admin/statement/cycleConfig",
        /** 账单详情 */
        detailUsingGET_2: "/v1/bc/admin/statement/detail",
        /** 票据详情-订单列表 */
        discountDetailUsingPOST_1: "/v1/bc/admin/statement/discountDetail",
        /** 营销费用管理 */
        discountListUsingPOST_1: "/v1/bc/admin/statement/discountList",
        /** 获取结算周期设置 */
        getCycleConfigUsingGET: "/v1/bc/admin/statement/getCycleConfig",
        /** 账单统计 */
        listUsingPOST_3: "/v1/bc/admin/statement/list",
        /** 平台发票详情预览 */
        previewDetailUsingPOST: "/v1/bc/admin/statement/previewDetail",
        /** 服务费账单 */
        commissionListUsingPOST_3: "/v1/bc/company/statement/commissionList",
        /** 账单详情 */
        detailUsingGET_3: "/v1/bc/company/statement/detail",
        /** 营销费用待开票账单 */
        discountListUsingPOST_2: "/v1/bc/company/statement/discountList",
        /** 账单列表 */
        listUsingPOST_4: "/v1/bc/company/statement/list"
    },
    "withdrawal-controller": {
        /** 个人提现-批量确认打款 */
        batchPayUsingPOST: "/v1/bc/company/withdrawal/personal/batchPay",
        /** 个人提现-提现详情 */
        personalDetailUsingGET_1: "/v1/bc/company/withdrawal/personal/detail",
        /** 个人提现-状态修改 */
        personalDoActionUsingPOST: "/v1/bc/company/withdrawal/personal/doAction",
        /** 个人提现-提现列表 */
        personalListUsingPOST: "/v1/bc/company/withdrawal/personal/list",
        /** 提现 */
        addUsingPOST_2: "/v1/bc/server/withdrawal/add",
        /** 提现列表 */
        listUsingPOST_5: "/v1/bc/server/withdrawal/list"
    }
}
