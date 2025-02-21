<template>
    <view class="container" v-if="showInfo">
        <!-- isinstitution 区分机构服务订单与正常订单 -->
        <view class="item_box" v-for="(item) in serviceInfo.shopList" :key="item.shopId">
            <view class="shop_box">
                <image
                    class="shop_img"
                    :src="item.shopIcon"
                    mode="scaleToFill"
                />
                <view class="shop_name">
                    {{ item.shopName }}
                </view>
            </view>
            <view class="order_info_top">
                <view class="order_info_img_box" v-for="goodItem in item.entityList" :key="goodItem.itemId">
                    <image
                        class="order_info_img"
                        :src="goodItem.image"
                        mode="aspectFill"
                    />
                    <view class="order_info_text">
                        <view class="order_info_text_title">{{ goodItem.title }}</view>
                        <view class="order_info_text_subtitle">{{ goodItem.subtitle }}</view>
                        <view class="order_info_price">
                            <text>
                                <!-- paidAmount -->
                                ￥{{ goodItem.price / 100}}
                            </text>
                            <text class="order_info_quantity">x{{ goodItem.quantity }}</text>
                        </view>
                        <view class="ord_god_btn_box" v-if="serviceInfo.actionableList.includes('apply_refund')">
                            <view class="ord_god_btn" @click="gotorefund(goodItem)">申请退款</view>
                        </view>
                    </view>
                </view>

            </view>
        </view>
        
        
        <view class="service_info_item">
            <view class="info_title">订单备注</view>
            <view class="info_text">
                <text>{{ serviceInfo.shopinfo.note ? serviceInfo.shopinfo.note : '--' }}</text>
            </view>
        </view>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import { formattime } from '@/common/formatTime'
import { gotorefundShopOrder } from '@/routes/order-routes'
import { TempStorage } from "@bc/base"
 

interface Props {
    serviceInfo:any,
    showInfo:boolean,
}
const props = defineProps<Props>()


interface data {
    shopInfo:any
}
const data = reactive<data>({
    shopInfo:{}
})

// 判断是否机构订单
const isinstitution = computed(()=>{
    return props.serviceInfo.kind === 3
})


const date = computed( () => (tiem:number)=> {
    return dayjs(tiem * 1000).format('YYYY-MM-DD HH:mm');
})

const isKeep = computed(() => {
    return [65795, 65796].includes(props.serviceInfo.templateCodeId)
})

const showVisitEnd = computed(()=>{
    return ![4, 7].includes(props.serviceInfo.shopList[0].entityList[0].optionExtend?.serviceWorkingHours.unit)
})


const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

const showutcTime = computed(()=>(timeList:any)=>{
    const timeObj = timeList.find((item:any) => {
        return item.status == 131079
    })
    if (timeObj) {
        return formattime(timeObj.utcTime,'YYYY-MM-DD HH:mm')
    }
})

onMounted(()=>{
    console.log('props.serviceInfo.shopInfo',props.serviceInfo.info);
})


const gotorefund = (item:any) => {
    // 申请退款
    const refundDetail = TempStorage.savewx({
        ...item,
        priceInfo: props.serviceInfo.priceInfo
    })

    gotorefundShopOrder({refundDetail})
}

const tominutes = (index:number) =>{ 
    // 退款记录
}

</script>
  
<style lang="scss" scoped>
.container{
    background: #fff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    .order_info_title{
        font-size: 32rpx;
        font-weight: 700;
        color: #333;
        margin-bottom: 30rpx;
    }
    .shop_box{
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        .shop_img{
            width: 40rpx;
            height: 40rpx;
            margin-right: 14rpx;
            border-radius: 50%;
        }
        .shop_name{
            color: #333333;
            font-size: 28rpx;
            font-weight: 500;
        }
    }
    .order_info_top{
        width: 100%;
        margin-bottom: 32rpx;
        .order_info_img_box{
            display: flex;
            margin-bottom: 24rpx;
            .order_info_img{
                width: 180rpx;
                height: 180rpx;
                margin-right: 20rpx;
            }
            .order_info_text{
                width: 450rpx;
                .order_info_text_title{
                    font-size: 30rpx;
                    font-weight: 500;
                    color: #333333;
                    margin-bottom: 8rpx;
                }
                .order_info_text_subtitle{
                    font-size: 28rpx;
                    color: #666666;
                    font-weight: 400;
                    margin-bottom: 8rpx;
                }
                .order_info_price{
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #FC3848;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20rpx;
                    .order_info_quantity{
                        font-size: 26rpx;
                        font-weight: 400;
                        color: #999999;
                    }   
                }
                .ord_god_btn_box{
                    display: flex;
                    justify-content: flex-end;
                    .ord_god_btn{
                        width: 144rpx;
                        height: 48rpx;
                        background: #ffffff;
                        border-radius: 104rpx;
                        border: 2rpx solid #eeeeee;
                        color: #666666;
                        font-size: 22rpx;
                        text-align: center;
                        line-height: 48rpx;
                    }
                }
                .agency_service_title{
                    font-weight: 500;
                    font-size: 30rpx;
                    color: #333333;
                    margin-bottom: 12rpx;
                }
                .rule_text_box {
                    margin-bottom: 40rpx;
                    .rule_item_text {
                        display: flex;
                        flex-direction: column;
                        font-size: 28rpx;
                        color: #999999;
                    }
                }
                .mallprice_box {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .mallprice {
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #fc3848;
                    margin-top: auto;
                }
                .mallprice_number {
                    color: #999999;
                    font-size: 28rpx;
                }
            }
        }
        .order_info_shop_box{
            display: flex;
            justify-content: space-between;
            font-size: 24rpx;
            .order_info_shop{
                display: flex;
                align-items: center;
                .shop_name{
                    padding: 6rpx 12rpx;
                    box-sizing: border-box;
                    background: #FFF6E6;
                    text-align: center;
                    font-size: 24rpx;
                    color: #F88400;
                    border-radius: 8rpx;
                    margin-left: 12rpx;
                    margin-right: 12rpx;
                }
            }
        }
    }
    .service_info_item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info_title{
            font-size: 30rpx;
            color: #333333;
            font-weight: 600;
        }
        .info_text_box{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
        .info_text{
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #999999;

        }
        
    }
    .record_box {
        padding-top: 20rpx;
        .refund_box {
            padding: 22rpx 0rpx 30rpx 0rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .refund {
                width: 148rpx;
                height: 56rpx;
                border-radius: 28rpx;
                border: 2rpx solid #eeeeee;
                text-align: center;
                line-height: 56rpx;
                color: #666666;
                font-size: 22rpx;
            }
        }
        .record_list {
            border-top: 2rpx solid #f2f2f2;
            padding-top: 30rpx;
            box-sizing: border-box;
            .record_title_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30rpx;
            }
            .record_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30rpx;
            }
            .record_title {
                color: #333333;
                font-size: 32rpx;
                font-weight: 600;
                &.isuse {
                    color: #999999;
                    text-decoration: line-through;
                }
            }
            .use_box {
                display: flex;
                align-items: center;
                color: #666666;
                font-size: 24rpx;
                .use_state {
                    margin-left: 8rpx;
                }
                .use_state_isuse {
                    margin-left: 8rpx;
                    color: #ff9f3e;
                }
            }
        }
    }
}
</style>
  