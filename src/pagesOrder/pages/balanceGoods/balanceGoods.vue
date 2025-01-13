<template>
    <view class="container">
        <balanceGoodsPage :uniqueId="data.uniqueId" ></balanceGoodsPage>
        <verifyAccount ref="accountUserRef" ></verifyAccount>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { onLoad, onShow, onReady } from '@dcloudio/uni-app'
import balanceGoodsPage from './components/balanceGoodsPage.vue'
import { TempStorage } from "@bc/base"
import verifyAccount from '@/Order/components/verifyAccount.vue'



interface Data {
    uniqueId: any
    userId: string|null
}
const data = reactive<Data>({
    uniqueId: '',
    userId: null
})

onMounted(() => {

})


const accountUserRef = ref()

onLoad((option:any) => {
    console.log('确认订单option',option);
    console.log('确认订单option.uniqueId',option.uniqueId);
    console.log('确认订单option.payJSON',option.payJSON);
    
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

onShow((option:any) => {
    console.log('支付页面onshow。option',option);
    
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
  