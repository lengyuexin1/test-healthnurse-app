<template>
	<view class="container">
        <z-paging-swiper class="swiper-item">
            <template #top> 
                <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" @change="tabsChange">
                    <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
                </TnTabs>
                <view class="notice row i-center j-between" @tap="clickCouponHistory">
                    <text>历史记录</text>
                    <TnIcon name="right" size="32" color="#0B0300"/>
                </view>
            </template>
            <swiper class="swiper" :current="data.currentTabIndex" @transition="transition" @animationfinish="animationfinish" @change="onswiperchange">
                <swiper-item v-for="(item, index) in data.tabsData" :key="index">
                    <coupon-list ref="ordItm" :tabIndex="index" :currentIndex="data.currentTabIndex" :typeId="item.type"></coupon-list>
                </swiper-item>
            </swiper>
        </z-paging-swiper>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import couponList from './coupon-list.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { gotoCouponHistory } from '@/routes/user-routes'
import { onLoad } from '@dcloudio/uni-app'

interface Data {
    userinfo: any
    currentTabIndex: any
    tabsData: any
    showRuleDialog: boolean
    showRuleText: string
    showPopup: boolean
}

const data = reactive<Data>({
    userinfo: null,
    currentTabIndex: null,
    tabsData: [
        { text: '卡券', type: 1000001 },
        { text: '红包', type: 1000000 }
    ],
    showRuleDialog: false,
    showRuleText: '',
    showPopup: false
})

onLoad((options) => {
    const index = options?.type === 'coupon' ? 0 : 1
    tabsChange(index)
})

// swiper-item左右移动，通知tabs的滑块跟随移动
const transition = (e: any) => {
    const dx = e.detail.dx
}

// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
const animationfinish = (e: any) => {
    const current = e.detail.current
    data.currentTabIndex = current
}

const onswiperchange = (e: any) => {
    // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const index = e.target.current || e.detail.current
    tabsChange(index)
    // #endif
}

const tabsChange = (val: any) => {
    data.currentTabIndex = val
}

const clickCouponHistory = () => {
    gotoCouponHistory({ typeId: data.currentTabIndex == 0 ? 1000001: 1000000 })
}

</script>

<style lang="scss" scoped>
.swiper {
    flex: 1;
    height: 100%;
    padding: 0 24rpx;
}
.notice{
    margin: 0 24rpx;
    padding: 0 24rpx;
    height: 90rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #0B0300;
    margin-top: 24rpx;
    margin-bottom: 24rpx;
}

.rulebox{
    margin: 0 50rpx;
    padding: 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    .ruletit{
        font-size: 36rpx;
        font-weight: 500;
        color: #0B0300;
        margin-bottom: 24rpx;
        text-align: center;
    }
    .ruletex{
        font-size: 28rpx;
        font-weight: 500;
        color: #0B0300;
        margin-bottom: 24rpx;
        text-align: center;
        width: 500rpx;
    }
    .rulebtn{
        margin-top: 40rpx;
        padding: 0 50rpx;
    }
}
</style>
