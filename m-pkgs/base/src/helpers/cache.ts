



const isCacheObj = (data: any) => {
    return data !== undefined && (data as TCache).limitTimestamp !== undefined
}




//========================================================================================
//实现驱动「CacheDriver」
//========================================================================================

//实例化builder，用来创建具体的「TCacheDriver」
const cacheDriverBuilder: TDriverBuilder = {} as any


/** 内存驱动实现类 */
class MemoryCacheDriver<T = any> implements TCacheDriver<T> {

    //缓存数据
    private data: Record<string, TCache<T>> = {}

    get(key: string): TCache<T> {
        return this.data[key]
    }

    set(key: string, data: TCache<T>): void {
        //这里不需要到期
        this.data[key] = data
    }

    del(key: string): void {
        delete this.data[key]
    }

    clear(): void {
        this.data = {}
    }

    keys(): string[] {
        return Object.keys(this.data)
    }
}
//扩展builder
cacheDriverBuilder['memory'] = () => {
    return new MemoryCacheDriver()
}


/** 本地驱动实现类 */
class UniStorageCacheDriver<T = any> implements TCacheDriver<T> {

    get(key: string): TCache<T> {
        const res = uni.getStorageSync(key)
        //json解析
        const resObj = res ? JSON.parse(res) : undefined
        //类型断言
        if (isCacheObj(resObj)) {
            return resObj
        }
        return resObj
    }

    set(key: string, data: TCache<T>): void {
        uni.setStorageSync(key, JSON.stringify(data))
    }

    del(key: string): void {
        uni.removeStorageSync(key)
    }

    clear(mod: string): void {
        const keys = this.keys(mod)

        keys.forEach(key => {
            this.del(key)
        })
        //清除同一个mod前缀的storage
    }

    keys(mod: string): string[] {
        const res = uni.getStorageInfoSync()
        const length = res.keys.length
        const keys: string[] = []
        for (let i = length - 1; i >= 0; i--) {
            const key = res.keys[i]
            if (key && key.search(mod.toLocaleUpperCase()) != -1) {
                keys.push(key)
            }
        }
        return keys
    }

}
//扩展builder
cacheDriverBuilder['uniStorage'] = () => {
    return new UniStorageCacheDriver()
}




//========================================================================================
//定义 「CacheDriverManager」对「CacheDriver」进行管理
//========================================================================================

/**
 * 失效判断方法
 * @param cache 缓存数据
 * @returns bollean
 */
const isNotValid = (cache: TCache) => {
    return new Date().getTime() > cache.limitTimestamp
}

//缓存管理者
class CacheDriverManager<T = any> {

    mod: string
    private driver: TCacheDriver<T>

    //静态化
    private static _instanceObj: Record<string, CacheDriverManager> = {}
    static getInstance<T>(mod: string, cacheType: TCacheType): CacheDriverManager<T> {
        if (CacheDriverManager._instanceObj[mod] === undefined) {
            CacheDriverManager._instanceObj[mod] = new CacheDriverManager(mod, cacheType)
        }
        return CacheDriverManager._instanceObj[mod]
    }

    constructor(mod: string, cacheType: TCacheType) {
        this.mod = mod.toLocaleUpperCase()
        this.driver = cacheDriverBuilder[cacheType]()
    }


    private getFinalKey(key: string) {
        return this.mod + '@' + key.toLocaleLowerCase()
    }

    /**
     * 获取缓存
     * @param key 缓存key
     * @returns jsonObj、jsonArray、undefined
     * @summary 注意：undefined 表示过期了或没有数据
     */
    getCache(key: string) {
        const finalKey = this.getFinalKey(key)
        const res = this.driver.get(finalKey)
        if (res == undefined) {
            return res
        }

        if (isNotValid(res)) {
            //过期自动删除缓存
            this.driver.del(finalKey)
            return undefined
        }

        return res.data
    }

    /**
     * 设置缓存
     * @param key 缓存key
     * @param data 缓存数据
     * @param cacheTime 缓存时间，单位分钟
     */
    setCache(key: string, data: any, cacheTime: number): void {
        const finalKey = this.getFinalKey(key)
        const cache = {
            data,
            limitTimestamp: new Date().getTime() + (cacheTime * 1000 * 60)
        }
        this.driver.set(finalKey, cache)
    }

    /**
     * 删除缓存
     * @param key 缓存key
     */
    delCache(key: string): void {
        const finalKey = this.getFinalKey(key)
        this.driver.del(finalKey)
    }

    /**
     * 获取「当前mod」所有的缓存key
     * @returns 「当前mod」所有的缓存key
     * @summary 注意：返回的keys数组内的key，通过getCache(key)会返回null
     */
    cacheKeys(): string[] {
        return this.driver.keys(this.mod)
    }

    /**
     * 清除「当前mod」下所有缓存
     */
    clear(): void {
        this.driver.clear(this.mod)
    }
}

//========================================================================================
//缓存管理类
//========================================================================================

export const CacheBuilder = {
    /**
     * 内存缓存管理
     * @summary 存活规则;
     * @summary 1.SPA页面专用，路由跳转不会消失;
     * @summary 2.跨项目跳转，缓存会消失;
     * @summary 3.当前页面刷新，缓存会消失;
     */
    memory: {
        getInstance: <T = any>(mod: string): CacheDriverManager => {
            return CacheDriverManager.getInstance<T>(mod, 'memory')
        }
    },
    /**
     * uni.storage缓存管理
     * @summary 存活规则：
     * @summary 1.本地永久缓存;
     * @summary 2.APP覆盖安装不消失;
     * @summary 3.APP卸载/小程序删除后消失;
     * @summary 【注意】（不能用来缓存类的对象，序列化成字符串存储以后，类的属性会丢失）
     */
    uni: {
        getInstance: <T = any>(mod: string): CacheDriverManager => {
            return CacheDriverManager.getInstance<T>(mod, 'uniStorage')
        }
    }
}

export default CacheBuilder
