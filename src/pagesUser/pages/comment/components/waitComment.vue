<template>
    <view class="wrap tn-flex-row">
        <view class="left">
            <image class="cover" :src="props.item?.shopList[0]?.entityList[0]?.image" mode="aspectFill" />
        </view>
        <view class="right tn-flex-column">
            <view class="title tn-text-ellipsis-2">{{ props.item?.shopList[0]?.entityList[0]?.title || '--' }}</view>
            <view class="time" v-if="item?.utcVisitStart > 0">服务时间: {{ formatTime(item?.utcVisitStart) }}</view>
            <view class="btn">
                <TnButton shape="round" width="145rpx" height="54rpx" font-size="24rpx" plain border-color="#EA3E1A" text-color="#EA3E1A" @tap="clickBtn">
                    去评价
                </TnButton>
            </view>
        </view>
    </view>
    
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import dayjs from 'dayjs'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

const formatTime = (date: any) => {
    const datetime = dayjs(date * 1000)
    return datetime.format('YYYY/MM/DD HH:mm:ss')
}

const clickBtn = () => {
    emit('clickToComment', props.item.kind, props.item.id)
}

const emit = defineEmits(["clickToComment"])

</script>

<style lang="scss" scoped>
.wrap {
    margin: 24rpx;
    padding: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;
}
.left {
    .cover {
        width: 140rpx;
        height: 140rpx;
        border-radius: 8rpx;
        border: solid 1rpx #F2F2F2;
    }
}

.right {
    flex: 1;
    padding: 10rpx 0;
    margin-left: 20rpx;

    .title {
        color: #1A1A1A;
        font-size: 30rpx;
        font-weight: bold;
    }

    .time {
        color: #999999;
        font-size: 24rpx;
        margin-top: 12rpx;
    }
    .btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 40rpx;
    }
}
</style>
