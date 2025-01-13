<template>
    <view class="container">
        <refundOrder :orderId="data.orderId"></refundOrder>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import refundOrder from './components/refundOrderPage.vue'
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    orderId:string
}
const data = reactive<Data>({
    orderId:''
})

onLoad((option:any)=>{
    data.orderId = option.orderId
})

onMounted(() => {

})




</script>
  
<style lang="scss" scoped>

</style>
 
