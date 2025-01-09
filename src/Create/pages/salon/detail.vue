<template>
    <view class="container">
        <channelPage :id="data.id" :type="data.type" :inviteInfo="data.inviteInfo" @saveShareObj="saveShareObj"></channelPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import channelPage from './components/channelPage.vue'
import { onLoad, onReady, onShareAppMessage } from '@dcloudio/uni-app'

interface Data {
    id:string
    /** 区分是否是从消息页面跳转过来 */
    type: string
    /** 邀请信息体 */
    inviteInfo: string
    shareObj: any
}
const data = reactive<Data>({
    id:'',
    type: '',
    inviteInfo: '',
    shareObj: {}
})

onMounted(() => {

})

onLoad((option:any)=>{
    data.id = option.id
    data.type = option?.type
    
    if (data.type == 'news') {
        data.inviteInfo = decodeURIComponent(option.param)
    }
})

const saveShareObj = (obj:any) => {
    data.shareObj = obj
}

// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any)=>{
    console.log('小程序分享');
    
    return {
        ...data.shareObj,
        desc: '邀请你加入沙龙',
        path: `/Create/pages/salon/detail?id=${data.id}`,
    }
})
//#endif

</script>
  
<style lang="scss" scoped>

</style>
  