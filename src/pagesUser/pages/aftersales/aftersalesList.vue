<template>
    <view class="container">
        <z-paging-swiper class="swiper-item" ref="paging" :auto="false">
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'退款/售后'"></bc-page-navbar>
                <view >
                    <TnTabs 
                        v-model="data.currentTabIndex"
                        bg-color="transparent" 
                        bar-color="#EA3E1A" 
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
                    <salesList ref="salesListRef"></salesList>
                </swiper-item>
                <swiper-item>
                    <sptApiList ref="sptApiListRef" :typeId="1"></sptApiList>
				</swiper-item>
                <swiper-item>
                    <sptApiList ref="sptRef" :typeId="0"></sptApiList>
                </swiper-item>
			</swiper>

        </z-paging-swiper>
    </view>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import salesList from './components/salesList.vue'
import sptApiList from './components/sptApiList.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'

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
    tabsData : [
        {id:1,name:'可申请'},
        {id:2,name:'处理中'},
        {id:3,name:'申请记录'}
    ],
    currentTabIndex:0,
})


const onswiperchange = (e:any)=>{
    data.currentTabIndex = e.detail.current
    reloadPage()
}   

onLoad((option:any)=>{
    data.currentTabIndex = Number(option.typeIndex) ? Number(option.typeIndex) : 0
})

const salesListRef = ref()
const sptApiListRef = ref()
const sptRef = ref()

const reloadPage = () => {
    data.currentTabIndex == 0 && (salesListRef.value as any).reloadPage();
    data.currentTabIndex == 1 && (sptApiListRef.value as any).reloadPage();
    data.currentTabIndex == 2 && (sptRef.value as any).reloadPage();
}

onShow(()=>{
    reloadPage()
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
