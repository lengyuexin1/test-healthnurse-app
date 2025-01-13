<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'申请退款'"></bc-page-navbar>
            </template>
            <view class="box_up" v-if="data.showPage">
                <view class="shop_box">
                    <view class="shop_top">
                        <image
                            class="shop_top_img"
                            :src="data.shopObj.shopIcon"
                            mode="scaleToFill"
                        />
                        <view class="shop_top_name">
                            {{data.shopObj.shopName}}
                        </view>

                    </view>
                    <view class="shop_item">
                        <image
                            class="shop_item_img"
                            :src="data.healthObj.image"
                            mode="aspectFill"
                        />
                        <view class="shop_text_box">
                            <view class="shop_title">{{ data.healthObj.title }}</view>
                            <view class="shop_time">{{ '周一至周日 过期退' }}</view>
                            <view class="shop_price_box">
                                <view class="shop_price">￥{{ (data.healthObj.price / 100) }}</view>
                                <view class="shop_number">x{{ data.healthObj.quantity }}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="refund_details">
                    <view class="refund_title">使用详情</view>
                    <view class="refund_details_box">
                        <view class="refund_details_item_box">
                            <view class="refund_details_text">退款数量 (上限{{ data.healthObj.refundableQuantity }}张)</view>
                            <!-- 计数器 -->
                            <view class="bala-ord-num" >
                                <TnNumberBox v-model="data.quantity" :max="data.healthObj.refundableQuantity" bg-color="#f5f5f5"
                                :min="1" buttonSize="56rpx" inputWidth="66rpx" @change="changevalue">
                                </TnNumberBox>
                            </view>
                        </view>
                        <view class="refund_details_item_box">
                            <view class="refund_details_text">退款金额 (实付金额)</view>
                            <view class="refund_details_number">￥{{ (data.healthObj.unitPrice * data.quantity) / 100 }}</view>
                        </view>
                        <view class="refund_details_item_box" style="margin-bottom:0rpx;">
                            <view class="refund_details_text">退款账户</view>
                            <view class="refund_details_number">原支付账户</view>
                        </view>
                    </view>
                </view>

                <view class="reason_box">
                    <view class="reason_title">
                        退款原因
                        <text style="color:red;">*</text>
                    </view>
                    <view class="reason_item_box" @click="data.show = true">
                        <view class="reason_item">
                            {{ data.reasonIndex == 999 ? '请选择退款原因' : data.reasonList[data.reasonIndex].name }}
                        </view>
                        <TnIcon name="right" />
                    </view>
                </view>
            </view>

            <template #bottom>
                <view class="bottom_box" @click="tocardRefund">
                    <view class="bottom_btn">提交</view>
                </view>
            </template>
        </z-paging>

        <TnPopup v-model="data.show" radius="16rpx" :close-btn="true" close-btn-position="right-top" open-direction="bottom">
            <view class="reasonBox">
                <view class="reasonBox_title_box">
                    <view class="reasonBox_title">
                        选择退款原因
                    </view>
                    <view></view>
                </view>
                <view class="reasonBox_list">
                    <view class="reasonBox_item" v-for="(item,index) in data.reasonList" :key="item.id" @click="reason(item,index)">
                        {{ item.name }}
                    </view>
                </view>
            </view>
        </TnPopup>

        <BCNotify ref="bcNotify"></BCNotify>


    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { 
    getserviceOrderDetail,
    getAftersaleReason,
    cardRefund,
 } from '@/api/order-api'

interface Props {
    orderId:string
}

const props = defineProps<Props>()

interface Data {
    healthObj:any,
    shopObj:any,
    consumeCardList:any,
    quantity:number,
    show:boolean,
    reasonIndex:number,
    reasonId:string,
    reasonList:any,
    showPage:boolean
}
const data = reactive<Data>({
    healthObj:{},
    shopObj:{},
    consumeCardList:[],
    quantity:1,
    show:false,
    reasonIndex:999,
    reasonId:'',
    reasonList:[],
    showPage:false
})

onMounted(() => {
    getdetail(props.orderId)
    getreasonList()
})

const getdetail = (orderId:string) => {
    getserviceOrderDetail({
        orderId
    }).then((res:any)=>{
        data.healthObj = res.shopList[0].entityList[0]
        data.shopObj = {
            shopIcon : res.shopList[0].shopIcon,
            shopId: res.shopList[0].shopId,
            shopName : res.shopList[0].shopName
        }
        data.consumeCardList = res.shopList[0].entityList[0].consumeCardList
        data.showPage = true
    })
}

const getreasonList = () => {
    getAftersaleReason({
        typeId:5
    }).then((res:any)=>{
        data.reasonList = res
    })
}

const changevalue = () => {
    console.log('data.quantity',data.quantity);   
}

const reason = (item:any,index:number) => {
    data.reasonId = item.id
    data.reasonIndex = index
    data.show = false
}

const bcNotify = ref()
const tocardRefund = () => {
    // 提交退款
    if (!data.reasonId) {
        bcNotify.value.error('请选择退款原因')
        return
    }
    cardRefund({
        orderEntityId: data.healthObj.entityId,
        quantity: data.quantity,
        reasonId: data.reasonId,
    }).then(()=>{
        bcNotify.value.show('退款成功')
        setTimeout(() => {
            uni.navigateBack()
        }, 1500);
    }).catch((res)=>{
        bcNotify.value.error(res.message)
    })
}


</script>
  
<style lang="scss" scoped>
.box_up{
    position: relative;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    padding-top: 30rpx;
    .shop_box{
        padding: 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        margin-bottom: 20rpx;
        .shop_top{
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
            .shop_top_img{
                width: 44rpx;
                height: 44rpx;
                border-radius: 50%;
                margin-right: 8rpx;
            }
            .shop_top_name{
                color: #666666;
                font-size: 24rpx;
            }
        }
        .shop_item{
            display: flex;
            align-items: center;
            .shop_item_img{
                width: 180rpx;
                height: 180rpx;
                border-radius: 12rpx;
                // border: 1px solid red;
                margin-right: 24rpx;
            }
            .shop_text_box{
                flex: 1;
                display: flex;
                flex-direction: column;
                .shop_title{
                    margin-bottom: 12rpx;
                    color: #333333;  
                    font-size: 30rpx;
                }
                .shop_time{
                                    
                    font-size: 28rpx; 
                    color: #999999;
                    margin-bottom: 44rpx;
                }
                .shop_price_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .shop_price{
                        color: #FC3848;
                        font-size: 32rpx;

                    }
                    .shop_number{
                        font-size: 28rpx;
                        color: #999999;
                    }
                }
            }
        }
        
    }
    .refund_details{
        margin-bottom: 20rpx;
        .refund_title{
            font-size: 32rpx;
            font-weight: 600;
            color: #333333;
            margin-bottom: 20rpx;
        }
        .refund_details_box{
            background: #fff;
            width: 100%;
            border-radius: 24rpx;
            padding: 30rpx;
            box-sizing: border-box;
            .refund_details_item_box{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;
                .refund_details_text{
                    color: #333333;
                    font-weight: 600;
                    font-size: 30rpx;
                }
                .refund_details_number{
                    color: #999999;
                    font-size: 28rpx;
                }
            }
            
        }
    }
    .reason_box{
        padding: 30rpx;
        box-sizing: border-box;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-radius: 24rpx;

        .reason_title{
            color: #333333;
            font-weight: 600;
            font-size: 30rpx;
        }
        .reason_item_box{
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #999999;
            .reason_item{
                margin-right: 12rpx;
            }
        }
    }
    
    
}
.bottom_box{
    width: 100%;
    height: 130rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding-bottom: 30rpx;
    .bottom_btn{
        width: 690rpx;
        height: 90rpx;
        background: #29C86F;
        text-align: center;
        color: #fff;
        font-size: 32rpx;
        line-height: 90rpx;
        border-radius: 50rpx;
    }
}

.reasonBox{
    padding: 40rpx;
    padding-bottom: 0rpx;
    .reasonBox_title_box{
        width: 100%;
        position: relative;
        margin-bottom: 30rpx;
        .reasonBox_title{
            text-align: center;
            font-size: 34rpx;
            font-weight: 600;
            color: #333333;
        }
        .reasonBox_icon{
            position: absolute;
            top: 0;
            right: 0rpx;
        }
    }
    .reasonBox_list{
        width: 100%;
        .reasonBox_item{
            width: 100%;
            padding: 26rpx;
            color: #666666;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
/* 数量 */
.bala-ord-num{
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;

    // 步进器自定义样式
    .minus {
        width: 62rpx;
        height: 56rpx;
        background: #F5F5F5;
        border-radius:56rpx 0 0 56rpx;
        // @include flex;
        justify-content: center;
        align-items: center;

        &.forbid{
            background-color: #F5F5F5;
        }
    }

    .input {
        padding: 0 8px;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
    }

    .plus {
        width: 62rpx;
        height: 56rpx;
        background-color: #F5F5F5;
        border-radius: 0 56rpx 56rpx 0;
        display: flex;
        justify-content: center;
        align-items: center;

        &.forbid{
            background-color: #F5F5F5;
        }
    }
}
</style>
 
