<template>
    <view class="tn-flex-center-center" @tap="showImg">
        <image :src="item.attach?.url" mode="aspectFill" />
    </view>
</template>

<script setup lang="ts">

interface Props {
    /** 数据 */
    item: any
}

const props = defineProps<Props>()

const showImg = () => {
    uni.previewImage({
        indicator: "none",
        urls: [props.item.attach.url],
        complete: res => {
            console.log(res)
        }
    })
}
</script>

<style>
image {
    width: 250rpx;
    height: 250rpx;
    border-radius: 16rpx;
}
</style>
