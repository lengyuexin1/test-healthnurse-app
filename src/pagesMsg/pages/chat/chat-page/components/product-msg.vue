<template>
    <view>
        <view class="tn-flex-row" @click="clickMsg">
            <image :src="item.attach?.thumb" mode="aspectFill" />
            <view class="tn-flex-column info-box">
                <view class="title">{{ item.attach?.name }}</view>
                <view class="subtitle tn-text-ellipsis-2" v-if="item.attach?.desc">{{ item.attach?.desc }}</view>
                <view class="price">
                    {{ priceFilter }}
                    <span v-if="item.attach?.unitName">/{{ item.attach?.unitName }}</span>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** 产品 */
    item: any
}

interface Events {
    (e: 'clickProductMsg', id: string): void
}

/** 是否为商品 */
const isGoods = computed(() => {
    if (props.item.attach?.templateCode == "131586") {
        return true
    }
    return false
})

/** 价格格式化 */
const priceFilter = computed(() => {
    if (props.item.attach.price) {
        const num = parseInt(props.item.attach?.price) / 100
        const all = Number.isInteger(num) ? num : num.toFixed(2)
        return '￥' + all
    }
    else if (props.item.attach.minPrice) {
        const num = parseInt(props.item.attach?.minPrice) / 100
        const all = Number.isInteger(num) ? num : num.toFixed(2)
        return '￥' + all + '起'
    }
    else {
        return '0'
    }
})

const props = defineProps<Props>()
const emit = defineEmits<Events>()

const clickMsg = () => {
    emit('clickProductMsg', props.item.attach.itemId)
}
</script>

<style lang="scss" scoped>
image {
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
    border: solid 1rpx rgba(0, 0, 0, .1);
}
.info-box {
    flex: 1;

    .title {
        font-size: 28rpx;
        font-weight: bold;
    }
    .subtitle {
        margin-top: 8rpx;
        color: #666666;
        font-size: 26rpx;
    }
    .price {
        margin-top: 16rpx;
        font-weight: bold;
        color: red;
    }
}
</style>
