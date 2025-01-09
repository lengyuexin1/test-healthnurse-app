<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :hide-empty-view="true"
    >
        <template #top>
            <PageTopbg bgstyle="background: #F2F3F5;"></PageTopbg>
            <bc-page-navbar :title="'已购课程'"></bc-page-navbar>
            
        </template>

        <view class="content" v-if="data.dataList.length != 0">
            <view class="course_item" v-for="item in data.dataList" :key="item.id">
                <courseCard :cardObj="handleObj(item)"></courseCard>
            </view>
        </view>

        <view class="empty_content" v-else>
            <image
                class="empty_img"
                :src="getAssetsUrl('/empty/empty_icon_data.png')"
                mode="scaleToFill"
            />
            <view class="empty_text">空空如也~</view>
            <view class="empty_btn" @click="toIndex">发现更多课程</view>
        </view>



    </z-paging>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { gotocourseVideo } from '@/routes/create-routes'
import { getserviceOrderList } from '@/api/order-api'
import { getbuycourseList } from '@/api/create-api'
import courseCard from './courseCard.vue'
import { gotoIndex } from "@/routes/public-routes"


interface Data {
    dataList:any,

}
const data = reactive<Data>({
    dataList:[],
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const handleObj = computed(()=>(item:any)=>{
    return {
        cover:item.thumb,
        coursetitle:item.name,
        shopIcon:item.accountThumb,
        shopName:item.accountName,
        itemId:item.id
    }
})

onMounted(() => {

})

const queryList = (pageNumber:number, pageSize:number)=>{
    getOrderList(pageNumber,pageSize)
}


const paging = ref()
const getOrderList = (pageNumber:number, pageSize:number) => {
    getbuycourseList({
        pageNumber,
        pageSize,
        query:{}
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
}

const toIndex = () => {
    gotoIndex()
}

</script>
  
<style lang="scss" scoped>
.content{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    .course_item{
        padding: 20rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
        width: 100%;
        .course_item_left{
            display: flex;
            .course_img{
                width: 140rpx;
                height: 140rpx;
                border-radius: 8rpx;
                margin-right: 20rpx;
                border: 2rpx solid red;
            }
            .course_text{
                height: 140rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .course_title{
                    font-weight: 500;
                    font-size: 30rpx;   
                    color: #1A1A1A;
                }   
                .course_author_box{
                    display: flex;
                    align-items: center;
                    .author_img{
                        width: 30rpx;
                        height: 30rpx;
                        margin-right: 8rpx;
                        border: 2rpx solid red;
                        border-radius: 50%;
                    }
                    .author_name{
                        font-size: 24rpx;
                        color: #666666;
                    }
                }
            }
        }
        .course_btn{
            padding: 10rpx 36rpx;
            box-sizing: border-box;
            background: #EA3E1A;
            border-radius: 6rpx;
            font-size: 26rpx;
            color: #FFFFFF;
        }
    }
}
.empty_content{
    width: 360rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    box-sizing: border-box;
    margin: auto;
    .empty_img{
        width: 320rpx;
        height: 320rpx;
        margin-bottom: 10rpx;
    }
    .empty_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #9F9F9F;
        margin-bottom: 40rpx;
    }
    .empty_btn{
        width: 268rpx;
        height: 76rpx;
        line-height: 76rpx;
        text-align: center;
        border-radius: 44rpx;
        background: #EA3E1A;
        font-size: 28rpx;
        font-weight: 400;
        color: #FFFFFF;
    }
}
</style>
  