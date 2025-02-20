<template>
    <view class="container">
        <InnerDetailPage :id="data.id" :pageTitle="data.pageTitle"></InnerDetailPage>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import InnerDetailPage from './components/InnerDetailPage.vue'
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id:string,
    pageTitle:string,
}
const data = reactive<Data>({
    id: '',
    pageTitle: ''
})

onLoad((option:any) => {
    data.id = option.id
    data.pageTitle = option.pageTitle
})

onMounted(() => {

})




</script>

<style lang="scss" scoped>

</style>
<style>
page{
    background-color: #fff;
}
</style>
