<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background: linear-gradient(180deg, #FDD9CD 0%, #F8F8F8 100%);'"></pageTopbg>
                <!-- <view :style="'width: 100%; height:' + data.statusBar + 'px'"></view> -->

                <view class="top_inp_box" v-if="false">
                    <view class="back_icon" @click="goback">
                        <TnIcon name="left" size="44" color="#333333" bold/>
                    </view>
                    <view class="inp_box" @click="tosearch">
                        <view class="search_icon">
                            <TnIcon name="search" size="30" color="#A8A8A8" bold/>
                        </view>
                        <view class="inp">
                            糖尿病知识
                        </view>
                    </view>
                </view>
                <!-- 百科类目 -->
                <!-- <view class="nva_box" >
                    <view class="nva">
                        <TnTabs
                            v-model="data.navIndex"
                            bg-color="transparent"
                            bar-color="#EA3E1A"
                            color="#666666"
                            active-color="#EA3E1A"
                            :bottom-shadow="false">
                                <TnTabsItem
                                v-for="(item, index) in data.navList"
                                :key="index"
                                :title="item.name"
                                font-size="32rpx"
                                active-color="#333333"
                                color="#666666"
                                @click="changeTabs(item)"
                                >
                                </TnTabsItem>
                        </TnTabs>
                    </view>

                    <view class="nav_space"></view>
                    <view class="nav_icon" @click="showTaglist">
                        <image
                            class="nav_icon_img"
                            :src="getAssetsUrl('/channel/show.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view> -->

                <view class="navbar_box" :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }">
                        <view class="nva_box" >

                            <view class="back_icon" @click="goback">
                                <TnIcon name="left" size="44" color="#333333" bold/>
                            </view>

                            <view class="nva" :class="{ 'is_showMenu': data.showMuen }" @touchstart="myTouchStart" @touchend="myTouchEnd">
                                <TnTabs
                                    v-model="data.navIndex"
                                    bg-color="transparent"
                                    bar-color="#EA3E1A"
                                    color="#666666"
                                    active-color="#EA3E1A"
                                    :bottom-shadow="false">
                                        <TnTabsItem
                                        v-for="(item, index) in data.navList"
                                        :key="index"
                                        :title="item.name"
                                        font-size="32rpx"
                                        active-color="#333333"
                                        color="#666666"
                                        @click="changeTabs(item)"
                                        >
                                        </TnTabsItem>
                                </TnTabs>
                            </view>

                            <view class="nav_space"></view>
                            <view class="nav_icon" :class="{ 'is_showMenu': data.showMuen }">
                                <image
                                    v-if="data.showMuen"
                                    @click="showTaglist"
                                    class="nav_icon_img"
                                    :src="getAssetsUrl('/channel/show.svg')"
                                    mode="scaleToFill"
                                />
                                <view class="search_icon" @click="tosearch">
                                    <TnIcon name="search" size="32" color="#A8A8A8" bold/>
                                </view>

                            </view>

                        </view>
                    </view>
                </view>


                <!-- 排行榜类目 -->
                <view class="ranking_list" v-if="data.navid == 998">
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

                <!-- 关注的作者列表 -->
                <view class="author" v-if="data.navid == 1 && data.attentionList.length != 0">
                    <view class="author_item" v-for="item in data.attentionList" :key="item.followId">
                        <view class="author_img_box" @click="clickauthor(item)">
                            <image
                                class="author_img"
                                :src="item.accountId == 999 ? getAssetsUrl(item.followImage) : item.followImage"
                                mode="scaleToFill"
                                :class="{ 'click_author': item.accountId == data.accountId }"
                            />
                        </view>
                        <view class="author_text">
                            {{ item.followName }}
                        </view>
                    </view>
                </view>

            </template>

            <view class="channel_page">


                <view v-if="data.dataList.length > 0">
                    <view class="article_list">
                        <!-- 普通瀑布流 -->
                        <WaterfallsFlow @waterItem="waterItem" v-if="![998,2,3].includes(data.navid)" :wfList="data.dataList" :navId="data.navid"></WaterfallsFlow>
                    </view>

                    <view class="article_list">
                        <!-- 热榜 -->
                        <rankingList v-if="data.navid == 998" :dataList="data.dataList" @waterItem="waterItem"></rankingList>
                    </view>

                    <template v-if="data.navid == 2">
                        <view class="list_box">
                            <block v-for="(item,index) in data.dataList" :key="item.id">
                            <!-- @share="share" @getIndex="getchannelIndex"-->
                                <channelItem ref="channelItemref" :info="item" @shownotify="shownotify" @waterItem="waterItem"></channelItem>
                            </block>
                        </view>

                    </template>

                    <template v-if="data.navid == 3">
                        <view class="list_box">
                            <block v-for="(item,index) in data.dataList" :key="item.id">
                                <imageText :info="item" @shownotify="shownotify" @waterItem="waterItem"></imageText>
                            </block>
                        </view>

                    </template>


                </view>
            </view>

		    <BCNotify ref="bcNotify"></BCNotify>

            <channelSheet ref="channelSheetref" :current="data.navIndex" :navList="data.navList" @changechannel="changechannel"></channelSheet>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { getcontentSortList, getcoursefollowList, getranklist, getappcontentList, escontentlist, actionRecord } from '@/api/create-api'
import { gotoChannelFollow, gotoarticledetails, gotovideoPreview, gotoLiveShow, gotowxLive } from '@/routes/create-routes'
import { categoryShow } from '@/api/service-api'
import { gotoLogin } from "@/routes/public-routes"
import { gotosearch } from "@/routes/service-routes"

import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import channelItem from './channelItem.vue'
import imageText from './imageText.vue'
import channelSheet from './channelSheet.vue'
import WaterfallsFlow from './WaterfallsFlow.vue'
import rankingList from './rankingList.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

import { PlatformManage } from "@bc/sys"


interface Data {
    dataList:any,
    inputValue:string,
    navIndex:number,
    navList:any,
    navid:number,
    accountId: number | null,
    attentionList:any,
    channelIndex: null | number | string,
    statusBar: number,
    customBar: number,
    rankingList: any,
    topIndex: number,
    rankType:number
    sBarHeight: number
    titleTop: number
    titleRight: number
    startPoint: any
    showMuen: boolean


}
const data = reactive<Data>({
    dataList: [],
    inputValue: '',
    navIndex: 1,
    navList: [],
    navid: 999,
    accountId: 999,
    attentionList: [],
    channelIndex: null,
    statusBar: 45,
    customBar: 0,
    rankingList: [
        { id: 1, name: '人气榜', icon: '/leyou/create/popularity-icon.svg', secondIcon: '/leyou/create/hig-popularity-icon.svg' },
        { id: 2, name: '视频榜', icon: '/leyou/create/video-icon.svg', secondIcon: '/leyou/create/hig-video-icon.svg' },
        { id: 3, name: '热议榜', icon: '/leyou/create/discussion-icon.svg', secondIcon: '/leyou/create/hig-discussion-icon.svg' },
        { id: 4, name: '收藏榜', icon: '/leyou/create/collection-icon.svg', secondIcon: '/leyou/create/hig-collection-icon.svg' }
    ],
    topIndex: 0,
    rankType: 1,
    sBarHeight: 0,
    titleTop: 0,
    titleRight: 0,
    startPoint: {},
    showMuen: false




})

const paging = ref(null)
const channelItemref = ref(null)
const channelSheetref = ref<any>(null)

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onMounted(() => {
    getsystemInfo()

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
    data.sBarHeight = 43
    const pageObj = uni.getSystemInfoSync() as any
    data.titleTop = pageObj.safeArea.top

    data.titleRight = 8
    // #endif

})

const getsystemInfo = () => {
    uni.getSystemInfo({
        success: (e: any) => {
            let statusBar = 0
            let customBar = 0
            // #ifdef MP
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + 45
            if (e.platform === 'android') {

                customBar = e.statusBarHeight + 50
            }
            // #endif


            // #ifdef MP-WEIXIN
            statusBar = e.statusBarHeight
            // @ts-ignore
            const custom = wx.getMenuButtonBoundingClientRect()
            customBar = custom.bottom + custom.top - e.statusBarHeight
            // #endif


            // #ifdef MP-ALIPAY
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + e.titleBarHeight
            // #endif


            // #ifdef APP-PLUS
            console.log('app-plus', e)
            statusBar = e.statusBarHeight
            customBar = e.statusBarHeight + 45
            // #endif


            // #ifdef H5
            statusBar = 0
            customBar = e.statusBarHeight + 45
            // #endif

            data.statusBar = statusBar
            data.customBar = customBar

            console.log('data.statusBar,data.customBar', data.statusBar, data.customBar)

        }
    })
}

const queryList = (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) {
        getSortList()
        data.navid == 1 && getcontentAccountList()
    }
    getList(pageNumber, pageSize)
}

// 类目
const getSortList = () => {
    categoryShow({
        id: 10
    }).then((res:any) => {
        console.log('res', res)
        data.navList = [
            { id: 1, name: '关注' },
            { id: 999, name: '推荐' },
            ...res
            // res[0],
            // res[1],
            // { id: 2, name: '视频' },
            // { id: 3, name: '图片' },
            // { id: 998, name: '热榜' },
            // res[2],
            // res[3]
        ]
    })
}

// 关注作者
const getcontentAccountList = () => {
    getcoursefollowList({
        query: {
            isFans: 0,
            happyType: null
        },
        pageNumber: 1,
        pageSize: 100
    }).then((res:any) => {
        data.attentionList = [
            // { accountId: 999, followName: '发现', followImage: '/channel/find_icon.png' },
            ...res.data
        ]
    })
}

// 列表
const getList = (pageNumber:number, pageSize:number) => {
    data.channelIndex = null
    let isFans
    if (data.navid == 1 && data.accountId != 999) {
        // isFans = 0
        isFans = 1
    }
    else if (data.navid == 1 && data.accountId == 999) {
        isFans = 1
    }
    else {
        isFans = null
    }

    // 关注作者内容列表
    data.navid == 1 && getappcontentList({
        query: {
            isFans,
            categoryId: null,
            status: 3,
            isRecommended: null,
            accountId: (data.accountId == 999) ? null : data.accountId,
            happyType: ''

        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    });

    // 内容列表
    (data.navid != 1 && data.navid != 998) && logingetList(pageNumber, pageSize)

    // 热榜列表
    data.navid == 998 && getranklist({
        pageSize,
        pageNumber,
        query: {
            rankType: data.rankType,
            categoryIds: [10]
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })

}

// 登录与未登录区分获取列表
const logingetList = (pageNumber:number, pageSize:number) => {

    const req = {
        pageSize,
        pageNumber,
        query: {
            categoryIds: (data.navid != 2 && data.navid != 3 && data.navid != 999) ? [data.navid] : [10],
            type: (data.navid == 2 || data.navid == 3) ? data.navid : null,
            // businessType : 7
            sortType: (data.navid == 999 && pageNumber == 1) ? 7 : null
        }
    }

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            console.log('未登录不需要处理数组')
            escontentlist(req, isRequireLogin).then((res:any) => {
                (paging.value as any).complete(res.data)
            })
        }
        else {
            escontentlist(req, isRequireLogin).then((res:any) => {
                (paging.value as any).complete(res.data)
            })
        }
    })


}

const changeTabs = (item:any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            if (item.id == 1) {
                bcNotify.value.show('请先登录')
                setTimeout(() => {
                    gotoLogin({})
                }, 1000)
            }
        }
    })
    data.navid = item.id
    data.navIndex = item.index
    if (item.id == 1) {
        data.accountId = 999
    }
    else {
        data.accountId = null
    }
    data.channelIndex = null;
    (paging.value as any).reload()
}

const showTaglist = () => {
    channelSheetref.value!.showPopup()
}
const clickauthor = (item:any) =>  {
    gotoChannelFollow()
}
const changechannel = (item:any, index:any) => {
    data.navid = item.id
    data.navIndex = index;
    (paging.value as any).reload()
}

const changeToplist = (item:any, index:number) => {
    data.topIndex = index
    data.rankType = item.id;
    (paging.value as any).reload()
}


const goback = () => {
    uni.navigateBack()
}

const bcNotify = ref()
const shownotify = (text:string) => {
    bcNotify.value.show(text)
}


const waterItem = (item:any) => {
    console.log('item', item)

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
	        bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
        }
        else {
            if (item.type == 1 || item.type == 3) {
                gotoarticledetails({ id: item.id })
                return
            }
            if (item.type == 2) {
                gotovideoPreview({ videoId: item.id, videoPagetype: 0, categoryId: ![2, 3, 999].includes(data.navid) ? data.navid : 10 })
                return
            }
            if (item.type == 99) {
                // #ifdef APP-PLUS
                gotoLiveShow({
                    id: item.id,
                    frontCamera: {},
                    beatySetting: JSON.stringify({})
                }, 2)
                // #endif

                // #ifdef MP-WEIXIN
                gotowxLive({
                    id: item.id
                })
                console.log('小程序')
                // #endif
                return

            }
        }
    })

}

const tosearch = () => {
    gotosearch()
}


const myTouchStart = (e:any) => {

    data.startPoint = e.changedTouches[0]
}

const myTouchEnd = (e:any) => {

    if (((data.startPoint.clientX - e.changedTouches[e.changedTouches.length - 1].clientX) > 10)) {
        data.showMuen = true
        console.log("左滑事件")
        return
    }
    else if (((data.startPoint.clientX - e.changedTouches[e.changedTouches.length - 1].clientX) < -10)) {
        console.log("右滑事件")
        return
    }
}


</script>

<style lang="scss" scoped>
.top_inp_box{
    display: flex;
    align-items: center;
    padding: 8rpx 28rpx;
    box-sizing: border-box;
    .back_icon{
        margin-right: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .inp_box{
        width: 458rpx;
        height: 64rpx;
        background: #fff;
        border-radius: 32rpx;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .search_icon{
            position: absolute;
            top: 50%;
            left: 20rpx;
            transform: translate(0%,-50%);
        }
        .inp{
            margin-left: 30rpx;
            width: 80%;
            height: 100%;
            line-height: 64rpx;
            font-size: 24rpx;
            color: #A8A8A8;

        }
    }
}
.nva_box{
    height: 90rpx;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    .back_icon{
        width: 12%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nva{
        width: 76%;
        &.is_showMenu{
            width: 68%;

        }
    }
    .nav_space{
        // width: 100rpx;
        // height: 100%;
    }
    .nav_icon{
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0px,-50%);
        width: 12%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0rpx;
        box-sizing: border-box;
        background: linear-gradient(180deg, #FDD9CD -40%, #F8F8F8 200%);
        &.is_showMenu{
            width: 20%;
            padding: 0rpx 10rpx;
            justify-content: space-between;


        }
        .nav_icon_img{
            width: 46rpx;
            height: 46rpx;
        }
    }
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
.author{
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 22rpx 26rpx;
    padding-bottom: 44rpx;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 2rpx solid #F2F2F2;
    .author_item{
        width: 110rpx;
        height: 104rpx;
        margin-right: 18rpx;
        .author_img_box{
            margin-bottom: 10rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            .author_img{
                width: 92rpx;
                height: 92rpx;
                border-radius: 50%;
                &.click_author{
                    border: 4rpx solid #29C86F;
                    box-sizing: border-box;
                }
            }
        }
        .author_text{
            text-align: center;
            font-size: 26rpx;
            color: #333333;
            width: 100%;
            white-space: nowrap; /*强制一行内显示*/
            overflow: hidden;/*溢出隐藏*/
            text-overflow: ellipsis;/*超出部分现实省略号*/
        }
    }
}
.channel_page{
    .article_list{
        padding: 0rpx 10rpx;
    }
    .list_box{
        width: 100%;
        background: #fff;
    }
}
</style>
