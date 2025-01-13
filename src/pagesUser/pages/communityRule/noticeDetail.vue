<template>
    <view class="container">
        <z-paging 
		ref="paging" 
		:auto="false"
		:refresher-enabled="false"
        @scroll="pagingScroll"
		>
            <template #top>
                <view id="pageTop">
                    <pageTopbg :zIndex="-1" :bgstyle="'background: #fff;'"></pageTopbg>
                    <bc-page-navbar :title="'发布预览'" ></bc-page-navbar>
                </view>
            </template>
            <view class="content">
                <view class="rich_text" id="richBox">
                    <view class="author_box">
                        <view class="author_avatar_box" @click="tobloggerPage">
                            <image
                                class="avatar_img"
                                :src="data.articledetailsObj.accountAvatar"
                                mode="scaleToFill"
                            />
                            <view class="author_name_box">
                                <view class="author_name">{{ data.articledetailsObj.accountName }}</view>
                                <view class="article_time">{{ formatTime(data.articledetailsObj.utcExamined ? data.articledetailsObj.utcExamined : data.articledetailsObj.utcCreated) }}</view>
                            </view>
                        </view>
                    </view>
                    <!-- data.articledetailsObj.type == 1 -->
                    <template v-if="true">
                        <view class="article_title">
                            {{ data.articledetailsObj.title }}
                        </view>
                        <view class="article_content">
                            <!-- <view v-html="data.articledetailsObj.detail"></view> -->
                            <mpHtml 
                            :content="data.articledetailsObj.content"
                            :tag-style="data.pStyle"
                            />
                        </view>
                    </template>
                    <!-- v-if=" data.articledetailsObj.type == 3" -->
                    <template v-else>
                        <view class="img_text_content">
                            <view class="swiper_box">
                                <swiper
                                    class="swiper"
                                    circular
                                    :autoplay="true"
                                    :interval="5000"
                                    :duration="500"
                                    @change="swiperchang"
                                >
                                    <swiper-item v-for="(item,index) in data.articledetailsObj.images" :key="index">
                                        <image
                                            class="swiper_img"
                                            :src="item"
                                            mode="aspectFill"
                                            @click="preImage(index,data.articledetailsObj.images)"
                                        />
                                    </swiper-item>
                                </swiper>
                                <view class="swiper_number_box">
                                    {{ data.swiperIndex }}
                                    /
                                    {{ data.articledetailsObj.images.length }}
                                </view>
                            </view>
                            <view class="article_title">
                                {{ data.articledetailsObj.title }}
                            </view>
                            <view class="article_img_text">
                                {{ data.articledetailsObj.desc }}
                            </view>
                        </view>
                    </template>
                </view>
            </view>


		    <BCNotify ref="bcNotify"></BCNotify>
            
        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, defineExpose, getCurrentInstance } from 'vue'
import { onLoad } from "@dcloudio/uni-app"

import pageTopbg from '@/components/page-topbg/page-topbg.vue'
// import commentItem from './commentItem.vue'

import { 
    getarticlePreview, 
    unfollow,
    follow
    } from '@/api/create-api'
import { agoTime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'
import { gotoauthor } from '@/routes/create-routes'
// import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'
// import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'
import mpHtml from '@/pagesUser/uni_modules/mp-html/components/mp-html/mp-html.vue'

import BCNotify from '@/components/notify/index.vue'
import { ruleDetail } from '@/api/user-api'


interface Data {
    articledetailsObj:any,
    getpageTopH:number,
    isfixed:boolean,
    swiperIndex:number,
    pStyle:any,
    show:boolean,
    userId:string,
    quoteComment:string,
    articledId:string,
}
const data = reactive<Data>({
    articledetailsObj:{},
    getpageTopH:45,
    isfixed:false,
    swiperIndex:1,
    pStyle: {
        div: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        p: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        span: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
    },
    show: false, //展开更多评论
    userId:'',
    quoteComment:'',
    articledId:'',
})

const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})

const bcNotify = ref()

onLoad((option:any)=>{
    data.articledId = option.articledId

    getDetails(data.articledId)
})

onMounted(() => {
    getpageTop()
})


const getDetails = (id:string) => {
    console.log('开始调用',id);
    
    ruleDetail({
        id
    }).then((res:any)=>{
        
        data.articledetailsObj = res
        
        console.log('data.articledetailsObj',data.articledetailsObj);
        

    }).catch((err:any)=>{
        console.log('err',err);
        
    })
}



const instance = getCurrentInstance(); // 获取组件实例
const query = uni.createSelectorQuery().in(instance);


const getpageTop = () => {    
    setTimeout(()=>{

        query.select( '#pageTop' ).boundingClientRect((view:any) => { //目标位置的节点：类class或者id
            // data.getpageTopH = view.height
        }).exec()
    },800)
}

// 计算是否需要吸顶
const pagingScroll = () => {
    setTimeout(()=>{
        query.select( '#richBox' ).boundingClientRect((view:any) => {
            if (view.top <= -25) {
                data.isfixed = true
            }
            else {
                data.isfixed = false
            }
        }).exec()
    },800)
}

const swiperchang = (e:any) => {
    data.swiperIndex = e.detail.current + 1
}

 // 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}


const tobloggerPage = () => {
    return
    gotoauthor({
        isuser:data.articledetailsObj.isUser,
        accountId:data.articledetailsObj.accountId,
        isFans:data.articledetailsObj.isFans
    })
}


const tofollow = (accountId:string) => {
    follow({
        accountId
    }).then(() => {
        bcNotify.value.show('关注成功')
        getDetails(data.articledId)
    })
}
const tounfollow = (accountId:string) => {
    unfollow({
        accountId
    }).then(() => {
        bcNotify.value.show('取消关注')
        getDetails(data.articledId)
    })
}

defineExpose({
})

</script>




<style lang="scss" scoped>
.content{
    width: 100%;
    position: relative;

    .rich_text{
        padding: 40rpx 0rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        position: relative;
        margin-bottom: 20rpx;
        .article_title{
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            font-weight: 600;
            font-size: 34rpx;
            color: #333333;
            margin-bottom: 20rpx;
        }
        .author_box{
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28rpx;
            .author_avatar_box{
                display: flex;
                align-items: center;
                .avatar_img{
                    width: 64rpx;
                    height: 64rpx;
                    border-radius: 50%;
                    margin-right: 12rpx;
                }
                .author_name_box{
                    .author_name{
                        font-size: 28rpx;
                        font-weight: 500;
                        color: #333333;
                        margin-bottom: 2rpx;
                    }
                    .article_time{
                        font-weight: 400;
                        color: #999999;
                        font-size: 24rpx;
                    }
                }
            }
            .follow_btn_box{
                display: flex;
                align-items: center;
                padding: 6rpx 20rpx;
                box-sizing: border-box;
                background: #29C86F;
                color: #fff;
                font-size: 26rpx;
                border-radius: 24rpx;
                .follow_btn{
                    margin-right: 8rpx;

                }
            }
            .del_follow_btn{
                padding: 6rpx 20rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #ababab;
                font-size: 26rpx;
                background: #e9e9e9;
                border-radius: 24rpx;

            }
        }
        .article_content{
            padding: 0rpx 32rpx;
            box-sizing: border-box;
        }
        .video_content{
            position: sticky;
            top: 0;
            width: 100%;
            height: 424rpx;
            z-index: 1;
            background: #fff;
            margin-bottom: 32rpx;
            &.is_fixed{
                position: fixed;
            }
        }
        .seizeseat{
            width: 100%;
            height: 424rpx;
            margin-bottom: 32rpx;

        }
        .video_text_box{
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            .video_title{
                font-size: 32rpx;
                color: #333333;
                font-weight: 600;
                margin-bottom: 12rpx;
            }
            .video_play_number{
                color: #999999;
                font-size: 24rpx;
                font-weight: 400;
            }
        }
        .img_text_content{
            // padding: 0rpx 32rpx;
            box-sizing: border-box;
            .swiper_box{
                position: relative;
                margin-bottom: 20rpx;
                .swiper{
                    width: 100%;
                    height: 750rpx;
                    .swiper_img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .swiper_number_box{
                    position: absolute;
                    bottom: 20rpx;
                    right: 20rpx;
                    background: #000;
                    opacity: 0.4;
                    border-radius: 24rpx;
                    padding: 4rpx 12rpx;
                    box-sizing: border-box;
                    text-align: center;
                    color: #FFFFFF;
                }
            }
            
            .article_img_text{
                padding: 0rpx 32rpx;
                font-size: 30rpx;
                color: #333333;
                line-height: 52rpx;
                box-sizing: border-box;
            }
        }
    }
    .comment_box{
        padding: 40rpx 32rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .comment_title_box{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 40rpx;
            .comment_title{
                font-size: 32rpx;
                color: #333333;
                font-weight: 600;
            }
            .article_data_box{
                display: flex;
                align-items: center;
                font-size: 24rpx;
                color: #666666;
                font-weight: 400;
                .like_box{
                    padding-right: 12rpx;
                    border-right: 2rpx solid #D5D5D5;
                }
                .collection_box{
                    padding-left: 12rpx;
                }
            }
        }
        .comment_item{
            margin-bottom: 30rpx;
        }
        .note_comment{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .note_comment_img{
                width: 280rpx;
                height: 280rpx;
            }
            .note_comment_text{
                color: #B5B5B5;
                font-size: 30rpx;
                margin-bottom: 40rpx;
            }
        }
    }
    .spag_box{
        width: 100%;

    }
}
.bottom_box{
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    padding: 20rpx 28rpx;
    padding-bottom: 64rpx;
    box-sizing: border-box;
    box-shadow: 0rpx -4rpx 12rpx rgba(0,0,0,0.06);
    display: flex;
    z-index: 10080;
    .bottom_inp_box{
        position: relative;
        .not_bottom_inp{
            width: 398rpx;
            height: 74rpx;
            background: #F5F5F5;
            border-radius: 38rpx;
            padding: 16rpx 68rpx;
            box-sizing: border-box;
            .not_bottom_inp_text{
                color: #B5B5B5;
                font-size: 28rpx;
            }
            .have_textMsg{
                font-size: 28rpx;
                color: #333333;
                width: 100%;
                white-space: nowrap; /*强制一行内显示*/
                overflow: hidden;/*溢出隐藏*/
                text-overflow: ellipsis;/*超出部分现实省略号*/
            }
        }
        .bottom_inp{
            width: 604rpx;
            min-height: 140rpx !important;
            border-radius: 12rpx;
            padding: 20rpx 68rpx;
            padding-top: 22rpx;
            padding-right: 0rpx;
            background: #F5F5F5;
            font-size: 28rpx;
            line-height: 28rpx;
            overflow: hidden;
            box-sizing: border-box;
        }
        .inp_icon{
            width: 30rpx;
            height: 30rpx;
            position: absolute;
            top: 22rpx;
            left: 30rpx;
        }
    }
    .icon_list{
        display: flex;
        margin-left: 20rpx;
        .icon_item{
            margin-right: 36rpx;
            .icon_img{
                width: 40rpx;
                height: 40rpx;
            }
            .icon_text{
                color: #666666;
                font-size: 20rpx;
                line-height: 20rpx;
            }
        }
    }
    .sending{
        color: #29C86F;
        font-size: 30rpx;
        white-space: nowrap;
        padding: 16rpx;
        padding-left: 32rpx;
        position: absolute;
        top: 50rpx;
        right: 16rpx;
        z-index: 20000000000;
    }
    .app_sending{
        position: absolute;
        top: 50rpx;
        right: 16rpx;
        z-index: 20000000000;
        width: 100rpx;
        height: 120rpx;
        color: #29C86F;
        font-size: 30rpx;
        text-align: center;
        line-height: 120rpx;
    }
    .have_bottom{
        width: 100%;
    }
}
.more_comment_box{
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    max-height: 800rpx;
    .more_comment_top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 38rpx;
        .all_comment_number{
            font-size: 32rpx;
            color: #333333;
        }
    }
    .son_comment_item{
        width: 100%;
        height: 200rpx;
        border: 2rpx solid red;
    }
}
.action_box{
    padding: 40rpx 32rpx;
    padding-bottom: 90rpx;
    box-sizing: border-box;
    min-height: 1160rpx;
    display: flex;
    flex-direction: column;
    .action_top{
        width: 100%;
        margin-bottom: 24rpx;
        display: flex;
        align-items: center;
        .action_top_title{
            width: 100%;
            text-align: center;
        }
        .action_top_title_img{
            width: 32rpx;
            height: 32rpx;
        }
    }
    .Landlord{
        width: 100%;
        // min-height: 200rpx;
        display: flex;
        margin-bottom: 20rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .Landlord_img{
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
            margin-right: 16rpx;
        }
        .Landlord_text_box{
            flex: 1;
            margin-bottom: 16rpx;
            .Landlord_top_box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 56rpx;
                line-height: 32rpx;
                .Landlord_top_name_box{
                    display: flex;
                    align-items: center;
                    .Landlord_top_name{
                        color: #333333;
                        font-size: 28rpx;
                        margin-right: 16rpx;
                    }
                    .isLandlord{
                        background: #EBF9F1;
                        color: #29C86F;
                        font-size: 20rpx;
                        padding: 4rpx 12rpx;
                        box-sizing: border-box;
                        border-radius: 8rpx;
                        margin-right: 10rpx;
                    }
                }
                .Landlord_top_icon{
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
            .Landlord_content{
                width: 100%;
                font-size: 26rpx;
                color: #666666;
                word-break: break-all;
                margin-bottom: 20rpx;
                line-height: 36rpx;
                text-align: left;
            }
            .Landlord_bottom{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .Landlord_bottom_comment{
                    color: #999999;
                    font-size: 22rpx;
                    margin-right: 12rpx;
                    text-align: center;
                    line-height: 40rpx;
                }
                .Landlord_bottom_del{
                    color: #999999;
                    font-size: 24rpx;
                }
            }
        }
    }
    .all_son_comment{
        font-weight: bold;
        color: #333333;
        font-size: 32rpx;
        margin-bottom: 28rpx;
        text-align: left;
    }
    .son_comment_scroll{
        max-height: 690rpx;
        .son_comment_item{
            width: 100%;
            display: flex;
            margin-bottom: 44rpx;
            &.not_bottom{
                margin-bottom: 0;
            }
            .son_comment_thumb{
                width: 56rpx;
                height: 56rpx;
                margin-right: 16rpx;
                border-radius: 50%;
            }
            .son_comment_text_box{
                flex: 1;
                .son_comment_name_box{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 18rpx;
                    .son_comment_nameandtag{
                        display: flex;
                        .son_comment_name{
                            color: #333333;
                            font-size: 28rpx;
                            max-width: 430rpx;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                        .son_comment_tag{
                            background: #EBF9F1;
                            color: #29C86F;
                            font-size: 20rpx;
                            padding: 4rpx 12rpx;
                            box-sizing: border-box;
                            border-radius: 8rpx;
                            margin: 0rpx 10rpx;
                        }
                    }
                    .son_comment_icon{
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
                .quotecomment{
                    padding: 16rpx;
                    padding-bottom: 10rpx;
                    box-sizing: border-box;
                    color: #666666;
                    font-size: 24rpx;
                    text-align: left;
                    border-radius: 4rpx;
                    line-height: 40rpx;
                    width: 100%;
                    margin-bottom: 18rpx;
                    background: #F6F6F6;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .son_comment_content{
                    width: 100%;
                    font-size: 26rpx;
                    color: #666666;
                    word-break: break-all;
                    margin-bottom: 20rpx;
                    line-height: 36rpx;
                    text-align: left;
                }
                .son_comment_bottom{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .son_comment_bottom_box{
                        display: flex;
                        align-items: center;
                        .son_comment_reply{
                            height: 40rpx;
                            background: #F2F2F2;
                            border-radius: 24rpx;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 6rpx 12rpx;
                            box-sizing: border-box;
                            margin-right: 12rpx;
                            font-size: 22rpx;
                            color: #666666;
                            .son_comment_reply_text{
                                margin-right: 8rpx;
                            }
                        }
                        .son_comment_time{
                            color: #999999;
                            font-size: 22rpx;
                        }
                    }
                    .son_comment_del{
                        color: #999999;
                        font-size: 24rpx;
                    }
                }
            }
        }
        .son_comment_spage{
            width: 100%;
        }
    }
}
</style>
  
<style>
    page {
        height: 100%;
    }
    video {
        width: 100%;
        height: 424rpx;
        object-fit: contain;
        /* position: absolute; */
        z-index: 10070;
    }
    video:focus {
        outline:none;
    }
</style>