<template>
    <view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="'订单详情'" text-color="#fff" icon-color="#fff"></bc-page-navbar>
            </template>

            <view class="content">
                <view class="orderState">
                    <orderState :osObj="data.osObj"></orderState>
                </view>
                <view class="order_info">
                    <orderInfo :serviceInfo="data.serviceInfo" :showInfo="data.showInfo" ></orderInfo>
                </view>
                <view class="order_detail">
                    <orderDetail :serviceInfo="data.serviceInfo" :showInfo="data.showInfo"></orderDetail>
                </view>
                <view class="question">
                    <view class="question_box">
                        <view class="question_box_icon">
                            <image class="icon_img" :src="getAssetsUrl('/shop/shopicon.png')" mode="scaleToFill" />
                        </view>
                        <view class="question_box_title" @click="gotoIMSessionChat(2)">
                            <view class="question_title">联系商家</view>
                            <view class="question_bace">物流/售后咨询</view>
                        </view>
                    </view>
                    <view class="question_box">
                        <view class="question_box_icon">
                            <image class="icon_img" :src="getAssetsUrl('/shop/pticon.png')" mode="scaleToFill" />
                        </view>
                        <view class="question_box_title" @click="gotoIMSessionChat(1)">
                            <view class="question_title">平台客服</view>
                            <view class="question_bace">其他问题/纠纷</view>
                        </view>
                    </view>
                    <view class="border_box"></view>
                </view>

            </view>
            <template #bottom>
                <view class="bottom_btn" v-if="showBottom">
                    <orderFoot @operate="operate" :actionableList="data.serviceInfo.actionableList" :status="data.serviceInfo.status" :kind="data.serviceInfo.kind"></orderFoot>
                </view>
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
import orderDetail from './order-detail.vue'
import orderFoot from './orderFoot.vue'

import {
    getserviceOrderDetail,
    getAftersaleReason,
    applyRefund,
    houseOrderCancel,
    houseOrderPay,
    housePayResult,
    delayReceive,
    confirmReceipt,
    editGodsOrder,
 } from '@/api/order-api'
import { organizationDetail } from '@/api/service-api'
import { formattime } from '@/common/formatTime'
import { packPayment } from '@/libs/pay/pay-tools'
import { TempStorage } from "@bc/base"
import { gotoBalanceOrder } from '@/routes/order-routes'
import { gotoSalePutlogis } from '@/routes/goods-routes'
import { getAssetsPic } from '@/common/setPicture'
import { gotoCommentGoods } from '@/routes/user-routes'
import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'

import { gotoChatPage } from "@/routes/nim-routes"
import { createTeam } from "@/api/nim-api"
import { PlatformManage } from '@bc/sys'

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
    payId: string,

}
const data = reactive<Data>({
    osObj:{},
    showInfo:false,
    serviceInfo:{},
    detailObj:{},
    showreason:false,
    reasonList:[],
    reasonItemid:'',
    payId: '',


})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const showBottom = computed(()=>{
    if (!data.osObj.actionableList) {
        console.log(111);

        return false
    }
    console.log(222);

    return true

})

// 判断是否机构订单
const isinstitution = computed(()=>{
    return data.osObj.kind === 3
})


const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const vldTime = computed(()=>(time:number)=>{
    const now = (Date.now() / 1000)
    const days = Math.trunc((time - now) / (60 * 60 * 24))
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



onMounted(()=>{
    getDetail(props.orderId)
    // addWEventsListener(CareEvents.Get__Address, (res) => {
    //     setSitelAdres(res)
    // })
})

// watch(()=> props.orderId,(newvalue,oldvalue)=>{
//     getDetail(newvalue)
// })

const getDetail = (orderId:string) => {
    getserviceOrderDetail({
        orderId
    }).then((res:any)=>{
        data.osObj = res

        data.showInfo = true

        data.serviceInfo = {
            info : res?.shopList[0]?.entityList,
            shopinfo : res?.shopList[0],
            addressInfo: res?.addressInfo,
            ...res
        }

        if (res.kind == 3) {
            getorganizationDetail(res.shopList[0].shopId)
        }

        if (props.isAppOpen) {
            console.log('app跳转到小程序订单详情支付');
            // setTimeout(() => {
            //     console.log('自动调取');

            //     uppay()
            // }, 1000)
        }

    })
}
const getorganizationDetail = (shopId:string) =>{
    organizationDetail({
        shopId,
        isAd:0
    }).then((res:any)=>{
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
    console.log('data.serviceInfo', data.serviceInfo);

    setTimeout(()=>{
        if (data.reasonItemid == '') {
            delreasonNotify.value.error('请选择取消原因')
            return
        }

        if (data.osObj.actionableList.includes('apply_refund')) {

            console.log('走售后');
            data.serviceInfo.info.forEach((item:any) => {
                applyRefund({
                    orderEntityId: item.entityId,
                    reasonId: data.reasonItemid,
                    number: item.quantity,
                    refund: item.paidAmount
                }).then((res:any) => {
                    delreasonNotify.value.show('取消订单成功')
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 1500)
                }).catch((err:any) => {
                    delreasonNotify.value.error(err.message)
                })
            });
            return
        }

        console.log('不走售后');
        houseOrderCancel({
            orderId: props.orderId,
            reasonId: data.reasonItemid

        }).then((res:any) => {
            bcNotify.value.show('取消订单成功')
            data.showreason = false
            setTimeout(() => {
                uni.navigateBack()
            }, 1500)
        }).catch((err:any) => {
            delreasonNotify.value.error(err.message)
        })
    },300)
}

// 继续支付
const uppay = async () => {
    console.log('开始支付');

    const openid = uni.getStorageSync('openid')
    const payData = {
        orderId: props.orderId,
        openid,
        payId: data.serviceInfo.payId,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid,
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
            // bcNotify.value.show('支付成功')
            // 支付成功刷新页面
            getDetail(props.orderId)
            // gotoHandleSuccess({
            //     orderId: props.orderId,
            //     payChannelId: res.payChannelId
            // }, 'replace')
        }).catch((err:any) => {
            // bcNotify.value.error('支付失败')
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
    let payJSON = JSON.stringify({
        itemId: props.orderId,
        isAppOpen: true
    })
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    console.log('payJSON',payJSON);


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
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/pagesOrder/pages/goodsOrderDetail/goodsOrderDetail?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })

                console.log(`/pagesOrder/pages/goodsOrderDetail/goodsOrderDetail?payJSON=${payJSON}&userId=${res.id}`);

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


// 底部按钮触发事件
const operate = (type:string) => {
    if (type == 'delay_receive') {
        console.log('延迟收货');
        delay()
    }
    if (type == 'edit') {
        console.log('修改地址');
    }
    if (type == 'view_express') {
        console.log('查看物流');
        goIstics()
    }
    if (type == 'confirm_receive') {
        console.log('确认收货');
        takeDelivery()
    }
    if (type == 'comment') {
        console.log('去评价');
        clickComment()
    }
    if (type == 'pay') {
        console.log('立即支付');
        uppay()
    }
    if (type == 'showClear') {
        console.log('取消订单');
        getdelreason()
    }



}

const gotoIMSessionChat = (type:number) => {
    PlatformManage.getToken().then((token:any) => {
        createTeam({
            userId: token?.id,
            userName: token?.nickname,
            userThumb: token?.avatar,
            flag: 1, //1小程序用户，2服务人员
            shopId: data.serviceInfo.shopinfo.shopId,
            type // 1平台，2店铺
        }).then((res) => {
            gotoChatPage({
                to: res.tid,
                scene: 'customer'
            })
        }).catch((err) => {
            bcNotify.value.show(err.message)
        })
    })
}

// 延长收货
const delay = () => {
    delayReceive({
        orderId:data.serviceInfo.id
    }).then(()=>{
        bcNotify.value.show('延迟成功')
    })
}

// 确认收货
const takeDelivery = () => {
    uni.showModal({
        title: '确认收货？',
        content: '请收到商品确定无误后再确认收货',
        success: res => {
            if (res.confirm) {
                confirmReceipt({
                    orderId:data.serviceInfo.id
                }).then(() => {
                    bcNotify.value.show('收货成功')
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 2000)
                }).catch((err) => {
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 2000)
                    bcNotify.value.error(err.message)
                })
            }
        }
    })
}

// 去评论
const clickComment = () => {
    gotoCommentGoods({ id: data.serviceInfo.id })
}

// 设置地址 / 修改订单
const setSitelAdres = (data:any) => {
    console.log('456879',data);

    const shopList = data.serviceInfo.shopList.map((x:any) => {
        return {
            id: x.shopId,
            note: x.note
        }
    })
    editGodsOrder({
        orderId: data.serviceInfo.id,
        shopList,
        addressId: data.id
    }).then(() => {
        data.ressinfo = data
        bcNotify.value.show('修改成功')
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    })
}

// 查看物流
const goIstics = () => {
    gotoSalePutlogis({
        orderId: data.serviceInfo.id
    })
}


defineExpose({
    getDetail
})

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

.question {
    width: 100%;
    height: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 24rpx;
    position: relative;
    margin-bottom: 36rpx;
    margin-top: 20rpx;
    .question_box {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .question_box_icon {
            width: 76rpx;
            height: 76rpx;
            margin-right: 12rpx;
            .icon_img {
                width: 100%;
                height: 100%;
            }
        }
        .question_box_title {
            .question_title {
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
            }
            .question_bace {
                font-size: 24rpx;
                color: #999999;
            }
        }
    }
    .border_box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 60%;
        background: #e5e5e5;
        transform: translate(0%, -50%);
    }
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


