<template>
    <z-paging
        ref="paging"
        v-model="data.draftLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <pageTopbg :zIndex="-1" :bgstyle="'background:#fff'" :addheight="90"></pageTopbg>
            <bc-page-navbar :title="'草稿'"></bc-page-navbar>

            <!-- data.draftLists.length -->
            <view class="nav_mangage tn-flex-row" v-if="false">
                <view class="section">
                    <!-- <view :class="['item', data.sectionActive == index ? 'active' : '']" v-for="(item, index) in data.sectionList" :key="index" @tap="clickSection(index)">{{ item }}</view> -->
                </view>
                <view :class="['edit tn-flex-center-end', data.isEdit ? 'navRed' : '']" @tap="clickManage">
                    {{ data.subTitle }}
                </view>
            </view>
        </template>
        
        <view class="container">
            <SelectAllCancel btnName="删除" type="ChatdraftList" :list="data.draftLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="del"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import SelectAllCancel from '@/User/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { chatDraftList, delMyContentList } from '@/api/create-api'
import { upChatPage } from '@/routes/create-routes'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'

interface Data {
    draftLists: any
    sectionList: any
    subsectionValue: number
    subTitle: string
    isEdit: boolean
    currentTabIndex : number
    sectionActive: number
    type: string
}

const data = reactive<Data>({
    draftLists: [],
    sectionList: [],
    subsectionValue: 0,
    subTitle: '管理',
    isEdit: false,
    currentTabIndex: 0,
    sectionActive: 0,
    type: ''
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    chatDraftList({
        query: {
            title: '' 
        },
        pageNumber,
        pageSize
    }).then((res: any) => {
        paging.value.complete(res.data)
    })
}

const clickManage = () => {
    data.isEdit = !data.isEdit
    data.subTitle = data.isEdit ? '取消管理' : '管理'
}

const clickItem = (item: any) => {
    upChatPage({
        auditId: item.id,
        type: item.type,
        ischange: 1, 
    })
}

const del = (ids: any) => {
    delMyContentList({ articleIds: ids }).then(() => {
        bcNotify.value.show('删除成功')
        reload()
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const reload = () => {
    data.isEdit = false
    data.subTitle = '管理'
    paging.value.reload()
}

onShow(() => {
    paging.value?.reload()
})

onLoad((option) => {
    
})

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.nav_mangage {
    padding: 20rpx 30rpx;

    .section {
        flex: 1;
        display: flex;

        .item {
            color: #666666;
            padding: 12rpx 24rpx;
            margin-right: 30rpx;
            border-radius: 32rpx;
            font-size: 24rpx;
            background-color: #FFFFFF;
            border: solid 1rpx #F2F2F2;
        }

        .active {
            color: #EA3E1A;
            border: solid 1rpx #EA3E1A;
        }
    }

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

.container{
    padding-top: 50rpx;
    box-sizing: border-box;
}
</style>
<style>
page{
    background: #F8F8F8;
}
</style>