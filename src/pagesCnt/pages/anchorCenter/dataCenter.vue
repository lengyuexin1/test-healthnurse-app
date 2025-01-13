<template>
    <z-paging 
        ref="paging"
        :auto="false"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :hide-empty-view="true"
        :auto-show-system-loading="true"
        :loading-more-enabled="false"
        >
        <template #top>
            <view>
                <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="31rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A">
                    <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
                </TnTabs>
            </view>
        </template>

        <view>
            <template v-if="data.currentTabIndex == 0 && data.liveInfo.id">
                <OverviewData ref="overviewDataRef" :liveInfo="data.liveInfo"></OverviewData>
            </template>

            <template v-else-if="data.currentTabIndex == 1 && data.liveInfo.id">
                <TodayData ref="todayDataRef" :liveInfo="data.liveInfo"></TodayData>
            </template>

            <template v-else-if="data.currentTabIndex == 2 && data.liveInfo.id">
                <FansData ref="fansDataRef" :liveInfo="data.liveInfo"></FansData>
            </template>
        </view>
            
        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import OverviewData from './compontents/overview-data.vue'
import TodayData from './compontents/today-data.vue'
import FansData from './compontents/fans-data.vue'
import BCNotify from '@/components/notify/index.vue'
import { liveInfo } from '@/api/live-api'

interface Data {
    liveInfo: any
    tabsData: any
    currentTabIndex: number
}

const data = reactive<Data>({
    liveInfo: {},
    tabsData: [
        { text: '数据总览' },
        { text: '今日数据' },
        { text: '粉丝数据' }
    ],
    currentTabIndex: 0
})

const bcNotify = ref()

const paging = ref()

const queryList = (pageNumber: number, pageSize: number) => {
    paging.value.complete([])
}

onMounted(() => {
    liveInfo().then((info) => {
        data.liveInfo = info
        paging.value.reload()
    })
})

</script>

<style lang="scss" scoped>

</style>
