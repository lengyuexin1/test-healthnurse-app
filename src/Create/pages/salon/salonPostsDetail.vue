<template>
    <view class="container">
        <salonPostsDetailPage ref="salonPosts" :id="data.id" @saveShareObj="saveShareObj"></salonPostsDetailPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import salonPostsDetailPage from './components/salonPostsDetailPage.vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

interface Data{
    id:string,
    shareObj:any,
    shareId:string,
}
const data = reactive<Data>({
    id:'',
    shareObj:{},
    shareId:''
})

onLoad((option:any)=>{
    data.id = option.id
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


const salonPosts = ref()
// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any)=>{
    (salonPosts.value as any).closeShare();
    (salonPosts.value as any).sharRetransmission();

    return {
        ...data.shareObj,
        path: `/Create/pages/salon/salonPostsDetail?id=${data.shareId}`,
    }
})
//#endif


</script>
  
<style lang="scss" scoped>

</style>
<style>
page{
    background: #fff;
}
</style>
 
