<template>
	<view class="container">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
        >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'账号中心'" ></bc-page-navbar>
            </template>
            <view class="page_content">
                <view class="user_card">
                    <image
                        class="user_img"
                        :src="data.userObj.avatar"
                        mode="scaleToFill"
                    />
                    <view class="user_text">
                        <view class="user_name">{{ data.userObj.nickname }}</view>
                        <view class="user_Bcid">{{ data.userObj.regCode }}</view>
                    </view>
                </view>
                <view class="operation_box">
                    <view class="operation_item" @click="toEditProfile">
                        <view class="item_left">
                            <image
                                class="item_img"
                                :src="getAssetsUrl('/leyou/my/personal_icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="item_title">个人信息</view>
                        </view>
                        <view class="item_right">
                            <TnIcon name="right" color="#777777" size="40rpx"></TnIcon>
                        </view>
                    </view>

                    <view class="operation_item" @click="toAuthentication">
                        <view class="item_left">
                            <image
                                class="item_img"
                                :src="getAssetsUrl('/leyou/my/checkID_icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="item_title">实名认证</view>
                        </view>
                        <view class="item_right">
                            <view class="item_right_text">
                                {{ data.pageObj.cardId ? '已实名' : '未实名' }}
                            </view>
                            <TnIcon name="right" color="#777777" size="40rpx"></TnIcon>
                        </view>
                    </view>

                    <!-- <view class="operation_item">
                        <view class="item_left">
                            <image
                                class="item_img"
                                :src="getAssetsUrl('/leyou/my/recordLogin_icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="item_title">记住登录信息</view>
                        </view>
                        <view class="item_right">
                            <TnSwitch v-model="data.selectValue" active-color="#EA3E1A" width="88rpx"></TnSwitch>
                        </view>
                    </view> -->

                    <view class="operation_item" @click="clickCancel">
                        <view class="item_left">
                            <image
                                class="item_img"
                                :src="getAssetsUrl('/leyou/my/cancellation_icon.svg')"
                                mode="scaleToFill"
                            />
                            <view class="item_title">注销账号</view>
                        </view>
                        <view class="item_right">
                        </view>
                    </view>
                </view>
            </view>


		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'

import { PlatformManage } from '@bc/sys'
import { homePage, initFaceVerifyIdPlus, certificateByCertifyId,} from '@/api/create-api'
import { gotoCancel, gotoEditProfile } from "@/routes/user-routes"

interface Data {
    userObj: any
    pageObj: any
    selectValue: boolean
    getClient: string
}

const data = reactive<Data>({
    userObj: {},
    pageObj: {},
    selectValue: true,
    getClient: '',

})

const bcNotify = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
    homePage({}).then((res:any) => {
        data.pageObj = res
        console.log('data.pageObj',data.pageObj);
    })
    PlatformManage.getToken().then((token) => {
        data.userObj = token
        console.log('data.userObj',data.userObj);
    })
})

onMounted(()=>{
    // #ifdef MP-WEIXIN
    data.getClient = 'WEIXIN'
    // #endif

    // #ifdef APP-VUE
    data.getClient = 'APP'
    // #endif
})

onShow(() => {
})



const toAuthentication = () => {
    if (data.getClient == 'WEIXIN') {
        bcNotify.value.show('因技术升级原因,请您前往保椿照护APP进行实名认证')
        return
    }

    // #ifdef APP-VUE
    const n = uni.requireNativePlugin('AP-FaceDetectModule')

    const platform = uni.getSystemInfoSync().platform

    let metaInfo = n.getMetaInfo()
    if (platform == 'ios') {
        metaInfo=JSON.stringify(metaInfo)
    }
    console.log('metaInfo',metaInfo)
    initFaceVerifyIdPlus({ metaInfo }).then((res: any) => {
        // this.certifyId = res.certifyId
        n.verify({ certifyId: res.certifyId}, (v: any) => {
            if(v.code == 1000) {
                console.log('人脸识别成功。。。请求接口',res.certifyId)
                certificateByCertifyId({
                    certifyId: res.certifyId
                }).then((res: any) => {
                    console.log('实名认证提交成功',res)
                    bcNotify.value.show(getResultString(v.code))
                }).catch((err: any) => {
                    console.log('实名认证提交失败',err)
                    bcNotify.value.error(getResultString(v.code))
                })
                return
            }
            bcNotify.value.error(getResultString(v.code))
        })
    }).finally(() => {
        bcNotify.value.show('正在调起人脸识别')
    }).catch(() => {
        bcNotify.value.error('人脸识别调用失败')
    })
    // #endif
}

const getResultString = (code: any) => {
    const statusCode = {
        1000: '认证成功',
        1001: '系统错误',
        1003: '验证中断',
        2002: '网络错误',
        2003: '客户端设备时间错误',
        2006: '认证失败',
    }
    return statusCode[code]
}

const clickCancel = () => {
    gotoCancel()
}

const toEditProfile = () => {
    gotoEditProfile()
}

</script>

<style lang="scss" scoped>
.page_content{
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    .user_card{
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background: #FFFFFF;
        border-radius: 24rpx;
        margin-bottom: 20rpx;
        .user_img{
            width: 104rpx;
            height: 104rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }
        .user_text{
            .user_name{
                font-size: 36rpx;
                font-weight: 500;
                color: #333333;
                margin-bottom: 8rpx;
            }
            .user_Bcid{
                font-size: 24rpx;
                font-weight: 400;
                color: #666666;
            }
        }
    }
    .operation_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 24rpx;
        .operation_item{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 40rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #F2F2F2;
            .item_left{
                display: flex;
                align-items: center;
                .item_img{
                    width: 44rpx;
                    height: 44rpx;
                    margin-right: 12rpx;
                }
                .item_title{
                    font-size: 30rpx;
                    color: #333333;
                    font-weight: 500;
                }
            }
            .item_right{
                display: flex;
                align-items: center;
                .item_right_text{
                    font-size: 30rpx;
                    font-weight: 400;
                    color: #999999;
                    margin-right: 8rpx;
                }
            }
        }

    }
}
</style>
<style>
page{
    background: #F2F3F5;
}
</style>
