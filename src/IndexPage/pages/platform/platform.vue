<template>
    <view class="container">
        <z-paging-swiper >
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background: #fff;'" :addheight="150"></pageTopbg>
                <!-- 顶部导航栏 -->
                <view class="navbar_box" :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }" :class="{ 'is_hidebox': data.showNav }">
                        <template v-if="!data.showNav">
                            <image
                                @click="imgInitIndex"
                                class="top_logo_img"
                                :src="getAssetsUrl('/leyou/logo/leyou_logo.png')"
                                mode="scaleToFill"
                            />
                            <view class="navbar_list">
                                <view class="navbar_item" v-for="(item, index) in data.topNavList" :key="item.id" @click="changeTabs(item,index)">
                                    <!-- :class="{ 'un_open': item.id == 99 }" -->
                                    <view class="navbar_text" v-if="index != 0">{{ item.text }}</view>
                                    <image
                                        v-else
                                        class="navbar_img"
                                        :src="getAssetsUrl('/leyou/logo/classroom_icon.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="select_navbar" v-if="data.currentTabIndex == index"></view>
                                </view>
                            </view>
                        </template>
                        <template v-else>
                            <view class="hide_nav_box" :class="{ 'first_Navbox': data.currentTabIndex == 999 }">
                                <view class="back_icon" @click="backInitIndex">
                                    <TnIcon name="left" color="#2F2F2F" size="38" bold ></TnIcon>
                                </view>
                                <view class="hide_scroll" :class="{ 'first_page': data.currentTabIndex == 999 }">
                                    <view class="hide_nav_list">
                                        <view class="hideNav_item" :class="{ 'is_select': data.hidNavIndex == index , 'not_right': data.hidNavList.length == (index + 1) }" @click="changeHidNav(item, index)" v-for="(item,index) in data.hidNavList" :key="item.id">
                                            <view>
                                                {{ item.text ? item.text : item.name }}
                                            </view>
                                            <view class="select_box" v-if="data.hidNavIndex == index"></view>
                                        </view>
                                    </view>
                                </view>

                                <view class="hide_nav_Space" v-if="data.currentTabIndex != 999"></view>

                                <view class="icon_box">
                                    <view @click.stop="gotocarrySearch">
                                        <TnIcon name="search" color="#2C2C2C" size="38" bold></TnIcon>
                                    </view>
                                </view>
                            </view>
                        </template>

                    </view>
                </view>

                <view class="channel_nav_box" v-if="data.hidNavIndex == 3 && data.showNav && data.currentTabIndex == 999">
                    <view class="channel_navList">
                        <TnTabs
                            v-model="data.channelNavIndex"
                            bg-color="transparent"
                            bar-color="#EA3E1A"
                            color="#666666"
                            active-color="#EA3E1A"
                            :bottom-shadow="false">
                                <TnTabsItem
                                v-for="(item, index) in data.channelNavList"
                                :key="index"
                                :title="item.name"
                                font-size="32rpx"
                                active-color="#333333"
                                color="#666666"
                                @click="changeChannelTabs(item)"
                                >
                                </TnTabsItem>
                        </TnTabs>
                    </view>
                    <view class="ranking_list" v-if="data.channelId == 998">
                        <view
                            class="scrool_item"
                            @click="changeToplist(item,index)"
                            :class="{ 'is_select': data.topIndex == index }"
                            v-for="(item,index) in data.rankingList" :key="item.id">
                            <image
                                class="item_img"
                                :src="data.topIndex == index ? getAssetsUrl(item.secondIcon) : getAssetsUrl(item.icon)"
                                mode="aspectFill"
                            />
                            <view class="item_name">{{ item.name }}</view>
                            <view class="select_box" v-if="data.topIndex == index"></view>
                        </view>
                    </view>

                </view>

            </template>


            <view class="topNavbarBg_box">
                <!-- 输入框盒子 -->
                <view class="home_top_box" v-if="!data.showNav" id="topView">

                    <!-- 红包入口 -->
                    <!-- v-if="data.envelopeStatus && data.activityType" -->
                    <image
                        v-if="data.envelopeStatus && data.activityType"
                        class="nav_hongbao"
                        :src="getAssetsUrl('/leyou/home/left_hongbao.svg')"
                        mode="scaleToFill"
                        @click="goRedBag"
                    />


                    <view class="inp_box" :class="{ 'have_hongbao': data.envelopeStatus && data.activityType }" @click="tosearch">
                        <!-- 放大镜 -->
                        <view
                            class="scanning_icon"
                            @click.stop="carrySearch"
                        >
                            <TnIcon name="search" color="#999999" size="32" bold offset-top="4"></TnIcon>
                        </view>
                        <!-- 搜索轮播文字 -->
                        <!-- data.envelopeStatus && data.activityType -->
                        <view class="inp_left" :class="{ 'have_hongbao': data.envelopeStatus && data.activityType }">
                            <swiper
                                class="swiper"
                                circular
                                :autoplay="true"
                                :interval="5000"
                                :duration="500"
                                :vertical="true"
                                @change="swiperChange"
                            >
                                <swiper-item v-for="(item,index) in data.noticeData" :key="index">
                                    <view class="swiper_item_item">{{ item }}</view>
                                </swiper-item>
                            </swiper>
                        </view>
                        <!-- 输入框右侧 -->
                        <view class="inp_right">
                            <image
                                class="camera_icon"
                                :src="getAssetsUrl('/leyou/home/scanning-icon.svg')"
                                mode="scaleToFill"
                                @click.stop="scanCode"
                            />
                            <view class="search_btn" @click.stop="carrySearch">搜索</view>
                        </view>
                    </view>


                    <!-- 主页右侧栏切换按钮 -->
                    <view class="top_left">
                        <!-- <view class="more_icon" @click="changebubble">
                            <TnIcon name="more-horizontal" color="#646464" size="54" bold ></TnIcon>
                        </view> -->
                        <image
                            @click="openAisearch"
                            class="ai_search"
                            :src="getAssetsUrl('/leyou/home/ai_search_icon.svg')"
                            mode="scaleToFill"
                        />

                        <image
                            @click="changebubble"
                            class="more_icon"
                            :src="getAssetsUrl('/leyou/home/more_icon.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view>

            </view>

            <view class="listRef" style="height: 100%;">

                <!-- 首页 -->
                <indexList
                    ref="indexListRef"
                    v-if="data.currentTabIndex == 999"
                    :hidNavIndex="data.hidNavIndex"
                    :channelId="data.channelId"
                    :rankType="data.rankType"
                    :liveType="data.liveType"
                    @hideNav="hideNav"
                    @showLifeMenu="showMenu"
                    @changeNav="indexListchangeNav"
                    @gethidNavList="gethidNavList"
                ></indexList>

                <!-- 云课堂 -->
                <articleList
                    ref="articleListRef"
                    v-if="data.currentTabIndex == 0"
                    :hidNavIndex="data.hidNavIndex"
                    :liveType="data.liveType"
                    @hideNav="hideNav"
                    @changeNav="indexListchangeNav"
                    @gethidNavList="gethidNavList"
                    ></articleList>

                <!-- 沙龙 -->
                <salonList
                    ref="salonPage"
                    v-if="data.currentTabIndex == 1"
                    :hidNavIndex="data.hidNavIndex"
                    :liveType="data.liveType"
                    @hideNav="hideNav"
                    @changeNav="indexListchangeNav"
                    @gethidNavList="gethidNavList"
                    ></salonList>

                <!-- 爱聊 -->
                <view v-if="data.currentTabIndex == 2" :style="{ height: data.parentHeight + 'px' }">
                    <likechatPage
                        ref="likePage"
                        :liveType="data.liveType"
                        @gethidNavList="gethidNavList"
                        :parentHeight="data.parentHeight"
                        :topViewHeight="data.topViewHeight"
                    ></likechatPage>
                </view>

                <!-- 文娱 -->
                <entertainmentList
                    v-if="data.currentTabIndex == 3"
                    ref="entertainmentListRef"
                    @gethidNavList="gethidNavList"
                ></entertainmentList>

                <BCNotify ref="bcNotify"></BCNotify>

            </view>


            <template #bottom>
                <view class="index_bottom_box"></view>
            </template>

        </z-paging-swiper>

        <!-- ai搜索 -->
        <TnPopup v-model="data.showAiSearch" open-direction="bottom" :z-index="30090">
            <view class="ai_search_box">
                <view class="top_box"></view>
                <view class="title_box">
                    <view v-if="!data.touchSearchText" class="not_text">语音搜索，轻松找到您想要的~</view>
                    <view v-else>{{ data.touchSearchText }}</view>
                </view>

                <view class="sound_icon_box">
                    <image
                        class="sound_icon"
                        :src="getAssetsUrl(data.isTouch ? '/leyou/home/to_sound_height_icon.png' : '/leyou/home/to_sound_icon.svg')"
                        mode="scaleToFill"
                    />
                </view>
                <view class="bubble_box">
                    <template v-if="data.isTouch">
                        <image
                            class="bubble_img"
                            :src="getAssetsUrl('/leyou/home/bubble_img.svg')"
                            mode="scaleToFill"
                        />
                        <view class="is_press_text">松开即可搜索</view>
                    </template>
                </view>
                <image
                    @touchstart="startTime" @touchend="endTime"
                    class="fingerprint_img"
                    :src="getAssetsUrl('/leyou/home/fingerprint_icon.svg')"
                    mode="scaleToFill"
                />
                <view class="fingerprint_text">请按住说话</view>
            </view>
        </TnPopup>

    </view>
</template>

<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { rewardExist, speechText } from '@/api/user-api'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import { onShow } from "@dcloudio/uni-app"

import indexList from './components/indexList.vue'
import articleList from './components/articleList.vue'
import likechatPage from './components/likechatPage.vue'
import salonList from './components/salonList.vue'
import entertainmentList from './components/entertainmentList.vue'

import { gotoRegister } from '@/routes/goods-routes'
import { ref, reactive, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
import { gotosearch, gotoScanCode } from "@/routes/service-routes"
import { gotoChannel } from '@/routes/create-routes'
import { gotoCitychange } from '@/routes/user-routes'
import { gotoChatPage } from "@/routes/nim-routes"
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { createTeam } from "@/api/nim-api"
import { PlatformManage } from '@bc/sys'
import { featured, categoryShow } from '@/api/service-api'
import { gotoLogin } from "@/routes/public-routes"
import { liveLists } from '@/api/live-api'

import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'
import { getQRPage } from '@/api/open-api'

import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { uploadAudio } from '@/api/file-api'

const appInstance = getCurrentInstance().proxy


interface Data {
    parentHeight: number
    tabsData: any
    topNavList: any
    currentTabIndex: number
    sonTabIndex: number
    showrightMenu: boolean
    showbubble: boolean
    nowCity: string
    noticeData: any
    activityType: boolean
    envelopeStatus: boolean
    swiperIndex: number
    titleTop: number
    sBarHeight: number
    titleRight: number
    showNav: boolean
    hidNavList: any
    hidNavIndex: number
    topViewHeight: number
    channelNavList: any
    channelNavIndex: number
    channelId: string | number
    rankingList: any
    topIndex: number
    rankType: number
    liveType: any
    showAiSearch: boolean
    isTouch: boolean
    touchSearchText: string
    RECORDER: any

}
const data = reactive<Data>({
    parentHeight: 0,
    envelopeStatus: true,
    tabsData: [
        { id: 1, text: '关注' },
        { id: 2, text: '发现' },
        { id: 3, text: '附近' },
        { id: 4, text: '百科' }
    ],
    topNavList: [
        { id: 1, text: '云课堂' },
        { id: 3, text: '沙龙' },
        { id: 7, text: '聊天' }
    ],
    hidNavList: [
        { id: 1, text: '关注' },
        { id: 2, text: '发现' },
        { id: 3, text: '附近' }
    ],
    activityType: false,
    currentTabIndex: 999,
    sonTabIndex: 1,
    showrightMenu: false,
    showbubble: false,
    nowCity: '广州',
    noticeData: [
        '健康',
        '养生',
        '志愿者',
        '兴趣学习',
        '适品购物'
    ],
    swiperIndex: 0,
    titleTop: 0,
    sBarHeight: 0,
    titleRight: 0,
    showNav: false,
    hidNavIndex: 1,
    topViewHeight: 60,
    channelNavList: [],
    channelNavIndex: 1,
    channelId: 999,
    rankingList: [
        { id: 1, name: '人气榜', icon: '/leyou/create/popularity-icon.svg', secondIcon: '/leyou/create/hig-popularity-icon.svg' },
        { id: 2, name: '视频榜', icon: '/leyou/create/video-icon.svg', secondIcon: '/leyou/create/hig-video-icon.svg' },
        { id: 3, name: '热议榜', icon: '/leyou/create/discussion-icon.svg', secondIcon: '/leyou/create/hig-discussion-icon.svg' },
        { id: 4, name: '收藏榜', icon: '/leyou/create/collection-icon.svg', secondIcon: '/leyou/create/hig-collection-icon.svg' }
    ],
    topIndex: 0,
    rankType: 1,
    liveType: {},
    showAiSearch: false,
    isTouch: false,
    touchSearchText: '',
    RECORDER: uni.getRecorderManager()

})

interface Props {
    showrecommend:boolean,
}
const props = defineProps<Props>()

interface Events {
    (e: 'showLifeMenu'): void,
    (e: 'showRightMenu'): void,

}
const emit = defineEmits<Events>()


const articleListRef = ref()
watch(() => props.showrecommend, (newvalue, oldvalue) => {
    if (!newvalue) {
        (articleListRef.value as any).pagingReload()
    }
})

onMounted(async () => {

    data.topNavList.push({ id: 99, text: '文娱' })


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

    console.log(',data.titleRight', data.titleRight)


    getCity()

    // 查询红包活动
    rewardExist({ platformType: 2 }).then(res => {
        if (res == 0) {
            data.activityType = false
            return
        }
        data.activityType = true
    }).catch((error:any) => {
        data.activityType = false
    })

    featured({
        pageSize: 10,
        pageNumber: 1,
        query: {
            platformType: 2,
            sortType: 7
        }
    }).then((res:any) => {
        console.log('res', res)

    })
    // 获取百科类目
    getSortList()

    const query = await uni.createSelectorQuery().in(appInstance)
    query.select('.listRef').boundingClientRect((res: any) => {
        // console.log('设备信息', uni.getDeviceInfo())
        // console.log('设备信息', uni.getSystemInfoSync())

        const env = uni.getDeviceInfo().platform

        // #ifdef APP-PLUS
        if (env == 'ios') {
            data.parentHeight = res.height - 45 + data.sBarHeight
        }
        else {
            data.parentHeight = res.height + data.sBarHeight - 10
        }
        // #endif

        // #ifdef H5
        data.parentHeight = res.height + data.sBarHeight - 10
        // #endif

        // #ifdef MP-WEIXIN
        if (env == 'ios') {
            data.parentHeight = res.height - 12
        }
        else if (env == 'android') {
            data.parentHeight = res.height + 24
        }
        else {
            data.parentHeight = res.height - 12
        }
        // #endif
    }).exec()
    console.log('7891011,data.titleRight', data.titleRight)


    // 百科 云课堂 沙龙
    const liveArr = [5, 6, 8]
    liveArr.forEach((item:any) => {
        initLive(item)
    })

    query.select('#topView').boundingClientRect((res: any) => {
        if (res) {
            data.topViewHeight = (res.height + 6)
            console.log('data.topViewHeight', data.topViewHeight)
        }
    }).exec()

    console.log('78,data.titleRight', data.titleRight)


    data.RECORDER.onStart(() => {
        console.log('开始录音')

    })

    // 结束录音
    data.RECORDER.onStop((e: any) => {
        console.log('结束录音e', e)

    })

})

// 类目
const getSortList = () => {

    categoryShow({
        id: 9
    }).then((res:any) => {
        data.channelNavList = [
            { id: 1, name: '关注' },
            { id: 999, name: '推荐' },
            res[0],
            res[1],
            { id: 2, name: '视频' },
            { id: 3, name: '图片' },
            { id: 998, name: '热榜' },
            res[2],
            res[3]
        ]

    })
}

onShow(() => {

})

const getCity = () => {
    PlatformManage.getToken().then((res:any) => {
        data.nowCity = res.city ? res.city : '广州'
    })
}

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})


const bcNotify = ref()

const changeTabs = (item:any, index:number) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        data.currentTabIndex = index
        // 初始化每个模块类目index,
        data.hidNavIndex = 0
        data.showNav = true

        item.id == 1 && typePreviewReport('course')
        item.id == 3 && typePreviewReport('salon')
        item.id == 7 && typePreviewReport('chat')
        item.id == 99 && typePreviewReport('createVideo')
    })

}

const imgInitIndex = () => {
    data.currentTabIndex = 999
    // 初始化每个模块类目index
    data.hidNavIndex = 1
    data.showNav = false
    if (indexListRef.value) {
        (indexListRef.value as any).pagingReload();
        (indexListRef.value as any).changeContentHideNav()
    }
}

const goRedBag = () => {
    rewardExist({ platformType: 2 }).then(res => {
        if (res == 0) {
            bcNotify.value.error('活动暂未开始')
        }
        else {
            gotoRegister()
        }
    }).catch((error:any) => {
        bcNotify.value.error(error.message)
    })
}


const showMenu = () => {
    emit('showLifeMenu')
}

const indexListchangeNav = (index:number) => {
    data.hidNavIndex = index
}

const toChannel = () => {
    gotoChannel()
}
const changebubble = () => {
    emit('showRightMenu')
    // data.showrightMenu = true
    // data.showbubble = !data.showbubble
}

const swiperChange = (e:any) => {
    data.swiperIndex = e.detail.current
}


const tosearch = () => {
    gotosearch({
        searchText: data.noticeData[data.swiperIndex]
    })
}
const carrySearch = () => {
    gotosearch({
        searchText: data.noticeData[data.swiperIndex],
        tosearch: 1
    })

}

const gotocarrySearch = () => {
    gotosearch({})
}

const scanCode = () => {
    uni.scanCode({
        success: function(res) {
            console.log('扫码res', res)

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

            // gotoScanCode(path,sceneObj)

            console.log('path', path)
            console.log('str', str)


        }
    })
}

const likePage = ref()
const salonPage = ref()
const entertainmentListRef = ref()
const reloadPage = () => {
    if (data.currentTabIndex == 0) {
        (articleListRef.value as any).pagingReload()
    }
    if (data.currentTabIndex == 1) {
        (salonPage.value as any).reloadPage()
    }
}

const hideNav = (val:boolean) => {
    data.showNav = val
}


const indexListRef = ref()
const backInitIndex = () => {
    data.showNav = false
    imgInitIndex()
    // return
    data.currentTabIndex == 999 && (indexListRef.value as any).backToTopClick()
    data.currentTabIndex == 0 && (articleListRef.value as any).backToTopClick()
    data.currentTabIndex == 1 && (salonPage.value as any).backToTopClick()
}


// 滚动显示顶部栏
const changeHidNav = (item:any, index:number) => {

    if (data.currentTabIndex == 3) {
        console.log('文娱切换顶部栏')
        if (index == 1 || index == 2) {
            bcNotify.value.show('敬请期待')
            return
        }
    }

    data.hidNavIndex = index


    data.currentTabIndex == 999 && (indexListRef.value as any).changesonNav(item, index, true)
    // data.currentTabIndex == 0 && (articleListRef.value as any).changesontabs(item, index, true)
    data.currentTabIndex == 0 && (articleListRef.value as any).changetopNav(item, index)
    data.currentTabIndex == 1 && (salonPage.value as any).changesontabs(item, index)
    data.currentTabIndex == 2 && (likePage.value as any).iscourse(item, index)
    // data.currentTabIndex == 3 && (entertainmentListRef.value as any).changesontabs(item, index)

}

const gethidNavList = (list:any) => {
    data.hidNavList = list
    console.log('data.hidNavList111', data.hidNavList)

}

const changeChannelTabs = (item:any) => {
    data.channelId = item.id;

    (indexListRef.value as any).pagingReload(true)

}

const changeToplist = (item:any, index:number) => {
    data.topIndex = index
    data.rankType = item.id;
    (indexListRef.value as any).pagingReload(true)

}

const initLive = (type: number) => {
    liveLists({
        query: {
            categoryIds: [],
            businessType: type
        },
        pageNumber: 1,
        pageSize: 10
    }).then((res:any) => {
        let key = ''
        if (type == 5) {
            key = 'channel'
        }
        if (type == 6) {
            key = 'course'
        }
        if (type == 8) {
            key = 'salon'
        }

        data.liveType[key] = res.data.length > 0
    })
}

const typePreviewReport = (type: string) => {
    Debounce(() => {
        // createCollectAndReport.prototype(type)
        createCollectAndReport().previewReport(type)
    }, 300)
}

const openAisearch = () => {

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        data.showAiSearch = true
        data.touchSearchText = ''

    })

}

const timer = ref<any>(null)

const startTime = () => {
    timer.value = setTimeout(() => {
        data.isTouch = true

        // 开始录音
        data.RECORDER.start({
            format: "mp3",
            sampleRate: 16000
        })

        data.RECORDER.onStart(() => {
            console.log('开始录音111')
        })

    }, 300)

}

const endTime = () => {
    clearTimeout(timer.value)

    data.isTouch = false

    data.RECORDER.stop()

    // 结束录音
    data.RECORDER.onStop((e: any) => {
        console.log('结束录音222', e)
        uploadAudio(e.tempFilePath).then((oss: any) => {
            console.log('oss', oss)

            speechText({ url: oss.url }).then((res: any) => {
                data.touchSearchText = res.replace(/^[#*]+|[#*]+$/g, "").replace(/[.。，,]+/g, "").trim()

                setTimeout(() => {
                    console.log('data.touchSearchText', data.touchSearchText)
                    data.showAiSearch = false
                    gotosearch({
                        searchText: data.touchSearchText,
                        tosearch: 1
                    })

                }, 800)


            }).catch((err: any) => {
                bcNotify.value.show(err.message)
            }).finally(() => {
                uni.hideLoading()
            })
        })
    })
}



defineExpose({
    getCity,
    reloadPage,
    imgInitIndex
})




</script>

<style scoped lang='scss'>
.platform_envelope {
    position: fixed;
    z-index: 10;
    bottom: 180rpx;
    right: 20rpx;

    .platform_envelope_close {
        width: 32rpx;
        height: 32rpx;
        z-index: 11;
        position: absolute;
        right: 0rpx;
        top: -20rpx;
    }

    .platform_envelope_img {
        width: 120rpx;
        height: 120rpx;
    }
}

:deep(.tn-tabs-item__content__value) {
    font-weight: bold;
}
:global(.tn-tabs-item__content__value) {
    font-weight: bold;
}
</style>

<style lang="scss" scoped>

.test_img{
    position: fixed;
    right: 20rpx;
    bottom: 200rpx;
    width: 120rpx;
    height: 120rpx;
    z-index: 100;

}
.navbar_box{
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;
    // #endif

    .top_box{
        padding: 22rpx;

        padding-left: 10rpx;
        padding-top: 0rpx;
        padding-bottom: 6rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;


        // #ifdef APP-PLUS || H5
        width: 100%;
        padding-left: 20rpx;
        padding-bottom: 6rpx;
        height: auto!important;
        // #endif

        &.is_hidebox{
            padding: 16rpx;
            padding-right: 0rpx;
            padding-bottom: 0rpx;
        }
        .top_logo_img{
            width: 66rpx;
            height: 66rpx;
            border-radius: 10rpx;
            // #ifdef MP-WEIXIN
            margin-right: 20rpx;
            // #endif

            // #ifdef APP-PLUS || H5
            margin-right: 40rpx;
            // #endif

            flex-shrink: 0;
        }
        .navbar_list{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // #ifdef MP-WEIXIN
            // #endif

            // #ifdef APP-PLUS || H5
            padding-right: 20rpx;
            // #endif

            .navbar_item{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                .navbar_text{
                    color: #333333;
                    font-size: 38rpx;
                    font-weight: 500;
                    &.un_open{
                        color: #A8A8A8;
                    }
                }
                .navbar_img{
                    width: 130rpx;
                    height: 52rpx;
                }
                .select_navbar{
                    position: absolute;
                    width: 36rpx;
                    height: 6rpx;
                    border-radius: 6rpx;
                    background: linear-gradient( 90deg, #EA3E1A 0%, #FFC2B5 100%);
                    bottom: 0rpx;
                    left: 50%;
                    transform: translate(-50%, 6rpx);
                }
            }
        }

        .hide_nav_box{
            display: flex;
            align-items: center;

            // #ifdef APP-PLUS || H5
            justify-content: space-between;
            // #endif

            width: 100%;
            padding-right: 10rpx;
            box-sizing: border-box;
            position: relative;
            height: 58rpx;
            &.first_Navbox{
                // #ifdef APP-PLUS || H5
                justify-content: center;
                // #endif

            }
        }
        .hide_nav_Space{
            // #ifdef MP-WEIXIN
            width: 110rpx;
            // #endif

            // #ifdef APP-PLUS || H5
            width: 80rpx;
            // #endif

            height: 10rpx;
        }
        .back_icon{
            position: absolute;
            left: 6rpx;
            top: 6rpx;
        }
        .hide_scroll{
            // margin: 0rpx 18rpx;

            box-sizing: border-box;
            // #ifdef MP-WEIXIN
            margin-left: 68rpx;

            // #endif

            // #ifdef APP-PLUS || H5
            width: 532rpx;
            margin-left: 78rpx;

            // #endif


            overflow-x: scroll;
            &.first_page{
                // #ifdef APP-PLUS || H5
                margin-left: 34rpx;
                // #endif
                width: 352rpx;

            }
            .hide_nav_list{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .hideNav_item{
                    font-size: 36rpx;
                    color: #666;
                    font-weight: 400;
                    position: relative;
                    flex-shrink: 0;
                    // #ifdef MP-WEIXIN
                    margin-right: 30rpx;
                    // #endif
                    // #ifdef APP-PLUS || H5
                    margin-right: 45rpx;
                    // #endif
                    height: 58rpx;
                    &.not_right{
                        margin-right: 0rpx;
                    }
                    &.is_select{
                        color: #333333;
                    }
                    .select_box{
                        width: 44rpx;
                        height: 4rpx;
                        background: #EA3E1A;
                        border-radius: 6rpx;
                        position: absolute;
                        bottom: 0rpx;
                        left: 50%;
                        transform: translate(-50%,0%);
                    }
                }
            }
        }
        .icon_box{
            position: absolute;
            right: 20rpx;
            top: 6rpx;
            background: linear-gradient( 90deg, transparent 0%, #fff 50%);
            height: 58rpx;
            width: 108rpx;
            // #ifdef APP-PLUS || H5
            width: 128rpx;
            // #endif

            display: flex;
            align-items: start;
            justify-content: flex-end;
        }

    }

}
.channel_nav_box{
    width: 100%;
    .channel_navList{
        background: #fff;
    }
    .ranking_list{
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .scrool_item{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 24rpx 20rpx;
            box-sizing: border-box;
            border-radius: 16rpx;
            background: #fff;
            color: #333;
            position: relative;
            &.is_select{
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 100%);
                color: #FFFFFF;
            }
            .item_img{
                width: 38rpx;
                height: 38rpx;
                margin-right: 8rpx;
            }
            .item_name{
                flex-shrink: 0;
                font-size: 26rpx;
                font-weight: 400;
            }
            .select_box{
                width: 64rpx;
                height: 64rpx;
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 200%);
                position: absolute;
                bottom: -2rpx;
                left: 50%;
                transform: translate(-50%, 0) rotate(45deg);
                z-index: -1;
            }
        }
    }
}
.topNavbarBg_box{
    background: #fff;
    .home_top_box{
        display: flex;
        align-items: center;
        padding: 10rpx;
        // #ifdef APP-PLUS || H5
        padding-top: 0rpx;
        // #endif
        // padding-left: 20rpx;
        box-sizing: border-box;
        .change_city_box{
            display: flex;
            align-items: center;
            .city_name{
                font-size: 30rpx;
                color: #333333;
                margin-right: 16rpx;
            }
        }
        .nav_hongbao{
            width: 80rpx;
            height: 80rpx;
            margin-right: 20rpx;
        }
        .top_left{
            display: flex;
            align-items: center;
            position: relative;
            .bubble_box{
                position: absolute;
                top: 60rpx;
                right: -12rpx;
                z-index: 10000;
                background: #fff;
                box-shadow: 0rpx 0rpx 12rpx rgba(0,0,0,0.08);
                border-radius: 8rpx;
                width: 240rpx;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .bubble_item{
                    padding: 24rpx 0rpx;
                    display: flex;
                    align-items: center;
                    .bubble_img{
                        width: 36rpx;
                        height: 36rpx;
                        margin-right: 6rpx;
                    }
                    .bubble_text{
                        font-size: 28rpx;
                        color: #333333;
                    }
                }
            }
        }
        .icon_box{
            width: 50rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .icon_img{
                width: 45rpx;
                height: 45rpx;
            }
            .icon_text{
                font-size: 20rpx;
                color: #6A6A6A;
            }
        }
        .ai_search{
            width: 70rpx;
            height: 70rpx;
            margin-right: 24rpx;
        }
        .more_icon{
            width: 70rpx;
            height: 70rpx;
        }
        .inp_box{
            // width: 612rpx;
            width: 530rpx;
            height: 70rpx;
            border: 2rpx solid #F6CBCB;
            box-sizing: border-box;
            padding: 5rpx 20rpx;
            padding-left: 70rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 12rpx;
            position: relative;
            margin-right: 22rpx;

            &.have_hongbao{
                // width: 530rpx;
                width: 420rpx;

            }
            .scanning_icon{
                position: absolute;
                left: 20rpx;
                top: 50%;
                width: 40rpx;
                height: 44rpx;
                transform: translate(0rpx, -50%);
            }
            .inp_left{
                // display: flex;
                // align-items: center;
                box-sizing: border-box;
                width: 70%;
                height: 48rpx;
                &.have_hongbao{
                    width: 60%;
                }
                .swiper{
                    width: 100%;
                    height: 100%;
                    .swiper_item_item{
                        line-height: 52rpx;
                        font-size: 28rpx;
                        font-weight: 400;
                        color: #A8A8A8;
                    }
                }

            }
            .inp_right{
                display: flex;
                align-items: center;
                .camera_icon{
                    width: 68rpx;
                    height: 45rpx;
                    padding-right: 24rpx;
                }
                .search_btn{
                    font-size: 30rpx;
                    color: #EA3E1A;
                    font-weight: 400;
                    padding-left: 24rpx;
                    border-left: 2rpx solid #DEDEDE;
                    white-space: nowrap;
                }
            }


        }

    }


}

.tabs_img_box{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .tabs_img{
        width: 120rpx;
        height: 30rpx;
    }
}

.WaterFall_box{
    padding: 20rpx 10rpx;
    box-sizing: border-box;
    .WaterFall_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 16rpx;
        overflow: hidden;
        margin-bottom: 18rpx;
        width: 346rpx;

        .WaterFall_img{
            width: 100%;
            height: 320rpx;
            display: block;
            box-sizing: border-box;
            &.right{
                height: 346rpx;
            }
        }
        .WaterFall_text_box{
            padding: 16rpx 20rpx;
            box-sizing: border-box;
            width: 100%;
            background: #fff;


            .WaterFall_text_title{
                font-size: 26rpx;
                color: #333333;
                margin-bottom: 24rpx;

            }
            .WaterFall_text_bottom{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .WaterFall_text_author{
                    display: flex;
                    .WaterFall_text_author_img{
                        width: 46rpx;
                        height: 46rpx;
                        border-radius: 50%;
                        margin-right: 12rpx;
                        box-sizing: border-box;

                    }
                    .WaterFall_author_name_box{
                        .WaterFall_author_name{
                            font-size: 20rpx;
                            color: #666666;
                            margin-bottom: 4rpx;
                        }
                        .WaterFall_author_time{
                            font-size: 16rpx;
                            color: #999999;
                        }
                    }
                }
                .WaterFall_text_like{
                    display: flex;
                    align-items: center;
                    .WaterFall_text_like_number{
                        font-size: 22rpx;
                        color: #AFAFAF;
                    }
                }
            }
        }

    }
}
.index_bottom_box{
    width: 100%;
    height: 144rpx;
}

.ai_search_box{
    width: 100%;
    border-radius: 32rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    .top_box{
        width: 80rpx;
        height: 10rpx;
        background: #CCCCCC;
        border-radius: 6rpx;
        margin-bottom: 80rpx;

    }
    .title_box{
        text-align: center;
        font-weight: 400;
        color: #1A1A1A;
        font-size: 44rpx;
        margin-bottom: 30rpx;
        width: 630rpx;
        height: 60rpx;
        white-space: nowrap; /*强制一行内显示*/
        overflow: hidden; /*溢出隐藏*/
        text-overflow: ellipsis; /*超出部分现实省略号*/
        .not_text{
            color: #6D7793;
        }
    }
    .sound_icon_box{
        width: 508rpx;
        height: 80rpx;
        margin-bottom: 86rpx;
        .sound_icon{
            width: 100%;
            height: 100%;

        }

    }
    .bubble_box{
        width: 216rpx;
        height: 88rpx;
        position: relative;
        margin-bottom: 30rpx;
        .bubble_img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .is_press_text{
            position: absolute;
            top: 16rpx;
            left: 24rpx;
            font-size: 28rpx;
            color: #FFFFFF;
        }
    }
    .fingerprint_img{
        width: 220rpx;
        height: 220rpx;
        margin-bottom: 20rpx;
    }
    .fingerprint_text{
        font-size: 40rpx;
        color: #404860;
        font-weight: 400;
        margin-bottom: 52rpx;
    }


}

</style>
