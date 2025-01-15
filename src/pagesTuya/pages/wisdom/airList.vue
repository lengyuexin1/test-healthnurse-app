<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'选择空调品牌'"></bc-page-navbar>
        </template>
        <view class="contentBox">
            <view class="listItem" @click="quetBran(item)" v-for="(item, index) in allList">
                <view>{{ item.brand_name }}</view>
                <TnIcon name="right"></TnIcon>
            </view>
        </view>
    </z-paging>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { airListPoor } from "@/api/room-api"
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { gotoAirIndex } from "@/routes/active-routes"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

const devId = ref('')
const allList: any = ref([])
onLoad((option: any) => {
    devId.value = option.id
    airListPoor(option.id).then((res: any) => {
        console.log(res);
        allList.value = res
    })
})

const quetBran = (item: any) => {
    gotoAirIndex(devId.value, item.brand_id)
}

</script>

<style scoped lang="scss">
page {
    background-color: #fff;
}

.contentBox {
    margin: 0 30rpx;


    .listItem {
        padding: 20rpx 0;
        border-bottom: 2rpx solid #F2F2F2;
        display: flex;
        justify-content: space-between;
    }

    .itemAc {}
}
</style>