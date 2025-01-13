<template>
    <div class="new_peop row i-center">
        <div class="new_draw column j-center">
            <image src="https://xcpublic.oss-cn-shenzhen.aliyuncs.com/webapplet/homemaking/new_bg11.png" mode="scaleToFill" />
        </div>
        <div class="new_more row i-center">
            <!-- <div class="new_xiang"></div> -->
            <!-- <div class="new_xiang">新人专享</div>
            <div class="new_price">先领券再下单</div> -->
            <div class="new_btn row i-center j-center" @click="getCoupon"><text>点击领取</text></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'couponGet', //优惠券领取
    methods: {
        getCoupon() {
            this.$emit('getCoupon')
        }
    }
}
</script>

<style lang="scss" scoped>
.new_peop{
    position: relative;
    margin-top: -26rpx;
    height: 126rpx;

    .new_draw{
        position: absolute;
        width: 750rpx;
        height: 126rpx;

        image{
            width: 750rpx;
            height: 126rpx;
        }
    }
    .new_more{
        width: 750rpx;
        height: 100rpx;
        position: absolute;
        left: 0;
        bottom: 0;

        .new_xiang{
            font-size: 36rpx;
            font-weight: bold;
            line-height: 52rpx;
            color: #BE4A37;
            margin-left: 50rpx;
        }

        .new_price{
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
            margin-left: 30rpx;
            // position: relative;
            display: flex;
            align-items: center;

            &::before{
                content:'';
                border-left: 2rpx solid #EFDAC1;
                display: block;
                margin-right: 30rpx;
                height: 40rpx;
            }
        }

        .new_btn{
            width: 172rpx;
            height: 68rpx;
            background: linear-gradient(90deg, #FF6E07 0%, #FF4575 100%);
            border-radius: 34rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #FFFFFF;
            margin-right: 30rpx;
            margin-left: auto;
        }
    }
}
</style>
