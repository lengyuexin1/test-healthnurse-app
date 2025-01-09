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
                <pageTopbg :zIndex="-1" ></pageTopbg>
                <bc-page-navbar :title="'社区朋友'" ></bc-page-navbar>
            </template>
            <view class="page_list">
                <view class="friend_item" v-for="item in data.dataList" :key="item.id">
                    <view class="friend_top">
                        <image
                            class="friend_img"
                            :src="item.accountThumb"
                            mode="scaleToFill"
                        />
                        <view class="friend_text">{{ item.accountName }}</view>
                    </view>
                    <view class="up_swiper" v-if="item.contentList.length != 0">
                        <swiper
                            class="swiper"
                            autoplay
                            circular
                            vertical
                            :disable-touch="true"
                            :touchable="false"
                        >
                            <swiper-item class="swiper_Item" @click="clickSwiper(swiperItem)" v-for="(swiperItem, swiperIndex) in item.contentList">
                                <!-- <view>{{ ItemagoTime(swiperItem.utcExamined) }}发布{{ upTypetext(swiperItem.moduleType) }}</view> -->
                                <view>{{ ItemagoTime(swiperItem.utcExamined) }}发布了内容</view>
                            </swiper-item>
                        </swiper>
                    </view>
                    <view class="friend_bottom">
                        <view class="friend_btn friend_page" @click="userPage(item)">进入主页</view>
                        <view class="friend_btn friend_chat" @click="chatUser(item)">聊天</view>
                    </view>
                </view>
            </view>

		    <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import { communityFriendList } from '@/api/user-api'
import { gotoauthor } from '@/routes/create-routes'
import { Throttle } from '@/libs/antivibthrot'
import { userLetterCreator } from '@/api/create-api'
import { gotoChatPage } from '@/routes/nim-routes'
import { agoTime } from '@/common/formatTime'
import { gotochatDetail, gotosalonPostsDetailPage, gotoarticledetails, gotovideoPreview } from '@/routes/create-routes'


interface Data {
    dataList:any,

}
const data = reactive<Data>({
    dataList:[],
})

const paging = ref(null)
const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const ItemagoTime = computed(()=>(tiem:number) => {
    return agoTime(tiem)
})
const upTypetext = computed(() => (moduleType:number) => {
    if (moduleType == 1) {
        return '康养百科'
    }
    if (moduleType == 3) {
        return '沙龙'
    }
    if (moduleType == 4) {
        return '聊天'
    }
    if (moduleType == 5) {
        return '发现'
    }
    if (moduleType == 6) {
        return '创意短片'
    }
    
})

onMounted(() => {
})


const queryList = (pageNumber:number, pageSize:number)=>{
    communityFriendList({
        pageNumber,
        pageSize,
        query:{}
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
}

const clickSwiper = (item:any) => {
    console.log('item',item);
    // if (item.type == 2) {
    //     item.moduleType == 1 && gotovideoPreview({videoId: item.contentId,videoPagetype: 0});
    //     item.moduleType == 4 && gotovideoPreview({videoId: item.contentId,videoPagetype: 1});
    //     item.moduleType == 5 && gotovideoPreview({videoId: item.contentId,videoPagetype: 2});
    //     item.moduleType == 6 && gotovideoPreview({videoId: item.contentId,videoPagetype: 3});
    //     return
    // }
    // item.moduleType == 1 && gotoarticledetails({id:item.contentId});
    // item.moduleType == 4 && gotochatDetail({id:item.contentId});


    item.moduleType == 3 && gotosalonPostsDetailPage({ id:item.contentId });

    if (item.moduleType == 98) {
        if (item.type == 2) {
            gotovideoPreview({videoId: item.contentId,videoPagetype: 0});
        }else{
            gotoarticledetails({id:item.contentId});
        }
    }

}

const userPage = (item:any) => {
    gotoauthor({
        isuser: 0,
        accountId: item.accountId,
        isFans: 1,
        ismyFans: 1,
    })
}

const chatUser = (item:any) => {
    Throttle(() => {
        userLetterCreator({ accountId: item.accountId }).then((res: any) => {
            gotoChatPage({
                to: res.tid,
                scene: 'privateMsg'
            })
        }).catch((err) => {
            bcNotify.value.show(err.message)
        })
    }, 2000)
}

</script>
  
<style lang="scss" scoped>
.page_list{
    width: 100%;
    display: grid;
    grid-gap: 22rpx;
    grid-template-columns: auto auto;
    padding: 24rpx;
    box-sizing: border-box;
    .friend_item{
        padding: 30rpx 24rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 16rpx;
        width: 340rpx;
        .friend_top{
            display: flex;
            align-items: center;
            margin-bottom: 24rpx;
            .friend_img{
                width: 88rpx;
                height: 88rpx;
                margin-right: 20rpx;

            }
            .friend_text{
                width: 184rpx;
                font-size: 28rpx;
                color: #333333;
                font-weight: 500;
                display: -webkit-box;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-wrap:break-word
            }
        }
        .up_swiper{
            width: 100%;
            height: 56rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #B27305;
            padding: 12rpx 20rpx;
            box-sizing: border-box;
            background: #FFF5E5;
            border-radius: 8rpx;
            margin-bottom: 24rpx;
            .swiper{
                width: 100%;
                height: 100%;
                .swiper_Item{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .friend_bottom{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .friend_btn{
                width: 140rpx;
                height: 64rpx;
                text-align: center;
                line-height: 64rpx;
                font-size: 26rpx;
                font-weight: 500;
                border-radius: 12rpx;
                &.friend_page{
                    border: 2rpx solid #E5E5E5;
                    background: #FFFFFF;
                    color: #666666;
                }
                &.friend_chat{
                    background: #EA3E1A;
                    color: #fff;
                }
            }
        }
    }
}
</style>
  