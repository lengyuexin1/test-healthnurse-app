interface ProviderPromise<T> {
    resolve: (value: T) => void
}

/**
 * 信息提供者
 * 1. getData 只会触发 then 方法
 * 2. 需要手动调用 setData, 才能触发 getData 的 then 方法
 */
export class DataProvider<T> {

    /** 数据  */
    private data: T
    /** promise队列，用于后续回调 */
    private promises: ProviderPromise<T>[]

    constructor() {
        this.promises = []
    }

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
    setData(data: T): void {
        this.data = data
        //统一处理promise队列
        this.handle()
    }

    /** 重置data */
    reset():void {
        this.data = undefined as any
    }

    /**
     * 是否准备好回调
     * @returns
     */
    protected isReady(): boolean {
        return this.data !== undefined
    }

    /**
     * 获取data对象
     * @returns
     */
    protected getObj(): T {
        return this.data
    }

    private handle(): void {
        if (!this.isReady()) {
            return
        }

        //获取data后，统一把之前存储起来的promise回调回去
        while (this.promises.length > 0) {
            const promiseFun = this.promises.shift()
            promiseFun && promiseFun.resolve(this.data)
        }
    }
}


type AsyncState = 'padding' | 'ok' | 'error'


interface PromiseCallback<T> {
    ():Promise<T>
}

interface IPromise<T> extends ProviderPromise<T>{
    reject: (err: Error) => void
}

/**
 * 继承DataProvider
 * 1. getData 和 setData 的逻辑与 DataProvider 一致
 * 2. 增加 setCallback 方法, 支持传入一个获取 data 的 promiseApi
 * 3. 在调用getData时自动调用该 promiseApi 获取 data, 然后自动setData
 * 4. 但是 : 如果 promiseApi 失败则不执行setData操作, 等待下一次getData被调用时进行重试
 *
 *
 * 5. 增加 getResult 方法, 和直接调用 promiseApi 效果一样, 可以获取 then 和 catch.
 */
export class PromiseProvider<T> extends DataProvider<T> {

    /**
     * 状态
     */
    private state: AsyncState

    /**
     * 回调函数提供者
     */
    private callbackProvider: DataProvider<PromiseCallback<T>>

    /**
     * 数据结果提供者
     */
    private promiseFuns: IPromise<T>[]

    constructor() {
        super()
        this.callbackProvider = new DataProvider()
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

    setCallback(callback: PromiseCallback<T>) {
        this.callbackProvider.setData(callback)
        return this
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
        while (this.promiseFuns.length > 0) {
            const promiseFun = this.promiseFuns.pop()
            promiseFun && promiseFun.reject(err)
        }
    }
}
