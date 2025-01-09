<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        @scrollTopChange="pageScroll"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="type_list" v-if="data.hideTab">
                <TnTabs 
                v-model="data.currentTabIndex" 
                :scroll="false" 
                :bottom-shadow="false" 
                bar-color="#EA3E1A" 
                active-color="#EA3E1A"
                color="#666666">  
                    <TnTabsItem 
                    v-for="(item, index) in data.typeList"
                    :key="index"
                    :title="item.name"
                    @click="changeTab(item)"
                    />
                </TnTabs>
            </view>
        </template>

        <view class="card_list">
            <LiveCard class="itemChat" v-for="(item, index) in data.dataList" :key="item.id" :item="item"></LiveCard>
        </view>
    </z-paging>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import LiveCard from './components/liveCard.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { liveLists } from '@/api/live-api'
import { categoryShow } from '@/api/service-api'

interface Data {
    dataList: any
    typeList: any
    currentTabIndex: number
    type: number
    sontabsData: any
    categoryIds: any
    activeCategory: number
    scrollTop: number
    hideTab: boolean,
    demo: any
}
const data = reactive<Data>({
    dataList: [],
    typeList: [
        { id:1, name:'推荐' },
        { id:6, name:'云课堂' },
        { id:8, name:'沙龙' },
        { id:5, name:'康养百科' }
    ],
    currentTabIndex: 0,
    type: 6,
    sontabsData: [],
    categoryIds: [],
    activeCategory: 0,
    scrollTop: 0,
    hideTab: true,
    demo: [
        { id: 0, tag: 'demo', name: '过年干货热卖', thumb: '/leyou/icon/demo1.gif', accountName: '郭政鸿', cntUser: 5, accountAvatar: '/leyou/icon/avatar1.jpg' },
        { id: 1, tag: 'demo', name: '古玩鉴宝', thumb: '/leyou/icon/demo2.gif', accountName: '瑞卓铭科', cntUser: 2, accountAvatar: '/leyou/icon/avatar2.jpg' },
        { id: 2, tag: 'demo', name: '不进来听听吗', thumb: '/leyou/icon/demo3.gif', accountName: '常远乐', cntUser: 10, accountAvatar: '/leyou/icon/avatar3.jpg' }
    ]
})

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onLoad((option) => {
    if (option?.type == 1) {
        data.type = 5
        data.currentTabIndex = 3
    }
    else if (option?.type == 2) {
        data.type = 6
        data.currentTabIndex = 1
    }
    else if (option?.type == 3) {
        data.type = 8
        data.currentTabIndex = 2
    }
})

onShow(() => {
    paging.value?.reload()
})

const queryList = (pageNumber:number, pageSize:number) => {
    liveLists({
        query:{
            categoryIds: data.categoryIds,
            businessType: data.type == 1 ? null : data.type
        },
        pageNumber,
        pageSize
    }).then((res:any)=>{
        paging.value?.complete([...res.data, ...data.demo])
    }).finally(() => {
        getCate()
    })
}

// 页面滚动
const pageScroll = (e: any) => {
    data.hideTab = e > 0 ? false : true
}

const changeTab = (item:any) => {
    data.type = item.id
    data.activeCategory = 0
    data.categoryIds = []
    paging.value?.reload()
}

const getCate = () => {
    let id = 7
    data.type == 6 && (id = 7)
    data.type == 5 && (id = 9)

    categoryShow({ id }).then((res:any)=>{
        data.sontabsData = [
            { id: '-1', name: '全部' },
            ...res,
            
        ]
    })
}
</script>
  
<style lang="scss" scoped>
.type_list{
    width: 100%;
    .type_item{
        padding: 10rpx 24rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #333333;
        border: 2rpx solid #E6E6E6;
        border-radius: 32rpx;
        &.is_type{
            color: #EA3E1A;
            border: 2rpx solid #EA3E1A;
        }
    }
}
.card_list{
    width: 100%;
    padding: 10rpx;
    display: flex;
    flex-wrap: wrap;

    .itemChat {
        width: calc(50% - 20rpx);
        margin: 10rpx;
    }

}
</style>
