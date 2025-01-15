<template>
    <view class="container">
        <customNavbar :pageTitle="'配置设备'"></customNavbar>
        <view class="dicetit">给设备连接蓝牙</view>
        <view class="ul">
            <view class="li" v-for="(item, index) in data.ListArr" :key="index">
                <image class="left_img" :src="item.icon" mode="scaleToFill" />
                <view>
                    <view class="textcs">{{ item.text }}</view>
                    <view class="descs">{{ item.des }}</view>
                </view>
            </view>
        </view>
        <view class="line">
            <view class="hange"></view>
            <view class="lineText" @click=gotoli(1)>点击下方连接蓝牙设备</view>
        </view>
        <view class="lyList">
            <view class="lyUl" v-for="(item, index) in lyList" :key="index">
                <view class="lyLi" @click="gotoli(item)">
                    <view class="header">
                        <image class="gra_img" :src="data.gryLyicon" mode="scaleToFill" />
                        <view>{{ item.name }}</view>
                    </view>
                    <view class="acli">
                        <view class="clickcs">点击链接</view>
                        <image class="jian_img" :src="data.leftJian" mode="scaleToFill" />
                    </view>
                </view>
            </view>
        </view>
        <view v-if="data.isLoading">
            <TnLoading color="#0079f5" :vertical="true" size="25rpx" :customStyle="data.loadingStyle">
        </TnLoading>
        </view>
        

        <view class="contents" v-if="data.isLayaShow">
            <image class="left_img" :src="data.sucdImg" mode="scaleToFill" />
            <view class="bd">蓝牙没有开启</view>
            <view class="sucText">查看手机蓝牙功能是否开启</view>
            <view class="btns">
                <TnButton class="btnOne" @click="noBluYa" color="#FF4D4DFF">重试</TnButton>
            </view>
        </view>
        <view class="contents" v-if="data.isLayaShowTwo">
            <image class="left_img" :src="data.sucdHone" mode="scaleToFill" />
            <view class="bd">连接不到设备</view>
            <view class="sucText">
                <view>1.设备是否处于开机状态；</view>
                <view>2.设备之间的是否距离太远，无法检测到；</view>
            </view>
            <view class="btns">
                <TnButton class="btnOne" color="#FF4D4DFF">重试</TnButton>
                <!-- <u-button class="btnTwo" text="返回房间"></u-button> -->
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { getAssetsPic } from '@/common/setPicture'
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
import { gotoSuccedLaya } from "@/routes/active-routes"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import {  deviceBind } from "@/api/room-api"
import { ref, reactive, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
const data = reactive({
    roomId: '',
    sevdeType: '',
    isLayaShow: false,
    isLayaShowTwo: false,
    sucdImg: getAssetsPic("/agency/graLaya.svg"),
    ListArr: [
        { icon: getAssetsPic("/agency/dianlia.svg"), text: "保持设备电量充足", des: "您需要给睡眠检测带供电，保持设备正常运行。" },
        { icon: getAssetsPic("/agency/blueLaya.svg"), text: "手机蓝牙开启", des: "打开手机蓝牙功能，帮助手机更快连接设备。" },
    ],
    gryLyicon: getAssetsPic("/agency/boderLy.svg"),
    leftJian: getAssetsPic('/agency/leftjian.svg'),
    sucdHone: getAssetsPic('/agency/phoneLaya.svg'),
    // 加载样式
    loadingStyle: {
        marginTop: '100rpx',
        textAlign: "center"
    },
    isLoading: true
})
const lyList:any = ref([{name: 123}])
onLoad((option: any) => {
    data.roomId = option.roomId
    data.sevdeType = option.type
    player()
})
const noBluYa = () => {
    data.isLayaShow = false
    data.isLoading = true
    player()
}

const gotoli = (item: any) => {
    console.log(item)
    const sendData = {
        // mac: item.deviceId,
        type: data.sevdeType,
        patientId: data.roomId,
        mac: 'E8:07:BF:00:11:71'
    }
    deviceBind(sendData).then(res => {
        gotoSuccedLaya()
    }).catch(err => {
        console.log(err)
    })
}

const player = () => {
    uni.openBluetoothAdapter({ // 调用微信小程序api 打开蓝牙适配器接口
        success: () => {
            findBlue()
        },
        fail: (err) => {
            data.isLayaShow = true
            data.isLoading = false
            console.log(err)
        }
    })
}
const findBlue = () => { // 搜索蓝牙
    uni.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: false,
        interval: 0,
        success: () => {
            uni.onBluetoothDeviceFound(devices => {
                // console.log('开始监听寻找到新设备的事件');
                getBlue() //3.0
            })
        }
    })
}

const getBlue = () => {
    uni.getBluetoothDevices({
        success: (res) => {
            const BluetoothList = res.devices.filter(item => {
                return item.name == 'AET-WD'
            })
            lyList.value = BluetoothList
        },
        fail: () => {
            console.log("搜索蓝牙设备失败")
        }
    })
}
</script>
<style lang="scss" scoped>
page {
    background: #ffffff;
}

.dicetit {
    padding: 40rpx 30rpx 0;
    font-weight: bold;
    font-size: 32rpx;
    color: #1A1A1A;
}

.ul {
    margin: 50rpx 30rpx 80rpx 30rpx;

    .li {
        display: flex;
        align-items: center;
        margin-bottom: 50rpx;

        .textcs {
            font-weight: bold;
            font-size: 28rpx;
            color: #1A1A1A;
            margin-bottom: 6rpx;
        }

        .descs {
            font-weight: 400;
            font-size: 12px;
            color: #999999;
        }
    }
}

.left_img {
    height: 68rpx;
    width: 68rpx;
    margin-right: 12rpx;
}

.line {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .hange {
        width: 80%;
        height: 2rpx;
        background-color: #efefef;
    }

    .lineText {
        position: absolute;
        padding: 0 8rpx;
        font-size: 24rpx;
        color: #999;
    }
}

.lyList {
    margin: 50rpx 30rpx 0 30rpx;
}

.lyUl {
    margin-bottom: 20rpx;

    .lyLi {
        padding: 0 30rpx;
        height: 100rpx;
        background: #F6F6F6;
        border-radius: 18rpx 18rpx 18rpx 18rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        color: #5D5D5D;

        .header {
            display: flex;
            align-items: center;
        }

        .acli {
            display: flex;
            align-items: center;

            .clickcs {
                font-size: 28rpx;
                color: #3E92FF;
                margin-right: 10rpx;
            }

            .jian_img {
                width: 30rpx;
                height: 30rpx;
                margin-right: 20rpx;
                margin-top: 4rpx;
            }
        }
    }

    .gra_img {
        width: 36rpx;
        height: 36rpx;
        margin-right: 20rpx;
        margin-top: 4rpx;
    }
}

.contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 30rpx;

    .left_img {
        width: 160rpx;
        height: 160rpx;
        margin: 100rpx 0 40rpx 0;
    }

    .bd {
        font-weight: 600;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .sucText {
        font-size: 28rpx;
        color: #999999;
        margin-bottom: 40rpx;
    }

    .btns {
        width: 70%;
        padding-bottom: 120rpx;

        .btnOne {
            height: 84rpx;
            margin-bottom: 30rpx;
        }

        .btnTwo {
            height: 84rpx;
            color: #919191;
        }
    }
}
</style>