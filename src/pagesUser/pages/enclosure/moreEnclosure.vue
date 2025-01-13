<template>
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
    >
        <template #top>
            <pageTopbg :zIndex="-1" :bgstyle="'background: #fff;'"></pageTopbg>
            <bc-page-navbar :title=" '更多  ' " ></bc-page-navbar>
            <view class="top_inp_box">
                <view class="inp_bg_box" @click="changeInp"> 
                    <view class="inp_box" v-if="!data.showInp">
                        <TnIcon name="search" size="32rpx" color="#999999"></TnIcon>
                        <view class="inp_text">口腔/牙科</view>
                    </view>
                    <view v-else>
                        <TnInput 
                        v-model="data.inputValue" 
                        :border="false" 
                        :placeholder-style="{ fontSize: '24rpx' }" 
                        :focus="data.showInp"
                        @blur="inpblur"/>
                    </view>
                </view>
            </view>
        </template>

        <view class="container">
            <view class="institution_item" v-for="item in data.dataList" :key="item.id" @click="toServiceStore(item)">
                <image
                    class="item_left_img"
                    :src="item.thumb"
                    mode="scaleToFill"
                />
                <view class="item_right_text">
                    <view class="right_title">{{ item.name }}</view>
                    <view class="score_box">
                        <TnRate
                            v-model="item.score"
                            inactive-color="#EBEBEB"
                            active-color="#FEE111"
                            gutter="4rpx"
                            size="24rpx"
                            :readonly="true"
                        />
                        <view class="score_number">{{ item.score }}分</view>
                        <view class="comment_number" v-if="false">58评论</view>
                    </view>
                    <view class="right_desc" v-if="false">
                        <view class="category_text">按摩/足疗</view>
                        <view class="city">海珠区</view>
                    </view>
                    <view class="price_box">
                        <text class="price_left" v-if="item.minPrice">
                            ￥
                            <text class="price_number">{{ (item.minPrice / 100) }}</text>
                            起
                        </text>
                        <text v-else></text>
                        <view class="distance" v-if="data.showIocation">{{ getdistance(item) }}</view>
                    </view>
                    <view class="package_list" v-if="item.itemList">
                        <view class="package_item" v-for="sonItem in item.itemList" :key="sonItem.id">
                            <image
                                class="package_icon"
                                :src="getAssetsUrl('/leyou/serviceIcon/preferential-icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="package_text">{{ sonItem.name }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>


        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

import { getAssetsPic } from '@/common/setPicture'
import { getDistances, getRice } from '@/utils/distance'
import { gotoServiceStore } from '@/routes/service-routes'


import { nearbyGoods } from '@/api/user-api'

interface Data{
    dataList: any,
    showIocation: boolean,
    lat: number,
    lng: number,
    showInp: boolean,
    inputValue: string
}
const data = reactive<Data>({
    dataList: [],
    showIocation: false,
    lat: 0,
    lng: 0,
    showInp: false,
    inputValue: ''
})



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const getdistance = computed(()=>(item: any)=>{
    if (!data.lat || !data.lng) { return '' }

    let distance : (number | string) = 0

    if (item.distance < 1) {
        console.log('小于一公里');
        distance = getRice(
            data.lat,
            data.lng,
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
            data.lat,
            data.lng,
            item.lat,
            item.lng
        ) + 'km'
        return distance 

    }
})

onLoad((option:any)=>{
    console.log('option',option);
    data.showIocation = Boolean(option.showIocation)
    data.lat = Number(option.lat)
    data.lng = Number(option.lng)
})

onMounted(()=>{
})

const bcNotify = ref()
const paging = ref()
const queryList = (pageNumber:number, pageSize:number)=>{
    let query = data.showIocation ? 
    {
        lat: data.lat,
        lng: data.lng,
        sortType: 1,
        businessType: 3,
        name : data.inputValue ? data.inputValue : null,
    } : 
    { 
        sortType: 1,
        businessType: 3,
        name : data.inputValue ? data.inputValue : null,

    }

    nearbyGoods({
        pageNumber,
        pageSize,
        query:{
            ...query
        }
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    });    
}


const toServiceStore = (item:any) =>{ 
    gotoServiceStore({shopId:item.id,isAd:0})
}

const changeInp = () => {
    data.showInp = true
}

const inpblur = () => {
    if (!data.inputValue) {
        data.showInp = false;
    }
    (paging.value as any).reload()

}

defineExpose({
})


</script>

<style lang="scss" scoped>
.top_inp_box{
    width: 100%;
    padding: 8rpx 30rpx;
    box-sizing: border-box;
    .inp_bg_box{
        width: 100%;
        height: 72rpx;
        background: #F4F4F4;
        border-radius: 36rpx;
        overflow: hidden;
        .inp_box{
            width: 100%;
            height: 100%;
            padding: 20rpx 24rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .inp_text{
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
                margin-left: 8rpx;
            }
        }

    }
}
.container{
    background: #fff;
    .institution_item{
        padding: 40rpx 30rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;
        display: flex;
        
        .item_left_img{
            width: 132rpx;
            height: 132rpx;
            margin-right: 20rpx;
            border-radius: 12rpx;
            overflow: hidden;
        }   
        .item_right_text{
            flex:1;
            padding-bottom:12rpx;
            border-bottom:2rpx solid #F0F0F0;
            .right_title{
                color: #333333;
                font-size: 30rpx;
                font-weight: 500;
                margin-bottom: 12rpx;
            }
            .score_box{
                display: flex;
                align-items: center;
                margin-bottom: 8rpx;
                .score_number{
                    font-size: 24rpx;
                    color: #FF9F3E;
                    font-weight: 500;
                    margin-left: 4rpx;
                    margin-right: 16rpx;
                }
                .comment_number{
                    color: #808080;
                    font-size: 24rpx;
                }

            }
            .right_desc{
                color: #808080;
                font-size: 24rpx;
                font-weight: 400;
                display: flex;
                align-items: center;
                margin-bottom: 8rpx;
                .category_text{
                    padding-right: 12rpx;
                    border-right: 2rpx solid #E8E8E8;;
                }
                .city{
                    padding-left: 12rpx;
                }
            }
            .price_box{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 14rpx;
                .price_left{
                    display: flex;
                    align-items: center;
                    color: #333333;
                    font-size: 20rpx;
                    font-weight: 400;
                    .price_number{
                        font-size: 30rpx;
                        color: #333333;
                        font-weight: 600;
                    }
                }
                .distance{
                    font-size: 24rpx;
                    color: #999999;
                    font-weight: 400;
                }
            }
            .package_list{
                .package_item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 12rpx;

                    .package_icon{
                        width: 30rpx;
                        height: 30rpx;
                        border-radius: 8rpx;
                        margin-right: 12rpx;
                    }
                    .package_text{
                        font-weight: 400;
                        font-size: 22rpx;
                        color: #333333;
                    }
                }
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