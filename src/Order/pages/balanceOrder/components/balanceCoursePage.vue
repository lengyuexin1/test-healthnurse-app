<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'解锁课程'"></bc-page-navbar>
            </template>

            <view class="content">
                <view class="card_box">
                    <!-- <courseCard :cardObj="data.cardObj"></courseCard> -->
                    <image
                        class="card_left"
                        :src="data.cardObj.cover"
                        mode="scaleToFill"
                    />
                    <view class="card_right">
                        <view class="card_title">{{ data.cardObj.coursetitle }}</view>
                        <view class="card_price">
                            ￥{{ data.cardObj.price / 100 }}
                        </view>
                    </view>
                </view>

                <view class="course_itemPrice">
                    <view class="item_title">产品总价</view>
                    <view class="item_priceNumber">￥{{ data.cardObj.price / 100 }}</view>
                </view>

                <view class="pay_box">
                    <view class="pay_title">支付方式</view>
                    <view class="pay_text">微信支付</view>
                </view>

                <view class="rules_box">
                    <view class="rules_title">购买须知</view>
                    <view class="rules_item">
                        <view class="rules_li"></view>
                        <view class="rules_text">您将购买的商品为虚拟内容服务，购买后不支持退订，转让，退换，请斟酌确认。</view>
                    </view>
                    <view class="rules_item not_bottom">
                        <view class="rules_li"></view>
                        <view class="rules_text">购买后您可在”我的-云课堂“中查看和使用。</view>
                    </view>
                </view>
            </view>
            <template #bottom>
                <view class="play_box">
                    <view class="play_price">
                        合计:
                        <view class="play_number">￥{{ price / 100 }}</view>
                    </view>
                    <view class="play_btn" @click="tobuy">
                        立即支付
                    </view>
                </view>
            </template>

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

import { TempStorage } from "@bc/base"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import courseCard from '@/Order/components/courseCard.vue'
import BCNotify from '@/components/notify/index.vue'
import { courseCreate, houseOrderPay } from '@/api/order-api'
import { packPayment } from '@/libs/pay/pay-tools'
import { courseOrderDetail } from '@/routes/order-routes'


interface Props {
    price:number,
    cover:string,
    coursetitle:string,
    itemId:string
}
const props = defineProps<Props>()

interface cardObjtype {
    price:number,
    cover:string,
    coursetitle:string,
}

interface Data {
    cardObj:cardObjtype,
    itemId:string

}
const data = reactive<Data>({
    cardObj:{
        price:0,
        cover:'',
        coursetitle:'',
    },
    itemId:''

})

const bcNotify = ref()

onMounted(() => {
    data.cardObj = {
        price: props.price,
        cover: props.cover,
        coursetitle: props.coursetitle,
    }
    console.log('data.cardObj',data.cardObj);
    
    data.itemId = props.itemId
})

const tobuy = () =>{
    courseCreate({
        userRelCouponIds:[],
        entity:{
            quantity:1,
            itemId:data.itemId,
            note:'',
        }
    }).then((res:any)=>{
        uppay(res)
    }).catch(()=>{
        bcNotify.value.success('结算失败')
    })
}

const uppay = (orderId:string) => {
    uni.showLoading({
        title: '调起支付',
        mask: true
    })
    const openid = uni.getStorageSync('openid')
    /* 获取支付参数 */
    houseOrderPay({ 
        orderId, 
        openid: openid != '' ? openid : undefined,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid,
    }).then(async (res) => {
        /* 调起支付 */
        // #ifdef MP-WEIXIN || APP-PLUS
        packPayment(res.payParams).then((ret:any) => {
            console.log("支付结果", ret)
            if (ret.isSuccess && ret.status === 'CPCN') {
                return false
            }
            // bcNotify.value.success('支付成功')
            tocourseOrderDetail(orderId)
        }).catch(() => {
            // bcNotify.value.error('支付失败')
            tocourseOrderDetail(orderId)
        })
        // #endif
    }).catch((err) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

const tocourseOrderDetail = (orderId:any) => {
    courseOrderDetail(orderId)
}

</script>
  
<style lang="scss" scoped>
.content{
    padding: 20rpx;
    box-sizing: border-box;
    .card_box{
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        border-radius: 22rpx;
        background: #FFFFFF;
        margin-bottom: 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .card_left{
            width: 180rpx;
            height: 180rpx;
            border-radius: 10rpx;
        }
        .card_right{
            width: 450rpx;
            height: 180rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .card_title{
                font-size: 30rpx;
                color: #333333;
                font-weight: 500;
            }
            .card_price{
                font-weight: 500;
                font-size: 34rpx;
                color: #FC3848;
            }

        }
    }
    .course_itemPrice{
        width: 100%;
        padding: 0rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .item_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
        }
        .item_priceNumber{
            font-weight: 500;
            font-size: 34rpx;
            color: #FF1010;
        }
    }
    .pay_box{
        width: 100%;
        background: #fff;
        padding: 28rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;
        border-radius: 24rpx;
        .pay_title{
            font-weight: 500;
            color: #333333;
            font-size: 30rpx;
        }
        .pay_text{
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
        }

    }
    .rules_box{
        background: #fff;
        padding: 30rpx;
        box-sizing: border-box;
        border-radius: 24rpx;
        .rules_title{
            font-weight: 500;
            color: #333333;
            font-size: 30rpx;
            margin-bottom: 20rpx;
        }
        .rules_item{
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
            flex-shrink: 0;
            &.not_bottom{
                margin-bottom: 0rpx;
            }

            .rules_li{
                width: 10rpx;
                height: 10rpx;
                background: #9D9D9D;
                border-radius: 50%;
                margin-right: 16rpx;
                flex-shrink: 0;

            }
            .rules_text{
                font-weight: 400;
                font-size: 28rpx;
                color: #666666;
            }
        }
    }
}
.play_box{
    padding: 20rpx 30rpx;
    padding-bottom: 68rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    .play_price{
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #333333;
        .play_number{
            font-weight: 500;
            font-size: 36rpx;
            color: #FF1010;
        }
    }
    .play_btn{
        padding: 22rpx 100rpx;
        box-sizing: border-box;
        border-radius: 42rpx;
        background: #EA3E1A;
        color: #FFFFFF;
        font-size: 28rpx;
    }
}
</style>
  