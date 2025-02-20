<template>
    <view class="container">
        <customNavbar pageTitle="使用说明"></customNavbar>
        <view class="conbox">
            <view class="parbox">
                <view v-html="data.content"></view>
<!--                <u-safe-bottom></u-safe-bottom>-->
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { productshowDetail } from '@/api/smart-api'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { reactive } from "vue"
import { onLoad } from "@dcloudio/uni-app"

interface Data {
    title: string,
    content: string
}

const data = reactive<Data>({
    title: '',
    content: ''
})
onLoad((options) => {
    productshowDetail(options.id).then(res => {
        data.content = res.instructions
    })
})
</script>

<style lang="scss" scoped>
.conbox {
    background: linear-gradient(180deg, #DFF7EF 0%, transparent 100rpx);

    .parbox {
        padding: 40rpx 30rpx;
        word-break: break-all;
        background: #FFFFFF;
        border-radius: 32rpx;
    }
}
</style>
