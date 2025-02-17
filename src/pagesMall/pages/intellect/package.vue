<template>
    <view class="content">
         <customNavbar pageTitle="全屋智能" leftIcon=" "></customNavbar>
<!--        <bc-page-navbar title="全屋智能">-->
<!--            <template #back>-->
<!--                <view></view>-->
<!--            </template>-->
<!--        </bc-page-navbar>-->
        <image class="afterimg" @click="gotoChat"
            src="https://res.baochuncare.com/webapplet/shop/newshop/afterwards2.png" mode="widthFix"></image>
    </view>
</template>

<script lang="ts" setup>
import { gotoChatPage } from '@/routes/nim-routes'
// import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
const gotoChat = () => {
    gotoChatPage()
}
</script>

<style lang="scss" scoped>
.afterimg {
    width: 750rpx;
    display: block;
}
</style>
