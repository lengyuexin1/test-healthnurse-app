<template>
    <view class="container" v-if="showInfo">
        <!-- isinstitution 区分机构服务订单与正常订单 -->
        <view class="order_info_title" v-if="!isinstitution">服务信息</view>
        <view class="shop_box" v-else>
            <image
                class="shop_img"
                :src="serviceInfo.shopinfo.shopIcon"
                mode="scaleToFill"
            />
            <view class="shop_name">
                {{ serviceInfo.shopinfo.shopName }}
            </view>
        </view>
        <view class="order_info_top">
            <view class="order_info_img_box">
                <image
                    class="order_info_img"
                    :src="serviceInfo.info.image"
                    mode="aspectFill"
                />
                <view class="order_info_text" v-if="!isinstitution">
                    <view class="order_info_text_title">{{ serviceInfo.info.title }}</view>
                    <view class="order_info_text_subtitle">{{ serviceInfo.info.subtitle }}</view>
                    <view class="order_info_price">￥{{ serviceInfo.info.paidAmount / 100}}</view>
                </view>
                <!--  -->
                <view class="order_info_text" v-else>
                    <view class="agency_service_title">{{ serviceInfo.info.title }}</view>
                    <div class="rule_text_box">
                        <div class="rule_item_text" v-if="serviceInfo.info.cardExtend.isRestrictTime == 0">
                            <text>{{ '周一至周日全天可用' }}</text>
                            <text>过期退</text>
                        </div>
                        <div class="rule_item_text" v-else>
                            <text>{{ serviceInfo.info.cardExtend.restrictTimeDesc }}不可用</text>
                            <text>过期退</text>
                        </div>
                    </div>
                    <div class="mallprice_box">
                        <div class="mallprice">￥{{ (serviceInfo.info.unitPrice) / 100 }}</div>
                        <div class="mallprice_number">x{{ serviceInfo.info.quantity }}</div>
                    </div>
                </view>

            </view>

            <view class="order_info_shop_box" v-if="!isinstitution">
                <view></view>
                <view class="order_info_shop">
                    服务由<text class="shop_name">{{ serviceInfo.shopinfo.shopName }}</text>提供
                </view>
            </view>
        </view>
        <template v-if="!isKeep && !isinstitution">
            <view class="service_info_item" v-if="serviceInfo.addressInfo">
                <view class="info_title">服务地址</view>
                <view class="info_text_box">
                    <view class="info_text">
                        <text>{{ serviceInfo.addressInfo.area }}</text><text>{{ serviceInfo.addressInfo.address }}</text>
                    </view>
                    <view class="info_text">
                        <text>{{ serviceInfo.addressInfo.name }}</text><text>{{ serviceInfo.addressInfo.mobile }}</text>
                    </view>
                </view>
            </view>
            <view class="service_info_item" v-if="serviceInfo.isOrderPackage == 0">
                <view class="info_title">上门时间</view>
                <view class="info_text">
                    {{ date(serviceInfo.utcVisitStart) }}
                    <text v-if="!showVisitEnd">~ {{ date(serviceInfo.utcVisitEnd)}}</text>
                </view>
            </view>
        </template>

        <template v-else>
            <!-- && !ismany -->
            <div class="record_box" v-if="[131079,196611].includes(serviceInfo.status)">
                <div class="refund_box" v-if="serviceInfo.info.refundableQuantity">
                    <div class="refund" @click.stop="gotorefund">申请退款</div>
                </div>
                <div class="record_list">
                    <div class="record_title_box">
                        <div class="record_title">待使用</div>
                        <div class="use_box" v-if="serviceInfo.info.refundableQuantity && serviceInfo.info.refundableQuantity > 0">
                            <div class="use_time">{{showutcTime(serviceInfo.info.consumeCardList)}}</div>
                            <div class="use_state">过期</div>
                        </div>
                    </div>
                    <div v-for="(item,index) in serviceInfo.info.consumeCardList" :key="index" @click="tominutes(index)">
                        <div class="record_item" v-for="(recordItem) in item.cardCodes" :key="recordItem">
                            <div class="record_title" :class="{ 'isuse': item.status == 196611 || item.status == 196613 }">{{ recordItem }}</div>
                            <div class="use_box">
                                <div class="use_time" v-if="item.status != 131079">{{timeformat(item.utcTime)}}</div>
                                <!-- 待使用 -->
                                <div class="use_state_isuse" v-if="item.status == 131079">{{item.statusName}}</div>
                                <!-- 已完成 -->
                                <div class="use_state" v-if="item.status == 196611">{{item.statusName}}</div>
                                <!-- 退款中 -->
                                <div class="use_state" v-if="item.status == 196612">{{item.statusName}}</div>
                                <!-- 已取消 -->
                                <div class="use_state" v-if="item.status == 196613">{{item.statusName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <view class="service_info_item" v-if="!isinstitution">
            <view class="info_title">备注信息</view>
            <view class="info_text">
                <text>{{ serviceInfo.shopinfo.note ? serviceInfo.shopinfo.note : '--' }}</text>
            </view>
        </view>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

import { formattime } from '@/common/formatTime'
import { torefundOrder } from '@/routes/order-routes'

interface Props {
    serviceInfo:any,
    showInfo:boolean,
}
const props = defineProps<Props>()


interface data {
    shopInfo:any
}
const data = reactive<data>({
    shopInfo: {}
})

// 判断是否机构订单
const isinstitution = computed(() => {
    return props.serviceInfo.kind === 3
})


const date = computed(() => (time:number) => {
    return formattime((time * 1000), 'YYYY-MM-DD HH:mm')
})

const isKeep = computed(() => {
    return [65795, 65796].includes(props.serviceInfo.templateCodeId)
})

const showVisitEnd = computed(() => {
    return ![4, 7].includes(props.serviceInfo.shopList[0].entityList[0].optionExtend?.serviceWorkingHours.unit)
})


const timeformat = computed(() => (time:number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm:ss')
})

const showutcTime = computed(() => (timeList:any) => {
    const timeObj = timeList.find((item:any) => {
        return item.status == 131079
    })
    if (timeObj) {
        return formattime(timeObj.utcTime, 'YYYY-MM-DD HH:mm')
    }
})

onMounted(() => {
    console.log('props.serviceInfo.shopInfo', props.serviceInfo.info)
})


const gotorefund = () => {
    // 申请退款
    torefundOrder({ orderId: props.serviceInfo.id })
}

const tominutes = (index:number) => {
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
                width: 420rpx;
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
        margin-bottom: 40rpx;
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
