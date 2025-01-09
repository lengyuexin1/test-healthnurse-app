<template>
    <z-paging
        ref="paging"
        v-model="data.dataLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <!-- 待评价 -->
        <WaitComment v-for="(item, index) in data.dataLists" :key="index" :item="item" @clickToComment="clickToComment"></WaitComment>

    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import WaitComment from './components/waitComment.vue'
import BCNotify from '@/components/notify/index.vue'
import { waiCommentList } from '@/api/user-api'
import { gotoComment, gotoCommentGoods } from '@/routes/user-routes'

interface Data {
    dataLists: any
    nextCursor: any
}

const data = reactive<Data>({
    dataLists: [],
    nextCursor: null
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    // 游标
    pageNumber == 1 && (data.nextCursor = null)

    waiCommentList({
        size: 10,
        cursor: data.nextCursor,
        query: {
            statusId: -3,
            kinds: [2, 3]
        }
    }).then((res: any) => {
        paging.value.complete(res.list)
        res.list.length && (data.nextCursor = res.nextCursor)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const clickToComment = (kind: number, id: string) => {
    kind == 3 && gotoComment({ id: id })
    kind == 2 && gotoCommentGoods({ id: id })
}

onLoad((option) => {
    
})

</script>

<style lang="scss" scoped>

</style>
