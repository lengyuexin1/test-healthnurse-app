<template>
    <view class="container tn-flex-row" @tap="clickItem">
        <view class="status-wrap">
            <view class="date">{{ dateTime(props.item.utcCreated) }}</view>
            <view class="unhandle" v-if="props.item.isHandled == 0">待处理</view>
            <view class="handle" v-if="props.item.isHandled == 1">已处理</view>
        </view>
        <view class="item">问题类型：{{ props.item.typeName }}</view>
        <view class="item">问题原因：{{ props.item.reason }}</view>
    </view>
</template>

<script setup lang="ts">
import { gotoFeedbackDetail } from '@/routes/user-routes'
import dayjs from "dayjs"

interface Props {
    item: any
}

const props = defineProps<Props>()

const clickItem = () => {
    gotoFeedbackDetail({ id: props.item.id })
}

// 时间
const dateTime = (time: number) => {
    const datetime = dayjs(time * 1000)
    return datetime.format('YYYY/MM/DD')
}

</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 30rpx;
    margin: 24rpx 24rpx 0rpx 24rpx;
    background-color: white;
    border-radius: 24rpx;

    .status-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        justify-content: space-between;
        margin-bottom: 4rpx;
        font-size: 28rpx;
        color: #333333;
        
        .date {
            margin-bottom: 20rpx;
            font-weight: bold;
            color: #333333;
        }

        .handle {
            color: #29C86F;
        }
        
        .unhandle {
            color: #FF1010;
        }
    }

    .item {
        font-size: 24rpx;
        color: #666666;
        line-height: 36rpx;
        margin-top: 12rpx;
    }
}
</style>
