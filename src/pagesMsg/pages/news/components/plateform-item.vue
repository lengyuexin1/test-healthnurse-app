<template>
    <view class="service" @tap="clickSession">
        <view class="left" style="position: relative;">
            <image class="left_icon" :src="getAssetsUrl('/leyou/static/sh_logo.png')" />
        </view>
        <view class="right">
            <view class="top">
                <text class="top_txt u-line-1">平台客服</text>
                <text class="top_time"></text>
            </view>
            <view class="bottom">
                <text class="bottom_txt u-line-1">[无新消息]</text>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

interface Events {
    (e: 'gotoPlateformSession'): void
}

const emit = defineEmits<Events>()

const bcNotify = ref()

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const clickSession = () => {
    emit('gotoPlateformSession')
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
