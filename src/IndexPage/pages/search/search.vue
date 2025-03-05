<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto="false" :fixed="true" @query="queryList"
            :defaultPageSize="10" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <view id="pageTop">
                    <PageTopbg bgstyle="background: #fff;" :zIndex="-1"></PageTopbg>
                    <bc-page-navbar :title="'搜索'"></bc-page-navbar>
                </view>
                <view class="search_btn_box">
                    <view class="search_bg">
                        <TnInput v-model="data.inputValue" @change="changeInp" :placeholder="data.searchText" size="sm"
                            :border="false" height="70">
                            <template #prefix>
                                <TnIcon name="search" size="34" color="#A8A8A8" />
                            </template>
                            <template #suffix>
                                <view class="inp_right_icon" @click="delinp">
                                    <TnIcon name="close" size="34" color="#A8A8A8" />
                                </view>
                            </template>
                        </TnInput>
                    </view>
                    <view class="search_text" @click="toSearchBtn">搜索</view>
                </view>
                <view class="searchNav_box" v-if="data.searchIndex == 2">
                    <TnTabs v-model="data.currentTabIndex" :scroll="false" bar-color="#EA3E1A" font-size="28rpx"
                        active-color="#333333" color="#999999">
                        <TnTabsItem v-for="(item, index) in data.searchTopNav" :key="index" :title="item.name"
                            @click="changeTabs(item)" />
                    </TnTabs>
                </view>

            </template>
            <view class="search_content" :style="'background:' + ((data.searchIndex == 1) ? '#fff' : '#F3F4F6') + ';'">
                <view class="happylike_List" v-if="data.showHappylikeBox">
                    <view class="happylike_scrool">
                        <view class="happylike_item" v-for="(item, index) in data.happylikeList" :key="index"
                            @click="getHappyLikeSearch(item)">
                            <view class="happylike_left">
                                <TnIcon name="search" size="28" color="#C2C2C2" />
                                <view v-html="item.name" class="happylike_name"></view>
                            </view>
                            <TnIcon name="right-arrow" size="28" color="#C2C2C2" />
                        </view>
                    </view>
                </view>

                <template v-if="data.searchIndex == 1">
                    <view class="tag_list" v-if="data.showtag">
                        <view class="tag_list_top">
                            <view class="tag_list_title">历史记录</view>
                            <image class="del_icon" :src="getAssetsUrl('/leyou/icon/del_icon.svg')" mode="scaleToFill"
                                @click="deltag" />
                        </view>
                        <view class="tag_list_box history_box">
                            <view class="tag_item history_item" :class="{ 'history_item_active': index % 2 === 1 }"
                                v-for="(item, index) in data.history" :key="item.id" @click="searchinp(item)">
                                <image v-if="item.ishot == 1" class="tag_img"
                                    :src="getAssetsUrl('/leyou/icon/hot_icon.svg')" mode="scaleToFill" />
                                {{ item.name }}
                            </view>
                        </view>
                    </view>

                    <view class="tag_list">
                        <view class="tag_list_top">
                            <view class="tag_list_title">猜你想搜</view>
                            <view></view>
                        </view>
                        <view class="tag_list_box">
                            <view class="tag_item" v-for="(item, index) in data.recommend" :key="index"
                                @click="toclassifyPage(item)">
                                <image v-if="index == 1 || index == 0" class="tag_img"
                                    :src="getAssetsUrl('/leyou/icon/hot_icon.svg')" mode="scaleToFill" />
                                {{ item.name }}
                            </view>
                        </view>
                    </view>
                </template>
                <template v-if="data.searchIndex == 2">
                    <view class="WaterfallsFlow_list">
                        <!-- <WaterfallsFlow :wfList="data.dataList" @waterItem="clickwaterItem"></WaterfallsFlow>-->
                        <serchItem :list="data.dataList"></serchItem>
                    </view>

                </template>

            </view>



        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import serchItem from "./components/searchItem.vue"
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

import WaterfallsFlow from './components/WaterfallsFlow.vue'
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoServiceStore, toInnerPage, gotoserviceLnnerPage } from '@/routes/service-routes'
import { gotoarticledetails, gotocourseVideo, gotovideoPreview } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"

import { happylike, happysearch, featuredList } from '@/api/user-api'
import { PlatformManage } from '@bc/sys'
import { getFactoryDict } from "@/libs/factory"

const tabList = [
    { sourceType: null, name: '综合', type: null, businessTypeIds: [1, 2, 3, 4, 5] },
    { sourceType: 1, name: '服务', type: null, businessTypeIds: null },
    { sourceType: 2, name: '商品', type: null, businessTypeIds: null },
    { sourceType: 3, name: '店铺', type: null, businessTypeIds: null },
    { sourceType: 4, name: '文章', type: [1, 3], businessTypeIds: [98] },
    { sourceType: 4, name: '视频', type: [2], businessTypeIds: [5] }
]
interface Data {
    inputValue: string,
    history: any,
    recommend: any,
    showtag: boolean,
    searchIndex: number,
    dataList: any,
    showHappylikeBox: boolean,
    happylikeList: any,
    pageNumber: number,
    pageSize: number,
    searchList: any,
    searchTopNav: any,
    searchTopNavId: number,
    currentTabIndex: number,
    searchText: string,
    handleRecovery: boolean
}
const data = reactive<Data>({
    inputValue: '',
    history: [],
    recommend: [],
    showtag: true,
    searchIndex: 1,
    dataList: [],
    showHappylikeBox: false,
    happylikeList: [],
    pageNumber: 1,
    pageSize: 10,
    searchList: [],
    searchTopNav: [
        // { id: 999, name: '综合' },
        // { id: 2, name: '适品' },
        // { id: 3, name: '康养' },
        // { id: 98, name: '内容' },
        // { id: 6, name: '云课堂' }

    ],
    searchTopNavId: 999,
    currentTabIndex: 0,
    searchText: '',
    handleRecovery: true // 是否显示回收站
})

onMounted(() => {
    const datas = {
        pageSize: 10,
        pageNumber: 1,
        query: {}
    }
    featuredList(datas).then((res: any) => {
        data.recommend = res.data.filter((item: any) => {
            return (item.id != '88' && item.id != '89')
        })
    })
    data.history = uni.getStorageSync('userHistory')

    if (!data.history.length) {
        data.showtag = false
    }

    // #ifdef APP-PLUS
    // 上架华为 隐藏频道数据
    getFactoryDict().then((res) => {
        if (!res.isShowChannel) {
            tabList.splice(3)
            tabList[0].businessTypeIds = [1, 2, 3]
        }
        data.handleRecovery = res.handleRecovery
    }).finally(() => {
        data.searchTopNav = tabList
    })
    // #endif

    // #ifndef APP-PLUS
    data.searchTopNav = tabList
    console.log('data.searchTopNav', data.searchTopNav)

    // #endif

})

onLoad((option: any) => {
    data.inputValue = option.searchText ? option.searchText : ''
    data.searchText = option.searchText ? option.searchText : ''
    if (option.tosearch == 1) {
        toSearchBtn()
    }
})

const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {
    data.pageNumber = pageNumber
    data.pageSize = pageSize
    toSearch()
}


const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})


const searchinp = (item: any) => {
    data.inputValue = item.name
    changeInp()
}

const toclassifyPage = (item: any) => {
    console.log('跳转分类页面', item)

    if (item.id == '90') {
        gotoserviceLnnerPage({ id: 88 })
        return
    }
    toInnerPage({ id: item.id, pageTitle: item.name })

}

// 输入框内容变化获取模糊查询结果
const changeInp = () => {
    happylike({
        name: data.inputValue,
        businessTypeIds: [2, 3, 5]
    }).then((res: any) => {
        if (res.length > 0) {
            data.showHappylikeBox = true
            data.happylikeList = res.map((x: any) => ({
                name: `<p>${x.name}</p>`,
                content: x.name.replace(/<\/?[^>]+(>|$)/g, '')
            }))
        }
        else {
            data.showHappylikeBox = false
            data.happylikeList = []
        }


    })
}

const toSearchBtn = () => {

    if (!data.inputValue) {
        data.inputValue = data.searchText
    }

    const Arr = data.history

    Arr.unshift({
        name: data.inputValue
    })

    if (Arr.length > 3) {
        Arr.splice(Arr.length - 1, 1)
    }

    console.log('Arr', Arr)
    console.log('开始搜索', data.inputValue)


    uni.setStorageSync('userHistory', Arr)

    data.history = uni.getStorageSync('userHistory')

    data.searchIndex = 2
    toSearch()
}

const getHappyLikeSearch = (item: any) => {
    console.log('item', item)
    data.inputValue = item.content
    data.searchIndex = 2
    toSearch()
}

const toSearch = () => {

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        happysearch({
            pageSize: data.pageSize,
            pageNumber: data.pageNumber,
            query: {
                name: data.inputValue,
                sourceType: data.searchTopNav[data.currentTabIndex].sourceType,
                typeIds: data.searchTopNav[data.currentTabIndex].type,
                businessType: null,
                businessTypeIds: data.searchTopNav[data.currentTabIndex].businessTypeIds
            }
        }, isRequireLogin).then((res: any) => {
            console.log(res.data);

            (paging.value as any).complete(res.data)
            data.showHappylikeBox = false
            data.happylikeList = []
            data.searchList = res.data


            console.log('data.dataList', data.dataList)
            console.log('data.searchIndex', data.searchIndex)


        })


    })


}

const changeTabs = (item: any) => {
    console.log('类型切换', item)
    data.searchTopNavId = item.sourceType;
    (paging.value as any).reload()

}

const clickwaterItem = (item: any) => {
    console.log(item)

    item.businessType == 2 && gotogoodsDetail(item.id)
    item.businessType == 1 && gotoServiceStore({ shopId: item.id, isAd: 0 });
    (item.businessType == 98 && item.type && item.type != 2) && gotoarticledetails({ id: item.id });
    (item.businessType == 98 && item.type && item.type == 2) && gotovideoPreview({ videoId: item.id, videoPagetype: 0 })
    // (item.businessType == 5 && !item.type && item.sourceType == 3) && gotoauthor({isuser: 0, accountId: item.id, isFans: 0})

    if (item.businessType == 6) {
        const listId = TempStorage.savewx({
            videoIdlist: [item.id]
        })
        gotocourseVideo(listId)

    }
}

const test = () => {
    console.log('机构商家')
}

const delinp = () => {
    data.inputValue = ''
    data.showHappylikeBox = false
    data.happylikeList = []
    data.searchIndex = 1
}

const deltag = () => {

    data.showtag = false
    uni.setStorageSync('userHistory', [])


}

</script>

<style lang="scss" scoped>
.search_btn_box {
    padding: 12rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    border-bottom: 2rpx solid #F3F4F6;
    box-sizing: border-box;

    .search_bg {
        width: 85%;
        background: #F5F7F9;
        border-radius: 40rpx;
    }

    .inp_right_icon {
        padding-right: 14rpx;
        box-sizing: border-box;
    }

    .search_text {
        color: #29c86f;
        font-size: 32rpx;
        font-weight: 500;
    }
}

.search_content {
    position: relative;
    background: #fff;

    .happylike_List {
        position: absolute;
        width: 100%;
        max-height: 780rpx;
        overflow-y: scroll;
        background: #fff;
        z-index: 10;

        .happylike_scrool {
            .happylike_item {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: space-between;
                padding: 24rpx 30rpx;
                box-sizing: border-box;
                border-bottom: 2rpx solid #F3F4F6;

                .happylike_left {
                    display: flex;
                    align-items: center;

                    .happylike_name {
                        width: 600rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-left: 10rpx;
                    }
                }
            }
        }

    }

    .tag_list {
        padding: 30rpx;
        box-sizing: border-box;
        margin: 40rpx 0rpx;
        margin-top: 0rpx;

        .tag_list_top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;

            .tag_list_title {
                font-size: 32rpx;
                font-weight: 600;
                color: #333333;
            }

            .del_icon {
                width: 50rpx;
                height: 50rpx;
            }
        }

        .history_box {
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;

            .history_item {
                width: 45%;
                background-color: #fff !important;
                border-radius: unset !important;


            }

            .history_item_active {
                background-color: #fff !important;
                border-radius: unset !important;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    top: 15%;
                    left: 0;
                    width: 2rpx;
                    height: 75%;
                    background-color: rgb(165, 167, 170, 0.5);
                }
            }
        }

        .tag_list_box {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .tag_item {
                padding: 10rpx 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                background: #F5F7F9;
                border-radius: 28rpx;
                margin-right: 20rpx;
                font-size: 26rpx;
                color: #666666;
                font-weight: 400;
                margin-bottom: 20rpx;

                .tag_img {
                    width: 28rpx;
                    height: 28rpx;
                    margin-right: 10rpx;
                }
            }
        }
    }
}

.searchNav_box {
    margin-bottom: 10rpx;

    .WaterfallsFlow_list {}
}
</style>

<style>
page {
    background: #F3F4F6;
}
</style>
