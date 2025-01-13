<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            :loading-more-enabled="false"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background:#F8F8F8'"></pageTopbg>
                <bc-page-navbar :title="'添加好友'"></bc-page-navbar>
                <view class="top_inp">
                    <view class="inp_box" @click="changeinpType">
                        <template v-if="!data.isinp">
                            <TnIcon name="search" size="32rpx" color="#999999"></TnIcon>
                            <view class="inp_text">昵称/保椿号</view>
                        </template>
                        <template v-else>
                            <view class="inp_bg">
                                <TnInput
                                    v-model="data.inputValue"
                                    placeholder="昵称/保椿号"
                                    height="72"
                                    :border="false"
                                    :focus="data.isinp"
                                    @blur="inpblur"
                                />
                            </view>                            
                        </template>
                    </view>
                </view>

                <!-- #ifdef MP-WEIXIN -->
                <view class="wx_friend_box">
                    <template v-for="item in data.fromList" :key="item.id" >
                        <view class="wx_friend_item" v-if="item.id != 1" @click="fromItem(item)">
                            <image
                                class="item_icon"
                                :src="getAssetsUrl(item.img)"
                                mode="scaleToFill"
                            />
                            <view class="item_left">
                                <view class="item_title">{{ item.title }}</view>
                                <view class="item_desc">{{ item.desc }}</view>
                            </view>

                            <!-- #ifdef MP-WEIXIN -->
                            <button v-if="item.id == 2" open-type="share"></button>
                            <!-- #endif -->

                        </view>
                    </template>
                    
                </view>
                <!-- #endif -->

                <!-- #ifndef MP-WEIXIN -->
                <view class="friend_from_box">
                    <view class="friend_from_item" v-for="item in data.fromList" :key="item.id" @click="fromItem(item)">
                        <image
                            class="item_icon"
                            :src="getAssetsUrl(item.img)"
                            mode="scaleToFill"
                        />
                        <view class="item_title">{{ item.title }}</view>
                        <view class="item_desc">{{ item.desc }}</view>

                        <!-- #ifdef MP-WEIXIN -->
                        <button v-if="item.id == 2" open-type="share"></button>
                        <!-- #endif -->

                    </view>
                </view>
                <!-- #endif -->

                <view class="recommend_title">推荐好友</view>
            </template>

            <view class="content_page">

                <view class="article_list" >
                    <friendCard 
                    v-for="(item,index) in data.dataList" 
                    :key="item.accountId" 
                    :info="item" 
                    :index="index" 
                    :isnumber="0"
                    @followFriend="followFriend" 
                    @delfriend="delfriend"></friendCard>
                    
                </view>
            </view>

		    <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import { recommendationList } from '@/api/user-api'
import { unfollow, follow } from '@/api/create-api'
import { homePage } from '@/api/create-api'

import { gotoaddNumberFriend, gotoshareQR } from '@/routes/user-routes'
import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import friendCard from './components/friendCard.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'


interface Data {
    dataList: any,
    inputValue: string,
    isinp: boolean,
    fromList: any,
    accountObj: any,

}
const data = reactive<Data>({
    dataList: [],
    inputValue: '',
    isinp: false,
    fromList: [
        {id:1,img:'/leyou/my/friend_number.svg',title:'通讯录',desc:'找通讯录好友'},
        {id:2,img:'/leyou/my/friend_wx.svg',title:'微信',desc:'邀请微信好友'},
        {id:3,img:'/leyou/my/friend_QRcode.svg',title:'二维码',desc:'分享名片给好友'},
    ],
    accountObj: {}
})

const paging = ref(null)

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
    homePage(({})=>{}).then((res:any)=>{
        data.accountObj = res
    })
})



const queryList = (pageNumber:number, pageSize:number)=>{
    recommendationList({
        query:{
            findName:data.inputValue
        },
        pageNumber: 1,
        pageSize: 10
    }).then((res:any) => {
        let newArr = res.data
        newArr.forEach((item:any) => {
            item.isFans = 0
        });
        (paging.value as any).complete(newArr)
    })
}

const changeinpType = () => {
    data.isinp = true
}

const inpblur = () =>{
    (paging.value as any).reload()
}

const bcNotify = ref()


const delfriend = (index:number) =>{
    data.dataList.splice(index,1,0)
}

const followFriend = (item:any) => {
    console.log('item',item);
    if (item.isFans) {
        unfollow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 0
            bcNotify.value.show('取消关注')
        })
    }else{
        follow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 1
            bcNotify.value.show('关注成功')
        }).catch((err:any) => { 
            bcNotify.value.error('不可以给本人点关注哦')
        })
    }
}


const fromItem = (item:any) => {
    item.id == 1 && gotoaddNumberFriend()
    // #ifndef MP-WEIXIN
    item.id == 2 && sharePage()
    // #endif
    item.id == 3 && gotoshareQR()
}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.accountObj.avatar,
        title: data.accountObj.name,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesCnt/pages/author/author?accountId=${data.accountObj.accountId}`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
}
// #endif

// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage((res:any)=>{
    return {
        title: '邀请你成为我的乐悠好友',
        imageUrl: data.accountObj.avatar,
        desc: '邀请你成为我的乐悠好友',
        path: `/pagesCnt/pages/author/author?accountId=${data.accountObj.accountId}`,
    }
})
//#endif


</script>
  
<style lang="scss" scoped>
.top_inp{
    padding: 8rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    .inp_box{
        width: 100%;
        height: 72rpx;
        border-radius: 36rpx;
        background: #FFFFFF;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        .inp_bg{
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            border-radius: 36rpx;
            overflow: hidden;
        }
        .inp_text{
            margin-left: 4rpx;
        }
    }
}

.friend_from_box{
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F8F8F8;
    .friend_from_item{
        width: 226rpx;
        height: 226rpx;
        background: #FFFFFF;
        border-radius: 12rpx;
        padding: 24rpx 0rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .item_icon{
            width: 88rpx;
            height: 88rpx;
            margin-bottom: 12rpx;
        }
        .item_title{
            font-weight: 500;   
            font-size: 28rpx;
            color: #333333;
            margin-bottom: 4rpx;
        }
        .item_desc{
            font-weight: 400;
            font-size: 24rpx;
            color: #808080;
        }
        button{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: 30;
        }
    }
}
.wx_friend_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    width: 100%;
    background: #F8F8F8;

    .wx_friend_item{
        display: flex;
        align-items: center;
        padding: 34rpx 30rpx;
        box-sizing: border-box;
        position: relative;
        background: #FFFFFF;
        width: 48%;
        border-radius: 12rpx;
        .item_icon{
            width: 88rpx;
            height: 88rpx;
            margin-right: 20rpx;
        }
        .item_left{
            .item_title{
                font-weight: 500;   
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 4rpx;
            }
            .item_desc{
                font-weight: 400;
                font-size: 24rpx;
                color: #808080;
            }
        }
        button{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            z-index: 30;
        }
    }
}
.recommend_title{
        padding: 6rpx 30rpx;
        padding-bottom: 24rpx;
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
        background: #F8F8F8;

}
</style>

<style>
page{
    background: #fff;
}
</style>
  