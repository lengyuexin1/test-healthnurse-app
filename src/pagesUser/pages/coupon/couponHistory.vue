<template>
	<view class="container">
		<z-paging-swiper class="swiper-item">
			<template #top>
                <TnTabs v-model="data.current" :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" color="#666666" bar-color="#EA3E1A" active-color="#EA3E1A" @change="tabsChange">
                    <TnTabsItem v-for="(item, index) in data.navList" :key="index" :title="item.text" />
                </TnTabs>
			</template>
			<swiper class="swiper" :current="data.current" @transition="transition" @animationfinish="animationfinish"
				@change="onswiperchange">
				<swiper-item v-for="(item, index) in data.navList" :key="index">
					<coupon-list :overdue="true" ref="ordItm" :tabIndex="index" :currentIndex="data.current" :category="item.category" :typeId="data.typeId"></coupon-list>
				</swiper-item>
			</swiper>
		</z-paging-swiper>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import couponList from './coupon-list.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

interface Data {
    current: number
    navList: any
    typeId: number
}

const data = reactive<Data>({
    current: 0,
    navList: [
        { id: '1', text: '已使用', category: 'used' },
        { id: '2', text: '已过期', category: 'expire' }
    ],
    typeId: null //null优惠券 1000000红包
})

const ordItm = ref()

onLoad((options) => {
    console.log(options);
    
    data.typeId = options.typeId || 0
    uni.setNavigationBarTitle({ title: data.typeId == 1000000 ? '红包历史记录' : '卡券历史记录' })
})

onMounted(() => {
    // data.navList.forEach((v, k) => {
    //     ordItm[k].value.replace()
    // })
})

const onTabar = (name) => {
    // this.$emit('newtab', name)
}
// 服务菜单
const seleNav = (e) => {
    // this.tabIndex = e.index
}

// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
const animationfinish = (e) => {
    const current = e.detail.current
    data.current = current
}
// tabs通知swiper切换
const tabsChange = (index) => {
    data.current = index
}
// swiper-item左右移动，通知tabs的滑块跟随移动
const transition = () => {
    // const dx = e.detail.dx
}

const onswiperchange = (e) => {
    // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const index = e.target.current || e.detail.current
    tabsChange(index)
    // #endif
}
</script>

<style lang="scss" scoped>
	.swiper {
		flex: 1;
		height: 100%;
        padding: 0 24rpx;
	}
</style>