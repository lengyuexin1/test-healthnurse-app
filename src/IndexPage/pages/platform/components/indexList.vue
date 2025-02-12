<template>
    <z-paging ref="paging" v-model="data.dataList" :auto="true" :fixed="false" @query="queryList" @scroll="scrollPage"
        :defaultPageSize="6" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto-show-back-to-top="true"
        back-to-top-bottom="180rpx" :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
        :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }">

        <template #top>
            <view class="author" v-if="(props.channelId == 1 && data.attentionList.length != 0)">
                <view class="author_item" v-for="item in data.attentionList" :key="item.followId">
                    <view class="author_img_box" @click="clickauthor(item)">
                        <image class="author_img"
                            :src="item.accountId == 999 ? getAssetsUrl(item.followImage) : item.followImage"
                            mode="scaleToFill" />
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
                        <image class="live_swiper_img" :src="item.icon" mode="scaleToFill" @click="liveList(item)" />
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
            <view class="Tabs_deitem" v-for="(item, index) in tabsData" :key="index" @click="gotoColmDetail(index,item)">
                <image class="left_menu_img" :src="item.url" mode="scaleToFill" />
                <view class="iconText">{{ item.title }}</view>
            </view>
        </view>

        <!-- 新人福利 -->
        <view class="newPople">
            <NewcomerWelfare :dataObj="dataObj"></NewcomerWelfare>
        </view>
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
            <view class="more_icon">
                <TnIcon name="down" size="32rpx" color="#333"></TnIcon>
            </view>
        </view>

        <view class="content_right_list" :class="{ 'not_height': data.dataList.length == 0 }">
            <WaterfallsFlow :wfList="data.dataList" :navid="NavId" @waterItem="clickwaterItem"></WaterfallsFlow>
        </view>


        <BCNotify ref="bcNotify"></BCNotify>

        <template #bottom>
            <view class="zpage_bottom">

            </view>
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { ref, reactive, computed, onMounted, defineExpose, nextTick, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import NewcomerWelfare from './newcomerWelfare.vue'
import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from './WaterfallsFlow.vue'
import indexWaterFall from './indexWaterFall.vue'
import indexfollowList from './indexfollowList.vue'
import rankingList from './rankingList.vue'
import imageText from './imageText.vue'
import channelItem from './channelItem.vue'
import BarPlaying from '@/components/barPlaying/barPlaying.vue'
import { gotoLogin } from "@/routes/public-routes"
import { channelClsList, getEsContentList } from "@/api/smart-api"
import { getescourselist, escontentlist, followContentList, getranklist, getappcontentList, getcoursefollowList } from "@/api/create-api"
import { nearbyList } from "@/api/user-api"
import { gotoChannelFollow, gotoarticledetails, gotoLiveShow, gotowxLive, gotovideoPreview, gotocourseVideo, gotosalonPostsDetailPage, gotoChannel } from '@/routes/create-routes'
import { gotoLiveList } from '@/routes/user-routes'
import { TempStorage } from "@bc/base"
import { searListFlag } from "@/api/open-api"
import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'
import { setPageBank, bannerList, columnList, columnDetail, productList, activeDetail } from "@/api/setite-api"

interface Data {
    dataList: any,
    categoryId: string | number,
    tagId: number | string,
    followList: any,
    query: any,
    followId: string,

    sonTabIndex: number,
    firstgetaddress: boolean,
    lat: number,
    lng: number,
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
    firstgetaddress: true,
    lat: 0,
    lng: 0,
    swiperIndex: 0,
    attentionList: [],
    hidNav: false
})

const swiperList: any = ref([])
const NavList: any = ref([])
const NavId = ref(1)
const dataObj: any = ref({})
const tabsData: any = ref([
    { id: '10', url: getAssetsPic('/fare/v2/home_icon_jujia.png'), title: '居家照护', typeId: 11, colnum: 3, hotTag: null, activity_id: 3, templateCode: 65793 },
    { id: '16', url: getAssetsPic('/fare/v2/home_icon_zhuyuan.png'), title: '住院陪护', typeId: 13, colnum: 5, hotTag: null, activity_id: 5, templateCode: 65800 },
    { id: '4', url: getAssetsPic('/fare/v2/home_icon_peizhen.png'), title: '就医协助', typeId: 12, colnum: 3, hotTag: null, activity_id: 4, templateCode: 65795 },
    { id: '6', url: getAssetsPic('/fare/v2/home_icon_lift.png'), title: '生活服务', typeId: 16, colnum: 4, hotTag: null, activity_id: 7, templateCode: 65797 },
    { id: '489', url: getAssetsPic('/fare/v2/sma-car.png'), title: '代办服务', templateId: 123, templateCode: 0 },
    { id: '88', url: getAssetsPic('/fare/v2/zhihui.png'), title: '智慧康护', templateId: 123, templateCode: 0 },
    { id: '2', url: getAssetsPic('/fare/v2/home_icon_heal.png'), title: '到家健康', typeId: 15, colnum: 3, hotTag: '上门', activity_id: 6, templateCode: 65798 },
    { id: '5', url: getAssetsPic('/fare/v2/gre-cai.png'), title: '到店健康', typeId: 4, templateCode: 131586 },
    { id: '8', url: getAssetsPic('/fare/v2/home_icon_jigou.png'), title: '找机构', templateId: 122, templateCode: 0 },
    { id: '360', url: getAssetsPic('/fare/home-more.png'), title: '全部服务', templateId: 122, templateCode: 0 },
])

interface Props {
    channelId: number,
    rankType: number,
    liveType: any,

}

const props = defineProps<Props>()

const gotoColmDetail = (index:any, item:any) => {
    console.log(index, item)
    if(index == 5) {
        return gotoWisdom()
    }
}

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

interface Events {
    (e: 'showLifeMenu'): void,
    (e: 'hideNav', val: boolean): void,
    (e: 'changeNav', index: number): void,
    (e: 'gethidNavList', list: any): void,
    (e: 'changeTabbarTop', val: boolean): void,
}
const emit = defineEmits<Events>()

onMounted(() => {
    getSetIds(1)
    getChannelClsList()
})

const getChannelClsList = () => {
    channelClsList(10).then(res => {
        NavList.value = [
            { id: 1, name: '推荐' },
            ...res
        ]
    })
}

const paging = ref()
const queryList = (pageNumber: number, pageSize: number) => {
    nextTick(() => {
        if (pageNumber == 1) {
            // getActivityMation()
        }
        if (NavId.value == 1) {
            //推荐
            conGiveData(pageNumber)
        }
        // 关注
        else {
            contentist(pageNumber)
        }
    })
}

const contentist = (pageNumber) => {
    const data = {
        pageNumber,
        pageSize: 10,
        query: {
            categoryIds: [NavId.value]
        }
    }
    getEsContentList(data).then((res) => {
        const dataMapFlag = res.data.map((item) => {
            const its = {
                ...item,
                sourceType: 4
            }
            return its
        })

        paging.value.complete(dataMapFlag)
    })
}

const conGiveData = (pageNumber) => {
    const data = {
        pageNumber,
        pageSize: 10,
        query: {
        }
    }
    searListFlag(data).then((res: any) => {
        paging.value.complete(res.data)
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

const allInList: any = ref([])
const getSetIds = (num: number) => {
    setPageBank(num).then(res => {
        // allInList.value = res.recordList.filter((item: any) => item.moduleId == 7)
        // console.log(allInList.value, '等于7');
        // if (allInList.value.length > 0) {
        //     allInList.value.forEach((element: any) => {
        //         console.log(element);
        //         // 业务模块专区
        //         // channeCatelList(element, element.categoryIds)
        //     })
        // }
        if (!res.recordList) {
            return
        }
        console.log(res.recordList, '所有的数组')
        healthMyData(res.recordList)

    })
}

const healthMyData = (list: any) => {
    // showBk.value = []
    if (list.length < 1) {
        return
    }
    list.forEach((element: any) => {
        // showBk.value.push(element.moduleId)
        // banner图
        if (element.moduleId == 1) {
            getBannerList(element.dataIds)
        }
        // 导航栏
        if (element.moduleId == 2) {
            // getTabbar(element.dataIds)
        }
        // 新人活动
        if (element.moduleId == 3) {
            activeDetail(element.dataIds[0]).then(res => {
                console.log('活动想去', res)
                dataObj.value = res
                console.log(dataObj.value, '活动想去', res)
            })
        }
        // // 产品推荐
        // if (element.moduleId == 4) {
        //     channelList(element.dataIds, 4)
        // }
        // // 新品上市
        // if (element.moduleId == 5) {
        //     channelList(element.dataIds, 5)
        // }
        // // 爆品精选
        // if (element.moduleId == 6) {
        //     channelList(element.dataIds, 6)
        // }
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

const scrollPage = (e: any) => {
    if (e.detail.scrollTop > 160) {
        data.hidNav = true
        // emit('hideNav', true)
        emit('changeTabbarTop', false)
    }
    else {
        data.hidNav = false
        // emit('hideNav', false)
        emit('changeTabbarTop', true)
    }

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
    }).then((res: any) => {
        data.attentionList = [
            // { accountId: 999, followName: '发现', followImage: '/channel/find_icon.png' },
            ...res.data
        ]
    })
}

const bcNotify = ref()

// 页面刷新
const pagingReload = (val: boolean = false) => {

    if (val) {
        paging.value && (paging.value as any).refresh();
    }
    else {
        paging.value && (paging.value as any).reload()
        // (paging.value as any).reload(true)
    }

}

const allwaterItem = (item: any) => {
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

        item.type == 3 && gotoarticledetails({
            id: item.id
        })
        item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
        item.type == 1 && gotoarticledetails({ id: item.id })
    })
}

const liveswiperChange = (e: any) => {
    data.swiperIndex = e.detail.current
    // console.log('swiper e',e);
}
const showMenu = () => {
    emit('showLifeMenu')
}

const liveList = (item: any) => {
    console.log('item', item);

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

const shownotify = (text: string) => {
    bcNotify.value.show(text)
}

const clickauthor = (item: any) => {
    gotoChannelFollow()
}

const typePreviewReport = (type: string) => {
    Debounce(() => {
        createCollectAndReport().previewReport(type)
    }, 300)
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
        height: 144rpx;
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

    .zors {
        width: 25%;
    }
}

.fliex_box {
    position: relative;
    padding: 20rpx;

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
                        background: #EA3E1A;
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

.content_right_list {
    padding: 0 10rpx;
}
</style>
