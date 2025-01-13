
import { pageController } from '@bc/uni-tools'


//====================================================
/** 接口定义 */
//====================================================

/** 前端定义的业务类型, 2为服务;3为商品;4为云课堂 */
type TBizType = '2' | '3' | '4'

/** 消息传递过来的路由信息 */
interface IMessageRoute {
    /** 路由标识, 决定跳转到哪个页面 */
    routeFlag: TRouterFlag
    /** 页面唯一标识, 一般详情页面才有 */
    id?: string
    /** 业务类型, 确定打开的是 “服务2” 还是 “商品3” */
    bizType?: TBizType
}

// 消息实体扩展信息
type TNoticeExt = {
    title: string
    content: string
    type: 'linkText' | 'text'
    query: Record<string, string>
    linkMark: string
}

interface ICallback {
    (route: TNoticeExt): void
}


//====================================================
/** 路由标识定义 */
//====================================================
export const ROUTE_FLAG = [
    /** 邀请成员加入沙龙 */
    'salon_detail',
    /** 关注、点赞、评论 */
    'home_page',
    /** 粉丝列表 */
    'fans_list',
    /** 评论 */
    'comment_list',
    /** 评论回复 */
    'comment_reply_list',
    /** 加入群聊 */
    'team_detail',
    /** 订单详情 */
    'order_detail',
    /** 发布消息 */
    'publish_list',
    /** 发布失败 */
    'publish_detail',
    /** 售后 */
    'aftersale_detail',
    /** 活动-邀请好友 */
    'activity_detail_user',
    /** 活动-优选店铺 */
    'activity_detail_shop'
] as const
type TRouterFlag = typeof ROUTE_FLAG[number]


//====================================================
/** 路由表定义 */
//====================================================

type TRouterTable = Record<TRouterFlag, ICallback>
export const routeTable = {} as TRouterTable


//====================================================
/** 路由事件注册 */
//====================================================



/** 邀请成员加入沙龙 */
routeTable.salon_detail = (route: TNoticeExt) => {
    const param = {
        accountName: route.query.accountName,
        accountThumb: route.query.accountThumb,
        note: route.query.note,
        salonName: route.query.salonName
    }
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            id: route.query.salonId,
            type: 'news', // ‘news’用户页面检测是否有邀请情况
            param: encodeURIComponent(JSON.stringify(param))
        }
    })
}

/** 关注、点赞 */
routeTable.home_page = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            accountId: route.query.accountId
        }
    })
}

/** 粉丝列表 */
routeTable.fans_list = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            ...route.query,
            type: 2,
            isuser: 1
        }
    })
}

/** 评论 */
routeTable.comment_list = (route: any) => {
    // video_detail
    
    console.log('评论跳转详情',route);

    let path = ''
    let query = {}

    if (route.query.articleType == 2) {
        path = MarkLinkEvents['video_detail']
        
        query = {
            videoId: route.query.contentId,
            videoPagetype: 0,
        }
        
    }else{
        
        if (route.query.happyType == 98) {
            // path = MarkLinkEvents['home_page']
            path = MarkLinkEvents['channel_detail']
            query = {
                accountId: route.query.accountId,
            }
        }
        
    }

    console.log('path',path);
    console.log('query',query);
    
    pageController.push({
        path ,
        query
    })
}


/** 评论回复 */
routeTable.comment_reply_list = (route: any) => {
    console.log('评论回复跳转详情',route);
    let path = ''
    let query = {}

    if (route.query.articleType == 2) {
        path = MarkLinkEvents['video_detail']
        query = {
            videoId: route.query.contentId,
            videoPagetype: 0,
        }
        
    }else{
        
        if (route.query.happyType == 3) {
            console.log('沙龙');
            path = MarkLinkEvents['salo_posts_detail']
            query = {
                id: route.query.contentId,
            }
        }
        
        if (route.query.happyType == 98) {
            console.log('内容');
            // path = MarkLinkEvents['comment_reply_list']
            path = MarkLinkEvents['channel_detail']
            query = {
                id: route.query.contentId,
            }
        }
    }


    pageController.push({
        path ,
        query
    })
}

/** 加入群聊 */
routeTable.team_detail = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            to: route.query.tid,
            scene: 'friendsGroup',
            tag: 'joinChat'
        }
    })
}

/** 订单详情 */
routeTable.order_detail = (route: TNoticeExt) => {
    let path = ''
    let query = {}

    if (route.query.bizType == 4) {
        path = MarkLinkEvents.order_detail
    }
    else if (route.query.bizType == 3) {
        path = MarkLinkEvents.goods_order_detail
        query = {
            itemId: route.query.id
        }
    }
    else if (route.query.bizType == 2) {
        path = MarkLinkEvents.service_order_detail
        query = {
            itemId: route.query.id
        }
    }
    pageController.push({
        path: path,
        query
    })
}

/** 发布消息 */
routeTable.publish_list = (route: any) => {
    let path = ''
    let query = {}
    
    if (route.query.articleType == 2) {
        
        if (route.query.moduleType == 8) {
            console.log('享老记');
            path = MarkLinkEvents['enjoy_detail']
            query = {
                id: route.query.id,
            }
        }
        if (route.query.moduleType == 98) {
            // path = MarkLinkEvents['home_page']
            // query = {
            //     id: route.query.id,
            // }
            path = MarkLinkEvents['video_detail']
            query = {
                videoId: route.query.contentId,
                videoPagetype: 0,
            }
        }
    }else{
        
        if (route.query.moduleType == 3) {
            console.log('沙龙');
            path = MarkLinkEvents['salo_detail']
            query = {
                id: route.query.contentId,
            }
        }
        if (route.query.moduleType == 4) {
            console.log('沙龙帖子');
            path = MarkLinkEvents['salo_posts_detail']
            query = {
                id: route.query.contentId,
            }
        }
        
        if (route.query.moduleType == 8) {
            path = MarkLinkEvents['enjoy_detail']
            query = {
                id: route.query.id,
            }
        }
        if (route.query.moduleType == 98) {
            // path = MarkLinkEvents['home_page']
            // query = {
            //     id: route.query.id,
            // }
            path = MarkLinkEvents['channel_detail']
            query = {
                id: route.query.contentId,
            }
        }
    }

    pageController.push({
        path,
        query
    })
}


/** 发布失败 */
routeTable.publish_detail = (route: any) => {
    let path = ''
    let query = {}


    if (route.query.moduleType == 1) {
        path = MarkLinkEvents['change_channel']
        query = {
            articleId: route.query.contentId,
            type: route.query.articleType == 2 ? 2 : 3,
            ischange: 1
        }
    }
    if (route.query.moduleType == 3) {
        path = MarkLinkEvents['change_salo']
        query = {
            id: route.query.dataId,
            ischange: 1,
        }
    }
    if (route.query.moduleType == 4) {
        path = MarkLinkEvents['change_salo_posts']
        query = {
            id: route.query.dataId,
            ischange: 1,
        }
    }
    if (route.query.moduleType == 5) {
        path = MarkLinkEvents['change_chat']
        query = {
            auditId: route.query.dataId,
            type: route.query.articleType == 2 ? 2 : 3,
            ischange: 2
        }
    }
    if (route.query.moduleType == 6) {
        path = MarkLinkEvents['change_find']
        query = {
            auditId: route.query.dataId,
            type: route.query.articleType == 2 ? 2 : 3,
            ischange: 2,
        }
    }
    if (route.query.moduleType == 7) {
        path = MarkLinkEvents['change_video']
        query = {
            auditId: route.query.dataId,
            type: route.query.articleType == 2 ? 2 : 3,
            ischange: 2
        }
    }
    if (route.query.moduleType == 8) {
        path = MarkLinkEvents['change_enjoy']
        query = {
            auditId: route.query.dataId,
            type: route.query.articleType == 2 ? 2 : 3,
            ischange: 1
        }
    }

    pageController.push({
        path,
        query
    })

}


/** 售后 */
routeTable.aftersale_detail = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            ...route.query
        }
    })
}

/** 物流信息 */
routeTable.logistics_detail = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {
            orderId: route.query.id
        }
    })
}

/** 活动-邀请好友 */
routeTable.activity_detail_user = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {}
    })
}

/** 活动-优选店铺 */
routeTable.activity_detail_shop = (route: TNoticeExt) => {
    pageController.push({
        path: MarkLinkEvents[route.linkMark],
        query: {}
    })
}


//====================================================
/** 路由事件注册 */
//====================================================



/**
 * 消息跳转链接表
 */
enum MarkLinkEvents {

    /** 邀请成员加入沙龙 */
    salon_detail = '/pagesCnt/pages/salon/detail',

    /** 内容详情(频道) */
    channel_content_detail = '/pagesCnt/pages/articledetails/articledetails',

    /** 内容详情(沙龙) */
    salon_content_detail = '/pagesCnt/pages/salon/salonPostsDetail',

    /** 内容详情(云课堂) */
    course_content_detail = '/pagesCnt/pages/course/courseVideo',

    /** 个人主页 */
    home_page = '/pagesCnt/pages/author/author',

    /** 粉丝列表 */
    fans_list = '/pagesCnt/pages/followPage/follow',

    /** 评论 */
    comment_list = '/pagesCnt/pages/articledetails/articledetails',

    /** 评论回复 */
    comment_reply_list = '/pagesCnt/pages/articledetails/articledetails',

    /** 加入群聊 */
    team_detail = '/IndexPage/pages/chat/chat-container',

    /** 订单详情-云课堂 */
    order_detail = '/pagesCnt/pages/course/course',

    /** 商品订单详情 */
    goods_order_detail = '/Order/pages/goodsOrderDetail/goodsOrderDetail',

    /** 服务订单详情 */
    service_order_detail = '/Order/pages/serviceOrderDetail/serviceOrderDetail',

    /** 发布消息-文章 */
    publish_list_article = '/pagesCnt/pages/course/course',

    /** 发布消息-视频 */
    publish_list_video = '/pagesCnt/pages/course/course',

    /** 发布消息-图片 */
    publish_list_image = '/pagesCnt/pages/course/course',

    /** 视频详情 */
    video_detail = '/pagesCnt/pages/videoPreview/videoPreview',

    /** 康养百科内容详情 */
    channel_detail = '/pagesCnt/pages/articledetails/articledetails',

    /** 沙龙详情 */
    salo_detail = '/pagesCnt/pages/salon/detail',

    /** 沙龙帖子详情 */
    salo_posts_detail = '/pagesCnt/pages/salon/salonPostsDetail',

    /** 聊天详情 */
    chat_detail = '/pagesCnt/pages/likechat/chatDetail',

    /** 发现详情 */
    find_detail = '/pagesCnt/pages/createFind/findDetail',

    /** 频道内容修改 */
    change_channel = '/pagesCnt/pages/uparticle/uparticle',

    /** 修改沙龙 */
    change_salo = '/pagesCnt/pages/salon/upsalonPosts',

    /** 修改沙龙帖子 */
    change_salo_posts = '/pagesCnt/pages/salon/UpPosts',

    /** 修改聊天内容 */
    change_chat = '/pagesCnt/pages/likechat/upChat',

    /** 修改发现内容 */
    change_find = '/pagesCnt/pages/createFind/upcreateFind',

    /** 修改创意短片 */
    change_video = '/pagesCnt/pages/createVideo/upcreateVideo',

    /** 修改享老记 */
    change_enjoy = '/CreateSplit/pages/enjoyRecord/upEnjoyRecord',

    /** 享老记详情 */
    enjoy_detail = '/CreateSplit/pages/enjoyRecord/enjoyEventDetail',

    /** 售后 */
    aftersale_detail = '/pagesUser/pages/sales/salesDetail',

    /** 活动-邀请好友 */
    activity_detail_user = '/pagesUser/pages/invitation/invitation',

    /** 活动-优选店铺 */
    activity_detail_shop = '/Mall/pages/perferShop/perferShop',

}
