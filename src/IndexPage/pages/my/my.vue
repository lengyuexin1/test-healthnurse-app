<template>
    <view class="container">
        <z-paging ref="paging" v-model="data.dataList" :auto="true" :auto-scroll-to-top-when-reload="false"
                  :auto-show-system-loading="true"
                  :defaultPageSize="10" :fixed="true" :hide-empty-view="true"
                  @query="queryList">
            <template #top>
                <bc-page-navbar :bgColor="'#56CC7D'" :textColor="'#ffffff'" :title="'我的'">
                    <template #back>
                        <view></view>
                    </template>
                </bc-page-navbar>
            </template>
            <view :style="{ paddingBottom: data.safeBotomHeight + 150 + 'rpx' }" class="content_wrap">
                <view class="my-bg-top"></view>
                <view class="avatar_box">
                    <view v-if="!data.isRequireLogin" class="is_login">
                        <view class="avatar_box_top">
                            <view class="avatar_box_left" @click="toEditProfile">
                                <view class="avatar_img_box">
                                    <image :src="data.userinfo.avatar" class="avatar_img"
                                           mode="aspectFill"/>
                                </view>
                                <view class="user_text_box">
                                    <view class="user_namr">{{ data.userinfo.nickname }}</view>
                                    <view class="user_bcId_box">
                                        <view class="user_bcId">账号名: {{
                                                data.homeObj.regCode ? data.homeObj.regCode :
                                                      'ABCDEF'
                                            }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="row i-center j-center">
                                <view class="set_li">
                                    <image :src="getAssetsUrl('/mine/v1/my_set_xx.svg')"
                                           class="top_menu_right_icon share"
                                           mode="scaleToFill"
                                           @click.stop="toSetting"/>
                                    <view class="txt">消息</view>
                                </view>
                                <view class="set_li">
                                    <image :src="getAssetsUrl('/mine/v1/my_set_sz.svg')"
                                           class="top_menu_right_icon share"
                                           mode="scaleToFill"
                                           @click.stop="toSetting"/>
                                    <view class="txt">设置</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view v-else class="tologin" @click="toLogin">
                        <image :src="getAssetsUrl('/leyou/static/default_avatar.png')" class="avatar_img"
                               mode="aspectFill"/>
                        <view class="tologin_text">
                            点击头像登录
                        </view>
                    </view>
                </view>
                <view class="operate_box">
                    <view class="operate_data">
                        <view class="operate_data_item" @click="todataManage(1)">
                            <view class="data_number">
                                {{ data.homeObj.cntFollow ? data.homeObj.cntFollow : '--' }}
                            </view>
                            <view class="data_text">我的关注
                                <TnIcon color="#ffffff" name="right" size="28"/>
                            </view>
                        </view>
                        <view class="operate_data_item haveborder" @click="todataManage(2)">
                            <view class="data_number">
                                {{ data.homeObj.totalFans ? data.homeObj.totalFans : '--' }}
                            </view>
                            <view class="data_text">我的粉丝
                                <TnIcon color="#ffffff" name="right" size="28"/>
                            </view>
                        </view>
                        <view class="operate_data_item">
                            <view class="data_number">
                                {{ data.homeObj.cntLike ? data.homeObj.cntLike : '--' }}
                            </view>
                            <view class="data_text">获赞数
                                <!--                                <TnIcon name="right" color="#ffffff" size="28"/>-->
                            </view>
                        </view>
                    </view>
                </view>

                <view class="my_functionMuen">
                    <TnTabs v-model="data.currentTabIndex" :bottom-shadow="false" active-font-size="32rpx"
                            bar-color="#56cc7d" class="my_functionTabs"
                            font-size="30rpx">
                        <TnTabsItem v-for="item  in data.tabsData" :key="item.id"
                                    :title="item.name"
                                    active-color="#000"
                                    color="#666666"
                        />
                    </TnTabs>
                    <view class="top_left" @click="toFunctionPage">
                        <view>查看全部</view>
                        <TnIcon color="#999999" name="right" size="28"/>
                    </view>
                    <view class="item" style="padding: 0 30rpx 30rpx 30rpx;">
                        <template v-if="data.currentTabIndex == 0">
                            <block v-for="(item,index) in data.serviceList" :key="index">
                                <view class="flex" style="position: relative"
                                      @click="goOder(item.inds,item.taborIndex)">
                                    <image :src="item.icon" class="item_img" mode="aspectFit"></image>
                                    <text class="item_name">{{ item.name }}</text>
                                    <!-- <u-badge :offset="[-5,15]" :value="item.badge" absolute bgColor="#FF2A2A" max="99"
                                             type="error"></u-badge> -->
                                </view>
                            </block>
                        </template>
                        <template v-if="data.currentTabIndex == 1">
                            <block v-for="(item,index) in data.productList" :key="index">
                                <view class="flex" style="position: relative"
                                      @click="goOder(item.inds,item.taborIndex)">
                                    <image :src="item.icon" class="item_img" mode="aspectFit"></image>
                                    <text class="item_name">{{ item.name }}</text>
                                    <!-- <u-badge :offset="[-5,15]" :value="item.badge" absolute bgColor="#FF2A2A" max="99"
                                             type="error"></u-badge> -->
                                </view>
                            </block>
                        </template>
                    </view>
                </view>

                <view class="orders smart" style="padding: 0;">
                    <view class="row j-between">
                        <view class="smart-title">
                            我的智护
                        </view>
                    </view>
                    <view class="item" style="padding: 0 30rpx 30rpx 30rpx;">
                        <block v-for="(item,index) in data.wisdomList" :key="index">
                            <view class="flex" @click="gotoPersonnel(item,index)">
                                <image :src="item.icon" mode="aspectFit" style="width:56rpx; height:56rpx;"></image>
                                <text class="item_name">{{ item.name }}</text>
                            </view>
                        </block>
                    </view>
                </view>

                <view class="orders" style="padding: 0;">
                    <view class="row j-between">
                        <view class="smart-title">
                            我的服务
                        </view>
                    </view>
                    <TnScrollList :indicator-block-color="'rgba(0, 216, 134,1)'" :indicator-block-width="15"
                                  :indicator-width="30"
                                  class="server_scroll"
                                  indicator-color="rgba(150, 243, 222,0.8)">
                        <view class="scroll-list">
                            <view v-for="(item, index) in newmenu" :key="index" class="scroll-list__line">
                                <block v-for="(item1, index1) in item" :key="index1">
                                    <view @click="listClick(item1)">
                                        <view :class="[(index1 === item.length - 1) && 'scroll-list__line__item--no-margin-right']"
                                              class="scroll-list__line__item"
                                        >
                                            <image :src="item1.img" class="scroll-list__line__item__image"
                                                   mode=""></image>
                                            <text class="scroll-list__line__item__text">{{ item1.title }}</text>
                                        </view>
                                    </view>
                                </block>
                            </view>
                        </view>
                    </TnScrollList>
                    <!--                    <view class="server_scroll" ref="server_scroll" @scroll="onScroll">-->
                    <!--                        <view class="scroll-list">-->
                    <!--                            <view class="scroll-list__line" v-for="(item, index) in newmenu" :key="index">-->
                    <!--                                <block v-for="(item1, index1) in item" :key="index1">-->
                    <!--                                    <view @click="listClick(item1)">-->
                    <!--                                        <view class="scroll-list__line__item"-->
                    <!--                                              :class="[(index1 === item.length - 1) && 'scroll-list__line__item&#45;&#45;no-margin-right']"-->
                    <!--                                        >-->
                    <!--                                            <image class="scroll-list__line__item__image" :src="item1.img"-->
                    <!--                                                   mode=""></image>-->
                    <!--                                            <text class="scroll-list__line__item__text">{{ item1.title }}</text>-->
                    <!--                                        </view>-->
                    <!--                                    </view>-->
                    <!--                                </block>-->
                    <!--                            </view>-->
                    <!--                        </view>-->
                    <!--                    </view>-->
                </view>

                <view class="orders flex_box" @click="toCreation">
                    <view class="orders_left">我的创作中心</view>
                    <view class="orders_right">
                        <text class="orders_text">立即进入</text>
                        <TnIcon color="#D2D2D2" name="right" size="30rpx"></TnIcon>
                    </view>
                </view>
                <view class="orders">
                    <view class="orders_left">我的钱包</view>
                    <view class="item" style="padding: 0 30rpx 30rpx 30rpx;">
                        <block v-for="(item,index) in data.wallet" :key="index">
                            <view class="flex" style="position: relative" @click="listClick(item)">
                                <image :src="item.icon" class="item_img" mode="aspectFit"></image>
                                <text class="item_name">{{ item.title }}</text>
                            </view>
                        </block>
                    </view>
                </view>


            </view>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { Debounce } from '@/libs/antivibthrot'
import BCNotify from '@/components/notify/index.vue'
import { PlatformManage } from "@bc/sys"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoLogin, gotoSetting } from "@/routes/public-routes"
import { gotoInvoiceHistory, gotoorderList } from "@/routes/order-routes"
import {
    gotoAftersalesList,
    gotoAnchorCenter,
    gotoAuth,
    gotoCollectLists,
    gotoCommentList,
    gotoCouponHistory,
    gotoEditProfile,
    gotoelderlyFiles,
    gotoFeedback,
    gotoshareQR,
    gotoTrackList,
    gotoWallet,
    gotoWatchHistory
} from '@/routes/user-routes'
import {
    gotoarticledetails,
    gotocourseList,
    gotocreationPage,
    gotodataManage,
    gotoenjoyRecord,
    gotofilterPage,
    gotovideoPreview
} from "@/routes/create-routes"
import { getAssetsPic } from '@/common/setPicture'
import { enjoydetail, getnewContentList, homePage } from '@/api/create-api'
import { authDetail, favoriteList, likeLists } from '@/api/user-api'
import { gotointegralMallGoods, gotoShoppingCart } from '@/routes/goods-routes'
import { gotosearch } from "@/routes/service-routes"
import { getQRPage } from '@/api/open-api'
import TnTabs from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue"
import TnTabsItem from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue"
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'
import { gotoDeviceManag, gotoDeviceSetup } from "@/routes/active-routes"
import { gotoCoupon } from "@/routes/care-routes"
import { gotoRoomManag, gotoScenServer } from "@/routes/wisdom-routes"

interface tabulation {
    id: number,
    name: string,
    src: string,
}

interface transaction {
    id: number,
    name: string,
    src: string
}

interface tabsType {
    id: number,
    name: string
}


interface Data {
    userinfo: any,
    isRequireLogin: boolean,
    homeObj: any,
    authInfo: any,
    safeBotomHeight: number
    topNavList: any
    topNavIndex: number
    istag: number
    typeList: any
    dataList: any
    tabsData: tabsType[],
    wisdomList: any,
    currentTabIndex: number,
    serviceList: any,
    productList: any,
    menuList: any,
    wallet: any,
}


const data = reactive<Data>({
    userinfo: {},
    isRequireLogin: false,
    currentTabIndex: 0,
    homeObj: {},
    authInfo: {},
    safeBotomHeight: 0,
    tabsData: [
        { id: 1, name: '服务订单' },
        { id: 2, name: '商品订单' }
    ],
    serviceList: [
        { name: '待支付', icon: getAssetsPic("/mine/v1/my_wp.svg"), inds: 0, taborIndex: 1, badge: 0 },
        { name: '待服务', icon: getAssetsPic("/mine/v1/my_ws.svg"), inds: 0, taborIndex: 2, badge: 0 },
        { name: '待完成', icon: getAssetsPic("/mine/v1/my_wf.svg"), inds: 0, taborIndex: 3, badge: 0 },
        { name: '待评价', icon: getAssetsPic("/mine/v1/my_wc.svg"), inds: 0, taborIndex: 4, badge: 0 }
    ],
    productList: [
        { name: '待支付', icon: getAssetsPic("/mine/v1/my_wp.svg"), inds: 1, taborIndex: 1, badge: 0 },
        { name: '待发货', icon: getAssetsPic("/mine/v1/my_wt.svg"), inds: 1, taborIndex: 2, badge: 0 },
        { name: '待收货', icon: getAssetsPic("/mine/v1/my_wr.svg"), inds: 1, taborIndex: 3, badge: 0 },
        { name: '待评价', icon: getAssetsPic("/mine/v1/my_wc.svg"), inds: 1, taborIndex: 4, badge: 0 }
    ],
    wallet: [
        {
            name: 'youhuiquan',
            title: '优惠券',
            icon: getAssetsPic("/mine/v1/my_wall_6.png"),
            url: gotoCouponHistory,
            param: { sub: 0 }
        },
        {
            name: 'youhuiquan',
            title: '红包',
            icon: getAssetsPic("/mine/v1/my_wall_7.png"),
            url: gotoCouponHistory,
            param: { sub: 1 }
        },
        {
            name: 'myWallet',
            title: '钱包',
            icon: getAssetsPic("/mine/v1/my_wall_wallet.svg"),
            url: gotoWallet
        }
    ],
    wisdomList: [
        // { name: '使用者管理', icon: getAssetsPic("/mine/v1/my_wis1.svg"), inds: 2 },
        // { name: '康护知识', icon: getAssetsPic("/mine/v1/my_wis2.svg"), inds: 2 },
        // { name: '照护云相册', icon: getAssetsPic("/mine/v1/my_wis3.svg"), inds: 2 },
        // { name: '康护助手', icon: getAssetsPic("/mine/v1/my_wis4.svg"), inds: 2 },
        { wid: "5", name: '房间管理', icon: getAssetsPic("/mine/v1/my_wis5.svg") },
        { wid: "6", name: '设备管理', icon: getAssetsPic("/mine/v1/my_wis6.svg") },
        { wid: "7", name: '场景服务', icon: getAssetsPic("/mine/v1/my_wis7.svg") },
        { wid: "8", name: '智护链接', icon: getAssetsPic("/mine/v1/my_wis8.svg") },
        { wid: "9", name: '消息设置', icon: getAssetsPic("/mine/v1/my_wis9.svg") }
    ],
    menuList: [
        {
            name: "shouhou",
            title: "售后/退款",
            img: getAssetsPic("/mine/v1/my_list_sh1.png"),
            affair_id: 0
        },
        {
            name: "pingjia",
            title: "我的评价",
            img: getAssetsPic("/mine/v1/my_list_pj.png"),
            affair_id: 64
        },
        {
            name: "shoucang",
            title: "收藏",
            img: getAssetsPic("/mine/v1/my_list_sc.png"),
            affair_id: 67
        },
        {
            name: "zuji",
            title: "足迹",
            img: getAssetsPic("/mine/v1/my_list_zj.png"),
            affair_id: 0
        },
        {
            name: "cart",
            title: "购物车",
            img: getAssetsPic("/mine/v1/my_list_gwc.png"),
            affair_id: 0
        },
        {
            name: "jiufen",
            title: "建议/纠纷",
            img: getAssetsPic("/mine/v1/my_list_jf.png"),
            affair_id: 0
        },
        {
            name: "dizhi",
            title: "地址管理",
            img: getAssetsPic("/mine/v1/my_list_dz.png"),
            affair_id: 0,
            param: { seleType: 'user' }
        },
        {
            name: "dangan",
            title: "老人档案",
            // url: gotoelderlyFiles(),
            img: getAssetsPic("/mine/v1/my_list_da.png"),
            affair_id: 61
        },
        {
            name: "yaoqing",
            title: "邀请好友",
            img: getAssetsPic("/mine/v1/my_list_yq.png"),
            affair_id: 59
        },
        {
            name: "kaipiao",
            title: "开票记录",
            img: getAssetsPic("/mine/v1/my_list_kp.png"),
            affair_id: 62
        },
        {
            name: "serve",
            title: "平台客服",
            img: getAssetsPic("/mine/v1/my_list_kf.png"),
            affair_id: 0
        },
        {
            name: "qualification_list",
            title: "资质清单",
            img: getAssetsPic("/mine/v1/my_list_qd.svg"),
            affair_id: 0
        },
        {
            name: "quality_announcement",
            title: "质量公告",
            img: getAssetsPic("/mine/v1/my_list_zz.svg"),
            affair_id: 0
        }
        /* {
            name: "hetong",
            title: "合同管理",
            img: getAssetsPic("/mine/my_icon_hetong.png"),
            affair_id: 63,
        }, */
        /* {
            name: "kefu",
            title: "致电客服",
            img: getAssetsPic("/mine/v1/my_list_kf.png"),
            affair_id: 65,
        }, */
    ],
    topNavList: [
        { id: 1, name: '作品' },
        { id: 2, name: '收藏' },
        { id: 3, name: '点赞' }
    ],
    topNavIndex: 0,
    istag: 0,
    typeList: [
        { name: '全部', id: 0 },
        { name: '已发布', id: 5 },
        { name: '审核中', id: 2 },
        { name: '未通过', id: 3 }
    ],
    dataList: []
})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const newmenu = computed(() => {
    // 我的服务列表分割成二维数组
    const arrs = [...data.menuList]
    const cutIds = Math.round(arrs.length / 2)
    return [arrs.splice(0, cutIds), arrs]
})

interface Events {
    (e: 'showLifeMenu'): void
}

const emit = defineEmits<Events>()

onMounted(() => {
    // uni.getSystemInfo({
    //     success: (res: any) => {
    //         data.safeBotomHeight = res.safeAreaInsets.bottom
    //     }
    // })

    // getuserInfo()
    // PlatformManage.isRequireLogin().then((isRequireLogin) => {
    //     data.isRequireLogin = isRequireLogin
    // })
})

const toCreation = () => {
    if (!data.isRequireLogin) {
        gotocreationPage()
    }
    else {
        bcNotify.value.show('登录后查看')
    }
}


const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            (paging.value as any).complete([])
            return
        }
        data.topNavList[data.topNavIndex].id == 1 && getnewContentList({
            pageNumber,
            pageSize,
            query: {
                audit: data.istag ? data.istag : null
            }
        }).then((res: any) => {
            (paging.value as any).complete(res.data)
        })

        data.topNavList[data.topNavIndex].id == 2 && favoriteList({
            pageNumber,
            pageSize,
            query: {
                isUser: 1
            },
            sorts: []
        }).then((res: any) => {
            (paging.value as any).complete(res.data)
        })

        data.topNavList[data.topNavIndex].id == 3 && likeLists({
            pageNumber,
            pageSize,
            query: {
                isUser: 1
            },
            sorts: []
        }).then((res: any) => {
            (paging.value as any).complete(res.data)
        })


    })
}

const changeType = (item: any) => {
    data.istag = item.id;
    (paging.value as any).reload()
}

const listClick = (item) => {
    console.log(item)
    Debounce(() => {
        switch (item.name) {
            case "kefu":
                // uni.makePhoneCall({
                //     phoneNumber: this.$store.state.about.emergencyContact
                // })
                break
            case "serve":
                // gotoIMSessionChat({ type: 1 })
                break
            case "qualification_list":
                // gotoUserQuality({ type: item.name })
                break
            case "quality_announcement":
                // gotoUserQuality({ type: item.name })
                break
            case 'shoucang':
                gotoCollectLists()
                break
            case 'shouhou':
                gotoAftersalesList()
                break
            case 'pingjia':
                gotoCommentList()
                break
            case 'zuji':
                gotoTrackList()
                break
            case 'yaoqing':
                toshareQR()
                break
            case 'kaipiao':
                gotoInvoiceHistory()
                break
            case 'jiufen':
                gotoFeedback()
                break
            case 'youhuiquan':
                gotoCoupon()
                break
            case 'cart':
                gotoShoppingCart()
                break
            default:
                item.url()
        }
    }, 1000)
}

const getuserInfo = () => {
    PlatformManage.getToken().then((res: any) => {
        data.userinfo = res
        console.log('获取info', data.userinfo)
    })
    homePage({}).then((res) => {
        data.homeObj = res
    })
    authDetail().then((res) => {
        data.authInfo = res
    })
}

const toLogin = () => {
    gotoLogin({})
}
const toSetting = () => {
    gotoSetting()
}

const todataManage = (type: number) => {
    console.log(type)
    gotodataManage({ type, isuser: 1 })
}

const bcNotify = ref()

const toenjoy = () => {
    enjoydetail({}).then((res: any) => {
        if (!res.id) {
            gotofilterPage()
        }
        else {
            gotoenjoyRecord()
        }
    })
}

const scanCode = () => {
    uni.scanCode({
        success: function(res) {

            const [path, str] = res.path.split('?')
            const [type, scene] = str.split('=')

            getQRPage({ scene }).then((page) => {
                console.log('page', page)
                uni.navigateTo({
                    url: decodeURIComponent(page)
                })
            }).catch(() => {
                bcNotify.value.error('二维码失效')
                return
            })

        }
    })
}

const toEditProfile = () => {
    gotoEditProfile()
}

const showMenu = () => {
    emit('showLifeMenu')
}

const clickAuth = () => {
    gotoAuth()
}

const toshareQR = () => {
    gotoshareQR()
}

const allwaterItem = (item: any) => {
    console.log('data.topNavIndex', data.topNavIndex)

    console.log('item', item)

    // 跳转发布作品列表详情
    if (data.topNavIndex == 0) {
        if (item.audit.audit == 5) {
            item.type == 1 && gotoarticledetails({ id: item.id })
            item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
            item.type == 3 && gotoarticledetails({ id: item.id })

            return
        }

        if (item.audit.audit == 2) {
            bcNotify.value.show('作品审核中...')
            return
        }

        if (item.audit.audit == 3) {
            bcNotify.value.show('作品被驳回...')
            return
        }
    }
    // 跳转收藏点赞类型列表详情
    item.type == 1 && gotoarticledetails({ id: item.id })
    item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
    item.type == 3 && gotoarticledetails({ id: item.id })

}

const gotocarrySearch = () => {
    gotosearch({})
}

const functionMenu = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        item.id == 1 && gotoShoppingCart()
        item.id == 2 && gotoorderList()
        item.id == 3 && gotointegralMallGoods()
        item.id == 4 && gotoAnchorCenter()
        item.id == 5 && gotoWatchHistory('')
        item.id == 6 && gotocourseList({})
        item.id == 7 && gotocreationPage()
        item.id == 8 && toenjoy()
    })
}

const gotoPersonnel = (item, inds) => {
    PlatformManage.isRequireLogin().then(isRequireLogin => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        // 跳转
        item.wid === "5" && gotoRoomManag()
        item.wid === "6" && gotoDeviceManag()
        item.wid === "7" && gotoScenServer(1)
        item.wid === "8" && gotoScenServer(2)
        item.wid === "9" && gotoDeviceSetup()
    })
}

const toFunctionPage = () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoorderList()
    })

}

const changetabs = (item: any, index: number) => {
    data.currentTabIndex = index
}

const changeNav = (item: any, index: number) => {
    if (index == 0) {
        data.istag = 0
    }
    data.topNavIndex = index;
    (paging.value as any).reload()
    console.log(item)
}

defineExpose({
    getuserInfo
})


</script>

<style lang="scss" scoped>
:deep(.tn-tabs__bar) {
    height: 8rpx;
}

:global(.tn-tabs__bar) {
    height: 8rpx;
}

.swiper {
    flex: 1;
    height: 100%;
}


.my-bg-top {
    height: 470rpx;
    width: 100%;
    padding: 30rpx;
    background: #56CC7D;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.set_li {
    font-size: 24rpx;
    font-weight: 400;
    color: #FFFFFF;
    margin-left: 40rpx;
    text-align: center;

    .txt {
        margin-top: 5rpx;
    }

    .top_menu_right_icon {
        width: 56rpx;
        height: 56rpx;

    }
}


.top_menu {
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .top_menu_left_icon {
        width: 40rpx;
        height: 40rpx;
    }

    .top_menu_right {
        display: flex;
        align-items: center;
        padding-right: 10rpx;
        box-sizing: border-box;

        .top_menu_right_icon {
            width: 40rpx;
            height: 40rpx;

            &.share {
                margin-left: 40rpx;
            }
        }
    }
}

.content_wrap {
    padding: 24rpx;
    position: relative;
}

.avatar_box {
    box-sizing: border-box;
    width: 100%;

    .is_login {
        .avatar_box_top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10rpx;

            .avatar_box_left {
                display: flex;
                align-items: center;

                .avatar_img_box {
                    position: relative;

                    .edit_img {
                        position: absolute;
                        bottom: 0;
                        right: 20rpx;
                        width: 38rpx;
                        height: 38rpx;
                    }
                }
            }
        }

        .QR_icon {
            width: 48rpx;
            height: 48rpx;
        }

    }

    .tologin {
        display: flex;
        align-items: center;
    }

    .avatar_img {
        width: 116rpx;
        height: 116rpx;
        border: 5rpx solid #a4ebba;
        border-radius: 50%;
        margin-right: 20rpx;
    }

    .user_text_box {
        z-index: 0;

        .user_namr {
            font-size: 36rpx;
            color: #ffffff;
            margin-bottom: 8rpx;
            padding-top: 30rpx;
        }

        .user_bcId_box {
            display: flex;
            align-items: center;
            margin-bottom: 16rpx;

            .user_bcId {
                font-size: 24rpx;
                color: #FFFFFF;
                margin-right: 12rpx;
            }

            .QR_img {
                width: 28rpx;
                height: 28rpx;
            }
        }

        .user_auth {
            display: inline-block;
            height: 48rpx;
            padding: 0 15rpx 0rpx 0;
            margin-bottom: 20rpx;
            color: #2D4468;
            font-size: 24rpx;
            background: linear-gradient(93deg, rgba(190, 216, 255, 0.1) 0%, rgba(139, 184, 255, 0.28) 100%);
            border-radius: 0rpx 0rpx 28rpx 0rpx;

            text {
                margin: 0 10rpx;
            }

            .icon {
                width: 32rpx;
                height: 32rpx;
                position: relative;
                top: 8rpx;
            }
        }
    }

    .user_dace {
        font-size: 24rpx;
        color: #A5A5A5;
        position: relative;
        z-index: 1;
    }

    .tologin_text {
        font-weight: 600;
        font-size: 38rpx;
        color: #ffffff;
        margin-bottom: 8rpx;
        z-index: 0;
    }

}

.operate_box {
    .operate_data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx 100rpx 60rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: #ACACAC;

        .operate_data_item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 10rpx;
            box-sizing: border-box;

            .data_number {
                margin-right: 8rpx;
                font-size: 32rpx;
                color: #ffffff;
                font-weight: 600;
                margin-bottom: 8rpx;
            }

            .data_text {
                color: #ffffff;
                opacity: 0.6
            }

            &.haveborder {
                box-sizing: border-box;
            }
        }
    }

    .operate_btn {
        display: flex;
        align-items: center;

        .edit_btn {
            padding: 10rpx 24rpx;
            box-sizing: border-box;
            background: #29C86F;
            border-radius: 28rpx;
            color: #FFFFFF;
            font-size: 24rpx;
            margin-right: 20rpx;
        }

        .edit_img {
            width: 56rpx;
            height: 56rpx;
        }

    }
}


.my_functionMuen {
    background: #FFFFFF;
    border-radius: 32rpx;
    width: 100%;
    padding: 0 0 30rpx 0;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    overflow: hidden;
    position: relative;

    .top_left {
        display: flex;
        align-items: center;
        color: #ABABAB;
        font-size: 26rpx;
        position: absolute;
        right: 20rpx;
        top: 20rpx;
    }

    .item {
        color: #333333;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        position: relative;

        .flex {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 40rpx;

            .item_name {
                margin-top: 10rpx;
                color: #1B1B1B;
                font-size: 24rpx;
            }

            .item_img {
                width: 68rpx;
                height: 68rpx;
            }
        }
    }


}

.orders {
    margin: 28rpx 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 20rpx rgba(0, 0, 0, 0.04);
    border-radius: 32rpx;
    display: flex;
    flex-direction: column;
    padding: 30rpx;

    &.flex_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
    }


    .orders_left {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }

    .orders_right {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        margin-right: 12rpx;

        .orders_text {
            color: #399BFC;
        }
    }

    .orders_arrow {
        width: 32rpx;
        height: 32rpx;
        background-color: #ebebeb;
        border-radius: 50%;
        margin-left: 6rpx;
    }

    .order_right_box {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding-right: 20rpx;

        .title {
            font-size: 26rpx;
            color: #999999;
        }
    }

    .item {
        color: #333333;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        position: relative;

        .flex {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 40rpx;

            .item_name {
                margin-top: 10rpx;
                color: #1B1B1B;
                font-size: 24rpx;
            }

            .item_img {
                width: 68rpx;
                height: 68rpx;
            }
        }
    }
}

.server_scroll {
    padding: 0 30rpx 30rpx;

    :deep(.tn-scroll-list__indicator-block) {
        background-color: rgba(0, 216, 134, 0.8) !important;
    }

    .scroll-list {
        display: flex;
        flex-direction: column;

        &__line {
            display: flex;
            flex-direction: row;
            margin-top: 40rpx;

            &__item {
                width: 120rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-right: 10rpx;

                &__image {
                    width: 64rpx;
                    height: 64rpx;
                }

                &__text {
                    margin-top: 12rpx;
                    color: #1B1B1B;
                    font-size: 24rpx;
                    text-align: center;
                }

                &--no-margin-right {
                    margin-right: 0;
                }
            }
        }

        &__line:nth-child(1) {
            margin-top: 0;
        }
    }
}

.smart {
    &-title {
        font-weight: bold;
        font-size: 32rpx;
        color: #0B0B0B;
        padding: 30rpx;
    }

    .item {
        grid-template-columns: repeat(5, 1fr);

        .flex {
            margin-top: 0rpx;
        }
    }
}

.content_list_box {
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    width: 100%;
    background: #fff;

    .content_top_box {
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;

        .top_navBox {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .navList_box {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                width: 300rpx;

                .navItem {
                    font-size: 30rpx;
                    font-weight: 400;
                    color: #999999;

                    &.is_Select {
                        font-size: 32rpx;
                        color: #0B0B0B;
                        font-weight: 500;
                    }
                }
            }
        }

        .type_navBox {
            margin-top: 40rpx;
            display: flex;
            align-items: center;

            .type_item {
                padding: 8rpx 20rpx;
                box-sizing: border-box;
                border-radius: 32rpx 32rpx 32rpx 32rpx;
                border: 2rpx solid #C4C4C4;
                color: #6E6E6E;
                font-size: 28rpx;
                margin-right: 30rpx;

                &.type_select {
                    border: 2rpx solid #EA3E1A;
                    color: #EA3E1A;
                }
            }
        }
    }

    .list_box {
        min-height: 1200rpx;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
    }

    .not_data_box {
        margin-bottom: 50rpx;
        height: 500rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .not_data_img {
            width: 280rpx;
            height: 280rpx;
        }

        .not_data_text {
            font-size: 28rpx;
            color: #999999;
        }
    }

}
</style>
