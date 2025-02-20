<template>
    <view class="container">
        <goodsOrderDetailPage ref="orderDetail" :orderId="data.orderId" :isAppOpen="data.isAppOpen"></goodsOrderDetailPage>
        <verifyAccount ref="accountUserRef" ></verifyAccount>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { onLoad, onShow, onReady, onShareAppMessage } from '@dcloudio/uni-app'

import goodsOrderDetailPage from './components/goodsOrderDetailPage'
import verifyAccount from '@/Order/components/verifyAccount.vue'


interface Data {
    orderId:string
    isAppOpen: boolean
    userId: string
}
const data = reactive<Data>({
    orderId:'',
    isAppOpen: false,
    userId: '',
})


onLoad((option:any)=>{
    data.orderId = option.itemId ? option.itemId : null

    if (!data.orderId) {
        data.userId = option.userId

        let payJSON = option.payJSON.replace(/\\/g, "");
        payJSON = JSON.parse(payJSON);

        data.orderId = payJSON.itemId
        data.isAppOpen = payJSON.isAppOpen

        

        console.log('payJSON',payJSON);
        console.log('data.isAppOpen',data.isAppOpen);
        

    }

    console.log(data.orderId);
})

const orderDetail = ref()
onShow(() => {
    (orderDetail.value as any).getDetail(data.orderId)
})

const accountUserRef = ref()
onReady(()=>{
    if(data.userId){
        // app校验小程序登录账号是否与app登录的账号一致
        nextTick(()=>{
            // (accountUserRef.value as any).checkUser(data.userId)
            (accountUserRef.value as any).checkUser(data.userId)
            
        })
    }
})

//#ifdef MP-WEIXIN
onShareAppMessage((res:any)=>{
    const orderObj = res.target.dataset.object.shopList[0].entityList[0]
    const collageRecordId = res.target.dataset.object.collageRecordId

    
    return {
        title: '超优惠！快来和我一起拼团',
        path: `/Order/pages/groupSplit/groupSplit?id=${orderObj.itemId}&collage_id=${collageRecordId}`,
        imageUrl: orderObj.image
    }
})
//#endif


</script>

<style lang="scss" scoped>
.bottom_btn{
    background: #fff;
    height: 120rpx;
    
}
</style>
<style>
page{
    background: linear-gradient(180deg, #EA3E1A 10%, #F8F9F9 40%);
}
</style>

