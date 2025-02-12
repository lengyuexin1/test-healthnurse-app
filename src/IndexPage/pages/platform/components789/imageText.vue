<template>
    <view class="channel-item-container">
        <view class="article_item" @click="toArticledetails">
            <view class="video_box">
                <view class="video_img_box">
                    <image class="video_box_right_img" :src="info.thumb" mode="aspectFill" />
                    <view class="shadow" v-if="false">
                        {{  }}图
                    </view>
                    <!-- <image class="play_icon" :src="getAssetsUrl('/channel/play.svg')" mode="aspectFit" /> -->
                </view>
                <view class="video_box_title">{{info.name}}</view>
                <view class="video_box_time">
                    <text class="account_name">{{ info.accountName }}</text>
                    <!-- <text>{{ info.cntComment }}评论</text> -->
                    <text>{{ Math.floor(Math.random() * 900) + 100 }}评论</text>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { 
    favorite,
    unFavorite,
    getLike,
    unLike,
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
        emit('shownotify','收藏成功')
    })
}
const tounFavorite = (articleId:string,item:any) => {
    unFavorite({
        articleId: [articleId]
    }).then(() => {
        item.isFavorite = 0
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



</script>
  
<style lang="scss" scoped>
.article_item{
    padding: 32rpx 24rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #F2F2F2;
    padding-bottom: 18rpx;
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
                padding: 5rpx 20rpx;
                box-sizing: border-box;
                position:absolute;
                bottom: 20rpx;
                left: 20rpx;
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
            display: flex;
            align-items: center;
            .account_name{
                color: #666666;
                margin-right: 20rpx;
            }
        }

    }
}
</style>
  