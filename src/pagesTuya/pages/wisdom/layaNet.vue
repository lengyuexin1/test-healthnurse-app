<template>
    <customNavbar pageTitle="设备联网"></customNavbar>
    <view class="content">
        <img class="imgBox" :src="getAssetsUrl('/device/home/qiu.png')" alt="">
    </view>
    <view class="sevList">
        <view class="itemList">
            <image class="iconCs" :src="devIcon"></image>
            <view class="nameText">{{ devName }}</view>
        </view>
    </view>
    <view class="deicefix">
        <view class="deicebtn">
            <TnButton width="100%" @click="nextby" height="90" text-color="#fff" font-size="32rpx" bg-color="#111214"
                border-color="#E3E3E3">下一步</TnButton>
        </view>
    </view>

    <TnPopup v-model="data.createShow" mode="center" round="20" :safeAreaInsetBottom="false">
        <view class="catebox">
            <view class="cateclos">
                <u-icon name="close" color="#333333" bold size="20" @click="data.createShow = false"></u-icon>
            </view>
            <view class="catetit">
                <!-- <view class="tepOne">1、请链接设备wifi(SmartLife开头的)</view> -->
                <view>请输入需要链接的WIFI名称和密码</view>
            </view>
            <view class="catename">WIFI名称</view>
            <view class="cateinp">
                <input v-model="data.name" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI名称">
            </view>
            <view class="catename">WIFI密码</view>
            <view class="cateinp">
                <input v-model="data.pwd" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI密码">
            </view>
            <view class="catebtn">
                <TnButton width="100%" @click="getNet" height="90" text-color="#fff" font-size="32rpx" bg-color="#111214"
                    border-color="#E3E3E3">确定连接</TnButton>
            </view>
        </view>
    </TnPopup>
    <view class="loadCs tn-flex-center-center" v-if="laodVal">
        <TnLoading show :animation="true" mode="flower" time-function="ease-in-out" size="80rpx" />
    </view>
</template>
   
<script setup lang="ts">
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { gotoAirList } from '@/routes/active-routes'
import { getAssetsPic } from '@/common/setPicture'
import { ref, reactive, computed } from 'vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { onLoad } from '@dcloudio/uni-app';
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { createTuyaHome } from "@/api/room-api"
// #ifdef APP-PLUS
var configModule = uni.requireNativePlugin("XM-TuyaConfigModule")
// #endif
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
interface Data {
    createShow: boolean,
    name: string,
    pwd: string,
}
const data = reactive<Data>({
    createShow: false,
    name: 'baochun',
    pwd: 'YYuichb189%#',
})
const laodVal = ref(false)
const devName = ref('')
const devIcon = ref('')
const datas: any = ref({})
const tokenAs = ref()
const type = ref('')
const roomId = ref('')

onLoad((option: any) => {
    console.log(option);
    
    if (option.type == 'zigbeekt') {
        //  EZ 配网
        data.createShow = true
    }
    type.value = option.type
    if (option.roomId) {
        roomId.value = option.roomId
        getActivatorToken()
    } else {
        // 创建涂鸦房间
        createRoomApi(option.id)
    }
    
    startLeScan()
    uni.openBluetoothAdapter({
        success(result) {
            console.log(result) 
        },
        fail(err) {
            console.log(err)
        }
    })
})

const createRoomApi = (id:any) => {
    const datas = {
        tuyaUid: uni.getStorageSync("tuyaUid"),
        patientId: id
    }
    console.log(datas)
    createTuyaHome(datas).then(res => {
        console.log(res)
        roomId.value = res
        getActivatorToken()
    }).catch(err => {
        console.log(err)
    })
}

//开始扫描蓝牙设备
const startLeScan = () => {
    console.log(configModule)
    
    configModule.startLeScan({
        timeout: 10000,
        types: ['SINGLE', 'SIG_MESH'],
        filter: true
        /**
        setTimeout()	long	设置超时时间
        默认：40000；单位：毫秒	可选
        addScanType()	ScanType	
        SINGLE：点对点蓝牙设备
        MESH：涂鸦自研协议的 Mesh 设备
        SIG_MESH：标准蓝牙 Mesh 设备
        SINGLE_QR：扫码配网设备。
        必需
        setRepeatFilter()	boolean	重复过滤，默认：true	可选
         */
    }, (resp: any) => {
        if (resp.data.id) {
            datas.value = resp.data
            getActivatorDeviceInfo()
            // stopLeScan()
        }
        console.log(resp);
    })
}

//查询设备名称
const getActivatorDeviceInfo = () => {
    configModule.getActivatorDeviceInfo({
        /**
        productId	String	ScanDeviceBean.getProductId
        uuid	String	ScanDeviceBean.getUuid
        mac	String	ScanDeviceBean.getMac 该值一般设备为 null，只有某些品类有值
         */
        productId: datas.value.productId,
        uuid: datas.value.uuid,
        mac: null
    }, (resp: any) => {
        devName.value = resp.data.name
        devIcon.value = resp.data.icon
    })
}

//双模设备入网
const startActivatorMultiMode = () => {
    console.log(datas.value)
    configModule.startActivatorMultiMode({
        /**
        deviceType	Integer	设备类型，通过扫描可以查询
        uuid	String	设备 UUID，通过扫描可以查询
        address	String	设备地址，通过扫描可以查询
        mac	String	设备 Mac，通过扫描可以查询
        ssid	String	Wi-Fi SSID
        pwd	String	Wi-Fi 密码
        token	String	配网 Token，获取 Token 的方式与 Wi-Fi 设备配网一致，请参考 获取 Token
        homeId	long	当前家庭的 ID
        timeout	long	配网总超时，配网超时失败以该参数为准，单位为毫秒
         */
        mac: datas.value.mac,
        address: datas.value.address,
        homeId: roomId.value,
        uuid: datas.value.uuid,
        deviceType: datas.value.deviceType,
        ssid: data.name,
        pwd: data.pwd,
        token: tokenAs.value,
        timeout: 120000
    }, (resp: any) => {
        laodVal.value = false
        console.log(resp)
        uni.navigateBack({
            delta: 1
        })
    })
}
const nextby = () => {
    if (!devName.value) {
        return uni.showToast({
            title: '设备搜索中',
            icon: "none"
        })
    }
    data.createShow = true
}

const getActivatorToken = () => {
    console.log(roomId.value)
    configModule.getActivatorToken({
        homeId: roomId.value
    }, (resp: any) => {
        tokenAs.value = resp.data
        console.log(tokenAs.value, resp)
    })
}
const getNet = () => {
    laodVal.value = true
    if (type.value == 'zigbeekt') {
        return netEZ()
    }
    startActivatorMultiMode()
}

const stopLeScan = () => {
    configModule.stopLeScan()
}

const netEZ = () => {
    configModule.newActivator({
        token: tokenAs.value,
        ssid: "baochun",
        password: "YYuichb189%#",
        activatorModel: "THING_EZ",
        timeout: 100,
    }, (resp:any) => {
        console.log(resp)
        gotoAirList(resp.data.data.devId)
    })
}

</script>
   
<style scoped lang="scss">
page {
    background: #fff;
}

.content {
    margin-top: 30rpx;
    width: 100%;
    display: flex;
    justify-content: center;

    .imgBox {
        width: 500rpx;
        height: 500rpx;
        animation: rotate 2s linear infinite;
    }
}

/* 关键帧动画 */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.sevList {
    margin: 80rpx 50rpx 0 50rpx;

    .itemList {
        display: flex;
        flex-direction: column;
    }

    .iconCs {
        width: 80rpx;
        height: 80rpx;
    }

    .nameText {
        margin-top: 20rpx;
    }
}

.deicefix {
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
        text-align: left;
        margin-bottom: 48rpx;

        .tepOne {
            margin-bottom: 20rpx;
        }
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

.loadCs {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0);
    z-index: 99999 !important;
}
</style>
  