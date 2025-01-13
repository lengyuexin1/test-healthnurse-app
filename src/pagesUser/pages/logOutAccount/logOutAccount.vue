<template>
    <view class="cancellation">
        <PageTopbg></PageTopbg>
        <bc-page-navbar :title="'账号注销'"></bc-page-navbar>
        <view class="log-box">
            <view class="log-content">
                <view class="log-tit">注销须知：</view>
                <view class="log-text">1、注销账号是不可逆的行为。账号成功注销后，您将无法登录，使用该账号，也无法找回已注销账号的任何内容，数据或记录（即使您用相同的手机号码再次注册也是一个全新的账号）</view>
                <view class="log-text">2、注销完成后，除非根据法律法规或监管部门的要求或存储您的个人信息，保椿生活将删除您的个人信息或做匿名化处理。请您悉知并理解，我们可能不会将该信息立即从备份系统中删除，但会在备份系统更新时进行删除</view>
            </view>
        </view>
        <BottomSingleBtn btnName="同意并注销" @clickBtn="clickBtn"></BottomSingleBtn>
        <BCPopup
            ref="bcPopup"
            type="warning"
            title="账号注销"
            content="注销后该账号信息将全部清理, 不可撤回，是否确认注销？"
            subBtn="确认注销"
            cancelBtn="不注销了"
            @clickLeftBtn="logout"
            @clickRightBtn="cancel">
        </BCPopup>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { gotoLogin } from "@/routes/public-routes"
import { PlatformManage } from "@bc/sys"
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import BCPopup from '@/components/popup/index.vue'
import { SessionSDK } from '@bc/msg'
import BCNotify from '@/components/notify/index.vue'
import { cancellation } from '@/api/user-api'

const bcNotify = ref()

const bcPopup = ref()

const clickBtn = () => {
    bcPopup.value.open()
}

const cancel = () => {
    bcPopup.value.close()
}

const logout = () => {
    PlatformManage.getToken().then((res:any) => {
        cancellation({
            token: res.token,
            refreshToken: res.refreshToken
        }).then(() => {
            cancel()
            bcNotify.value.show('账号成功注销')
            Promise.all([PlatformManage.clearStoreAuthorize(), SessionSDK.logout()]).then(() => {
                setTimeout(() => {
                    gotoLogin({})
                }, 1500)
            })
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    })
    return
    
}
</script>

<style lang="scss">
    page {
        background-color: #f6f8fa;
    }
</style>
<style lang="scss" scoped>
.cancellation {
    .log-box {
        padding: 24rpx 16rpx;
        position: relative;

        .log-content{
            padding: 40rpx;
            border-radius: 24rpx;
            background: #FFFFFF;

            .log-tit{
                font-size: 32rpx;
                font-weight: 500;
                line-height: 56rpx;
                color: #333333;
                margin-bottom: 40rpx;
            }
            .log-text{
                font-size: 28rpx;
                font-weight: 400;
                line-height: 48rpx;
                color: #666666;
                margin-bottom: 40rpx;
                &:last-child{
                    margin-bottom: 0rpx;
                }
            }
        }
    }
}
</style>
