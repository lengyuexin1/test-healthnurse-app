<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto-show-back-to-top="true" :auto="true" :fixed="true"
            @query="queryList" :defaultPageSize="10" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~" :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <PageTopbg :zIndex="-1" :bgstyle="'background: linear-gradient( 180deg, #DFF7EF 0%, #F2F3F5 100%);'"
                    :addheight="400"></PageTopbg>

                <view class="navbar_box"
                    :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }">
                        <view class="back_icon" @click="goback">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true" />
                            <!-- #ifdef MP-WEIXIN -->
                            <view class="title_text">适品囤</view>
                            <!-- #endif -->
                        </view>

                        <!-- #ifdef APP-PLUS || H5 -->
                        <view class="title_text">适品囤</view>
                        <!-- #endif -->

                        <view class="appChat_icon">
                            <image class="appChat_img" :src="getAssetsUrl('/leyou/newpagemenu/chat.png')"
                                mode="scaleToFill" />
                            <view class="appChat_text">客服</view>
                        </view>
                    </view>
                </view>

                <view class="top_box">
                    <view class="home_top_box">
                        <view class="change_city_box" @click="changecity">
                            <view class="city_name">商城</view>
                            <!-- <TnIcon name="down" color="#646464" size="26" bold offset-top="4"></TnIcon> -->
                        </view>
                        <view class="inp_box" @click="tosearch">
                            <view class="left_box">
                                <view class="left_icon_box">
                                    <view class="scan_box">
                                        <image class="scan_img" :src="getAssetsUrl('/leyou/newpagemenu/scan_icon.svg')"
                                            mode="scaleToFill" />
                                    </view>
                                    <TnIcon name="search" color="#999999" size="32" bold></TnIcon>
                                </view>
                                <view class="inp_left">
                                    <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500"
                                        :vertical="true">
                                        <swiper-item v-for="(item, index) in data.noticeData" :key="index">
                                            <view class="swiper_item_item">{{ item }}</view>
                                        </swiper-item>
                                    </swiper>
                                </view>
                            </view>

                            <view class="right_btn">搜索</view>

                        </view>
                        <!-- 信息盒子 -->
                        <view class="top_left">
                            <view class="more_icon" @click="changebubble">
                                <TnIcon name="more-horizontal" color="#646464" size="54" bold></TnIcon>
                            </view>
                        </view>
                    </view>
                </view>

            </template>

            <view class="content_page">
                <view class="live_swiper" v-if="showBk.includes(1) && swiperList.length > 0">
                    <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" :vertical="false"
                        @change="liveswiperChange">
                        <swiper-item class="swiper_item" v-for="(item, index) in swiperList" :key="item.id">
                            <!-- @click="liveList(item)" -->
                            <image class="live_swiper_img" :src="item.icon" mode="aspectFill" />
                        </swiper-item>
                    </swiper>
                    <view class="swiper_sign_box">
                        <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }"
                            v-for="(signItem, signIndex) in data.swiperList.length" :key="signIndex"></view>
                    </view>
                </view>

                <view class="deCionBox">
                    <view class="Tabs_deitem" v-for="(item, index) in tabsData" :key="index"
                        @click="gotoColmDetail(index, item)">
                        <image class="left_menu_img" :src="item.icon" mode="scaleToFill" />
                        <view class="iconText">{{ item.name }}</view>
                    </view>
                </view>

                <view class="activity_List">
                    <view class="activity_item" @tap="clickActivityList(1)">
                        <view class="top_text_box">
                            <text class="red_text">适品</text>
                            <text>老博会</text>
                        </view>
                        <view class="item_text">好物好逛</view>
                        <view class="activity_bottom">
                            <image class="right_img first_img" :src="getAssetsUrl('/leyou/logo/leyou_logo.png')"
                                mode="scaleToFill" />
                        </view>
                    </view>

                    <view class="activity_item" @tap="clickActivityList(2)">
                        <view class="top_text_box">
                            <text>直播</text>
                            <text class="red_text">精选</text>
                        </view>
                        <view class="item_text">天天有折</view>
                        <view class="activity_bottom">
                            <image class="right_img" :src="getAssetsUrl('/leyou/goods/liveicon.png')" mode="scaleToFill" />
                        </view>
                    </view>

                    <view class="activity_item" @tap="clickActivityList(5)">
                        <view class="top_text_box">
                            <text class="red_text">讨论</text>
                            <text>区</text>
                        </view>
                        <view class="item_text">你来点评</view>
                        <view class="activity_bottom">
                            <image class="right_img" :src="getAssetsUrl('/leyou/goods/dp_icon.svg')" mode="scaleToFill" />
                        </view>
                    </view>
                </view>

                <!-- 甄选推荐 -->
                <view v-if="showBk.includes(4)">
                    <NewZhen :newZhen="zhenList"></NewZhen>
                </view>

                <!-- 专区 -->
                <!-- <view v-if="showBk.includes(7)">
                    <onlyFor :allInList="allInList"></onlyFor>
                </view> -->

                <!-- 新品 -->
                <view v-if="showBk.includes(5)">
                    <newGoods :newGoodList="newGoodList"></newGoods>
                </view>

                <!-- 爆品精选 -->
                <view v-if="showBk.includes(6)">
                    <crazy :orgSelect="orgSelect"></crazy>
                </view>

                <!-- tab -->
                <view class="fliex_box">
                    <view class="Nav_box">
                        <view class="Nav_scoll_box">
                            <view class="Nav_item" :class="{ 'have_right': NavList.length == (index + 1) }"
                                v-for="(item, index) in NavList" :key="index" @click="changeNav(item)">
                                <view class="item_name">
                                    <view> {{ item.name }} </view>
                                    <view class="isSelect" v-if="NavId == item.id"></view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="more_icon" @click="openBotMun">
                        <TnIcon name="down" size="32rpx" color="#333"></TnIcon>
                    </view>
                </view>

                <!-- 新人福利 -->
                <view class="newPople" v-if="showBk.includes(3)">
                    <!-- 活动1 -->
                    <NewcomerWelfare v-if="dataObj.type !== 3" :dataObj="dataObj"></NewcomerWelfare>
                    <!-- 活动2 -->
                    <!-- <NewcomerTwo :dataObjTwo="dataObjTwo"></NewcomerTwo> -->
                    <!-- 活动三 -->
                    <NewcomerTre v-if="dataObj.type == 3" :dataObjTre="dataObj"></NewcomerTre>
                </view>

                <view class="content_right_list" :class="{ 'not_height': data.dataList.length == 0 }">
                    <!-- :navid="data.NavId" -->
                    <WaterfallsFlow :wfList="data.dataList" :navid="NavId" @waterItem="clickwaterItem">
                    </WaterfallsFlow>
                </view>

            </view>
            <view class="page_bg"></view>

            <BottomMenu @upCalik="upCalik" :NavList="NavList" :current="NavId" v-model="showBottomMenu"></BottomMenu>

            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import NewcomerWelfare from '../platform/components/newcomerWelfare.vue'
import NewcomerTre from '../platform/components/NewcomerTre.vue'
import NewZhen from '../platform/components/NewZhen.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import newGoods from '../platform/components/newGoods.vue'
import crazy from '../platform/components/crazy.vue'
import BottomMenu from "../platform/components/channelSheet.vue"
import onlyFor from '../platform/components/onlyFor.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { moneyFilter } from "@/common/filters"
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from '../platform/components/WaterfallsFlow.vue'
import { gotoRegister, gotogoodsDetail, gotogoodsRanking } from '@/routes/goods-routes'
import { gotoCitychange, invitationDetail } from '@/routes/user-routes'
import { gotoServiceStore, toInnerPage, gotosearch, gotoShopDetail, gotoserviceLnnerPage, gotoServiceExpo, gotoLiveSelection } from '@/routes/service-routes'
import { PlatformManage } from '@bc/sys'
import { gotoLogin } from "@/routes/public-routes"
import { setPageBank, bannerList, columnList, columnDetail, productList, activeDetail } from "@/api/setite-api"
import { gotoZone, gotoallClassPage } from "@/routes/active-routes"

interface Data {
    titleTop: number
    titleRight: number
    sBarHeight: number
    dataList: any,
    activityList: any,
    nowCity: string,
    noticeData: any,
    swiperIndex: number
    swiperList: any

}
const data = reactive<Data>({
    titleTop: 0,
    titleRight: 0,
    sBarHeight: 0,
    dataList: [],
    activityList: [
        { id: 1, name: '品牌馆/旗舰店', rightIcon: '/leyou/logo/leyou_logo.png', topimg: "/leyou/goods/laobo.svg" },
        { id: 2, name: '好逛', rightIcon: '/leyou/goods/liveicon.png', topimg: "/leyou/goods/livetitle.svg" },
        { id: 3, name: '排行榜单', rightIcon: '/leyou/goods/goodshop-icon.svg', topimg: "/leyou/goods/Comment.svg" },
        { id: 4, name: '新人福利', rightIcon: '/leyou/goods/Signin-icon.svg', topimg: "/leyou/goods/Signin.svg" },
    ],
    nowCity: "广州",
    noticeData: [
        '休闲/玩乐',
    ],
    swiperIndex: 0,
    swiperList: [],
})
const tabsData: any = ref([
    { id: '360', icon: getAssetsPic('/fare/home-more.png'), name: '全部服务', flagCode: 1 }
])
const showBk: any = ref([])
const zhenList: any = ref([])
const orgSelect: any = ref([])
const newGoodList: any = ref([])
const showBottomMenu = ref(false)
const NavList: any = ref([
    { id: 1, name: '推荐' }
])
const NavId = ref(1)

interface Events {
    (e: 'showServiceMenu'): void,

}
const emit = defineEmits<Events>()

const swiperList: any = ref([])
const dataObj: any = ref({})
const bcNotify = ref()
const openBotMun = () => {
    showBottomMenu.value = !showBottomMenu.value
}

const upCalik = (item: any, index: number) => {
    console.log(item.id, index)
    NavId.value = item.id;
    paging.value.reload()
}

const allInList: any = ref([])
const getSetIds = (num: number) => {
    setPageBank(num).then(res => {
        allInList.value = res.recordList.filter((item: any) => item.moduleId == 7)
        console.log(allInList.value, '等于7');
        if (allInList.value.length > 0) {
            allInList.value.forEach((element: any) => {
                console.log(element);
                // 业务模块专区
                // channeCatelList(element, element.categoryIds)
            })
        }
        if (!res.recordList) {
            return
        }
        console.log(res.recordList, '所有的数组')
        healthMyData(res.recordList)

    })
}

const gotoColmDetail = (index: any, item: any) => {
    if (item.id == '360') {
        gotoallClassPage(3)
    } else {
        // 跳转微页面
        return gotoZone(item.id, item.name)
    }
}

    const channeCatelList = (item: any, id: any) => {
        const sendda = {
            pageNumber: 1,
            pageSize: 10,
            query: {
                categoryIds: id
            }
        }
        productList(sendda).then(res => {
            console.log('专区', res)
            item.dataList = res.data.length > 0 ? res.data.slice(0, 2) : res.data
            console.log(allInList.value)
        })
    }

    onMounted(() => {
        getSetIds(3)
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

        console.log('7891011,data.titleRight', data.titleRight)
        getCity()

    })

    const healthMyData = (list: any) => {
        showBk.value = []
        if (list.length < 1) {
            return
        }
        list.forEach((element: any) => {
            showBk.value.push(element.moduleId)
            // banner图
            if (element.moduleId == 1) {
                getBannerList(element.dataIds)
            }
            // 导航栏
            if (element.moduleId == 2) {
                getTabbar(element.dataIds)
            }
            // 新人活动
            if (element.moduleId == 3) {
                activeDetail(element.dataIds[0]).then(res => {
                    dataObj.value = res
                })
            }
            // 产品推荐
            if (element.moduleId == 4) {
                channelList(element.dataIds, 4)
            }
            // 新品上市
            if (element.moduleId == 5) {
                channelList(element.dataIds, 5)
            }
            // 爆品精选
            if (element.moduleId == 6) {
                channelList(element.dataIds, 6)
            }

            // 文字导航
            if (element.moduleId == 8) {
                NavList.value = [
                    { id: 1, name: '推荐' },
                    ...element.navbarList
                ]
                getTextList(1)
            }
        })
    }

    // 请求第一个tab
    const getTextList = (cateIndex: number) => {
        if (cateIndex == 1) {

        } else {

        }
    }

    const channelList = (id: any, num: number) => {
        const sendda = {
            pageNumber: 1,
            pageSize: 10,
            query: {
                ids: id
            }
        }
        productList(sendda).then(res => {
            if (num == 4) {
                zhenList.value = res.data
            }
            if (num == 5) {
                newGoodList.value = res.data
            }
            if (num == 6) {
                orgSelect.value = res.data
            }
        })
    }

    const getTabbar = (data: any) => {
        const dares = {
            ids: data
        }
        columnList(dares).then(res => {
            tabsData.value.unshift(...res)
        })
    }

    const getBannerList = (data: any) => {
        const dares = {
            ids: data
        }
        bannerList(dares).then(res => {
            swiperList.value = res
        })
    }

    const getCity = () => {

        PlatformManage.getToken().then((res: any) => {
            console.log('获取城市', res.city);

            data.nowCity = res.city ? res.city : '广州'
        })
    }

    const getAssetsUrl = computed(() => (src: string) => {
        return getAssetsPic(src)
    })


    const paging = ref()

    const queryList = async (pageNumber: number, pageSize: number) => {
        const data = {
            pageNumber,
            pageSize: 10,
            query: {
                categoryIds: NavId.value == 1 ? [] : [NavId.value]
            }
        }
        productList(data).then((res) => {
            paging.value.complete(res.data)
        })
    }


    const clickActivityList = (item: any) => {
        console.log('item1111', item);
        // 邀请好友
        // item.id == 1 && invitationDetail()
        // 优选店铺
        // item.id == 2 && gotoGoodsPerferShop()
        PlatformManage.isRequireLogin().then((isRequireLogin) => {
            if (isRequireLogin) {
                bcNotify.value.show('登录失效,请重新登录')
                setTimeout(() => {
                    gotoLogin({})
                }, 1000)
                return
            }
            item == 1 && gotoServiceExpo();
            item == 2 && gotoLiveSelection();
            item == 3 && gotogoodsRanking();
            item == 4 && gotoRegister();
            item == 5 && gotodiscussListPage()
        })
    }

    const changeNav = (item: any) => {
        if (item.id == 11) {
            // 检查登录状态
            PlatformManage.isRequireLogin().then((isRequireLogin) => {
                if (isRequireLogin) {
                    bcNotify.value.show('登录失效,请重新登录')
                    setTimeout(() => {
                        gotoLogin({})
                    }, 1000)
                    return
                }
            })
        }
        NavId.value = item.id;
        (paging.value as any).reload()
    }

    const changebubble = () => {
        emit('showServiceMenu')
    }

    const changecity = () => {
        gotoCitychange()
    }
    const tosearch = () => {
        gotosearch()
    }

    const clickwaterItem = (item: any) => {
        console.log('item', item);
        // 检查登录状态
        PlatformManage.isRequireLogin().then((isRequireLogin) => {
            if (isRequireLogin) {
                bcNotify.value.show('登录失效,请重新登录')
                setTimeout(() => {
                    gotoLogin({})
                }, 1000)
                return
            }
            gotogoodsDetail(item.id)
        })
    }

    // 退出页面
    const goback = () => {
        uni.navigateBack();
    }

    const liveswiperChange = (e: any) => {
        data.swiperIndex = e.detail.current
    }

    const liveList = (item: any) => {
        console.log('item', item);
    }

    defineExpose({
        getCity,
    })

</script>

<style lang="scss" scoped>
.navbar_box {
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;

    // #endif
    .top_box {
        padding: 10rpx;
        padding-left: 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        // #ifdef APP-PLUS || H5
        width: 100%;
        height: auto !important;

        // #endif
        .title_text {
            font-weight: 500;
            font-size: 34rpx;
            color: #333333;
            margin-left: 16rpx;
        }

        .appChat_icon {
            width: 70rpx;
            height: 70rpx;
            position: relative;
            border-radius: 50%;
            background: #fff;

            .appChat_img {
                width: 100%;
                height: 100%;
            }

            .appChat_text {
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 58rpx;
                height: 24rpx;
                background: #EA3E1A;
                border-radius: 14rpx;
                text-align: center;
                line-height: 24rpx;
                font-weight: 400;
                font-size: 16rpx;
                color: #FFFFFF;
                transform: translate(-50%, 0rpx);
            }
        }
    }

    .back_icon {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
    }
}

.top {
    width: 100%;
}

.top_box {
    padding: 20rpx 30rpx;
    padding-bottom: 10rpx;
    box-sizing: border-box;

    .top_logo_img {
        width: 112rpx;
        height: 36rpx;
    }

    .home_top_box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .change_city_box {
            display: flex;
            align-items: center;

            .city_name {
                font-size: 36rpx;
                color: #333333;
            }
        }

        .top_left {
            display: flex;
            align-items: center;
            position: relative;
        }

        .inp_box {
            width: 490rpx;
            background: #fff;
            box-sizing: border-box;
            padding: 10rpx 20rpx;
            padding-right: 10rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 50rpx;
            position: relative;

            .left_box {
                display: flex;
                align-items: center;

                .left_icon_box {
                    display: flex;
                    align-items: center;

                    .scan_box {
                        width: 40rpx;
                        height: 40rpx;
                        padding-right: 12rpx;
                        margin-right: 12rpx;
                        border-right: 2rpx solid #D9D9D9;

                        .scan_img {
                            width: 100%;
                            height: 100%;
                        }
                    }


                }

                .inp_left {
                    // display: flex;
                    // align-items: center;
                    margin-left: 10rpx;
                    box-sizing: border-box;
                    width: 50%;
                    height: 48rpx;

                    .swiper {
                        width: 100%;
                        height: 100%;

                        .swiper_item_item {
                            line-height: 52rpx;
                            font-size: 26rpx;
                            font-weight: 400;
                            color: #A8A8A8;
                        }
                    }

                }
            }

            .right_btn {
                padding: 10rpx 16rpx;
                box-sizing: border-box;
                background: linear-gradient(90deg, #FF7104 0%, #EB2D2D 100%);
                border-radius: 28rpx;
                font-size: 24rpx;
                color: #FFFFFF;
                font-weight: 400;
            }


            .search_btn {
                width: 84rpx;
                height: 44rpx;
                line-height: 44rpx;
                text-align: center;
                background: #EA3E1A;
                border-radius: 24rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #FFFFFF;
            }
        }

    }
}

.activity_List {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    background: linear-gradient(180deg, #D4F1D4 0%, #C2E2C2 100%);
    border-radius: 24rpx;
    padding: 20rpx;
    box-sizing: border-box;

    .activity_item {
        width: 210rpx;
        // height: 120rpx;
        padding: 16rpx;
        padding-bottom: 8rpx;
        padding-right: 8rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
        background: #fff;

        .item_text {
            font-weight: 400;
            font-size: 20rpx;
            color: #333333;
            white-space: nowrap;
        }

        .activity_bottom {
            display: flex;
            justify-content: flex-end;

            .right_img {
                width: 48rpx;
                height: 48rpx;

                &.first_img {
                    width: 36rpx;
                    height: 36rpx;
                    margin-top: 12rpx;
                }
            }
        }

        .top_text_box {
            font-size: 28rpx;
            color: #333333;
            font-weight: 600;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            .red_text {
                color: #EA3E1A;
            }
        }

    }
}

.fliex_box {
    position: relative;
    margin-top: 30rpx;

    .Nav_box {
        box-sizing: border-box;
        overflow-x: scroll;
        margin-bottom: 12rpx;

        .Nav_scoll_box {
            display: flex;
            align-items: center;
            width: fit-content;

            .Nav_item {
                flex-shrink: 0;
                margin-right: 48rpx;
                height: 58rpx;

                &.have_right {
                    padding-right: 100rpx;
                    margin-right: 148rpx;
                    box-sizing: border-box;
                }

                .item_name {
                    flex-shrink: 0;
                    font-size: 32rpx;
                    color: #666666;
                    font-weight: 400;
                    position: relative;

                    .isSelect {
                        position: absolute;
                        bottom: -12rpx;
                        left: 50%;
                        transform: translate(-50%, 0);
                        background: #29C86F;
                        height: 6rpx;
                        width: 36rpx;
                        border-radius: 6rpx;
                    }
                }

            }
        }

    }

    .more_icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 88rpx;
        height: 100%;
        background: #F2F3F5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.content_right_list {
    min-height: 800rpx;

    &.not_height {
        min-height: 0;
    }
}

.page_bg {
    width: 100%;
    height: 88rpx;
}

.content_page {
    padding: 20rpx;
    padding-top: 0rpx;
    box-sizing: border-box;

    .live_swiper {
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        width: 718rpx;
        // height: 280rpx;
        margin: auto;
        padding-top: 10rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;

        .swiper {
            width: 100%;
            height: 144rpx;

            .swiper_item {
                width: 100%;
                height: 100%;
                position: relative;

                .live_swiper_img {
                    width: 100%;
                    height: 100%;
                    border-radius: 12rpx;
                    overflow: hidden;
                    // border: 2rpx solid red;
                }

                .live_box {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius: 0rpx 16rpx 0rpx 16rpx;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    font-size: 20rpx;
                    color: #FFFFFF;

                    .live_left_box {
                        display: flex;
                        align-items: center;
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                        background: #EA3E1A;
                        border-radius: 0rpx 8rpx 0rpx 0rpx;

                        .live_img {
                            width: 16rpx;
                            height: 16rpx;
                            margin-right: 4rpx;
                        }
                    }

                    .live_number_box {
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                    }

                }
            }
        }

        .swiper_sign_box {
            position: absolute;
            bottom: 12rpx;
            left: 50%;
            transform: translate(-50%, 0rpx);
            display: flex;
            align-items: center;

            .sign_item {
                width: 12rpx;
                height: 12rpx;
                background: #FFFFFF;
                opacity: 0.3;
                margin-left: 8rpx;
                border-radius: 50%;

                &.is_sign {
                    opacity: 1;
                }
            }
        }

    }

}

.deCionBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20rpx 0;
    background: #fff;
    padding: 26rpx 20rpx;
    border-radius: 16rpx;

    .Tabs_deitem {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30rpx;

        .left_menu_img {
            width: 80rpx;
            height: 80rpx;
            margin-bottom: 20rpx;
            border-radius: 50%;
        }

        .iconText {
            font-size: 24rpx;
            color: #333333;
        }
    }
}

.towPro {
    height: 676rpx;
}
</style>
