import { openHttp,http } from "@bc/api"
import type { _v1_bc_app_common_getWxMiniProgramSessionKey_get_req, _v1_bc_app_user_detail_get_req, _v1_bc_app_user_edit_post_req } from "@bc/api/types/user/api-types"


/**
 * IM类api
 * 
 */

/* 创建群聊 */
export const createTeam = (req: _v1_bc_app_im_team_create_post_req) => {
    return http.message.post('/v1/bc/app/im/team_create', req)
}

/** 直播间群聊详情 */
export const liveRoomChat = (req:any) => {
    return http.message.get('/v1/bc/app/live_channel_group_chat/detail', req)
}

/** 加入直播间群聊 */
export const joinliveRoomChat = (req:any) => {
    return http.message.post('/v1/bc/app/live_channel_group_chat/join',req)
}

/** 退出直播间群聊 */
export const leaveliveRoomChat = (req:any) => {
    return http.message.post('/v1/bc/app/live_channel_group_chat/leave',req)
}


/**
 * 语音聊api
 * 
 */


/** 申请上麦 */
export const applyForMicriphone = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/applyFor',req)
}

/** 申请列表 */
export const applyForList = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/applyForList',req)
}

/** 同意上麦 */
export const agreeMicrophone = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/agree',req)
}

/** 拒绝上麦 */
export const rejectMicrophone = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/reject',req)
}

/** 下麦 */
export const threshing = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/threshing',req)
}

/** 强制下麦 */
export const forceThreshing = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/forceThreshing',req)
}

/** 上麦列表 */
export const microphoneList = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/wheatServingList',req)
}

/** 上麦状态 */
export const microphoneStatus = (req:any) => {
    return http.message.get('/v1/bc/app/wheatServing/wheatServingDetail',req)
}

/** 群上麦设置 */
export const microphoneConfig = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/wheatServingConfig',req)
}

/** 群上麦设置 */
export const getMicrophoneConfig = (req:any) => {
    return http.message.get('/v1/bc/app/wheatServing/getWheatServingConfig',req)
}

/** 群成员列表设置 */
export const teamWheatServingList = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/teamWheatServingList',req)
}

/** 开麦 */
export const openMic = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/openMic',req)
}

/** 闭麦 */
export const closeMic = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/blanking',req)
}

/** 群主开麦 */
export const groupOwnerOpenMic = (req:any) => {
    return http.message.post('/v1/bc/app/wheatServing/groupOwnerOpenMic',req)
}

/** 是否存在黑名单中(用户端) */
export const isBlackList = (req:any) => {
    return http.content.post('/v1/bc/app/happy/isBlacklist',req)
}

/** 检测发布权限 */
export const denounceCheck = () => {
    return http.content.get('/v1/bc/app/denounce/check')
}