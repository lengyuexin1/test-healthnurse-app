<template>
    <view class="container">
        <z-paging-swiper class="swiper-item" ref="paging" :auto="false">
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'订单管理'"></bc-page-navbar>
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
            <swiper class="swiper" :current="data.currentTabIndex"
				@change="onswiperchange">
                <swiper-item>
					<serviceOrder ref="service"></serviceOrder>
                </swiper-item>
                <swiper-item>
					<goodsOrder ref="goods"></goodsOrder>
				</swiper-item>
                <swiper-item>
                    <courseOrder ref="course"></courseOrder>
                </swiper-item>
			</swiper>

        </z-paging-swiper>
    </view>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'


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
    tabsData:tabsType[],
    currentTabIndex:number
}

const data = reactive<Data>({
    tabsData: [
        { id: 1, name: '服务订单' },
        { id: 2, name: '商品订单' }
        // {id:3,name:'云课堂订单'}
    ],
    currentTabIndex: 0
})


const onswiperchange = (e:any) => {
    data.currentTabIndex = e.detail.current
}

onLoad((option:any) => {
    data.currentTabIndex = Number(option.typeIndex) ? Number(option.typeIndex) : 0
})


const service = ref()
const goods = ref()
const course = ref()
onShow(() => {
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
</style>
