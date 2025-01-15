<template>
    <view class="container">
        <goodsCommentPage :id="data.id" :shopId="data.shopId"></goodsCommentPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import goodsCommentPage from './components/goodsCommentPage.vue'

import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id:string,
    shopId:string,
}
const data = reactive<Data>({
    id:'',
    shopId:'',
})

onMounted(() => {

})


onLoad((option:any)=>{
    data.id = option.id
    data.shopId = option.shopId
})



</script>
  
<style lang="scss" scoped>

</style>
 
