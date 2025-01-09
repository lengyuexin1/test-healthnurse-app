<template>
    <view class="container">
        <videoPreviewPage 
        ref="coursevideo" 
        @saveShareObj="saveShareObj" 
        :videoPagetype="data.videoPagetype" 
        :videoId="data.videoId" 
        ></videoPreviewPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onShareAppMessage, onShow, onUnload} from '@dcloudio/uni-app'

import videoPreviewPage from './components/videoPreviewPage.vue'
import { retransmission } from '@/api/create-api'


interface Data {
    videoId : string,
    shareObj:any,
    shareId:string,
    videoPagetype:number,
}
const data = reactive<Data>({
    videoId:'',
    shareObj:{},
    shareId:'',
    videoPagetype:0,
})

onMounted(() => {
})

onLoad((option:any)=>{
    data.videoId = option.videoId
    data.videoPagetype = option.videoPagetype ? option.videoPagetype : 0
    
})


// 保存分享信息
const saveShareObj = (item:any) => {
    data.shareObj = {
        title: item.title,
        imageUrl : item.imageUrl,
        desc : item.desc,
    }
    data.shareId = item.id

}


const coursevideo = ref()

// 页面关闭生命周期
onUnload(()=>{
    (coursevideo.value as any).postviewTime()
})

// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any)=>{
    console.log('小程序分享');
    (coursevideo.value as any).closeShare();
    (coursevideo.value as any).sharRetransmission();
    return {
        ...data.shareObj,
        path: `/Create/pages/videoPreview/videoPreview?videoId=${data.videoId}&videoPagetype=${data.videoPagetype}`,
    }
})
//#endif

onShow(()=>{
    // (coursevideo.value as any).showRefresh()
})




</script>
  
<style>
page{
    background: #000;
    height: 100%;
}
</style>
<style lang="scss" scoped>

</style>
  