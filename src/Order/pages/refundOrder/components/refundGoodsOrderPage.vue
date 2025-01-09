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
                    <view class="shop_item">
                        <image
                            class="shop_item_img"
                            :src="data.healthObj.image"
                            mode="scaleToFill"
                        />
                        <view class="shop_text_box">
                            <view class="shop_title">{{ data.healthObj.title }}</view>
                            <view class="shop_number_box">
                                <view class="shop_number_box_text">{{ data.healthObj.subtitle }}</view>
                                <view class="shop_number">x{{ data.healthObj.quantity }}</view>
                            </view>
                            <view class="bala_box">
                                <view class="bala_number_box">
                                    <view class="price_box">
                                        <text class="price_text">实付:</text>
                                        <text class="price_icon">￥</text>
                                        <text class="price_number">{{ (data.healthObj.paidAmount / 100) }}</text>
                                    </view>
                                    <view class="paidAmount_box">
                                        原价:￥{{ (data.healthObj.price / 100) }}
                                    </view> 
                                </view>
                                <view class="bala-ord-num" >
                                    <TnNumberBox v-model="data.quantity" :max="data.healthObj.quantity - data.healthObj.refundedQuantity" bg-color="#f5f5f5"
                                    :min="1" buttonSize="56rpx" inputWidth="66rpx" @change="changevalue">
                                    </TnNumberBox>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="refund_details">
                    <view class="refund_details_box">
                        <view class="reason_box have_bottom">
                            <view class="reason_title">
                                退款原因
                                <text style="color:red;">*</text>
                            </view>
                            <view class="reason_item_box" @click="houseSaleReason">
                                <view class="reason_item">
                                    {{ data.reasonIndex == 999 ? '请选择退款原因' : data.reasonList[data.reasonIndex].name }}
                                </view>
                                <TnIcon name="right" size="24"></TnIcon>
                            </view>
                        </view>
                        <view class="reason_box">
                            <view class="reason_title">
                                预计退款金额
                            </view>
                            <view class="reason_number">
                                ￥{{ (((data.healthObj.paidAmount / data.healthObj.quantity) * data.quantity) / 100) }}
                            </view>
                        </view>
                        
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

import { TempStorage } from "@bc/base"

import { 
    getserviceOrderDetail,
    getAftersaleReason,
    applyRefund,
 } from '@/api/order-api'

interface Props {
    refundDetail:string
}

const props = defineProps<Props>()

interface Data {
    healthObj:any,
    quantity:number,
    show:boolean,
    reasonIndex:number,
    reasonId:string,
    reasonList:any,
    showPage:boolean
}
const data = reactive<Data>({
    healthObj:{},
    quantity:1,
    show:false,
    reasonIndex:999,
    reasonId:'',
    reasonList:[],
    showPage:false
})

onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(props.refundDetail).then((res:any) => {
        console.log('res',res);
        data.healthObj = res
        data.showPage = true
    }).catch(() => {
        console.log('订单信息获取失败');
    })
    getreasonList()
})



const getreasonList = () => {
    getAftersaleReason({
        typeId:6
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
    applyRefund({
        orderEntityId: data.healthObj.entityId,
        reasonId: data.reasonId,
        number: data.quantity,
        refund: (data.healthObj.paidAmount / data.healthObj.quantity) * data.quantity,
    }).then((res:any) => {
        bcNotify.value.show('退款成功')
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    })
}
const houseSaleReason = () => {
    data.show = true
}


</script>
  
<style lang="scss" scoped>
.box_up{
    position: relative;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    padding-top: 30rpx;
    .bg_box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200rpx;
        background: linear-gradient(180deg, #DFF7EF 0%, #F3F4F6 30%);
        z-index: -1;
    }   
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
                .shop_number_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 14rpx;
                    font-size: 24rpx;
                    color: #999999;
                }
                .bala_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .bala_number_box{
                        .price_box{
                            margin-bottom: 6rpx;
                            .price_text{
                                color: #666666;
                                font-size: 24rpx;
                                margin-right: 6rpx;
                            }
                            .price_icon{
                                color: #FC3848;
                                font-size: 18rpx;
                            }
                            .price_number{
                                color: #FC3848;
                                font-size: 24rpx;
                            }

                        }
                        .paidAmount_box{
                            color: #999999;
                            font-size: 24rpx;

                        }
                    }
                    .bala-ord-num{
                        font-size: 28rpx;
                        font-weight: 400;
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
            .reason_box{
                background: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                border-radius: 24rpx;
                box-sizing: border-box;
                &.have_bottom{
                    padding-bottom: 40rpx;
                }

                .reason_title{
                    color: #333333;
                    font-weight: 600;
                    font-size: 30rpx;
                }
                .reason_number{
                    color: #666666;
                    font-size: 28rpx;
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
        background: #EA3E1A;
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
 
