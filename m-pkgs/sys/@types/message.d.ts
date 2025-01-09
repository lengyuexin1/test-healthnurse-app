/* eslint-disable no-unused-vars */


type TMessageData<T> = {
    /** 数据 */
    items: T[]
}


type TMessageQuery = {
    lastMsgId?: string,
    lastMsgTime: number
}

type TMsgPaperState = {
    error: boolean

    /** 空数据状态 */
    empty: boolean
    /** 初始化状态 */
    initialize: boolean

    /** loading, 场景: 下拉刷新 OR 上拉加载的 loading */
    loading: boolean

    /** 标记已完成 */
    finish: boolean

}
