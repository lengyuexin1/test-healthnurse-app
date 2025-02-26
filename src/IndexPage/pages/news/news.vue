<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto="true" :fixed="true" @query="queryList" :defaultPageSize="6"
            :auto-show-system-loading="true" :auto-scroll-to-top-when-reload="false" :hide-empty-view="true">
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'消息'">
                    <template #back v-if="data.isShowBack">
                        <view></view>
                    </template>
                </bc-page-navbar>
            </template>

            <view class="content" :style="{ paddingBottom: data.safeBotomHeight + 150 + 'rpx' }">

                <view class="message">
                    <view class="title">
                        <text class="title_txt">消息列表</text>
                    </view>
                    <view class="clean" @tap="readAll">
                        <!-- <image class="clean_icon" src="/static/message/message_icon_clean.png" mode="scaleToFill" /> -->
                        <text class="clean_txt">一键已读</text>
                    </view>
                </view>

                <view class="row block">
                    <block v-for="(item, index) in data.noticeList" :key="index">
                        <view class="noticeItem column i-center" @tap="clickNoticeList(item.to, item.name)">
                            <TnBadge :value="item.unread" type="danger" size="33" max="9" absolute
                                :absolute-position="{ top: '40rpx', right: '40rpx' }" v-if="item.unread > 0" />
                            <image :src="getAssetsUrl(item.image)" mode="widthFix" />
                            <text>{{ item.name }}</text>
                        </view>
                    </block>
                </view>
                <view class="list">
                    <!-- 活动组件 -->
                    <ActivityItem :activitySession="getActivitySession" @gotoNoticeList="clickNoticeList"></ActivityItem>
                    <!-- 客服组件 -->
                    <PlateformItem v-if="isExitPlateformSession" @gotoPlateformSession="gotoPlateformSession">
                    </PlateformItem>
                    <!-- 会话列表 -->
                    <SessionItem class="tn-flex-column" v-for="(item, index) in sessionList.sessions" :key="index"
                        :customer="item" @gotoChat="gotoChat"></SessionItem>
                </view>
                <!-- 精选好物 -->
                <view class="foryou">
                    <view class="newTitle">猜你喜欢</view>
                    <view class="foryouUl">
                        <ListItem :wfList="data.dataList"> </ListItem>
                    </view>
                </view>
            </view>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>
    
<script setup lang="ts">
import ListItem from "@/components/recommended/listItem.vue"
import { computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, watch, onMounted } from 'vue'
import { onShow, onLoad } from "@dcloudio/uni-app"
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import { SessionSDK, useNoticeSessions, useSessionsList } from "@bc/msg"
import ActivityItem from './components/activity-item.vue'
import PlateformItem from './components/plateform-item.vue'
import SessionItem from './components/session-item.vue'
import { gotoNoticeList, gotoChatPage } from '@/routes/nim-routes'
import BCNotify from '@/components/notify/index.vue'
import { PlatformManage } from "@bc/sys"
import { createTeam } from "@/api/nim-api"
import { IMWEB_ENV } from '@/utils/handleEnv'
import { recomLikeList } from "@/api/goods-api"

interface Data {
    isRequireLogin: boolean,
    dataList: any,
    /** 已读动画 */
    clearAnimate: boolean
    /** 单聊 */
    noticeList: any
    /** 活动消息 */
    activitySession: any,
    safeBotomHeight: number,
    isShowBack: boolean
}

const data = reactive<Data>({
    isRequireLogin: false,
    dataList: [],
    clearAnimate: false,
    noticeList: [
        { id: 'p2p-2', to: '2', unread: 0, name: '交易/物流', image: '/leyou/assets/message_icon_logistics.png' },
        { id: 'p2p-1', to: '1', unread: 0, name: '系统通知', image: '/leyou/assets/message_icon_system.png' },
        { id: 'p2p-3', to: '3', unread: 0, name: '互动消息', image: '/leyou/assets/message_icon_interaction.png' },
        // { id: 'p2p-8', to: '8', unread: 0, name: '社交消息', image: '/leyou/static/message/message_icon_contact.png' },
        { id: 'p2p-4', to: '4', unread: 0, name: '平台公告', image: '/leyou/assets/message_icon_plateform.png' },
    ],
    activitySession: { id: 'p2p-5', to: '5', unread: 0, lastMsg: { fromNick: '活动消息' }, updateTime: null },
    safeBotomHeight: 0,
    isShowBack: true
})

const bcNotify = ref()

const paging = ref()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
onLoad((option: any) => {
    if (option.type) {
        data.isShowBack = false
    } else {
        data.isShowBack = true
    }
})

const getActivitySession = computed(() => {
    const pack = noticeSession.sessions.filter(item => item.session.id == `p2p-${IMWEB_ENV()}5`)
    if (pack.length == 0) {
        return data.activitySession
    }
    return pack[0].session
})

const isExitPlateformSession = computed(() => {
    const sessionData = sessionList.sessions.filter((item) => item?.teamExt?.subjectType === 1)
    if (sessionData.length == 0) {
        return true
    }
    return false
})

// 通知消息
const noticeSession = useNoticeSessions()
console.log('通知的消息', noticeSession)

// 会话列表
const sessionList = useSessionsList()
console.log('会话列表', sessionList)

// 监听通知消息的变化
watch(noticeSession, () => {
    getUnreadBadge()
}, { deep: true })

const queryList = (pageNumber: number, pageSize: number) => {
    recomLikeList({
        pageSize,
        pageNumber,
        query: {}
    }).then((res: any) => {
        paging.value.complete(res.data)
        console.log('data.moreGoodList', data.dataList);
    })
}

// 全部已读
const readAll = () => {
    const allUnread = noticeSession.unread + sessionList.unread
    if (allUnread <= 0) {
        bcNotify.value.show('暂无未读消息')
        return
    }
    SessionSDK.resetAllSessionUnread().then(() => {
        bcNotify.value.show('全部已读成功')

        // 已读动画
        data.clearAnimate = true
        setTimeout(() => {
            data.clearAnimate = false
        }, 2000)
    })
}

const clickNoticeList = (to: string, name: string) => {
    if (data.isRequireLogin) {
        bcNotify.value.show('你还没登录')
        return
    }
    gotoNoticeList(`${IMWEB_ENV()}${to}`, name)
}

const gotoPlateformSession = () => {
    if (data.isRequireLogin) {
        bcNotify.value.show('你还没登录')
        return
    }
    PlatformManage.getToken().then((token: any) => {
        createTeam({
            userId: token?.id,
            userName: token?.nickname,
            userThumb: token?.avatar,
            flag: 1, //1小程序用户，2服务人员
            shopId: token?.shopId ?? 0,
            type: 1 // 1平台，2店铺
        }).then((res: any) => {
            gotoChat(res.tid, 'customer')
        }).catch((err: any) => {
            bcNotify.value.show(err.message)
        })
    })
}

const gotoChat = (to: string, scene: string) => {
    gotoChatPage({
        to,
        scene,
        originPage: 'IndexPage/pages/news/news'
    })
}

const getUnreadBadge = () => {
    for (const i in data.noticeList) {
        for (const j in noticeSession.sessions) {
            if (`${IMWEB_ENV()}${data.noticeList[i].to}` === noticeSession.sessions[j].session.to) {
                data.noticeList[i].unread = noticeSession.sessions[j].session.unread
            }
        }
    }
}

onMounted(() => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        data.isRequireLogin = isRequireLogin
    })
    // 微信小程序
    getUnreadBadge()

    uni.getSystemInfo({
        success: (res: any) => {
            data.safeBotomHeight = res.safeAreaInsets.bottom
        }
    })
})

onShow(() => {
    // app
    getUnreadBadge()
})

</script>
  
<style lang="scss" scoped>
.content {
    padding-bottom: 150rpx;
}

.block {
    margin-top: 20rpx;
    background-color: white;
    width: 96%;
    margin-left: 2%;
    border-radius: 16rpx;

    .noticeItem {
        flex: 1;
        padding: 30rpx 20rpx;
        position: relative;
    }

    image {
        width: 74rpx;
        height: 74rpx;
    }

    text {
        font-size: 24rpx;
        color: #1b1b1b;
        margin-top: 10rpx;
    }
}

.list {
    width: 96%;
    margin-left: 2%;
    background-color: #f2f3f5;
    border-radius: 16rpx;
    margin-top: 20rpx;
}

.foryou {
    margin: 40rpx 20rpx 20rpx 20rpx;
    margin-bottom: 20rpx;

    .newTitle {
        font-weight: 600;
        margin: 0 0 20rpx 8rpx;
        font-size: 32rpx;
        color: #0B0B0B;
    }
}

.message {
    width: 96%;
    margin-left: 2%;
    box-sizing: border-box;
    background-color: #ffffff;
    padding: 24rpx 40rpx 24rpx 40rpx;
    border-radius: 16rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .title {
        .title_txt {
            font-size: 33rpx;
            font-weight: bold;
            color: #333333;
        }
    }

    .clean {
        display: flex;
        flex-direction: row;
        align-items: center;

        .clean_txt {
            font-size: 25rpx;
            color: #29c86f;
        }

        .clean_icon {
            width: 32rpx;
            height: 32rpx;
            margin-right: 5rpx;
        }
    }
}
</style>
  