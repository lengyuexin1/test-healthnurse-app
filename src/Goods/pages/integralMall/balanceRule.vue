<template>
    <view class="container" v-if="data.showPage">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'确认订单'"></bc-page-navbar>
            </template>
            <view class="conbox">
                <view class="locus-box">
                    <view class="locus-con row">
                        <image class="locus-icon" :src="getAssetsUrl('/mall/address-icon.png')"></image>
                        <view class="locus-rig row i-center j-between" v-if="data.delivery.id">
                            <view class="locus-info">
                                <view class="locus-name">{{data.delivery.name}}  {{data.delivery.mobile}}</view>
                                <view class="locus-desc">{{data.delivery.area}}{{data.delivery.address}}</view>
                            </view>
                            <navigator class="locus-edit" url="/User/pages/address/goodsSiteList">修改</navigator>
                        </view>
                        <navigator url="/User/pages/address/goodsSiteList" class="locus-rig row i-center j-between"
                            hover-class="none" v-else
                        >
                            <view class="locus-info">
                                <view class="locus-sele">请选择地址</view>
                            </view>
                            <TnIcon name="right" size="32rpx" color="#666666"></TnIcon>
                        </navigator>
                    </view>
                    <image class="locus-line" :src="getAssetsUrl('/mall/address-line.png')" mode="aspectFill"></image>
                </view>
            </view>

            <view class="content">
                <view class="goods_card">
                    <view class="card_title">礼品信息</view>
                    <view class="card_item">
                        <image
                            class="card_img"
                            :src="data.orderdetailObj.mainPics && data.orderdetailObj.mainPics[0]"
                            mode="aspectFill"
                        />
                        <view class="card_text">
                            <view class="card_item_title">{{ data.orderdetailObj.name }}</view>
                            <view class="card_item_bottom">
                                <view class="integral_number">{{ data.orderdetailObj.integral }} 积分</view>
                                <view class="quantity">x1</view>
                            </view>
                        </view>
                    </view>
                    <view class="postage_box">
                        <view class="left">订单运费</view>
                        <view class="right">包邮</view>
                    </view>
                </view>
            </view>
            
            

            <template #bottom>
                <!-- 底部按钮 -->
                <view class="footer">
                    <view class="fotbox">
                        <view class="fotlef">
                            <view class="fotyou">兑换成功后</view>
                            <view class="surplus_text">
                                剩余积分: <text class="surplus_number">{{ (data.IntegralObj.points - data.orderdetailObj.integral) }}</text>
                            </view>
                        </view>

                        <view class="fotbtn">
                            <TnButton width="292rpx" height="76rpx" shape="round" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="placeOrder">
                                立即支付
                            </TnButton>
                        </view>
                    </view>
                </view>
                
            </template>

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { TempStorage } from "@bc/base"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"


import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'

import { getAddressList, integralGoodsDetail, timePointsDetail, integralOrderAdd } from '@/api/goods-api'
import { getAssetsPic } from '@/common/setPicture'

import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'

interface Data {
    showPage:boolean,
    uniqueId:any,
    delivery:any, // 地址
    orderdetailObj: any,
    IntegralObj: any,
}
const data = reactive<Data>({
    showPage:false,
    uniqueId:'',
    delivery:{},
    orderdetailObj: {},
    IntegralObj: {}
})


const bcNotify = ref()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})



const placeOrder = () => {

    if (!data.delivery.id) {
        bcNotify.value.error('请选择收货地址')
        return
    }
    console.log('商品id,地址id', data.orderdetailObj.id, data.delivery.id);

    integralOrderAdd({
        productId: data.orderdetailObj.id,
        addressId: data.delivery.id
    }).then(()=>{
        bcNotify.value.show('兑换成功')
        setTimeout(() => {
            uni.navigateBack()
        }, 2000);
    }).catch((err:any)=>{
        bcNotify.value.error(err.message)
    })


}



onLoad((option:any) => {
    data.uniqueId = option.uniqueId
})


onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(data.uniqueId).then((res:any) => {
        integralGoodsDetail({
            id: res.productId
        }).then((res:any)=>{
            data.showPage = true
            data.orderdetailObj = res
        })
        
        timePointsDetail({}).then((res:any)=>{
            data.IntegralObj = res
        })

        getAdreList()
        tempStorage.clear()
    }).catch(() => {
        bcNotify.value.error('商品获取失败')
        setTimeout(() => {
            pageController.back()
        }, 1000)
    })

    addWEventsListener(CareEvents.Get__Address, (res) => {
        data.delivery = res
    })
})



const getAdreList = () => {
    // 获取地址
    getAddressList().then((res:any)=>{
        if (res.length <= 0) { return }
        for (const i in res) {
            if (res[i].isDefault == 1) {
                data.delivery = res[i]
                return
            }
        }
    })
}

const refCoup = ref()

</script>
  
<style lang="scss" scoped>
.conbox{
    padding: 20rpx;
}
.locus-box{
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    position: relative;

    .locus-con{
        padding: 40rpx 30rpx;

        .locus-icon{
            width: 52rpx;
            height: 52rpx;
            margin-right: 16rpx;
            flex-shrink: 0;
        }

        .locus-rig{
            flex: 1;

            .locus-info{
                .locus-name{
                    font-size: 28rpx;
                    font-weight: bold;
                    line-height: 40rpx;
                    color: #333333;
                }
                .locus-desc{
                    font-size: 24rpx;
                    font-weight: 400;
                    line-height: 32rpx;
                    color: #666666;
                    margin-top: 8rpx;
                }
                .locus-sele{
                    font-size: 28rpx;
                    font-weight: 400;
                    line-height: 40rpx;
                    color: #666666;
                }
            }

            .locus-edit{
                width: 92rpx;
                height: 48rpx;
                border: 2rpx solid #EEEEEE;
                border-radius: 24rpx;
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 48rpx;
                color: #666666;
                text-align: center;
                margin-left: 38rpx;
                flex-shrink: 0;
            }
        }
    }

    .locus-line{
        width: 100%;
        height: 6rpx;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
.content{
    padding: 20rpx;
    box-sizing: border-box;
    .goods_card{
        width: 100%;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 30rpx;
        box-sizing: border-box;
        .card_title{
            font-weight: 500;
            font-size: 30rpx;
            color: #333333;
            margin-bottom: 24rpx;
        }
        .card_item{
            display: flex;
            align-items: center;
            margin-bottom: 48rpx;
            .card_img{
                width: 160rpx;
                height: 160rpx;
                border-radius: 12rpx;
                margin-right: 24rpx;
            }
            .card_text{
                width: 465rpx;
                height: 160rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .card_item_title{
                    font-weight: 500;
                    font-size: 30rpx;
                    color: #333333;
                }
                .card_item_bottom{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 32rpx;
                    .integral_number{
                        font-weight: 500;
                        font-size: 32rpx;
                        color: #FF1010;
                    }
                    .quantity{
                        color: #999999;
                        font-size: 28rpx;
                        font-weight: 400;
                    }
                }

            }
        }
        .postage_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                font-weight: 500;
                font-size: 30rpx;
                color: #333333;
            }
            .right{
                font-size: 30rpx;
                font-weight: 400;
                color: #999999;
            }
        }
    }
}




.footer{
	background: #FFFFFF;
	position: fixed;
	left: 0;
	bottom: 0;
    z-index: 99;
	width: 100%;
	border-top: 1rpx solid #f2f2f2;
	.fotlef{
        display: flex;
		align-items: flex-start;
        flex-direction: column;
		justify-content: space-between;
		
		.fotyou{
			font-size: 26rpx;
			font-weight: 400;
			color: #666666;
            margin-bottom: 6rpx;
		}
        .surplus_text{
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 28rpx;
            color: #666666;
            .surplus_number{
                color: #EA3E1A;
                margin-left: 6rpx;
            }
        }
	}
	.fotbox{
		padding: 20rpx 30rpx;
        padding-bottom: 60rpx;
        display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
  