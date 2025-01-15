<template>
    <view v-if="showInfo">
        <div class="content" v-if="serviceInfo.priceInfo">
            <div class="contit">价格明细</div>
            <div class="mation ">
                <div class="mattit">服务价格</div>
                <div class="mattip">¥{{serviceInfo.priceInfo.amount / 100}}</div>
            </div>
            <template>
                <div class="mation" v-if="!isinstitution">
                    <div class="mattit">优惠信息</div>
                    <div class="mattip matprice">￥{{serviceInfo.priceInfo.discountAmount / 100}}</div>
                </div>
                <div class="mation" v-else>
                    <div class="mattit">购买数量</div>
                    <div class="mattip">x{{serviceInfo.info.quantity}}</div>
                </div>
            </template>
            <div class="mation row j-between">
                <div class="mattit">{{serviceInfo.status === 65537 ? '待支付' : serviceInfo.status === 262146 ? '应支付' : '已支付'}}</div>
                <div class="mattip matprice">¥{{serviceInfo.priceInfo.paidAmount / 100}}</div>
            </div>
        </div>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
    serviceInfo:any,
    showInfo:boolean,
    isinstitution:boolean,
}

const props = defineProps<Props>()


onMounted(() => {

})




</script>
  
<style lang="scss" scoped>
.content{
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
    box-sizing: border-box;
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
        }
        .matprice {
            color: #f50606;
        }
        .matnumber {
            color: #999999;
        }
        .matcop {
            margin-left: 8rpx;
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
}
</style>
  