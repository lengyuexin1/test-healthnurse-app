<template>
    <view class="container">
        <InnerDetailPage :id="data.id" :pageTitle="data.pageTitle" :templateId="data.templateId" :parentId="440100"></InnerDetailPage>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import InnerDetailPage from './components/InnerDetailPage.vue'
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    id: string,
    templateId: number,
    pageTitle: string,
}

const data = reactive<Data>({
    id: '',
    templateId: null,
    pageTitle: ''
})

onLoad((option: any) => {
    data.id = option.id
    data.templateId = option.templateId
    data.pageTitle = option.pageTitle
})

onMounted(() => {

})


</script>

<style lang="scss" scoped>

</style>
<style>
page {
    background-color: #fff;
}
</style>
