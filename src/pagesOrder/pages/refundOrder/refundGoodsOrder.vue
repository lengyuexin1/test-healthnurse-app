<template>
    <view class="container">
        <refundGoodsOrderPage :refundDetail="data.refundDetail"></refundGoodsOrderPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import refundGoodsOrderPage from './components/refundGoodsOrderPage.vue';
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    refundDetail:string
}
const data = reactive<Data>({
    refundDetail:''
})

onLoad((option:any)=>{
    data.refundDetail = option.refundDetail
})

onMounted(() => {

})




</script>
  
<style lang="scss" scoped>

</style>
 
