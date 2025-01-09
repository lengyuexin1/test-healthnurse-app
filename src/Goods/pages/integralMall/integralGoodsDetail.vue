<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'商品详情'"></bc-page-navbar>
            </template>
            <view class="mainPics_swiper">
                <swiper
                    class="swiper"
                    :autoplay="true" 
                    :circular="true"
                    :current="data.currentTabIndex"
                    @change="changeswiper"
                >
                    <swiper-item class="swiper_item" v-for="(item,index) in data.detailObj.mainPics" :key="index">
                        <image
                            class="mainPics_item"
                            :src="item"
                            mode="aspectFill"
                            @click="preImage(index,data.detailObj.mainPics)"
                        />
                    </swiper-item>
                </swiper>
                <view class="swiper_bottom">
                    <view class="cntExchange_box">
                        {{ data.detailObj.cntExchange ? data.detailObj.cntExchange : '--' }} 人已兑换
                    </view>
                    <view class="swiper_number" v-if="data.detailObj.mainPics">
                        {{ (data.currentTabIndex + 1) }} / {{ data.detailObj.mainPics.length }}
                    </view>
                </view>
            </view>
            <view class="text_detail">
                <view class="detail_title">
                    <view class="integral_number">{{ data.detailObj.integral }} 积分</view>
                    <view class="price">￥{{ (data.detailObj.price / 100) }}</view>
                </view>
                <view class="goods_name">{{ data.detailObj.name }}</view>
            </view>

            <view class="content_detail">
                <view class="top_nav">
                    <TnTabs v-model="data.navIndex" 
                        height="82rpx"
                        bar-width="36rpx"
                        :scroll="false"
                        :bottom-shadow="false"
                        font-size="30rpx"
                        active-font-size="32rpx"
                        color="#666666"
                        active-color="#0B0B0B" 
                        bar-color="#EA3E1A">
                        <TnTabsItem v-for="(item, index) in data.tabulationList" :key="index" :title="item.name"/>
                    </TnTabs>
                </view>

                <template v-if="data.navIndex == 0">
                    <view class="img_list">
                        <image
                            class="img_item"
                            @click="preImage(index,data.detailObj.detailPics)"
                            v-for="(item,index) in data.detailObj.detailPics" :key="index"
                            :src="item"
                            mode="widthFix"
                        />
                    </view>
                </template>
                <template v-else> 
                    <view class="rule_text">
                        <view class="rule_title">兑换说明：</view>
                        <view class="text_item">1.用户可以使用积分兑换礼品，兑换后不支持退换和取消订单；同一款实物礼品不同颜色随机发货，请兑换前再次确认。</view>
                        <view class="text_item">2.积分兑换以【积分明细】列表展示为准。</view>
                        <view class="text_item">3.同一账号每天仅限兑换一次。</view>
                        <view class="text_item textspage">4.实物礼品按订单顺序30日内以快递形式发货，如遇断货，特殊节假日，疫情，自然灾害等特殊情况，礼品寄送周期将会延长，请耐心等待。</view>
                        <view class="text_item">
                            其他说明：用户如出现违规行为（如虚假交易，作弊等），保椿生活有权取消用户参与资格，并取消用户已经领取或者使用的积分，获得的实物礼品将不安排寄送。在法律允许范围内，活动解释权归保椿生活所有。
                        </view>     

                    
                    </view>
                </template>
                
            </view>


            <template #bottom>
                <view class="bottom_box">
                    <view class="exchange_btn" v-if="data.detailObj.stock != 0" @click="tobalance">
                        立即兑换
                    </view>
                    <view v-else class="not_have_stock">
                        已抢光
                    </view>
                </view>
            </template>
        </z-paging>

		<BCNotify ref="bcNotify"></BCNotify>
        
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { formattime } from '@/common/formatTime'
import { integralGoodsDetail, timePointsDetail } from '@/api/goods-api'
import { tobalanceRule } from '@/routes/goods-routes'
import { TempStorage } from "@bc/base"

interface Data {
    id:string,
    detailObj: any,
    currentTabIndex: number,
    tabulationList: any,
    navIndex: number,
    IntegralObj: any,
}
const data = reactive<Data>({
    id:'',
    detailObj: {},
    currentTabIndex: 0,
    tabulationList: [
        {id:1,name:'商品详情'},
        {id:2,name:'兑换说明'},
    ],
    navIndex: 0,
    IntegralObj: {}
})


const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const bcNotify = ref()


onLoad((option:any)=>{
    data.id = option.id
})

onMounted(()=>{
    integralGoodsDetail({   
        id: data.id
    }).then((res:any)=>{
        data.detailObj = res
    })
    timePointsDetail({}).then((res:any)=>{
        data.IntegralObj = res
    })
})



const changeswiper = (e:any) => {
    data.currentTabIndex = e.detail.current
}

const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}

const tobalance = () => {

    let integral = data.IntegralObj.points - data.detailObj.integral
    console.log('integral',integral);
    
    if (integral < 0) {
        bcNotify.value.error('积分不足')
        return
    }

    const uniqueId = TempStorage.savewx({
        productId: data.detailObj.id
    })
    tobalanceRule({uniqueId})
}

</script>

<style lang="scss" scoped>
.mainPics_swiper{
    position: relative;
    .swiper{
        width: 100%;
        height: 750rpx;
        .swiper_item{
            width: 100%;
            height: 100%;
            .mainPics_item{
                width: 100%;
                height: 100%;
            }
        }
    }
    .swiper_bottom{
        position: absolute;
        bottom: 20rpx;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rpx 30rpx;
        box-sizing: border-box;
        .cntExchange_box{
            padding: 10rpx 16rpx;
            box-sizing: border-box;
            border-radius: 26rpx;
            background-color: rgba(0, 0, 0, 0.5);
            color: #FFFFFF;
            font-size: 24rpx;
            font-weight: 400;
        }
        .swiper_number{
            padding: 4rpx 32rpx;
            box-sizing: border-box;
            border-radius: 22rpx;
            background-color: rgba(0, 0, 0, 0.5);
            font-weight: 500;
            font-size: 26rpx;
            color: #FFFFFF;
        }
    }
}
.text_detail{
    padding: 30rpx 36rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 16rpx 16rpx;
    margin-bottom: 20rpx;
    .detail_title{
        display: flex;
        align-items: center;
        margin-bottom: 16rpx;
        .integral_number{
            font-weight: 500;
            font-size: 44rpx;
            color: #EC3E3E;
            margin-right: 10rpx;
        }
        .price{
            font-weight: 400;
            font-size: 28rpx;
            color: #999999;
            text-decoration: line-through
        }
    }
    .goods_name{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
    }

}
.content_detail{
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    .top_nav{
        border-bottom: 2rpx solid #F2F2F2;
        box-sizing: border-box;
    }
    .img_list{
        .img_item{
            display: block;
            height: auto;
        }
    }
    .rule_text{
        background: #fff;
        padding: 30rpx;
        padding-bottom: 70rpx;
        box-sizing: border-box;
        .rule_title{
            font-weight: 500;
            font-size: 30rpx;
            color: #333333;
            margin-bottom: 16rpx;
        }
        .text_item{
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            line-height: 48rpx;
            &.textspage{
                margin-bottom: 30rpx;
            }
        }
    }
}

.bottom_box{
    padding: 20rpx 30rpx;
    padding-bottom: 70rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    .exchange_btn{
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        background: #EA3E1A;
        font-weight: 400;
        font-size: 32rpx;
        color: #FFFFFF;
    }
    .not_have_stock{
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        background: #D1D1D1;
        font-weight: 400;
        font-size: 32rpx;
        color: #FFFFFF;
    }

}
</style>


