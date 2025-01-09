<template>
    <view class="WaterFall_item" @click="todetail(item)">
        <view class="WaterFall_img_box">
            <image
                class="WaterFall_img"
                :class="{ 'right' : isSmall }"
                :src="item.thumb"
                mode="aspectFill"
            />
            <view class="distance_box" v-if="item.businessType == 3" >
                <image
                    class="distance_img"
                    :src="getAssetsUrl('/leyou/goods/distance-icon.svg')"
                    mode="scaleToFill"
                />
                <text>距离{{ getdistance(item.lat,item.lng) }}</text>
            </view>
        </view>
        <view class="WaterFall_text_box">
            <view class="WaterFall_text_title">{{ item.name }}</view>
            <view class="rate_box" v-if="item.businessType == 3">
                <TnRate v-model="item.score" size="sm" gutter="4" :readonly="true" active-color="#FF983D"/>
            </view>
            <view class="WaterFall_price" v-if="item.businessType == 2">
                <view class="price_icon">¥</view>
                <view class="price_number">{{ (item.price / 100) }}</view>
                <view class="price_icon fcolor" v-if="false">¥{{ 100 }}</view>
            </view>
            <view class="WaterFall_text_bottom">
                <view class="WaterFall_text_author">
                    <image
                        class="WaterFall_text_author_img"
                        :src="item.shopThumb"
                        mode="aspectFill"
                    />
                    <view class="WaterFall_author_name_box">
                        <view class="WaterFall_author_name">{{ item.shopName }}</view>
                    </view>
                </view>
                <view></view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import { getDistances } from '@/utils/distance'


interface Props {
    item: any,
    isSmall:boolean,
    
}

const props = defineProps<Props>()

interface Data {
    rateValue:number,
    mylat:number,
    mylng:number,
    positioning:boolean,//是否展示距离

}
const data = reactive<Data>({
    rateValue:3,
    mylat:0,
    mylng:0,
    positioning:false,

})

interface Events {
    (e: 'clickwaterItem', item: any): void
}
const emit = defineEmits<Events>()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
    getDistancesfun().then((res:any) => {
        data.mylat = res.lat1
        data.mylng = res.lng1
    })
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



const todetail = (item:any) =>{
    emit('clickwaterItem',item)
}




</script>
  
<style lang="scss" scoped>
.WaterFall_item{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8rpx;
    overflow: hidden;
    margin-bottom: 18rpx;
    width: 100%;
    box-sizing: border-box;

    .WaterFall_img_box{
        position: relative;
        width: 100%;
        .WaterFall_img{
            width: 100%;
            height: 480rpx;
            display: block;
            box-sizing: border-box;
            &.right{
                height: 346rpx;
            }
        }
        .distance_box{
            position: absolute;
            left: 16rpx;
            bottom: 12rpx;
            padding: 6rpx 12rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            color: #FFFFFF;
            font-size: 20rpx;
            width:fit-content;
            border-radius: 16rpx;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.5);
            .distance_img{
                margin-right: 6rpx;
                width: 20rpx;
                height: 20rpx;
            }
        }
    }
    
    .WaterFall_text_box{
        padding: 16rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        background: #fff;


        .WaterFall_text_title{
            font-size: 32rpx;
            color: #1A1A1A;
            margin-bottom: 24rpx;
            font-weight: 600;
            width: 100%;
            line-height: 25px!important;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;

        }
        .WaterFall_text_bace{
            color: #666666;
            font-size: 28rpx;
            margin-bottom: 12rpx;
            width: 100%;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .rate_box{
            margin-bottom: 16rpx;
        }
        .WaterFall_price{
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;
            .price_icon{
                font-size: 20rpx;
                color: #FF1010;
                &.fcolor{
                    color: #999999;
                    text-decoration: line-through;
                }
            }
            .price_number{
                font-size: 28rpx;
                color: #FF1010;
                font-weight: 600;
                margin-right: 8rpx;
            }

        }
        .WaterFall_text_bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .WaterFall_text_author{
                display: flex;
                align-items: center;
                .WaterFall_text_author_img{
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 50%;
                    margin-right: 12rpx;
                    box-sizing: border-box;

                }
                .WaterFall_author_name_box{
                    .WaterFall_author_name{
                        font-size: 24rpx;
                        color: #666666;
                        margin-bottom: 4rpx;
                    }
                    .WaterFall_author_time{
                        font-size: 20rpx;
                        color: #999999;
                    }
                }
            }
            .WaterFall_text_like{
                display: flex;
                align-items: center;
                .WaterFall_text_like_number{
                    font-size: 22rpx;
                    color: #AFAFAF;
                }
            }
        }
    }

}
</style>
  