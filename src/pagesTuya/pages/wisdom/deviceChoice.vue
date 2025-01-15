<template>
    <view class="container">
        <!-- <bc-page-navbar :title="'添加设备'"></bc-page-navbar> -->
        <view class="dicetit" @click="gotoscrn">手动添加设备</view>
        <view class="dicebox">
            <block v-for="(item) in diceTypeList" :key="item.id">
                <view class="diceli row i-center" @click="linkDeviceCreate(item.id)">
                    <image class="imgCs" :src="item.thumb" mode="aspectFit"></image>
                    <view class="dicename">{{ item.name }}</view>
                </view>
            </block>
        </view>
    </view>
</template>

<script lang="ts" setup>
// #ifdef APP-PLUS
var userModule = uni.requireNativePlugin("XM-TuyaUserModule")
const modal = uni.requireNativePlugin('modal');
// #endif
import { sendTyUid } from "@/api/room-api"
import { gotoAppTy } from "@/routes/active-routes"
// #ifdef MP-WEIXIN
import { request, fetch, getDeviceInfo, queryDps, publishDps, initRequest, loginByWx, getUserInfo, isLogin, getFamilies, getDeviceList, addFamily, addRoom, getRoomList, loginByTicket } from '@ray-js/wechat'
// #endif
import { gotoDeviceCreate, gotoTuYaNet, gotoTyLy  } from '@/routes/active-routes'
import { deviceTypeList } from "@/api/room-api"
import { ref, onMounted } from 'vue'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'

const idFalgs = ref('')
const roomId = ref(0)
const diceTypeList: any = ref([])
const clientId = ref('3ppkx9vuw7memrjgmp3g')
const homeId = ref('190545987')
const ticket = ref('st')
onLoad((option: any) => {
    idFalgs.value = option.id
    homeId.value = option.roomId
    roomId.value = option.roomId
    getTypeList()
})
onShow(() => {})

onMounted(() => {
    // #ifdef MP-WEIXIN
    initSdk()
    setTimeout(() => {
        loginByWx()
    }, 300)
    setTimeout(async() => {
        const useInfo: any = getUserInfo()
        const data = {
            uid: useInfo.uid
        }
        const homes = await getFamilies()
        sendTyUid(data).then(res => {
            console.log(useInfo,res,homes)
        })
    }, 500)
    // #endif

    // #ifdef APP-PLUS
    getUid()
    // #endif
})

const getUid = () => {
    const tyName = uni.getStorageSync('userList')[0].id
    const sendName = tyName.slice(-7)
    console.log(sendName)
    userModule.loginOrRegisterWithUid({
        countryCode: '86',
        uid: sendName,
        passwd: '123456',
        isCreateHome: false
    }, (resp: any) => {
        console.log(resp)
        uni.setStorageSync("tuyaUid", resp.data.uid)
        const data = {
            uid: resp.data.uid
        }
        sendTyUid(data).then(res => {
            console.log(res)
        })
    })
}

const gotoscrn = () => {
    gotoAppTy()
}

const initSdk = () => {
    initRequest({ schema: 'bba46293e28943afc4fbecc58645e54f' });
}
const getTypeList = () => {
    deviceTypeList({
        pageSize: 100,
        pageNumber: 1,
        query: {}
    }).then(res => {
        diceTypeList.value = res.data
        console.log(diceTypeList.value)
    })
}
const linkDeviceCreate = (type: any) => {
    // 涂鸦设备
    if (type == 'wg2' || type == 'kg' || type == 'wsdcg' || type == 'cl' || type == 'zigbeekt') {
        // #ifdef MP-WEIXIN
        getTi()
        setTimeout(() => {
            console.log(clientId.value, ticket.value, homeId.value)
            
            wx.navigateTo({
                url: `plugin://tuya-ap-plugin/auto?clientId=${clientId.value}&ticket=${ticket.value}&gid=${homeId.value}&self_env=inner`,
            })
        }, 500);
        // #endif

        // #ifdef APP-PLUS || H5
        if (type == 'kg' || type == 'cjkg' ) {
            gotoDeviceCreate(idFalgs.value, type, roomId.value)
        }
        if (type == 'wsdcg' || type == 'wg2' || type == 'cl' || type == 'zigbeekt') {
            gotoTyLy(idFalgs.value, type, roomId.value)
        }
        // #endif

    } else {
        gotoDeviceCreate(idFalgs.value, type, roomId.value)
    }
}

const getTi = () => {
    fetch({
        action: 'system.userTicket',
    }).then((res: any) => {
        ticket.value = res.ticket
    })
}
</script>

<style>
page {
    background: #F1F3F5;
}
</style>

<style lang="scss" scoped>
.dicetit {
    padding: 40rpx 30rpx 0;
    font-weight: bold;
    font-size: 32rpx;
    color: #1A1A1A;
}

.imgCs {
    width: 88rpx;
    height: 88rpx;
    border-radius: 8rpx;
}

.dicebox {
    padding: 30rpx;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;

    .diceli {
        background: #fff;
        border-radius: 12rpx;
        padding: 24rpx;

        .dicename {
            margin-left: 12rpx;
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
        }
    }
}
</style>
