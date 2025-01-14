<template>
    <view class="container">
        <customNavbar pageTitle="配置设备上网"></customNavbar>
        <view class="netbox">
            <view class="netit">给设备连WIFI</view>
            <view class="netip row i-center">
                <image class="imgcs" :src="getAssetsUrl('/zhihu/net-icon1.svg')" mode="aspectFit" />
                <view class="netcon">
                    <view class="netsub">保持设备电量充足</view>
                    <view class="netdec">您需要给睡眠检测带供电，保持设备正常运行。</view>
                </view>
            </view>
        </view>
        <TnPopup v-model="data.createShow" mode="center" round="20" :safeAreaInsetBottom="false">
            <view class="catebox">
                <view class="cateclos">
                    <u-icon name="close" color="#333333" bold size="20" @click="data.createShow = false"></u-icon>
                </view>
                <view class="catetit">
                    <view class="tepOne">1、请链接设备wifi(SmartLife开头的)</view>
                    <view>2、请输入需要链接的WIFI名称和密码</view>
                </view>
                <view class="catename">WIFI名称</view>
                <view class="cateinp">
                    <input v-model="data.name" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI名称">
                </view>
                <view class="catename">WIFI密码</view>
                <view class="cateinp">
                    <input v-model="data.pwd" class="inptxt" type="text" maxlength="50" placeholder="请输入WIFI密码">
                </view>
                <view class="catebtn">
                    <TnButton width="100%" @click="getNet" height="90" text-color="#fff" font-size="32rpx"
                        bg-color="#111214" border-color="#E3E3E3">确定连接</TnButton>
                </view>
            </view>
        </TnPopup>
    </view>
    <view class="loadCs tn-flex-center-center" v-if="laodVal">
        <TnLoading show :animation="true" mode="flower" time-function="ease-in-out" size="80rpx" />
    </view>
</template>

<script lang="ts" setup>
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
// #ifdef APP-PLUS
const configModule = uni.requireNativePlugin("XM-TuyaConfigModule")
const userModule = uni.requireNativePlugin("XM-TuyaUserModule");
var homeModule = uni.requireNativePlugin("XM-TuyaHomeModule")
// #endif
const laodVal = ref(false)
const accessToken = ref('')
const devId = ref('')
accessToken.value = uni.getStorageSync('ysToken')
interface Props { }
const props = defineProps<Props>()
const getAssetsUrl = computed(() => {
    return (str: any) => {
        return getAssetsPic(str)
    }
})
const tokenAs = ref('')
const typeDev = ref('')
const roomId = ref('')
const homeId = ref('')
interface Data {
    createShow: boolean,
    name: string, //'baochun',
    pwd: string, //'YYuichb189%#',
}
const data = reactive<Data>({
    createShow: true,
    name: 'baochun', //'baochun',
    pwd: 'YYuichb189%#', //'YYuichb189%#',
})
onLoad((option: any) => {
    typeDev.value = option.type
    roomId.value = option.roomId
    // #ifdef APP-PLUS
    loginTy()
    // #endif
})

// 登录涂鸦账号
const loginTy = () => {
    userModule.loginOrRegisterWithUid({
        countryCode: '86',
        uid: "ay1733140667719LwTnK",
        passwd: '123456',
        isCreateHome: true
    }, (resp: any) => {
        console.log(resp)
        queryHomeList()
    })
}
//查询家庭列表
const queryHomeList = () => {
    homeModule.queryHomeList((resp:any) => {
        console.log(resp);
        homeId.value = resp.data[0].homeId
        getActivatorToken()
    })
}

//获取配网 Token
const getActivatorToken = () => {
    configModule.getActivatorToken({
        homeId: homeId.value
    }, (resp: any) => {
        tokenAs.value = resp.data
        console.log(tokenAs.value, resp)
    })
}
// 配置网络
const getNet = () => {
    laodVal.value = true
    configModule.newActivator({
        token: tokenAs.value,
        ssid: "baochun",
        password: "YYuichb189%#",
        activatorModel: "THING_AP",
        timeout: 200,
    }, (resp: any) => {
        laodVal.value = false
        if (resp.data.step == 'device_find') {
            uni.showToast({
                icon: "none",
                title: "查找设备中"
            })
        }
        if (resp.data.step == 'device_bind_success') {
            uni.showToast({
                icon: "none",
                title: "设置成功"
            })
            devId.value = resp.data.data.devId
        }
        console.log(resp);
    })
}

</script>

<style>
page {
    background: #ffffff;
}
</style>

<style lang="scss" scoped>
.netbox {
    padding: 40rpx 30rpx;

    .netit {
        font-weight: bold;
        font-size: 32rpx;
        color: #1A1A1A;
    }

    .netip {
        margin-top: 50rpx;
        padding: 0 10rpx;

        .imgcs {
            width: 68rpx;
            height: 68rpx;
        }

        .netcon {
            margin-left: 12rpx;

            .netsub {
                font-weight: bold;
                font-size: 28rpx;
                color: #333333;
            }

            .netdec {
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
                margin-top: 4rpx;
            }
        }
    }

    .netgap {
        margin-top: 60rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;

        &::before,
        &::after {
            content: '';
            display: block;
            width: 160rpx;
            height: 0rpx;
            border-bottom: 2rpx solid #EFEFEF;
            margin: 0 20rpx;
        }
    }

    .netopt {
        margin-top: 46rpx;
        height: 88rpx;
        background: #F6F6F6;
        border-radius: 18rpx;
        padding: 0 30rpx;

        &-txt {
            font-weight: 400;
            font-size: 28rpx;
            color: #9D9D9D;
            margin-left: 8rpx;
        }

        &-ink {
            font-weight: 400;
            font-size: 28rpx;
            color: #3E92FF;
            margin-right: 4rpx;
        }
    }
}

.catebox {
    box-sizing: border-box;
    width: 620rpx;
    background: #FFFFFF;
    border-radius: 40rpx;
    padding: 36rpx;
    position: relative;

    .cateclos {
        position: absolute;
        top: 36rpx;
        right: 36rpx;
        z-index: 99;
    }

    .catetit {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        text-align: left;
        margin-bottom: 48rpx;

        .tepOne {
            margin-bottom: 20rpx;
        }
    }

    .catename {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        margin-top: 30rpx;
    }

    .cateinp {
        background: #F6F6F6;
        border-radius: 16rpx;
        padding: 22rpx 30rpx;
        margin-top: 20rpx;

        .inptxt {
            width: 100%;
            font-size: 28rpx;
        }

        .codebox {
            width: 164rpx;
        }
    }

    .catebtn {
        margin-top: 70rpx;
    }
}

.wifiIcon {
    width: 50rpx;
    height: 50rpx;
}

.loadCs {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0, );
    z-index: 99999 !important;
}
</style>
