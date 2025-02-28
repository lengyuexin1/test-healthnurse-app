<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
            :auto-show-back-to-top="true"
        >
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background: #F2F3F5;'"></pageTopbg>
                <bc-page-navbar :title="'展商详情'" ></bc-page-navbar>
                

                <view class="top_content_box">
                    <view class="discuss_box">
                        <image
                            class="discuss_img"
                            :src="data.shopDetail.thumb"
                            mode="aspectFill"
                        />
                        <view class="discuss_text_box">
                            <view class="discuss_title">{{data.shopDetail.name}}</view>
                            <view class="discuss_bottom">
                                <view class="discuss_bottom_text">主要品类：居家照护</view>
                                <view class="discuss_bottom_btn" @click="setColl">{{data.isColl ? '取消收藏' : '收藏'}}</view>
                            </view>
                        </view>
                    </view>
                </view>

                

            </template>

            <view class="page_content">
                <view class="good_box_title">展商展品</view>
                <view class="good_list">
                    <WaterfallsFlow :wfList="data.dataList" @waterItem="clickwaterItem" :isGoods="true"></WaterfallsFlow>
                </view>

            </view>            
           
            


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { onLoad } from "@dcloudio/uni-app"

import { getAssetsPic } from '@/common/setPicture'

import BCNotify from '@/components/notify/index.vue'

import { productlist } from "@/api/goods-api"
import { getBaseInfo, addShopBrowerHistory } from "@/api/service-api"
import { pageController } from "@bc/uni-tools"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { unHealthShop, addShop } from "@/api/user-api"

import { gotoServiceExpoClass } from '@/routes/service-routes'

import WaterfallsFlow from '@/Service/pages/serviceExpo/components/WaterfallsFlow.vue'
// import WaterfallsFlow from '@/Mall/pages/shop/components/WaterfallsFlow.vue'


interface Data {
    dataList: any
    shopId: string
    shopDetail: any
    isColl: boolean
}
const data = reactive<Data>({
    dataList: [],
    shopId: '',
    shopDetail: {},
    isColl: false,
})


const bcNotify = ref()

onMounted(async () => {


})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad((options) => {
    data.shopId = options?.shopId
    getShopInfo(options?.shopId)
})

const paging = ref() as any

const queryList = (pageNumber: number, pageSize: number) => {
    productlist({
        pageNumber,
        pageSize,
        query: {
            shopId: data.shopId
            // type: 1
        }
    }).then((res: any) => {
        console.log(res)
        paging.value.complete(res.data)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const getShopInfo = (shopId: any) => {
    getBaseInfo({ id: shopId }).then((res: any) => {
        data.shopDetail = res
        data.isColl = !!res.isFavorite
        paging.value.reload()
        addShopBrowerHistory({ shopId: shopId, applyId: res.applyId })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
        setTimeout(() => {
            pageController.back()
        }, 1500)
    })
}

const clickwaterItem = (item:any) => {
    gotogoodsDetail(item.id)
}

const setColl = () => {
    data.isColl ? unHealthShop({
        shopIds: [data.shopDetail.id]
    }).then(() => {
        data.isColl = false
        bcNotify.value.show('已取消收藏')
    }) : addShop({ shopId: data.shopDetail.id }).then(() => {
        data.isColl = true
        bcNotify.value.show('收藏成功')
    })
}


defineExpose({
})

</script>

<style lang="scss" scoped>
.top_content_box{
    padding: 20rpx;
    padding-bottom: 0rpx;

    box-sizing: border-box;
    .discuss_box{
        background: #FFFFFF;
        border-radius: 32rpx;
        padding: 32rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .discuss_img{
            width: 172rpx;
            height: 172rpx;
            border-radius: 12rpx;
        }
        .discuss_text_box{
            width: 450rpx;
            height: 172rpx;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .discuss_title{
                width: 100%;

                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

                font-weight: 500;
                font-size: 32rpx;
                color: #000002;
                
            }
            .discuss_bottom{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .discuss_bottom_text{
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #727375;
                }
                .discuss_bottom_btn{
                    width: 160rpx;
                    height: 56rpx;
                    text-align: center;
                    line-height: 56rpx;
                    background: #EA3E1A;
                    border-radius: 8rpx;
                    color: #FFFFFF;
                    font-size: 28rpx;
                }
            }
        }
    }
}
.page_content{
    padding: 20rpx;
    padding-top: 0rpx;

    box-sizing: border-box;
    .good_box_title{
        font-size: 30rpx;
        color: #000002;
        margin-bottom: 16rpx;
        font-weight: 600;
    }
    
}

</style>
