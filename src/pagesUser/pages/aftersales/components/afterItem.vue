<template>
    <view class="content">
        <view class="serbox row">
            <view class="serimg_box">
                <image
                    class="serimg"
                    :src="info.productImages"
                    mode="scaleToFill"
                />
                <view class="sercate" v-if="info.categoryName">{{info.categoryName}}</view>
            </view>
            <view class="serig" v-if="info.templateCodeId != 131850">
                <view class="serabout row i-center j-between">
                    <view class="sername u-line-1">{{info.productName}}</view>
                    <view class="serprice">￥{{(info.itemPrice / 100)}}</view>
                </view>
                <view class="seroption u-line-1">{{info.productType}}</view>
            </view>
            <view class="serig is_j" v-else>
                <view class="serabout row j-between">
                    <view class="sername u-line-1">{{info.productName}}</view>
                    <view class="quantity_price">
                        <view class="serprice">￥{{(info.itemPrice / 100)}}</view>
                        <view class="product_number">x{{ info.itemNumber }}</view>
                    </view>
                </view>
                <view class="payment_box">
                    <view class="payment_title">
                        已支付:
                    </view>
                    <view class="payment_price">
                        ￥{{((info.itemPrice * info.itemNumber) / 100)}}
                    </view>
                </view>
            </view>
        </view>
        <view class="utcOrderTime" v-if="info.templateCode == 131850">
            下单时间 {{ timeformat(info.utcOrderTime) }}
        </view>
        <view class="sertype row i-center">
            <view class="u-line-1">{{ info.afterSaleStatus}}</view>
        </view>

        <view class="sermore row i-center">
            <view class="serbtn_btn">
                <view class="serbtn" v-if="isRevise" @click="gotoApply(1)">
                    修改售后
                </view>
                <view class="serbtn" v-if="isLogistics" @click="gotoLogis">
                    填写物流
                </view>
                <view class="serbtn" v-if="isAgain" @click="gotoApply(0)">
                    再次售后
                </view>
                <view class="serbtn" v-if="isShut" @click="closeSales">
                    关闭售后
                </view>
                <view class="serbtn" @click="tosalesDetail">
                    查看详情
                </view>
                <view class="serbtn" v-if="isArbitrate" @click="gotoArbitrate">
                    申请仲裁
                </view>
                <view class="serbtn" v-if="isDelivery" @click="receiving">
                    确认收货
                </view>
                
            </view>
        </view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'
import { gotoExpressageAdd, gotosalesDetail, upSales, upServiceSales, gotoAfterArbitrate } from "@/routes/user-routes"

import { TempStorage } from "@bc/base"


interface Props{
    info:any,
    index:number
}
const props = defineProps<Props>()

interface Data{
    dateal:any
}
const data = reactive<Data>({
    dateal:{}
})


interface Events {
    (e: "closeSales",afterSaleId:string,index:number): void
    (e: "receiving",afterSaleId:string,index:number): void
}

const emit = defineEmits<Events>()


watch(()=>props.info,(newValue,volValue)=>{
    data.dateal = newValue
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime( time ,'YYYY-MM-DD HH:mm')
})

const isRevise = computed(()=>{
    return [10, 20, 30, 10000010].includes(props.info.afterSaleCode)
})

/* 是否允许修改 */
const isShut = computed(()=>{
    return ![49999990, 50000000].includes(props.info.afterSaleCode)
})

/* 再次售后 */
const isAgain = computed(()=>{
    return [39999990].includes(props.info.afterSaleCode)
})

/* 是否允许仲裁 */
const isArbitrate = computed(()=>{
    return [39999990, 39999991, 41000010, 41000020].includes(props.info.afterSaleCode)
})

/* 填写物流 */
const isLogistics = computed(()=>{
    return [10000050, 10000060, 41999950].includes(props.info.afterSaleCode)
})

/* 确认收货 */
const isDelivery = computed(()=>{
    return [20000060].includes(props.info.afterSaleCode)
})

/* 自动取消售后 */
const isClear = computed(()=>{
    return [10000050, 10000060].includes(props.info.afterSaleCode)
})

/* 自动确认售后 */
const isSure = computed(()=>{
    return [20000061].includes(props.info.afterSaleCode)
})


// 再次/修改售后
const gotoApply = (type:number) => {

    const info = {
        image: props.info.productImages,
        subtitle: props.info.productType,
        title: props.info.productName,
        price: props.info.itemPrice,
        entityId: props.info.orderEntityId,
        paidAmount: props.info.itemPrice * props.info.purchaseQuantity,
        quantity: props.info.itemNumber,
        purchaseQuantity: props.info.purchaseQuantity
    }

    const salesObj = TempStorage.savewx({
        info,
        orderId: props.info.id,
        afterSaleId: props.info.afterSaleId,
        align: type
    })

    console.log({
        info,
        // orderId: props.info.id,
        afterSaleId: props.info.afterSaleId,
        align: type
    });
    

    if (![131586].includes(props.info.templateCode)) {
        upServiceSales({salesObj})
    }else{
        upSales({salesObj})
    }

    
}

// 关闭售后
const closeSales = () => {
    emit("closeSales",props.info.afterSaleId,props.index)
}

// 确认收货
const receiving = () => {
    emit("receiving",props.info.afterSaleId,props.index)

}

// 填写物流
const gotoLogis = () => {
    gotoExpressageAdd({ afterSaleId: props.info.afterSaleId })
}

// 查看详情
const tosalesDetail = () => {
    gotosalesDetail({id:props.info.afterSaleId})
}

// 申请仲裁
const gotoArbitrate = () =>{
    gotoAfterArbitrate({id:props.info.afterSaleId})
}

</script>

<style lang="scss" scoped>
.content{
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 24rpx;
    .shop_box{
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;
        .shop_img{
            width: 44rpx;
            height: 44rpx;
            border-radius: 50%;
            margin-right: 8rpx;
        }
        .shop_title{
            color: #666666;
            font-size: 24rpx;
        }
    }

    .serimg_box{
        width: 160rpx;
        height: 160rpx;
        position: relative;
        .serimg{
            width: 100%;
            height: 100%;
            border-radius: 6rpx;
        }
        .sercate{
            position: absolute;
            height: 38rpx;
            background: #02C765;
            border-radius: 0rpx 0rpx 12rpx 12rpx;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 22rpx;
            font-weight: 500;
            line-height: 38rpx;
            color: #FFFFFF;
            text-align: center;
            z-index: 30;
        }
    }

    .serig{
        flex: 1;
        padding-left: 20rpx;

        .serabout{
            .sername{
                font-size: 28rpx;
                font-weight: bold;
                line-height: 42rpx;
                color: #333333;
            }
            .serprice{
                font-size: 28rpx;
                font-weight: 500;
                color: #5D5D5D;
                margin-left: 18rpx;
            }
            .product_serprice{
                display: flex;
                flex-direction: column;
                .serprice{
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #5D5D5D;
                    margin-left: 18rpx;
                }
                .product_number{
                    color: #999999;
                    font-size: 24rpx;
                   text-align: end;
               }

            }
            .product_title{
                color: #333333;
                font-size: 28rpx;
                font-weight: bold;
            }
        }
        &.is_j{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .payment_box{
            display: flex;
            align-items: center;
            .payment_title{
                color: #333333;
                font-size: 24rpx;
                margin-right: 8rpx;
            }
            .payment_price{
                color: #FF1010;
                font-size: 24rpx;
            }
        }

        .seroption{
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            margin-top: 4rpx;
        }
        .serpay{
            margin-top: 42rpx;
            .sersay{
                font-size: 24rpx;
                font-weight: 400;
                color: #333333;
            }
            .sermoney{
                font-size: 30rpx;
                font-weight: bold;
                color: #FF1010;
                text{
                    font-size: 24rpx;
                }
            }
        }
    }
}
    .utcOrderTime{
        padding-top: 20rpx;
        box-sizing: border-box;
        color: #999999;
        font-size: 24rpx;
    }
    .sertime{
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        margin-top: 24rpx;
    }
    .sertype{
        height: 64rpx;
        background: #F8F8F8;
        border-radius: 8rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
        margin-top: 24rpx;
        padding: 0 24rpx;

        .serstus{
            height: 40rpx;
            line-height: 40rpx;
            background: #A6A0B2;
            border-radius: 6rpx;
            padding: 0 12rpx;
            margin-right: 12rpx;
            font-size: 22rpx;
            font-weight: 400;
            color: #FFFFFF;
        }
        .sercounter{
            margin-left: 30rpx;
        }
    }
.sermore{
    margin-top: 30rpx;
    justify-content: flex-end;
    .serbtn_btn{
        display: flex;
        align-items: center;
        .serbtn{
            margin-right: 16rpx;
            width: 146rpx;
            height: 52rpx;
            background: #FFFFFF;
            border: 2rpx solid #666666;
            color: #666666;
            font-size: 22rpx;
            font-weight: 400;
            text-align: center;
            line-height: 52rpx;
            border-radius: 38rpx;
        }
    }
}

</style>


