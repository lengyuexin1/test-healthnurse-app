<template>
    <view class="main" >
        <view class="input" >
            <!-- <image
                class="inp_login"
                :src="getAssetsUrl('/leyou/logo/leyou_logo.png')"
                mode="scaleToFill"
            /> -->
            <image class="inp_login" src="/static/bc_logo.png" mode="aspectFit"></image>
            <view class="login_title">保椿照护</view>

            <view class="log_btn" @click="loginNext">一键登录/注册</view>

            <view class="protocol_box tn-flex-row">
                <view>
                    <TnCheckbox checked-shape="circle" active-color="#29C86F" v-model="data.agent"></TnCheckbox>
                </view>
                <view class="agreement_text">
                    我已阅读并同意
                    <text class="agreement" @tap="clickAgreement('userAgreement')">《保椿用户协议》</text>、
                    <text class="agreement" @tap="clickAgreement('privacyPolicy')">《保椿隐私政策》</text>和
                    <text class="agreement" @tap="clickAgreement('userProtect')">《保椿个人信息保护政策》</text>
                </view>
            </view>

            <view class="number_login" @click="numberLogin">其他方式登录</view>


        </view>

        <view v-if="data.phoneShow" class="getPhone">
            <view class="getPhone-content">
                <view class="getPhone-content-title u-border-bottom">手机号快捷登录</view>
                <view class="">
                    <image class="getPhone-content-image" src="/static/bc_logo.png" mode="aspectFit"></image>
                </view>
                <view class="getPhone-content-list">
                    <text style="font-size: 34rpx;color: #303133;">保椿照护申请获得以下权限</text>
                    <view style="margin-top: 25rpx;">
                        <text style="color:#18b566;font-size: 28rpx;margin-right:6rpx;">●</text>
                        <text style="font-size: 28rpx;color: #909399;"> 获得你的手机号</text>
                    </view>
                </view>
                <view class="getPhone-content-btn u-border-top">
                    <button @click="cancelLogin()" class="getPhone-content-btn-footer u-border-right"
                        style="color: #606266;">拒绝</button>
                    <button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber"
                        class="getPhone-content-btn-footer u-border-left" style="color: #2b85e4;">允许</button>
                </view>
            </view>
        </view>

        <view class="del_login" @click="delLogin">取消登录</view>

        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import { codeLogin, getWxPhoneNumber, userLogin } from '@/api/open-api'
import { getWeixinSessionKey } from '@/api/user-api'
import { PlatformManage } from "@bc/sys"
import { gotoIndex, gotoAgreement, gotoLogin } from "@/routes/public-routes"
import BCNotify from '@/components/notify/index.vue'
import { addContentAccount } from '@/api/create-api'
import { getAssetsPic } from '@/common/setPicture'

interface Data {
    /** 手机号 */
    mobile: string,
    /** 协议 */
    agent: boolean,
    /** 小程序支付openid */
    openid: string,
    /** 小程序登录unionid */
    unionid: string,

    phoneShow: boolean,
    privacyShow: boolean,
    inviteId: string | number,

    retainPage: number,

    userList: any,
    toSaveRoute: number

}

const data = reactive<Data>({
    mobile: '',
    agent: false,
    openid: '',
    unionid: '',
    phoneShow: false,
    privacyShow: false,
    inviteId: '',

    retainPage: 0,

    userList: [],

    toSaveRoute: 0

})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((option:any) => {

    // #ifdef H5
    numberLogin()
    // #endif


    data.inviteId = option.inviteId
    data.retainPage = option.retainPage ? option.retainPage : 0
    data.toSaveRoute = option.toSaveRoute ? option.toSaveRoute : 0
    login()


    const pages = getCurrentPages()
    console.log('onekeylogin', pages)
})

const clickAgreement = (type: string) => {
    gotoAgreement(type)
}

const loginNext = () => {
    if (!data.agent) {
        bcNotify.value.show('请阅读并同意协议和隐私政策')
        return
    }
    data.phoneShow = true
}

const numberLogin = () => {
    gotoLogin({
        logtype: 2,
        inviteId: data.inviteId,
        retainPage: data.retainPage,
        toSaveRoute: data.toSaveRoute
    })
}

const login = () => {

    // #ifdef MP-WEIXIN
    wx.login({
        success: (res : any) => {
            if (res.code) { //微信登录成功 已拿到code
                getWeixinSessionKey({
                    code: res.code,
                    appid: 'wxba2158972baec41b'
                }).then((res:any) => {
                    console.log('获取openid', res.openid)

                    uni.setStorageSync('openid', res.openid)
                    data.openid = res.openid
                    data.unionid = res.unionid

                }).catch((err) => {
                    bcNotify.value.err('登录请求失败')
                })
            }
            else {
                uni.showLoading({
                    title: res.errMsg,
                    mask: true
                })
            }
        },
        fail: (err : any) => {
            bcNotify.value.err('登录失败')
        }
    })
    // #endif

}

const cancelLogin = () => {
    data.phoneShow = false
    bcNotify.value.show('取消登录')

}

const decryptPhoneNumber = (e:any) => {
    console.log(123213213, e)

    // 判断是否授权隐私政策
    if (e.detail.errno === 104) {
        data.privacyShow = true
        return
    }

    if (e.detail.code) {

        console.log('e.detail.code', e.detail.code)

        getWxPhoneNumber({
            code: e.detail.code
        }).then((res:any) => {
            data.mobile = res.purePhoneNumber
            loginApi(res.purePhoneNumber)
        })
    }
    else {
        bcNotify.value.error('获取手机号失败')
        setTimeout(() => {
            numberLogin()
        }, 2000)
    }
}

const loginApi = (mobile:number) => {
    console.log('number', mobile)
    console.log('openid', data.openid)
    console.log('unionid', data.unionid)

    userLogin({
        mobile,
        unionid: data.unionid,
        openid: data.openid,
        inviteId: data.inviteId, //邀请id
        scene: 0, //场景id
        appid: 'wxba2158972baec41b',
        platformType: 2

    }).then((res:any) => {
        const newObj = {
            ...res,
            city: '广州',
            cityId: 11
        }
        console.log('newObj', newObj)

        PlatformManage.setToken(newObj).then(() => {
            uni.setStorageSync('userHistory', [])

            data.userList.push({
                ...res,
                userMobile: data.mobile
            })
            uni.setStorageSync('userList', data.userList)


            bcNotify.value.success('登录成功')
            addContentAccount({}).then(() => {})
            data.phoneShow = false

            setTimeout(() => {
                if (data.retainPage == 1) {
                    uni.navigateBack()
                    return
                }
                if (data.toSaveRoute == 1) {
                    const urlStr = uni.getStorageSync('saveCurRoute')
                    console.log('urlStr', urlStr)

                    uni.redirectTo({
                        url: "/" + urlStr
                    })
                    return
                }
                gotoIndex()
            }, 2000)
        })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

const delLogin = () => {
    gotoIndex()
}

</script>

<style>
page {
    background-color: #fff;
}
</style>
<style lang="scss" scoped>
.telbg_img{
    width: 100%;
    height: 360px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
}
.main{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .del_login{
        position: absolute;
        bottom: 100rpx;
        left: 50%;
        font-size: 30rpx;
        font-weight: 400;
        color: #989b9a;
        padding: 24rpx;
        transform: translate(-50%, 0);
    }
}
.input {
    margin-top: 238rpx;
    padding: 0 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .inp_login{
        margin: auto;
        width: 161rpx;
        height: 161rpx;
        margin-bottom: 36rpx;
    }
    .login_title{
        font-size: 32rpx;
        color: #333333;
        font-weight: 600;
        margin-bottom: 36rpx;
    }
    .log_btn{
        width: 630rpx;
        height: 80rpx;
        border-radius: 16rpx;
        text-align: center;
        line-height: 80rpx;
        background: #18b566;
        color: #ffffff;
        font-size: 32rpx;
        margin-bottom: 30rpx;
    }
}

.protocol_box {
    padding: 0 60rpx;
    padding-top: 20rpx;
    margin-bottom: 56rpx;
    color: #999999;
    font-size: 22rpx;
    .agreement {
        color: #41A0FE;
    }
    .agreement_text{
        margin-left: 12rpx;
    }
}
.number_login{
    font-size: 30rpx;
    font-weight: 400;
    color: #989b9a;
    width: 100%;
    text-align: center;
}

.getPhone {
    z-index: 999;
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, .5);

    &-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        width: 80%;
        height: 500rpx;
        border-radius: 25rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30rpx 30rpx 0 30rpx;

        &-title {
            width: 100%;
            display: flex;
            height: 120rpx;
            align-items: center;
            justify-content: center;
            font-weight: bolder;
            font-size: 32rpx;
            margin-bottom: 30rpx;
        }

        &-image {
            width: 60rpx;
            height: 60rpx;
            border-radius: 10rpx;
            overflow: hidden;
        }

        &-list {
            margin-top: 25rpx;
            display: flex;
            flex-direction: column;
        }

        &-btn {
            height: 100rpx;
            width: 100%;
            margin-top: 50rpx;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;

            &-footer::after {
                border: none;
            }

            &-footer {
                background-color: rgba(255, 255, 255, 0);
                width: 100%;
                font-weight: bolder;

            }
        }
    }

}


</style>
