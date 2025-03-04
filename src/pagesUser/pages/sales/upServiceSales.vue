<template>
    <view class="container">
        <upServiceSalesPage :salesObj="data.salesObj"></upServiceSalesPage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import upServiceSalesPage from './components/upServiceSalesPage.vue'

interface Data {
    salesObj:string,
}
const data = reactive<Data>({
    salesObj: ''
})


onLoad((option:any) => {
    data.salesObj = option.salesObj
})

</script>

<style lang="scss" scoped>

</style>


