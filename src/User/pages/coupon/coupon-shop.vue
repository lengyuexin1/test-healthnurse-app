<template>
    <view>
        <view class="shopbox row i-center" v-if="props.order?.shopId && props.order?.shopId != 0">
            <image :src="props.order.shopThumb" mode="scaleToFill" />
            <text class="u-line-2">{{ props.order?.shopName }}</text>
        </view>
        <view class="shopbox row i-center" v-else>
            <image :src="getAssetsUrl('/leyou/static/plateform.png')" mode="scaleToFill" />
            <text>平台通用</text>
        </view>
        <view v-for="(item) in props.order?.children" :key="item.id">
            <coupon-convert :order="item" :overdue="props.overdue" :category="props.category" :is_recive="props.is_recive"></coupon-convert>
        </view>
    </view>
</template>

<script setup lang="ts">
import couponConvert from '../../components/coupon/coupon-convert.vue'
import { computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
const props = defineProps({
    order: {
        type: Object,
        default: () => {}
    },
    overdue: {
        type: Boolean,
        default: false
    },
    category: {
        type: [String, Number],
        default: null
    },
    is_recive: { //是否已领取
        type: Boolean,
        default: false
    }
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

</script>

<style lang="scss" scoped>
.shopbox{
    margin: 48rpx 0 24rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #333333;

    image {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
    }

    text{
        margin-left: 12rpx;
    }
}
</style>
