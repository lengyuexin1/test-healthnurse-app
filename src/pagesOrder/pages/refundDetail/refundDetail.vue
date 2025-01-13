<template>
	<view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'退款详情'"></bc-page-navbar>
            </template>
            <view class="padding_page">
                <view class="top_box">
                    <view class="refundReason">
                        <view class="refundReason_title">退款成功</view>
                        <view class="refundReason_text">您申请的退款已成功，退款金额将原路返回，请注意查看，如有疑问请咨询客服.</view>
                    </view>
                    <view class="refundPrice">
                        <view class="refundPrice_left">
                            <view class="refundPrice_left_title">退款金额</view>
                            <view class="refundPrice_left_text">按实付金额计算，原路退还</view>
                        </view>
                        <view class="refundPrice_number_box">
                            <text class="refundPrice_number_icon">￥</text>
                            <!-- sunPrice -->
                            <text class="refundPrice_number">{{ data.sunPrice / 100 }}</text>
                        </view>
                    </view>
                </view>
                <view class="refund_detail_box" v-for="(item) in data.healthObjList" :key="item.afterSaleId">
                    <view class="refund_detail_title">退款信息</view>
                    <view class="refund_detail_img_box">
                        <image
                            class="refund_detail_img"
                            :src="item.productImages"
                            mode="scaleToFill"
                        />
                        <view class="refund_detail_text_box">
                            <view class="refund_detail_text">{{ item.productName }}</view>
                            <view class="productType_box">
                                <view class="productType_text">{{ item.productType }}</view>
                                <view class="productType_number"> x{{ item.purchaseQuantity }} </view>
                            </view>
                            <view class="refund_number_box">
                                <view class="refund_number_text">退款:</view>
                                <view class="refund_number">￥{{ item.refund / 100 }}</view>
                            </view>
                            <view class="reality_price">实付: {{ item.finalPay ? (item.finalPay / 100) : (item.totalPrice / 100) }}</view>
                        </view>
                    </view>
                    <view class="reason_box">
                        <view class="reason_item_box have_bottom">
                            <view class="reason_title">退款原因</view>
                            <view class="reason_text">{{ item.afterSaleReason }}</view>
                        </view>
                        <view class="reason_item_box">
                            <view class="reason_title">售后编号</view>
                            <view class="reason_text">{{ item.serialNo }}</view>
                        </view>
                    </view>
                </view>
            </view>
            
            


            
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { sptDetailsByEntityId } from '@/api/order-api'

interface Data {
    healthObjList: any,
    sunPrice: number
}

const data = reactive<Data>({
    healthObjList: [],
    sunPrice: 0
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
    sptDetailsByEntityId({
        orderEntityId: options.entityId
    }).then((res:any)=>{
        data.healthObjList = res
        data.healthObjList.map((item:any)=>{
            data.sunPrice = item.refund + data.sunPrice
        })
        console.log('data.sunPrice',data.sunPrice);
        
    })
})

onShow(() => {
})



</script>

<style lang="scss" scoped>
.top_bg{
    position: absolute;
    width: 100%;
    height: 420rpx;
    background: linear-gradient(180deg, #FFE3DE 0%, #F8F9F9 100%);;
    z-index: -1;
}
.padding_page{
    padding: 0rpx 24rpx;
    box-sizing: border-box;
    .top_box{
        width: 100%;
        margin-bottom: 20rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 30rpx;
        box-sizing:border-box;
        .refundReason{
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            .refundReason_title{
                font-size: 32rpx;
                color: #FFB23E;
                margin-bottom: 20rpx;
            }
            .refundReason_text{
                font-size: 24rpx;
                color: #666666;
            }
        }
        .refundPrice{
            padding-top: 34rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .refundPrice_left{
                .refundPrice_left_title{
                    color: #333333;
                    font-size: 28rpx;
                    font-weight: 500;
                    margin-bottom: 10rpx;

                }
                .refundPrice_left_text{
                    font-size: 24rpx;
                    color: #999999;
                }
            }
            .refundPrice_number_box{
                color: #FF1010;
                .refundPrice_number_icon{
                    font-size: 26rpx;
                }
                .refundPrice_number{
                    font-size: 34rpx;
                }
            }
        }
    }
    .refund_detail_box{
        width: 100%;
        margin-bottom: 20rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 30rpx;
        box-sizing:border-box;
        .refund_detail_title{
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 20rpx;

        }
        .refund_detail_img_box{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            .refund_detail_img{
                width: 140rpx;
                height: 140rpx;
                border-radius: 16rpx;
                overflow: hidden;
            }
            .refund_detail_text_box{
                flex: 1;
                padding-left: 24rpx;
                box-sizing: border-box;
                .refund_detail_text{
                    font-size: 30rpx;
                    color: #333333;
                    margin-bottom: 8rpx;
                }
                .productType_box{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 24rpx;
                    color: #999999;
                    margin-bottom: 12rpx;
                }
                .refund_number_box{
                    display: flex;
                    align-items: center;
                    // margin-bottom: 8rpx;
                    .refund_number_text{
                        font-size: 24rpx;
                        color: #666666;
                    }
                    .refund_number{
                        font-size: 30rpx;
                        color: #FF1010;
                    }
                }
                .reality_price{
                    font-size: 24rpx;
                    color: #999999;
                }

            }
        }
        .reason_box{
            padding-top: 40rpx;
            box-sizing: border-box;
            width: 100%;
            .reason_item_box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                &.have_bottom{
                    margin-bottom: 30rpx;
                }
                .reason_title{
                    font-size: 30rpx;
                    color: #333333;
                }
                .reason_text{
                    color: #999999;
                    font-size: 28rpx;
                }
            }
        }
    }
}

</style>
<style>

</style>
