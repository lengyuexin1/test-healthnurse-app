<template>
    <view class="newcomer_wrap">
        <image class="icon-bg" :src="getAssetsUrl('/leyou/icon/newcomer-bg.png')" mode="scaleToFill" />
        
        <view class="title tn-flex-center-between">
            <view class="left">限时专属红包 一键包邮</view>
            <view class="right tn-flex-row" @tap="clickMore">更多<TnIcon name="right" /></view>
        </view>
        <view class="list tn-flex-center-around">
            <view class="coupon">
                <image class="coupon-bg" :src="getAssetsUrl('/leyou/icon/coupon-bg.png')" mode="scaleToFill" />
                <view class="content">
                    <view class="price tn-text-bold"><text class="unit">￥</text>8</view>
                    <view class="time"><TnCountDown :time="300" text-color="#F46603" separator-color="#F46603" /></view>
                    <view class="txt">后失效</view>
                    <view class="btn tn-text-bold">去使用</view>
                </view>
            </view>
            <view class="wrap tn-flex-column">
                <image class="img" src="@/static/live/addCart.png" mode="scaleToFill" />
                <text class="txt">2323</text>
            </view>
            <view class="wrap tn-flex-column">
                <image class="img" src="@/static/live/addCart.png" mode="scaleToFill" />
                <text class="txt">2323</text>
            </view>
            <view class="wrap tn-flex-column">
                <image class="img" src="@/static/live/addCart.png" mode="scaleToFill" />
                <text class="txt">2323</text>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { getAssetsPic } from '@/common/setPicture'
// import { gotoNewcomerWelfare } from '@/routes/goods-routes'

interface Props {

}

const props = defineProps<Props>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

// 更多
const clickMore = () => {
    // gotoNewcomerWelfare()
}

</script>
  
<style lang="scss" scoped>
.newcomer_wrap {
    position: relative;
    margin-bottom: 30rpx;

    .icon-bg {
        width: 100%;
        height: 314rpx;
    }
    .title {
        width: 100%;
        position: absolute;
        left: 0;
        top: 60rpx;
        color: #FFF4BB;
        padding: 0 22rpx;

        .left {
            font-size: 26rpx;
        }
        .right {
            font-size: 22rpx;
        }
    }
    
    .list {
        width: 100%;
        height: 180rpx;
        position: absolute;
        left: 0;
        bottom: 28rpx;
        color: #FFF4BB;
        padding: 0 5rpx;

        .coupon,
        .wrap {
            position: relative;
            width: 156rpx;
            height: 180rpx;
        }
        .coupon-bg {
            width: 156rpx;
            height: 180rpx;
        }
        .content {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            color: #F46603;
            text-align: center;

            .unit,
            .time,
            .txt {
                font-size: 20rpx;
                font-weight: 400;
            }
            .price {
                font-size: 40rpx;
            }
            .btn {
                margin-top: 28rpx;
                font-size: 24rpx;
            }
        }
        
        .wrap {
            background: #FFFFFF;
            border-radius: 12rpx;

            .img {
                margin-bottom: 10rpx;
                width: 100%;
                height: 122rpx;
                border-radius: 12rpx 12rpx 0 0;
            }
            .txt {
                text-align: center;
                font-size: 22rpx;
                color: #E66F41;
            }
        }
    }
}
</style>
