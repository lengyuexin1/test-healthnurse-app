<template>
    <view class="container">
        <balanceOrderPage :uniqueId="data.uniqueId" :handle="data.handle"></balanceOrderPage>
        <verifyAccount ref="accountUserRef" ></verifyAccount>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import balanceOrderPage from './components/balanceOrderPage.vue';
import verifyAccount from '@/pagesOrder/components/verifyAccount.vue'
import { TempStorage } from "@bc/base"



interface Data {
    uniqueId:any,
    handle:number
    userId: string|null
    
}
const data = reactive<Data>({
    uniqueId:'',
    handle:1,
    userId: null
})

onMounted(() => {

})
const accountUserRef = ref()

onLoad((option:any) => {
    data.handle = option.handle

    if (option.uniqueId) {
        console.log('小程序正常结算');
        data.uniqueId = option.uniqueId
    }

    if (option.payJSON) {
        console.log('app跳转小程序结算');

        data.userId = option.userId

        let payJSON = option.payJSON.replace(/\\/g, "");
        payJSON = JSON.parse(payJSON);

        const uniqueId = TempStorage.savewx(payJSON);

        data.uniqueId = uniqueId;
    }

})

onReady(()=>{
    if(data.userId){
        // app校验小程序登录账号是否与app登录的账号一致
        nextTick(()=>{
            (accountUserRef.value as any).checkUser(data.userId)
        })
    }
})


</script>
  
<style lang="scss" scoped>

</style>
  