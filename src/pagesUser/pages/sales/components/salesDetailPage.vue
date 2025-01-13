<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'售后详细'"></bc-page-navbar>
            </template>
		    <view class="salebg">
                <view class="orderbox row i-center j-between">
                    <view>
                        <view class="ordstutit">
                            <view class="line_one">{{data.log.feedback}}</view>
                            <view class="line_one" v-if="data.log.note">{{data.log.note}}</view>
                        </view>
                    </view>
                    <view class="ordbtn">
                        <view class="btn" @click="gotoMinutes">详情记录</view>
                    </view>
                </view>

                <view class="orderbox" v-if="data.detail">
                    <view class="some">
                        <view class="order row">
                            <view class="ordimg">
                                <image
                                    class="productImages"
                                    :src="data.detail.productImages"
                                    mode="aspectFill"
                                />
                            </view>
                            <view class="ordorth" v-if="data.detail.templateCodeId != 131850">
                                <view class="ordhed row i-center j-between">
                                    <text class="ordtit u-line-1">{{ data.detail.productName }}</text>
                                    <text class="ordprce">￥{{ (data.detail.totalPrice / 100) }}</text>
                                </view>
                                <view class="ordtip">{{ data.detail.productType }}</view>
                            </view>
                            <view class="ordorth" v-else>
                                <view class="ordhed row j-between">
                                    <text class="ordtit u-line-1">{{ data.detail.productName }}</text>
                                    <view class="ordprce ordprce_box">
                                        <text>￥{{ (data.detail.totalPrice / 100) }}</text>
                                        <text class="purchaseQuantity">x{{ data.detail.purchaseQuantity }}</text>
                                    </view>
                                </view>
                                <view class="ordtip timeDesc_box">
                                    <text style="width: 80%;">{{ data.detail.timeDesc ? data.detail.timeDesc : '周一至周日' }}</text>
                                    <text class="outTime_back">过期退</text>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="" style="margin-top: 30rpx;"></view>
                    <view class="ordli row">
                        <view class="ordtit">订单编号</view>
                        <view class="ordtex">{{ data.detail.orderSerialNo }}</view>
                    </view>
                    <view class="ordli row">
                        <view class="ordtit">售后原因</view>
                        <view class="ordtex">{{ data.detail.afterSaleReason || '' }}</view>
                    </view>
                    <view class="ordli row" v-if="data.detail.refund">
                        <view class="ordtit">退款金额</view>
                        <view class="ordtex">￥{{ (data.detail.refund / 100) }}</view>
                    </view>
                    <view class="ordli row" v-if="data.detail.images">
                        <view class="ordtit">补充凭证</view>
                        <view class="ordtex">
                            <view class="">{{ data.detail.desc || '' }}</view>
                            <view class="ordimg row">
                                <template v-for="(img,igds) in data.detail.images" :key="igds">
                                    <view class="ordigli">
                                        <image
                                            @tap="imgPreview(igds,data.detail.images)"
                                            class="ordigli_img"
                                            :src="img"
                                            mode="aspectFill"
                                        />
                                    </view>
                                </template>
                            </view>
                        </view>
                    </view>
                    <view class="ordli row">
                        <view class="ordtit">申请时间</view>
                        <view class="ordtex">{{timeformat( data.detail.afterTime)}}</view>
                    </view>
                    <view class="ordli row">
                        <view class="ordtit">售后单号</view>
                        <view class="ordtex">{{ data.detail.serialNo }}</view>
                    </view>
                </view>
            
            </view>

            

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { formattime } from '@/common/formatTime'


import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'

import { getSaleLog, getSaleDetail } from '@/api/order-api'
import { minutesDetail } from "@/routes/user-routes"


interface Props {
    id:string,
}
const props = defineProps<Props>()

interface Data {
    log:any,
    detail:any,
}
const data = reactive<Data>({
    log:{},
    detail:null,
})


const bcNotify = ref()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onMounted(()=>{

    getSaleLog({
        id: props.id
    }).then((res:any)=>{
        data.log = res[0]
    }).catch((err:any) => {
        bcNotify.value.error(err.message)

    })

    getSaleDetail({
        id: props.id
    }).then((res:any)=>{
        data.detail = res
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    })



})


const gotoMinutes = () => {
    minutesDetail({id: props.id})
}

const imgPreview = (current:number, urls:any) => {
    // 图片预览
    uni.previewImage({
        current,
        urls
    })
}









</script>
  
<style lang="scss" scoped>
.salebg{
    padding: 20rpx;
}
.some {
    .sometit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }

    .order {
        .ordimg {
            margin-right: 20rpx;
            .productImages{
                width: 80rpx;
                height: 80rpx;
                border-radius: 12rpx;
            }
        }

        .ordorth {
            flex: 1;

            .ordtit {
                font-size: 30rpx;
                font-weight: bold;
                color: #333333;
            }

            .ordtip {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                margin-top: 4rpx;
                &.timeDesc_box{
                    display: flex;
                    flex-direction: column;
                    .outTime_back{
                        color: #999999;
                    }
                }
            }

            .ordprce {
                font-size: 32rpx;
                font-weight: bold;
                color: #5D5D5D;
                &.ordprce_box{
                    display: flex;
                    flex-direction: column;
                    .purchaseQuantity{
                        color: #999999;
                        font-size: 24rpx;
                        text-align: end;
                    }

                }
            }
        }
    }
}


/* 箭头 */
.speedgoid{
    background-color: #FFFFFF;
    padding: 40rpx 50rpx;
    border-radius: 24rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .speearrow{
        .speedtit{
            font-size: 20rpx;
            font-weight: 400;
            color: #787D89;
            margin-top: 12rpx;
        }
        .arrowline{
            position: relative;
            border-top: 4rpx dashed #787D89;
            flex: 1;
            margin: -22px 12rpx 0;

            .arrowhead{
                border-left: 16rpx solid #787D89;
                border-top: 16rpx solid rgba(0,0,0,0);
                border-bottom: 16rpx solid rgba(0,0,0,0);
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -8rpx;
                margin-top: -16rpx;
            }
        }

        &:first-child{
            .arrowline{
                display: none;
            }
        }
    }
}
.orderbox{
    margin-top: 20rpx;
    background-color: #FFFFFF;
    padding: 30rpx;
    border-radius: 24rpx;
    .ordstutit{
        font-size: 28rpx;
        font-weight: bold;
        line-height: 40rpx;
        color: #333333;
        .line_one{
            width: 500rpx;
            white-space: nowrap; /*强制一行内显示*/
            overflow: hidden;/*溢出隐藏*/
            text-overflow: ellipsis;/*超出部分现实省略号*/
        }
    }
    .ordstumore{
        font-size: 28rpx;
        font-weight: 500;
        color: #FC3848;
        text{
            color: #999999;
        }
    }
    .ordbtn{
        .btn{
            width: 150rpx;
            height: 52rpx;
            line-height: 52rpx;
            border-radius: 28rpx;
            border: 2rpx solid #EEEEEE;
            text-align: center;
            color: #666666;
            font-size: 22rpx;
            font-weight: 500;


        }
    }
}
.ordli{
    align-items: flex-start;
    margin-top: 40rpx;
    .ordtit{
        width: 150rpx;
        flex-shrink: 0;
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
    }
    .ordtex{
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
    }
    .ordimg{
        margin-top: 20rpx;

        .ordigli{
            margin-right: 14rpx;
            &:last-child{
                margin-right: 0rpx;
            }
            .ordigli_img{
                width: 156rpx;
                height: 108rpx;
                border-radius: 12rpx;
            }
        }
    }
}
</style>
  