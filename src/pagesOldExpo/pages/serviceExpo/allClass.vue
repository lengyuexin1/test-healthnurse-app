<template>
    <view class="container">
        <z-paging
              ref="paging"
              v-model="data.dataList"
              :auto="true"
              :fixed="true"
              @query="queryList"
              @scroll="pageScroll"
              :defaultPageSize="10"
              :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="还没有数据哦~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
              :auto-show-back-to-top="true"
              :loading-more-enabled="false"

        >
            <template #top>
                <!-- <pageTopbg :zIndex="-1" :bgstyle="'background: #F2F3F5;'"></pageTopbg> -->

                <!-- #ifdef MP-WEIXIN -->
                <PageTopbg bgstyle="background: #F2F3F5" :zIndex="-1" :addheight="100"></PageTopbg>
                <!-- #endif -->
                <!-- #ifdef APP || H5 -->
                <PageTopbg bgstyle="background: #F2F3F5" :zIndex="-1" :addheight="262"></PageTopbg>
                <!-- #endif -->


                <bc-page-navbar :title="data.title"></bc-page-navbar>

                <!-- #ifdef APP-PLUS -->
                <view class="placeholder"></view>
                <!-- #endif -->


            </template>

            <template #left>

                <view class="left_nva_box" v-if="data.categoryList.length > 0">
                    <view class="navItem" @click="changeNav(index)" :class="{ 'is_select': item.id == data.categoryList[data.categoryIndex].id }" v-for="(item, index) in data.categoryList" :key="item.id">
                        <view>
                            {{ item.name }}
                        </view>
                        <view class="select_box" v-if="item.id == data.categoryList[data.categoryIndex].id"></view>
                    </view>
                </view>

            </template>


            <view class="page_content">
                <template v-for="(item,index) in data.dataList" :key="item.categoryId">
                    <view class="boxItem" v-if="item" :id="'toView' + index">
                        <view class="item_title_box" @click="toClassItemPage(item)">
                            <view class="item_title">{{ item.categoryName }}</view>
                            <view>
                                <TnIcon name="right" color="#1B1B1B" size="24rpx"></TnIcon>
                            </view>
                        </view>
                        <view class="list_box">
                            <view class="item_box" @click="clickwaterItem(sonItem)"
                                  v-for="sonItem in item.categorySonList" :key="sonItem.id">
                                <image
                                      class="item_img"
                                      :src="sonItem.shopThumb"
                                      mode="aspectFill"
                                />
                                <view class="item_text">{{ sonItem.shopName }}</view>
                            </view>
                        </view>
                    </view>
                </template>
            </view>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import { getAssetsPic } from '@/common/setPicture'
import { healthContentList } from "@/api/create-api"

import BCNotify from '@/components/notify/index.vue'

import { productList, oldExpoCategory, oldExpolist } from '@/api/goods-api'
import { onLoad } from '@dcloudio/uni-app'
import { Debounce } from '@/libs/antivibthrot'

import {
    gotoShopDetail,
    gotoServiceStore,
    gotoClassItemPage
} from '@/routes/service-routes'

import WaterfallsFlow from '@/pagesOldExpo/pages/serviceExpo/components/WaterfallsFlow.vue'

interface Data {
    dataList: any
    categoryList: any
    categoryIndex: number
    pid: string
    title: string
}

const data = reactive<Data>({
    dataList: [],
    categoryList: [],
    categoryIndex: 0,
    pid: '',
    title: ''
})


const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onMounted(async () => {
})

onLoad((option: any) => {
    data.pid = option.pid
    data.title = option.title
})


const paging = ref(null)
const queryList = async (pageNumber: number, pageSize: number) => {

    oldExpoCategory({
        pageNumber: 1,
        pageSize: 20,
        query: {
            isPid: 0,
            pid: data.pid
        }
    }).then((res: any) => {
        data.categoryList = res.data

        if (data.categoryList.length == 0) {
            (paging.value as any).complete([])
            return
        }

        const arr = [] as any

        const promises = data.categoryList.map((item: any) => {
            return oldExpolist({
                pageNumber: 1,
                pageSize: 8,
                query: {
                    isRecommend: 0,
                    isFavorite: 0,
                    categoryId: item.id
                }
            }).then((resList: any) => {
                arr.push({
                    categoryId: item.id,
                    categoryName: item.name,
                    categorySonList: resList.data
                })
            })
        })

        Promise.all(promises).then(() => {
            console.log('data.categoryList', data.categoryList)

            const sortedArray2 = data.categoryList.map((item1:any) => {
                // 从新排序
                return arr.find((item2:any) => item2?.categoryId === item1.id)
            }) as any

            (paging.value as any).complete(sortedArray2)

            console.log('data.dataList', data.dataList)

        }).catch(() => {
            (paging.value as any).complete([])
        })


    })

}

const changeNav = (index: number) => {
    data.categoryIndex = index;

    (paging.value as any).scrollIntoViewById('toView' + index, 150)

}


const clickwaterItem = (item:any) => {
    console.log('item', item)
    if (item.shopSource == 32) {
        gotoShopDetail(item.shopId)
        return
    }
    gotoServiceStore({ itemId: item.shopId, isAd: 0 })
}

const toClassItemPage = (item:any) => {
    gotoClassItemPage({ categoryId: item.categoryId, categoryName: item.categoryName })
}


// 退出页面
const goback = () => {
    uni.navigateBack()
}

const instance = getCurrentInstance() // 获取组件实例
const query = uni.createSelectorQuery().in(instance)

const pageScroll = (e: any) => {

    // #ifdef APP || H5
    const scrollIndex = Math.floor(e.detail.scrollTop / 200)
    data.categoryIndex = scrollIndex
    // #endif

    // #ifdef MP-WEIXIN
    Debounce(() => {
        data.categoryList.forEach((item:any, index:number) => {
            query.select('#toView' + index).boundingClientRect((rect:any) => {
                console.log('rect', rect)

                if (rect.top <= 150 && rect.top >= 50) {
                    console.log('rect.top', rect.top)

                    data.categoryIndex = index
                }
            }).exec()
        })
    }, 500)
    // #endif

}

defineExpose({})

</script>

<style lang="scss" scoped>
.left_nva_box {
    width: 176rpx;
    height: 1500rpx;
    background: #FFFFFF;

    .navItem {
        padding: 32rpx;
        padding-right: 0rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #000002;
        font-weight: 400;
        position: relative;

        &.is_select {
            background: #F2F3F5;
            color: #EA3E1A;
        }

        .select_box {
            width: 8rpx;
            height: 36rpx;
            background: #EA3E1A;
            border-radius: 0rpx 6rpx 6rpx 0rpx;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0rpx, -50%);
        }
    }
}

.page_content {
    padding: 20rpx;
    padding-bottom: 130rpx;

    box-sizing: border-box;

    .boxItem {
        width: 100%;
        background: #FFFFFF;
        border-radius: 32rpx;
        padding: 28rpx 0rpx;
        box-sizing: border-box;
        margin-bottom: 16rpx;

        .item_title_box {
            width: 100%;
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40rpx;

            .item_title {
                color: #000002;
                font-size: 30rpx;
                font-weight: 500;
            }
        }

        .list_box {
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            // flex-wrap: wrap;
            display: grid;
            grid-gap: 14rpx;
            grid-template-columns: auto auto auto auto;
            padding: 0rpx 8rpx;
            box-sizing: border-box;

            .item_box {
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 20rpx;

                .item_img {
                    width: 60rpx;
                    height: 60rpx;
                    margin-bottom: 12rpx;
                }

                .item_text {
                    text-align: center;
                    font-size: 24rpx;
                    color: #727375;
                    font-weight: 400;
                    width: 120rpx;
                    white-space: nowrap; /*强制一行内显示*/
                    overflow: hidden; /*溢出隐藏*/
                    text-overflow: ellipsis; /*超出部分现实省略号*/
                }
            }

        }
    }
}

.placeholder {
    width: 100%;
    padding: 90rpx 0;
}

</style>
