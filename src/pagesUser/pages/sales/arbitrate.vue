<template>
    <view class="container">
        <arbitratePage :id="data.id"></arbitratePage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import arbitratePage from './components/arbitratePage.vue'

interface Data {
    id:string,
}
const data = reactive<Data>({
    id:'',
})


onLoad((option:any)=>{
    data.id = option.id
})

</script>

<style lang="scss" scoped>

</style>


