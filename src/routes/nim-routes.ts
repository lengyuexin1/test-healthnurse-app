import { pageController } from '@bc/uni-tools'

/**
 * 消息相关路由
 * 
 */

/** 跳转到消息列表 */
export const gotoNoticeList = (to: string, name: string) => {
    const route = {
        path: '/IndexPage/pages/news/notice-list',
        query: { to, name }
    } as any
    return pageController.push(route)
}

/** 
 * 跳转到 聊天页面
 * @param to 群id 或 对方id
 * @param scene 场景
 * @param originPage 页面来源
 * @param isReplace 是否重定向
 * @param msgProduct 商品信息
 */
export const gotoChatPage = (query: any) => {
    const route = {
        path: '/IndexPage/pages/chat/chat-container',
        query
    } as any
    return query.isReplace ? pageController.replace(route) : pageController.push(route)
}

/** 爱聊 */
export const gotoLoveChatWrap = () => {
    const route = {
        path: '/IndexPage/pages/chat/love-chat/love-chat',
        query: {}
    } as any
    return pageController.push(route)
}

/** AI问聊 */
export const gotoAIChatWrap = () => {
    const route = {
        path: '/IndexPage/pages/chat/AI-chat/AI-chat',
        query: {}
    } as any
    return pageController.push(route)
}

/** 群聊 */
export const gotoGroupChatWrap = () => {
    const route = {
        path: '/IndexPage/pages/chat/group-chat/group-chat',
        query: {}
    } as any
    return pageController.push(route)
}

/** 聊天号 */
export const gotoNameChatWrap = () => {
    const route = {
        path: '/IndexPage/pages/chat/name-chat/name-chat',
        query: {}
    } as any
    return pageController.push(route)
}