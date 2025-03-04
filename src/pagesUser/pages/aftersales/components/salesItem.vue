<template>
    <view class="content">
        <view class="serbox row">
            <view class="serimg_box">
                <image
                    class="serimg"
                    :src="info.image"
                    mode="scaleToFill"
                />
                <view class="sercate" v-if="info.categoryName">{{info.categoryName}}</view>
            </view>
            <view class="serig" v-if="info.templateCodeId != 131850">
                <view class="serabout row i-center j-between">
                    <view class="sername u-line-1">{{info.title}}</view>
                    <view class="serprice">￥{{ (info.price / 100) }}</view>
                </view>
                <view class="seroption u-line-1">{{info.subtitle}}</view>
                <view class="serpay row i-center">
                    <view class="sersay">已支付：</view>
                    <view class="sermoney"><text>￥</text>{{ (info.paidAmount / 100) }}</view>
                </view>
            </view>
            <view class="serig is_j" v-else>
                <view class="serabout row j-between">
                    <view class="sername u-line-1">{{info.title}}</view>
                    <view class="quantity_price">
                        <view class="serprice">￥{{(info.unitPrice / 100)}}</view>
                        <view class="quantity">
                            x{{ info.quantity }}
                        </view>
                    </view>
                </view>
                <view class="serpay row i-center">
                    <view class="sersay">已支付：</view>
                    <view class="sermoney"><text>￥</text>{{((info.unitPrice * info.quantity) / 100)}}</view>
                </view>

            </view>
        </view>
        <view class="sertime" v-if="info.templateCodeId == 131850">下单时间: {{ timeformat(info.utcPay) }}</view>
        <view class="sertime" v-if="info.utcVisitStart != '0'">服务时间：{{ timeformat(info.utcVisitStart) }} 至 {{ timeformat(info.utcVisitEnd) }}</view>
        <view class="sertype row i-center">
            <view class="serstus" v-if="info.statusName">{{info.statusName}}</view>
            <view class="u-line-1">商品正在售后保障期间</view>
        </view>

        <view class="sermore row i-center">
            <view class="serbtn_btn">
                <view class="serbtn" @click="gotoApply(1)">
                    申请售后
                </view>

            </view>
        </view>
        <u-toast ref="uToast" />
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'
import { upSales, upServiceSales } from "@/routes/user-routes"
import { TempStorage } from "@bc/base"

interface Props{
    info:any
}
const props = defineProps<Props>()

interface Data{
}
const data = reactive<Data>({
})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const timeformat = computed(() => (time:number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm')
})

// 申请售后
const gotoApply = (type:number) => {

    const info = {
        image: props.info.image,
        subtitle: props.info.subtitle,
        title: props.info.title,
        price: props.info.price,
        entityId: props.info.entityId,
        paidAmount: props.info.paidAmount,
        quantity: props.info.quantity,
        purchaseQuantity: props.info.quantity,
        unitPrice: props.info.unitPrice ? props.info.unitPrice : null
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
    })

    if ([131586].includes(props.info.templateCodeId)) {
        upSales({ salesObj })
    }
    else {
        upServiceSales({ salesObj })
    }

}

</script>

<style lang="scss" scoped>
.content{
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    margin-bottom: 24rpx;

    .serbox{
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
                .quantity_price{
                    display: flex;
                    flex-direction: column;
                    .quantity{
                        font-size: 24rpx;
                        color: #999999;
                        text-align: end;
                    }
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
            &.is_j{
                display: flex;
                justify-content: space-between;
                flex-direction: column;
            }
        }
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
    }
    .sermore{
        margin-top: 30rpx;
        justify-content: flex-end;

        .serbtn_btn{
            margin-right: 16rpx;
            .serbtn{
                width: 146rpx;
                height: 52rpx;
                background: #EA3E1A;
                color: #FFFFFF;
                font-size: 22rpx;
                font-weight: 400;
                text-align: center;
                line-height: 52rpx;
                border-radius: 38rpx;
            }
        }
    }
}
</style>
