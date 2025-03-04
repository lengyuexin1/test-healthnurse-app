<template>
    <view class="container">
        <z-paging
              ref="paging"
              v-model="data.dataList"
              :auto="true"
              :fixed="true"
              @query="queryList"
              :defaultPageSize="10"
              :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="还没有数据哦~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
              :auto-show-back-to-top="true"
        >
            <template #top>
                <!-- :bgstyle="'background: #fff;'"  -->
                <!-- :addheight="150" -->
                <pageTopbg :zIndex="-1"></pageTopbg>

                <view class="navbar_box"
                      :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }">
                        <view class="back_icon" @click="goback">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true"/>
                        </view>
                        <view class="inp_box" @click="tosearch">
                            <TnIcon name="search" color="#6E6E6E" size="38" :bold="true"/>
                            <view class="inp_text">论坛</view>
                        </view>
                    </view>
                </view>

            </template>

            <view class="page_content">
                <view class="zone_box">
                    <view class="zone_list">
                        <view class="zone_item" v-for="(item, index) in data.categoryList" :key="index"
                              @click="toClassPage(item)">
                            <image
                                  class="zone_img"
                                  :src="item.id == 222 ? getAssetsUrl(item.thumb) : item.thumb"
                                  mode="scaleToFill"
                            />
                            <view class="zone_text">{{ item.name }}</view>
                            <view class="new_tag" v-if="item.id == 111">New</view>
                        </view>
                    </view>
                </view>

                <view class="live_swiper">
                    <swiper
                          class="swiper"
                          circular
                          :autoplay="true"
                          :interval="5000"
                          :duration="500"
                          :vertical="false"
                          @change="liveswiperChange"
                    >
                        <!-- v-for="(item,index) in data.swiperList" :key="item.id" -->
                        <swiper-item class="swiper_item" v-for="item in 1" :key="item">
                            <!-- item.cover -->
                            <!-- @click="liveList(item)" -->

                            <image
                                  class="live_swiper_img"
                                  :src="getAssetsUrl('/leyou/static/expo_banner.png')"
                                  mode="scaleToFill"
                            />
                            <!-- index == 0 -->
                            <view class="live_box" v-if="false">
                                <view class="live_left_box">
                                    <BarPlaying bgColor="#FFFFFF"></BarPlaying>
                                    <view>直播中</view>
                                </view>
                                <view class="live_number_box" v-if="false">
                                    {{ item }} 人观看
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                    <view class="swiper_sign_box">
                        <!-- v-for="(signItem, signIndex) in data.swiperList.length" :key="signIndex" -->
                        <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }"
                              v-for="(signItem, signIndex) in 1"></view>
                    </view>
                </view>

                <view class="nav_box">
                    <image
                          class="nva_left_img"
                          :src="getAssetsUrl('/leyou/static/discuss_icon.png')"
                          mode="scaleToFill"
                    />
                    <view class="nav_list_box">
                        <view class="nav_list">
                            <view class="nav_item" @click="changeNav(item)"
                                  :class="{ 'is_selected': item.id == data.selectedId }"
                                  v-for="(item, index) in data.navList" :key="index">
                                <view>
                                    {{ item.name }}
                                </view>
                                <view class="selected_box" v-if="item.id == data.selectedId"></view>
                            </view>
                            <view class="nav_space"></view>
                        </view>
                    </view>
                </view>

                <view class="contentList_box">
                    <WaterfallsFlow :wfList="data.dataList" @waterItem="clickwaterItem"></WaterfallsFlow>
                </view>

            </view>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { onLoad } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { healthContentList } from "@/api/create-api"

import BCNotify from '@/components/notify/index.vue'

import { oldExpoCategory, oldExpolist } from '@/api/goods-api'
import {
    gotoServiceExpoClass,
    gotonewProduct,
    // gotoDiscussDetail,
    gotoAllZone,
    gotoAllClass,
    gotoClassItemPage,
    gotoServiceStore,
    gotosearch
} from '@/routes/service-routes'

import WaterfallsFlow from '@/pagesOldExpo/pages/serviceExpo/components/WaterfallsFlow.vue'

interface Data {
    titleTop: number
    titleRight: number
    sBarHeight: number
    showNav: boolean
    dataList: any
    categoryList: any
    swiperIndex: number
    navList: any
    navIndex: number
    selectedId: string | number
    pid: string
    title: string
}

const data = reactive<Data>({
    titleTop: 0,
    titleRight: 0,
    sBarHeight: 0,
    showNav: false,
    dataList: [],
    categoryList: [],
    swiperIndex: 0,
    navList: [],
    navIndex: 1,
    selectedId: 999,
    pid: '',
    title: ''
})


const bcNotify = ref()

onMounted(async () => {

    // #ifdef MP-WEIXIN
    // 获取胶囊按钮位置信息
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { top, height, width } = menuButtonInfo
    // #endif

    // #ifdef APP-PLUS || H5
    console.log('app顶部')
    const height = 0
    const width = 0
    const top = 0
    // #endif


    // #ifdef MP-WEIXIN
    // 获取系统状态栏高度
    data.sBarHeight = uni.getSystemInfoSync().statusBarHeight!
    // 计算标题需要偏移的位置
    data.titleTop = top + (height - data.sBarHeight) / 2

    // 计算顶部右侧偏移量
    data.titleRight = width + 8
    // #endif


    // #ifdef APP-PLUS || H5
    data.sBarHeight = 33
    const pageObj = uni.getSystemInfoSync() as any
    data.titleTop = pageObj.safeArea.top

    data.titleRight = 8
    // #endif


})


const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

onLoad((option: any) => {
    data.pid = option.pid
    data.title = option.title
})

const paging = ref(null)
const queryList = async (pageNumber: number, pageSize: number) => {

    if (pageNumber == 1) {
        oldExpoCategory({
            // pageNumber,
            // pageSize,
            pageNumber: 1,
            pageSize: 7,
            query: {
                isPid: 0,
                pid: data.pid
            }
        }).then((res: any) => {
            data.categoryList = [
                ...res.data,
                { name: '全部分类', thumb: '/leyou/static/all_icon.png', id: 222 }
            ]

            data.navList = [
                { name: '关注', thumb: '', id: 998 },
                { name: '推荐', thumb: '', id: 999 },
                ...res.data
            ]
        })
    }

    oldExpolist({
        pageNumber,
        pageSize,
        query: {
            isRecommend: data.selectedId == 999 ? 1 : 0,
            isFavorite: data.selectedId == 998 ? 1 : 0,
            categoryId: data.selectedId == 998 || data.selectedId == 999 ? '' : data.selectedId
        }
    }).then((res: any) => {
        console.log('res', res.data);
        (paging.value as any).complete(res.data)
    }).catch((err: any) => {
        (paging.value as any).complete([])
    })

    // healthContentList({
    //     pageSize,
    //     pageNumber,
    //     query:{
    //         categoryIds: [],
    //     }
    // }, false).then((res:any) => {
    //     (paging.value as any).complete(res.data)
    // })


}

const liveswiperChange = (e: any) => {
    data.swiperIndex = e.detail.current
    // console.log('swiper e',e);
}

const clickwaterItem = (item: any) => {
    console.log('item', item)
    if (item.shopSource == 32) {
        gotoDiscussDetail({ shopId: item.shopId })
        return
    }
    gotoServiceStore({ shopId: item.shopId, isAd: 0 })

}

const toClassPage = (item: any) => {
    console.log('item', item)
    if (item.id == 222) {
        gotoAllClass({ pid: data.pid, title: data.title })
        return
    }
    gotoClassItemPage({ categoryId: item.id, categoryName: item.name })

}

const changeNav = (item: any) => {
    data.selectedId = item.id;

    (paging.value as any).reload()

}

const tosearch = () => {
    gotosearch()
}

// 退出页面
const goback = () => {
    uni.navigateBack()
}

defineExpose({})

</script>

<style lang="scss" scoped>
.navbar_box {
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;
    // #endif

    margin-bottom: 24rpx;

    .top_box {

        padding: 10rpx;

        padding-left: 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;


        // #ifdef APP-PLUS || H5
        width: 100%;
        height: auto !important;
        // #endif

    }

    .back_icon {
        margin-right: 20rpx;
    }

    .inp_box {
        width: 100%;
        padding: 20rpx 26rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 36rpx;

        .inp_text {
            font-size: 28rpx;
            color: #6E6E6E;
            margin-left: 6rpx;
        }


    }

}

.page_content {
    padding: 40rpx 10rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 28rpx 28rpx 0rpx 0rpx;

    .zone_box {
        padding: 0rpx 30rpx;
        box-sizing: border-box;

        .zone_list {
            width: 100%;
            display: grid;
            grid-gap: 30rpx;
            grid-template-columns: auto auto auto auto;
            margin-bottom: 40rpx;

            .zone_item {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .zone_img {
                    width: 88rpx;
                    height: 88rpx;
                    margin-bottom: 18rpx;
                }

                .zone_text {
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #333333;
                    width: 144rpx;
                    text-align: center;
                    white-space: nowrap; /*强制一行内显示*/
                    overflow: hidden; /*溢出隐藏*/
                    text-overflow: ellipsis; /*超出部分现实省略号*/
                }

                .new_tag {
                    width: 55rpx;
                    height: 25rpx;
                    text-align: center;
                    line-height: 25rpx;

                    background: #FC423B;
                    border-radius: 28rpx 28rpx 28rpx 0rpx;

                    font-size: 20rpx;
                    color: #FFFFFF;

                    position: absolute;
                    top: 0;
                    right: 0;
                }

            }

        }
    }

    .live_swiper {
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        width: 710rpx;
        height: 160rpx;
        margin: auto;
        padding-top: 10rpx;
        box-sizing: border-box;
        margin-bottom: 26rpx;

        .swiper {
            width: 100%;
            height: 100%;

            .swiper_item {
                width: 100%;
                height: 100%;
                position: relative;

                .live_swiper_img {
                    width: 100%;
                    height: 100%;
                    border-radius: 12rpx;
                    overflow: hidden;
                    // border: 2rpx solid red;
                }

                .live_box {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius: 0rpx 16rpx 0rpx 16rpx;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    font-size: 20rpx;
                    color: #FFFFFF;

                    .live_left_box {
                        display: flex;
                        align-items: center;
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                        background: #EA3E1A;
                        border-radius: 0rpx 8rpx 0rpx 0rpx;

                        .live_img {
                            width: 16rpx;
                            height: 16rpx;
                            margin-right: 4rpx;
                        }
                    }

                    .live_number_box {
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                    }

                }
            }
        }

        .swiper_sign_box {
            position: absolute;
            bottom: 12rpx;
            left: 50%;
            transform: translate(-50%, 0rpx);
            display: flex;
            align-items: center;

            .sign_item {
                width: 12rpx;
                height: 12rpx;
                background: #FFFFFF;
                opacity: 0.3;
                margin-left: 8rpx;
                border-radius: 50%;

                &.is_sign {
                    opacity: 1;
                }
            }
        }

    }

    .nav_box {
        width: 100%;

        padding: 0rpx 14rpx;
        box-sizing: border-box;
        overflow: hidden;

        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        .nva_left_img {
            flex-shrink: 0;
            width: 68rpx;
            height: 68rpx;
            margin-right: 28rpx;

        }

        .nav_list_box {
            flex-shrink: 0;

            overflow-x: scroll;
            width: 100%;
            display: flex;

            .nav_list {
                display: flex;
                align-items: center;

                .nav_item {
                    flex-shrink: 0;
                    flex-wrap: nowrap;

                    font-weight: 400;
                    font-size: 32rpx;
                    color: #8C8C8C;
                    margin-right: 42rpx;
                    position: relative;

                    &.is_selected {
                        color: #333333;

                    }

                    .selected_box {
                        width: 44rpx;
                        height: 5rpx;
                        background: #EA3E1A;
                        border-radius: 6rpx;
                        position: absolute;
                        bottom: -10rpx;
                        left: 50%;
                        transform: translate(-50%, 0rpx);

                    }
                }

                .nav_space {
                    flex-shrink: 0;

                    width: 100rpx;
                    height: 100rpx;

                }
            }

        }
    }

    .contentList_box {
        background: #FAFAFA;

    }

}

</style>
<style>
page {
    background: #fff;
}
</style>
