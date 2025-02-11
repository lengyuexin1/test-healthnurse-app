<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        @scroll="scrollPage"
        :defaultPageSize="6"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="180rpx"
        :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
        :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }"
    >

        <template #top>
            <view class="author" v-if="(props.channelId == 1 && data.attentionList.length != 0)">
                <view class="author_item" v-for="item in data.attentionList" :key="item.followId">
                    <view class="author_img_box" @click="clickauthor(item)">
                        <image
                            class="author_img"
                            :src="item.accountId == 999 ? getAssetsUrl(item.followImage) : item.followImage"
                            mode="scaleToFill"
                        />
                    </view>
                    <view class="author_text">
                        {{ item.followName }}
                    </view>
                </view>
            </view>
        </template>

        <!-- 直播间轮播盒子 -->
        <view class="top_bg_box" >
            <view class="live_swiper" v-if="data.swiperList.length != 0">
                <swiper
                    class="swiper"
                    circular
                    :autoplay="true"
                    :interval="5000"
                    :duration="500"
                    :vertical="false"
                    @change="liveswiperChange"
                >
                    <swiper-item class="swiper_item" v-for="(item,index) in data.swiperList" :key="item.id">
                        <image
                            class="live_swiper_img"
                            :src="item.cover"
                            mode="scaleToFill"
                            @click="liveList(item)"
                        />
                        <!-- index == 0 -->
                        <view class="live_box" v-if="( (item.moduleType == 1 && liveType.channel) || (item.moduleType == 2 && liveType.course) || (item.moduleType == 3 && liveType.salon) )">
                            <view class="live_left_box">
                                <image
                                    class="live_img"
                                    :src="getAssetsUrl('/leyou/icon/live.png')"
                                    mode="scaleToFill"
                                />
                                <view>直播中</view>
                            </view>
                            <view class="live_number_box" v-if="false">
                                {{ item }} 人观看
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="swiper_sign_box">
                    <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }" v-for="(signItem, signIndex) in data.swiperList.length" :key="signIndex"></view>
                </view>
            </view>

            <view class="tabs_box" v-if="!data.hidecontenNav">
                <view class="left_menu" @click="showMenu">
                    <image
                        class="left_menu_img"
                        :src="getAssetsUrl('/leyou/home/index_Menu.svg')"
                        mode="scaleToFill"
                    />
                </view>
                <view class="tabs_conten">
                    <view class="Tabs_list">
                        <view class="Tabs_item"
                            v-for="(item, index) in data.tabsData"
                            :key="index"
                            @click="changesonNav(item,index)"
                        >
                            <view class="Tabs_item_text" :class="{ 'is_select': props.hidNavIndex == index }">
                                {{ item.text }}
                            </view>
                            <view class="barbox" v-if="props.hidNavIndex == index"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 除去百科的瀑布流 -->
        <view id="listView" v-if="props.hidNavIndex != 3">
            <!-- 总关注列表 -->
            <template v-if="data.sonTabIndex == 0">
                <indexfollowList></indexfollowList>
                <view class="index_WaterFall_box" v-if="data.dataList.length != 0">
                    <view class="all_content_title">我关注的内容</view>
                    <indexWaterFall :wfList="data.dataList" :is_statistics="false" @waterItem="allwaterItem" :isfollow="1"></indexWaterFall>
                </view>
            </template>

            <!-- 首页列表 -->
            <template v-else>
                <view class="WaterFall_box">
                    <indexWaterFall :wfList="data.dataList" :is_statistics="false" @waterItem="clickwaterItem" :isfollow="0"></indexWaterFall>
                </view>
            </template>
        </view>

        <!-- 百科相关瀑布流 -->
        <view v-else>
            <view class="channel_list">

                <view class="article_list" v-if="![998,2,3].includes(props.channelId)">
                    <!-- 除热榜、视频、图文瀑布流 -->
                    <indexWaterFall :wfList="data.dataList" :is_statistics="false" @waterItem="clickwaterItem" :isfollow="0" v-if="![998,2,3].includes(props.channelId)" ></indexWaterFall>
                </view>

                <view class="article_list" v-if="props.channelId == 998">
                    <!-- 热榜 -->
                    <rankingList v-if="props.channelId == 998" :dataList="data.dataList" @waterItem="clickwaterItem"></rankingList>
                </view>

                <template v-if="props.channelId == 2">
                    <view class="list_box">
                        <block v-for="(item,index) in data.dataList" :key="item.id">
                        <!-- @share="share" @getIndex="getchannelIndex"-->
                            <channelItem ref="channelItemref" :info="item" @shownotify="shownotify" @waterItem="clickwaterItem"></channelItem>
                        </block>
                    </view>

                </template>

                <template v-if="props.channelId == 3">
                    <view class="list_box">
                        <block v-for="(item,index) in data.dataList" :key="item.id">
                            <imageText :info="item" @shownotify="shownotify" @waterItem="clickwaterItem"></imageText>
                        </block>
                    </view>

                </template>
            </view>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>

        <template #bottom>
            <view class="zpage_bottom">

            </view>
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, nextTick, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"

import BCNotify from '@/components/notify/index.vue'
import indexWaterFall from './indexWaterFall.vue'
import indexfollowList from './indexfollowList.vue'
import rankingList from './rankingList.vue'
import imageText from './imageText.vue'
import channelItem from './channelItem.vue'

import { gotoLogin } from "@/routes/public-routes"

import { getescourselist, escontentlist, followContentList, indexBannerList, getranklist, getappcontentList, getcoursefollowList } from "@/api/create-api"
import { nearbyList } from "@/api/user-api"

import { gotoChannelFollow, gotoarticledetails, gotoLiveShow, gotowxLive, gotovideoPreview, gotocourseVideo, gotosalonPostsDetailPage, gotoChannel } from '@/routes/create-routes'
import { gotoLiveList } from '@/routes/user-routes'
import { TempStorage } from "@bc/base"

import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'

interface Data{
    dataList:any,
    categoryId: string | number,
    tagId: number | string,
    followList: any,
    query:any,
    followId:string,

    sonTabIndex: number,
    tabsData: any,
    sontabsData: any,
    hidecontenNav: boolean,
    firstgetaddress: boolean,
    lat: number,
    lng: number,
    swiperList: any,
    swiperIndex: number,
    attentionList: any,
    hidNav: boolean
}
const data = reactive<Data>({
    dataList: [],
    categoryId: 2,
    tagId: 1,
    followList: [],
    query: {},
    followId: '',

    sonTabIndex: 1,
    tabsData: [
        { id: 1, text: '关注' },
        { id: 2, text: '发现' },
        { id: 3, text: '附近' },
        { id: 4, text: '百科' }
    ],
    sontabsData: [
        { id: 1, text: '关注' },
        { id: 2, text: '发现' },
        { id: 3, text: '附近' }
    ],
    hidecontenNav: false,
    firstgetaddress: true,
    lat: 0,
    lng: 0,
    swiperList: [],
    swiperIndex: 0,
    attentionList: [],
    hidNav: false
})


interface Props {
    hidNavIndex: number,
    channelId: number,
    rankType: number,
    liveType: any,

}

const props = defineProps<Props>()


const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

interface Events {
    (e: 'showLifeMenu'): void,
    (e: 'hideNav', val:boolean): void,
    (e: 'changeNav', index:number): void,
    (e: 'gethidNavList', list:any): void,

}
const emit = defineEmits<Events>()

watch(() => props.hidNavIndex, (newVal, oldVal) => {
    data.sonTabIndex = newVal
    pagingReload(true)
})



onMounted(() => {
    emit('gethidNavList', data.sontabsData)
    indexBannerList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            moduleType: ''
        }
    }).then((res:any) => {
        data.swiperList = res.data

    })
    
})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    nextTick(() => {
        data.sonTabIndex == 0 && getfollowContentList(pageNumber, pageSize)
        data.sonTabIndex == 1 && getnearbyList(pageNumber, pageSize)
        data.sonTabIndex == 2 && getnearbyList(pageNumber, pageSize, true)
        data.sonTabIndex == 3 && getChannelList(pageNumber, pageSize)
    })


}

const scrollPage = (e:any) => {
    // emit('hideNav', true)

    // if (data.hidNav) {
    //     data.hidNav = false
    //     return
    // }
    if (data.hidecontenNav == true) {
        return
    }

    if (e.detail.scrollTop > 160) {
        data.hidNav = true
        emit('hideNav', true)
    }
    else {
        data.hidNav = false
        emit('hideNav', false)
    }

}

const backToTopClick = () => {
    if (paging.value) {
        (paging.value as any).scrollToTop(false)
    }
}

// 登录与未登录区分获取列表
const logingetList = (pageNumber:number, pageSize:number) => {

    const req = {
        pageSize,
        pageNumber,
        query: {
            categoryIds: (props.channelId != 2 && props.channelId != 3 && props.channelId != 999) ? [props.channelId] : [9],
            type: (props.channelId == 2 || props.channelId == 3) ? props.channelId : null,
            sortType: (props.channelId == 999 && pageNumber == 1) ? 7 : null

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
                console.log('data.dataList33', data.dataList)

            })
        }
    })
}

// 康养百科列表
const getChannelList = (pageNumber:number, pageSize:number) => {
    console.log('百科列表')
    console.log('props.channelId', props.channelId)

    let isFans
    if (props.channelId == 1) {
        isFans = 1
    }
    else {
        isFans = null
    }

    (props.channelId == 1 && pageNumber == 1) && getcontentAccountList()
    props.channelId == 1 && getappcontentList({
        query: {
            isFans,
            categoryId: null,
            status: 3,
            isRecommended: null,
            accountId: null,
            happyType: 1
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
        console.log('data.dataList11', data.dataList)

    });

    (props.channelId != 1 && props.channelId != 998) && logingetList(pageNumber, pageSize)

    props.channelId == 998 && getranklist({
        pageSize,
        pageNumber,
        query: {
            rankType: props.rankType,
            categoryIds: [9]
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
        console.log('data.dataList22', data.dataList)

    })
}

// 关注作者
const getcontentAccountList = () => {
    getcoursefollowList({
        query: {
            isFans: 0,
            happyType: 1
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

// 附近列表
const getnearbyList = (pageNumber:number, pageSize:number, haveAddress:boolean = false) => {


    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        console.log('isRequireLogin',isRequireLogin);
        nearbyList({
            pageNumber,
            pageSize,
            query: haveAddress ? {
                lat: data.lat,
                lng: data.lng,
                // type: 2

            } : {
                // type: 2
            }
        },isRequireLogin).then((res:any) => {

            console.log('获取到数据111',res.data);
            

            (paging.value as any).complete(res.data)
        })
    })

    
}

// 我关注的内容
const getfollowContentList = (pageNumber:number, pageSize:number) => {
    followContentList({
        pageNumber,
        pageSize,
        query: {}
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })
}


const bcNotify = ref()


// 页面刷新
const pagingReload = (val:boolean = false) => {

    if (val) {
        paging.value && (paging.value as any).refresh();
    }
    else {
        paging.value && (paging.value as any).reload()
        // (paging.value as any).reload(true)
    }

}

const filterArrayAfterId = (array:any, id:string) => {
    let found = false
    // 遍历数组，找到匹配的id，并返回匹配id之后的所有元素id组成的新数组
    return array.reduce((result : any, item : any) => {
        if (found) {
            result.push(item.id)
        }
        else if (item.id === id) {
            found = true
            result.push(item.id)
        }
        return result
    }, [])
}

const allwaterItem = (item:any) => {
    // 关注的云课堂内容
    if (item.moduleType == 2) {
        const listId = TempStorage.savewx({
            videoIdlist: [item.id]
        })
        gotocourseVideo(listId)
    }
    // 关注的沙龙内容
    if (item.moduleType == 3) {
        gotosalonPostsDetailPage({
            id: item.id
        })
    }
    // 其他板块内容
    if (item.moduleType == 98 || item.moduleType == 1 || item.moduleType == 4 || item.moduleType == 5 || item.moduleType == 6) {
        item.type == 3 && gotoarticledetails({
            id: item.id
        })
        item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })

        item.type == 1 && gotoarticledetails({ id: item.id })
    }

    console.log('item', item)
    return
}

const clickwaterItem = (item:any) => {

    console.log('item', item)
    console.log('data.sonTabIndex', data.sonTabIndex)
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        
        item.type == 3 && gotoarticledetails({
            id: item.id
        })
        item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
        item.type == 1 && gotoarticledetails({ id: item.id })
    })
}

const liveswiperChange = (e:any) => {
    data.swiperIndex = e.detail.current
    // console.log('swiper e',e);
}
const showMenu = () => {
    emit('showLifeMenu')
}
const changesonNav = (item:any, index:number, val:boolean = false) => {
    console.log('item,', item)
    console.log('index',index);
    
    item.id == 2 && typePreviewReport('find')
    item.id == 3 && typePreviewReport('nearby')

    if (index == 3) {
        gotoChannel()
        return
    }
    emit('hideNav', true)
    data.hidecontenNav = true

    data.sonTabIndex = index


    if (data.sonTabIndex == 2) {
        if (data.firstgetaddress) {
            console.log('第一次获取经纬度')
            uni.getLocation({
                type: "gcj02",
                isHighAccuracy: true,
                success: (res) => {
                    console.log("定位成功", res)

                    data.firstgetaddress = false
                    data.lat = res.latitude,
                    data.lng = res.longitude
                },
                fail: (err) => {
                    data.firstgetaddress = true
                }
            })
        }
    }

    // listView
    // (paging.value as any).scrollIntoViewByNodeTop(168,0,true);
    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload()
    }
    emit('changeNav', index)


}

const liveList = (item:any) => {
    console.log('item',item);
    
    if ([1, 2, 3].includes(item.moduleType)) {
        if (item.moduleType == 1 && props.liveType.channel) {
            gotoLiveList({ type: 1 })
        }
        if (item.moduleType == 2 && props.liveType.course) {
            gotoLiveList({ type: 2 })
        }
        if (item.moduleType == 3 && props.liveType.salon) {
            gotoLiveList({ type: 3 })
        }
    }
}

const shownotify = (text:string) => {
    bcNotify.value.show(text)
}

const clickauthor = (item:any) =>  {
    gotoChannelFollow()
}
const changeContentHideNav = () => {
    data.hidecontenNav = false
}

const typePreviewReport = (type: string) => {
    Debounce(()=>{
        createCollectAndReport().previewReport(type)
    },300)
}

defineExpose({
    pagingReload,
    backToTopClick,
    changesonNav,
    changeContentHideNav
})


</script>

<style lang="scss" scoped>
.top_bg_box{
    background: #fff;
    padding-bottom: 18rpx;
    box-sizing: border-box;

    .live_swiper{
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        width: 730rpx;
        height: 280rpx;
        margin: auto;
        padding-top: 10rpx;
        box-sizing: border-box;
        margin-bottom: 26rpx;
        .swiper{
            width: 100%;
            height: 100%;
            .swiper_item{
                width: 100%;
                height: 100%;
                position: relative;
                .live_swiper_img{
                    width: 100%;
                    height: 100%;
                    border-radius: 12rpx;
                    overflow: hidden;
                    // border: 2rpx solid red;
                }
                .live_box{
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
                    .live_left_box{
                        display: flex;
                        align-items: center;
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                        background: #EA3E1A;
                        border-radius: 0rpx 8rpx 0rpx 0rpx;
                        .live_img{
                            width: 16rpx;
                            height: 16rpx;
                            margin-right: 4rpx;
                        }
                    }
                    .live_number_box{
                        padding: 4rpx 14rpx;
                        box-sizing: border-box;
                    }

                }
            }
        }

        .swiper_sign_box{
            position: absolute;
            bottom: 12rpx;
            left: 50%;
            transform: translate(-50%, 0rpx);
            display: flex;
            align-items: center;
            .sign_item{
                width: 12rpx;
                height: 12rpx;
                background: #FFFFFF;
                opacity: 0.3;
                margin-left: 8rpx;
                border-radius: 50%;
                &.is_sign{
                    opacity: 1;
                }
            }
        }

    }
    .tabs_box{
        display: flex;
        align-items: center;
        padding: 0rpx 20rpx;
        padding-left: 12rpx;
        box-sizing: border-box;
        .left_menu{
            width: 56rpx;
            height: 50rpx;
            margin-right: 50rpx;
            .left_menu_img{
                width: 100%;
                height: 100%;
            }
        }
        .tabs_conten{
            flex: 1;
            .Tabs_list{
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                .Tabs_item{
                    position: relative;
                    .Tabs_item_text{
                        font-size: 34rpx;
                        margin-bottom: 6rpx;
                        color: #8C8C8C;
                        &.is_select{
                            color: #333333;
                        }
                    }
                    .Tabs_item_img{
                        width: 120rpx;
                        height: 32rpx;
                        margin-bottom: 6rpx;
                    }
                    .barbox{
                        width: 36rpx;
                        height: 6rpx;
                        background: #EA3E1A;
                        border-radius: 6rpx;
                        position: absolute;
                        bottom: -6rpx;
                        left: 50%;
                        transform: translate(-50%,0rpx);
                    }
                }
            }
        }
    }
}

.son_tabs_box{
    position: relative;
    width: 100%;
    height: 90rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    display: flex;
    background: #fff;
    border-bottom: 2rpx solid #F2F2F2;
    border-top: 2rpx solid #F2F2F2;
    // margin-bottom: 10rpx;
    .scroll_tabs_box{
        display: flex;
        align-items: center;
        overflow-x: scroll;
        width: 88%;
        .scroll_tabs{
            display: flex;
            align-items: center;
            .scroll_tabs_item{
                position: relative;
                margin-right: 52rpx;
                .scroll_tabs_item_text{
                    font-size: 28rpx;
                    color: #666666;
                    white-space:nowrap;
                    font-weight: 600;
                    &.is_select{
                        color: #EA3E1A;
                        font-size: 32rpx;
                    }
                }
                .active_box{
                    width: 100%;
                    height: 12rpx;
                    background: linear-gradient(90deg, #29C86F 0%, #F5F7FB 100%);
                    border-radius: 6rpx;
                    position: absolute;
                    bottom: -2rpx;
                    left: 0;
                    z-index: -1;
                }

            }
        }

    }
    .scroll_tabs_more{
        position: absolute;
        right: 0;
        top: 0;
        padding: 30rpx;
        box-sizing: border-box;
    }

}
.index_WaterFall_box{
    padding: 0rpx 10rpx;
    padding-top: 20rpx;
    box-sizing: border-box;
    background: #fff;
    .all_content_title{
        font-weight: 500;
        font-size: 30rpx;
        color: #333333;
        padding-left: 24rpx;
        padding-bottom: 10rpx;
        box-sizing: border-box;
    }
}
.WaterFall_box{
    padding: 0rpx 10rpx;
    box-sizing: border-box;
    .course_type{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
        position:fixed;
        z-index:100;
        background:#fff;
        .course_item{
            width: 236rpx;
            height: 68rpx;
            position: relative;
            color: #666666;
            background: #fff;
            border-radius: 6rpx;
            .item_text{
                text-align: center;
                line-height: 68rpx;
                font-size: 30rpx;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                z-index: 10;
            }
            .is_course{
                position: absolute;
                bottom: 15rpx;
                left: 50%;
                transform: translate(-50%, 0rpx);
                width: 64rpx;
                height: 14rpx;
                background: linear-gradient(90deg, #EA3E1A 0%, #FFCFCF 100%);
                // z-index: -10;
            }
            &.is_course{
                color: #333333;
                font-size: 30rpx;
                font-weight: 600;
            }
        }
    }
}
.channel_list{
    min-height: 1000rpx;
    .article_list{
        padding: 0rpx 10rpx;
    }
    .list_box{
        width: 100%;
        background: #fff;
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


</style>
