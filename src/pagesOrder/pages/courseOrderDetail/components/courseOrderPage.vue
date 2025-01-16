<template>
    <view class="container" v-if="data.osObj.id">
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
                <view class="order_type_box">
                    <orderState :osObj="data.osObj"></orderState>
                </view>

                <view class="course_card">
                    <view class="course_author">
                        <image
                            class="author_img"
                            :src="data.serviceInfo.shopinfo.shopIcon"
                            mode="scaleToFill"
                        />
                        <view class="author_name">{{ data.serviceInfo.shopinfo.shopName }}</view>
                    </view>
                    <view class="card_box">
                        <image
                            class="card_left"
                            :src="data.cardObj.cover"
                            mode="scaleToFill"
                        />
                        <view class="card_right">
                            <view class="card_title">{{ data.cardObj.coursetitle }}</view>

                            <view class="card_price_box">
                                <view class="card_price">
                                    ￥{{ data.cardObj.price / 100 }}
                                </view>
                                <view class="card_number">x1</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="price_infoBox">
                    <priceInfo :serviceInfo="data.serviceInfo" :showInfo="data.showInfo" :isinstitution="true"></priceInfo>
                </view>


                <view class="order_information">
                    <view class="information_title">订单信息</view>
                    <view class="copy_box">
                        <view class="information_item">
                            <view class="information_item_box">
                                <view class="item_title">订单编号</view>
                                <view class="item_text">{{ data.osObj.serialNo }}</view>
                            </view>
                            <view class="copy" @click="copy(data.osObj.serialNo)">复制</view>

                        </view>
                    </view>
                    <view class="information_item" :class="{ 'not_bottom' : data.osObj.status != 196612 }">
                        <view class="information_item_box">
                            <view class="item_title">创建时间</view>
                            <view class="item_text">{{ timeformat(data.osObj.utcCreated) }}</view>
                        </view>
                        <view></view>
                    </view>
                    <view class="information_item not_bottom" v-if="data.osObj.status == 196612">
                        <view class="information_item_box">
                            <view class="item_title">支付时间</view>
                            <view class="item_text">{{ timeformat(data.osObj.utcPay) }}</view>
                        </view>
                        <view></view>
                    </view>

                </view>
            </view>

            <template #bottom>
                <view class="bottom_btn" v-if="data.osObj.actionableList">
                    <view class="order_btn" v-if="data.osObj.actionableList.includes('comment')" @click="tocourseVideo">
                        去学习
                    </view>
                    <view class="order_btn" v-if="data.osObj.actionableList.includes('pay')" @click="uppay">
                        去支付
                    </view>
                    <view class="order_btn del" v-if="false">
                        删除订单
                    </view>
                </view>
            </template>

            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'

import { getAssetsPic } from '@/common/setPicture'
import courseCard from '@/pagesOrder/components/courseCard.vue'
import { getserviceOrderDetail, houseOrderPay } from '@/api/order-api'
import { formattime } from '@/common/formatTime'


import { packPayment } from '@/libs/pay/pay-tools'
import { gotocourseVideo } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import orderState from './order-state.vue'
import orderDetail from './order-detail.vue'
import orderInfo from './order-info.vue'
import priceInfo from './price-info.vue'
import { PlatformManage } from '@bc/sys'

interface Props {
    orderId:string
    isAppOpen: boolean

}
const props = defineProps<Props>()

interface Data {
    osObj: any
    serviceInfo: any
    cardObj: any
    showInfo: boolean
}

const data = reactive<Data>({
    osObj:{},
    serviceInfo:{},
    cardObj:{},
    showInfo: true
})


const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm:ss')
})
const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
    getDetail(props.orderId)
})

// onShow(() => {
//     getDetail(props.orderId)
// })

const getDetail = (orderId:string) => {
    getserviceOrderDetail({
        orderId
    }).then((res:any)=>{
        data.osObj = res

        data.serviceInfo = {
            info : res?.shopList[0]?.entityList[0],
            shopinfo : res?.shopList[0],
            addressInfo: res?.addressInfo,
            ...res
        }

        data.cardObj = {
            price:res.shopList[0].entityList[0].price,
            cover:res.shopList[0].entityList[0].image,
            coursetitle:res.shopList[0].entityList[0].title,
        }

        if (props.isAppOpen) {
            console.log('app跳转到小程序订单详情支付');
            // setTimeout(() => {
            //     uppay()
            // }, 1000)
        }

        console.log(data.osObj.actionableList);

    })
}

const bcNotify = ref()
const copy = (str:string)=> {
    console.log('复制',str);
    uni.setClipboardData({
        data: str,
        showToast: false,
        success: () => {
            // bcNotify.value.show('复制成功')
        },
        fail: (err:any) => {
            bcNotify.value.show('复制失败',err)
        }
    })
}

const uppay = () => {
    uni.showLoading({
        title: '调起支付',
        mask: true
    })
    const openid = uni.getStorageSync('openid')
    // #ifdef MP-WEIXIN
    houseOrderPay({
        orderId : props.orderId,
        openid: openid != '' ? openid : undefined,
        payId: data.serviceInfo.payId,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid,
    }).then(async (res) => {
        /* 调起支付 */
        packPayment(res.payParams).then((ret:any) => {
            if (ret.isSuccess && ret.status === 'CPCN') {
                return false
            }
            // bcNotify.value.success('支付成功')
            getDetail(props.orderId)

        }).catch(() => {
            // bcNotify.value.error('支付失败')
            getDetail(props.orderId)
        })
    }).catch((err) => {
        bcNotify.value.error(err.message)
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
                    path: `/pagesOrder/pages/courseOrderDetail/courseOrderDetail?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })
            })
        }
    })

    // #endif


}

const tocourseVideo = () => {
    const listId = TempStorage.savewx({
        videoIdlist:[data.osObj.shopList[0].entityList[0].itemId],
    })
    gotocourseVideo(listId)
}

defineExpose({
    getDetail
})


</script>

<style lang="scss" scoped>
.content{
    padding: 20rpx;
    box-sizing: border-box;
    .order_type_box{
        margin-bottom: 24rpx;
        .type_item{
            display: flex;
            align-items: center;
            .type_img{
                width: 38rpx;
                height: 38rpx;
                border-radius: 50%;
                margin-right: 12rpx;
            }
            .type_text{
                font-size: 36rpx;
                color: #2D2D2D;
                font-weight: 500;
            }
        }
    }
    .course_card{
        padding: 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 22rpx;
        margin-bottom: 20rpx;
        .course_author{
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
            .author_img{
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                margin-right: 14rpx;
            }
            .author_name{
                font-weight: 500;
                color: #333333;
                font-size: 28rpx;
            }
        }
        .card_box{
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
                .card_price_box{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .card_price{
                        font-weight: 500;
                        font-size: 34rpx;
                        color: #FC3848;
                    }
                    .card_number{
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #999999;
                    }
                }


            }
        }
    }
    .price_infoBox{
        margin-bottom: 16rpx;
    }
    .order_information{
        background: #FFFFFF;
        border-radius: 22rpx;
        padding: 30rpx;
        box-sizing: border-box;

        .information_title{
            margin-bottom: 32rpx;
            font-size: 32rpx;
            color: #333333;
            font-weight: 700;
        }
        .copy_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .copy{
                font-size: 24rpx;
                font-weight: 500;
                color: #EA3E1A;
            }
        }
        .information_item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32rpx;
            width: 100%;
            &.not_bottom{
                margin-bottom: 0rpx;
            }
            .information_item_box{
                display: flex;
                align-items: center;
            }

            .item_title{
                font-size: 30rpx;
                color: #333333;
                font-weight: 600;
                margin-right: 36rpx;
            }
            .item_text{
                font-size: 24rpx;
                font-weight: 400;
                color: #666;
            }
        }
    }

}
.bottom_btn{
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    .order_btn{
        width: 192rpx;
        height: 68rpx;
        background: #EA3E1A;
        border-radius: 6rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #FFFFFF;
        text-align: center;
        line-height: 68rpx;
        &.del{
            border: 2rpx solid #D2D2D2;
            color: #666666;
            background: #fff;
        }
    }
}
</style>
