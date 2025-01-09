/* eslint-disable no-unused-vars */
//===============================================================
/** 通用 */
//===============================================================

/** 分页基本参数 */
interface IBaseReqList {
    /** 每页数量 */
    pageSize: number
    /** 第几页 */
    pageNumber: number
}

/** 分页请求参数 */
interface IReqListQuery<T> {
    query: T
}

/** 常用分页结构 */
type IReqList<T> = IBaseReqList & IReqListQuery<T>

/** 常用分页结构 */
interface IResList<T> {
    data: T[]
    /** 总数 */
    total: number
}

/** 字典实体 */
type TDict = {
    id: number
    name: string
}

/** 环境 */
type TEnv = 'dev' | 'test' | 'pre' | 'prod'
