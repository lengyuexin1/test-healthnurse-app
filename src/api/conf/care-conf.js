import { apiPrefix } from '@/api/api-config'


/** 发票 */
export const INVOICE_API = {
    invoiceList: `${apiPrefix.settlement}/app/invoice/list`,
    cancelInvoice: `${apiPrefix.settlement}/app/invoice/cancel`,
    invoiceDetail: `${apiPrefix.settlement}/app/invoice/detail`,
    addInvoice: `${apiPrefix.settlement}/app/invoice/add`
}
/** 服务项目 */
export const SERVICE_API = {
    getByCategoryIds: `${apiPrefix.user}/company/category/certificate/getByCategoryIds`,
    serviceDetail: `${apiPrefix.order}/public/app/item/detail`,
    orderEntityConfig: `${apiPrefix.order}/app/order/purchase/view`, //下单数据 非购物车
    cartEntityConfig: `${apiPrefix.order}/app/cart/purchase/view`, //下单数据 购物车
    getCategoryShowList: `${apiPrefix.order}/public/app/category_show/list`, //区分小程序获取二级类目
    collageItemInfo: `${apiPrefix.order}/public/app/collage/item/info`, //查看商品是否有拼团信息
    collageList: `${apiPrefix.order}/public/app/collage/order/list`, //商品产品的拼团列表
    collageRecord: `${apiPrefix.order}/public/app/collage/order/record`, //拼团记录数据
    collageCreate: `${apiPrefix.order}/app/collage/create`, //开团
    collageJoin: `${apiPrefix.order}/app/collage/join`, //参团
    getStairCategory: `${apiPrefix.user}/app/common/getStairCategory`, //一级类目
    getProductList: `${apiPrefix.order}/public/app/category_show/product/list`, //智护商品列表
    getItemUnit: `${apiPrefix.order}/merchant/item/unit`,
    configList: `${apiPrefix.user}/company/company/configList`, //配置字典
    getAllCategory: `${apiPrefix.user}/company/organization/getAllCategory`, //获取全部类目
    getSerListAll: `/api/search/v1/bc/public/es/item/list`,
    featured: `${apiPrefix.search}/es/featured`,
    getItemRemitList: `${apiPrefix.user}/app/common/itemList`,
    getAreaList: `${apiPrefix.user}/app/district/getSonList`,
    preferredList: `${apiPrefix.user}/public/app/common/preferredList`,
    homeMould: `${apiPrefix.order}/public/app/home/mould/data`
}



