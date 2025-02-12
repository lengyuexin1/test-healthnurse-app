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

        <!-- 直播间轮播盒子 -->
        <!-- v-if="data.showNav" -->
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
            <view class="tabs_box" >
                <view class="tabs_conten">
                    <view class="Tabs_list">
                        <view class="Tabs_item"
                            v-for="(item, index) in data.sontabsData"
                            :key="index"
                            @click="changesontabs(item,index)"
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

        <!-- 云课堂关注列表 -->
        <followListVue v-if="data.soncurrentTabIndex == 0" :followList="data.followList" :dataList="data.dataList" @change="changefollow"></followListVue>

        <!-- 云课堂类目列表 -->
        <template v-else>
            <view class="WaterFall_box">
                <WaterfallsFlow :wfList="data.dataList" :is_statistics="false" @waterItem="clickwaterItem"></WaterfallsFlow>
            </view>
        </template>

        <BCNotify ref="bcNotify"></BCNotify>

        <template #bottom>
            <view class="zpage_bottom">

            </view>
        </template>
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { PlatformManage } from "@bc/sys"

import WaterfallsFlow from './WaterfallsFlow.vue'

import BCNotify from '@/components/notify/index.vue'
import followListVue from './followList.vue'
import { gotoLogin } from "@/routes/public-routes"

import { getescourselist, getcourselist, getcoursefollowList, clearResDot, indexBannerList, newCourseCategory } from "@/api/create-api"
import { getcategoryList, categoryShow } from '@/api/service-api'

import { gotocourseVideo, gotoLiveShow, gotowxLive } from '@/routes/create-routes'
import { TempStorage } from "@bc/base"
import { gotoLiveList } from '@/routes/user-routes'


interface Data{
    swiperData:string[],
    sontabsData:any,
    topNavList: any,
    soncurrentTabIndex:number,
    dataList:any,
    categoryId: string | number,
    tagId: number | string,
    followList: any,
    query:any,
    followId:string,

    courseTypeList:any,
    courseIndex:number,
    showNav: boolean,
    lodIndex: number,
    swiperList: any,
    swiperIndex: number,

}
const data = reactive<Data>({
    swiperData: [
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png',
        '/leyou/logo/swiper.png'
    ],
    sontabsData: [
        { id: 1, name: '关注' },
        // { id: 2, name: '推荐' }
    ],
    topNavList: [],
    soncurrentTabIndex: 1,
    dataList: [],
    categoryId: 99,
    tagId: 1,
    followList: [],
    query: {},
    followId: '',
    courseTypeList: [
        { id: 1, name: '热门' },
        { id: 2, name: '新潮' },
        { id: 3, name: '精品' }
    ],
    courseIndex: 0,
    showNav: true,
    lodIndex: 1,
    swiperList: [],
    swiperIndex: 0

})


interface Props {
    hidNavIndex: number,
    liveType: any,

}

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

interface Events {
    (e: 'hideNav', val:boolean): void,
    (e: 'changeNav', index:number): void,
    (e: 'gethidNavList', list:any): void,

}
const emit = defineEmits<Events>()


onMounted(() => {
    // data.lodIndex = props.hidNavIndex
    indexBannerList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            moduleType: 2
        }
    }).then((res:any) => {
        data.swiperList = res.data

    })
})


const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    console.log('刷新')

    if (data.categoryId != 1) {
        console.log('推荐以及其他', pageNumber)

        if (pageNumber == 1) {
            getcategory()
            return
        }
        getcrList(pageNumber, pageSize)
    }
    else {
        console.log('关注')

        if (pageNumber == 1) {
            coursefollowList()
        }
        getfollowcourseList(pageNumber, pageSize, data.followId)
    }
}
// 获取云课堂类目
const getcategory = () => {
    console.log('类目');
    

    newCourseCategory({
        id: 7
    }).then((res:any) => {
        data.topNavList = res
        console.log('Allres', res[props.hidNavIndex]);

        data.sontabsData = [
            { id: 1, name: '关注' },
            { id: 99, name: '推荐' },
            ...data.topNavList[props.hidNavIndex].sonCategoryShows,
        ]

        emit('gethidNavList', data.topNavList);

        getcrList(1,6);

    }).catch((err:any)=>{
        console.log('err类目',err);
        
    })



}

// 云课堂列表
const getcrList = (pageNumber:number, pageSize:number) => {

    let pageIndex = data.lodIndex

    data.query = {
        categoryIds: (data.sontabsData[pageIndex].id != 1 && data.sontabsData[pageIndex].id != 99) ? [data.sontabsData[pageIndex].id] : null,
		tagIds: data.categoryId != 1 ? [data.tagId] : null,
        accountId: data.categoryId == 1 ? data.followId : null,
        sortType: (data.categoryId != 1 && data.categoryId != 99) ? null : 7
    }

    getescourselist({
        pageNumber,
        pageSize,
        query: data.query
    }).then((res:any) => {
        if (data.categoryId == 1 && data.followId == '') {
            (paging.value as any).complete([])
            return
        }
        (paging.value as any).complete(res.data)
    }).catch((err:any)=>{
        console.log('err',err);
        
        (paging.value as any).complete([])
    })
}


const bcNotify = ref()
// 云课堂关注作者列表
const coursefollowList = () => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        getcoursefollowList({
            pageNumber: 1,
            pageSize: 100,
            query: {
                isFans: 0,
                happyType: 2
            }
        }).then((res:any) => {
            data.followList = res.data

            if (data.followList.length == 0) {
                return
            }

            if (data.followId == '') {
                data.followId = res.data[0].accountId
                getfollowcourseList(1, 6, res.data[0].accountId)
            }
        })
    })
}

// 关注作者列表
const getfollowcourseList = (pageNumber:number, pageSize:number, followId:string) => {

    if (!data.followList.length) {
        (paging.value as any).complete([])
        return
    }

    getcourselist({
        pageNumber,
        pageSize,
        query: {
            categoryId: null,
            tagId: null,
            accountId: data.categoryId == 1 ? followId : null
        }
    }).then((res:any) => {
        clearResDot({
            accountIds: [followId]
        }).then(() => {});
        (paging.value as any).complete(res.data)
    })
}


const changesontabs = (item:any, index:number, val:boolean = false) => {
    data.soncurrentTabIndex = index
    data.categoryId = item.id
    data.lodIndex = index
    // (paging.value as any).scrollIntoViewByNodeTop(168,0,true);

    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload()
    }
    // emit('changeNav', index)
}

// 首页顶部切换
const changetopNav = (item:any, index:number) => {
    console.log('item',item);
    console.log('index',index);
    (paging.value as any).reload();
    data.lodIndex = 1;

    

}

// 页面刷新
const pagingReload = (val:boolean = false, index:number = 1) => {

    data.lodIndex = index
    if (val) {
        (paging.value as any).refresh()
    }
    else {
        (paging.value as any).reload(true)
    }
}


const changefollow = (item:any) => {
    data.followId = item.accountId;
    (paging.value as any).reload()

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

const clickwaterItem = (item:any) => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
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
            console.log('item', item)
            // #endif

            return
        }
        const listId = TempStorage.savewx({
            videoIdlist: filterArrayAfterId(data.dataList, item.id),
            query: data.query
        })
        gotocourseVideo(listId)
    })
}


const liveswiperChange = (e:any) => {
    data.swiperIndex = e.detail.current

}

const scrollPage = (e:any) => {


    emit('hideNav', true)
    return
    if (e.detail.scrollTop > 160) {
        emit('hideNav', false)
    }
    else {
        emit('hideNav', true)
    }

    // if (e.detail.scrollTop > 200) {
    //     data.showNav = false;
    // }else{
    //     data.showNav = true;
    // }
}

const backToTopClick = () => {
    console.log('置顶');

    (paging.value as any).scrollToTop(false)

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
    pagingReload,
    backToTopClick,
    changesontabs,
    changetopNav,
})


</script>

<style lang="scss" scoped>
.top_bg_box{
    background: #fff;
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
            .Tabs_list{
                display: flex;
                align-items: center;
                justify-content: space-between;
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
    .fixed_space{
        height: 74rpx;
        width:100%;

    }
}


</style>
