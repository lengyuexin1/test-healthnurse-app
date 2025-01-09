import { openHttp,http } from "@bc/api"

/**
 * 适品类型api
 * 组件内请求api
 */


/** 获取对应类目产品列表 */
export const getgoodsList = (req:any) =>{
    return openHttp.order.post('/v1/bc/app/category_show/product/list',req)
}

