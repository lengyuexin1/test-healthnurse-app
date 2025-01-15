import { pageController } from '@bc/uni-tools'

//===============================================================
/** 智护路由 */
//===============================================================


/* 跳转到 场景管理 */
export const gotoSceneManage = () => {
    const route = {
        path: '/Mall/pages/scene/sceneManage',
        query: {  }
    } as any
    return pageController.push(route)
}

/* 跳转到 场景服务 */
export const gotoSceneServer = (patientId:string, name: string) => {
    const route = {
        path: '/Mall/pages/scene/sceneServer',
        query: { patientId, name }
    } as any
    return pageController.push(route)
}

/* 跳转到 添加场景服务 */
export const gotoSceneIncrease = () => {
    const route = {
        path: '/Mall/pages/scene/sceneIncrease',
        query: {  }
    } as any
    return pageController.push(route)
}

/* 跳转到 场景条件 */
export const gotoSceneFactor = () => {
    const route = {
        path: '/Mall/pages/scene/sceneFactor',
        query: {  }
    } as any
    return pageController.push(route)
}

/* 跳转到 我的智护帮 */
export const gotoPersonnel = (inds: number) => {
    const route = {
        path: '/Mall/pages/wisdom/personnel',
        query: { inds }
    } as any
    return pageController.push(route)
}

/** 跳转到 使用者管理 */
export const gotoUtilise = (status = 0 as number, lcode?: string) => {
    const route = {
        path: '/Mall/pages/wisdom/utilise',
        query: { status, lcode }
    } as any
    return pageController.push(route)
}

/** 跳转到 智慧场景 */
export const gotoSceneSmart = () => {
    const route = {
        path: '/Mall/pages/scene/sceneSmart',
        query: {  }
    } as any
    return pageController.push(route)
}

/**  旧版 跳转到 智慧场景详情 */
export const gotoSmartDetail = (id: number) => {
    const route = {
        path: '/Mall/pages/scene/smartDetail',
        query: { id }
    } as any
    return pageController.push(route)
}


/** 跳转到 房间管理 */
export const gotoRoomManag = () => {
    const route = {
        path: '/Mall/pages/wisdom/roomManag',
        query: {  }
    } as any
    return pageController.push(route)
}

/*  跳转到 房间详情 */
export const gotoRoomDetail = (roomId: string, roomName: string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/roomDetail',
        query: { roomId, roomName }
    } as any
    return pageController.push(route)
}

/** 跳转到 设备管理 */
export const gotoDeviceManag = (query:{roomId?: string, roomName?: string}) => {
    const route = {
        path: '/Mall/pages/wisdom/deviceManag',
        query
    } as any
    return pageController.push(route)
}

/**
 * 设备类型
 * ALARM 紧急呼叫报警器
 * SLEEP 睡眠监测带
 * FALL 跌倒报警器
 * BLOOD_PRESSURE 血压监测
 */
type IModel = 'ALARM' | 'SLEEP' | 'FALL' | 'BLOOD_PRESSURE'
interface IDeviceLinkQuery{
    deviceId: string
    deviceName: string
    status?: number
    sn?: string
}
interface IRouteFun {
    (query: IDeviceLinkQuery): Promise<void> | void
}
const deviceDetailRoute = {} as Record<IModel, IRouteFun>

/** 跳转到 睡眠检测详情 统一调用设备详情 gotoDeviceDetail */
export const gotoSleepDetail = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/Mall/pages/wisdom/sleepDetail',
        query
    } as any
    return pageController.push(route)
}


/** 跳转到 设备详情 */
export const gotoDeviceDetail = (query:IDeviceLinkQuery, model: IModel) => {
    const routeFun = deviceDetailRoute[model]
    if (routeFun) {
        return routeFun(query)
    }

    uni.$u.toast("暂无此设备")
}

/** 跳转到 SOS报警器/跌倒报警器 统一调用设备详情 gotoDeviceDetail */
export const gotoAlarmDetail = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/Mall/pages/wisdom/alarmDetail',
        // path: '/Mall/pages/wisdom/deviceDetail',
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 血压 */
export const gotoBooldYa = (query:IDeviceLinkQuery) => {
    const route = {
        path: '/Mall/pages/wisdom/bloodDev',
        query
    } as any
    return pageController.push(route)
}

deviceDetailRoute.SLEEP = gotoSleepDetail
deviceDetailRoute.ALARM = gotoAlarmDetail
deviceDetailRoute.FALL = gotoAlarmDetail
deviceDetailRoute.BLOOD_PRESSURE = gotoBooldYa


/** 跳转到 接警人 */
export const gotoCaller = (id?:string) => {
    const route = {
        path: '/Mall/pages/wisdom/caller',
        query: { id }
    } as any
    return pageController.push(route)
}


/** 跳转到 睡眠检测报告 */
export const gotoSleepReport = (deviceId:string) => {
    const route = {
        path: '/Create/pages/wisdom/sleepReport',
        query: { deviceId }
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


/** 跳转到 睡眠检测信息 */
export const gotoSleepMation = (deviceId:string, type: 0 | 1) => {
    const route = {
        path: '/Mall/pages/wisdom/sleepMation',
        query: { deviceId, type }
    } as any
    return pageController.push(route)
}

/** 跳转到 添加设备 */
export const gotoDeviceCreate = (roomId: string, type: string) => {
    const route = {
        path: '/Mall/pages/wisdom/deviceCreate',
        query: { roomId, type }
    } as any
    return pageController.push(route)
}

/** 跳转到 体温枪配置蓝牙 */
export const gotoTemLaya = (roomId: string, type: string) => {
    const route = {
        path: '/Mall/pages/wisdom/setTemLaya',
        query: { roomId, type }
    } as any
    return pageController.replace(route)
}

/** 跳转到 血压结果 */
export const gotoBooldResult = (data:any) => {
    const route = {
        path: '/Mall/pages/wisdom/bloodResult',
        query: data
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

/** 跳转到 体温设备页 */
export const gotoBodyTem = (deviceId: string) => {
    const data =  encodeURIComponent(JSON.stringify(deviceId))
    const route = {
        path: '/Mall/pages/wisdom/bodyTem',
        query: { data }
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

/** 跳转到 开始测试体温 */
export const gotoStartTepTow = (deviceId: string) => {
    const route = {
        path: '/Mall/pages/wisdom/startLiang',
        query: {  }
    } as any
    return pageController.replace(route)
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

/** 跳转到 血压记录 */
export const gotobooldLuc = (tep:any) => {
    const route = {
        path: '/Create/pages/wisdom/bloodResult',
        query: { tep }
    } as any
    return pageController.push(route)
}


/** 跳转到 体温结果 */
export const gotoResult = (tem: any) => {
    const route = {
        path: '/Mall/pages/wisdom/tempResult',
        query: { tem }
    } as any
    return pageController.replace(route)
}

/** 跳转到 设备类型列表 */
export const gotoDeviceChoice = (roomId?: string) => {
    const route = {
        path: '/pagesTuya/pages/wisdom/deviceChoice',
        query: { roomId }
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

/** 跳转到 场景服务 */
export const gotoScenServer = (type: 1 | 2) => {
    const route = {
        path: '/Mall/pages/wisdom/scenServer',
        query: { type }
    } as any
    return pageController.push(route)
}

/** 跳转到 康护知识 */
export const gotoKnowledge = () => {
    const route = {
        path: '/Mall/pages/wisdom/knowledge',
        query: {  }
    } as any
    return pageController.push(route)
}

/** 跳转到 探护云记 */
export const gotoCareAlbum = () => {
    const route = {
        path: '/Mall/pages/wisdom/careAlbum',
        query: {  }
    } as any
    return pageController.push(route)
}

/** 跳转到 后装套餐 */
export const gotoAfterwards = () => {
    const route = {
        path: '/Mall/pages/wisdom/afterwards',
        query: {  }
    } as any
    return pageController.push(route)
}

/** 设备通知设置 */
export const gotoDeviceSetup = (query: any) => {
    const route = {
        path: '/Mall/pages/wisdom/deviceSetup',
        query
    } as any
    return pageController.push(route)
}


/** 设备通知记录 */
export const gotoNoticeRecord = (query: any) => {
    const route = {
        path: '/Mall/pages/wisdom/noticeRecord',
        query
    } as any
    return pageController.push(route)
}

/** 设备通知详情 */
export const gotoNoticeDetail = (query: any) => {
    const route = {
        path: '/Mall/pages/wisdom/noticeDetail',
        query
    } as any
    return pageController.push(route)
}

/** 设备通知人员设置 */
export const gotoNoticeStaff = () => {
    const route = {
        path: '/Mall/pages/wisdom/noticeStaff',
        query: {}
    } as any
    return pageController.push(route)
}

/** 消费明细 */
export const gotoExpendList = () => {
    const route = {
        path: '/Mall/pages/wisdom/expendList',
        query: {}
    } as any
    return pageController.push(route)
}

/** 涂鸦设备 */
export const gotoTuYa = () => {
    const route = {
        path: '/Tuya/pages/wisdom/tuyaList',
        query: {}
    } as any
    return pageController.push(route)
}