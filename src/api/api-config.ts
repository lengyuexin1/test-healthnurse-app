import { apiVersion } from './config.js'

/* 接口模块分类 */
export const apiPrefix = {
    /* 订单 */
    order: `api/order${apiVersion}/bc`,
    /* 商城订单 */
    product: `/api/order${apiVersion}/product`,
    /* 个人中心 */
    user: `/api/user${apiVersion}/bc`,
    /* 结算中心 */
    settlement: `${apiVersion}/bc`,
    /* 搜索 */
    search: `/api/search${apiVersion}/bc`,
    /* 消息 */
    im: `/api/im${apiVersion}/bc`,
    /* 内容 */
    content: `/api/content${apiVersion}/bc`,
    /* 智护 */
    smart: `api/smart${apiVersion}/bc`,
    device: `/api/device${apiVersion}/bc`
}
