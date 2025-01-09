import { openHttp,http } from "@bc/api"
import type { } from "@bc/api/types/user/api-types"


/**
 * 直播api
 * 
 */

/* 创建/编辑直播间 */
export const creatLive = (req: any) => {
   return http.content.post('/v1/bc/app/live/submit', req)
}

/* 直播间列表 */
export const liveLists = (req: any) => {
    return http.post('api/search/v1/bc/public/es/live/list', req)
}

/* 直播间信息 */
export const liveInfo = () => {
    return http.get('api/content/v1/bc/app/user/live')
}

/* 直播sdkSecrect、sdkAppId */
export const liveConfig = () => {
    return http.get('api/content/v1/bc/app/channel/config')
}

/** 直播间详情 */
export const getLivedetail = (req:any) => {
    return http.content.get('/v1/bc/app/live/detail',req)
}

/** 小程序进入直播间 */
export const enterRoom = (req:any) => {
    return http.content.get('/v1/bc/app/live/user/enterRoom', req)
}

/** 小程序退出直播间 */
export const exitRoom = (req:any) => {
    return http.content.get('/v1/bc/app/live/user/exitRoom', req)
}

/** 直播间用户列表 */
export const liveUserList = (req:any) => {
    return http.content.post('/v1/bc/app/live/user/list',req)
}

/** 直播间点赞 */
export const liveUplike = (req:any) => {
    return http.content.get('/v1/bc/app/channel/like',req)
}

/** 直播间用户信息详情(包括主播) */
export const liveUserdetail = (req:any) => {
    return http.content.get('/v1/bc/app/live/user/detail',req)
}

/** 直播取消关注 */
export const liveunfollow = (req:any) => {
    return http.content.get('/v1/bc/app/live/user/unfollow',req)
}

/** 直播关注 */
export const livefollow = (req:any) => {
    return http.content.get('/v1/bc/app/live/user/follow',req)
}

/** 直播数据汇总 */
export const liveStat = (req:any) => {
    return http.content.get('/v1/bc/app/live/stat/index',req)
}

/** 我的观众排行榜 */
export const statRank = (req:any) => {
    return http.content.get('/v1/bc/app/live/stat/rank',req)
}

/** 禁言用户列表 */
export const banSpeakUserList = (req: any) => {
    return http.content.post('/v1/bc/app/live/user/ban/list', req)
 }

/** 禁言用户列表 */
export const unBanSpeak = (req: any) => {
    return http.message.post('/v1/bc/app/live_channel_group_chat/sayUnBlock', req)
}

/** 直播统计数据走势图 */
export const liveTrendData = (req: any) => {
    return http.content.get('/v1/bc/app/live/stat/trend', req)
}

/** 直播浏览历史 */
export const liveWatchHistory = (req: any) => {
    return http.content.post('/v1/bc/app/live/user/history', req)
}

/** 删除直播浏览历史 */
export const delLiveWatchHistory = (req: any) => {
    return http.content.post('/v1/bc/app/live/user/history/remove', req)
}

/** 直播用户发弹幕 */
export const liveUserComment = (req: any) => {
    return http.content.get('/v1/bc/app/live/user/comment', req)
}

/** 直播场次详情 */
export const livePlayDetail = (req: any) => {
    return http.content.get('/v1/bc/app/play/detail', req)
}

/** 举报原因列表 */
export const reportReasonList = (req: any) => {
    return http.content.post('/v1/bc/app/report/reasons/list', req)
}

/** 提交举报 */
export const postReport = (req: any) => {
    return http.content.post('/v1/bc/app/denounce/submit', req)
}
