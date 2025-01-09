<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="'兑换详情'" text-color="#fff" icon-color="#fff"></bc-page-navbar>
            </template>

            <view class="content">
                <view class="orderState">
                    <view class="order-content">
                        <view class="state-text-box" >
                            <view class="state-title" v-if="data.osObj.status == 100000">待发货</view>
                            <view class="state-title" v-if="data.osObj.status == 200000">待收货</view>
                            <view class="state-title" v-if="data.osObj.status == 300000">已完成</view>
                            <view class="state-text" v-if="data.osObj.status == 100000">商家将在48小时内发货</view>
                            <view class="state-text" v-if="data.osObj.status == 200000">您的商品已发货请留意物流信息</view>
                            <view class="state-text" v-if="data.osObj.status == 300000">商品兑换已完成</view>
                        </view>
                    </view>
                </view>
                <view class="orderLogistics">
                    <view class="topState_box">
                        <view class="State_left">
                            <view class="round_icon"></view>
                            <view class="topState_text" v-if="data.osObj.status == 100000">等待发货</view>
                            <view class="topState_text" v-if="data.osObj.status == 200000">已发货</view>
                            <view class="topState_text" v-if="data.osObj.status == 300000">兑换完成</view>
                        </view>
                        <view class="Logistics_btn" v-if="data.osObj.status != 100000" @click="LogisticsDetail">查看详情</view>
                    </view>
                    <view class="Logistics_text">
                        <view class="text_top">
                            <view class="round_icon"></view>
                            <view class="city" v-if="data.osObj.addressInfo">
                                <text>{{ data.osObj.addressInfo.area }}</text>
                                <text>{{ data.osObj.addressInfo.address }}</text>
                            </view>
                        </view>
                        <view class="mattip" v-if="data.osObj.addressInfo">
                            <view>{{ data.osObj.addressInfo.name }} {{ data.osObj.addressInfo.mobile }} </view>
                            
                        </view>
                    </view>

                    <view class="connect_Line"></view>

                </view>
                <view class="order_info">
                    <view class="goods_card">
                        <view class="card_item">
                            <image
                                class="card_img"
                                :src="data.osObj.mainPics && data.osObj.mainPics[0]"
                                mode="aspectFill"
                            />
                            <view class="card_text">
                                <view class="card_item_title">{{ data.osObj.name }}</view>
                                <view class="card_item_bottom">
                                    <view class="integral_number">{{ data.osObj.integral }} 积分</view>
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
                <view class="order_detail">
                    <div class="mation row j-between not_top">
                        <div class="mattit">消耗积分</div>
                        <div class="matprice">{{ data.osObj.integral }} 积分</div>
                    </div>
                    <div class="mation row j-between">
                        <div class="mattit">订单编号</div>
                        <div class="row i-center">
                            <div class="mattip">{{data.osObj.serialNo}}</div>
                            <div class="matcop" @click="copy(data.osObj.serialNo)">
                                复制
                            </div>
                        </div>
                    </div>
                    <template v-if="data.show">
                        <div class="mation row j-between">
                            <div class="mattit">创建时间</div>
                            <div class="mattip">{{ date(data.osObj.utcCreated) }}</div>
                        </div>
                        <div class="mation row j-between">
                            <div class="mattit">订单邮费</div>
                            <div class="mattip">包邮</div>
                        </div>
                    </template>
                    <div class="show_more">
                        <view class="more" v-if="!data.show" @click="changeshow(true)">
                            <view class="show_title">展示更多</view>
                            <TnIcon name="down"></TnIcon>
                        </view>
                        <view class="more" v-else @click="changeshow(false)">
                            <view class="show_title">点击收起</view>
                            <TnIcon name="up"></TnIcon>
                        </view>
                    </div>
                </view>
                

            </view>
            <template #bottom>
                <view class="bottom_btn" v-if="data.osObj.status == 200000">
                    <view class="receiving_btn" @click="toReceiving">确认收货</view>
                </view>
            </template>
        </z-paging>

		<BCNotify ref="bcNotify"></BCNotify>




        
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { onLoad, onShow } from '@dcloudio/uni-app'
import { formattime } from '@/common/formatTime'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import { 
    integralOrderDetail,
    confirmReceive,
} from '@/api/order-api'
import { gotointegralLogistics } from '@/routes/goods-routes'
import { getAssetsPic } from '@/common/setPicture'

interface Data {
    osObj:any,
    showInfo:boolean,
    detailObj:any,
    showreason:boolean,
    reasonList:any, // 订单取消原因列表
    reasonItemid:string,
    id: string,
    show: boolean,
    logisticsList: any

}
const data = reactive<Data>({
    osObj:{},
    showInfo:false,
    detailObj:{},
    showreason:false,
    reasonList:[],
    reasonItemid:'',
    id: '',
    show: false,
    logisticsList : [
        { id: 1, title: "shunfeng",name: "顺丰速运"},
        { id: 2, title: "zhongtong",name: "中通快递"},
        { id: 3, title: "shentong",name: "申通快递"},
        { id: 4, title: "yuantong",name: "圆通速递"},
        { id: 5, title: "yunda",name: "韵达快递"},
        { id: 6, title: "huitongkuaidi",name: "百世快递"},
        { id: 7, title: "jtexpress",name: "极免速递"},
        { id: 8, title: "youzhengguonei",name: "邮政快递包裹"},
        { id: 9, title: "ems",name: "EMS"},
        { id: 10, title: "jd",name: "京东物流"},
        { id: 11, title: "debangwuliu",name: "德邦"},
    ]
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const date = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD HH:mm')
})

onLoad((option:any)=>{
    data.id = option!.itemId
})

onMounted(()=>{
    getDetail(data.id)
})

const bcNotify = ref()


const getDetail = (id:string) => {
    integralOrderDetail({
        id
    }).then((res:any)=>{
        data.osObj = res

        data.showInfo = true

    })
}

const copy = (str:string)=> {
    uni.setClipboardData({
        data: str,
        showToast: false,
        success: () => {
            uni.hideToast()
            console.log('复制成功');
            bcNotify.value.show('复制成功')
        }
    })
}

const changeshow = (del:boolean) => {
    data.show = del
}

const LogisticsDetail = () => {
    
    let arr = data.logisticsList.filter((item:any) => {
        return item.id == data.osObj.expressCompanyId
    })

    gotointegralLogistics({
        com: arr[0].title,
        num: data.osObj.expressNo
    })
}

const toReceiving = () => {
    confirmReceive({
        orderId: data.osObj.id
    }).then(()=>{
        bcNotify.value.show('收货成功')
        getDetail(data.id)
    }).catch((err: any) => {
        bcNotify.value.error('收货失败')
    })
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
.orderState{
    .order-content {
        width: 100%;
        height: 120rpx;
        border-radius: 24rpx;
        padding: 12rpx;
        box-sizing: border-box;
        margin-bottom: 18rpx;
        .state-text-box {
            width: 100%;
            height: 100%;
            border-radius: 16rpx;
            display: flex;
            flex-direction: column;
            .state-title {
                font-size: 40rpx;
                color: #FFFFFF;
                margin-bottom: 8rpx;
            }
            .state-text {
                font-size: 24rpx;
                color: #FFFFFF;
            }
        }
    }
}

.orderLogistics{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    position: relative;
    .topState_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        
        .State_left{
            display: flex;
            align-items: center;
            .round_icon{
                width: 16rpx;
                height: 16rpx;
                background: #EA3E1A;
                border-radius: 50%;
                margin-right: 16rpx;
            }
            .topState_text{
                font-weight: 500;
                font-size: 28rpx;
                color: #EA3E1A; 
            }
        }
        .Logistics_btn{
            border-radius: 28rpx;
            border: 2rpx solid #EEEEEE;
            width: 148rpx;
            height: 56rpx;
            text-align: center;
            line-height: 56rpx;
            font-size: 22rpx;
            color: #666666;
            font-weight: 400;
        }
    }
    .Logistics_text{
        .text_top{
            display: flex;
            align-items: center;
            margin-bottom: 4rpx;
            .round_icon{
                width: 18rpx;
                height: 18rpx;
                border: 2rpx solid #E2E2E2;
                background: #FFFFFF;
                border-radius: 50%;
                margin-right: 14rpx;
            }
            .city{
                font-size: 28rpx;
                color: #333333;
                font-weight: 500;
            }
        }
        
        .mattip{
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
            padding-left: 32rpx;
            box-sizing: border-box;
        }
    }

    .connect_Line{
        position: absolute;
        top: 66rpx;
        left: 37rpx;
        width: 4rpx;
        height: 70rpx;
        background: #E2E2E2;

    }

}

.order_info{
    margin-bottom: 20rpx;
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
.order_detail{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    padding-bottom: 110rpx;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .contit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        &.flix {
            position: relative;
        }
    }
    .mation{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 42rpx;

        &.not_top{
            margin-top: 0rpx;
        }

        .mattit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            flex-shrink: 0;
        }
        .mattip {
            font-size: 28rpx;
            font-weight: 400;
            color: #999999;
            text-align: right;
            word-break: break-all;
            max-width: 470rpx;
        }
        .matprice{
            font-size: 34rpx;
            font-weight: bold;
            color: #f50606;
        }
        
        .matcop {
            margin-left: 8rpx;
            padding: 8rpx 24rpx;
            box-sizing: border-box;
            background-color: #FFFFFF;
            border: 2rpx solid #EEEEEE;
            font-size: 22rpx;
            color: #666666;
            border-radius: 24rpx;
        }
    }
    .convitae{
        display: flex;
        align-items: center;
        padding: 20rpx 24rpx;
        background: #f6f6f6;
        border-radius: 8rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        div {
            background: #ff7331;
            width: 8rpx;
            height: 8rpx;
            border-radius: 8rpx;
            margin-right: 12rpx;
        }
    }
    .show_more {
        position: absolute;
        width: 100%;
        bottom: 30rpx;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .more {
            width: 174rpx;
            height: 54rpx;
            background: #f2f2f2;
            opacity: 1;
            border-radius: 30rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .show_title {
            line-height: 54rpx;
            font-size: 24rpx;
            color: #666666;
            margin-right: 6rpx;
        }
    }
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
    padding: 20rpx 30rpx;
    padding-bottom: 48rpx;
    display: flex;
    justify-content: flex-end;
    .receiving_btn{
        width: 192rpx;
        height: 72rpx;
        background: #EA3E1A;
        border-radius: 36rpx;
        text-align: center;
        line-height: 72rpx;
        color: #FFFFFF;
        font-size: 28rpx;
    }
    
}
</style>
<style>
page{
    background: linear-gradient(180deg, #EA3E1A 10%, #F8F9F9 40%);
}
</style>

