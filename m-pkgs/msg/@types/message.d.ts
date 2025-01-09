//================================================================================
/** 通用 */
//================================================================================



type TMessageData<T> = {
    /** 数据 */
    items: T[]
}


type TMessageQuery = {
    lastMsgId: string,
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



//================================================================================
/** 单聊-消息场景 */
//================================================================================


// 消息会话
type TNoticeSession = {
    /** 会话id */
    id: string
    /** 账号id */
    to: string
    /** 账号名称 */
    name: string

    /** 未读消息数 */
    unread: number
}

// 消息实体扩展信息
type TNoticeExt = {

    title: string
    content: string
    type: 'linkText' | 'text'
    query: Record<string, string>
    linkMark: string
}

//================================================================================
/** 群聊-客服场景 */
//================================================================================

/** 0未读, 1已读, 9不支持 */
type TReceiptStatus = 0 | 1 | 9

type TSendMessageCallback = {
    onSend(msg: IMMessage): void
    onSuccess(msg: IMMessage): void
    onError(msg: IMMessage): void
}


/** 群扩展信息, 拆分为: 客服群、私信群、商家群、交友群 */
type TTeamInfo = {
    /** 接待主体名称 */
    subjectName: string
    /** 接待主体头像 */
    subjectAvatar: string
    /** 接待主体类型: 1为平台客服群; 2为商家客服群; 3 为个体创作者私信群; 4为机构创作者私信群; 5为平台创作者私信群 */
    subjectType: 1 | 2 | 3 | 4 | 5

    /** 群类型: 1为客服群; 2为私信群; 3为商家群; 4为交友群 */
    teamType: 1 | 2 | 3 | 4

    /** 服务主体名称 */
    serveName: string
    /** 服务主体头像 */
    serveAvatar: string
    /** 服务人群类型: 1为客户; 2为服务人员 */
    serveType: 1 | 2
}
