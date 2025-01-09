<template>
    <view class="container">
        <view class="institution_item" v-for="item in dataList" :key="item.id" @click="toServiceStore(item)">
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
                    <view class="distance" v-if="data.positioning">{{ getdistance(item.lat,item.lng) }}</view>
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

        <!-- <view @click="toserviceDetail">服务</view>
        <view @click="togoodsDetail">商品</view> -->
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { gotoServiceStore, gotoserviceDetail } from '@/routes/service-routes'
import { getDistances } from '@/utils/distance'
import { gotogoodsDetail } from '@/routes/goods-routes'

interface Props {
    dataList: any
}
const props = defineProps<Props>()

interface Data{
    rateValue:number,
    positioning:boolean,//是否展示距离
    mylat:number,
    mylng:number,
}
const data = reactive<Data>({
    rateValue:4,
    positioning:false,
    mylat:0,
    mylng:0,
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const getdistance = computed(()=>(lat:number, lng:number)=>{
    if (!data.mylat || !data.mylng) { return '' }
    const distance = getDistances(
        data.mylat,
        data.mylng,
        lat,
        lng
    )
    return distance + 'km'
})

const toServiceStore = (item:any) =>{ 
    gotoServiceStore({shopId:item.id,isAd:0})
}

onMounted(() => {
    getLocation()
})


const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                data.positioning = true
                console.log("res", res)
                console.log("定位成功")
                resolve({
                    lat1: res.latitude,
                    lng1: res.longitude
                })
            },
            fail: (err) => {
                data.positioning = false
                console.log("定位失败")
                reject(err)
            }
        })
    })
}


const getLocation = () => {
    // 获取当前位置
    getDistancesfun().then((res:any) => {
            data.mylat = res.lat1
            data.mylng = res.lng1
    })
}

</script>
  
<style lang="scss" scoped>
.container{
    background: #fff;
    .institution_item{
        padding: 20rpx;
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
 
