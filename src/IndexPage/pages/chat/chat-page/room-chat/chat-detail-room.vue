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
                <BcChatItem v-for="(item, index) in paper.data.items" :key="item.idClient" :item="item" :to="props.to" @resend="clickResend(item, index)"></BcChatItem>
            </scroll-view>
        </view>
        <!-- 抽屉栏 -->
        <view class="popup-layer" :class="data.popupLayerClass" @touchmove.stop.prevent="discard">
            <view class="more-layer tn-flex-row" :class="{ hidden: data.hideMore }">
                <view class="list">
                    <view class="box"><BcSelectImageBtn @uploadImage="openAuth" /></view>
                    <view class="box"><BcSelectCameraBtn @uploadImage="openAuth" /></view>
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
        <!-- @touchmove.stop.prevent="discard" -->
        <view class="input-box" :class="data.popupLayerClass" >
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
                            <TnInput custom-class="box-input" v-model="data.inputText" :cursor-spacing="15" :border="true" @blur="textareaBlur" @focus="textareaFocus" />
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
                    <image :src="getAssetsUrl('/leyou/nim/timeLine.png')" mode="scaleToFill"/>
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
                <TnTabs v-model="data.currentTabIndex" :scroll="false" :bottom-shadow="false" color="#666666" active-color="#333333" font-size="28rpx" active-font-size="30rpx" bar-color="#EA3E1A" @change="connectTabChange">
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
    <TnActionSheet ref="actionSheetRef" />
    <TnOverlay :show="data.showOverlay" :opacity=".3" :z-index="99" @click="clickOverlay" />
    <BCNotify ref="bcNotify" :zIndex="2007400"></BCNotify>
    <yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" :permissionID="data.permissionID"></yk-authpup>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onBeforeUnmount, onUnmounted, computed, defineEmits, watch } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import BCNotify from '@/components/notify/index.vue'
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
import TnActionSheet from '@tuniao/tnui-vue3-uniapp/components/action-sheet/src/action-sheet.vue'
import type { TnActionSheetInstance } from '@tuniao/tnui-vue3-uniapp'
import BCPopup from '@/components/popup/index.vue'
import BcChatItem from './chat-item.vue'
import BcSelectImageBtn from '../components/select-image-btn.vue'
import BcSelectCameraBtn from '../components/select-camera-btn.vue'
import { PlatformManage } from "@bc/sys"
import { FriendsGroupService, SessionSDK, sessionProvider, useFriendsGroupList } from '@bc/msg'
import { pageController } from '@bc/uni-tools'
import { groupChatDetail, removeGroupChat, inviteMemberGroupChat, leaveGroupChat } from '@/api/user-api'
import { applyForMicriphone, applyForList, agreeMicrophone, rejectMicrophone, threshing, forceThreshing,
        microphoneList, microphoneStatus, microphoneConfig, getMicrophoneConfig, teamWheatServingList, openMic,
        closeMic, groupOwnerOpenMic, denounceCheck
} from '@/api/nim-api'
import { gotoIndex } from '@/routes/public-routes'
import { gotoReportPage } from '@/routes/create-routes'
import { salonFansList } from '@/api/create-api'
import { GlobalEvents, dispatchWEvent } from "@/events/event-registry"
import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'
import { WEIXIN_OPEN } from '@/sys/constant'

// #ifdef APP-PLUS
import permision from "@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/permission"
import NERTC from "@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/lib/index"
import {pluginVersion} from "@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/lib/index"
// import NertcLocalView from "@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/nertc-view/NertcLocalView"
// import NertcRemoteView from "@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/nertc-view/NertcRemoteView"
import { 
    NERTCLogLevel,
    NERTCRenderMode,
    NERTCChannelConnectionState,
    NERTCMirrorMode, 
    NERtcVideoStreamType, 
    NERtcVideoFrameRate, 
    NERtcVideoCropMode,
    NERtcDegradationPreference,
    NERtcVideoOutputOrientationMode,
    NERtcVideoProfileType,
    NERtcRemoteVideoStreamType,
    NERTCAudioDevice,
    NERTCAudioDeviceType,
    NERTCAudioDeviceState,
    NERTCVideoDeviceState,
    NERTCConnectionType,
    NERTCErrorCode,
    NERtcAudioVolumeInfo,
    NERTCAudioProfile,
    NERTCAudioScenario,
    NERTCChannelProfile,
    NERTCUserRole,
    NERtcSubStreamContentPrefer
} from '@/IndexPage/pages/chat/chat-page/room-chat/rtc/NERtcUniappSDK-JS/lib/NERtcDefines'
// #endif
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
    
    engine: any
    keyAudioAINSEnable: boolean
    isSetup: boolean
    isMuteAudio: boolean
    isOpenAudio: boolean
    isAudioVolumeIndication: boolean
    currentTabIndex: number
    tabsData: any
    isAllowedAllUser: boolean
    applyForMicrophoneList: any
    microphoneStatusObj: any
    isleaveTeam: boolean
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

    engine: undefined,
    keyAudioAINSEnable: false, //AI降噪默认关闭
    isSetup: false, //是否初始化引擎
    isMuteAudio: false, //默认unmute
    isOpenAudio: true, //是否开启本地麦克风
    isAudioVolumeIndication: false, //提示说话者音量
    currentTabIndex: 0,
    tabsData: [
        { text: '申请上麦' },
        { text: '连麦设置' }
    ],
    isAllowedAllUser: true,
    applyForMicrophoneList: [],
    microphoneStatusObj: {},
    isleaveTeam: false,
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

const bcNotify = ref()

const actionSheetRef = ref<TnActionSheetInstance>()

const getAssetsUrl = computed(()=>(src:string)=> {
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
                    bcNotify.value.show('您的上麦申请被拒绝!')
                }
            }
            else if (res?.attach?.msgType == 'downMicrophone') {
                getTeamWheatServingList()
            }
            else if (res?.attach?.msgType == 'agreeUpMicrophone') {
                getTeamWheatServingList()

                if (data.userInfo.id == res?.attach?.id) {
                    bcNotify.value.show('上麦成功')
                    getMicrophoneStatus()
                    data.showOverlay = true
                    data.memberListPopup = true

                    if (data.engine !== null) {
                        data.engine.enableLocalAudio(true)
                    }
                    else {
                        bcNotify.value.show('手机麦克风开启失败，请返回重新进入该页面!')
                    }
                }
            }
            else if (res?.attach?.msgType == 'forceThreshing') {
                getTeamWheatServingList()

                if (data.userInfo.id == res?.attach?.id) {
                    bcNotify.value.show('你已被下麦')
                    getMicrophoneStatus()

                    if (data.engine !== null) {
                        data.engine.enableLocalAudio(false)
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
            destroyEngine()
        })
    }
})

onUnmounted(() => {
    destroyEngine()
})

const onShowEvent = () => {
    getMicrophoneStatus()
    getTeamWheatServingList()
}

const onHideEvent = () => {
    threshing({ id: data.microphoneStatusObj?.id }).then(() => {
        if (data.engine !== null) {
            data.engine.enableLocalAudio(false)
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
    // #ifdef APP-PLUS
    
    if(data.isSetup) {
        destroyEngine()
        data.isSetup = false
        return
    }
    console.log('初始化NERTC引擎, SDK版本: ', pluginVersion)

    const IM_APP_KEY = import.meta.env.VITE_IM_APP_KEY
    let engineConfig = {
        appKey: IM_APP_KEY,
        logDir: '',
        logLevel: NERTCLogLevel.INFO,
    }
    data.engine = NERTC.setupEngineWithContext(engineConfig)
    //设置房间场景为通话场景
    data.engine.setChannelProfile(NERTCChannelProfile.COMMUNICATION)
    //开启AI降噪功能
    data.engine.setParameters({ keyAudioAINSEnable: true })
    //先监听SDK的重要事件
    addEventListener()

    console.log('初始化引擎完成')
    data.engine.nertcPrint('初始化引擎完成')
    
    //判断权限
    if (uni.getSystemInfoSync().platform === "android") {
        permision.requestAndroidPermission(
            "android.permission.RECORD_AUDIO"
        )
        permision.requestAndroidPermission(
            "android.permission.CAMERA"
        )
    }
    data.isSetup = true

    joinChannel()

    // #endif
}

const joinChannel = () => {
    const id = data.userInfo.id + ''
    const channelName = props.to + ''
    const rctToken = data.groupChatDetail.imNERTCToken + ''

    if(!data.isSetup) {
        console.log('当前没有初始化引擎，请稍后')
        return
    }
    // console.log('加入房间:')
    // data.engine.nertcPrint('加入房间')
    data.engine.joinChannel({
        token: rctToken,
        channelName: channelName,
        myUid: parseInt(id),
        myStringUid: id
    })
}

const destroyEngine = () => {
    console.log('销毁引擎')
    data.engine?.nertcPrint('销毁引擎')
    data.engine?.removeAllEventListener()
    data.engine?.destroyEngine()
    data.engine = null
    data.isSetup = false//是否初始化引擎
}

const addEventListener = () => {
    data.engine.addEventListener("onJoinChannel", (result, channelId, elapsed, userID, userStringID) => {
        let message = `onJoinChannel通知：自己加入房间状况，result = ${result}, channelId = ${channelId}, elapsed = ${elapsed}, userID = ${userID}, userStringID = ${userStringID}`
        // uni.showToast({
        //     title:'onJoinChannel结果: ' + result,
        //     icon: "none",
        //     duration: 1500
        // })
        data.engine.nertcPrint(message)
        console.log(message)
        
        getTeamWheatServingList()

        if (result == 0) {
            if ([0, 1, 3, 4].includes(data.microphoneStatusObj.status)) {
                data.engine.enableLocalAudio(false)
            }
            else {
                data.engine.enableLocalAudio(true)
            } 
        }

        // 设置间隔为2000ms的人声音量提示
        data.engine.enableAudioVolumeIndication({
            enable: true,
            interval: 2000,
            enableVad: true
        })
    })

    data.engine.addEventListener("onUserJoined", (userID, customInfo, userStringID) => {
        const message = `onUserJoined通知：有人加入房间，userID = ${userID}, userStringID = ${userStringID}, customInfo = ${customInfo}`
        data.engine.nertcPrint(message)
        console.log(message)
        // uni.showToast({
        //     title:`${userID}加入房间`,
        //     icon: "none"
        // })
        getTeamWheatServingList()
    })

    data.engine.addEventListener("onUserLeave", (userID, reason, userStringID) => {
        const message = `onUserLeaved通知：有人离开房间，userID = ${userID}, userStringID = ${userStringID}, reason = ${reason}`
        data.engine.nertcPrint(message)
        console.log(message)
        // uni.showToast({
        //     title:`${userStringID}离开房间`,
        //     icon: "none"
        // })
        getTeamWheatServingList()
    })

    data.engine.addEventListener("onUserAudioStart", (userID, userStringID) => {
        const message = `onUserAudioStart通知：对方开启音频，userID = ${userID}, userStringID = ${userStringID}`
        data.engine.nertcPrint(message)
        console.log(message)
        getTeamWheatServingList()
    })

    data.engine.addEventListener("onUserAudioStop", (userID, userStringID) => {
        const message = `onUserAudioStop通知：对方关闭音频，userID = ${userID}, userStringID = ${userStringID}`
        data.engine.nertcPrint(message)
        console.log(message)
        getTeamWheatServingList()
    })

    data.engine.addEventListener("onUserAudioMute", (userID, eanble, userStringID) => {
        const message = `onUserAudioMute通知：对方mute音频，userID = ${userID}, userStringID = ${userStringID}, eanble = ${eanble}`
        data.engine.nertcPrint(message)
        console.log(message)
        getTeamWheatServingList()
    })

    data.engine.addEventListener("onLeaveChannel", (result) => {
        const message = `onLeaveChannel通知：自己离开房间状况，result = ${result}`
        data.engine.nertcPrint(message)
        console.log(message)
        // uni.showToast({
        //     title:'离开房间结果: ' + result,
        //     icon: "none"
        // })
    })

    data.engine.addEventListener("onLocalAudioVolumeIndication", (volume, vadFlag) => {
        const message = `onLocalAudioVolumeIndication通知：本地音量volume = ${volume}, vadFlag = ${vadFlag}`
        // data.engine.nertcPrint(message)
        // console.log(message)

        if (data.memberList.length) {
            data.memberList.forEach((item) => {
                if (item.id == data.userInfo.id && volume > 15) {
                    item.isSpeaking = true
                }
                else {
                    item.isSpeaking = false
                }
            })
        }
    })

    data.engine.addEventListener("onRemoteAudioVolumeIndication", (volumeList,totalVolume) => {
        const message = `onRemoteAudioVolumeIndication通知：总音量totalVolume = ${totalVolume}`
        // data.engine.nertcPrint(message)
        // console.log(message)
        volumeList.forEach((user)=>{
            // console.log(`用户 userID=${user.userID}, userStringID=${user.userStringID} 的音频音量为: ${user.volume},音频辅流的音量为: ${user.subStreamVolume} `)
            // data.engine.nertcPrint(`用户 userID=${user.userID}, userStringID=${user.userStringID} 的音频音量为: ${user.volume},音频辅流的音量为: ${user.subStreamVolume} `)

            data.memberList.forEach((item) => {
                if (item.id == user.userStringID && user.volume > 15) {
                    item.isSpeaking = true
                }
                else {
                    item.isSpeaking = false
                }
            })
        })
    })

    //注册NERTC的事件
    data.engine.addEventListener("onError", (code, message, extraInfo) => {
        let imessage = `onError通知：code = ${code}, message = ${message}, extraInfo = ${extraInfo}`
        data.engine.nertcPrint(imessage)
        console.log(imessage)
        if (code === 41030) {
            imessage = `${extraInfo.userID} 音频播放收到浏览器限制需要用户手势触发`
            // data.isResumeAudio = true
        }
        uni.showToast({
            title:imessage,
            icon: "none",
            duration: 3000
        })
    })

    data.engine.addEventListener("onWaring", (code, message, extraInfo) => {
        const imessage = `onWaring通知：code = ${code}, message = ${message}, extraInfo = ${extraInfo}`
        data.engine.nertcPrint(imessage)
        console.log(imessage)
        // uni.showToast({
        //     title:imessage,
        //     icon: "none",
        //     duration: 3000
        // })
    })
}

// const leaveChannel = () => {
//     console.log('离开房间')
//     data.engine.nertcPrint('离开房间')
//     data.engine.leaveChannel()
//     // data.clear()
// }


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
                    bcNotify.value.show('下麦成功')
                    getMicrophoneStatus()
                    getTeamWheatServingList()

                    if (data.engine !== null) {
                        data.engine.enableLocalAudio(false)
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
        bcNotify.value.show('已经处于开麦状态中，请勿重复操作')
        return
    }

    groupOwnerOpenMic({ tid: props.to, owner: data.groupChatDetail.owner }).then(() => {
        bcNotify.value.show('开麦成功')
        getMicrophoneStatus()
        getTeamWheatServingList()
        if (data.engine !== null) {
            data.engine.enableLocalAudio(true)
        }
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
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
            bcNotify.value.show('已发送申请')
        }, 300)
    }).catch((err: any) => {
        bcPopup.value.close()
        bcNotify.value.error(err.message)
    })
}

const cancel = () => {
    bcPopup.value.close()
}

const connectTabChange = () => {
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
        bcNotify.value.error(err.message)
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
        bcNotify.value.error(err.message)
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
                            bcNotify.value.show('操作成功')
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

// 闭麦
const postCloseMic = (id: string) => {
    closeMic({ id }).then(() => {
        data.engine.enableLocalAudio(false)

        getTeamWheatServingList()
    })
}

// 开麦
const postOpenMic = (id: string) => {
    openMic({ id }).then(() => {
        data.engine.enableLocalAudio(true)

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
        bcNotify.value.error(data.denounceMsg)
        return
    }

    FriendsGroupService.sendText(props.to, data.inputText, handleCallback()).finally(() => {
        data.inputText = ''
    })
}

// 发送图片消息
const sendImage = (file: any) => {
    if (!file) {
        return
    }
    if (!data.isDenounce) {
        bcNotify.value.error(data.denounceMsg)
        return
    }

    FriendsGroupService.sendImage(props.to, file, handleCallback())
}

// 发送语音消息
const sendAudio = (file: any) => {
    if (!file) {
        return
    }
    if (!data.isDenounce) {
        bcNotify.value.error(data.denounceMsg)
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
        bcNotify.value.show('请选择好友')
		return
	}
	inviteMemberGroupChat({ tid: props.to, userIds: data.selectValue, note: data.note}).then(() => {
        data.selectValue = []
        data.note = ''
        bcNotify.value.show('发送成功')
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
                    bcNotify.value.show('成功解散群聊')
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
                    bcNotify.value.show('你已退出群聊')
                    setTimeout(() => {
                        dispatchWEvent(GlobalEvents.Leave_Group_Chat, props.to)
                        pageController.back()
                    }, 1200)
                }).catch((err: any) => {
                    bcNotify.value.error(err.message)
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
    // #ifdef APP-PLUS
    uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 5,
        title: `邀请您加入群聊`,
        imageUrl: data.groupChatDetail.memberList[0].thumb,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/IndexPage/pages/chat/chat-container?to=${data.groupChatDetail.tid}&scene=friendsGroup&tag=joinChat`, //点击链接进入的页面
            type: WEIXIN_OPEN, //0-正式版； 1-测试版； 2-体验版。 默认值为0
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
    // #ifdef APP-PLUS
    uni.share({
        provider: 'weixin',
        scene: 'WXSceneTimeline',
        type: 5,
        title: `邀请您加入群聊`,
        imageUrl: data.groupChatDetail.memberList[0].thumb,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/IndexPage/pages/chat/chat-container?to=${data.groupChatDetail.tid}&scene=friendsGroup&tag=joinChat`, //点击链接进入的页面
            type: WEIXIN_OPEN, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        },
        fail: err => {
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

<style lang="scss">
@import '../components/com-chat.scss';

.msg-list {
    width: 100%;
    position: absolute;
    left: 0;
    padding: 0 0 60rpx 0;
}
</style>
