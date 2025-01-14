<template>
    <z-paging-swiper class="swiper-item">
        <view slot="top" class="bg_box" id="bgbox">
            <bc-page-navbar :title="'消费明细'"></bc-page-navbar>
            <u-tabs
                :current="current"
                :list="tabList"
                @click="changeTab"
                :scrollable="false"
                lineColor="#29C86F"
                lineHeight="6rpx"
                :activeStyle="{ color: '#29C86F', fontSize: '32rpx', fontWeight: 'bold' }"
                :inactiveStyle="{ color: '#666666', fontSize: '32rpx' }">
            </u-tabs>
        </view>
        <u-safe-bottom slot="bottom"></u-safe-bottom>
        <swiper class="swiper page-public-bg" :current="current" @animationfinish="animationfinish" @change="onswiperchange">
            <swiper-item>
                <expendRecharge />
            </swiper-item>
            <swiper-item>
                <expendUse />
            </swiper-item>
        </swiper>
    </z-paging-swiper>
</template>

<script>
import expendRecharge from '../components/expendView/expendRecharge.vue'
import expendUse from '../components/expendView/expendUse.vue'
export default {
    components: {
        expendRecharge,
        expendUse
    },
    data() {
        return {
            tabList: [
                { id: "1", name: "充值记录" },
                { id: "2", name: "消费记录" }
            ],
            current: 0
        }
    },
    methods: {
        changeTab(e) {
            this.current = e.index
        },
        // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
        // swiper滑动结束，分别设置tabs和swiper的状态
        animationfinish(e) {
            this.current = e.detail.current
        },
        onswiperchange(e) {
            // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
            const index = e.target.current || e.detail.current
            this.tabsChange(index)
            // #endif
        }
    }
}
</script>

<style lang="scss" scoped>
.bg_box{
    background-color: #DFF7EF;
    z-index: 10080;
}
.swiper {
    flex: 1;
    height: 100%;
}
</style>
