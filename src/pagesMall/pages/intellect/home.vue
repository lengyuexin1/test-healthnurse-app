<template>
    <div class="container">
        <div class="mainbox">
            <Summary v-if="data.value1 === 0"/>
            <Package v-if="data.value1 === 1"/>
            <RoomDev v-if="data.value1 === 2"/>
            <Mine v-if="data.value1 === 3"/>
        </div>
        <div class="footbox">
            <TnTabbar v-model="data.value1" @change="name => data.value1 = name" active-color="#333333"
                      :icon-size="'40rpx'"
                      inactive-color="#6E7378">
                <!--                #ifdef MP-WEIXIN-->
                <TnTabbarItem v-for="(item, index) in data.tabList" :key="item.id" :text="item.name"
                              :icon="item.inactive" :active-icon="item.active"></TnTabbarItem>
                <!--                #endif-->
                <!--                #ifdef APP-PLUS || H5-->
                <TnTabbarItem v-for="(item, index) in data.tabList" :key="item.id" :text="item.name"
                              :icon="'/src' + item.inactive" :active-icon="'/src' + item.active"></TnTabbarItem>
                <!--                #endif-->
            </TnTabbar>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Summary from './summary.vue'
import Package from './package.vue'
import RoomDev from '@/pagesTuya/pages/wisdom/roomDev.vue'
import Mine from './mine.vue'
import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
import TnTabbarItem from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue'
import { onMounted, reactive } from 'vue'

interface TabList {
    id: string
    name: string
    active: string
    inactive: string
}

interface Data {
    value1: number | string
    tabList: TabList[]
}

onMounted(() => {
    // PlatformManage.isRequireLogin().then((isRequireLogin) => {
    //     if (isRequireLogin) {
    //         uni.showToast({
    //             title: '登录失效,请重新登录！', icon: 'none'
    //         })
    //         setTimeout(() => {
    //             gotoLogin({})
    //         }, 1000)
    //         return
    //     }
    // })
})

const data = reactive<Data>({
    value1: 0,
    tabList: [
        {
            id: '001',
            name: '智护帮',
            active: '/pagesMall/static/tabimg/inte-tab1.svg',
            inactive: '/pagesMall/static/tabimg/inte-in-tab1.svg'
        },
        {
            id: '002',
            name: '全屋智能',
            active: '/pagesMall/static/tabimg/inte-tab2.svg',
            inactive: '/pagesMall/static/tabimg/inte-in-tab2.svg'
        },
        {
            id: '003',
            name: '智慧椿家',
            active: '/pagesMall/static/tabimg/inte-tab3.svg',
            inactive: '/pagesMall/static/tabimg/inte-in-tab3.svg'
        },
        {
            id: '004',
            name: '我的',
            active: '/pagesMall/static/tabimg/inte-tab4.svg',
            inactive: '/pagesMall/static/tabimg/inte-in-tab4.svg'
        }
    ]
})
const click1 = () => {
    console.log('click1')
}
const change1 = (e) => {
    console.log('change1', e)
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 设置容器高度为视口高度 */
}

.mainbox {
    flex-grow: 1;
    /* 使子元素填满剩余空间 */
}

.footbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>
