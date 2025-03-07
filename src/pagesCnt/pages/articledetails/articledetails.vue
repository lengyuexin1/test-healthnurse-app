<template>
    <view class="container" id="containerBox">
        <articledetailsPage ref="articledetails" @saveShareObj="saveShareObj" :contentId="data.contentId" :commentId="data.commentId" :isIm="data.isIm" :replyId="data.replyId" :type="data.type"></articledetailsPage>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { onLoad, onUnload, onShow, onShareAppMessage } from '@dcloudio/uni-app'

import articledetailsPage from './components/articledetailsPage.vue'

interface Data {
    contentId:string,
    commentId: string
    replyId: string
    isIm: number
    shareObj:any,
    shareId:string,
    type: string
}
const data = reactive<Data>({
    contentId: '',
    commentId: '',
    replyId: '',
    isIm: 1,
    shareObj: {},
    shareId: '',
    type: ''
})

onLoad((option:any) => {
    console.log('内容参数', option)
    data.contentId = option.id
    data.commentId = option?.commentId ?? ''
    data.replyId = option?.replyId ?? ''
    data.isIm = option?.isIm ?? ''
    data.type = option?.type ?? ''
})



const articledetails = ref()

onShow(() => {
    nextTick(() => {
        (articledetails.value as any).pageShow()
    })
})
// 页面关闭生命周期
onUnload(() => {
    (articledetails.value as any).postviewTime()
    uni.setStorageSync('pageVoice', {})

})

// 保存分享信息
const saveShareObj = (item:any) => {
    data.shareObj = {
        title: item.title,
        imageUrl: item.imageUrl,
        desc: item.desc
    }
    data.shareId = item.id

}


// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any) => {
    console.log('小程序分享');
    (articledetails.value as any).closeShare();
    (articledetails.value as any).sharRetransmission()

    console.log('data.shareId', data.shareId)


    return {
        ...data.shareObj,
        path: `/pagesCnt/pages/articledetails/articledetails?id=${data.shareId}`
    }
})
//#endif

</script>

<style lang="scss" scoped>

</style>
