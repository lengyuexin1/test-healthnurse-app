<template>
    <z-paging ref="paging" v-model="data.dataList" :auto="true" :fixed="false" @query="queryList" @scroll="scrollPage"
              :defaultPageSize="6" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="还没有数据哦~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto-show-back-to-top="true"
              back-to-top-bottom="180rpx" :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
              :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }">

        <template #top>
            <view class="author" v-if="(props.channelId == 1 && data.attentionList.length != 0)">
                <view class="author_item" v-for="item in data.attentionList" :key="item.followId">
                    <view class="author_img_box" @click="clickauthor(item)">
                        <image class="author_img"
                               :src="item.accountId == 999 ? getAssetsUrl(item.followImage) : item.followImage"
                               mode="scaleToFill"/>
                    </view>
                    <view class="author_text">
                        {{ item.followName }}
                    </view>
                </view>
            </view>
        </template>

        <!-- 直播间轮播盒子 -->
        <view class="top_bg_box">
            <view class="live_swiper" v-if="swiperList.length != 0">
                <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" :vertical="false"
                        @change="liveswiperChange">

                    <swiper-item class="swiper_item" v-for="(item, index) in swiperList" :key="item.id">
                        <image class="live_swiper_img" :src="item.icon" mode="scaleToFill" @click="liveList(item)"/>
                        <!-- index == 0 -->
                        <view class="live_box"
                              v-if="((item.moduleType == 1 && liveType.channel) || (item.moduleType == 2 && liveType.course) || (item.moduleType == 3 && liveType.salon))">
                            <view class="live_left_box">
                                <BarPlaying bgColor="#FFFFFF"></BarPlaying>
                                <view>直播中</view>
                            </view>
                            <view class="live_number_box" v-if="false">
                                {{ item }} 人观看
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="swiper_sign_box">
                    <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }"
                          v-for="(signItem, signIndex) in swiperList.length" :key="signIndex"></view>
                </view>
            </view>
        </view>
        <!-- 首页列表 -->
        <view class="deCionBox">
            <view class="Tabs_deitem" v-for="(item, index) in tabsData" :key="index"
                  @click="gotoColmDetail(index, item)">
                <image class="left_menu_img" :src="item.icon" mode="scaleToFill"/>
                <view v-if="item.textImg">
                    <image class="left_text_img" :src="item.textImg" mode="scaleToFill"></image>
                </view>
                <view v-else class="iconText">{{ item.name }}</view>
            </view>
        </view>
        <!-- 甄选推荐 -->
        <view v-if="showBk.includes(4)">
            <NewZhen :newZhen="zhenList"></NewZhen>
        </view>

        <!-- 专区 -->
        <view v-if="showBk.includes(7)">
            <onlyFor :allInList="allInList"></onlyFor>
        </view>

        <!-- 新品 -->
        <view class="neds" v-if="showBk.includes(5)">
            <view class="newTitle">新品上市</view>
            <view class="newUp">
                <view class="everyItem" v-for="(item, index) in newGoodList" :key="index">
                    <image class="towPro_img" :src="item.thumb" mode="scaleToFill"/>
                    <view class="img_right">
                        <view>
                            <view class="text_tit">{{ item.name }}</view>
                            <view class="text_small">{{ item.desc }}</view>
                        </view>
                        <view class="price_text">
                            <view class="realPrice">￥{{ moneyFilter(item.price) }} <span class="piz">起</span>
                            </view>
                            <view class="nowBuy" @click="gotoDetail(item)">立即购买</view>
                        </view>
                    </view>
                </view>
            </view>
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
                            <view> {{ item.name }}</view>
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
        <view class="newPople" v-if="showBk.includes(999)">
            <!-- 活动1 -->
            <NewcomerWelfare :dataObj="dataObj" v-if="dataObj.type == 6"></NewcomerWelfare>
            <!-- v-if="dataObj.type !== 3" -->
            <!-- 活动2 -->
            <!-- <NewcomerTwo v-if="dataObj.type == 2" :dataObjTwo="dataObjTwo"></NewcomerTwo> -->
            <!-- 活动三 -->
            <!-- <NewcomerTre v-if="dataObj.type == 3" :dataObjTre="dataObj"></NewcomerTre> -->
        </view>
        <!-- 瀑布列表 -->
        <view class="content_right_list" :class="{ 'not_height': data.dataList.length == 0 }">
            <WaterfallsFlow :wfList="data.dataList" :navid="NavId" @waterItem="clickwaterItem"></WaterfallsFlow>
        </view>

        <BottomMenu @upCalik="upCalik" :NavList="NavList" :current="NavId" v-model="showBottomMenu"></BottomMenu>

        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
</template>

<script setup lang="ts">
import onlyFor from './onlyFor.vue'
import crazy from './crazy.vue'
import { recomLikeList, servicelist } from "@/api/goods-api"
import { moneyFilter } from "@/common/filters"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { computed, defineExpose, onMounted, reactive, ref } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import NewZhen from './NewZhen.vue'
import NewcomerWelfare from './newcomerWelfare.vue'
import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from './WaterfallsFlow.vue'
import BarPlaying from '@/components/barPlaying/barPlaying.vue'
import { gotoLogin } from "@/routes/public-routes"
import { gotoChannelFollow } from '@/routes/create-routes'

import { gotoAgency, gotoLiveList, gotoHomeService, gototest } from '@/routes/user-routes'
import { activeDetail, bannerList, columnList, setPageBank } from "@/api/setite-api"
import { gotoServiceStore, gotoserviceDetail, toInnerPage } from '@/routes/service-routes'
import { gotoallClassPage, gotoCenterChanges, gotoZone } from '@/routes/active-routes'
import BottomMenu from "./channelSheet.vue"
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoPersonnel } from "@/routes/wisdom-routes"

interface Data {
    dataList: any,
    categoryId: string | number,
    followList: any,
    query: any,
    followId: string,
    sonTabIndex: number,
    firstgetaddress: boolean,
    lat: number,
    lng: number,
    swiperIndex: number,
    attentionList: any
}

const data = reactive<Data>({
    dataList: [],
    categoryId: 2,
    followList: [],
    query: {},
    followId: '',
    sonTabIndex: 1,
    firstgetaddress: true,
    lat: 0,
    lng: 0,
    swiperIndex: 0,
    attentionList: []
})

const showBottomMenu = ref(false)
const orgSelect: any = ref([])
const newGoodList: any = ref([])
const showBk: any = ref([])
const zhenList: any = ref([])
const swiperList: any = ref([])
const NavList: any = ref([
    { id: 1, name: '推荐' }
])
const NavId = ref(1)
const dataObj: any = ref({})
const dataObjTwo: any = ref({})
const tabsData: any = ref([
    {
        id: '88',
        icon: getAssetsPic('/fare/v2/zhihui.png'),
        name: '智慧康护',
        flagCode: 1,
        textImg: getAssetsPic('/fare/v2/zhtext.svg')
    },
    { id: '2', icon: getAssetsPic('/fare/v2/home_icon_heal.png'), name: '到家健康', flagCode: 1 },
    { id: '5', icon: getAssetsPic('/fare/v2/gre-cai.png'), name: '到店健康', flagCode: 1 },
    { id: '8', icon: getAssetsPic('/fare/v2/home_icon_jigou.png'), name: '找机构', flagCode: 1, templateId: 122 },
    { id: '360', icon: getAssetsPic('/fare/home-more.png'), name: '全部服务', flagCode: 1 }
    // { id: '1', icon: getAssetsPic('/fare/home-more.png'), name: '日志test', flagCode: 1 }
])

interface Props {
    channelId: number,
    rankType: number,
    liveType: any,

}

const props = defineProps<Props>()

const upCalik = (item: any, index: number) => {
    console.log(item.id, index)
    NavId.value = item.id
    paging.value.reload()
    tabCats.value = item.categoryIds
    queryList(1, 6)
}

const gotoColmDetail = (index: any, item: any) => {
    if (item.flagCode) {
        switch (item.id) {
            case '360':
                gotoallClassPage(1)
                break
            case '2':
                gotoHomeService({})
                break
            case '88':
                gotoPersonnel()
                break
            case '5':
                gotoAgency()
                break
            case '8':
                toInnerPage({ templateId: item.templateId, id: item.id })
                break
            case '1':
                console.log(123)
                gototest()
                break
            default:
                break
        }
        // 跳转默认页
        // return gotoWisdom()

    }
    else {
        // 跳转微页面

        return gotoZone(item.columnIds[0], item.name)
    }
}

const openBotMun = () => {
    showBottomMenu.value = !showBottomMenu.value
}

const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                title: '登录失效,请重新登录！', icon: 'none'
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoserviceDetail(item.id)
    })
}

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

interface Events {
    (e: 'showLifeMenu'): void,

    (e: 'hideNav', val: boolean): void,

    (e: 'changeNav', index: number): void,

    (e: 'changeTabbarTop', val: boolean): void,
}

const emit = defineEmits<Events>()

onMounted(() => {
    getSetIds(1)
})

const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {
    const data = {
        pageNumber,
        pageSize: 10,
        query: {
            categoryIds: NavId.value == 1 ? [] : tabCats.value
        }
    }
    recomLikeList(data).then((res) => {
        paging.value.complete(res.data)
    })
}

const tabCats = ref([])
const changeNav = (item: any) => {
    tabCats.value = []
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
    console.log(item)

    NavId.value = item.id
    tabCats.value = item.categoryIds
    // (paging.value as any).reload()
    queryList(1, 6)
}

const allInList: any = ref([])
const getSetIds = (num: number) => {
    setPageBank(num).then(res => {
        allInList.value = res.recordList.filter((item: any) => item.moduleId == 7)
        console.log(allInList.value, '等于7')
        if (allInList.value.length > 0) {
            allInList.value.forEach((element: any) => {
                console.log(element)
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
            tabsData.value.unshift(...element.navbarList)
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

            if (element.activityIds.length > 0) {
                showBk.value.push(999)
                activeDetail(element.activityIds[0]).then(res => {
                    dataObj.value = res
                })
            }
        }
    })
}

const channelList = (id: any, num: number) => {
    const sendda = {
        pageNumber: 1,
        pageSize: 10,
        query: {
            ids: id
        }
    }
    servicelist(sendda).then(res => {
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

const channeCatelList = (item: any, id: any) => {
    const sendda = {
        pageNumber: 1,
        pageSize: 10,
        query: {
            categoryIds: ['1722865966613078018'] || id
        }
    }
    servicelist(sendda).then(res => {
        console.log('专区', res)
        item.dataList = res.data.length > 0 ? res.data.slice(0, 2) : res.data
        console.log(allInList.value)
    })
}

// 请求第一个tab
const getTextList = (cateIndex: number) => {
    if (cateIndex == 1) {
    }
    else {
    }
}

const getBannerList = (data: any) => {
    const dares = {
        ids: data
    }
    bannerList(dares).then(res => {
        swiperList.value = res
    })
}

const scrollPage = (e: any) => {
    if (e.detail.scrollTop > 160) {
        emit('changeTabbarTop', false)
    }
    else {
        emit('changeTabbarTop', true)
    }
}

const bcNotify = ref()

// 页面刷新
const pagingReload = (val: boolean = false) => {

    if (val) {
        paging.value && (paging.value as any).refresh()
    }
    else {
        paging.value && (paging.value as any).reload()
        // (paging.value as any).reload(true)
    }

}

const clickwaterItem = (item: any) => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoserviceDetail(item.id)
        // item.type == 3 && gotoarticledetails({
        //     id: item.id
        // })
        // item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
        // item.type == 1 && gotoarticledetails({ id: item.id })
    })
}

const liveswiperChange = (e: any) => {
    data.swiperIndex = e.detail.current
    // console.log('swiper e',e);
}

const liveList = (item: any) => {
    console.log('item', item)
    if (item.type == 1) {
        gotoserviceDetail(item.dataId)
    }
    if (item.type == 2) {
        gotogoodsDetail(item.dataId)
    }
    else {
        uni.navigateTo({
            url: item.dataUrl
        })
    }
}

const clickauthor = (item: any) => {
    gotoChannelFollow()
}

defineExpose({
    pagingReload
})


</script>

<style lang="scss" scoped>
.top_bg_box {
    background: #fff;
    // padding-bottom: 18rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    margin: 14rpx 20rpx 0 20rpx;

    .live_swiper {
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        // width: 730rpx;
        height: 200rpx;
        margin: auto;
        padding-top: 10rpx;
        box-sizing: border-box;

        // margin-bottom: 26rpx;
        .swiper {
            width: 100%;
            height: 100%;

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

.author {
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 22rpx 26rpx;
    padding-bottom: 44rpx;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 2rpx solid #F2F2F2;

    .author_item {
        width: 110rpx;
        height: 104rpx;
        margin-right: 18rpx;

        .author_img_box {
            margin-bottom: 10rpx;
            display: flex;
            align-items: center;
            justify-content: center;

            .author_img {
                width: 92rpx;
                height: 92rpx;
                border-radius: 50%;

                &.click_author {
                    border: 4rpx solid #29C86F;
                    box-sizing: border-box;
                }
            }
        }

        .author_text {
            text-align: center;
            font-size: 26rpx;
            color: #333333;
            width: 100%;
            white-space: nowrap;
            /*强制一行内显示*/
            overflow: hidden;
            /*溢出隐藏*/
            text-overflow: ellipsis;
            /*超出部分现实省略号*/
        }
    }
}

.newPople {
    padding: 0 20rpx;
}

.deCionBox {
    display: flex;
    flex-wrap: wrap;
    // height: 350rpx;
    align-items: center;
    // justify-content: center;
    // margin-bottom: 30rpx;
    margin: 20rpx;
    background: #fff;
    padding: 26rpx 20rpx 10rpx 20rpx;
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

        .left_text_img {
            width: 100rpx;
            height: 26rpx;
            margin-bottom: -2rpx;
        }
    }
}

.fliex_box {
    position: relative;
    padding: 20rpx 20rpx 10rpx 20rpx;

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
        top: -10rpx;
        width: 88rpx;
        height: 100%;
        background: #F2F3F5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.newHanle {
    height: 368rpx;
    background: #fff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 0 20rpx 20rpx 20rpx;
    padding: 24rpx;
    overflow: hidden;

    .getQuan {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .quanTitle {
            font-size: 36rpx;
            color: #020202;
            font-weight: 600;
        }
    }

    .towPro_img {
        width: 100%;
        height: 360rpx;
    }
}

.towPro {
    height: 676rpx;
}

.threeGoods {
    height: 484rpx;

    // margin-top: 40rpx;
    .goodUl {
        display: flex;
        justify-content: space-around;
        margin-top: 28rpx;
    }

    .seeMone {
        display: flex;
        font-size: 28rpx;
        color: #999999;
        min-width: 86rpx;
    }

    .left_jin {
        margin-right: 10rpx;
    }

    .goodsArea {
        display: flex;
        flex-direction: column;
        align-items: center;

        .towPro_img {
            width: 240rpx;
            height: 240rpx;
        }

        .goodsName {
            margin-top: 20rpx;
            font-weight: 600;
            font-size: 28rpx;
            color: #020202;
        }

        .difMoney {
            display: flex;
            align-items: center;
            margin-top: 20rpx;
        }

        .realMoney {
            font-weight: 600;
            font-size: 28rpx;
            color: #000000;
            padding-right: 10rpx;
        }

        .ageMoney {
            font-size: 20rpx;
            color: #999999;
            text-decoration: line-through;
        }
    }
}

.neds {
    margin-top: 30rpx;
}

.newTitle {
    text-align: center;
    font-weight: 600;
    font-size: 32rpx;
    color: #020202;
}

.newUp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30rpx 20rpx 0 20rpx;

    .everyItem {
        display: flex;
        flex: 1;
        background: #fff;
        padding: 20rpx;
        margin-bottom: 20rpx;
        height: 240rpx;
        border-radius: 24rpx;
    }

    .towPro_img {
        width: 200rpx;
        height: 200rpx;
    }

    .img_right {
        flex: 1;
        margin-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text_tit {
            font-weight: 600;
            font-size: 28rpx;
            color: #020202;
        }

        .text_small {
            margin-top: 12rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
        }

        .price_text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20rpx;
            padding-top: 10rpx;

            .realPrice {
                font-weight: 600;
                font-size: 32rpx;
                color: #000000;

                .piz {
                    margin-left: 2rpx;
                    font-size: 22rpx;
                    color: #000000;
                }
            }

            .nowBuy {
                border: 1rpx solid #8F8F8F;
                border-radius: 36rpx;
                font-size: 24rpx;
                color: #000000;
                padding: 8rpx 18rpx;
                margin-right: 20rpx;
            }
        }
    }
}

.crazy {
    margin: 40rpx 20rpx 20rpx 20rpx;

    .crezy_ul {
        margin-top: 30rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16rpx;

        .crezy_li {
            background-color: #fff;
            height: 430rpx;
            border-radius: 24rpx;

            .towPro_img {
                width: 226rpx;
                height: 226rpx;
                padding: 20rpx;
            }

            .crazy_bottom {
                margin-top: 8rpx;
                margin-left: 16rpx
            }

            .product_name {
                font-weight: 600;
                font-size: 24rpx;
                color: #020202;
            }

            .product_smal {
                margin-top: 8rpx;
                font-weight: 400;
                font-size: 20rpx;
                color: #666666;
            }

            .difMoney {
                display: flex;
                align-items: center;
                margin-top: 60rpx;
            }

            .realMoney {
                font-weight: 600;
                font-size: 28rpx;
                color: #000000;
                padding-right: 10rpx;
            }

            .ageMoney {
                font-size: 20rpx;
                color: #999999;
                text-decoration: line-through;
            }
        }
    }
}

.foryou {
    margin: 40rpx 20rpx 20rpx 20rpx;
    margin-bottom: 80rpx;
}

.content_right_list {
    padding: 0 16rpx;
}
</style>
