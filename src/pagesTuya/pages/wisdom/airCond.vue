<template>
    <z-paging ref="paging" :auto="false" :refresher-enabled="false">
        <template #top>
            <PageTopbg :zIndex="-1"></PageTopbg>
            <bc-page-navbar :title="'冷暖新风控制'"></bc-page-navbar>
        </template>
        <view class="contentBox">
            <view class="topTem">{{ temPe }}°C</view>
            <view class="opOrclo" @click="openOrClose">
                <image v-if="trunOn" class="imgbox1" :src="getAssetsUrl('/device/airCond/close.svg')" alt="" />
                <image v-else class="imgbox1" :src="getAssetsUrl('/device/airCond/on.svg')" alt="" />
                <view class="textOp">{{ trunOn ? '关闭' : '开启' }}</view>
            </view>
            <view class="temChange">
                <view class="temp">温度调节</view>
                <view class="addBox">
                    <view class="imgbox2">
                        <TnIcon @click="addNum(1)" name="add" color="#fff" size="58" :bold="true" />
                    </view>
                    <view class="temNum">{{ temPe }}°C</view>
                    <view class="imgbox2">
                        <TnIcon @click="addNum(2)" class="imgbox2" name="reduce" color="#fff" size="58" :bold="true" />
                    </view>

                </view>
            </view>
            <view class="speed">
                <view class="spdEed">
                    <span class="adpsu">风速</span>I<span class="changeText">{{ speedValue }}</span>
                </view>
                <view class="uilist">
                    <view class="its" v-for="(item, index) in speedList" :key="index" @click="dianSpe(index, item)">
                        <image class="imgbox2" :src="speedNum == index ? getAssetsUrl(item.img1) : getAssetsUrl(item.img)"
                            alt="" />
                        <view class="spedText">{{ item.text }}</view>
                    </view>
                </view>
            </view>
            <!-- <view class="topbot">
                <view class="topbotTop">
                    <view class="contSao">
                        <image class="imgbox2" :src="getAssetsUrl('/device/airCond/erdu.png')" alt="" />
                        <view>扫风</view>
                    </view>
                    <TnSwitch v-model="selectValue" @change="switchClick" active-color="#29C86F" />
                </view>
                <view class="twoBtns">
                    <TnButton width="45%" v-for="(item, index) in 2" @click="saoSepd(index)" height="90" font-size="32rpx"
                        :text-color="index == btnFal ? '#fff' : '#6A6A6A'"
                        :bg-color="index == btnFal ? '#29C86F' : '#e3e3e3'">{{ index == 0 ? '上下扫风' :
                            '左右扫风'
                        }}</TnButton>
                </view>
            </view> -->
            <view class="modelBox">
                <view class="title">模式</view>
                <view class="items">
                    <view class="verycs" v-for="(item, index) in moduList" :key="index"
                        @click="modulChange(index, item)">
                        <image class="imgbox2" :src="modulNum == index ? getAssetsUrl(item.img1) : getAssetsUrl(item.img)"
                            alt="" />
                        <view>{{ item.text }}</view>
                    </view>
                </view>
            </view>
            <!-- <view class="topbot lastb">
            <view class="topbotTop">
                <view class="contSao">
                    <image class="imgbox2" :src="getAssetsUrl('/device/airCond/time.png')" alt="" />
                    <view>延时关闭</view>
                </view>
                <TnSwitch v-model="switValue" @change="switchClick" active-color="#29C86F" />
            </view>
            <view class="twoBtns">
            </view>
        </view> -->
        </view>
    </z-paging>
</template>
<script setup lang="ts">
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import { tuyaDetail, dowmCom, tuyaCommand } from "@/api/room-api"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import { onLoad } from '@dcloudio/uni-app'

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const selectValue = ref(true)
const switValue = ref(true)
const trunOn = ref(false)
const switchClick = () => {
    console.log(selectValue.value)
}
const btnFal = ref(0)
const modulNum = ref(0)
const speedNum = ref(0)
const speedValue = ref('自动')
const moduList = ref([
    { img: '/device/airCond/modey1.svg', img1: '/device/airCond/modey10.svg', text: '制冷', value: '0' },
    { img: '/device/airCond/modey2.svg', img1: '/device/airCond/modey9.svg', text: '制热', value: '1' },
    { img: '/device/airCond/modey5.svg', img1: '/device/airCond/modey8.svg', text: '自动', value: '2' },
    { img: '/device/airCond/modey3.svg', img1: '/device/airCond/modey7.svg', text: '送风', value: '3' },
    { img: '/device/airCond/modey4.svg', img1: '/device/airCond/modey6.svg', text: '除湿', value: '4' },
])

const speedList = ref([
    { img: '/device/airCond/speed1.svg', img1: '/device/airCond/speed5.svg', text: '自动', value: '0' },
    { img: '/device/airCond/speed2.svg', img1: '/device/airCond/speed6.svg', text: '低速', value: '1' },
    { img: '/device/airCond/speed3.svg', img1: '/device/airCond/speed7.svg', text: '中速', value: '2' },
    { img: '/device/airCond/speed4.svg', img1: '/device/airCond/speed8.svg', text: '高速', value: '3' }
])
const devId = ref()
const snId = ref()
onLoad((option: any) => {
    devId.value = option.id
    tuyaDetail(option.id).then((res: any) => {
        // listNum.value = res.attributes.filter((item: any) => {
        //     return item.code.includes('switch')
        // })
        console.log(res)
        snId.value = res.sn
        if (res.attributes.length > 0) {
            const hasGk = res.attributes.filter(item => item.code == 'switch_1')
            if (hasGk.length > 0) {
                hasGk[0].state == 0 ? trunOn.value == false : trunOn.value = true
            }
            // const hasTem = res.attributes.filter(item => item.code == 'target_temp')
            // if (hasTem.length > 0) {
            //     temPe.value = hasTem[0].state
            // }
        }
    })
})

const modulChange = (index: number, item: any) => {
    modulNum.value = index
    const sendData = {
        commands: {
            code: 'mode',
            value: item.value
        },
        infraredId: snId.value
    }
    sendComApi(sendData)
}

const sendComApi = (sendData: any) => {
    dowmCom(sendData).then(res => {
        console.log(res)
    })
}
const dianSpe = (index: number, item: any) => {
    speedNum.value = index
    speedValue.value = speedList.value[index].text
    const sendData = {
        commands: {
            code: 'wind',
            value: item.value
        },
        infraredId: snId.value
    }
    sendComApi(sendData)
}

const openOrClose = () => {
    trunOn.value = !trunOn.value
    const sendData = {
        commands: {
            code: 'power',
            value: trunOn.value ? '1' : '0'
        },
        infraredId: snId.value
    }
    trunOp(sendData)
}

const trunOp = (sendData: any) => {
    const sends = {
        "commands": [
            {
                "code": 'switch_1',
                "value": trunOn.value
            }
        ],
        "deviceId": devId.value
    }
    tuyaCommand(sends).then(res => {
        sendComApi(sendData)
    })
}

const addNum = (type: number) => {
    if (type == 1) {
        temPe.value++
    } else {
        temPe.value--
    }
    const sendData = {
        commands: {
            code: 'temp',
            value: temPe.value
        },
        infraredId: snId.value
    }
    sendComApi(sendData)
}

const saoSepd = (index: number) => {
    console.log(index)
    btnFal.value = index
}

const temPe = ref(24)
</script>
<style scoped lang="scss">
page {
    background-color: #fff !important;
}

.contentBox {
    margin: 0 30rpx;

    .topTem {
        text-align: center;
        font-weight: 600;
        font-size: 92rpx;
        color: #333333;
        margin-top: 60rpx;
    }

    .opOrclo {
        width: 100%;
        margin-top: 40rpx;
        height: 160rpx;
        background: #F6F6F6;
        border-radius: 18rpx 18rpx 18rpx 18rpx;
        display: flex;
        align-items: center;

        .imgbox1 {
            width: 80rpx;
            height: 80rpx;
            margin-left: 40rpx;
            margin-right: 24rpx;
        }
    }

    .textOp {
        font-size: 32rpx;
        color: #5D5D5D;
    }

    .temChange {
        margin-top: 20rpx;
        width: 100%;
        height: 278rpx;
        background: #F6F6F6;
        border-radius: 18rpx 18rpx 18rpx 18rpx;
        padding: 36rpx;
    }

    .addBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 40rpx;

        .imgbox2 {
            width: 112rpx !important;
            height: 112rpx !important;
            background: #29C86F !important;
            border-radius: 50% !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .temNum {
            font-weight: 600;
            font-size: 48rpx;
            color: #5D5D5D;
        }
    }

    .temp {
        font-size: 28rpx;
        color: #5D5D5D;
    }

    .speed {
        width: 100%;
        height: 292rpx;
        background: #F6F6F6;
        border-radius: 18rpx 18rpx 18rpx 18rpx;
        padding: 36rpx;
        margin-top: 20rpx;

        .spdEed {
            font-size: 28rpx;
            color: #5D5D5D;

            .adpsu {
                padding-right: 20rpx;
            }

            .changeText {
                margin-left: 20rpx;
                color: #29C86F;
            }
        }

        .uilist {
            margin-top: 36rpx;
            display: flex;
            justify-content: space-around;

            .its {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .imgbox2 {
                width: 88rpx;
                height: 88rpx;
                margin-bottom: 16rpx;
            }

            .spedText {
                font-size: 28rpx;
                color: #5D5D5D;
            }
        }
    }

    .topbot {
        padding: 36rpx;
        margin-top: 20rpx;
        width: 100%;
        height: 256rpx;
        background: #F6F6F6;
        border-radius: 18rpx 18rpx 18rpx 18rpx;

        .topbotTop {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .contSao {
                display: flex;
                align-items: center;

                .imgbox2 {
                    width: 64rpx;
                    height: 64rpx;
                    margin-right: 26rpx;
                }
            }
        }

        .twoBtns {
            margin-top: 40rpx;
            display: flex;
            justify-content: space-between;
        }
    }

    .lastb {
        height: 216rpx;
    }

    .modelBox {
        margin-top: 20rpx;
        margin-bottom: 30rpx;
        width: 100%;
        height: 286rpx;
        background: #F6F6F6;
        ;
        border-radius: 18rpx 18rpx 18rpx 18rpx;

        .title {
            padding: 36rpx;
        }

        .items {
            display: flex;
            // flex-direction: column;
            align-items: center;
            padding: 0 36rpx;
            justify-content: space-around;

            .imgbox2 {
                width: 88rpx;
                height: 88rpx;
                margin-bottom: 16rpx;
            }
        }

        .verycs {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>