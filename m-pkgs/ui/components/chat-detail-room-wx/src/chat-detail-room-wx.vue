<template>
    <view class="tn-flex-column" :style="{ height: data.windowHeight, background: `url(${data.groupChatDetail.backgroundImage})` }">
        <view class="top-wrap tn-flex-center-between" @touchstart="hideDrawer">
            <view class="notice">{{ data.noticeData }}</view>
            <view class="more tn-flex-column">
                <view style="position: relative;">
                    <template v-if="data.applyForMicrophoneList.length > 0 && isTeamOwner()">
                        <TnBadge :value="data.applyForMicrophoneList.length" type="danger" size="30" max="9" absolute :absolute-position="{ top: '17rpx', right: '0rpx' }" />
                    </template>
                    <TnIcon name="more-horizontal" color="#FFFFFF" size="70" :bold="true" @tap="clickMoreHorizontal" />
                </view>
                <view class="num-wrap">
                    <Transition name="memberBox">
                        <view class="num tn-flex-column" @tap="clickShowMemerList" v-if="!data.memberListPopup">
                            <view class="num-list">
                                <image :src="item.thumb" mode="scaleToFill" v-for="(item, index) in data.memberList3" :key="index" />
                            </view>
                            <view class="txt">{{ data.memberList.length }}人</view>
                        </view>
                    </Transition>
                </view>
            </view>
        </view>
        <view class="add tn-flex-row" @tap="data.sharePopup = true">
            <view class="add-icon tn-flex-center-center">
                <TnIcon name="my-add" color="#FFFFFF" size="50" />
            </view>
            <view class="invite tn-flex-center">邀请</view>
        </view>
        <view class="tn-flex-row" @touchstart="hideDrawer">
            <scroll-view class="msg-list" scroll-y="true" :scroll-top="data.scrollTop" :scroll-with-animation="data.scrollAnimation"
                :scroll-into-view="data.scrollToView" @scrolltoupper="loadHistory" upper-threshold="50" :style="{ height: data.windowHeight1 }">

                <view class="tn-flex-center-center"></view>
                <BcChatItem v-for="(item, index) in paper.data.items" :key="item.idClient" :item="item" :to="props.to" 
                    @resend="clickResend(item, index)"
                    >
                </BcChatItem>
            </scroll-view>
        </view>
        <!-- 抽屉栏 -->
        <view class="popup-layer" :class="data.popupLayerClass" @touchmove.stop.prevent="discard">
            <view class="more-layer tn-flex-row" :class="{ hidden: data.hideMore }">
                <view class="list">
                    <view class="box">
                        <BcSelectImageBtn @uploadImage="openAuth"></BcSelectImageBtn>
                    </view>
                    <view class="box">
                        <BcSelectCameraBtn @uploadImage="openAuth"></BcSelectCameraBtn>
                    </view>
                    <view class="box tn-flex-column" @tap="openMicrophone" v-if="isTeamOwner()">
                        <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_open_mircophone.png')" mode="scaleToFill" />
                        <view class="txt">开麦</view>
                    </view>
                    <view class="box tn-flex-column" @tap="upMicrophone" v-if="!isTeamOwner() && [0, 1, 3].includes(data.microphoneStatusObj.status)">
                        <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_up_mircophone.png')" mode="scaleToFill" />
                        <view class="txt">上麦</view>
                    </view>
                    <view class="box tn-flex-column" @tap="downMicrophone" v-if="!isTeamOwner() && [2, 4].includes(data.microphoneStatusObj.status)">
                        <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_down_mircophone.png')" mode="scaleToFill" />
                        <view class="txt">下麦</view>
                    </view>
                </view>
            </view>
            <view class="more-layer tn-flex-row" :class="{ hidden: data.hideEmoji }">
                <view class="list">
                    <shinnXEmoji :show="true" @change="changeEmoji"></shinnXEmoji>
                </view>
            </view>
        </view>
        <!-- 底部输入栏 -->
        <!--  @touchmove.stop.prevent="discard" -->
        <view class="input-box" :class="data.popupLayerClass">
            <emojiItem @upEmojiItem="upEmojiItem"></emojiItem>

            <view class="tn-flex-row" style="gap: 20rpx;">
                <!-- H5下不能录音，输入栏布局改动一下 -->
                <!-- #ifndef H5 -->
                <view class="voice" @tap="switchVoice">
                    <image v-if="data.isVoice" :src="getAssetsUrl('/leyou/nim/message_icon_input.png')" mode="scaleToFill"
                        style="width: 70rpx; height: 70rpx;" />
                    <image v-else :src="getAssetsUrl('/leyou/nim/message_icon_sound.png')" mode="scaleToFill"
                        style="width: 70rpx; height: 70rpx;" />
                </view>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <view class="more" @tap="showMore">
                    <image :src="getAssetsUrl('/leyou/nim/message_icon_more.png')" mode="scaleToFill"
                        style="width: 70rpx; height: 70rpx;" />
                </view>
                <!-- #endif -->
                <view class="textbox">
                    <view class="voice-mode" :class="[data.isVoice ? '' : 'hidden', data.recording ? 'data.recording' : '']"
                        @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd"
                        @touchcancel="voiceCancel">{{ data.voiceTis }}</view>
                    <view class="text-mode" :class="data.isVoice ? 'hidden' : ''">
                        <!-- <view class="box"> -->
                            <TnInput custom-class="box-input" v-model="data.inputText" type="textarea" :cursor-spacing="12" :border="true" @blur="textareaBlur" @focus="textareaFocus" />
                        <!-- </view> -->
                    </view>
                </view>
                <view class="emoji">
                    <image :src="getAssetsUrl('/leyou/nim/emoji.png')" mode="scaleToFill" style="width: 70rpx; height: 70rpx;" @tap="chooseEmoji" />
                </view>
                <!-- #ifndef H5 -->
                <view class="more" @tap="showMore" v-if="!data.hasTextInput">
                    <image :src="getAssetsUrl('/leyou/nim/message_icon_more.png')" mode="scaleToFill"
                        style="width: 70rpx; height: 70rpx;" />
                </view>
                <!-- #endif -->
                <view class="send" :class="data.isVoice ? 'hidden' : ''" @tap="sendText" v-if="data.hasTextInput">
                    <view class="btn">发送</view>
                </view>
            </view>
        </view>
        <!-- 录音UI效果 -->
        <view class="record" :class="data.recording ? '' : 'hidden'">
            <view class="ing" :class="data.willStop ? 'hidden' : ''">
                <view class="icon luyin2"></view>
                <view class="tis">{{ data.recordTis }}</view>
            </view>
            <view class="cancel" :class="data.willStop ? '' : 'hidden'">
                <view class="icon chehui"></view>
                <view class="tis">{{ data.recordTis }}</view>
            </view>
        </view>
    </view>
    <view class="popupRight" :class="[data.memberListPopup ? 'popupRight-active' : '']">
        <view class="member-list tn-flex-column">
            <view class="hide" @tap="clickOverlay">
                <text>收起</text><TnIcon name="right-double" color="#FFFFFF" size="30" :bold="true" />
            </view>
            <view class="list-wrap tn-flex-column">
                <view class="list tn-flex-row" v-for="(item, index) in data.memberList" :key="index">
                    <view class="avatar-wrap tn-flex-row">
                        <view style="position: relative;" @tap="clickUserAvatar(item)">
                            <view class="isSpeaking" v-if="item.isSpeaking"></view>
                            <image class="avatar" :src="item.thumb" mode="scaleToFill" />
                            <image class="microphone-status" :src="getAssetsUrl('/leyou/nim/open-microphone.png')" mode="scaleToFill" v-if="item.wheatServingStatus == 2" />
                            <image class="microphone-status" :src="getAssetsUrl('/leyou/nim/close-microphone.png')" mode="scaleToFill" v-else-if="item.wheatServingStatus == 4" />
                        </view>
                        <view class="owner tn-flex-center" v-if="data.groupChatDetail.owner == item.id">群主</view>
                        <view class="index tn-flex-center" v-else>{{ index + 1 }}</view>
                    </view>
                </view>
            </view>
            <view class="num tn-flex-column" @tap="clickMoreMemberList">
                <view class="num-list">
                    <image :src="item.thumb" mode="scaleToFill" v-for="(item, index) in data.memberList3" :key="index" />
                </view>
                <view class="txt">{{ data.memberList.length }}人</view>
            </view>
        </view>
    </view>

    <!-- 一定要设置autopush：true属性才生效 -->
    <live-pusher 
        id="livePusher"
        autopush
        :url="data.livePusherObj.url"
        :enable-mic="data.livePusherObj.enableMic"
        :enable-camera="false"
        @bindaudiovolumenotify="pusherBindaudiovolumenotify"
        v-if="data.livePusherObj.url !== null"
    />

    <live-player
        autoplay
        :src="data.livePlayerObj.url"
        @bindaudiovolumenotify="playerBindaudiovolumenotify"
        v-if="data.livePlayerObj.url"
    />
    
    <TnPopup v-model="data.showPopup" open-direction="top">
        <view class="popup">
            <template v-if="isTeamOwner()">
                <view>
                    <view class="pTitle">用户管理</view>
                    <view class="tn-flex-center-around">
                        <view class="item tn-flex-column" @tap="clickConnectMicrophone">
                            <template v-if="data.applyForMicrophoneList.length > 0">
                                <TnBadge :value="data.applyForMicrophoneList.length" type="danger" size="35" max="9" absolute :absolute-position="{ top: '14rpx', right: '52rpx' }" />
                            </template>
                            <image :src="getAssetsUrl('/leyou/nim/microphone.png')" mode="scaleToFill"/>
                            <view class="icon-name">连麦管理</view>
                        </view>
                        <view class="item tn-flex-column"></view>
                        <view class="item tn-flex-column"></view>
                    </view>
                </view>
                <view>
                    <view class="pTitle tn-mt-lg">群聊管理</view>
                    <view class="tn-flex-center-around">
                        <view class="item tn-flex-column" @tap="clickDismss">
                            <image :src="getAssetsUrl('/leyou/nim/dismiss-chat.png')" mode="scaleToFill"/>
                            <view class="icon-name">解散群聊</view>
                        </view>
                        <view class="item tn-flex-column" @tap="clickShareChat">
                            <image :src="getAssetsUrl('/leyou/nim/share-chat.png')" mode="scaleToFill"/>
                            <view class="icon-name">分享群聊</view>
                        </view>
                        <view class="item tn-flex-column" @tap="backHome">
                            <image :src="getAssetsUrl('/leyou/nim/back-home.png')" mode="scaleToFill"/>
                            <view class="icon-name">回到首页</view>
                        </view>
                    </view>
                </view>
            </template>
            <template v-else>
                <view class="tn-flex-center-around">
                    <view class="item tn-flex-column" @tap="clickLeave">
                        <image :src="getAssetsUrl('/leyou/nim/dismiss-chat.png')" mode="scaleToFill"/>
                        <view class="icon-name">退出群聊</view>
                    </view>
                    <view class="item tn-flex-column" @tap="clickShareChat">
                        <image :src="getAssetsUrl('/leyou/nim/share-chat.png')" mode="scaleToFill"/>
                        <view class="icon-name">分享群聊</view>
                    </view>
                    <view class="item tn-flex-column" @tap="clickReport">
                        <image :src="getAssetsUrl('/leyou/nim/report.png')" mode="scaleToFill"/>
                        <view class="icon-name">举报群聊</view>
                    </view>
                    <view class="item tn-flex-column" @tap="backHome">
                        <image :src="getAssetsUrl('/leyou/nim/back-home.png')" mode="scaleToFill"/>
                        <view class="icon-name">回到首页</view>
                    </view>
                </view>
            </template>
        </view>
    </TnPopup>
    <TnPopup v-model="data.sharePopup" open-direction="bottom" :close-btn="true">
        <view class="popup-title">邀请加入群聊</view>
        <view class="popup">
            <view class="tn-flex-center-around">
                <view class="item tn-flex-column" @tap="shareChat">
                    <!-- #ifdef MP-WEIXIN -->
                    <button open-type="share" class="invibtn"></button>
                    <!-- #endif -->
                    <image :src="getAssetsUrl('/leyou/nim/weixin.png')" mode="scaleToFill"/>
                    <view>分享群聊</view>
                </view>
                <!-- #ifdef APP-PLUS -->
                <view class="item tn-flex-column" @tap="shareChatTimeline">
                    <button open-type="share"></button>
                    <image :src="getAssetsUrl('/leyou/nim/weixin.png')" mode="scaleToFill"/>
                    <view>分享朋友圈</view>
                </view>
                <!-- #endif -->
                <view class="item tn-flex-column" @tap="clickInvite">
                    <image :src="getAssetsUrl('/leyou/nim/friend.png')" mode="scaleToFill"/>
                    <view>邀请好友</view>
                </view>
            </view>
        </view>
    </TnPopup>
    <TnPopup v-model="data.invitePopup" open-direction="bottom" :close-btn="true">
        <view class="popup-title">邀请加入群聊</view>
        <view class="invite" style="height: 1000rpx;">
            <z-paging 
                ref="paging" 
                v-model="data.dataList" 
                :auto="true" 
                :fixed="false" 
                @query="queryList"
                :defaultPageSize="10" 
                :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" 
                empty-view-text="还没有数据哦~"
                :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
            >
            
                <template #top>
                    <view class="header_box">
                        <view class="discuss_title">写几句邀请语：（可选）</view>
                        <view class="input-wrap">
                            <TnInput type="textarea" v-model="data.note" :maxlength="30" :trim="true" show-word-limit clearable height="200rpx" placeholder="输入邀请语" custom-class="input" />
                        </view>
                    </view>
                    <view class="discuss">
                        <view class="discuss_title">
                            邀请好友
                        </view>
                        <view class="discuss_tab" @click="changeTab">
                            <view class="discuss_tab_item" :style="data.isMutual==0?'background: #F4F4F4; color: #EA3E1A':''">
                                关注我的
                            </view>
                            <view class="discuss_tab_item" :style="data.isMutual==1?'background: #F4F4F4; color: #EA3E1A':''">
                                互相关注
                            </view>
                        </view>
                    </view>
                </template>
                <view class="discussList">
                    <view class="discuss_item" v-for="(item, index) in data.dataList" :key="index">
                        <TnCheckboxGroup checked-shape="circle" size="lg" v-model="data.selectValue" @change="checkboxChange">
                            <TnCheckbox :label="item.fansId" active-color="#EA3E1A" style="width: 100%;">
                                <view class="info-wrap tn-flex-center-center">
                                    <view class="tn-flex-center-center" style="flex: 1;">
                                        <image :src="item.fansImage" mode="scaleToFill" />
                                        <view class="name">{{ item.fansName }}</view>
                                    </view>
                                </view>
                            </TnCheckbox>
                        </TnCheckboxGroup>
                    </view>
                </view>
                <template #bottom>
                    <view class="btn tn-flex-center-between">
                        <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="data.allSelect" @change="change">全选</TnCheckbox>
                        <TnButton shape="round" width="220rpx" height="76rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn">
                            发送
                        </TnButton>
                    </view>
                </template>
            </z-paging>
        </view>
    </TnPopup>
    <TnPopup v-model="data.moreMemberListPopup" open-direction="bottom" :close-btn="true">
        <view class="popup-title">在线人数({{ data.memberList.length }})</view>
        <view class="member">
            <view class="info tn-flex-column" v-for="(item, index) in data.memberList" :key="index" @tap="reportUser(item)">
                <image :src="item.thumb" mode="scaleToFill" />
                <view class="name tn-text-ellipsis-1">{{ item.name }}</view>
                <view class="owner tn-flex-center" v-if="data.groupChatDetail.owner == item.id">群主</view>
            </view>
            <view class="icon-wrap tn-flex-center-center">
                <image :src="getAssetsUrl('/leyou/static/icon/add.svg')" mode="scaleToFill" @tap="clickAdd" />
            </view>
            <!-- <view class="icon-wrap tn-flex-center-center">
                <image src="@/static/icon/min.svg" mode="scaleToFill" @tap="clickMin" />
            </view> -->
        </view>
    </TnPopup>
    <TnPopup v-model="data.connectPopup" open-direction="bottom" :close-btn="true">
        <view class="popup-title">连麦管理</view>
        <view>
            <view class="tab-wrap">
                <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" color="#666666" active-color="#333333" font-size="28rpx" active-font-size="30rpx" bar-color="#EA3E1A">
                    <TnTabsItem v-for="(item, index) in data.tabsData" :key="index" :title="item.text" />
                </TnTabs>
            </view>
            <view>
                <view class="tab-list" v-if="data.currentTabIndex == 0">
                    <template v-if="data.applyForMicrophoneList.length">
                        <scroll-view scroll-y style="height: 470rpx; padding-bottom: 30rpx;">
                            <view class="tn-flex-center-between tn-mb-lg" v-for="(item, index) in data.applyForMicrophoneList" :key="index">
                                <view class="item tn-flex-row tn-flex-center">
                                    <view>
                                        <image class="avatar" :src="item.userAvatar" mode="scaleToFill" />
                                    </view>
                                    <text class="name tn-text-ellipsis-1">{{ item.userName }}</text>
                                </view>
                                <view class="tn-flex-row tn-ml">
                                    <TnButton width="128rpx" height="64rpx" font-size="28rpx" plain border-color="#E3E3E3" text-color="#535353" :debounce="true" @tap="clickRejustUpMicrophone(item)">
                                        拒绝    
                                    </TnButton>
                                    <view class="tn-ml">
                                        <TnButton width="128rpx" height="64rpx" font-size="28rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickAgreeUpMicrophone(item)">
                                            同意
                                        </TnButton>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                    </template>
                    <template v-else>
                        <view class="empty tn-flex-center-center">暂无数据</view>
                    </template>
                </view>
                <view class="tab-list" v-else>
                    <view class="tn-flex-center-between">
                        <view>
                            <view class="list-name">允许所有群成员申请上麦</view>
                            <view class="list-tips">关闭后，群聊内所有成员将不可申请上麦</view>
                        </view>
                        <TnSwitch v-model="data.isAllowedAllUser" active-color="#EA3E1A" @change="allowedAllUserChange" />
                    </view>
                </view>
            </view> 
        </view>
    </TnPopup>
    <BCPopup
        ref="bcPopup"
        title="操作提示"
        content="是否向群主申请上麦聊天？"
        subBtn="确认"
        cancelBtn="取消"
        subBtnColor="#EA3E1B"
        @clickLeftBtn="confirm"
        @clickRightBtn="cancel">
    </BCPopup>
    <TnOverlay :show="data.showOverlay" :opacity=".3" :z-index="99" @click="clickOverlay" />
    <TnNotice ref="notifyRef" :z-index="2007400"/>
    <yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" :permissionID="data.permissionID"></yk-authpup>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onBeforeUnmount, onUnmounted, computed, defineEmits, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnNotice from '@tuniao/tnui-vue3-uniapp/components/notify/src/notify.vue'
import type { TnNotifyInstance } from '@tuniao/tnui-vue3-uniapp/components/notify'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'
import TnBadge from '@tuniao/tnui-vue3-uniapp/components/badge/src/badge.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import BCPopup from '@/components/popup/index.vue'
import BcChatItem from '../components/chat-item.vue'
import BcSelectImageBtn from '@/IndexPage/pages/chat/chat-page/components/select-image-btn.vue'
import BcSelectCameraBtn from '@/IndexPage/pages/chat/chat-page/components/select-camera-btn.vue'
import { PlatformManage } from "@bc/sys"
import { FriendsGroupService, SessionSDK, sessionProvider, useFriendsGroupList } from '@bc/msg'
import { pageController } from '@bc/uni-tools'
import { groupChatDetail, removeGroupChat, inviteMemberGroupChat, leaveGroupChat } from '@/api/user-api'
import { applyForMicriphone, applyForList, agreeMicrophone, rejectMicrophone, threshing, forceThreshing,
        microphoneList, microphoneStatus, microphoneConfig, getMicrophoneConfig, teamWheatServingList, openMic,
        closeMic, groupOwnerOpenMic, denounceCheck } from '@/api/nim-api'
import { gotoIndex } from '@/routes/public-routes'
import { gotoReportPage } from '@/routes/create-routes'
import { salonFansList } from '@/api/create-api'
import { getAssetsPic } from '@/common/setPicture'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"
import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'
import YunXinMiniappSDK from '../sdk/NERTC_Miniapp_SDK_v4.7.0'
import emojiItem from '@/IndexPage/components/emojiItem/emojiItem.vue'

//============================
/** 接口定义 */
//============================
interface Props {
    /** 聊天对象的账号 */
    to: string
}

interface Data {
    windowHeight: string
    windowHeight1: string
    scrollTop: number
    scrollAnimation: boolean
    scrollToView: string
    popupLayerClass: string
    hideMore: boolean
    hideEmoji: boolean
    popupType: string
    isVoice: boolean
    recording: boolean
    willStop: boolean
    voiceTis: string
    recordTis: string
    initPoint: any,
    //录音相关参数
    // #ifndef H5
    RECORDER: any
    // #endif
    recordTimer: any
    recordLength: number
    inputText: string
    hasTextInput: boolean
    permissionID: string
    groupChatDetail: any
    memberList: any
    memberList3: any
    showPopup: boolean
    sharePopup: boolean
    invitePopup: boolean
    memberListPopup: boolean
    moreMemberListPopup: boolean
    connectPopup: boolean
    showOverlay: boolean
    userInfo: any

    dataList : any,
	statusBar : number,
	inputValue : string,
	note: string
	isMutual: number
	selectValue: any,
	allSelect: boolean
    noticeData: any
    
    client: any
    currentTabIndex: number
    tabsData: any
    isAllowedAllUser: boolean
    applyForMicrophoneList: any
    microphoneStatusObj: any
    isleaveTeam: boolean
    livePusherObj: any
    livePlayerObj: any
    isDenounce: boolean
    denounceMsg: string
}

const data = reactive<Data>({
    windowHeight: '',
    windowHeight1: '',
    scrollTop: 9999,
    scrollAnimation: false,
    scrollToView: '',
    popupLayerClass: '',
    hideMore: true,
    hideEmoji: true,
    popupType: '',
    isVoice: false,
    recording: false,
    willStop: false,
    voiceTis: '按住 说话',
    recordTis: "手指上滑 取消发送",
    initPoint: { identifier: 0, Y: 0 },
    //录音相关参数
    // #ifndef H5
    RECORDER: uni.getRecorderManager(),
    recordTimer: null,
    recordLength: 0,
    // #endif
    inputText: '',
    hasTextInput: false,
    permissionID: '',
    groupChatDetail: {},
    memberList: [],
    memberList3: [],
    showPopup: false,
    sharePopup: false,
    invitePopup: false,
    memberListPopup: false,
    moreMemberListPopup: false,
    connectPopup: false,
    showOverlay: false,
    userInfo: null,

    dataList: [],
	statusBar: 45,
	inputValue: '',
	note: '',
	isMutual: 0,
	selectValue: [],
	allSelect: false,
    noticeData: '平台将24小时巡查违规内容，对私下交易、发布广告内容、开展任何金融犯罪的活动等予以严厉处理。如您发现以上不正当行为请向平台举报！共同营造善意、平等、真实的群聊氛围。',

    client: null,
    currentTabIndex: 0,
    tabsData: [
        { text: '申请上麦' },
        { text: '连麦设置' }
    ],
    isAllowedAllUser: true,
    applyForMicrophoneList: [],
    microphoneStatusObj: {},
    isleaveTeam: false,
    livePusherObj: {},
    livePlayerObj: {},
    isDenounce: true,
    denounceMsg: ''
})

interface Events {
    (e: 'closeChat', sessionId: string): void
}

const bcPopup = ref()

//============================
/** 基本参数 */
//============================
const limit = 10
//============================
/** 属性定义 */
//============================
const props = defineProps<Props>()
const emit = defineEmits<Events>()

const notifyRef = ref<TnNotifyInstance>()

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

// 详细会话信息
const session = sessionProvider(`team-${props.to}`)

const paper = useFriendsGroupList(props.to, limit, (res) => {
    paper.data.items.push(res)
    scroll2Bottom()

    // 如果是激活状态的, 马上清除未读数
    if (props.to === res.to) {
        SessionSDK.resetSessionUnread(`team-${props.to}`)
    }
})

watch(() => data.inputText, (newVal, oldVal) => {
    if (newVal !== '') {
        data.hasTextInput = true
    }
    else {
        data.hasTextInput = false
    }
})

onMounted(async () => {
    PlatformManage.getToken().then((res: any) => {
        data.userInfo = res
    })
    groupChatDetail({ tid: props.to }).then((res: any) => {
        data.groupChatDetail = res
        
        uni.setNavigationBarTitle({ title: `${data.groupChatDetail.tname}: ${data.groupChatDetail.tid}` })

        if (isTeamOwner()) {
            getApplyForList()
        }

        getTeamWheatServingList()

        getMicrophoneStatus()

        // 初始化语音聊
        createEngine()
    })

    getDenounceCheck()
    
    data.windowHeight = (await uni.getSystemInfo()).windowHeight - 60  + 'px'
    data.windowHeight1 = (await uni.getSystemInfo()).windowHeight - 100 - 120  + 'px'

    console.log('data.windowHeight1',data.windowHeight1);
    

    paper.loadmore().then(() => {
        scroll2Bottom()
    })

    // #ifndef H5
    //录音开始事件
    data.RECORDER.onStart(() => {
        recordBegin()
    })
    //录音结束事件
    data.RECORDER.onStop((e: any) => {
        recordEnd(e)
    })
    // #endif

    

    // 【群聊】消息通知
    SessionSDK.onMsg("IM__OnTeamMsgAddOrLeaveMembers", (res) => {
        getTeamWheatServingList()

        // PlatformManage.getToken().then((token) => {
        //     if (res.target == props.to && token.id !== res.from) {
        //         groupChatDetail({ tid: props.to }).then((res: any) => {
        //             data.groupChatDetail = res
        //         })
        //     }
        //     getTeamWheatServingList()
        // })
    })

    // 【语音群聊】消息通知
    SessionSDK.onMsg("IM__OnTeamMsg", (res) => {
        console.log('语音聊的消息', res)
        if (res.target == props.to) {
            if (res?.attach?.msgType == 'applyUpMicrophone' && isTeamOwner()) {
                getApplyForList()
            }
            else if (res?.attach?.msgType == 'rejectUpMicrophone' && !isTeamOwner()) {
                if (data.userInfo.id == res?.attach?.id) {
                    notifyRef.value?.show({ msg: '您的上麦申请被拒绝', type: 'error', position: 'center', textColor: 'white' })
                }
            }
            else if (res?.attach?.msgType == 'downMicrophone') {
                getTeamWheatServingList()
            }
            else if (res?.attach?.msgType == 'agreeUpMicrophone') {
                getTeamWheatServingList()

                if (data.userInfo.id == res?.attach?.id) {
                    notifyRef.value?.show({ msg: '上麦成功', type: 'success', position: 'center', textColor: 'white' })
                    getMicrophoneStatus()
                    data.showOverlay = true
                    data.memberListPopup = true

                    if (data.client) {
                        publish()
                    }
                    else {
                        notifyRef.value?.show({ msg: '手机麦克风开启失败，请返回重新进入该页面!', type: 'error', position: 'center', textColor: 'white' })
                    }
                }
            }
            else if (res?.attach?.msgType == 'forceThreshing') {
                getTeamWheatServingList()

                if (data.userInfo.id == res?.attach?.id) {
                    notifyRef.value?.show({ msg: '你已被下麦', type: 'error', position: 'center', textColor: 'white' })
                    getMicrophoneStatus()

                    if (data.client) {
                        mute()
                    }
                    else {
                        console.log('关闭麦克风失败')
                    }
                }
            }
        }
    })
})

onBeforeUnmount(() => {
    if (data.isleaveTeam == true) {
        // 后端已经处理了退群下麦逻辑，不需要调接口
        return
    }
    // 下麦、释放资源
    if (data.microphoneStatusObj.id) {
        threshing({ id: data.microphoneStatusObj?.id }).then(() => {
            data.client.leave()
        })
    }
})

onUnmounted(() => {
    data.client.leave()
})

const onShowEvent = () => {
    getMicrophoneStatus()
    getTeamWheatServingList()
}

const onHideEvent = () => {
    threshing({ id: data.microphoneStatusObj?.id }).then(() => {

        if (data.client) {
            mute()
        }
        else {
            console.log('关闭麦克风失败')
        }

        const event = {
            msgType: 'downMicrophone'
        }
        FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())
    })
}

const getDenounceCheck = () => {
    denounceCheck().then((res: any) => {
        data.isDenounce = res
    }).catch((err: any) => {
        data.denounceMsg = err.message
        data.isDenounce = false
    })
}

// 是否群主
const isTeamOwner = () => {
    return data.userInfo?.id === data.groupChatDetail?.owner
}

// 获取群成员列表
const getTeamWheatServingList = () => {
    teamWheatServingList({ tid: props.to, owner: data.groupChatDetail.owner }).then((res: any) => {
        data.memberList = res
        data.memberList3 = res.slice(0, 3)
    })
}

const createEngine = () => {
    const IM_APP_KEY = import.meta.env.VITE_IM_APP_KEY
    console.log('appKey:', IM_APP_KEY);
    
    data.client = YunXinMiniappSDK.Client({
        debug: true,
        appkey: IM_APP_KEY
    })
    data.client.init()

    addEventListener()
    
    const rtcToken = data.groupChatDetail.imNERTCToken + ''
    const uid = data.userInfo?.id + ''

    let joinParam = {
        channelName: props.to,
        uid: uid, //支持超出 number 精度范围的 uid。uid 超过了 number 范围，建议以 string 的方式传入 SDK，SDK 会当做 BigNumber 类型（bignumber.js）处理。请参考 API 文档。
        token: rtcToken, //安全模式下必填，设为已获取的 NERTC Token。调试模式下，请勿设置 Token。
        liveEnable: 0, //是否开启互动直播
        recordType: '0', //以下为服务器录制相关参数，请参考 API 文档
        recordAudio: 1,
        recordVideo: 0,
        isHostSpeaker: 0,
    }
    data.client.join(joinParam).then(res => {
        console.log('!!!! 房间房间成功：')

        if ([0, 1, 3, 4].includes(data.microphoneStatusObj.status)) {
            mute()
        }
        else {
            publish()
        }
    }).catch(e => {
        console.error('!!!! 房间房间失败：', e)
    })
}

// 发布音频
const publish = () => {
    data.client.publish('audio').then(url => {
        console.log('推流成功, 获取推流地址: ', url)
        data.livePusherObj.url = url

        data.client.unmute('audio').then(() => {
            data.livePusherObj.enableMic = true
        }).catch((e) => {
            console.log('unmute音频失败:', e)
        })
    }).catch(e=>{
        console.log('推流失败，原因: ', e)
    })
}

// 禁音
const mute = () => {
    data.client.unpublish('audio').then(url => {
        //步骤一：将推流的 URL 设置为 null，这样 live-pusher 组件就会停止渲染。
        data.livePusherObj.url = null

        //步骤二：网易云信只关闭了麦克风，而不关闭摄像头，所以需要立即将 URL 设置回去，以重新渲染 live-pusher 组件。同时，需要记得将 live-pusher 组件中的 enable-mic 设置为 false，这样重新渲染的 live-pusher 组件就不会推送音频流。
        data.client.mute('audio').then(url=>{
            data.livePusherObj.enableMic = false
        }).catch(e=>{
            console.error('mute 音频失败: ', e)
        })
    })
}

const addEventListener = () => {
    data.client.on('stream-added', ({uid, mediaType, isBigNumber}) => {
        //注意：如果对方开启了音频和视频，SDK 会触发 stream-added 两次，两次的 mediaType 不同分别为'audio'、'video'，需要用户两次都调用 subscribe 方法去服务器订阅，否则服务器会不转发
        // mediaType 可以为 'audio': 音频、'video': 视频、'slaveAudio': 音频辅流、'screenShare'：视频辅流，一般为屏幕共享，订阅完成后：audio 和 video 使用相同的 url，slaveAudio 和 screenShare 各自单独一个 url
        //如果对端 uid 超出了 number 精度范围，isBigNumber 值为 true，uid 为 String 类型，否则 isBigNumber 为 false，uid 为 number 类型

        console.log(`${uid} 发布了自己的 ${mediaType} 数据 `)
        data.client.subscribe(uid, mediaType).then(res => {
            console.log('订阅别人成功，获取到拉流地址: ', res.url)
            //业务层将拉流 url 设置到对应 live-player 组件中
            data.livePlayerObj.url = res.url

            getTeamWheatServingList()

            //注意: 同一个 uid，两次订阅（分别订阅 audio、video）返回的 url 是相同的的，可以重复更新相同 live-player 组件的 url，没有什么影响
            //注意: 同一个 uid，如果对方同时发布了 'audio': 音频、'video': 视频、'slaveAudio': 音频辅流、'screenShare'，这 4 中类型的媒体数据, 理论上需要 4 次订阅，其中订阅 audio、video 返回的 url 是相同的的，可以重复更新相同 live-player 组件的 url，使用同一个 live-player 组件，slaveAudio 需要单独一个 live-player 组件，screenShare 也需要单独一个 live-player 组件，此时有 3 个 live-player 组件去拉取对端所有类型的媒体

        }).catch(e => {
            console.log('订阅别人失败，原因: ', e)
        })
    })

    //通知应用程序已删除远端音视频流。 该回调中会包含已删除的远端用户 ID。
    data.client.on('stream-removed', ({uid, mediaType, isBigNumber}) => {
        //如果对端uid超出了number范围，isBigNumber值为true，uid为String类型，否则isBigNumber为false，uid为number类型
        console.log(`${uid}停止发布自己的 ${mediaType}`)

        getTeamWheatServingList()
    })

    data.client.on('clientLeave', (res) => {
        const { uid, isBigNumber } = res
        //如果对端 uid 超出了 number 精度范围，isBigNumber 值为 true，uid 为 String 类型，否则 isBigNumber 为 false，uid 为 number 类型
        console.log('[clientLeave 通知] 有人离开了: ', uid)

        getTeamWheatServingList()
    })

    data.client.on('clientJoin', (res) => {
        const { uid, isBigNumber } = res
        //如果对端 uid 超出了 number 精度范围，isBigNumber 值为 true，uid 为 String 类型，否则 isBigNumber 为 false，uid 为 number 类型
        console.log('[clientJoin 通知] 有人加入了: ', uid)

        getTeamWheatServingList()
    })

    // 通知应用程序远端用户已停止发送音频流。 该回调中会包含停止发送音频流的用户 ID
    data.client.on('mute-audio', (res) => {
        const { uid } = res
        console.log('音视频通知：对端音频mute')

        getTeamWheatServingList()
    })

    //通知应用程序远端用户已恢复发送音频流。 该回调中会包含恢复发送音频流的用户 ID。
    data.client.on('unmute-audio', (res) => {
        const { uid } = res
        console.log('音视频通知：对端音频恢复mute')

        getTeamWheatServingList()
    })

    //通知应用程序更新后的推流地址和拉流地址。
    data.client.on('syncDone', (res) => {
        const {uid, url, isBigNumber} = res
        console.log('[syncDone 通知] 推流地址发生了变化, res: ', res)

        //此时需要更新 live-pusher 组件中的 url
        data.livePusherObj.url = res.url
    })

    //通知应用程序 socket 建立成功。
    data.client.on('open', (data) => {
        console.log('音视频通知：和服务器 socket 建立成功')
    })

    //通知应用程序音视频 socket 关闭，触发时机：主动离开房间了，或者 SDK 中途断网重连没有成功，SDK 自动离开了房间。
    data.client.on('disconnect', (data) => {
        console.log('音视频通知：和服务器 socket 关闭了')
    })

        //通知应用程序准备重连。
    data.client.on('willreconnect', (data) => {
        console.log('音视频通知：准备重新建立和服务器之间的联系')
    })

    //通知应用程序发生错误。 该回调中会包含详细的错误码和错误信息
    data.client.on('error', (data) => {
        console.log('音视频通知：错误')
    })

    //通知应用程序, 互动直播的推流状态
    data.client.on('rtmp-tasks-status', ({taskId, code, msg, streamUrl}) => {
        console.log('音视频通知：设置的推流任务的状态发生了变更')
        //taskId: 设置的推流任务的id
        //streamUrl: 设置的推流任务对应的推流地址
        if (code == 505) {
            console.warn('该推流任务正在推流中，状态正常')
        }
        else if (code == 506) {
            console.warn('该推流任务推流失败了')
        }
        else if (code == 511) {
            console.warn('该推流任务推流结束了')
        }    
    })
}

const loadHistory = () => {
    console.log('加载更多')
    paper.loadmore().then((res) => {
        if (res.length < limit) {
            console.log('没有数据了')

        }
        else {
            console.log('还有数据')
        }
    })
}

const discard = () => {
    return
}

// 切换语音/文字输入
const switchVoice = () => {
    hideDrawer()
    data.isVoice = !data.isVoice
}

// 更多功能(点击+弹出)
const showMore = () => {
    data.popupType = 'showMore'
    data.isVoice = false
    data.hideEmoji = true
    data.hideMore = false
    openDrawer()
}

const chooseEmoji = () => {
    data.popupType = 'emoji'
    data.isVoice = false
    data.hideMore = true
    data.hideEmoji = false
    openDrawer()
}

// 打开抽屉
const openDrawer = () => {
    console.log(data.popupType);
    
    if (data.popupType == 'showMore') {
        data.popupLayerClass = 'showLayer'
    }
    else if (data.popupType == 'emoji') {
        data.popupLayerClass = 'emojiShowLayer'
    }
}

// 隐藏抽屉
const hideDrawer = () => {
    data.popupLayerClass = ''
    data.hideEmoji = true
    setTimeout(() => {
        data.hideMore = true
    }, 150)
}

//获取焦点，如果不是选表情ing,则关闭抽屉
const textareaFocus = () => {
    if (data.popupType == 'showMore' || data.popupType == 'emoji') {
        hideDrawer()
    }
}

const textareaBlur = () => {
    if (data.inputText == '') {
        data.hasTextInput = false
    }
}

//申请录音权限
const voiceAuth = () => {
    data.permissionID = 'RECORD_AUDIO'
    setTimeout(() => {
        authpup.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    }, 0)
}

// 录音开始
const voiceBegin = (e: any) => {
    // #ifdef APP-PLUS
    if (plus.navigator.checkPermission('android.permission.RECORD_AUDIO') != 'authorized') {
        voiceAuth()
        return
    }
    // #endif
    if (e.touches.length > 1) {
        return
    }
    data.initPoint.Y = e.touches[0].clientY
    data.initPoint.identifier = e.touches[0].identifier
    data.RECORDER.start({
        format: "mp3",
        frameSize: "1"
    }) //录音开始
}

// 录音中(判断是否触发上滑取消发送)
const voiceIng = (e: any) => {
    if (!data.recording) {
        return
    }
    const touche = e.touches[0]
    //上滑一个导航栏的高度触发上滑取消发送
    if (data.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
        data.willStop = true
        data.recordTis = '松开手指 取消发送'
    }
    else {
        data.willStop = false
        data.recordTis = '手指上滑 取消发送'
    }
}

// 结束录音
const voiceEnd = () => {
    if (!data.recording) {
        return
    }
    data.recording = false
    data.voiceTis = '按住 说话'
    data.recordTis = '手指上滑 取消发送'
    data.RECORDER.stop() //录音结束
}

// 录音被打断
const voiceCancel = () => {
    data.recording = false
    data.voiceTis = '按住 说话'
    data.recordTis = '手指上滑 取消发送'
    data.willStop = true //不发送录音
    data.RECORDER.stop() //录音结束
}

//录音开始UI效果
const recordBegin = () => {
    data.recording = true
    data.voiceTis = '松开 结束'
    data.recordLength = 0
    data.recordTimer = setInterval(() => {
        data.recordLength++
    }, 1000)
}

//录音结束(回调文件)
const recordEnd = (e: any) => {
    console.log(e)

    clearInterval(data.recordTimer)

    if (!data.willStop) {
        const url = e.tempFilePath
        sendAudio(url)
    }
    else {
        console.log('取消发送录音')
    }
    data.willStop = false
}

const authpup = ref()

// 获取授权
const openAuth = (type: string) => {
    // #ifdef APP-PLUS
    data.permissionID = type === 'album' ? 'WRITE_EXTERNAL_STORAGE' : 'CAMERA'
    setTimeout(() => {
        authpup.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    }, 0)
    // #endif

    // #ifndef APP-PLUS
    selectImage(type)
    // #endif
}

//用户授权权限后的回调
const changeAuth = () => {
    //这里是权限通过后执行自己的代码逻辑
    console.log('权限已授权，可执行自己的代码逻辑了')
    if (data.permissionID === 'RECORD_AUDIO') {
        return
    }
    const type = data.permissionID === 'WRITE_EXTERNAL_STORAGE' ? 'album' : 'camera'
    selectImage(type)
}

const selectImage = (type: string) => {
    uni.chooseImage({
        count: 1,
        sourceType: [type],
        sizeType: ['compressed'],
        success: (res: any) => {
            const tempFile = res.tempFiles[0].path
            sendImage(tempFile)
        }
    })
}

const upMicrophone = () => {
    data.popupLayerClass = ''
    bcPopup.value.open()
}

// 下麦
const downMicrophone = () => {
    uni.showModal({
        title: `是否确定下麦`,
        content : '',
        success: (res) => {
            if (res.confirm) {
                threshing({ id: data.microphoneStatusObj?.id }).then(() => {
                    notifyRef.value?.show({ msg: '下麦成功', type: 'success', position: 'center', textColor: 'white' })
                    getMicrophoneStatus()
                    getTeamWheatServingList()

                    if (data.client) {
                        mute()
                    }
                    else {
                        console.log('关闭麦克风失败')
                    }

                    const event = {
                        msgType: 'downMicrophone'
                    }
                    FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())
                })
            }
        }
    })
}

// 开麦
const openMicrophone = () => {
    if (data.microphoneStatusObj.status == 2) {
        notifyRef.value?.show({ msg: '已经处于开麦状态中，请勿重复操作', type: 'error', position: 'center', textColor: 'white' })
        return
    }

    groupOwnerOpenMic({ tid: props.to, owner: data.groupChatDetail.owner }).then(() => {
        notifyRef.value?.show({ msg: '开麦成功', type: 'success', position: 'center', textColor: 'white' })
        getMicrophoneStatus()
        getTeamWheatServingList()

        if (data.client) {
            publish()
        }
    }).catch((err: any) => {
        notifyRef.value?.show({ msg: err.message, type: 'error', position: 'center', textColor: 'white' })
    })
}

const confirm = () => {
    applyForMicriphone({
        tid: data.groupChatDetail.tid,
        owner: data.groupChatDetail.owner
    }).then((res: any) => {
        bcPopup.value.close()
        const event = {
            msgType: 'applyUpMicrophone'
        }
        FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())

        setTimeout(() => {
            notifyRef.value?.show({ msg: '已发送申请', type: 'success', position: 'center', textColor: 'white' })
        }, 300)
    }).catch((err: any) => {
        bcPopup.value.close()
        notifyRef.value?.show({ msg: err.message, type: 'error', position: 'center', textColor: 'white' })
    })
}

const cancel = () => {
    bcPopup.value.close()
}

const clickRejustUpMicrophone = (item: any) => {
    rejectMicrophone({ id: item.id }).then(() => {
        getApplyForList()

        const event = {
            id: item.userId,
            msgType: 'rejectUpMicrophone'
        }
        FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())
    }).catch((err: any) => {
        notifyRef.value?.show({ msg: err.message, type: 'error', position: 'center', textColor: 'white' })
    })
}

const clickAgreeUpMicrophone = (item: any) => {
    console.log(item)
    
    agreeMicrophone({ id: item.id }).then(() => {
        getApplyForList()
        getTeamWheatServingList()
        data.connectPopup = false
        setTimeout(() => {
            data.showOverlay = true
            data.memberListPopup = true
        }, 200)

        const event = {
            id: item.userId,
            msgType: 'agreeUpMicrophone'
        }
        FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())
    }).catch((err: any) => {
        notifyRef.value?.show({ msg: err.message, type: 'error', position: 'center', textColor: 'white' })
    })
}

const allowedAllUserChange = (value: any) => {
    microphoneConfig({
        tid: data.groupChatDetail.tid,
        isWheatServing: value ? 1 : 0
    }).then(() => {
        data.isAllowedAllUser = value
    })
}

const clickUserAvatar = (item: any) => {
    console.log(item);
    
    if (item.id == data.userInfo.id) {
        if (item.wheatServingStatus == 2) {
            uni.showModal({
                title: `是否关闭麦克风？`,
                content : '',
                success: (res) => {
                    if (res.confirm) {
                        postCloseMic(item.wheatServingId)
                    }
                }
            })
        }
        else if (item.wheatServingStatus == 4) {
            uni.showModal({
                title: `是否开启麦克风？`,
                content : '',
                success: (res) => {
                    if (res.confirm) {
                        postOpenMic(item.wheatServingId)
                    }
                }
            })
        }
    }
    else if (item.id !== data.userInfo.id && isTeamOwner()) {
        if ([2, 4].includes(item.wheatServingStatus)) {
            uni.showModal({
                title: `操作提示`,
                content : `是否对${item.name}强制下麦`,
                success: (res) => {
                    if (res.confirm) {
                        forceThreshing({ id: item.wheatServingId }).then(() => {
                            notifyRef.value?.show({ msg: '操作成功', type: 'success', position: 'center', textColor: 'white' })
                            getTeamWheatServingList()

                            const event = {
                                id: item.id,
                                msgType: 'forceThreshing'
                            }
                            FriendsGroupService.sendCustom(props.to, JSON.stringify(event), handleCallback())
                        })
                    }
                }
            })
        }
    }
}

const pusherBindaudiovolumenotify = () => {

}

const playerBindaudiovolumenotify = (detail: any) => {

}

// 闭麦
const postCloseMic = (id: string) => {
    closeMic({ id }).then(() => {
        mute()

        getTeamWheatServingList()
    })
}

// 开麦
const postOpenMic = (id: string) => {
    openMic({ id }).then(() => {
        publish()

        getTeamWheatServingList()
    })
}

// 发送文字消息
const sendText = () => {
    hideDrawer() //隐藏抽屉
    getDenounceCheck()
    if (!data.inputText) {
        return
    }
    if (!data.isDenounce) {
        notifyRef.value?.show({ msg: data.denounceMsg, type: 'error', position: 'center', textColor: 'white' })
        return
    }

    FriendsGroupService.sendText(props.to, data.inputText, handleCallback()).finally(() => {
        data.inputText = ''
    })
}

// 发送图片消息
const sendImage = (file: any) => {
    getDenounceCheck()
    if (!file) {
        return
    }
    if (!data.isDenounce) {
        notifyRef.value?.show({ msg: data.denounceMsg, type: 'error', position: 'center', textColor: 'white' })
        return
    }

    FriendsGroupService.sendImage(props.to, file, handleCallback())
}

// 发送语音消息
const sendAudio = (file: any) => {
    getDenounceCheck()
    if (!file) {
        return
    }
    if (!data.isDenounce) {
        notifyRef.value?.show({ msg: data.denounceMsg, type: 'error', position: 'center', textColor: 'white' })
        return
    }

    FriendsGroupService.sendAudio(props.to, file, handleCallback())
}

//点击重新发送消息
const clickResend = (item: any, index: number) => {
    item.status = 'sending'
    FriendsGroupService.resendMsg(item).then((msg) => {
        paper.data.items.splice(index, 1, msg)
    }).catch(() => {
        item.status = 'sendFailed'
    })
}

//============================
/** 方法定义 */
//============================

/** 滚动至页面底部 */
const scroll2Bottom = () => {
    nextTick(() => {
        setTimeout(() => {
            data.scrollTop = data.scrollTop + 1
            data.scrollAnimation = true
        }, 300)
    })
}

/** 消息处理 */
const handleCallback = (content?: string, sort?: string, answer?: string, id?: string) => {
    let index = -1

    hideDrawer()

    return {
        onSend: (msg: any) => {
            index = paper.data.items.push(msg) - 1
        },
        onSuccess: (msg: any) => {
            index >= 0 && paper.data.items.splice(index, 1, msg)

            scroll2Bottom()
        },
        onError: () => {
            index >= 0 && (paper.data.items[index].status = 'sendFailed')
        }

    } as TSendMessageCallback
}

const paging = ref() as any

const queryList = (pageNumber : number, pageSize : number) => {
	salonFansList({
		pageNumber,
		pageSize,
		query: {
			happyType: '',
			isMutual: data.isMutual,
		}
	}).then((res: any) => {
		paging.value.complete(res.data)
	})
}

const changeTab = () => {
	data.selectValue = []
	data.isMutual == 0 ? data.isMutual = 1 : data.isMutual = 0
	paging.value.reload()
}

const checkboxChange = () => {
	data.dataList.length === data.selectValue.length ? data.allSelect = true : data.allSelect = false
}

const change = () => {
	data.allSelect && (data.dataList.map((item: any) => data.selectValue.push(item.fansId)))
    !data.allSelect && (data.dataList.map((item: any) => data.selectValue = []))
}

const clickConnectMicrophone = () => {
    data.showPopup = false

    setTimeout(() => {
        data.connectPopup = true

        getMicrophoneConfig({ tId: data.groupChatDetail.tid }).then((res: any) => {
            data.isAllowedAllUser = res.isWheatServing == 1 ? true : false
        })
    }, 200)
}

// 发送邀请
const clickBtn = () => {
	if (data.selectValue.length == 0) {
        notifyRef.value?.show({ msg: '请选择好友', type: 'error', position: 'center', textColor: 'white' })
		return
	}
	inviteMemberGroupChat({ tid: props.to, userIds: data.selectValue, note: data.note}).then(() => {
        data.selectValue = []
        data.note = ''
        notifyRef.value?.show({ msg: '发送成功', type: 'error', position: 'center', textColor: 'white' })
		data.invitePopup = false
	})
}

const clickDismss = () => {
    data.showPopup = false
    uni.showModal({
        title: '是否解散群聊',
        content : '解散群聊后，其他成员也会被请出，是否解散群聊？',
        success: (res) => {
            if (res.confirm) {
                removeGroupChat({ tid: props.to }).then(() => {
                    notifyRef.value?.show({ msg: '成功解散群聊', type: 'success', position: 'center', textColor: 'white' })
                    setTimeout(() => {
                        pageController.back()
                    }, 1200)
                })
            }
        }
    })
}

const clickLeave = () => {
    data.showPopup = false
    uni.showModal({
        title: '是否退出群聊',
        content : '',
        success: (res) => {
            if (res.confirm) {
                data.isleaveTeam = true
                leaveGroupChat({ tid: props.to }).then(() => {
                    notifyRef.value?.show({ msg: '你已退出群聊', type: 'success', position: 'center', textColor: 'white' })
                    setTimeout(() => {
                        dispatchWEvent(GlobalEvents.Leave_Group_Chat, props.to)
                        pageController.back()
                    }, 1200)
                }).catch((err: any) => {
                    notifyRef.value?.show({ msg: err.message, type: 'error', position: 'center', textColor: 'white' })
                })
            }
        }
    })
}

const clickReport = () => {
    gotoReportPage({
        applicableTypes: 2,
        objectName: data.groupChatDetail.tname,
        objectId: data.groupChatDetail.tid,
        toUserId: data.groupChatDetail.owner
    })
}

const reportUser = (item: any) => {
    if (item.id == data.userInfo.id) {
        return
    }
    gotoReportPage({
        applicableTypes: 7,
        objectName: item.name,
        objectId: data.groupChatDetail.tid,
        toUserId: item.id
    })
}

const backHome = () => {
    gotoIndex()
}

const clickShareChat = () => {
    data.showPopup = false
    data.sharePopup = true
}

const clickInvite = () => {
    data.sharePopup = false
    data.invitePopup = true
}

const getApplyForList = () => {
    applyForList({
        pageNumber: 1,
        pageSize: 10,
        query: {
            tid: data.groupChatDetail.tid,
            owner: data.groupChatDetail.owner
        }
    }).then((res: any) => {
        data.applyForMicrophoneList = res.data
    })
}

const getMicrophoneStatus = () => {
    microphoneStatus({ tId: data.groupChatDetail.tid }).then((res: any) => {
        data.microphoneStatusObj = res
    })
}

const clickMoreHorizontal = () => {
    if (isTeamOwner()) {
        getApplyForList()
    }
    data.showPopup = true
}

const clickShowMemerList = () => {
    data.memberListPopup = true
    data.showOverlay = true
}

const clickOverlay = () => {
    data.memberListPopup = false
    data.showOverlay = false
}

const clickMoreMemberList = () => {
    data.moreMemberListPopup = true
}

const clickAdd = () => {
    data.moreMemberListPopup = false
    data.sharePopup = true
}

const changeEmoji = (e: any) => {
    data.inputText = data.inputText + e
    console.log(data.inputText);
}

// 分享给好友
const shareChat = (scene: string) => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // #ifdef APP-PLUS
    uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        title: `邀请您加入`,
        imageUrl: data.groupChatDetail.memberList[0].thumb,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/IndexPage/pages/chat/chat-container?to=${data.groupChatDetail.tid}&type='room'`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
    // #endif
}

// 分享到朋友圈
const shareChatTimeline = (scene: string) => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // #ifdef APP-PLUS
    uni.share({
        provider: 'weixin',
        scene: 'WXSceneTimeline',
        type: 0,
        title: `邀请您加入`,
        imageUrl: data.groupChatDetail.memberList[0].thumb,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/IndexPage/pages/chat/chat-container?to=${data.groupChatDetail.tid}&type='room'`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })
    // #endif
}

const upEmojiItem = (text:string) => {
    console.log('text',text);

    data.inputText = text
    sendText()

    
}

defineExpose({ onShowEvent, onHideEvent })

</script>

<style lang="scss" scoped>
// :deep(.tn-input) {
//     width: 100%;
//     border: solid 1rpx red;
// }
.top-wrap {
    width: 100%;
    height: 270rpx;

    .notice {
        width: 65%;
        margin-left: 3%;
        margin: 20rpx;
        padding: 20rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        color: #FFFFFF;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 20rpx;
    }

    .more {
        flex: 1;
        padding: 0 20rpx 0 0;
        align-items: flex-end;
        justify-content: center;

        .num-wrap {
            width: 148rpx;
            height: 112rpx;
            margin-top: 20rpx;

            .num {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                font-size: 28rpx;
                color: #FFFFFF;
                background: rgba(0, 0, 0, .3);
                border-radius: 20rpx;

                .num-list {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-left: 5rpx;

                    image {
                        width: 44rpx;
                        height: 44rpx;
                        border-radius: 50%;
                        margin-left: -5rpx;
                        border: solid 1rpx #FFFFFF;
                    }
                }

                .txt {
                    margin-top: 8rpx;
                }
            }
        }
        
    }
}

.add {
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 20rpx;
    bottom: 260rpx;
    z-index: 50;

    .add-icon {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .3);
    }

    .invite {
        width: 26rpx;
        height: 70rpx;
        margin-left: 10rpx;
        line-height: 26rpx;
        font-size: 20rpx;
        padding: 20rpx 10rpx;
        color: #FFFFFF;
        background-color: rgba(0, 0, 0, .3);
        border-radius: 22rpx;
    }
}

.msg-list {
    width: 100%;
    position: absolute;
    left: 0;
    padding: 0 0 60rpx 0;
}

.popupRight {
    width: 0rpx;
    height: 1000rpx;
    position: fixed;
    right: 0;
    top: 50%;
    z-index: 100;
    margin-top: -500rpx;
    background-color: rgba(0, 0, 0, .6);
    border-radius: 38rpx 0 0 38rpx;
    transition: all .2s ease-in-out;
    overflow: hidden;
}

#livePusher {
    position: fixed;
}

.popupRight-active {
    width: 150rpx;
}

.member-list {
    width: 100%;
    height: 100%;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;

    .hide {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 110rpx;
        font-size: 32rpx;
        color: #FFFFFF;

        text {
            padding-right: 6rpx;
        }
    }

    .list-wrap {
        flex: 1;
        overflow-y: auto;

        .list {
            margin-bottom: 20rpx;

            &:first-child {
                padding-top: 8rpx;
            }

            .avatar-wrap {
                width: 150rpx;
                text-align: center;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .microphone-status {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 30rpx;
                height: 30rpx;
            }

            .avatar {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
            }

            .isSpeaking {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                position: absolute;
                left: 0rpx;
                top: 0rpx;
                animation: expand 1s infinite alternate;
            }

            @keyframes expand {
                0% {
                    box-shadow: 0 0 0 0rpx rgba(47, 232, 109, 0.3);
                }
                50% {
                    box-shadow: 0 0 0 7rpx rgba(47, 232, 109, 0.6);
                }
                100% {
                    box-shadow: 0 0 0 0rpx rgba(47, 232, 109, 0.3);
                }
            }

            .owner {
                width: 26rpx;
                height: 70rpx;
                margin-left: 10rpx;
                line-height: 26rpx;
                font-size: 20rpx;
                padding: 20rpx 0rpx;
                color: #FFFFFF;
                background: #EA3E1A;
                border-radius: 22rpx;
            }

            .index {
                width: 26rpx;
                height: 70rpx;
                margin-left: 10rpx;
                line-height: 26rpx;
                color: #FFFFFF;
                font-size: 24rpx;
                padding: 20rpx 0rpx;
            }
        }
    }

    .num {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 112rpx;
        font-size: 28rpx;
        color: #FFFFFF;
        background: rgba(0, 0, 0, .7);
        border-radius: 0rpx 0rpx 0rpx 38rpx;

        .num-list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 8rpx;

            image {
                width: 44rpx;
                height: 44rpx;
                border-radius: 50%;
                margin-left: -8rpx;
                border: solid 1rpx #FFFFFF;
            }
        }

        .txt {
            margin-top: 8rpx;
        }
    }
}

.input-box {
    width: 100%;
    min-height: 120rpx;
    padding: 0 1%;
    background-color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 20;
    bottom: 0;
    z-index: 1000;

    &.showLayer {
        transform: translate3d(0, -30vw, 0);
    }

    &.emojiShowLayer {
        transform: translate3d(0, -56vw, 0);
    }

    transition: all .15s linear;
    border-bottom: solid 1rpx #ddd;

    .voice,
    .more,
    .emoji {
        flex-shrink: 0;
        width: 70rpx;
        height: 100upx;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .send {
        //H5发送按钮左边距
        /* #ifdef H5 */
        // margin-left: 20upx;
        /* #endif */
        flex-shrink: 0;
        width: 100upx;
        height: 100upx;
        display: flex;
        align-items: center;

        .btn {
            width: 100upx;
            height: 60upx;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #41A0FE;
            color: #fff;
            border-radius: 6upx;
            font-size: 27upx;
        }
    }

    .textbox {
        width: 100%;
        min-height: 70upx;
        margin-top: 15upx;

        .voice-mode {
            width: calc(100% - 2upx);
            height: 70upx;
            border-radius: 70upx;
            // border:solid 1upx #cdcdcd;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28upx;
            background-color: #f4f6fa;
            color: #555;

            &.recording {
                background-color: #e5e5e5;
            }
        }

        .text-mode {
            // width: 100%;
            // min-height: 70upx;
            // display: flex;
            // flex: 1;

            .box {
                width: 100%;
                min-height: 70upx;
                display: flex;
                align-items: center;
                border: solid 1rpx #EBEBEB;
                border-radius: 40rpx;
            }

            .box-input {
                max-width: 100%;
                font-size: 30rpx;
            }

            .em {
                flex-shrink: 0;
                width: 80upx;
                padding-left: 10upx;
                height: 70upx;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.hidden {
    display: none !important;
}

.popup-layer {
    &.showLayer {
        height: 30vw;
        transform: translate3d(0, -30vw, 0);
    }
    &.emojiShowLayer {
        height: 56vw;
        transform: translate3d(0, -56vw, 0);
    }

    transition: all .15s linear;
    width: 100%;
    
    // padding: 20upx 2%;
    // padding-top: 20upx;
    background-color: #FFFFFF;
    border-top: solid 1upx #ddd;
    position: fixed;
    z-index: 1000;
    top: 100%;

    .emoji-swiper {
        height: 40vw;

        swiper-item {
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;

            view {
                width: 12vw;
                height: 12vw;
                display: flex;
                justify-content: center;
                align-items: center;

                image {
                    width: 8.4vw;
                    height: 8.4vw;
                }
            }
        }
    }

    .more-layer {
        width: 100%;
        height: 30vw;
        align-items: center;
        z-index: 999;

        .list {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            // padding: 0 10rpx;

            .box {
                width: 100%;
                align-items: center;
            }

            .img {
                width: 90rpx;
                height: 90rpx;
            }

            .txt {
                color: #333333;
                margin-top: 8rpx;
            }
        }
    }
}

.record {
    width: 40vw;
    height: 40vw;
    position: fixed;
    top: 55%;
    left: 30%;

    .ing {
        width: 100%;
        height: 40vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20upx;
        background-color: rgba(0, 0, 0, .8);

        // 模拟录音音效动画
        @keyframes volatility {
            0% {
                background-position: 0% 130%;
            }

            20% {
                background-position: 0% 150%;
            }

            30% {
                background-position: 0% 155%;
            }

            40% {
                background-position: 0% 150%;
            }

            50% {
                background-position: 0% 145%;
            }

            70% {
                background-position: 0% 150%;
            }

            80% {
                background-position: 0% 155%;
            }

            90% {
                background-position: 0% 140%;
            }

            100% {
                background-position: 0% 135%;
            }
        }

        .icon {
            background-image: linear-gradient(to bottom, #29c86f, #fff 50%);
            background-size: 100% 200%;
            animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 150upx;
            color: #f09b37;
        }
    }

    .cancel {
        width: 100%;
        height: 40vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20upx;
        background-color: rgba(253, 71, 71, .9);

        .icon {
            color: #fff;
            font-size: 150upx;
        }
    }

    .tis {
        width: 100%;
        height: 10vw;
        display: flex;
        justify-content: center;
        font-size: 28upx;
        color: #fff;
        // &.change{
        // 	color: #fff;
        // }
    }
}

.popup {
    padding: 70rpx 30rpx;
    font-weight: bold;
    font-size: 28rpx;
    color: #333333;

    .pTitle {
        margin-bottom: 40rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
    }

    .item {
        width: 200rpx;
        align-items: center;
        justify-content: center;
        position: relative;

        /* #ifdef MP-WEIXIN */
        .invibtn{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10;
            opacity: 0;
        }
        /* #endif */

        image {
            width: 112rpx;
            height: 112rpx;
            margin-bottom: 12rpx;
        }

        .icon-name {
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
        }
    }
}

.popup-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #1A1A1A;
}

.tab-wrap {
    border-bottom: 2rpx solid #F2F2F2;
}

.tab-list {
    height: 500rpx;
    padding: 30rpx;

    .item {
        flex: 1;
        .avatar {
            width: 68rpx;
            height: 68rpx;
            border-radius: 50%;
        }
        .name {
            margin-left: 20rpx;
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
        }
    }

    .list-name {
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
    }

    .list-tips {
        margin-top: 15rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
    }

    .empty {
        margin-top: 25%;
        font-size: 28rpx;
        color: #999999;
    }
}

.member {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    min-height: 500rpx;
    max-height: 700rpx;
    overflow-y: auto;
}

.info {
    width: 20%;
    height: 110rpx;
    margin-top: 30rpx;
    align-items: center;
    position: relative;

    image {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
    }

    .name {
        width: 100rpx;
        margin-top: 10rpx;
        color: #666666;
        font-size: 22rpx;
        text-align: center;
    }

    .owner {
        padding: 4rpx 8rpx;
        color: #FFFFFF;
        font-size: 20rpx;
        line-height: 20rpx;
        background: #EA3E1A;
        border-radius: 14rpx;
        position: absolute;
        top: -10rpx;
        right: 5rpx;
    }
}

.icon-wrap {
    width: 20%;
    height: 110rpx;
    margin-top: 30rpx;

    image {
        width: 64rpx;
        height: 64rpx;
    }
}

.invite {
    padding: 30rpx;

    .top_inp_box {
        display: flex;
        align-items: center;
        padding: 8rpx 28rpx;
        box-sizing: border-box;

        .back_icon {
            margin-right: 28rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .inp_box {
            width: 458rpx;
            height: 64rpx;
            background: #fff;
            border-radius: 32rpx;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .search_icon {
                position: absolute;
                top: 50%;
                left: 20rpx;
                transform: translate(0%, -50%);
            }

            .inp {
                margin-left: 30rpx;
                width: 80%;
                height: 100%;
                line-height: 64rpx;
                font-size: 24rpx;
                color: #A8A8A8;

            }
        }
    }

    .header_box {
        margin: 0 30rpx 0 30rpx;
        min-height: 200rpx;
        max-height: 400rpx;

        .discuss_title {
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
        }

        .input-wrap {
            margin: 30rpx 0;
        }
        .input {
            background-color: #FFFFFF;
        }
    }

    .discuss {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 30rpx 30rpx 30rpx;

        .discuss_title {
            font-weight: 500;
            font-size: 16px;
            color: #333333;
        }

        .discuss_tab {
            height: 64rpx;
            background: #fff;
            border-radius: 32rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .discuss_tab_item {
                width: 120rpx;
                height: 54rpx;
                border-radius: 27rpx;
                text-align: center;
                line-height: 54rpx;
                font-weight: 500;
                font-size: 12px;
                color: #666666;
                background-color: #fff;
                margin: 4rpx;

            }
        }
    }

    .edit {
        color: #666666;
    }

    .discussList {
        display: flex;
        flex-direction: column;
        margin: 0 30rpx 70rpx 30rpx;

        .discuss_item {
            background: #fff;
            border-radius: 16rpx;
            // padding: 24rpx;
            // margin-bottom: 20rpx;
            display: flex;
            flex-direction: row;
        }
        .info-wrap {

            image {
                width: 90rpx;
                height: 90rpx;
                margin: 0 20rpx;
                border: solid 1rpx #F6F6F6;
                border-radius: 50%;
            }

            .name {
                color: #333333;
                font-size: 28rpx;
            }
        }
    }
    .upsalon_img{
        position: fixed;
        bottom: 250rpx;
        right: 30rpx;
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
    }
    .btn {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 146rpx;
        padding: 20rpx;
        background-color: #FFFFFF;
        border-top: solid 1rpx #EBEBEB;
    }
}

@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');}
.icon {
    font-family:"HMfont-home" !important;
    font-size:56upx;
    font-style:normal;
    color: #333;
    &.biaoqing:before {
        content: "\e797";
    }
    &.jianpan:before {
        content: "\e7b2";
    }
    &.yuyin:before {
        content: "\e805";
    }
    &.tupian:before {
        content: "\e639";
    }
    &.chehui:before {
        content: "\e904";
    }
    &.luyin:before {
        content: "\e905";
    }
    &.luyin2:before {
        content: "\e677";
    }
    &.other-voice:before {
        content: "\e667";
    }
    &.my-voice:before {
        content: "\e906";
    }
    &.hongbao:before {
        content: "\e626";
    }
    &.tupian2:before {
        content: "\e674";
    }
    &.paizhao:before {
        content: "\e63e";
    }
    &.add:before {
        content: "\e655";
    }
    &.close:before {
        content: "\e607";
    }
    &.to:before {
        content: "\e675";
    }
}


.memberBox-enter-active,
.memberBox-leave-active {
    transition: all 0.3s ease-in-out
}

.memberBox-enter-from,
.memberBox-leave-to {
    transform: translateX(70px);
    opacity: 0;
}
</style>
