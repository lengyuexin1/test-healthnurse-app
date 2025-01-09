<template>
    <view>
        <view class="header"></view>
        <view class="img-box">
            <image class="home-img" :src="getAssetsUrl('/leyou/static/consumptionLogo.png')" mode="widthFix"></image>
        </view>
        <view class="text">加载中...</view>
    </view>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import { onLoad, onShow } from "@dcloudio/uni-app"
import { routeTable } from "@/events/jump-events"
import { gotoIndex } from '@/routes/public-routes'

interface Data {
    backIndex: number
}

const data = reactive<Data>({
    backIndex: 0
})

onLoad((option:any) => {
    if (option.type == 'linkText') {
        routeTable[option.linkMark]({
            routeFlag: option.linkMark,
            id: option.id ?? '',
            bizType: option.bizType
        })
        setTimeout(() => {
            data.backIndex = 2
        }, 200)
    }
    else {
        gotoIndex()
    }
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onShow(() => {
    if (data.backIndex == 2) {
        gotoIndex()
    }
})

</script>

<style>
page{
    background: #F8F9F9;
}
</style>
<style lang="scss" scoped>
.header{
    //background: linear-gradient(180deg, #DFF7EF 0%, #F8F9F9 100%);
    height: 420rpx;
    width: 100%;
}
    .img-box{
        margin: 100rpx auto 0 auto;
        width: 160rpx;
        height: 160rpx;
    }
    .home-img{
        width: 160rpx;
        height: 160rpx;
    }
    .text{
        margin: 30rpx 0;
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
        color: #909090;
    }
</style>
