<template>
    <view class="container" @touchstart="myTouchStart" @touchend="myTouchEnd">

        <platform ref="platformRef" v-if="data.tabbarId == 1" :showrecommend="data.showrecommend" @showLifeMenu="showMenu"
            @showRightMenu="showRightMenu" @changeTabbarTop="hidetabbarTop"></platform>

        <service ref="serviceRef" v-if="data.tabbarId == 2" @showServiceMenu="showServiceMenu"></service>

        <news v-if="data.tabbarId == 4"></news>

        <my ref="myref" v-if="data.tabbarId == 5" @showLifeMenu="showMenu"></my>


        <customTabbar ref="tabbarRef" :tabbarData="data.tablist" @changeTabbar="changeTabbar" @showLifeMenu="showMenu">
        </customTabbar>

        <!-- 左侧菜单 -->
        <leftMenu v-model="data.showLeftMenu"></leftMenu>

        <!-- 右侧菜单 -->
        <indexRightMenu v-model="data.showrightMenu"></indexRightMenu>


        <!-- 小程序发布选项 -->
        <TnOverlay v-model:show="data.showUpMenu" :duration="0" :zIndex="30080">
            <view class="upMenu_box">
                <view class="upMenu_item" @click="fromCameraVideo">拍摄视频</view>
                <view class="upMenu_item" @click="fromCameraImg">拍摄图片</view>
                <view class="upMenu_item" @click="fromAlbumVideo">从手机选择视频</view>
                <view class="upMenu_item" @click="fromAlbumImg">从手机选择相片</view>
                <view class="bar"></view>
                <view class="upMenu_item not_bottom" @click="data.showUpMenu = false">取消</view>
            </view>

        </TnOverlay>


        <!-- 康养囤底部菜单 -->
        <TnOverlay v-model:show="data.serviceMenu" :duration="0" :zIndex="30080">
            <view class="serviceMenuBox">
                <view class="sMenu_titleBox">
                    <view></view>
                    <view class="sMenu_title">更多功能</view>
                    <view class="sMenu_close" @click="data.serviceMenu = false">
                        <TnIcon name="close" color="#333333" size="38rpx" :bold="true"></TnIcon>
                    </view>
                </view>
                <view class="sMenu_list_box">
                    <view class="sMenu_list" :class="{ 'not_bottom': index == 1 }" v-for="(item, index) in data.sMenuList"
                        :key="index">
                        <view class="sMenu_item" @click="sMenuItemFun(sMenuItem)" v-for="sMenuItem in item"
                            :key="sMenuItem.id">
                            <image class="sMenu_img" :src="getAssetsUrl(sMenuItem.icon)" mode="scaleToFill" />
                            <view class="sMenu_text">{{ sMenuItem.name }}</view>
                        </view>
                    </view>

                </view>
            </view>

        </TnOverlay>

        <BCNotify ref="bcNotify"></BCNotify>

    </view>
</template>

<script setup lang="ts">
import { gotoserviceIndexPage } from '@/routes/service-routes'
import { ref, reactive, watch, computed, getCurrentInstance } from 'vue'
import { onLoad, onShow, onReady, onHide } from '@dcloudio/uni-app'
import { useCustomerSessions } from '@bc/msg'
import platform from '../platform/platform.vue'
import goodsCategory from "../sort/sort.vue"
import news from '../news/news.vue'
import service from '../service/service.vue'
import my from '../my/my.vue'
import customTabbar from '@/components/cus-bar/custom-tabbar.vue'
// import test from '@/components/custom-tabbar/custom-tabbar.vue'
import indexRightMenu from '@/components/indexRightMenu/indexRightMenu.vue'
import leftMenu from '@/components/leftMenu/leftMenu.vue'
import { getAssetsPic } from '@/common/setPicture'
import { uploadFileApi, uploadVideo } from '@/api/file-api'
import dayjs from "dayjs"

import { PlatformManage } from "@bc/sys"
import { TempStorage } from "@bc/base"
import BCNotify from '@/components/notify/index.vue'
import { gotoLogin } from "@/routes/public-routes"
import {
    gotouparticle,
    gotoUpsalonPostsPage,
    upChatPage,
    gotoCreateLive,
    gotoNewUpcontentPage,
    Upcontent
} from '@/routes/create-routes'
import { getQRPage } from '@/api/open-api'
import { gotoGoodsPerferShop } from '@/routes/goods-routes'
import {
    gotoCollectLists, gotoWatchHistory, gotoCouponList, gotoAddressList, gotolicensePage
} from "@/routes/user-routes"
import { gotoorderList } from "@/routes/order-routes"
import { gotoShoppingCart } from '@/routes/goods-routes'
import { createTeam, denounceCheck } from "@/api/nim-api"
import { gotoChatPage } from "@/routes/nim-routes"
import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'


import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

interface Data {
    tablist: any,
    tabbarId: number,
    showrecommend: boolean,
    showLeftMenu: boolean,
    showrightMenu: boolean,
    serviceMenu: boolean,
    bottomHeight: number,
    startY: number
    isSwipeDown: boolean,
    slipFlag: boolean
    startPoint: any
    showUpMenu: boolean
    sMenuList: any
}

const data = reactive<Data>({
    tablist: [
        { id: 1, icon: '/leyou/static/tabbar-icon/show-recommend.svg', activeIcon: '/leyou/static/tabbar-icon/hide-recommend.svg', name: '首页' },
        { id: 2, icon: '/leyou/assets//actNewShi.png', activeIcon: '/leyou/assets/actNewShi.png', name: '' },
        { id: 3, icon: '/leyou/static/tabbar-icon/creator-icon.svg', activeIcon: '/leyou/static/tabbar-icon/creator-icon.svg', name: '' },
        { id: 4, icon: '', activeIcon: '', name: '消息' },
        { id: 5, icon: '', activeIcon: '', name: '我的', hoticon: '/leyou/icon/hot-enjoy-icon.svg' }
    ],
    tabbarId: 1,
    showrecommend: true,
    showLeftMenu: false,
    showrightMenu: false,
    serviceMenu: false,
    bottomHeight: 0,
    startY: 0,
    isSwipeDown: false,
    slipFlag: false,
    startPoint: {},
    showUpMenu: false,
    sMenuList: [
        [
            { id: 1, icon: '/leyou/goods/sMenu_certificates.svg', name: '证照信息' },
            { id: 2, icon: '/leyou/goods/sMenu_brand.svg', name: '优选品牌' },
            { id: 3, icon: '/leyou/goods/sMenu_red.svg', name: '卡券/红包' },
            { id: 4, icon: '/leyou/goods/sMenu_news.svg', name: '客服消息' },
            { id: 5, icon: '/leyou/goods/sMenu_order.svg', name: '我的订单' }
        ],
        [
            { id: 6, icon: '/leyou/goods/sMenu_car.svg', name: '购物车' },
            { id: 7, icon: '/leyou/goods/sMenu_footprint.svg', name: '浏览记录' },
            { id: 8, icon: '/leyou/goods/sMenu_collection.svg', name: '收藏店铺' },
            { id: 9, icon: '/leyou/goods/sMenu_address.svg', name: '地址管理' },
            { id: 10, icon: '/leyou/goods/sMenu_help.svg', name: '帮助与客服' }
        ]
    ]
})

const customer = useCustomerSessions()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

watch(customer.sessions, () => {

})

onLoad(({ hideId = null, tabids = null, option = null, scene = null } = {}) => {
    // if (scene) {
    //     let invid = scene.replace(/share_/, '')

    //     if (/share_/.test(scene)) {
    //         uni.setStorageSync('scene', 1)
    //     }
    //     else if (/id_/.test(scene)) {
    //         invid = scene.replace(/id_/, '')
    //         uni.setStorageSync('scene', 1)
    //     }
    //     else if (/ci_/.test(scene)) {
    //         console.log('二维码转发')
    //         getpage(scene)
    //         return
    //     }
    //     else {
    //         uni.setStorageSync('scene', invid)
    //     }

    //     console.log('invid',invid);
    //     PlatformManage.isRequireLogin().then((isRequireLogin) => {
    //         if (isRequireLogin) {
    //             console.log('新用户邀请登录');

    //             gotoLogin({
    //                 inviteId: invid
    //             })
    //             return
    //         }
    //         console.log('不是新用户');

    //     })

    // }
})

const getpage = (scene: any) => {
    getQRPage({ scene }).then((page) => {
        console.log('page', page)
        uni.navigateTo({
            url: decodeURIComponent(page)
        })
    }).catch(() => {
        return
    })
}

const platformRef = ref()
const serviceRef = ref()
const myref = ref()

onShow(() => {
    console.log('data.tabbarId', data.tabbarId)

    if (data.tabbarId == 1) {
        console.log('返回主页刷新');

        (platformRef.value as any).getCity();
        (platformRef.value as any).reloadPage()
    }
    if (data.tabbarId == 2) {
        (serviceRef.value as any).getCity()
    }
    if (data.tabbarId == 5) {
        console.log('刷新个人中心');
        (myref.value as any).getuserInfo()
    }

})


onHide(() => {
    console.log('隐藏首页11')

})
onReady(() => {
    // platformRef.value.listonLoad()
})
const changeTabbar = (id: number, showrecommend: boolean) => {
    if (id == 1) {
        setTimeout(() => {
            if (platformRef.value) {
                console.log('首页初始化22');
                (platformRef.value as any).imgInitIndex()
            }
        }, 600)
    }
    if (id == 2) {
        gotoserviceIndexPage()
        return
    }
    if (id == 3) {
        // 底部创作入口
        // gotoUpcontent()
        gotouparticle()
        return
    }
    data.tabbarId = id

    data.tabbarId == 2 && typePreviewReport('service')

    // data.showrecommend = showrecommend
    data.showrecommend = true
}
const tabbarRef = ref()
const hidetabbarTop = (val: boolean) => {

    (tabbarRef.value as any).hideTop(val);
}

const showMenu = () => {
    data.showLeftMenu = !data.showLeftMenu
}

const showRightMenu = () => {
    data.showrightMenu = !data.showrightMenu
}

const showServiceMenu = () => {
    data.serviceMenu = !data.serviceMenu
}

const bcNotify = ref()


const touchStart = (event: any) => {
    data.startY = event.touches[0].pageY
}

const touchMove = (event: any) => {
    // 可以根据需要调整滑动的阈值
    const threshold = 2 // 滑动阈值
    const currentY = event.touches[0].pageY
    const distance = currentY - data.startY

    if (distance > threshold) {
        data.isSwipeDown = true
    }

}

const myTouchStart = (e: any) => {
    if (data.tabbarId != 1) {
        return
    }

    data.slipFlag = true
    data.startPoint = e.changedTouches[0]
}

const myTouchEnd = (e: any) => {
    if (data.tabbarId != 1) {
        return
    }

    if (((data.startPoint.clientX - e.changedTouches[e.changedTouches.length - 1].clientX) > 80) && data.slipFlag) {
        console.log("左滑事件")
        if (data.showLeftMenu || data.showrightMenu) {
            if (data.showLeftMenu) {
                data.showLeftMenu = false
            }
        }

        data.slipFlag = false
        return
    }
    else if (((data.startPoint.clientX - e.changedTouches[e.changedTouches.length - 1].clientX) < -80) && data.slipFlag) {
        console.log("右滑事件")
        if (data.showLeftMenu || data.showrightMenu) {
            if (data.showrightMenu) {
                data.showrightMenu = false
            }
        }

        data.slipFlag = false
        return
    }
}

const gotoUpcontent = () => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }

        denounceCheck().then((res: any) => {
            console.log('res', res)

            // if (!res) {
            //     bcNotify.value.show('你暂时没有操作权限')
            //     return
            // }

            // #ifdef MP-WEIXIN
            data.showUpMenu = true
            // #endif

            // #ifdef APP-PLUS || H5
            Upcontent({ isBackIndex: 1 })
            // #endif
        }).catch((err: any) => {
            console.log('err', err.message)
            bcNotify.value.error(err.message)

        })




    })

}

// 相册获取相片
const fromAlbumImg = () => {
    uni.chooseImage({
        count: 9,
        sourceType: ['album'],
        success: function (res) {
            console.log('res.tempFilePath1', res.tempFilePaths)
            nextUp(res.tempFilePaths, 1)
        }
    })
}

// 相机获取相片
const fromCameraImg = () => {
    uni.chooseImage({
        sourceType: ['camera'],
        count: 1,
        success: function (res) {
            console.log('res.tempFilePath2', res.tempFilePaths)
            nextUp(res.tempFilePaths, 1)
        }
    })
}

// 相册获取视频
const fromAlbumVideo = () => {
    uni.chooseVideo({
        count: 1,
        sourceType: ['album'],
        success: function (res) {
            console.log('res.tempFilePath3', res.tempFilePath)
            nextUp([res.tempFilePath], 2)

        }
    })
}

// 相机获取视频
const fromCameraVideo = () => {
    uni.chooseVideo({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
            console.log('res.tempFilePath4', res.tempFilePath)
            nextUp([res.tempFilePath], 2)
        }
    })
}

const nextUp = (selectList: any, fileType: number) => {

    uni.showLoading({
        title: '上传中...'
    })

    console.log('data.selectList', selectList)
    const urlList = [] as any

    const promises = selectList.map((item: any) => {
        const url = item
        const name = dayjs().valueOf() + ''
        console.log('item', item)

        if (fileType == 2) {
            console.log('上传视频')
            return new Promise((resolve, reject) => {
                uploadVideo(url).then((res: any) => {
                    urlList.push({
                        url: res.url,
                        isImg: false,
                        isVideo: true
                    })
                    resolve(true)
                }).catch((err: any) => {
                    console.log('上传err', err)
                    reject(false)
                })
            })
        }

        console.log('上传相片')
        return new Promise((resolve, reject) => {
            uploadFileApi(url, name, 'merchant/license').then((res: any) => {
                urlList.push({
                    url: res.url,
                    isImg: true,
                    isVideo: false
                })
                resolve(true)
            }).catch((err: any) => {
                console.log('上传err', err)
                reject(false)
            })
        })
    })

    // 上传完成
    Promise.all(promises).then(() => {
        uni.hideLoading()

        console.log('urlList.urlList', urlList)

        const UpurlList = TempStorage.savewx({
            urlList
        })

        gotoNewUpcontentPage({
            UpurlList,
            isBackIndex: 1

        })

    }).catch((error) => {
        uni.hideLoading()

        console.error('上传Error:', error)
    })
}

const sMenuItemFun = (item: any) => {


    if (item.id == 4) {
        data.tabbarId = 4
        return
    }
    if (item.id == 10) {
        PlatformManage.getToken().then((token: any) => {
            createTeam({
                userId: token?.id,
                userName: token?.nickname,
                userThumb: token?.avatar,
                flag: 1, //1小程序用户，2服务人员
                shopId: token?.shopId ?? 0,
                type: 1 // 1平台，2店铺
            }).then((res: any) => {
                gotoChatPage({
                    to: res.tid,
                    scene: 'customer'
                })
            }).catch((err: any) => {
                bcNotify.value.show(err.message)
            })
        })
    }

    item.id == 1 && gotolicensePage()
    item.id == 2 && gotoGoodsPerferShop()
    item.id == 3 && gotoCouponList('')
    item.id == 5 && gotoorderList()
    item.id == 6 && gotoShoppingCart()
    item.id == 7 && gotoWatchHistory('')
    item.id == 8 && gotoCollectLists('health')
    item.id == 9 && gotoAddressList()

}

// 添加康养屯上报
const typePreviewReport = (type: string) => {
    Debounce(() => {
        createCollectAndReport().previewReport(type)
    }, 300)
}

</script>


<style lang="scss" scoped>
.container {
    padding-bottom: 120rpx;
    box-sizing: border-box;
}

.tranisitonHeight {
    height: 540rpx;
}

.tranisitonNoHeight {
    height: 0;
}

.up_box {
    width: 100%;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    overflow: hidden;
    backdrop-filter: blur(60rpx);
    transition: all .25s;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 600rpx;
    background: #FFFFFF;

    .top_box {
        width: 80rpx;
        height: 10rpx;
        background: #E4E4E4;
        border-radius: 6rpx;
        position: absolute;
        top: 20rpx;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
    }

    .up_title {
        font-weight: 500;
        color: #252628;
        font-size: 52rpx;
        text-align: center;
        padding: 30rpx;
        padding-bottom: 40rpx;
        box-sizing: border-box;
        position: relative;

        .close_icon {
            position: absolute;
            top: 20rpx;
            right: 40rpx;
        }

    }

    .up_list {
        width: 100%;
        display: grid;
        grid-gap: 30rpx;
        grid-template-columns: auto auto auto;
        padding: 0rpx 50rpx;
        box-sizing: border-box;

        .up_item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .up_img {
                width: 112rpx;
                height: 112rpx;
                border-radius: 50%;
                margin-bottom: 20rpx;

                .up_text {
                    font-size: 32rpx;
                    color: #333333;
                    font-weight: 400;
                }
            }
        }
    }

    .out_popup {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 60rpx;
        padding-bottom: 88rpx;
        box-sizing: border-box;

    }
}

.upMenu_box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 16rpx;
    box-sizing: border-box;
    overflow: hidden;
    background: #FFFFFF;
    padding-bottom: 60rpx;

    .bar {
        width: 100%;
        height: 12rpx;
        background: #F2F2F2;
    }

    .upMenu_item {
        width: 100%;
        text-align: center;
        color: #333333;
        border-bottom: 2rpx solid #F2F2F2;
        padding: 26rpx 0rpx;
        font-size: 32rpx;

        &.not_bottom {
            border-bottom: none;
        }
    }
}

.serviceMenuBox {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 40rpx;
    box-sizing: border-box;
    overflow: hidden;
    background: #FFFFFF;
    padding-bottom: 60rpx;

    .sMenu_titleBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 36rpx 40rpx;
        box-sizing: border-box;
        position: relative;

        .sMenu_title {
            font-weight: 500;
            font-size: 36rpx;
            color: #333333;
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0rpx);
        }
    }

    .sMenu_list_box {
        padding: 0rpx 40rpx;
        box-sizing: border-box;

        .sMenu_list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 60rpx;

            .sMenu_item {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 120rpx;

                .sMenu_img {
                    width: 80rpx;
                    height: 80rpx;
                    margin-bottom: 16rpx;
                }

                .sMenu_text {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #333333;
                }
            }
        }
    }

}
</style>
