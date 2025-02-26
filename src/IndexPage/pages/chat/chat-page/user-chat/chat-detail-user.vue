<template>
    <view class="tn-flex-column">
        <view @touchstart="hideDrawer">
            <scroll-view class="msg-list" scroll-y="true" :scroll-top="data.scrollTop" :scroll-with-animation="data.scrollAnimation"
                :scroll-into-view="data.scrollToView" @scrolltoupper="loadHistory" upper-threshold="50" :style="{ height: data.windowHeight, paddingBottom: data.msgProduct ? '230rpx': '' }">

                <view class="nomore tn-flex-center-center">没有更多数据了~</view>
                <BcChatItem v-for="(item, index) in paper.data.items" :key="item.idClient" :item="item" :to="props.to" 
                    @resend="clickResend(item, index)"
                    @clickQuestion="clickQuestion"
                    @clickGuessBtn="clickGuessBtn"
                    >
                </BcChatItem>
            </scroll-view>
        </view>
        <view class="newSer tn-flex-center-between" v-if="data.msgProduct">
            <image :src="data.msgProduct.thumb" mode="aspectFill" />
            <view class="newser_rig">
                <view class="newser_rig-tit tn-flex-center-between">
                    <view class="title tn-text-ellipsis-1">{{ data.msgProduct.name }}</view>
                    <TnIcon name="close" color="#717171" bold size="28rpx" @tap="data.msgProduct = null" />
                </view>
                <view class="newser_rig-subtit tn-text-ellipsis-1" v-if="data.msgProduct.desc">{{ data.msgProduct.desc }}</view>
                <view class="newser_rig-pic tn-flex-center-between">
                    <view>
                        ￥ <text>{{ moneyFilter(data.msgProduct.price) }}</text>
                        <template v-if="data.msgProduct.unitName">/{{ data.msgProduct.unitName }}</template>
                    </view>
                    <view class="newser_more-btn" @tap="sendSer">发送链接</view>
                </view>
            </view>
        </view>
        <!-- 抽屉栏 -->
        <view class="popup-layer" :class="data.popupLayerClass" @touchmove.stop.prevent="discard">
            <view class="more-layer tn-flex-row" :class="{ hidden: data.hideMore }">
                <view class="list">
                    <view class="box"><BcSelectImageBtn @uploadImage="openAuth" /></view>
                    <template v-if="[1, 2].includes(data.subjectType)">
                        <view class="box tn-flex-column" @click="openorder">
                            <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_orderList.png')" mode="scaleToFill" />
                            <view class="txt">查看订单</view>
                        </view>
                        <!-- <view class="box tn-flex-column" @click="openproduct">
                            <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_productList.png')" mode="scaleToFill" />
                            <view class="txt">发送商品</view>
                        </view> -->
                    </template>
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

            <!-- <view class="emoji_box">
                <view class="emoji_list">
                    <view class="emoji_item" v-for="(item,index) in data.emojiList" @click="upEmojiItem(item)" :key="index">
                        {{ item }}
                    </view>
                </view>
            </view> -->

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
        <BcSelectOrderBtn ref="mesOde" @sendOrder="sendCustomOrder" />
        <BcSelectProductBtn ref="selectRef" @sendProduct="sendCustomProduct" />
        <BcSelectResumeBtn ref="resumeRef" @sendResume="sendCustomResume" />
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
    <yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" :permissionID="data.permissionID"></yk-authpup>
</template>

<script setup lang="ts">
import { moneyFilter } from "@/common/filters"
import { ref, reactive, nextTick, onMounted, onUnmounted, watch, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import BCNotify from '@/components/notify/index.vue'
import BcChatItem from './chat-item.vue'
import BcSelectImageBtn from '../components/select-image-btn.vue'
import BcSelectOrderBtn from '../components/select-order-btn.vue'
import BcSelectProductBtn from '../components/select-product-btn.vue'
import BcSelectResumeBtn from '../components/select-resume-btn.vue'
import { PlatformManage } from "@bc/sys"
import { CustomerService, SessionSDK, sessionProvider, useCustomerList } from '@bc/msg'
import { closeChat, transferCustomerService, updateTeamMember, sessionEnd, robotSendMsg, transferArtificialConfigDetail, imTransferArtificial } from '@bc/api/im-api'
import { pageController } from '@bc/uni-tools'
import shinnXEmoji from '@/uni_modules/shinn-xEmoji/components/shinn-xEmoji/shinn-xEmoji.vue'
import emojiItem from '@/IndexPage/components/emojiItem/emojiItem.vue'

//============================
/** 接口定义 */
//============================
interface Props {
    /** 聊天对象的账号 */
    to: string
    /** 页面跳转来源 */
    originPage: string
    msgProduct: string
}

interface Data {
    windowHeight: string
    applyId: number
    scrollTop: number
    scrollAnimation: boolean
    scrollToView: string
    popupLayerClass: string
    hideMore: boolean
    hideEmoji: boolean
    popupType: string,
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
    subjectType: number
    transferArtificialConfig: number
    keyWordStr: any
    msgProduct: any
}

const data = reactive<Data>({
    windowHeight: '',
    applyId: 0,
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
    subjectType: 0,
    transferArtificialConfig: 0,
    keyWordStr: ['转人工服务', '转人工', '人工', '人工服务'],
    msgProduct: null
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
const session = sessionProvider(`team-${props.to}`)

const paper = useCustomerList(props.to, limit, (res) => {
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

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(async () => {
    data.windowHeight = (await uni.getSystemInfo()).windowHeight - 100  + 'px'

    if (props.msgProduct) {
        data.msgProduct = JSON.parse(props.msgProduct)
    }

    paper.loadmore().then(() => {
        scroll2Bottom()
    })

    PlatformManage.getToken().then((res: any) => {
        data.applyId = res.applyId
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

    initList()
})

onUnmounted(() => {
    // 记录离开当前会话的时间戳
    if ([1, 2].includes(data.subjectType)) {
        const nowTime = new Date().getTime()
        uni.setStorageSync(props.to, nowTime)
    }
})

const initList = () => {
    // 更新群成员
    updateTeamMember({ tid: props.to }).then(() => {})
    // 获取群信息
    SessionSDK.getTeamById(props.to).then((team) => {
        data.subjectType = team.subjectType
        
        if ([1, 2].includes(data.subjectType)) {
            SessionSDK.getTeamMemberById(data.subjectType + '').then((res) => {
                console.log(res);
                const startTime = uni.getStorageSync(props.to)
                console.log(startTime);
                
                const nowTime = new Date().getTime()
                const diffTime = nowTime - startTime
                if (res && res.length > 2 && startTime && diffTime > 1800000) {
                    // 离开超过30分钟，把客服踢出群, 只留下机器人和用户
                    sessionEnd({ tid: props.to }).then(() => {
                        uni.removeStorageSync(props.to)
                    })
                }
                if (startTime && diffTime > 1800000) {
                    // 离开会话超过30分钟，再次进来才会发欢迎语
                    uni.removeStorageSync(props.to)
                    sendWelcome(team.subjectName)
                }
                if (!startTime) {
                    // 第一次打开会话
                    sendWelcome(team.subjectName) 
                }
            })

            transferArtificialConfigDetail({ tid: props.to }).then((res) => {
                data.transferArtificialConfig = Number(res.value)
            })

            setTimeout(() => {
                paper.data.items.push({ from: 'robot' })
                nextTick(() => {
                    setTimeout(() => {
                        data.scrollTop = 99999
                        data.scrollAnimation = true
                    }, 400)
                })
            }, 1500)
        }
    })
}

const sendWelcome = (subjectName: string) => {
    setTimeout(() => {
        robotSendChatMsg('welcome', `您好，欢迎咨询${subjectName !== '' ? subjectName : '平台客服'}客服服务，让每一次心都值得，请问，有什么可以帮您的吗？`)
    }, 300)
}

/**
 * @param {type}
 * welcome:欢迎语；autoReply: 自动回复；transfer: 转人工
 * */
const robotSendChatMsg = (type: string, content: string, id?: number) => {
    robotSendMsg({
        userId: props.to,
        content: type === 'transfer' ? `系统正在为您转至【${content}】，请稍等...` : content
    }).then(() => {
        setTimeout(() => {
            nextTick(() => {
                data.scrollTop = 9999
                nextTick(() => {
                    data.scrollAnimation = true
                    if (id && [400000, 500000].includes(id)) {
                        transferArtificial()
                    }
                    if (id && [100000, 200000, 300000, 600000, 700000].includes(id)) {
                        robotSendChatMsg('autoReply', content)
                    }
                })
            })
        }, 650)
    })
}

// 转人工客服
const transferArtificial = () => {
    // let appType
    // // #ifdef APP-PLUS || H5
    // appType = 2
    // // #endif
    // // #ifdef MP-WEIXIN
    // appType = 1
    // // #endif

    imTransferArtificial({
        tid: props.to,
        // appType, // 应用类型：1-小程序；2-APP
        // appPage: props.originPage // 路径来源
    }).then(() => {
        
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
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

// 输入框失去焦点
const textareaBlur = () => {
    if (data.inputText == '') {
        data.hasTextInput = false
    }
}

// 选择表情
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

// 结束会话
const clickClose = () => {
    closeChat(props.to).then(() => {
        emit('closeChat', `team-${props.to}`)
    })
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

// 发送文字消息
const sendText = () => {
    hideDrawer() //隐藏抽屉
    if (!data.inputText) {
        return
    }

    if (data.keyWordStr.includes(data.inputText)) {
        robotSendChatMsg('transfer', '转人工服务', 400000)
    }

    CustomerService.sendText(props.to, data.inputText, handleCallback()).finally(() => {
        data.inputText = ''
    })
}

// 发送图片消息
const sendImage = (file: any) => {
    if (!file) {
        return
    }

    CustomerService.sendImage(props.to, file, handleCallback())
}

// 发送语音消息
const sendAudio = (file: any) => {
    if (!file) {
        return
    }

    CustomerService.sendAudio(props.to, file, handleCallback())
}

const mesOde = ref()
// 打开发送订单菜单
const openorder = () => {
    console.log('session.teamExt.value?.owner', session.teamExt.value?.owner)
    mesOde.value.changeshow(session.teamExt.value?.owner)
}

// 发送订单
const sendCustomOrder = (event: any) => {
    if (!event) {
        return
    }

    CustomerService.sendCustom(props.to, event, handleCallback())
}

const resumeRef = ref()
// 打开发送简历菜单
const openresume = () => {
    resumeRef.value.changeshow()
}

// 发送自定义消息-简历
const sendCustomResume = (event: any) => {
    if (!event) {
        return
    }

    CustomerService.sendCustom(props.to, event, handleCallback())
}

const selectRef = ref()
const openproduct = () => {
    selectRef.value.changeshow()
}

// 发送自定义消息-产品/商品
const sendCustomProduct = (event: any) => {
    if (!event) {
        return
    }

    CustomerService.sendCustom(props.to, event, handleCallback())
}

// 发送服务
const sendSer = (event: any) => {
    if (!event) {
        return
    }
    hideDrawer()

    CustomerService.sendCustom(props.to, JSON.stringify(data.msgProduct), handleCallback()).finally(() => {
        data.msgProduct = null
    })
}

//点击重新发送消息
const clickResend = (item: any, index: number) => {
    item.status = 'sending'
    CustomerService.resendMsg(item).then((msg) => {
        paper.data.items.splice(index, 1, msg)
    }).catch(() => {
        item.status = 'sendFailed'
    })
}

const tranderRef = ref()
const clickTranfercustomer = () => {
    tranderRef.value.changeshow()
}

const tranferCustomerService = (customerServiceId: string, customerName: string) => {
    transferCustomerService({ tid: props.to, customerServiceId }).then(() => {
        bcNotify.value.show(`成功转接给${customerName}`)
        setTimeout(() => {
            pageController.back()
        }, 1500)
    }).catch((err) => {
        bcNotify.value.error(err.message)
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

            if (sort === 'question') {
                setTimeout(() => {
                    robotSendChatMsg('autoReply', JSON.stringify(answer))
                }, 1000)
            }
            else if (sort === 'shortSentence') {
                setTimeout(() => {
                    robotSendChatMsg('transfer', content, id)
                }, 1000)
            }
            else {
                SessionSDK.getTeamMemberById(props.to).then((res) => {
                    if (res && res.length <= 2) {
                        data.transferArtificialConfig == 1 && transferArtificial()
                    }
                })
            }
            scroll2Bottom()
        },
        onError: () => {
            index >= 0 && (paper.data.items[index].status = 'sendFailed')
        }

    } as TSendMessageCallback
}

const clickQuestion = (msg: any) => {
    CustomerService.sendText(props.to, msg.question, handleCallback(msg.question, 'question', msg.answer, msg.id)).finally(() => {

    })
}

const clickGuessBtn = (msg: any) => {
    console.log(msg);
    
    CustomerService.sendText(props.to, msg.name, handleCallback(msg.name, 'shortSentence', '', msg.id)).finally(() => {

    })
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
