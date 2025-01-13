<template>
    <view class="tn-flex-row">
        <view class="left">
            <image class="cover" :src="item.cover" mode="aspectFill" />
            <image class="play" :src="getAssetsUrl('/leyou/static/icon/play.png')" mode="aspectFill" v-if="item.videoUrl" />
        </view>
        <view class="right tn-flex-column">
            <view class="title">{{ props.item.title }}</view>
            <view class="name tn-flex-row">
                <image class="avatar" :src="props.item.accountThumb" mode="aspectFill" v-if="props.item?.accountThumb" />
                <view>{{ props.item.accountName }}</view>
                <view class="time" v-if="props.item.publicTime">{{ dateTime(props.item.publicTime) }}</view> 
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
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

// 时间
const dateTime = (time: string) => {
    const datetime = dayjs(time)
    return datetime.format('MM-DD') + '发布'
}

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

    .desc {
        color: #999999;
        font-size: 24rpx;
        margin-top: 5rpx;
    }

    .name {
        color: #666666;
        font-size: 24rpx;

        .avatar {
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            margin-right: 10rpx;
        }
        .time {
            font-size: 24rpx;
            color: #999999;
            margin-left: 20rpx;
        }
    }
}
</style>
