<template>
    <div class="content" v-if="showInfo">
        <!-- <div class="contit">订单明细</div> -->
        <div class="mation row j-between not_top">
            <div class="mattit">订单金额</div>
            <!-- (sumPrice('paidAmount') / 100) -->
            <div class="matprice">￥{{ serviceInfo.priceInfo.paidAmount / 100 }}</div>
        </div>
        <div class="mation row j-between">
            <div class="mattit">订单编号</div>
            <div class="row i-center">
                <div class="mattip">{{serviceInfo.serialNo}}</div>
                <div class="matcop" @click="copy(serviceInfo.serialNo)">
                    复制
                </div>
            </div>
        </div>
        <template v-if="data.show">
            <div class="mation row j-between">
                <div class="mattit">创建时间</div>
                <div class="mattip">{{ date(serviceInfo.utcCreated) }}</div>
            </div>
            <div class="mation row j-between">
                <div class="mattit">订单邮费</div>
                <div class="mattip">包邮</div>
            </div>
            <div class="mation row j-between">
                <div class="mattit">已优惠</div>
                <!-- sumPrice('discountAmount') -->
                <div class="mattip" v-if=" serviceInfo.priceInfo.discountAmount > 0">-￥{{( serviceInfo.priceInfo.discountAmount / 100) }}</div>
                <div class="mattip" v-else>--</div>
            </div>
            <div class="mation row j-between" v-if="serviceInfo.serialNo.utcPay > 0">
                <div class="mattit">支付时间</div>
                <div class="mattip">{{ date(serviceInfo.serialNo.utcPay) }}</div>
            </div>
            <div class="mation row j-between">
                <div class="mattit">付款信息</div>
                <div class="mattip">微信支付</div>
            </div>
            <div class="mation row j-between">
                <div class="mattit">收货地址</div>
                <div class="mattip">
                    <view>{{ serviceInfo.addressInfo.name }} {{ serviceInfo.addressInfo.mobile }} </view>
                    <view>{{ serviceInfo.addressInfo.area }}</view>
                    <view>{{ serviceInfo.addressInfo.address }}</view>
                </div>
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

    </div>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');


interface Props {
    serviceInfo:any,
    showInfo:boolean,
}

const props = defineProps<Props>()


interface Data {
    show:boolean,
}
const data = reactive<Data>({
    show:false
})

const date = computed( () => (tiem:number)=> {
    return dayjs(tiem * 1000).format('YYYY-MM-DD HH:mm');
})

const sumPrice = computed(()=>(key:string)=>{
    let sum = 0

    console.log('props.serviceInfo',props.serviceInfo);
    

    if (!props.serviceInfo.info[0].itemId) {
        return sum
    }
    props.serviceInfo.info.forEach((item:any) => {
        sum = sum + item[key]
    })
    return sum

})

const copy = (str:string)=> {
    uni.setClipboardData({
        data: str,
        showToast: false,
        success: () => {
            uni.hideToast()
            console.log('复制成功');
            // this.$refs.uToast.success('复制成功')
        }
    })
}

const changeshow = (del:boolean) => {
    data.show = del
}



</script>
  
<style lang="scss" scoped>
.content{
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
        .matprice {
            color: #f50606;
        }
        .matnumber {
            color: #999999;
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
</style>
  