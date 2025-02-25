import SlsTracker from '@aliyun-sls/web-track-mini'
import createStsPlugin from '@aliyun-sls/web-sts-plugin'
import { http } from '@bc/api'

const WEB_ENV: TEnv = import.meta.env.VITE_WEB_ENV as TEnv
const BASE_URL = import.meta.env.VITE_HTTP_BASE_URL as string
export const getOptions = () => {
    console.log('每次调用上报执行', WEB_ENV)
    return http.get('api/warehouse/v1/bc/public/device/getAcsResponse') as Promise<any>
    // return axios.get(BASE_URL + 'api/warehouse/v1/bc/public/device/getAcsResponse') as Promise<any>
}
const opts = {
    host: 'cn-shenzhen.log.aliyuncs.com', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
    project: 'event-service-log', // Project名称。
    logstore: 'pre', // Logstore名称。
    time: 10, // 发送日志的时间间隔，默认是10秒。
    count: 10, // 发送日志的数量大小，默认是10条。
    topic: 'topic', // 自定义日志主题。
    source: 'source',
    tags: {
        tags: 'tags'
    }
}

const stsOpt = {
    accessKeyId: '',
    accessKeySecret: '',
    securityToken: '',
    stsTokenFreshTime: 3600, // 设置stsToken的刷新时间，单位为秒
    refreshSTSTokenInterval: 300, // 设置stsToken的刷新间隔，单位为秒
    refreshSTSToken: () => { // 放置空函数，避免阿里云日志服务报错
    }
}

// 创建SlsTracker对象
const tracker = new SlsTracker(opts)

// 创建 sts 插件
const stsPlugin = createStsPlugin(stsOpt)
// 使用 sts 插件
tracker.useStsPlugin(stsPlugin)


// 发送日志
export const sendLog = (data: any) => {
    getOptions().then((res: any) => {
        const credentials = res.credentials
        stsOpt.accessKeyId = credentials.accessKeyId
        stsOpt.accessKeySecret = credentials.accessKeySecret
        stsOpt.securityToken = credentials.securityToken
        tracker.send(data)
    }).catch(err => {
        console.log(err)
    })
}


