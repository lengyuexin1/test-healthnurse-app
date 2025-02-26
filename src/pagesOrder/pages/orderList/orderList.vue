<template>
    <view class="container">
        <z-paging-swiper class="swiper-item" ref="paging" :auto="false">
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'订单管理'"></bc-page-navbar>
                <view class="ordercondition_box">
                    <view class="condition_search_box">
                        <TnInput placeholder="搜索我的订单" shape="circle" @blur="blur" v-model="data.title">
                            <template #prefix>
                                <TnIcon name="search" color="#B5B5B5" size="28"></TnIcon>
                            </template>
                        </TnInput>
                    </view>
                    <view class="condition_screen_box" @click="screenpopup">
                        <view class="condition_screen_text" :class="{ 'isopen': data.showpopup }">筛选</view>
                        <view v-if="data.showpopup">
                            <TnIcon name="up-triangle" color="#29C86F" size="30"></TnIcon>
                        </view>
                        <view v-else>
                            <TnIcon name="down-triangle" color="#333333" size="30"></TnIcon>

                        </view>
                    </view>
                </view>
                <view >
                    <TnTabs
                        v-model="data.currentTabIndex"
                        bg-color="transparent"
                        bar-color="#29C86F"
                        :bottom-shadow="false"
                    >
                        <TnTabsItem
                            v-for="(item, index) in data.tabsData"
                            :key="index"
                            :title="item.name"
                            :scroll="false"
                            font-size="30rpx"
                            active-color="#000000"
                            color="#999999"
                        />
                    </TnTabs>
                </view>
            </template>
            <swiper class="swiper" :current="data.currentTabIndex" @change="onswiperchange">
                <swiper-item>
                    <serviceOrder ref="service" :tabsIndsex="data.tabsIndex" :month_t="data.OptionId" :title="data.title"></serviceOrder>
                </swiper-item>
                <swiper-item>
                    <goodsOrder ref="goods" :tabsIndsex="data.tabsIndex" :month_t="data.OptionId" :title="data.title"></goodsOrder>
                </swiper-item>
                <swiper-item>
                    <courseOrder ref="course"></courseOrder>
                </swiper-item>
            </swiper>
        </z-paging-swiper>
        <TnPopup v-model="data.showpopup" open-direction="top">
            <view class="space" :style="{ 'height': data.bgboxheight + 'px' }"></view>
            <view class="popup_box">
                <view class="popup_box_title">时间筛选</view>
                <view class="OptionList_box">
                    <view class="Option_item"
                          v-for="(item,index) in data.dateOptionList" :key="index"
                          @click="changeOptionIndex(index)"
                          :class="{ 'isscreen': data.Optionindex === index }"
                    >{{ item.name }}
                    </view>
                </view>
                <view class="popup_btn_box">
                    <view class="resetting_btn" @click="resettingscreen">重置</view>
                    <view class="save_btn" @click="saveresetting">保存</view>
                </view>
            </view>
        </TnPopup>
    </view>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import serviceOrder from "./components/serviceOrder.vue"
import goodsOrder from "./components/goodsOrder.vue"
import courseOrder from './components/courseOrder.vue'

import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

interface tabsType{
    id:number,
    name:string
}

interface Data{
    title: string,
    tabsData:tabsType[],
    currentTabIndex: number,
    tabsIndex: number,
    showpopup: boolean,
    dateOptionList: tabsType[],
    bgboxheight: number,
    Optionindex: number,
    OptionId: string | number | null

}

const data = reactive<Data>({
    title: '',
    tabsData: [
        { id: 1, name: '服务订单' },
        { id: 2, name: '商品订单' }
        // {id:3,name:'云课堂订单'}
    ],
    currentTabIndex: 0,
    tabsIndex: 0,
    showpopup: false,
    dateOptionList: [
        { id: 'month_1', name: '一个月' },
        { id: 'month_3', name: '三个月' },
        { id: 'month_6', name: '六个月' },
        { id: 'this_year', name: '一年' }
    ],
    bgboxheight: 80,
    Optionindex: 999,
    OptionId: ''
})

const blur = () => {
    data.currentTabIndex == 0 && (service.value as any).reloadPage()
    data.currentTabIndex == 1 && (goods.value as any).reloadPage()
    data.currentTabIndex == 2 && (course.value as any).reloadPage()
}
const screenpopup = () => {
    data.showpopup = !data.showpopup
}

const changeOptionIndex = (index: number) => {
    if (data.Optionindex == index) {
        data.Optionindex = 999
        data.OptionId = ''
        return
    }
    data.Optionindex = index
}

const resettingscreen = () => {
    data.Optionindex = 999
    data.OptionId = ''
    data.currentTabIndex == 0 && (service.value as any).reloadPage()
    data.currentTabIndex == 1 && (goods.value as any).reloadPage()
    data.currentTabIndex == 2 && (course.value as any).reloadPage()
    data.showpopup = false

    setTimeout(() => {
        data.showpopup = false
    }, 200)
}
const saveresetting = () => {
    data.OptionId = data.Optionindex != 999 ? data.dateOptionList[data.Optionindex].id : ''
    if (data.currentTabIndex === 0) {
        (service.value as any).reloadPage()
    }
    else if (data.currentTabIndex === 1) {
        (goods.value as any).reloadPage()
    }
    else if (data.currentTabIndex === 2) {
        (course.value as any).reloadPage()
    }
    setTimeout(() => {
        data.showpopup = false
    }, 200)

}

const onswiperchange = (e:any) => {
    data.currentTabIndex = e.detail.current
}

onLoad((options: any) => {
    data.currentTabIndex = Number(options.sub) ? Number(options.sub) : 0
    data.tabsIndex = Number(options.typeIndex) ? Number(options.typeIndex) : 0
})


const service = ref()
const goods = ref()
const course = ref()
// onShow(() => {
//     data.currentTabIndex == 0 && (service.value as any).reloadPage()
//     data.currentTabIndex == 1 && (goods.value as any).reloadPage()
//     data.currentTabIndex == 2 && (course.value as any).reloadPage()
// })
onReady(() => {
    data.currentTabIndex == 0 && (service.value as any).reloadPage()
    data.currentTabIndex == 1 && (goods.value as any).reloadPage()
    data.currentTabIndex == 2 && (course.value as any).reloadPage()
})




</script>


<style scoped>
:deep(.tn-tabs__bar) {
    height: 6rpx;
}
:global(.tn-tabs__bar) {
    height: 6rpx;
}
</style>

<style lang="scss" scoped>
.swiper {
	flex: 1;
	height: 100%;
}

.ordercondition_box {
    background: #DFF7EF;
    padding: 20rpx 30rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .condition_search_box {
        width: 82%;
        background: #fff;
        border-radius: 36rpx;
    }

    .condition_screen_box {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #333333;
        z-index: 1;

        .condition_screen_text {
            margin-right: 8rpx;

            &.isopen {
                color: #29C86F;
            }
        }
    }
}

.space {
    width: 100%;
    height: 374rpx;
}

.popup_box {
    width: 100%;
    height: 350rpx;
    padding: 30rpx;
    padding-right: 10rpx;
    box-sizing: border-box;
    position: relative;

    .popup_box_title {
        font-size: 32rpx;
        color: #333333;
        margin-bottom: 40rpx;
        font-weight: 600;
    }

    .OptionList_box {
        display: flex;
        align-items: center;

        .Option_item {
            width: 160rpx;
            height: 68rpx;
            line-height: 68rpx;
            text-align: center;
            border-radius: 8rpx;
            font-size: 26rpx;
            background: #F7F7F7;
            color: #333333;
            margin-right: 16rpx;
            overflow: hidden;

            &.isscreen {
                background: #EBFBF1;
                color: #29C86F;
            }


        }
    }

    .popup_btn_box {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx 24rpx;
        box-sizing: border-box;
        box-shadow: 0rpx -4rpx 16rpx rgba(0, 0, 0, 0.04);

        .resetting_btn {
            width: 236rpx;
            height: 80rpx;
            background: #FFFFFF;
            border-radius: 42rpx;
            border: 2rpx solid #EEEEEE;
            font-size: 30rpx;
            color: #666666;
            line-height: 80rpx;
            text-align: center;

        }

        .save_btn {
            width: 450rpx;
            height: 80rpx;
            background: #29C86F;
            border-radius: 42rpx;
            font-size: 30rpx;
            color: #FFFFFF;
            text-align: center;
            line-height: 80rpx;
        }
    }
}
</style>
