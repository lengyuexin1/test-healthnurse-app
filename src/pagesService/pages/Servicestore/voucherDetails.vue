<template>
    <view class="container">
        <voucherDetailsPage :id="data.id" ></voucherDetailsPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import voucherDetailsPage from './components/voucherDetailsPage.vue'

import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id:string,
}
const data = reactive<Data>({
    id:'',
})

onMounted(() => {

})


onLoad((option:any)=>{
    data.id = option.id
})



</script>
  
<style lang="scss" scoped>

</style>
 
