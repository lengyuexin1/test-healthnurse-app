<template>
    <view class="container">
        <customNavbar pageTitle="配置设备上网"></customNavbar>
        <view class="netbox">
            <view class="netit">给设备连WIFI</view>
            <view class="netip row i-center">
                <image class="imgcs" :src="getAssetsUrl('/zhihu/net-icon1.svg')" mode="aspectFit" />
                <view class="netcon">
                    <view class="netsub">保持设备电量充足</view>
                    <view class="netdec">您需要给睡眠检测带供电，保持设备正常运行。</view>
                </view>
            </view>
            <!-- <view class="netgap row i-center j-center">点击下方连接局域网</view>
            <view class="netopt row i-center j-between">
                <view class="netopt-lef row i-center">
                    <image :src="getAssetsUrl('/zhihu/net-icon3.svg')" class="wifiIcon" mode="aspectFit" />
                    <view class="netopt-txt">无线局域网</view>
                </view>
                <view class="netopt-rig row i-center">
                    <view class="netopt-ink">点击连接</view>
                    <u-icon name="arrow-right" color="#A1A1A1" size="20"></u-icon>
                </view>
            </view> -->
        </view>
        <TnPopup v-model="data.createShow" mode="center" round="20" :safeAreaInsetBottom="false">
            <view class="catebox">
                <view class="cateclos">
                    <u-icon name="close" color="#333333" bold size="20" @click="data.createShow = false"></u-icon>
                </view>
                <view class="catetit">请输入WIFI名称和密码</view>
                <view class="catename">WIFI名称</view>
                <view class="cateinp">
                    <input v-model="data.name" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI名称">
                </view>
                <view class="catename">WIFI密码</view>
                <view class="cateinp">
                    <input v-model="data.pwd" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI密码">
                </view>
                <view class="catebtn">
                        <TnButton width="100%" @click="videoPlayer()" height="90" text-color="#fff" font-size="32rpx"
                    bg-color="#111214" border-color="#E3E3E3">确定连接</TnButton>
                </view>
            </view>
        </TnPopup>
        <!-- <view class="text-area">
            <button type="primary" @click="videoPlayer()">视频预览</button>
            <button type="primary" @click="playback()">视频回放</button>
            <button type="primary" @click="voiceTalk()">对讲</button>
            <button type="primary" @click="seachDEv">查询设备详情</button>
            <button type="primary" @click="addDEv">添加设备</button>
            <button type="primary" @click="netWork">配网</button>
        </view> -->
    </view>
</template>

<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
var SDK = uni.requireNativePlugin('Ezviz-SDK')
const deviceSerial = ref("BC5771827")
const verifyCode = ref("LBSPVA")
const routerPre = ref('')
const accessToken = ref('')
accessToken.value = uni.getStorageSync('ysToken')
const appKey = ref("9c910ec6d20d4496a9b1c32ad34a57c7") //app key
const wifiConfig = ref(1) //1声波配网 2设备热单配网 3smartconfig配网
interface Props {

}
const props = defineProps<Props>()

interface Data {
    createShow: boolean,
    name: string, //'baochun',
    pwd: string, //'YYuichb189%#',
}
const data = reactive<Data>({
    createShow: true,
    name: 'baochun', //'baochun',
    pwd: 'YYuichb189%#', //'YYuichb189%#',
})
onLoad((option: any) => {
    console.log(option)
    deviceSerial.value = option.deviceSerial
    verifyCode.value = option.value
    //检测麦克风权限
    SDK.checkPermission(function (res: any) {
        console.log(res);
        if (res.result == true) {
            //授权成功
        } else {
            //权限被拒绝
        }
    });
    //SDK 初始化
    SDK.initLib(appKey.value);
    SDK.setAccessToken(accessToken.value);
    SDK.showSDKLog(true)
})

const videoPlayer = () => {
    netWork()
    uni.redirectTo({
        url: `./ezviz_video_player?deviceSerial=${deviceSerial.value}&verifyCode=${verifyCode}`
    })
}
const playback = () => {
    uni.navigateTo({
        url: `./ezviz_video_playback?deviceSerial=${deviceSerial.value}&verifyCode=${verifyCode.value}`
    });
}
const voiceTalk = () => {
    uni.navigateTo({
        url: `./ezviz_talk?deviceSerial=${deviceSerial.value}&verifyCode=${verifyCode.value}`
    });
}

const netWork = () => {
    const ssid = 'baochun'
    const password = "YYuichb189%#"
    const routerName = routerPre.value + deviceSerial.value
    const routerPassword = routerPre.value + verifyCode.value
    const isAutoConnectDeviceHotSpo = true
    SDK.startAPConfigWifiWithSsid(ssid, password, deviceSerial, verifyCode, routerName, routerPassword, isAutoConnectDeviceHotSpo, function (res) {
        console.log(res.type === "onSuccess" ? "连接成功" : "连接失败")
    })
    console.log(123123);
}
const seachDEv = () => {
    const postData = {
        deviceSerial: deviceSerial.value,
        accessToken: accessToken.value
    }
    uni.request({
        url: 'https://open.ys7.com/api/v3/device/searchDeviceInfo', // 你的API地址
        method: 'POST',
        header: {
            "content-Type": "application/x-www-form-urlencoded",
        },
        data: postData,
        success: (res) => {
            console.log(res)
            const supportWifi = res?.data?.result?.data?.supportWifi || 3
            wifiConfig.value = supportWifi
            routerPre.value = res?.data?.result?.data?.routerNamePre || 'EZVIZ_'
        }
    })
}
const getAssetsUrl = computed(() => {
    return (str: any) => {
        return getAssetsPic(str)
    }
})
// 连接WiFi
const senBleLabel = () => {
    if (!uni.$u.trim(data.name, 'all')) {
        this.$u.toast('请输入WIFI名称')
        return
    }
    if (!uni.$u.trim(data.pwd, 'all')) {
        this.$u.toast('请输入WIFI密码')
        return
    }

    console.log(data.name, data.pwd)
}

</script>

<style>
page {
    background: #ffffff;
}
</style>

<style lang="scss" scoped>
.netbox {
    padding: 40rpx 30rpx;

    .netit {
        font-weight: bold;
        font-size: 32rpx;
        color: #1A1A1A;
    }

    .netip {
        margin-top: 50rpx;
        padding: 0 10rpx;

        .imgcs {
            width: 68rpx;
            height: 68rpx;
        }

        .netcon {
            margin-left: 12rpx;

            .netsub {
                font-weight: bold;
                font-size: 28rpx;
                color: #333333;
            }

            .netdec {
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
                margin-top: 4rpx;
            }
        }
    }

    .netgap {
        margin-top: 60rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;

        &::before,
        &::after {
            content: '';
            display: block;
            width: 160rpx;
            height: 0rpx;
            border-bottom: 2rpx solid #EFEFEF;
            margin: 0 20rpx;
        }
    }

    .netopt {
        margin-top: 46rpx;
        height: 88rpx;
        background: #F6F6F6;
        border-radius: 18rpx;
        padding: 0 30rpx;

        &-txt {
            font-weight: 400;
            font-size: 28rpx;
            color: #9D9D9D;
            margin-left: 8rpx;
        }

        &-ink {
            font-weight: 400;
            font-size: 28rpx;
            color: #3E92FF;
            margin-right: 4rpx;
        }
    }
}

.catebox {
    box-sizing: border-box;
    width: 620rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx;
    position: relative;

    .cateclos {
        position: absolute;
        top: 36rpx;
        right: 36rpx;
        z-index: 99;
    }

    .catetit {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
        margin-bottom: 48rpx;
    }

    .catename {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        margin-top: 30rpx;
    }

    .cateinp {
        background: #F6F6F6;
        border-radius: 16rpx;
        padding: 22rpx 30rpx;
        margin-top: 20rpx;

        .inptxt {
            width: 100%;
            font-size: 28rpx;
        }

        .codebox {
            width: 164rpx;
        }
    }

    .catebtn {
        margin-top: 70rpx;
    }
}

.wifiIcon {
    width: 50rpx;
    height: 50rpx;
}
</style>
