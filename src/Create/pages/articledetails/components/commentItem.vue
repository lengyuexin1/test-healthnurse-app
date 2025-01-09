<template>
    <view class="container">
        <view class="comment_list" >
            <view class="comment_item">
                <image
                    class="comment_item_img"
                    mode="scaleToFill"
                    :src="commentInfo.userThumb ? commentInfo.userThumb : getAssetsUrl('/leyou/static/default_avatar.png')"
                />
                <view class="comment_item_text_box">
                    <view class="comment_top_box">
                        <view class="comment_topandtab">
                            <view class="comment_top_name">{{commentInfo.userName}}</view>
                            <view class="user_tag">
                                <text v-if="commentInfo.isAuthor == 1">作者</text>
                                <text v-else-if="commentInfo.isUser == 1">我</text>
                            </view>
                        </view>
                        <view class="comment_top_icon">
                            <view class="like_up" @click="likeup(commentInfo.commentId,commentInfo.isLike,1)">
                                <image
                                    class="like_up_img"
                                    :src="commentInfo.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                    mode="scaleToFill"
                                />
                                <text class="like_text">{{commentInfo.cntLike}}</text>
                            </view>
                            <view class="like_below" @click="likebelow(commentInfo.commentId,commentInfo.isStep,1)" v-if="false">
                                <image
                                    class="like_below_img"
                                    :src="commentInfo.isStep == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                    mode="scaleToFill"
                                />
                                <text class="like_text">{{commentInfo.cntStep}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="comment_content">
                        <text v-if="commentInfo.comment.length > 100 && (!commentInfo.showmorecomment)">
                            {{commentInfo.comment.slice(0,100) + '...'}}
                        </text>
                        <text v-else>
                            {{commentInfo.comment}}
                        </text>
                        <text v-if="commentInfo.comment.length > 100" class="more" @click="showText(commentInfo)">{{ !commentInfo.showmorecomment ? '展开' : '收起'}}</text>
                    </view>
                    <view class="more_comment_box">
                        <view style="display: flex;">
                            <view class="more_comment" @click="showcomment(commentInfo,commentIndex)" v-if="commentInfo.cntReply > 0">
                                <view class="reply_text">{{ commentInfo.cntReply }}条回复</view>
                                <TnIcon name="right" size="20rpx" />
                            </view>
                            <view class="more_comment" @click="showcomment(commentInfo,commentIndex)" v-else>
                                <view class="reply_text">回复</view>
                                <TnIcon name="right" size="20rpx" />
                            </view>
                            <view class="comment_time">
                                {{ formatTime(commentInfo.utcCreated) }} · {{ '广州' }}
                            </view>
                        </view>
                        <view class="del_btn" v-if="commentInfo.isUser == 1" @click="deleteComment(commentInfo.commentId,1)">删除</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'


import { agoTime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'


interface Props {
    commentInfo:any,
    commentIndex:number
}

const props = defineProps<Props>()

interface Events {
    (e: 'showMoreComment'): void
    (e: 'delcomment',id:string, isComment:number): void
    (e: 'sonlikeup', id:string, isLike:number, isComment:number, isTop:boolean): void
    (e: 'sonlikebelow',id:string, isStep:number, isComment:number): void
}
const emit = defineEmits<Events>()

const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {

})

// 评论点赞
const likeup = (id:string, isLike:number, isComment:number, isTop:boolean = false) => {
    emit('sonlikeup',id,isLike,isComment,isTop)
}
// 点踩
const likebelow = (id:string, isStep:number, isComment:number) => {
    emit('sonlikebelow',id,isStep,isComment)
}
// 展开更多
const showText = (item:any) => {
    if (item.showmorecomment) {
        item.showmorecomment = false        
    }else{
        item.showmorecomment = true
    }
}
// 展开更多
const showcomment = (item:any, index:number) => {
    emit('showMoreComment')
}
// 删除评论
const deleteComment = (id:string, isComment:number) => {
    emit('delcomment',id,isComment)
}

</script>
  
<style lang="scss" scoped>
.container{
    .comment_list{
        .comment_item{
            width: 100%;
            min-height: 200rpx;
            display: flex;
            margin-bottom: 20rpx;
            .comment_item_img{
                width: 56rpx;
                height: 56rpx;
                // border: 1px solid red;
                border-radius: 50%;
                margin-right: 16rpx;
                z-index: 0;
            }
            .comment_item_text_box{
                flex: 1;
                .comment_top_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 56rpx;
                    line-height: 32rpx;
                    .comment_topandtab{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .comment_top_name{
                            color: #333333;
                            font-size: 28rpx;
                            margin-right: 16rpx;
                        }
                        .user_tag{
                            display: flex;
                            text{
                                background: #EBF9F1;
                                color: #29C86F;
                                font-size: 20rpx;
                                padding: 4rpx 12rpx;
                                box-sizing: border-box;
                                border-radius: 8rpx;
                            }
                        }
                    }

                    .comment_top_icon{
                        display: flex;
                        align-items: center;
                        .like_up{
                            display: flex;
                            align-items: center;
                            margin-right: 24rpx;
                            .like_up_img{
                                width: 34rpx;
                                height: 34rpx;
                                margin-right: 8rpx;
                            }
                        }
                        .like_below{
                            display: flex;
                            align-items: center;
                            margin-right: 24rpx;
                            .like_below_img{
                                transform: rotate(180deg);
                                width: 34rpx;
                                height: 34rpx;
                                margin-right: 8rpx;
                            }
                        }
                        .like_text{
                            font-size: 24rpx;
                        }
                    }
                }
                .comment_content{
                    width: 100%;
                    font-size: 26rpx;
                    color: #666666;
                    word-break: break-all;
                    margin-bottom: 20rpx;
                    line-height: 36rpx;
                    .more{
                        margin-left: 12rpx;
                        font-size: 24rpx;
                        color: #43A5EF;
                    }
                }
                .more_comment_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .more_comment{
                        background: #F2F2F2;
                        border-radius: 24rpx;
                        color: #666666;
                        font-size: 22rpx;
                        margin-right: 12rpx;
                        text-align: center;
                        line-height: 20rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 8rpx 14rpx;
                        box-sizing: border-box;
                        .reply_text{
                            margin-right: 6rpx;
                        }
                    }
                    .comment_time{
                        color: #999999;
                        font-size: 22rpx;
                    }
                    .del_btn{
                        color: #999999;
                        font-size: 24rpx;
                    }
                }
            }
        }
    }
    
}
</style>
  