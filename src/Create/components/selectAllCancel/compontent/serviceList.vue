<template>
    <view class="left">
        <image class="cover" :src="item.item.thumb" mode="aspectFill" />
        <image class="play" :src="getAssetsUrl('/leyou/static/icon/play.png')" mode="aspectFill" v-if="item.item.videoUrl" />
    </view>
    <view class="right tn-flex-column">
        <view class="title tn-text-ellipsis-2">{{ item.item.name }}</view>
        <view class="desc">{{ item.item.desc }}</view>
        <view class="price tn-flex-row">
            <text>{{ priceFormat(item.item.price) }}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { priceFormat } from '@/common/price-format'
import { computed } from "vue"
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

</script>

<style lang="scss" scoped>
.left {
    position: relative;

    .cover {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
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

    .desc {
        color: #999999;
        font-size: 24rpx;
        margin-top: 5rpx;
    }

    .price {
        color: red;
        font-size: 26rpx;
        margin-top: 10rpx;
        align-items: flex-end;

        text {
            font-size: 32rpx;
        }
    }
}
</style>
