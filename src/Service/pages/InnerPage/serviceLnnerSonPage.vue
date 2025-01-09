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
            <view class="navbar_box" :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                <view class="top_box" :style="{ height: data.sBarHeight + 'px' }">
                    <view class="back_icon" @click="goback">
                        <TnIcon name="left" color="#2F2F2F" size="38" bold ></TnIcon>
                    </view>
                    <view class="top_title">{{ data.title }}</view>
                    <!-- #ifdef MP-WEIXIN -->
                    <view></view>
                    <!-- #endif -->

                    <!-- #ifdef APP-PLUS || H5 -->
                    <view class="top_search">
                        <TnIcon name="search" color="#666666" size="32" ></TnIcon>
                        <view class="search_text">搜索</view>
                    </view>
                    <!-- #endif -->

                </view>
            </view>
            <!-- #ifdef MP-WEIXIN -->
            <view class="top_inp_box">
                <view class="inp_box" @click="tosearch">
                    <TnIcon name="search" color="#666" size="26"></TnIcon>
                    <view class="inp_text">搜索</view>
                </view>
            </view>
            <!-- #endif -->

            <view class="screen_box">
                <view class="screen_list">
                    <view class="screen_item" @click="changeScreen(1)">
                        <text class="screen_text" :class="{'is_screen_text' : data.screenIndex == 1 }">全部</text>
                    </view>
                    <view class="screen_item" @click="changeScreen(2)">
                        <text class="screen_text" :class="{'is_screen_text' : data.screenIndex == 2 }">销量</text>
                        <view class="state_box">
                            <image
                                v-if="data.screenIndex == 2"
                                class="change_state_img"
                                :class="{'is_down' : data.salesType == 0}"
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
                        <text class="screen_text" :class="{'is_screen_text' : data.screenIndex == 3 }">价格</text>
                        <view class="state_box">
                            <image
                                v-if="data.screenIndex == 3"
                                class="change_state_img"
                                :class="{'is_down' : data.priceType == 0}"
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
                <view></view>
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
import { onLoad } from '@dcloudio/uni-app'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import institutionList from './components/institutionList.vue'
import {getcategoryList, shoplist} from '@/api/service-api'

import { gotosearch } from '@/routes/service-routes'
import { gotoIndex } from "@/routes/public-routes"



interface Data{
    dataList:any,
    topIndex:number,
    screenIndex:number,
    salesType:number,
    priceType:number,
    sortType:number,
    id:string,
    titleTop: number,
    titleRight: number,
    sBarHeight: number
    title: string
}

const data = reactive<Data>({
    dataList:[],
    topIndex:0,
    screenIndex:1,
    salesType:0,
    priceType:0,
    sortType:1,
    id:'',
    titleTop: 0,
    titleRight: 0,
    sBarHeight: 0,
    title: ''

})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onLoad((option:any)=>{
    data.id = option.id
    data.title = option.title
})

onMounted(()=>{

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

    console.log(',data.titleRight',data.titleRight)

})


const paging = ref()
const queryList = async (pageNumber:number, pageSize:number)=>{

    shoplist({
        pageSize,
        pageNumber,
        query:{
            categoryIds: [data.id],
            businessType:3,
            sortType:data.sortType,
        }
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    }).catch(()=>{
        (paging.value as any).complete([])
    })
}



const bcNotify = ref()

const changeScreen = (index:number) => {
    data.screenIndex = index
    data.sortType = 1
    if (index == 2) {
        if (data.salesType) {
            data.salesType = 0
            data.sortType = 4

        }else{
            data.salesType = 1
            data.sortType = 8

        }
    }
    if (index == 3) {
        if (data.priceType) {
            data.priceType = 0
            data.sortType = 2

        }else{
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

const goback = () => {
    
    const pages = getCurrentPages()
    console.log('pages',pages);

    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }
    uni.navigateBack()
}


defineExpose({
    pagingReload
})


</script>

<style lang="scss" scoped>
.navbar_box{
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;
    // #endif

    .top_box{
        padding: 22rpx;

        padding-left: 10rpx;
        // #ifdef MP-WEIXIN
        padding-top: 0rpx;
        // #endif
        
        padding-bottom: 6rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        // #ifdef APP-PLUS || H5
        width: 100%;
        padding-left: 20rpx;
        padding-bottom: 6rpx;
        height: auto!important;
        // #endif

        position: relative;

        &.is_hidebox{
            padding: 16rpx;
            padding-right: 0rpx;
            padding-bottom: 0rpx;
        }

        .back_icon{
            width: 40rpx;
            height: 40rpx;
        }

        .top_title{
            position: absolute;
            font-size: 34rpx;
            color: #333333;
            font-weight: 600;
            // #ifdef MP-WEIXIN
            top: 50%;
            right: 25%;
            transform: translate(10%, -50%);
            // #endif


            // #ifdef APP-PLUS || H5
            top: 50%;
            right: 50%;
            transform: translate(50%, -40%);
            // #endif

        }
        .top_search{
            border-radius: 32rpx;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            
            width: 136rpx;
            height: 64rpx;
            
            .search_text{
                font-size: 24rpx;
                color: #666666;
                margin-left: 8rpx;
            }
        }

    }

}


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

.screen_box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx 40rpx;
    padding-left: 0rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 32rpx 32rpx 0rpx 0rpx;
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
