<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="200rpx"
    >
        <!-- <template #top>
            
        </template> -->
        <view class="nearby_goods">
            <view class="top_title">附近的店</view>
            <view class="top_list_box">
                <view class="goods_list">
                    <view class="goods_item" v-for="item in data.nearbyList" :key="item.id" @click="toServiceStore(item)">
                        <view class="img_box">
                            <image
                                class="goods_img"
                                :src="item.thumb"
                                mode="scaleToFill"
                            />
                            <view class="distance_box" v-if="props.showIocation" >
                                <image
                                    class="distance_img"
                                    :src="getAssetsUrl('/leyou/goods/distance-icon.svg')"
                                    mode="scaleToFill"
                                />
                                <!-- getdistance(item.lat,item.lng) -->
                                <text>{{ getdistance(item) }} </text>
                            </view>
                        </view>
                        <view class="goods_title">{{ item.name }}</view>
                    </view>
                </view>
                <view class="more_btn" @click="tomore">查看更多</view>
            </view>
        </view>
        <view class="space"></view>
        <view class="content_list">
            <view class="top_title">附近发现</view>
            <view>
                <WaterFalls :wfList="data.dataList" @waterItem="clickwaterItem"></WaterFalls>
            </view>

        </view>


        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { getDistances, getRice } from '@/utils/distance'

import WaterFalls from './WaterFalls.vue'

import BCNotify from '@/components/notify/index.vue'

import { nearbyGoods, nearbyList } from '@/api/user-api'
import { tomoreEnclosure } from '@/routes/user-routes'
import { gotovideoPreview, gotoarticledetails } from '@/routes/create-routes'
import { gotoServiceStore } from '@/routes/service-routes'

interface Data{
    dataList: any,
    nearbyList: any,
    
}
const data = reactive<Data>({
    dataList: [],
    nearbyList: [],
})

interface Props {
    lat: number,
    lng: number,
    showIocation: boolean
}

const props = defineProps<Props>()



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const getdistance = computed(()=>(item: any)=>{
    if (!props.lat || !props.lng) { return '' }

    let distance : (number | string) = 0

    if (item.distance < 1) {
        console.log('小于一公里');
        distance = getRice(
            props.lat,
            props.lng,
            item.lat,
            item.lng
        )

        if (distance == 0.0) {
            return '<0.1km'
        }else{
            return distance + 'm'
        }
        
    }else if(item.distance > 1){
        console.log('大于一公里');
        distance = getDistances(
            props.lat,
            props.lng,
            item.lat,
            item.lng
        ) + 'km'
        return distance 

    }
})


onMounted(()=>{
    
})

const bcNotify = ref()
const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{

    if (pageNumber == 1) {
        getNearbyGoods()
    }
    let query = props.showIocation ? 
    {
        lat: props.lat,
        lng: props.lng,
    } : {}
    nearbyList({
        pageNumber,
        pageSize,
        query
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })
    
}

const getNearbyGoods = () => {
    let query = props.showIocation ? 
    {
        lat: props.lat,
        lng: props.lng,
        sortType: 1,
        businessType: 3,
    } : 
    { 
        sortType: 1,
        businessType: 3,
    }

    nearbyGoods({
        pageNumber: 1,
        pageSize: 4,
        query:{
            ...query
        }
    }).then((res:any)=>{
        data.nearbyList = res.data;
    });
}

watch(()=> props.showIocation,(newvalue,oldvalue)=>{
    if (newvalue) {
        (paging.value as any).reload()
    }
})

const tomore = () => {
    tomoreEnclosure({
        showIocation: props.showIocation,
        lat: props.lat,
        lng: props.lng,
    })
}

const clickwaterItem = (item:any) =>{
    item.type == 1 && gotoarticledetails({ id: item.id })
    item.type == 2 && gotovideoPreview({videoId: item.id, videoPagetype: 2});
    item.type == 3 && gotoarticledetails({ id: item.id })

}

const toServiceStore = (item:any) =>{ 
    gotoServiceStore({shopId:item.id,isAd:0})
}

defineExpose({
})


</script>

<style lang="scss" scoped>
.nearby_goods{
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    background: #fff;
    .top_title{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 24rpx;
    }
    .top_list_box{
        display: flex;
        .goods_list{
            display: flex;
            .goods_item{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-right: 12rpx;
                .img_box{
                    width: 148rpx;
                    height: 148rpx;
                    border-radius: 8rpx;
                    overflow: hidden;
                    margin-bottom: 12rpx;
                    position: relative;
                    .goods_img{
                        width: 100%;
                        height: 100%;
                    }
                    .distance_box{
                        position: absolute;
                        right: 0rpx;
                        bottom: 0rpx;
                        padding: 6rpx 12rpx;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        color: #FFFFFF;
                        font-size: 20rpx;
                        width:fit-content;
                        border-radius: 16rpx 0rpx 0rpx 0rpx;
                        overflow: hidden;
                        background-color: rgba(0, 0, 0, 0.5);
                        .distance_img{
                            margin-right: 6rpx;
                            width: 20rpx;
                            height: 20rpx;
                        }
                    }
                }
                .goods_title{
                    font-weight: 500;
                    font-size: 24rpx;
                    color: #333333;
                    width: 148rpx;
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
        .more_btn{
            width: 70rpx;
            text-wrap: wrap;
            font-size: 24rpx;
            font-weight: 400;
            color: #ea3e1a;
            padding: 12rpx 24rpx;
            box-sizing: border-box;
            height: 148rpx;
            background: #FFF1EE;
            border-radius: 8rpx;
        }

    }
}

.space{
    width: 100%;
    height: 12rpx;
    background: #F8F8F8;
}

.content_list{
    padding: 30rpx 10rpx;
    box-sizing: border-box;
    background: #fff;
    .top_title{
        padding: 0rpx 10rpx;
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 24rpx;
    }
}


</style>
<style>
page{
    background: #fff;
}
</style>