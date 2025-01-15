<template>
    <view class="container">
        <customNavbar pageTitle="添加设备"></customNavbar>
        <view class="contents">
            <image class="left_img" :src="sucdImg" mode="scaleToFill" />
            <view class="bd">绑定成功</view>
            <view class="sucText">已完成设备绑定</view>
            <view class="btns">
                <TnButton width="100%" @click="gotoStart" height="70" text-color="#fff" font-size="32rpx" bg-color="#111214"
                    border-color="#E3E3E3">立即测量体温</TnButton>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import { getAssetsPic } from '@/common/setPicture'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { gotoStartTepTow } from "@/routes/active-routes"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'

const sucdImg = getAssetsPic("/agency/succed.svg") 
const gotoStart = () => {
    gotoStartTepTow()
}

</script>

<style lang="scss" scoped>
.contents {
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
    margin: 30rpx;
    border-radius: 32rpx;

    .left_img {
        width: 160rpx;
        height: 160rpx;
        margin: 100rpx 0 40rpx 0;
    }

    .bd {
        font-weight: 600;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .sucText {
        font-size: 28rpx;
        color: #999999;
        margin-bottom: 40rpx;
    }

    .btns {
        width: 70%;
        padding-bottom: 120rpx;

        .btnOne {
            height: 84rpx;
            margin-bottom: 30rpx;
            font-size: 32rpx;
        }

        .btnTwo {
            height: 84rpx;
            color: #919191;
        }
    }
}</style>