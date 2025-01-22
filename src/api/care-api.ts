import { http } from "@bc/api"
import { INVOICE_API } from "./conf/care-conf.js"


/** 申请发票 */
export const addInvoice = async (params: any) => {
    return http.order.post(INVOICE_API.addInvoice, params)
}

/** 发票详情 */
export const invoiceDetail = async (params: { id: number }) => {
    return http.order.get(INVOICE_API.invoiceDetail, params)
}

/** 发票列表 */
export const invoiceList = async (params: any) => {
    return http.settlement.post(INVOICE_API.invoiceList, params)
}

/** 取消开票 */
export const cancelInvoice = async (params: { id: number }) => {
    return http.order.post(INVOICE_API.cancelInvoice, params)
}
