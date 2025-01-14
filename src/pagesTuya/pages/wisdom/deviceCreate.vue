<template>
    <view class="container">
        <!-- <bc-page-navbar :title="'添加设备'"></bc-page-navbar> -->
        <view class="devicebox page-public-bg">
            <view class="tips">是否将设备绑定在【{{ data.roomMation.name }}房间】下</view>
            <view class="deviceform">
                <view class="devili row i-center j-between">
                    <view class="devtit">设备名称</view>
                    <view class="devinp">
                        <input v-model="data.formDate.name" class="inpbox" maxlength="30" type="text" placeholder="请输入设备名称">
                    </view>
                </view>
                <view class="devili row i-center j-between" v-if="data.diceMation.id != 5">
                    <view class="devtit">设备编号 </view>
                    <view class="row i-center" style="flex: 1;">
                        <view class="devinp">
                            <input v-model="data.formDate.sn" class="inpbox" maxlength="30" type="text"
                                placeholder="请输入设备编号">
                        </view>
                        <view style="margin-left: 20rpx;" v-if="!data.tyId">
                            <TnIcon @click="handleClick" name="scan" color="#666666" size="36"></TnIcon>
                        </view>
                    </view>
                </view>
                <view class="devili row i-center j-between" @click="data.romSelShow = true">
                    <view class="devtit">设备所属房间</view>
                    <view class="devinp row i-center">
                        <input v-model="data.roomMation.name" class="inpbox" disabled type="text" placeholder="请选择所属房间">
                        <TnIcon name="right" color="#BEBEBE" size="36rpx"></TnIcon>
                    </view>
                </view>
            </view>
        </view>
        <view class="deicefot">
            <view class="deicefix">
                <view class="deicebtn">
                    <TnButton width="100%" @click="submit" height="90" text-color="#fff" font-size="32rpx"
                        bg-color="#111214" border-color="#E3E3E3">{{ data.diceMation.id == 5 ? '下一步' : '确认添加' }}</TnButton>
                </view>
            </view>
        </view>
        <view class="loadCs tn-flex-center-center" v-if="laodVal">
            <view class="lads">
                <TnLoading show :animation="true" mode="flower" time-function="ease-in-out" size="80rpx" />
                <view class="loadText">发现设备中</view>
            </view>
        </view>
        <TnPicker v-model:open="data.romSelShow" v-model="data.roomMation.id" :data="data.roomList"
            @confirm="pickerConfirm"></TnPicker>
        <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="scanCode"
            permissionID="CAMERA"></yk-authpup>
    </view>
</template>

<script setup lang="ts">
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoTemLaya, gotoEzVideo, gotoCameraNet } from '@/routes/active-routes'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import { allRoomList, deviceTypeList, deviceBind } from "@/api/room-api"
import { ref, reactive, computed } from "vue"
import { onLoad, onReady } from '@dcloudio/uni-app'
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
// #ifdef APP-PLUS
import { getHomeDetail } from '@/utils/tuyaApi'
var configModule = uni.requireNativePlugin("XM-TuyaConfigModule");
// #endif

const laodVal = ref(false)
interface Data {
    tyId: string
    romSelShow: boolean
    roomMation: any
    roomList: any
    roomIndx: any
    formDate: any
    diceMation: any
}
const data = reactive<Data>({
    tyId: '',
    romSelShow: false,
    roomMation: {
        id: 0,
        name: ""
    },
    roomList: [],
    roomIndx: [], // 房间默认值
    formDate: {
        name: "",
        patientId: "",
        sn: "",
        // thumb: "",
        type: "",
        code: ''
    },
    diceMation: {}
})

const ysDice = ref('')
onLoad((option: any) => {
    if (option.tyId) {
        data.tyId = option.tyId
        data.formDate.sn = option.tyId
    }
    // #ifdef APP-PLUS
    if (option.type == 'kg' || option.type == 'cjkg') {
        laodVal.value = true
        getHomeDetail(option.roomId).then(res => {
            console.log(res)
            newGwSubDevActivator()
        })
    }
    // #endif
    option.roomId > 0 && (data.roomMation.id = option.roomId)
    ysDice.value = option.type
    getRoomList()
    getTypeList(option.type)
})
const getTypeList = (diceType: any) => {
    deviceTypeList({
        pageSize: 100,
        pageNumber: 1,
        query: {}
    }).then(res => {
        console.log(res);
        data.diceMation = res.data.find(x => x.id === diceType)
        data.formDate.name = data.diceMation?.name || ''
    })
}
// 房间列表
const getRoomList = () => {
    allRoomList({
        pageSize: 100,
        pageNumber: 1,
        query: {}
    }).then(res => {
        console.log(res)
        data.roomList = res.data.map(item => {
            const data = {
                label: item.name,
                value: item.id
            }
            return data
        })
        data.roomMation.id > 0 && (res.data.map((x, i) => {
            if (x.id === data.roomMation.id) {
                data.roomIndx = [i]
                data.roomMation = x
            }
        }))
    })
}

const repotYsnet = () => {
    const postData = {
        deviceSerial: deviceSerial.value,
        validateCode: verifyCode.value,
        accessToken: uni.getStorageSync('ysToken')
    }
    console.log('上传萤石')
    uni.request({
        url: 'https://open.ys7.com/api/lapp/device/add', // 你的API地址
        method: 'POST',
        header: {
            "content-Type": "application/x-www-form-urlencoded"
        },
        data: postData,
        success: (res) => {
            console.log(res);
        }
    })
}
// 提交设备添加
const submit = () => {
    if (!data.formDate.name.trim()) {
        uni.showToast({
            title: '请输入设备名称',
            icon: 'none'
        })
        return
    }
    if (!data.formDate.sn.trim() && data.diceMation.id != 5) {
        uni.showToast({
            title: '请输入设备编号',
            icon: 'none'
        })
        return
    }
    if (!data.roomMation.id) {
        uni.showToast({
            title: '请选择房间',
            icon: 'none'
        })
        return
    }
    if (ysDice.value == '4') {
        // #ifdef APP-PLUS || H5
        repotYsnet()
        // #endif
    }
    if (data.diceMation.id == 5) {
        uni.setStorageSync('roomId', data.roomMation.id)
        return gotoTemLaya(data.roomMation.id, data.diceMation.id)
    }
    data.formDate.type = data.diceMation.id
    data.formDate.patientId = data.roomMation.id
    deviceBind({
        ...data.formDate
    }).then(() => {
        uni.showToast({
            title: '绑定成功',
            icon: 'none'
        })

        if (ysDice.value == '4') {
            // #ifdef APP-PLUS || H5
            gotoEzVideo(deviceSerial.value, verifyCode.value)
            // #endif

            // #ifdef MP-WEIXIN
            gotoCameraNet(deviceSerial.value)
            // #endif  
            return
        }

        setTimeout(() => { uni.navigateBack({ delta: 2 }) }, 1000)
    }).catch(err => {
        console.log(err.message)
        uni.showToast({
            title: err.message,
            icon: 'none'
        })
    })
}
const pickerConfirm = (e) => {
    const selectObj = data.roomList.filter(item => item.value == e)
    data.roomMation.name = selectObj[0].label
    data.romSelShow = false
}
// 扫码
const deviceSerial = ref('')
const verifyCode = ref('')

const scanCode = () => {
    if (ysDice.value == '4') {
        uni.scanCode({
            success: (e) => {
                const result = e.result.split('\r').filter(part => part)
                deviceSerial.value = result[1]
                data.formDate.sn = result[1]
                verifyCode.value = result[2]
                data.formDate.code = result[2]
            }
        })
    } else {
        uni.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log("res", res)
                if (res.result === "*") {
                    uni.showToast({
                        icon: 'none',
                        text: '请扫描正确的设备二维码'
                    })
                    return false
                }
                data.formDate.sn = res.result
            },
            fail: (err) => {
                console.log("err", err)
                uni.showToast({
                    icon: 'none',
                    text: '扫码失败，请重试'
                })
            }
        })
    }
}
const authpup = ref()
const handleClick = () => {
    // #ifdef APP-PLUS
    authpup.value.open()
    // #endif
    // #ifndef APP-PLUS
    scanCode()
    // #endif
}
//开始子设备配网
const newGwSubDevActivator = () => {
    configModule.newGwSubDevActivator({
        devId: "6c47e3f232d38df179n9qc",
        timeout: 100
    }, (resp: any) => {
        console.log(resp);
        laodVal.value = false
        uni.showToast({
            title: '绑定成功',
            icon: "none"
        })
        setTimeout(() => {
            uni.navigateBack({
                delta: 1
            })
        }, 1000);
    })
}
</script>

<style lang="scss" scoped>
.devicebox {
    padding: 20rpx;

    .tips {
        height: 76rpx;
        background: #CBF3D5;
        border-radius: 8rpx;
        font-weight: 400;
        font-size: 30rpx;
        color: #19B25D;
        line-height: 76rpx;
        text-align: center;
    }

    .deviceform {
        margin-top: 16rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        padding: 0rpx 30rpx;

        .devili {
            padding: 40rpx 0;
            border-bottom: 2rpx solid #F2F2F2;

            &:last-child {
                border-bottom: none;
            }

            .devtit {
                font-weight: blod;
                font-size: 30rpx;
                color: #333333;
                margin-right: 30rpx;
            }

            .devinp {
                flex: 1;

                .inpbox {
                    font-size: 28rpx;
                    flex: 1;
                    text-align: right;
                    margin-right: 6rpx;
                }
            }
        }
    }
}

.deicefot {
    &::after {
        content: "";
        display: block;
        opacity: 0;
        height: 130rpx;
    }

    .deicefix {
        background: #FFFFFF;
        box-shadow: 0rpx -16rpx 8rpx rgba(0, 0, 0, 0.02);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;

        .deicebtn {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 130rpx;
            padding: 20rpx 30rpx;
            box-sizing: border-box;
        }
    }
}

.loadCs {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.3, );
    z-index: 99999 !important;

    .lads {
        display: flex;
        flex-direction: column;
        align-items: center;

        .loadText {
            color: #1e1d1d;
            margin-top: 30rpx;
        }
    }
}
</style>
