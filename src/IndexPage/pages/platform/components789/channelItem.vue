<template>
    <view class="channel-item-container">
        <view class="article_item" @click="toArticledetails">
            <view v-if="info.type == 1 || info.type == 3">
                <view class="article_top">
                    <view class="article_top_left">
                        <view class="article_title">{{info.title}}</view>
                        <view class="article_time">{{formatTime(info.utcExamined)}}</view>
                    </view>
                    <view class="article_top_right">
                        <image
                            class="article_top_right_img"
                            :src="info.thumb"
                            mode="aspectFill"
                        />
                    </view>
                </view>
            </view>
            <view v-else class="video_box">
                <view class="video_account_box">
                    <view class="video_account_left">
                        <image
                            class="account_Avatar"
                            :src="info.accountAvatar"
                            mode="scaleToFill"
                        />
                        <view class="account_name">
                            {{ info.accountName }}
                        </view>
                    </view> 
                    <view class="follow_box" v-if="!info.isUser"  @click.stop="Subscribe">
                        <view class="to_follow" v-if="!info.isFollow">关注</view>
                        <view class="is_follow" v-else>已关注</view>
                    </view>
                    <view v-else></view>
                </view>
                <view class="video_box_title">{{info.name}}</view>
                <view class="video_img_box">
                    <image class="video_box_right_img" :src="info.thumb" mode="aspectFill" />
                    <view class="shadow"></view>
                    <image class="play_icon" :src="getAssetsUrl('/channel/play.svg')" mode="aspectFit" />
                </view>
                <view class="video_box_time">
                    {{formatTime(info.utcCreated)}}
                </view>
            </view>

            <view class="article_bottom">
                <view class="operate_box" @click.stop="share(info)">
                    <image class="operate_icon" :src="getAssetsUrl('/channel/share.svg')" mode="scaleToFill" />
                    <view class="operate_text">分享</view>
                </view>
                <view class="operate_box">
                    <image class="operate_icon" :src="getAssetsUrl('/channel/comment.svg')" mode="scaleToFill" />
                    <view class="operate_text">
                        <!-- {{info.cntComment}} -->
                        {{ Math.floor(Math.random() * 900) + 100 }}
                    </view>
                </view>
                <view class="operate_box" @click.stop="likeclick(info)">
                    <image class="operate_icon" :src="getAssetsUrl(((info.isLike == 1) ? '/channel/like_highlight.svg' : '/channel/like.svg'))" mode="scaleToFill" />
                    <view class="operate_text">
                        <!-- {{info.cntLike}} -->
                        {{ Math.floor(Math.random() * 900) + 100 }}
                    </view>
                </view>
                <view class="operate_box" @click.stop="collectclick(info)">
                    <image class="operate_icon" :src="getAssetsUrl((info.isFavorite == 1 ? '/channel/collect_highlight.svg' : '/channel/collect.svg'))" mode="scaleToFill" />
                    <view class="operate_text">
                        <!-- {{ info.cntCollect ? info.cntCollect : '--' }} -->
                        {{ Math.floor(Math.random() * 900) + 100 }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { gotoarticledetails } from '@/routes/create-routes'
import { agoTime } from '@/common/formatTime'
import { 
    favorite,
    unFavorite,
    getLike,
    unLike,
    unfollow,
    follow
    } from '@/api/create-api'

interface Props {
    info:any
}
const props = defineProps<Props>()

interface Events {
    (e: 'shownotify',text:string): void
    (e: 'waterItem',item:any): void
}
const emit = defineEmits<Events>()


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})

onMounted(() => {

})

const toArticledetails = ()=>{
    emit('waterItem',props.info)
}
const share = (info:any) => {

}



// 收藏
const collectclick = (item:any) => {
    if (item.isFavorite == 1) {
        tounFavorite(item.id,item)
    }
    else {
        tofavorite(item.id,item)
    }
}

// 点赞 
const likeclick = (item:any) => {
    if (item.isLike == 1) {
        tounLike(item.id,item)
    }
    else {
        togetLike(item.id,item)
    }
}


const tofavorite = (articleId:string,item:any) => {
    favorite({
        articleId
    }).then(() => {
        item.isFavorite = 1
        item.cntCollect ++
        emit('shownotify','收藏成功')
    })
}
const tounFavorite = (articleId:string,item:any) => {
    unFavorite({
        articleId: [articleId]
    }).then(() => {
        item.isFavorite = 0
        item.cntCollect --
        emit('shownotify','取消收藏')
    })
}

const togetLike = (articleId:string,item:any) => {
    getLike({
        articleId
    }).then(() => {
        item.isLike = 1
        item.cntLike++
    })
}

const tounLike = (articleId:string,item:any) => {
    unLike({
        articleId
    }).then(() => {
        item.isLike = 0
        item.cntLike--
    })
}

const Subscribe = () => {

    console.log(props.info);
    

    if (props.info.isFollow == 1) {
        tounfollow(props.info.accountId,props.info)
    }
    else {
        tofollow(props.info.accountId,props.info)
    }
}
const tofollow = (accountId:string,item:any) => {

    if (!accountId) {
        emit('shownotify','无法关注该作者')
    }

    follow({
        accountId
    }).then(() => {
        item.isFollow = 1
        emit('shownotify','关注成功')
    })
}
const tounfollow = (accountId:string,item:any) => {
    
    if (!accountId) {
        emit('shownotify','无法取消关注该作者')
    }

    unfollow({
        accountId
    }).then(() => {
        item.isFollow = 0
        emit('shownotify','取消关注')
    })
}



</script>
  
<style lang="scss" scoped>
.article_item{
    padding: 32rpx 24rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #F2F2F2;
    padding-bottom: 18rpx;
    .article_top{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;
        .article_top_left{
            width: 426rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .article_title{
                color: #202020;
                font-size: 32rpx;
                margin-bottom: 16rpx;
            }
            .article_time{
                color: #BBBBBB;
                font-size: 24rpx;
            }
        }
        .article_top_right{
            width: 240rpx;
            height: 180rpx;
            border-radius: 8rpx;
            overflow: hidden;
            position: relative;
            .article_top_right_img{
                width: 100%;
                height: 100%;
            }

        }
    }
    .video_box{
        width: 100%;
        .video_account_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;
            .video_account_left{
                display: flex;
                align-items: center;
                .account_Avatar{
                    width: 56rpx;
                    height: 56rpx;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 16rpx;
                }
                .account_name{
                    font-size: 28rpx;
                    color: #333333;
                }
            }
            .follow_box{
                font-size: 24rpx;
                .to_follow{
                    border-radius: 26rpx;
                    width: 96rpx;
                    height: 48rpx;
                    border: 2rpx solid #CCCCCC;
                    line-height: 48rpx;
                    text-align: center;
                    box-sizing: border-box;
                    color: #333333;
                }
                .is_follow{
                    color: #999999;
                }
            }
        }
        .video_box_title{
            // font-weight: bold;
            color: #202020;
            font-size: 32rpx;
            margin-bottom: 16rpx;
        }
        .video_img_box{
            position: relative;
            border-radius: 8rpx;
            width: 100%;
            height: 390rpx;
            overflow: hidden;
            margin-bottom: 10rpx;
            .video_box_right_img{
                width: 100%;
                height: 100%;
                z-index: 1;
            }
            .shadow{
                width: 100%;
                height: 100%;
                position:absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 10;
            }
            .play_icon{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 70rpx;
                height: 70rpx;
                z-index: 100;
            }
        }
        .video_box_time{
            padding-top: 8rpx;
            padding-bottom: 16rpx;
            box-sizing: border-box;
            font-size: 24rpx;
            color: #999999;
        }

    }
    .article_bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 60rpx;
        padding: 0rpx 34rpx;
        box-sizing: border-box;
        .operate_box{
            display: flex;
            align-items: center;
            .operate_icon{
                width: 36rpx;
                height: 36rpx;
                margin-right: 16rpx;
            }
            .operate_text{
                color: #1e1e1e;
                font-size: 24rpx;
            }
        }
    }
}
</style>
  