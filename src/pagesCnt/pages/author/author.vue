<template>
    <view class="container">
        <authorPage 
        :isuser="data.isuser" 
        :accountId="data.accountId" 
        :taskId="data.taskId" 
        :isFans="data.isFans" 
        :ismyFans="data.ismyFans"
        @saveShareObj="saveShareObj"
        ></authorPage>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad, onReady, onShareAppMessage } from '@dcloudio/uni-app'


import authorPage from './components/authorPage.vue'


interface Data {
    isuser:number,
    accountId:string,
    taskId:string,
    isFans:number,
    ismyFans: number,
    shareObj: any
}
const data = reactive<Data>({
    isuser:0,
    taskId:'',
    accountId:'',
    isFans:0,
    ismyFans: 0,
    shareObj: {}
})

onMounted(() => {

})
onLoad((option:any)=>{
    data.taskId = option.taskId
    data.isuser = Number(option.isuser)
    data.accountId = option.accountId
    data.isFans = Number(option.isFans)
    data.ismyFans = Number(option.ismyFans)
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
        title: '邀请你添加好友',
        desc: '邀请你添加好友',
        path: `/pagesCnt/pages/author/author?accountId=${data.accountId}`,
    }
})
//#endif



</script>
  
<style>
page{
    /* background: linear-gradient(180deg, #FFFFFF 0%, #F2F3F5 185%) */
    background: #FAFAFA;
}
</style>
<style lang="scss" scoped>

</style>
  