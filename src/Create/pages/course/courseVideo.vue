<template>
    <view class="container">
        <courseVideoPage ref="coursevideo" @saveShareObj="saveShareObj" v-if="data.flag" :ischannel="data.ischannel" :query="data.query" :videoIdlist="data.videoIdlist" :isstudy="data.isstudy"></courseVideoPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onShareAppMessage, onShow, onUnload} from '@dcloudio/uni-app'

import courseVideoPage from './components/courseVideoPage.vue'
import { TempStorage } from "@bc/base"
import { retransmission } from '@/api/create-api'


interface Data {
    query : any,
    videoIdlist : string[],
    flag: boolean,
    shareObj:any,
    shareId:string,
    isstudy:number,
    ischannel:number,
}
const data = reactive<Data>({
    query:{},
    videoIdlist:[],
    flag: false,
    shareObj:{},
    shareId:'',
    isstudy:0,
    ischannel:0,
})

onMounted(() => {
})

onLoad((option)=>{
    console.log('option',option);
    
    const tempStorage = new TempStorage()
    tempStorage.get(option!.listId).then((res:any) => {
        console.log('res',res);
        
        data.query = res.query
        data.videoIdlist = res.videoIdlist
        data.isstudy = res.isstudy ? res.isstudy : 0
        data.ischannel = res.ischannel ? res.ischannel : 0
        console.log('data.res.ischanne',data.ischannel);
        
        data.flag = true
    }).catch((err:any) => {
        console.log('视频列表获取失败',err);
    })
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
    (coursevideo.value as any).closeShare()
    const listId = TempStorage.savewx({
        videoIdlist:[data.shareId],
    })
    return {
        ...data.shareObj,
        path: `/Create/pages/course/courseVideo?listId=${listId}`,
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
  