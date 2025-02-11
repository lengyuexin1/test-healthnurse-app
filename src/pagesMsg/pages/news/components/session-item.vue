<template>
    <view class="session-box" v-if="data.userInfo.id !== customer.session.to">
        <view class="item tn-flex-row" @click="clickSession">
            <view style="position: relative;">
                <UserAvatar :avatar="avatar" :subjectType="subjectType" />
                <TnBadge
                    :value="session.unread"
                    type="danger"
                    size="22rpx"
                    :dot="true"
                    :absolute-position="{ top: '5rpx', right: '5rpx' }"
                    absolute
                    absolute-center
                    v-if="customer.session.unread > 0 && scene == 'friendsGroup'"
                />
                <TnBadge
                    :value="session.unread"
                    type="danger"
                    size="40rpx"
                    :max="9"
                    :absolute-position="{ top: '15rpx', right: '8rpx' }"
                    absolute
                    absolute-center
                    v-if="customer.session.unread > 0 && scene !== 'friendsGroup'"
                />
            </view>
            <view class="main-wrap">
                <view class="name-box tn-flex-center-between">
                    <view class="name">
                        <view>{{ name }}</view>
                    </view>
                    <view class="t">{{ dateTime }}</view>
                </view>
                <view class="text-box tn-flex-center-between" >
                    <view class="tt">{{ lastCnt() }}</view>
                </view>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed, onMounted, reactive, onUpdated } from 'vue'
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import UserAvatar from './user-avatar.vue'
import { SessionSDK, type TMessageSession } from '@bc/msg'
import { PlatformManage } from '@bc/sys'
import { isBlackList } from '@/api/nim-api'
import BCNotify from '@/components/notify/index.vue'
import { handleEnvAccount } from '@/utils/handleEnv'

//============================
/** 接口定义 */
//============================
interface Props {
    customer: TMessageSession
}

interface Events {
    (e: 'gotoChat', value: string, scene: string): void
}

interface Data {
    userInfo: any
}

//============================
/** 基本参数 */
//============================
const messageMap = {
    'image': '[图片]',
    'audio': '[语音]',
    'custom': '[商品信息]'
} as any

//============================
/** 属性定义 */
//============================
const props = defineProps<Props>()
const emit = defineEmits<Events>()

const bcNotify = ref()

const data = reactive<Data>({
    userInfo: {}
})

// 群信息
const info = computed(() => {
    return props.customer.info
})
// 群扩展信息
const ext = computed(() => {
    return props.customer.teamExt
})
// 主体类型
const subjectType = computed(() => {
    return ext.value?.subjectType || 1
})
//会话信息
const session = computed(() => {
    return props.customer.session
})
//场景
const scene = computed(() => {
    return props.customer.scene
})

const avatar = computed(() => {
    if (scene.value == 'friendsGroup') {
        return ext.value?.avatar
    }
    return info.value.avatar
})

const name = computed(() => {
    if (ext.value?.subjectType == 1) {
        return info.value.name = '平台客服'
    }
    else if (ext.value?.subjectType == 6) {
        return ext.value?.name
    }
    return info.value.name || '未知'
})

const dateTime = computed(() => {
    const datetime = dayjs(Number(session.value.updateTime))
    const now = dayjs().startOf('d')
    if (datetime.isAfter(now)) {
        //今天
        return datetime.format('HH:mm')
    }
    return datetime.format('MM-DD HH:mm')
})

const lastCnt = (() => {
    const lastMsg = props.customer.session.lastMsg

    if (!lastMsg) {
        return '[暂无新消息]'
    }

    if (lastMsg.type.toLowerCase() === 'text') {
        if (typeof lastMsg.body === 'string') {
            try {
                const obj = JSON.parse(lastMsg.body)
                if (typeof obj === 'object' && obj) {
                    return obj.title
                }
                else {
                    return lastMsg.body
                }
            }
            catch (e) {
                return lastMsg.body
            }
        }
        else {
            return lastMsg.body
        }
    }

    const cnt = messageMap[lastMsg.type.toLowerCase()]
    return cnt || '[消息]'
})

//============================
/** 事件定义 */
//============================
const clickSession = () => {
    if (props.customer?.teamExt?.id && props.customer?.teamExt?.id !== '') {
        isBlackList({ userId: handleEnvAccount(props.customer.teamExt.id)}).then((res) => {
            if (res) {
                bcNotify.value.show('您已被对方拉黑，不可发送消息')
                return
            }
            allowGotoChatPage()
        })
    }
    else {
        allowGotoChatPage()
    }
}

const allowGotoChatPage = () => {
    const sessionId = session.value.id
    emit('gotoChat', props.customer.session.to, scene.value)

    SessionSDK.resetSessionUnread(sessionId)
}

onMounted(() => {
    PlatformManage.getToken().then((res: any) => {
        data.userInfo = res
    })
})

</script>

<style lang="scss" scoped>
.session-box {
    margin-bottom: 20rpx;
    height: 160rpx;
    padding: 0rpx 30rpx;
    border-radius: 16rpx;
    background-color: #FFFFFF;

    .item {
        height: 160rpx;
        align-items: center;

        // 小程序不支持*，采用 :not(not)代替通配符
        :not(not) {
            margin-right: 0rpx;
            &:last-child {
                margin-right: 0rpx;
            }
        }

        .avatar {
            width: 90rpx;
            height: 90rpx;

            img {
                width: 90rpx;
                height: 90rpx;
                border-radius: 50%;
                background-color: #fff;
                box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
            }
        }

        .main-wrap {
            height: 90rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            margin-left: 28rpx;

            // 小程序不支持*，采用 :not(not)代替通配符
            :not(not) {
                margin-right: 0rpx;
                &:last-child {
                    margin-right: 0;
                }
            }
            
        }
    }
}

.name-box {
    height: 44rpx;
    line-height:44rpx;

    .name {
        font-size: 29rpx;
        font-weight: bold;
        color: #333333;
        display: flex;
        align-items: center;

        // 小程序不支持*，采用 :not(not)代替通配符
        :not(not) {
            margin-right: 12rpx;
            &:last-child {
                margin-right: 0;
            }
        }

        view {
            max-width: 350rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        // .flag {
        //     font-size: 12px;
        //     height: 20px;
        //     line-height: 20px;
        //     border-radius: 4px 4px 4px 4px;
        //     padding: 0 4px;
        // }

        .client-user {
            background: rgba(255, 159, 62, 0.15);
            color: #FF9F3E;
        }

        .service-user {
            background: rgba(62, 146, 255, 0.15);
            color: #3E92FF;
        }
    }

    .t {
        font-size: 24rpx;
        color: #D2D2D2;
    }
}

.text-box {
    .tt {
        font-size: 14px;
        font-weight: 400;
        color: #999999;

        width: 0px;
        flex: 1;
        height: 20px;
        line-height: 20px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
