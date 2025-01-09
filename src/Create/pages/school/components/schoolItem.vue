<template>
    <view class="wrap tn-flex-row" @tap="clickItem">
        <view class="left">
            <image class="cover" :src="item.cover" mode="aspectFill" />
            <image class="play" :src="getAssetsUrl('/leyou/static/icon/play.png')" mode="aspectFill" v-if="isVideo" />
        </view>
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-2">{{ props.item.title }}</view>
            <view class="name tn-flex-row">
                <view>{{ props.item.cntView }}人看过</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

/** @returns{boolean} 是否是视频文件 */
const isVideo = computed(() => {
    return props.item.type === 1
})

const clickItem = () => {
    emit('clickItem', props.item.id, props.item.title, props.item.content)
}

const emit = defineEmits(['clickItem'])

</script>

<style lang="scss" scoped>
.wrap {
    background-color: #FFFFFF;
    padding: 24rpx;
    margin: 24rpx;
    border-radius: 16rpx;
}

.left {
    position: relative;

    .cover {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        border: solid 1rpx #F2F2F2;
    }

    .thumb {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        border: solid 1rpx #F2F2F2;
    }

    .play {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60rpx;
        height: 60rpx;
        margin-left: -30rpx;
        margin-top: -30rpx;
    }
}

.right {
    flex: 1;
    padding: 10rpx 0;
    margin-left: 20rpx;
    justify-content: space-between;

    .title {
        color: #1A1A1A;
        font-size: 30rpx;
        font-weight: bold;
    }

    .name {
        color: #666666;
        font-size: 24rpx;
    }
}
</style>
