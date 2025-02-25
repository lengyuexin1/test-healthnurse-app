import { deviceRecord, getWeixinSessionKey, marketingDetail } from '@/api/user-api'
import { PlatformManage } from "@bc/sys"

const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv

class CollectAndReport {
    private deviceId: string
    private channelId: string
    private customScene: string

    private req: any = {}

    constructor(options: { deviceId?: string, channelId?: string, adScene?: string }) {
        this.deviceId = options.deviceId || uni.getStorageSync("statistics")?.deviceId || ""
        this.channelId = options.channelId || uni.getStorageSync("statistics")?.channelId || ""
        this.customScene = options.adScene || ''
        uni.setStorageSync("statistics", {
            deviceId: this.deviceId,
            channelId: this.channelId
        })
        this.req.deviceId = this.deviceId
        this.req.loginId = 0

        const unionId = uni.getStorageSync('unionId')
        unionId && (this.req.unionId = unionId)

        this.getReqMation()
        // this.getScene()

        PlatformManage.getToken().then((res: any) => {
            this.req.loginId = res ? res.id : 0
        })

    }


    // 获取请求参数
    private getReqMation() {
        getReportMation().then((res: any) => {
            this.req = { ...this.req, ...res }
            return getChannel(this.channelId)
        }).then((res: any) => {
            this.req = { ...this.req, ...res }
            this.crankup(this.customScene ? 13 : 6)
        })
    }

    // 获取路径
    private getCurrent(activity_id?: string, type?: string) {
        // 小程序页面路由
        const pages = getCurrentPages()
        const page = pages[pages.length - 1] || {
            route: "pages/daybreak/daybreak"
        }
        this.req.pageLink = `${page.route}?platformKind=${1}${!activity_id ? '' : '&activity_id=' + activity_id}${!type ? '' : '&type=' + type}`

        console.log('上报类获取地址', this.req.pageLink)

    }


    // 启动上报 6正常启动 13广告启动
    private crankup(event: 6 | 13) {
        console.log("...this.req", this.req)
        this.getCurrent()
        deviceRecord({
            // 3 站外曝光、4 站外点击、5 激活(安装)、6 启动、7 注册、8 登录、10 咨询 12支付 13 广告启动 14活动点击 15推广ID采集错误上报
            event,
            ...this.req
        }).then(res => {
            if (!uni.getStorageSync('unionId')) {
                this.req.unionId = res || null
                this.installReport()
                uni.setStorageSync('unionId', res)
            }
            console.log(`${event}启动上报成功`)
        }).catch(err => {
            console.log(`${event}启动上报失败`, err)
        })
    }

    // 安装上报
    private installReport() {
        this.getCurrent()
        deviceRecord({
            event: 5,
            ...this.req
        }).then(() => {
            console.log("安装上报成功")
        }).catch(err => {
            console.log("安装上报失败", err)
        })
    }

    // 正常预览上报
    surfReport() {
        this.getCurrent()
        deviceRecord({
            event: 1,
            ...this.req
        }).then(() => {
            console.log("浏览上报成功")
        }).catch(err => {
            console.log("浏览上报失败", err)
        })
    }

    // 同页面不同列表预览上报
    previewReport(type: string) {
        console.log('previewReportTYPE', type)

        this.getCurrent("", type)
        deviceRecord({
            event: 1,
            ...this.req
        }).then(() => {
            console.log("同页面不同列表预览上报成功")
        }).catch(err => {
            console.log("同页面不同列表预览上报失败", err)
        })
    }

    // 视频播放事件
    videoPlayReport(type?: string, itemId?: string) {
        this.getCurrent("", type)

        deviceRecord({
            event: 16,
            ...this.req,
            itemId

        }).then(() => {
            console.log("视频播放事件成功")
        }).catch(err => {
            console.log("视频播放事件失败", err)
        })
    }


    // 视频完播事件
    videoPlayOverReport(type?: string, itemId?: string) {
        this.getCurrent("", type)
        deviceRecord({
            event: 17,
            ...this.req,
            itemId
        }).then(() => {
            console.log("视频完播事件成功")
        }).catch(err => {
            console.log("视频完播事件失败", err)
        })
    }


}


let instanceCache: any = null

// 缓存实例
function createCollectAndReport(options: { channelId?: string, deviceId?: string, adScene?: string } = {}) {
    if (!instanceCache || (options.channelId && !instanceCache.channelId)) {
        instanceCache = new CollectAndReport(options)
    }
    return instanceCache
}

// 创建实例并传递参数
export default createCollectAndReport


export async function getReportMation() {
    let identityOaid = ""
    let androidId = ""
    let identityMac = ""
    let identityIdfv = ""
    let wxUnionId = ""
    let wxOpenId = ""

    let identityImei = ""
    let identityIdfa = ""
    // let localIP = ""

    // 获取设备信息
    function getSysInfo() {
        const sysInfo = uni.getSystemInfoSync()
        console.log("sysInfo", sysInfo)
        /**
         * osName 系统名称 ios、android
         * osVersion 操作系统版本
         * screenWidth 屏幕宽度
         * screenHeight 屏幕高度
         * deviceModel 设备型号 [model:不推荐使用的返回参数，仅为向下兼容保留]
         * deviceBrand 设备制造商/设备品牌
         * appVersionCode 应用版本名号
         * appVersion 应用版本名称
         * ua userAgent标识[微信小程序不支持]
         *
         * wifiEnabled? Wi-Fi 的系统开关[只支持微信小程序]
         */
        let os = sysInfo.osName
        // #ifdef MP-WEIXIN
        os = "wx"

        const miniProgram = uni.getAccountInfoSync().miniProgram
        miniProgram.version && (sysInfo.appVersion = miniProgram.version)
        // #endif
        return {
            os,
            osVersion: sysInfo.osVersion,
            screenWidth: sysInfo.screenWidth,
            screenHeight: sysInfo.screenHeight,
            model: sysInfo.deviceModel,
            manufacturer: sysInfo.deviceBrand,
            // appVersionCode: sysInfo.appVersionCode,
            appVersion: sysInfo.appVersion,
            identityUa: sysInfo.ua || ""
            // wifiEnabled: sysInfo.wifiEnabled
        }
    }

    // 判断是否连接wifi
    function geteConnectWifi() {
        return new Promise(resolve => {
            uni.getNetworkType({
                success: (res) => {
                    resolve(res.networkType === "wifi" ? 1 : 0)
                    console.log("当前是否连接wifi", res.networkType === "wifi")
                },
                fail: () => {
                    resolve(0)
                }
            })
        })
    }

    // #ifdef APP-PLUS
    // 获取oaid
    function getOAID() {
        return new Promise((resolve) => {
            // IOS不支持
            plus.device.getOAID({
                success: function(e) {
                    resolve(e.oaid)
                    console.log("getOAID success: " + JSON.stringify(e))
                },
                fail: function(e) {
                    console.log("getOAID failed: " + JSON.stringify(e))
                    // throw new Error("getOAID failed: " + JSON.stringify(e))
                    resolve("")
                }
            })
        })
    }

    //获取本机Mac地址
    function getMAC() {
        let deviceMac = ""
        const net: any = plus.android.importClass("java.net.NetworkInterface")
        const wl0 = net.getByName("wlan0")
        const macByte = wl0.getHardwareAddress() || ""
        for (let i = 0; i < macByte.length; i++) {
            let tmp = ""
            const num = macByte[i]
            if (num < 0) {
                tmp = (255 + num + 1).toString(16)
            }
            else {
                tmp = num.toString(16)
            }
            if (tmp.length == 1) {
                tmp = "0" + tmp
            }
            deviceMac += tmp
        }
        for (let i = 2; i < deviceMac.length; i += 3) {
            deviceMac = deviceMac.slice(0, i) + ":" + deviceMac.slice(i)
        }
        return deviceMac
    }

    // 获取imei
    function getIMEI() {
        return new Promise((resolve) => {
            resolve({ imei: "", idfa: "" })
            // 获取拨打电话和管理通话权限 - APP审核不过
            // plus.device.getInfo({
            //     success: (e) => {
            //         resolve({
            //             imei: e.imei,
            //             idfa: e.idfa
            //         })
            //     },
            //     fail: (err) => {
            //         uni.setStorageSync("unGetInfo", true)
            //         console.log("用户取消授权：" + JSON.stringify(err))
            //         resolve({ imei: "", idfa: "" })
            //     }
            // })
        })
    }

    // 获取android id
    function getAndroidId() {
        const mainActivity: any = plus.android.runtimeMainActivity()
        const Settings: any = plus.android.importClass(
            "android.provider.Settings"
        )
        const androidId = Settings.Secure.getString(
            mainActivity.getContentResolver(),
            Settings.Secure.ANDROID_ID
        )
        return androidId
    }

    // IOS获取idfv
    function getIdfa_idfv() {
        const NSUUID = plus.ios.importClass('NSUUID')
        const UIDevice = plus.ios.importClass("UIDevice")
        const currentDevice = UIDevice.currentDevice()
        const identifierForVendor = currentDevice.identifierForVendor().UUIDString()
        let idfa
        const ASIdentifierManager = plus.ios.importClass("ASIdentifierManager")
        const sharedManager = ASIdentifierManager.sharedManager()
        if (sharedManager.isAdvertisingTrackingEnabled()) {
            const advertisingIdentifier = sharedManager.advertisingIdentifier()
            idfa = plus.ios.invoke(advertisingIdentifier, "UUIDString")
        }
        // const result = { 'idfa': idfa, 'idfv': identifierForVendor }
        return identifierForVendor//result
    }

    // #endif

    // 获取IP地址 【理应服务器获取】
    function getIP() {
        return new Promise((resolve) => {
            uni.request({
                url: "https://app.bilibili.com/x/resource/ip",
                method: "GET",
                success: (res: any) => {
                    if (res.data.code === 0) {
                        resolve(res.data.data.addr)
                        return
                    }
                    // throw new Error("IP获取失败")
                    resolve("")
                },
                fail: () => {
                    // throw new Error("IP获取失败")
                    resolve("")
                }
            })
        })
    }

    // #ifdef MP-WEIXIN
    // 获取unionid
    function getWxUnionid() {
        return new Promise(resolve => {
            uni.login({
                provider: "weixin",

                success: function(loginRes) {
                    // 登录成功
                    getWeixinSessionKey({
                        code: loginRes.code,
                        appid: 'wxba2158972baec41b'
                    }).then((res: any) => {
                        // uni.setStorageSync('unionid', res.unionid)
                        resolve({
                            wxOpenId: res.openid,
                            wxUnionId: res.unionid
                        })
                        console.log('unionid', res.unionid)
                    }).catch(_err => {
                        // throw new Error(err)
                        console.log('unionid', _err)
                        resolve({
                            wxOpenId: "",
                            wxUnionId: ""
                        })
                    })
                },
                fail: function() {
                    // throw new Error('登录失败')
                    resolve({
                        wxOpenId: "",
                        wxUnionId: ""
                    })
                }
            })
        })
    }

    const wxInfo: any = await getWxUnionid()
    wxOpenId = wxInfo.wxOpenId
    wxUnionId = wxInfo.wxUnionId
    // #endif


    const deviceInfo = getSysInfo()

    // #ifdef MP-WEIXIN
    // function getWxUserAgent() {
    //     return new Promise(resolve => {
    //         wx.getRendererUserAgent().then(userAgent => resolve(userAgent))
    //     })
    // }
    // deviceInfo.ua = await getWxUserAgent()
    // #endif

    // #ifdef APP-PLUS
    if (deviceInfo.os === "android") {
        console.log("安卓")
        identityOaid = await getOAID() as string
        androidId = getAndroidId()
        identityMac = getMAC()
    }
    if (deviceInfo.os === "ios") {
        console.log("ios")
        identityIdfv = getIdfa_idfv()
    }

    // 拒绝手机号码权限，不再获取 imei
    if (uni.getStorageSync("unGetInfo") || deviceInfo.manufacturer === "huawei") {
        // console.log("华为不做操作")
    }
    else {
        const devinfo: any = await getIMEI()
        identityImei = devinfo.imei
        identityIdfa = devinfo.idfa
    }

    // localIP = await getIP()
    // #endif

    const isWifi = await geteConnectWifi()

    // 推广渠道信息
    // const channel:any = await getChannel()
    // console.log("channel", channel)
    return {
        isWifi,
        // PLATFORM_KIND,
        identityOaid,
        androidId,
        identityImei,
        identityIdfa,
        identityMac,
        // localIP,
        identityIdfv,
        wxUnionId,
        wxOpenId,
        ...deviceInfo,
        // ...channel,
        deviceId: uni.getStorageSync("statistics")?.deviceId || ""
    }
}


// 应用类型 1: APP 2: 小程序
let appType = 1

// #ifdef MP-WEIXIN
appType = 2
// #endif


// 获取渠道
export const getChannel = (promotionId: string) => {
    console.log("+++++++promotionId", promotionId)
    const channelMation = {
        promotionId: "",
        promotionChannel: "",
        promotionMedia: "",
        adId: "",
        promotionMethod: 1,
        trafficType: 1,
        appType
    }
    return new Promise((resolve) => {
        if (!promotionId) {
            resolve(channelMation)
            return
        }
        marketingDetail(promotionId).then((res: any) => {
            console.log("promotionId", promotionId)
            resolve({
                promotionId: res.id,
                promotionChannel: res.channelId,
                promotionMedia: res.channelBelowId,
                adId: res.adId,
                promotionMethod: res.isOnline,
                trafficType: res.adId ? 2 : 1,
                appType
            })
        }).catch(() => {
            resolve(channelMation)
        })
    })
}

