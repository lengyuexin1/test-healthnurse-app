<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <!-- #ifdef MP-WEIXIN -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" :addheight="100"></PageTopbg>
                <!-- #endif -->
                <!-- #ifdef APP || H5 -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" :addheight="252"></PageTopbg>
                <!-- #endif -->
                <bc-page-navbar :title="data.title" ></bc-page-navbar>
                <view class="top_nav">
                    <TnTabs
                        v-model="data.tabCurrent"
                        color="#fff"
                        :scroll="true" 
                        bg-color="#fff" 
                        bar-color="#EA3E1A" 
                        :bottom-shadow="false"
                    >
                        <TnTabsItem
                            v-for="(item, index) in data.topNav"
                            :key="index"
                            :title="item.title"
                            font-size="28rpx"
                            active-color="#000000"
                            color="#999999"
                            @click="changeTab(item,index)"
                        />
                    </TnTabs>
                </view>
            </template>
            
            <view class="page_content">
                <view class="rule_title">规则说明</view>
                <view class="rule_text_box">
                    {{ data.ruleObj.content }}
                </view>
            </view>

		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'

import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { ruleList, ruleDetail } from '@/api/user-api'

interface Data {
    title: string
    categoryId: string
    topNav: any
    tabCurrent: number
    ruleObj: any
    selectId: string
}

const data = reactive<Data>({
    title: '',
    categoryId: '',
    topNav: [],
    tabCurrent: 0,
    ruleObj: {},
    selectId: '',
})

const bcNotify = ref()
onLoad((options:any) => {
    console.log('options',options);
    
    data.title = options.title
    data.categoryId = options.categoryId
    data.selectId = options.selectId
    ruleList({
        pageNumber: 1,
        pageSize: 10,
        query:{
            categoryId: data.categoryId
        }
    }).then((res:any) => {
        data.topNav = res.data
        data.tabCurrent = data.topNav.findIndex((item:any)=>{
            return item.id == data.selectId
        })
        console.log('data.topNav',data.topNav);
        getruleDetail()
    })
})

const getruleDetail = () => {
    ruleDetail({
        id: data.topNav[data.tabCurrent].id
    }).then((res:any)=>{
        data.ruleObj = res
        console.log('data.ruleObj',data.ruleObj);
        
    })
}

onShow(() => {
})


const changeTab = (item:any,index:number) => {
    data.tabCurrent = index
    getruleDetail()
}


</script>

<style lang="scss" scoped>
.page_content{
    padding: 30rpx;
    box-sizing: border-box;
    .rule_title{
        font-size: 28rpx;
        color: #000002;
        font-weight: 500;
        margin-bottom: 16rpx;
    }
    .rule_text_box{
        border-radius: 16rpx;
        background: #fff;
        padding: 30rpx;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
    }
}
</style>
<style>
page{
    background: #F8F8F8;
}
</style>