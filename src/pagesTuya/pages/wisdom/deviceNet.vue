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
            <view class="netip row i-center">
                <image class="imgcs" :src="getAssetsUrl('/zhihu/net-icon2.svg')" mode="aspectFit" />
                <view class="netcon">
                    <view class="netsub">手机蓝牙开启</view>
                    <view class="netdec">打开手机蓝牙功能，手机自动搜索连接设备。</view>
                </view>
            </view>
            <view class="netgap row i-center j-center">点击下方连接局域网</view>
            <view class="netopt row i-center j-between" v-if="data.isConnect" @click="data.createShow = true">
                <view class="netopt-lef row i-center">
                    <image :src="getAssetsUrl('/zhihu/net-icon3.svg')" width="36rpx" height="36rpx" mode="aspectFit" />
                    <view class="netopt-txt">无线局域网</view>
                </view>
                <view class="netopt-rig row i-center">
                    <view class="netopt-ink">点击连接</view>
                    <u-icon name="arrow-right" color="#A1A1A1" size="20"></u-icon>
                </view>
            </view>
        </view>

        <!-- <u-button @click="searchBle" color="#29C86F" shape="circle" text="打开蓝牙" :customStyle="{ height: '84rpx', marginTop: '30rpx' }"></u-button>
        <u-button @click="searchBlue" color="#29C86F" shape="circle" text="搜索蓝牙设备" :customStyle="{ height: '84rpx', marginTop: '30rpx' }"></u-button>
        <u-button @click="getBlues" color="#29C86F" shape="circle" text="获取蓝牙设备列表" :customStyle="{ height: '84rpx', marginTop: '30rpx' }"></u-button>
        <u-button @click="createBlue" color="#29C86F" shape="circle" text="连接蓝牙设备" :customStyle="{ height: '84rpx', marginTop: '30rpx' }"></u-button> -->


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
                    <u-button @click="senBleLabel" color="#29C86F" shape="circle" text="确定连接"
                        :customStyle="{ height: '84rpx' }"></u-button>
                </view>
            </view>
        </TnPopup>
    </view>
</template>

<script lang="ts" setup>
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { ref, reactive, computed } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
interface Data {
    createShow: boolean,
    name: string, //'baochun',
    pwd: string, //'YYuichb189%#',
    bluetoothTool: any,
    blueName: string,
    deviceId: string,
    writeServiceUUID: string,
    serviceId: string,
    isConnect: boolean //蓝牙是否连接
}
const data = reactive<Data>({
    createShow: false,
    name: '', //'baochun',
    pwd: '', //'YYuichb189%#',
    bluetoothTool: null,
    blueName: '',
    deviceId: '',
    writeServiceUUID: '',
    serviceId: '',
    isConnect: false //蓝牙是否连接
})

function ab2hex(buffer: any) {
    const hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
            return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('')
}
onLoad((option: any) => {
    data.blueName = option.blueName
    setTimeout(() => {
        searchBle()
    }, 1000)
})
onUnload(() => {
    uni.closeBluetoothAdapter({
        success(res) {
            console.log(res)
        }
    })
})
const getAssetsUrl = computed(() => {
    return (str: any) => {
        return getAssetsPic(str)
    }
})
// 连接WiFi
const senBleLabel = () => {
    if (!data.name) {
        uni.showToast({
            title: '请输入WIFI名称',
            icon: 'none'
        })
        return
    }
    if (!data.pwd) {
        uni.showToast({
            title: '请输入WIFI密码',
            icon: 'none'
        })
        return
    }

    console.log(data.name, data.pwd)
    /* uni.$u.toast("连接成功")
    setTimeout(() => {
        uni.navigateBack()
    }, 1000) */

    setTimeout(() => {
        const hexData = `"${data.name}","${data.pwd}"`//this.stringToHex(this.name, this.pwd).toUpperCase()
        // console.log("hexData", hexData)

        const buffer = stringToArrayBuffer(hexData)

        sendMsgToKey(buffer)
    }, 1000)
}
// 获取服务列表
const getServicesList = () => {
    uni.getBLEDeviceServices({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: data.deviceId,
        success: (res) => {
            console.log('device services:', res.services)
            const serviceId = "0000FFF0-0000-1000-8000-00805F9B34FB"
            if (res.services.find(x => x.uuid === serviceId)) {
                getCharacteristics(serviceId)
            }
            // for (let i = 0; i < res.services.length; i++) {
            //     this.getCharacteristics(res.services[i].uuid)
            // }
        },
        fail: err => {
            console.log('services:err', err)
        }
    })
}
/**
       * 向设备发送消息(分包发送，单包20字节，递归发送)
       */
const sendMsgToKey = (buffer: any) => {
    const packageSize = 20 //分包大小
    console.log("buffer.byteLength", buffer.byteLength)
    //如果大于20发送完成后继续递归调用
    let newData: any
    let writeBuffer
    if (buffer.byteLength > packageSize) { //如果小于20直接发送，不再继续调用
        newData = buffer.slice(packageSize)
        writeBuffer = buffer.slice(0, packageSize)
    }
    uni.writeBLECharacteristicValue({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: data.deviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
        serviceId: data.serviceId,
        // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
        characteristicId: data.writeServiceUUID, //第二步写入的特征值
        // 这里的value是ArrayBuffer类型
        value: writeBuffer || buffer,
        writeType: 'write',
        success: (res) => {
            //此时设备已接收到你写入的数据
            if (!newData) {
                console.log('写入成功', res)
                uni.showLoading({
                    title: '正在连接WiFi',
                    mask: true
                })
                setTimeout(() => {
                    uni.$u.toast("连接失败，请重试")
                }, 40000)

            }


            //写入成功后继续递归调用发送剩下的数据
            newData && sendMsgToKey(newData)
        },
        fail: function (err) {
            console.log('写入失败', err)
        },
        complete: function () { }
    })
}
// 获取蓝牙服务特征值
const getCharacteristics = (serviceId: any) => {
    uni.getBLEDeviceCharacteristics({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: data.deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId,
        success: (ret) => {
            console.log('device getBLEDeviceCharacteristics:', ret.characteristics)

            data.serviceId = serviceId
            data.writeServiceUUID = "0000FFF1-0000-1000-8000-00805F9B34FB"

            // 订阅特征值
            uni.notifyBLECharacteristicValueChange({
                state: true, // 启用 notify 功能
                // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
                deviceId: data.deviceId,
                // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
                serviceId,
                // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
                characteristicId: "0000FFF2-0000-1000-8000-00805F9B34FB",
                success: (res) => {
                    console.log('notifyBLECharacteristicValueChange success', res)


                    uni.onBLECharacteristicValueChange((res) => {
                        uni.hideLoading()
                        console.log("特征变化", res)
                        console.log(ab2hex(res.value))

                        // eslint-disable-next-line no-undef
                        const page = getCurrentPages()
                        const currentPage = page[page.length - 2]
                        currentPage.$vm.isNet = true

                        uni.$u.toast("WiFi配置成功")
                        setTimeout(() => {
                            uni.navigateBack()
                        }, 1000)
                    })

                },
                fail: (res) => {
                    console.log('notifyBLECharacteristicValueChange fail', res)
                }
            })

        },
        fail: err => {
            console.log('getBLEDeviceCharacteristics', err)
        }
    })
}

const searchBle = () => {
    console.log("initBule")
    // 初始化蓝牙模块
    uni.openBluetoothAdapter({
        success: (res) => {
            uni.showLoading({
                title: '正在连接蓝牙...',
                mask: true
            })
            console.log("打开 蓝牙模块，开始搜索模式...")
            console.log(res)

            setTimeout(() => {
                searchBlue() //扫描蓝牙设备
            }, 1000)

            /* uni.onBluetoothDeviceFound(function(devices) {
                console.dir("新设备", devices)
                console.log(ab2hex(devices[0].advertisData))
            }) */

            // 监听低功耗蓝牙设备的特征值变化事件
        },
        fail(err) {
            console.log("打开 蓝牙模块，失败", err)
            uni.hideLoading()
        }
    })

    uni.onBLEConnectionStateChange(res => {
        // 该方法回调中可以用于处理连接意外断开等异常情况
        console.log(`蓝牙已经${res.connected ? "连接" : "断开"}！`, res)
        data.isConnect = res.connected
        uni.hideLoading()
    })
}

// 扫描蓝牙设备
const searchBlue = () => {
    uni.startBluetoothDevicesDiscovery({
        success: (res) => {
            console.log("扫描成功", res)

            setTimeout(() => {
                getBlues() //获取蓝牙设备列表
            }, 1000)
        },
        fail: (err) => {
            console.log("扫描失败", err)
            uni.$u.toast(err.errMsg)
            // setTimeout(() => {
            //     this.searchBlue()
            // }, 500)
        }
    })
}

// 连接设备
const createBlue = () => {
    // this.blueName
    uni.createBLEConnection({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId: data.deviceId,
        success: (res) => {
            console.log("连接成功", res)
            // 连接成功后，停止搜索服务
            uni.stopBluetoothDevicesDiscovery()
            getServicesList()
        },
        fail: (err) => {
            console.log("连接失败", err)
        }
    })
}
// 获取所有新设备
const getBlues = () => {
    uni.getBluetoothDevices({
        success: (res) => {
            console.log("获取列表成功", res)
            data.deviceId = res.devices.find(x => x.name === data.blueName)?.deviceId || ''
            if (!data.deviceId) {
                uni.$u.toast("未找到设备")
                setTimeout(() => {
                    searchBlue()
                }, 500)
                return
            }
            createBlue()
        },
        fail: err => {
            console.log("获取列表失败", err)
            setTimeout(() => {
                searchBlue()
            }, 500)
        }
    })
}

// 组合蓝牙数据格式
const stringToHex = (name: string, pwd: string) => {
    const str = `"${name}","${pwd}"`
    // 将字符串转换为UTF-8编码的字节序列，然后转为十六进制字符串
    let hexStr = ''
    for (let i = 0; i < str.length; i++) {
        const hex = str.charCodeAt(i).toString(16)
        hexStr += hex.padStart(2, '0')
    }


    // 添加前缀和后缀
    const prefix = 'cd1f00'
    // 字节长度
    const preLen = (hexStr.length / 2 + 4).toString(16)
    const suffix = 'ffffffff'
    return `${prefix}${preLen}${hexStr}${suffix}`
}
// 把字符串转换为ArrayBuffer
const stringToArrayBuffer = (str: any) => {
    const bytes = []
    bytes.push(0xcd)
    bytes.push(0x1f)
    bytes.push(0x00)
    const preLen = str.length + 4
    bytes.push(preLen)
    let c
    const len = str.length
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0)
            bytes.push(((c >> 12) & 0x3F) | 0x80)
            bytes.push(((c >> 6) & 0x3F) | 0x80)
            bytes.push((c & 0x3F) | 0x80)
        }
        else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0)
            bytes.push(((c >> 6) & 0x3F) | 0x80)
            bytes.push((c & 0x3F) | 0x80)
        }
        else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0)
            bytes.push((c & 0x3F) | 0x80)
        }
        else {
            bytes.push(c & 0xFF)
        }
    }
    bytes.push(0xff)
    bytes.push(0xff)
    bytes.push(0xff)
    bytes.push(0xff)
    const array = new Uint8Array(bytes.length)
    for (let i = 0; i <= bytes.length; i++) {
        array[i] = bytes[i]
    }
    return array.buffer
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
</style>
