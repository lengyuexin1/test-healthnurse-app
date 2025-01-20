<template>
    <view class="container">
        <z-paging ref="paging" :auto="true" v-model="dataList" @query="queryList" :defaultPageSize="10"
                  :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="暂无数据~"
                  :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <bc-page-navbar :title="'通知记录'"></bc-page-navbar>
            </template>
<!--            <u-safe-bottom slot="bottom"></u-safe-bottom>-->
            <view class="noticbox page-public-bg">
                <noticeView :dataList="dataList"/>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { getAssetsPic } from "@/common/setPicture"
import noticeView from "@/pagesTuya/pages/components/noticeView/noticeView.vue"
import { getLogList } from "@/api/room-api"
import dayjs from 'dayjs'
import { computed, ref } from "vue"

const dataList: any = ref([])
const getAssetsUrl = computed(() => {
    return (str: any) => {
        return getAssetsPic(str)
    }
})
const paging = ref()

const queryList = (pageNumber: any, pageSize: any) => {
    getLogList({
        pageNumber,
        pageSize,
        query: {}
    }).then(res => {
        paging.value.complete(res.data.map((x: any) => ({
            ...x,
            utcCreated: dayjs.unix(x.utcCreated).format("YYYY-MM-DD HH:mm:ss")
        })))
    }).catch(() => {
        paging.value.complete(false)
    })
}
</script>

<style lang="scss" scoped></style>
