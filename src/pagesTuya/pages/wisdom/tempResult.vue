<template>
    <view class="container">
        <customNavbar :pageTitle="'测量结果'"></customNavbar>
        <view class="contents">
            <view class="title">体温</view>
            <view class="imgsTem">
                <image class="img_bg" :src="data.bgRect" mode="scaleToFill" />
                <image class="img_asd" :class="xuzsc" :src="data.sucdImg" mode="scaleToFill" />
            </view>
            <view class="temBum">{{ data.temNum }}°C</view>
            <view class="norm" :class="typecs">{{ isNomr }}</view>
            <view class="mayList">
                <view v-for="(item, index) in mayList" class="biaoq" :class="'ins' + index">{{ item }}</view>
            </view>
        </view>
        <view class="btns">
            <view class="btnOne">
                <TnButton width="100%" @click="save" height="70" text-color="#fff" font-size="32rpx" bg-color="#29C86F"
                    border-color="#29C86F">保存</TnButton>
            </view>
            <view class="btnTwo">
                <TnButton width="100%" @click="noSave" height="70" text-color="#fff" font-size="32rpx"
                    border-color="#ccc" bg-color="#ccc">丢弃</TnButton>
            </view>
        </view>
        <view class="tipsBox">
            <view class="tipsTitle">测量温度范围参考：</view>
            <view class="tipsText">1. 体温范围在36~37.2摄氏度之间, 则为正常</view>
            <view class="tipsText">2. 体温范围在37.3~38摄氏度之间, 则为低热</view>
            <view class="tipsText">3. 体温范围在38.1~39摄氏度之间, 则为中等热</view>
            <view class="tipsText">4. 体温范围在39.1~41摄氏度之间, 则为高热</view>
            <view class="tipsText">5. 体温超过41摄氏度, 则为超高热</view>
            <view class="tipsText">6. 体温低于36摄氏度, 则为低温</view>
        </view>

        <TnPopup v-model="data.createShow" open-direction="center" round="20">
            <view class="catebox">
                <view class="headedui">
                    <image class="left_img" :src="data.duiIcon" mode="scaleToFill" />
                    <view class="aginText">保存成功，是否继续测量？</view>
                </view>
                <view class="catebtn">
                    <TnButton width="100%" @click="gotoNext" height="70" text-color="#fff" font-size="32rpx"
                        bg-color="#29C86F" border-color="#29C86F">是</TnButton>

                    <TnButton width="100%" @click="gotoBack" height="70" text-color="#fff" font-size="32rpx"
                        bg-color="#111214" border-color="#E3E3E3">返回房间</TnButton>
                </view>
            </view>
        </TnPopup>
    </view>
</template>
<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { uploadReport } from "@/api/room-api"
import { onLoad } from "@dcloudio/uni-app"
// import { gotoRoomDetail } from "@/route/wisdom-routes"
import dayjs from "dayjs"
import { ref, reactive, computed } from "vue"

const data = reactive({
    mayList: ['低温', '正常', '低热', '中等热', '高热', '超高热'],
    temNum: '',
    macId: '',
    sucdImg: getAssetsPic("/agency/zrhes.png"),
    createShow: false,
    duiIcon: getAssetsPic("/agency/succed.svg"),
    bgRect: getAssetsPic("/agency/bgRect.svg")
})
const xuzsc = computed(() => {
    const flagTem = Number(data.temNum) * 100
    if (flagTem < 3720) {
        return 'lowwen'
    }
    else if (flagTem > 4100) {
        return 'xsz5'
    }
    else if (flagTem > 3900) {
        return 'xsz4'
    } if (flagTem > 3800) {
        return 'heightwen'
    }
    else if (flagTem > 3720) {
        return 'xsz3'
    }
})
const typecs = computed(() => {
    const flagTem = Number(data.temNum) * 100
    if (flagTem < 3600) {
        return 'ins0'
    }
    else if (flagTem > 4100) {
        return 'ins5'
    }
    else if (flagTem > 3900) {
        return 'ins4'
    }
    else if (flagTem > 3800) {
        return 'ins3'
    }
    else if (flagTem > 3720) {
        return 'ins2'
    }
    else if (flagTem > 3600) {
        return 'ins1'
    }
})
const isNomr = computed(() => {
    const flagTem = Number(data.temNum) * 100
    if (flagTem < 3600) {
        return '低温'
    }
    else if (flagTem > 4100) {
        return '超高热'
    }
    else if (flagTem > 3900) {
        return '高热'
    }
    else if (flagTem > 3800) {
        return '中等热'
    }
    else if (flagTem > 3720) {
        return '低热'
    }
    else if (flagTem > 3600) {
        return '正常'
    }
})

const save = () => {
    const sendData = {
        // mac: data.macId,
        mac: "E8:07:BF:00:11:71",
        data: data.temNum
    }
    console.log(sendData,123);
    uploadReport(sendData).then(res => {
        // this.createShow = true
        uni.showToast({
            icon: 'none',
            title: '保存成功'
        })
        setTimeout(() => { uni.navigateBack({ delta: 2 }) }, 1000)
    }).catch(err => {
        console.log(err)
    })
}
const noSave = () => {
    uni.showToast({
        icon: 'none',
        title: '丢弃成功'
    })
    setTimeout(() => { uni.navigateBack({ delta: 2 }) }, 1000)
}
const gotoBack = () => {
    data.createShow = false
    const roomId = uni.getStorageSync('roomId')
    gotoRoomDetail(roomId)
}

const gotoNext= () => {
    data.createShow = false
}

onLoad((option) => {
    const resultData = JSON.parse(option.tem)
    console.log(resultData)
    data.temNum = resultData.term
    data.macId = resultData.macId
})
</script>

<style lang="scss" scoped>
page {
    background: #ffffff;
}

.tipsBox {
    margin: 100rpx 40rpx 20rpx 40rpx;

    .tipsTitle {
        font-weight: 600;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 26rpx;
    }

    .tipsText {
        margin-bottom: 16rpx;
        font-size: 28rpx;
        color: #666666;
    }
}

.ins0 {
    background: #DEF6FF;
    color: #18B0CF;
}

.ins1 {
    color: #29C86F;
    background: #E5F9EE;
}

.ins2 {
    background: #FFF8C9;
    color: #FFAC1D;
}

.ins3 {
    color: #FF8800;
    background: #FFE8CB;
}

.ins4 {
    color: #FF4A11;
    background: #FFDAD1;
}

.ins5 {
    background: #FF4D4D;
    color: #FFFFFF;
}

.contents {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .mayList {
        position: absolute;
        bottom: 0rpx;
        right: 22rpx;
        font-size: 28rpx;

        .biaoq {
            margin-bottom: 16rpx;
            padding: 6rpx 8rpx;
            border-radius: 6rpx;
            text-align: center;
        }

    }

    .title {
        margin: 80rpx 0 40rpx 0;
        font-weight: 600;
        font-size: 42rpx;
        color: #2B1A1A;
    }

    .temBum {
        font-weight: 600;
        font-size: 52rpx;
        color: #29C86F;
        margin: 40rpx 0 10rpx 0;
    }

    .norm {
        font-size: 28rpx;
        // color: #29C86F;
        padding: 10rpx 20rpx;
        border-radius: 6rpx;
    }

    .blues {
        background: #E5F9EE;
    }

    .reds {
        background: #ffdace;
        color: #FF4A11FF;
    }

    .imgsTem {
        position: relative;
        margin-top: 30rpx;
        min-height: 250rpx;
        width: 100%;

        .img_asd {
            position: absolute;
            left: 50%;
            margin-left: -50rpx;
            top: 70rpx;
            width: 160rpx;
            height: 200rpx;
            transform-origin: center bottom;
            transform: rotate(-45deg)
        }

        .lowwen {
            margin-left: -60rpx;
            transform: rotate(-30deg)
        }

        .heightwen {
            transform: rotate(30deg);
            margin-left: -100rpx;
        }

        .xsz4 {
            transform: rotate(45deg);
            margin-left: -120rpx;
        }

        .xsz5 {
            transform: rotate(58deg);
            margin-left: -120rpx;
        }

        .xsz3 {
            transform: rotate(5deg);
            margin-left: -70rpx;
        }

        .img_bg {
            width: 460rpx;
            height: 260rpx;
            display: flex;
            margin: 0 auto;
        }
    }
}

.btns {
    display: flex;
    justify-content: center;
    margin: 120rpx 40rpx 0 40rpx;

    .btnOne {
        margin-right: 30rpx;
        height: 84rpx;
        width: 40%;
        border-radius: 30rpx;
        font-size: 32rpx;
    }

    .btnTwo {
        height: 84rpx;
        font-size: 32rpx;
        width: 40%;
        border-radius: 30rpx;
        color: #919191FF;
    }
}

.catebox {
    box-sizing: border-box;
    width: 620rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx;
    position: relative;

    .headedui {
        display: flex;
        flex-direction: column;
        align-items: center;

        .left_img {
            margin-top: 30rpx;
            margin-bottom: 30rpx;
            width: 160rpx;
            height: 160rpx;
        }

        .aginText {
            font-size: 32rpx;
            color: #333333;
            font-weight: 600;
            margin-bottom: 70rpx;
        }
    }
}

.catebtn {
    display: flex;
}
</style>
