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
            <view class="nav_mangage tn-flex-row" v-if="data.draftLists.length">
                <view class="section">
                    <!-- <view :class="['item', data.sectionActive == index ? 'active' : '']" v-for="(item, index) in data.sectionList" :key="index" @tap="clickSection(index)">{{ item }}</view> -->
                </view>
                <view :class="['edit tn-flex-center-end', data.isEdit ? 'navRed' : '']" @tap="clickManage">
                    {{ data.subTitle }}
                </view>
            </view>
        </template>

        <view class="container">
            <SelectAllCancel btnName="删除" type="draftList" :list="data.draftLists" :isEdit="data.isEdit"
                             @clickItem="clickItem" @clickBtn="del"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>

    <TnPopup v-model="data.showdelBox">
        <view class="del_box">
            <view class="del_box_top">确认删除吗?</view>
            <view class="del_box_bottom">
                <view class="btn cancel" @click="data.showdelBox = false">取消</view>
                <view class="btn confirm" @click="isdel">删除</view>
            </view>
        </view>
    </TnPopup>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'

import SelectAllCancel from '@/pagesCnt/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { myContentList, delMyContentList, getnewDraftList, delnewContent } from '@/api/create-api'
import { gotouparticle, gotoNewUpcontentPage } from '@/routes/create-routes'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

interface Data {
    draftLists: any
    sectionList: any
    subsectionValue: number
    subTitle: string
    isEdit: boolean
    currentTabIndex: number
    sectionActive: number
    type: string
    showdelBox: boolean
    ids: any
}

const data = reactive<Data>({
    draftLists: [],
    sectionList: [],
    subsectionValue: 0,
    subTitle: '管理',
    isEdit: false,
    currentTabIndex: 0,
    sectionActive: 0,
    type: '',
    showdelBox: false,
    ids: []

})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    // myContentList({
    getnewDraftList({
        query: {
            // status: 1 // 草稿
            title: '' // 草稿
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
    // gotouparticle({
    //     articleId: item.articleId,
    //     type: item.type,
    //     ischange: 1,
    // })
    console.log(item)
    gotoNewUpcontentPage({ type: item.type, articleId: item.articleId, isDratType: 1, id: item.id })
}

const del = (ids: any) => {
    console.log(ids)
    data.ids = ids
    data.showdelBox = true
}

const isdel = () => {
    // delMyContentList({ articleIds: data.ids }).then(() => {
    delnewContent({ ids: data.ids }).then(() => {
        bcNotify.value.show('删除成功')
        reload()
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const reload = () => {
    data.showdelBox = false
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

.del_box {
    width: 500rpx;
    background: #FFFFFF;
    border-radius: 24rpx;

    .del_box_top {
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 24rpx;
        padding: 40rpx;
        box-sizing: border-box;
    }

    .del_box_bottom {
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 2rpx solid #E3E3E3;

        .btn {
            width: 50%;
            height: 80rpx;
            text-align: center;
            line-height: 80rpx;
            font-size: 28rpx;

            &.cancel {
                color: #666666;
                border-right: 2rpx solid #E3E3E3;
            }

            &.confirm {
                color: #EA3E1A;
            }
        }
    }
}

</style>
