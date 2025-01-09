import { pageController } from '@bc/uni-tools'


/**
 * 个人中心相关路由
 * 
 */

 export const gotoelderlyFiles = () => {
    const route = {
        path: '/User/pages/elderlyFiles/elderlyFiles',
        query: {}
    } as any
    return pageController.push(route)
}
//任务记录
export const gotoTaskRecord = (query:any) => {
    const route = {
        path: '/Create/pages/redEnvelope/taskRecord',
        query
    } as any
    return pageController.push(route)
}
//规则
export const gotoctivityRules = (query?:any) => {
    const route = {
        path: '/Create/pages/redEnvelope/activityRules',
        query
    } as any
    return pageController.push(route)
}
//提现(红包提现)
export const gotoWithdrawall = (query?:any) => {
    const route = {
        path: '/Create/pages/redEnvelope/withdrawal',
        query
    } as any
    return pageController.push(route)
}
interface IPatientEditQuery {
    /* 档案id */
    id?: number | string
    /* 0新增 1编辑 */
    type: 0 | 1
    /* 编辑档案下标 */
    index?: number
}

export const gotoPatientEdit = (query: IPatientEditQuery) => {
    const route = {
        path: "/User/pages/elderlyFiles/elderlyDetail",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 注销账号 */
export const gotoCancel = () => {
    const route = {
        path: "/User/pages/logOutAccount/logOutAccount",
        query: {}
    } as any
    return pageController.push(route)
}

/** 跳转到 地址列表 */
export const gotoAddressList = () => {
    const route = {
        path: "/User/pages/address/goodsSiteList",
        query: {}
    } as any
    return pageController.push(route)
}

interface IAddressMangage {
    
}

/** 跳转到 地址管理 */
export const gotoAddressManage = (query: IAddressMangage) => {
    const route = {
        path: "/User/pages/address/goodsAddSite",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 收藏列表 */
export const gotoCollectLists = (type: string) => {
    const route = {
        path: "/User/pages/collect/collectLists",
        query: { type }
    } as any
    return pageController.push(route)
}

/** 跳转到 观看历史记录 */
export const gotoWatchHistory = (type: string) => {
    const route = {
        path: "/User/pages/watchHistory/watchHistory",
        query: { type }
    } as any
    return pageController.push(route)
}

/** 跳转到 足迹 */
export const gotoTrackList = () => {
    const route = {
        path: "/User/pages/browerHistory/browerHistory",
        query: {}
    } as any
    return pageController.push(route)
}

/** 跳转到 我赞过的 */
export const gotoLike = (type: string) => {
    const route = {
        path: "/User/pages/likeList/likeList",
        query: { type }
    } as any
    return pageController.push(route)
}

/** 跳转到 城市选择 */
export const gotoCitychange = () => {
    const route = {
        path: "/User/pages/cityPage/cityPage",
        query:{}
    } as any
    return pageController.push(route)
}

/* 跳转到 评估 */
export const gotoEstimate = (info?: string) => {
    const route = {
        path: '/User/pages/estimate/estimate',
        query: { info }
    } as any
    return pageController.push(route)
}

/* 编辑个人信息 */
export const gotoEditProfile = () => {
    const route = {
        path: '/User/pages/EditProfile/EditProfile',
        query: {  }
    } as any
    return pageController.push(route)
}

/* 沙龙我创建的 */
export const gotosalonManage = (query:any,type:number = 1) => {
    const route = {
        path: '/User/pages/salonManage/salonManage',
        query
    } as any
    if (type == 1) {
        return pageController.push(route)
    }else{
        return pageController.replace(route)
    }
}

/* 沙龙我的帖子 */
export const gotoMysalonPosts = (query:any) => {
    const route = {
        path: '/User/pages/salonManage/salonPosts',
        query
    } as any
    return pageController.push(route)
}

/* 沙龙我的加入的 */
export const gotoMysalonJoin = (query:any) => {
    const route = {
        path: '/User/pages/salonManage/salonMyjoin',
        query
    } as any
    return pageController.push(route)
}

/* 我的关注 */
export const gotoMyFollowList = (query:any) => {
    const route = {
        path: '/User/pages/myFollowList/myFollowList',
        query
    } as any
    return pageController.push(route)
}

/* 帖子管理 */
export const gotoPostsManage = (query: any) => {
    const route = {
        path: '/User/pages/postsManage/postsManage',
        query
    } as any
    return pageController.push(route)
}

/* 删除成员 */
export const gotoDeleteMember = (query: any) => {
    const route = {
        path: '/User/pages/delMember/delMember',
        query
    } as any
    return pageController.push(route)
}

/* 成员列表 */
export const gotoMemberList = (query: any) => {
    const route = {
        path: '/User/pages/memberList/memberList',
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 卡券/红包 */
export const gotoCouponList = (type: string) => {
    const route = {
        path: "/User/pages/coupon/coupon",
        query: { type }
    } as any
    return pageController.push(route)
}

/** 跳转到 卡券/红包 */
export const gotoCouponHistory = (query: any) => {
    const route = {
        path: "/User/pages/coupon/couponHistory",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 去评价 */
export const gotoComment = (query: any) => {
    const route = {
        path: "/User/pages/comment/comment",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 去评价 */
export const gotoCommentGoods = (query: any) => {
    const route = {
        path: "/User/pages/comment/commentGoods",
        query
    } as any
    return pageController.push(route)
}

/** 跳转到 我的评价 */
export const gotoCommentList = (currentTabIndex: number,taskId?:string) => {
    const route = {
        path: "/User/pages/comment/commentList",
        query: { currentTabIndex,taskId }
    } as any
    return pageController.push(route)
}

/** 跳转到 我的评价 */
export const gotoWaittingComment = () => {
    const route = {
        path: "/User/pages/comment/waitCommentList",
        query: {}
    } as any
    return pageController.push(route)
}

/** 跳转到 评价成功 */
export const gotoCommentSuccess = () => {
    const route = {
        path: "/User/pages/comment/success",
        query: {}
    } as any
    return pageController.replace(route)
}

/** 我的售后 */
export const gotoAftersalesList = () => {
    const route = {
        path: "/User/pages/aftersales/aftersalesList",
        query: {}
    } as any
    return pageController.push(route)
}

/** 收货填写物流信息 */
export const gotoExpressageAdd = (query:any) => {
    const route = {
        path: "/User/pages/expressageAdd/expressageAdd",
        query
    } as any
    return pageController.push(route)
}

/** 售后详情
 * 
 * query内接收 id ==> 表示售后id
 * isdel ==> 表示页面定向模式
 * 
 */
export const gotosalesDetail = (query:any,isdel:boolean = false) => {
    const route = {
        path: "/User/pages/sales/salesDetail",
        query
    } as any
    return isdel ? pageController.replace(route) : pageController.push(route) 
}

/** 售后记录 */
export const minutesDetail = (query:any) => {
    const route = {
        path: "/User/pages/sales/minutesDetail",
        query
    } as any
    return pageController.push(route)
}


/** 申请售后/修改售后/再次售后(商品)
 * 
 * 接受salesObj临时对象
 * 包含info ==> 表示商品卡片 包含商品单品id
 * afterSaleId ==> 表示售后id
 * align ==> 表示操作类型 0表示再次售后/申请售后  1表示修改售后
 * 
 */
export const upSales = (query:any) => {
    const route = {
        path: "/User/pages/sales/upSales",
        query
    } as any
    return pageController.push(route)
}



/** 申请售后/修改售后/再次售后(商品)
 * 
 * 接受salesObj临时对象
 * 包含info ==> 表示商品卡片 包含商品单品id
 * afterSaleId ==> 表示售后id
 * align ==> 表示操作类型 0表示再次售后/申请售后  1表示修改售后
 * 
 */
 export const upServiceSales = (query:any) => {
    const route = {
        path: "/User/pages/sales/upServiceSales",
        query
    } as any
    return pageController.push(route)
}


/** 申请仲裁
 * 
 * 接受
 * id ==> 表示售后id
 * 
 */
export const gotoAfterArbitrate = (query:any) =>{
    const route = {
        path: "/User/pages/sales/arbitrate",
        query
    } as any
    return pageController.push(route)
}

// 售后处理中转
export const gotowaitingSales = (query:any) => {
    const route = {
        path: "/User/pages/sales/waitingSales",
        query
    } as any
    return pageController.replace(route)
}

/* 聊天号我的发布 */
export const gotochatManage = (query:any,type:number = 1) => {
    const route = {
        path: '/User/pages/chatManage/chatManage',
        query
    } as any
    if (type == 1) {
        return pageController.push(route)
    }else{
        return pageController.replace(route)
    }
}

/** 聊天号草稿 */
export const gotoChatDraft = () => {
    const route = {
        path: "/User/pages/chatManage/chatDraft",
        query: {}
    } as any
    return pageController.push(route)
}

/** 添加好友 */
export const gotoaddFriend = () => {
    const route = {
        path: "/User/pages/addFriend/addFriend",
        query: {}
    } as any
    return pageController.push(route)
}

/** 添加通讯好友 */
export const gotoaddNumberFriend = () => {
    const route = {
        path: "/User/pages/addFriend/numberFriend",
        query: {}
    } as any
    return pageController.push(route)
}

/** 分享二维码卡片 */
export const gotoshareQR = () => {
    const route = {
        path: "/User/pages/addFriend/shareQR",
        query: {}
    } as any
    return pageController.push(route)
}

/** 关注推荐 */
export const gotofollowRecommend = () => {
    const route = {
        path: "/User/pages/followRecommend/followRecommend",
        query: {}
    } as any
    return pageController.push(route)
}

/** 附近 */
export const gotoenclosure = () => {
    const route = {
        path: "/User/pages/enclosure/enclosure",
        query: {}
    } as any
    return pageController.push(route)
}

/** 更多店铺 */
export const tomoreEnclosure = (query: any) => {
    const route = {
        path: "/User/pages/enclosure/moreEnclosure",
        query
    } as any
    return pageController.push(route)
}

/* 我的群聊 */
export const gotoGroupChat = () => {
    const route = {
        path: '/User/pages/groupChat/groupChat',
        query: {}
    } as any
    return pageController.push(route)
}

/* 我聊过的 */
export const gotoHasChat = () => {
    const route = {
        path: '/User/pages/hasChat/hasChat',
        query: {}
    } as any
    return pageController.push(route)
}

/* 直播列表 */
export const gotoLiveList = (query:any) => {
    const route = {
        path: '/User/pages/liveList/liveList',
        query
    } as any
    return pageController.push(route)
}

/* 创建群聊 */
export const gotoCreateChat = () => {
    const route = {
        path: '/User/pages/createChat/createChat',
        query: {}
    } as any
    return pageController.push(route)
}

/* 完善资料 */
export const gotoFillInfo = () => {
    const route = {
        path: '/User/pages/fillInfo/fillInfo',
        query: {}
    } as any
    return pageController.push(route)
}

/* 查看匹配资料 */
export const gotoUserInfo = (id: string) => {
    const route = {
        path: '/User/pages/userInfo/userInfo',
        query: { id }
    } as any
    return pageController.push(route)
}

/* AI设置 */
export const gotoAISetting = () => {
    const route = {
        path: '/User/pages/AISetting/AISetting',
        query: {}
    } as any
    return pageController.push(route)
}


/** 邀请好友活动 */
export const invitationDetail = () => {
    const route = {
        path: "/User/pages/invitation/invitation",
        query: {}
    } as any
    return pageController.push(route)
}

/** 社区公约 */
export const gotocommunityIndex = () => {
    const route = {
        path: "/User/pages/communityRule/communityIndex",
        query: {}
    } as any
    return pageController.push(route)
}

/** 规则中心 */
export const gotoruleCore = () => {
    const route = {
        path: "/User/pages/communityRule/ruleCore",
        query: {}
    } as any
    return pageController.push(route)
}

/** 规则百科 */
export const gotoruleList = () => {
    const route = {
        path: "/User/pages/communityRule/ruleList",
        query: {}
    } as any
    return pageController.push(route)
}

/** 规则百科详情 */
export const gotoruleDetail = (query:any) => {
    const route = {
        path: "/User/pages/communityRule/ruleDetail",
        query
    } as any
    return pageController.push(route)
}

/** 公示列表 */
export const gotoNoticeList = () => {
    const route = {
        path: "/User/pages/communityRule/noticeList",
        query: {}
    } as any
    return pageController.push(route)
}

/** 规则百科详情 */
export const gotoNoticeDetail = (query:any) => {
    const route = {
        path: "/User/pages/communityRule/noticeDetail",
        query
    } as any
    return pageController.push(route)
}

/** 切换账号 */
export const gotochengUser = () => {
    const route = {
        path: "/User/pages/setting/chengUser",
        query: {}
    } as any
    return pageController.push(route)
}

/** 账号中心 */
export const gotouserCore = () => {
    const route = {
        path: "/User/pages/setting/userCore",
        query: {}
    } as any
    return pageController.push(route)
}

/** 问题反馈&投诉 */
export const gotoFeedback = () => {
    const route = {
        path: "/User/pages/feedback/feedback",
        query: {}
    } as any
    return pageController.push(route)
}

/** 问题反馈&投诉 */
export const gotoAddFeedback = () => {
    const route = {
        path: "/User/pages/feedback/addFeedback",
        query: {}
    } as any
    return pageController.push(route)
}

/** 问题反馈&投诉详情 */
export const gotoFeedbackDetail = (query: any) => {
    const route = {
        path: "/User/pages/feedback/detail",
        query
    } as any
    return pageController.push(route)
}

/** 社区朋友 */
export const gotocommunityFriend = () => {
    const route = {
        path: "/User/pages/communityFriend/communityFriend",
        query: {}
    } as any
    return pageController.push(route)
}

/** 钱包 */
export const gotoWallet = () => {
    const route = {
        path: "/User/pages/wallet/wallet",
        query: {}
    } as any
    return pageController.push(route)
}

/** 提现-签到活动 */
export const gotoSignWithdrawal = () => {
    const route = {
        path: "/User/pages/wallet/sign-withdrawal",
        query: {}
    } as any
    return pageController.push(route)
}

/** 提现-内容收益 */
export const gotoContentWithdrawal = () => {
    const route = {
        path: "/User/pages/wallet/content-withdrawal",
        query: {}
    } as any
    return pageController.push(route)
}

/** 任务记录 */
export const gotoTaskRecordList = (rewardId: number) => {
    const route = {
        path: "/User/pages/wallet/task-record",
        query: { rewardId }
    } as any
    return pageController.push(route)
}

/** 主播中心 */
export const gotoAnchorCenter = (isReplace?: boolean) => {
    const route = {
        path: "/Create/pages/anchorCenter/anchorCenter",
        query: {}
    } as any
    return isReplace ? pageController.replace(route) : pageController.push(route)
}

/** 数据中心 */
export const gotoDataCenter = () => {
    const route = {
        path: "/Create/pages/anchorCenter/dataCenter",
        query: {}
    } as any
    return pageController.push(route)
}

/** 我的观众 */
export const gotoMyAudience = () => {
    const route = {
        path: "/Create/pages/anchorCenter/myAudience",
        query: {}
    } as any
    return pageController.push(route)
}

/** 直播设置 */
export const gotoLiveSetting = () => {
    const route = {
        path: "/Create/pages/anchorCenter/liveSetting",
        query: {}
    } as any
    return pageController.push(route)
}

/** 禁言管理 */
export const gotoBanSpeek = () => {
    const route = {
        path: "/Create/pages/anchorCenter/banSpeek",
        query: {}
    } as any
    return pageController.push(route)
}

/** 全部功能 */
export const gotoFunctionPage = () => {
    const route = {
        path: "/User/pages/functionPage/functionPage",
        query: {}
    } as any
    return pageController.push(route)
}

/** 证照信息 */
export const gotolicensePage = () => {
    const route = {
        path: "/User/pages/licensePage/licensePage",
        query: {}
    } as any
    return pageController.push(route)
}

/** 认证 */
export const gotoAuth = (isReplace?: boolean) => {
    const route = {
        path: "/User/pages/auth/auth",
        query: {}
    } as any
    return isReplace ? pageController.replace(route) : pageController.push(route)
}

/** 认证详情 */
export const gotoAuthDetail = (type: string, isReplace?: boolean) => {
    const route = {
        path: "/User/pages/auth/auth-detail",
        query: { type }
    } as any
    return isReplace ? pageController.replace(route) : pageController.push(route)
}

/** 商家认证 */
export const gotoBusinessAuth = (isReplace?: boolean) => {
    const route = {
        path: "/User/pages/auth/business-auth",
        query: {}
    } as any
    return isReplace ? pageController.replace(route) : pageController.push(route)
}