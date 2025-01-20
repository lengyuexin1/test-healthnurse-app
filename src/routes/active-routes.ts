import { pageController } from '@bc/uni-tools'

// 新人特惠
export const gotoNewActive = () => {
    const route = {
        path: '/IndexPage/pages/platform/newUser'
    } as any
    return pageController.push(route)
}

// 专区
export const gotoZone = (id:any, name:string) => {
    const route = {
        path: '/IndexPage/pages/platform/onlyZone',
        query: { id, name }
    } as any
    return pageController.replace(route)
}

// 房间管理
export const roomAdd = () => {
    const route = {
        path: '/pagesTuya/pages/wisdom/roomManage'
    } as any
    return pageController.push(route)
}

// 添加设备
export const deviceAdd = (id:string, roomId?: string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/deviceChoice',
        query: { id, roomId }
    } as any
    return pageController.push(route)
}

// 添加设备
export const gotoDeviceCreate = (id:string, type: string, roomId?: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/deviceCreate',
        query: { id, type, roomId }
    } as any
    return pageController.push(route)
}

// 蓝牙设备添加
export const gotoTemLaya = (roomId: string, type: string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/setTemLaya',
        query: { roomId, type }
    } as any
    return pageController.push(route)
}

type IModel = 'ALARM' | 'SLEEP' | 'FALL' | 'BLOOD_PRESSURE'
interface IRouteFun {
    (query: IDeviceLinkQuery): Promise<void> | void
}
const deviceDetailRoute = {} as Record<IModel, IRouteFun>
/** 跳转到 血压 */
interface IDeviceLinkQuery{
    deviceId: string
    deviceName: string
    status?: number
    sn?: string
}

export const gotoDeviceDetail = (query:IDeviceLinkQuery, model: IModel) => {
    const routeFun = deviceDetailRoute[model]
    if (routeFun) {
        return routeFun(query)
    }
}

export const gotoBooldYa = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/bloodDev',
        query
    } as any
    return pageController.push(route)
}
/** 跳转到 睡眠检测详情 统一调用设备详情 gotoDeviceDetail */
export const gotoSleepDetail = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/sleepDetail',
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 SOS报警器/跌倒报警器 统一调用设备详情 gotoDeviceDetail */
export const gotoAlarmDetail = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/alarmDetail',
        // path: '/pagesTuya/pages/wisdom/deviceDetail',
        query
    } as any
    return pageController.push(route)
}

deviceDetailRoute.SLEEP = gotoSleepDetail
deviceDetailRoute.ALARM = gotoAlarmDetail
deviceDetailRoute.FALL = gotoAlarmDetail
deviceDetailRoute.BLOOD_PRESSURE = gotoBooldYa

/** 跳转到 设备协议 */
export const gotoDeviceTreaty = () => {
    const route = {
        path: '/User/pages/useragreement/richText',
        query: { type: 'deviceTreaty' }
    }
    return pageController.push(route)
}

/** 设备通知设置 */
export const gotoDeviceSetup = (query: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/deviceSetup',
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 接警人 */
export const gotoCaller = (id?:string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/caller',
        query: { id }
    } as any
    return pageController.push(route)
}

/** 跳转到 睡眠检测报告 */
export const gotoSleepReport = (deviceId:string, time:any) => {
    const route = {
        path: '/Create/pages/wisdom/sleepReport',
        query: { deviceId, time }
    } as any
    return pageController.push(route)
}

/** 跳转到 睡眠检测设置 */
export const gotoSleepSetup = (query: {deviceId:string, devName: string}) => {
    const route = {
        path: '/Mall/pages/wisdom/sleepSetup',
        query: query
    } as any
    return pageController.push(route)
}

/** 跳转到 设备联网 */
export const gotoDeviceNet = (blueName: string) => {
    const route = {
        path: '/Mall/pages/wisdom/deviceNet',
        query: { blueName }
    } as any
    return pageController.push(route)
}

/** 跳转到 体温枪配置成功 */
export const gotoSuccedLaya = (deviceId: string) => {
    const route = {
        path: '/Mall/pages/wisdom/addLayaDev',
        query: {  }
    } as any
    return pageController.replace(route)
}

/** 跳转到 开始测试体温 */
export const gotoStartTepTow = (deviceId: string) => {
    const route = {
        path: '/Mall/pages/wisdom/startLiang',
        query: {  }
    } as any
    return pageController.replace(route)
}

/** 跳转到 体温结果 */
export const gotoResult = (tem: any) => {
    const route = {
        path: '/Mall/pages/wisdom/tempResult',
        query: { tem }
    } as any
    return pageController.replace(route)
}

/** 跳转到 体温设备页 */
export const gotoBodyTem = (deviceId: string) => {
    const data =  encodeURIComponent(JSON.stringify(deviceId))
    const route = {
        path: '/Mall/pages/wisdom/bodyTem',
        query: { data }
    } as any
    return pageController.push(route)
}

/** 跳转到 体温记录 */
export const gotorecListTem = (mac: string) => {
    const data =  encodeURIComponent(JSON.stringify(mac))
    const route = {
        path: '/Mall/pages/wisdom/recodeList',
        query: { data }
    } as any
    return pageController.push(route)
}

/** 跳转到 体温记录 */
export const gotoRecodEcart = (tep: string, time: string, sdaMac: string) => {
    const route = {
        path: '/Create/pages/wisdom/recodEcart',
        query: { tep, time, sdaMac }
    } as any
    return pageController.push(route)
}

/** 跳转到 开始测试体温 */
export const gotoStartTep = (deviceId: string) => {
    const route = {
        path: '/Mall/pages/wisdom/startLiang',
        query: {  }
    } as any
    return pageController.push(route)
}

/** 跳转到 设备联网 */
export const gotoEzVideo = (deviceSerial: string, verifyCode:string) => {
    const route = {
        path: '/Mall/pages/wisdom/ezviz_video',
        query: { deviceSerial,verifyCode  }
    } as any
    return pageController.push(route)
}

/** 跳转到 播放摄像 */
export const gotoPlayVideo= (deviceSerial: string,verifyCode:string ) => {
    const route = {
        path: '/Mall/pages/wisdom/ezviz_video_player',
        query: { deviceSerial, verifyCode }
    } as any
    return pageController.push(route)
}

/** 跳转到 设备管理 */
export const gotoDeviceManag = (roomId?: string, roomName?: string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/deviceManag',
        query: { roomId, roomName }
    } as any
    return pageController.push(route)
}

/** 涂鸦设备 */
export const gotoTuYa = () => {
    const route = {
        path: '/pagesTuya/pages/wisdom/tuyaList',
        query: {}
    } as any
    return pageController.push(route)
}

export const gotoAppTy = () => {
    const route = {
        path: '/pagesTuya/pages/wisdom/index',
        query: {}
    } as any
    return pageController.push(route)
}

export const gotoCameraDetail = (query: IDeviceLinkQuery) => {
    let type = true //app
    // #ifdef MP-WEIXIN
    type = false // 小程序
    // #endif
    let route = {
        path: '/Hardware/pages/wisdom/cameraDetail',
        query
    } as any
    if (!type) {
        // 不能从分包外的页面直接跳入分包内的插件页面，需要先跳入分包内的非插件页面、再跳入同一分包内的插件页面
        console.error("注意：不能从分包外直接跳转至插件页面")
        route = {
            path: '/Hardware/pages/wisdom/xcxCameraDetail',
            query
        } as any
    }
    return pageController.push(route)
}

/* 跳转摄像头配网 */
export const gotoCameraNet = (deviceSerial: string) => {
    const route = {
        path: '/Hardware/pages/deviceScan/deviceScan',
        query: { deviceSerial }
    } as any
    return pageController.push(route)
}

// 涂鸦设备配置网络
export const gotoTuYaNet = (roomId: any, type: string) => {
    const route = {
        path: '/pagesMall/pages/wisdom/tuyaGetnet',
        query: { type, roomId }
    } as any
    return pageController.replace(route)
}

// 涂鸦蓝牙配网
export const gotoTyLy = (id: any, type: string, roomId: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/layaNet',
        query: { id, type, roomId }
    } as any
    return pageController.replace(route)
}

// 照明详情
export const lightDetail = (type: string, id: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/light',
        query: { type, id }
    } as any
    return pageController.push(route)
}

// 窗帘详情
export const clDetail = (type: string, id: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/curtain',
        query: { type, id }
    } as any
    return pageController.push(route)
}

// 空调伴侣
export const gotoAirCond = (type: string, id: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/airCond',
        query: { type, id }
    } as any
    return pageController.push(route)
}

// 选择空调品牌
export const gotoAirList = (id: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/airList',
        query: { id }
    } as any
    return pageController.push(route)
}

// 跳转空调遥控器
export const gotoAirIndex = (devId: any, ktId:any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/airSelect',
        query: { devId, ktId }
    } as any
    return pageController.push(route)
}

// 跳转空调遥控器
export const gotoAirLook = (devId: any, hotId:any, ktId:any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/airLook',
        query: { devId, hotId, ktId }
    } as any
    return pageController.push(route)
}

// 温湿度计
export const gotoTemWater = (type: string, id: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/temAndWater',
        query: { type, id }
    } as any
    return pageController.push(route)
}

/** 设备通知记录 */
export const gotoNoticeRecord = (query: any) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/noticeRecord',
        query
    } as any
    return pageController.push(route)
}

/** 设备通知详情 */
export const gotoNoticeDetail = (query: any) => {
    const route = {
        path: '/pagesMall/pages/wisdom/noticeDetail',
        query
    } as any
    return pageController.push(route)
}

/** 设备通知人员设置 */
export const gotoNoticeStaff = () => {
    const route = {
        path: '/pagesTuya/pages/wisdom/noticeStaff',
        query: {}
    } as any
    return pageController.push(route)
}

/** 消费明细 */
export const gotoExpendList = () => {
    const route = {
        path: '/pagesTuya/pages/wisdom/expendList',
        query: {}
    } as any
    return pageController.push(route)
}

/** 跳转到 血压记录 */
export const gotobooldLuc = (tep:any) => {
    const route = {
        path: '/pagesCreate/pages/wisdom/bloodResult',
        query: { tep }
    } as any
    return pageController.push(route)
}

/** 跳转到 全部列表 */
export const gotoCateList = (query:any) => {
    const route = {
        path: '/IndexPage/pages/platform/catesList',
        query: query
    } as any
    return pageController.replace(route)
}

/** 跳转到 全部列表 */
export const gotoCateType = (query:any) => {
    const route = {
        path: '/IndexPage/pages/platform/catesList',
        query: query
    } as any
    return pageController.push(route)
}

/** 跳转到 中转 */
export const gotoCenterChanges = (id:any, name:string) => {
    const route = {
        path: '/IndexPage/pages/platform/centerChanges',
        query: { id, name }
    } as any
    return pageController.push(route)
}

/** 跳转到 全部列表 */
export const gotoCateArrList = (query:any) => {
    const route = {
        path: '/IndexPage/pages/platform/catesList',
        query: query
    } as any
    return pageController.push(route)
}

export const gotoEditName = ( id:any ) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/editLightName',
        query: { id }
    } as any
    return pageController.push(route)
}
