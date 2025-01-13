<template>
    <view class="container">
        <minutesDetailPage :id="data.id"></minutesDetailPage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import minutesDetailPage from './components/minutesDetailPage.vue'

interface Data {
    id:string
}
const data = reactive<Data>({
    id:''
})


onLoad((option)=>{
    data.id = option!.id
})

</script>

<style lang="scss" scoped>

</style>


