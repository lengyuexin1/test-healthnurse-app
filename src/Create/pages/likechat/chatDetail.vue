<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :hide-empty-view="true"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        @scroll="pagingScroll"
    >
        <template #top>
            <view id="topView">
                <pageTopbg :zIndex="-1" :bgstyle="'background:#fff'"></pageTopbg>
                <bc-page-navbar :title="' '">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
                <view class="posts_author">
                    <view class="posts_author_left">
                        <image
                            class="author_img"
                            :src="data.chatDetail.accountThumb"
                            mode="scaleToFill"
                        />
                        <view class="author_text">
                            <view class="author_name">
                                {{ data.chatDetail.accountName }}
                            </view>
                            <view class="up_time">{{ timeformat(data.chatDetail.utcModified)}}发布</view>
                        </view>
                    </view>
                    <view class="posts_author_right" @click="followFun" v-if="!data.chatDetail.isUser">
                        <view class="btn is_fans_btn" v-if="data.chatDetail.isFans">已关注</view>
                        <view class="btn follow_btn" v-else>关注</view>
                        
                    </view>
                </view>

                <view class="comment_box_top" v-if="data.isfixed">
                    <view class="nav_box">
                        <view class="nav_item" v-for="(item,index) in data.navList" :key="item.id" @click="changeList(item)">
                            <view class="nav_text" :class="{'is_nav' : data.navId == item.id}">{{ item.name }}{{ item.number ? item.number : '--' }}</view>
                            <view class="nav_bottom" v-if="data.navId == item.id"></view>
                        </view>
                    </view>
                </view>

            </view>
            
        </template>

        <view class="posts_content">
            <view class="swiper_box">
                <swiper class="swiper" :autoplay="true" :circular="true" @change="swiperchang">
                    <swiper-item class="swiper_item" v-for="(item,index) in data.chatDetail.images" :key="index">
                        <image
                            @click="preImage(index,data.chatDetail.images)"
                            class="swiper_item_img"
                            :src="item"
                            mode="aspectFill"
                        />
                    </swiper-item>
                </swiper>
                <view class="swiper_number_box" v-if="data.chatDetail.images">
                    {{ data.swiperIndex }}
                    /
                    {{ data.chatDetail.images.length }}
                </view>
            </view>
            <view class="salon_posts_title">
                {{ data.chatDetail.title }}
            </view>
            <view class="text_content">
                <!-- {{ data.chatDetail.desc }} -->
                <mpHtml :content="data.showText" />

            </view>

            <view class="location" v-if="data.chatDetail.address">
                <view class="location_box">
                    <view class="location_icon">
                        <TnIcon name="location" color="#333333" size="36rpx"/>
                    </view>
                    <view class="location_text">
                        <!-- {{ '广佛高速公路有限公司' }} | {{ '金沙街道钟村康园路161号' }} -->
                        {{ data.chatDetail.address }} 
                    </view>
                </view>
            </view>

        </view>

        <view class="spage_box"></view>

        <view class="comment_box" id="richBox">
            <view class="comment_box_top" v-if="!data.isfixed">
                <view class="nav_box">
                    <view class="nav_item" v-for="(item,index) in data.navList" :key="item.id" @click="changeList(item)">
                        <view class="nav_text" :class="{'is_nav' : data.navId == item.id}">{{ item.name }}{{ item.number ? item.number : '--' }}</view>
                        <view class="nav_bottom" v-if="data.navId == item.id"></view>
                    </view>
                </view>
            </view>
            <view class="comment_content" v-if="data.navId == 1">
                <view class="comment_item" v-for="item in data.dataList" :key="item.id">
                    <view class="comment_left" @touchstart="startTime(item,1)" @touchend="endTime">
                        <image
                            class="comment_img"
                            :src="item.userThumb"
                            mode="scaleToFill"
                        />
                        <view class="comment_text">
                            <view class="comment_name_box">
                                <view class="comment_name">{{ item.userName }}</view>
                                <view class="comment_tag" v-if="item.isUser == 1">我</view>
                                <view class="comment_tag" v-if="item.isAuthor == 1">作者</view>
                            </view>
                            <view class="comment_content_text">
                                {{ item.comment }}
                            </view>
                            <view class="comment_time">
                                <view class="time">{{ formatTime(item.utcCreated) }} · 广州</view>
                                <view class="reply" @click.stop="showComment(item)">回复</view>
                            </view>

                            
                            <view class="comment_item not_bottom" v-for="sonitem in item.commentRelyLists" :key="sonitem.id">
                                <view class="comment_left" >
                                    <image
                                        class="comment_img"
                                        :src="sonitem.userThumb"
                                        mode="scaleToFill"
                                    />
                                    <view class="comment_text">
                                        <view class="comment_name_box">
                                            <view class="comment_name">{{ sonitem.userName }}</view>
                                            <view class="comment_tag" v-if="sonitem.isUser == 1">我</view>
                                            <view class="comment_tag" v-if="sonitem.isAuthor == 1">作者</view>
                                        </view>
                                        <view class="quote_comment" v-if="sonitem.quoteComment && sonitem.quoteComment != ''">
                                            {{ `@${sonitem.replyUser}:` + sonitem.quoteComment }}
                                        </view>
                                        <view class="comment_content_text">
                                            {{ sonitem.comment }}
                                        </view>
                                        <view class="comment_time">
                                            <view class="time">{{ formatTime(sonitem.utcCreated) }} · 广州</view>
                                            <!-- <view class="reply" @click.stop="showComment(item)">回复</view> -->
                                        </view>
                                    </view>
                                </view>
                                <view class="comment_right">
                                    <image
                                        @click="changelike(sonitem.commentId,sonitem.isLike,1)"
                                        class="like_img"
                                        :src="sonitem.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="like_number">
                                        {{ sonitem.cntLike ? sonitem.cntLike : '' }}
                                    </view>
                                </view>
                            </view>



                            <view class="more_comment_box" v-if="item.cntReply > 0" @click.stop="showComment(item)">
                                <view class="left_border"></view>
                                <view class="more_comment_text">展开{{ item.cntReply }}条回复</view>
                            </view>
                        </view>
                    </view>
                    <view class="comment_right">
                        <image
                            @click="changelike(item.commentId,item.isLike,1)"
                            class="like_img"
                            :src="item.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                            mode="scaleToFill"
                        />
                        <view class="like_number">
                            {{ item.cntLike ? item.cntLike : '' }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="tile_list" v-if="data.navId == 2">
                <view class="tile_item" v-for="item in data.likeList" :key="item.id">
                    <image
                        class="tile_img"
                        :src="item.thumb"
                        mode="scaleToFill"
                    />
                    <view class="tile_name">{{ item.name }}</view>
                    <view class="tile_time">{{ formatTime(item.utcModified) }}</view>
                </view>
            </view>
            <view class="tile_list" v-if="data.navId == 3">
                <view class="tile_item" v-for="item in data.favoriteList" :key="item.id">
                    <image
                        class="tile_img"
                        :src="item.thumb"
                        mode="scaleToFill"
                    />
                    <view class="tile_name">{{ item.name }}</view>
                    <view class="tile_time">{{ formatTime(item.utcModified) }}</view>
                </view>
            </view>
        </view>


        <template #bottom>
            <view 
            class="bottom_box"
            :style="{
                'z-index': data.crown ? 10080 : 0
            }"
            id="bottomBox"
            v-if="!data.showTouch"
            >
                <view class="bottom_inp_box" @click="showtextarea">
                    <!-- 底部输入框 -->
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
                        v-if="data.showtextbtn"/>
                    <view class="not_bottom_inp" v-else>
                        <view class="not_bottom_inp_text" v-if="data.textMsg == ''">说点什么吧~</view>
                        <view class="have_textMsg" v-else>{{ data.textMsg }}</view>
                    </view>
                </view>
                <view class="icon_list" v-if="!data.iskeyboard">
                    <view class="icon_item" @click="tolike">
                        <image
                            class="icon_img"
                            :src="data.chatDetail.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                            mode="scaleToFill"
                        />
                    </view>

                    <view class="icon_item" @click="tocollect">
                        <image
                            class="icon_img"
                            :src="data.chatDetail.isFavorite == 1 ? getAssetsUrl('/channel/collect_highlight.svg') : getAssetsUrl('/channel/collect.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                    
                    <view class="icon_item" style="margin-right: 0rpx;" @click="share">
                        <image
                            class="icon_img"
                            :src="getAssetsUrl('/channel/share.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view>
                <view class="sending" v-else @click="sending">发送</view>
                <view class="have_bottom" :style="{ 'height': data.keyboardH + 'px' }"></view>
            </view>
        </template>



        <TnPopup v-model="data.show" open-direction="bottom">
            <view class="action_box" :style="{ 'padding-bottom': (data.bottomBox + 10) + 'px' }">
                <view class="action_top" @click="closeAction">
                    <view class="action_top_title">{{data.Soncomment.length}}条回复</view>
                    <image
                        class="action_top_title_img"
                        :src="getAssetsUrl('/channel/out.svg')"
                        mode="scaleToFill"
                    />
                </view>
                <view class="Landlord">
                    <image
                        class="Landlord_img"
                        :src="data.soncommentObj.userThumb"
                        mode="scaleToFill"
                    />
                    <view class="Landlord_text_box">
                        <view class="Landlord_top_box">
                            <view class="Landlord_top_name_box">
                                <view class="Landlord_top_name">{{data.soncommentObj.userName}}</view>
                                <view class="isLandlord" >楼主</view>
                                <view class="isLandlord" v-if="data.soncommentObj.isUser == 1 ">我</view>
                                <view class="isLandlord" v-if="data.soncommentObj.isAuthor == 1 ">作者</view>
                            </view>
                            <view class="Landlord_top_icon">
                                <view class="like_up" @click="changelike(data.soncommentObj.id,data.soncommentObj.isLike,1)">
                                    <image
                                        class="like_up_img"
                                        :src="data.soncommentObj.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                        mode="scaleToFill"
                                    />
                                    <text class="like_text">{{data.soncommentObj.cntLike}}</text>
                                </view>
                            </view>
                        </view>
                        <view class="Landlord_content">
                            {{data.soncommentObj.comment}}
                        </view>
                        <view class="Landlord_bottom">
                            <view class="Landlord_bottom_comment">
                                {{ formatTime(data.soncommentObj.utcCreated) }} · {{ '广州' }}
                            </view>
                            <view class="Landlord_bottom_del" v-if="data.soncommentObj.isUser == 1" @click="todeleteComment(data.soncommentObj.id,1)">
                                删除
                            </view>
                        </view>
                    </view>
                </view>
                <view class="all_son_comment">全部回复</view>
                <scroll-view :scroll-y="true" >
                    <view class="son_comment_scroll">
                        <view 
                        class="son_comment_item" 
                        :class="{ 'not_bottom': index + 1 == data.Soncomment.length }" 
                        v-for="(item,index) in data.Soncomment" :key="item.commentId"
                        @touchstart="startTime(item,0)" @touchend="endTime"
                        >
                            <image
                                class="son_comment_thumb"
                                :src="item.userThumb"
                                mode="scaleToFill"
                            />
                            <view class="son_comment_text_box">
                                <view class="son_comment_name_box">
                                    <view class="son_comment_nameandtag">
                                        <view class="son_comment_name">{{ item.userName }}</view>
                                        <view class="son_comment_tag" v-if="item.isPostmaster == 1">楼主</view>
                                        <view class="son_comment_tag" v-if="item.isUser == 1">我</view>
                                        <view class="son_comment_tag" v-if="item.isAuthor == 1">作者</view>
                                    </view>
                                    <view class="son_comment_icon">
                                        <view class="like_up" @click="changelike(item.commentId,item.isLike,0)">
                                            <image
                                                class="like_up_img"
                                                :src="item.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                                mode="scaleToFill"
                                            />
                                            <text class="like_text">{{item.cntLike}}</text>
                                        </view>
                                    </view>
                                </view>
                                <view class="quotecomment" v-if="item.quoteComment && item.quoteComment != ''">
                                    {{ `@${item.replyUser}:` + item.quoteComment }}
                                </view>
                                <view class="son_comment_content">
                                    {{item.comment}}
                                </view>
                                <view class="son_comment_bottom">
                                    <view class="son_comment_bottom_box">
                                        <view class="son_comment_reply" @click="sonQuotereply(item)">
                                            <view class="son_comment_reply_text">回复</view>
                                            <TnIcon name="right" size="20rpx" />

                                        </view>
                                        <view class="son_comment_time">
                                            {{ formatTime(item.utcCreated) }}
                                            ·
                                            {{ '广州' }}
                                        </view>
                                    </view>
                                    <view class="son_comment_del" v-if="item.isUser == 1" @click="todeleteComment(item.commentId,0)">
                                        删除
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="son_comment_spage"></view>
                    </view>

                </scroll-view>

		        <BCNotify ref="sonbcNotify"></BCNotify>
                
            </view>

        </TnPopup>

		<BCNotify ref="bcNotify"></BCNotify>

        <TnPopup v-model="data.showTouch" open-direction="bottom" :zIndex="40080" radius="32">
            <view class="touch_box">
                <view class="touch_top_box">
                    <view class="touch_title">{{ data.touchTitle }}</view>
                    <view class="touch_item" @click="touchReply">
                        回复
                    </view>
                    <view class="touch_item" @click="touchCopy">
                        复制
                    </view>
                    <view class="touch_item del_btn" @click="touchDelbtn" v-if="data.showItemdel">
                        删除
                    </view>
                </view>
                <view class="touch_bottom_box">
                    <view class="bottom_spage"></view>
                    <view class="out_touch_btn" @click="cancelPopup">取消</view>
                </view>
            </view>
		    <BCNotify ref="TouchbcNotify"></BCNotify>

        </TnPopup>


    </z-paging>
    <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="data.status" :imgUrl="data.shareimgUrl"></shareView>
    <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>

</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import mpHtml from '@/Create/uni_modules/mp-html/components/mp-html/mp-html.vue'
import { formattime,agoTime } from '@/common/formatTime'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { PlatformManage } from "@bc/sys"

import shareView from '@/Create/components/shareView/shareView.vue'

import { gotoIndex, gotoLogin } from "@/routes/public-routes"

import {
    chatcontentDetails,
    contentShareDetails,
    chatlikeList,
    chatcommentList,
    chatcommentRelyList,
    postChatreview,
    deletechatComment,
    postchatrecover,
    unchatCommentLike,
    chatCommentLike,
    chatfavorite,
    unchatfavorite,
    chatgetLike,
    unchatgetLike,
    chatfollow,
    unchatfollow,
    chatfavoriteList,
    articleaddView,

    retransmission,

} from '@/api/create-api'
import { pageController } from '@bc/uni-tools'
import { drawBGIMG } from '@/libs/canvas-tools'
import { getQrcode } from "@/api/user-api"

interface Props {
    id:string
}

const props = defineProps<Props>()

interface Data {
    id:string,
    dataList:any,
    navList:any,
    navId:number,
    commentList:any,
    getpageTopH:number,
    isfixed:boolean,
    crown:boolean,
    showtextbtn:boolean,
    placeholderText:string,
    textMsg:string,
    iskeyboard:boolean,
    keyboardH:number,
    isQuotereply:boolean,
    isshowReply:boolean,
    upusercommentId:string,
    lastcomment:string,
    show:boolean,
    commentId:string,
    userId:string,
    quoteComment:string,
    articledId:string,
    chatDetail:any,
    pageNumber:number,
    pageSize:number,
    soncommentObj:any,
    Soncomment:any,
    bottomBox:number,
    showTouch:boolean,
    touchTitle:string,
    showItemdel:boolean,
    storageItem:any,
    isTopcomment:boolean,

    status:number,
    shareimgUrl:string,
    swiperIndex: number,
    isNeedlogin: boolean,
    likeList: any,
    favoriteList: any,
    showText: string


}   
const data = reactive<Data>({
    id:'',
    dataList:[],
    navList:[
        {id:1,name:'回复',number: Math.floor(Math.random() * 900) + 100},
        {id:2,name:'点赞',number: Math.floor(Math.random() * 900) + 100},
        {id:3,name:'收藏',number: Math.floor(Math.random() * 900) + 100},
    ],
    navId:1,
    commentList:[],
    getpageTopH:45,
    isfixed:false,
    crown:true,
    showtextbtn:false, // 打开多行文本框
    placeholderText: '说点什么吧~',
    textMsg:'',
    iskeyboard:false,
    keyboardH: 0,
    isQuotereply:false,
    isshowReply: false, //展开更多评论之后引用回复
    upusercommentId:'',
    lastcomment:'',
    show:false,
    commentId:'',
    userId:'',
    quoteComment:'',
    articledId:'',
    chatDetail:{},
    pageNumber:1,
    pageSize:10,
    soncommentObj:{},
    Soncomment:[],
    bottomBox:0,
    showTouch:false,
    touchTitle:"",
    showItemdel:true,
    storageItem:{},
    isTopcomment:true,

    status:1,
    shareimgUrl:'',
    swiperIndex: 1,
    isNeedlogin: false,
    likeList: [],
    favoriteList: [],
    showText: ''



})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD HH:mm')
})

const formatTime = computed(()=>(time:number)=>{
    return agoTime(time)
})

onMounted(() => {
    getpageTop()
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        data.isNeedlogin = isRequireLogin
    })
    articleaddView({articleId:data.articledId}).then(()=>{})

})

onLoad((option:any) => {
    data.articledId = option.id
})

const paging = ref()

const queryList = (pageNumber : number, pageSize : number) => {
    data.pageNumber = pageNumber
    data.pageSize = pageSize
    if (pageNumber == 1) {
        getdetail(data.articledId)
    }
    if (data.navId == 1) {
        getcommentList(data.articledId)   
    }else if (data.navId == 2){
        getlikeList(data.articledId)
    }else if (data.navId == 3){
        favoriteList(data.articledId)
    }
} 

const emit = defineEmits(["saveShareObj"])

const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    uni.navigateBack()
}

const swiperchang = (e:any) => {
    data.swiperIndex = e.detail.current + 1
}

// 聊天帖子详情
const getdetail = (contentId:string) => {

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            contentShareDetails({
                contentId
            }).then((res:any)=>{
                data.chatDetail = res

                data.showText = data.chatDetail.desc.replace(/\n/g, '<br>')

                // data.navList[0].number = res.cntComment
                // data.navList[1].number = res.cntLike
                // data.navList[2].number = res.cntCollect

                const shareObj = {
                    title: res.title,
                    imageUrl: res.cover,
                    id: res.id,
                    desc: '',
                }
                emit('saveShareObj',shareObj)
            }).catch(() => {
                bcNotify.value.error('该聊天号已经被删除了')
                setTimeout(() => {
                    pageController.back()
                }, 1500)
            })
            return
        }
        chatcontentDetails({
            contentId
        }).then((res:any)=>{
            data.chatDetail = res

            data.showText = data.chatDetail.desc.replace(/\n/g, '<br>')

            // data.navList[0].number = res.cntComment
            // data.navList[1].number = res.cntLike
            // data.navList[2].number = res.cntCollect

            const shareObj = {
                title: res.title,
                imageUrl: res.cover,
                id: res.id,
                desc: '',
            }
            emit('saveShareObj',shareObj)
        }).catch(() => {
            bcNotify.value.error('该聊天号已经被删除了')
            setTimeout(() => {
                pageController.back()
            }, 1500)
        })
    })

}

const tologin = () => {
    bcNotify.value.show('请先登录')
    setTimeout(()=>{
        gotoLogin({})
    },1000)
}

// 聊天评论列表
const getcommentList = (articleId:string) => {
    chatcommentList({
        pageNumber:data.pageNumber,
        pageSize:data.pageSize,
        query:{
            articleId:data.articledId
        }
    }).then((res:any)=>{
        (paging.value as any).complete(res.data)
    })
}

// 聊天点赞列表
const getlikeList = (articleId:string) => {
    chatlikeList({
        pageNumber:data.pageNumber,
        pageSize:data.pageSize,
        query:{
            articleId,
            isUser:0
        }
    }).then((res:any)=>{
        data.likeList = res.data
    })
}

// 聊天收藏列表
const favoriteList = (articleId:string) => {
    chatfavoriteList({
        query:{
            isUser:0,
            articleId
        },
        pageNumber:data.pageNumber,
        pageSize:data.pageSize,
    }).then((res:any)=>{
        data.favoriteList = res.data

    })
}



const instance = getCurrentInstance(); // 获取组件实例
const query = uni.createSelectorQuery().in(instance);


const getpageTop = () => {    
    setTimeout(()=>{
        query.select('#bottomBox').boundingClientRect((view:any) => {
            data.bottomBox = view.height
        }).exec()

        query.select( '#topView' ).boundingClientRect((view:any) => { //目标位置的节点：类class或者id
            data.getpageTopH = view.height
        }).exec()
        console.log('data.getpageTopH',data.getpageTopH);
        
    },800)
}

// 计算是否需要吸顶
const pagingScroll = () => {
    setTimeout(()=>{
        query.select( '#richBox' ).boundingClientRect((view:any) => {
            if (view.top <= 170) {
                data.isfixed = true
            }
            else {
                data.isfixed = false
            }
        }).exec()
    },10)
}


// 打开多行输入框
const showtextarea = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    data.showtextbtn = true
}

// 评论框获取焦点
const openkeyboard = (event:any) => {
    data.iskeyboard = true
    data.keyboardH = event.detail.height + 48
}

// 键盘高度变化事件
const changekeyboardH = (event:any) => {
    data.keyboardH = event.detail.height + 48;
}

// 评论框获取失去焦点
const closekeyboard = () => {
    // click事件比change事件先触发
    setTimeout(() => {
        data.iskeyboard = false
        data.keyboardH = 0
        data.isQuotereply = false
        data.isshowReply = false
        data.showtextbtn = false

    }, 500)
}

// 收藏
const tocollect = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (data.chatDetail.isFavorite == 1) {
        unchatfavorite({
            articleId:[data.articledId]
        }).then(()=>{
            getdetail(data.articledId)
            favoriteList(data.articledId)
            data.navList[2].number--

        })
    }else{
        chatfavorite({
            articleId:data.articledId
        }).then(()=>{
            getdetail(data.articledId)
            favoriteList(data.articledId)
            data.navList[2].number++

        })
    }

}
// 点赞 
const tolike = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (data.chatDetail.isLike == 1) {
        unchatgetLike({
            articleId:data.articledId
        }).then(()=>{
            getdetail(data.articledId)
            getlikeList(data.articledId)
            data.navList[1].number--

        })
    }
    else {
        chatgetLike({
            articleId:data.articledId
        }).then(()=>{
            getdetail(data.articledId)
            getlikeList(data.articledId)
            data.navList[1].number++

        })
    }
}
// 关注
const followFun = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (data.chatDetail.isFans) {
        unchatfollow({
            accountId:data.chatDetail.accountId
        }).then(()=>{
            getdetail(data.articledId)
        })
    }else{
        chatfollow({
            accountId:data.chatDetail.accountId
        }).then(()=>{
            getdetail(data.articledId)
        })
    }
}

const bcNotify = ref()
const sonbcNotify = ref()

// 发送评论
const sending = () => {
    if (data.textMsg == '') {
		bcNotify.value.error('请输入评论')
        return
    }
    data.upusercommentId = data.upusercommentId == '' ? data.lastcomment : data.upusercommentId

    if (data.show && !data.isshowReply) {

        console.log('回复列表的回复', data.show, !data.isshowReply)
        topostrecover(data.commentId, data.commentId, '', '', data.textMsg,data.userId)

    }
    else if (data.show && data.isshowReply) {

        console.log('展开评论弹窗引用回复', data.show, data.isshowReply)
        topostrecover(data.commentId, data.upusercommentId, data.placeholderText, data.quoteComment, data.textMsg,data.userId)

    }
    else {
        if (data.isQuotereply) {

        console.log('没有引用评论的回复', data.isQuotereply)
        topostrecover(data.commentId, data.commentId, '', '', data.textMsg,data.userId)
        data.textMsg = ''
        return
    }
    topostreview(data.textMsg)
    console.log('发送文章的评论', data.articledId)

    }
    data.upusercommentId = ''
    data.placeholderText = ''
    data.quoteComment = ''
    setTimeout(() => {
        data.placeholderText = '赶快加入评论吧~'
        data.textMsg = ''
    }, 500)
}

// 发文章评论
const topostreview = (content:string) => {
    postChatreview({
        articleId: data.articledId,
        content: ` ${content}`,
        isAuthor: 0,
        utcCreated: Date.now()
    }).then(() => {
        getdetail(data.articledId)
        getcommentList(data.articledId)

        data.navList[0].number++

        bcNotify.value.show('评论成功')

    }).catch((res:any) => {
        sonbcNotify.value.error(res.message)
    })
}

// 回复评论
const topostrecover = (commentId:string, replyId:string, replyUser:string , quoteComment:string, content:string, replyUserId:string) => {
    console.log('replyUserId',replyUserId);
    
    postchatrecover({
        commentId,
        replyId,
        replyUser: replyUser || null,
        replyUserId,
        quoteComment: quoteComment || null,
        content: ` ${content}`,
        articleId: data.articledId,
        utcCreated: Date.now(),
        isAuthor: 0
    }).then(() => {

        getdetail(data.articledId)
        getcommentList(data.articledId)
        getcommentRelyList(data.commentId)
		sonbcNotify.value.show('回复成功')
    }).catch((res:any) => {
        sonbcNotify.value.error(res.message)
    })
}

// 展开更多评论
const showComment = (item:any) => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    data.show = true

    data.upusercommentId = item.commentId
    data.userId = item.userId
    data.quoteComment = item.comment
    data.commentId = item.commentId

    console.log('data.userId',data.userId);
    

    data.lastcomment = item.commentId

    data.soncommentObj = {
        id: item.commentId,
        userName: item.userName,
        userThumb: item.userThumb,
        comment: item.comment,
        cntStep: item.cntStep,
        cntLike: item.cntLike,
        isUser: item.isUser,
        isPostmaster: item.isPostmaster,
        isAuthor: item.isAuthor,
        utcCreated: item.utcCreated,
        isLike: item.isLike,
        isStep: item.isStep
    }

    getcommentRelyList(item.commentId)
    
}

// 获取回复列表
const getcommentRelyList = (commentId:string) => {
    chatcommentRelyList({
        query: {
            commentId
        },
        pageNumber: 1,
        pageSize: 100
    }).then((res:any) => {
        data.Soncomment = res.data
    })
}

// 展开更多评论之后的引用回复拉起键盘
const sonQuotereply = (item:any) => {

    data.showtextbtn = true

    data.isQuotereply = true
    data.isshowReply = true


    data.placeholderText = '@' + item.userName
    data.upusercommentId = item.commentId
    data.userId = item.userId
    data.quoteComment = item.comment

}

const changelike = (id:any,islike:number, isComment:number,) => {
    if (islike) {
        unchatCommentLike({
            id,
            likeType:1,
            isComment
        }).then(()=>{
            if (isComment == 1) {
                getcommentList(data.articledId)
            }else{
                getcommentRelyList(data.commentId)
            }
        })
    }else{
        chatCommentLike({
            id,
            likeType:1,
            isComment
        }).then(()=>{
            if (isComment == 1) {
                getcommentList(data.articledId)
            }else{
                getcommentRelyList(data.commentId)
            }
        })
    }
    
}

// 删除评论
const todeleteComment = (id:string, isComment:number) => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    deletechatComment({
        id,
        isComment
    }).then(() => {
        if (isComment) {
            getcommentList(data.articledId)
            closeAction()
        }else{
            getcommentRelyList(data.commentId)
        }

        data.navList[0].number--

        bcNotify.value.show('评论删除')

        
    })
}

// 收起更多评论
const closeAction = () => {
    data.show = false
    data.isshowReply = false
    data.isQuotereply = false
    data.Soncomment = []
    setTimeout(() => {
        data.soncommentObj = {}
    }, 500)
}


const changeList = (item:any) => {
    data.navId = item.id;
    if (data.navId == 1) {
        getcommentList(data.articledId)   
    }else if (data.navId == 2){
        getlikeList(data.articledId)
    }else if (data.navId == 3){
        favoriteList(data.articledId)
    }
}

let timer = ref<any>(null)
const startTime = (item:any,commentType:number) => {
    timer.value = setTimeout(()=>{
        console.log('长按事件触发');
        data.showTouch = true
        data.touchTitle = `@${item.userName}: ${item.comment}`
        if (item.isUser == 1) {
            data.showItemdel = true
        }else{
            data.showItemdel = false
        }
        data.storageItem = item

        if (commentType) {
            data.isTopcomment = true
        }else{
            data.isTopcomment = false
        }

    },1000)

}
const endTime = () => {
    clearTimeout(timer.value)
}

const touchReply = () => {
    showComment(data.storageItem)
    data.showTouch = false
}

const TouchbcNotify = ref()
const touchCopy = () =>{
    uni.setClipboardData({
        data: data.storageItem.comment,
        showToast: false,
        success: () => {
            uni.hideToast()
            TouchbcNotify.value.show('复制成功')
        }
    })
}

const touchDelbtn = () => {
    if (data.isTopcomment) {
        console.log('顶部评论删除');
        todeleteComment(data.storageItem.commentId,1)
    }else{
        console.log('不是顶部评论');
        todeleteComment(data.storageItem.commentId,0)
    }
    cancelPopup()
}

const cancelPopup = () => {
    data.storageItem = {}
    data.showTouch = false
}

// 图片预览
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}


const sharRetransmission = () => {
    retransmission({ articleId: data.articledId }).then(()=>{})
}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.chatDetail.cover,
        title: data.chatDetail.title,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/Create/pages/likechat/chatDetail?id=${data.chatDetail.id}`, //点击链接进入的页面
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
    console.log('小程序分享');
    sharRetransmission()
    return {
        title: data.chatDetail.title,
        imageUrl : data.chatDetail.cover,
        desc : data.chatDetail.desc,
        path: `/Create/pages/likechat/chatDetail?id=${data.chatDetail.id}`,
    }
})
//#endif


const shareBox = ref();
const share = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    data.status = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}
const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.chatDetail.cover)
    // 二维码链接图片
    let qrimg =  await getQrcode(`/Create/pages/likechat/chatDetail?id=${data.chatDetail.id}`).then((img:any)=>{
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.chatDetail.accountThumb)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.chatDetail.title//标题
    let accountName = data.chatDetail.accountName//作者，店铺名

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
                    sharRetransmission()
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


defineExpose({
    closeShare,
})


</script>
  
<style lang="scss" scoped>
.posts_author{
    padding: 8rpx 40rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .posts_author_left{
        display: flex;
        align-items: center;
    }
    .posts_author_right{
        .btn{
            width: 120rpx;
            height: 56rpx;
            border-radius: 28rpx;
            text-align: center;
            line-height: 56rpx;
            font-size: 24rpx;
            font-weight: 500;
            &.follow_btn{
                border: 2rpx solid #EA3E1A;
                color: #EA3E1A; 
            }
            &.is_fans_btn{
                border: 2rpx solid #CCCCCC;
                color: #333333;
            }
        }
    }
    .author_img{
        width: 72rpx;
        height: 72rpx;
        border-radius: 50%;
        margin-right: 16rpx;
    }
    .author_text{
        .author_name{
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
        }
        .up_time{
            color: #999999;
            font-size: 24rpx;
            font-weight: 400;
        }
    }
}
.posts_content{
    background: #fff;
    .salon_posts_title{
        color: #333333;
        font-size: 38rpx;
        font-weight: 500;
        padding: 30rpx;
        box-sizing: border-box;
    }
    .swiper_box{
        width: 100%;
        height: 750rpx;
        position: relative;
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
    .text_content{
        padding: 40rpx 30rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: #333333;
        font-weight: 400;
        line-height: 52rpx;
    }
    .location{
        padding: 40rpx 30rpx;
        padding-bottom: 30rpx;
        padding-top: 0rpx;
        box-sizing: border-box;
        .location_box{
        
            width: 100%;
            padding: 12rpx;
            box-sizing: border-box;
            background: #F6F6F6;
            border-radius: 8rpx;
            display: flex;
            align-items: center;
            .location_text{
                margin-left: 8rpx;
                color: #666666;
                font-size: 24rpx;
                width: 88%;
                white-space: nowrap; /*强制一行内显示*/
                overflow: hidden;/*溢出隐藏*/
                text-overflow: ellipsis;/*超出部分现实省略号*/
            }
        }
    }
}
.spage_box{
    width: 100%;
    height: 20rpx;
    background: #F8F8F8;
}
.comment_box{
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    &.is_fixed{
        position: fixed;
    }
    .comment_content{
        padding: 30rpx;
        box-sizing: border-box;
        min-height: 1000rpx;

        .comment_item{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            margin-bottom: 30rpx;
            &.not_bottom{
                border-bottom: none;
                padding-bottom: 0rpx;
                margin-bottom: 0rpx;
            }
            .comment_left{
                display: flex;
                flex: 1;
                .comment_img{
                    width: 56rpx;
                    height: 56rpx;
                    border-radius: 50%;
                    margin-right: 16rpx;
                }
                .comment_text{
                    flex: 1;
                    padding-top: 8rpx;
                    .comment_name_box{
                        margin-bottom: 12rpx;
                        display: flex;
                        align-items: center;
                        .comment_name{
                            font-size: 28rpx;
                            font-weight: 400;
                            color: #999999;
                            margin-right: 12rpx;
                        }
                        .comment_tag{
                            padding: 4rpx 16rpx;
                            box-sizing: border-box;
                            border-radius: 20rpx;
                            font-weight: 400;
                            font-size: 22rpx;
                            background: #EBF9F1;
                            color: #29C86F;
                            margin: 0rpx 10rpx;

                        }
                    }
                    .quote_comment{
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
                    .comment_content_text{
                        color: #333333;
                        font-size: 28rpx;
                        font-weight: 400;
                        margin-bottom: 12rpx;
                    }
                    .comment_time{
                        display: flex;
                        align-items: center;
                        margin-bottom: 20rpx;
                        .time{
                            font-size: 24rpx;
                            color: #999999;
                            margin-right: 20rpx;
                        }
                        .reply{
                            font-size: 24rpx;
                            color: #666666;
                        }
                    }
                    .more_comment_box{
                        display: flex;
                        align-items: center;
                        .left_border{
                            width: 52rpx;
                            height: 2rpx;
                            background: #DDDDDD;
                            margin-right: 20rpx;
                        }
                        .more_comment_text{
                            font-size: 24rpx;
                            color: #666666;
                        }
                    }
                }
            }
            .comment_right{
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                .like_img{
                    width: 32rpx;
                    height: 32rpx;
                    margin-bottom: 4rpx;
                }
                .like_number{
                    color: #999999;
                    font-size: 24rpx;
                    font-weight: 300;
                }
            }
        }
    }
    .tile_list{
        padding: 30rpx;
        box-sizing: border-box;
        min-height: 1000rpx;
        .tile_item{
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;
            .tile_img{
                width: 56rpx;
                height: 56rpx;
                border-radius: 50%;
                margin-right: 16rpx;
            }
            .tile_name{
                font-size: 28rpx;
                color: #666666;
                margin-right: 16rpx;
            }
            .tile_time{
                color: #999999;
                font-size: 24rpx;
            }
        }
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
            width: 446rpx;
            height: 74rpx;
            background: #F5F5F5;
            border-radius: 38rpx;
            padding: 16rpx 32rpx;
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
            padding: 20rpx 32rpx;
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
        margin-left: 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        .icon_item{
            margin-right: 30rpx;
            .icon_img{
                width: 48rpx;
                height: 48rpx;
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
.comment_box_top{
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    border: 2rpx solid #F2F2F2;
    .nav_box{
        display: flex;
        align-items: center;
        .nav_item{
            position: relative;
            margin-right: 60rpx;
            height: 100%;
            
            .nav_text{
                font-size: 28rpx;
                color: #666666;
                font-weight: 400;
                &.is_nav{
                    color: #333333;
                }
            }
            .nav_bottom{
                position: absolute;
                height: 6rpx;
                width: 32rpx;                
                background: #EA3E1A;
                border-radius: 4rpx;
                bottom: -26rpx;
                left: 50%;
                transform: translate(-50%, 0);
            }
        }
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
.touch_box{
    width: 100%;
    background: #fff;
    .touch_top_box{
        .touch_title{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            color: #999999;
            font-size: 24rpx;
            font-weight: 400;
        }
        .touch_item{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
            &.del_btn{
                color: #EA3E1A;
            }
        }
        
    }
    .touch_bottom_box{
        .bottom_spage{
            width: 100%;
            height: 20rpx;
            background: #F8F8F8;
        }
        .out_touch_btn{
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;
        }
    }
}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}
</style>
 
