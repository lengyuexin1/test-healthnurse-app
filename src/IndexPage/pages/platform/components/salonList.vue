<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="false"
        @query="queryList"
        @scroll="scrollPage"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        :auto-show-back-to-top="true"
        back-to-top-bottom="180rpx"
        :back-to-top-img="getAssetsUrl('/leyou/home/page_Topup.svg')"
        :back-to-top-style="{ width: '80rpx', height: '80rpx', padding: '18rpx', background: '#fff', borderRadius: '50%' }"
    >
        <!-- 直播间轮播盒子 -->
        <view class="top_bg_box" v-if="data.showNav">
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
                            mode="aspectFill"
                            @click="liveList(item)"

                        />
                        <view class="live_box" v-if="( (item.moduleType == 1 && liveType.channel) || (item.moduleType == 2 && liveType.course) || (item.moduleType == 3 && liveType.salon) )">
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
                    <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }" v-for="(signItem, signIndex) in data.swiperList.length" :key="signIndex"></view>
                </view>
            </view>

            <!-- icon类目菜单 -->
            <view class="icon_menu">
                <view class="icon_menuItem" v-for="(item,index) in data.menuiconList" :key="item.id" @click="toClassPage(item)">
                    <!-- :src="getAssetsUrl( (index + 1) == data.menuiconList.length ? '/leyou/newpagemenu/allclass.svg' : '/leyou/newpagemenu/ys_icon.png')" -->
                    <image
                        class="menu_img"
                        :src="getAssetsUrl('/leyou/newpagemenu/ys_icon.png')"
                        mode="scaleToFill"
                    />
                    <view class="menu_text">{{ item.name }}</view>
                </view>
            </view>

            <!-- 圈子导航栏 -->
            <view class="course_type" v-if="false">
                <view class="course_scroll">
                    <view class="course_item" :class="{ 'showAll': data.isshowAll }" @click="changeshowAll">全部</view>
                    <view
                    class="course_item"
                    :class="{ 'is_course': data.soncurrentTabIndex == index }"
                    v-for="(item,index) in data.sontabsData" :key="item.id"
                    @click="changesontabs(item,index)">{{item.name}}</view>
                </view>
            </view>

            <!-- 类目导航栏 -->
            <!-- v-if="!data.isshowAll" -->
            <view class="tabs_box" >
                <view class="tabs_conten">
                    <view class="Tabs_list">
                        <view class="Tabs_item"
                            v-for="(item, index) in data.courseTypeList"
                            :key="index"
                            @click="iscourse(item,index)"
                        >
                            <view class="Tabs_item_text" :class="{ 'is_select': data.lodIndex == index }">
                                {{ item.name }}
                            </view>
                            <view class="barbox" v-if="data.lodIndex == index"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>


        <!-- 沙龙关注列表 -->
        <!-- <view v-if="data.courseIndex == 0 ">关注列表</view> -->
        <salonFollowList v-if="data.courseIndex == 0" :followList="data.followList" :dataList="data.dataList" @change="changefollow"></salonFollowList>

        <!-- 沙龙类目列表 -->
        <template v-else>
            <salonWaterFall :wfList="data.dataList" @waterItem="clickwaterItem"></salonWaterFall>
        </template>

        <BCNotify ref="bcNotify"></BCNotify>

        <image
			@click="toUpsalon"
			class="upsalon_img"
			:src="getAssetsUrl('/leyou/icon/upsalonPage.svg')"
			mode="scaleToFill"
		/>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"
import BCNotify from '@/components/notify/index.vue'
import BarPlaying from '@/components/barPlaying/barPlaying.vue'
import { gotoLogin } from "@/routes/public-routes"

import { gotoSalonDetail, gotoUpsalonPostsPage } from '@/routes/create-routes'

import salonWaterFall from './salonWaterFall.vue'
import salonFollowList from './salonFollowList.vue'

import { salonfollowList, getcategoryShow, getFollowsalonList, clearResDot, getSalonliveList, indexBannerList } from "@/api/create-api"
import { gotoLiveList } from '@/routes/user-routes'


interface Data{
    swiperData:string[],
    sontabsData:any,
    soncurrentTabIndex:number,
    dataList:any,
    categoryId:string | number,
    courseTypeList:any,
    courseIndex:number,
    followList: any,
    followId:string,
    showNav: boolean,
    lodIndex: number,

    swiperList: any,
    swiperIndex: number,
    isshowAll: boolean,

    menuiconList: any
}
const data = reactive<Data>({
    swiperData: [
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png'
    ],
    sontabsData: [],
    soncurrentTabIndex: 0,
    dataList: [],
    categoryId: '',
    courseTypeList: [],
    courseIndex: 1,
    followList: [],
    followId: '',
    showNav: true,
    lodIndex: 1,

    swiperList: [],
    swiperIndex: 0,
    isshowAll: true,
    menuiconList: [],
})

interface Props {
    hidNavIndex: number,
    liveType: any,

}

const props = defineProps<Props>()

interface Events {
    (e: 'hideNav', val:boolean): void,
    (e: 'changeNav', index:number): void,
    (e: 'gethidNavList', list:any): void,

}
const emit = defineEmits<Events>()


const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})



onMounted(() => {
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
    // data.lodIndex = props.hidNavIndex

    indexBannerList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            moduleType: 3
        }
    }).then((res:any) => {
        data.swiperList = res.data

    })

})


const paging = ref()
const bcNotify = ref()
const queryList = async (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) {
        await getcategoryShow({
            categoryType: 3
        }).then((res:any) => {
            data.sontabsData = res[0].sonCategoryShows

            // data.courseTypeList = [
            //     { id: 1, name: '关注' },
            //     { id: 999, name: '推荐' },
            //     ...res[0].sonCategoryShows[data.soncurrentTabIndex].sonCategoryShows
            // ]

            data.courseTypeList = [
                { id: 1, name: '关注' },
                { id: 999, name: '推荐' },
                ...res[0].sonCategoryShows
            ]

            data.menuiconList = [
                ...res[0].sonCategoryShows,
            ]

            console.log('data.soncurrentTabIndex', data.soncurrentTabIndex)
            console.log('data.courseTypeList', data.courseTypeList)


            emit('gethidNavList', data.sontabsData)


        }).catch((err:any) => {
            console.log('err', err)

            data.courseTypeList = [
                { id: 1, name: '关注' },
                { id: 999, name: '推荐' }
            ]

            // emit('gethidNavList',data.courseTypeList)
            emit('gethidNavList', data.sontabsData)


        })
    }
    if (data.courseIndex == 0) {
        await coursefollowList()
        getfollowPosts(pageNumber, pageSize)
    }
    else {
        getcrList(pageNumber, pageSize)
    }
}



// 沙龙列表
const getcrList = (pageNumber:number, pageSize:number) => {

    // let cIds = data.sontabsData[data.soncurrentTabIndex].id

    // const categoryIds = data.courseTypeList[data.courseIndex].id == 999 ? [cIds] : [data.courseTypeList[data.courseIndex].id]
    const categoryIds = data.courseTypeList[data.courseIndex].id == 999 ? [] : [data.courseTypeList[data.courseIndex].id]
    console.log('categoryIds', categoryIds)


    getSalonliveList({
        pageNumber,
        pageSize,
        query: {
            categoryIds
        }
    }).then((res:any) => {
        (paging.value as any).complete(res.data)
    }).catch((err:any) => {
        console.log('err', err)

    })
}

// 沙龙关注列表
const coursefollowList = () => {

    salonfollowList({
        pageNumber: 1,
        pageSize: 100,
        query: {
            happyType: 3,
            accountName: ""
        }
    }).then((res:any) => {
        if (data.followId == '' && res.data.length != 0) {
            data.followId = res.data[0].accountId
            getfollowPosts(1, 10)

        }
        data.followList = res.data
    })
}

// 作者帖子列表
const getfollowPosts = (pageNumber:number, pageSize:number) => {
    if (!data.followId) {
        (paging.value as any).complete([])
        return
    }

    getFollowsalonList({
        pageNumber,
        pageSize,
        query: {
            accountId: data.followId ? data.followId : null
        },
        sorts: [{
            isAsc: false,
            key: 'utcModified'
        }]
    }).then((res:any) => {
        clearResDot({
            accountIds: [data.followId]
        }).then(() => {});
        (paging.value as any).complete(res.data)
    })
}


const changesontabs = (item:any, index:number) => {
    console.log('item', item)

    data.soncurrentTabIndex = index



    data.lodIndex = 1
    data.isshowAll = false
    data.courseIndex = 1;

    (paging.value as any).reload()

}

const iscourse = (item:any, index:number, val:boolean = false) => {
    data.courseIndex = index
    data.categoryId = item.id

    data.lodIndex = index

    // emit('changeNav',index);

    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload()
    }


}

const changefollow = (item:any) => {
    data.followId = item.accountId;
    (paging.value as any).reload()

}

const reloadPage = () => {
    (paging.value as any).refresh()
    // (paging.value as any).reload()

}

const liveswiperChange = (e:any) => {
    data.swiperIndex = e.detail.current

}

const scrollPage = (e:any) => {
    // emit('hideNav', true)
    // return
    if (e.detail.scrollTop > 160) {
        emit('hideNav', true)
    }
    else {
        emit('hideNav', false)
    }

    // if (e.detail.scrollTop > 200) {
    //     data.showNav = false;
    // }else{
    //     data.showNav = true;
    // }
}

const backToTopClick = () => {
    (paging.value as any).scrollToTop(false)
}

const clickwaterItem = (item:any) => {
    gotoSalonDetail({ id: item.id })
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

const changeshowAll = () => {
    data.isshowAll = true
    data.soncurrentTabIndex = 999
    data.courseIndex = 1;
    (paging.value as any).reload()

}

const toUpsalon = () => {
    gotoUpsalonPostsPage({})
}

defineExpose({
    reloadPage,
    backToTopClick,
    iscourse,
    changesontabs
})

</script>

<style lang="scss" scoped>
.top_bg_box{
    background: transparent;
    box-sizing: border-box;
    margin-top: 12rpx;

    .live_swiper{
        position: relative;
        border-radius: 12rpx;
        overflow: hidden;
        width: 718rpx;
        // height: 280rpx;
        margin: auto;
        padding-top: 10rpx;
        box-sizing: border-box;
        margin-bottom: 20rpx;

        .swiper{
            width: 100%;
            height: 144rpx;
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

    .icon_menu{
        width: 718rpx;
        padding: 30rpx 10rpx;
        box-sizing: border-box;
        background: #fff;
        display: grid;
        grid-gap: 24rpx;
        grid-template-columns: auto auto auto auto auto;
        border-radius: 24rpx;
        margin: auto;
        margin-bottom: 12rpx;
        .icon_menuItem{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .menu_img{
                width: 80rpx;
                height: 80rpx;
                margin-bottom: 12rpx;
            }
            .menu_text{
                font-size: 28rpx;
                color: #2A2A2A;
                text-align: center;
                font-weight: 400;
            }

        }
    }

    .tabs_box{
        height: 80rpx;
        display: flex;
        align-items: center;
        padding: 0rpx 20rpx;
        box-sizing: border-box;
        .tabs_conten{
            flex: 1;
            overflow-x: scroll;
            height: 100%;
            display: flex;
            align-items: center;
            .Tabs_list{
                display: flex;
                align-items: center;
                box-sizing: border-box;
                .Tabs_item{
                    position: relative;
                    flex-shrink: 0;
                    margin-right: 70rpx;
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
    .course_type{
        // justify-content: space-between;
        width: 100%;
        padding: 12rpx 0rpx 20rpx 20rpx;
        box-sizing: border-box;
        background: #fff;
        z-index:100;
        overflow-x: scroll;
        border-bottom: 2rpx solid #F2F2F2;
        .course_scroll{
            display: flex;
            width: 1400rpx;
            align-items: center;
        }
        .course_item{
            margin-right: 30rpx;
            width: 174rpx;
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
            &.showAll{
                border: 1px solid #EA3E1A;
                color: #EA3E1A;
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
    margin-bottom: 10rpx;
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
                margin-right: 80rpx;
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

.upsalon_img{
	position: fixed;
	bottom: 250rpx;
	right: 30rpx;
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
}
</style>
