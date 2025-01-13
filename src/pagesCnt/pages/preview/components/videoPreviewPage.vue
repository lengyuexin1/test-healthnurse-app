<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :refresher-enabled="false"
            height="100%"
        >
            <template #top>
                <view id="pageTop">
                    <PageTopbg bgstyle="background: #000;"></PageTopbg>
                    <bc-page-navbar :title="'发布预览'" :textColor="'#fff'">
                        <template #back>
                            <view @click="goback">
                                <TnIcon name="left" color="#fff" size="38" :bold="true"/>
                            </view>
                        </template>
                    </bc-page-navbar>
                </view>
            </template>
            <view class="video_swiper_box" :style="'height:'+ data.screenHeight +'px'">
                <swiper 
                class="swiper" 
                :autoplay="false" 
                :vertical="true" 
                :current="data.swiperCurrent"
                :disable-touch="data.istouch">
                    <swiper-item 
                    class="swiper_item"
                    >
                        <view class="video_box">
                            <video 
                            :id="'videoView'"
                            :src="data.videoDetail.videoUrl"
                            :show-fullscreen-btn="false"
                            :loop="true"
                            :direction="90"
                            :title="data.videoDetail.title"
                            object-fit='fill'
                            height="424rpx"
                            ></video>
                            <view class="full_screen_btn">
                                <image
                                    class="full_screen_icon"
                                    :src="getAssetsUrl('/leyou/video/full-screen-icon.svg')"
                                    mode="scaleToFill"
                                />
                                <view class="full_screen_text" @click="toFullscreen">全屏观看</view>
                            </view>
                        </view>
                        

                        <view class="course_information">
                            <view class="course_title">课程名称：{{ data.videoDetail.title }}</view>
                            <view class="course_author">主讲人：{{ data.videoDetail.accountName }}</view>
                            <view class="course_dace">
                                <text>{{ coursedesc(data.videoDetail.desc) }}</text>
                                <text class="show_dace_btn" @click="data.showDescPopup = true">展开</text>
                            </view>
                            <view class="course_text">尊重原创，严禁转载</view>
                        </view>

                    </swiper-item>
                </swiper>

            </view>



            <!-- 简介弹窗 -->
            <TnPopup v-model="data.showDescPopup" open-direction="bottom" @close="close">
                <view class="desc_popup_box">
                    <view class="desc_popup_top">
                        <view></view>
                        <view class="desc_popup_number">课程详情</view>
                        <view @click="data.showDescPopup = false">
                            <TnIcon name="close" color="#333333" size="38" :bold="true"/>
                        </view>
                    </view>

                    <view class="course_information_box">
                        <view class="top">
                            <image
                                class="top_img"
                                :src="data.videoDetail.cover"
                                mode="aspectFill"
                            />
                            <view class="top_text">
                                <view class="top_title">{{ data.videoDetail.title }}</view>
                                <view class="top_name">主讲人:{{ data.videoDetail.accountName }}</view>
                            </view>
                        </view>
                        <view class="desc_box">
                            <view class="desc_title">视频简介</view>
                            <view class="desc_content">{{ data.videoDetail.desc }}</view>
                        </view>
                    </view>
                </view>

                
            </TnPopup>

        </z-paging>

	    <BCNotify ref="bcNotify"></BCNotify>


    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance, nextTick } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { gotoIndex } from "@/routes/public-routes"
import BCNotify from '@/components/notify/index.vue'


import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { 
    getarticlePreview,

} from '@/api/create-api'

import { agoTime } from '@/common/formatTime'



interface Props {
    contentId:string,
}
const props = defineProps<Props>()


interface Data{
    dataList:any,
    screenHeight:number,
    getpageTopH:number,
    swiperCurrent:number,
    show:boolean,
    istouch:boolean,
    isunlockvideo:boolean,
    iskeyboard:boolean,

    videoDetail:any,

    showDescBtn:boolean,
    showDescPopup:boolean,

}
const data = reactive<Data>({
    dataList:[],
    screenHeight: 700,
    getpageTopH:84,
    swiperCurrent:0,
    show:false,
    istouch:false,//是否禁止用户对轮播图的滑动
    isunlockvideo:true,
    iskeyboard:false,

    
    videoDetail:{},//视频详情


    showDescBtn:false,
    showDescPopup:false,

})

onMounted(() => {
    getpageTop()
    initVideo()
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})
const coursedesc = computed(()=>(text:string)=>{
    if (!text) {
        return text
    }
    if (text.length > 30) {
        data.showDescBtn = true
        return text.slice(0,30) + '...'
    }else{
        data.showDescBtn = false
        return text
    }
})

const instance = getCurrentInstance(); // 获取组件实例
const query = uni.createSelectorQuery().in(instance);

const getpageTop = () => {  
    setTimeout(()=>{
        query.select( '#pageTop' ).boundingClientRect((view:any) => { //目标位置的节点：类class或者id
            data.getpageTopH = view.height
            data.screenHeight = (uni.getSystemInfoSync().windowHeight - data.getpageTopH)
        }).exec()
    },800)
}

const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    IndexgetDetail(props.contentId)
}

const showRefresh = () => {
    (paging.value as any).reload()
}

const emit = defineEmits(["saveShareObj"])

const bcNotify = ref()


// 正常获取视频详情
const IndexgetDetail = (id:string) => {
    console.log('开始调用',id);

    getarticlePreview({
        id
    }).then((res : any)=>{
        data.videoDetail = res;

        console.log('data.videoDetail',data.videoDetail);
        
        
    }).catch((error:any)=>{
		bcNotify.value.error('视频不存在')
        console.log('error',error);
        
        setTimeout(()=>{
            // uni.navigateBack()
        },2000)
    })
}




const initVideo = () =>{
    setTimeout(()=>{
        const videoView = uni.createVideoContext('videoView',instance)
        videoView.play()
    },500)
        
    
}


const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    uni.navigateBack()
}


const toFullscreen = () => {

    if (!data.isunlockvideo) {
        console.log('试看结束');
        return
    }

    const fullvideo = uni.createVideoContext('videoView',instance)
    fullvideo.requestFullScreen()
}



const close = () => {
    data.istouch = false
}

defineExpose({
    showRefresh,
})


</script>
  
<style lang="scss" scoped>
.video_swiper_box{
    .swiper{
        height: 100%;
        .swiper_item{
            position: relative;
            height: 100%;
            .video_box{
                position: absolute;
                top: 25%;
                left: 0;
                // transform: translate(0,-70%);
                width: 100%;
                // height: 424rpx;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .full_screen_btn{
                    margin-top: 30rpx;
                    padding: 12rpx 20rpx;
                    box-sizing: border-box;
                    border: 2rpx solid #464646;
                    border-radius: 32rpx;
                    display: flex;
                    align-items: center;
                    width:fit-content;
                    .full_screen_icon{
                        width: 60rpx;
                        height: 36rpx;
                        margin-right: 8rpx;
                    }
                    .full_screen_text{
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #ECECEC;
                    }

                }
            }
            .video_overlay{
                position: absolute;
                top: 25%;
                left: 0;
                width: 100%;
                height: 424rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10;
                .overlay_box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    backdrop-filter: blur(10px);
                }
                .unlock_video{
                    font-weight: 400;
                    font-size: 36rpx;
                    color: #FFFFFF;
                    margin-bottom: 30rpx;
                    position: absolute;
                    z-index: 100;
                    top: 30%;
                }
                .unlock_video_btn{
                    padding: 10rpx 30rpx;
                    border-radius: 6rpx;
                    background: #EA3E1A;
                    font-size: 28rpx;
                    color: #FFFFFF;
                    font-weight: 400;
                    position: absolute;
                    z-index: 100;
                    top: 50%;
                }
            }
            .fixed_box{
                position: absolute;
                right: 36rpx;
                bottom: 120rpx;
                z-index: 100;
                .author_box{
                    width: 90rpx;
                    height: 90rpx;
                    margin-bottom: 100rpx;
                    position: relative;
                    .author_img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                    .add_author{
                        width: 40rpx;
                        height: 40rpx;
                        border-radius: 50%;
                        position: absolute;
                        bottom: -20%;
                        left: 50%;
                        transform: translate(-50%,0);

                    }
                }
                .operation_box{
                    .operation_item{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        margin-bottom: 36rpx;
                        .operation_img{
                            width: 65rpx;
                            height: 65rpx;
                            margin-bottom: 8rpx;
                        }
                        .operation_text{
                            font-size: 24rpx;
                            font-weight: 400;
                            color: #FFFFFF;
                        }
                    }
                }
            }
            .course_information{
                width: 554rpx;
                position: absolute;
                left: 30rpx;
                bottom: 50rpx;
                .course_type{
                    display: flex;
                    align-items: center;
                    position: relative;
                    border-radius: 36rpx;
                    overflow: hidden;
                    padding: 10rpx 20rpx;
                    box-sizing: border-box;
                    margin-bottom: 20rpx;
                    width:fit-content;
                    .opacity_box{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        &.to_buy{
                            background: #FFFFFF;
                            opacity: 0.15;
                        }
                        &.is_buy{
                            background: #FFB451;
                            opacity: 0.2;
                        }
                    }
                    .course_type_img{
                        width: 36rpx;
                        height: 36rpx;
                        margin-right: 8rpx;
                    }
                    .course_type_text{
                        font-size: 28rpx;
                        color: #FFFFFF;
                        font-weight: 400;
                    }
                }
                .course_title{
                    font-weight: 400;
                    font-size: 36rpx;
                    color: #FFFFFF;
                    margin-bottom: 16rpx;
                    width: 100%;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
                    overflow: hidden;
                }
                .course_author{
                    font-weight: 500;
                    color: #C6C6C6;
                    font-size: 28rpx;
                    margin-bottom: 20rpx;
                }
                .course_dace{
                    font-size: 28rpx;
                    color: #949494;
                    margin-bottom: 60rpx;
                    .show_dace_btn{
                        color: #FFFFFF;
                    }
                }
                .course_text{
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #757575;
                }

            }
        }
        
    }
}
.comment_box{
    height: 1160rpx;
    padding: 32rpx;
    box-sizing: border-box;
    background: #fff;
    .comment_top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32rpx;
        .comment_number{
            font-size: 32rpx;
            color: #333333;
        }
    }
    .comment_content_box{
        width: 100%;
        height: 900rpx;
        overflow-y: scroll;
        .comment_content_item{
            padding-bottom: 28rpx;
            box-sizing: border-box;
            display: flex;
            width: 100%;
            border-bottom: 2rpx solid #F2F2F2;
            margin-bottom: 28rpx;
            .comment_content_img{
                width: 56rpx;
                height: 56rpx;
                border-radius: 50%;
                margin-right: 16rpx;
                flex-shrink: 0;
            }
            .comment_content_text{
                padding-top: 10rpx;
                box-sizing: border-box;
                .comment_content_name{
                    font-size: 26rpx;
                    font-weight: 400;
                    color: #333333;
                    margin-bottom: 18rpx;
                }
                .content{
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #666666;
                    margin-bottom: 20rpx;
                }
                .comment_content_time{
                    font-size: 20rpx;
                    color: #999999;
                    font-weight: 400;
                }
            }
        }

    }
    .bottom_inp_box{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20rpx 28rpx;
        box-sizing: border-box;
        padding-bottom: 0rpx;
        box-shadow: 0rpx -4rpx 12rpx rgba(0,0,0,0.06);
        background: #fff;
        .bottom_inp{
            width: 100%;
            height: 74rpx;
            background: #F5F5F5;
            border-radius: 38rpx;
            padding: 18rpx 36rpx;
            box-sizing: border-box;
            font-weight: 400;
            font-size: 28rpx;
            color: #C9C9C9;
        }
        .textarea_box{
            display: flex;

        }
        .bottom_text_inp{
            width: 604rpx;
            min-height: 140rpx !important;
            border-radius: 12rpx;
            padding: 20rpx 30rpx;
            padding-top: 22rpx;
            padding-right: 0rpx;
            background: #F5F5F5;
            font-size: 28rpx;
            line-height: 28rpx;
            overflow: hidden;
            box-sizing: border-box;
            margin-right: 30rpx;
        }
        .send_btn{
            padding-top: 50rpx;
            box-sizing: border-box;
            font-size: 26rpx;
            color: #EA3E1A;
        }
        .bottom_space{
            width: 100%;
            height: 68rpx;
        }
        
    }
}

.desc_popup_box{
    padding: 32rpx;
    box-sizing: border-box;
    background: #fff;
    .desc_popup_top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32rpx;
        .desc_popup_number{
            font-size: 32rpx;
            color: #333333;
        }
    }
    .course_information_box{
        box-sizing: border-box;
        .top{
            display: flex;
            margin-bottom: 40rpx;
            .top_img{
                width: 172rpx;
                height: 200rpx;
                margin-right: 30rpx;
                border-radius: 6rpx;
            }
            .top_text{
                width: 390rpx;
                .top_title{
                    font-size: 32rpx;
                    color: #333333;
                    font-weight: 500;
                    margin-bottom: 16rpx;
                }
                .top_name{
                    font-weight: 400;
                    font-size: 28rpx;
                    color: #999999;
                }
            }
        }
        .desc_box{
            .desc_title{
                font-weight: 500;
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 20rpx;
            }
            .desc_content{
                font-weight: 400;
                font-size: 28rpx;
                color: #666666; 
                line-height: 52rpx;
            }
        }
    }
}

.collection_box{
    position: absolute;
    bottom: 100rpx;
    left: 50%;
    transform: translate(-50%, 0);
    width: 90%;
    height: 88rpx;
    border-radius: 44rpx;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx 32rpx;
    .collection_left{
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #202020;
        font-weight: 500;
        .collection_left_img{
            width: 38rpx;
            height: 38rpx;
            margin-right: 8rpx;
        }
    }
    .collection_right{
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #707070;
    }

}

</style>
  
<style>
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

<style scoped>
:deep(.zp-paging-container-content) {
    height: 100% !important;
}
:global(.zp-paging-container-content) {
    height: 100% !important;
}
</style>