<template>
    <view class="container">
        <z-paging 
		    ref="paging"
            :auto="false"
		    :refresher-enabled="false"
		>
            <template #top>
                <view id="pageTop">
                    <pageTopbg :zIndex="-1" :bgstyle="'background:#fff'"></pageTopbg>
                    <bc-page-navbar :title="'全部功能'" ></bc-page-navbar>
                </view>
            </template>

            <view class="content_page">
                <view class="Space_box"></view>
                <view class="menuBox_item">
                    <view class="menutitle">内容工具</view>
                    <view class="menuList_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.contentMenu.length }" v-for="(item, index) in data.contentMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="contentMenu(fItem)" >
                                <image
                                    class="function_itemImg"
                                    :src="getAssetsUrl(fItem.src)"
                                    mode="scaleToFill"
                                />
                                <view class="function_itemName">{{ fItem.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="menuBox_item">
                    <view class="menutitle">我的沙龙</view>
                    <view class="menuList_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.salongMenu.length }" v-for="(item, index) in data.salongMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="salonMenu(fItem)" >
                                <image
                                    class="function_itemImg"
                                    :src="getAssetsUrl(fItem.src)"
                                    mode="scaleToFill"
                                />
                                <view class="function_itemName">{{ fItem.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="menuBox_item">
                    <view class="menutitle">我的创作</view>
                    <view class="menuList_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.createMenu.length }" v-for="(item, index) in data.createMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="createMenu(fItem)" >
                                <image
                                    class="function_itemImg"
                                    :src="getAssetsUrl(fItem.src)"
                                    mode="scaleToFill"
                                />
                                <view class="function_itemName">{{ fItem.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="menuBox_item">
                    <view class="menutitle">我的服务</view>
                    <view class="menuList_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.serviceMenu.length }" v-for="(item, index) in data.serviceMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="serviceMenu(fItem)" >
                                <image
                                    class="function_itemImg"
                                    :src="getAssetsUrl(fItem.src)"
                                    mode="scaleToFill"
                                />
                                <view class="function_itemName">{{ fItem.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="menuBox_item">
                    <view class="menutitle">其他</view>
                    <view class="menuList_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.aboutMenu.length }" v-for="(item, index) in data.aboutMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="aboutMenu(fItem)" >
                                <image
                                    class="function_itemImg"
                                    :src="getAssetsUrl(fItem.src)"
                                    mode="scaleToFill"
                                />
                                <view class="function_itemName">{{ fItem.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>

            </view>

            <template #bottom>
               
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'

import { gotoTrackList, gotoCollectLists, gotoWatchHistory, 
        gotoLike, gotosalonManage, gotoMysalonPosts, gotoMysalonJoin, 
        gotoMyFollowList, gotoCouponList, gotoCommentList, gotoAftersalesList, gotoGroupChat, gotoHasChat,
        gotoWallet,
        gotoAnchorCenter, 
} from "@/routes/user-routes"

import { gotocourseList,
    gotocreationPage,
    gotoActivityIndex, assistantDetail, gotoenjoyRecord, gotofilterPage,
    gotowithdrawalIncome, gotoDraftList
} from "@/routes/create-routes"

import { gotoLogin } from "@/routes/public-routes"

import { enjoydetail } from '@/api/create-api'
import { PlatformManage } from "@bc/sys"
import { gotoShoppingCart, gotointegralMallGoods } from '@/routes/goods-routes'
import { gotoorderList } from "@/routes/order-routes"


interface Data {
    contentMenu: any
    salongMenu: any
    createMenu: any
    serviceMenu: any
    aboutMenu: any
}

const data = reactive<Data>({
    contentMenu: [
        [
            { id: 1, name: '收藏', src: '/leyou/icon/my-collection.svg' },
            { id: 2, name: '足迹', src:'/leyou/my/my_record_icon.svg' },
            { id: 3, name: '草稿箱', src: '/leyou/icon/my-draft-icon.svg' },
            { id: 4, name: '享老记', src: '/leyou/my/my_enjoy_icon.svg' },
        ],
        [
            { id: 5, name: '我的群聊', src: '/leyou/icon/my-group-chat.png' },
            { id: 6, name: '我聊过的', src: '/leyou/icon/my-chated.png' },
            { id: 7, name: '主播中心', src: '/leyou/my/my_live_icon.svg' },
        ]
    ],
    salongMenu:[
        [
            {id:1,name:'我创建的',src:'/leyou/icon/my-create.svg'},
            {id:2,name:'我的贴子',src:'/leyou/icon/my-posts.svg'},
            {id:3,name:'我加入的',src:'/leyou/icon/my-join.svg'},
            {id:4,name:'我关注的',src:'/leyou/icon/my-follow.svg'},
        ],
        [
            {id:5,name:'我赞过的',src:'/leyou/icon/my-like.svg'},
            {id:6,name:'我的收藏',src:'/leyou/icon/my-collection.svg'},
            {id:7,name:'浏览历史',src:'/leyou/icon/my-watch-record.svg'},
        ]
    ],
    createMenu: [
        [
            {id:1,name:'创作中心',src:'/leyou/my/my_creationPage.svg'},
            {id:2,name:'数据助手',src:'/leyou/my/my_dataPage.svg'},
            {id:3,name:'活动广场',src:'/leyou/my/my_activityPage.svg'},
            {id:4,name:'创作收益',src:'/leyou/my/my_incomePage.svg'},
        ]
    ],
    serviceMenu: [
        [
            { id: 1, name: '钱包', src: '/leyou/my/my_wallet_icon.svg' },
            { id: 2, name: '购物车', src: '/leyou/my/my_goodcard_icon.svg' },
            { id: 3, name: '订单', src: '/leyou/icon/my-order-icon.svg' },
            { id: 4, name: '卡券/红包', src: '/leyou/my/my_redbag_icon.svg' },
        ],
        [
            { id: 5, name: '售后/退款', src: '/leyou/my/my_refund_icon.svg' },
            { id: 6, name: '已购课程', src: '/leyou/icon/my-buy-course.svg' },
            { id: 7, name: '我的评价', src: '/leyou/my/my_comment_icon.svg' },
        ]
    ],
    aboutMenu: [
        [
            { id: 1, name: '积分商城', src: '/leyou/my/my_integralGood_icon.svg' },

        ]
    ]

})

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const formatTime = (time:number) => {
    return formattime(time, 'YYYY-MM-DD')
}

onMounted(() => {
    
})

const toenjoy = () =>{
    enjoydetail({}).then((res:any) => {
        if (!res.id) {
            gotofilterPage()
        }else{
            gotoenjoyRecord()
        }
    })
}

const contentMenu = (item:any) => {
    item.id == 1 && gotoCollectLists('course')
    item.id == 2 && gotoTrackList()
    item.id == 3 && gotoDraftList()
    item.id == 4 && toenjoy()
    item.id == 5 && gotoGroupChat()
    item.id == 6 && gotoHasChat()
    item.id == 7 && gotoAnchorCenter()
}

const salonMenu = (item:any) => {
    item.id == 1 && gotosalonManage({})
    item.id == 2 && gotoMysalonPosts({})
    item.id == 3 && gotoMysalonJoin({})
    item.id == 4 && gotoMyFollowList({followType : 1})
    item.id == 5 && gotoLike('salon')
    item.id == 6 && gotoCollectLists('salon')
    item.id == 7 && gotoWatchHistory('salon')
}

const createMenu = (item: any) => {
    console.log('item',item);
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(()=>{
                gotoLogin({})
            },1000)
            return
        }
        item.id == 1 && gotocreationPage();
        item.id == 2 && assistantDetail({});
        item.id == 3 && gotoActivityIndex();
        item.id == 4 && gotowithdrawalIncome();
    })
}

const serviceMenu = (item:any) => {
    item.id == 1 && gotoWallet()
    item.id == 2 && gotoShoppingCart()
    item.id == 3 && gotoorderList()
    item.id == 4 && gotoCouponList()
    item.id == 5 && gotoAftersalesList()
    item.id == 6 && gotocourseList({})
    item.id == 7 && gotoCommentList(0)
}

const aboutMenu = (item:any) => {
    item.id == 1 && gotointegralMallGoods()
}

</script>
  
<style lang="scss" scoped>
.content_page{
    .Space_box{
        width: 100%;
        height: 16rpx;
        background: #F8F8F8;
    }
    .menuBox_item{
        border-radius: 16rpx;
        background: #FFFFFF;
        padding: 30rpx;
        box-sizing: border-box;
        margin-bottom: 16rpx;
        .menutitle{
            font-size: 32rpx;
            color: #0B0B0B;
            font-weight: 600;
        }
        .menuList_box{
            margin-top: 40rpx;
            // padding: 0rpx 20rpx;
            width: 100%;
            box-sizing: border-box;
            .list_item{
                width: 100%;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                margin-bottom: 40rpx;
                &.not_bottom{
                    margin-bottom: 0rpx;
                }
                .function_item{
                    width: 25%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    .function_itemImg{
                        width: 64rpx;
                        height: 64rpx;
                        margin-bottom: 10rpx;
                    }
                    .function_itemName{
                        font-size: 24rpx;
                        color: #1B1B1B;
                        font-weight: 400;
                    }

                }
            }

        }

    }
}
</style>
  