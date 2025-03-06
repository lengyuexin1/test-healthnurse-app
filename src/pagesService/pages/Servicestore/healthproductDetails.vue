<template>
    <view class="container">
        <healthproductDetailsPage ref="healthproductRef" :itemId="data.itemId"
                                  @saveShareObj="saveShareObj"></healthproductDetailsPage>
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import healthproductDetailsPage from './components/healthproductDetailsPage.vue'

import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'


interface Data {
    itemId: string,
    shareObj: any,
}

const data = reactive<Data>({
    itemId: '',
    shareObj: {}
})


onMounted(() => {

})


onLoad((option: any) => {
    data.itemId = option.itemId
})

// 保存分享信息
const saveShareObj = (item: any) => {
    data.shareObj = {
        title: item.title,
        imageUrl: item.imageUrl,
        desc: item.desc
    }
    data.shareId = item.id

}

const healthproductRef = ref()
// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res: any) => {
    (healthproductRef.value as any).closeShare()
    return {
        ...data.shareObj,
        path: `/pagesService/pages/Servicestore/healthproductDetails?itemId=${data.shareId}`
    }
})
//#endif

</script>

<style lang="scss" scoped>

</style>

