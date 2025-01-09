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
                <PageTopbg :zIndex="-1"></PageTopbg>
                <bc-top-navbar>
                    <view class="top_box">
                        <!-- #ifdef MP-WEIXIN -->
                        <TnNavbar
                            height="45px"
                            back-icon=""
                            home-icon=""
                            :safe-area-inset-right="true"
                            bg-color="transparent"
                            :bottom-shadow="false"
                            :placeholder="true"
                        >
                            <template #back>
                                <view v-if="false">
                                    <!-- :src="getAssetsUrl('/leyou/logo/leyou_logo.png')" -->
                                    <image
                                        class="top_logo_img"
                                        :src="getAssetsUrl('/leyou/static/tabbar-icon/health-good-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                </view>
                            </template>
                        </TnNavbar>
                        <!-- #endif -->
                        
                        <view class="home_top_box">
                            <view class="change_city_box" @click="changecity">
                                <view class="city_name">{{ data.nowCity }}</view>
                                <TnIcon name="down" color="#646464" size="26" bold offset-top="4"></TnIcon>
                            </view>
                            <view class="inp_box" @click="tosearch">
                                
                                <TnIcon name="search" color="#999999" size="32" bold ></TnIcon>
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
                                <!-- <view class="inp_right">
                                    <view class="search_btn" >搜索</view>
                                </view> -->
                            </view>
                            <view class="top_left">
                                <view class="more_icon" @click="changebubble">
                                    <TnIcon name="more-horizontal" color="#646464" size="54" bold ></TnIcon>
                                </view>
                            </view>
                        </view>
                    </view>
                </bc-top-navbar>
                
            </template>

            <view class="content_page">
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
                    <view class="activity_item" v-for="item in data.activityList" :key="item.id"  @tap="clickActivityList(item)">
                        <image
                            class="top_img"
                            :class="{ 'first_img' : item.id == 1 }"
                            :src="getAssetsUrl(item.topimg)"
                            mode="scaleToFill"
                        />
                        <view class="item_text">{{ item.name }}</view>
                        <view class="activity_bottom">
                            <image
                                class="right_img"
                                :class="{ 'first_img' : item.id == 1 }"
                                :src="getAssetsUrl(item.rightIcon)"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>
                </view>


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
import { gotoRegister, gotoShoppingCart } from '@/routes/goods-routes'
import { GlobalEvents, addWEventsListener } from '@/events/event-registry'
import { gotoCitychange, invitationDetail } from '@/routes/user-routes'
import { gotoServiceStore, toInnerPage, gotosearch, gotoShopDetail, gotoserviceLnnerPage, gotoServiceExpo, gotoLiveSelection } from '@/routes/service-routes'
import { gotogoodsDetail, gotoGoodsPerferShop, gotoGoodsSort } from '@/routes/goods-routes'
import { PlatformManage } from '@bc/sys'
import { gotogoodsRanking } from '@/routes/goods-routes'
import { healthContentList, followContentList } from "@/api/create-api"
import { gotoarticledetails, gotovideoPreview } from '@/routes/create-routes'
import { gotoLogin } from "@/routes/public-routes"

interface Data {
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

}
const data = reactive<Data>({
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
    // activityList:[
    //     {id:1,name:'红包等你来领',rightIcon:'/leyou/goods/Newcomer-icon.svg',topimg:"/leyou/goods/Newcomer.svg"},
    //     {id:2,name:'质量商家',rightIcon:'/leyou/goods/goodshop-icon.svg',topimg:"/leyou/goods/goodshop.svg"},
    //     {id:3,name:'排行榜单',rightIcon:'/leyou/goods/Comment-icon.png',topimg:"/leyou/goods/Comment.svg"},
    //     {id:4,name:'超值福利',rightIcon:'/leyou/goods/Signin-icon.svg',topimg:"/leyou/goods/Signin.svg"},
    // ],
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
    console.log(item);

    // 邀请好友
    // item.id == 1 && invitationDetail()
    // 优选店铺
    // item.id == 2 && gotoGoodsPerferShop()


    item.id == 1 && gotoServiceExpo();
    item.id == 2 && gotoLiveSelection()
    item.id == 3 && gotogoodsRanking()
    item.id == 4 && gotoRegister()
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

defineExpose({
    getCity,
})

</script>

<style lang="scss" scoped>
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
                font-size: 30rpx;
                color: #333333;
                margin-right: 16rpx;
            }
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
        .more_icon{
            // margin-left: 30rpx;
        }
        .inp_box{
            width: 480rpx;
            background: #fff;
            border: 2rpx solid #F6CBCB;
            box-sizing: border-box;
            padding: 5rpx 10rpx;
            padding-left: 20rpx;
            display: flex;
            align-items: center;
            // justify-content: space-between;
            border-radius: 32rpx;
            position: relative;
            .scanning_icon{
                position: absolute;
                left: 24rpx;
                top: 8rpx;
                width: 40rpx;
                height: 44rpx;
            }
            .inp_left{
                // display: flex;
                // align-items: center;
                margin-left: 10rpx;
                box-sizing: border-box;
                width: 70%;
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
                width: 64rpx;
                height: 64rpx;
                margin-bottom: 8rpx;
            }
            .item_text{
                font-size: 24rpx;
                color: #333333;
                font-weight: 400;
            }
        }
    }
}

.activity_List{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;
    .activity_item{
        width: 166rpx;
        // height: 120rpx;
        padding: 16rpx;
        box-sizing: border-box;
        border-radius: 16rpx;
        background: #fff;
        
        .top_img{
            width: 110rpx;
            height: 34rpx;
            &.first_img{
                width: 82rpx;
            }
        }
        .item_text{
            font-weight: 400;
            font-size: 22rpx;
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
    box-sizing: border-box;
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
