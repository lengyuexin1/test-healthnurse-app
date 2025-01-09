<template>
    <view class="container" id="containerBox">
        <articlePreviewPage  :contentId="data.contentId"></articlePreviewPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import articlePreviewPage from './components/articlePreviewPage.vue'

interface Data {
    contentId:string
}
const data = reactive<Data>({
    contentId:''
})

onLoad((option)=>{
    console.log('文章发布预览',option);
    
    data.contentId = option!.id
    
})


</script>
  
<style>
page{
    background: #fff;
}
</style>

  