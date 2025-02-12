<template>
    <view class="container">
        <serviceCommentPage :id="data.id" :shopId="data.shopId"></serviceCommentPage>
    </view>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import serviceCommentPage from './components/serviceCommentPage.vue'

import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id: string,
    shopId: string,
}

const data = reactive<Data>({
    id: '',
    shopId: ''
})

onMounted(() => {

})


onLoad((option: any) => {
    data.id = option.id
    data.shopId = option.shopId
})


</script>

<style lang="scss" scoped>

</style>

