<template>
    <view class="container">
        <salesDetailPage :id="data.id"></salesDetailPage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import salesDetailPage from './components/salesDetailPage.vue'

interface Data {
    id:string
}
const data = reactive<Data>({
    id:''
})


onLoad((option)=>{
    data.id = option!.id
    console.log(data.id);
})

</script>

<style lang="scss" scoped>

</style>


