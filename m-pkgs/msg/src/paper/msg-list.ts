import { reactive } from "vue"
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface'
import type { GetHistoryMsgsOptions } from "nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgLogServiceInterface"
import { SessionSDK } from "../sdk/session-sdk"




//====================================================
// 常量
//====================================================
const debug = true

/** 默认请求参数 */
const DEF_PAPER_OPTIONS = {
    //reverse: true,
    asc: true,
    limit: 10
} as GetHistoryMsgsOptions

/** 默认请求参数 */
const DEF_PAPER_STATE = {
    loading: false,
    initialize: false,
    finish: false
} as TMsgPaperState


//====================================================
// 数据分页器
//====================================================


export class MessageList {

    private req: TMessageQuery
    private options: GetHistoryMsgsOptions
    /** 数据 */
    data: TMessageData<IMMessage>
    /** 状态集 */
    state: TMsgPaperState


    constructor(options: GetHistoryMsgsOptions) {
        this.req = {} as TMessageQuery
        this.options = Object.assign({}, DEF_PAPER_OPTIONS, options) as GetHistoryMsgsOptions
        this.data = reactive({ items: [] })
        this.state = reactive(Object.assign({}, DEF_PAPER_STATE))

        this.resetExceptionState()
    }

    /** 重置异常状态 */
    private resetExceptionState() {
        this.state.empty = false
        this.state.error = false
    }

    protected beforeStart() {
        this.resetExceptionState()

        this.state.loading = true
        debug && console.warn('start-loading ')
    }

    protected afterSatrt() {
        this.state.loading = false
        this.state.initialize = true
        debug && console.warn('end-loading ')
    }

    protected async getData() {
        console.log('============', this.options)
        const finalReq = Object.assign({}, this.options)
        //初始化参数校验
        if (this.req.lastMsgId) {
            if (finalReq.reverse) {
                finalReq.lastMsgId = this.req.lastMsgId
                finalReq.beginTime = this.req.lastMsgTime
            }
            else {
                finalReq.lastMsgId = this.req.lastMsgId
                finalReq.endTime = this.req.lastMsgTime
            }
        }

        debug && console.warn('finalReq: ', finalReq)
        return SessionSDK.getHistoryMsg(finalReq).then((res) => {
            if (finalReq.limit === undefined || res.length < finalReq.limit) {
                debug && console.warn('finish no more data')
                this.state.finish = true
            }

            if (res.length > 0) {
                const index = finalReq.asc === true ? 0 : res.length - 1
                this.req.lastMsgId = res[index].idServer as any
                this.req.lastMsgTime = res[index].time
            }

            if (finalReq.asc === true) {
                this.data.items.unshift(...res)
            }
            else {
                this.data.items.push(...res)
            }

            return Promise.resolve(res)
        })
    }

    async loadmore() {
        if (this.state.loading) {
            debug && console.warn('加载中, 请勿重复操作!')
            return Promise.reject(new Error('加载中, 请勿重复操作!'))
        }

        this.beforeStart()
        return this.getData().catch((err) => {
            debug && console.warn('getHistoryMsg error: ', err)
            return Promise.reject(err)
        }).finally(() => {
            this.afterSatrt()
        })
    }



}


