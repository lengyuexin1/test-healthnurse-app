<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        @scroll="scrollPage"
        :defaultPageSize="10"
        :refresher-enabled="data.refresherEnabled"
        :hide-empty-view="data.hideEmptyView"
        :show-loading-more-no-more-view="false"
        :show-default-loading-more-text="false"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="280rpx"
        :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
        :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }"
        >

        <template #top>
            <view class="son_tabs_box" v-if="false">
                <view class="scroll_tabs_box">
                    <view class="scroll_tabs">
                        <view class="scroll_tabs_item" v-for="(item,index) in data.courseTypeList" :key="item.id" @click="iscourse(item,index)">
                            <view class="scroll_tabs_item_text" :class="{ 'is_select': index == data.courseIndex }">
                                {{ item.name }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </template>

        <view class="banner_box" v-if="data.courseIndex == 1">
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
        </view>

        <!-- 群聊二级类目 -->
        <view class="scrollList-wrap" v-if="data.courseIndex == 1">
            <!-- <TnScrollList :indicator="false">
                <view class="item-container tn-flex-row">
                    <view v-for="(item, index) in data.categoryList" :key="index" class="scroll-item tn-flex-center tn-flex-column" :class="[data.activeCategory == index ? 'active' : '']" @tap="clickCategoryList(item.id, index)">
                        <view class="title">{{ item.name }}</view>
                    </view>
                </view>
            </TnScrollList> -->



            <view class="tabs_conten">
                <view class="Tabs_list">
                    <view class="Tabs_item"
                        v-for="(item, index) in data.categoryList"
                        :key="index"
                        @click="clickCategoryList(item.id, index)"
                    >
                        <view class="Tabs_item_text" :class="{ 'is_select': data.activeCategory == index }">
                            {{ item.name }}
                        </view>
                        <view class="barbox" v-if="data.activeCategory == index"></view>
                    </view>
                </view>
            </view>


        </view>


        <likefollowListVue ref="likefollowList" v-if="false" :dataList="data.dataList" :followList="data.followList" @change="changeFollow"></likefollowListVue>


        <view v-else>
            <!-- 聊天号列表 -->
            <template v-if="data.courseIndex == 0">
                <!-- 积分面板 -->
                <view class="icon_box" v-if="false">
                    <view class="icon_item left" @click="timeIntegral">
                        <view class="icon_title">已收获积分</view>
                        <view class="icon_content">{{ data.IntegralObj.points ? data.IntegralObj.points : '--' }}</view>
                        <view class="icon_bottom">
                            <view>可获得积分奖励</view>
                            <image
                                @click.stop="tointegralRule"
                                class="icon_bottom_img"
                                :src="getAssetsUrl('/leyou/create/like_rule_icon.svg')"
                                mode="scaleToFill"
                            />
                        </view>
                        <image
                            class="flex_img"
                            :src="getAssetsUrl('/leyou/create/like_left.svg')"
                            mode="scaleToFill"
                        />
                    </view>

                    <view class="icon_item right" @click="timeShop">
                        <view class="icon_title">积分商城</view>
                        <view class="icon_right_content">
                            <view class="content_text">去兑换</view>
                            <TnIcon color="#566ED8" name="right" size="20rpx"></TnIcon>
                        </view>
                        <view class="icon_bottom">
                            <view>快去兑换礼品吧</view>
                        </view>
                        <image
                            class="flex_img"
                            :src="getAssetsUrl('/leyou/create/like_right.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view>

                <view class="reload_box" v-if="false">
                    <view class="reload_title">探索发现</view>
                    <view class="reload_icon" @click="reloadFun" v-if="false">
                        <view class="reload_icon_text">抖一抖</view>
                        <TnIcon color="#666666" name="refresh" size="32rpx"></TnIcon>
                    </view>
                </view>
                <likeWaterFall ref="likechatList" :wfList="data.dataList" @waterItem="clickwaterItem"></likeWaterFall>
            </template>

            <!-- 群聊 -->
            <template v-else-if="data.courseIndex == 1">
                <view class="card_list">
                    <chatCard class="itemChat" v-for="item in data.dataList" :item="item"></chatCard>
                </view>
            </template>

            <!-- 爱聊 -->
            <template v-else-if="data.courseIndex == 2">
                <!-- { height: props.parentHeight - data.barHeight - 57 + 'px', backgroundColor: 'white' } -->
                <view :style="{ height: props.parentHeight + 'px', backgroundColor: 'white' }">
                    <view class="likeChat tn-flex-column tn-flex-center" v-if="data.step == 1">
                        <image :src="getAssetsUrl('/leyou/assets/chat.png')" mode="scaleToFill" />
                        <view class="txt">乐悠爱聊，分享生活点滴</view>
                        <view class="txt">让健康与快乐同行</view>
                        <view class="btn tn-flex-center-center" @tap="startLikeChat">开始爱聊之旅</view>
                    </view>
                    <view class="likeChat tn-flex-column" v-if="data.step == 2">
                        <image :src="getAssetsUrl('/leyou/assets/empty.png')" mode="scaleToFill" />
                        <view class="txt">您的资料还不完整，无法进行推荐</view>
                        <view class="empty-btn tn-flex-center-center" @tap="clickFillInfo">去完善资料</view>
                    </view>
                    <view class="likeChat tn-flex-column tn-flex-center" v-if="data.step == 3">
                        <view class="ripple-wrap">
                            <image class="ripple" :src="getAssetsUrl('/leyou/assets/ripple.png')" mode="scaleToFill" />
                            <image class="user"
                                v-for="(item) in data.matchInfo"
                                mode="aspectFill"
                                :src="item.accountInfo.avatar"
                                :style="{
                                    position: 'absolute',
                                    top: item.accountInfo.top + 'rpx',
                                    left: item.accountInfo.left + 'rpx',
                                    opacity: item.accountInfo.opacity
                                }"
                                @tap="clickUserInfo(item.accountInfo.id)"
                            />
                            <view class="txt">正在根据您的择偶要求</view>
                            <view class="txt">搜寻匹配的人...</view>

                            <view class="btn-wrap tn-flex-center-center">
                                <view>
                                    <TnButton width="250rpx" height="76rpx" font-size="30rpx" bg-color="#F46955" text-color="#FFFFFF" :debounce="true" @tap="startLikeChat">
                                        重新匹配
                                    </TnButton>
                                </view>
                                <view class="editBtn">
                                    <TnButton width="250rpx" height="76rpx" font-size="30rpx" bg-color="#FFEEEE" text-color="#EB4321" :debounce="true" @tap="editInfo">
                                        修改资料
                                    </TnButton>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>

            <!-- AI聊 -->
            <template v-else-if="data.courseIndex == 3">
                <AIChat :parentHeight="props.parentHeight" :topViewHeight="props.topViewHeight" :barHeight="data.barHeight"></AIChat>
            </template>
        </view>

        <template #bottom>
            <view class="create-chat tn-flex-row" v-if="data.courseIndex == 1">
                <view class="tn-flex-center-center" @tap="clickCreate">
                    <image :src="getAssetsUrl('/leyou/assets/create.png')" mode="scaleToFill" /> 创建群聊
                </view>
                <view class="line"></view>
                <view class="tn-flex-center-center" @tap="randomMate">
                    <image :src="getAssetsUrl('/leyou/assets/connect.png')" mode="scaleToFill"  />随机匹配
                </view>
            </view>
        </template>
        <BCPopup
            ref="bcPopup"
            title="匹配不到？"
            content=""
            subBtn="重新匹配"
            cancelBtn="去完善资料"
            subBtnColor="#29C86F"
            @clickLeftBtn="reTry"
            @clickRightBtn="fillInfo">
        </BCPopup>
        <BCNotify ref="bcNotify"></BCNotify>
    </z-paging>
    <image
        class="fliex_box"
        :src="getAssetsUrl('/leyou/home/page_load.svg')"
        mode="scaleToFill"
        @click="reloadFun"
        v-if="data.showLoad"
    />
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose, getCurrentInstance } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'
import likefollowListVue from './likefollowList.vue'
import likeWaterFall from './likeWaterFall.vue'
import chatCard from './chatCard.vue'
import AIChat from './AIChat.vue'

import { chatList, indexBannerList, getsalonCategoryList } from "@/api/create-api"
import BCNotify from '@/components/notify/index.vue'
import { gotochatDetail, gotovideoPreview, upChatPage, gotoarticledetails } from '@/routes/create-routes'
import { gotointegralMallGoods, gotomyIntegral, gotointegralRule } from '@/routes/goods-routes'
import { gotoCreateChat, gotoFillInfo, gotoUserInfo, gotoLiveList } from '@/routes/user-routes'
import { timePointsDetail } from '@/api/goods-api'
import { gotoLogin } from "@/routes/public-routes"
import { groupChatList, getRandomChat, loveChatMatch, myGroupChatList, updateRealCoordinate, loveChatGetDataStatus } from '@/api/user-api'
import { gotoChatPage } from '@/routes/nim-routes'

import { PlatformManage } from '@bc/sys'
import { addWEventsListener, GlobalEvents } from '@/events/event-registry'
import BCPopup from '@/components/popup/index.vue'
const appInstance = getCurrentInstance()?.proxy

interface Props {
    parentHeight: number
    topViewHeight: number
    liveType: any

}
const props = defineProps<Props>()

interface Events {
    (e: 'gethidNavList', list:any): void,

}
const emit = defineEmits<Events>()

interface Data{
    barHeight: number
    refresherEnabled: boolean
    hideEmptyView: boolean
    swiperData:string[]
    soncurrentTabIndex:number
    dataList:any
    followList:any
    categoryId:string
    courseTypeList:any
    courseIndex:number
    accountIds: any
    IntegralObj: any
    categoryList: any
    activeCategory: number | string
    matchInfo: any
    step: number
    showLoad: boolean
    swiperList: any
    swiperIndex: number
}
const data = reactive<Data>({
    barHeight: 0,
    refresherEnabled: true,
    hideEmptyView: false,
    swiperData: [
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png'
    ],
    soncurrentTabIndex: 1,
    dataList: [],
    followList: [],
    categoryId: '',
    // courseTypeList: [
    //     // { id: 11, name: '关注' },
    //     { id: 11, name: '关注' },
    //     { id: 22, name: '聊天号' },
    //     { id: 44, name: '群聊' },
    //     { id: 55, name: '爱聊' },
    //     { id: 66, name: 'AI问聊' }
    // ],
    courseTypeList: [
        // { id: 44, name: '群聊' },
        // { id: 55, name: '爱聊' },
        // { id: 22, name: '聊天号' },
        // { id: 66, name: 'AI问聊' }
        { id: 22, name: '聊天号' },
        { id: 44, name: '群聊' },
        { id: 55, name: '爱聊' },
        { id: 66, name: 'AI问聊' }
    ],
    // courseIndex: 2,
    courseIndex: 0,
    accountIds: [],
    IntegralObj: {},
    categoryList: [],
    activeCategory: 1,
    matchInfo: {},
    step: 1,
    showLoad: false,
    swiperList: [],
    swiperIndex: 0,

})

const bcPopup = ref()


const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const listen = () => {
    addWEventsListener(GlobalEvents.Love_chat_UpateInfo, () => {
        data.step = 1
    })
    addWEventsListener(GlobalEvents.Join_Group_Chat, () => {
        data.courseIndex == 1 && paging.value?.reload()
    })
    addWEventsListener(GlobalEvents.Leave_Group_Chat, (tid) => {
        data.courseIndex == 1 && paging.value?.reload()
    })
    addWEventsListener(GlobalEvents.Create_Group_chat, (tid) => {
        data.courseIndex == 1 && paging.value?.reload()
    })
}

onMounted(async () => {

    const query = await uni.createSelectorQuery().in(appInstance)
    query.select('.son_tabs_box').boundingClientRect((res: any) => {
        if (res) {
            console.log('元素的高度:', res.height)
            data.barHeight = res.height
        }
    }).exec()

    listen()
    getcategoryList()

    // #ifdef H5
    updateRealCoordinate({
        realLng: '113.317412', realLat: '23.084003'
    }).then((res) => {

    })
    // #endif

    // #ifdef APP-PLUS || MP-WEIXIN

    uni.getLocation({
        type: "gcj02",
        isHighAccuracy: true,
        success: (res) => {
            console.log("定位成功")
            updateRealCoordinate({
                realLng: res.longitude, realLat: res.latitude
            }).then((res) => {

            })
        }
    })
    // #endif

    emit('gethidNavList', data.courseTypeList)


    indexBannerList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            moduleType: 4
        }
    }).then((res:any) => {
        data.swiperList = res.data

    })

})

const bcNotify = ref()
const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {

    if (pageNumber == 1 && data.courseIndex == 3) {
        timePointsDetail({}).then((res:any) => {
            data.IntegralObj = res
        })
    }


    if (data.courseIndex == 1) {
        console.log('data.categoryId关注聊天',data.categoryId);
        data.categoryId == '999' && myGroupChatList({
            query: {
                tname: '',
                type: 2
            },
            pageNumber,
            pageSize
        }).then((res:any) => {
            (paging.value as any).complete(res.data)
        })
        data.categoryId != '999' && groupChatList({
            query: {
                categoryId: data.categoryId
            },
            pageNumber,
            pageSize
        }).then((res:any) => {
            (paging.value as any).complete(res.data)
        })
        return
    }
    getcrList(pageNumber, pageSize)


}


// 聊天内容列表
const getcrList = (pageNumber:number, pageSize:number) => {
    chatList({
        pageNumber,
        pageSize,
        query: {
            type: null,
            sortType: pageNumber == 1 ? 7 : null,
            accountIds: []
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    })
}

const clickwaterItem = (item:any, index:number, direction:number) => {
    item.type == 1 && gotoarticledetails({ id: item.id })
    item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 1 })
    item.type == 3 && gotoarticledetails({ id: item.id })
}

const changeFollow = (item:any) => {
    data.accountIds = [item.accountId];
    (paging.value as any).reload()
}

const reloadFun = () => {
    (paging.value as any).reload(true)
}

const iscourse = (item:any, index:number) => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('您还没登录，现在去登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        if (item.id == 11 || item.id == 22) {
            data.refresherEnabled = true
            data.hideEmptyView = false
            data.courseIndex = index;
            (paging.value as any).reload()
            return
        }
        if (item.id == 44) {
            data.refresherEnabled = true
            data.hideEmptyView = false
            data.courseIndex = index;
            (paging.value as any).reload()
            return
        }
        if (item.id == 55) {
            data.refresherEnabled = false
            data.hideEmptyView = true
            data.courseIndex = index
            return
        }
        if (item.id == 66) {
            data.refresherEnabled = false
            data.hideEmptyView = true
            data.courseIndex = index
        }
    })
}

const getcategoryList = () => {
    getsalonCategoryList({ moduleType: 7 }).then((res: any) => {
        if (res.length) {
            const newArr: any[] = []
            for (const i in res) {
                for (const j in res[i].children) {
                    newArr.push(res[i].children[j])
                }
            }
            data.categoryList = newArr
            console.log(data.categoryList)
            data.categoryList.unshift({ id: '', name: '推荐' })
            data.categoryList.unshift({ id: '999', name: '关注' })
            data.categoryId = newArr[1].id
        }
    })
}

const clickCategoryList = (id: string, index: number) => {
    data.categoryId = id
    data.activeCategory = index;
    (paging.value as any).reload()
}

const startLikeChat = () => {
    data.matchInfo = {}
    uni.hideLoading()
    loveChatGetDataStatus().then((res: any) => {
        if (res.dataStatus == 2) {
            data.step = 2
        }
        else {
            data.step = 3
            loveChatMatch({
                pageNumer: 1,
                pageSize: 10,
                query: {}
            }).then((res: any) => {
                if (res.data.length == 0) {
                    bcPopup.value.open()
                    return
                }
                for (let i = 0; i < res.data.length; i++) {
                    const randomTop = Math.random() * (548 - 140)
                    const randomLeft = Math.random() * (548 - 140)
                    res.data[i].accountInfo.top = randomTop
                    res.data[i].accountInfo.left = randomLeft
                    res.data[i].accountInfo.opacity = 0
                }

                data.matchInfo = res.data
                fadeInAvatar()
            })
        }
    })
}

const editInfo = () => {
    gotoFillInfo()
}

// 图片动画处理
const fadeInAvatar = () => {
    data.matchInfo.forEach((element: any, index: number) => {
        setTimeout(() => {
            element.accountInfo.opacity = 1
        }, index * 200)
    })
}

const randomMate = () => {
    getRandomChat().then((res: any) => {
        gotoChatPage({
            to: res.tid,
            scene: 'friendsGroup'
        })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const reTry = () => {
    bcPopup.value.close()
    uni.showLoading({
        title: '匹配中...'
    })
    setTimeout(() => {
        startLikeChat()
    }, 2000)
}

const fillInfo = () => {
    gotoFillInfo()
}

const clickFillInfo = () => {
    gotoFillInfo()
}

const clickUserInfo = (id: string) => {
    id && gotoUserInfo(id)
}

const clickCreate = () => {
    gotoCreateChat()
}

const toupChat = () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        upChatPage({})
    })
}

const timeIntegral = () => {
    gotomyIntegral()
}
const timeShop = () => {
    gotointegralMallGoods()
    // bcNotify.value.show('敬情期待')
}

const tointegralRule = () => {
    gotointegralRule()
}

const likechatList = ref()
const likefollowList = ref()
const loadPage = () => {
    (likechatList.value as any).loadList()
}

const scrollPage = (e:any) => {
    if (e.detail.scrollTop > 210) {
        data.showLoad = true
    }
    else {
        data.showLoad = false
    }

}

const liveswiperChange = (e:any) => {
    data.swiperIndex = e.detail.current

}

const liveList = (item:any) => {
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

defineExpose({
    iscourse,
    loadPage
})


</script>

<style lang="scss" scoped>
    .course_type{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 16rpx 30rpx;
        box-sizing: border-box;
		background: #fff;
        z-index:100;
        .course_item{
            width: 148rpx;
            height: 64rpx;
            text-align: center;
            line-height: 64rpx;
            font-size: 28rpx;
            color: #333333;
            border-radius: 32rpx;
            border: 1px solid #E6E6E6;
            &.is_course{
                border: 1px solid #EA3E1A;
                color: #EA3E1A;
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
    margin-bottom: 10rpx;
    .scroll_tabs_box{
        display: flex;
        align-items: center;
        width: 100%;
        .scroll_tabs{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
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
.icon_box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    margin-bottom: 36rpx;
    .icon_item{
        padding: 20rpx 24rpx;
        box-sizing: border-box;
        position: relative;
        width: 360rpx;
        border-radius: 12rpx;
        &.left{
            background: linear-gradient(90deg, #FFE1C7 0%, #FFF2E6 100%);
        }
        &.right{
            background: linear-gradient(90deg, #D2E3FF 0%, #E5F4FF 100%);
        }
        .icon_title{
            font-weight: 500;
            font-size: 32rpx;
            color: #333333;
            margin-bottom: 4rpx;
        }
        .icon_content{
            font-weight: 500;
            font-size: 36rpx;
            color: #FC7700;
            margin-bottom: 12rpx;
        }
        .icon_right_content{
            padding: 4rpx 16rpx;
            box-sizing: border-box;
            background: #EFF6FF;
            border-radius: 22rpx;
            display: flex;
            align-items: center;
            margin-bottom: 22rpx;
            width:fit-content;
            .content_text{
                font-size: 20rpx;
                color: #566ED8;
                font-weight: 400;
                margin-right: 4rpx;
            }

        }
        .icon_bottom{
            display: flex;
            align-items: center;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            .icon_bottom_img{
                width: 22rpx;
                height: 22rpx;
                margin-left: 4rpx;
            }
        }
        .flex_img{
            position: absolute;
            width: 96rpx;
            height: 96rpx;
            top: 30rpx;
            right: 30rpx;
        }

    }
}
.reload_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    margin-bottom: 24rpx;
    .reload_title{
        font-weight: 500;
        font-size: 32rpx;
        color: #333333;
    }
    .reload_icon{
        display: flex;
        align-items: center;
        padding: 8rpx 20rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border-radius: 30rpx;
        .reload_icon_text{
            font-weight: 500;
            font-size: 28rpx;
            color: #666666;
            margin-right: 8rpx;
        }
    }
}

.card_list{
    width: 100%;
    padding: 10rpx;
    display: flex;
    flex-wrap: wrap;

    .itemChat {
        width: calc(50% - 20rpx);
        margin: 10rpx;
    }

}

.fliex_box{
    position: fixed;
    bottom: 250rpx;
    right: 22rpx;
    width: 80rpx;
    height: 80rpx;
    padding: 18rpx;
    background: #fff;
    border-radius: 50%;
    z-index: 100;

}

.likeChat {
    height: 100%;
    // width: 70%;
    // margin-left: 15%;
    // margin-top: 30%;
    align-items: center;
    justify-content: center;

    image {
        width: 300rpx;
        height: 300rpx;
    }
    .txt {
        font-weight: 400;
        font-size: 32rpx;
        color: #999999;
        text-align: center;
    }
    .btn {
        width: 360rpx;
        height: 96rpx;
        margin-top: 60rpx;
        font-size: 32rpx;
        color: #FFFFFF;
        background: linear-gradient(90deg, #FD938F 0%, #EA3E1A 100%);
        border-radius: 48rpx;
    }
    .empty-btn {
        width: 248rpx;
        height: 76rpx;
        margin-top: 60rpx;
        background: #FFFFFF;
        border-radius: 38rpx;
        color: #EA3E1A;
        border: 2rpx solid #EA3E1A;
    }
    .ripple-wrap {
        width: 548rpx;
        height: 548rpx;
        position: relative;
        top: -190rpx;

        .ripple {
            width: 548rpx;
            height: 548rpx;
            margin-bottom: 50rpx;
            animation: spin 5s linear infinite;
        }
        /* 定义关键帧动画 */
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        .user {
            border-radius: 50%;
            width: 70rpx;
            height: 70rpx;
            transition: opacity 0.5s ease-in-out;
        }
        .btn-wrap {
            margin-top: 60rpx;
        }
        .editBtn {
            margin-left: 30rpx;
        }
    }
}

.create-chat {
    width: 90%;
    height: 92rpx;
    margin-left: 5%;
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    background: #FFFFFF;
    font-size: 32rpx;
    color: #333333;
    box-shadow: 0rpx 0rpx 20rpx rgba(0,0,0,0.16);
    border-radius: 44rpx;
    align-items: center;
    justify-content: space-evenly;

    .line {
        width: 1rpx;
        height: 44rpx;
        background-color: #F2F2F2;
    }

    image {
        width: 36rpx;
        height: 36rpx;
        margin-right: 10rpx;
    }
}

.scrollList-wrap {
    // background-color: #FFFFFF;
    height: 80rpx;
    display: flex;
    align-items: center;
    padding: 0rpx 20rpx;
    padding-right: 0rpx;
    box-sizing: border-box;
    .tabs_conten{
        flex: 1;
        overflow-x: scroll;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 20rpx;
        box-sizing: border-box;
        .Tabs_list{
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
            .Tabs_item{
                position: relative;
                flex-shrink: 0;
                // margin-right: 50rpx;
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
                    z-index: 100;
                }
            }
        }
    }
}

.item-container {
    position: relative;
    display: flex;
    flex-wrap: nowrap;

    .scroll-item {
        flex-grow: 1;
        flex-shrink: 0;
        margin: 20rpx 10rpx;
        padding: 10rpx 18rpx;
        color: #6E6E6E;
        font-size: 24rpx;
        font-weight: 500;
        border-radius: 32rpx;
        border: 1px solid #C4C4C4;
    }

    .active {
        color: #EA3E1A;
        border: 1px solid #EA3E1A;
    }
}
.banner_box{
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
}

</style>
