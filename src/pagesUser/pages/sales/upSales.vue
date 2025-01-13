<template>
    <view class="container">
        <upSalesPage :salesObj="data.salesObj"></upSalesPage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import upSalesPage from './components/upSalesPage.vue'

interface Data {
    salesObj:string,
}
const data = reactive<Data>({
    salesObj:'',
})


onLoad((option:any)=>{
    data.salesObj = option.salesObj
})

</script>

<style lang="scss" scoped>

</style>


