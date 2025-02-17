<template>
    <view class="container">
        <view class="sceneimg">
            <u-image width="750rpx" :src="info.cover" mode="widthFix"></u-image>
            <view class="sceneplan row i-center j-center" v-if="info.isPlan" @click="linkMess">
                <u-image width="32rpx" height="32rpx" :src="getAssetsUrl('/channel/scene/message.svg')" mode="aspectFit"></u-image>
                <text>沟通设计方案</text>
                <u-image width="32rpx" height="32rpx" :src="getAssetsUrl('/channel/scene/arrow-right.svg')" mode="aspectFit"></u-image>
            </view>
        </view>
        <view class="scenetit">{{info.title}}</view>
        <view class="scenedesc">{{info.desc}}</view>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import { gotoIMSessionChat } from "@/route/message-routes"
export default {
    data() {
        return { }
    },
    props: {
        info: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    computed: {
        /** @returns {string} */
        getAssetsUrl() {
            return (url) => {
                return getAssetsPic(url)
            }
        }
    },
    methods: {
        // 跳转平台客服
        linkMess() {
            gotoIMSessionChat({ type: 1 })
        }
    }
}
</script>

<style scoped lang="scss">
.sceneimg{
    position: relative;

    .sceneplan{
        width: 256rpx;
        height: 68rpx;
        background: rgba(255,255,255,0.8);
        border: 2rpx solid rgba(255,255,255,0.8);
        border-radius: 8rpx;
        position: absolute;
        right: 24rpx;
        bottom: 40rpx;

        text{
            font-size: 24rpx;
            font-weight: 400;
            color: #000000;
            margin: 0 12rpx 0 4rpx;
        }
    }
}
.scenetit{
    font-size: 40rpx;
    font-weight: 600;
    color: #000000;
    padding: 24rpx 40rpx 36rpx;
}
.scenedesc{
    padding: 0 40rpx 50rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #4D4E50;
}
</style>
