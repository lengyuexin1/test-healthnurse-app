<template>
    <z-paging
        ref="paging" 
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <PageTopbg :zIndex="-1" bgstyle="background: #fff;"></PageTopbg>
            <bc-page-navbar :title="'评选规则'"></bc-page-navbar>
        </template>

        <view class="rule_content">
            <view class="ranking_rule">榜单规则</view>
            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">榜单介绍</view>
            </view>
            <view class="rule_text">
                保椿生活基于平台海量用户真实消费和评价行为，综合评选出“销量高，评价好，体验佳”的优质商户，每月更新推出“康养点评”，致力于为消费者提供“接地气，”的实用康养指南。
            </view>
            <view class="rule_text">
                “康养点评”评选均来自平台客观真实数据，不收取任何评选费用。
            </view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">评选规则</view>
            </view>
            <view class="rule_text" style="margin-bottom: 20rpx;">
                <text class="span_text">评选原则：</text> 根据商户的评价评分，月销量，营业状态等指标综合评选出上榜商户。
            </view>
            <view class="rule_text" style="margin-bottom: 20rpx;">
                <text class="span_text" >评选周期：</text>以自然月为周期综合计算
            </view>
            <view class="rule_text">
                <text class="span_text">榜单更新周期：</text>每月更新
            </view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">FAQ</view>
            </view>
            <view class="rule_text" style="margin-bottom: 20rpx;">
                <text class="span_text">问：</text>康养点评的排序范围
            </view>
            <view class="rule_text" style="margin-bottom: 20rpx;">
                <text class="span_text">答：</text>康养点评根据平台康养囤分类,按照商户所在地理区域及商户主要经营品类进行榜单评选。
            </view>

            <view class="rule_title_item">
                <view class="title_spage"></view>
                <view class="rule_title">榜单试运营范围</view>
            </view>
            <view class="rule_text">
                广州，佛山，具体以榜单页面显示为准。
            </view>
            

        </view>

        <BCNotify ref="bcNotify"></BCNotify>
        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'



interface Data{
    dataList:any
}

const data = reactive<Data>({
    dataList:[]
})






const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})



onMounted(()=>{
})


const paging = ref()
const queryList = async (pageNumber:number, pageSize:number)=>{
    
}



const bcNotify = ref()






// defineExpose({
//     pagingReload
// })


</script>

<style lang="scss" scoped>
.rule_content{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    .ranking_rule{
        font-weight: 500;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 30rpx;
    }
    .rule_title_item{
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .title_spage{
            width: 6rpx;
            height: 32rpx;
            background: linear-gradient(180deg, #EA3E1A 0%, rgba(234,62,26,0) 100%);
            margin-right: 16rpx;
        }
        .rule_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
        }
    }
    .rule_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        line-height: 44rpx;
        margin-bottom: 30rpx;
        .span_text{
            color: #333333;
            font-size: 28rpx;
        }
    }
}

</style>

<style>
page{
    background: #fff;
}
</style>
