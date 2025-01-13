<template>
    <view class="container">

        <courseOrderPage ref="orderDetail" :orderId="data.orderId" :isAppOpen="data.isAppOpen"></courseOrderPage>
        <verifyAccount ref="accountUserRef" ></verifyAccount>

    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import courseOrderPage from './components/courseOrderPage.vue'
import verifyAccount from '@/Order/components/verifyAccount.vue'

import { onLoad, onShow, onReady } from '@dcloudio/uni-app'

interface Props {
}
const props = defineProps<Props>()

interface Data {
    orderId:string,
    isAppOpen: boolean
    userId: string
}
const data = reactive<Data>({
    orderId:'',
    isAppOpen: false,
    userId: '',
})

onLoad((option:any)=>{
    data.orderId = option.orderId ? option.orderId : null

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

onMounted(() => {

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



</script>
  
<style lang="scss" scoped>

</style>
  