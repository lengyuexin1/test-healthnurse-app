<template>
    <customNavbar pageTitle="空气净化器"></customNavbar>
    <view class="kuang">
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
        <view class="bubble"></view>
    </view>
    <view class="bigBox">
        <view class="boxyq">
            <view class="topTitle">室内综合空气质量</view>
            <view class="haos">空气优</view>
            <view class="temp">
                <view class="temnum">温度 22°C</view>
                <view>湿度 59%</view>
            </view>
        </view>
    </view>
    <view class="pmz">PM 2.5（μg/m³）</view>
    <view class="btns">
        <view class="btnOne" :class="{ 'activeBack': showBack == true }" @click="openOn(1)">
            <img class="imgBox" :src="getAssetsUrl('/device/home/airoff.svg')" alt="">
            <view class="btnText">开启</view>
        </view>
        <view class="btnOne" :class="{ 'activeBack': showBack == false }" @click="openOn(2)">
            <img class="imgBox" :src="getAssetsUrl('/device/home/airon.svg')" alt="">
            <view class="btnText">关闭</view>
        </view>
    </view>
</template>
   
<script setup lang="ts">
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
const showBack = ref(false)

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const openOn = (number: any) => {
    showBack.value = !showBack.value
}

</script>
   
<style scoped lang="scss">
page {
    background: #fff;
}

.btns {
    display: flex;
    justify-self: center;
    flex-direction: column;
    align-items: center;
    margin-top: 130rpx;

    .btnOne {
        display: flex;
        width: 80%;
        align-items: center;
        border-radius: 110rpx 110rpx 110rpx 110rpx;
        height: 130rpx;
        margin-bottom: 10rpx;
        padding-left: 50rpx;
    }

    .activeBack {
        background: #F5F5F5;
    }

    .btnText {
        margin-left: 30rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #1A1A1A;
    }

    .imgBox {
        width: 80rpx;
        height: 80rpx;
    }
}

.kuang {
    position: fixed;
    bottom: 80%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    // background-image: linear-gradient(180deg, rgb(78, 168, 241), rgb(37, 91, 241));

}

.bubble {
    position: absolute;
    border-radius: 50%;
    border: 2px solid #8FE2B3;
    box-shadow: inset 0 0 8px #8FE2B3;
    background: #8FE2B3;
    animation: flutter 20s infinite;
    opacity: 0;
}

@keyframes flutter {
    0% {
        transform: translateX(0);
        bottom: -100px;
        opacity: 1;
    }

    50% {
        transform: translateX(100px);
        opacity: 0.5;
    }


    100% {
        transform: translateX(0px);
        bottom: 15%;
        // opacity: 0;

    }
}

.bubble:nth-child(1) {
    left: -10%;
    width: 22rpx;
    height: 22rpx;
    animation-duration: 9s;
    animation-delay: 0.1s;
}

.bubble:nth-child(2) {
    left: 15%;
    width: 14rpx;
    height: 14rpx;
    animation-duration: 6s;
    animation-delay: 1.5s;

}

.bubble:nth-child(3) {
    left: 20%;
    width: 22rpx;
    height: 22rpx;
    animation-duration: 10s;



}

.bubble:nth-child(4) {
    left: 30%;
    width: 12rpx;
    height: 12rpx;
    animation-duration: 5.5s;
    animation-delay: 1.5s;

}

.bubble:nth-child(5) {
    left: 40%;
    width: 22rpx;
    height: 22rpx;
    animation-duration: 12s;



}

.bubble:nth-child(6) {
    left: 50%;
    width: 16rpx;
    height: 16rpx;
    animation-duration: 6s;
    animation-delay: 1s;

}

.bubble:nth-child(7) {
    left: 60%;
    width: 12rpx;
    height: 12rpx;
    animation-duration: 8s;
    animation-delay: 1s;

}

.bubble:nth-child(8) {
    left: 65%;
    width: 22rpx;
    height: 22rpx;
    animation-duration: 15s;

}

.bubble:nth-child(9) {
    left: 80%;
    width: 12rpx;
    height: 12rpx;
    animation-duration: 9s;
    animation-delay: 0.5s;

}

.bubble:nth-child(10) {
    left: 100%;
    width: 18rpx;
    height: 18rpx;
    animation-duration: 12s;

}

.bigBox {
    display: flex;
    margin-top: 50rpx;
    justify-content: center;

    .boxyq {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
    }

    .topTitle {
        font-size: 36rpx;
        color: #000404;
    }

    .haos {
        font-weight: 600;
        font-size: 64rpx;
        color: #000404;
    }

    .temp {
        display: flex;
        font-size: 28rpx;
        color: #000404;

        .temnum {
            margin-right: 20rpx;
            padding-right: 20rpx;
            border-right: 2rpx solid #000;
        }
    }
}

.boxyq {
    width: 500rpx;
    height: 500rpx;
    border-radius: 50%;
    background: radial-gradient(circle, #8FE2B3 0%, #fff 100%);
    box-shadow: 0 0 10px rgba(184, 242, 215, 0.5);
}

.pmz {
    font-weight: 600;
    font-size: 40rpx;
    color: #080000;
    text-align: center;
    margin-top: 50rpx;
}
</style>
  