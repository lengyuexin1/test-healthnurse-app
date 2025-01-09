<template>
    <view class="container">
        <waitingSalesPage :id="data.id" :status="data.status"></waitingSalesPage>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import waitingSalesPage from './components/waitingSalesPage.vue'


interface Data {
    id:string,
    status:number,

}
const data = reactive<Data>({
    id:'',
    status:2,
})


onLoad((option:any)=>{
    data.id = option.id
    data.status = option.status
})

</script>

<style lang="scss" scoped>

</style>


