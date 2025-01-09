<template>
    <view>
        <view class="tn-flex-row" @click="clickMsg">
            <image :src="item.attach?.thumb" />
            <view class="tn-flex-column info-box">
                <view>{{ item.attach?.name }}</view>
                <view class="subtitle" v-if="item.attach?.desc">{{ item.attach?.desc }}</view>
                <view class="price">
                    ￥{{ item.attach?.price / 100 }}
                    <template v-if="item.attach?.unitName">
                        <span>/{{ item.attach?.unitName }}</span>
                    </template>
                </view>
            </view>
        </view>
        <view class="serialNo">订单号：{{ item.attach?.serialNo }}</view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** 订单 */
    item: any
}

interface Events {
    (e: 'clickOrderMsg', orderId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Events>()

/** 是否为商品 */
const isGoods = computed(() => {
    if (props.item.attach?.templateCode == "131586") {
        return true
    }
    return false
})

const clickMsg = () => {
    emit('clickOrderMsg', props.item.attach.orderId)
}
</script>

<style lang="scss" scoped>
image {
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
}
.info-box {
    flex: 1;

    .subtitle {
        color: #666666;
        font-size: 26rpx;
    }
    .price {
        margin-top: 16rpx;
        color: red;
    }
}

.serialNo {
    margin-top: 10rpx;
    color: #999999;
    font-size: 24rpx;
}
</style>
