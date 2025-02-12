<template>
    <view class="service" @tap="clickActivity">
        <view class="left" style="position: relative;">
            <image class="left_icon" :src="getAssetsUrl('/leyou/static/message/message_icon_activity.png')" />
            <TnBadge
                :value="props.activitySession.unread"
                type="danger"
                size="40rpx"
                :max="9"
                :absolute-position="{ top: '15rpx', right: '8rpx' }"
                absolute
                absolute-center
                v-if="props.activitySession.unread > 0"
            />
        </view>
        <view class="right">
            <view class="top">
                <text class="top_txt u-line-1">{{ props.activitySession.lastMsg?.fromNick }}</text>
                <text class="top_time">{{ dateTime }}</text>
            </view>
            <view class="bottom">
                <text class="bottom_txt u-line-1">{{ props.activitySession.lastMsg?.attach?.title ?? '[无新消息]' }}</text>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import dayjs from 'dayjs'
import { getAssetsPic } from '@/common/setPicture'
import { handleEnvAccount } from '@/utils/handleEnv'

//============================
/** 接口定义 */
//============================
interface Props {
    /** 活动会话 */
    activitySession: any
}

interface Events {
    (e: 'gotoNoticeList', to: string, name: string): void
}

//============================
/** 属性定义 */
//============================
const props = defineProps<Props>()
const emit = defineEmits<Events>()

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const dateTime = computed(() => {
    if (props.activitySession.updateTime) {
        const datetime = dayjs(Number(props.activitySession.updateTime))
        const now = dayjs().startOf('d')
        if (datetime.isAfter(now)) {
            //今天
            return datetime.format('HH:mm')
        }
        return datetime.format('MM-DD HH:mm')
    }
    return ''
})

const clickActivity = () => {
    emit('gotoNoticeList', handleEnvAccount(props.activitySession.to), props.activitySession.lastMsg.fromNick)
}

</script>

<style lang="scss" scoped>
.service {
    height: 160rpx;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border-radius: 16rpx;

    &:last-child {
        border-bottom: none;
    }

    .left {
        width: 96rpx;
    }

    .right {
        flex: 1;
        height: 90rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-left: 28rpx;
    }

    .left_icon {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        display: block;
    }

    .top,
    .bottom {
        width: 535rpx;
        // height: 45rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .top_txt {
        width: 310rpx;
        font-size: 29rpx;
        font-weight: bold;
        color: #333333;
    }

    .top_time {
        width: 280rpx;
        font-size: 26rpx;
        color: #D2D2D2;
        text-align: right;
    }

    .bottom_txt {
        font-size: 24rpx;
        color: #999999;
        margin-top: 10rpx;
    }
}
</style>
