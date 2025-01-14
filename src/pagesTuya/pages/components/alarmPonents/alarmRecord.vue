<template>
    <view class="content">
        <z-paging ref="paging" :auto="true" v-model="dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <noticeView :dataList="dataList" />

            <!-- <u-safe-bottom slot="bottom"></u-safe-bottom> -->
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { getAssetsPic } from "@/common/setPicture"
import { getLogList } from "@/api/room-api"
import noticeView from "../noticeView/noticeView.vue"
import dayjs from "dayjs"
import { ref, reactive, computed } from "vue"

const dataList: any = ref([])
interface Props {
    deviceId: string
}
const paging = ref()
const props = defineProps<Props>()
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const queryList = (pageNumber, pageSize) => {
    getLogList({
        pageNumber,
        pageSize,
        query: {
            deviceId: props.deviceId
        }
    }).then(res => {
        paging.value.complete(res.data.map(x => ({ ...x, utcCreated: dayjs.unix(x.utcCreated).format("YYYY-MM-DD HH:mm:ss") })))
    }).catch(() => {
        paging.value.complete(false)
    })
}
</script>

<style lang="scss" scoped></style>
