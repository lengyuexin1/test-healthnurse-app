<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="30"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#333333">
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" @click="tabsChange(item.id)" />
            </TnTabs>
            <view class="nav_mangage tn-flex-row">
                <TnTabs v-model="data.sonCurrentTabIndex" :scroll="true" :bottom-shadow="false" font-size="28rpx" active-font-size="28rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A">
                    <TnTabsItem v-for="(item, index) in data.sonnavList" :key="index" :title="item.name" @click="sonTabsChange(item.id)" />
                </TnTabs>
            </view>
        </template>
        <SquareItem v-for="(item, index) in data.dataList" :key="index" :item="item" :sonNavid="data.sonNavid" @clickItem="clickItem(item)"></SquareItem>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import SquareItem from './components/squareItem.vue'
import { activityList, myActivityList } from '@/api/service-api'
import BCNotify from '@/components/notify/index.vue'
import { gotoActivityDetail } from '@/routes/create-routes'
import { categoryShow } from '@/api/service-api'
import { getsalonCategoryList } from '@/api/create-api'

interface Data {
    dataList: any
    subsectionValue: number
    currentTabIndex : number
    sonCurrentTabIndex: number
    tabsData: any
    sonnavList: any
    sonNavid: number | null
}

const data = reactive<Data>({
    dataList: [],
    subsectionValue: 0,
    currentTabIndex: 0,
    sonCurrentTabIndex: 0,
    tabsData: [
        { id: 0, text: '热门活动' },
        { id: 1, text: '我参与的' }
    ],
    sonnavList: [],
    sonNavid: 999,
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    data.currentTabIndex == 0 ? activityList({
        query: {
            platformType: 2, //（平台类型：1-保椿照护；2-保椿生活）
            categoryId: data.sonNavid == 999 ? null : data.sonNavid,
            isJoin: 0,
            articleType: null,
            accountType: 2,
        },
        pageNumber,
        pageSize
    }).then((res: any)=>{
        paging.value.complete(res.data)
    }) : myActivityList({
        query: {
            platformType: 2, //（平台类型：1-保椿照护；2-保椿生活）
            categoryId: data.sonNavid == 999 ? null : data.sonNavid,
            isJoin: 1,
            articleType: 3,
            accountType: 2,
        },
        pageNumber,
        pageSize
    }).then((res: any)=>{
        paging.value.complete(res.data)
    })
}

const tabsChange = (id: number) => {
    // data.sonCurrentTabIndex = 0
    data.currentTabIndex = id
    paging.value.reload()
}

const sonTabsChange = (id: number) => {
    data.sonNavid = id
    paging.value.reload()
}

const clickItem = (item: any) => {
    gotoActivityDetail({ id: item.id, topic: item.topic })
}

const contentSortList = () => {
    getsalonCategoryList({
        moduleType: 1
    }).then((res:any)=>{
        data.sonnavList = [
            { id: 999, name: '全部' },
            ...res[0].children,
        ]
    })
}

onLoad(() => {
    contentSortList()
})

onShow(()=>{
    paging.value.reload()
})

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.nav_mangage {
    background-color: #FFFFFF;
    border-top: 1rpx solid #F2F2F2;

    .edit {
        width: 150rpx;
        box-sizing: border-box;
    }
}

.pb90 {
    margin-bottom: 90rpx;
}

.navRed {
    color: #EA3E1A;
}
</style>
