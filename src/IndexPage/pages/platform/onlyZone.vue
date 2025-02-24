<template>
    <view class="container">
        <z-paging ref="paging" :defaultPageSize="6" v-model="moreGoodList" @query="queryList" :auto="false"
            :refresher-enabled="false" @scroll="scrollPage">
            <template #top>
                <view class="navbar_box" :style="{ paddingTop: titleTop + 'px', paddingRight: titleRight + 'px' }">
                    <view class="top_box" :style="{ height: sBarHeight + 'px' }">
                        <view class="back_icon" @click="goback">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true" />
                            <view class="inp_box" @click="tosearch">
                                <view class="left_box">
                                    <view class="left_icon_box">
                                        <TnIcon name="search" color="#999999" size="32" bold></TnIcon>
                                    </view>
                                    <view class="inp_left">
                                        <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500"
                                            :vertical="true">
                                            <swiper-item v-for="(item, index) in noticeData" :key="index">
                                                <view class="swiper_item_item">{{ item }}</view>
                                            </swiper-item>
                                        </swiper>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>

            <view class="mainCent">
                <view class="live_swiper" v-if="swiperList.length > 0">
                    <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" :vertical="false"
                        @change="liveswiperChange">
                        <swiper-item class="swiper_item" v-for="(item, index) in swiperList" :key="item.id" @click="liveList(item)">
                            <image class="live_swiper_img" :src="item.icon" mode="aspectFill" />
                        </swiper-item>
                    </swiper>
                    <view class="swiper_sign_box">
                        <view class="sign_item" :class="{ 'is_sign': signIndex == swiperIndex }"
                            v-for="(signItem, signIndex) in swiperList.length" :key="signIndex"></view>
                    </view>
                </view>

                <!-- <view class="space_box"></view> -->
                <view class="btns" v-if="showBk.includes(17)">
                    <view class="btnItem" @click="tapArt(item, index)" :class="{ 'acticol': curret == index }"
                        v-for="(item, index) in couDatas" key="index">
                        <view class="zoneQuan">
                            <!-- <view class="fuha">￥ <span class="monum">10</span></view> -->
                            <view class="fuha"> <span class="monum">{{ item.typeName }}</span></view>
                            <view class="textuse">{{ item.desc }}</view>
                        </view>
                        <view class="syuas">
                            <view class="zonr1"></view>
                            <view class="lineDa"></view>
                            <view class="zonr2"></view>
                        </view>
                        <view v-if="item.status == 10" class="goUse" @click="getQuCou(item)">领取</view>
                        <view class="alseUse" v-else @click="useCou">去使用</view>
                    </view>
                </view>

                <view class="cateListcs" v-if="showBk.includes(18)">
                    <!-- <view class="cateText">住院陪护分类</view> -->
                    <view class="cateUl">
                        <view class="cateItem" v-for="(item, index) in tabsData" :key="index"
                            @click="gotoColmDetail(index, item)">
                            <image class="cateIcon" :src="item.icon" mode="aspectFill" />
                            <view class="cateName">{{ item.name }}</view>
                        </view>
                    </view>
                </view>
                <view class="activeCon">
                    <view class="activeConLeft" v-if="dataObjTre.type">
                        <piaiList :dataObjTre="dataObjTre"></piaiList>
                    </view>
                    <view class="activeConRight" v-if="dataObjTwo.type">
                        <valGou :dataObjTwo="dataObjTwo"></valGou>
                    </view>
                </view>
                <view class="goodWu" v-if="showBk.includes(20)">
                    <view class="goodText">精选好物</view>
                    <!-- 列表 -->
                    <ListItem :wfList="moreGoodList" @waterItem="clickwaterItem"></ListItem>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { gotosearch } from "@/routes/service-routes"
import { moneyFilter } from "@/common/filters"
import { ref, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from '@/common/setPicture'
import { takeCoupon } from '@/api/order-api'
import piaiList from './components/piaiList.vue'
import valGou from './components/valGou.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { onLoad } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { columnDetail, productList, bannerList, zqCouList, activeDetail, columnList } from "@/api/setite-api"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoCateArrList, gotoZone } from '@/routes/active-routes'
import { recommendList } from "@/api/goods-api"
import { gotoSellerList } from "@/routes/service-routes"
import ListItem from "@/components/recommended/listItem.vue"
const moreGoodList = ref([])
const tabsData: any = ref([])
const dataObjTre: any = ref({})
const dataObjTwo: any = ref({})
const showBk: any = ref([])
const norList: any = ref([])
const paging = ref()
const swiperIndex = ref(0)
const titleTop = ref(0)
const titleRight = ref(0)
const sBarHeight = ref(0)
const swiperList: any = ref([])
const listCates = ref([])
const detailData: any = ref({
    couponIds: {}
})
const detailId = ref('')
onLoad((option: any) => {
    detailId.value = option.id
    columnDetail(option.id).then(res => {
        detailData.value = res
        healthMyData(res.recordList)
        // //类目产品
        // faList.value = res.categoryIds
        // if (faList.value.length > 0) {
        //     faList.value.forEach((element: any) => {
        //         // channeCatelList(element, element.categoryIds)
        //     })
        // }
        // // 优惠券
        // getCouList(res.couponIds)

    })
})
const healthMyData = (list: any) => {
    showBk.value = []
    if (list.length < 1) {
        return
    }
    list.forEach((element: any) => {
        // banner
        showBk.value.push(element.moduleId)
        if (element.moduleId == 1) {
            getBannerList(element.dataIds)
        }
        // 优惠价
        if (element.moduleId == 17) {
            getCouList(element.dataIds)
        }
        // 快捷导航
        if (element.moduleId == 18) {
            kuaiRou(element.dataIds)
        }
        // 营销组件
        if (element.moduleId == 19) {
            element.dataIds.forEach(item => {
                activeDetail(item).then(res => {
                    if (res.type == 3) {
                        dataObjTre.value = res
                    }
                    if (res.type == 4) {
                        dataObjTwo.value = res
                    }
                })
            })
        }
        //  个性化推荐
        if (element.moduleId == 20) {
            listCates.value = element.categoryIds
            queryList(1, 6)
        }
    })
}

const noticeData = ref(['休闲/玩乐'])
const couDatas: any = ref([])
const getCouList = (cuoIds: any) => {
    const couData = {
        pageNumber: 1,
        pageSize: 30,
        query: {
            ids: cuoIds
        }
    }
    zqCouList(couData).then(res => {
        couDatas.value = res.data
    })
}

const kuaiRou = (data: any) => {
    const dares = {
        ids: data
    }
    console.log(465456);

    columnList(dares).then(res => {
        tabsData.value = res
    })
}

const tosearch = () => {
    gotosearch()
}

const gotoColmDetail = (index: any, item: any) => {
    // 跳转微页面
    console.log(item)
    
    return gotoSellerList({id: item.id, name: item.name})
    // return gotoZone(item.id, item.name)
}

const clickwaterItem = () => {

}

const liveList = (item: any) => {
    console.log('item', item)
    if (item.type == 1) {
        gotoserviceDetail( item.dataId )
    }
    if (item.type == 2) {
        gotogoodsDetail(item.dataId)
    }
}

// 退出页面
const goback = () => {
    uni.navigateBack()
}

const faList: any = ref([])
const channeCatelList = (item: any, id: any) => {
    const sendda = {
        pageNumber: 1,
        pageSize: 10,
        query: {
            categoryIds: id
        }
    }
    productList(sendda).then(res => {
        item.dataList = res.data.length > 0 ? res.data.slice(0, 6) : res.data
    })
}

const cateList: any = ref([])
const diajCou = ref(false)

const liveswiperChange = (e: any) => {
    swiperIndex.value = e.detail.current
}
const scrollPage = (e: any) => {

}
const curret = ref(0)
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const tapArt = (item: any, index: number) => {
    if (index == 1) {
        paging.value.scrollIntoViewById(item.id, 200)
    }
    curret.value = index
}

onMounted(() => {
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
    sBarHeight.value = uni.getSystemInfoSync().statusBarHeight!
    // 计算标题需要偏移的位置
    titleTop.value = top + (height - sBarHeight.value) / 2

    // 计算顶部右侧偏移量
    titleRight.value = width + 8
    // #endif



    // #ifdef APP-PLUS || H5
    sBarHeight.value = 33
    const pageObj = uni.getSystemInfoSync() as any
    titleTop.value = pageObj.safeArea.top

    titleRight.value = 8
    // #endif
})

const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                icon: "none",
                text: '登录失效,请重新登录'
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotogoodsDetail(item.id)
    })
}

const queryList = (pageNumber, pageSize) => {
    recommendList({
        pageSize: pageSize,
        pageNumber: pageNumber,
        query: {
            categoryIds: listCates.value
        }
    }).then((res: any) => {
        paging.value.complete(res.data)
        console.log('moreGoodList', moreGoodList.value);
    })
}


const changeType = (item: any) => { }

const getQuCou = (item: any) => {
    takeCoupon({ couponId: item.id }).then(() => {
        uni.showToast({
            icon: 'none',
            title: '领取成功'
        })
        item.status = 1
    }).catch((err: any) => {
        console.log(err.message)
    })
}

const getBannerList = (data: any) => {
    const dares = {
        ids: data
    }
    bannerList(dares).then(res => {
        swiperList.value = res
        console.log(swiperList.value, '轮播图');
    })
}

const useCou = () => {
    // diajCou.value = false
    // cateList.value = []
    gotoCateArrList({ type: 1, id: detailId.value })
}
const seeMonr = (item: any) => {
    console.log(item);
    gotoCateArrList({ type: 2, id: item.id })
    // gotoCateList({id: item.id})
    // diajCou.value = false
    // cateList.value = item.categoryIds
}
</script>
<style lang="scss" scoped>
.btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16rpx;
    margin: 30rpx 0rpx 0 0rpx;
    height: 180rpx;

    .btnItem {
        position: relative;
        padding: 24rpx;
        background: #fff;
        font-size: 28rpx;
        color: #333333;
        border-radius: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goUse {
            writing-mode: vertical-rl;
            padding: 10rpx 6rpx 10rpx 4rpx;
            border-radius: 20rpx;
            border: 2rpx solid #585858;
            font-size: 28rpx;
            color: #333333;
        }

        .alseUse {
            writing-mode: vertical-rl;
            padding: 10rpx 6rpx 10rpx 4rpx;
            border-radius: 20rpx;
            border: 2rpx solid #333333;
            font-size: 28rpx;
            color: #ffff;
            background: #333333;
        }

        .zoneQuan {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 70%;

            .fuha {
                font-weight: 600;
                font-size: 28rpx;
                color: #000000;

                .monum {
                    font-weight: 600;
                    font-size: 56rpx;
                    color: #000000;
                }
            }

            .textuse {
                font-size: 24rpx;
                color: #666666;
            }
        }

        .syuas {
            position: absolute;
            top: 0;
            right: 28%;

            .zonr1 {
                width: 20rpx;
                height: 20rpx;
                background: #F1F3F5;
                border-radius: 50%;
                margin-top: -10rpx;
            }

            .lineDa {
                height: 140rpx;
                margin: 10rpx auto;
                width: 0rpx;
                border-right: 2rpx dashed #DBDBDB;
            }

            .zonr2 {
                width: 20rpx;
                height: 20rpx;
                background: #F1F3F5;
                border-radius: 50%;
                margin-bottom: -10rpx;
            }
        }
    }
}

.space_box {
    width: 100%;
    height: 700rpx;
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

    .tow_sign {
        background: #E5E5E5;

        &.is_sign {
            background: #CE0829;
        }
    }
}

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
        // justify-content: space-between;

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
        width: 100%;
        margin-right: 20rpx;
        display: flex;
        align-items: center;
    }

    .inp_box {
        flex: 1;
        background: #fff;
        box-shadow: 0rpx 0rpx 32rpx 2rpx rgba(0, 0, 0, 0.04);
        box-sizing: border-box;
        padding: 10rpx 20rpx;
        padding-right: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 50rpx;
        position: relative;
        margin-left: 30rpx;

        .left_box {
            display: flex;
            align-items: center;

            .left_icon_box {
                display: flex;
                align-items: center;
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

.mainCent {
    margin: 0 20rpx;

    .goodWu {
        margin: 16rpx 0 20rpx 0;

        .goodText {
            font-weight: 600;
            font-size: 32rpx;
            color: #020202;
        }
    }
}

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

.cateListcs {
    background: #fff;
    margin: 20rpx 0;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 30rpx 30rpx;

    .cateText {
        font-size: 28rpx;
        color: #535353;
    }

    .cateUl {
        margin-top: 20rpx;
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .cateItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20rpx 0;
            width: 25%;

            .cateIcon {
                width: 55rpx;
                height: 55rpx;
                align-items: center;
            }

            .cateName {
                margin-top: 20rpx;
                font-size: 22rpx;
                color: #1B1B1B;
            }
        }
    }
}

.activeCon {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .activeConLeft {
        width: 48%;
    }

    .activeConRight {
        width: 48%;
    }
}
</style>