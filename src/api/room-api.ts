import { openHttp, http } from "@bc/api"

/** 新增房间 */
export const creatRoom = (req: any) => {
    return http.post('api/smart/v1/bc/app/patient/saveOrUpdate', req)
}

/** 房间列表 */
export const allRoomList = (req: any) => {
    return http.post('api/smart/v1/bc/app/patient/list', req)
}

/** 删除房间 */
export const patientDelete = (req: any) => {
    return http.post('api/smart/v1/bc/app/patient/delete', req)
}

// 设备类型列表
export const deviceTypeList = (req: any) => {
    return http.post('api/smart/v1/bc/common/type/list', req)
}

// 房间绑定下的设备
export const roomDeviceList = (req: any) => {
    return http.get('api/smart/v1/bc/app/device/getList', { patientId: req })
}

// 绑定
export const deviceBind = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/bindBySn', req)
}

//血压计数据列表
export const getBloodData = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/getBloodPressureDataList', req)
}

//报警器详情
export const getAlarmDetail = (req: any) => {
    return http.get('api/smart/v1/bc/app/device/alarmDetail', { deviceId: req })
}

//更新设备
export const deviceUpdate = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/update', req)
}

//协议详情
export const articleDetail = (req: any) => {
    return http.get('api/user/v1/bc/app/article/detailsByCode', { code: req })
}

//接警人列表
export const getCallerList = () => {
    return http.get('api/smart/v1/bc/app/alarm/receiver/getList')
}

//通知账户信息
export const getAccountInfo = () => {
    return http.get('api/smart/v1/bc/app/notify/getAccountInfo')
}

//通知配置
export const getConfig = () => {
    return http.get('api/smart/v1/bc/app/notify/getConfig')
}

//设置通知配置
export const setConfig = (req: any) => {
    return http.post('api/smart/v1/bc/app/notify/setConfig', req)
}

//通知记录
export const getLogList = (req: any) => {
    return http.post('api/smart/v1/bc/app/notify/getLogList', req)
}

//睡眠监测实时数据
export const getLastData = (req: any) => {
    return http.get('api/smart/v1/bc/app/sleep/getLastData', { deviceId: req })
}

//睡眠监测报告列表
export const reportListPo = (req: any) => {
    return http.post('api/smart/v1/bc/app/sleep/report/getList', req)
}

//体温数据上报
export const uploadReport = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/report', req)
}

//体温蓝牙记录
export const lyRecodeList = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/getDataList', req)
}

// 删除绑定的设备
export const deviceDelete = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/unBind', req)
}

// 涂鸦设备详情
export const tuyaDetail = (req: any) => {
    return http.get('api/smart/v1/bc/app/device/detail', { deviceId: req })
}

// 修改灯光名称
export const editName = (req: any) => {
    return http.post('api/smart/v1/bc/app/tuya/updateAttrName', req)
}

// 涂鸦设备操控
export const tuyaCommand = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/sendCommands', req)
}

// 涂鸦uid
export const tuyaUid = () => {
    return http.get('api/smart/v1/bc/app/device/getTuyaUid')
}

// 传送涂鸦UID
export const sendTyUid = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/saveTuyaUid', req)
}

// 空调品牌
export const airListPoor = (req: any) => {
    return http.get('api/smart/v1/bc/app/tuya/getAirConditionerBrands', { infraredId: req })
}

//更新品牌
export const updateBrand = (req: any) => {
    return http.post('api/smart/v1/bc/app/tuya/saveAirConditionerBrand', req)
}

// 下发命令
export const dowmCom = (req: any) => {
    return http.post('api/smart/v1/bc/app/tuya/commandAirConditioner', req)
}

// 创建涂鸦房间
export const createTuyaHome = (req: any) => {
    return http.post('api/smart/v1/bc/app/device/createTuyaHome', req)
}

// 获取空调索引列表
export const getIndexKt = (req: any, data:any) => {
    return http.get('api/smart/v1/bc/app/tuya/getRemoteIndexArray', { infraredId: req, brandId:data })
}

// 下发命令(配对)
export const sendComPd = (req: any) => {
    return http.post('api/smart/v1/bc/app/tuya/testCommandAirConditioner', req)
}

/* 添加接警人 */
export const addCaller = (req: any) => {
    return http.post('api/smart/v1/bc/app/alarm/receiver/add', req)
}

/* 删除接警人 */
export const callerDel = (receiverId: string) => {
    return http.get('api/smart/v1/bc/app/alarm/receiver/del', { receiverId })
}

/* 已登录用户获取验证码 */
export const sendBindCodeToSelf = async () => {
    return http.get('api/user/ali/sms/sendBindCodeToSelf')
}

/* 通知记录详情 */
export const getLogDetail = (logId: string) => {
    return http.get('api/smart/v1/bc/app/notify/getLogDetail', { logId })
}

/* 充值记录 */
export const getPayList = (req: any) => {
    return http.post('api/smart/v1/bc/app/notify/getPayList', req)
}

/* 智护产品-通知次数包 */
export const smartNotifyPackage = async (productId: string) => {
    return http.get('api/order/v1/bc/app/platform/product/getDetails', { productId })
}

/* 智护-创建订单 */
export const smartOrderCreate = async (optionId: string) => {
    return http.post('api/order/v1/bc/app/platform/order/create', { optionId })
}

export const getYsToken = () => {
    const postData = {
        appKey: '9c910ec6d20d4496a9b1c32ad34a57c7',
        appSecret: 'c9fdeacd4844837f96945dae41ed2b0b'
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'https://open.ys7.com/api/lapp/token/get', // 你的API地址
            method: 'POST',
            header: {
                "content-Type": "application/x-www-form-urlencoded"
            },
            data: postData,
            success: (res: any) => {
                resolve(res)
                uni.setStorageSync("ysToken", res.data.data.accessToken)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}