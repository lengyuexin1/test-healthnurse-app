<template>
    <div class="contraner" v-if="data.voucherObj.id">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'代金券'"></bc-page-navbar>
            </template>
            <view class="voucher_details">
                <div class="voucher_header">
                    <div class="voucher_header_title">保椿照护代金券</div>
                    <div class="voucher_header_desc">{{ data.voucherObj.name }}</div>
                    <div class="voucher_header_week">{{data.voucherObj.isRestrictTime==0?'全部时间可用': data.voucherObj.restrictTimeDesc }}</div>
                </div>
                <div class="voucher_label">
                    <div class="voucher_label_price">
                        ¥{{ (Number(data.voucherObj.price)/100).toFixed(2) }}
                        <!-- <div></div> -->
                        <text class="through_price">
                        ¥{{ (Number(data.priceItem.price)/100).toFixed(2) }}
                        </text>
                    </div>
                    <div class="voucher_label_guarantee">{{`${data.voucherObj.isAccrual==0?'不可累加':`单次可用${data.voucherObj.cntAccrual || 0}张`}`}};</div>
                    <div
                        class="voucher_label_guarantee"
                    >须知：{{data.voucherObj.isRestrictTime==0?'全部时间可用': data.voucherObj.restrictTimeDesc }}·截止日期 {{ timeformat(data.voucherObj.useDeadline) }}</div>
                    <div class="voucher_label_guarantee">保障：随时退·过期退</div>
                </div>
                <div class="voucher_Notice">
                    <div class="voucher_Notice_title">购买须知</div>
                    <div class="voucher_Notice_row">
                        <div class="voucher_Notice_period">
                            <image class="device_icon" :src="getAssetsUrl('/leyou/static/validityPeriod.svg')" mode="scaleToFill" />
                            <div>有效期</div>
                        </div>
                        <div class="voucher_Notice_days">购买后{{data.voucherObj.useEffectiveDays}}天有效</div>
                    </div>
                    <div class="voucher_Notice_row">
                        <div class="voucher_Notice_period">
                            <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherTime.svg')" mode="scaleToFill" />
                            <div>使用时间</div>
                        </div>
                        <div class="voucher_Notice_days">{{data.voucherObj.isRestrictTime==0?'全部时间可用': data.voucherObj.restrictTimeDesc }}</div>
                    </div>
                    <div class="voucher_Notice_row">
                        <div class="voucher_Notice_period">
                            <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherAddres.svg')" mode="scaleToFill" />
                            <div>适用范围</div>
                        </div>
                        <div
                            class="voucher_Notice_days"
                        >{{ data.voucherObj.range==0?'通用':data.voucherObj.range==1?`适用${data.voucherObj.rangeData}`:data.voucherObj.range==2?`不适用${data.voucherObj.rangeData}`:'' }}</div>
                    </div>
                    <div class="voucher_Notice_row">
                        <div class="voucher_Notice_period">
                            <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherRule.svg')" mode="scaleToFill" />
                            <div>使用规则</div>
                        </div>
                        <div class="voucher_Notice_days">·本单发票由商家提供，详情请咨询商家</div>
                        <div class="voucher_Notice_days">·每次仅限使用一张</div>
                        <div class="voucher_Notice_days" v-if="data.voucherObj.isExclusive == 1">·不可同时享受商家其他优惠</div>
                        <div class="voucher_Notice_days" v-if="data.voucherObj.isExclusive == 2">·可同时享受商家其他优惠</div>
                        <div class="voucher_Notice_days" v-if="data.voucherObj.isExclusive == 3">·可同时享受商家{{ data.voucherObj.exclusiveData }}优惠</div>
                        <div class="voucher_Notice_days">·有效期以具体时间为准</div>
                        <div
                            class="voucher_Notice_days"
                        >·每人最多购买{{`${data.voucherObj.isRestrictBuyQuantity==0?'不限制数量':`${data.voucherObj.restrictBuyQuantity}`}`}}张</div>
                    </div>
                </div>
            </view>

            <template #bottom>
                <view class="bottom_btn">
                    <div class="call" @click="tobay">
                        立即抢购
                        <span>¥{{ (Number(data.voucherObj.price)/100).toFixed(2) }}</span>
                    </div>
                </view>
            </template>

        </z-paging>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { formattime } from '@/common/formatTime'
import { gotoBalanceOrder } from '@/routes/order-routes'


import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { voucherdetail } from '@/api/service-api'
import { TempStorage } from "@bc/base"
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"


interface Props {
    id: string
}
const props = defineProps<Props>()

interface Data {
    voucherObj:any,
    priceItem:any,
}
const data = reactive<Data>({
    voucherObj:{},
    priceItem:{}
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

onMounted(() => {
    gethealthdetail(props.id)
})

const gethealthdetail = (id:string) => {
    voucherdetail({
        id
    }).then((res:any)=>{
        data.voucherObj = res
        data.priceItem = res.itemList[0]
    })
}

const tobay = () => {
    // 跳转购买页面传入2表示机构订单
    const uniqueId = TempStorage.savewx({
        itemId: data.voucherObj.id,
        voucherType: 1
    })
    // #ifdef MP-WEIXIN
    gotoBalanceOrder(uniqueId, 2)
    // #endif


    // #ifdef APP-PLUS
    let payJSON = JSON.stringify({
        itemId: data.voucherObj.id,
        voucherType: 1
    })
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // APP跳转小程序进行支付
    plus.share.getServices((res: any) => {
        let sweixin = null as any
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()

            PlatformManage.getToken().then((res:any)=>{
                console.log('获取userinfo',res);

                sweixin.launchMiniProgram({
                    id: 'gh_c2469c570746',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/pagesOrder/pages/balanceOrder/balanceOrder?payJSON=${payJSON}&userId=${res.id}&handle=2`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })
            })
        }
    })

    // #endif
}

</script>

<style lang="scss" scoped>
.introduce_icon {
    width: 140rpx;
    margin-left: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon_item_box {
        color: #878787;
        font-size: 20rpx;
        display: flex;
        flex-direction: column;
        .icon_item_img {
            width: 40rpx;
            height: 40rpx;
            margin-bottom: 6rpx;
        }
    }
}
.voucher_Notice {
    background: #ffffff;
    padding: 30rpx;
    border-radius: 24rpx;
    margin: 0 20rpx 20rpx 20rpx;
    .voucher_Notice_title {
        font-weight: 500;
        padding-top: 6rpx;
        font-size: 32rpx !important;
        color: #333333 !important;
    }
    .voucher_Notice_row:last-child {
        border-bottom: none !important;
    }
    .voucher_Notice_row {
        display: flex;
        flex-direction: column;
        margin-top: 32rpx;
        padding-bottom: 24rpx;
        border-bottom: 2rpx solid #f2f2f2;
        .voucher_Notice_days {
            font-size: 28rpx;
            color: #666666;
            padding-top: 12rpx;
        }
        .voucher_Notice_period {
            display: flex;
            image {
                width: 32rpx;
                height: 32rpx;
                margin-right: 12rpx;
            }
            .voucher_Notice_days {
                font-size: 28rpx;
                color: #666666;
                margin-top: 12rpx;
            }
            align-items: center;
        }
    }
}
.voucher_label {
    background: #ffffff;
    border-radius: 12px;
    font-size: 28rpx;
    color: #666666;
    margin: 20rpx;
    padding: 0 30rpx 36rpx 30rpx;
    .voucher_label_price {
        height: 106rpx;
        border-bottom: #f2f2f2;
        display: flex;
        align-items: center;
        border-bottom: 2rpx solid #f2f2f2;
        font-size: 40rpx;
        color: #f50606;
        div {
            margin: 0 26rpx;
            font-size: 24rpx;
            color: #f88400;
        }
        .through_price{
            font-size: 28rpx;
            color: #999999;
            text-decoration: line-through;
            margin-left: 12rpx;
        }
    }
    .voucher_label_guarantee {
        padding-top: 16rpx;
    }
}
.voucher_header {
    padding: 30rpx;
    margin: 30rpx 20rpx 0 20rpx;
    background: linear-gradient(180deg, #ffe9e9 0%, #ffffff 100%);
    border-radius: 24rpx;
    .voucher_header_title {
        font-size: 28rpx;
        color: #666666;
        padding-bottom: 16rpx;
    }
    .voucher_header_desc {
        font-size: 40rpx;
        color: #f35754;
        margin-bottom: 24rpx;
        padding-bottom: 24rpx;
        border-bottom: 2px solid #f2f2f2;
    }
    .voucher_header_week {
        padding-top: 24rp;
        font-size: 28rpx;
        color: #999999;
    }
}
.contraner {
    .details_box {
        padding: 20rpx;
        box-sizing: border-box;
        .swiper_box {
            width: 100%;
            height: 710rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative;
            margin-bottom: 20rpx;
            .swiper {
                width: 100%;
                height: 100%;
                .swiper_item {
                    width: 100%;
                    height: 100%;
                    // border: 1px solid red;
                    box-sizing: border-box;
                    background: #ffffff;
                }
            }
            .swiper_indicator {
                position: absolute;
                bottom: 20rpx;
                right: 20rpx;
                // width: 76rpx;
                height: 28rpx;
                background: #000000;
                opacity: 0.14;
                border-radius: 24rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8rpx 12rpx;
                box-sizing: border-box;
                .swiper_indicator_item {
                    width: 12rpx;
                    height: 12rpx;
                    background: #ffffff;
                    border-radius: 50%;
                    opacity: 0.4;
                    margin-right: 8rpx;
                    &.isswiper {
                        background: #ffffff;
                        opacity: 1;
                    }
                    &.one_notright {
                        margin-right: 0rpx;
                    }
                }
            }
        }
        .introduce {
            width: 100%;
            height: 304rpx;
            border-radius: 24rpx;
            background: #ffffff;
            padding: 30rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;
            .introduce_top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;
                .introduce_title_box {
                    width: 75%;
                    .introduce_title {
                        color: #333333;
                        font-size: 34rpx;
                        margin-bottom: 16rpx;
                        font-weight: bold;
                    }
                    .introduce_rate_box {
                        display: flex;
                        align-items: center;
                        .introduce_num {
                            color: #ff9f3e;
                            margin-right: 16rpx;
                            margin-left: 8rpx;
                            font-size: 24rpx;
                        }
                        .introduce_rate {
                            color: #333333;
                            font-size: 24rpx;
                        }
                    }
                }
                .introduce_icon {
                    // width: 120rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .icon_item_box {
                        color: #878787;
                        font-size: 20rpx;
                        display: flex;
                        flex-direction: column;
                        .icon_item_img {
                            width: 40rpx;
                            height: 40rpx;
                            margin-bottom: 6rpx;
                        }
                    }
                }
            }
            .device_list {
                .device_item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30rpx;
                    width: 100%;
                    padding-left: 20rpx;
                    box-sizing: border-box;
                    .device_icon {
                        width: 36rpx;
                        height: 36rpx;
                        // border: 1px solid red;
                        box-sizing: border-box;
                        margin-right: 16rpx;
                    }
                    .device_text {
                        color: #666666;
                        font-size: 26rpx;
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        .facilities {
            padding: 30rpx;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 24rpx;
            margin-bottom: 20rpx;
            .facilities_title {
                color: #333333;
                font-size: 28rpx;
                margin-bottom: 16rpx;
                font-weight: bold;
            }
            .facilities_list {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .facilities_item {
                    border-radius: 30rpx;
                    background: #f2f2f2;
                    color: #666666;
                    font-size: 26rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12rpx 16rpx;
                    margin-right: 16rpx;
                    margin-bottom: 20rpx;
                    .facilities_item_icon {
                        width: 28rpx;
                        height: 28rpx;
                        border: 50%;
                        background: #29c86f;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 28rpx;
                        color: #ffffff;
                        margin-right: 8rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .facilities_item_text {
                        font-size: 26rpx;
                        color: #666666;
                    }
                }
            }
        }
        .img_details {
            padding: 30rpx;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 24rpx;
            .img_details_title {
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 16rpx;
            }
            .img_list {
                .img_item {
                    width: 100%;
                    // height: 200rpx;
                    display: block;
                    // border: 1px solid red;
                }
            }
        }
    }
    .bottom_btn {
        width: 100%;
        display: flex;
        // position: fixed;
        // bottom: 0;
        align-items: center;
        justify-content: center;
        padding: 20rpx 28rpx;
        padding-bottom: 48rpx;
        box-sizing: border-box;
        background: #ffffff;
        .call {
            width: 100%;
            height: 84rpx;
            font-size: 28rpx;
            text-align: center;
            line-height: 84rpx;
            color: #ffffff;
            background: #29c86f;
            border-radius: 42rpx;
            span {
                font-size: 28rpx;
                color: #ffd816;
            }
        }
    }
}
</style>

