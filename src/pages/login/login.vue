<template>
    <image class="telbg_img" src="/static/bc_logo.png" mode="aspectFit"></image>
    <view class="main" >
        <view class="input" v-if="data.currentTabIndex == 0">
            <view class="input_title">手机号登录/注册</view>
            <view class="input_teltip">首次验证通过，即注册保椿生活账号</view>
            <view class="codeLogin">
                <TnInput type="number" :maxlength="11" height="108rpx" :clearable="true" v-model="data.mobile" placeholder="请输入手机号码" custom-class="inp" >
                    <template #prefix>
                        <view class="prefix">+86</view>
                    </template>
                </TnInput>
            </view>
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
            <TnButton
                width="630rpx"
                height="100rpx"
                shape="round"
                font-size="32rpx"
                bg-color="#18b566"
                text-color="#ffffff"
                :debounce="true"
                @click="loginNext"
                >
                下一步
            </TnButton>
        </view>
        <view class="input" v-else-if="data.currentTabIndex == 1">
            <view class="input_title">输入短信验证码</view>
            <view class="input_teltip">向您的手机{{ data.stagingNumber }}发送验证码</view>
            <view class="codeLogin">
                <TnInput type="number" :maxlength="4" height="108rpx" :clearable="true" v-model="data.code" placeholder="验证码" custom-class="inp">
                    <template #suffix>
                        <TnButton bg-color="white" text-color="#41A0FE" font-size="26rpx" :disabled="data.countdown > 0" @tap="getCode">
                            {{ data.countdown > 0 ? `${data.countdown}秒后重新获取` : '获取验证码' }}
                        </TnButton>
                    </template>
                </TnInput>
            </view>
            <TnButton
                width="630rpx"
                height="100rpx"
                shape="round"
                font-size="32rpx"
                bg-color="#18b566"
                text-color="#ffffff"
                :debounce="true"
                @click="login"
                >
                登录
            </TnButton>
        </view>

        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import { codeLogin, userGetCode } from '@/api/open-api'
import { getWeixinSessionKey } from '@/api/user-api'
import { PlatformManage } from "@bc/sys"
import { gotoIndex, gotoAgreement } from "@/routes/public-routes"
import BCNotify from '@/components/notify/index.vue'
import { addContentAccount } from '@/api/create-api'
import { getAssetsPic } from '@/common/setPicture'

import { SessionSDK } from '@bc/msg'

interface Data {
    /** 选项卡下标 */
    currentTabIndex: number,
    /** 选项卡 */
    tabsData: any,
    /** 手机号 */
    mobile: string,
    /** 验证码 */
    code: string,
    /** 验证码倒计时 */
    countdown: number
    /** 协议 */
    agent: boolean,
    /** 暂存手机号尾号 */
    stagingNumber: string,
    /** 小程序支付openid */
    openid: string,
    /** 小程序登录unionid */
    unionid: string,
    inviteId: string|number,

    retainPage: number,
    isaddUser: boolean,
    userList: any,
    toSaveRoute: number,

}

const data = reactive<Data>({
    currentTabIndex: 0,
    tabsData: [
        { text: '验证码登录' },
        { text: '密码登录' }
    ],
    mobile: '',
    code: '',
    countdown: 0,
    agent: false,
    stagingNumber: '',
    openid: '',
    unionid: '',
    inviteId: '',

    retainPage: 0,
    isaddUser: false,
    userList: [],
    toSaveRoute: 0

})

onLoad((option:any) => {
    data.retainPage = option.retainPage ? option.retainPage : 0

    data.inviteId = option.inviteId

    data.isaddUser = !!option.addUser
    data.toSaveRoute = option.toSaveRoute ? option.toSaveRoute : 0


    data.userList = uni.getStorageSync('userList') ? uni.getStorageSync('userList') : []
    console.log('data.userList111', data.userList)

    const pages = getCurrentPages()
    console.log('login', pages)
})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

// 获取验证码倒计时
const getCode = () => {
    if (!data.mobile) {
        bcNotify.value.show('手机号码不能为空')
        return
    }
    userGetCode({ mobile: Number(data.mobile) }).then(() => {
        bcNotify.value.show('验证码发送成功')
        if (data.countdown === 0) {
            data.countdown = 60
            const intervalId = setInterval(() => {
                if (data.countdown > 0) {
                    data.countdown--
                }
                else {
                    clearInterval(intervalId)
                }
            }, 1000)
        }
    })
}

const isValidPhoneNumber = (phone: string) => {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
}

const clickAgreement = (type: string) => {
    gotoAgreement(type)
}

const loginNext = () => {
    if (!data.mobile) {
        bcNotify.value.show('请输入手机号码')
        return
    }
    else if (!isValidPhoneNumber(data.mobile)) {
        bcNotify.value.show('请输入正确的手机号码')
        return
    }
    else if (!data.agent) {
        bcNotify.value.show('请阅读并同意协议和隐私政策')
        return
    }
    data.currentTabIndex = 1
    data.stagingNumber = String(data.mobile).slice(-4)
}

const login = () => {
    if (!data.code) {
        bcNotify.value.show('请输入验证码')
        return
    }


    if (data.isaddUser) {
        Promise.all([PlatformManage.clearStoreAuthorize(), SessionSDK.logout()]).then(() => {
            console.log('清除缓存')
            uni.setStorageSync('likeChatItem', {})
            uni.setStorageSync('showBarrage', false)
            uni.setStorageSync('enjoyUpObj', {})
            uni.setStorageSync('userHistory', [])


        }).catch((err: any) => {
            bcNotify.value.error(err)
        })

    }

    uni.showLoading({ title: '登录中...' })

    // #ifdef MP-WEIXIN
    wx.login({
        success: (res : any) => {
            console.log('res.code', res.code)
            console.log('res', res)

            if (res.code) { //微信登录成功 已拿到code
                getWeixinSessionKey({
                    code: res.code,
                    appid: 'wxba2158972baec41b'
                }).then((res:any) => {
                    console.log('获取openid', res.openid)

                    uni.setStorageSync('openid', res.openid)
                    data.unionid = res.unionid
                }).catch((err) => {
                    console.log('登录err', err)

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
            console.log(err)
        }
    })
    // #endif



    codeLogin({
        mobile: Number(data.mobile),
        code: Number(data.code),
        wechatCode: null,
        platformType: 2,
        inviteId: data.inviteId
    }).then((res: any) => {
        const newObj = {
            ...res,
            city: '广州',
            cityId: 11
        }

        PlatformManage.setToken(newObj).then(() => {
            // getWeixinSessionKey({
            //     appid:'wx7b2d77f439865772',
            //     code:res
            // }).then(()=>{

            // })
            uni.setStorageSync('userHistory', [])

            const userIdList = data.userList.map((item:any) => {
                return item.id
            })

            if (!userIdList.includes(newObj.id)) {
                data.userList.push({
                    ...res,
                    userMobile: data.mobile
                })
                uni.setStorageSync('userList', data.userList)
            }


            bcNotify.value.success('登录成功')
            addContentAccount({}).then(() => {})

            console.log('登录成功token', newObj)
            console.log('usernumber', data.mobile)
            console.log('data.userList', data.userList)

            setTimeout(() => {
                // const pages = getCurrentPages()
                // if (data.retainPage == 1) {
                //     // #ifdef MP-WEIXIN
                //     uni.navigateBack()
                //     // #endif

                //     // #ifdef APP || H5
                //     gotoIndex()
                //     // #endif
                // }else{
                //     gotoIndex()
                // }

                if (data.retainPage == 1) {
                    // #ifdef MP-WEIXIN
                    uni.navigateBack()
                    // #endif

                    // #ifdef APP || H5
                    gotoIndex()
                    // #endif
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
    left: 0;
}
.input {
    margin-top: 238rpx;
    padding: 0 60rpx;
    .input_title{
        font-size: 56rpx;
        font-weight: 600;
        line-height: 72rpx;
        color: #333333;
    }
    .input_teltip{
        font-size: 30rpx;
        font-weight: 400;
        line-height: 38rpx;
        color: #989B9A;
        margin-top: 10rpx;
        margin-bottom: 40rpx;
    }
    .inp {
        padding-left: 40rpx;
        background-color: white;
        border-radius: 54rpx;
    }

    .prefix {
        border-right: 1rpx solid #E0E0E0;
        padding-right: 10rpx;
    }
}

.protocol_box {
    padding: 0 60rpx;
    color: #999999;
    font-size: 22rpx;
    margin-bottom: 30rpx;
    .agreement {
        color: #41A0FE;
    }
    .agreement_text{
        margin-left: 12rpx;
    }
}

.codeLogin{
    margin-bottom: 30rpx;
}
// .btn {
//     margin-top: 60rpx;
// }
</style>
