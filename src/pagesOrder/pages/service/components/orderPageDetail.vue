<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'订单详情'"></bc-page-navbar>
            </template>

            <view class="content">
                <view class="orderState">
                    <orderState :osObj="data.osObj"></orderState>
                </view>
                <view class="order_info">
                    <orderInfo :serviceInfo="data.serviceInfo" :showInfo="data.showInfo" ></orderInfo>
                </view>

                <view class="workerInfo" v-if="![65537,262146].includes(data.osObj.status) && !isinstitution">
                    <workerInfo :serviceInfo="data.serviceInfo" :showInfo="data.showInfo"></workerInfo>
                </view>

                <view v-if="isinstitution && data.serviceInfo.info.cardExtend.typeId == 1">
                    <!-- 机构详情 -->
                    <div class="institution_box" v-if="isinstitution">
                        <!-- detailObj -->
                        <image class="institution_img" :src="data.detailObj.thumb" mode="scaleToFill" />
                        <div class="institution_text_box">
                            <div class="institution_title">{{ data.detailObj.shopName }}</div>
                            <div class="institution_time_box">
                                <div class="institution_time" style="margin-right:8rpx;">{{ data.detailObj.categoryNames && data.detailObj.categoryNames[0] }}</div>
                                <div class="institution_time">{{ data.detailObj.districtName }}</div>
                            </div>
                            <div class="institution_address">{{ data.detailObj.area }}</div>
                        </div>
                    </div>

                    <!-- 机构产品详情 -->
                    <div class="product_box">
                        <div class="contit">套餐详情</div>
                        <div class="product_list">
                            <div
                                class="product_item"
                                :class="{ 'notbottom': data.serviceInfo.info.cardExtend.itemList.length == index }"
                                v-for="(item,index) in data.serviceInfo.info.cardExtend.itemList"
                                :key="item.id"
                            >
                                <div class="product_title">{{ item.name }}</div>
                                <div class="product_right">
                                    <div class="product_number">({{ item.quantity }}份)</div>
                                    <div class="product_price">￥{{ (item.price / 100) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </view>

                <div class="prompt_box" v-if="isinstitution && [131079,196611].includes(data.osObj.status)">
                    <div class="contit">温馨提示</div>
                    <div class="prompt_text_box">
                        <div class="prompt_item">
                            <text class="prompt_title">有效期:</text>
                            <text
                                class="prompt_text"
                                v-if="data.serviceInfo.info.cardExtend"
                            >{{ timeformat(data.serviceInfo.utcCreated) }} 至 {{ timeformat(data.serviceInfo.info.cardExtend.useDeadline) }}</text>
                        </div>
                        <div class="prompt_item">
                            <text class="prompt_title">有效期说明:</text>
                            <text class="prompt_text" v-if="data.serviceInfo.info.cardExtend && data.serviceInfo.info.cardExtend.useDeadline">{{vldTime(data.serviceInfo.info.cardExtend.useDeadline)}}</text>
                            <text class="prompt_text" v-if="data.serviceInfo.info.cardExtend && data.serviceInfo.info.cardExtend.useEffectiveDays">购买后{{ data.serviceInfo.info.cardExtend.useEffectiveDays }}内使用</text>
                        </div>
                        <div class="prompt_item" v-if="data.serviceInfo.info.cardExtend.typeId == 2">
                            <text class="prompt_title">使用时间:</text>
                            <text class="prompt_text">{{data.serviceInfo.info.cardExtend.isRestrictTime == 0 ? '全部时间可用' : data.serviceInfo.info.cardExtend.restrictTimeDesc || '--' }}</text>
                        </div>
                        <div class="prompt_item" v-if="data.serviceInfo.info.cardExtend.typeId == 2">
                            <text class="prompt_title">使用范围:</text>
                            <text
                                class="prompt_text"
                            >{{ data.serviceInfo.info.cardExtend.range == 0 ? '通用' :
                            data.serviceInfo.info.cardExtend.range == 1 ? `适用${data.serviceInfo.info.cardExtend.rangeData}` :
                            data.serviceInfo.info.cardExtend.range == 2 ? `不适用${data.serviceInfo.info.cardExtend.rangeData}` : '--'
                            }}</text>
                        </div>
                        <div class="prompt_item flex_box">
                            <text class="prompt_title">使用规则:</text>
                            <text class="prompt_text" v-if="data.serviceInfo.info.cardExtend.typeId == 1">{{'本单发票由商家提供，详细请咨询商家'}}</text>
                            <view class="prompt_text column_box" v-if="data.serviceInfo.info.cardExtend.typeId == 2">
                                <view>·本单发票由商家提供，详情请咨询商家</view>
                                <view>·每次仅限使用一张</view>
                                <view v-if="data.serviceInfo.info.cardExtend.isExclusive == 1">·不可同时享受商家其他优惠</view>
                                <view v-if="data.serviceInfo.info.cardExtend.isExclusive == 2">·可同时享受商家其他优惠</view>
                                <view v-if="data.serviceInfo.info.cardExtend.isExclusive == 3">·可同时享受商家{{ data.serviceInfo.info.cardExtend.exclusiveData }}优惠</view>
                                <view>·有效期以具体时间为准</view>
                                <view>·每人最多购买{{`${data.serviceInfo.info.cardExtend.isRestrictBuyQuantity == 0 ? '不限制数量' : `${data.serviceInfo.info.cardExtend.restrictBuyQuantity}`}`}}张</view>
                            </view>
                        </div>
                        <div class="prompt_item">
                            <text class="prompt_title">保障:</text>
                            <text class="prompt_text">{{'随时退 · 过期退'}}</text>
                        </div>
                    </div>
                </div>

                <view class="price_info">
                    <priceInfo :serviceInfo="data.serviceInfo" :showInfo="data.showInfo" :isinstitution="isinstitution"></priceInfo>
                </view>
                <view class="order_detail">
                    <orderDetail :serviceInfo="data.serviceInfo" :showInfo="data.showInfo"></orderDetail>
                </view>
            </view>
            <template #bottom>
                <view class="bottom_btn" v-if="showBottom">
                    <orderFoot @operate="operate" :actionableList="data.serviceInfo.actionableList" :status="data.serviceInfo.status" :kind="data.serviceInfo.kind"></orderFoot>
                </view>
                <!-- <view @click="getdelreason">test</view> -->
            </template>
        </z-paging>

		<BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showreason" :close-btn="true" @close="data.showreason = false" open-direction="bottom" round="32rpx">
            <view class="delreason_box">
                <view class="delreason_box_title">选择取消订单原因</view>
                <view class="delreason_list_box">
                    <view class="delreason_item_title">
                        <view class="delreason_text">请选择取消原因</view>
                    </view>
                    <view class="delreason_item" v-for="item in data.reasonList" :key="item.id">
                        <view class="delreason_text" @click="clickdelreason(item.id)">{{ item.name }}</view>
                        <view class="is_icon" v-if="data.reasonItemid == item.id">
                            <TnIcon name="success" color="#29C86F" size="28rpx"></TnIcon>
                        </view>
                    </view>
                </view>
                <view class="delreason_btn" @click="goRemove">提交</view>
            </view>

		    <BCNotify ref="delreasonNotify"></BCNotify>
        </TnPopup>


    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import orderState from './order-state.vue'
import orderInfo from './order-info.vue'
import workerInfo from './workerInfo.vue'
import priceInfo from './price-info.vue'
import orderDetail from './order-detail.vue'
import orderFoot from './orderFoot.vue'

import {
    getserviceOrderDetail,
    getAftersaleReason,
    applyRefund,
    houseOrderCancel,
    houseOrderPay,
    housePayResult
} from '@/api/order-api'
import { organizationDetail } from '@/api/service-api'
import { formattime } from '@/common/formatTime'
import { packPayment } from '@/libs/pay/pay-tools'
import { TempStorage } from "@bc/base"
import { gotoBalanceOrder } from '@/routes/order-routes'
import { gotoComment } from '@/routes/user-routes'
import { PlatformManage } from "@bc/sys"

interface Props {
    orderId: any
    isAppOpen: boolean

}

const props = defineProps<Props>()

interface Data {
    osObj:any,
    showInfo:boolean,
    serviceInfo:any,
    detailObj:any,
    showreason:boolean,
    reasonList:any, // 订单取消原因列表
    reasonItemid:string,
    payId:string,

}
const data = reactive<Data>({
    osObj: {},
    showInfo: false,
    serviceInfo: {},
    detailObj: {},
    showreason: false,
    reasonList: [],
    reasonItemid: '',
    payId: ''


})

const showBottom = computed(() => {
    if (!data.osObj.actionableList) {
        console.log(1)

        return false
    }

    const arr = []
    for (const action in data.osObj.actionableList) {
        !['delete', 'complaint'].includes(data.osObj.actionableList[action]) && arr.push(data.osObj.actionableList[action])
    }

    if (arr.length > 0) {
    	if (arr.length == 1 && arr[0] == 'show_card') {
            console.log(2)

    		return false
    	}
        console.log(3)
    	return true
    }
    else {
    	if (data.osObj.status == 196611) {
            console.log(4)
    		return true
    	}
        console.log(5)
    	return false
    }
})

// 判断是否机构订单
const isinstitution = computed(() => {
    return data.osObj.kind === 3
})


const timeformat = computed(() => (time:number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm')
})

const vldTime = computed(() => (time:number) => {
    const now = (Date.now() / 1000)
    const days = Math.trunc((time - now) / (60 * 60 * 24))
    console.log('now,time', now, time, Date.now(time))
    if (now < time) {
        // 截至时间内
        console.log('截至时间内')
        return `有效剩余${days == 0 ? 1 : days}天`
    }
    else {
        // 不在截至时间内
        console.log('不在截至时间内')
        return `${formattime(time, 'YYYY-MM-DD')}已截止`
    }
})


onMounted(() => {
    getDetail(props.orderId)
})
// watch(()=> props.orderId,(newvalue,oldvalue)=>{
//     getDetail(newvalue)
// })

const getDetail = (orderId:string) => {
    getserviceOrderDetail({
        orderId
    }).then((res:any) => {
        data.osObj = res

        data.showInfo = true

        data.serviceInfo = {
            info: res?.shopList[0]?.entityList[0],
            shopinfo: res?.shopList[0],
            addressInfo: res?.addressInfo,
            ...res
        }

        if (res.kind == 3) {
            getorganizationDetail(res.shopList[0].shopId)
        }

        if (props.isAppOpen) {
            console.log('app跳转到小程序订单详情支付')
            // setTimeout(() => {
            //     uppay()
            // }, 1000)
        }
    })
}
const getorganizationDetail = (shopId:string) => {
    organizationDetail({
        shopId,
        isAd: 0
    }).then((res:any) => {
        data.detailObj = res || {}
    })
}

const bcNotify = ref()
const delreasonNotify = ref()
// 获取取消原因
const getdelreason = () => {
    getAftersaleReason({
        typeId: 6
    }).then((res:any) => {
        data.reasonList = res
        data.showreason = true
    }).catch(() => {
        bcNotify.value.error('取消原因数据获取失败')
    })
}


const clickdelreason = (id:string) => {
    data.reasonItemid = id
}

// 提交取消订单
const goRemove = () => {
    setTimeout(() => {
        if (data.reasonItemid == '') {
            delreasonNotify.value.error('请选择取消原因')
            return
        }
        console.log('data.reasonItemid', data.reasonItemid)
        if (data.osObj.actionableList.includes('apply_refund')) {
            applyRefund({
                orderEntityId: data.serviceInfo.info.entityId,
                reasonId: data.reasonItemid,
                number: data.serviceInfo.info.quantity,
                refund: data.serviceInfo.priceInfo.paidAmount
            }).then((res:any) => {
                delreasonNotify.value.show('取消订单成功')
                setTimeout(() => {
                    uni.navigateBack()
                }, 1500)
            }).catch((err:any) => {
                delreasonNotify.value.error(err.message)
            })
            return
        }

        houseOrderCancel({
            orderId: props.orderId,
            reasonId: data.reasonItemid

        }).then((res:any) => {
            delreasonNotify.value.show('取消订单成功')

            setTimeout(() => {
                uni.navigateBack()
            }, 1500)
        }).catch((err:any) => {
            delreasonNotify.value.error(err.message)
        })
    }, 300)
}

// 继续支付
const uppay = async () => {
    const openid = uni.getStorageSync('openid')
    const payData = {
        orderId: props.orderId,
        openid,
        payId: data.serviceInfo.payId,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid
    }

    if (data.serviceInfo.payId) { data.payId = data.serviceInfo.payId }

    uni.showLoading({
        title: '调起支付',
        mask: true
    })
    // #ifdef MP-WEIXIN
    houseOrderPay(payData).then((res:any) => {
        packPayment(res.payParams).then((ret:any) => {
            if (ret.isSuccess && ret.status === 'CPCN') {
                getDetail(props.orderId)
                return false
            }
            bcNotify.value.show('支付成功')
            // 支付成功刷新页面
            getDetail(props.orderId)
            // gotoHandleSuccess({
            //     orderId: props.orderId,
            //     payChannelId: res.payChannelId
            // }, 'replace')
        }).catch((err:any) => {
            bcNotify.value.error('支付失败')
            checkResult(res.payChannelId)
            linkHouseOrder()
        })

    }).catch((err:any) => {
        bcNotify.value.error(err.message)
        linkHouseOrder()
    }).finally(() => {
        uni.hideLoading()
    })
    // #endif


    // #ifdef APP-PLUS
    const payJSON = JSON.stringify({
        itemId: props.orderId,
        isAppOpen: true
    })
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    console.log('payJSON', payJSON)

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

            PlatformManage.getToken().then((res:any) => {
                console.log('获取userinfo', res)

                sweixin.launchMiniProgram({
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/Order/pages/serviceOrderDetail/serviceOrderDetail?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON
                    }
                })
            })
        }
    })

    // #endif

}

// 检查支付结果
const checkResult = async (payChannelId:string, status = 0) => {
    return await housePayResult({
        orderId: props.orderId,
        payChannelId,
        payStatus: status//0：放弃，1：成功
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideToast()
    })
}

const linkHouseOrder = () => {
    setTimeout(() => {
        uni.navigateBack()
    }, 800)
}

// 再来一单
const againBay = () => {
    const uniqueId = TempStorage.savewx({
        itemId: data.serviceInfo.info.cardExtend.id
    })
    // #ifdef MP-WEIXIN
    gotoBalanceOrder(uniqueId, 2)
    // #endif


    // #ifdef APP-PLUS
    const payJSON = JSON.stringify({
        itemId: data.serviceInfo.info.cardExtend.id
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

            PlatformManage.getToken().then((res:any) => {
                console.log('获取userinfo', res)

                sweixin.launchMiniProgram({
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/Order/pages/balanceOrder/balanceOrder?payJSON=${payJSON}&userId=${res.id}&handle=2`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON
                    }
                })
            })
        }
    })

    // #endif

}


// 底部按钮触发事件
const operate = (type:string) => {
    // this[type]()
    if (type == 'showClear') {
        console.log('取消订单')
        getdelreason()
    }
    if (type == 'showEdit') {
        console.log('修改订单')
    }
    if (type == 'goComment') {
        console.log('去评价')
        gotoComment({ id: props.orderId })
    }
    if (type == 'againBay') {
        console.log('再来一单')
        againBay()
    }
    if (type == 'uppay') {
        console.log('立即支付')
        uppay()
    }
    if (type == 'goUse') {
        // 服务多次服务
        console.log('立即使用')
    }

}



</script>

<style lang="scss" scoped>
.container {
    padding: 20rpx;
    box-sizing: border-box;
}
.content{
    padding: 20rpx;
    box-sizing: border-box;
}
.order_info{
    margin-bottom: 20rpx;
}
.workerInfo{
    margin-bottom: 20rpx;
}
.institution_box {
    padding: 30rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    .institution_img {
        width: 136rpx;
        height: 136rpx;
        border-radius: 12rpx;
        margin-right: 20rpx;
    }
    .institution_text_box {
        flex: 1;
        display: flex;
        flex-direction: column;
        .institution_title {
            margin-bottom: 8rpx;
            color: #333333;
            font-size: 30rpx;
        }
        .institution_time_box {
            display: flex;
            align-items: center;
        }
        .institution_time {
            color: #999999;
            font-size: 24rpx;
            margin-bottom: 24rpx;
        }
        .institution_address {
            color: #666666;
            font-size: 24rpx;
        }
    }
}
.product_box {
    padding: 30rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    .contit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }
    .product_list {
        padding-top: 30rpx;
        box-sizing: border-box;
        .product_item {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30rpx;
            .product_title {
                color: #333333;
                font-size: 28rpx;
            }
            .product_right {
                display: flex;
                align-items: center;
                font-size: 28rpx;
                .product_number {
                    margin-right: 20rpx;
                    color: #999999;
                }
                .product_price {
                    color: #ff0000;
                }
            }
            &.notbottom {
                margin-bottom: 0rpx;
            }
        }
    }
}

.prompt_box {
    padding: 30rpx;
    background: #ffffff;
    border-radius: 24rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    .prompt_text_box {
        width: 100%;
        padding: 24rpx;
        box-sizing: border-box;
        background: #f6f6f6;
        margin-top: 20rpx;
        .prompt_item {
            width: 100%;
            margin-bottom: 20rpx;
            font-size: 28rpx;
            &.flex_box{
                display: flex;
            }
            .prompt_title {
                color: #333333;
                margin-right: 12rpx;
                font-weight: 600;
                flex-shrink: 0;
            }
            .prompt_text {
                color: #666666;
                &.column_box{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
            }
        }
    }
}

.delreason_box {
    padding: 30rpx;
    padding-bottom: 0;
    box-sizing: border-box;
    .delreason_box_title {
        font-size: 34rpx;
        font-weight: 600;
        text-align: center;
        color: #333333;
        margin-bottom: 30rpx;
    }
    .delreason_list_box {
        .delreason_item_title {
            font-size: 32rpx;
            color: #333333;
            border-bottom: 2rpx solid #eeeeee;
            margin-bottom: 30rpx;
        }
        .delreason_item {
            font-size: 30rpx;
            color: #666666;
            border-bottom: 2rpx solid #eeeeee;
            margin-bottom: 30rpx;
            position: relative;
            .is_icon {
                position: absolute;
                top: 0;
                right: 0rpx;
            }
        }
        .delreason_text {
            padding-bottom: 20rpx;
            box-sizing: border-box;
        }
    }
    .delreason_btn {
        width: 85%;
        height: 84rpx;
        background: #29c86f;
        border-radius: 85rpx;
        text-align: center;
        line-height: 84rpx;
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 600;
        margin: auto;
    }
}

.price_info{
    margin-bottom: 20rpx;

}
.bottom_btn{
    background: #fff;
    height: 120rpx;

}
</style>


