/* eslint-disable no-unused-vars */


type TCacheType = 'memory' | 'uniStorage'

/** 缓存实体类 */
type TCache<T = any> = {
    /** 缓存数据，和「CacheDriver.set」传递进来的结构一致*/
    data: T
    /** 缓存有效截止时间的时间戳  */
    limitTimestamp: number
}


/**
 * 驱动接口
 */
type TCacheDriver<T> = {

    /**
     * 获取缓存
     * @param key 缓存key
     */
    get(key: string): TCache<T>

    /**
     * 设置缓存
     * @param key
     * @param data 这里传入的data结构会序列化为字符串存储
     */
    set(key: string, data: TCache<T>): void

    /**
     * 删除缓存
     * @param key
     */
    del(key: string): void

    /**
     * 通过「mod」模块名称，统一清除缓存
     * @param mod
     */
    clear(mod: string): void

    /**
     * 通过「mod」模块名称，获取所有key的数组
     * @param mod
     */
    keys(mod: string): string[]

}

//========================================================================================
//创造函数
//========================================================================================

/** 缓存驱动的builder, 用来映射具体的「TCacheDriver」创建函数 */
type TDriverBuilder<T = any> = Record<TCacheType, TCacheDriverFunc<T>>

/** 函数式接口，用来创建「TCacheDriver」 */
type TCacheDriverFunc<T> = {
    /**
     * 模块名称
     */
    (): TCacheDriver<T>;
}


