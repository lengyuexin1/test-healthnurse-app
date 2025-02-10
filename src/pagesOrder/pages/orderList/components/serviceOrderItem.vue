<template>
    <view class="container">
        <view class="order" v-for="shopItem in props.orderInfo.shopList" :key="shopItem.shopId" @click="toOrderDetail">
            <view class="order_shop">
                <view class="order_shop_box">
                    <image
                        class="shop_img"
                        :src="shopItem.shopIcon"
                        mode="aspectFill"
                    />
                    <view class="shopName" >
                        {{ shopItem.shopName }}
                    </view>
                </view>
                <view></view>
                <view v-if="false" class="statusName">{{ props.orderInfo.statusName }}</view>
            </view>
            <view class="entity_box" v-for="entityItem in shopItem.entityList" :key="entityItem.entityId">
                <view class="entity_good">
                    <image
                        class="entity_good_img"
                        :src="entityItem.image"
                        mode="aspectFill"
                    />
                    <view class="entity_good_text">
                        <view class="entity_good_text_top">
                            <view class="entity_good_name">{{ entityItem.title }}</view>
                            <view class="entity_good_subtitle">{{ entityItem.subtitle }}</view>
                        </view>
                        <view class="entity_good_text_bottom">
                            <view class="price_text">支付:</view>
                            <view class="price_number">￥{{ (entityItem.unitPrice * entityItem.quantity) / 100 }}</view>
                        </view>
                    </view>
                    <view class="entity_good_price">
                        ￥{{ entityItem.paidAmount / 100 }}
                    </view>
                </view>
                <view v-if="props.orderInfo.isOrderPackage == 0">
					<view class="order-time"
                    v-if="props.orderInfo.utcVisitStart && props.orderInfo.kind != 3">
                        服务时间：{{ date(props.orderInfo.utcVisitStart) }}
                        <text v-if="props.orderInfo.utcVisitEnd && showVisitEnd">至 {{ date(props.orderInfo.utcVisitEnd) }}</text>
                    </view>
					<view class="order-time" v-else>
						下单时间：{{ date(props.orderInfo.utcCreated)}}
					</view>
				</view>
                <view class="order_type">
                    <view class="order-tpe-lef">
						<view class="order-tpe-tex">{{props.orderInfo.statusName}}</view>
					</view>
                    <view class="order_type_text" v-if="props.orderInfo.statusName == '待付款'">
						<text class="typetex" v-if="props.orderInfo.statusDetailIntro <= 0">{{ isNaN(props.orderInfo.statusDetailIntro) ? props.orderInfo.statusDetailIntro : '请支付' }}</text>
                        <template v-else>
							<text class="typetex">您的订单还有</text>
                            <TnCountDown separator-color="#666666" size="24" :time="props.orderInfo.statusDetailIntro" :show-hour="false" separator-mode="cn"/>
							<text class="typetex texmgin">过期，请尽快支付</text>
						</template>
                    </view>
                    <text class="typetex" v-else>{{props.orderInfo.statusDetailIntro || ''}}</text>

					<text class="typetex retreat" v-if="props.orderInfo.cancelRefund">退款金额￥{{props.orderInfo.cancelRefund / 100}}</text>

                </view>

                <view class="order-botom" v-if="isCancel || isLaint">
                    <!--  width="118" height="60" -->
                    <TnBubbleBox @click="BubbleBtn" :options="bubbleOptions" option-item-padding="12rpx" >
                        <view class="BubbleBox">更多</view>
                    </TnBubbleBox>
                    <view class="order-allbtn">
						<view class="order-allbtn-contact btn-border-green" v-if="![65796].includes(props.orderInfo.templateCodeId) && props.orderInfo.actionableList.includes('show_qrcode')"
							>
							<text class="order-allbtn-contact-text">出示二维码</text>
						</view>

						<view class="order-allbtn-contact btn-border-grey" v-if="props.orderInfo.actionableList.includes('edit') && props.orderInfo.kind != 3"
							>
							<text class="order-allbtn-contact-text">修改订单</text>
						</view>
						<view class="order-allbtn-contact btn-border-grey" v-if="props.orderInfo.actionableList.includes('after_sale')"
							>
							<text class="order-allbtn-contact-text">申请售后</text>
						</view>

						<view class="order-allbtn-contact btn-border-green" v-if="props.orderInfo.actionableList.includes('pay')" >
							<text class="order-allbtn-contact-text">去支付</text>
						</view>

						<view class="order-allbtn-contact btn-border-green" v-if="props.orderInfo.actionableList.includes('show_card')" >
							<text class="order-allbtn-contact-text">查看使用码</text>
						</view>

						<view class="order-allbtn-contact btn-border-green" v-if="props.orderInfo.actionableList.includes('use_now')">
							<text class="order-allbtn-contact-text">立即使用</text>
						</view>

						<view class="order-allbtn-contact btn-border-kong" v-if="props.orderInfo.actionableList.includes('comment')"
						>
							<text class="order-allbtn-contact-text">去评价</text>
						</view>

					</view>
                </view>

            </view>

        </view>

    </view>
</template>


<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnBubbleBox from '@tuniao/tnui-vue3-uniapp/components/bubble-box/src/bubble-box.vue'

import { gotoOrderDetail } from "@/routes/order-routes"


import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')


interface Props {
    orderInfo:any
}

const props = defineProps<Props>()

interface Events {
    (e: "cancelOrder", obj: any): void
}
const emit = defineEmits<Events>()


interface data {
}
const data = reactive<data>({
})


const date = computed(() => (tiem:number) => {
    return dayjs(tiem * 1000).format('YYYY-MM-DD HH:mm:ss')
})

const showVisitEnd = computed(() => {
    return ![4, 7].includes(props.orderInfo.shopList[0].entityList[0].optionExtend?.serviceWorkingHours.unit)
})


const isCancel = computed(() => {
    return (props.orderInfo.actionableList.includes("cancel") || props.orderInfo.actionableList.includes("apply_refund"))
})
const isLaint = computed(() => {
    return props.orderInfo.actionableList.includes("complaint")
})

const bubbleOptions = computed(() => {
    // {text:'test',id:1}
    const bubbleOptionslist = []
    console.log('props.orderInfo.actionableList', props.orderInfo.actionableList)

    if (props.orderInfo.actionableList.includes("cancel") || props.orderInfo.actionableList.includes("apply_refund")) {
        bubbleOptionslist.push({ text: '取消订单', id: 1 })
    }
    if (props.orderInfo.actionableList.includes("complaint")) {
        bubbleOptionslist.push({ text: '纠纷申诉', id: 2 })
    }
    return bubbleOptionslist
})

const cancelOrder = () => {
    console.log('取消订单')
    emit('cancelOrder', props.orderInfo)
}

const BubbleBtn = (index:number) => {
    if (bubbleOptions.value[index].id == 1) {
        cancelOrder()
    }
    else if (bubbleOptions.value[index].id == 2) {
        console.log('纠纷申诉')
    }

}

const toOrderDetail = () => {
    gotoOrderDetail(props.orderInfo.id)
}

</script>

<style scoped>
:deep(.text) {
    font-size: 20rpx;
}
:global(.text) {
    font-size: 20rpx;
}
:deep(.tn-bubble-box__option-item){
    padding: 16rpx 20rpx !important;
}
:global(.tn-bubble-box__option-item){
    padding: 16rpx 20rpx !important;
}
</style>

<style lang="scss" scoped>
.container{
    width: 100%;
    background: #fff;
    border-radius: 24rpx;
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .order_shop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 22rpx;
        .order_shop_box{
            display: flex;
            align-items: center;
            .shop_img{
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                margin-right: 8rpx;
            }
            .shopName{
                font-size: 24rpx;
                color: #666666;
            }
        }

    }
    .entity_box{
        .entity_good{
            display: flex;
            justify-content: space-between;
            margin-bottom: 16rpx;
            .entity_good_img{
                width: 160rpx;
                height: 160rpx;
                border-radius: 16rpx;
                margin-right: 20rpx;
            }
            .entity_good_text{
                width: 368rpx;
                height: 160rpx;
                margin-right: 18rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .entity_good_text_top{
                    .entity_good_name{
                        color: #333333;
                        font-size: 30rpx;
                    }
                    .entity_good_subtitle{
                        color: #999999;
                        font-size: 26rpx;
                    }
                }
                .entity_good_text_bottom{
                    display: flex;
                    align-items: center;
                    .price_text{
                        color: #333333;
                        font-size: 24rpx;
                    }
                    .price_number{
                        font-size: 28rpx;
                        color: #FF1010;
                    }
                }
            }
            .entity_good_price{
                color: #666666;
                font-size: 28rpx;
            }
        }
        .order-time{
            font-size: 24rpx;
            color: #999999;
            margin-bottom: 20rpx;
        }
        .order_type{
            background-color: #f5f5f5;
            height: 54rpx;
            border-radius: 6rpx;
            display: flex;
            align-items: center;
            margin-bottom: 24rpx;
            .order_type_text{
                display: flex;
                align-items: center;
            }
            .order-tpe-lef {
                position: relative;
                padding: 0 72rpx 0 20rpx;
                height: 54rpx;
                background: linear-gradient(
                            -135deg,
                            transparent 22px,
                            #e5c6b4 22px,
                            #fbe8d3 100%
                        )
                        top right,
                    linear-gradient(
                            -45deg,
                            transparent 22px,
                            #e5c6b4 22px,
                            #fbe8d3 100%
                        )
                        bottom right;
                background-size: 100% 50%;
                background-repeat: no-repeat;
                .order-tpe-tex {
                    font-size: 24rpx;
                    font-weight: bold;
                    color: #8a511f;
                    text-align: center;
                    line-height: 54rpx;
                    position: relative;
                }
            }
        }
        .order-botom {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            position: relative;
            border-top: 2rpx solid #F2F2F2;
            padding-top: 24rpx;
            padding-left: 18rpx;
            box-sizing: border-box;

        }
        .BubbleBox{
            font-size: 24rpx;
            color: #919191;
        }
        .order-allbtn {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            justify-content: flex-end;

            .invoicebox {
                position: absolute;
                top: 0rpx;
                left: 0rpx;
            }

            .right {
                /* #ifndef APP-NVUE */
                display: flex;
                /* #endif */
                flex-direction: row;
                flex: 1;
                justify-content: flex-start;
                align-items: center;
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
            }

            &-contact {
                /* #ifndef APP-NVUE */
                display: flex;
                /* #endif */
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-left: 20rpx;
                width: 150rpx;
                height: 60rpx;
                border-radius: 30rpx;

                &-text {
                    border-radius: 38rpx;
                    font-size: 28rpx;
                    font-weight: 400;
                }
            }

            &-text {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                position: relative;
                width: 120rpx;
                height: 60rpx;
            }

            .order-allbtn-cls {
                position: absolute;
                top: 60rpx;
                right: 0rpx;
                background: #ffffff;
                width: 120rpx;
                height: 60rpx;
                font-size: 24rpx;
                font-weight: 400;
                color: #333333;
                text-align: center;
                line-height: 60rpx;
                border-radius: 12rpx;

                .order-allbtn-fix {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: #f2f2f2;
                    z-index: 9;
                    opacity: 0;
                    display: none;
                }
                .order-allbtn-opt {
                    // position: absolute;
                    position: relative;
                    z-index: 99;
                    text-align: center;
                    width: 100%;
                    box-shadow: 0rpx 0rpx 12rpx rgba(0, 0, 0, 0.08);
                    background: #ffffff;
                }
            }
        }

        .btn-border-green {
            border: 2rpx solid #29c86f;
            background-color: #29c86f;
            padding: 8rpx 14rpx;
            border-radius: 32rpx;
            white-space: nowrap;
            .order-allbtn-contact-text {
                color: #ffffff;
            }
        }

        .btn-border-kong {
            border: 2rpx solid #29c86f;

            .order-allbtn-contact-text {
                color: #29c86f;
            }
        }

        .btn-border-grey {
            border: 2rpx solid #d2d2d2;

            .order-allbtn-contact-text {
                color: #666666;
            }
        }
    }
}
.typetex {
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    margin-left: -16rpx;
    &.retreat {
        margin-left: 4rpx;
        color: #29c86f;
    }
    &.texmgin {
        margin-left: 0rpx;
    }
}
</style>
