/**
 * @description: 埋点事件总线
 * @author: huangjialiang
 * @date: 2025/2/27
 */
import { http } from "@bc/api"
import WebTrackerMini from '@aliyun-sls/web-track-mini'
import createStsPlugin from '@aliyun-sls/web-sts-plugin'

class EventBus {
    private tracker: any
    public stsPlugin: any

    // 配置项，用于初始化 SlsTracker 对象
    private opts = {
        host: 'cn-shenzhen.log.aliyuncs.com', // 所在地域的服务入口。例如cn-hangzhou.log.aliyuncs.com
        project: 'event-service-log', // Project名称。
        logstore: 'pre', // Logstore名称。
        time: 1, // 发送日志的时间间隔，默认是10秒。
        count: 30, // 发送日志的数量大小，默认是10条。
        topic: 'topic', // 自定义日志主题。
        source: 'source',
        tags: {
            tags: 'tags'
        }
    }

    // STS 配置项，用于创建 STS 插件
    private stsOpt = {
        accessKeyId: '',
        accessKeySecret: '',
        securityToken: '',
        stsTokenFreshTime: 3600, // 设置stsToken的刷新时间，单位为秒
        refreshSTSTokenInterval: 300, // 设置stsToken的刷新间隔，单位为秒
        refreshSTSToken: () => { // 放置空函数，避免阿里云日志服务报错
        }
    }

    constructor() {
        // 创建SlsTracker对象
        this.tracker = new WebTrackerMini(this.opts)

        // 创建 sts 插件
        this.stsPlugin = createStsPlugin(this.stsOpt)

        // 使用 sts 插件
        this.tracker.useStsPlugin(this.stsPlugin)
    }

    // 上报事件
    public up(data: any) {
        console.log(data)
        const logs = {
            params: data,
            time: new Date().getTime().toString()
        }
        this.getOptions().then((res: any) => {
            const credentials = res.credentials
            this.stsOpt.accessKeyId = credentials.accessKeyId
            this.stsOpt.accessKeySecret = credentials.accessKeySecret
            this.stsOpt.securityToken = credentials.securityToken
            this.tracker.send(logs)
        }).catch(err => {
            console.log(err)
        })
    }

    // 获取配置项
    public getOptions() {
        console.log('每次调用上报执行')
        return http.get('api/warehouse/v1/bc/public/device/getAcsResponse') as Promise<any>
    }
}

export const WebTracking = new EventBus()

