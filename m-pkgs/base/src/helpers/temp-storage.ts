import CacheBuilder from "./cache"
import { IDBuilder } from "./tools"



const CACHE_KEY = 'DATA_S_SESSION'
const times = 60 * 10
const cacheManage = CacheBuilder.uni.getInstance(CACHE_KEY)

// eslint-disable-next-line no-unused-vars
const debug = false

//=============================================================
/** 核心类 */
//=======================================================

/** 临时存储, 用于短时效内的对象临时存储 */
export class TempStorage<T> {

    get(key: string): Promise<T> {
        const res = cacheManage.getCache(key)
        if (res === undefined) {
            return Promise.reject(new Error('没有找到'))
        }
        return Promise.resolve(res)
    }

    save(item: T, uniqueId: string) {
        cacheManage.setCache(uniqueId, item, times)
        return uniqueId
    }

    static savewx(item: any) {
        const uniqueId = IDBuilder.create()
        cacheManage.setCache(uniqueId, item, times)
        return uniqueId
    }

    add(item: T) {
        const uniqueId = IDBuilder.create()
        cacheManage.setCache(uniqueId, item, times)
        return uniqueId
    }

    clear(): void {
        cacheManage.clear()
    }

}


