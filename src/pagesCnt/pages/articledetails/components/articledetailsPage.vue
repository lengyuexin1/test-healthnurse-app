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
                    <pageTopbg :zIndex="-1"></pageTopbg>
                    <bc-page-navbar :title="' '">
                        <template #back>
                            <view @click="goback">
                                <TnIcon name="left" size="38" :bold="true"/>
                            </view>
                        </template>
                    </bc-page-navbar>
                </view>
            </template>
            <view class="content">
                <view class="rich_text" id="richBox">
                    <view class="author_box">
                        <view class="author_avatar_box" @click="tobloggerPage">
                            <image
                                  class="avatar_img"
                                  :src="data.articledetailsObj.accountThumb"
                                  mode="scaleToFill"
                            />
                            <view class="author_name_box">
                                <view class="author_name">{{ data.articledetailsObj.accountName }}</view>
                                <view class="article_time">{{ formatTime(data.articledetailsObj.utcExamined) }}</view>
                            </view>
                        </view>
                        <template v-if="data.articledetailsObj.isUser != 1">
                            <view class="follow_btn_box" v-if="data.articledetailsObj.isFans != 1" @click="Subscribe">
                                <TnIcon name="add"/>
                                <view class="follow_btn">关注</view>
                            </view>
                            <view class="del_follow_btn" v-else @click="Subscribe">
                                已关注
                            </view>
                        </template>
                    </view>

                    <!-- 文章播报入口 -->
                    <!-- <view class="voice_box" @click="contentVoice" v-if="data.articledetailsObj.isAudio == 1">
                        <view class="voice_item_box">
                            <view class="voice_item_left">
                                <image
                                    class="voice_img"
                                    :src="getAssetsUrl('/leyou/icon/voice_icon.svg')"
                                    mode="scaleToFill"
                                />
                                <view class="voice_title">听全文</view>
                            </view>
                            <view class="voice_item_right">
                                <view class="voice_number">{{ data.articledetailsObj.listenCnt }}人听过</view>
                                <TnIcon name="right" color="#B0B0B0" size="26rpx"/>
                            </view>
                        </view>
                    </view> -->

                    <!-- 滚动显示播报控件 -->
                    <view class="voice_box" v-if="data.articledetailsObj.isAudio == 1">
                        <view class="voicePlayBox" :class="{ 'isFixedVoice': data.showFixedVoiceBox }">
                            <view class="voice_left_box">
                                <image
                                      class="voice_cover"
                                      :src="data.articledetailsObj.cover"
                                      mode="aspectFill"
                                />
                                <view class="voice_title" v-if="data.maxsliderValue <= 0">听全文</view>
                                <view class="voice_title" v-else>
                                    听全文{{ '·约' + Math.ceil(data.maxsliderValue / 60) + '分钟' }}
                                </view>
                            </view>
                            <view class="voice_right_box" @click="changePlay">
                                <view class="play_number" v-if="!(data.maxsliderValue <= 0)">
                                    <view class="slider_number">
                                        <TnCountDown :time="data.sliderValue" separator-mode="en" :auto-start="false"
                                                     text-color="#999999" :show-hour="false"/>
                                    </view>
                                    <view class="separate_text">/</view>
                                    <view class="slider_number">
                                        <TnCountDown :time="data.maxsliderValue" separator-mode="en" :auto-start="false"
                                                     text-color="#999999" :show-hour="false"/>
                                    </view>
                                </view>
                                <view class="play_box">
                                    <image
                                          class="play_icon"
                                          :src="getAssetsUrl(data.voiceIsPlay ? '/leyou/video/voiceplay_icon.svg' : '/leyou/video/voicepause_icon.svg')"
                                          mode="scaleToFill"
                                    />
                                </view>

                            </view>

                        </view>
                    </view>


                    <!-- 富文本类型 -->
                    <!-- <template v-if="data.articledetailsObj.type == 1"> -->
                    <view class="article_title"
                          v-if="data.articledetailsObj.type == 1 || data.articledetailsObj.type == 3">
                        {{ data.articledetailsObj.title }}
                    </view>
                    <view class="article_content">
                        <!-- <view v-html="data.articledetailsObj.detail"></view> -->
                        <mpHtml
                              :content="data.articledetailsObj.detail"
                              :tag-style="data.pStyle"
                        />

                    </view>
                    <!-- </template> -->

                    <!-- 图文类型 -->
                    <template v-if="data.articledetailsObj.type == 3">
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
                            <view class="article_title"
                                  v-if="data.articledetailsObj.type == 1 || data.articledetailsObj.type == 3">
                                {{ data.articledetailsObj.title }}
                            </view>
                            <view class="article_img_text">
                                <text>
                                    {{ data.articledetailsObj.desc }}
                                </text>
                            </view>
                        </view>
                    </template>

                    <view class="location" v-if="data.articledetailsObj.address">
                        <view class="location_box">
                            <view class="location_icon">
                                <TnIcon name="location" color="#333333" size="36rpx"/>
                            </view>
                            <view class="location_text">
                                <!-- {{ '广佛高速公路有限公司' }} | {{ '金沙街道钟村康园路161号' }} -->
                                {{ data.articledetailsObj.address }}
                            </view>
                        </view>
                    </view>
                </view>
                <view class="acricle_desc">免责声明：本内容来自保椿照护平台创作者，不代表保椿照护的观点和立场。</view>
                <view class="comment_box" id="commentView">
                    <view class="comment_title_box">
                        <view
                              class="comment_title"
                              v-for="(item,index) in data.commentTopList" :key="item.id"
                              @click="changecommentTop(index)"
                              :class="{ 'is_Select': data.commentTopindex == index }"
                        >
                            <view> {{ item.name }} {{ item.number ? item.number : '--' }}</view>
                            <view v-if="data.commentTopindex == index" class="select_spage"></view>
                        </view>

                    </view>
                    <template
                          v-if="(data.commentTopindex == 0 && data.comList.length == 0) || (data.commentTopindex == 1 && data.likeList.length == 0) || (data.commentTopindex == 2 && data.favoriteList.length == 0)">
                        <view class="note_comment">
                            <image
                                  class="note_comment_img"
                                  :src="getAssetsUrl('/empty/empty_icon_data.png')"
                                  mode="scaleToFill"
                            />
                            <view class="note_comment_text">暂无数据</view>
                        </view>
                    </template>
                    <template v-else>

                        <template v-if="data.commentTopindex == 0">
                            <view class="comment_item" @touchstart="startTime(item,1)" @touchend="endTime"
                                  v-for="(item,index) in data.comList" :key="item.id">
                                <commentItem :commentInfo="item" :commentIndex="index"
                                             @showMoreComment="showComment(item,index)" @delcomment="todeleteComment"
                                             @sonlikeup="likeup" @sonlikebelow="likebelow"></commentItem>
                            </view>
                        </template>
                        <template v-if="data.commentTopindex == 1">
                            <view class="user_List">
                                <view class="user_item" v-for="(item,index) in data.likeList" :key="item.id">
                                    <image
                                          class="user_img"
                                          :src="item.thumb"
                                          mode="scaleToFill"
                                    />
                                    <view class="user_name">{{ item.name }}</view>
                                    <view class="user_utcModified">{{ formatTime(item.utcModified) }}</view>
                                </view>
                            </view>
                        </template>
                        <template v-if="data.commentTopindex == 2">
                            <view class="user_List">
                                <view class="user_item" v-for="(item,index) in data.favoriteList" :key="item.id">
                                    <image
                                          class="user_img"
                                          :src="item.thumb"
                                          mode="scaleToFill"
                                    />
                                    <view class="user_name">{{ item.name }}</view>
                                    <view class="user_utcModified">{{ formatTime(item.utcModified) }}</view>
                                </view>
                            </view>
                        </template>

                    </template>

                </view>

                <!-- <view class="spag_box" :style="{ 'height': data.bottomBox + 'px' }"></view> -->
            </view>

            <template #bottom>
                <!-- <view class="bottom_voiceBox" v-if="data.pageVoice && data.showBottom" @click="contentVoice">
                    <view class="voiceright_box">
                        <view @click.stop="closeVoice">
                            <TnIcon name="close" color="#242424" size="36rpx" :bold="true"/>
                        </view>
                        <image
                            class="voice_img"
                            :src="data.articledetailsObj.cover"
                            mode="aspectFill"
                        />
                        <view class="voice_title">听全文{{ '·约'+Math.ceil(data.maxsliderValue / 60)+'分钟' }}</view>
                    </view>
                    <view class="voiceleft_box" @click.stop="changePlay">
                        <image
                            class="play_icon"
                            :src="getAssetsUrl(data.voiceIsPlay ? '/leyou/video/voiceplay_icon.svg' : '/leyou/video/voicepause_icon.svg')"
                            mode="scaleToFill"
                        />
                    </view>
                </view> -->

                <view
                      v-if="data.showBottom"
                      class="bottom_box"
                      :style="{
                    'z-index': data.crown ? 10080 : 0
                }"
                      id="bottomBox"
                >
                    <!--  v-if="data.showtextbtn" -->

                    <!-- <emojiItem @upEmojiItem="upEmojiItem"></emojiItem> -->

                    <view class="bottom_content_box">

                        <view class="flexinp_box">
                            <view class="bottom_inp_box" @click="showtextarea">

                                <!-- 底部输入框 -->
                                <!-- v-if="data.showtextbtn" -->
                                <!-- @blur="closekeyboard" -->

                                <textarea
                                      class="bottom_inp"
                                      :auto-height="true"
                                      :focus="data.showtextbtn"
                                      :placeholder="data.placeholderText"
                                      placeholder-style="color: #B5B5B5;line-height: 38rpx;"
                                      v-model="data.textMsg"
                                      @focus="openkeyboard"
                                      @blur="closekeyboard"
                                      :show-confirm-bar="false"
                                      cursor-spacing="20"
                                      :adjust-position="false"
                                      :auto-blur="true"
                                      v-if="data.showtextbtn"/>

                                <view class="not_bottom_inp" v-else>
                                    <view class="not_bottom_inp_text" v-if="data.textMsg == ''">赶快加入评论吧~</view>
                                    <view class="have_textMsg" v-else>{{ data.textMsg }}</view>
                                </view>

                                <image
                                      v-if="data.showtextbtn"
                                      class="inp_icon"
                                      :src="getAssetsUrl('/leyou/create/emoji_icon.svg')"
                                      mode="scaleToFill"
                                      @click.stop="showEmoBox"
                                />
                            </view>
                            <!--  v-if="!data.iskeyboard" -->
                            <view class="icon_list" v-if="!data.iskeyboard">
                                <view class="icon_item" @click="tocomment">
                                    <image
                                          class="icon_img"

                                          mode="scaleToFill"
                                    />
                                    <view class="icon_text"></view>
                                </view>
                                <view class="icon_item" @click="tocollect">
                                    <image
                                          class="icon_img"
                                          :src="data.articledetailsObj.isFavorite == 1 ? getAssetsUrl('/channel/collect_highlight.svg') : getAssetsUrl('/channel/collect.svg')"
                                          mode="scaleToFill"
                                    />
                                    <view class="icon_text">收藏</view>
                                </view>
                                <view class="icon_item" @click="tolike">
                                    <image
                                          class="icon_img"
                                          :src="data.articledetailsObj.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                          mode="scaleToFill"
                                    />
                                    <view class="icon_text">点赞</view>
                                </view>
                                <!-- @click="share" -->
                                <view class="icon_item" @click="share" style="margin-right: 0rpx;">
                                    <image
                                          class="icon_img"
                                          :src="getAssetsUrl('/channel/share.svg')"
                                          mode="scaleToFill"
                                    />
                                    <view class="icon_text">分享</view>
                                </view>
                            </view>
                            <view class="sending" v-else @click="sending">发送</view>
                        </view>

                        <view class="have_bottom" :style="{ 'height': data.keyboardH + 'px' }"></view>
                    </view>


                    <view class="ct_emoji_Box" :class="{ 'hidden_box': data.hiddenEmojiBox }">
                        <shinnXEmoji :show="true" @change="changeEmoji"></shinnXEmoji>
                    </view>

                </view>
            </template>


            <TnPopup v-model="data.show" open-direction="bottom" :zIndex="10060">
                <view class="action_box" :style="{ 'padding-bottom': (data.bottomBox + 10) + 'px' }">
                    <view class="action_top" @click="closeAction">
                        <view class="action_top_title">{{ data.Soncomment.length }}条回复</view>
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
                                    <view class="Landlord_top_name">{{ data.soncommentObj.userName }}</view>
                                    <view class="isLandlord">楼主</view>
                                    <view class="isLandlord" v-if="data.soncommentObj.isUser == 1 ">我</view>
                                    <view class="isLandlord" v-if="data.soncommentObj.isAuthor == 1 ">作者</view>
                                </view>
                                <view class="Landlord_top_icon">
                                    <view class="like_up"
                                          @click="likeup(data.soncommentObj.id,data.soncommentObj.isLike,1,true)">
                                        <image
                                              class="like_up_img"
                                              :src="data.soncommentObj.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                              mode="scaleToFill"
                                        />
                                        <text class="like_text">{{ data.soncommentObj.cntLike }}</text>
                                    </view>
                                    <view class="like_below"
                                          @click="likebelow(data.soncommentObj.id,data.soncommentObj.isStep,1)"
                                          v-if="false">
                                        <image
                                              class="like_below_img"
                                              :src="data.soncommentObj.isStep == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                              mode="scaleToFill"
                                        />
                                        <text class="like_text">{{ data.soncommentObj.cntStep }}</text>
                                    </view>
                                </view>
                            </view>
                            <view class="Landlord_content">
                                {{ data.soncommentObj.comment }}
                            </view>
                            <view class="Landlord_bottom">
                                <view class="Landlord_bottom_comment">
                                    {{ formatTime(data.soncommentObj.utcCreated) }} · {{ '广州' }}
                                </view>
                                <view class="Landlord_bottom_del" v-if="data.soncommentObj.isUser == 1"
                                      @click="todeleteComment(data.soncommentObj.id,1)">
                                    删除
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="all_son_comment">全部回复</view>
                    <scroll-view :scroll-y="true">
                        <view class="son_comment_scroll">

                            <view class="son_comment_item" @touchstart="startTime(item,0)" @touchend="endTime"
                                  :class="{ 'not_bottom': index + 1 == data.Soncomment.length }"
                                  v-for="(item,index) in data.Soncomment" :key="item.commentId">
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
                                            <view class="like_up" @click="likeup(item.commentId,item.isLike,0)">
                                                <image
                                                      class="like_up_img"
                                                      :src="item.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                                      mode="scaleToFill"
                                                />
                                                <text class="like_text">{{ item.cntLike }}</text>
                                            </view>
                                            <view class="like_below" @click="likebelow(item.commentId,item.isStep,0)"
                                                  v-if="false">
                                                <image
                                                      class="like_below_img"
                                                      :src="item.isStep == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                                                      mode="scaleToFill"
                                                />
                                                <text class="like_text">{{ item.cntStep }}</text>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="quotecomment" v-if="item.quoteComment && item.quoteComment != ''">
                                        {{ `@${item.replyUser}:` + item.quoteComment }}
                                    </view>
                                    <view class="son_comment_content">
                                        {{ item.comment }}
                                    </view>
                                    <view class="son_comment_bottom">
                                        <view class="son_comment_bottom_box">
                                            <view class="son_comment_reply" @click="sonQuotereply(item,index)">
                                                <view class="son_comment_reply_text">回复</view>
                                                <TnIcon name="right" size="20rpx"/>

                                            </view>
                                            <view class="son_comment_time">
                                                {{ formatTime(item.utcCreated) }}
                                                ·
                                                {{ '广州' }}
                                            </view>
                                        </view>
                                        <view class="son_comment_del" v-if="item.isUser == 1"
                                              @click="todeletesonComment(item.commentId,0)">
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

            <TnPopup v-model="data.showTouch" open-direction="bottom" :zIndex="10066" radius="32" @close="cancelPopup">
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
            <BCNotify ref="bcNotify"></BCNotify>
            <shareView
                  ref="shareBox"
                  @reportFun="reportFun"
                  @shareFun="shareFun"
                  @sharePage="sharePage"
                  @sharePoster="sharePoster"
                  :status="data.status"
                  :imgUrl="data.shareimgUrl"
                  :showReport="data.articledetailsObj.isUser == 1 ? false : true"
            ></shareView>
            <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344"
                    style="width:254px; height:344px"></canvas>

            <TnOverlay :show="data.showtextbtn" :duration="250" :opacity="0" :zIndex="10070" @click="hiddeOverlay"/>

        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { computed, defineExpose, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { onHide, onShow } from '@dcloudio/uni-app'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'

import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import commentItem from './commentItem.vue'

import {
    articleaddView,
    commentLike,
    deletenewComment,
    getaudioList,
    getnewcommentList,
    getnewcommentRelyList,
    getnewContentDetail,
    getnewLike,
    newfavorite,
    newfollow,
    postnewrecover,
    postnewreview,
    retransmission,
    unCommentLike,
    unnewFavorite,
    unnewfollow,
    unnewLike,
    viewTime
} from '@/api/create-api'
import { favoriteList, getQrcode, likeLists } from '@/api/user-api'
import { agoTime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'
import { gotoarticledetailVoice, gotoauthor, gotoReportPage } from '@/routes/create-routes'
import { gotoIndex } from "@/routes/public-routes"

// import shareView from '@/pagesCnt/components/shareView/shareView.vue'
import shareView from '@/pagesCnt/components/shareorreportView/shareorreportView.vue'

import BCNotify from '@/components/notify/index.vue'
import { drawBGIMG } from '@/libs/canvas-tools'

import createCollectAndReport from "@/utils/collection"

import mpHtml from '@/pagesCnt/uni_modules/mp-html/components/mp-html/mp-html.vue'
import { PlatformManage } from "@bc/sys"

import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'

interface Props {
    contentId: string,
    commentId: string,
    replyId: string,
    isIm: number,
    type: string
}

const props = defineProps<Props>()

interface Data {
    articledetailsObj: any,
    getpageTopH: number,
    swiperIndex: number,
    comList: any,
    crown: boolean,
    pStyle: any,
    showtextbtn: boolean,
    placeholderText: string,
    textMsg: string,
    iskeyboard: boolean,
    isshowReply: boolean,
    show: boolean,
    keyboardH: number,
    bottomBox: number,
    soncommentObj: any,
    Soncomment: any,
    upusercommentId: string,
    userId: string,
    quoteComment: string,
    commentId: string,
    isQuotereply: boolean,
    articledId: string,
    commentIndex: number,
    lastcomment: string,
    commentTopList: any,
    commentTopindex: number,
    showBottom: boolean,
    status: number,
    shareimgUrl: string,
    startlooktime: number,
    likeList: any,
    favoriteList: any,
    pageVoice: boolean
    showTouch: boolean
    touchTitle: string
    storageItem: any
    showItemdel: boolean
    isTopcomment: boolean
    voiceObj: any
    voiceIsPlay: boolean
    sliderValue: number
    maxsliderValue: number
    showFixedVoiceBox: boolean
    hiddenEmojiBox: boolean
}

const data = reactive<Data>({
    articledetailsObj: {},
    getpageTopH: 45,
    swiperIndex: 1,
    comList: [],
    crown: true,
    pStyle: {
        div: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        p: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        span: 'opacity: 1;margin: 42rpx 0rpx 42rpx 0rpx;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;'
    },
    showtextbtn: false, // 打开多行文本框
    placeholderText: '说点什么吧~',
    textMsg: '',
    iskeyboard: false,
    isshowReply: false, //展开更多评论之后引用回复
    show: false, //展开更多评论
    keyboardH: 0,
    bottomBox: 0,
    soncommentObj: {},
    Soncomment: [],
    upusercommentId: '',
    userId: '',
    quoteComment: '',
    commentId: '',
    isQuotereply: false,
    articledId: '',
    commentIndex: 0,
    lastcomment: '',
    commentTopList: [
        { id: 1, name: '评论', number: Math.floor(Math.random() * 900) + 100 },
        { id: 2, name: '点赞', number: Math.floor(Math.random() * 900) + 100 },
        { id: 3, name: '收藏', number: Math.floor(Math.random() * 900) + 100 }
    ],
    commentTopindex: 0,
    showBottom: true,
    status: 1,
    shareimgUrl: "",
    startlooktime: 0,
    likeList: [],
    favoriteList: [],
    pageVoice: false,
    showTouch: false,
    touchTitle: "",
    storageItem: {},
    showItemdel: true,
    isTopcomment: true,
    voiceObj: {},
    voiceIsPlay: false,
    sliderValue: 0,
    maxsliderValue: 0,
    showFixedVoiceBox: false,
    hiddenEmojiBox: true


})

const formatTime = computed(() => (time: number) => {
    return agoTime(time)
})
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const bcNotify = ref()
const sonbcNotify = ref()

const emit = defineEmits(["saveShareObj"])


onMounted(() => {
    data.articledId = props.contentId
    console.log('组件内', data.articledId)
    getDetails(props.contentId)
    commentList(props.contentId)
    getpageTop()

    articleaddView({ articleId: props.contentId }).then(() => {
    })
    data.startlooktime = new Date().getTime()

    // addWEventsListener(CareEvents.Get__Address, (res) => {
    //     console.log('播报页卸载获取参数',res);

    // })

})

// 创建播报实例
const innerAudioContext = uni.createInnerAudioContext()

onShow(() => {

})


onHide(() => {
    console.log('页面隐藏停止播报1')
    innerAudioContext.pause()
    // innerAudioContext.destroy()

})

const saveSrc = (e: any) => {
    // innerAudioContext.autoplay = true;

    innerAudioContext.src = e[0].audioUrl
    console.log('innerAudioContext', innerAudioContext)

}

// 监听开始播报
innerAudioContext.onPlay(() => {
    console.log('开始播报1', data.voiceObj.currentTime)
    data.voiceIsPlay = true
    // data.maxsliderValue = Math.floor(innerAudioContext.duration);
    console.log('开始播报2', data.maxsliderValue)

})

// 播报暂停
innerAudioContext.onPause(() => {
    data.voiceIsPlay = false
    console.log('播报暂停')
})


// 切换播报状态
const changePlay = () => {

    console.log('data.voiceIsPlay', data.voiceIsPlay)

    if (data.voiceIsPlay) {
        console.log('切换暂停')

        // 切换暂停
        data.voiceIsPlay = false
        innerAudioContext.pause()


    }
    else {
        console.log('切换播放')
        // 切换播放
        data.voiceIsPlay = true

        if (data.sliderValue >= data.maxsliderValue) {
            data.sliderValue = 0
            innerAudioContext.seek(0)
        }
        innerAudioContext.play()

    }

    console.log('data.sliderValue', data.sliderValue)

}

const closeVoice = () => {
    innerAudioContext.pause()
    // innerAudioContext.destroy()

    data.pageVoice = false
    data.voiceObj = {}
    uni.setStorageSync('pageVoice', {})
}


const getDetails = (contentId: string) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        getnewContentDetail({
            id: contentId
        }, isRequireLogin).then((res: any) => {
            console.log('Newres', res)
            data.articledetailsObj = res
            // data.articledetailsObj.detail = data.articledetailsObj.detail.replace(/>&nbsp;</g, "><")

            // if (data.articledetailsObj.status == 4) {
            //     bcNotify.value.error('文章已下架')
            //     setTimeout(() => {
            //         goback()
            //     }, 2000)
            //     return
            // }

            // data.commentTopList[0].number = data.articledetailsObj.cntComment
            // data.commentTopList[1].number = data.articledetailsObj.cntLike
            // data.commentTopList[2].number = data.articledetailsObj.cntCollect

            const shareObj = {
                title: res.title,
                imageUrl: res.cover,
                id: res.id,
                desc: ''
            }

            emit('saveShareObj', shareObj)

            if (data.articledetailsObj.isAudio == 1) {
                getaudioList({
                    articleId: contentId
                }).then((res: any) => {
                    saveSrc(res)
                })
            }


            // .includes('1')
            // if (data.articledetailsObj.tagIds[0] == '1') {
            //     console.log('百科内容')
            //     typePreviewReport('channel')
            // }
            // if (data.articledetailsObj.tagIds[0] == '4') {
            //     console.log('聊天内容')
            //     typePreviewReport('chat')

            // }
            // if (data.articledetailsObj.tagIds[0] == '5') {
            //     console.log('发现内容')
            //     typePreviewReport('find')

            // }
            // if (data.articledetailsObj.tagIds[0] == '6') {
            //     console.log('短片内容')

            // }
            // if (data.articledetailsObj.tagIds[0] == '97') {
            //     console.log('康养屯内容')
            // }


        }).catch((err: any) => {
            console.log('errerrerr', err)

            data.articledetailsObj = {}
            // bcNotify.value.error('文章不存在')

            // setTimeout(() => {
            //     goback()
            // }, 2000)

        })

    })


}

const commentList = (articleId: string) => {
    getnewcommentList({
        pageNumber: 1,
        pageSize: 1000,
        query: {
            articleId,
            commentId: props.commentId,
            isIm: props.isIm,
            happyType: 98

        }
    }).then((res: any) => {
        console.log('评论数据', res)
        data.comList = res.data

        if (props.type == 'comment_reply_list') {
            setTimeout(() => {
                data.show = true

                data.upusercommentId = data.comList[0].commentId
                data.userId = data.comList[0].userId
                data.quoteComment = data.comList[0].comment
                data.commentId = data.comList[0].commentId


                data.lastcomment = data.comList[0].commentId

                data.soncommentObj = {
                    id: data.comList[0].commentId,
                    userName: data.comList[0].userName,
                    userThumb: data.comList[0].userThumb,
                    comment: data.comList[0].comment,
                    cntStep: data.comList[0].cntStep,
                    cntLike: data.comList[0].cntLike,
                    isUser: data.comList[0].isUser,
                    isPostmaster: data.comList[0].isPostmaster,
                    isAuthor: data.comList[0].isAuthor,
                    utcCreated: data.comList[0].utcCreated,
                    isLike: data.comList[0].isLike,
                    isStep: data.comList[0].isStep
                }

                getcommentRelyList(data.comList[0].commentId, props.replyId)
            }, 800)
        }
    })
}

// 页面执行onShow生命周期
const getpageData = () => {
}

const postviewTime = () => {
    console.log('页面隐藏停止播报2')

    const endlooktime = new Date().getTime()
    const time = (endlooktime - data.startlooktime) / 1000
    // return
    viewTime({
        viewTime: time,
        articleId: data.articledId
    }).then(() => {
        console.log('记录了时间')
    })

    innerAudioContext.pause()
    innerAudioContext.destroy()
}

const instance = getCurrentInstance() // 获取组件实例
const query = uni.createSelectorQuery().in(instance)


const getpageTop = () => {
    setTimeout(() => {
        query.select('#bottomBox').boundingClientRect((view: any) => {
            data.bottomBox = view.height
        }).exec()

        query.select('#pageTop').boundingClientRect((view: any) => { //目标位置的节点：类class或者id
            data.getpageTopH = view.height
        }).exec()
    }, 800)
}

// 计算是否需要吸顶
const pagingScroll = (e: any) => {
    if (e.detail.scrollTop >= 200) {
        data.showFixedVoiceBox = true
    }
    else {
        data.showFixedVoiceBox = false
    }

}

const swiperchang = (e: any) => {
    data.swiperIndex = e.detail.current + 1
}

// 图片预览
const preImage = (current: number, urls: any) => {
    uni.previewImage({
        current,
        urls
    })
}

// 打开多行输入框
const showtextarea = () => {
    data.showtextbtn = true
}

// 评论框获取焦点
const openkeyboard = (event: any) => {
    // if (data.needlogin) {
    //     data.toArticledetails(data.articledId, '请先登录')
    //     return
    // }
    console.log('获取焦点')

    data.iskeyboard = true
    data.hiddenEmojiBox = true
    data.keyboardH = event.detail.height

    return
    if (data.hiddenEmojiBox) {
        // 隐藏表情包获取焦点
        // data.keyboardH = event.detail.height + 48
        data.keyboardH = event.detail.height
    }
    else {
        // 显示表情包获取焦点
        data.keyboardH = 186

    }


    console.log('data.keyboardH', data.keyboardH)


}
// 评论框获取失去焦点
const closekeyboard = () => {
    console.log('失去焦点', data.hiddenEmojiBox)

    if (data.hiddenEmojiBox) {
        data.keyboardH = 0
    }
    else {
        data.keyboardH = 186
    }
    return


    if (data.hiddenEmojiBox) {
        console.log('隐藏表情失去焦点')

        // click事件比change事件先触发
        setTimeout(() => {
            data.iskeyboard = false
            data.keyboardH = 0
            data.isQuotereply = false
            data.isshowReply = false
            data.showtextbtn = false
            data.hiddenEmojiBox = true


        }, 500)
    }
    console.log('展开表情失去焦点')


}


const hiddeOverlay = () => {
    data.showtextbtn = false
    data.hiddenEmojiBox = true
    data.iskeyboard = false
    data.keyboardH = 0
}


const showEmoBox = () => {
    data.keyboardH = 186
    // 取消隐藏表情
    data.hiddenEmojiBox = false
    // 多行文本获取焦点
    data.showtextbtn = true

    console.log('data.keyboardH', data.keyboardH)
    console.log('data.showtextbtn', data.showtextbtn)
}

const changeEmoji = (e: any) => {
    console.log('e', e)
    // data.keyboardH = 0
    // data.hiddenEmojiBox = true;
    data.textMsg = data.textMsg + e
    // 多行文本获取焦点
    data.showtextbtn = true

}

// 评论锚点
const paging = ref()
const tocomment = () => {
    paging.value.scrollIntoViewById('commentView', 150)
}

// 发送评论
const sending = () => {
    if (data.textMsg == '') {
        // data.$refs.uToast.default('请输入评论')
        bcNotify.value.error('请输入评论')
        return
    }
    // actionuToast
    data.upusercommentId = data.upusercommentId == '' ? data.lastcomment : data.upusercommentId

    if (data.show && !data.isshowReply) {

        console.log('回复列表的回复', data.show, !data.isshowReply)
        topostrecover(data.commentId, data.commentId, '', '', data.textMsg, data.userId)

    }
    else if (data.show && data.isshowReply) {

        console.log('展开评论弹窗引用回复', data.show, data.isshowReply)
        topostrecover(data.commentId, data.upusercommentId, data.placeholderText, data.quoteComment, data.textMsg, data.userId)

    }
    else {
        if (data.isQuotereply) {

            console.log('没有引用评论的回复', data.isQuotereply)
            topostrecover(data.commentId, data.commentId, '', '', data.textMsg, data.userId)
            data.textMsg = ''
            return
        }
        topostreview(data.textMsg)
        console.log('发送文章的评论', data.articledId)

    }
    data.upusercommentId = ''
    data.placeholderText = ''
    data.quoteComment = ''
    data.userId = ''
    setTimeout(() => {
        data.placeholderText = '说点什么吧~'
        data.textMsg = ''
        data.showtextbtn = false
        data.hiddenEmojiBox = true
        data.iskeyboard = false
        data.keyboardH = 0

    }, 500)
}

const upEmojiItem = (text: string) => {
    console.log('text', text)

    data.textMsg = text
    sending()


}

// 展开更多评论
const showComment = (item: any, index: number) => {
    data.show = true

    data.upusercommentId = item.commentId
    data.userId = item.userId
    data.quoteComment = item.comment
    data.commentId = item.commentId


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
const getcommentRelyList = (commentId: string, replyId?: string) => {

    // commentRelyList({
    getnewcommentRelyList({
        query: {
            commentId,
            replyId,
            isIm: 1,
            happyType: 98

        },
        pageNumber: 1,
        pageSize: 100
    }).then((res: any) => {
        data.Soncomment = res.data
    })
}

// 展开更多评论之后的引用回复拉起键盘
const sonQuotereply = (item: any, index: number) => {

    data.showtextbtn = true

    data.isQuotereply = true
    data.isshowReply = true


    data.placeholderText = '@' + item.userName
    data.upusercommentId = item.commentId
    data.userId = item.userId
    data.quoteComment = item.comment

    data.commentIndex = index
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


// 评论点赞
const likeup = (id: string, isLike: number, isComment: number, isTop: boolean = false) => {
    if (isLike == 1) {
        tounCommentLike(id, 1, isComment, isTop)
    }
    else {
        tocommentLike(id, 1, isComment, isTop)
    }
}
// 点踩
const likebelow = (id: string, isStep: number, isComment: number) => {
    if (isStep == 1) {
        tounCommentLike(id, 2, isComment)
    }
    else {
        tocommentLike(id, 2, isComment)
    }
}


const tounCommentLike = (id: string, likeType: number, isComment: number, isTop: boolean = false) => {

    unCommentLike({
        // unnewCommentLike({
        id,
        likeType,
        isComment
    }).then(() => {
        if (isComment == 1) {
            commentList(data.articledId)
            if (isTop) {
                data.soncommentObj.isLike = 0
                data.soncommentObj.cntLike--
            }
        }
        else {
            getcommentRelyList(data.commentId)
        }
    })
}
const tocommentLike = (id: string, likeType: number, isComment: number, isTop: boolean = false) => {

    commentLike({
        // newcommentLike({
        id,
        likeType,
        isComment
    }).then(() => {
        if (isComment == 1) {
            commentList(data.articledId)
            if (isTop) {
                data.soncommentObj.isLike = 1
                data.soncommentObj.cntLike++
            }
        }
        else {
            getcommentRelyList(data.commentId)
        }
    })
}
// 删除评论
const todeleteComment = (id: string, isComment: number) => {

    // deleteComment({
    deletenewComment({
        id,
        isComment,
        happyType: 98

    }).then(() => {
        // getDetails(data.articledId)
        commentList(data.articledId)
        closeAction()

        if (isComment == 1) {
            data.commentTopList[0].number--
        }
        bcNotify.value.show('评论删除')
    })
}
const todeletesonComment = (id: string, isComment: number) => {

    // deleteComment({
    deletenewComment({
        id,
        isComment,
        happyType: 98

    }).then(() => {
        getcommentRelyList(data.commentId)
        sonbcNotify.value.show('评论删除')
    })
}

// 回复评论
const topostrecover = (commentId: string, replyId: string, replyUser: string, quoteComment: string, content: string, replyUserId: string) => {

    // postrecover({
    postnewrecover({
        commentId,
        replyId,
        // replyUser: replyUser || null,
        replyUser: replyUser || data.soncommentObj.userName,
        replyUserId: replyUserId || data.soncommentObj.id,
        quoteComment: quoteComment || null,
        content: ` ${content}`,
        articleId: data.articledId,
        utcCreated: Date.now(),
        isAuthor: 0,
        happyType: 98

    }).then(() => {

        getDetails(data.articledId)
        commentList(data.articledId)
        getcommentRelyList(data.commentId)
        sonbcNotify.value.show('回复成功')
    }).catch((res: any) => {
        sonbcNotify.value.error(res.message)
    })
}
// 发文章评论
const topostreview = (content: string) => {

    // postreview({
    postnewreview({
        articleId: data.articledId,
        content: ` ${content}`,
        isAuthor: 0,
        utcCreated: Date.now(),
        happyType: 98

    }).then(() => {
        getDetails(data.articledId)
        commentList(data.articledId)

        data.commentTopList[0].number++

        bcNotify.value.show('评论成功')
    }).catch((res: any) => {
        bcNotify.value.error(res.message)
    })
}

// 收藏
const tocollect = () => {
    if (!data.articledetailsObj.accountId || data.articledetailsObj.status == 4) {
        return
    }
    if (data.articledetailsObj.isFavorite == 1) {
        tounFavorite(data.articledId)
    }
    else {
        tofavorite(data.articledId)
    }
}

// 点赞
const tolike = () => {
    if (!data.articledetailsObj.accountId || data.articledetailsObj.status == 4) {
        return
    }
    if (data.articledetailsObj.isLike == 1) {
        tounLike(data.articledId)
    }
    else {
        togetLike(data.articledId)
    }
}


const tofavorite = (articleId: string) => {

    // favorite({
    newfavorite({
        articleId,
        happyType: 98

    }).then(() => {
        bcNotify.value.show('收藏成功')
        getDetails(data.articledId)
        getfavoriteList(props.contentId)

        data.commentTopList[2].number++

    })
}
const tounFavorite = (articleId: string) => {
    // unFavorite({
    unnewFavorite({
        articleId: [articleId],
        happyType: 98

    }).then(() => {
        bcNotify.value.show('取消收藏')
        getDetails(data.articledId)
        getfavoriteList(props.contentId)

        data.commentTopList[2].number--


    })
}

const togetLike = (articleId: string) => {

    // getLike({
    getnewLike({
        articleId,
        happyType: 98

    }).then(() => {
        getDetails(data.articledId)
        getlikeLists(props.contentId)

        data.commentTopList[1].number++

    })
}

const tounLike = (articleId: string) => {
    // unLike({
    unnewLike({
        articleIds: [articleId],
        happyType: 98

    }).then(() => {
        getDetails(data.articledId)
        getlikeLists(props.contentId)

        data.commentTopList[1].number--

    })
}

const tobloggerPage = () => {
    if (!data.articledetailsObj.accountId || data.articledetailsObj.status == 4) {
        return
    }
    gotoauthor({
        isuser: data.articledetailsObj.isUser,
        accountId: data.articledetailsObj.accountId,
        isFans: data.articledetailsObj.isFans
    })
}

const Subscribe = () => {
    if (data.articledetailsObj.isFans == 1) {
        tounfollow(data.articledetailsObj.accountId)
    }
    else {
        tofollow(data.articledetailsObj.accountId)
    }
}
const tofollow = (accountId: string) => {

    // follow({
    newfollow({
        accountId,
        happyType: 98

    }).then(() => {
        bcNotify.value.show('关注成功')
        getDetails(data.articledId)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}
const tounfollow = (accountId: string) => {

    // unfollow({
    unnewfollow({
        accountId,
        happyType: 98

    }).then(() => {
        bcNotify.value.show('取消关注')
        getDetails(data.articledId)
    })
}

const getlikeLists = (articleId: string) => {
    likeLists({
        pageNumber: 1,
        pageSize: 1000,
        query: {
            articleId,
            happyType: 1,
            isUser: 0
        }
    }).then((res: any) => {
        data.likeList = res.data
    })
}

const getfavoriteList = (articleId: string) => {
    favoriteList({
        pageNumber: 1,
        pageSize: 1000,
        query: {
            isUser: 0,
            articleId
        },
        sorts: []
    }).then((res: any) => {
        data.favoriteList = res.data
    })
}


const changecommentTop = (index: number) => {

    data.commentTopindex = index

    data.commentTopindex == 0 && commentList(props.contentId)
    data.commentTopindex == 1 && getlikeLists(props.contentId)
    data.commentTopindex == 2 && getfavoriteList(props.contentId)

    console.log('data.commentIndex', data.commentTopindex)

}

const sharRetransmission = () => {
    retransmission({ articleId: data.articledId }).then(() => {
    })
}

const shareBox = ref()
const share = () => {
    if (!data.articledetailsObj.accountId || data.articledetailsObj.status == 4) {
        return
    }
    data.showBottom = false
    data.status = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}

const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.articledetailsObj.cover)
    // 二维码链接图片
    const qrimg = await getQrcode(`/pagesCnt/pages/articledetails/articledetails?id=${data.articledetailsObj.id}`).then((img) => {
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.articledetailsObj.accountThumb)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.articledetailsObj.title//标题
    let accountName = data.articledetailsObj.accountName//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0, 8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0, 8) + "..."
    }

    const context = uni.createCanvasContext('mycanvas', instance)


    context.clearRect(0, 0, 254, 344)
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
    context.arc(24, 320, 10, 0, Math.PI * 2)
    context.fill()//保证图片无bug填充
    context.clip()//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 14, 310, 20, 20)
    context.restore()

    context.draw(
          false,
          setTimeout(async () => {
              uni.canvasToTempFilePath({
                  canvasId: 'mycanvas',
                  success: (res: any) => {
                      (shareBox.value as any).open()
                      data.showBottom = false

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
                      console.log('生成中....')
                      uni.showLoading({
                          title: '加载中...'
                      })
                      uni.hideLoading()

                  }
              }, instance)
          }, 3000)
    )


}

const shareFun = () => {
    data.showBottom = true
}

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN
    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.articledetailsObj.cover,
        title: data.articledetailsObj.title,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/pagesCnt/pages/articledetails/articledetails?id=${data.articledetailsObj.id}`, //点击链接进入的页面
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

const closeFun = () => {
    data.showBottom = true
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

const pageShow = () => {
    getDetails(props.contentId)
}

const typePreviewReport = (type: string) => {
    createCollectAndReport().previewReport(type)

    // Debounce(()=>{
    // },300)
}

// 跳转播报
const contentVoice = () => {
    gotoarticledetailVoice({
        articledId: data.articledId,
        voiceNumber: data.pageVoice ? data.sliderValue : 0
    })
}


const delVoice = () => {
    data.pageVoice = false
    uni.setStorageSync('pageVoice', {})

}

const timer = ref<any>(null)
const startTime = (item: any, commentType: number) => {
    timer.value = setTimeout(() => {
        console.log('item', item)
        data.showTouch = true

        data.storageItem = item

        if (item.isUser == 1) {
            data.showItemdel = true
        }
        else {
            data.showItemdel = false
        }

        data.touchTitle = `@${item.userName}${data.showItemdel ? '(我)' : ''}: ${item.comment}`


        if (commentType) {
            data.isTopcomment = true
        }
        else {
            data.isTopcomment = false
        }


        data.showBottom = false

    }, 1000)

}
const endTime = () => {
    clearTimeout(timer.value)
}

const TouchbcNotify = ref()
const touchCopy = () => {
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
        console.log('顶部评论删除')
        todeleteComment(data.storageItem.commentId, 1)
    }
    else {
        console.log('不是顶部评论')
        todeleteComment(data.storageItem.commentId, 0)
    }
    cancelPopup()
}

const cancelPopup = () => {
    data.storageItem = {}
    data.showTouch = false
    data.showBottom = true
}

const toReportPage = () => {
    console.log('data.isTopcomment', data.isTopcomment)
    console.log('data.storageItem', data.storageItem)

    const query = data.isTopcomment ? {
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
        objectName: data.articledetailsObj.title,
        objectId: data.articledetailsObj.id
    })

}


defineExpose({
    getpageData,
    closeShare,
    postviewTime,
    pageShow,
    sharRetransmission
})

</script>


<style lang="scss" scoped>
.acricle_desc {
    color: #666666;
    font-size: 28rpx;
    padding: 0 34rpx 20rpx 34rpx;
}

.content {
    width: 100%;
    position: relative;

    .rich_text {
        padding: 40rpx 0rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        position: relative;
        margin-bottom: 20rpx;

        .article_title {
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            font-weight: 600;
            font-size: 34rpx;
            color: #333333;
            margin-bottom: 28rpx;
        }

        .author_box {
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28rpx;

            .author_avatar_box {
                display: flex;
                align-items: center;

                .avatar_img {
                    width: 64rpx;
                    height: 64rpx;
                    border-radius: 50%;
                    margin-right: 12rpx;
                }

                .author_name_box {
                    .author_name {
                        font-size: 28rpx;
                        font-weight: 500;
                        color: #333333;
                        margin-bottom: 2rpx;
                    }

                    .article_time {
                        font-weight: 400;
                        color: #999999;
                        font-size: 24rpx;
                    }
                }
            }

            .follow_btn_box {
                display: flex;
                align-items: center;
                padding: 6rpx 20rpx;
                box-sizing: border-box;
                background: #29C86F;
                color: #fff;
                font-size: 26rpx;
                border-radius: 24rpx;

                .follow_btn {
                    margin-right: 8rpx;

                }
            }

            .del_follow_btn {
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

        .voice_box {
            width: 100%;
            padding: 20rpx;
            box-sizing: border-box;

            .voice_item_box {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 40rpx;
                border: 2rpx solid #E1E1E1;
                background: #F5F5F5;
                padding: 16rpx;
                box-sizing: border-box;

                .voice_item_left {
                    display: flex;
                    align-items: center;

                    .voice_img {
                        width: 48rpx;
                        height: 48rpx;
                        margin-right: 12rpx;
                    }

                    .voice_title {
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #242424;
                    }
                }

                .voice_item_right {
                    display: flex;
                    align-items: center;

                    .voice_number {
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #666666;
                        margin-right: 8rpx;
                    }
                }

            }

            .voicePlayBox {
                width: 100%;
                background: #F5F5F5;
                border-radius: 40rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10rpx 30rpx;
                box-sizing: border-box;


                &.isFixedVoice {
                    width: 718rpx;
                    position: fixed;
                    z-index: 100;
                    top: 200rpx;
                    left: 16rpx;
                }

                .voice_left_box {
                    display: flex;
                    align-items: center;

                    .voice_cover {
                        width: 64rpx;
                        height: 64rpx;
                        margin-right: 16rpx;
                        border-radius: 50%;
                    }

                    .voice_title {
                        font-weight: 400;
                        font-size: 28rpx;
                        color: #242424;
                    }
                }

                .voice_right_box {
                    display: flex;
                    align-items: center;

                    .play_number {
                        display: flex;
                        align-items: center;
                        font-size: 24rpx;
                        color: #999999;
                        font-weight: 400;
                        margin-right: 18rpx;

                        .separate_text {
                            margin: 0rpx 6rpx;
                        }

                    }

                    .play_box {
                        width: 52rpx;
                        height: 52rpx;
                        background: #FFFFFF;
                        border-radius: 50%;
                        border: 2rpx solid #C8C8C8;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .play_icon {
                        width: 28rpx;
                        height: 28rpx;
                    }
                }
            }
        }

        .article_content {
            padding: 0rpx 32rpx;
            box-sizing: border-box;
        }

        .video_content {
            position: sticky;
            top: 0;
            width: 100%;
            height: 424rpx;
            z-index: 1;
            background: #fff;
            margin-bottom: 32rpx;

            &.is_fixed {
                position: fixed;
            }
        }

        .seizeseat {
            width: 100%;
            height: 424rpx;
            margin-bottom: 32rpx;

        }

        .video_text_box {
            padding: 0rpx 32rpx;
            box-sizing: border-box;

            .video_title {
                font-size: 32rpx;
                color: #333333;
                font-weight: 600;
                margin-bottom: 12rpx;
            }

            .video_play_number {
                color: #999999;
                font-size: 24rpx;
                font-weight: 400;
            }
        }

        .img_text_content {
            box-sizing: border-box;
            width: 100%;

            .swiper_box {
                position: relative;
                width: 100%;
                height: 750rpx;
                margin-bottom: 32rpx;

                .swiper {
                    width: 100%;
                    height: 100%;

                    .swiper_img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .swiper_number_box {
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

            .article_img_text {
                padding: 0rpx 30rpx;
                box-sizing: border-box;
                font-size: 30rpx;
                color: #333333;
                line-height: 52rpx;
                box-sizing: border-box;
                word-break: break-all
            }
        }
    }

    .comment_box {
        padding: 40rpx 32rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;

        .comment_title_box {
            display: flex;
            align-items: center;
            padding-bottom: 24rpx;
            box-sizing: border-box;
            width: 100%;
            border-bottom: 2rpx solid #F2F2F2;
            margin-bottom: 30rpx;

            .comment_title {
                font-size: 32rpx;
                color: #666;
                font-weight: 500;
                margin-right: 60rpx;
                position: relative;

                &.is_Select {
                    color: #333333;
                }

                .select_spage {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%, 24rpx);
                    width: 32rpx;
                    height: 6rpx;
                    background: #EA3E1A;
                    border-radius: 4rpx;
                }
            }

        }

        .comment_item {
            margin-bottom: 30rpx;
        }

        .user_List {
            min-height: 360rpx;

            .user_item {
                display: flex;
                align-items: center;
                margin-bottom: 30rpx;

                .user_img {
                    width: 56rpx;
                    height: 56rpx;
                    border-radius: 50%;
                    margin-right: 16rpx;
                }

                .user_name {
                    color: #666666;
                    font-size: 28rpx;
                    margin-right: 16rpx;
                }

                .user_utcModified {
                    font-size: 24rpx;
                    color: #999999;
                }
            }
        }

        .note_comment {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .note_comment_img {
                width: 280rpx;
                height: 280rpx;
            }

            .note_comment_text {
                color: #B5B5B5;
                font-size: 30rpx;
                margin-bottom: 40rpx;
            }
        }
    }

    .spag_box {
        width: 100%;

    }

    .location {
        padding: 40rpx 30rpx;
        padding-top: 20rpx;
        padding-bottom: 0rpx;
        box-sizing: border-box;

        .location_box {

            width: 100%;
            padding: 12rpx;
            box-sizing: border-box;
            background: #F6F6F6;
            border-radius: 8rpx;
            display: flex;
            align-items: center;

            .location_text {
                margin-left: 8rpx;
                color: #666666;
                font-size: 24rpx;
                width: 88%;
                white-space: nowrap; /*强制一行内显示*/
                overflow: hidden; /*溢出隐藏*/
                text-overflow: ellipsis; /*超出部分现实省略号*/
            }
        }
    }
}

.bottom_box {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    padding: 20rpx 28rpx;
    padding-bottom: 64rpx;
    box-sizing: border-box;
    box-shadow: 0rpx -4rpx 12rpx rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 10080;


    .emoji_box {
        width: 100%;
        height: 96rpx;
        position: relative;

        .emoji_list {
            display: flex;
            align-items: center;
            padding-right: 100rpx;
            box-sizing: border-box;
            overflow-x: scroll;

            .emoji_item {
                display: flex;
                align-items: center;
                flex-shrink: 0;

                padding: 12rpx 20rpx;
                box-sizing: border-box;
                background: #F7F7F7;
                border-radius: 34rpx;
                font-size: 28rpx;
                font-weight: 400;
                color: #666666;
                margin-right: 20rpx;

            }
        }

        .add_emoji {
            position: absolute;
            top: 0;
            right: 0;
            width: 100rpx;
            height: 64rpx;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 30%);
            box-sizing: border-box;

            .add_emoji_img {
                width: 48rpx;
                height: 48rpx;
            }
        }
    }

    .bottom_content_box {
        .flexinp_box {
            display: flex;
            align-items: center;

            .bottom_inp_box {
                position: relative;

                .not_bottom_inp {
                    width: 398rpx;
                    height: 74rpx;
                    background: #F5F5F5;
                    border-radius: 38rpx;
                    padding: 16rpx 32rpx;
                    box-sizing: border-box;

                    .not_bottom_inp_text {
                        color: #B5B5B5;
                        font-size: 28rpx;
                    }

                    .have_textMsg {
                        font-size: 28rpx;
                        color: #333333;
                        width: 100%;
                        white-space: nowrap; /*强制一行内显示*/
                        overflow: hidden; /*溢出隐藏*/
                        text-overflow: ellipsis; /*超出部分现实省略号*/
                    }
                }

                .bottom_inp {
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

                .inp_icon {
                    width: 38rpx;
                    height: 38rpx;
                    position: absolute;
                    top: 16rpx;
                    right: 30rpx;
                    z-index: 1000;
                }
            }

            .icon_list {
                display: flex;
                margin-left: 20rpx;

                .icon_item {
                    margin-right: 36rpx;

                    .icon_img {
                        width: 40rpx;
                        height: 40rpx;
                    }

                    .icon_text {
                        color: #666666;
                        font-size: 20rpx;
                        line-height: 20rpx;
                    }
                }
            }

            .sending {
                margin-left: 30rpx;
                padding: 10rpx 26rpx;
                background: #EA3E1A;
                border-radius: 30rpx;
                font-size: 28rpx;
                color: #FFFFFF;
                font-weight: 400;

                white-space: nowrap;


                // position: absolute;
                // top: 50rpx;
                // right: 16rpx;
                // z-index: 20000000000;
            }
        }

        .have_bottom {
            width: 100%;
        }
    }

    .ct_emoji_Box {
        &.hidden_box {
            display: none;
        }
    }

}

.more_comment_box {
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    max-height: 800rpx;

    .more_comment_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 38rpx;

        .all_comment_number {
            font-size: 32rpx;
            color: #333333;
        }
    }

    .son_comment_item {
        width: 100%;
        height: 200rpx;
        border: 2rpx solid red;
    }
}

.action_box {
    padding: 40rpx 32rpx;
    padding-bottom: 90rpx;
    box-sizing: border-box;
    min-height: 1160rpx;
    display: flex;
    flex-direction: column;

    .action_top {
        width: 100%;
        margin-bottom: 24rpx;
        display: flex;
        align-items: center;

        .action_top_title {
            width: 100%;
            text-align: center;
        }

        .action_top_title_img {
            width: 32rpx;
            height: 32rpx;
        }
    }

    .Landlord {
        width: 100%;
        // min-height: 200rpx;
        display: flex;
        margin-bottom: 20rpx;
        border-bottom: 2rpx solid #F2F2F2;

        .Landlord_img {
            width: 56rpx;
            height: 56rpx;
            border-radius: 50%;
            margin-right: 16rpx;
        }

        .Landlord_text_box {
            flex: 1;
            margin-bottom: 16rpx;

            .Landlord_top_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 56rpx;
                line-height: 32rpx;

                .Landlord_top_name_box {
                    display: flex;
                    align-items: center;

                    .Landlord_top_name {
                        color: #333333;
                        font-size: 28rpx;
                        margin-right: 16rpx;
                    }

                    .isLandlord {
                        background: #EBF9F1;
                        color: #29C86F;
                        font-size: 20rpx;
                        padding: 4rpx 12rpx;
                        box-sizing: border-box;
                        border-radius: 8rpx;
                        margin-right: 10rpx;
                    }
                }

                .Landlord_top_icon {
                    display: flex;
                    align-items: center;

                    .like_up {
                        display: flex;
                        align-items: center;
                        margin-right: 24rpx;

                        .like_up_img {
                            width: 34rpx;
                            height: 34rpx;
                            margin-right: 8rpx;
                        }
                    }

                    .like_below {
                        display: flex;
                        align-items: center;
                        margin-right: 24rpx;

                        .like_below_img {
                            transform: rotate(180deg);
                            width: 34rpx;
                            height: 34rpx;
                            margin-right: 8rpx;
                        }
                    }

                    .like_text {
                        font-size: 24rpx;
                    }
                }
            }

            .Landlord_content {
                width: 100%;
                font-size: 26rpx;
                color: #666666;
                word-break: break-all;
                margin-bottom: 20rpx;
                line-height: 36rpx;
                text-align: left;
            }

            .Landlord_bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .Landlord_bottom_comment {
                    color: #999999;
                    font-size: 22rpx;
                    margin-right: 12rpx;
                    text-align: center;
                    line-height: 40rpx;
                }

                .Landlord_bottom_del {
                    color: #999999;
                    font-size: 24rpx;
                }
            }
        }
    }

    .all_son_comment {
        font-weight: bold;
        color: #333333;
        font-size: 32rpx;
        margin-bottom: 28rpx;
        text-align: left;
    }

    .son_comment_scroll {
        max-height: 690rpx;

        .son_comment_item {
            width: 100%;
            display: flex;
            margin-bottom: 44rpx;

            &.not_bottom {
                margin-bottom: 0;
            }

            .son_comment_thumb {
                width: 56rpx;
                height: 56rpx;
                margin-right: 16rpx;
                border-radius: 50%;
            }

            .son_comment_text_box {
                flex: 1;

                .son_comment_name_box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 18rpx;

                    .son_comment_nameandtag {
                        display: flex;

                        .son_comment_name {
                            color: #333333;
                            font-size: 28rpx;
                            max-width: 430rpx;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .son_comment_tag {
                            background: #EBF9F1;
                            color: #29C86F;
                            font-size: 20rpx;
                            padding: 4rpx 12rpx;
                            box-sizing: border-box;
                            border-radius: 8rpx;
                            margin: 0rpx 10rpx;
                        }
                    }

                    .son_comment_icon {
                        display: flex;
                        align-items: center;

                        .like_up {
                            display: flex;
                            align-items: center;
                            margin-right: 24rpx;

                            .like_up_img {
                                width: 34rpx;
                                height: 34rpx;
                                margin-right: 8rpx;
                            }
                        }

                        .like_below {
                            display: flex;
                            align-items: center;
                            margin-right: 24rpx;

                            .like_below_img {
                                transform: rotate(180deg);
                                width: 34rpx;
                                height: 34rpx;
                                margin-right: 8rpx;
                            }
                        }

                        .like_text {
                            font-size: 24rpx;
                        }
                    }
                }

                .quotecomment {
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

                .son_comment_content {
                    width: 100%;
                    font-size: 26rpx;
                    color: #666666;
                    word-break: break-all;
                    margin-bottom: 20rpx;
                    line-height: 36rpx;
                    text-align: left;
                }

                .son_comment_bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .son_comment_bottom_box {
                        display: flex;
                        align-items: center;

                        .son_comment_reply {
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

                            .son_comment_reply_text {
                                margin-right: 8rpx;
                            }
                        }

                        .son_comment_time {
                            color: #999999;
                            font-size: 22rpx;
                        }
                    }

                    .son_comment_del {
                        color: #999999;
                        font-size: 24rpx;
                    }
                }
            }
        }

        .son_comment_spage {
            width: 100%;
        }
    }
}

.bilvas {
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}

.fixed_Voice {
    position: fixed;
    right: 26rpx;
    bottom: 250rpx;

    .voice_img_box {
        position: relative;
        width: 108rpx;
        height: 108rpx;
        border: 4rpx solid #E4E4E4;
        border-radius: 50%;
        overflow: hidden;

        .voice_img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        .voice_bg_box {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: #000000;
            opacity: 0.2;
            border-radius: 50%;

        }

    }

    .voice_icon {
        position: absolute;
        top: -12rpx;
        right: -8rpx;
        width: 42rpx;
        height: 42rpx;
        border: 4rpx solid #FFFFFF;
        z-index: 10;
        background: #999999;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

    }
}

.bottom_voiceBox {
    width: 690rpx;
    background: #FFE5DF;
    border-radius: 42rpx;
    padding: 10rpx 30rpx;
    box-sizing: border-box;

    position: fixed;
    bottom: 190rpx;
    left: 30rpx;

    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;

    .voiceright_box {
        display: flex;
        align-items: center;
        justify-content: center;

        .voice_img {
            margin: 0rpx 24rpx;
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;

        }

    }

    .voiceleft_box {
        width: 52rpx;
        height: 52rpx;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .play_icon {
            width: 28rpx;
            height: 28rpx;

        }
    }
}

.touch_box {
    width: 100%;
    background: #fff;

    .touch_top_box {
        .touch_title {
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            color: #999999;
            font-size: 24rpx;
            font-weight: 400;
        }

        .touch_item {
            padding: 32rpx;
            box-sizing: border-box;
            text-align: center;
            border-top: 2rpx solid #F2F2F2;
            border-bottom: 2rpx solid #F2F2F2;
            color: #333333;
            font-size: 32rpx;
            font-weight: 400;

            &.del_btn {
                color: #EA3E1A;
            }
        }

    }

    .touch_bottom_box {
        .bottom_spage {
            width: 100%;
            height: 20rpx;
            background: #F8F8F8;
        }

        .out_touch_btn {
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
    outline: none;
}
</style>
