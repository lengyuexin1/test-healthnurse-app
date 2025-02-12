<template>
    <view class="tn-flex-column">
        <view @touchstart="hideDrawer">
            <scroll-view class="msg-list" scroll-y="true" :scroll-top="data.scrollTop" :scroll-with-animation="data.scrollAnimation"
                :scroll-into-view="data.scrollToView" @scrolltoupper="loadHistory" upper-threshold="50" :style="{ height: data.windowHeight }">

                <view class="nomore tn-flex-center-center">没有更多数据了~</view>
                <BcChatItem v-for="(item, index) in paper.data.items" :key="item.idClient" :item="item" :to="props.to" @resend="clickResend(item, index)"></BcChatItem>
            </scroll-view>
        </view>
        <!-- 抽屉栏 -->
        <view class="popup-layer" :class="data.popupLayerClass" @touchmove.stop.prevent="discard">
            <view class="more-layer tn-flex-row" :class="{ hidden: data.hideMore }">
                <view class="list">
                    <view class="box"><BcSelectImageBtn @uploadImage="openAuth" /></view>
                    <view class="box"><BcSelectCameraBtn @uploadImage="openAuth" /></view>
                    <view class="box"><BcSelectReportBtn @selectReport="selectReport" /></view>
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
                        <TnInput custom-class="box-input" v-model="data.inputText" :cursor-spacing="15" :border="true" @blur="textareaBlur" @focus="textareaFocus" />
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
    <BCNotify ref="bcNotify"></BCNotify>
    <yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" :permissionID="data.permissionID"></yk-authpup>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, watch, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import BCNotify from '@/components/notify/index.vue'
import BcChatItem from './chat-item.vue'
import BcSelectImageBtn from '../components/select-image-btn.vue'
import BcSelectCameraBtn from '../components/select-camera-btn.vue'
import BcSelectReportBtn from '../components/select-report-btn.vue'
import { LoveChatService, SessionSDK, sessionProvider, useLoveChatList } from '@bc/msg'
import { denounceCheck } from '@/api/nim-api'
import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'
import { gotoReportPage } from '@/routes/create-routes'
import { handleEnvAccount } from '@/utils/handleEnv'
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
    isDenounce: boolean
    denounceMsg: string
}

const data = reactive<Data>({
    windowHeight: '',
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
    isDenounce: true,
    denounceMsg: ''
})

interface Events {
    (e: 'closeChat', sessionId: string): void
}

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

// 详细会话信息
// const session = sessionProvider(`p2p-${props.to}`)

const paper = useLoveChatList(props.to, limit, (res) => {
    paper.data.items.push(res)
    scroll2Bottom()

    // 如果是激活状态的, 马上清除未读数
    SessionSDK.resetSessionUnread(`p2p-${props.to}`)
})

watch(() => data.inputText, (newVal, oldVal) => {
    if (newVal !== '') {
        data.hasTextInput = true
    }
    else {
        data.hasTextInput = false
    }
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(async () => {
    data.windowHeight = (await uni.getSystemInfo()).windowHeight - 100  + 'px'

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
    getDenounceCheck()
})

// 检测权限
const getDenounceCheck = () => {
    denounceCheck().then((res: any) => {
        data.isDenounce = res
    }).catch((err) => {
        data.denounceMsg = err.message
        data.isDenounce = false
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

const changeEmoji = (e: any) => {
    data.inputText = data.inputText + e
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

const selectReport = () => {
    SessionSDK.getUserById(props.to).then((res: any) => {
        gotoReportPage({    
            applicableTypes: 9,
            objectName: res.nick,
            objectId: handleEnvAccount(res.account)
        })
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

    LoveChatService.sendText(props.to, data.inputText, handleCallback()).finally(() => {
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
        bcNotify.value.error(data.denounceMsg)
        return
    }

    LoveChatService.sendImage(props.to, file, handleCallback())
}

// 发送语音消息
const sendAudio = (file: any) => {
    getDenounceCheck()
    if (!file) {
        return
    }
    if (!data.isDenounce) {
        bcNotify.value.error(data.denounceMsg)
        return
    }

    LoveChatService.sendAudio(props.to, file, handleCallback())
}

//点击重新发送消息
const clickResend = (item: any, index: number) => {
    item.status = 'sending'
    LoveChatService.resendMsg(item).then((msg) => {
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
const handleCallback = () => {
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

const upEmojiItem = (text:string) => {
    console.log('text',text);

    data.inputText = text
    sendText()

    
}

</script>

<style lang="scss">
@import '../components/com-chat.scss';

.msg-list {
    position: absolute;
    left: 0;
    padding: 0 0 10rpx 0;
}
</style>
