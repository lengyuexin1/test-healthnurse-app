<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <bc-page-navbar :title="'证照信息'" :bgColor="'#FFFFFF'"></bc-page-navbar>
            </template>
            
            <view class="top_box">
                <view class="top_title">
                    <text class="red">证照</text>
                    <text>信息</text>
                </view>
                <image
                    class="top_img"
                    :src="getAssetsUrl('/leyou/static/licenseTopImg.svg')"
                    mode="scaleToFill"
                />
            </view>
            <view class="text_contentBox">
                <view class="text_item">
                    <text class="text_title">更新时间：</text>
                    <text class="text_content">2024年11月11日</text>
                </view>
                <view class="text_item">
                    <text class="text_title">统一社会信用代码：</text>
                    <text class="text_content">91469034MADNLX6R53</text>
                </view>
                <view class="text_item">
                    <text class="text_title">App服务备案号：</text>
                    <text class="text_content blue">琼ICP备2024037044号-3A</text>
                </view>
                <view class="text_item">
                    <text class="text_title">增值电信业务经营许可证：</text>
                    <text class="text_content blue">琼B2-20240658</text>
                </view>
                <view class="text_item">
                    <text class="text_title">广播电视节目制作经营许可证：</text>
                    <text class="text_content">(琼) 字第02244号</text>
                </view>
                <view class="text_item">
                    <text class="text_title">网络文化经营许可证：</text>
                    <text class="text_content">琼网文 (2024) 3717-184号</text>
                </view>
                <view class="text_item">
                    <text class="text_title">出版物经营许可证：</text>
                    <text class="text_content">新出发琼字第2024065号</text>
                </view>
            </view>
            
		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'


interface Data {
    
}

const data = reactive<Data>({
    
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



</script>

<style lang="scss" scoped>
.top_box{
    width: 100%;
    height: 240rpx;
    background: linear-gradient( 180deg, #FEE7E2 0%, #F8F8F8 100%);
    position: relative;
    padding: 40rpx 44rpx;
    box-sizing: border-box;
    .top_title{
        font-weight: 500;
        font-size: 56rpx;
        color: #333333;
        display: flex;
        align-items: center;
        .red{
            color: #EA3E1A;
        }
    }
    .top_img{
        position: absolute;
        bottom: 40rpx;
        right: 30rpx;
        width: 210rpx;
        height: 70rpx;
    }
}
.text_contentBox{
    padding: 40rpx;
    box-sizing: border-box;
    .text_item{
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        font-size: 28rpx;
        color: #333333;
        .text_content{
            &.blue{
                color: #1982F1;
            }
        }
    }

}
</style>
<style>
page{
    background: #fff;
}
</style>