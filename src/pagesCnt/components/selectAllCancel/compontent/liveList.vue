<template>
    <view class="tn-flex-row">
        <view class="left tn-flex-row">
            <view style="position: relative;">
                <image :class="['avatar', isLive ? 'active' : '']" :src="item?.authorAvatar" mode="aspectFill" />
                <view class="status tn-flex-center-center" v-if="isLive">直播中</view>
            </view>
            <text class="name">{{ item.authorName || '--' }}</text>
        </view>
        <view class="right">
            <TnButton width="112rpx" height="50rpx" font-size="24rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn" v-if="item.isFollow == 0 && !isSelf">
                关注
            </TnButton>
            <TnButton width="112rpx" height="50rpx" font-size="24rpx" bg-color="#FFE9E9" text-color="#EA3E1A" :debounce="true" bold @tap="clickBtn" v-else-if="item.isFollow == 1 && !isSelf">
                已关注
            </TnButton>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import BCNotify from '@/components/notify/index.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { liveunfollow, livefollow } from '@/api/live-api'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const bcNotify = ref()

/** @returns {boolean} 是否在直播 */
const isLive = computed(() => {
    if (props.item.isLive === 1) {
        return true
    }
    return false
})

/** @returns {boolean} 是否本人 */
const isSelf = computed(() => {
    if (props.item.isSelf === 1) {
        return true
    }
    return false
})

const clickBtn = () => {
    if (props.item.isFollow == 0) {
        livefollow({ accountId: props.item.accountId }).then((res) => {
            props.item.isFollow = 1
        }).catch((err) => {
            bcNotify.value.show((err.message))
        })
    }
    else {
        liveunfollow({ accountId: props.item.accountId }).then((res) => {
            props.item.isFollow = 0
        }).catch((err) => {
            bcNotify.value.show((err.message))
        })
    }
}

</script>

<style lang="scss" scoped>
.left {
    flex: 1;
    align-items: center;

    .avatar {
        width: 76rpx;
        height: 76rpx;
        border-radius: 50%;

        &.active {
            border: solid 3rpx #EA3E1A;
        }
    }

    .status {
        position: absolute;
        left: 0;
        bottom: -5rpx;
        width: 72rpx;
        height: 28rpx;
        font-size: 18rpx;
        color: #FFFFFF;
        background: #EA3E1A;
        border-radius: 14rpx;
    }

    .name {
        margin-left: 20rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: #333333;
    }
}

.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 20rpx;
}
</style>
