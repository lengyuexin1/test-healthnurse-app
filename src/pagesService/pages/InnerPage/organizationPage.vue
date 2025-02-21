<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="6"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >

        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="pageTitle"></bc-page-navbar>

            <!-- <view class="top_inp_box">
                <view class="inp_box" @click="tosearch">
                    <TnIcon name="search" color="#666" size="26"></TnIcon>
                    <view class="inp_text">搜索</view>
                </view>
            </view>

            <view class="top_icon_list">
                <view class="top_scrool">
                    <view
                    class="scrool_item"
                    @click="changeToplist(item,index)"
                    :class="{ 'is_select': data.topIndex == index }"
                    v-for="(item,index) in data.topList" :key="item.id">
                        <image
                            class="item_img"
                            :src="data.topIndex == index ? item.secondIcon : item.icon"
                            mode="aspectFill"
                        />
                        <view class="item_name">{{ item.name }}</view>
                        <view class="select_box" v-if="data.topIndex == index"></view>
                    </view>
                </view>
            </view> -->
            <view class="screen_box">
                <view class="screen_list">
                    <view class="screen_item" @click="changeScreen(1)">
                        <text class="screen_text" :class="{ 'is_screen_text': data.screenIndex == 1 }">全部</text>
                    </view>
                    <view class="screen_item" @click="changeScreen(2)">
                        <text class="screen_text" :class="{ 'is_screen_text': data.screenIndex == 2 }">销量</text>
                        <view class="state_box">
                            <image
                                v-if="data.screenIndex == 2"
                                class="change_state_img"
                                :class="{ 'is_down': data.salesType == 0 }"
                                :src="getAssetsUrl('/leyou/serviceIcon/screen-icon-highight.svg')"
                                mode="scaleToFill"
                            />
                            <image
                                v-else
                                class="state_img"
                                :src="getAssetsUrl('/leyou/serviceIcon/screen-icon.svg')"
                                mode="scaleToFill"
                            />

                        </view>
                    </view>
                    <view class="screen_item" @click="changeScreen(3)">
                        <text class="screen_text" :class="{ 'is_screen_text': data.screenIndex == 3 }">价格</text>
                        <view class="state_box">
                            <image
                                v-if="data.screenIndex == 3"
                                class="change_state_img"
                                :class="{ 'is_down': data.priceType == 0 }"
                                :src="getAssetsUrl('/leyou/serviceIcon/screen-icon-highight.svg')"
                                mode="scaleToFill"
                            />
                            <image
                                v-else
                                class="state_img"
                                :src="getAssetsUrl('/leyou/serviceIcon/screen-icon.svg')"
                                mode="scaleToFill"
                            />

                        </view>
                    </view>
                </view>
                <!-- <view></view> -->
            </view>

        </template>
        <institutionList :dataList="data.dataList"></institutionList>

        <BCNotify ref="bcNotify"></BCNotify>

        <template #bottom>

        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'

import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import institutionList from './institutionList.vue'
import { getcategoryList } from '@/api/service-api'
import { servicelist } from "@/api/goods-api"
import { gotosearch } from '@/routes/service-routes'



interface Data{
    dataList:any,
    topList:any,
    topIndex:number,
    screenIndex:number,
    salesType:number,
    priceType:number,
    sortType:number,
}

const data = reactive<Data>({
    dataList: [],
    topList: [],
    topIndex: 0,
    screenIndex: 1,
    salesType: 0,
    priceType: 0,
    sortType: 1
})


interface Props {
    id:string,
    pageTitle:string,
}
const props = defineProps<Props>()



const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})



onMounted(() => {
})


const paging = ref()
const queryList = async (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) {
        await getcategoryList({
            id: props.id
        }).then((res:any) => {
            data.topList = res
        })
    }

    const categoryIds : any = []

    if (data.topIndex == 0) {
        console.log('手动')
        categoryIds.push(data.topList[0].id)
    }
    else {
        console.log('自动获取')
        categoryIds.push(data.topList[data.topIndex].id)
    }

    console.log('data.sortType', data.sortType)
    servicelist({
        pageSize,
        pageNumber,
        query: {
            businessType: 3,
            categoryIds: [props.id],
            sortType: data.sortType
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete([])
    })
}



const bcNotify = ref()

const changeToplist = (item:any, index:number) => {
    data.topIndex = index;
    (paging.value as any).reload()
}

const changeScreen = (index:number) => {
    data.screenIndex = index
    data.sortType = 1
    if (index == 2) {
        if (data.salesType) {
            data.salesType = 0
            data.sortType = 4

        }
        else {
            data.salesType = 1
            data.sortType = 8

        }
    }
    if (index == 3) {
        if (data.priceType) {
            data.priceType = 0
            data.sortType = 2

        }
        else {
            data.priceType = 1
            data.sortType = 3

        }
    }
    (paging.value as any).reload()


}


// 页面刷新
const pagingReload = () => {
    (paging.value as any).reload(true)
}


const tosearch = () => {
    gotosearch()
}


defineExpose({
    pagingReload
})


</script>

<style lang="scss" scoped>
.top_inp_box{
    padding: 14rpx 20rpx;
    box-sizing: border-box;

    .inp_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        padding: 16rpx 20rpx;
        .inp_text{
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            margin-left: 8rpx;
        }
    }
}

.top_icon_list{
    width: 100%;
    overflow-x: scroll;
    padding: 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
    .top_scrool{
        display: flex;
        align-items: center;
        width: fit-content;

        .scrool_item{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 24rpx 20rpx;
            box-sizing: border-box;
            margin-right: 20rpx;
            border-radius: 16rpx;
            background: #fff;
            color: #333;
            position: relative;
            &.is_select{
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 100%);
                color: #FFFFFF;
            }
            .item_img{
                width: 38rpx;
                height: 38rpx;
                margin-right: 8rpx;
            }
            .item_name{
                flex-shrink: 0;
                font-size: 26rpx;
                font-weight: 400;
            }
            .select_box{
                width: 64rpx;
                height: 64rpx;
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 200%);
                position: absolute;
                bottom: -2rpx;
                left: 50%;
                transform: translate(-50%, 0) rotate(45deg);
                z-index: -1;
            }
        }
    }
}
.screen_box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx 40rpx;
    padding-left: 0rpx;
    box-sizing: border-box;
    background: #fff;
    // border-radius: 32rpx 32rpx 0rpx 0rpx;
    .screen_list{
        display: flex;
        align-items: center;
        .screen_item{
            display: flex;
            align-items: center;
            margin-left: 32rpx;
            .screen_text{
                color: #808080;
                font-size: 28rpx;
                font-weight: 400;
                &.is_screen_text{
                    color: #EA3E1A;
                }
            }
            .state_box{
                margin-left: 4rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .state_img{
                    width: 22rpx;
                    height: 22rpx;
                }
                .change_state_img{
                    width: 22rpx;
                    height: 22rpx;
                    &.is_down{
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}


</style>
