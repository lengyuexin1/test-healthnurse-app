<template>
    <view class="container">
        <balanceCoursePage 
        v-if="data.flag" 
        :price="data.price" 
        :cover="data.cover" 
        :coursetitle="data.coursetitle"
        :itemId="data.itemId"
        > </balanceCoursePage>
        <verifyAccount ref="accountUserRef" ></verifyAccount>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import balanceCoursePage from './components/balanceCoursePage.vue'
import { TempStorage } from "@bc/base"
import verifyAccount from '@/pagesOrder/components/verifyAccount.vue'


interface Props {
}

const props = defineProps<Props>()

interface Data {
    price:number,
    cover:string,
    coursetitle:string,
    itemId:string,
    flag:boolean
    userId: string|null
}
const data = reactive<Data>({
    price:0,
    cover:'',
    coursetitle:'',
    itemId:'',
    flag:false,
    userId: null

})


const accountUserRef = ref()

onMounted(() => {

})

onLoad((option:any) => {
    const tempStorage = new TempStorage()
    if (option!.itemId) {
        console.log('小程序正常结算');
        tempStorage.get(option!.itemId).then((res:any) => {
            data.price = res.price
            data.cover = res.cover
            data.coursetitle = res.coursetitle
            data.itemId = res.itemId
            data.flag = true
        }).catch(() => {
            console.log('课程订单获取失败');
        })
    }

    if (option.payJSON) {
        console.log('app跳转小程序结算');

        data.userId = option.userId

        let payJSON = option.payJSON.replace(/\\/g, "");
        payJSON = JSON.parse(payJSON);

        data.price = payJSON.price
        data.cover = payJSON.cover
        data.coursetitle = payJSON.coursetitle
        data.itemId = payJSON.itemId
        data.flag = true
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
  