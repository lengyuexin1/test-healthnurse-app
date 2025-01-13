<template>
    <view class="container">
        <z-paging
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
        >
            <view class="pageGoback_icon" @click="goback">
                <TnIcon name="left" color="#fff" size="38" :bold="true"/>
            </view>
            <view class="video_swiper_box" :style="'height:'+ data.screenHeight +'px'">
                <swiper 
                    class="swiper" 
                    :autoplay="false" 
                    :vertical="true" 
                    :current="data.swiperCurrent"
                    :disable-touch="data.istouch"
                    @change="changeVideoSwiper"
                    >
                    <swiper-item 
                        class="swiper_item"
                        v-for="(item, index) in data.videos" :key="item"
                    >
                    <view class="video_box" v-show="!data.show && !data.showDescPopup">
                            <!-- #ifdef MP-WEIXIN -->
                            <!-- data.showcontrols -->
                            <video 
                            :id="'videoView' + index"
                            :src="data.videoDetail.videoUrl"
                            :show-fullscreen-btn="false"
                            :loop="true"
                            :title="data.videoDetail.title"
                            :controls="true"
                            :show-center-play-btn="false"
                            object-fit='contain'
                            @click="clickVideo"
                            @play="play"
                            @pause="pause"
                            @fullscreenchange="fullscreenchange"
                            @timeupdate="videoTime"
                            :danmu-list="data.danmuList"

                            ></video>
                            <!-- #endif -->

                            <!-- #ifdef APP-PLUS || H5 -->
                            <!-- data.showcontrols -->
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

                            

                            <view class="full_screen_btn">
                                <image
                                    class="full_screen_icon"
                                    :src="getAssetsUrl('/leyou/video/full-screen-icon.svg')"
                                    mode="scaleToFill"
                                />
                                <view class="full_screen_text" @click="toFullscreen">全屏观看</view>
                            </view>
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
                        
                        <view class="fixed_box">
                            <view class="author_box" @click="tofollow">
                                <image
                                    class="author_img"
                                    :src="data.videoDetail.accountThumb"
                                    mode="scaleToFill"
                                />
                                <image
                                    v-if="!data.videoDetail.isUser"
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
                            <view class="course_title">{{ data.videoDetail.title }}</view>
                            <view class="course_author">{{ data.videoDetail.accountName }}</view>
                            <view class="course_dace" v-if="data.videoDetail.desc">
                                <template v-if="props.videoPagetype == 3" >
                                    <text 
                                        class="tagtext" 
                                        v-for="(Tagitem,index) in data.videoDetail.tagNames" 
                                        :key="index"
                                    >
                                        #{{ Tagitem }}
                                    </text>
                                </template>
                                
                                <text>{{ coursedesc(data.videoDetail.desc) }}</text>
                                <text class="show_dace_btn" @click="data.showDescPopup = true">展开</text>
                            </view>

                            <view class="location" v-if="data.videoDetail.address">
                                <view class="location_box">
                                    <view class="location_icon">
                                        <TnIcon name="location" color="#C8C8C8" size="36rpx"/>
                                    </view>
                                    <view class="location_text">
                                        <!-- {{ '广佛高速公路有限公司' }} | {{ '金沙街道钟村康园路161号' }} -->
                                        {{ data.videoDetail.address }}
                                    </view>
                                </view>
                            </view>

                        </view>

                        <view class="video_bottomInfo">
                            <view class="course_page_bottom">
                                <view class="course_text">
                                    尊重原创，严禁转载
                                </view>
                                <view v-if="props.videoPagetype == 1" class="bulletchat_box" :class="{ 'is_open' : !data.showBarrage }" @click="changeBarrage">
                                    <view class="open_btn" v-if="data.showBarrage">
                                        <text>开</text>
                                    </view>
                                    <view class="bulletchat_text">弹幕</view>
                                    <view class="shut_btn" v-if="!data.showBarrage">
                                        <text>关</text>
                                    </view>
                                </view>
                                <view v-else></view>
                            </view>
                        </view>

                        

                    </swiper-item>
                </swiper>

            </view>

            <!-- 视频评论弹窗 -->
            <TnPopup v-model="data.show" open-direction="bottom" @close="close">
                <view class="comment_box">
                    <view class="comment_top">
                        <view></view>
                        <view class="comment_number">{{ Number(data.total) ? (data.total+' 条评论') : '暂无评论' }}</view>
                        <view @click="data.show = false">
                            <TnIcon name="close" color="#333333" size="38" :bold="true"/>
                        </view>
                    </view>
                    <view class="comment_content" >
                        <view class="comment_item" v-for="item in data.commentList" :key="item.id">
                            <view class="comment_left">
                                <image
                                    class="comment_img"
                                    :src="item.userThumb"
                                    mode="scaleToFill"
                                />
                                <view class="comment_text" @touchstart="startTime(item,1)" @touchend="endTime">
                                    <view class="comment_name_box">
                                        <view class="comment_name">{{ item.userName }}</view>
                                        <view class="comment_tag" v-if="item.isuser == 1">作者</view>
                                    </view>
                                    <view class="comment_content_text">
                                        {{ item.comment }}
                                    </view>
                                    <view class="comment_time">
                                        <view class="time">{{ formatTime(item.utcCreated) }} · 广州</view>
                                        <view class="reply" @click.stop="showMoreComment(item)">回复</view>
                                        <view class="del_text" v-if="item.isUser == 1" @click="todeleteComment(item.commentId,1)">删除</view>
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
                                                    <view class="comment_tag" v-if="sonitem.isuser == 1">作者</view>
                                                </view>
                                                <view class="quote_comment" v-if="sonitem.quoteComment && sonitem.quoteComment != ''">
                                                    {{ `@${sonitem.replyUser}:` + sonitem.quoteComment }}
                                                </view>
                                                <view class="comment_content_text">
                                                    {{ sonitem.comment }}
                                                </view>
                                                <view class="comment_time">
                                                    <view class="time">{{ formatTime(sonitem.utcCreated) }} · 广州</view>
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



                                    <view class="more_comment_box" v-if="item.cntReply > 0" @click.stop="showMoreComment(item)">
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
                    <BCNotify ref="sonbcNotify"></BCNotify>
                    <!-- v-if="data.show" -->
                    <view class="bottom_inp_box" v-if="data.show">
                        <emojiItem @upEmojiItem="upEmojiItem"></emojiItem>

                        <!-- v-if="!data.showtextbtn" -->
                        <view v-if="!data.showtextbtn" class="bottom_inp" @click="showtextarea">
                            善语结善缘，恶言伤人心~~
                        </view>
                        <view 
                            v-else
                            class="textarea_box"
                            >
                            <view class="bottom_text_box">
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
                                    :placeholder="data.placeholderText"
                                ></textarea>
                                <!-- v-if="data.showtextbtn" -->
                                <!-- <image
                                    v-if="!data.showtextbtn"
                                    class="inp_icon"
                                    :src="getAssetsUrl('/leyou/create/emoji_icon.svg')"
                                    mode="scaleToFill"
                                    @click.stop="showEmoBox"
                                /> -->
                            </view>
                            <view class="send_btn" @click="pushcomment">发送</view>
                        </view>

                        <view class="ct_emoji_Box" :class="{ 'hidden_box' : data.hiddenEmojiBox }">
                            <shinnXEmoji :show="true" @change="changeEmoji"></shinnXEmoji>
                        </view>
                        
                        <view class="bottom_space" v-if="data.keyboardH == 0" ></view>
                        <view class="bottom_space" v-else :style="{ 'height': data.keyboardH  + 'px' }"></view>
                    </view>
                </view>
            </TnPopup>


            <!-- 评论回复弹窗 -->
            <TnPopup v-model="data.showSonPopup" open-direction="bottom" >
                <view class="action_box" >
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
                            >
                                <image
                                    class="son_comment_thumb"
                                    :src="item.userThumb"
                                    mode="scaleToFill"
                                />
                                <view class="son_comment_text_box" @touchstart="startTime(item,0)" @touchend="endTime">
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
                    <view class="bottom_inp_box" v-if="data.showSonPopup">
                        <emojiItem @upEmojiItem="upEmojiItem"></emojiItem>

                        <!-- v-if="!data.showtextbtn" -->
                        <view v-if="!data.showtextbtn" class="bottom_inp" @click="showtextarea">
                            善语结善缘，恶言伤人心~~
                        </view>
                        <view 
                            v-else
                            class="textarea_box"
                            >
                            <view class="bottom_text_box">
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
                                    :placeholder="data.placeholderText"
                                ></textarea>
                                <!-- v-if="data.showtextbtn" -->
                                <!-- <image
                                    v-if="!data.showtextbtn"
                                    class="inp_icon"
                                    :src="getAssetsUrl('/leyou/create/emoji_icon.svg')"
                                    mode="scaleToFill"
                                    @click.stop="showEmoBox"
                                /> -->
                            </view>
                            <view class="send_btn" @click="pushcomment">发送</view>
                        </view>

                        <view class="ct_emoji_Box" :class="{ 'hidden_box' : data.hiddenEmojiBox }">
                            <shinnXEmoji :show="true" @change="changeEmoji"></shinnXEmoji>
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
                                <view class="top_box">
                                    <view class="top_title">{{ data.videoDetail.title }}</view>
                                    <view class="top_name">作者:{{ data.videoDetail.accountName }}</view>
                                </view>
                                <view class="tag_box" v-if="props.videoPagetype == 3">
                                    <view class="tag_item" v-for="(tagItem,index) in data.videoDetail.tagNames" :key="index">#{{ tagItem }}</view>
                                </view>
                            </view>
                        </view>
                        <view class="desc_box">
                            <view class="desc_title">视频简介</view>
                            <view class="desc_content">{{ data.videoDetail.desc }}</view>
                        </view>
                    </view>
                </view>

                
            </TnPopup>


            <TnPopup v-model="data.showTouch" open-direction="bottom" :zIndex="40080" radius="32" @close="cancelPopup">
                <view class="touch_box">
                    <view class="touch_top_box">
                        <view class="touch_title">{{ data.touchTitle }}</view>
                        <view class="touch_item" @click="touchCopy">
                            复制
                        </view>
                        <view class="touch_item del_btn" @click="touchDelbtn" v-if="data.showItemdel">
                            删除
                        </view>
                        <view class="touch_item" @click="toReportPage" v-else>
                            举报
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

	    <BCNotify ref="bcNotify"></BCNotify>

        <shareView 
        ref="shareBox" 
        @reportFun="reportFun" 
        @sharePage="sharePage" 
        @sharePoster="sharePoster" 
        :status="data.status" 
        :imgUrl="data.shareimgUrl"
        :showReport="data.videoDetail.isUser == 1 ? false : true"

        ></shareView>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>


    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance, nextTick } from 'vue'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import shareView from '@/pagesCnt/components/shareorreportView/shareorreportView.vue'


import { gotoIndex, gotoLogin } from "@/routes/public-routes"
import BCNotify from '@/components/notify/index.vue'

// #ifdef APP-PLUS || H5
import DomVideoPlayer from '@/pagesCnt/components/DomVideoPlayer/DomVideoPlayer.vue'
// #endif

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'

import { 
    contentShareDetails,
    articleaddView,
    viewTime,
    retransmission,
    
    unCommentLike,
    commentLike,

    getnewContentDetail,
    getnewcommentList,
    getnewcommentRelyList,
    postnewrecover,
    postnewreview,
    deletenewComment,
    newfavorite,
    unnewFavorite,
    getnewLike,
    unnewLike,
    unnewfollow,
    newfollow,
    createVideoList,
    chatList,
    escontentlist,
} from '@/api/create-api'

import { agoTime } from '@/common/formatTime'

import { gotoCollectLists } from "@/routes/user-routes"
import { drawBGIMG } from '@/libs/canvas-tools'
import { getQrcode } from "@/api/user-api"
import { PlatformManage } from "@bc/sys"
import { gotoServiceStore } from '@/routes/service-routes'

import { nearbyList } from "@/api/user-api"
import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'
import { gotoReportPage } from '@/routes/create-routes'

import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'
import emojiItem from '@/pagesCnt/components/emojiItem/emojiItem.vue'

interface Props {
    videoId:string,
    videoPagetype:number,
}
const props = defineProps<Props>()


interface Data{
    dataList:any,
    screenHeight:number,
    getpageTopH:number,
    videoIndex:number,
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
    overlayHeight:number,
    keyboardH:number,
    iskeyboard:boolean,
    textMsg:string,
    showtextbtn:boolean,

    videos:string[],
    pageNumber:number,
    pageSize: number,
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

    upusercommentId: string,
    commentId: string,
    userId: string,
    quoteComment:string,
    lastcomment: string,
    soncommentObj: any,
    showSonPopup: boolean,

    isshowReply: boolean,
    isQuotereply: boolean,
    Soncomment: any,
    placeholderText:string,
    isNeedlogin: boolean,

    shopReviewsList: any,

    upCommentTime: number,
    bulletChatList: any,
    showBarrage: boolean,
    danmuList: any,
    videoWidth: number,
    videoHeight: number,  
    showTouch: boolean
    storageItem: any
    showItemdel:boolean
    touchTitle: string
    isTopcomment: boolean
    showBottom:boolean
    hiddenEmojiBox: boolean

}
const data = reactive<Data>({
    dataList:[],
    screenHeight: 700,
    getpageTopH:84,
    videoIndex:0,
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
    overlayHeight:0,
    keyboardH:0,
    iskeyboard:false,
    textMsg:'',
    showtextbtn:false,

    videos:[],
    pageNumber:1,
    pageSize: 10,
    
    videoDetail:{},//视频详情

    commentList:[],
    total:0,

    showOverlay:false,

    detailObj:{},
    showDescBtn:false,
    showDescPopup:false,
    isPlay:false,
    isFull:false,
    showcontrols:true,

    status:1,
    shareimgUrl:'',
    startlooktime: 0,

    upusercommentId: '',
    commentId: '',
    userId: '',
    quoteComment: '',
    lastcomment: '',
    soncommentObj: {},
    showSonPopup: false,

    isshowReply: false,
    isQuotereply: false,
    Soncomment: [],
    placeholderText: '说点什么吧~',
    isNeedlogin: false,

    shopReviewsList:{},

    upCommentTime: 0,
    bulletChatList: [],
    showBarrage: true,
    danmuList: [],

    videoWidth: 0,
    videoHeight: 0,  
    showTouch: false,
    storageItem: {},
    showItemdel:true,
    touchTitle:"",
    isTopcomment: true,
    showBottom:true,
    hiddenEmojiBox: true,

})

// #ifdef APP-PLUS || H5
const domVideoPlayer = ref() as any
// #endif
onMounted(() => {

    // #ifdef APP-PLUS || H5
    console.log('domVideoPlayer',domVideoPlayer);
    

    // setTimeout(() => {
    //     const currRef = domVideoPlayer.value
    //     currRef && currRef.play()
    // }, 500)

    // #endif
    
    getpageTop()

    videoDetail(props.videoId);
    articleaddView({articleId:props.videoId}).then(()=>{})

    data.startlooktime = new Date().getTime();

    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        data.isNeedlogin = isRequireLogin
    })

    console.log('props.videoPagetype',props.videoPagetype);

    data.videos.unshift(props.videoId)
    getVideos()
    
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

// 获取顶部高度以及计算页面高度
const getpageTop = () => {  

    const winInfo = uni.getSystemInfoSync();
    data.videoWidth = winInfo.windowWidth; // 设备宽度
    data.videoHeight = winInfo.windowHeight; // 设备高度
    data.screenHeight = winInfo.windowHeight; // 设备高度

    // setTimeout(()=>{
    //     query.select( '#pageTop' ).boundingClientRect((view:any) => { //目标位置的节点：类class或者id
    //         data.getpageTopH = view.height
    //         data.screenHeight = (data.videoHeight - data.getpageTopH)

    //         console.log('data.getpageTopH',data.getpageTopH);
    //         console.log('data.screenHeight',data.screenHeight);            

    //     }).exec()
    // },800)
}


const paging = ref()
const queryList = (pageNumber:number, pageSize:number) => {
    data.pageNumber = pageNumber
    if (data.pageNumber == 1) {
        videoDetail(props.videoId);
        return
    }
}

const getVideos = () => {
    if (props.videoPagetype == 0) {
        console.log('康养百科视频列表');
        escontentlist({
            pageNumber: data.pageNumber,
            pageSize: 6,
            query: {
                categoryIds: [9],
                sortType: null,
                type: 2,
            }
        }).then((res:any) => {
            handleVideos(res.data)
            
        })
    }
    if (props.videoPagetype == 1) {
        console.log('聊天视频列表');
        chatList({
            pageNumber: data.pageNumber,
            pageSize: 6,
            query: {
                type: 2,
                sortType: 7,
                accountIds: []
            }
        }).then((res:any) => {
            handleVideos(res.data)

        })
    }
    if (props.videoPagetype == 2) {
        console.log('发现、附近视频列表');
        nearbyList({
            pageNumber: data.pageNumber,
            pageSize: 10,
            query: {
                type: 2
            }
        }).then((res:any) => {
            handleVideos(res.data)
        })
    }
    if (props.videoPagetype == 3) {
        console.log('创作短片视频列表');
        createVideoList({
            pageNumber: data.pageNumber,
            pageSize: 6,
            query: {name: null}
        }).then((res:any) => {
            console.log('videosres',res.data);

            handleVideos(res.data)

            // data.videos = res.data.map((item:any) => {
            //     return item.id
            // })

            // data.videos.unshift(props.videoId)

        })
    }
}

// 处理视频列表id
const handleVideos = (list:any) => {
    let videosList = list.map((item:any) => {
        return item.id
    })

    data.videos = [
        ...data.videos,
        ...videosList
    ]

    data.videos = data.videos.filter((value, index, self) => self.indexOf(value) === index)

    console.log('获取到并处理data.videos',data.videos);
    

}

const changeVideoSwiper = (e:any) => {

    // #ifdef MP-WEIXIN

    // 上一个视频
    const firstVideo = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance);
    firstVideo.pause();

    data.swiperCurrent = e.detail.current;
    // 下一个视频

    videoDetail(data.videos[data.swiperCurrent]);
    
    const secondVideo = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance);
    secondVideo.play();
    
    // #endif

    // #ifdef APP-PLUS || H5
    // app视频ref
    const appFirstVideo = domVideoPlayer.value[data.swiperCurrent]
    appFirstVideo.pause();
    
    data.swiperCurrent = e.detail.current;

    videoDetail(data.videos[data.swiperCurrent]);

    const appSecondVideo = domVideoPlayer.value[data.swiperCurrent]
    appSecondVideo.play();

    console.log('domVideoPlayer',domVideoPlayer);
    console.log('data.swiperCurrent',data.swiperCurrent);

    // #endif

    if((data.swiperCurrent + 1) == data.videos.length){
        data.pageNumber = data.pageNumber + 1
        getVideos()
        console.log('继续获取');
    }


    console.log('data.videos',data.videos);
}


const showRefresh = () => {
    (paging.value as any).reload();
}
const postviewTime = () => {
    const endlooktime = new Date().getTime()
    const time = (endlooktime - data.startlooktime) / 1000
    
    viewTime({
        viewTime: time,
        articleId: props.videoId
    }).then(() => {
        console.log('记录了时间')
    })
}

const emit = defineEmits(["saveShareObj"])

const bcNotify = ref()

const tologin = () => {
    bcNotify.value.show('请先登录')
    setTimeout(()=>{
        gotoLogin({})
    },1000)
}

// 视频详情
const videoDetail = (contentId:string) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            contentShareDetails({
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
            return
        }

        getnewContentDetail({
            id: contentId
        }).then((res : any)=>{
            handleObj(res)
        }).catch((error:any)=>{
            console.log('error',error);
            bcNotify.value.error('视频不存在')
            setTimeout(()=>{
                uni.navigateBack()
            },2000)
        })

    })
}

const handleObj = (res:any) => {
    data.videoDetail = res;

    if (data.videoDetail.status == 4) {
	    bcNotify.value.error('视频已下架')
        setTimeout(() => {
            goback()
        }, 2000);
        return
    }
    

    // 
    data.videoDetail.cntLike = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntComment = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntCollect = Math.floor(Math.random() * 900) + 100;
    data.videoDetail.cntRetransmission = Math.floor(Math.random() * 900) + 100;
    // 

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

    initVideo()
    // 预览上报
    distinguishPreview(data.videoDetail.tagIds[0])
    
}

const initVideo = () =>{
    setTimeout(()=>{
        let videoView = null

        // #ifdef MP-WEIXIN
        videoView = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
        // #endif

        // #ifdef APP-PLUS || H5
        videoView = domVideoPlayer.value[data.swiperCurrent]
        
        // #endif


        videoView.play()
    },800)
}

const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }
    uni.navigateBack()
}

const toFullscreen = () => {
    // #ifdef MP-WEIXIN
    const fullvideo = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
    fullvideo.requestFullScreen()
    
    // #endif


    // #ifdef APP-PLUS || H5
    const appFullVideo = domVideoPlayer.value[data.swiperCurrent]
    appFullVideo.fullScreen()

    // #endif

    data.showcontrols = true


}


// 视频每秒事件
const videoTime = (e: any) => {
    let duration = 0

    // #ifdef MP-WEIXIN
    data.upCommentTime = e.detail.currentTime
    duration = e.detail.duration

    // #endif


    // #ifdef APP-PLUS || H5
    data.upCommentTime = e.currentTime
    duration = e.duration

    // #endif




    // console.log('data.upCommentTime',data.upCommentTime);
    
    if (Math.floor(data.upCommentTime) == 1) {
        Debounce(()=>{
            console.log('视频播放发送上报');

            
            videoPlayDistinguish(data.videoDetail.tagIds[0])
            // createCollectAndReport().videoPlayReport()
        }, 100)
    }
    if (Math.floor(data.upCommentTime) == Math.floor(duration * 0.98)) {
        Debounce(()=>{
            console.log('视频完播发送上报');

            
            videoOverPlayDistinguish(data.videoDetail.tagIds[0])
            // createCollectAndReport().videoPlayOverReport()

        }, 100)
    }

    for (let i = 0; i < data.bulletChatList.length; i++) {
        if (Math.trunc(data.upCommentTime) == data.bulletChatList[i].scrollingTime) {
            console.log('匹配发送弹幕',data.bulletChatList[i]);
            if (data.showBarrage) {
                console.log('发送弹幕');
                const videoView = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
                videoView.sendDanmu({
                    text: data.bulletChatList[i].comment,
                    color: '#fff',
                });
            }
            data.bulletChatList.splice(i, 1);
            i--; 
            break
        }
    }




    

}

// 视频点赞
const tolike = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (!data.videoDetail.accountId) {
        return
    }
    if (data.videoDetail.status == 4) {
        return
    }

    if (data.videoDetail.isLike == 0) {
        getnewLike({
            articleId:data.videoDetail.id,
            happyType: 98,

        }).then(() => {
            data.videoDetail.isLike ++
            data.videoDetail.cntLike ++

            if (props.videoPagetype == 1) {
                const likeChatItem = uni.getStorageSync('likeChatItem')
                uni.setStorageSync('likeChatItem',{
                    index: likeChatItem.index,
                    direction: likeChatItem.direction,
                    toload: true,
                    add: true,
                    reduce: false,
                })
            }

        }) 
        
        return
    }
    unnewLike({
        articleIds: [data.videoDetail.id],
        happyType: 98,

    }).then(() => {
        data.videoDetail.isLike --
        data.videoDetail.cntLike --
    }) 
    
}

// 视频收藏
const tocollection = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (!data.videoDetail.accountId) {
        return
    }
    if (data.videoDetail.status == 4) {
        return
    }
    if (data.videoDetail.isFavorite == 0) {
        newfavorite({
            articleId:data.videoDetail.id,
            happyType: 98,

        }).then(() => {
            data.videoDetail.isFavorite ++ 
            data.videoDetail.cntCollect ++ 
            data.showOverlay = true;
            
            setTimeout(()=>{
                data.showOverlay = false
            },2000)
        }) 
        return
    }
    unnewFavorite({
        articleId: [data.videoDetail.id],
        happyType: 98,

    }).then(() => {
        data.videoDetail.isFavorite --
        data.videoDetail.cntCollect --
    })
}

// 课程关注
const tofollow = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (data.videoDetail.isUser == 1) {
        return
    }

    if (!data.videoDetail.accountId) {
        return
    }

    if (data.videoDetail.status == 4) {
        return
    }

    if (data.videoDetail.isFans == 0) {
        newfollow({
            accountId:data.videoDetail.accountId,
            happyType: 98,

        }).then(() => {
            data.videoDetail.isFans ++
        }).catch((error:any)=>{
            bcNotify.value.error(error.message)
        })

        return
    }
    unnewfollow({
        accountId:data.videoDetail.accountId,
        happyType: 98,

    }).then(() => {
        data.videoDetail.isFans --
    }).catch((error:any)=>{
        bcNotify.value.error(error.message)
    })
    
}


// 频道评论
const contentcommentList = () => {
    getnewcommentList({
        pageNumber:1,
        pageSize:200,
        query:{
            articleId:data.videoDetail.id,
            happyType: 98,
        }
    }).then((res:any)=>{
        data.commentList = res.data
        data.total = res.total
    })
}

const getcommentRelyList = (commentId:string) => {
    getnewcommentRelyList({
        query: {
            commentId,
            happyType: 98,
        },
        pageNumber: 1,
        pageSize: 100
    }).then((res:any) => {
        data.Soncomment = res.data
    })
    
}

// 发内容评论
const pushcomment = () => {

    if (data.textMsg == '') {
		bcNotify.value.error('请输入评论')
        return
    }
    data.upusercommentId = data.upusercommentId == '' ? data.lastcomment : data.upusercommentId

    if (data.showSonPopup && !data.isshowReply) {

        console.log('回复列表的回复', data.showSonPopup, !data.isshowReply)
        topostrecover(data.commentId, data.commentId, '', '', data.textMsg,data.userId)

    }
    else if (data.showSonPopup && data.isshowReply) {

        console.log('展开评论弹窗引用回复', data.showSonPopup, data.isshowReply)
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
    console.log('发送文章的评论', props.videoId)

    }
    data.upusercommentId = ''
    data.placeholderText = ''
    data.quoteComment = ''
    setTimeout(() => {
        data.placeholderText = '赶快加入评论吧~'
        data.textMsg = ''
    }, 500)

}

const sonbcNotify = ref()

// 回复评论
const topostrecover = (commentId:string, replyId:string, replyUser:string , quoteComment:string, content:string, replyUserId:string) => {
    postnewrecover({
        commentId,
        replyId,
        replyUser: replyUser || null,
        replyUserId,
        quoteComment: quoteComment || null,
        content: ` ${content}`,
        articleId: data.videoDetail.id,
        utcCreated: Date.now(),
        isAuthor: 0,
        happyType: 98,
    }).then(() => {
        contentcommentList()
        getcommentRelyList(data.commentId)
		sonbcNotify.value.show('回复成功')
    }).catch((res:any) => {
        sonbcNotify.value.error(res.message)
    })

}

// 发文章评论
const topostreview = (content:string) => {
    postnewreview({
        articleId:data.videoDetail.id,
        content,
        isAuthor: 0,
        utcCreated: Date.now(),
        happyType: 98,
    }).then(()=>{
        data.videoDetail.cntComment ++
        data.textMsg = ''
        contentcommentList()
    }).catch((error:any)=>{
		// bcNotify.value.error('评论内容包含不良信息，提交失败!')
		bcNotify.value.error(error.message)
        data.textMsg = ''
    })

}

// 收起更多评论
const closeAction = () => {
    data.showSonPopup = false
    data.show = true
    data.isshowReply = false
    data.isQuotereply = false
    data.Soncomment = []
    setTimeout(() => {
        data.soncommentObj = {}
    }, 500)
}

// 删除评论
const todeleteComment = (id:string, isComment:number) => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    deletenewComment({
        id,
        isComment,
        happyType: 98,

    }).then(() => {
        if (isComment) {
            contentcommentList()
            closeAction()
        }else{
            getcommentRelyList(data.commentId)
        }
        bcNotify.value.show('评论删除')
    })

}

const changelike = (id:any,islike:number, isComment:number,) => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (islike) {
        unCommentLike({
            id,
            likeType:1,
            isComment
        }).then(()=>{
            if (isComment == 1) {
                contentcommentList()
            }else{
                getcommentRelyList(data.commentId)
            }
        })

    }else{
        commentLike({
            id,
            likeType:1,
            isComment
        }).then(()=>{
            if (isComment == 1) {
                contentcommentList()
            }else{
                getcommentRelyList(data.commentId)
            }
        })

    }
    
}



const showcomment = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (!data.videoDetail.accountId) {
        return
    }
    if (data.videoDetail.status == 4) {
        return
    }

    data.show = true
    data.istouch = true
    let videoView = null
    // #ifdef MP-WEIXIN
    videoView = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
    // #endif

    // #ifdef APP-PLUS || H5
    videoView = domVideoPlayer.value[data.swiperCurrent]
    // #endif
    videoView.pause()
    contentcommentList()
}

const close = () => {
    let videoView = null
    // #ifdef MP-WEIXIN
    videoView = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
    // #endif

    // #ifdef APP-PLUS || H5
    videoView = domVideoPlayer.value[data.swiperCurrent]
    // #endif

    videoView.play()
    data.istouch = false
}

// 展开更多评论
const showMoreComment = (item:any) => {

    data.show = false
    data.showSonPopup = true

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

const play = () => {
    data.isPlay = true
}

const pause = () => {
    data.isPlay = false
}

// 仅小程序点击视频事件
const clickVideo = () => {
    console.log('data.swiperCurrent',data.swiperCurrent);
    
    const videoView = uni.createVideoContext(`videoView${data.swiperCurrent}`,instance)
    console.log('videoView',videoView);
    
    if (data.isPlay) {
        videoView.pause()
    }else{
        videoView.play()
    }
    console.log('单击视频',data.isPlay);
}

const fullscreenchange = () => {
    data.isFull = !data.isFull
    if (!data.isFull) {
        data.showcontrols = false
    }
}


// 评论框获取焦点
const openkeyboard = (event:any) => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
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


const toCollectLists = () => {
    props.videoPagetype == 0 && gotoCollectLists('channel')
    props.videoPagetype == 1 && gotoCollectLists('chat')
    props.videoPagetype == 2 && gotoCollectLists('find')
    props.videoPagetype == 3 && gotoCollectLists('video')
}

const toGoodsDetail = () => {
    gotoServiceStore({shopId: data.shopReviewsList.id, isAd: 0})
}

const shareBox = ref();
const share = () => {
    if (data.isNeedlogin) {
        tologin()
        return
    }
    if (!data.videoDetail.accountId) {
        return
    }
    if (data.videoDetail.status == 4) {
        return
    }
    data.status = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}

const sharRetransmission = () => {
    retransmission({ articleId: props.videoId }).then(()=>{})
}

const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.videoDetail.cover)

    // 二维码链接图片
    let qrimg =  await getQrcode(`/pagesCnt/pages/videoPreview/videoPreview?videoId=${props.videoId}&videoPagetype=${props.videoPagetype}`).then((img:any)=>{
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
                    (shareBox.value as any).open();
                    data.showBottom = false;

                    data.shareimgUrl = res.tempFilePath
                    data.status = 2
                    title = ''
                    sharRetransmission()
                    uni.hideLoading()

                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                    uni.hideLoading()

                },
                complete: (ret) => {
                    console.log('生成中....');
                    uni.hideLoading()
                    uni.showLoading({
                        title: '加载中...'
                    });
                    uni.hideLoading()

                }
            },instance)
        }, 3000)
    )


}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.videoDetail.cover,
        title: data.videoDetail.title,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesCnt/pages/videoPreview/videoPreview?videoId=${props.videoId}&videoPagetype=${props.videoPagetype}`, //点击链接进入的页面
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
    uni.setStorageSync('showChatBarrage', data.showBarrage)
    console.log('data.showBarrage',data.showBarrage);
}

// 预览上报
const typePreviewReport = (type: string) => {
    createCollectAndReport().previewReport(type)

    // Debounce(()=>{
    // },300)
}


// 上报区分
const distinguishPreview = (type: string) => {

    console.log('预览类型type',type);
    
    type == '1' && typePreviewReport('channel')
    type == '4' && typePreviewReport('chat')
    type == '5' && typePreviewReport('find')
    type == '6' && typePreviewReport('createVideo')
    type == '97' && typePreviewReport('serviceContent')
}

// 播放上报
const videoPlayReport = (type: string) => {
    Debounce(()=>{
        createCollectAndReport().videoPlayReport(type,data.videos[data.swiperCurrent])
        console.log('播放上报指定id',data.videos[data.swiperCurrent]);

    },300)
}

// 完播上报
const videoPlayOverReport = (type:string) => {
    Debounce(()=>{
        createCollectAndReport().videoPlayOverReport(type,data.videos[data.swiperCurrent])
        console.log('完播上报指定id',data.videos[data.swiperCurrent]);
        
    },300)
}


// 播放上报区分
const videoPlayDistinguish = (type: string) => {
    type == '1' && videoPlayReport('channel')
    type == '4' && videoPlayReport('chat')
    type == '5' && videoPlayReport('find')
    type == '6' && videoPlayReport('createVideo')
    type == '97' && videoPlayReport('serviceContent')
}

// 完播上报区分
const videoOverPlayDistinguish = (type: string) => {
    type == '1' && videoPlayOverReport('channel')
    type == '4' && videoPlayOverReport('chat')
    type == '5' && videoPlayOverReport('find')
    type == '6' && videoPlayOverReport('createVideo')
    type == '97' && videoPlayOverReport('serviceContent')
}


let timer = ref<any>(null)
const startTime = (item:any,commentType:number) => {
    timer.value = setTimeout(()=>{
        console.log('item',item);
        data.showTouch = true
        
        data.storageItem = item
        
        if (item.isUser == 1) {
            data.showItemdel = true
        }else{
            data.showItemdel = false
        }

        data.touchTitle = `@${item.userName}${ data.showItemdel ? '(我)' : '' }: ${item.comment}`


        if (commentType) {
            data.isTopcomment = true
        }else{
            data.isTopcomment = false
        }


        data.showBottom = false;

    },1000)

}
const endTime = () => {
    clearTimeout(timer.value)
}

const cancelPopup = () => {
    data.storageItem = {}
    data.showTouch = false
    data.showBottom = true
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

const toReportPage = () => {
    console.log('data.isTopcomment',data.isTopcomment);
	console.log('data.storageItem',data.storageItem);

    let query = data.isTopcomment ? {
		applicableTypes: 4,
		toUserId: data.storageItem.userId,
        objectName: `${data.storageItem.userName}: ${data.storageItem.comment}`,
        objectId: data.storageItem.commentId

    } : {
		applicableTypes: 4,
        isreply: data.storageItem.quoteComment ? 1 : 0,
		toUserId: data.storageItem.userId,
        objectName: `${data.storageItem.userName}: ${data.storageItem.comment}`,
        objectId: data.storageItem.quoteComment ? data.storageItem.commentId : data.storageItem.replyId

	}

    gotoReportPage(query)
}

const reportFun = () => {
    gotoReportPage({
        applicableTypes: 8,
        objectName: data.videoDetail.title,
        objectId: data.videoDetail.id
    })

}

const showEmoBox = () => {
    // data.keyboardH = 186
    data.keyboardH = 226
    // 取消隐藏表情
    data.hiddenEmojiBox = false
    // 多行文本获取焦点
    data.showtextbtn = true
    
    console.log('data.keyboardH',data.keyboardH);
    console.log('data.showtextbtn',data.showtextbtn);
}   

const changeEmoji = (e: any) => {
    console.log('e',e);
    // data.keyboardH = 0
    // data.hiddenEmojiBox = true;
    data.textMsg = data.textMsg + e
    // 多行文本获取焦点
    data.showtextbtn = true

}

const upEmojiItem = (text:string) => {
    console.log('text',text);

    data.textMsg = text
    pushcomment()

    
}


defineExpose({
    closeShare,
    showRefresh,
    postviewTime,
    sharRetransmission

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
                    bottom: 35%;
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
                    // #ifdef APP-PLUS || H5
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
                        justify-content: center;
                        width: 130rpx;
                        height: 56rpx;
                        font-size: 28rpx;
                        border-radius: 30rpx;
                        background-color: rgba(41, 200, 111, 0.5);
                        padding: 6rpx 0rpx;
                        padding-right: 8rpx;
                        box-sizing: border-box;
                        &.is_open{
                            background-color: rgba(234, 62, 26, 0.5);
                            padding-left: 8rpx;
                        }
                        .open_btn{
                            width: 44rpx;
                            height: 44rpx;
                            border-radius: 50%;
                            background: #FFFFFF;
                            font-size: 28rpx;
                            color: #29C86F;
                            margin-right: 8rpx;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-left: 4rpx;
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
                            margin-left: 8rpx;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding-left: 2rpx;
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
    .comment_content{
        padding: 30rpx;
        box-sizing: border-box;
        min-height: 1000rpx;
        max-height: 1000rpx;
        overflow-y: scroll;
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
                            color: #666666;
                            background: #F4F4F4;
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
                        position: relative;
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
                        .del_text{
                            position: absolute;
                            top: 0;
                            right: -44rpx;
                            font-size: 24rpx;
                            color: #999999;
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
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .top_box{
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
                .tag_box{
                    display: flex;
                    align-items: center;
                    .tag_item{
                        padding: 4rpx 12rpx;
                        box-sizing: border-box;
                        background: #EFEFEF;
                        border-radius: 22rpx;
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #989898;
                        margin-right: 12rpx;
                    }
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
        align-items: center;
        .bottom_text_box{
            position: relative;
            .inp_icon{
                width: 38rpx;
                height: 38rpx;
                position: absolute;
                top: 16rpx;
                right: 30rpx;
                z-index: 1000;
            }
        }
        
    }
    .ct_emoji_Box{
        &.hidden_box{
            display: none;
        }
    }
    .bottom_text_inp{
        // width: 604rpx;
        // min-height: 140rpx !important;
        // border-radius: 12rpx;
        // padding: 20rpx 30rpx;
        // padding-top: 22rpx;
        // padding-right: 0rpx;
        // background: #F5F5F5;
        // font-size: 28rpx;
        // line-height: 28rpx;
        // overflow: hidden;
        // box-sizing: border-box;
        // margin-right: 30rpx;

        width: 552rpx;
        min-height: 72rpx !important;
        border-radius: 36rpx;
        padding: 16rpx 30rpx;
        padding-right: 0rpx;
        background: #F5F5F5;
        font-size: 28rpx;
        line-height: 28rpx;
        overflow: hidden;
        box-sizing: border-box;

    }
    .send_btn{
        // padding-top: 50rpx;
        // box-sizing: border-box;
        // font-size: 26rpx;
        // color: #EA3E1A;

        margin-left: 30rpx;
        padding: 10rpx 26rpx;
        background: #EA3E1A;
        border-radius: 30rpx;
        font-size: 28rpx;
        color: #FFFFFF;
        font-weight: 400;

        white-space: nowrap;    
    }
    .bottom_space{
        width: 100%;
        height: 68rpx;
    }
    
}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
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
</style>
<style>
video{
    width: 100%;
    height: 100%;
}
</style>