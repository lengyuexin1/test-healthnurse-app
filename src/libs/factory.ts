/* 厂商个性化配置 */

import { PromiseProvider } from "@/libs/provider"
const factoryMation = new PromiseProvider().setCallback(() => {
    return getFactory()
})

export const getFactoryDict = async () => {
    return factoryMation.getData()
}

const getFactory = () => {
    return new Promise((reslove, reject) => {
        // #ifdef APP-PLUS
        uni.getSystemInfo({
            success: (res:any) => {
                reslove({
                    // 判断小米关 特殊处理康复辅助内容
                    handleRecovery: res.deviceBrand === "xiaomi",
                    // 上架华为 隐藏频道数据
                    isShowChannel: true//!(res.deviceBrand === "huawei" || res.deviceBrand === "xiaomi")
                })
            }
        })
        // #endif
    })
}
