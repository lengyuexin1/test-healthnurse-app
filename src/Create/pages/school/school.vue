<template>
    <z-paging
        ref="paging"
        v-model="data.schoolLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" >
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.name" @click="tabsChange(item)" />
            </TnTabs>
        </template>

        <SchoolItem v-for="(item, index) in data.schoolLists" :key="index" :item="item" @clickItem="clickItem"></SchoolItem>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import SchoolItem from './components/schoolItem.vue'
import { schoolRecList, schoolList, createSchoolTag } from '@/api/create-api'
import { gotoSchoolArticleDetail } from '@/routes/create-routes'
import BCNotify from '@/components/notify/index.vue'

interface Data {
    schoolLists: any
    currentTabIndex : number
    tabsData: any,
    categoryId: number
}

const data = reactive<Data>({
    schoolLists: [],
    currentTabIndex: 0,
    tabsData: [],
    categoryId: 28
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if (pageNumber == 1) {
        createSchoolTag({
            pid: 28
        }).then((res: any) => {
            data.tabsData = [
                { id: 28, name: '推荐' },
                ...res
            ]
        }).catch((err: any) => {
            bcNotify.value.error((err.message))
        })
    }
    if (data.currentTabIndex == 0) {
        schoolRecList({
            query: {
                categoryId: data.categoryId == 999 ? null : data.categoryId
            },
            pageNumber,
            pageSize
        }).then((res: any) => {
            paging.value.complete(res.data)
        }).catch((err: any) => {
            bcNotify.value.error((err.message))
        })
    }
    else {
        schoolList({
            query: {
                categoryId: data.categoryId == 999 ? null : data.categoryId
            },
            pageNumber,
            pageSize
        }).then((res: any) => {
            paging.value.complete(res.data)
        }).catch((err: any) => {
            bcNotify.value.error((err.message))
        })
    }
}

const tabsChange = (val: any) => {
    console.log('val',val);
    data.categoryId = val.id
    reload()
}

const clickItem = (id: string) => {
    gotoSchoolArticleDetail({ id })
}

const reload = () => {
    paging.value.reload()
}

</script>

<style lang="scss" scoped>

</style>
