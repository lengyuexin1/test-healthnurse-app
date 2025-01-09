<template>
	<view class="container">
        <z-paging 
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :auto-show-system-loading="true"
            :auto-scroll-to-top-when-reload="false"
            :hide-empty-view="true"
        >
            <template #top>
                <!-- #ifdef MP-WEIXIN -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" :addheight="100"></PageTopbg>
                <!-- #endif -->
                <!-- #ifdef APP || H5 -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" ></PageTopbg>
                <!-- #endif -->
                <bc-page-navbar :title="'违规公示'" ></bc-page-navbar>
            </template>
            <view class="page_list">
                <view class="lest_item" v-for="item in data.dataList" :key="item.id" @click="gotoboticeDetail(item)">
                    <view class="item_text_box">
                        <view class="item_text">{{ item.title }}</view>
                        <view class="item_time">{{ timeformat(item.utcCreated) }}</view>
                    </view>
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
import { formattime } from '@/common/formatTime'

import { ruleCategory, ruleList } from '@/api/user-api'
import { gotoNoticeDetail } from '@/routes/user-routes'

interface Data {
    dataList: any
}

const data = reactive<Data>({
    dataList: []
})

const bcNotify = ref()
const paging = ref()

onLoad((options:any) => {
})

onShow(() => {
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

const queryList = (pageNumber:number, pageSize:number) => {
    ruleList({
        pageNumber,
        pageSize,
        query:{
            categoryId: 60
        }
    }).then((res:any)=>{
        console.log('res11',res);
        (paging.value as any).complete(res.data);
    })
}

const gotoboticeDetail = (item:any) => {
    console.log('item',item);
    gotoNoticeDetail({articledId:item.id})
}

</script>

<style lang="scss" scoped>
.page_list{
    margin-top: 12rpx;
    padding: 12rpx 10rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    background: #fff;
    .lest_item{
        padding: 30rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
        .item_text_box{
            width: 100%;
            padding-bottom: 30rpx;
            border-bottom: 2rpx solid #F2F2F2;;
            .item_text{
                font-weight: 500;
                font-size: 28rpx;
                color: #000002;
                margin-bottom: 4rpx;
            }
            .item_time{
                font-size: 24rpx;
                color: #666666;
                font-weight: 400;
            }
        }
    }
}
</style>
<style>
page{
    background: #F8F8F8;
    height: 100%;
}
</style>