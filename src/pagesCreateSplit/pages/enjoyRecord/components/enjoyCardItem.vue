<template>
    <view class="container">
        <view class="list_item_box">
            <view class="left_fixed_icon">
                <view class="white_box"></view>
            </view>
            <view class="title_time">{{ formatTime(item.baseInfo.utcRecord) }}</view>
            <view class="content_text" >{{ item.baseInfo.desc }}</view>
            <view
                v-if="item.baseInfo.images && item.baseInfo.images.length != 0 && item.baseInfo.type == 3"
                class="img_list"
                :class="{ 'flex_list' : item.baseInfo.images.length == 2, 'grid_list' : item.baseInfo.images.length >= 3 }"
            >
                <image
                    class="img_item"
                    :class="{ 'have_right_img' : item.baseInfo.images.length < 3 }"
                    v-for="(imgitem,index) in item.baseInfo.images" :key="index"
                    :src="imgitem"
                    @click="preImage(index,item.baseInfo.images)"
                    mode="aspectFill"
                />
            </view>

            <view class="video_box" v-if="item.baseInfo.type == 2">
                <video v-if="getplatFrom() == 'MP-WEIXIN'" :src="item.baseInfo.videoUrl" controls object-fit='contain'></video>
                <mpHtml v-else :content="`<video style='width:100%;height:320rpx;background:#000;z-index:1;'
                    poster='${item.baseInfo.cover}' src='${item.baseInfo.videoUrl}' controls duration='10' object-fit='cover'></video>`" />
            </view>

            <view class="name_text_box">
                <view class="left_name_box">
                    <view class="name_box">{{ item.createdName }}</view>
                    <view class="from_place" v-if="item.baseInfo.address">拍摄于{{ addressText(item.baseInfo.address) }}</view>
                </view>
                <view class="operation_box">
                    <image
                        class="operation_img"
                        :src="getAssetsUrl('/leyou/create/operation_img.svg')"
                        mode="scaleToFill"
                        @click="operationFun"
                    />
                    <view class="operation_list" :class="{ 'to_left' : userId != item.createdId }" v-if="data.showOperation">
                        <view class="operation_item" @click="likeFun" v-if="item.isLike == 0">
                            点赞
                        </view>
                        <view class="operation_item" @click="unlikeFun" v-else>
                            取消点赞
                        </view>
                        <view class="border_box"></view>
                        <view class="operation_item" @click="commentFun">
                            评论
                        </view>
                        <view class="border_box" v-if="userId == item.createdId"></view>
                        <view class="operation_item" v-if="userId == item.createdId" @click="editFun">
                            编辑
                        </view>
                    </view>
                </view>
            </view>

            <view class="comment_box">
                <view class="like_box" v-if="data.likeList.length != 0">
                    <image
                        class="like_icon"
                        :src="item.isLike == 1 ? getAssetsUrl('/leyou/create/like_height_icon.svg') : getAssetsUrl('/leyou/create/like_icon.svg')"
                        mode="scaleToFill"
                    />
                    <view class="like_name">
                        {{ likeText(data.likeList) }}
                    </view>
                </view>
                <view class="comment_list_box" :class="{ 'have_bottom' : data.showMore }" v-if="data.commentList.length != 0">
                    <!--  @touchstart="startTime(item)" @touchend="endTime" -->
                    <view v-for="item in data.commentList" :key="item.commentId">
                        <view class="comment_item" @click="toreply(item)">
                            <text class="item_text_box">
                                <text class="top_comment">{{ item.name }}:</text>
                                <text class="reply_comment">{{ item.comment }}</text>
                            </text>
                            <text class="del_text" v-if="item.isUser == 1" @click.stop="delComment(item,1)">删除</text>
                        </view>
                        <template v-if="item.replies.length != 0">
                            <view class="comment_item" v-for="replyItem in item.replies" :key="replyItem.replyId" @click="toreply(replyItem, true)">
                                <text class="item_text_box">
                                    <text class="top_comment">{{ replyItem.name }}</text>
                                    <text class="reply_comment">回复</text>
                                    <text class="top_comment">{{ replyItem.replyName }}:</text>
                                    <text class="reply_comment">{{ replyItem.replyComment }}</text>
                                </text>

                                <text class="del_text" v-if="item.isUser == 1" @click.stop="delComment(replyItem,0)">删除</text>
                            </view>
                        </template>

                    </view>
                    <view class="more_comment_box" v-if="data.showMore" @click="changeShowMore">
                        查看全部评论...剩余{{ data.storageComment.length - data.commentList.length }}条
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { getlivelikeList, getlivecommentList } from '@/api/create-api'
import { calendarTime } from '@/common/formatTime'
import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'

interface Props {
    item: any
    index: number
    circleId: string
    userId: string
    isLod: boolean
}
const props = defineProps<Props>()


interface Events {
    (e: 'tolike', item: any, index:number): void
    (e: 'unlike', item: any, index:number): void
    (e: 'tocomment', item: any, index:number): void
    (e: 'toedit', item: any, index:number): void
    (e: 'replyComment', item: any, index:number, commentItem: any, isTop: boolean): void
    (e: 'delcomment', item: any, index: number, isComment: number): void
    (e: 'showImgDetail', load: boolean): void
}
const emit = defineEmits<Events>()


interface Data {
    showOperation: boolean,
    storageComment: any,
    commentList: any,
    likeList: any,
    showMore: boolean,
}

const data = reactive<Data>({
    showOperation: false,
    storageComment: [],
    commentList: [],
    likeList: [],
    showMore: false,
})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const likeText = computed(() => (arr:any) => {
    console.log('arr',arr);

    let result = arr.map((obj:any) => {
        if (obj.isUser == 1) {
            return obj.name + '(我)'
        }else{
            return obj.name
        }
    }).join(", ");
    return result
})

const getplatFrom = computed(() => {
    return () => {
        let platFrom = ''
        // #ifdef MP-WEIXIN
        platFrom = 'MP-WEIXIN'
        // #endif

        // #ifdef APP-PLUS
        platFrom = 'APP-PLUS'
        // #endif

        return platFrom
    }
})

const formatTime = computed(() => (time:number) => {
    return calendarTime(time)
})

const addressText = computed(() => (str:string) => {
    let text = str.slice(3, (str.length));
    return text
})


onMounted(() => {
    getlikeList()
    getcommentList()
})


watch(() => props.isLod, (newVal, oldVal) => {
    getlikeList()
    getcommentList()
}, { immediate: false, deep: true })

const getlikeList = () => {
    getlivelikeList({
        pageNumber: 1,
        pageSize: 100,
        query:{
            circleId: props.circleId,
            articleId: props.item.id,
        }
    }).then((res:any) => {
        data.likeList = res.data
    })
}

const getcommentList = () => {
    getlivecommentList({
        pageNumber: 1,
        pageSize: 100,
        query:{
            circleId: props.circleId,
            articleId: props.item.id,
        }
    }).then((res:any) => {
        console.log('commentList',res);
        data.commentList = res.data
        if (data.commentList.length > 8) {
            data.showMore = true
            data.storageComment = res.data
            data.commentList = data.commentList.slice(0, 5)
        }
    })
}

const operationFun = () => {
    data.showOperation = !data.showOperation
}

const likeFun = () => {
    emit('tolike', props.item, props.index);
    data.showOperation = false;
}

const unlikeFun = () => {
    emit('unlike', props.item, props.index);
    data.showOperation = false;
}

const commentFun = () => {
    emit('tocomment', props.item, props.index);
    data.showOperation = false;
}

const editFun = () => {
    emit('toedit', props.item, props.index);
    data.showOperation = false;
}

const delComment = (item: any,isComment: number) => {
    emit('delcomment', item, props.index ,isComment);
}


let timer = ref<any>(null)
const toreply = (item:any, isTop: boolean = false) => {
    emit('replyComment', props.item, props.index, item, isTop);
    data.showOperation = false;
    // timer.value = setTimeout(()=>{
    // },1000)

}
// const endTime = () => {
//     clearTimeout(timer.value)
// }

const changeShowMore = () => {
    data.commentList = data.storageComment
    data.showMore = false
}

const preImage = (current:number, urls:any) => {
    emit('showImgDetail', false)
    uni.previewImage({
        current,
        urls,
        showmenu: false,
    })
}

defineExpose({
    getlikeList,
    getcommentList
})


</script>

<style lang="scss" scoped>
.container{
    width: 100%;
}
.list_item_box{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 24rpx rgba(0,0,0,0.08);
    border-radius: 20rpx;
    position: relative;
    margin-bottom: 24rpx;

    .left_fixed_icon{
        position: absolute;
        z-index: 100;
        left: -50rpx;
        top: 20rpx;
        width: 28rpx;
        height: 28rpx;
        background: #29C86F;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .white_box{
            width: 12rpx;
            height: 12rpx;
            background: #FFFFFF;
            border-radius: 50%;
        }
    }
    .title_time{
        font-size: 28rpx;
        color: #999999;
        font-weight: 400;
        margin-bottom: 24rpx;

    }
    .content_text{
        font-size: 30rpx;
        color: #333333;
        font-weight: 400;
        margin-bottom: 24rpx;
    }
    .img_list{
        width: 100%;
        margin-bottom: 30rpx;
        &.flex_list{
            display: flex;
            align-items: center;
        }
        &.grid_list{
            display: grid;
            grid-gap: 12rpx;
            grid-template-columns: auto auto auto;
        }
        .img_item{
            width: 192rpx;
            height: 192rpx;
            border-radius: 12rpx;
            &.have_right_img{
                margin-right: 12rpx;
            }
        }
    }
    .video_box{
        width: 100%;
        height: 320rpx;
        margin-bottom: 30rpx;
        background: #000000;
        border-radius: 12rpx;
    }
    .name_text_box{
        width: 100%;
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left_name_box{
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 28rpx;
            color: #999999;
            .name_box{
                margin-right: 30rpx;
            }
        }
        .operation_box{
            position: relative;
        .operation_img{
            width: 64rpx;
            height: 40rpx;
            border-radius: 6rpx;
        }
        .operation_list{
            position: absolute;
            top: 50%;
            left: -380rpx;
            transform: translate( 0px, -50%);
            display: flex;
            align-items: center;
            background: #333333;
            border-radius: 6rpx;
            &.to_left{
                left: -280rpx;
            }
            .operation_item{
                padding: 20rpx 30rpx;
                box-sizing: border-box;
                color: #CFCFCF;
            }
            .border_box{
                height: 48rpx;
                width: 2rpx;
                background: #242424;
            }
        }
    }
}
    .comment_box{
        background: #F3F3F5;
        border-radius: 8rpx;
        width: 100%;
        .like_box{
            display: flex;
            align-items: center;
            padding: 24rpx 30rpx;
            padding-bottom: 16rpx;
            border-bottom: 2rpx solid #E4E4E6;
            box-sizing: border-box;
            .like_icon{
                width: 30rpx;
                height: 30rpx;
                margin-right: 12rpx;
            }
            .like_name{
                font-size: 30rpx;
                color: #4E4F74;
            }
        }
        .comment_list_box{
            padding: 24rpx 30rpx;
            box-sizing: border-box;
            position: relative;
            &.have_bottom{
                padding-bottom: 70rpx;
            }
            .comment_item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 30rpx;
                font-weight: 400;
                margin-bottom: 16rpx;
                position: relative;
                .top_comment{
                    // flex-shrink: 0;
                    color: #4E4F74;
                }
                .reply_comment{
                    // flex-shrink: 0;
                    color: #131313;
                    margin: 0rpx 14rpx;
                }
                .del_text{
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #4E4F74;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
                .item_text_box{
                    width: 470rpx;
                }
            }

            .more_comment_box{
                width: 100%;
                text-align: center;
                font-size: 28rpx;
                font-weight: 400;
                color: #4E4F74;
                position: absolute;
                bottom: 20rpx;
                left: 50%;
                transform: translate(-50%, 0%);
            }
        }

    }
}
</style>
<style>
video {
    width: 100%;
    height: 320rpx;
    object-fit: contain;
    /* position: absolute; */
    z-index: 10070;
}
video:focus {
    outline:none;
}
</style>

