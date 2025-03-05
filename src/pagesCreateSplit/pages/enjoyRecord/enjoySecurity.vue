<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;" :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'安全保障'" :bgColor="'#FFFFFF'"></bc-page-navbar>
            </template>
            <view class="page_bg_box">
                <image
                    class="page_bg"
                    :src="getAssetsUrl('/leyou/create/jurisdictionBG.png')"
                    mode="scaleToFill"
                />
            </view>
            
            <view class="page_content">
                <view class="jurisdiction_box">
                    <view class="jurisdiction_title">权限设置</view>
                    <view class="jurisdiction_item" v-for="item in data.jurisdictionList" :key="item.id" @click="jurisdictionFun(item)">
                        <view class="item_text">
                            {{ item.name }}
                        </view>
                        <TnIcon name="right" color="#999999" size="24rpx"></TnIcon>
                    </view>
                </view>
            </view>
            
            


            
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { gotoenjoyJurisdiction } from '@/routes/create-routes'


interface Data {
    jurisdictionList: any,
}

const data = reactive<Data>({
    jurisdictionList: [
        { id: 1, name: '记录权限' },
        { id: 2, name: '分享与下载权限' },
        { id: 3, name: '邀请权限' },
    ]
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
})

onShow(() => {
})

const jurisdictionFun = (item:any) => {
    console.log('item',item);
    item.id == 1 && gotoenjoyJurisdiction({ type: 1 })
    item.id == 2 && gotoenjoyJurisdiction({ type: 2 })
    item.id == 3 && gotoenjoyJurisdiction({ type: 3 })
}


</script>

<style lang="scss" scoped>
.page_bg_box{
    position: relative;
    width: 100%;
    height: 400rpx;
    .page_bg{
        position: absolute;
        width: 100%;
        height: 490rpx;
        top: 0;
        left: 0;
        z-index: -1;
    }
}

.page_content{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    .jurisdiction_box{
        padding: 36rpx 30rpx;
        padding-bottom: 16rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 20rpx;
        .jurisdiction_title{
            font-size: 32rpx;
            font-weight: 600;
            color: #333333;
            margin-bottom: 30rpx;
        }
        .jurisdiction_item{
            width: 100%;
            padding: 26rpx 20rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #F5F8FF;
            border-radius: 12rpx;
            margin-bottom: 20rpx;
            .item_text{
                font-size: 28rpx;
                color: #333333;
            }
        }

    }
}

</style>
<style>
page{
    background: #F8F9F9;
}
</style>
