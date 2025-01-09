<template>
    <view>
        <coupon-convert :order="props.order" :overdue="props.overdue" :category="props.category" :is_recive="props.is_recive"></coupon-convert>
    </view>
</template>

<script setup lang="ts">
import couponConvert from '../../components/coupon/coupon-convert.vue'

interface Props {
    order: {
        type: object,
        default: () => { }
    },
    overdue: boolean
    category: any,
    is_recive: boolean //是否已领取
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
</style>
