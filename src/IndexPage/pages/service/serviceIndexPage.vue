<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto-show-back-to-top="true"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
        <template #top>
                <PageTopbg  :zIndex="-1" :bgstyle="'background: linear-gradient( 180deg, #DFF7EF 0%, #F2F3F5 100%);'" :addheight="400"></PageTopbg>
                
                <view class="navbar_box" :style="{ paddingTop: data.titleTop + 'px', paddingRight: data.titleRight + 'px' }">
                    <view class="top_box" :style="{ height: data.sBarHeight + 'px' }" >
                        <view class="back_icon" @click="goback">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true"/>
                            <!-- #ifdef MP-WEIXIN -->
                            <view class="title_text">适品囤</view>
                            <!-- #endif -->
                        </view>

                        <!-- #ifdef APP-PLUS || H5 -->
                        <view class="title_text">适品囤</view>
                        <!-- #endif -->

                        <view class="appChat_icon">
                            <image
                                class="appChat_img"
                                :src="getAssetsUrl('/leyou/newpagemenu/chat.png')"
                                mode="scaleToFill"
                            />
                            <view class="appChat_text">客服</view>
                        </view>
                    </view>

                </view>

                <view class="top_box">
                    <view class="home_top_box">
                        <view class="change_city_box" @click="changecity">
                            <view class="city_name">商城</view>
                            <!-- <TnIcon name="down" color="#646464" size="26" bold offset-top="4"></TnIcon> -->
                        </view>
                        <view class="inp_box" @click="tosearch">
                            <view class="left_box">
                                <view class="left_icon_box">
                                    <view class="scan_box">
                                        <image
                                            class="scan_img"
                                            :src="getAssetsUrl('/leyou/newpagemenu/scan_icon.svg')"
                                            mode="scaleToFill"
                                        />
                                    </view>
                                    <TnIcon name="search" color="#999999" size="32" bold ></TnIcon>

                                </view>
                                <view class="inp_left">
                                    <swiper
                                        class="swiper"
                                        circular
                                        :autoplay="true"
                                        :interval="5000"
                                        :duration="500"
                                        :vertical="true" 
                                    >
                                        <swiper-item v-for="(item,index) in data.noticeData" :key="index">
                                            <view class="swiper_item_item">{{ item }}</view>
                                        </swiper-item>
                                    </swiper>
                                </view>
                            </view>

                            <view class="right_btn">搜索</view>
                            
                        </view>
                        <!-- 信息盒子 -->
                        <view class="top_left">
                            <view class="more_icon" @click="changebubble">
                                <TnIcon name="more-horizontal" color="#646464" size="54" bold ></TnIcon>
                            </view>
                        </view>
                    </view>
                </view>
                
            </template>

            <view class="content_page">
                <!-- v-if="data.swiperList.length != 0" -->
                <view class="live_swiper" >
                <swiper
                    class="swiper"
                    circular
                    :autoplay="true"
                    :interval="5000"
                    :duration="500"
                    :vertical="false"
                    @change="liveswiperChange"
                >
                <!-- v-for="(item,index) in data.swiperList" :key="item.id" -->
                    <swiper-item class="swiper_item" >
                        <!-- @click="liveList(item)" -->
                        <image
                            class="live_swiper_img"
                            :src="getAssetsUrl('/leyou/newpagemenu/banner.png')"
                            mode="aspectFill"
                        />
                        <view class="live_box">
                            <view class="live_left_box">
                                <BarPlaying bgColor="#FFFFFF"></BarPlaying>
                                <view>直播中</view>
                            </view>
                            <view class="live_number_box" v-if="false">
                                {{ 111 }} 人观看
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="swiper_sign_box">
                    <view class="sign_item" :class="{ 'is_sign': signIndex == data.swiperIndex }" v-for="(signItem, signIndex) in data.swiperList.length" :key="signIndex"></view>
                </view>
            </view>

                <view class="topMenu_box" >
                    <view class="Menu_itemList" :class="{ 'not_bootm' : (index + 1) == data.topMenu.length }" v-for="(item,index) in data.topMenu" :key="index">
                        <view class="topMenu_item" v-for="(sonItem,sonIndex) in item" :key="sonIndex" @click="changeTopMenu(sonItem,index)">
                            <!-- :src="getAssetsUrl(sonItem.icon)" -->
                            <image
                                class="item_img"
                                :src="sonItem.thumb"
                                mode="scaleToFill"
                            />
                            <view class="item_text">{{ sonItem.name }}</view>
                        </view>
                    </view>
                </view>

                <view class="activity_List">
                    <view class="activity_item" @tap="clickActivityList(1)">
                        <view class="top_text_box">
                            <text class="red_text">适品</text>
                            <text>老博会</text>
                        </view>
                        <view class="item_text">好物好逛</view>
                        <view class="activity_bottom">
                            <image
                                class="right_img first_img"
                                :src="getAssetsUrl('/leyou/logo/leyou_logo.png')"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>

                    <view class="activity_item" @tap="clickActivityList(2)">
                        <view class="top_text_box">
                            <text>直播</text>
                            <text class="red_text">精选</text>
                        </view>
                        <view class="item_text">天天有折</view>
                        <view class="activity_bottom">
                            <image
                                class="right_img"
                                :src="getAssetsUrl('/leyou/goods/liveicon.png')"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>

                    <!-- <view class="activity_item" @tap="clickActivityList(3)">
                        <view class="top_text_box">
                            <text>保椿</text>
                            <text class="red_text">点</text>
                            <text>评</text>
                        </view>
                        <view class="item_text">排行榜单</view>
                        <view class="activity_bottom">
                            <image
                                class="right_img"
                                :src="getAssetsUrl('/leyou/goods/goodshop-icon.svg')"
                                mode="scaleToFill"
                            />
                        </view>
                    </view> -->

                    <view class="activity_item" @tap="clickActivityList(5)">
                        <view class="top_text_box">
                            <text class="red_text">讨论</text>
                            <text>区</text>
                        </view>
                        <view class="item_text">你来点评</view>
                        <view class="activity_bottom">
                            <image
                                class="right_img"
                                :src="getAssetsUrl('/leyou/goods/dp_icon.svg')"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>

                </view>

                <!-- 新人福利 -->
                <NewcomerWelfare></NewcomerWelfare>

                <view class="fliex_box">
                    <view class="Nav_box">
                        <view class="Nav_scoll_box">
                            <view class="Nav_item" :class="{ 'have_right' : data.NavList.length == (index + 1) }" v-for="(item,index) in data.NavList" :key="index" @click="changeNav(item)">
                                <view class="item_name">
                                    <view> {{ item.name }} </view>
                                    <view class="isSelect" v-if="data.NavId == item.id"></view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="more_icon">
                        <TnIcon name="down" size="32rpx" color="#333"></TnIcon>
                    </view>
                </view>
                


                <view class="content_right_list" :class="{ 'not_height' : data.dataList.length == 0 }">
                    <!-- :navid="data.NavId" -->
                    <WaterfallsFlow :wfList="data.dataList" :navid="data.NavId" @waterItem="clickwaterItem"></WaterfallsFlow>
                </view>

            </view>
            <view class="page_bg"></view>


            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'

import { getAssetsPic } from '@/common/setPicture'
import { getcategoryList, servicePageChannel, categoryShow } from '@/api/service-api'
import { productlist, getGoodsCartList, recommendList, goodsfavoriteList } from '@/api/goods-api'
import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import NewcomerWelfare from './components/newcomerWelfare.vue'
import { gotoRegister, gotoShoppingCart } from '@/routes/goods-routes'
import { GlobalEvents, addWEventsListener } from '@/events/event-registry'
import { gotoCitychange, invitationDetail } from '@/routes/user-routes'
import { gotoServiceStore, toInnerPage, gotosearch, gotoShopDetail, gotoserviceLnnerPage, gotoServiceExpo, gotoLiveSelection } from '@/routes/service-routes'
import { gotogoodsDetail, gotoGoodsPerferShop, gotoGoodsSort } from '@/routes/goods-routes'
import { PlatformManage } from '@bc/sys'
import { gotogoodsRanking } from '@/routes/goods-routes'
import { healthContentList, followContentList } from "@/api/create-api"
import { gotoarticledetails, gotovideoPreview, } from '@/routes/create-routes'
import { gotoLogin } from "@/routes/public-routes"
import BarPlaying from '@/components/barPlaying/barPlaying.vue'

interface Data {
    titleTop: number
    titleRight: number
    sBarHeight: number
    dataList:any,
    inputValue:string,
    menuList:any,
    menuIndex: number,
    menuId:string,
    categoryList:any,
    topMenu:any,
    activityList:any,
    NavList:any,
    NavId:number,
    screenIndex:number,
    salesType:number,
    priceType:number,
    sortType:number,
    shopCartNum: number,
    nowCity:string,
    noticeData:any,
    swiperIndex: number
    swiperList: any

}
const data = reactive<Data>({
    titleTop: 0,
    titleRight: 0,
    sBarHeight: 0,
    dataList:[],
    inputValue:'',
    menuList:[],
    menuIndex:0,
    menuId:'',
    categoryList:[],
    topMenu:[
        [
            {id:86,name:'适品购物',icon:'/leyou/goods/goods.svg'},
            {id:80,name:'兴趣学习',icon:'/leyou/goods/study.svg'},
            {id:85,name:'休闲玩乐',icon:'/leyou/goods/play.svg'},
            {id:81,name:'康旅文旅',icon:'/leyou/goods/travel.svg'},
            {id:82,name:'医学美容',icon:'/leyou/goods/cosmetology.svg'},
        ],
        [
            // {id:89,name:'生活',icon:'/leyou/goods/life.svg'},
            {id:90,name:'康养服务',icon:'/leyou/goods/life.svg'},
            {id:87,name:'健康服务',icon:'/leyou/goods/health.svg'},
            // {id:88,name:'照护',icon:'/leyou/goods/care.svg'},
            {id:91,name:'宠物服务',icon:'/leyou/goods/care.svg'},
            {id:83,name:'代办服务',icon:'/leyou/goods/handling.svg'},
            {id:84,name:'找工作',icon:'/leyou/goods/finjob.svg'},
        ],
    ],
    activityList:[
        {id:1,name:'品牌馆/旗舰店',rightIcon:'/leyou/logo/leyou_logo.png',topimg:"/leyou/goods/laobo.svg"},
        {id:2,name:'好逛',rightIcon:'/leyou/goods/liveicon.png',topimg:"/leyou/goods/livetitle.svg"},
        {id:3,name:'排行榜单',rightIcon:'/leyou/goods/goodshop-icon.svg',topimg:"/leyou/goods/Comment.svg"},
        {id:4,name:'新人福利',rightIcon:'/leyou/goods/Signin-icon.svg',topimg:"/leyou/goods/Signin.svg"},
    ],
    NavList:[
        {id:11,name:'关注'},  
        {id:22,name:'推荐'},
        {id:86,name:'购物'},
        {id:80,name:'学习'},
        {id:90,name:'康养'},
        {id:87,name:'健康'},
        {id:82,name:'美容'},
        {id:91,name:'宠物'},
        {id:85,name:'玩乐'},
        {id:81,name:'旅游'},
        // {id:89,name:'生活'},
        // {id:88,name:'照护'},
        {id:83,name:'代办'},
        {id:84,name:'找工作'},
    ],
    NavId:22,
    screenIndex:1,
    salesType:0,
    priceType:0,
    sortType:1,
    shopCartNum: 9,
    nowCity:"广州",
    noticeData:[
        '休闲/玩乐',
    ],
    swiperIndex: 0,
    swiperList: [],
})


interface Events {
    (e: 'showServiceMenu'): void,
    
}
const emit = defineEmits<Events>()

const bcNotify = ref()

const listen = () => {
    addWEventsListener(GlobalEvents.Refresh_ShoppingCart_Badge, () => {
        goodsCartList()
    })
}

const goodsCartList = () => {
    getGoodsCartList().then((res: any) => {
        data.shopCartNum = res.reduce((accumulator: number, currentValue: any) => {  
            return accumulator + currentValue?.productList.length  
        }, 0)
    })
}

onMounted(()=>{

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

    console.log('7891011,data.titleRight',data.titleRight)


    listen()
    goodsCartList()
    getCity()

})

const getCity = () => {
    
    PlatformManage.getToken().then((res:any)=>{
        console.log('获取城市', res.city);

        data.nowCity = res.city ? res.city : '广州'
    })
}

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


const paging = ref(null)

const queryList = async (pageNumber:number, pageSize:number)=>{
    getList(pageNumber,pageSize)

}


// 顶部菜单切换
const changeTopMenu = (item:any,index:number)=>{

    console.log('item',item.categoryId);
    if (item.categoryId == 86) {
        gotoGoodsSort()

        console.log('适品入口');
        return
    }

    if (item.categoryId == 90) {
        gotoserviceLnnerPage({id:88})
        return
    }

    // if (item.id == 91) {
        
    //     return
    // }

    toInnerPage({id:item.categoryId,pageTitle:item.name})
}

const clickActivityList = (item: any) => {
    console.log('item1111',item);

    // 邀请好友
    // item.id == 1 && invitationDetail()
    // 优选店铺
    // item.id == 2 && gotoGoodsPerferShop()


    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        item == 1 && gotoServiceExpo();
        item == 2 && gotoLiveSelection();
        item == 3 && gotogoodsRanking();
        item == 4 && gotoRegister();
        item == 5 && gotodiscussListPage();

    })

    
}

// 列表内容
const getList = (pageNumber:number, pageSize:number) => {

    if (pageNumber == 1) {
        categoryShow({
            id: 3
        }).then((res:any) => {
            console.log('类目',res);
            data.NavList = [
                {id:11,name:'关注'},  
                {id:22,name:'推荐'},
                ...res
            ]
        })

        servicePageChannel({}).then((res:any) => {
            console.log('菜单类目',res);
            let result = [] as any
            for (let i = 0; i < res.length; i += 5) {
                result.push(res.slice(i, i + 5));
            }
            data.topMenu = result


            console.log('data.topMenu',data.topMenu);
            
        })
    }

    if (data.NavId == 11) {
        console.log('关注列表');
        followContentList({
            pageSize,
            pageNumber,
            query:{
                happyType: 97
            }
        }).then((res:any) => {
            (paging.value as any).complete(res.data)
        })
        
    }else{

        PlatformManage.isRequireLogin().then((isRequireLogin) => {
            healthContentList({
                pageSize,
                pageNumber,
                query:{
                    categoryIds: data.NavId == 22 ? [] : [data.NavId],
                }
            },isRequireLogin).then((res:any) => {
                (paging.value as any).complete(res.data)
            })
        })

    }

}


// 购物车
const clickShoppingCart = () => {
    gotoShoppingCart()
}

const changeNav = (item:any) => {

    if (item.id == 11 ) {
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
    data.NavId = item.id;
    (paging.value as any).reload()
}

const changebubble = () => {
    emit('showServiceMenu')
    // data.showrightMenu = true
    // data.showbubble = !data.showbubble
}

const changecity = () => {
    gotoCitychange()
}
const tosearch = () => {
    gotosearch()
}


const clickwaterItem = (item:any) =>{

    console.log('item',item);
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('登录失效,请重新登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        if (item.type == 1 || item.type == 3) {
            gotoarticledetails({ id: item.id })
            return
        }
        if (item.type == 2) {
            gotovideoPreview({ videoId: item.id, videoPagetype: 0 })
            return
        }
    })


    // 商品、店铺详情
    // item.businessType == 2 && gotogoodsDetail(item.id)
    // item.businessType == 3 && gotoServiceStore({shopId:item.id,isAd:0})
}

// 退出页面
const goback = () => {
    uni.navigateBack();
}

const liveswiperChange = (e:any) => {
    data.swiperIndex = e.detail.current
}

const liveList = (item:any) => {
    console.log('item',item);
}

defineExpose({
    getCity,
})

</script>

<style lang="scss" scoped>

.navbar_box{
    // #ifdef APP-PLUS || H5
    padding-bottom: 12rpx;
    // #endif
    .top_box{
        padding: 10rpx;

        padding-left: 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        // #ifdef APP-PLUS || H5
        width: 100%;
        height: auto!important;
        // #endif
        .title_text{
            font-weight: 500;
            font-size: 34rpx;
            color: #333333;
            margin-left: 16rpx;
        }
        .appChat_icon{
            width: 70rpx;
            height: 70rpx;
            position: relative;
            border-radius: 50%;
            background: #fff;
            .appChat_img{
                width: 100%;
                height: 100%;
            }
            .appChat_text{
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 58rpx;
                height: 24rpx;
                background: #EA3E1A;
                border-radius: 14rpx;
                text-align: center;
                line-height: 24rpx;
                font-weight: 400;
                font-size: 16rpx;
                color: #FFFFFF;
                transform: translate(-50%, 0rpx);
            }
        }
    }
    .back_icon{
        margin-right: 20rpx;
        display: flex;
        align-items: center;
    }
    .inp_box{
        padding: 16rpx 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 32rpx;
        
        .inp_text{
            font-size: 24rpx;
            color: #666666;
            margin-left: 6rpx;
        }
        

    }
    

}
.top{
    width: 100%;
}
.top_box{
    padding: 20rpx 30rpx;
    padding-bottom: 10rpx;
    box-sizing: border-box;
    .top_logo_img{
        // width: 66rpx;
        // height: 66rpx;
        width: 112rpx;
        height: 36rpx;
    }

    .home_top_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .change_city_box{
            display: flex;
            align-items: center;
            .city_name{
                font-size: 36rpx;
                color: #333333;
            }
        }
        .top_left{
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .more_icon{
            // margin-left: 30rpx;
        }
        .inp_box{
            width: 490rpx;
            background: #fff;
            border: 2rpx solid #F6CBCB;
            box-sizing: border-box;
            padding: 10rpx 20rpx;
            padding-right: 10rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 50rpx;
            position: relative;
            .left_box{
                display: flex;
                align-items: center;
                .left_icon_box{
                    display: flex;
                    align-items: center;
                    .scan_box{
                        width: 40rpx;
                        height: 40rpx;
                        padding-right: 12rpx;
                        margin-right: 12rpx;
                        border-right: 2rpx solid #D9D9D9;
                        .scan_img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    
                    
                }
                .inp_left{
                    // display: flex;
                    // align-items: center;
                    margin-left: 10rpx;
                    box-sizing: border-box;
                    width: 50%;
                    height: 48rpx;
                    .swiper{
                        width: 100%;
                        height: 100%;
                        .swiper_item_item{
                            line-height: 52rpx;
                            font-size: 26rpx;
                            font-weight: 400;
                            color: #A8A8A8;
                        }
                    }
                    
                }
            }

            .right_btn{
                padding: 10rpx 16rpx;
                box-sizing: border-box;
                background: linear-gradient( 90deg, #FF7104 0%, #EB2D2D 100%);
                border-radius: 28rpx;
                font-size: 24rpx;
                color: #FFFFFF;
                font-weight: 400;
            }
            
            
            .search_btn{
                width: 84rpx;
                height: 44rpx;
                line-height: 44rpx;
                text-align: center;
                background: #EA3E1A;
                border-radius: 24rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #FFFFFF;
            }
        }
        
    }
}
.topMenu_box{
    padding: 30rpx;
    box-sizing: border-box;
    border-radius: 32rpx;
    background: #fff;
    margin-bottom: 20rpx;
    .Menu_itemList{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 28rpx;
        &.not_bootm{
            margin-bottom: 0rpx;
        }
        .topMenu_item{
            display: flex;
            align-items: center;
            flex-direction: column;
            width: 100rpx;

            .item_img{
                width: 70rpx;
                height: 70rpx;
                margin-bottom: 8rpx;
            }
            .item_text{
                font-size: 28rpx;
                color: #333333;
                font-weight: 400;
                white-space: nowrap;
            }
        }
    }
}

.activity_List{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    background: linear-gradient( 180deg, #D4F1D4 0%, #C2E2C2 100%);
    border-radius: 24rpx;
    padding: 20rpx;
    box-sizing: border-box;
    .activity_item{
        width: 210rpx;
        // height: 120rpx;
        padding: 16rpx;
        padding-bottom: 8rpx;
        padding-right: 8rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
        background: #fff;
        .item_text{
            font-weight: 400;
            font-size: 20rpx;
            color: #333333;
            white-space: nowrap;
        }
        .activity_bottom{
            display: flex;
            justify-content: flex-end;
            .right_img{
                width: 48rpx;
                height: 48rpx;
                &.first_img{
                    width: 36rpx;
                    height: 36rpx;
                    margin-top: 12rpx;
                }
            }
        }
        .top_text_box{
            font-size: 28rpx;
            color: #333333;
            font-weight: 600;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            .red_text{
                color: #EA3E1A;
            }
        }
        
    }
}

.fliex_box{
    position: relative;

    .Nav_box{
        box-sizing: border-box;
        overflow-x: scroll;
        margin-bottom: 12rpx;
        .Nav_scoll_box{
            display: flex;
            align-items: center;
            width: fit-content;
            .Nav_item{
                flex-shrink: 0;
                margin-right: 48rpx;
                height: 58rpx;
                &.have_right{
                    padding-right: 100rpx;
                    margin-right: 148rpx;
                    box-sizing: border-box;
                }
                .item_name{
                    flex-shrink: 0;
                    font-size: 32rpx;
                    color: #666666;
                    font-weight: 400;
                    position: relative;
                    .isSelect{
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
    .more_icon{
        position: absolute;
        right: 0;
        top: 0;
        width: 88rpx;
        height: 100%;
        background: #F2F3F5;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.content_right_list{
    min-height: 800rpx;
    &.not_height{
        min-height: 0;
    }
}

.left_menu_bg{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #F8F8F8;
    z-index: -1;
}

.page_bg{
    width: 100%;
    height: 88rpx;
}

.content_page{
    padding: 20rpx;
    padding-top: 0rpx;
    box-sizing: border-box;

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

    .activityswiper{
        margin-bottom: 18rpx;
    }
    .category_box{
        margin-bottom: 20rpx;
    }
    .service_list_box{
        margin-bottom: 20rpx;

    }

    .screen_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .screen_list{
            display: flex;
            align-items: center;
            .screen_item{
                display: flex;
                align-items: center;
                margin-left: 32rpx;
                .screen_text{
                    color: #808080;
                    font-size: 28rpx;
                    font-weight: 400;
                    &.is_screen_text{
                        color: #EA3E1A;
                    }
                }
                .state_box{
                    margin-left: 4rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .state_img{
                        width: 22rpx;
                        height: 22rpx;
                    }
                    .change_state_img{
                        width: 22rpx;
                        height: 22rpx;
                        &.is_down{
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }
    }

}


</style>
