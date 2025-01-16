<template>
    <z-paging-swiper class="swiper-item">
        <template #top>
            <bc-page-navbar :title="'消费明细'"></bc-page-navbar>
            <TnTabs v-model="data.current" bar-color="#56cc7d" bg-color="#f2f4f5"
                    :bottom-shadow="false" font-size="30rpx" class="tabs"
                    active-font-size="32rpx"
                    @change="changeTab">
                <TnTabsItem active-color="#000" color="#666666" v-for="(item, index) in data.tabList" :key="index"
                            :title="item.name"/>
            </TnTabs>
        </template>
        <u-safe-bottom slot="bottom"></u-safe-bottom>
        <swiper class="swiper page-public-bg" :current="data.current" @animationfinish="animationfinish"
                @change="onswiperchange">
            <swiper-item>
                <expendRecharge/>
            </swiper-item>
            <swiper-item>
                <expendUse/>
            </swiper-item>
        </swiper>
    </z-paging-swiper>
</template>

<script lang="ts" setup>
import expendRecharge from '../components/expendView/expendRecharge.vue'
import expendUse from '../components/expendView/expendUse.vue'
import TnTabs from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue"
import TnTabsItem from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue"
import { reactive } from 'vue'

interface Data {
    tabList: any[],
    current: number
}

const data = reactive<Data>({
    tabList: [
        { id: "1", name: "充值记录" },
        { id: "2", name: "消费记录" }
    ],
    current: 0
})
const changeTab = (e) => {
    data.current = e.index
}
// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
const animationfinish = (e) => {
    data.current = e.detail.current
}
const onswiperchange = (e) => {
    // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const index = e.target.current || e.detail.current
    data.tabsChange(index)
    // #endif
}

</script>

<style lang="scss" scoped>
.tabs {
    width: 100%;
    :deep(.tn-tabs-item){
        width: 100%;
    }
}

.swiper {
    flex: 1;
    height: 100%;
}
</style>
