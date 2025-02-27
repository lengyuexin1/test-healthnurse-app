<template>
    <view class="wrap" style="height: 100vh" v-if="showPage">
        <z-paging ref="paging" v-model="dataList" @query="queryList" :defaultPageSize="10"
                  empty-view-text="还没有数据哦~"
                  :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" @scroll="pagingScroll">
            <template #top>
                <!-- <PageTopbg></PageTopbg> -->

                <view id="wrap" class="wrap_box" v-if="showtab" :style="'opacity:' + (opacityNumber)">
                    <view class="navbar_box" :style="{ paddingTop: titleTop + 'px', paddingRight: titleRight + 'px' }">
                        <view class="top_box" :style="{ height: sBarHeight + 'px' }">
                            <view @click="goback">
                                <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                            </view>
                            <view class="title_text">详情</view>

                            <!-- #ifdef APP-PLUS || H5 -->
                            <view></view>
                            <!-- #endif -->

                        </view>
                    </view>

                    <div class="tab_box">
                        <TnTabs v-model="tabCurrent" color="#fff" :scroll="false" bg-color="#fff" bar-color="#29C86F"
                                :bottom-shadow="false">
                            <TnTabsItem v-for="(item, index) in tabList" :key="index" :title="item.name"
                                        font-size="28rpx" active-color="#333333" color="#999999"
                                        @click="changeTab(item, index)"/>
                        </TnTabs>
                    </div>

                </view>
            </template>

            <view class="back_icon" v-if="!showtab" @click="goback">
                <TnIcon name="left" color="#fff" size="38" :bold="true"/>
            </view>

            <div class="head_box" id="toView1">
                <swiper class="swiper_box" autoplay circular :current="currentSwiperIndex" @change="changeSwiper">
                    <swiper-item class="swiper_item" v-for="(item, index) in orderObj.multimedia" :key="index">
                        <image class="image" :src="item" mode="aspectFill"
                               @click="preImage(currentSwiperIndex, orderObj.multimedia)"/>
                    </swiper-item>
                </swiper>
                <view class="indicator_box">
                    <view class="indicator_item" :class="{ 'is_Selected': index == currentSwiperIndex }"
                          v-for="(item, index) in orderObj.multimedia" :key="index"></view>
                </view>
            </div>
            <couponGet v-if="couparr.length" @getCoupon="getCoupon"/>

            <view class="servebox" id="serveBox">
                <view class="serve-info">
                    <view class="goods">
                        <view class="serve-more row j-between">
                            <view class="serve-abt">
                                <view class="goods-up">
                                    <text class="goods-title u-line-2 u-font-xl">{{
                                            orderObj.name
                                        }}
                                    </text>
                                </view>
                                <view class="servebat row i-center u-line-1">
                                    <text class="servebatli">{{ orderObj.desc }}</text>
                                </view>
                            </view>
                            <view class="serve-opt row">
                                <view class="serve-opt-li column i-center j-center" @click="setcollect">
                                    <view class="row i-center j-center" style="width:46rpx;height:46rpx;">
                                        <image width="36rpx" height="36rpx" :src="favoriteImg"></image>
                                    </view>
                                    <text :style="{ color: isFavorite ? '#ffae21' : '' }">收藏</text>
                                </view>
                                <view class="serve-opt-li column i-center j-center" @click="share">
                                    <view class="row i-center j-center" style="width:46rpx;height:46rpx;">
                                        <image width="36rpx" height="36rpx"
                                               :src="getAssetsUrl('/default/v1/share.svg')"></image>
                                    </view>
                                    <text>分享</text>
                                </view>
                            </view>
                        </view>

                        <view class="servemore row i-center j-between">
                            <view class="serveprice" v-if="optionList.length">￥{{
                                    moneyFilter(monovalent)
                                }}
                                <text>/{{ optionList[0].extend.serviceWorkingHours.unitName }}起</text>
                            </view>
                            <view class="servenum">已服务
                                <text>{{ orderObj.saleVolume || 0 }}</text>
                                位客户
                            </view>
                        </view>

                        <view class="hospital row" v-if="hospital.name">
                            所属医院：
                            <view class="name">{{ hospital.name }}</view>
                        </view>

                        <!-- 服务提示 -->
                        <view class="servernote" v-if="orderObj.note">
                            <view class="notetit">服务提示：</view>
                            <view>
                                <expandable :lineHeight="48" expandText="查看更多"
                                            :longText="orderObj.note"></expandable>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="ensure">
                    <view class="goodssel row i-center j-between" @click="openSelect(false)">
                        <view class="godsellef row i-center" v-if="optionInfo.id">
                            <text class="godseltip">服务套餐：</text>
                            <view class="u-line-1">
                                <text class="godseltion">{{ optionInfo.name }}</text>
                            </view>
                            <text class="godselprice">￥{{ moneyFilter(optionInfo.price) }}</text>
                        </view>
                        <view class="godsellef row i-center" v-else>
                            <text class="godseltip">请选择</text>
                        </view>
                        <view class="godselrig row i-center">
                            <view class="u-line-1">共{{ optionList.length }}种规格可选</view>
                            <TnIcon name="right" size="38rpx" bold color="#C5C5C5"></TnIcon>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 评论组件 -->
            <view class="serbox" id="toView2">
                <commentView :applyId="3" :itemId="itemId" :shopId="baseId"></commentView>
            </view>

            <view class="serbox" v-if="baseId">
                <shopView :baseId="baseId" @gotoShop="linkAttendShop" @setShop="getBaseInfo"></shopView>
            </view>

            <!-- 长图片详情 -->
            <view id="toView3">
                <block v-for="(item, index) in orderObj.noticeMultimedia" :key="index">
                    <image @click="preImage(index, orderObj.noticeMultimedia)" :src="item"
                           style="width:750rpx ;height: auto;"
                           mode="widthFix"></image>
                </block>
            </view>

            <!-- 推荐列表 -->
            <view id="toView4" class="list_box">
                <view class="list_title">猜你喜欢</view>
                <WaterfallsFlow :wfList="dataList" @waterItem="clickwaterItem"></WaterfallsFlow>
            </view>

            <image class="shop-service" :src="getAssetsUrl('/leyou/icon/customer_service.png')" mode="scaleToFill"
                   @tap="clickCustomerService"/>
            <template #bottom>
                <!--  @linkShop="linkAttendShop" @openCoupon="getCoupon"  @formBtn="openSelect" @goCart="linkCart" -->
                <tabbar @clickTab="clickTab"
                        :btnTxt="couparr.length && couparr[0].length ? '领券购买' : '立即下单'"></tabbar>
            </template>
        </z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
    </view>

    <!-- 选择规格 -->
    <optionSelect ref="optSel" @getOptionItem="setOption" :type="1" :info="orderObj" :list="optionList"
                  :baseName="shareData.baseInfo.name"
                  :btnTxt="couparr.length && couparr[0].length ? '领券购买' : '立即下单'"/>

    <!-- 优惠券 coupon-->
    <receiveCoupon ref="refCoup" :list="couparr" @openSkunotice="openSkunotice"/>

    <!-- 分享 -->
    <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="status" :imgUrl="shareimgUrl">
    </shareView>
    <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344"
            style="width:254px; height:344px"></canvas>


</template>

<script setup lang="ts">
// import couponGet from "@/components/receiveCoupon/couponGet.vue"
// import receiveCoupon from "@/components/receiveCoupon/receiveCoupon.vue"
import { computed, getCurrentInstance, onMounted, reactive, ref, toRefs } from 'vue'
import BCNotify from '@/components/notify/index.vue'

import couponGet from "@/pagesGoods/components/receiveCoupon/couponGet.vue"
import receiveCoupon from "@/pagesGoods/components/receiveCoupon/receiveCoupon.vue"
import { onLoad, onReady, onShareAppMessage } from '@dcloudio/uni-app'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import expandable from './components/expandable-text.vue'
import { recommendList } from '@/api/goods-api'
// import {
//     getServeDetail,
//     getSerListAll,
//     itemCoupon,
//     collectService,
//     cancelCollect,
//     getFavoriteItem
// } from "@/api/care-api"
import { addItemBrowerHistory, cancelCollect, collectService, getServeDetail, itemCouponList } from "@/api/service-api"
import { getQrcode, isFavoriteItem } from '@/api/user-api'
import { moneyFilter } from "@/common/filters"
import { PlatformManage } from "@bc/sys"
import { getAssetsPic } from "@/common/setPicture"
import { pageController } from '@bc/uni-tools'
import tabbar from "./components/detailTabbar/detailTabbar.vue"

import shareView from '@/pagesGoods/components/shareView/shareView.vue'

import optionSelect from './components/optionSelect/optionSelect.vue'
import commentView from "./components/discuss-view/commentView.vue"
import shopView from "./components/shopView/shopView.vue"
import { gotogoodsDetail, gotoShoppingCart } from '@/routes/goods-routes'
import { gotoShopDetail } from "@/routes/service-routes"
import { gotoIndex, gotoLogin } from "@/routes/public-routes"
import { drawBGIMG } from '@/libs/canvas-tools'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import { createTeam } from "@/api/nim-api"
import { gotoChatPage } from "@/routes/nim-routes"

const dataList: any = ref([])
const isFavorite = ref(false)
const currentSwiperIndex = ref(0)
const baseId = ref('')
const itemId = ref('')
const props = defineProps({
    itemId: {
        type: String,
        default: ''
    }
})
const livePlayId = ref('')
const paging = ref()
const bcNotify = ref()
const shaView = ref()
const refCoup = ref()
const optSel = ref()
const showtab = ref(false)
const tabList = ref([
    { id: 1, name: '商品', top: 0, jumpId: 'toView1' },
    { id: 2, name: '点评', top: 0, jumpId: 'toView2' },
    { id: 3, name: '详情', top: 0, jumpId: 'toView3' },
    { id: 5, name: '推荐', top: 0, jumpId: 'toView4' }
])
const tabCurrent = ref(0)
const opacityNumber = ref(0)
const wrapheight = ref(0)
const showPage = ref(false)
const optionValueNames = ref('')

const status = ref(1)
const shareimgUrl = ref('')

const shareInfo = reactive({
    data: {
        thumb: '',
        name: '',
        shopavatar: ''
    },
    couparr: [] as any //优惠券列表
})
const shareData = reactive<any>({
    qrimg: '',
    isshow: false,
    baseInfo: {}
})

const orderObj = ref()

const titleTop = ref(0)
const titleRight = ref(0)
const sBarHeight = ref(0)

onLoad((options: any) => {
    console.log('options', options)

    itemId.value = options.itemId
    livePlayId.value = options?.livePlayId
    getDetail(itemId.value)
    getCoupList()
    isFavoriteItem({
        itemId: itemId.value
    }).then((res) => {
        isFavorite.value = !!res
    })
})

const instance = getCurrentInstance() // 获取组件实例
const query = uni.createSelectorQuery().in(instance)
// 选择规格
const getOptionItem = (data: any) => {
    optionInfo.value = data
}

onReady(() => {
    query.select('#wrap').boundingClientRect((wrap: any) => {
        wrapheight.value = wrap?.height
    }).exec()
})


onMounted(async () => {

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

    console.log(',data.titleRight', titleRight.value)
})

const getDetail = (id: any) => {

    getServeDetail({
        id
    }).then((res: any) => {
        orderObj.value = {
            id: res.item.id,
            thumb: res.item.thumb,
            name: res.item.name,
            desc: res.item.desc,
            multimedia: res.itemExt.multimedia.length > 1 ? res.itemExt.multimedia.splice(1) : res.itemExt.multimedia,
            noticeMultimedia: res.itemExt.noticeMultimedia,
            commonProblem: res.itemExt.commonProblem,
            note: res.itemExt.note,
            tagList: res.tagList,
            saleVolume: res.item.userCnt || 0,
            templateCode: res.item.templateCode,
            price: monovalent,
            unitName: res.optionList[0]?.extend?.serviceWorkingHours?.unitName
        }

        baseId.value = res.item.shopId
        optionList.value = res.optionList
        getCoupList()
        getOptionItem(res.optionList[0])
        // getElementTop()
        showPage.value = true
    }).catch((err: any) => {
        console.log(err)
        bcNotify.value.error('请求错误')
    })
}


const optionInfo: any = ref({})

const hospital: any = ref({})
const optionList: any = ref([])


const clickTab = (type: string) => {
    console.log('tyep', type)
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
        }
        else {
            type == 'linkAttendShop' && linkAttendShop()
            type == 'getCoupon' && getCoupon()
            type == 'linkCart' && linkCart()
            type == 'addCart' && openSelect(true)
            type == 'balanceOrder' && openSelect(false)
        }
    })
}

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const monovalent = computed(() => {
    return optionList.value.length === 0 ? 0 : optionList.value[0].price / optionList.value[0].extend.serviceWorkingHours.quantity || 1
})
const favoriteImg = computed(() => {
    return getAssetsPic(isFavorite.value ? "/default/v1/activeFavorite.svg" : "/default/v1/inactiveFavorite.svg")
})
const showfun = (bol: boolean) => {
    shareData.isshow = bol
}

// 优惠券弹窗
const getCoupon = () => {
    if (!shareInfo.couparr.length) {
        bcNotify.value.show('暂无优惠券')
        return
    }
    refCoup.value.openCpup()
}

const setcollect = () => {
    PlatformManage.isRequireLogin().then(res => {
        console.log(res)
        if (res) {
            // return gotoLogin({}) 去登录
        }
        else {
            isFavorite.value ? celcoll() : setcoll()
        }
    })
}
// 获取优惠券列表
const getCoupList = () => {
    const data = {
        applyId: 3,
        itemId: itemId.value
    }
    itemCouponList(data).then((res) => {
        if (res.length <= 0) {
            return
        }
        const arr1: any = []
        const arr2: any = []
        res.map((x: any) => {
            if (x.status == 0) {
                arr2.push(x)
            }
            else {
                arr1.push(x)
            }
        })
        shareInfo.couparr = [arr1, arr2]
    }).catch((err) => {
        uni.showToast({
            icon: 'none',
            title: err.message,
            duration: 1000
        })
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
        throw Error(err)
    })
}

// 收藏
const setcoll = () => {
    const datas: any = {
        applyId: 2,
        itemId: itemId.value
    }
    collectService(datas)
        .then(() => {
            isFavorite.value = true
            bcNotify.value.show('收藏成功')
        })
        .catch((err: any) => {
            bcNotify.value.error(err.message)
        })
}
//取消收藏
const celcoll = () => {
    const datas: any = {
        itemIds: [itemId.value]
    }
    cancelCollect(datas)
        .then(() => {
            isFavorite.value = false
            bcNotify.value.show('取消收藏')
        })
        .catch((err: any) => {
            bcNotify.value.error(err.message)
        })
}

const setOption = (str: string) => {
    optionValueNames.value = str || ''
}

// 店铺详情
const linkAttendShop = () => {
    const id = baseId.value
    // console.log(shareData.baseInfo)
    // return
    gotoShopDetail(shareData.baseInfo.id)
}
const getBaseInfo = (data: any) => {
    if (data.message || !data.id) {

        bcNotify.value.error(data.message)

        setTimeout(() => {
            pageController.back()
        }, 2000)
        return
    }
    addItemBrowerHistory({ itemId: orderObj.value.id, applyId: data.applyId })
    shareData.baseInfo = data
    shareInfo.data.shopavatar = data.thumb
}

// 猜你喜欢列表
const queryList = (pageNumber = 1, pageSize = 10) => {
    recommendList({
        pageSize,
        pageNumber,
        query: {
            categoryIds: [],
            lat: null,
            lng: null,
            sortType: 7,
            businessTypeIds: [2],
            businessType: null
        }
    }).then((res) => {
        console.log('res', res)

        paging.value.complete(res.data)
    })
}

// 打开sku面板
const openSelect = (type: boolean | number) => {
    optSel.value.godOpen(type)
}
// 打开面板确认下单后的自动领取优惠卷
const opengetAllCoupon = () => {
    refCoup.value.placegetCoupon()
}
const openSkunotice = () => {
    optSel.value.opennotifyRef()
}


// const { orderObj, infoData } = toRefs(dataAll)
const { couparr } = toRefs(shareInfo)

// 滚动计算透明导航栏
const pagingScroll = (e: any) => {
    tabList.value.forEach((item, index) => {
        query.select('#' + item.jumpId).boundingClientRect((rect: any) => {
            if (rect.top <= 150 && rect.top >= 50) {
                tabCurrent.value = index
            }
        }).exec()
    })
    // console.log('e', e)

    opacityNumber.value = Math.abs(((e.detail.scrollTop - 40) * 0.01))

    if (e.detail.scrollTop >= 50) {
        showtab.value = true
    }
    else {
        showtab.value = false
    }
}

// 导航栏跳转定位
const changeTab = (item: any, index: number) => {
    tabCurrent.value = index
    paging.value.scrollIntoViewById(item.jumpId, 150)
}

const preImage = (current: number, urls: any) => {
    uni.previewImage({
        current,
        urls
    })
}

const clickCustomerService = () => {
    PlatformManage.getToken().then((token: any) => {
        createTeam({
            userId: token.id,
            userName: token.nickname,
            userThumb: token.avatar,
            flag: 1, // 1小程序用户，2服务人员
            shopId: baseId.value,
            type: 2 // 1平台，2店铺
        }).then((res) => {
            const msgProduct = {
                itemId: orderObj.value.id,
                name: orderObj.value.name,
                thumb: orderObj.value.thumb,
                desc: orderObj.value.desc,
                price: orderObj.value.price,
                unitName: orderObj.value.unitName,
                msgType: 'product',
                templateCode: orderObj.value.templateCode
            }
            gotoChatPage({
                to: res.tid,
                scene: 'customer',
                originPage: '/pagesService/pages/serviceDetail/serviceDetail',
                msgProduct: JSON.stringify(msgProduct)
            })
        }).catch((err) => {
            bcNotify.value.show(err.message)
        })
    })
}

const linkCart = () => {
    gotoShoppingCart()
}

const clickwaterItem = (item: any) => {
    gotogoodsDetail(item.id)
}


const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }

    uni.navigateBack()
}


// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res: any) => {
    return {
        title: orderObj.value.name,
        imageUrl: orderObj.value.thumb,
        desc: orderObj.value.desc,
        path: `/pagesService/pages/serviceDetail/serviceDetail?itemId=${orderObj.value.id}`
    }
})
//#endif


const sharePoster = async () => {

    const coverUrl = await drawBGIMG(orderObj.value.thumb)
    // 二维码链接图片
    const qrimg = await getQrcode(`/pagesService/pages/serviceDetail/serviceDetail?itemId=${orderObj.value.id}`).then((img: any) => {
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(orderObj.value.shopThumb)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = orderObj.value.name//标题
    let accountName = orderObj.value.shopName//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0, 8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0, 8) + "..."
    }

    const context = uni.createCanvasContext('mycanvas', instance)


    context.clearRect(0, 0, 254, 344)
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)

    // 底部白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 258, 258, 94)

    // 底部文字
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.fillText(title, 12, 282)
    context.setFillStyle('#808080')
    context.setFontSize(14)


    // 二维码
    context.drawImage(qrimgUrl, 168, 260, 76, 76)

    context.fillText(accountName, 40, 324)
    context.setFillStyle('#999999')
    context.setFontSize(12)

    // 背景图片
    context.drawImage(coverUrl, 0, 0, 275, 255)


    context.save()
    context.arc(24, 320, 10, 0, Math.PI * 2)
    context.fill()//保证图片无bug填充
    context.clip()//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 14, 310, 20, 20)
    context.restore()

    context.draw(
        false,
        setTimeout(async () => {
            uni.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: (res: any) => {
                    shareimgUrl.value = res.tempFilePath
                    status.value = 2
                    title = ''
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                },
                complete: (ret) => {
                    console.log('生成中....')
                    uni.hideLoading()
                }
            }, instance)
        }, 3000)
    )


}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: orderObj.value.thumb,
        title: orderObj.value.name,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/pagesGoods/pages/goodsDetail/goodsDetail?itemId=${orderObj.value.id}`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
}
// #endif

const shareBox = ref()
// 分享
const share = () => {
    status.value = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}

const changeSwiper = (e: any) => {
    currentSwiperIndex.value = e.detail.current
}

defineExpose({
    closeShare
})


</script>

<style lang="scss" scoped>
#wrap {
    position: relative;
}

.wrap_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #FFFFFF;

    .navbar_box {
        // #ifdef APP-PLUS || H5
        padding-bottom: 12rpx;
        // #endif

        .top_box {

            padding-left: 26rpx;
            padding-right: 136rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;


            // #ifdef APP-PLUS || H5
            width: 100%;
            padding-right: 26rpx;
            height: auto !important;
            // #endif

            .title_text {
                font-size: 34rpx;
                color: #333333;
                font-weight: 500;
            }

        }

    }
}


.servebox {
    margin: 20rpx;

    .serve-info {
        background-color: #fff;
        padding-bottom: 1rpx;
        border-radius: 24rpx;
    }

    .goods {
        padding: 30rpx 40rpx;
        display: flex;
        flex-direction: column;

        .serve-more {
            align-items: flex-start;
        }

        .serve-abt {
            flex: 1;
        }

        .servebat {
            flex-wrap: nowrap;
            margin-top: 16rpx;
        }

        .servebatli {
            font-size: 26rpx;
            font-weight: 400;
            color: #999999;
            padding-right: 6rpx;
            padding-left: 6rpx;
            line-height: 26rpx;
            display: inline-flex;
            align-items: center;

            &::after {
                content: '';
                display: inline-block;
                height: 24rpx;
                border-right: 2rpx solid #999999;
                margin-left: 6rpx;
            }

            &:last-child {
                &::after {
                    display: none;
                }
            }

            &:first-child {
                padding-left: 0rpx;
            }
        }

        .servemore {
            margin-top: 40rpx;

            .serveprice {
                font-size: 40rpx;
                font-weight: 500;
                color: #FF0000;

                text {
                    font-size: 24rpx;
                }
            }
        }

        .servenum {
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;

            text {
                color: #FF9E1E;
                margin: 4rpx;
            }
        }

        .hospital {
            margin-top: 24rpx;
            font-size: 28rpx;
            color: #333333;

            .name {
                color: #999999;
            }
        }

        .servernote {
            margin-top: 20rpx;
            padding: 24rpx;
            background: #F5F7FB;
            border-radius: 4rpx;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 48rpx;
            color: #666666;

            .notetit {
                font-size: 28rpx;
                font-weight: 500;
                line-height: 44rpx;
                color: #333333;
                margin-bottom: 16rpx;
            }
        }

        .goods-up {
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
        }

        .goods-title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 34rpx;
            font-weight: 500;
            color: #333333;
        }

        .serve-opt {
            font-size: 22rpx;
            font-weight: 400;
            color: #878787;

            text {
                margin-top: 8rpx;
            }
        }

        .serve-opt-li {
            margin-left: 40rpx;
            position: relative;

            button {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
            }
        }

    }
}


.servebox {
    margin: 20rpx 0;

    .serve-info {
        background-color: #fff;
        padding-bottom: 1rpx;
        border-radius: 24rpx;
    }

    .goods {
        padding: 30rpx 0rpx;
        display: flex;
        flex-direction: column;

        .serve-more {
            align-items: flex-start;
        }

        .serve-abt {
            flex: 1;
        }

        .servebat {
            flex-wrap: nowrap;
            margin-top: 16rpx;
        }

        .servebatli {
            font-size: 26rpx;
            font-weight: 400;
            color: #999999;
            padding-right: 6rpx;
            padding-left: 6rpx;
            line-height: 26rpx;
            display: inline-flex;
            align-items: center;

            &::after {
                content: '';
                display: inline-block;
                height: 24rpx;
                border-right: 2rpx solid #999999;
                margin-left: 6rpx;
            }

            &:last-child {
                &::after {
                    display: none;
                }
            }

            &:first-child {
                padding-left: 0rpx;
            }
        }

        .servemore {
            margin-top: 40rpx;

            .serveprice {
                font-size: 40rpx;
                font-weight: 500;
                color: #FF0000;

                text {
                    font-size: 24rpx;
                }
            }
        }

        .servenum {
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;

            text {
                color: #FF9E1E;
                margin: 4rpx;
            }
        }

        .hospital {
            margin-top: 24rpx;
            font-size: 28rpx;
            color: #333333;

            .name {
                color: #999999;
            }
        }

        .servernote {
            margin-top: 20rpx;
            padding: 24rpx;
            background: #F5F7FB;
            border-radius: 4rpx;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 48rpx;
            color: #666666;

            .notetit {
                font-size: 28rpx;
                font-weight: 500;
                line-height: 44rpx;
                color: #333333;
                margin-bottom: 16rpx;
            }
        }

        .goods-up {
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
        }

        .goods-title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 34rpx;
            font-weight: 500;
            color: #333333;
        }

        .serve-opt {
            font-size: 22rpx;
            font-weight: 400;
            color: #878787;

            text {
                margin-top: 8rpx;
            }
        }

        .serve-opt-li {
            margin-left: 40rpx;
            position: relative;

            button {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
            }
        }

    }
}

.head_box {
    position: relative;

    .swiper_box {
        width: 750rpx;
        height: 750rpx;

        .swiper_item {
            width: 100%;
            height: 100%;
            z-index: 10;

            .image {
                width: 100%;
                height: 100%;
            }

        }

    }

    .indicator_box {
        position: absolute;
        bottom: 56rpx;
        right: 40rpx;
        display: flex;
        align-items: center;

        .indicator_item {
            width: 12rpx;
            height: 12rpx;
            background: #000000;
            opacity: 0.2;
            border-radius: 50%;
            margin-right: 12rpx;

            &.is_Selected {
                opacity: 1;
                background: #18181A;
                border-radius: 6rpx 6rpx 6rpx 6rpx;
                width: 28rpx;
            }

        }
    }

}

.swiper-data {
    width: 100%;
    height: 100%;

    .image {
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
}

.serve-info {
    margin: 20rpx;
    padding: 30rpx;
    background: #FFFFFF;
    border-radius: 24rpx;

    .info-about {
        .serve-abt {
            .goods-title {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 34rpx;
                font-weight: 500;
                color: #333333;
            }

            .servebat {
                flex-wrap: wrap;
                margin-top: 16rpx;
            }

            .servebatli {
                /* height: 46rpx;
                background: #fff1e8;
                border: 1rpx solid #ff713b;
                border-radius: 12rpx;
                font-size: 26rpx;
                font-weight: 400;
                line-height: 46rpx;
                color: #ff7331;
                padding: 0 8rpx;
                margin: 0 8rpx 8rpx 0; */

                font-size: 26rpx;
                font-weight: 400;
                color: #999999;
                padding-right: 6rpx;
                line-height: 26rpx;
                display: inline-flex;
                align-items: center;

                &::after {
                    content: '|';
                    font-size: 26rpx;
                    font-weight: 400;
                    color: #999999;
                    margin-left: 6rpx;
                }

                &:last-child::after {
                    display: none;
                }
            }

            .servemation {
                margin-top: 20rpx;

                .serveprice {
                    margin-right: 30rpx;
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #FF0000;
                }

                .servenum {
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #999999;
                }
            }
        }

        .serve-opt {
            font-size: 22rpx;
            font-weight: 400;
            color: #878787;

            text {
                margin-top: 8rpx;
            }

            .serve-opt-li {
                margin-left: 40rpx;
                position: relative;

                button {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    opacity: 0;
                }
            }
        }
    }

    .optbox {
        margin-top: 40rpx;

        .optit {
            font-size: 32rpx;
            font-weight: 500;
            color: #333333;
        }

        .godinfo {
            margin-top: 30rpx;

            .surelef {
                font-size: 26rpx;
                font-weight: bold;
                color: #333333;
                margin-right: 50rpx;
            }

            .godirig {
                flex: 1;

                .seltex {
                    font-size: 26rpx;
                    font-weight: 400;
                    color: #666666;
                }

                .godcls {
                    margin-top: 16rpx;

                    .godsclsimg {
                        image {
                            width: 60rpx;
                            height: 60rpx;
                            border-radius: 8rpx;
                            margin-right: 12rpx;
                        }
                    }

                    .godsclstex {
                        padding: 0 16rpx;
                        height: 50rpx;
                        background: #F8F8F8;
                        border-radius: 8rpx;
                        font-size: 24rpx;
                        font-weight: 400;
                        line-height: 50rpx;
                        color: #999999;
                    }
                }
            }
        }
    }
}

.serbox {
    margin: 20rpx;
}

.ensure {
    background: #FFFFFF;
    border-radius: 24rpx;
    margin: 20rpx;
    padding: 40rpx 30rpx 40rpx;
}

.goodssel {
    background: #f8f8f8;
    border-radius: 8rpx;
    height: 80rpx;
    padding: 0 16rpx 0 24rpx;

    text {
        flex-shrink: 0;
    }

    .godseltip {
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
    }

    .godseltion {
        font-size: 28rpx;
        font-weight: 500;
        color: #333333;
    }

    .godselprice {
        font-size: 28rpx;
        font-weight: 500;
        color: #ff0000;
    }

    .godselrig {
        font-size: 28rpx;
        font-weight: 400;
        color: #3e92ff;
        margin-right: 6rpx;
        flex-shrink: 0;
    }
}

.detailImg {
    width: 100%;
    height: auto;
    display: block;
}

.loke_text {
    padding-top: 30rpx;
    color: #000002;
    font-size: 34rpx;
    font-weight: bold;
    line-height: 34rpx;

}

.spage {
    width: 100%;
    height: 20rpx;
}

.back_icon {
    padding: 10rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 104rpx;
    left: 20rpx;
    z-index: 1000;
}

.tab_box {
    height: 44px;
    background: #FFFFFF;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // z-index: 10000;
}

.bilvas {
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}

.list_box {
    padding: 0rpx 14rpx;
    box-sizing: border-box;

    .list_title {
        padding: 10rpx 16rpx;
        padding-bottom: 30rpx;
        box-sizing: border-box;
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
    }
}

.shop-service {
    width: 96rpx;
    height: 96rpx;
    position: fixed;
    right: 0;
    bottom: 350rpx;
    z-index: 1000;
}
</style>
