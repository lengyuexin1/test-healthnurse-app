<template>
    <!-- 猜你想问 -->
    <template v-if="props.item.from == 'robot'">
        <BcGuessMsg :to="props.to" @clickQuestion="clickQuestion" @clickGuessBtn="clickGuessBtn"></BcGuessMsg>
    </template>

    <!-- 正常聊天内容 -->
    <template v-else>
        <view class="chat-item-box tn-flex-row" :class="[chatStyle]" :style="chatitemboxMarginStyle">
            <BcUserAvatar :is-robot="isRobot" :avatar="user.avatar"></BcUserAvatar>

            <view class="main-box tn-flex-column" :style="mainboxMarginStyle">
                <view class="name-box tn-flex-row" :style="nameboxMarginStyle">
                    <view class="n">{{ name }}</view>
                    <view class="t">{{ dateTime }}</view>
                </view>
                <view class="cnt-box tn-flex-row">
                    <BcTextMsg :item="item" :class="[cntStyle]" v-if="messageComponent === 'textMsg'"></BcTextMsg>
                    <BcImgMsg :item="item" :class="[cntStyle]" v-else-if="messageComponent === 'imageMsg'"></BcImgMsg>
                    <BcAudioMsg :item="item" :class="[cntStyle]" v-else-if="messageComponent === 'audioMsg'"></BcAudioMsg>
                    <BcProductMsg :item="item" :class="[cntStyle]" v-else-if="messageComponent === 'productMsg'" @clickProductMsg="clickProductMsg"></BcProductMsg>
                    <BcOrderMsg :item="item" :class="[cntStyle]" v-else-if="messageComponent === 'orderMsg'" @clickOrderMsg="clickOrderMsg"></BcOrderMsg>
                    <BcResumeMsg :item="item" :class="[cntStyle]" v-else-if="messageComponent === 'resumeMsg'" @clickResumeMsg="clickResumeMsg"></BcResumeMsg>
                    <BcOtherMsg :item="item" :class="[cntStyle]" v-else></BcOtherMsg>

                    <TnLoading show type="info" v-if="loading" />
                    <TnIcon name="circle-arrow" type="danger" @click="clickResend" v-if="fail" />
                    <!-- <view class="flag" :class="receoptStyle">{{ receiptFlag }}</view> -->
                </view>
            </view>
            <view class="blank"></view>
            <TnModal ref="modalRef" />
        </view>
    </template>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import type { IMMessage } from "nim-web-sdk-ng/dist/NIM_BROWSER_SDK/MsgServiceInterface"
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp/components/modal'
import BcUserAvatar from '../components/user-avatar.vue'
import BcTextMsg from '../components/text-msg.vue'
import BcImgMsg from '../components/img-msg.vue'
import BcAudioMsg from '../components/audio-msg.vue'
import BcOrderMsg from '../components/order-msg.vue'
import BcProductMsg from '../components/product-msg.vue'
import BcResumeMsg from '../components/resume-msg.vue'
import BcGuessMsg from '../components/guess-msg.vue'
import BcOtherMsg from '../components/other-msg.vue'
import { gotoresumedetails, gotoOrderdetails } from "@bc/api/routes/message-routes"
import { useMsgReceiptEvent, userInfoProvider } from "@bc/msg"
import { handleEnvAccount } from "@/utils/handleEnv"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { gotoserviceDetail } from '@/routes/service-routes'
import dayjs from "dayjs"

//============================
/** 接口定义 */
//============================
interface IProps {
    /** 消息结构 */
    item: IMMessage
    to: string
}

interface Events {
    (e: "resend"): void
    (e: "clickQuestion", msg: any): void
    (e: "clickGuessBtn", msg: any): void
}

const modalRef = ref<TnModalInstance>()

//============================
/** 属性定义 */
//============================
const props = defineProps<IProps>()
// 头像和昵称
const user = userInfoProvider(props.item.from)
// 已读回执
const receipt = useMsgReceiptEvent(props.item)
const emit = defineEmits<Events>()

// 根据发送人和接受人，进行左右布局
const chatStyle = computed(() => {
    if (props.item.flow === "out") {
        return { "our-box": true }
    }
    return {}
})

const loading = computed(() => {
    return props.item.status === "sending"
})

const fail = computed(() => {
    return props.item.status === "sendFailed"
})

/** @returns {boolean} 小于10000 是客服机器人 */
const isRobot = computed(() => {
    const fromAccount = handleEnvAccount(props.item.from)
    return Number(fromAccount) < 10000
})

const name = computed(() => {
    if (isRobot.value) {
        return "客服机器人"
    }
    return user.value.nickName
})

const cntStyle = computed(() => {
    return props.item.type
})

const chatitemboxMarginStyle = computed(() => {
    return {
        [props.item.flow == 'in' ? 'marginLeft' : 'marginRight']: '20rpx'
    }
})

const mainboxMarginStyle = computed(() => {
    return {
        [props.item.flow == 'in' ? 'marginLeft' : 'marginRight']: '16rpx'
    }
})

const nameboxMarginStyle = computed(() => {
    return {
        [props.item.flow == 'in' ? 'marginLeft' : 'marginRight']: '12rpx'
    }
})

const dateTime = computed(() => {
    const datetime = dayjs(Number(props.item.time))
    const now = dayjs().startOf("d")
    if (datetime.isAfter(now)) {
        //今天
        return datetime.format("HH:mm")
    }
    return datetime.format("MM-DD HH:mm")
})

const messageComponent = computed(() => {
    const type = props.item.type
    if (type === "text") {
        return 'textMsg'
    }
    else if (type === "image") {
        return 'imageMsg'
    }
    else if (type === "audio") {
        return 'audioMsg'
    }
    else if (type === "custom") {
        if (props.item.attach?.msgType === "product") {
            return 'productMsg'
        }
        else if (props.item.attach?.msgType === "order") {
            return 'orderMsg'
        }
        else if (props.item.attach?.msgType === "resume") {
            return 'resumeMsg'
        }
    }

    return 'otherMsg'
})

const receiptFlag = computed(() => {
    if (receipt.status === 1) {
        return "已读"
    }
    else if (receipt.status === 0) {
        return "未读"
    }
    else {
        return ""
    }
})

const receoptStyle = computed(() => {
    return receipt.status === 0 ? "unread" : ""
})

//============================
/** 事件定义 */
//============================
const clickResend = () => {
    emit("resend")
}


// 查看简历详情
const clickResumeMsg = (id: string) => {
    gotoresumedetails(id)
}

// 查看订单详情
const clickOrderMsg = (orderId: string) => {
    gotoOrderdetails(orderId)
}

// 查看产品详情
const clickProductMsg = (id: string) => {
    console.log(props.item)
    if (props.item.attach?.templateCode == 131586) {
        gotogoodsDetail(id)
    } else {
        gotoserviceDetail(id)
    }
}

// 点击猜你想问
const clickQuestion = (msg: any) => {
    emit('clickQuestion', msg)
}

// 点击短句咨询
const clickGuessBtn = (msg: any) => {
    emit('clickGuessBtn', msg)
}

//============================
/** 方法定义 */
//============================

</script>

<style scoped lang="scss">
.chat-item-box {
    margin: 12rpx 12rpx 56rpx 12rpx;

    .blank {
        width: 96rpx;
    }
}

.name-box {
    align-items: center;
    margin-bottom: 12rpx;

    .n {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #666666;
    }

    .t {
        height: 34rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #8f9297;
        margin: 0 12rpx;

        background: #e7e9eb;
        border-radius: 8rpx;
        padding: 0 8rpx;
    }
}

.cnt-box {
    align-items: center;
    gap: 24rpx;

    .text,
    .audio,
    .custom {
        padding: 16rpx 20rpx;
        background: #ffffff;
        border-radius: 16rpx;
        position: relative;

        &::before {
            content: "";
            width: 0;
            height: 0;
            border: 24rpx solid transparent;

            border-right-color: #fff;
            position: absolute;
            left: -34rpx;
        }
    }

    .image {
        border-radius: 16rpx;
        overflow: hidden;
    }

    .flag {
        font-size: 24rpx;
        color: #8f9297;
    }

    .unread {
        color: #3e92ff;
    }
}

.our-box {
    flex-direction: row-reverse;

    .name-box {
        flex-direction: row-reverse;
    }

    .cnt-box {
        flex-direction: row-reverse;

        .text,
        .audio {
            color: white;
            background-color: #40A0FD;

            &::before {
                display: none;
            }

            &::after {
                content: "";
                width: 0;
                height: 0;
                border: 24rpx solid transparent;

                border-left-color: #40A0FD;
                position: absolute;
                right: -34rpx;
                top: 0;
            }
        }
        .custom {
            &::before {
                display: none;
            }

            &::after {
                content: "";
                width: 0;
                height: 0;
                border: 24rpx solid transparent;

                border-left-color: #fff;
                position: absolute;
                right: -34rpx;
                top: 0;
            }
        }
    }
}
</style>
