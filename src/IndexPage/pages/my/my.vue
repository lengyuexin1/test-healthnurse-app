<template>
    <view class="container">
        <z-paging 
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :auto-show-system-loading="true"
            :auto-scroll-to-top-when-reload="false"
            :hide-empty-view="true"
            >
            <template #top>    
                <PageTopbg></PageTopbg>
                <bc-page-navbar>
                    <template #back>
                        <view></view>
                    </template>
                    <template #navBottom>
                        <view class="top_menu">
                            <image
                                class="top_menu_left_icon"
                                :src="getAssetsUrl('/leyou/home/index_Menu.svg')"
                                mode="scaleToFill"
                                @click="showMenu"
                            />
                            <view class="top_menu_right">
                                <image
                                    @click="scanCode"
                                    class="top_menu_right_icon"
                                    :src="getAssetsUrl('/leyou/icon/scan-icon.svg')"
                                    mode="scaleToFill"
                                />
                                <image
                                    @click="toSetting"
                                    class="top_menu_right_icon share"
                                    :src="getAssetsUrl('/leyou/my/my_setting_icon.svg')"
                                    mode="scaleToFill"
                                />
                            </view>
                        </view>
                    </template>
                </bc-page-navbar>
                
            </template>
            <view class="content_wrap" :style="{ paddingBottom: data.safeBotomHeight + 150 + 'rpx' }">
                <view class="avatar_box">
                    <view class="is_login" @click="toEditProfile" v-if="!data.isRequireLogin">
                        <view class="avatar_box_top">
                            <view class="avatar_box_left">
                                <view class="avatar_img_box">
                                    <image
                                        class="avatar_img"
                                        :src="data.userinfo.avatar"
                                        mode="aspectFill"
                                    />
                                    <image
                                        class="edit_img"
                                        :src="getAssetsUrl('/leyou/icon/edit-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                </view>
                                <view class="user_text_box">
                                    <view class="user_namr">{{data.userinfo.nickname}}</view>
                                    <view class="user_bcId_box">
                                        <view class="user_bcId">保椿号: {{ data.homeObj.regCode ? data.homeObj.regCode : 'ABCDEF' }}</view>
                                    </view>
                                    <view class="user_auth tn-flex-row" @tap.stop="clickAuth">
                                        <image class="icon" :src="getAssetsUrl('/leyou/icon/icon_auth.png')" mode="scaleToFill" />
                                        <text>{{ data.authInfo.isBinding == 0 ? '申请认证' : data.authInfo.shopName }}</text>
                                        <TnIcon name="right" color="#2D4468" size="28"/>
                                    </view>
                                </view>
                            </view>
                            <image
                                @click.stop="toshareQR"
                                class="QR_icon"
                                :src="getAssetsUrl('/leyou/icon/my-QR-icon.svg')"
                                mode="scaleToFill"
                            />
                        </view>
                        
                        <view class="user_dace" >{{ data.homeObj.accountDescription ? data.homeObj.accountDescription : '快写点什么，让我看看你的独一无二' }}</view>

                    </view>
                    <view class="tologin" v-else @click="toLogin">
                        <image
                            class="avatar_img"
                            :src="getAssetsUrl('/leyou/static/default_avatar.png')"
                            mode="aspectFill"
                        />
                        <view class="tologin_text">
                            点击头像登录
                        </view>
                    </view>
                </view>
                <view class="operate_box">
                    <view class="operate_data">
                        <view class="operate_data_item" @click="todataManage(1)">
                            <view class="data_number">{{data.homeObj.cntFollow ? data.homeObj.cntFollow : '--' }}</view>
                            <view class="data_text">总关注</view>
                        </view>
                        <view class="operate_data_item haveborder" @click="todataManage(2)">
                            <view class="data_number">{{data.homeObj.totalFans ? data.homeObj.totalFans : '--'}}</view>
                            <view class="data_text">总粉丝</view>
                        </view>
                        <view class="operate_data_item">
                            <view class="data_number">{{data.homeObj.cntLike ? data.homeObj.cntLike : '--'}}</view>
                            <view class="data_text">总获赞</view>
                        </view>
                    </view>
                </view>

                <view class="my_functionMuen">
                    <view class="function_top">
                        <view class="top_title">我的功能</view>
                        <view class="top_left" @click="toFunctionPage">
                            <view>查看全部</view>
                            <TnIcon name="right" color="#999999" size="28"/>
                        </view>
                    </view>
                    <view class="function_list_box">
                        <view class="list_item" :class="{ 'not_bottom' : (index + 1) == data.myFunctionMenu.length }" v-for="(item, index) in data.myFunctionMenu" :key="index">
                            <view class="function_item" v-for="fItem in item" :key="fItem.id" @click="functionMenu(fItem)" >
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

                <view class="content_list_box">
                    <view class="content_top_box">
                        <view class="top_navBox">
                            <view class="navList_box">
                                <view class="navItem" @click="changeNav(item,index)" :class="{ 'is_Select' : index == data.topNavIndex }" v-for="(item, index) in data.topNavList" :key="item.id">
                                    {{ item.name }}
                                </view>
                            </view>
                            <view class="search_box" @click="gotocarrySearch">
                                <TnIcon name="search" color="#2C2C2C" size="32"/>
                            </view>
                        </view>

                        <view class="type_navBox" v-if="data.topNavIndex == 0">
                            <view 
                            class="type_item" 
                            :class="{ 'type_select' : item.id == data.istag }" 
                            v-for="(item) in data.typeList" 
                            :key="item.id"
                            @click="changeType(item)">
                                {{ item.name }}
                            </view>
                        </view>
                        
                    </view>
                    <view class="list_box" v-if="data.dataList.length">
                        <indexWaterFall :wfList="data.dataList" :is_statistics="false" @waterItem="allwaterItem" :isfollow="1"></indexWaterFall>
                    </view>
                    <template v-else>
                        <view class="not_data_box">
                            <image
                                class="not_data_img"
                                :src="getAssetsUrl('/empty/empty_icon_data.png')"
                                mode="scaleToFill"
                            />
                            <text class="not_data_text"> 暂无数据~</text>
                        </view>
                    </template>
                </view>

            </view>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed,onMounted } from 'vue'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import { PlatformManage } from "@bc/sys"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoLogin,gotoSetting } from "@/routes/public-routes"
import { gotoorderList } from "@/routes/order-routes"
import { gotodataManage,
    gotocourseList,
    gotocreationPage,
    gotoenjoyRecord, gotofilterPage,
    gotoarticledetails, gotovideoPreview,
} from "@/routes/create-routes"

import { gotoWatchHistory, 
         gotoshareQR, gotoEditProfile,
         gotoAnchorCenter, gotoFunctionPage,
         gotoAuth,
} from "@/routes/user-routes"
import { getAssetsPic } from '@/common/setPicture'
import { homePage, enjoydetail, getnewContentList } from '@/api/create-api'
import { favoriteList, likeLists, authDetail } from '@/api/user-api'
import { gotoShoppingCart, gotointegralMallGoods } from '@/routes/goods-routes'
import indexWaterFall from '../platform/components/indexWaterFall.vue'
import { gotosearch } from "@/routes/service-routes"
import { getQRPage } from '@/api/open-api'



interface tabulation{
    id:number,
    name:string,
    src:string,
}

interface transaction{
    id:number,
    name:string,
    src:string
}

interface Data {
    userinfo:any,
    isRequireLogin:boolean,
    homeObj:any,
    authInfo: any,
    safeBotomHeight: number
    myFunctionMenu: any
    topNavList: any
    topNavIndex: number
    istag: number
    typeList: any
    dataList: any

}
const data = reactive<Data>({
    userinfo:{},
    isRequireLogin:false,
    homeObj:{},
    authInfo: {},
    safeBotomHeight: 0,
    myFunctionMenu: [
        [
            {id:1,name:'购物车',src:'/leyou/my/my_goodcard_icon.svg'},
            {id:2,name:'订单',src:'/leyou/icon/my-order-icon.svg'},
            {id:3,name:'积分商城',src:'/leyou/my/my_integralGood_icon.svg'},
            {id:4,name:'主播中心',src:'/leyou/my/my_live_icon.svg'},
        ],
        [
            {id:5,name:'浏览历史',src:'/leyou/icon/my-watch-record.svg'},
            {id:6,name:'已购课程',src:'/leyou/icon/my-buy-course.svg'},
            {id:7,name:'创作中心',src:'/leyou/my/my_creationPage.svg'},
            {id:8,name:'享老记',src:'/leyou/my/my_enjoy_icon.svg'},
        ]
        
    ],
    topNavList: [
        {id: 1, name: '作品' },
        {id: 2, name: '收藏' },
        {id: 3, name: '点赞' },
    ],
    topNavIndex: 0,
    istag: 0,
    typeList: [
        { name: '全部', id: 0 },
        { name: '已发布', id: 5 },
        { name: '审核中', id: 2 },
        { name: '未通过', id: 3 },
    ],
    dataList: [],
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


interface Events {
    (e: 'showLifeMenu'): void
}
const emit = defineEmits<Events>()

onMounted(()=>{
    uni.getSystemInfo({
        success: (res:any) => {
            data.safeBotomHeight = res.safeAreaInsets.bottom
        }
    })

    getuserInfo()
    PlatformManage.isRequireLogin().then((isRequireLogin)=>{
        data.isRequireLogin = isRequireLogin
    })
})

const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {

    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            (paging.value as any).complete([])
            return
        }
        data.topNavList[data.topNavIndex].id == 1 && getnewContentList({
            pageNumber,
            pageSize,
            query:{
                audit: data.istag ? data.istag : null,
            }
        }).then((res:any)=>{
            (paging.value as any).complete(res.data)
        })

        data.topNavList[data.topNavIndex].id == 2 && favoriteList({
            pageNumber,
            pageSize,
            query:{
                isUser: 1,
            },
            sorts:[]
        }).then((res:any)=>{
            (paging.value as any).complete(res.data)
        })

        data.topNavList[data.topNavIndex].id == 3 && likeLists({
            pageNumber,
            pageSize,
            query:{
                isUser: 1,
            },
            sorts:[]
        }).then((res:any)=>{
            (paging.value as any).complete(res.data)
        })


    })
}

const changeType = (item:any) => {
    data.istag = item.id;
    (paging.value as any).reload()
}

const getuserInfo = () => {
    PlatformManage.getToken().then((res:any)=>{
        data.userinfo = res
        console.log('获取info',data.userinfo);
    })
    homePage({}).then((res)=>{
        data.homeObj = res
    })
    authDetail().then((res) => {
        data.authInfo = res
    })
}

const toLogin = () =>{
    gotoLogin({})
}
const toSetting = () => {
    gotoSetting()
}

const todataManage = (type:number) => {
    gotodataManage({type,isuser:1})
}

const bcNotify = ref()

const toenjoy = () =>{
    enjoydetail({}).then((res:any) => {
        if (!res.id) {
            gotofilterPage()
        }else{
            gotoenjoyRecord()
        }
    })
}

const scanCode = () => {
    uni.scanCode({
        success: function(res) {

            let [path, str] = res.path.split('?');
            let [type, scene] = str.split('=');

            getQRPage({scene}).then((page) => {
                console.log('page', page)
                uni.navigateTo({
                    url: decodeURIComponent(page)
                })
            }).catch(() => {
                bcNotify.value.error('二维码失效')
                return
            })

        }
    })
}

const toEditProfile = () => {
    gotoEditProfile()
}

const showMenu = () => {
    emit('showLifeMenu')
}

const clickAuth = () => {
    gotoAuth()
}

const toshareQR = () => {
    gotoshareQR()
}

const allwaterItem = (item:any) => {
    console.log('data.topNavIndex',data.topNavIndex);
    
    console.log('item', item)

    // 跳转发布作品列表详情
    if (data.topNavIndex == 0) {
        if (item.audit.audit == 5) {
            item.type == 1 && gotoarticledetails({ id: item.id })
            item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
            item.type == 3 && gotoarticledetails({ id: item.id })

            return
        }

        if (item.audit.audit == 2) {
            bcNotify.value.show('作品审核中...')
            return
        }
        
        if (item.audit.audit == 3) {
            bcNotify.value.show('作品被驳回...')
            return
        }
    }
    // 跳转收藏点赞类型列表详情
    item.type == 1 && gotoarticledetails({ id: item.id })
    item.type == 2 && gotovideoPreview({ videoId: item.id, videoPagetype: 2 })
    item.type == 3 && gotoarticledetails({ id: item.id })
    
}

const gotocarrySearch = () => {
    gotosearch({})
}

const functionMenu = (item:any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        item.id == 1 && gotoShoppingCart()
        item.id == 2 && gotoorderList()
        item.id == 3 && gotointegralMallGoods()
        item.id == 4 && gotoAnchorCenter()
        item.id == 5 && gotoWatchHistory('')
        item.id == 6 && gotocourseList({})
        item.id == 7 && gotocreationPage()
        item.id == 8 && toenjoy()
    })
}

const toFunctionPage = () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoFunctionPage()
    })

}

const changeNav = (item:any,index:number) => {
    if (index == 0) {
        data.istag = 0
    }
    data.topNavIndex = index;
    (paging.value as any).reload();
    console.log(item);

    
}

defineExpose({
    getuserInfo
})


</script>

<style lang="scss" scoped>
:deep(.tn-tabs__bar) {
    height: 8rpx;
}

.top_menu{
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top_menu_left_icon{
        width: 40rpx;
        height: 40rpx;
    }
    .top_menu_right{
        display: flex;
        align-items: center;
        padding-right: 10rpx;
        box-sizing: border-box;
        .top_menu_right_icon{
            width: 40rpx;
            height: 40rpx;
            &.share{
                margin-left: 40rpx;
            }
        }
    }
}
.content_wrap {
    padding-bottom: 150rpx;
}

.avatar_box{
    padding: 40rpx;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    width: 100%;

    .is_login{
        .avatar_box_top{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10rpx;
            
            .avatar_box_left{
                display: flex;
                align-items: center;
                .avatar_img_box{
                    position: relative;
                    .edit_img{
                        position: absolute;
                        bottom: 0;
                        right: 20rpx;
                        width: 38rpx;
                        height: 38rpx;
                    }
                }
            }
        }
        .QR_icon{
            width: 48rpx;
            height: 48rpx;
        }
        
    }
    .tologin{
        display: flex;
        align-items: center;
    }
    .avatar_img{
        width: 116rpx;
        height: 116rpx;
        border: 5rpx solid #FFFFFF;
        border-radius: 50%;
        margin-right: 20rpx;
    }
    .user_text_box{
        z-index: 0;
        .user_namr{
            font-size: 36rpx;
            color: #333333;
            margin-bottom: 8rpx;
            padding-top: 30rpx;
        }
        .user_bcId_box{
            display: flex;
            align-items: center;
            margin-bottom: 16rpx;
            .user_bcId{
                font-size: 24rpx;
                color: #666666;
                margin-right: 12rpx;
            }
            .QR_img{
                width: 28rpx;
                height: 28rpx;
            }
        }
        .user_auth {
            display: inline-block;
            height: 48rpx;
            padding: 0 15rpx 0rpx 0;
            margin-bottom: 20rpx;
            color: #2D4468;
            font-size: 24rpx;
            background: linear-gradient( 93deg, rgba(190,216,255,0.1) 0%, rgba(139,184,255,0.28) 100%);
            border-radius: 0rpx 0rpx 28rpx 0rpx;

            text {
                margin: 0 10rpx;
            }

            .icon {
                width: 32rpx;
                height: 32rpx;
                position: relative;
                top: 8rpx;
            }
        }
    }
    .user_dace{
        font-size: 24rpx;
        color: #A5A5A5;
        position: relative;
        z-index: 1;
    }
    .tologin_text{
        font-weight: 600;
        font-size: 38rpx;
        color: #333333;
        margin-bottom: 8rpx;
        z-index: 0;
    }

}

.operate_box{
    .operate_data{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32rpx 60rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        color: #ACACAC;
        .operate_data_item{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0rpx 10rpx;
            box-sizing: border-box;
            .data_number{
                margin-right: 8rpx;
                font-size: 32rpx;
                color: #002020;
                font-weight: 600;
                margin-bottom: 8rpx;
            }
            &.haveborder{
                box-sizing: border-box;
            }
        }
    }
    .operate_btn{
        display: flex;
        align-items: center;
        .edit_btn{
            padding: 10rpx 24rpx;
            box-sizing: border-box;
            background: #29C86F;
            border-radius: 28rpx;
            color: #FFFFFF;
            font-size: 24rpx;
            margin-right: 20rpx;
        }
        .edit_img{
            width: 56rpx;
            height: 56rpx;
        }

    }
}





.my_functionMuen{
    background: #FFFFFF;
    border-radius: 16rpx;
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    .function_top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
        .top_title{
            font-size: 32rpx;
            color: #0B0B0B;
            font-weight: 600;
        }
        .top_left{
            display: flex;
            align-items: center;
            color: #ABABAB;
            font-size: 24rpx;
        }
    }
    .function_list_box{
        width: 100%;
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
.content_list_box{
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    width: 100%;
    background: #fff;
    .content_top_box{
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
        .top_navBox{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .navList_box{
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                width: 300rpx;
                .navItem{
                    font-size: 30rpx;
                    font-weight: 400;
                    color: #999999;
                    &.is_Select{
                        font-size: 32rpx;
                        color: #0B0B0B;
                        font-weight: 500;
                    }
                }
            }
        }
        .type_navBox{
            margin-top: 40rpx;
            display: flex;
            align-items: center;
            .type_item{
                padding: 8rpx 20rpx;
                box-sizing: border-box;
                border-radius: 32rpx 32rpx 32rpx 32rpx;
                border: 2rpx solid #C4C4C4;
                color: #6E6E6E;
                font-size: 28rpx;
                margin-right: 30rpx;
                &.type_select{
                    border: 2rpx solid #EA3E1A;
                    color: #EA3E1A;
                }
            }
        }
    }
    .list_box{
        min-height: 1200rpx;
        padding: 0rpx 10rpx;
        box-sizing: border-box;
    }
    .not_data_box{
        margin-bottom: 50rpx;
        height: 500rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .not_data_img{
            width: 280rpx;
            height: 280rpx;
        }
        .not_data_text{
            font-size: 28rpx;
            color: #999999;
        }
    }

}
</style>
