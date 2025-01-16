<template>
    <view class="container">
        <customNavbar bgColor="#F7F7F7" pageTitle="通知人员"></customNavbar>
        <view class="calerbox">
            <view class="calecon">
                <view class="caleli row i-center j-between">
                    <view class="caletit">通知人名称</view>
                    <view class="caleinp">
                        <input v-model="formDate.name" class="inpbox" type="text" :maxlength="10"
                               placeholder="请输入通知人名称">
                    </view>
                </view>
                <view class="caleli row i-center j-between">
                    <view class="caletit">通知人电话</view>
                    <view class="caleinp">
                        <input v-model="formDate.mobile" class="inpbox" type="number" :maxlength="11"
                               placeholder="请输入通知人电话">
                    </view>
                </view>
                <view class="caleli row i-center j-between">
                    <view class="caletit">验证码</view>
                    <view class="caleinp row i-center">

                        <TnInput v-model="formDate.code" class="inpbox" type="number" maxlength="11"
                                 placeholder="请输入手机号码">
                            <template #suffix>
                                <view class="daojs" v-if="showCode">
                                    <TnCountDown ref="countDown" :time="59" @end="endTime" :show-hour="false"
                                                 :show-minute="false"/>
                                </view>
                                <TnButton v-if="!showCode" text-color="#fff" bg-color="#29C86F" @tap="getCode">{{
                                        tips
                                    }}
                                </TnButton>
                            </template>
                        </TnInput>

                        <!-- <input v-model="formDate.code" class="inpbox" type="number" :maxlength="11" placeholder="请输入验证码">
                        <view class="codebox">
                            <u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
                            <TnButton @tap="getCode" :text="tips" color="#29C86F" size="mini"
                                :customStyle="{ height: '56rpx' }"></TnButton>
                        </view> -->
                    </view>
                </view>
                <view class="caleli row i-center j-between">
                    <view class="caletit">短信通知</view>
                    <view class="calewitch">
                        <!-- <u-switch v-model="formDate.smsNotify" size="22" inactiveColor="#DBDBDB"
                            activeColor="#29C86F"></u-switch> -->
                        <TnSwitch size="20" inactiveColor="#DBDBDB" activeColor="#29C86F" v-model="formDate.smsNotify">
                        </TnSwitch>
                    </view>
                </view>
                <view class="caleli row i-center j-between">
                    <view class="caletit">电话通知</view>
                    <view class="calewitch">
                        <!-- <u-switch v-model="formDate.telNotify" size="22" inactiveColor="#DBDBDB"
                            activeColor="#29C86F"></u-switch> -->
                        <TnSwitch size="20" inactiveColor="#DBDBDB" activeColor="#29C86F" v-model="formDate.telNotify">
                        </TnSwitch>
                    </view>
                </view>
            </view>
        </view>
        <view class="calerfot">
            <u-safe-bottom slot="bottom"></u-safe-bottom>
            <view class="fotbox">
                <view class="fotbtn row i-center j-between">
                    <view class="fotdel" v-if="receiverId">
                        <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%" height="90"
                                  bg-color="#ff4d4e" @click="delshow = true">删除
                        </TnButton>
                    </view>
                    <view class="fotsure">
                        <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="100%" height="90"
                                  bg-color="#29C86F" @click="submit">保存
                        </TnButton>
                    </view>
                </view>
                <u-safe-bottom slot="bottom"></u-safe-bottom>
            </view>
        </view>

        <TnPopup v-model="delshow">
            <view class="modelBox">
                <view>是否删除此通知人？</view>
            </view>
            <view class="towBtn">
                <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="40%" height="60"
                          bg-color="#ff4d4e" @click="removeCaler">确定
                </TnButton>
                <TnButton border-color="#E3E3E3" text-color="#fff" font-size="32rpx" width="40%" height="60"
                          bg-color="#29C86F" @click="delshow = false">取消
                </TnButton>
            </view>
        </TnPopup>
        <!-- <u-modal :show="delshow" title="是否删除此通知人？" @confirm="removeCaler" showCancelButton
            @cancel="delshow = false"></u-modal> -->
    </view>
</template>

<script setup lang="ts">
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { addCaller, callerDel, getCallerList, sendBindCodeToSelf } from "@/api/room-api"
import { ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"

const showCode = ref(false)
const tips = ref('获取验证码')
const delshow = ref(false)
const receiverId = ref("")
const formDate: any = ref({
    name: "",
    mobile: "",
    code: "",
    smsNotify: false,
    telNotify: false
})

onLoad((option: any) => {
    if (option.id) {
        receiverId.value = option.id
        getCallerListApi()
    }
})

const endTime = (e: any) => {
    showCode.value = false
}
const getCallerListApi = () => {
    getCallerList().then(res => {
        if (res.length > 0) {
            const data = res.find(x => x.id === receiverId.value)
            formDate.value = {
                name: data.name,
                mobile: data.mobile,
                code: "",
                smsNotify: data.smsNotify === 1,
                telNotify: data.telNotify === 1
            }
        }
        // else {
        //     this.calerInfo = {}
        // }
    })
}

const codeChange = (text: any) => {
    tips.value = text
}

const getCode = () => {
    // if (this.$refs.uCode.canGetCode) {
    showCode.value = true
    if (!formDate.value.mobile) {
        return uni.showToast({
            title: "请输入通知人电话",
            icon: "error"
        })
    }
    uni.showLoading({
        title: '正在获取验证码'
    })
    sendBindCodeToSelf().then((res) => {
        // uni.$u.toast('验证码已发送')
        // 通知验证码组件内部开始倒计时
        // this.$refs.uCode.start()
        if (res !== 1 && !isNaN(res)) {
            formDate.value.code = res
        }
    }).finally(() => {
        uni.hideLoading()
    })
    // }
    // else {
    //     uni.$u.toast('倒计时结束后再发送')
    // }
}

// 删除通知人
const removeCaler = () => {
    callerDel(receiverId.value).then(() => {
        uni.showToast({
            title: "删除成功",
            icon: "none"
        })
        delshow.value = false
        setTimeout(() => {
            uni.navigateBack()
        }, 1000)
    }).catch(err => {
        console.log(err)
    })
}
const submit = () => {
    if (!formDate.value.name) {
        return uni.showToast({
            title: "请输入通知人",
            icon: "error"
        })
    }
    if (!formDate.value.mobile) {
        return uni.showToast({
            title: "请输入通知人电话",
            icon: "error"
        })
    }
    if (!formDate.value.code) {
        return uni.showToast({
            title: "请输入验证码",
            icon: "error"
        })
    }
    addCaller({
        ...formDate.value,
        smsNotify: Number(formDate.value.smsNotify),
        telNotify: Number(formDate.value.telNotify)
    }).then(() => {
        uni.showToast({
            title: "提交成功",
            icon: "none"
        })
        setTimeout(() => {
            uni.navigateBack()
        }, 1000)

    }).catch(err => {
        console.log(err.message)
    })
}
</script>

<style>
page {
    background-color: #F7F7F7;
}
</style>

<style lang="scss" scoped>
.calerbox {
    padding: 30rpx 20rpx;

    .calecon {
        background: #FFFFFF;
        border-radius: 16rpx;
        padding: 1rpx 30rpx;

        .caleli {
            padding: 40rpx 0;
            border-bottom: 2rpx solid #F2F2F2;

            &:last-child {
                border-bottom: none;
            }

            .caletit {
                font-weight: blod;
                font-size: 30rpx;
                color: #333333;
                margin-right: 30rpx;
            }

            .caleinp {
                // flex: 1;

                .inpbox {
                    font-size: 28rpx;
                    text-align: right;
                }

                .daojs {
                    width: 80rpx;
                }

                .codebox {
                    width: 172rpx;
                    margin-left: 20rpx;
                }
            }
        }
    }
}

.calerfot {
    &::before {
        content: "";
        display: block;
        height: 130rpx;
        opacity: 0;
    }

    .fotbox {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: #FFFFFF;
        box-shadow: 0rpx -16rpx 8rpx rgba(0, 0, 0, 0.02);
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);

        .fotbtn {
            height: 130rpx;
            box-sizing: border-box;
            padding: 20rpx 30rpx;

            :deep(.tn-button) {
                border-radius: 100rpx;
            }

            .fotdel {
                width: 250rpx;
                margin-right: 30rpx;
            }

            .fotsure {
                flex: 1;


            }
        }
    }
}

.modelBox {
    width: 400rpx;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.towBtn {
    display: flex;
    justify-content: space-around;
    margin: 0 20rpx 20rpx 20rpx;

    :deep(.tn-button) {
        border-radius: 100rpx;
    }

}
</style>
