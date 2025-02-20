<template>
    <view class="container">
        <customNavbar pageTitle="问题详情"></customNavbar>
        <view class="conbox">
            <view class="parbox">
                <view class="partit">{{ problemInfo.name }}</view>
                <u-parse :content="problemInfo.desc"></u-parse>
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
            problemInfo: {}
        }
    },
    onLoad(options) {
        productshowDetail(options.pid).then(res => {
            this.problemInfo = res.questionList.find(it => it.id == options.qid)
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

        .partit{
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
            padding-bottom: 54rpx;
            position: relative;
            // position: absolute;
            // left: 0;
            // right: 0;
            // background-color: #FFFFFF;

            &::after{
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 30rpx;
                border-bottom: 2rpx solid #F2F2F2;
            }
        }
    }
}
</style>
