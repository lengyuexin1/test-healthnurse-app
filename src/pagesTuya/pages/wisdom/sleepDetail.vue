<template>
    <view class="container">
        <customNavbar :bgColor="'#F7F7F7'" :pageTitle="data.deviceName">
            <!-- <view slot="right" style="transform: rotate(90deg) translateY(10px);" @click="linkSleepSet">
                <u-icon name="more-dot-fill" color="#333333" size="20" bold></u-icon>
            </view> -->
        </customNavbar>
        <view class="slep-box">
            <view class="slet-net row i-center j-between" @click="linkDeviceNet" v-if="data.blueName && !data.isNet">
                <text>还未配置WiFi，请前往配置。</text>
                <TnIcon name="right" size="32" color="#FF9C09"></TnIcon>
            </view>
            <view class="slep-img row i-center j-center">
                <image class="imgjc" :src="getAssetsUrl('/zhihu/sleep-icon1.png')" mode="aspectFit">
                </image>
            </view>
            <!-- <view class="slep-name">Sleepace享睡</view> -->
            <view class="slep-stus">{{ data.status || '--' }}</view>
            <view class="slep-dat row i-center j-between">
                <view class="slep-dat-li column i-center j-center">
                    <view class="slep-dat-top">
                        <text class="slep-dat-num">{{ data.heartRate || '--' }}</text>
                        <text class="slep-dat-uit">次/分</text>
                    </view>
                    <view class="slep-dat-say">心率正常</view>
                </view>
                <view class="slep-dat-li column i-center j-center">
                    <view class="slep-dat-top">
                        <text class="slep-dat-num">{{ data.breathing || '--' }}</text>
                        <text class="slep-dat-uit">次/分</text>
                    </view>
                    <view class="slep-dat-say">呼吸率正常</view>
                </view>
            </view>
            <view class="slep-rept">
                <view class="slep-rept-top row i-center j-between" @click="linkSleepReport">
                    <view class="">
                        <view class="slep-rept-tit">睡眠报告</view>
                        <view class="slep-rept-day">{{ datareportMation.date || "-" }}</view>
                    </view>
                    <TnIcon name="right" color="#9E9E9E" size="32"></TnIcon>
                </view>
                <view class="slep-rept-inf row i-center j-between">
                    <view class="slep-rept-li column i-center j-center">
                        <view class="slep-rept-abt" v-if="totalDuration">
                            <text class="">{{ datareportMation.house }}</text>
                            <text class="slep-rept-uit">时</text>
                            <text class="">{{ datareportMation.minute }}</text>
                            <text class="slep-rept-uit">分</text>
                        </view>
                        <view class="slep-rept-abt" v-else>
                            <text class="slep-rept-uit">--</text>
                        </view>
                        <view class="slep-rept-txt">监测时长</view>
                    </view>
                    <view class="slep-rept-lne"></view>
                    <view class="slep-rept-li column i-center j-center">
                        <view class="slep-rept-abt">
                            <text class="">{{ monitorDuration }}</text>
                        </view>
                        <view class="slep-rept-txt">监测时间</view>
                    </view>
                </view>
            </view>
        </view>
        <u-safe-bottom></u-safe-bottom>
    </view>
</template>

<script lang="ts" setup>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoSleepReport, gotoSleepSetup, gotoDeviceNet } from "@/routes/active-routes"
import { getLastData, reportListPo } from "@/api/room-api"
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const totalDuration = computed(() => {
    return datareportMation.value.total_duration > 0
})
const monitorDuration = computed(() => {
    if (datareportMation.value.startTime && datareportMation.value.endTime) {
        return `${datareportMation.value.startTime}~${datareportMation.value.endTime}`
    }
    return '--'
})
interface Data {
    deviceId: string,
    deviceName: string,
    messList: any,
    heartRate: number, //心率
    breathing: number, //呼吸
    status: string,
    // reportMation: any,
    blueName: string,
    pollid: number,
    isNet: boolean //是否联网
}
const datareportMation = ref({})
const data = reactive<Data>({
    deviceId: "",
    deviceName: "",
    messList: [],
    heartRate: 0, //心率
    breathing: 0, //呼吸
    status: "",
    // reportMation: {},
    blueName: "",
    pollid: 0,
    isNet: false //是否联网
})
onLoad((option:any) => {
    data.deviceId = option.deviceId
    data.deviceName = option.deviceName
    data.blueName = `LZ-OTA ${option.sn}`
    data.isNet = Number(option.status) === 3
    getReportList()
})
onShow(() => {
    polling()
})
onHide(() => {
    clearInterval(data.pollid)
})
onUnload(() => {
    clearInterval(data.pollid)
})
// 轮询获取实时数据
const polling = () => {
    data.pollid = setInterval(() => {
        getAlarmDetail()
    }, 1000)
}
// 睡眠监测带实时数据
const getAlarmDetail = () => {
    getLastData(data.deviceId).then((res:any) => {
        // 蓝牙名称
        (res.sn) && (data.blueName = `LZ-OTA ${res.sn}`)

        if (!res.data) { return }
        const dataFag = res.data.match(/.{2}/g)
        if (dataFag.length != 15) {
            throw new Error("数据错误")
        }
        data.heartRate = parseInt(dataFag[11], 16) //转成十进制
        data.breathing = parseInt(dataFag[12], 16)
        // 0x03-在床 0x04-离床 0x05-打鼾 0x06-体动
        const stus:any = { "03": "在床", "04": "离床", "05": "打鼾", "06": "体动" }
        data.status = stus[dataFag[13]]
    }).catch((err:any) => {
        console.log(err)
        // this.$u.toast(err)
        // setTimeout(() => { uni.navigateBack() }, 1000)
    })
}
const getReportList = () => {
    const sendData = {
        deviceId: data.deviceId,
        date: ''
    }
    reportListPo(sendData).then((res:any) => {
        if (res.length <= 0) { return }
        const data = res[0].detail
        datareportMation.value = {
            date: res[0].date,
            total_duration: data.total_duration,
            house: Math.floor(data.total_duration / 60),
            minute: data.total_duration % 60,
            startTime: data.gobed_time,
            endTime: data.outbed_time
        }
    })
}
// 跳转检测报告
const linkSleepReport = () => {
    gotoSleepReport(data.deviceId, datareportMation.value.date)
}
// 跳转设置
const linkSleepSet = () => {
    gotoSleepSetup({
        deviceId: data.deviceId,
        devName: data.deviceName
    })
}
// 联网配置
const linkDeviceNet = () => {
    gotoDeviceNet(data.blueName)
}
</script>

<style>
page {
    background-color: #F7F7F7;
}
</style>

<style lang="scss" scoped>
.slep-box {
    padding: 20rpx 36rpx;
    position: relative;
    .imgjc {
        width: 210rpx;
        height: 498rpx;
    }
    .slet-net {
        position: absolute;
        height: 88rpx;
        padding: 0 40rpx;
        background: #F8EEDE;
        top: 0;
        right: 0;
        left: 0;
        z-index: 99;
        font-weight: bold;
        font-size: 28rpx;
        color: #FF9C09;
    }

    .slep-name {
        font-size: 24rpx;
        color: #666666;
        margin-top: 32rpx;
        text-align: center;
    }

    .slep-stus {
        background: #FFFFFF;
        box-shadow: 8rpx 8rpx 20rpx 2rpx rgba(0, 0, 0, 0.07);
        border-radius: 16rpx;
        padding: 68rpx 52rpx;
        font-weight: normal;
        font-size: 40rpx;
        color: #000000;
        margin-top: 32rpx;
    }

    .slep-dat {
        padding: 44rpx 26rpx;
        background: #FFFFFF;
        box-shadow: 8rpx 8rpx 20rpx 2rpx rgba(0, 0, 0, 0.07);
        border-radius: 16rpx;
        margin-top: 20rpx;
        position: relative;

        &-li {
            flex: 1;

            &:first-child::after {
                content: '';
                width: 0rpx;
                height: 82rpx;
                border-right: 2rpx solid #CCCCCC;
                position: absolute;
                left: 49%;
            }
        }

        &-top {
            align-items: flex-end;
        }

        &-num {
            font-weight: 500;
            font-size: 48rpx;
            color: #000000;
        }

        &-uit {
            font-weight: 400;
            font-size: 24rpx;
            color: #000000;
            margin-left: 6rpx;
        }

        &-say {
            font-weight: 400;
            font-size: 24rpx;
            color: #000000;
            margin-top: 14rpx;
        }
    }

    .slep-rept {
        padding: 24rpx 52rpx 84rpx;
        background: #FFFFFF;
        box-shadow: 8rpx 8rpx 20rpx 2rpx rgba(0, 0, 0, 0.07);
        border-radius: 16rpx;
        margin-top: 20rpx;

        &-tit {
            font-size: 34rpx;
            color: #000000;
            line-height: 42rpx;
        }

        &-day {
            font-size: 30rpx;
            color: #666666;
        }

        &-inf {
            margin-top: 60rpx;
        }

        &-txt {
            margin-top: 6rpx;
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
        }

        &-abt {
            font-weight: 500;
            font-size: 52rpx;
            color: #000000;
        }

        &-uit {
            font-weight: 400;
            font-size: 24rpx;
            color: #666666;
            margin: 0 6rpx;
        }

        &-lne {
            width: 0rpx;
            height: 82rpx;
            border-right: 2rpx solid #CCCCCC;
            margin: 0 30rpx;
        }
    }
}
</style>
