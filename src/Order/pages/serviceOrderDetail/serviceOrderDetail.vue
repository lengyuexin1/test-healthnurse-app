<template>
    <view class="container">
        <orderPageDetail :orderId="data.orderId" :isAppOpen="data.isAppOpen"></orderPageDetail>
        <verifyAccount ref="accountUserRef" ></verifyAccount>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'

import verifyAccount from '@/Order/components/verifyAccount.vue'

import orderPageDetail from './components/orderPageDetail.vue'

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
})

const orderDetail = ref()
// onShow(() => {
//     (orderDetail.value as any).getDetail(data.orderId)
// })

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

</script>

<style lang="scss" scoped>
.bottom_btn{
    background: #fff;
    height: 120rpx;
    
}
</style>


