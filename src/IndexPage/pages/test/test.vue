<script setup lang="ts">
import { sendLog } from './test'
import { onMounted } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'

onMounted(() => {
    tracking()
})
const tracking = () => {
    // getOptions().then((res: any) => {
    //     console.log(res)
    // })
}
const up = () => {
    // #ifdef MP-WEIXIN
    sendLog({
        eventType: 'view_product',
        productId: '123456',
        page: '/IndexPage/test/test',
        productName: 'Tablet',
        price: 500,
        currency: 'USD',
        diy: 'niemade 小程序'
    })
    console.log('小程序上报')
    // #endif
    // #ifdef APP-PLUS || H5
    sendLog({
        eventType: 'view_product',
        productId: '123456',
        page: '/IndexPage/test/test',
        productName: 'Tablet',
        price: 500,
        currency: 'USD',
        diy: 'niemade app || h5'
    })
    console.log('app上报')
    // #endif

}
</script>

<template>
    <view>
        <TnButton @click="up">上报</TnButton>
    </view>
</template>

<style scoped lang="scss">

</style>
