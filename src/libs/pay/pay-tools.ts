// #ifdef APP-PLUS
const testModule = uni.requireNativePlugin("cpcn-cpcnpay")
// #endif

const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv


interface PaymentData {
    appid: string
    nonceStr: string
    packageVal: string
    partnerId?: string
    prepayId?: string
    timestamp?: string
    sign?: string
    timeStamp?: string
    signType?: string
    paySign?: string
}

type payFunctionType = (data: PaymentData) => Promise<unknown>

/**
 * 调起微信支付 兼容 小程序和APP
 * @param data 调起支付参数
 * @returns
 */
export const packPayment = (data: PaymentData) => {
    let payFun: payFunctionType
    // #ifdef MP-WEIXIN
    payFun = wxPay
    // #endif

    // #ifdef APP-PLUS
    // 判断支付插件存在使用中金支付，否则使用微信支付
    payFun = testModule ? cpcnwxpay : wxPay
    // #endif

    return payFun(data)
}

/**
 * 微信支付
 */
export const wxPay = (data: PaymentData) => {
    return new Promise((resolve, reject) => {

        // #ifdef MP-WEIXIN




        // if (WEB_ENV == 'test') {
        // test使用直连微信支付
        uni.requestPayment({
            provider: "wxpay",

            /* app微信支付参数 */
            // #ifdef APP-PLUS
            orderInfo: {
                appid: data.appid,
                noncestr: data.nonceStr,
                package: data.packageVal,
                partnerid: data.partnerId,
                prepayid: data.prepayId,
                timestamp: data.timestamp,
                sign: data.sign
            },
            // #endif

            /* 微信小程序支付参数 */
            // #ifdef MP-WEIXIN
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageVal,
            signType: data.signType,
            paySign: data.paySign,
            // #endif

            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
        // }else{
        //     // pre prod使用中金小程序半屏支付
        //     let authCode = JSON.stringify(data);

        //     wx.openEmbeddedMiniProgram({
        //         appId: 'wxa82d22a4bc04cb2e',
        //         path: 'pages/home/home?code=' + authCode, //请求后台获取到的authCode,json格式的字符串
        //         success(res: any) {
        //           // 打开成功
        //           console.log('打开成功',res);
        //           resolve(res);

        //         },
        //         fail: function (res: any) {
        //           // 打开失败
        //           console.log("打开失败",res);
        //           reject(res);

        //         },
        //     })
        // }


        // #endif

        // #ifdef APP-PLUS
        uni.requestPayment({
            provider: "wxpay",

            /* app微信支付参数 */
            orderInfo: {
                appid: data.appid,
                noncestr: data.nonceStr,
                package: data.packageVal,
                partnerid: data.partnerId,
                prepayid: data.prepayId,
                timestamp: data.timestamp,
                sign: data.sign
            },

            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
        // #endif


        // uni.requestPayment({
        //     provider: "wxpay",

        //     /* app微信支付参数 */
        //     // #ifdef APP-PLUS
        //     orderInfo: {
        //         appid: data.appid,
        //         noncestr: data.nonceStr,
        //         package: data.packageVal,
        //         partnerid: data.partnerId,
        //         prepayid: data.prepayId,
        //         timestamp: data.timestamp,
        //         sign: data.sign
        //     },
        //     // #endif

        //     /* 微信小程序支付参数 */
        //     // #ifdef MP-WEIXIN
        //     timeStamp: data.timeStamp,
        //     nonceStr: data.nonceStr,
        //     package: data.packageVal,
        //     signType: data.signType,
        //     paySign: data.paySign,
        //     // #endif

        //     success(res) {
        //         resolve(res)
        //     },
        //     fail(err) {
        //         reject(err)
        //     }
        // })
    })
}

// #ifdef APP-PLUS

/**
 * 中金支付
 * @param payParams 支付参数
 */
export const cpcnwxpay = (payParams: PaymentData) => {
    return new Promise((resolve, reject) => {
        const platform = uni.getSystemInfoSync().platform
        if (platform == "android") {
            const isSuccess = testModule.weixinPay(
                "wx503d0b79e2a259fd",
                JSON.stringify(payParams)
            )
            if (isSuccess) {
                console.log("支付成功")
                resolve({
                    isSuccess,
                    status: "CPCN"
                })
            }
            else {
                console.log("支付失败")
                reject(isSuccess)
            }
        }
        else if (platform == "ios") {
            return cpcnIosPay(JSON.stringify(payParams))
        }
    })
}

/**
 * IOS支付
 */
// 调用ios微信支付
const cpcnIosPay = (payParams: string) => {
    return new Promise((resolve, reject) => {
        testModule.ios_WxPayWithAuthCode(
            payParams,
            (ret: any) => {
                //微信调起结果回调
                if (ret == "success") {
                    uni.showToast({
                        title: "调起微信 success",
                        icon: "none"
                    })
                }
                else {
                    uni.showToast({
                        title: "调起微信 fail",
                        icon: "none"
                    })
                    reject({ message: "调起微信支付失败" })
                }
            },
            (payResultDic: any) => {
                //微信支付结果回调
                const respType = payResultDic.respType
                if (respType == "WXLaunchMiniProgramResp") {
                    //小程序通道的回调
                    const extMsg = payResultDic.extMsg
                    const extDic = JSON.parse(extMsg)
                    if (extDic.status == 20) {
                        //成功
                        uni.showToast({
                            title: "支付成功",
                            icon: "none"
                        })
                        resolve("支付成功")
                    }
                    else {
                        //失败
                        uni.showToast({
                            title: "支付失败" + extMsg,
                            icon: "none"
                        })
                        reject({ message: extMsg })
                    }
                }
                else {
                    //app跳转通道的回调
                    const payResult = payResultDic.payResult
                    if (payResult == "WXSuccess") {
                        uni.showToast({
                            title: "支付成功",
                            icon: "none"
                        })
                        resolve("支付成功")
                    }
                    else {
                        console.log("payResultDic.errStr", payResultDic.errStr)
                        uni.showToast({
                            title: payResultDic.errStr,
                            icon: "none"
                        })
                        reject({ message: payResultDic.errStr })
                    }
                }
            }
        )
    })
}
// #endif
