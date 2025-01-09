import { DataProvider } from "../helpers/provider"


//=======================================
//工具类


type TPromiseFun = IPromiseCallback<void>

/** 睡眠,异步版本, interval 支持毫秒 */
const sleep = (interval: number) => new Promise(resolve => setTimeout(resolve, interval))
/** 睡眠,同步版本, interval 支持毫秒 */
// eslint-disable-next-line no-unused-vars
const sleepSync = (interval: number) => {
    const end = new Date().getTime() + interval
    while (new Date().getTime() < end) { /* do nothing */ }
}

/** promise顺序执行调度工具 */
export class PromiseScheduler {

    private interval: number
    private promises: TPromiseFun[]
    private finallyProvider: DataProvider<string>
    private thenProvider: DataProvider<string>
    private catchProvider: DataProvider<Error>

    constructor(promises: TPromiseFun[], interval = 5000) {
        this.interval = interval
        this.promises = promises
        this.finallyProvider = new DataProvider()
        this.thenProvider = new DataProvider()
        this.catchProvider = new DataProvider()
        this.check()
        this.run()
    }

    private check() {
        if (this.promises.length === 0) {
            throw new Error('promises不允许为空')
        }
    }

    private run() {
        const promise = this.promises.pop()
        //@ts-ignore
        promise().then(() => {
            if (this.promises.length === 0) {
                //增加异常标记
                this.thenProvider.setData('')
                //增加完成标记
                this.finallyProvider.setData('')
                return
            }
            sleep(this.interval).then(() => {
                this.run()
            })
        }).catch((err) => {
            //增加完成标记
            this.finallyProvider.setData('')
            //增加异常标记
            this.catchProvider.setData(err)
        })
    }

    onFinally() {
        return this.finallyProvider.getData()
    }

    onThen() {
        return this.thenProvider.getData()
    }

    onError() {
        return this.catchProvider.getData()
    }

}



