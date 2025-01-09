<template>
    <div class="content" v-if="showInfo">
        <div class="contit">订单明细</div>
        <div class="mation row j-between">
            <div class="mattit">订单编号</div>
            <div class="row i-center">
                <div class="mattip">{{serviceInfo.serialNo}}</div>
                <div class="matcop" @click="copy(serviceInfo.serialNo)">
                    复制
                </div>
            </div>
        </div>
        <div class="mation row j-between">
            <div class="mattit">创建时间</div>
            <div class="mattip">{{ timeformat(serviceInfo.utcCreated) }}</div>
        </div>
        <div class="mation row j-between" v-if="serviceInfo.utcPay > 0">
            <div class="mattit">支付时间</div>
            <div class="mattip">{{ timeformat(serviceInfo.utcPay) }}</div>
        </div>
        <div class="mation row j-between">
            <div class="mattit">付款信息</div>
            <div class="mattip">微信支付</div>
        </div>
        <div class="mation row j-between">
            <div class="mattit">收款方</div>
            <div class="mattip">广东晓椿健康养老服务有限公司</div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { formattime } from '@/common/formatTime'


interface Props {
    serviceInfo:any,
    showInfo:boolean,
}

const props = defineProps<Props>()



const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
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
}
</style>
  