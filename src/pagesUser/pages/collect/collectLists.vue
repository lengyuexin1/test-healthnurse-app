<template>
    <z-paging
        ref="paging"
        v-model="data.collectLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="true" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" @change="tabsChange">
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
            </TnTabs>
            <view class="nav_mangage tn-flex-row">
                <view class="section">
                    <view :class="['item', data.sectionActive == index ? 'active' : '']" v-for="(item, index) in data.sectionList" :key="index" @tap="clickSection(index)">{{ item }}</view>
                </view>
                <view :class="['edit tn-flex-center-end', data.isEdit ? 'navRed' : '']" @tap="clickManage" v-if="data.collectLists.length">
                    {{ data.subTitle }}
                </view>
            </view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel btnName="取消收藏" :type="data.type" :listType="data.listType" :list="data.collectLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="cancelCollect"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import SelectAllCancel from '@/pagesUser/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { favoriteList, unFavorite, healthFavoriteList, unHealthFavorite, healthShopList, unHealthShop } from '@/api/user-api'
import { chatfavoriteList } from '@/api/create-api'
import { gotocourseVideo, gotosalonPostsDetailPage, gotovideoPreview, gotoarticledetails } from "@/routes/create-routes"
import { gotoShopDetail, gotoServiceStore } from "@/routes/service-routes"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { TempStorage } from "@bc/base"

interface Data {
    collectLists: any
    sectionList: any
    salonSectionList: any
    healthSectionList: any
    subsectionValue: number
    subTitle: string
    isEdit: boolean
    key: string
    currentTabIndex : number
    tabsData: any
    happyType: number
    sectionActive: number
    type: string
    listType: string
}

const data = reactive<Data>({
    collectLists: [],
    sectionList: [],
    salonSectionList: ['收藏时间', '发布时间'],
    healthSectionList: ['适品', '店铺'],
    subsectionValue: 0,
    subTitle: '管理',
    isEdit: false,
    key: '',
    currentTabIndex: 0,
    tabsData: [
        { text: '云课堂' },
        { text: '沙龙' },
        { text: '康养囤' },
        { text: '作品' },
    ],
    happyType: 2,
    sectionActive: 0,
    type: 'normal',
    listType: 'collectList'
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if ([0, 1, 3].includes(data.currentTabIndex)) {
        favoriteList({
            pageSize: pageSize,
            pageNumber: pageNumber,
            query: {
                happyType: data.happyType
            },
            sorts: [{
                key: data.key,
                isAsc: false
            }]
        }).then((res: any) => {
            // 给每个对象添加checked属性
            const pack = res.data.map((item: any) => {
                return {
                    ...item,
                    checked: false
                }
            })
            data.type = 'normal'
            paging.value.complete(pack)  
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
        return
    }
    else {
        // 康养囤接口
        if (data.key == 'service' || data.key == 'product') {
            const applyId = 3
            healthFavoriteList({
                pageSize: pageSize,
                pageNumber: pageNumber,
                query: { applyId },
            }).then((res) => {
                // 给每个对象添加checked属性
                const pack = res.data.map((item: any) => {
                    return {
                        ...item,
                        checked: false
                    }
                })
                data.type = 'healthList'
                paging.value.complete(pack)   
            }).catch((err: any) => {
                bcNotify.value.error(err.message)
            })
        }
        else {
            // 康养店铺
            healthShopList({
                pageSize: pageSize,
                pageNumber: pageNumber,
                query: {},
            }).then((res) => {
                // 给每个对象添加checked属性
                const pack = res.data.map((item: any) => {
                    return {
                        ...item,
                        checked: false
                    }
                })
                data.type = 'shopList'
                paging.value.complete(pack)  
            }).catch((err: any) => {
                bcNotify.value.error(err.message)
            })
        }
    }
}

const tabsChange = (val: any) => {

    console.log('val',val);
    

    val == 0 && (data.happyType = 2)
    val == 1 && (data.happyType = 3)
    val == 2 && (data.happyType = 4)
    val == 3 && (data.happyType = 98)

    // if ([0, 1, 4, 5, 6].includes(val)) {

    if ([0, 1, 3].includes(val)) {
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if ([2].includes(val)) {
        data.key = 'service'
        data.sectionList = data.healthSectionList
    }
    else {
        data.sectionList = []
    }

    data.sectionActive = 0

    reload()
}

const clickSection = (index: number) => {
    // if ([0, 1, 3, 4, 5, 6].includes(data.currentTabIndex)) {
    if ([0, 1, 3].includes(data.currentTabIndex)) {
        index == 0 && (data.key = 'utcModified')
        index == 1 && (data.key = 'utcPublish')
    }
    else if ([2].includes(data.currentTabIndex)) {
        index == 0 && (data.key = 'product')
        index == 1 && (data.key = 'shop')
    }

    data.sectionActive = index
    reload()
}

const clickItem = (item: any) => {

    console.log('item',item);
    console.log('data.type',data.type);

    if (item.happyType == 98) {
        if (item.videoUrl) {
            gotovideoPreview({videoId:item.id,videoPagetype:0});
        }else {
            gotoarticledetails({ id: item.id })
        }
    }
    else if (item.happyType == 2) {
        const listId = TempStorage.savewx({
            videoIdlist:[item.id],
        })
        gotocourseVideo(listId)
    }
    else if (item.happyType == 3) {
        gotosalonPostsDetailPage({ id: item.id })
    }
    else if (data.type == 'healthList') {
        gotogoodsDetail(item.itemId)
    }
    else if (data.type == 'shopList') {
        item.shop.applyId == 18 && gotoShopDetail(item.shopId)
        item.shop.applyId == 19 && gotoServiceStore({ shopId: item.shop.id })
    }
}

const cancelCollect = (ids: any) => {
    if ([0, 1, 3].includes(data.currentTabIndex)) {
        unFavorite({ articleId: ids }).then((res) => {
            bcNotify.value.show('已取消收藏')
            reload()
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        if (['product'].includes(data.key)) {
            unHealthFavorite({ itemIds: ids }).then((res) => {
                bcNotify.value.show('已取消收藏')
                reload()
            }).catch((err) => {
                bcNotify.value.error(err.message)
            })
        }
        if (['shop'].includes(data.key)) {
            unHealthShop({ shopIds: ids }).then((res) => {
                bcNotify.value.show('已取消收藏')
                reload()
            }).catch((err) => {
                bcNotify.value.error(err.message)
            })
        }
    }
}

const clickManage = () => {
    data.isEdit = !data.isEdit
    data.subTitle = data.isEdit ? '取消管理' : '管理'
}

const reload = () => {
    data.isEdit = false
    data.subTitle = '管理'
    paging.value.reload()
}

onLoad((option) => {
    if (option?.type == 'course') {
        data.currentTabIndex = 0
        data.happyType = 2
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if (option?.type == 'salon') {
        data.currentTabIndex = 1
        data.happyType = 3
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if (option?.type == 'health') {
        data.currentTabIndex = 2
        data.happyType = 4
        data.key = 'product'
        data.sectionList = data.healthSectionList
    }
    else if (option?.type == 'channel') {
        data.currentTabIndex = 3
        data.happyType = 98
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if (option?.type == 'chat') {
        data.currentTabIndex = 3
        data.happyType = 98
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if (option?.type == 'find') {
        data.currentTabIndex = 3
        data.happyType = 98
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
    else if (option?.type == 'video') {
        data.currentTabIndex = 3
        data.happyType = 98
        data.key = 'utcModified'
        data.sectionList = data.salonSectionList
    }
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
</style>
