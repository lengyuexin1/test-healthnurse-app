import { SMART_API } from "./conf/smart-conf"
import { openHttp, http } from "@bc/api"

//================================================================================
/** 智护模块 */
//================================================================================

// interface IPatientList extends Paging {
//     query: any
// }
// /* 获取智护房间列表 */
// export const patientList = (req: IPatientList) => {
//     return http.post(SMART_API.patientList, req)
// }


interface ISaveOrUpdate {
    /* 房间id */
    id?: string
    /* 房间名称 */
    name: string
    /* 房间缩略图 */
    thumb?: string
}
/* 添加/编辑 房间 */
export const saveOrUpdate = (req: ISaveOrUpdate) => {
    return http.post(SMART_API.patientSave, req)
}


/* 房间详情 */
export const patientDetail = (patientId: string) => {
    return http.get(SMART_API.patientDetail, { patientId })
}

/* 房间详情实时数据 */
export const patientLastData = (patientId: string) => {
    return http.get(SMART_API.patientLastData, { patientId })
}


/* 删除房间 */
export const patientDelete = (req:{code: string, patientIds: string[]}) => {
    return http.post(SMART_API.patientDelete, req)
}

/* 设备类型列表 */
export const deviceTypeList = (req: IPatientList) => {
    return http.post(SMART_API.deviceTypeList, req)
}

/* 设备列表 */
export const deviceList = (patientId: string) => {
    return http.get(SMART_API.deviceList, { patientId })
}


interface IDeviceBind {
    /* 房间id */
    patientId: string
    /* 设备编号 */
    sn: string
    /* 设备图片 */
    // thumb: string
    /* 设备名称 */
    name: string
    /* 设备类型 1-紧急报警器 2-睡眠监测带 */
    type: string
}
/* 绑定设备 */
export const deviceBind = (req: IDeviceBind) => {
    return http.post(SMART_API.deviceBind, req)
}

/* 体温数据上报 */
export const uploadReport = (req: any) => {
    return http.post(SMART_API.uploadReport, req)
}

/* 蓝牙数据记录 */
export const lyRecodeList = (req: any) => {
    return http.post(SMART_API.lyRecodeList, req)
}

/* 血压计数据列表 */
export const getBloodData = (req: any) => {
    return http.post(SMART_API.getBloodData, req)
}


/* 删除设备 */
export const deviceDelete = (deviceIds: string[]) => {
    return http.post(SMART_API.deviceUnBind, { deviceIds })
}


interface IDeviceUpdate {
    /* 设备id */
    deviceId: string
    /* 设备图片 */
    thumb?: string
    /* 设备名称 */
    name?: string
    /* 设备地址 */
    address?: string
}
/* 更新设备信息 */
export const deviceUpdate = (req: IDeviceUpdate) => {
    return http.post(SMART_API.deviceUpdate, req)
}


/* 报警器详情 */
export const getAlarmDetail = (deviceId: string) => {
    return http.get(SMART_API.alarmDetail, { deviceId })
}

/* 接警人列表 */
export const getCallerList = () => {
    return http.get(SMART_API.alarmCaller)
}


interface IAddCaller {
    /* 设备id */
    deviceId: string
    /* 接警人姓名 */
    name: string
    /* 接警人电话 */
    mobile: string
    /* 验证码 */
    code: string
    /* 是否接收短信推送 0-不接收 1-接收 */
    smsNotify: 0 | 1
    /* 是否接收电话推送 0-不接收 1-接收 */
    telNotify: 0 | 1
}
/* 添加接警人 */
export const addCaller = (req: IAddCaller) => {
    return http.post(SMART_API.callerAdd, req)
}

/* 删除接警人 */
export const callerDel = (receiverId: string) => {
    return http.get(SMART_API.callerDel, { receiverId })
}


/* 睡眠监测实时数据 */
export const getLastData = (deviceId: string) => {
    return http.get(SMART_API.getLastData, { deviceId })
}

/* 睡眠报告列表 */
export const getSleepReportList = (deviceId: string, date?: string) => {
    return http.post(SMART_API.reportList, { deviceId, date })
}

/*  康护知识分类列表 */
export const channelClsList = (id: 10) => {
    return http.get(SMART_API.channelClsList, { id })
}

/* 充值记录 */
export const getPayList = (req: IPatientList) => {
    return http.post(SMART_API.getPayList, req)
}

/*  通知账户信息 */
export const getAccountInfo = () => {
    return http.get(SMART_API.getAccountInfo)
}

/* 通知配置 */
export const getConfig = () => {
    return http.get(SMART_API.getConfig)
}

/* 通知记录 */
export const getLogList = (req: IPatientList) => {
    return http.post(SMART_API.getLogList, req)
}

/* 通知记录详情 */
export const getLogDetail = (logId: string) => {
    return http.get(SMART_API.getLogDetail, { logId })
}

/* 设置通知配置 */
export const setConfig = (req:any) => {
    return http.post(SMART_API.setConfig, req)
}

/* 智慧场景列表 */
export const sceneList = (req: IPatientList) => {
    return http.post(SMART_API.sceneList, req)
}

/* 智慧场景详情 */
export const sceneDetail = (id: string) => {
    return http.get(SMART_API.sceneDetail, { id })
}

/* 康品百科分类列表 */
export const productCategoryList = (req: IPatientList) => {
    return openHttp.post(SMART_API.productCategoryList, req)
}

/* 康品百科列表 */
export const productshowList = (req: any) => {
    return openHttp.post(SMART_API.productshowList, req)
}

/* 康品百科详情 */
export const productshowDetail = (id: string) => {
    return openHttp.get(SMART_API.productshowDetail, { id })
}

// es获取内容分类列表
export const getEsContentList = async (req:any) => {
    return http.post('api/search/v1/bc/public/es/content/list', req)
}