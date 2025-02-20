<template>
    <view class="content">
        <customNavbar pageTitle="全屋智能" :showBack="false" colorCs="#f2f4f5"></customNavbar>
        <image class="afterimg" @click="gotoChat"
               src="https://res.baochuncare.com/webapplet/shop/newshop/afterwards2.png" mode="widthFix"></image>
    </view>
</template>

<script lang="ts" setup>
import { gotoChatPage } from '@/routes/nim-routes'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { PlatformManage } from "@bc/sys"
import { createTeam } from "@/api/nim-api"

const gotoChat = () => {
    PlatformManage.getToken().then((token: any) => {
        createTeam({
            userId: token?.id,
            userName: token?.nickname,
            userThumb: token?.avatar,
            flag: 1, //1小程序用户，2服务人员
            shopId: token?.shopId ?? 0,
            type: 1 // 1平台，2店铺
        }).then((res) => {
            gotoChatPage({
                to: res.tid,
                scene: 'customer',
                originPage: 'pagesMall/pages/intellect/home'
            })
        }).catch((err) => {
            uni.showToast({
                title: err.message,
                icon: 'none'
            })
        })
    })
}
</script>

<style lang="scss" scoped>
.afterimg {
    width: 750rpx;
    display: block;
}
</style>
