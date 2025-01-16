<template>
    <view class="container">
        <z-paging ref="paging" :auto="true">
            <template #top>
                <PageTopbg :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="pageTitle"></bc-page-navbar>
            </template>

            <!-- <customNavbar :pageTitle="pageTitle"></customNavbar> -->
            <view class="serbox">
                <view class="serli" v-for="(item, index) in scenServerList" :key="index" @click="linkGo(item)">
                    <image :src="getAssetsUrl(item.img)" class="imgBox"></image>
                    <view class=" column i-center">
                        <view class="sertitle">{{ item.name }}</view>
                        <view class="serbtn">点击进入</view>
                    </view>
                </view>
            </view>
            <u-safe-bottom></u-safe-bottom>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { getAssetsPic } from "@/common/setPicture"
import { scenList, linkNurse } from "./scenUtils"
import { ref, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

const scenServerList: any = ref([])
const pageTitle = ref('')

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((options: any) => {
    if (options.type === "1") {
        pageTitle.value = "场景服务"
        scenServerList.value = scenList
    } else {
        const linkList = [
            { id: 111, name: '医疗机构', img: '/shop/newshop/smart-link-1.png' },
            { id: 112, name: '药店机构', img: '/shop/newshop/smart-link-2.png' },
            { id: 113, name: '民政社区', img: '/shop/newshop/smart-link-3.png' },
            { id: 114, name: '紧急出行', img: '/shop/newshop/smart-link-4.png' },
            { id: 115, name: '保险机构', img: '/shop/newshop/smart-link-5.png' }
        ]
        scenServerList.value = linkList
        pageTitle.value = "智护链接"
    }
})
const linkGo = (item) => {
    item.id < 100 && linkNurse(item)
    item.id > 100 && uni.showToast({
        title: "敬请期待",
        icon: "none"
    })
}
</script>

<style lang="scss" scoped>
.serbox {
    padding: 20rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;

    .serli {
        box-sizing: border-box;
        height: 370rpx;
        background: #FFFFFF;
        border-radius: 12rpx;
        overflow: hidden;

        .sertitle {
            margin-top: 16rpx;
            font-weight: bold;
            font-size: 28rpx;
            color: #060606;
        }

        .serbtn {
            margin-top: 16rpx;
            width: 144rpx;
            height: 50rpx;
            background: #EAF8F0;
            border-radius: 26rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #29C86F;
            line-height: 50rpx;
            text-align: center;
        }
    }
}
.imgBox {
    width: 100%;
    height: 224rpx;
}
</style>
