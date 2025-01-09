<template>
    <view class="container">
        <view class="goods_item" v-for="item in dataList" :key="item.id">
            <image
                class="item_left_img"
                :src="item.thumb"
                mode="scaleToFill"
            />
            <view class="item_right_box">
                <view class="item_right_text">
                    <view class="right_title">{{ item.name }}</view>
                    <view class="buy_number" v-if="false">9000+付款</view>
                    <view class="buy_number" v-else></view>
                    <view class="price_box">
                        <text class="price_number">￥{{ (item.price / 100) }}</text>
                        <text class="price_through" v-if="false">￥600</text>
                    </view>
                </view>
                <view class="buy_btn" @click="togoodsDetail(item)">立即抢</view>
            </view>
            
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import { gotogoodsDetail } from '@/routes/goods-routes'


interface Props {
    dataList: any
}
const props = defineProps<Props>()

interface Data{
    rateValue:number
}
const data = reactive<Data>({
    rateValue:4
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const togoodsDetail = (item:any) => {
    gotogoodsDetail(item.id)
}

onMounted(() => {

})




</script>
  
<style lang="scss" scoped>
.container{
    .goods_item{
        display: flex;
        padding: 20rpx;
        box-sizing: border-box;
        .item_left_img{
            width: 132rpx;
            height: 132rpx;
            margin-right: 20rpx;
            border-radius: 12rpx;
            overflow: hidden;
        }
        .item_right_box{
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 24rpx;
            border-bottom: 2rpx solid #F0F0F0;
            .item_right_text{
                height: 132rpx;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                flex:1;
                .right_title{
                    color: #333333;
                    font-size: 30rpx;
                    font-weight: 500;
                    margin-bottom: 12rpx;
                }
                .buy_number{
                    font-size: 24rpx;
                    color: #808080;
                    font-weight: 400;
                    margin-bottom: 8rpx;
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
                    .price_number{
                        font-size: 30rpx;
                        color: #333333;
                        font-weight: 600;
                    }
                    .price_through{
                        margin-left:4rpx;
                        font-size: 22rpx;
                        font-weight: 400;
                        text-decoration: line-through;
                        color: #999999;
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
            .buy_btn{
                width: 104rpx;
                height: 48rpx;
                border-radius: 24rpx;
                line-height: 48rpx;
                border: 2rpx solid #EA3E1A;
                font-size: 22rpx;
                color: #EA3E1A;
                font-weight: 400;
                text-align: center;
            }
        }
        
    }
}
</style>
 
