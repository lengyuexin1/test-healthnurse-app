



/**
 * 信息提供者
 * 1. getData 只会触发 then 方法
 * 2. 需要手动调用 setData, 才能触发 getData 的 then 方法
 */
export class DataProvider<T> {

    /** 数据 */
    //@ts-ignore
    protected data: T

    /** promise队列，用于后续回调 */
    private promises: IPromiseResolve<T>[] = []

    /**
     * 异步获取信息
     * 只会触发then
     * @returns
     */
    getData(): Promise<T> {
        if (this.isReady()) {
            //有信息，立即返回
            return Promise.resolve(this.data)
        }

        //无信息，加入队列
        return new Promise((resolve) => {
            this.promises.push({ resolve })
        })
    }

    /**
     * @param data
     * 设置成功后，所有在setData之前调用的getData都会触发then
     */
    setData(data: any): void {
        this.data = data
        //统一处理promise队列
        this.handle()
    }

    /**
     * 是否准备好回调
     * @returns
     */
    protected isReady(): boolean {
        return this.data !== undefined
    }

    protected handle(): void {
        if (!this.isReady()) {
            return
        }

        //获取data后，统一把之前存储起来的promise回调回去
        while (this.promises.length > 0) {
            const promise = this.promises.shift()
            promise && promise.resolve(this.data)
        }
    }
}

/**
 * 信息提供者
 * @summary 这里主要用于library内导出「provider」对象，让项目去给「provider」赋值
 */
export abstract class ContentProvider<T> extends DataProvider<T> {

    private timeOutFun: NodeJS.Timeout

    constructor() {
        super()
        //5秒后如果没有setData，自动报错提示
        this.timeOutFun = setTimeout(() => {
            this.timeOutLog()
        }, 5000)
    }

    private timeOutLog() {
        // console.group('module Provider error')
        console.log('=====================================')
        console.error(this.logError())
        console.log('=====================================')
        // console.groupEnd()
    }

    /**
     * 异常提示信息,在data超时时提示
     */
    abstract logError(): string

    /**
     * 该方法只能调用一次
     * @param data
     */
    setData(data: T) {
        //不允许多次调用
        if (this.data !== undefined) {
            throw new Error('provider can only setData once！')
        }

        super.setData(data)
    }

    protected handle(): void {
        super.handle()

        //移除倒计时
        if (this.timeOutFun !== undefined) {
            clearTimeout(this.timeOutFun)
        }
    }
}


/**
 * 用于传递异步函数
 */
export class PromiseProvider<T> extends DataProvider<T> {

    /** 状态 */
    //@ts-ignore
    private state: TAsyncState

    /** 回调函数提供者 */
    private callbackProvider: DataProvider<IPromiseCallback<T>> = new DataProvider<IPromiseCallback<T>>()

    /** 数据结果回调函数  */
    private promiseFuns: IPromise<T>[]

    constructor() {
        super()
        this.promiseFuns = []
    }

    protected isReady(): boolean {
        if (super.isReady()) {
            return true
        }

        //触发式加载
        if (this.state !== 'padding') {
            this.run()
        }

        return false
    }

    private run() {
        this.state = 'padding'
        this.callbackProvider.getData().then((callback) => {
            callback().then((data) => {
                this.setData(data)
                this.handleThen(data)
                this.state = 'ok'
            }).catch((err) => {
                this.handleCatch(err)
                this.state = 'error'
            })
        }).catch((err) => {
            this.handleCatch(err)
            this.state = 'error'
        })
    }

    setCallback(callback: IPromiseCallback<T>) {
        this.callbackProvider.setData(callback)
    }

    /**
     * 可以获取异常结果
     * 注意: 该方法会触发catch, 无法确保必定返回then
     */
    async getResult() {
        return Promise.race([
            new Promise<T>((resolve, reject) => {
                this.promiseFuns.push({ resolve, reject })
            }),
            this.getData()
        ])
    }

    private handleThen(res: T) {
        while (this.promiseFuns.length > 0) {
            const promiseFun = this.promiseFuns.pop()
            promiseFun && promiseFun.resolve(res)
        }
    }

    private handleCatch(err: Error) {
        console.warn('PromiseProvider-handleCatch: ', err)
        while (this.promiseFuns.length > 0) {
            const promiseFun = this.promiseFuns.pop()
            promiseFun && promiseFun.reject(err)
        }
    }

    /** 重置数据 */
    reset() {
        //@ts-ignore
        this.data = undefined
        //@ts-ignore
        this.state = undefined
    }

}

