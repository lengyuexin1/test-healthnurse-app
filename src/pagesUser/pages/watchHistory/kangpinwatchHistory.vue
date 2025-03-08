<template>
    <z-paging ref="paging" v-model="data.watchHistory" :auto="true" :fixed="true" @query="queryList"
        :defaultPageSize="20" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
        <template #top>
            <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx"
                active-font-size="31rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A"
                @change="tabsChange">
                <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
            </TnTabs>
            <view class="nav_mangage tn-flex-row" v-if="data.watchHistory.length">
                <view class="section">
                    <view :class="['item', data.sectionActive == index ? 'active' : '']"
                        v-for="(item, index) in data.sectionList" :key="index" @tap="clickSection(index)">{{ item }}
                    </view>
                </view>
                <view :class="['edit tn-flex-center-end', data.isEdit ? 'navRed' : '']" @tap="clickManage">
                    {{ data.subTitle }}
                </view>
            </view>
        </template>

        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel btnName="删除" :list="data.watchHistory" :type="data.type" :listType="data.listType"
                :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="cancelCollect"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import SelectAllCancel from '@/pagesUser/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import {
    browerHistoryList,
    delBrowerHistory,
    deleteView,
    delHealthWatchHistory,
    healthWatchHistory,
    viewList
} from '@/api/user-api'
import { delLiveWatchHistory, liveWatchHistory } from '@/api/live-api'
import { gotoServiceStore, gotoShopDetail } from "@/routes/service-routes"
import { gotoarticledetails, gotocourseVideo, gotosalonPostsDetailPage, gotovideoPreview } from "@/routes/create-routes"
import { TempStorage } from "@bc/base"
import { gotogoodsDetail } from '@/routes/goods-routes'
import { PlatformManage } from '@bc/sys'
interface Data {
    /** 浏览历史列表 */
    watchHistory: any
    subTitle: string
    isEdit: boolean
    sectionList: any
    healthSectionList: any
    currentTabIndex: number
    tabsData: any
    happyType: number
    sectionActive: number
    type: string
    listType: string
}

const data = reactive<Data>({
    watchHistory: [],
    subTitle: '管理',
    isEdit: false,
    sectionList: [],
    healthSectionList: ['适品', '店铺'],
    currentTabIndex: 0,
    tabsData: [
        // { text: '云课堂' },
        // { text: '沙龙' },
        // { text: '康养囤' },
        // { text: '作品' },
        // { text: '直播' },
        { text: '适品' },
        { text: '店铺' }
    ],
    happyType: 2,
    sectionActive: 0,
    type: '',
    listType: 'watchList'
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if ([0, 1, 3].includes(data.currentTabIndex)) {
        viewList({
            pageSize: pageSize,
            pageNumber: pageNumber,
            query: {
                happyType: data.happyType
            }
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
    }
    else if ([4].includes(data.currentTabIndex)) {
        liveWatchHistory({
            pageNumber,
            pageSize,
            query: {}
        }).then((res: any) => {
            // 给每个对象添加checked属性
            const pack = res.data.map((item: any) => {
                return {
                    ...item,
                    checked: false
                }
            })
            data.type = 'liveList'
            paging.value.complete(pack)
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        if (data.sectionActive == 0) {
            // 适品
            browerHistoryList({
                pageSize: pageSize,
                pageNumber: pageNumber,
                query: {}
            }).then((res: any) => {
                // 给每个对象添加checked属性
                const pack = res.data.map((item: any) => {
                    return {
                        ...item,
                        checked: false
                    }
                })
                data.type = 'healthList'
                console.log(pack)
                const newArr = pack.filter((item: any) => {
                    console.log(item)

                    return item.item
                })

                paging.value.complete(newArr)
            }).catch((err: any) => {
                bcNotify.value.error(err.message)
            })
        }
        else if (data.sectionActive == 1) {
            // 店铺
            healthWatchHistory({
                pageSize: pageSize,
                pageNumber: pageNumber,
                query: {
                    applyId: ''
                }
            }).then((res: any) => {
                // 给每个对象添加checked属性,并重组数据结构
                const pack = res.data.map((item: any) => {
                    //防止item.categoryNames是nul
                    const firstCategoryName = Array.isArray(item.categoryNames) && item.categoryNames.length > 0 ? item.categoryNames[0] : null

                    return {
                        shop: {
                            thumb: item.shopThumb,
                            name: item.shopName,
                            categoriesName: firstCategoryName,
                            districtName: item.districtName,
                            score: item.score
                        },
                        extend: {
                            minPrice: item.minPrice,
                            commentCnt: item.commentCnt
                        },
                        id: item.id,
                        applyId: item.applyId,
                        shopId: item.shopId,
                        rate: item.score,
                        categoryNames: item.categoryNames,
                        checked: false
                    }
                })
                data.type = 'shopList'
                paging.value.complete(pack)
            })
        }
    }
}

const tabsChange = (val: any) => {
    val == 0 && (data.happyType = 2)
    val == 1 && (data.happyType = 3)
    val == 2 && (data.happyType = 5)
    val == 3 && (data.happyType = 98)

    if ([2].includes(val)) {
        data.sectionList = data.healthSectionList
    }
    else {
        data.sectionList = []
    }

    data.isEdit = false
    data.subTitle = '管理'
    paging.value.reload()
}

const clickSection = (index: number) => {
    data.sectionActive = index
    reload()
}

const clickItem = (item: any) => {
    if (item.happyType == 98) {
        if (item.type == 2) {
            gotovideoPreview({ videoId: item.id, videoPagetype: 0 })
        }
        else {
            gotoarticledetails({ id: item.id })
        }
    }

    if (item.happyType == 2) {
        const listId = TempStorage.savewx({
            videoIdlist: [item.id]
        })
        gotocourseVideo(listId)
    }
    else if (item.happyType == 3) {
        gotosalonPostsDetailPage({ id: item.id })
    }
    else if (data.type == 'healthList') {
        item.applyId == 18 && gotogoodsDetail(item.itemId)
    }
    else if (data.type == 'shopList') {
        item.applyId == 18 && gotoShopDetail(item.shopId)
        item.applyId == 19 && gotoServiceStore({ shopId: item.shopId })
    }
    else if (data.type == 'liveList') {
        // // #ifdef APP-PLUS
        // gotoLiveShow({
        //     id: item.id,
        //     frontCamera: {},
        //     beatySetting: JSON.stringify({})
        // })
        // // #endif

        // // #ifdef MP-WEIXIN
        // gotowxLive({
        //     id: item.id,
        // })
        // // #endif
    }
}

const cancelCollect = (ids: any, isAll: boolean) => {
    if ([0, 1, 3].includes(data.currentTabIndex)) {
        deleteView({ ids }).then(() => {
            bcNotify.value.show('删除成功')
            reload()
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else if ([4].includes(data.currentTabIndex)) {
        delLiveWatchHistory({ ids }).then(() => {
            bcNotify.value.show('删除成功')
            reload()
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        if (data.sectionActive == 0) {
            delBrowerHistory({ ids, isAll: isAll ? 1 : 0 }).then(() => {
                bcNotify.value.show('删除成功')
                reload()
            }).catch((err: any) => {
                bcNotify.value.error(err.message)
            })
        }
        else if (data.sectionActive == 1) {
            delHealthWatchHistory({ ids, isAll: isAll ? 1 : 0 }).then(() => {
                bcNotify.value.show('删除成功')
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
    }
    else if (option?.type == 'salon') {
        data.currentTabIndex = 1
        data.happyType = 3
    }
    else if (option?.type == 'health') {
        data.sectionList = data.healthSectionList
        data.currentTabIndex = 2
        // data.happyType = 4
    }
})

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.nav_mangage {
    color: #333333;
    display: flex;
    justify-content: flex-end;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
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
