import { pageController } from '@bc/uni-tools'


/**
 * 内容相关路由
 *
 *
 */

// 频道列表页
export const gotoChannel = () => {
    const route = {
        path: '/pagesCnt/pages/channel/channel'
    } as any
    return pageController.push(route)
}

// 频道关注列表页
export const gotoChannelFollow = () => {
    const route = {
        path: '/pagesCnt/pages/channelFollow/channelFollow'
    } as any
    return pageController.push(route)
}

// 内容发布
// articleId?: string, type?: number, ischange?:number
export const gotouparticle = (query:any, del:boolean = false) => {
    const route = {
        path: '/pagesCnt/pages/uparticle/uparticle',
        query
    } as any

    if (del) {
        return pageController.replace(route)
    }
    else {
        return pageController.push(route)
    }

}

// 内容详情
export const gotoarticledetails = (query:any) => {
    const route = {
        path: '/pagesCnt/pages/articledetails/articledetails',
        query
    } as any
    return pageController.push(route)
}

// 内容播报页
export const gotoarticledetailVoice = (query:any) => {
    const route = {
        path: '/pagesCnt/pages/articledetails/articledtailsVoice',
        query
    } as any
    return pageController.push(route)
}


/** 关注/粉丝列表 */
/**
 * query传入
 * type  1关注列表,2粉丝列表,3云课堂关注列表
 * isuser 0不是本人,1是本人
 * accountId 当isuser传入0必传
 */
 interface dataQuery {
    type : number | string,
    isuser : number | string,
    accountId? : string
 }

export const gotodataManage = (query:dataQuery) => {
    const route = {
        path: "/pagesCnt/pages/followPage/follow",
        query
    } as any
    return pageController.push(route)
}

// 创作者首页
export const gotoauthor = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/author/author",
        query
    } as any
    return pageController.push(route)
}

// 云课堂已购买课程
export const gotocourseList = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/course/course",
        query
    } as any
    return pageController.push(route)
}

// 课程详情
/**
 * listId:临时对象
 * videoIdlist: 需传入视频课程id(数组形式) [...课程id]
 * query: 从首页列表进入必传(接收当前分类的请求query)
 * isstudy: 0正常进入 1已购买课程进入 2订单列表进入
 */

// 云课堂竖屏视频
export const gotocourseVideo = (listId:string) => {
    const route = {
        path: "/pagesCnt/pages/course/courseVideo",
        query: { listId }
    } as any
    return pageController.push(route)
}

// 沙龙详情
export const gotoSalonDetail = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/salon/detail",
        query
    } as any
    return pageController.push(route)
}

// 沙龙管理
export const gotoSalonManage = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/salon/manage",
        query
    } as any
    return pageController.push(route)
}

/* 邀请好友入组 */
export const gotoInviteFriends = (query: any) => {
    const route = {
        path: '/pagesCnt/pages/salon/inviteFriends',
        query
    } as any
    return pageController.push(route)
}

/** 创建沙龙
 *
 * query:{
 *  ischange:1,   0正常发布 1修改
 *  id:''   修改时必传表示修改的沙龙id
 * }
 *
*/

export const gotoUpsalonPostsPage = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/salon/upsalonPosts",
        query
    } as any
    return pageController.push(route)
}


/** 创建沙龙帖子
 *
 * query:{
 *  ischange:1,   0正常发布 1修改
 *  salonId:''   沙龙id
 *  id: '' 修改的沙龙帖子id
 * }
 *
*/
export const gotoUpPosts = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/salon/UpPosts",
        query
    } as any
    return pageController.push(route)
}

// 沙龙详情帖子
export const gotosalonPostsDetailPage = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/salon/salonPostsDetail",
        query
    } as any
    return pageController.push(route)
}

export const gotoActivityDetail = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/activity/activityDetail",
        query
    } as any
    return pageController.push(route)
}

// 创作学堂-详情
export const gotoSchoolArticleDetail = (query: any) => {
    const route = {
        path: "/pagesCnt/pages/school/schoolArticleDetail",
        query
    } as any
    return pageController.push(route)
}

// 创作中心
export const gotocreationPage = () => {
    const route = {
        path: "/pagesCnt/pages/creative/creationPage",
        query: {}
    } as any
    return pageController.push(route)
}

// 评论管理
export const gotoCommentSetting = (type: string) => {
    const route = {
        path: "/pagesCnt/pages/comment/comment",
        query: { type }
    } as any
    return pageController.push(route)
}

// 活动广场
export const gotoActivityIndex = () => {
    const route = {
        path: "/pagesCnt/pages/activity/index",
        query: {}
    } as any
    return pageController.push(route)
}

// 草稿箱
export const gotoDraftList = () => {
    const route = {
        path: "/pagesCnt/pages/draft/draft",
        query: {}
    } as any
    return pageController.push(route)
}

// 创作学堂
export const gotoCreateSchool = () => {
    const route = {
        path: "/pagesCnt/pages/school/school",
        query: {}
    } as any
    return pageController.push(route)
}

/**
 * 数据助手
 * query => 接收作品id以及作品类型
 *
 * articleId => 表示作品id
 * articleType => 表示作品类型 (1表示文章类型，2表示视频类型)
 */
export const assistantDetail = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/dataAssistant/dataAssistant",
        query
    } as any
    return pageController.push(route)
}

// 商户入驻
export const gotoAddMerchant = (type: string) => {
    const route = {
        path: "/pagesCnt/pages/addMerchant/addMerchant",
        query: { type }
    } as any
    return pageController.push(route)
}

export const gotoAddMerchantSuccess = () => {
    const route = {
        path: "/pagesCnt/pages/addMerchant/success",
        query: {}
    } as any
    return pageController.push(route)
}

/** 发布聊天号 */
export const upChatPage = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/likechat/upChat",
        query
    } as any
    return pageController.push(route)
}

/** 聊天号详情 */
export const gotochatDetail = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/likechat/chatDetail",
        query
    } as any
    return pageController.push(route)
}

/** 视频内容预览 */
/**
 * videoId: 视频预览id
 * videoPagetype： 预览类型
 * 0 => 康养百科
 * 1 => 聊天
 * 2 => 发现
 * 3 => 创作短片
 *
 */
export const gotovideoPreview = (query:any) => {
    const route = {
        path: "/pagesCnt/pages/videoPreview/videoPreview",
        query
    } as any
    return pageController.push(route)

}

/** 享老记 */
// uniqueId 发布参数 默认不传
export const gotoenjoyRecord = (isdel:number = 0) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoyRecord",
        query: {}
    } as any

    if (isdel == 1) {
        return pageController.replace(route)
    }
    else {
        return pageController.push(route)
    }

}

/** 发布享老记 */
/**
 * ischange 默认不传 1表示修改
 * auditId 传ischange时必传 表示内容审核id
 * type 传ischange时必传 表示内容类型
 * isEvent 默认不传 1表示发布内容默认标记为大事记
 *
 */
export const gotoUpenjoyRecord = (query:any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/upEnjoyRecord",
        query
    } as any

    return pageController.push(route)

}

/** 创建圈子 / 修改我的信息
 * ischange ==> 默认创建，1表示修改
 */
export const gotocreateEnjoy = (query : any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/createEnjoy",
        query
    } as any
    return pageController.push(route)
}

/** 老友中心 */
export const gotofriendCord = () => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/friendCord",
        query: {}
    } as any
    return pageController.push(route)
}

/** APP 创建直播间 */
export const gotoCreateLive = () => {
    const route = {
        path: "/Live/pages/createLive/createLive"
    } as any
    return pageController.push(route)
}
/** APP 创建直播间 */
export const gotoPreviewLive = (query: any) => {
    const route = {
        path: "/Live/pages/createLive/previewLive",
        query
    } as any
    return pageController.push(route)
}
/** 老友记 */
export const gotofilterPage = () => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/filterPage",
        query: {}
    } as any
    return pageController.push(route)
}
/** APP 直播间 */
export const gotoLiveShow = (query: any, ispush: number = 1) => {
    const route = {
        path: "/Live/pages/liveShow/liveShow",
        query
    } as any
    if (ispush == 1) {
        return pageController.replace(route)
    }
    else {
        return pageController.push(route)
    }
}

/** 微信直播 */
export const gotowxLive = (query:any, ispush: number = 1) => {
    const route = {
        path: "/Live/pages/wxLive/wxLive",
        query
    } as any
    if (ispush == 1) {
        return pageController.replace(route)
    }
    else {
        return pageController.push(route)
    }
}

/** 结束直播 */
export const gotoEndLive = (query:any) => {
    const route = {
        path: "/Live/pages/endLive/endLive",
        query
    } as any
    return pageController.replace(route)
}

/** 加入老友记 */
export const gotojoinEnjoy = (query:any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/joinEnjoy",
        query
    } as any
    return pageController.push(route)
}

/** 老友记大事记列表 */
export const gotoEventList = (query:any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoyEventList",
        query
    } as any
    return pageController.push(route)
}

/** 老友记详情 */
export const gotoenjoyEventDetail = (query:any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoyEventDetail",
        query
    } as any
    return pageController.push(route)
}

/** 老友记相册 */
export const gotoenjoyAlbum = (query: any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoyAlbum",
        query
    } as any
    return pageController.push(route)
}

/** 安全保障 */
export const gotoenjoySecurity = () => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoySecurity",
        query: {}
    } as any
    return pageController.push(route)
}

/** 权限管理 */
/**
 * type 管理类型
 *  1表示记录权限
 *  2表示分享下载权限
 *  3表示邀请权限
 *
 */
export const gotoenjoyJurisdiction = (query:any) => {
    const route = {
        path: "/CreateSplit/pages/enjoyRecord/enjoyJurisdiction",
        query
    } as any
    return pageController.push(route)
}

/** 商户提现(收益提现) */
export const gotowithdrawalIncome = () => {
    const route = {
        path: "/pagesUser/pages/redEnvelope/withdrawalIncome",
        query: {}
    } as any
    return pageController.push(route)
}


/** app新版发布相册页 */
/**
 * 临时接收参加活动相关参数
 * isjoinActivity?: number;  //是否参加活动
 * activityId?: string;  //活动id
 * topic?: string; //活动关键字
 */
 interface QueryParams {
    isjoinActivity?: number;  //是否参加活动
    activityId?: string;  //活动id
    topic?: string; //活动关键字
    taskId?: string|null; //红包活动taskId
    isBackIndex?: number|null; //是否发布成功返回首页
}

export const Upcontent = (query:QueryParams) => {
    const  route = {
        path: "/pagesCreateSplit/pages/Upcontent/newUpcontentPage",
        query
    } as any
    return pageController.push(route)
}

/** 新版发布
 *
 * query参数包含:
 *  是否为编辑 ischange 默认不传为0表示发布
 *  发布时必须接收一个临时对象，UpurlList
 *  UpurlList:{
 *      url: 上传文件oss路径
 *      isImg: 上传文件是否为相片
 *      isVideo: 上传文件是否为视频
 *  }
 *  编辑时必须接收编辑id
 */

interface QueryParams {
    isChange?: number;  // 是否为编辑，默认不传为0表示发布
    isDraft?: number;  // 是否为编辑草稿，默认不传为0表示发布
    UpurlList?: string; // 在发布时必须接收的临时对象
    editId?: string;    // 编辑时必须接收的编辑ID
    isjoinActivity?: number;  //是否参加活动
    activityId?: string;  //活动id
    topic?: string; //活动关键字
    categoryId?: string; //参加的活动的分类id
    taskId?: string|null; //红包活动taskId
    isBackIndex?: number|null; //是否发布成功返回首页
}

export const gotoNewUpcontentPage = (query:QueryParams) => {
    const  route = {
        path: "/pagesCnt/pages/creative/upArticle",
        query
    } as any
    return pageController.push(route)
}

export const gotoReportPage = (query:any) => {
    const  route = {
        path: "/pagesCnt/pages/report/reportPage",
        query
    } as any
    return pageController.push(route)
}

export const gotosubmitReport = (query:any) => {
    const  route = {
        path: "/pagesCnt/pages/report/submitReport",
        query
    } as any
    return pageController.replace(route)
}

/**
 * 全部内容关注页
 */
export const gotoallFollowPage = () => {
    const route = {
        path: '/IndexPage/pages/classPage/allFollowPage',
        query: {}
    } as any
    return pageController.push(route)
}

