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
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" @change="tabsChange">
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
            </TnTabs>
        </template>
        
        <!-- 待评价 -->
        <template v-if="data.currentTabIndex == 0">
            <WaitComment v-for="(item, index) in data.dataLists" :taskId='data.taskId' :key="index" :item="item" @clickToComment="clickToComment"></WaitComment>
        </template>

        <!-- 已评价 -->
        <template v-else-if="data.currentTabIndex == 1">
            <AlreadyComment v-for="(item, index) in data.dataLists" :taskId='data.taskId' :key="index" :item="item" @delComment="delComment"></AlreadyComment>
        </template>
    </z-paging>

    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import WaitComment from './components/waitComment.vue'
import AlreadyComment from './components/alreadyComment.vue'
import BCNotify from '@/components/notify/index.vue'
import ImgUpload from '@/components/upload/img-upload.vue'
import { waiCommentList, myCommentList, deleteComment } from '@/api/user-api'
import { gotoComment, gotoCommentGoods } from '@/routes/user-routes'
import { PlatformManage } from '@bc/sys'

interface Data {
    dataLists: any
    currentTabIndex : number
    tabsData: any
    happyType: number
    taskId:string
    nextCursor: any
}

const data = reactive<Data>({
    dataLists: [],
    taskId:'',
    currentTabIndex: 0,
    tabsData: [
        { text: '待评价' },
        { text: '已评价' }
    ],
    happyType: 2,
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

    if (data.currentTabIndex == 0) {
        waiCommentList({
            size: 10,
            cursor: data.nextCursor,
            query: {
                statusId: -3,
                kinds: [2, 3]
            }
        }).then((res: any) => {
            // data.tabsData[0].text = `待评价${res.list.length > 0 ? '(' + res.list.length + ')' : ''}`
            paging.value.complete(res.list)
            res.list.length && (data.nextCursor = res.nextCursor)
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        PlatformManage.getToken().then((token) => {
            myCommentList({
                pageNumber,
                pageSize,
                query: {
                    userId: token.id,
                    list: [3, 13]
                }
            }).then((res) => {
                paging.value.complete(res.data)
            })
        }).catch((err: any) => {
            bcNotify.value.error(err.message)   
        })
    }
}

const tabsChange = (val: any) => {
    data.dataLists = []
    data.currentTabIndex = val
    paging.value.reload()
}

const delComment = (id: string) => {
    deleteComment({ id }).then(() => {
        bcNotify.value.error('删除成功')  
        paging.value.reload()
    }).catch((err) => {
        bcNotify.value.error(err.message)   
    })
}

const clickToComment = (kind: number, id: string) => {
    kind == 3 && gotoComment({ id: id,taskId:data.taskId })
    kind == 2 && gotoCommentGoods({ id: id,taskId:data.taskId})
}

onShow(() => {
    paging.value?.reload()
})

onLoad((option) => {
    data.taskId =option?.taskId||null
    if (option?.currentTabIndex) {
        data.currentTabIndex = Number(option?.currentTabIndex)
    }
})

</script>

<style lang="scss" scoped>

</style>
