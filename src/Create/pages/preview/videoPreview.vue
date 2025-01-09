<template>
    <view class="container" id="containerBox">
        <videoPreviewPage :contentId="data.contentId"></videoPreviewPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import videoPreviewPage from './components/videoPreviewPage.vue'

interface Data {
    contentId:string
}
const data = reactive<Data>({
    contentId:''
})

onLoad((option)=>{
    console.log('视频发布预览',option);
    data.contentId = option!.id
    
})


</script>
  
<style>
page{
    background: #000;
}
</style>

  