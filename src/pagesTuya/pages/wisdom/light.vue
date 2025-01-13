<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'照明开关'"></bc-page-navbar>
        </template>
        <bc-device-light></bc-device-light>
        <!-- <view class="bigBox">
            <view class="lightBox">
                <view v-for="(item, index) in listNum" class="itemCs" :class="item.state == 1 ? 'colorcs' : ''"
                    @click="trunOp(item, index)">
                    <image v-if="item.state == 1" class="imgBox" :src="getAssetsUrl('/device/home/ligop.svg')" alt="" />
                    <image v-else class="imgBox" :src="getAssetsUrl('/device/home/lighu.svg')" alt="" />
                    <view>{{ item.name }}</view>
                </view>
            </view>
            <view class="midbox">
                <view class="headcs">按键设置</view>
                <view @click="goName">
                    <vew class="entcs">点击进入</vew>
                    <TnIcon name="right" color="#6E6E6E" size="28" :bold="true" />
                </view>
            </view>
            <view class="lastBox">
                <view class="listBox" v-for="(item, index) in listNum" :key="index" @click="trunOp(item, index)">
                    <view class="smalcs">
                        <image class="imgBox" :src="getAssetsUrl('/device/home/lighu.svg')" alt="" />
                        <view>{{ item.name }}</view>
                    </view>
                    <image v-if="item.state == 1" class="imgBox" :src="getAssetsUrl('/device/home/ligtred.svg')" alt="" />
                    <image v-else class="imgBox" :src="getAssetsUrl('/device/home/ligthed.svg')" alt="" />
                </view>
            </view>
        </view> -->
    </z-paging>
</template>
   
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'

</script>
   
<style scoped lang="scss">

</style>
  