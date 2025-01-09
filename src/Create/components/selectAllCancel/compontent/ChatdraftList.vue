<template>
    <view class="wrap">
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-2">{{ props.item.title }}</view>
            <view class="time">{{ dateTime(props.item.utcCreated) }}</view>
            <view class="name tn-flex-row">
                <image class="avatar" :src="props.item.accountThumb" mode="aspectFill" v-if="props.item?.accountThumb" />
                <view class="txt">{{ props.item.modifiedName }}</view>
                <view class="category" v-if="props.item.categoryName && props.item.categoryName !== ''">{{ props.item.categoryName }}</view>
            </view>
        </view>
        <view class="left">
            <image class="cover" :src="props.item.cover" mode="aspectFill" />
            <image class="play" :src="getAssetsUrl('/leyou/static/icon/play.png')" mode="aspectFill" v-if="props.item.type == 2" />
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
const dateTime = (time: number) => {
    const datetime = dayjs(time * 1000)
    return datetime.format('YYYY-MM-DD HH:mm:ss')
}

</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.left {
    position: relative;

    .cover {
        width: 240rpx;
        height: 180rpx;
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
        width: 80rpx;
        height: 80rpx;
        margin-left: -40rpx;
        margin-top: -40rpx;
    }
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 372rpx;
    padding: 10rpx 0;
    margin-right: 38rpx;
    .title {
        color: #1A1A1A;
        font-size: 30rpx;
        font-weight: bold;
    }
    .time {
        font-size: 24rpx;
        color: #999999;
        margin-right: 20rpx;
    }

    .name {
        color: #999999;
        font-size: 24rpx;
        align-items: center;

        .avatar {
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
            margin-right: 10rpx;
        }
        
        .category {
            margin-left: 20rpx;
            margin-right: 10rpx;
            padding: 5rpx 20rpx;
            background: #FDEBE7;
            border-radius: 38rpx;
            font-size: 24rpx;
            color: #EA3E1A;
        }
    }
}
</style>
