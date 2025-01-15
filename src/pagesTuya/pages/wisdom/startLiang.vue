<template>
    <view class="container">
        <customNavbar :pageTitle="'开始测量'"></customNavbar>
        <view class="dicetit" @click="gotovs">测量教程示例说明</view>
        <view v-for="(item, index) in ListTu" :key="index">
            <view class="headText">
                <view class="numb">{{ item.id }}</view>
                <view class="title">{{ item.text }}</view>
            </view>
            <view class="imgtu1">
                <image class="tuone" :src="item.icon" mode="scaleToFill"></image>
                <view class="dexs"> {{ item.des }}</view>
            </view>
        </view>
    </view>
</template>
<script setup >
// lang="ts"
import { getAssetsPic } from '@/common/setPicture'
import { gotoResult } from "@/routes/active-routes"
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { ref } from "vue"
import { onLoad, onShow } from '@dcloudio/uni-app'
const lytjgude = ref('')
const ListTu = ref([
    { id: 1, text: '第一步：准备测量', icon: getAssetsPic("/agency/ceop1.svg"), des: '把红外额温计对准额头距离15mm-50mm' },
    { id: 2, text: '第二步：开始测量', icon: getAssetsPic("/agency/ceop2.svg"), des: '按一下测量按键，约一秒后听到 “哔” 声。' }
])
const temNum = ref(0)
const numberTime = ref(0)

onShow(() => {
    player()
})

const player = () => {
    uni.openBluetoothAdapter({
        success: () => {
            console.log('ks1')
            findBlue()
        },
        fail: () => {
            console.log("搜索失败1")
        }
    })
}

const findBlue = () => {
    uni.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: false,
        interval: 0,
        success: () => {
            console.log('ks2')
            uni.onBluetoothDeviceFound(devices => {
                getBlue() //3.0
            })
        },
        fail: () => {
            console.log("搜索失败2")
        }
    })
}

const getBlue = () => { // 获取蓝牙设备
    uni.getBluetoothDevices({
        success: (res) => {
            console.log('ks2', res)
            const BluetoothList = res.devices.filter(item => {
                return item.name == 'AET-WD'
            })
            if (BluetoothList.length > 0) {
                connetBlue(BluetoothList[0].deviceId)
                lytjgude.value = BluetoothList[0].deviceId
            }
        },
        fail: () => {
            console.log("搜索蓝牙设备失败")
        }
    })
}

const connetBlue = (deviceId) => { // 蓝牙连接
    uni.createBLEConnection({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: deviceId, //设备id
        success: () => {
            uni.stopBluetoothDevicesDiscovery({
                success: () => {
                    console.log('连接蓝牙成功之后关闭蓝牙搜索')
                }
            })
            getServiceId(deviceId) //5.0
        }
    })
}

const getServiceId = (deviceId) => { // 获取这个蓝牙设备的服务uuid
    setTimeout(() => {
        uni.getBLEDeviceServices({
            deviceId: deviceId,
            success: (res) => {
                console.log(res)
                for (let i = 0; i < res.services.length; i++) {
                    if (res.services[i].uuid.indexOf('FFF0') != -1) {
                        getCharacteId(deviceId, res.services[i].uuid)
                        break
                    }
                }
            },
            fail(err) {
                console.log('获取失败' + err)
            }
        })
    }, 2000)
}

const getCharacteId = (deviceId, serviceId) => {
    console.log(deviceId - 'deviceId')
    uni.getBLEDeviceCharacteristics({
        deviceId: deviceId,
        serviceId: serviceId,
        success: (res) => {
            for (let i = 0; i < res.characteristics.length; i++) { //2个值
                const model = res.characteristics[i]
                if (model.uuid.indexOf('FFF3') != -1) {
                    if (model.properties.notify) {
                        startNotice(deviceId, serviceId, model.uuid)
                    }
                    if (model.properties.read) {
                        readBLECharacteristicValue(deviceId, serviceId, model.uuid)
                    }
                }
            }
        }
    })
}

const startNotice = (deviceId, serviceId, readUuid) => { // 创建链接，发送指令启用notify 功能接收设备返回的数据
    uni.notifyBLECharacteristicValueChange({
        state: true, // 启用 notify 功能
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: readUuid, //第一步 开启监听 notityid  第二步发送指令 write
        success(res) {
            //接收蓝牙返回消息
            console.log('开始接收数据')
            console.log(res)
            uni.onBLECharacteristicValueChange((sjRes) => {
                console.log(sjRes)
                // 此时可以拿到蓝牙设备返回来的数据是一个ArrayBuffer类型数据，
                // 所以需要通过一个方法转换成字符串
                const beforeNum = ab2hex(sjRes.value).substring(18, 20)
                const afterNum = ab2hex(sjRes.value).substring(20, 22)
                const temperature = parseInt(beforeNum, 16) + '.' + parseInt(afterNum, 16) // 16进制转10进制
                console.log(temperature)
                temNum.value = temperature
                const historyTem = uni.getStorageSync('tempValue')
                if (historyTem && historyTem * 100 == temperature * 100) {
                    return false
                }
                if (Number(temperature) > 0) {
                    const data = {
                        term: temperature,
                        macId: lytjgude.value
                    }
                    uni.setStorageSync('tempValue', temperature)
                    gotoResult(JSON.stringify(data))
                    uni.closeBLEConnection({
                        deviceId: deviceId,
                        success(res) {
                            console.log(res)
                        }
                    })
                }
                // self.numberTime = 0
                // clearInterval(self.time)
                // self.time = setInterval(self.sumNumber, 1000)
            })
        },

        fail(err) {
            console.log(err)
        }
    })
}

const readBLECharacteristicValue = (deviceId, serviceId, readUuid) => { // 读取数据
    uni.readBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: readUuid,
        success(res) {
            console.log('读取数据:', res)
            // startNotice(deviceId, serviceId, readUuid)
        }
    })
}

const ab2hex = (buffer) => { // 将ArrayBuffer转换成字符串
    const hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
            return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('')
}

// export default {
//     methods: {
//         gotovs() {
//             const datas = {
//                 term: 35.6,
//                 macId: "E8:07:BF:00:11:71"
//             }
//             gotoResult(JSON.stringify(datas))
//         },
//     }
// }
const sumNumber = () => {
    numberTime.value++
    console.log(numberTime.value)
    if (numberTime.value == 60) {
        console.log('断开蓝牙')
        clearInterval(time)
        setTimeout(() => {
            player()
        }, 1000)
    }
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

.headText {
    display: flex;
    align-items: center;
    margin: 36rpx 40rpx 20rpx 40rpx;

    .numb {
        width: 72rpx;
        height: 60rpx;
        background: #29C86FFF;
        font-size: 36rpx;
        color: #FFFFFF;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16rpx;
    }

    .title {
        background: #29C86FFF;
        font-size: 28rpx;
        font-weight: 600;
        color: #FFFFFF;
        height: 60rpx;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 30rpx;
    }
}

.imgtu1 {
    margin: 0 40rpx;
    display: flex;
    align-items: center;

    .dexs {
        font-size: 32rpx;
        color: #333333;
    }
}

.tuone {
    width: 300rpx;
    height: 230rpx;
    min-width: 300rpx;
    margin-right: 30rpx;
}
</style>
