<template>
    <view class="container">
        <customNavbar :bgColor="'#F7F7F7'" :pageTitle="'涂鸦设备'"></customNavbar>
        <button @click="initSdk">初始化SDK</button>
        <button @click="wxLogin">微信登录</button>
        <button @click="isLogin">查看是否登录</button>
        <button @click="getUseInfo">获取登录信息</button>
        <button @click="getHomeList">获取家庭列表</button>
        <button @click="getTik">获取临时票据</button>
        <button @click="gotoNet">wifi配网</button>
        <button @click="ermNet">扫码配网</button>
        <button @click="layaNet">进行蓝牙配网/Zigbee网关子设备配网</button>
        <button @click="messageCenter">消息中心插件</button>
        <button @click="cjjs">场景插件</button>
        <button @click="commomDe">通用设备面板插件</button>
    </view>
</template>

<script>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
// import { request, fetch, initRequest, loginByWx, getUserInfo, isLogin, getFamilies, addFamily, addRoom, getRoomList, loginByTicket } from '@ray-js/wechat'

export default {
    components: {
        customNavbar
    },
    data() {
        return {
            ticket: 'ST-cfbdbb047425ee5028dc5aff6901e133V6RYCvTji7AJLqUqjSDr',
            homeId: '185838203',
            clientId: 'rj3eak59uqvjmjwn8gd7',
            homes: ''

        }
    },
    onLoad(options) {

    },
    methods: {
        initSdk() {
            initRequest({ schema: '4f2354410a352622bdcb503bbdf126fd' });
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