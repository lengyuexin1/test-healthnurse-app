<template>
    <view class="notice-item tn-flex-column">
        <view class="time tn-flex-center-center">{{ dateTime }}</view>
        <view class="main tn-flex-column">
            <TnBadge :dot="isUnread" type="danger" size="15" :absolute="false" :absolute-position="{ top: '-55rpx' }">
                <view class="title">{{ msg.title }}</view>
            </TnBadge>
            <view class="content">{{ msg.content }}</view>
            <view class="btn tn-flex-center-between" @tap="clickNotice" v-if="msg.type == 'linkText'">
                <view :class="[disabled ? 'disabled' : '']">查看详情</view>
                <TnIcon name="right" color="#999999" />
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import { ROUTE_FLAG, routeTable } from '@/events/jump-events'
import BCNotify from '@/components/notify/index.vue'

//============================
/** 接口定义 */
//============================
interface Props {
    item: any
}

const props = defineProps<Props>()

const bcNotify = ref()

const msg = computed(() => {
    return props.item.attach || {}
})

console.log(props.item)


const isUnread = computed(() => {
    if (props.item.status === 'unread') {
        return true
    }
    return false
})

const dateTime = computed(() => {
    const datetime = dayjs(props.item.time)
    const now = dayjs().startOf('d')
    if (datetime.isAfter(now)) {
        //今天
        return datetime.format('HH:mm:ss')
    }
    return datetime.format('MM-DD HH:mm:ss')
})

// 对未注册的路由表示进行禁用
const disabled = computed(() => {
    return msg.value.linkMark !== undefined && !ROUTE_FLAG.includes(msg.value.linkMark as any)
})

const clickNotice = () => {
    console.log(msg.value)

    const fun = routeTable[msg.value.linkMark]
    console.log(fun)
    if (!fun) {
        bcNotify.value.error('当前路由不支持跳转')
        return
    }

    fun(msg.value)
}

</script>

<style lang="scss" scoped>
.time {
    height: 90rpx;
    font-size: 24rpx;
    color: #666666;
}
.main {
    padding: 30rpx;
    margin: 0 20rpx;
    border-radius: 15rpx;
    background-color: white;
    .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }
    .content {
        padding: 25rpx 0 0 0;
        font-size: 28rpx;
        color: #666666;
        word-break: break-all;
    }
    .btn {
        font-size: 28rpx;
        color: #292C33;
        margin-top: 30rpx;
        padding: 30rpx 0 0 0;
        border-top: solid 1rpx #F1F2F6;
    }
    .disabled {
        color: #999999;
    }
}

</style>
