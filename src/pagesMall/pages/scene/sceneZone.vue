<template>
    <view class="container">
        <z-paging ref="paging" v-model="dataList" @query="queryList" :defaultPageSize="10"
         :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
         :empty-view-img-style="{ width: '320rpx',height: '320rpx' }" @scroll="pagingScroll"
         safe-area-inset-bottom :loading-more-enabled="false"
        >
            <template #top>
                <view id="wrap"><customNavbar pageTitle="场景专区"></customNavbar></view>
            </template>
            <!-- <template #bottom><u-safe-bottom></u-safe-bottom></template> -->
            <sceneItem :info="headScene" />
            <u-sticky>
                <view class="tabox">
                    <u-tabs
                        :list="tabList"
                        @click="changeTab"
                        :current="tabCurrent"
                        :scrollable="true"
                        lineColor="#29C86F"
                        lineWidth="32rpx"
                        lineHeight="4rpx"
                        :itemStyle="{ height: '44px' }"
                        :inactiveStyle="{ fontSize: '28rpx', fontWeight: '400', color: '#1A1A1A' }"
                        :activeStyle="{ fontSize: '28rpx', fontWeight: 'bold', color: '#29C86F' }"
                    ></u-tabs>
                </view>
            </u-sticky>
            <view class="sceneli" :id="`toView${index + 1}`" v-for="(item,index) in dataList" :key="index">
                <sceneItem :info="item" />
            </view>
        </z-paging>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture.js"
import customNavbar from "@/components/custom-navbar/custom-navbar.vue"
import sceneItem from "./components/sceneItem.vue"
export default {
    components: { customNavbar, sceneItem },
    data() {
        return {
            dataList: [],
            tabList: [
                { id: '1', name: "全屋", jumpId: "toView1", top: 0 },
                { id: '2', name: "浴室/卫生间", jumpId: "toView2", top: 0 },
                { id: '3', name: "厨房", jumpId: 'toView3', top: 0 },
                { id: '4', name: "通道", jumpId: "toView4", top: 0 },
                { id: '5', name: "客厅", jumpId: "toView5", top: 0 },
                { id: '6', name: "卧室", jumpId: "toView6", top: 0 }
            ],
            tabCurrent: 0,
            headScene: {
                cover: getAssetsPic('/channel/scene/scene1.png'),
                isPlan: false,
                title: '家的每个角落，都是理想养老的模样',
                desc: `以安全，主导老人生活
                        以智慧，让家人更放心
                        以笑容，让老人晚年生活充满爱
                        ......`
            },
            sceneViewId: '',
            offsetBottom: 0 //锚点偏移量
        }
    },
    computed: {
        /** @returns {string} */
        getAssetsUrl() {
            return (url) => {
                return getAssetsPic(url)
            }
        }
    },
    onReady() {
        uni.createSelectorQuery()
        const query = uni.createSelectorQuery().in(this)
        query.select(`#wrap`).boundingClientRect(data => {
            this.offsetBottom = data.bottom + 50
        }).exec()
    },
    methods: {
        queryList() {
            this.$refs.paging.complete([
                {
                    cover: getAssetsPic('/channel/scene/scene2.png'),
                    isPlan: true,
                    title: '老人房全屋改造设计',
                    desc: `老房翻新层面，全包圆能充分遵照客户需求，以热忱的态度和专业的技术，为老年人们提供全方位的装修服务，改善老房的功能性和审美风格，打造出一个更加宜居的家。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene3.png'),
                    isPlan: true,
                    title: '浴室/卫生间定制与改造',
                    desc: `卫生间适老化改造可以针对老年人身体虚弱和行动不便的问题进行改善，并更换成安全防护产品，从而提高老年人的安全性。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene4.png'),
                    isPlan: true,
                    title: '厨房定制与改造',
                    desc: `合理规划和定制设计，可以改善厨房的功能性和美观性。提供厨房改造定制方案，包括充分利用空间、优化布局、选择合适的材料和设备以及定制设计等。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene5.png'),
                    isPlan: true,
                    title: '通道定制与改造',
                    desc: `对楼道进行适老化改造，我们能为老年人创造一个安全、便利和舒适的居住环境。合理设计照明、地面、扶手与栏杆，提供明显的安全标识和智能化设施。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene6.png'),
                    isPlan: true,
                    title: '客厅定制与改造',
                    desc: `客厅适老化设计改造，要从空间布局、色彩搭配、家具选择、安全设计、智能家居应用和健康环保等方面进行考虑和规划。让老人在家中更加安全，提高他们的生活质量。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene7.png'),
                    isPlan: true,
                    title: '卧室定制与改造',
                    desc: `小卧室想要空间大，还要做到对空间的充分利用。有的卧室带飘窗，可以对飘窗进行改造，做成储物柜形式，可以在上面休闲娱乐，底下可以收纳储物，好看又实用。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene8.png'),
                    isPlan: true,
                    title: '阳台定制与改造',
                    desc: `阳台改造为安全、舒适和多功能的空间,以满足老年人的日常活动需要，打造一个安全、舒适的适老化阳台，为老年人创造一个愉悦、放松的阳台环境。`
                },
                {
                    cover: getAssetsPic('/channel/scene/scene9.png'),
                    isPlan: true,
                    title: '玄关定制与改造',
                    desc: `玄关作为家庭出入口的重要过渡区域，通过选择适合老年人使用的地面材料、合理设置灯光、门廊设计、扶手和扶手栏杆、地面悬挂柜、门口防护等措施。`
                }
            ])
        },
        pagingScroll() {
            this.tabList.forEach((item, index) => {
                this.$u.getRect('#' + item.jumpId).then((rect) => {
                    if (rect.top <= 150 && rect.top >= 50) {
                        this.tabCurrent = index
                    }
                })
            })
        },
        changeTab(item) {
            this.sceneViewId = item.jumpId
            this.$refs.paging.scrollIntoViewById(item.jumpId, this.offsetBottom)
        }
    }
}
</script>

<style scoped lang="scss">
.tabox{
    width: 100vw;
    background-color: #F2F4F5;
    padding: 0 30rpx;
    box-sizing: border-box;
}
</style>
