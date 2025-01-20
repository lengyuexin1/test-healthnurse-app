import { apiPrefix } from '@/api/api-config'


/** 发票 */
export const INVOICE_API = {
    invoiceList: `${apiPrefix.settlement}/app/invoice/list`,
    cancelInvoice: `${apiPrefix.settlement}/app/invoice/cancel`,
    invoiceDetail: `${apiPrefix.settlement}/app/invoice/detail`,
    addInvoice: `${apiPrefix.settlement}/app/invoice/add`
}



