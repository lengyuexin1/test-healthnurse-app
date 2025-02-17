<template>
    <view class="container">
        <customNavbar pageTitle="使用说明"></customNavbar>
        <view class="conbox">
            <view class="parbox">
                <u-parse :content="content"></u-parse>
                <u-safe-bottom></u-safe-bottom>
            </view>
        </view>
    </view>
</template>

<script>
import { productshowDetail } from '@/api/smart-api'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            title: '使用说明',
            content: ``
        }
    },
    onLoad(options) {
        productshowDetail(options.id).then(res => {
            this.content = res.instructions
        })
    }
}
</script>

<style lang="scss" scoped>
.conbox {
    background: linear-gradient( 180deg, #DFF7EF 0%, transparent 100rpx);

    .parbox{
        padding: 40rpx 30rpx;
        word-break:break-all;
        background: #FFFFFF;
        border-radius: 32rpx;
    }
}
</style>
