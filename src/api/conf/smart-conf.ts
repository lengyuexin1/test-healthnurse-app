import { apiPrefix } from '@/api/api-config'

/** 智护项目 */
export const SMART_API = {
    patientList: `${apiPrefix.smart}/app/patient/list`, //智护房间列表
    patientSave: `${apiPrefix.smart}/app/patient/saveOrUpdate`, //添加房间
    patientDelete: `${apiPrefix.smart}/app/patient/delete`, //删除房间
    patientDetail: `${apiPrefix.smart}/app/patient/physicalSignData`, //房间详情
    patientLastData: `${apiPrefix.smart}/app/patient/sleep/getLastData`, //房间详情实时数据
    deviceTypeList: `${apiPrefix.smart}/common/type/list`, //设备类型列表
    deviceList: `${apiPrefix.smart}/app/device/getList`, //设备列表
    deviceBind: `${apiPrefix.smart}/app/device/bindBySn`, //绑定设备
    uploadReport: `${apiPrefix.smart}/app/device/report`, //体温数据上报
    lyRecodeList: `${apiPrefix.smart}/app/device/getDataList`, // 蓝牙记录
    deviceUnBind: `${apiPrefix.smart}/app/device/unBind`, //解绑设备
    deviceUpdate: `${apiPrefix.smart}/app/device/update`, //更新设备
    alarmDetail: `${apiPrefix.smart}/app/device/alarmDetail`, //报警器详情
    alarmCaller: `${apiPrefix.smart}/app/alarm/receiver/getList`, //接警人列表
    callerAdd: `${apiPrefix.smart}/app/alarm/receiver/add`, //添加接警人
    callerDel: `${apiPrefix.smart}/app/alarm/receiver/del`, //删除接警人
    getLastData: `${apiPrefix.smart}/app/sleep/getLastData`, //睡眠监测实时数据
    reportList: `${apiPrefix.smart}/app/sleep/report/getList`, //睡眠监测报告列表
    getBloodData: `${apiPrefix.smart}/app/device/getBloodPressureDataList`, //血压计数据列表

    channelClsList: `api/content/v1/bc/app/article/categoryShow/list`, ///频道分类列表 -康护知识

    getPayList: `${apiPrefix.smart}/app/notify/getPayList`, //充值记录
    getConfig: `${apiPrefix.smart}/app/notify/getConfig`, //通知配置
    getAccountInfo: `${apiPrefix.smart}/app/notify/getAccountInfo`, //通知账户信息
    getLogList: `${apiPrefix.smart}/app/notify/getLogList`, //通知记录
    getLogDetail: `${apiPrefix.smart}/app/notify/getLogDetail`, //通知记录详情
    setConfig: `${apiPrefix.smart}/app/notify/setConfig`, //设置通知配置

    sceneList: `${apiPrefix.order}/app/smart/scene/list`, //智慧场景列表
    sceneDetail: `${apiPrefix.order}/app/smart/scene/detail`, //智慧场景详情

    productCategoryList: `${apiPrefix.order}/public/app/productshow/category/list`, //康品百科分类列表
    productshowList: `${apiPrefix.order}/public/app/productshow/list`, //康品百科列表
    productshowDetail: `${apiPrefix.order}/public/app/productshow/detail` //康品百科详情
}
