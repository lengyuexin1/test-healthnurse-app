<template>
    <view class="container tn-flex-column" :style="{ height: props.parentHeight + 'px' }">
        <!-- <view class="setting tn-flex-center-between">
            <view class="AI-wrap tn-flex-row">
                <image class="AI" :src="getAssetsUrl('/leyou/assets/AI.png')" mode="scaleToFill" />
                享老AI助手
            </view>
            <TnIcon name="set" color="#5C6582" size="40" @tap="clickAISetting"/>
        </view> -->

        <view class="list tn-flex-column">
            <scroll-view scroll-y :scroll-top="data.scrollTop" :style="{ height: props.parentHeight - 66 + 'px' }">
                <view class="left">
                    <view class="content">Hi！我是保椿生活AI聊天机器人，您有问题可以随便问我~</view>
                </view>
                <block v-for="(item, index) in data.historyTextList" :key="index">
                    <view class="left" v-if="item.role == 'assistant'">
                        <view class="content">{{ item.content }}</view>
                    </view>
                    <view class="right" v-else-if="item.role == 'user'">
                        <view class="content">{{ item.content }}</view>
                    </view>
                </block>
            </scroll-view>
        </view>

        <view class="mask" v-if="data.isRecord"></view>
        <view class="record tn-flex-column" v-if="data.isRecord">
            <TnIcon name="voice-fill" color="#D59157" size="80" />
            <view class="txt">录音中({{ data.seconds }})秒...</view>
            <view class="btn-wrap tn-flex-row">
                <view>
                    <TnButton shape="round" width="200rpx" height="68rpx" font-size="28rpx" bg-color="#FFEBE9" text-color="#EA3E1A" @tap="clickCancel">
                        取消录音
                    </TnButton>
                </view>
                <view class="right-btn">
                    <TnButton shape="round" width="200rpx" height="68rpx" font-size="28rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickConfirm">
                        完成确认
                    </TnButton>
                </view>
            </view>
        </view>

        <view class="input tn-flex-row">
            <view class="icon tn-flex-center-center" @tap="clickOnStart">
                <TnIcon name="voice-fill" color="#5C6582" size="40" />
            </view>
            <view class="input-wrap">
                <view class="inputSingle" @tap="clickInput">点击输入问题</view>
            </view>
        </view>
        <view class="floatInput-wrap tn-flex-row" :style="{ bottom: data.inputHeight + 'px' }" v-if="data.floatInput">
            <view class="tn-flex-1">
                <input
                    class="floatInput"
                    v-model="data.TEXT"
                    placeholder="输入您的问题"
                    :focus="data.inputFocus"
                    :adjust-position="false"
                    :confirm-hold="true"
                    @focus="inputFocusEvent"
                    @blur="inputBlurEvent"
                    @keyboardheightchange="inputFocusEvent">
                </input>
            </view>

            <view :class="[ 'btn tn-flex-center-center', data.btnDisable ? 'active' : '' ]" @touchend.stop.prevent="clickSend">
                <TnButton shape="round" width="100%" height="68rpx" font-size="28rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true">
                    {{ data.btnDisable ? '回答中' : '发送' }}
                </TnButton>
            </view>
        </view>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import * as Base64 from "base-64"
import CryptoJS from 'crypto-js'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { getAssetsPic } from '@/common/setPicture'
import { saveChatXunFei } from '@/api/user-api'
import { gotoAISetting } from '@/routes/user-routes'
import BCNotify from '@/components/notify/index.vue'
import { addWEventsListener, GlobalEvents } from '@/events/event-registry'
import { uploadAudio } from '@/api/file-api'
import { speechText } from '@/api/user-api'

interface Props {
    parentHeight: number
    topViewHeight: number
    barHeight: number
}

interface Data {
    height: number
    scrollTop: number,
    isClearContext: boolean
    btnDisable: boolean
    TEXT: string
    httpUrl: string
    modelDomain: string
    APPID: string
    APISecret: string
    APIKey: string
    sparkResult: string
    historyTextList: any
    tempRes: string,
    
    // #ifndef H5
    RECORDER: any
    recordLength: number
    recordTimer: null,
    // #endif
    seconds: number
    countdownInterval: any
    isRecord: boolean
    handleStop: boolean
    showOverlay: boolean

    floatInput: boolean
    inputFocus: boolean
    inputHeight: number
}

const props = defineProps<Props>()

const data = reactive<Data>({
    height: 0,
    scrollTop: 0,
    isClearContext: false,
    btnDisable: false,
    TEXT: '',
    // 地址必须填写，代表着大模型的版本号！！！！！！！！！！！！！！！！
    httpUrl: "https://spark-api.xf-yun.com/v3.1/chat",
    modelDomain: '', // V1.1-V3.5动态获取，高于以上版本手动指定
    APPID: 'b40ddb1d', // 控制台获取填写
    APISecret: 'OTdjOTk1ZmVhMGI2MjJkZjZkMTI1NTA4',
    APIKey: '7376d518207e7410526f442dd7b1a0c7',
    sparkResult: '',
    historyTextList: [], // 历史会话信息，由于最大token12000,可以结合实际使用，进行移出
    tempRes: '', // 临时答复保存

    // #ifndef H5
    RECORDER: uni.getRecorderManager(),
    recordTimer: null,
    recordLength: 0,
    // #endif
    seconds: 60,
    countdownInterval: null,
    isRecord: false,
    handleStop: false,
    showOverlay: true,

    floatInput: false,
    inputFocus: false,
    inputHeight: 0
})

const bcNotify = ref()

// const getAssetsUrl = computed(()=>(src:string)=> {
//     return getAssetsPic(src)
// })

const clickInput = () => {
    data.floatInput = true
    data.inputFocus = true
}

const inputBlurEvent = (e: any) => {
    data.floatInput = false
    data.inputFocus = false
}

// 监听input获取焦点、键盘高度的变化
const inputFocusEvent = (e: any) => {
    // #ifdef APP-PLUS || MP-WEIXIN
    data.inputHeight = e.detail?.height
    // #endif

    // 兼容网页版（调试用）
    // #ifdef H5
    data.inputHeight = 55
    // #endif
}

const sendToSpark = async () => {
    let myUrl = await getWebSocketUrl()
    data.tempRes = ""
    // this.sparkResult = "";
    // let realThis = this
    let socketTask: any
    socketTask = uni.connectSocket({
        //url: encodeURI(encodeURI(myUrl).replace(/\+/g, '%2B')),
        url: myUrl,
        method: 'GET',
        success: res => {
            console.log(res, "ws成功连接...", myUrl)
            // socketTask.wsLiveFlag = true;
        }
    })
    console.log(socketTask);
    
    socketTask.onError((res: any) => {
        console.log("连接发生错误，请检查appid是否填写", res)
    })
    socketTask.onOpen((res: any) => {
        data.historyTextList.push({
            "role": "user",
            "content": data.TEXT.trim()
        })
        console.log(data.historyTextList);
        
        console.info("wss的onOpen成功执行...", res)
        // 第一帧..........................................
        console.log('open成功...')
        let params = {
            "header": {
                "app_id": data.APPID,
                "uid": "aef9f963-7"
            },
            "parameter": {
                "chat": {
                    "domain": data.modelDomain,
                    "temperature": 0.5,
                    "max_tokens": 500
                }
            },
            "payload": {
                "message": {
                    "text": data.isClearContext ? [data.historyTextList[data.historyTextList.length - 1]] : data.historyTextList
                }
            }
        };
        console.log("请求的params：" + JSON.stringify(params))
        data.sparkResult = data.sparkResult + "\r\n我：" + data.TEXT + "\r\n"
        data.sparkResult = data.sparkResult + "大模型："
        console.log("发送第一帧...", params)
        socketTask.send({ // 发送消息，，都用uni的官方版本
            data: JSON.stringify(params),
            success() {
                console.log('第一帧发送成功')
            }
        });
        data.TEXT = ''
        setTimeout(() => {
            data.scrollTop = data.scrollTop + 10
        }, 0)
    });

    // 接受到消息时
    socketTask.onMessage((res: any) => {
        console.log('收到API返回的内容：', res.data);
        let obj = JSON.parse(res.data)
        // console.log("我打印的"+obj.payload);
        let dataArray = obj.payload.choices.text;
        if (obj.header.status == 0) {
            data.historyTextList.push({
                "role": 'assistant',
                "content": ''
            })
        }
        for (let i = 0; i < dataArray.length; i++) {
            data.sparkResult = data.sparkResult + dataArray[i].content
            data.tempRes = data.tempRes + dataArray[i].content
            data.historyTextList[data.historyTextList.length - 1].content = data.tempRes + dataArray[i].content
            
            setTimeout(() => {
                data.scrollTop = data.scrollTop + 100
            }, 0)
        }
        // realThis.sparkResult =realThis.sparkResult+ 
        let temp = JSON.parse(res.data)
        // console.log("0726",temp.header.code)
        if (temp.header.code !== 0) {
            console.log(`${temp.header.code}:${temp.message}`);
            socketTask.close({
                success(res: any) {
                    console.log('关闭成功', res)
                    // socketTask.wsLiveFlag = false;
                },
                fail(err: any) {
                    console.log('关闭失败', err)
                }
            })
        }
        if (temp.header.code === 0) {
            if (res.data && temp.header.status === 2) {
                // data.sparkResult = data.sparkResult +
                //     "\r\n**********************************************"
                // data.historyTextList.push({
                //     "role": "assistant",
                //     "content": data.tempRes
                // })

                /* let dataArray= obj.payload.choices.text;
                for(let i=0;i<dataArray.length;i++){
                    realThis.sparkResult =realThis.sparkResult+ dataArray[i].content
                } */
                setTimeout(() => {
                    socketTask.close({
                        success(res: any) {
                            console.log('关闭成功', res)
                        },
                        fail(err: any) {
                            // console.log('关闭失败', err)
                        }
                    })
                    /** 把答案和问题保存到自己服务器 */
                    saveChat()
                }, 1000)
            }
        }
    })
}

// 鉴权
const getWebSocketUrl = () => {
    console.log(data.httpUrl)
    var httpUrlHost = (data.httpUrl).substring(8, 28);
    var httpUrlPath = (data.httpUrl).substring(28);
    console.log(httpUrlHost)
    console.log(httpUrlPath)
    switch (httpUrlPath) {
        case "/v1.1/chat":
            data.modelDomain = "general";
            break;
        case "/v2.1/chat":
            data.modelDomain = "generalv2";
            break;
        case "/v3.1/chat":
            data.modelDomain = "generalv3";
            break;
        case "/v3.5/chat":
            data.modelDomain = "generalv3.5";
            break;
    }
    console.log(data.modelDomain)


    return new Promise((resolve, reject) => {
        // https://spark-api.xf-yun.com/v1.1/chat  V1.5 domain general
        // https://spark-api.xf-yun.com/v2.1/chat  V2.0 domain generalv2
        var url = "wss://"+httpUrlHost+httpUrlPath;
        var host = "spark-api.xf-yun.com";
        var apiKeyName = "api_key";
        var date = new Date().toUTCString();
        
        var algorithm = "hmac-sha256";
        var headers = "host date request-line";
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrlPath} HTTP/1.1`;
        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, data.APISecret);
        var signature = CryptoJS.enc.Base64.stringify(signatureSha);
        var authorizationOrigin = `${apiKeyName}="${data.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
        var authorization = Base64.encode(authorizationOrigin);
        url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

        console.log(url)
        resolve(url); // 主要是返回地址
    })
}

// 极速语音转写

const clickOnStart = () => {
    if (data.isRecord == false) {
        //录音开始
        data.RECORDER.start({
            format: "mp3",
            sampleRate: 16000
        })
    }
    else {
        bcNotify.value.show('您操作太快了')
    }
}

const countDown = () => {
    data.countdownInterval = setInterval(() => {
        data.seconds--

        if (data.seconds <= 0) {
            data.RECORDER.stop()
            data.handleStop = false
            // clearInterval(data.countdownInterval)
            // data.countdownInterval = null
        }
    }, 1000)
}

const clickCancel = () => {
    data.handleStop = true
    data.RECORDER.stop()
}

const clickConfirm = () => {
    data.handleStop = false
    data.RECORDER.stop()
}

const clickSend = () => {
    if (data.btnDisable) {
        bcNotify.value.show('AI正在回复，请稍后再试')
        data.inputFocus = true
        return
    }
    if (data.TEXT.trim() == '') {
        bcNotify.value.show('你还没输入内容哦')
        data.inputFocus = true
        return
    }

    sendToSpark()
    data.inputFocus = false
    data.btnDisable = true
}

const saveChat = () => {
    const len = data.historyTextList.length
    saveChatXunFei({
        question: data.historyTextList[len - 2].content,
        reply: data.historyTextList[len - 1].content,
    }).then((res: any) => {
        setTimeout(() => {
            data.btnDisable = false
        }, 1000)
    }).finally(() => {
        setTimeout(() => {
            data.btnDisable = false
        }, 1000)
    })
}

const clickAISetting = () => {
    gotoAISetting()
}

const listener = () => {
    addWEventsListener(GlobalEvents.Del_Chat_Context, () => {
        data.isClearContext = true
    })
    addWEventsListener(GlobalEvents.Del_Chat_Session, () => {
        data.historyTextList = []
    })
}

onMounted(() => {
    listener()

    // #ifndef H5
    // 录音开始事件
    data.RECORDER.onStart(() => {
        data.isRecord = true
        data.handleStop = false
        countDown()
    })

    // 录音结束事件
    data.RECORDER.onStop((e: any) => {
        data.isRecord = false
        
        if (data.handleStop) {
            console.log('取消录音发送')
        }
        else {
            uni.showLoading({
                title: '语音识别中...'
            })
            uploadAudio(e.tempFilePath).then((oss: any) => {
                console.log(oss)
                console.log('%c [ oss ]-477', 'font-size:13px; background:pink; color:#bf2c9f;', oss)
                
                speechText({ url: oss.url }).then((res: any) => {
                    console.log('%c [ res ]-480', 'font-size:13px; background:pink; color:#bf2c9f;', res)
                    data.TEXT = res
                    clickSend()
                }).catch((err: any) => {
                    bcNotify.value.show(err.message)
                }).finally(() => {
                    uni.hideLoading()
                })
            })
        }

        clearInterval(data.countdownInterval)
        data.seconds = 60
        data.handleStop = false
    })
    // #endif
})

</script>
  
<style lang="scss" scoped>
.container {
    width: 100%;
    flex: 1;
    background-color: white;
    position: relative;

    .setting {
        height: 92rpx;
        padding: 0 20rpx;
        background: linear-gradient(90deg, #F8FAFF 0%, #F0F4FF 100%);

        .AI-wrap {
            font-size: 26rpx;
            color: #575C6A;
            align-items: center;
            
            .AI {
                width: 68rpx;
                height: 68rpx;
                margin-right: 10rpx;
            }
        }
    }

    .list {
        flex: 1;
        padding: 0 30rpx;
        font-size: 30rpx;

        .left {
            display: flex;
            justify-content: flex-start;

            .content {
                display: inline-block;
                padding: 24rpx;
                margin: 15rpx 0;
                color: #171717;
                background: #F5F5F5;
                border-radius: 28rpx 28rpx 28rpx 0;
            }
        }

        .right {
            display: flex;
            justify-content: flex-end;

            .content {
                display: inline-block;
                padding: 24rpx;
                margin: 15rpx 0;
                color: #FFFFFF;
                background: linear-gradient(88deg, #FF8D8D 0%, #EA3E1A 100%);
                border-radius: 28rpx 28rpx 0 28rpx;
            }
        }
    }

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }

    .record {
        width: 500rpx;
        min-height: 80rpx;
        padding: 30rpx 20rpx;
        align-items: flex-start;
        color: #FFFFFF;
        font-size: 30rpx;
        background-color: #FFFFFF;
        border-radius: 12rpx;
        align-items: center;
        position: absolute;
        left: 50%;
        top: 30%;
        z-index: 200;
        margin-left: -250rpx;

        .txt {
            color: #D59157;
            margin-left: 30rpx;
            margin-top: 10rpx;
        }

        .btn-wrap {
            margin-top: 50rpx;

            .right-btn {
                margin-left: 30rpx;
            }
        }
    }

    .input {
        height: 120rpx;
        padding: 24rpx;
        align-items: center;
        border-top: solid 2rpx #F2F6FF;
        background: #fff;

        .icon {
            width: 98rpx;
            height: 68rpx;
            margin-right: 20rpx;
            border-radius: 34rpx;
            background-color: #ECF1FE;
        }

        .input-wrap {
            display: flex;
            flex: 1;
            background-color: #F5F5F5;
            border-radius: 34rpx;

            .voice {
                width: 100%;
                height: 68rpx;
                align-items: center;
                justify-content: center;
            }

            .inputSingle {
                flex: 1;
                height: 68rpx;
                padding-left: 20rpx;
                line-height: 68rpx;
                color: #999999;
                text-align: left;
                background-color: #F5F5F5;
                border-radius: 34rpx;
            }
        }
    }

    .floatInput-wrap {
        position: fixed;
        left: 0;
        width: 100%;
        padding: 24rpx;
        border-top: solid 2rpx #F2F6FF;
        background-color: #FFFFFF;

        .floatInput {
            flex: 1;
            height: 68rpx;
            padding-left: 20rpx;
            color: #333333;
            background-color: #F5F5F5;
            border-radius: 34rpx;
        }
        .btn {
            width: 150rpx;
            margin-left: 20rpx;

            &.active {
                opacity: .6;
            }
        }
    }
}
</style>
 