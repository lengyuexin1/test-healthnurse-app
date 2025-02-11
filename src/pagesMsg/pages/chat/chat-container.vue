<template>
    <PageContainer :loading="false">
        <view class="container tn-flex-column">
            <template v-if="data.scene == 'friendsGroup'">
                <!-- 聊天室 -->
                <!-- #ifdef APP-PLUS || H5 -->
                <ChatDetailRoom ref="bcChatDetailRoomRef" :to="data.to" v-if="data.to"></ChatDetailRoom>
                <!-- #endif -->
                 
                <!-- #ifdef MP-WEIXIN -->
                <bc-chat-detail-room-wx ref="bcChatDetailRoomWxRef" :to="data.to" v-if="data.to"></bc-chat-detail-room-wx>
                <!-- #endif -->
            </template>
            <template v-else-if="data.scene == 'p2p'">
                <!-- 爱聊 -->
                <ChatDetailLove :to="data.to" v-if="data.to"></ChatDetailLove>
            </template>
            <template v-else>
                <!-- 客服群 -->
                <ChatDetailUser :to="data.to" :originPage="data.originPage" :msgProduct="data.msgProduct" v-if="data.to"></ChatDetailUser>
            </template>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
    </PageContainer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow, onShareAppMessage, onHide } from '@dcloudio/uni-app'
import PageContainer from '@/components/container/page-container.vue'
import { SessionSDK } from '@bc/msg'
import { PlatformManage } from "@bc/sys"
import BCNotify from '@/components/notify/index.vue'
import { groupChatDetail, joinGroupChat } from '@/api/user-api'
import { gotoIndex, gotoLogin } from "@/routes/public-routes"
import ChatDetailLove from './chat-page/love-chat/chat-detail-love.vue'
import ChatDetailUser from './chat-page/user-chat/chat-detail-user.vue'
import ChatDetailRoom from './chat-page/room-chat/chat-detail-room.vue'
import { handleEnvAccount } from '@/utils/handleEnv'

interface Data {
    /** 群Id */
    to: string
    /** 聊天场景 */
    scene: string
    /** 页面来源 */
    originPage: string
    /** 商品详情 */
    msgProduct: string
}

const data = reactive<Data>({
    to: '',
    scene: '',
    originPage: '',
    msgProduct: ''
})

const bcNotify = ref()

const bcChatDetailRoomRef = ref()

const bcChatDetailRoomWxRef = ref()

onLoad(async (option: any) => {
    data.to = option?.to
    data.scene = option?.scene
    data.originPage = option?.originPage
    data.msgProduct = option ?.msgProduct

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }

        if (option?.tag == 'joinChat') {
            joinGroupChat({ tid: option?.to }).then(() => {
                console.log('加入群聊')
            }).catch((err) => {
                bcNotify.value.show('群聊已解散!')
                setTimeout(() => {
                    gotoIndex()
                }, 1200)
            })
        }
        
        if (['customer', 'friendsGroup', 'privateMsg'].includes(data.scene)) {
            getTeam(data.to)

            // 清除未读数
            SessionSDK.resetSessionUnread(`team-${data.to}`)
        }
        else if (['p2p'].includes(data.scene)) {
            getUserAccount()

            // 清除未读数
            SessionSDK.resetSessionUnread(`${data.to}`)
        }
    })
})

onShow(() => {
    // #ifdef APP-PLUS
    if (bcChatDetailRoomRef.value) {
        bcChatDetailRoomRef.value.onShowEvent()
    }
    // #endif

    // #ifdef MP-WEIXIN
    if (bcChatDetailRoomWxRef.value) {
        bcChatDetailRoomWxRef.value.onShowEvent()
    }
    // #endif
})

onHide(() => {
    // #ifdef APP-PLUS
    if (bcChatDetailRoomRef.value) {
        bcChatDetailRoomRef.value.onHideEvent()
    }
    // #endif

    // #ifdef MP-WEIXIN
    if (bcChatDetailRoomWxRef.value) {
        bcChatDetailRoomWxRef.value.onHideEvent()
    }
    // #endif
})

// 获取群详情
const getTeam = (teamId: string) => {
    SessionSDK.getTeamById(teamId).then((team) => {
        console.log('群消息', team)

        if (team.subjectType == 1) {
            uni.setNavigationBarTitle({ title: '平台客服' })
            return
        }
        
        PlatformManage.getToken().then((token: any) => {
            uni.setNavigationBarTitle({ title: token.id == handleEnvAccount(team.owner) ? team.subjectName : team.name })
        })
    })
}

// 获取云信个人信息
const getUserAccount = () => {
    SessionSDK.getUserById(data.to).then((res: any) => {
        uni.setNavigationBarTitle({ title: res.nick })
    })
}

// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage(async (): any => {
    let pack: any = {}
    await groupChatDetail({ tid: data.to }).then((res) => {
        pack = res
    })
    return {
        title: `邀请你加入【${pack?.tname}】群聊`,
        path: `/IndexPage/pages/chat/chat-container?to=${pack?.tid}&scene=friendsGroup&tag=joinChat`,
        imageUrl: pack?.memberList[0].thumb,
        desc: `群聊人数：${pack?.cntMember}人; 群聊号：${pack?.tid}`,
        success: (res: any) => {

        }
    }
})
//#endif

</script>

<style lang="scss" scoped>
.container {
    height: 0;
    flex: 1;
}
</style>
