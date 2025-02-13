<template>
    <view class="container">
        <ServicestoreDetailPage ref="ServicetoreRef" :shopId="data.shopId" :isAd="data.isAd" @saveShareObj="saveShareObj"></ServicestoreDetailPage>
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import ServicestoreDetailPage from './components/ServicestoreDetailPage.vue'

import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

interface Data {
    shopId:string,
    isAd:number,
    shareObj:any,
    shareId:string,
}
const data = reactive<Data>({
    shopId: '',
    isAd: 0,
    shareObj: {},
    shareId: ''
})

onMounted(() => {

})


onLoad((option:any) => {
    console.log(option)
    data.isAd = Number(option.isAd)
    data.shopId = option.itemId
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

const ServicetoreRef = ref()
// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any) => {
    (ServicetoreRef.value as any).closeShare()
    return {
        ...data.shareObj,
        path: `/pagesService/pages/Servicestore/ServicestoreDetail?shopId=${data.shareId}`
    }
})
//#endif

</script>

<style lang="scss" scoped>

</style>

