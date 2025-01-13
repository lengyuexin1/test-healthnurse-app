<template>
    <view class="report">
        <view class="info">
            <view class="title">{{ title }}</view>
            <view class="detail">
                <view>处理状态：<text :class="[statusClass]">{{ status }}</text></view>
                <view>举报理由：{{ props.item.reasonTypeName }}</view>
                <view>举报时间：{{ formatDatetime }}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
    item: {
        type: Object,
        default: {}
    }
})

// 标题
const title = computed(() => {
    return `${props.item.typeName}：${props.item.objectName}`
})

// 状态
const status = computed(() => {
    if (props.item.status === 0) {
        return '举报受理中'
    }
    return '已处理'
})

const statusClass = computed(() => {
    if (props.item.status === 0) {
        return { 'waitDeal': true }
    }
    return { 'hasDeal': true }
})

// 时间
const formatDatetime = computed(() => {
    const datetime = dayjs(props.item.utcCreated * 1000)
    return datetime.format('YYYY-MM-DD HH:mm:ss')
})

</script>

<style lang="scss" scoped>
.report {
    .info {
        flex: 1;
        margin-left: 20rpx;

        .title {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
        }
    }

    .detail {
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #666666;
        line-height: 48rpx;

        .waitDeal {
            color: #FF9914 ;
        }
        .hasDeal {
            color: #29C86F;
        }
    }
}
</style>
