<template>
    <view class="container">
        <customNavbar :bgColor="'#F7F7F7'" pageTitle="涂鸦设备"></customNavbar>
        <button @click="initSdk">初始化SDK</button>
        <button @click="loginTime">临时票据登录</button>
        <button @click="wxLogin">微信登录</button>
        <button @click="isLogin">查看是否登录</button>
        <button @click="getUseInfo">获取登录信息</button>
        <button @click="getHomeList">获取家庭列表</button>
        <button @click="getRooms">房间列表</button>
        <button @click="getDevList">获取某个家庭设备</button>
        <button @click="getTik">获取临时票据</button>
        <button @click="gotoNet">wifi配网</button>
        <button @click="ermNet">扫码配网</button>
        <button @click="layaNet">进行蓝牙配网/Zigbee网关子设备配网</button>
        <button @click="messageCenter">消息中心插件</button>
        <button @click="cjjs">场景插件</button>
        <button @click="commomDe">通用设备面板插件</button>
        <button @click="openDeng(1)">开灯1</button> <button @click="closeDeng">关灯</button>
        <button @click="openDeng(2)">开灯2</button>
        <button @click="openDeng(3)">开灯3</button>
        <button @click="stateArr">同步状态</button>
        <button @click="devDetail">设备详情</button>
    </view>
</template>

<script>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
// #ifdef MP-WEIXIN
import { request, fetch, getDeviceInfo, queryDps, publishDps, initRequest, loginByWx, getUserInfo, isLogin, getFamilies, getDeviceList, addFamily, addRoom, getRoomList, loginByTicket } from '@ray-js/wechat'
// #endif
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            ticket: 'ST',
            homeId: '190545987',
            clientId: '3ppkx9vuw7memrjgmp3g',
            homes: ''

        }
    },
    onLoad(options) {

    },
    methods: {
        async devDetail() {
            console.log('设备详细信息')
            const datas = await getDeviceInfo({ deviceId: '6ce0cfb15e92540a87pfwi' })
            console.log(datas)
        },
        async loginTime() {
            try {
                loginByTicket({ ticket: this.ticket, accessId: '3ppkx9vuw7memrjgmp3g' });
                console.log('登录成功');
            } catch (e) {
                console.log('登录失败');
            }
        },
        async stateArr() {
            console.log('状态')
            const datas = await queryDps({ deviceId: '6ce0cfb15e92540a87pfwi', dpIds: [] })
            console.log(datas)
        },
        async openDeng(number) {
            console.log('开灯')
            const objsd = {
                deviceId: '6ce0cfb15e92540a87pfwi',
                dps: number == 1 ? { 'switch_1': true } : number == 2 ? { switch_2: true } : { switch_3: true }
            }
            const datas = await publishDps(objsd)
            console.log(datas)
        },
        async closeDeng() {
            console.log('关灯')
            const objsd = {
                deviceId: '6ce0cfb15e92540a87pfwi',
                dps: { switch_1: false, switch_2: false, switch_3: false }
            }
            const datas = await publishDps(objsd)
        },
        initSdk() {
            initRequest({ schema: 'bba46293e28943afc4fbecc58645e54f' });
        },
        getUseInfo() {
            const useInfo = getUserInfo()
            console.log('登录信息', useInfo)
        },
        wxLogin() {
            loginByWx()
        },
        async isLogin() {
            const hasLogin = await isLogin();
            if (hasLogin) {
                uni.showToast({
                    icon: 'none',
                    title: '已登录'
                })
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '未登录'
                })
            }
        },
        getTik() {
            fetch({
                action: 'system.userTicket',
            }).then(res => {
                uni.showToast({
                    icon: 'none',
                    title: res.ticket
                })
                this.ticket = res.ticket
            }).err(err => {
                console.log(err)
            })
        },
        async getHomeList() {
            this.homes = await getFamilies();
            console.log('家庭列表', this.homes)
        },
        async getRooms() {
            const info = await getRoomList(190545987)
            console.log('房间', info)
        },
        async getDevList() {
            const devList = await getDeviceList(190545987)
            console.log('设备', devList)
        },
        gotoNet() {
            uni.showToast({
                icon: 'none',
                title: this.ticket
            })
            setTimeout(() => {
                wx.navigateTo({
                    url: `plugin://tuya-ap-plugin/step1?clientId=${this.clientId}&gid=${this.homeId}&ticket=${this.ticket}&self_env=inner`,
                })
            }, 3000)
        },
        ermNet() {
            wx.navigateTo({
                url: `plugin://tuya-ap-plugin/virtual?clientId=${this.clientId}&ticket=${this.ticket}&gid=${this.homeId}&self_env=inner`,
            });
        },
        layaNet() {
            console.log(this.homeId)
            wx.navigateTo({
                url: `plugin://tuya-ap-plugin/auto?clientId=${this.clientId}&ticket=${this.ticket}&gid=${this.homeId}&self_env=inner`,
            });
        },
        messageCenter() {
            wx.navigateTo({
                url: `plugin://tuya-message-center/index?ticket=${this.ticket}&clientId=${this.clientId}`,
            });
        },
        cjjs() {
            wx.navigateTo({
                url: `plugin://tuya-auto-plugin/autoHome?ticket=${this.ticket}&client_id=${this.client_id}`,
            });
        },
        commomDe() {
            const device_id = '123456'
            wx.navigateTo({
                url: `plugin://tuya-panel-plugin/panel?ticket=${this.ticket}&clientId=${this.clientId}&device_id=${device_id}&schema='4f2354410a352622bdcb503bbdf126fd'`,
            });
        }
    }
}
</script>
<style>
</style>