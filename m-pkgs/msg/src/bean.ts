/* eslint-disable no-unused-vars */

import type { Session } from "nim-web-sdk-ng/dist/NIM_BROWSER_SDK/SessionServiceInterface"

/** 群场景枚举 */
export enum ETeamScene {
    /** 客服群 */
    customer,
    /** 私信群 */
    privateMsg,
    /** 商家群 */
    merchantGroup,
    /** 兴趣群 */
    friendsGroup
}
/** 单聊场景枚举 */
export enum EP2PScene {
    /** 消息通知 */
    notice,
    /** 事件 */
    event,
    /** 客服群 */
    deviceCmd,
    /** 交友单聊 */
    p2p
}

export type TTeamScene = keyof typeof ETeamScene
export type TP2PScene = keyof typeof EP2PScene
export type TSessionScene = TTeamScene | TP2PScene


export interface IIMUser {
    /** 昵称 */
    nickName: string
    /** 头像 */
    avatar: string
}


/** 消息会话公共信息 */
export type TSessionInfo = {
    /** 会话名称 */
    name: string
    /** 会话头像 */
    avatar: string
}

/** 群扩展信息, 拆分为: 客服群、私信群、商家群、交友群 */
export type TTeamExtInfo = {
    /** 服务主体userId */
    owner: string
    /** 服务主体名称 */
    name: string
    /** 服务主体头像 */
    avatar: string
    /** 服务人群类型: 1为客户; 2为服务人员 */
    flag: 1 | 2

    /** 接待主体名称 */
    subjectName: string
    /** 接待主体头像 */
    subjectAvatar: string
    /** 接待主体类型: 1为平台客服群; 2为商家客服群; 3 为个体创作者私信群; 4为机构创作者私信群; 5为平台创作者私信群; 6为兴趣群聊 */
    subjectType: 1 | 2 | 3 | 4 | 5 | 6

    /** 群场景枚举 */
    teamScene: TTeamScene
    /** 工种 */
    tag: string
    id: string
}

export type TMessageSession = {
    session: Session
    info: TSessionInfo
    scene: TSessionScene
    /** 群场景才有的扩展信息 */
    teamExt?: TTeamExtInfo
}

/** 群场景枚举数组 */
export const TEAM_SCENES = Object.keys(ETeamScene)
console.error('TEAM_SCENES: ', TEAM_SCENES)
export const P2P_SCENE = Object.keys(EP2PScene)
console.error('P2P_SCENE: ', P2P_SCENE)
