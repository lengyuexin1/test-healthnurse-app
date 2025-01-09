/* eslint-disable no-unused-vars */

//===============================================================
/** 相关接口 */
//===============================================================

/** 分页配置 */
type TPaperOptions = Partial<IBaseReqList>

type TPaperState = {
    error: boolean
    apiError: ApiError

    /** 空数据状态 */
    empty: boolean
    /** 初始化状态 */
    initialize: boolean

    /** loading, 场景: 下拉刷新 OR 上拉加载的 loading */
    loading: boolean

}

type TBasePaperData = IBaseReqList & {
    /** 总数 */
    total: number
    /** 页数 */
    pages: number
}

type TPaperData<T> = TBasePaperData & {
    /** 数据 */
    items: T[]
}

/** 分页结果 */
type TPaperRes<T> = {
    /** 数据 */
    items: T[]
    /** 总数 */
    total: number
    /** 是否空数据 */
    empty: boolean
    /** 是否全部加载完成 */
    finished: boolean
}

/** 分页接口 */
type TPromisePaperCallback<API_ITEM> = {
    (req: IReqList<API_ITEM>): Promise<IResList<API_ITEM>> | Promise<any>
}
/** 无分页列表接口 */
type TPromiseListCallback<API_ITEM> = {
    (): Promise<API_ITEM[]> | Promise<any>
}
/** 标准接口 */
type TPromiseCallback<API_ITEM> = {
    (req: IReqList<API_ITEM>): Promise<TPaperRes<API_ITEM>>
}


