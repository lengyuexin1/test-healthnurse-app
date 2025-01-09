<template>
    <z-paging
        ref="paging" 
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <!-- bgstyle="background: #fff;" -->
            <PageTopbg :zIndex="-1" ></PageTopbg>
            <bc-page-navbar :title=" data.pageTitle"></bc-page-navbar>
        </template>
        <view class="content_page">
            <view class="jump_toBox">
                <image
                    class="submit_icon"
                    :src="getAssetsUrl('/leyou/icon/submit_page.svg')"
                    mode="scaleToFill"
                />
                <view class="submit_title">
                    举报已提交
                </view>
                <view class="submit_text">
                    我们将尽快处理，处理进展可关注消息通知或前往“我的-设置-举报管理
                </view>
                <view class="jump_btn" @click="toReportList">
                    去查看
                </view>
            </view>
        </view>

        




        <BCNotify ref="bcNotify"></BCNotify>
        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import { gotoReportList } from "@/routes/public-routes"

interface Data{
    pageTitle: string
}

const data = reactive<Data>({
    pageTitle: '',
})






const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad((option:any)=>{
    console.log('option',option);

    data.pageTitle = option.pageTitle
    
})

onMounted(()=>{
})

const bcNotify = ref()

const toReportList = () => {
    gotoReportList()
}

</script>

<style lang="scss" scoped>
.content_page{
    padding: 18rpx 22rpx;
    box-sizing: border-box;
    .jump_toBox{
        padding: 70rpx 42rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .submit_icon{
            width: 160rpx;
            height: 160rpx;
            margin-bottom: 20rpx;

        }
        .submit_title{
            font-weight: 500;
            font-size: 36rpx;
            color: #333333;
            margin-bottom: 40rpx;

        }
        .submit_text{
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
            line-height: 42rpx;
            margin-bottom: 90rpx;
            text-align: center;
        }
        .jump_btn{
            width: 380rpx;
            height: 84rpx;
            border-radius: 42rpx;
            border: 2rpx solid #EA3E1A;
            text-align: center;
            line-height: 84rpx;

            font-size: 32rpx;
            font-weight: 500;
            color: #EA3E1A;
        }

    }
}
</style>
