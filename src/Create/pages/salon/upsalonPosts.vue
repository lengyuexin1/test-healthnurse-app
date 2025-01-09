<template>
    <view class="container">
        <upsalonPostsPage :ischange="data.ischange" :id="data.id"></upsalonPostsPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import upsalonPostsPage from './components/upsalonPostsPage.vue'

interface Data {
    ischange:number,
    id:string,
}

const data = reactive<Data>({
    ischange:0,
    id:''
})


onLoad((option:any)=>{
    if (Number(option.ischange)) {
        data.ischange = 1
        data.id = option.id
    }else{
        data.ischange = 0
    }
    
})



</script>
  
<style>
page{
    background: #fff;
}
</style>
 
