<template>
    <view class="jindBox">
        <TnLineProgress :percent="progressPercent" :stripe-animated="false" :stripe="true" />
        <!-- <view class="sdsq">
            <TnLineProgress height="100vh" :percent="progressPercent" :stripe-animated="false" :stripe="true" />
        </view> -->
    </view>
    <bc-page-navbar :title="'窗帘伴侣'" :iconColor="'#000'" :textColor="'#000'"></bc-page-navbar>
    <view class="abs">
        <view class="btns">
            <view class="openBox" @click="changeIn">
                <image class="imgBox" :src="getAssetsUrl('/device/home/cur3.svg')" alt=""/>
                <view class="zsText">打开</view>
            </view>
            <view class="openBox" @click="stopChs">
                <image class="imgBox" :src="getAssetsUrl('/device/home/cur2.svg')" alt=""/>
                <view class="zsText">暂停</view>
            </view>
            <view class="openBox" @click="changeOut">
                <image class="imgBox" :src="getAssetsUrl('/device/home/cur1.svg')" alt=""/>
                <view class="zsText">关闭</view>
            </view>
        </view>
    </view>
</template>
   
<script setup lang="ts">
import TnLineProgress from '@tuniao/tnui-vue3-uniapp/components/line-progress/src/line-progress.vue'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { tuyaDetail, tuyaCommand } from "@/api/room-api"

const progressPercent = ref(30)
const listArr = ref(3)
const timer: any = ref(null)
const devId = ref('')

onLoad((option: any) => {
    devId.value = option.id
    tuyaDetail(option.id).then(res => {
        res.attributes[0].state == 'close' ? progressPercent.value = 90 : res.attributes[0].state == 'open' ? progressPercent.value = 10 : progressPercent.value = 40 
        console.log(res.attributes[0].state);
    })
})
const changeIn = () => {
    clearInterval(timer.value)
    const sendData = {
        "commands": [
            {
                "code": "control",
                "value": "open"
            }
        ],
        "deviceId": devId.value
    }

    tuyaCommand(sendData).then(res => {
        timer.value = setInterval(() => {
            progressPercent.value = progressPercent.value + 2
            if (progressPercent.value > 90) {
                clearInterval(timer.value)
            }
        }, 200)
    })
}
const changeOut = () => {
    clearInterval(timer.value)
    const sendData = {
        "commands": [
            {
                "code": "control",
                "value": "close"
            }
        ],
        "deviceId": devId.value
    }
    tuyaCommand(sendData).then(res => {
        timer.value = setInterval(() => {
            progressPercent.value = progressPercent.value - 2
            if (progressPercent.value < 10) {
                clearInterval(timer.value)
            }
        }, 200)
    })
}

const stopChs = () => {
    const sendData = {
        "commands": [
            {
                "code": "control",
                "value": "stop"
            }
        ],
        "deviceId": devId.value
    }
    tuyaCommand(sendData).then(res => {
        clearInterval(timer.value)
    })
}

const agreePercent = () => {

}
const bigWidth = computed(() => {
    return {
        width: listArr.value + 'px',
        transition: 'width 2s ease' // 定义过渡效果
    }
})

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

</script>
   
<style scoped lang="scss">
.csBox {
    display: flex;
}

:deep(.tn-line-progress) {
    height: 100vh !important;
    border-radius: 0 !important;
    background: linear-gradient(180deg, #37B58B 0%, #DFF7EF 100%) !important;
}

:deep(.tn-line-progress__active) {
    background-color: rgba(20, 135, 70, 0.2) !important;
    // background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #F0F0F0 33%, rgba(255, 255, 255, 0) 100%) !important;
    box-shadow: 8rpx 0rpx 20rpx 2rpx rgba(20, 135, 70, 0.2) !important;
}

:deep(.tn-line-progress__active--stripe) {
    background: linear-gradient(90deg, #bde7d8 50%, #a5dfcb 0) !important;
    background-size: 80rpx 100% !important;
}

.abs {
    position: absolute;
    bottom: 100rpx;
    width: 100%;
}

.btns {

    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    background: #FFFFFF;
    border-radius: 18rpx 18rpx 18rpx 18rpx;
    height: 220rpx;
    align-items: center;
}

.openBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.zsText {
    margin-top: 16rpx;
    font-size: 28rpx;
    color: #5D5D5D;
}
.imgBox {
    width: 104rpx;
    height: 104rpx;
}

.jindBox {
    width: 100%;
    height: 100%;
    position: absolute;
}

.sdsq {
    transform: rotate(180deg);
}
</style>
  