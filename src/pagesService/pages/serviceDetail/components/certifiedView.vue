<template>
    <view class="certificate row" v-if="labelist.length > 0">
        <view class="certifiensure">
            <image :src="getAssetsUrl('/platform/ensure.png')" mode="aspectFill"></image>
        </view>
        <view class="certificate-all row" v-for="(laitem, laind) in labelist" :key="laind">
            <view class="certificate-all-icon row">
                <image :src="getAssetsUrl(laitem.icon)" mode=""></image>
            </view>
            <view class="certificate-all-text">{{ laitem.title }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { getAssetsPic } from "@/common/setPicture"

const getAssetsUrl = computed(()=>(url: string) => {
        return getAssetsPic(url);
})
const labelist = ref([
    { id: '3', title: '平台担保', icon: '/leyou/static/sell.svg' },
    { id: '2', title: '质量保障', icon: '/leyou/static/proted.svg' },
    { id: '1', title: '售后无忧', icon: '/leyou/static/notsad.svg' },
])
</script>

<style lang="scss" scoped>
/* 服务标签 ↓ */
.certificate {
    background-color: #FFFFFF;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    border-radius: 24rpx;
    margin: 16rpx 0;
}

.certifiensure {
    image {
        width: 64rpx;
        height: 36rpx;
    }
}

.certificate-all {
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex: 1;
}

.certificate-all-icon {
    justify-content: center;
    align-items: center;
    margin-right: 8rpx;
}

.certificate-all-icon>image {
    width: 36rpx;
    height: 36rpx;
}

.certificate-all-text {
    font-size: 26rpx;
    font-weight: 400;
    color: #666666;
}

/* 服务标签 ↑ */
</style>
