<template>
    <view class="container">
        <!-- <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :refresher-enabled="false"
            height="100%"
        > -->
        <z-paging
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <!-- <template #top>
                <view id="pageTop">
                    <PageTopbg bgstyle="background: #000;"></PageTopbg>
                    <bc-page-navbar :title="' '">
                        <template #back>
                            <view @click="goback">
                                <TnIcon name="left" color="#fff" size="38" :bold="true"/>
                            </view>
                        </template>
                    </bc-page-navbar>
                </view>
            </template> -->

            <view class="pageGoback_icon" @click="goback">
                <TnIcon name="left" color="#fff" size="38" :bold="true"/>
            </view>


            <view class="video_swiper_box" :style="'height:'+ data.screenHeight +'px'">
                <swiper 
                class="swiper" 
                :autoplay="false" 
                :vertical="true" 
                @change="changeVideoSwiper"
                :current="data.swiperCurrent"
                :disable-touch="data.istouch">
                <!-- @touchstart="touchStart"
                    @touchend="touchEnd"
                    @touchcancel="touchCancel" -->
                    <swiper-item 
                    v-for="(item,index) in data.videos" :key="item" 
                    class="swiper_item"
                    >
                        <view class="video_box" v-show="(!data.show && !data.showDescPopup) && data.isunlockvideo" >
                            <!-- #ifdef MP-WEIXIN -->
                            <!-- data.showcontrols -->
                            <video 
                            :id="'videoView_' + index"
                            :src="data.videoDetail.videoUrl"
                            :show-fullscreen-btn="false"
                            :loop="true"
                            :title="data.videoDetail.title"
                            :controls="true"
                            :show-center-play-btn="false"
                            @timeupdate="videoTime"
                            object-fit='contain'
                            @click="clickVideo"
                            @play="play"
                            @pause="pause"
                            @fullscreenchange="fullscreenchange"
                            :danmu-list="data.danmuList"

                            ></video>
                            <!-- #endif -->


                            <!-- #ifdef APP-PLUS || H5 -->
                            <DomVideoPlayer
                                ref="domVideoPlayer"
                                :src="data.videoDetail.videoUrl"
                                
                                :controls="true"
                                :autoplay="false"
                                :loop="true"
                                @play="play"
                                @pause="pause"
                                @fullscreenchange="fullscreenchange"
                                @timeupdate="videoTime"
                            />
                            <!-- #endif -->


                            <template v-if="data.videoDetail.courserDetail">
                                <!-- v-if="data.videoDetail.courserDetail.isBuy || data.videoDetail.courserDetail.isCharge == 0" -->
                                <view class="full_screen_btn" @click="toFullscreen">
                                    <image
                                        class="full_screen_icon"
                                        :src="getAssetsUrl('/leyou/video/full-screen-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="full_screen_text">全屏观看</view>
                                </view>
                            </template>
                            <!-- <view style="color: #ffffff;" @click="upBulletChat">发弹幕</view> -->

                            <!-- #ifdef MP-WEIXIN -->
                            <image  
                                @click="clickVideo"
                                v-if="!data.isPlay"
                                class="play_icon"
                                :src="getAssetsUrl('/leyou/video/play_icon.svg')"
                                mode="scaleToFill"
                            />
                            <!-- #endif -->


                        </view>
                        <!-- 试看遮罩层 -->
                        <view class="video_overlay" v-if="!data.isunlockvideo">
                            <view class="overlay_box" :style="'height:' + data.overlayHeight + 'px'"></view>
                            <view class="unlock_video">
                                试看结束
                            </view>
                            <view class="unlock_video_btn" @click="toBalanceCourse">
                                解锁课程
                            </view>
                        </view>
                        
                        <view class="fixed_box" v-if="props.isstudy == 0">
                            <view class="author_box" @click="tofollow">
                                <image
                                    class="author_img"
                                    :src="data.videoDetail.accountThumb"
                                    mode="scaleToFill"
                                    @click.stop="toAuthor"
                                />
                                <image
                                    class="add_author"
                                    :src="data.videoDetail.isFans == 0 ? getAssetsUrl('/leyou/video/follow-icon.svg') : getAssetsUrl('/leyou/video/isfollow-icon.svg')"
                                    mode="scaleToFill"
                                />
                            </view>
                            <view class="operation_box" >
                                <view class="operation_item" @click="tolike">
                                    <image
                                        class="operation_img"
                                        :src="getAssetsUrl( data.videoDetail.isLike == 0 ? '/leyou/video/like-icon.svg' : '/leyou/video/active-like-icon.svg') " 
                                        mode="scaleToFill"
                                    />
                                    <!-- randomNumber -->
                                    <view class="operation_text">{{ data.videoDetail.cntLike }}</view>
                                </view>
                                <view class="operation_item" @click="showcomment">
                                    <image
                                        class="operation_img"
                                        :src="getAssetsUrl('/leyou/video/comment-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="operation_text">{{ data.videoDetail.cntComment }}</view>
                                </view>
                                <view class="operation_item" @click="tocollection">
                                    <image
                                        class="operation_img"
                                        :src="getAssetsUrl(data.videoDetail.isFavorite == 0 ? '/leyou/video/collection-icon.svg':'/leyou/video/active-collection-icon.svg')" 
                                        mode="scaleToFill"
                                    />
                                    <view class="operation_text">{{ data.videoDetail.cntCollect }}</view>
                                </view>
                                <view class="operation_item" @click="share">
                                    <image
                                        class="operation_img"
                                        :src="getAssetsUrl('/leyou/video/sharing-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="operation_text">{{ data.videoDetail.cntRetransmission }}</view>
                                </view>
                            </view>
                        </view>


                        <view class="video_informationBox">

                            <template v-if="data.videoDetail.courserDetail">
                                <view class="course_type" v-if="data.videoDetail.courserDetail.isCharge == 1">
                                    <view class="opacity_box" :class="{ 'to_buy' : !data.videoDetail.courserDetail.isBuy , 'is_buy' : data.videoDetail.courserDetail.isBuy }"></view>
                                    <image
                                        class="course_type_img"
                                        :src="getAssetsUrl(data.videoDetail.courserDetail.isBuy ? '/leyou/icon/isbuy.svg' : '/leyou/icon/tobuy.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="course_type_text" v-if="data.videoDetail.courserDetail.isBuy">您已购买课程</view>
                                    <view class="course_type_text" v-else>免费试看{{ data.videoDetail.courserDetail.duration }}{{ data.videoDetail.courserDetail.unit == 1 ? '分钟' : '秒' }}</view>
                                </view>
                            </template>

                            <view class="course_title">{{ '课程名称：' }} {{ data.videoDetail.title }}</view>
                            <view class="course_author">{{ '主讲人：' }}{{ data.videoDetail.accountName }}</view>
                            <view class="course_dace" v-if="data.videoDetail.desc">
                                <text>{{ coursedesc(data.videoDetail.desc) }}</text>
                                <text class="show_dace_btn" @click="data.showDescPopup = true">展开</text>
                            </view>

                        </view>


                        <view class="video_bottomInfo">
                            <view class="course_page_bottom">
                                <view class="course_text">
                                    尊重原创，严禁转载
                                </view>
                                <view class="bulletchat_box" :class="{ 'is_open' : !data.showBarrage }" @click="changeBarrage">
                                    <view class="shut_btn" v-if="!data.showBarrage">
                                        <text>关</text>
                                    </view>
                                    <view class="bulletchat_text">弹幕</view>
                                    <view class="open_btn" v-if="data.showBarrage">
                                        <text>开</text>
                                    </view>
                                </view>
                            </view>
                        </view>

                    </swiper-item>
                </swiper>

            </view>



            <TnPopup v-model="data.show" open-direction="bottom" @close="close">
                <view class="comment_box">
                    <view class="comment_top">
                        <view></view>
                        <view class="comment_number">{{ Number(data.total) ? (data.total+' 条评论') : '暂无评论' }}</view>
                        <view @click="data.show = false">
                            <TnIcon name="close" color="#333333" size="38" :bold="true"/>
                        </view>
                    </view>
                    <view class="comment_content_box">
                        <view class="comment_content_item" v-for="item in data.commentList" :key="item.id">
                            <image
                                class="comment_content_img"
                                :src="item.userThumb"
                                mode="scaleToFill"
                            />
                            <view class="comment_content_text">
                                <view class="comment_content_name">{{ item.userName }}</view>
                                <view class="content">{{ item.comment }}</view>
                                <view class="comment_content_time">
                                    {{ formatTime(item.utcCreated) }} · 广州
                                </view>
                            </view>
                        </view> 
                    </view>


                    <view class="bottom_inp_box">
                        <view v-if="!data.showtextbtn" class="bottom_inp" @click="showtextarea">
                            善语结善缘，恶言伤人心~
                        </view>
                        <view 
                            v-else
                            class="textarea_box"
                            >
                            <textarea
                                class="bottom_text_inp"
                                :auto-height="true"
                                placeholder-style="color: #B5B5B5;line-height: 38rpx;"
                                v-model="data.textMsg"
                                :show-confirm-bar="false"
                                cursor-spacing="20"
                                :adjust-position="false"
                                :auto-blur="true"
                                @focus="openkeyboard"
                                @blur="closekeyboard"
                                :focus="data.showtextbtn"
                            ></textarea>
                            <view class="send_btn" @click="pushcomment">发送</view>
                        </view>
                        
                        <view class="bottom_space" v-if="data.keyboardH == 0" ></view>
                        <view class="bottom_space" v-else :style="{ 'height': data.keyboardH  + 'px' }"></view>
                    </view>
                </view>
            </TnPopup>
            <!-- 收藏弹窗 -->
            <TnOverlay v-model:show="data.showOverlay" :opacity="0">
                <view class="collection_box" @click="toCollectLists">
                    <view class="collection_left">
                        <image
                            class="collection_left_img"
                            :src="getAssetsUrl('/leyou/video/active-collection-icon.svg')"
                            mode="scaleToFill"
                        />
                        <view>收藏成功</view>
                    </view>
                    <view class="collection_right">
                        <text>去看看</text>
                        <TnIcon name="right" color="#333333"/>
                    </view>
                </view>
                

            </TnOverlay>

            <!-- 简介弹窗 -->
            <TnPopup v-model="data.showDescPopup" open-direction="bottom" @close="close">
                <view class="desc_popup_box">
                    <view class="desc_popup_top">
                        <view></view>
                        <view class="desc_popup_number">详情</view>
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
                                <view class="top_name">作者:{{ data.videoDetail.accountName }}</view>
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

        <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="data.status" :imgUrl="data.shareimgUrl"></shareView>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>


    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance, nextTick } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

// #ifdef APP-PLUS || H5
import DomVideoPlayer from '@/Create/components/DomVideoPlayer/DomVideoPlayer.vue'
// #endif

import shareView from '@/Create/components/shareView/shareView.vue'

import { gotoIndex } from "@/routes/public-routes"
import BCNotify from '@/components/notify/index.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'

import { 
    getcontentDetails,
    buycourseDetail,
    courseorderDetail,
    getvideoDetail, 
    getescourselist,
    getcourselist,
    getcourseLike,
    uncourseList,
    favoritecourse,
    unFavoritecourse,
    coursefollow,
    courseunfollow,
    coursecommentList,
    coursereview,
    favorite,
    unFavorite,
    getLike,
    unLike,
    follow,
    unfollow,
    articleaddView,
    viewTime,
    getcommentList,


} from '@/api/create-api'

import { gotoBalanceCourse } from '@/routes/order-routes'
import { agoTime } from '@/common/formatTime'
import { TempStorage } from "@bc/base"

import { gotoCollectLists } from "@/routes/user-routes"
import { drawBGIMG } from '@/libs/canvas-tools'
import { getQrcode } from "@/api/user-api"
import { gotoauthor } from '@/routes/create-routes'
import { PlatformManage } from "@bc/sys"

import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'

interface Props {
    query:any,
    videoIdlist:string[],
    isstudy:number,
    ischannel:number,
}
const props = defineProps<Props>()


interface Data{
    dataList:any,
    screenHeight:number,
    getpageTopH:number,
    pageinstance:any,
    minOffset:number,
    minTime:number,
    startX:number,
    startY:number,
    startTime:number,
    swiperCurrent:number,
    touchNum :number,
    show:boolean,
    istouch:boolean,
    isunlockvideo:boolean,
    overlayHeight:number,
    keyboardH:number,
    iskeyboard:boolean,
    textMsg:string,
    showtextbtn:boolean,

    videos:string[],
    pageNumber:number,
    videoDetail:any,

    commentList: any,
    total:number,

    showOverlay:boolean,

    detailObj:any,
    showDescBtn:boolean,
    showDescPopup:boolean,
    isPlay:boolean,
    isFull:boolean,
    showcontrols:boolean,

    status:number,
    shareimgUrl:string,
    startlooktime: number,

    danmuList: any,
    upCommentTime: number,
    bulletChatList: any,

    showBarrage: boolean,

    videoWidth: number,
    videoHeight: number, 

}
const data = reactive<Data>({
    dataList:[],
    screenHeight: 700,
    getpageTopH:84,
    pageinstance:{},
    minOffset: 20, //最小偏移量，低于这个值不响应滑动处理
    minTime: 60, // 最小时间，单位：毫秒，低于这个值不响应滑动处理
    startX: 0, //开始时的X坐标
    startY: 0, //开始时的Y坐标
    startTime: 0, //开始时的毫秒数
    swiperCurrent:0,
    touchNum: 0,
    show:false,
    istouch:false,//是否禁止用户对轮播图的滑动
    isunlockvideo:true,
    overlayHeight:0,
    keyboardH:0,
    iskeyboard:false,
    textMsg:'',
    showtextbtn:false,

    videos:[],
    pageNumber:1,
    
    videoDetail:{},//视频详情

    commentList:[],
    total:0,

    showOverlay:false,

    detailObj:{},
    showDescBtn:false,
    showDescPopup:false,
    isPlay:true,
    isFull:false,
    showcontrols:true,

    status:1,
    shareimgUrl:'',
    startlooktime: 0,

    danmuList: [],
    upCommentTime: 0,
    bulletChatList: [],

    showBarrage: true,

    videoWidth: 0,
    videoHeight: 0, 

})



// #ifdef APP-PLUS || H5
const domVideoPlayer = ref() as any
// #endif
onMounted(() => {




    // #ifdef APP-PLUS || H5
    console.log('domVideoPlayer',domVideoPlayer);
        
    // #endif

    getpageTop()

    data.videos = props.videoIdlist;

    videoDetail(data.videos[data.swiperCurrent]);



    initVideo()
    if (props.isstudy == 1) {
        console.log('已购买入口');
    }
    articleaddView({articleId:props.videoIdlist[data.swiperCurrent]}).then(()=>{})

    data.startlooktime = new Date().getTime();

    // 第一次加载弹幕
    upBulletChat()

    const showBarrage = uni.getStorageSync('showBarrage')
    data.showBarrage = showBarrage ? showBarrage : false
    console.log('showBarrage',data.showBarrage);
    

    
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

const randomNumber = computed(()=>{
    return Math.floor(Math.random() * 900) + 100;
})

const upBulletChat = () => {
    coursecommentList({
        pageNumber:1,
        pageSize:200,
        query:{
            articleId:props.videoIdlist[data.swiperCurrent]
        }
    }).then((res:any)=>{
        console.log('第一次加载获取评论列表',res);
        data.bulletChatList = res.data
    })
}

const instance = getCurrentInstance(); // 获取组件实例
const query = uni.createSelectorQuery().in(instance);

const getpageTop = () => {  
    const winInfo = uni.getSystemInfoSync();
    data.videoWidth = winInfo.windowWidth; // 设备宽度
    data.videoHeight = winInfo.windowHeight; // 设备高度
    data.screenHeight = winInfo.windowHeight; // 设备高度
    data.overlayHeight = winInfo.windowHeight


    // setTimeout(()=>{
    //     query.select( '#pageTop' ).boundingClientRect((view:any) => { //目标位置的节点：类class或者id
    //         data.getpageTopH = view.height
    //         data.screenHeight = (uni.getSystemInfoSync().windowHeight - data.getpageTopH)
    //     }).exec()
    // },800)
}

const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    
    data.pageNumber = pageNumber
    if (data.pageNumber == 1) {
        

        return
    }
    console.log('data.pageNumber',data.pageNumber);
    // 继续获取视频列表
    getvideList(pageNumber,pageSize);

}

const showRefresh = () => {
    (paging.value as any).reload();
}
const postviewTime = () => {
    const endlooktime = new Date().getTime()
    const time = (endlooktime - data.startlooktime) / 1000
    
    viewTime({
        viewTime: time,
        articleId: data.videos[data.swiperCurrent]
    }).then(() => {
        console.log('记录了时间')
    })
}

const emit = defineEmits(["saveShareObj"])

const bcNotify = ref()

// 视频详情
const videoDetail = (contentId:string) => {
    props.isstudy == 0 && IndexgetDetail(contentId)
    props.isstudy == 1 && BuygetDetail(contentId)
    props.isstudy == 2 && OrdergetDetail(contentId)
}


// 正常获取视频详情
const IndexgetDetail = (contentId:string) => {
    getcontentDetails({
        contentId
    }).then((res : any)=>{

        handleObj(res)
        
    }).catch((error:any)=>{
        console.log('error',error);
        
		bcNotify.value.error('视频不存在')
        setTimeout(()=>{
            uni.navigateBack()
        },2000)
    })
}

// 已购买列表获取视频详情
const BuygetDetail = (contentId:string) => {
    buycourseDetail({
        id:contentId
    }).then((res : any)=>{
        handleObj(res)

    })
}

// 订单列表获取视频详情
const OrdergetDetail = (contentId:string) => {
    courseorderDetail({
        id:contentId
    }).then((res : any)=>{
        handleObj(res)

    })
}


const handleObj = (res:any) => {
    data.videoDetail = res;

    // 
    data.videoDetail.cntLike = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntComment = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntCollect = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntRetransmission = Math.floor(Math.random() * 900) + 100;
    // 

    console.log('data.videoDetail',data.videoDetail);
    
    if (!data.videoDetail.courserDetail) {
        data.isunlockvideo = true
        
    }else if(data.videoDetail.courserDetail.isBuy){
        data.isunlockvideo = true
    }
    console.log('data.isunlockvideo',data.isunlockvideo);
    

    

    const shareObj = {
        title: res.title,
        imageUrl: res.cover,
        id: res.id,
        desc: '',
    }
    data.detailObj = {
        id: res.id,
        title: res.title,
        accountName: res.accountName,
        accountThumb: res.accountThumb,
        cover: res.cover,
    }
    emit('saveShareObj',shareObj)

}


const filterArrayAfterId = (array:any, id:string) => {
    let found = false;
    // 遍历数组，找到匹配的id，并返回匹配id之后的所有元素id组成的新数组
    return array.reduce((result : any, item : any) => {
        if (found) {
            result.push(item.id);
        } else if (item.id === id) {
            found = true;
            result.push(item.id);
        }
        return result;
    }, []);
}

// 当前分类获取视频
const getvideList = (pageNumber:number, pageSize:number) => {
    if (!props.query) {
        console.log('不继续分类获取视频');
        return
    }

    getescourselist({
        pageNumber,
        pageSize,
        query: props.query
    }).then((res:any)=>{
        data.videos = [
            ...data.videos,
            ...filterArrayAfterId(res.data,res.data[0].id)
        ]
    })
    return
    // getcourselist({
    //     pageNumber,
    //     pageSize,
    //     query: props.query,
    // }).then((res:any)=>{
    //     data.videos = [
    //         ...data.videos,
    //         ...filterArrayAfterId(res.data,res.data[0].id)
    //     ]
    // })
}

const initVideo = () =>{
    setTimeout(()=>{
        let videoView = null
        // #ifdef MP-WEIXIN
        videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
        // #endif

        // #ifdef APP-PLUS || H5
        videoView = domVideoPlayer.value[data.swiperCurrent]
        // #endif
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


const touchStart = (e:any) => {
    data.startX = e.touches[0].pageX; // 获取触摸时的x坐标
    data.startY = e.touches[0].pageY; // 获取触摸时的x坐标
    data.startTime = new Date().getTime(); //获取毫秒数
}
const touchCancel = () => {
    console.log('接触中');
    data.startX = 0; //开始时的X坐标
    data.startY = 0; //开始时的Y坐标
    data.startTime = 0; //开始时的毫秒数
}

const touchEnd = (e:any) => {
        var endX = e.changedTouches[0].pageX;
        var endY = e.changedTouches[0].pageY;
        var touchTime = new Date().getTime() - data.startTime; //计算滑动时间
        // 是否符合滑动时间
        if (touchTime >= data.minTime) {
            // 偏移量：分X、Y
            var xOffset = endX - data.startX;
            var yOffset = endY - data.startY;
            
            if (Math.abs(xOffset) < Math.abs(yOffset) && Math.abs(yOffset) >= data.minOffset) {
            //上下滑动
            if (yOffset < 0) {
                const firstVideo = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
                firstVideo.pause()
                const nextVideo = uni.createVideoContext('videoView_' + (data.swiperCurrent + 1),instance)
                nextVideo.play()
                console.log('nextVideo',nextVideo);
                
                
            } else {
                const firstVideo = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
                firstVideo.pause()
                const nextVideo = uni.createVideoContext('videoView_' + (data.swiperCurrent - 1),instance)
                nextVideo.play()
                console.log('nextVideo',nextVideo);
                
            }
            }
        } else {
            console.log('滑动时间过短', touchTime)
        }
        doubleClick() // 判断是否双击

}

const toFullscreen = () => {

    if (!data.isunlockvideo) {
        console.log('试看结束');
        return
    }

    let videoView = null
    // #ifdef MP-WEIXIN
    videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    videoView.requestFullScreen()

    // #endif

    // #ifdef APP-PLUS || H5
    videoView = domVideoPlayer.value[data.swiperCurrent]
    videoView.fullScreen()
    // #endif
    
    data.showcontrols = true
}

const doubleClick = () =>{
    data.touchNum ++
	setTimeout(()=>{
		if(data.touchNum == 1){
			console.log('单击')
        }
		if(data.touchNum >= 2){
			console.log('双击')
		}
		data.touchNum = 0
	},250)
}

// 课程点赞
const tolike = () => {
    if (data.videoDetail.isLike == 0) {
        getcourseLike({
            articleId:data.videoDetail.id
        }).then(()=>{
            data.videoDetail.isLike ++
            data.videoDetail.cntLike ++
        })
        return
    }
    uncourseList({
        articleId:data.videoDetail.id
    }).then(()=>{
        data.videoDetail.isLike --
        data.videoDetail.cntLike --
    })
}

// 课程收藏
const tocollection = () => {
    if (data.videoDetail.isFavorite == 0) {
        favoritecourse({
            articleId:data.videoDetail.id
        }).then(()=>{
            data.videoDetail.isFavorite ++ 
            data.videoDetail.cntCollect ++ 
            data.showOverlay = true;
            
            setTimeout(()=>{
                data.showOverlay = false
            },2000)
            
        })
        return
    }
    unFavoritecourse({
        articleId:[data.videoDetail.id]
    }).then(()=>{
        data.videoDetail.isFavorite --
        data.videoDetail.cntCollect --
    })
}

// 课程关注
const tofollow = () => {
    if (data.videoDetail.isFans == 0) {
        coursefollow({
            accountId:data.videoDetail.accountId
        }).then(()=>{
            data.videoDetail.isFans ++
        })
        return
    }
    courseunfollow({
        accountId:data.videoDetail.accountId
    }).then(()=>{
        data.videoDetail.isFans --
    })
}

const toAuthor = () => {
    gotoauthor({
        accountId: data.videoDetail.accountId,
        isFans: data.videoDetail.isFans
    })
}


// 获取课程评论
const getcoursecommentList = () => {
    coursecommentList({
        pageNumber:1,
        pageSize:200,
        query:{
            articleId:data.videoDetail.id
        }
    }).then((res:any)=>{
        data.commentList = res.data
        data.total = res.total
    })
}

// 发课程评论
const pushcomment = () => {

    console.log('评论发布时间',data.upCommentTime);
    // return

    let content = data.textMsg

    // if (content.length > 20) {

    // }

    coursereview({
        articleId: data.videoDetail.id,
        content,
        isAuthor: 0,
        scrollingTime: data.upCommentTime,
    }).then(()=>{
        data.videoDetail.cntComment ++
        
        if (data.showBarrage) {
            // #ifdef MP-WEIXIN
            const videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
            videoView.sendDanmu({
                text: data.textMsg,
                color: '#fff',
            });
            // #endif

        }
        

        data.textMsg = ''

        data.show = false
        data.istouch = false

        getcoursecommentList()
    }).catch((error:any)=>{
		bcNotify.value.error('评论内容包含不良信息，提交失败!')
        data.textMsg = ''
    })


}


const showcomment = () => {
    data.show = true
    data.istouch = true

    let videoView = null
    // #ifdef MP-WEIXIN
    videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    // #endif

    // #ifdef APP-PLUS || H5
    videoView = domVideoPlayer.value[data.swiperCurrent]
    // #endif
    videoView.pause()

    getcoursecommentList()
}
const close = () => {
    data.istouch = false
    let videoView = null
    // #ifdef MP-WEIXIN
    videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    // #endif

    // #ifdef APP-PLUS || H5
    videoView = domVideoPlayer.value[data.swiperCurrent]
    // #endif
    videoView.play()

}


const changeVideoSwiper = (e:any) => {

    // #ifdef MP-WEIXIN

    // 上一个视频
    const firstVideo = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    firstVideo.pause();

    data.swiperCurrent = e.detail.current
    data.isunlockvideo = true 
    // 下一个视频

    videoDetail(data.videos[data.swiperCurrent]);

    const secondVideo = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    secondVideo.play();

    // #endif

    // #ifdef APP-PLUS || H5
    // app视频ref
    const appFirstVideo = domVideoPlayer.value[data.swiperCurrent]
    appFirstVideo.pause();

    data.swiperCurrent = e.detail.current;
    data.isunlockvideo = true 

    videoDetail(data.videos[data.swiperCurrent]);

    const appSecondVideo = domVideoPlayer.value[data.swiperCurrent]
    appSecondVideo.play();

    console.log('domVideoPlayer',domVideoPlayer);
    console.log('data.swiperCurrent',data.swiperCurrent);

    // #endif

    if((data.swiperCurrent + 1) == data.videos.length){
        data.pageNumber = data.pageNumber + 1
        // getVideos()
        console.log('继续获取');
    }


    console.log('data.videos',data.videos);
}


// 视频每秒事件
const videoTime = (e:any) => {

    let duration = 0

    // #ifdef MP-WEIXIN
    data.upCommentTime = e.detail.currentTime
    duration = e.detail.duration

    // #endif


    // #ifdef APP-PLUS || H5
    data.upCommentTime = e.currentTime
    duration = e.duration

    // #endif

    if (Math.floor(data.upCommentTime) == 1) {
        Debounce(()=>{
            console.log('视频播放发送上报');
            createCollectAndReport().videoPlayReport()
        }, 300)
    }
    if (Math.floor(data.upCommentTime) == Math.floor(duration * 0.98)) {
        Debounce(()=>{
            console.log('视频完播发送上报');
            createCollectAndReport().videoPlayOverReport()

        }, 300)
    }

    // console.log('e',e);
    // data.bulletChatList
    for (let i = 0; i < data.bulletChatList.length; i++) {
        if (Math.trunc(data.upCommentTime) == data.bulletChatList[i].scrollingTime) {
            console.log('匹配发送弹幕',data.bulletChatList[i]);
            console.log('data.bulletChatList[i].scrollingTime',data.bulletChatList[i].scrollingTime);
            // #ifdef MP-WEIXIN
            if (data.showBarrage) {
                console.log('发送弹幕');
                
                const videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
                videoView.sendDanmu({
                    text: data.bulletChatList[i].comment,
                    color: '#fff',
                });
            }
            data.bulletChatList.splice(i, 1);
            i--; 
            break
            // #endif

            // #ifdef APP-PLUS || H5
            console.log('APP匹配发送弹幕',data.bulletChatList[i]);
            // #endif

        }

    }
    // console.log('普通执行');
    


    let courserDetail = data.videoDetail.courserDetail

    if (!courserDetail) {
        return
    }

    // 是否可以完整观看
    if ((courserDetail.isCharge == 1 && courserDetail.isBuy) || courserDetail.isCharge == 0) {
        return
    }
    let currentTime = Number(data.upCommentTime);

    // 处理试看时间
    let tryTime = courserDetail.unit == 1 ? courserDetail.duration * 60 : courserDetail.duration
    // 提前一秒退出全屏
    if (currentTime >= tryTime - 1) {
        console.log('退出全屏');
        let videoView = null
        // #ifdef MP-WEIXIN
        videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
        videoView.exitFullScreen();

        // #endif

        // #ifdef APP-PLUS || H5
        videoView = domVideoPlayer.value[data.swiperCurrent]
        // videoView.fullScreenHandler()
        console.log('exitFullScreen',videoView);
        console.log('domVideoPlayer',domVideoPlayer);
        
        // #endif
        data.isunlockvideo = false
    }

    if (currentTime >= tryTime) {
        let videoView = null
        // #ifdef MP-WEIXIN
        videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
        // #endif

        // #ifdef APP-PLUS || H5
        videoView = domVideoPlayer.value[data.swiperCurrent]
        // #endif

        videoView.pause()

        // setTimeout(()=>{
        //     videoView.exitFullScreen()
        // },800)

        // query.select('#videoView_' +  data.swiperCurrent).boundingClientRect((view:any) => {
        //     data.overlayHeight = view.height
        // }).exec()

        data.isunlockvideo = false
        console.log('试看结束');
    }
}

const play = () => {
    data.isPlay = true
}

const pause = () => {
    data.isPlay = false
}

const clickVideo = () => {
    const videoView = uni.createVideoContext('videoView_' + data.swiperCurrent,instance)
    if (data.isPlay) {
        videoView.pause()
    }else{
        videoView.play()
    }
    console.log('单击视频');
}

const fullscreenchange = () => {
    data.isFull = !data.isFull
    if (!data.isFull) {
        data.showcontrols = false
    }
}

// 评论框获取焦点
const openkeyboard = (event:any) => {
    data.iskeyboard = true
    data.keyboardH = event.detail.height + 48
}
// 评论框失去焦点
const closekeyboard = () => {
    setTimeout(() => {
        data.iskeyboard = false
        data.keyboardH = 0
        data.showtextbtn = false

    }, 500)
}
// 打开多行输入框
const showtextarea = () => {
    data.showtextbtn = true
}

const toBalanceCourse = () => {
    const itemId = TempStorage.savewx({
        price: data.videoDetail.courserDetail.price,
        cover: data.videoDetail.cover,
        coursetitle: data.videoDetail.title,
        itemId: data.videoDetail.id
    })

	// #ifdef MP-WEIXIN
    gotoBalanceCourse(itemId)
    // #endif


	// #ifdef APP-PLUS
    let payJSON = JSON.stringify({
        price: data.videoDetail.courserDetail.price,
        cover: data.videoDetail.cover,
        coursetitle: data.videoDetail.title,
        itemId: data.videoDetail.id
    })

    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // APP跳转小程序进行支付
    plus.share.getServices((res: any) => {
        let sweixin = null as any
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()
            
            PlatformManage.getToken().then((res:any)=>{
                console.log('获取userinfo',res);

                sweixin.launchMiniProgram({
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/Order/pages/balanceOrder/balanceCourse?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })
            })
        }
    })

    // #endif

}

const toCollectLists = () => {
    gotoCollectLists('course')
}

const shareBox = ref();
const share = () => {
    data.status = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}
const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.videoDetail.cover)

    const listId = TempStorage.savewx({
        videoIdlist:[data.videoDetail.id],
    })

    // 二维码链接图片
    let qrimg =  await getQrcode(`/Create/pages/course/courseVideo?listId=${listId}`).then((img:any)=>{
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.videoDetail.accountThumb)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.videoDetail.title//标题
    let accountName = data.videoDetail.accountName//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0,8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0,8) + "..."
    }
            
    const context = uni.createCanvasContext('mycanvas',instance)


    context.clearRect(0, 0, 254, 344);
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)
            
    // 底部白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 258, 258, 94)

    // 底部文字
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.fillText(title, 12, 282)
    context.setFillStyle('#808080')
    context.setFontSize(14)


    // 二维码
    context.drawImage(qrimgUrl, 168, 260, 76, 76)

    context.fillText(accountName, 40, 324)
    context.setFillStyle('#999999')
    context.setFontSize(12)
            
    // 背景图片
    context.drawImage(coverUrl, 0, 0, 275, 255)


    context.save()
    context.arc(24, 320, 10, 0, Math.PI * 2);
    context.fill()//保证图片无bug填充
    context.clip();//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 14, 310, 20, 20)
    context.restore()

    context.draw(
        false,
        setTimeout( async () => {
            uni.canvasToTempFilePath({
                canvasId:'mycanvas',
                success: (res:any) => {
                    data.shareimgUrl = res.tempFilePath
                    data.status = 2
                    title = ''
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                },
                complete: (ret) => {
                    console.log('生成中....');
                    uni.hideLoading()
                }
            },instance)
        }, 3000)
    )


}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const listId = TempStorage.savewx({
        videoIdlist:[data.videoDetail.id],
    })
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.videoDetail.cover,
        title: data.videoDetail.title,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/Create/pages/course/courseVideo?listId=${listId}`, //点击链接进入的页面
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

const changeBarrage = () =>{
    data.showBarrage = !data.showBarrage
    uni.setStorageSync('showBarrage', data.showBarrage)
    console.log('data.showBarrage',data.showBarrage);
}


defineExpose({
    closeShare,
    showRefresh,
    postviewTime
})


</script>
  
<style lang="scss" scoped>
.container{
    position: relative;
    .pageGoback_icon{
        position: absolute;
        top: 110rpx;
        left: 38rpx;
        z-index: 1;
    }
}
.video_swiper_box{
    .swiper{
        height: 100%;
        .swiper_item{
            position: relative;
            height: 100%;
            .video_box{
                // position: absolute;
                // top: 15%;
                // left: 0;
                // // transform: translate(0,-70%);
                // width: 100%;
                // // height: 424rpx;
                // z-index: 1;
                // display: flex;
                // align-items: center;
                // justify-content: center;
                // flex-direction: column;

                width: 100%;
                height: 100%;
                // position: absolute;
                // top: 10%;

                // #ifdef APP-PLUS || H5
                // height: 1000rpx;
                // #endif
                // left: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                z-index: -1;
                padding-bottom: 110rpx;
                box-sizing: border-box;
                .full_screen_btn{
                    padding: 12rpx 20rpx;
                    box-sizing: border-box;
                    border: 2rpx solid #fff;
                    border-radius: 32rpx;
                    display: flex;
                    align-items: center;
                    width:fit-content;
                    position: absolute;
                    bottom: 30%;
                    .full_screen_icon{
                        width: 60rpx;
                        height: 36rpx;
                        margin-right: 8rpx;
                    }
                    .full_screen_text{
                        font-size: 24rpx;
                        font-weight: 400;
                        color: #fff;
                    }

                }
                
            }
            .play_icon{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-100%);
                width: 100rpx;
                height: 100rpx;
                z-index: 100000;
            }
            .video_overlay{
                position: absolute;
                top: 30%;

                // #ifdef APP-PLUS || H5
                // #endif
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
                    left: 0;
                    top: 50%;
                    width: 100%;
                    backdrop-filter: blur(10px);
                    transform: translate(0, -50%);
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
                bottom: 150rpx;
                // #ifdef APP-PLUS || H5
                bottom: 100rpx;
                // #endif
                z-index: 1007000000;
                .author_box{
                    width: 90rpx;
                    height: 90rpx;
                    margin-bottom: 100rpx;
                    // #ifdef APP-PLUS
                    margin-bottom: 90rpx;
                    // #endif
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
            .video_informationBox{
                width: 100%;
                position: absolute;
                left: 30rpx;
                bottom: 13%;
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
                    width: 80%;
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
                    margin-bottom: 15rpx;
                }
                .course_dace{
                    font-size: 28rpx;
                    color: #949494;
                    margin-bottom: 20rpx;
                    .tagtext{
                        color: #C8C8C8;
                    }
                    .show_dace_btn{
                        color: #FFFFFF;
                    }
                }
                .location{
                    .location_box{
                    
                        width: 100%;
                        padding: 12rpx 0rpx;
                        padding-top: 0rpx;
                        box-sizing: border-box;
                        border-radius: 8rpx;
                        display: flex;
                        align-items: center;
                        .location_text{
                            margin-left: 8rpx;
                            color: #C8C8C8;
                            font-size: 24rpx;
                            width: 88%;
                            white-space: nowrap; /*强制一行内显示*/
                            overflow: hidden;/*溢出隐藏*/
                            text-overflow: ellipsis;/*超出部分现实省略号*/
                        }
                    }
                }

            }
            .video_bottomInfo{
                width: 100%;
                position: absolute;
                left: 30rpx;
                bottom: 3%;

                .course_page_bottom{
                    width: 680rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .course_text{
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #757575;
                    }
                    .bulletchat_box{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        width: 130rpx;
                        height: 56rpx;
                        font-size: 28rpx;
                        border-radius: 30rpx;
                        background-color: rgba(41, 200, 111, 0.5);
                        padding: 6rpx;
                        padding-left: 12rpx;
                        box-sizing: border-box;
                        &.is_open{
                            background-color: rgba(234, 62, 26, 0.5);
                            padding-right: 12rpx;
                        }
                        .open_btn{
                            width: 44rpx;
                            height: 44rpx;
                            border-radius: 50%;
                            background: #FFFFFF;
                            font-size: 28rpx;
                            color: #29C86F;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .bulletchat_text{
                            font-size: 28rpx;
                            color: #FFFFFF;
                        }
                        .shut_btn{
                            width: 44rpx;
                            height: 44rpx;
                            border-radius: 50%;
                            background: #FFFFFF;
                            font-size: 28rpx;
                            color: #EA3E1A;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
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
                    word-break: break-all;
                    width: 100%;
                    white-space: nowrap; /*强制一行内显示*/
                    overflow: hidden;/*溢出隐藏*/
                    text-overflow: ellipsis;/*超出部分现实省略号*/
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
                word-break: break-all;
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
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}
</style>
<style>
video{
    width: 100%;
    height: 100%;
}
</style>