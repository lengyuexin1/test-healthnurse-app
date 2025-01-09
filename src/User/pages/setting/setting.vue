<template>
    <view class="container">
        <PageTopbg></PageTopbg>
        <bc-page-navbar :title="'设置'"></bc-page-navbar>
        <view class="page_content">
            <view class="operate_box">

                <view class="operate_item_box">
                    <view class="operate_item" @click="usercore">
                        <view class="operate_title">账号中心</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" @click="tonotice">
                        <view class="operate_title">通知设置</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" @click="toPrivacySetting">
                        <view class="operate_title">隐私管理</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" @click="toReportList">
                        <view class="operate_title">举报管理</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                </view>

                <!-- <view class="operate_item" @click="clickAgreement('userAgreement')">
                    <view class="operate_title">用户协议</view>
                    <view class="operate_right">
                        <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                    </view>
                </view> -->
                <!-- <view class="operate_item" @click="clickAgreement('privacyPolicy')">
                    <view class="operate_title">隐私政策</view>
                    <view class="operate_right">
                        <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                    </view>
                </view> -->
                <!-- <view class="operate_item">
                    <view class="operate_title">账号管理</view>
                    <view class="operate_right">
                        <view class="account_type">正常</view>
                        <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                    </view>
                </view> -->
                <!-- <view class="operate_item" @click="clickCancel">
                    <view class="operate_title">注销账号</view>
                    <view class="operate_right">
                        <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                    </view>
                </view> -->
                <view class="operate_item_box">
                    <view class="operate_item" @click="HelpChat">
                        <view class="operate_title">帮助与客服</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" @click="AboutLeyou">
                        <view class="operate_title">关于保椿生活</view>
                        <view class="operate_right">
                            <!-- <view class="account_type">版本{{ data.appVersion }}</view> -->
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" @click="feedback">
                        <view class="operate_title">问题反馈&投诉</view>
                        <view class="operate_right">
                            <TnIcon name="right" color="#BEBEBE" size="30"></TnIcon>
                        </view>
                    </view>
                    <view class="operate_item" v-if="environment">
                        <view class="operate_title">当前环境</view>
                        <view class="operate_right" style="color: red;">{{ WEB_ENV }}</view>
                    </view>

                </view>
                
            </view>
            <view class="out_login_box tn-flex-center-center">
                <view class="change_login" @click="changeLogin">
                    切换账号
                </view>
                <view class="out_login" @click="clickBtn">
                    退出登录
                </view>
            </view>
        </view>
        <BCNotify ref="bcNotify"></BCNotify>
        <BCPopup
            ref="bcPopup"
            title="退出登录"
            content="是否确认退出登录？"
            subBtn="确认"
            cancelBtn="取消"
            subBtnColor="#29C86F"
            @clickLeftBtn="logout"
            @clickRightBtn="cancel">
        </BCPopup>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { SessionSDK } from '@bc/msg'
import { PlatformManage } from "@bc/sys"
import { WEB_ENV } from "@/sys/constant"
import BCPopup from '@/components/popup/index.vue'
import BCNotify from '@/components/notify/index.vue'
import { getVersion } from '@/libs/update/check-updater'
import { gotoLogin, gotoAgreement, gotonotice, gotoPrivacySetting, gotoAboutLeyou, gotoReportList } from "@/routes/public-routes"
import { gotoCancel, gotochengUser, gotouserCore, gotoFeedback } from "@/routes/user-routes"
import { createTeam } from "@/api/nim-api"
import { gotoChatPage } from "@/routes/nim-routes"

interface Data {
    /** 版本号 */
    appVersion: string
}

const data = reactive<Data>({
    appVersion: ''
})

const environment = computed<boolean>(() => {
    return ['demo', 'test', 'dev', 'pre'].includes(WEB_ENV)
})

const bcNotify = ref()

const bcPopup = ref()

const clickBtn = () => {
    bcPopup.value.open()
}

const cancel = () => {
    bcPopup.value.close()
}

const clickAgreement = (type: string) => {
    gotoAgreement(type)
}

const clickCancel = () => {
    gotoCancel()
}

const tonotice = () => {
    gotonotice()
}

const toPrivacySetting = () => {
    gotoPrivacySetting()
}

const toReportList = () => {
    gotoReportList()
}

const AboutLeyou = () => {
    gotoAboutLeyou()
}

const feedback = () => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(()=>{
                gotoLogin({})
            },1000)
            return
        }
        gotoFeedback()
    })
}

const logout = () => {
    Promise.all([PlatformManage.clearStoreAuthorize(), SessionSDK.logout()]).then(() => {
        console.log('退出登录');
        uni.setStorageSync('likeChatItem', {})
        uni.setStorageSync('showBarrage', false)
        uni.setStorageSync('enjoyUpObj', {})
        uni.setStorageSync('userHistory', [])

        gotoLogin({})

    }).catch((err: any) => {
        bcNotify.value.error(err)
    })
}

const usercore = () => {
    gotouserCore()
}

const HelpChat = () => {
    PlatformManage.getToken().then((token:any) => {
        createTeam({
            userId: token?.id,
            userName: token?.nickname,
            userThumb: token?.avatar,
            flag: 1, //1小程序用户，2服务人员
            shopId: token?.shopId ?? 0,
            type: 1 // 1平台，2店铺
        }).then((res:any) => {
            gotoChatPage({
                to: res.tid,
                scene: 'customer',
                originPage: 'User/pages/setting/setting'
            })
        }).catch((err:any) => {
            bcNotify.value.show(err.message)
        })
    })
}

const changeLogin = () => {
    gotochengUser()
}

onMounted(() => {
    getVersion().then((res) => {
        data.appVersion = res
    })
})

</script>

<style lang="scss" scoped>
.page_content{
    padding: 20rpx;
    box-sizing: border-box;
    position: relative;
    width: 100%;

}
.operate_box{
    border-radius: 24rpx;
    width: 100%;
    margin-bottom: 280rpx;
    .space_box{
        width: 100%;
        height: 20rpx;
    }
    .operate_item_box{
        margin-bottom: 20rpx;
        background: #fff;
        border-radius: 24rpx;
        overflow: hidden;
    }
    .operate_item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40rpx;
        box-sizing: border-box;
        width: 100%;
        border-bottom: 2rpx solid #F2F2F2;
        .operate_title{
            font-weight: 600;
            font-size: 30rpx;
            color: #333333;
        }
        .operate_right{
            display: flex;
            align-items: center;
            .account_type{
                color: #666666;
                font-size: 30rpx;
                margin-right: 16rpx;
            }
        }
    }
    
}
.out_login_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin-left: 5%;
    position: fixed;
    left: 0;
    bottom: 55rpx;

    .change_login{
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: #EA3E1A;
        background: #fff;
        border-radius: 40rpx;
        font-size: 32rpx;
        margin-bottom: 30rpx;
    }
    .out_login{
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: #fff;
        background: #EA3E1A;
        border-radius: 40rpx;
        font-size: 32rpx;
    }
}



</style>
