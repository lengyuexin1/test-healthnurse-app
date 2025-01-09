<template>
    <TnPopup v-model="data.showPopup" open-direction="center" :close-btn="true">
        <view class="refbox tn-flex-column" v-if="data.reflectType === 1">
            <image class="reflimg" src="@/User/static/reflect1.svg" mode="aspectFit" />
            <view class="refltxt">为了保证您的账号及资金安全，我们需要通过第三方服务，用于核验本人操作</view>
            <view class="refltip">注意：请保持面部再框内</view>
            <view class="reflbot tn-flex-center-between">
                <view class="reflbtn">
                    <TnButton plain width="240rpx" height="90rpx" font-size="28rpx" shape="round" bg-color="#FFFFFF" text-color="#666666" :debounce="true" @tap="close">
                        取消
                    </TnButton>
                </view>
                <view class="reflbtn">
                    <TnButton width="240rpx" height="90rpx" font-size="28rpx" shape="round" bg-color="#28C86E" text-color="#FFFFFF" :debounce="true" @tap="startFacial">
                        开始认证
                    </TnButton>
                </view>
            </view>
        </view>

        <view class="refbox tn-flex-column" v-if="data.reflectType === 2">
            <image class="reflimg" src="@/User/static/reflect2.svg" mode="aspectFit" />
            <view class="refltxt">验证通过</view>
            <view class="refltip">立即提现</view>
            <view class="reflbot tn-flex-center-between">
                <view class="reflbtn" style="width:510rpx;">
                    <TnButton width="510rpx" height="90rpx" font-size="28rpx" shape="round" bg-color="#28C86E" text-color="#FFFFFF" :debounce="true" @tap="startReflect">
                        确认提现
                    </TnButton>
                </view>
            </view>
        </view>

        <view class="refbox tn-flex-column" v-if="data.reflectType === 3">
            <image class="reflimg" src="@/User/static/reflect3.svg" mode="aspectFit" />
            <view class="refltxt">验证不通过</view>
            <view class="refltip">注意：请保持面部在框内</view>
            <view class="reflbot tn-flex-center-between">
                <view class="reflbtn">
                    <TnButton plain width="240rpx" height="90rpx" font-size="28rpx" shape="round" bg-color="#FFFFFF" text-color="#666666" :debounce="true" @tap="close">
                        取消
                    </TnButton>
                </view>
                <view class="reflbtn">
                    <TnButton width="240rpx" height="90rpx" font-size="28rpx" shape="round" bg-color="#28C86E" text-color="#FFFFFF" :debounce="true" @tap="startFacial">
                        重新认证
                    </TnButton>
                </view>
            </view>
        </view>
    </TnPopup>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

interface Data {
    showPopup: boolean
    reflectId: string,
    reflectType: number
}

const data = reactive<Data>({
    showPopup: false,
    reflectId: "",
    reflectType: 0 // 1人脸前提示 2成功提示 3失败提示
})

const open = (type: number) => {
    data.reflectType = type
    data.showPopup = true
}

const close = () => {
    data.showPopup = false
    data.reflectType = 0
}

const startReflect = () => {
    emit('startReflect')
}

const startFacial = () => {
    emit('startFacial')
}

const emit = defineEmits(["startReflect", "startFacial"])

defineExpose({ open, close })

</script>
  
<style lang="scss" scoped>
.refbox{
    align-items: center;
    padding: 45rpx 25rpx 30rpx;
    width: 610rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    .reflimg{
        width: 80rpx;
        height: 90rpx;
    }
    .refltxt{
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        line-height: 48rpx;
        text-align: center;
        margin-top: 30rpx;
    }
    .refltip{
        margin-top: 30rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #FF1C1C;
        line-height: 48rpx;
        text-align: center;
    }
    .reflbot{
        margin-top: 70rpx;
        .reflbtn{
            width: 240rpx;
            margin: 0 15rpx;
        }
    }
}
</style>
