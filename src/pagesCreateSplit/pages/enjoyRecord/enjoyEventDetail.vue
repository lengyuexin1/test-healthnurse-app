<template>
	<view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="'详情'" :bgColor="'#29C86F'" :iconColor="'#FFFFFF'" :textColor="'#FFFFFF'"></bc-page-navbar>
            </template>
            <view class="page_box">
                <view class="top_box">
                    <view class="detail_time" v-if="data.detailObj.baseInfo">{{ formatTime(data.detailObj.baseInfo.utcRecord) }}</view>
                    <view class="upevent" @click="toEventList">大事记</view>
                </view>
                <view class="swiper_box" v-if="data.detailObj.baseInfo?.type == 3">
                    <swiper class="swiper" :autoplay="true" :circular="true">
                        <swiper-item class="swiper_item" v-for="(item,index) in data.detailObj.baseInfo.images" :key="index">
                            <image
                                @click="preImage(index,data.detailObj.baseInfo.images)"
                                class="swiper_item_img"
                                :src="item"
                                mode="aspectFill"
                            />
                        </swiper-item>
                    </swiper>
                </view>
                <view class="video_box" v-if="data.detailObj.baseInfo?.type == 2">
                    <video v-if="getplatFrom() == 'MP-WEIXIN'" :src="data.detailObj.baseInfo.videoUrl" controls object-fit='contain'></video>
                    <mpHtml v-else :content="`<video style='width: 100%;height: 440rpx;background:#000;z-index:1;'
                        poster='${data.detailObj.baseInfo.cover}' src='${data.detailObj.baseInfo.videoUrl}' controls duration='10' object-fit='cover'></video>`" />
                </view>
                <view class="content_text">
                    {{ data.detailObj.baseInfo?.desc }}
                </view>

                <view class="operation_box">
                    <view class="operation_left">
                        <view class="user_name">{{ data.detailObj.baseInfo?.accountName }}</view>
                        <view class="position" v-if="false">拍摄于 泰山</view>
                    </view>
                    <view class="operation_right">
                        <image
                            class="operation_img"
                            :src="getAssetsUrl('/leyou/create/operation_img.svg')"
                            mode="scaleToFill"
                            @click="operationFun"
                        />
                        <view class="operation_list" :class="{ 'to_left' : data.userinfo.id != data.detailObj.createdId }" v-if="data.showOperation">
                            <view class="operation_item" @click="likeFun" v-if="!data.detailObj.isLike">
                                点赞
                            </view>
                            <view class="operation_item" @click="unlikeFun" v-else>
                                取消点赞
                            </view>
                            <view class="border_box"></view>
                            <view class="operation_item" @click="commentFun">
                                评论
                            </view>

                            <view class="border_box" v-if="data.userinfo.id == data.detailObj.createdId"></view>
                            <view class="operation_item" v-if="data.userinfo.id == data.detailObj.createdId" @click="editFun">
                                编辑
                            </view>
                        </view>
                    </view>
                </view>

                <view class="comment_box">
                    <view class="like_box" v-if="data.likeList.length != 0">
                        <image
                            class="like_icon"
                            :src="data.detailObj.isLike == 1 ? getAssetsUrl('/leyou/create/like_height_icon.svg') : getAssetsUrl('/leyou/create/like_icon.svg')"
                            mode="scaleToFill"
                        />
                        <view class="like_name">
                            {{ likeText(data.likeList) }}
                        </view>
                    </view>
                    <view class="comment_list_box" v-if="data.commentList.length != 0">
                        <view v-for="item in data.commentList" :key="item.commentId">
                            <view class="comment_item" @click="replyComment(item)">
                                <text class="item_text_box">
                                    <text class="top_comment">{{ item.name }}:</text>
                                    <text class="reply_comment">{{ item.comment }}</text>
                                </text>

                                <text class="del_text" v-if="item.isUser == 1" @click.stop="delcomment(item,1)">删除</text>
                            </view>
                            <template v-if="item.replies.length != 0">
                                <view class="comment_item" v-for="replyItem in item.replies" :key="replyItem.replyId" @click="replyComment(replyItem, true)">
                                    <text class="item_text_box">
                                        <text class="top_comment">{{ replyItem.name }}</text>
                                        <text class="reply_comment">回复</text>
                                        <text class="top_comment">{{ replyItem.replyName }}:</text>
                                        <text class="reply_comment">{{ replyItem.replyComment }}</text>
                                    </text>

                                    <text class="del_text" v-if="replyItem.isUser == 1" @click.stop="delcomment(replyItem,0)">删除</text>
                                </view>
                            </template>

                        </view>

                        <view class="more_comment_box" v-if="false">
                            查看全部评论...剩余{{ 5 }}条
                        </view>
                    </view>
                </view>

            </view>

            <template #bottom>
                <view class="bottom_bg">
                    <view class="bottom_inp_box">
                        <textarea
                            class="bottom_inp"
                            :auto-height="true"
                            :focus="data.showtextbtn"
                            :placeholder="data.placeholderText"
                            placeholder-style="color: #B5B5B5;line-height: 38rpx;"
                            v-model="data.textMsg"
                            @focus="openkeyboard"
                            @blur="closekeyboard"
                            @keyboardheightchange="changekeyboardH"
                            :show-confirm-bar="false"
                            cursor-spacing="20"
                            :adjust-position="false"
                            :auto-blur="true"
                        />
                        <view class="up_bottom_btn" @click="upComment">发送</view>
                    </view>
                    <view class="keyboard_space" :style="{ 'height': data.keyboardH + 'px' }"></view>
                </view>

            </template>


		</z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="data.showDelPopup" :overlay-closeable="false">
            <view class="delPopup_box">
                <view class="delPopup_title">确定删除您的评论信息？</view>
                <view class="delPopup_bottom_box">
                    <view class="delPopup_bottom_item cancel" @click="cancelDel">取消</view>
                    <view class="delPopup_bottom_item determine" @click="determineDel">确定</view>
                </view>
            </view>
        </TnPopup>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import {
    getenjoyDetail,
    getlivelikeList,
    getlivecommentList,
    pushreview,
    pushrecover,
    livegetLike,
    liveunLike,
    enjoydelComment,
} from '@/api/create-api'
import { formattime } from '@/common/formatTime'
import { gotoEventList, gotoUpenjoyRecord } from "@/routes/create-routes"
import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'
import { PlatformManage } from "@bc/sys"
import { pageController } from '@bc/uni-tools'


interface Data {
    detailObj: any,
    id: string,
    showOperation: boolean,

    keyboardH: number,
    placeholderText: string,
    textMsg: string,
    showtextbtn: boolean,
    circleId: string,
    userinfo: any,
    replyObj: any,
    isReply: boolean,
    isTop: boolean,
    likeList: any,
    commentList: any,
    showDelPopup: boolean,
    delCommentObj: any,
    delCommentType: number,
}

const data = reactive<Data>({
    detailObj: {},
    id: '',
    showOperation: false,

    keyboardH: 0,
    placeholderText: '写下你的评论吧',
    textMsg: '',
    showtextbtn: false,
    circleId: '',
    userinfo: {},
    replyObj: {},
    isReply: false,
    isTop: false,
    likeList: [],
    commentList: [],
    showDelPopup: false,
    delCommentObj: {},
    delCommentType: 0,

})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const formatTime = (time:number) => {
    return formattime(time, 'YYYY年MM月DD日')
}

const likeText = computed(() => (arr:any) => {
    let result = arr.map((obj:any) => obj.name).join(", ");
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


onLoad((options:any) => {
    data.id = options.id
    getdetail(data.id)
    PlatformManage.getToken().then((res:any)=>{
        data.userinfo = res
    })
})

onShow(() => {
})

const getdetail = (id:string) => {
    getenjoyDetail({
        id
    }).then((res:any) => {
        data.detailObj = res

        getcommentList()
        getlikeList()
    }).catch((err:any) => {
        bcNotify.value.show(err.message)

        setTimeout(() => {
            pageController.back()
        }, 2000)
    })
}

const getlikeList = () => {
    getlivelikeList({
        pageNumber: 1,
        pageSize: 100,
        query:{
            circleId: data.detailObj.baseInfo.circleId,
            articleId: data.detailObj.baseInfo.contentId,
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
            circleId: data.detailObj.baseInfo.circleId,
            articleId: data.detailObj.baseInfo.contentId,
        }
    }).then((res:any) => {
        data.commentList = res.data
    })
}

// 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}

const operationFun = () => {
    data.showOperation = !data.showOperation
}


const likeFun = () => {
    data.showOperation = false
    livegetLike({
        articleId: data.detailObj.baseInfo.contentId
    }).then((res:any) => {

        data.detailObj.isLike++;
        bcNotify.value.show('点赞成功');
        getlikeList()

    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })

}

const unlikeFun = () => {
    data.showOperation = false
    liveunLike({
        articleIds: [data.detailObj.baseInfo.contentId]
    }).then((res:any) => {

        data.detailObj.isLike--;
        bcNotify.value.show('取消成功');
        getlikeList()

    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })

}

const commentFun = () => {
    data.showOperation = false
    data.showtextbtn = true
}

const replyComment = (commentItem:any, isTop: boolean = false) => {
    data.showtextbtn = true
    data.replyObj = commentItem
    data.isReply = true
    data.isTop = isTop
    data.placeholderText = '回复' + commentItem.name
}

const editFun = () => {
    data.showOperation = false
    gotoUpenjoyRecord({
        auditId: data.detailObj.auditId,
        type: data.detailObj.baseInfo.type,
        ischange: 1,
    })
    console.log('toedit',data.detailObj);
}


const enjoyCardRef = ref()

const upComment = () => {
    console.log('enjoyCardRef',enjoyCardRef);
    console.log('data.textMsg',data.textMsg);

    if (!data.textMsg) {
        bcNotify.value.show('请输入评论内容')
        return
    }

    data.isReply ? pushrecover({
        commentId: data.isTop ? data.replyObj.topCommentId : data.replyObj.commentId,
        replyId: data.replyObj.commentId,
        replyUserId: data.replyObj.userId,
        replyUser: data.replyObj.name,
        quoteComment: data.replyObj.comment ? data.replyObj.comment : data.replyObj.replyComment,
        content: data.textMsg,
        articleId: data.detailObj.baseInfo.contentId,
    }).then(()=>{
        getcommentList()
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    }) : pushreview({
        articleId: data.detailObj.baseInfo.contentId,
        content: data.textMsg,
        isAuthor: 0,
    }).then(()=>{
        getcommentList()
    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })

}

const delcomment = (item: any, isComment: number) => {
    console.log('item,isComment',item,isComment);
    data.showDelPopup = true
    data.delCommentObj = item
    data.delCommentType = isComment

}


const cancelDel = () => {
    data.showDelPopup = false
    data.delCommentObj = {}
    data.delCommentType = 0
}

const determineDel = () => {
    data.showDelPopup = false

    enjoydelComment({
        id: data.delCommentObj.commentId,
        isComment: data.delCommentType
    }).then(()=>{

        data.delCommentObj = {}
        data.delCommentType = 0
        bcNotify.value.show('删除成功')
        getcommentList()

    }).catch((err:any)=>{
        bcNotify.value.error(err)
    })
}


// 评论框获取焦点
const openkeyboard = (event:any) => {
    data.keyboardH = event.detail.height + 18
}

// 键盘高度变化事件
const changekeyboardH = (event:any) => {
    data.keyboardH = event.detail.height + 18;
}

// 评论框获取失去焦点
const closekeyboard = () => {
    // click事件比change事件先触发
    setTimeout(() => {
        data.keyboardH = 0
        data.showtextbtn = false
        data.textMsg = ''
        data.placeholderText = '写下你的评论吧'
        data.isReply = false
    }, 500)
}

const toEventList = () => {
    gotoEventList({})
}

</script>

<style lang="scss" scoped>
.page_box{
    padding: 30rpx;
    box-sizing: border-box;
    .top_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;
        .detail_time{
            font-size: 32rpx;
            color: #666666;
        }
        .upevent{
            padding: 8rpx 20rpx;
            box-sizing: border-box;
            font-size: 24rpx;
            color: #FFFFFF;
            font-weight: 400;
            background: #738EC2;
            border-radius: 26rpx;
        }
    }
    .swiper_box{
        width: 100%;
        height: 440rpx;
        margin-bottom: 20rpx;
        .swiper{
            width: 100%;
            height: 100%;
            .swiper_item{
                width: 100%;
                height: 100%;
                .swiper_item_img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .video_box{
        width: 100%;
        height: 440rpx;
        margin-bottom: 20rpx;
    }
    .content_text{
        font-size: 32rpx;
        font-weight: 400;
        color: #333333;
        margin-bottom: 20rpx;
    }
    .operation_box{
        width: 100%;
        margin-bottom: 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .operation_left{
            display: flex;
            align-items: center;
            font-size: 28rpx;
            color: #999999;
            .user_name{
                margin-right: 40rpx;
            }
        }
        .operation_right{
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
            padding-bottom: 30rpx;
            box-sizing: border-box;
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
                    width: 550rpx;
                }
            }

            .more_comment_box{
                width: 100%;
                text-align: center;
                font-size: 28rpx;
                font-weight: 400;
                color: #4E4F74;
            }
        }

    }
}
.bottom_bg{
    background: #fff;
    .bottom_inp_box{
        padding: 20rpx 30rpx;
        padding-bottom: 58rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .bottom_inp{
            width: 528rpx;
            height: 70rpx!important;
            background: #F5F5F5;
            border-radius: 8rpx;
            padding: 16rpx 20rpx;

        }
        .up_bottom_btn{
            width: 136rpx;
            height: 70rpx;
            background: #29C86F;
            border-radius: 8rpx;
            font-weight: 400;
            font-size: 28rpx;
            color: #FFFFFF;
            text-align: center;
            line-height: 70rpx;
        }
    }
    .keyboard_space{
        width: 100%;
    }
}
.delPopup_box{
    width: 540rpx;
    height: 226rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    .delPopup_title{
        padding: 50rpx 0rpx;
        text-align: center;
        box-sizing: border-box;
    }
    .delPopup_bottom_box{
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 2rpx solid #F0F0F0;
        .delPopup_bottom_item{
            width: 49%;
            padding: 22rpx 0rpx;
            font-size: 28rpx;
            text-align: center;
            &.cancel{
                color: #666666;
                border-right: 2rpx solid #F0F0F0;
            }
            &.determine{
                color: #399BFC;
            }
        }
    }


}
</style>
<style>
page{
    background: #F9F9F9;
}
video {
    width: 100%;
    height: 440rpx;
    object-fit: contain;
    /* position: absolute; */
    z-index: 10070;
}
video:focus {
    outline:none;
}
</style>
