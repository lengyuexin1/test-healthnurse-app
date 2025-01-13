<template>
    <view class="container">
        <serviceCommentPage :id="data.id" :son="data.son"></serviceCommentPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import serviceCommentPage from './components/serviceCommentPage.vue'

import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id:string,
    son:number
}
const data = reactive<Data>({
    id:'',
    son:1,
})

onMounted(() => {

})


onLoad((option:any)=>{
    data.id = option.id
    data.son = option.son
})



</script>
  
<style lang="scss" scoped>

</style>
 
