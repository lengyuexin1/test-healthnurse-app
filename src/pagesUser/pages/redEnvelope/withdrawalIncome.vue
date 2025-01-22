<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="defaultPageSize"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'提现管理'" bg-color="#F2F3F5"></bc-page-navbar>
            </template>
            <view class="withdrawal">
                <view class="withdrawal_notice" v-if="cashData">
                    <view class="notice_left">
                        <view class="notice_left_title">现在余额</view>
                        <view class="notice_left_price">
                            <text style="font-size: 50rpx;">￥</text>
                            {{ toFixedNumber(cashData.money / 100) }}
                            <!-- {{ (cashData.money / 100).toFixed(2) }} -->
                        </view>
                    </view>

                    <view class="notice_right" @click="clickWithd">立即提现</view>
                </view>
                <view class="redEnvelope">
                    <!-- <view class="redEnvelope_left">入账中: ¥{{ (cashData.transferring / 100).toFixed(2) }}</view> -->
                    <view class="redEnvelope_left">入账中: ¥{{ toFixedNumber((cashData?.transferring / 100)) }}</view>
                    <!-- <view class="redEnvelope_right" @click="gotaskRecord">任务记录 ></view> -->
                </view>
            </view>
              <TnTabs
                :scroll="false" :bottom-shadow="false" font-size="30rpx" active-font-size="32rpx" bg-color="rgba(243, 244, 246, 1)" color="#333333" bar-color="#29C86F" active-color="#29C86F" @change="changeTabList">
                    <TnTabsItem v-for="(item, index) in list" :key="index" :title="item.name" />
              </TnTabs>
            <view class="menu" v-if="dataList.length">
                <view class="menu-list row i-center j-between" v-for="(item,index) in dataList" :key="index">
                    <view class="menu-list-left">
                        <view class="menu_left_title">{{ item.desc }}<text :style="item.transferStatus == 1 ? 'color: #31B045;background: #ECF7EC;' : ''" v-if="item.moneyType == 3">{{item.transferStatus == 1 ? '提现成功' : '提现中'}}</text></view>
                        <view class="menu_left_time">{{ formatTime(item.utcCreated) }}</view>
                    </view>
                    <!-- {{(item.money / 100).toFixed(2)}} -->
                    <view class="menu_list_right" :style="item.incomeExpense != 1 ? 'color:#FB4140' : ''">{{item.incomeExpense == 1 ? '+' : '-'}}{{ toFixedNumber((item.money / 100)) }}元</view>
                </view>
            </view>
            <!-- 首页弹窗广告 -->
            <TnPopup v-model="homeUser" closeable mode="center"  bg-color="transparent"  :overlayOpacity="0.7" @close="homeUser = false">
                <view class="regboxs">
                    <view class="withdrawal_proup">
                        <view class="Withdrawal_title">提现金额</view>
                        <!-- <view class="Withdrawal_desc">金额提现需要扣除{{cashData.commission}}%手续费</view> -->
                        <view class="Withdrawal_desc">
                            ￥
                            <!-- <text style="font-size: 50rpx;">{{(cashData.cash / 100).toFixed(2)}}</text> -->
                            <text style="font-size: 50rpx;">{{toFixedNumber((cashData?.cash / 100))}}</text>
                        </view>

                        <view class="withdrawal_proup_user">
                            <view class="withdrawal_proup_tax">
                                <view class="withdrawal_tax_left">税前所得金额</view>
                                <!-- <view class="withdrawal_tax_price">{{(cashData.money / 100).toFixed(2)}} 元</view> -->
                                <view class="withdrawal_tax_price">{{toFixedNumber((cashData?.money / 100))}} 元</view>
                            </view>
                             <view class="withdrawal_proup_tax">
                                <view class="withdrawal_tax_left">扣税金额</view>
                                <!-- <view class="withdrawal_tax_price">{{((cashData.money - cashData.cash) / 100).toFixed(2)}} 元</view> -->
                                <view class="withdrawal_tax_price">{{toFixedNumber(((cashData?.money - cashData?.cash) / 100))}} 元</view>
                            </view>
                             <view class="withdrawal_proup_tax">
                                <view class="withdrawal_tax_left">到账方式</view>
                                <view class="withdrawal_tax_right">
                                    <image :src="getAssetsUrl('/fare/weChatMini.png')" class="withdrawal_tax_img"></image>
                                    微信零钱
                                </view>
                            </view>
                            <!-- <view class="withdrawal_proup_tax_desc">本月已提现 0 元(税前)，扣税方法请看</view> -->
                        </view>
                    </view>
                    <view class="confirm_withdrawal">
                        <view class="confirm_withdrawal_cencel" @click="homeUser = false">取消</view>
                        <view class="withdrawal_proup_but" @click="submit">确认提现</view>
                    </view>
                </view>
            </TnPopup>
            <BCNotify ref="bcNotify"></BCNotify>
            <!-- <TnPopup v-model="show">
                <view class="popup_box">
                    <view class="content_text">
                        是否前往小程序完成提现操作
                    </view>
                    <view class="bottom_box">
                        <view class="cancel_btn" @click="show = false">取消</view>
                        <view class="confirm_btn" @click="confirm">确认</view>
                    </view>
                </view>
            </TnPopup> -->



        </z-paging>
        <ReflectPopup ref="reflectPopup" @startReflect="startReflect" @startFacial="startFacial"></ReflectPopup>

    </view>
</template>

<script lang='ts' setup>
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import BCNotify from '@/components/notify/index.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic } from '@/common/setPicture'
import { getmoneyList, moneytransfer, getmoneyDetail } from '@/api/user-api'
import { ref, reactive, computed, defineProps } from 'vue' // Import ref and reactive from Vue 3 Composition API
import dayjs from 'dayjs'
import { gotoTaskRecord } from '@/routes/user-routes'
import { onShow, onLoad } from '@dcloudio/uni-app'
import { homePage, initFaceVerifyIdPlus, certificateByCertifyId } from '@/api/create-api'
import ReflectPopup from './components/reflect-popup.vue'
import { getWechatOpenid } from '@/api/open-api'
import { callApiLocal } from "@/utils/client"


const list = ref([
    { name: '全部', id: '' },
    { name: '支出', id: 2 },
    { name: '收入', id: 1 }
])
const bcNotify = ref()
const paging = ref() as any
const cashData = ref<any>(null)
const withdIndex = ref<number>(0)
const dataList = ref([]) as any
const incomeExpense = ref<number|string>('')
const show = ref(false)
const defaultPageSize = 10
const rewardId = ref()
const homeUser = ref(false)
const getClient = ref<string>('')

// Computed properties
// 计算属性
const getAssetsUrl = computed(() => {
    return (str:any) => {
        return getAssetsPic(str)
    }
})
const formatTime = (number:number) => {
    return dayjs(number * 1000).format('YYYY-MM-DD HH:mm')
}

const toFixedNumber = computed(() => (number:number) => {
    const val = number.toFixed(2)
    return val
})

// Lifecycle hook: onLoad
onLoad((options:any) => {
    rewardId.value = options.activityId
    initReward()

    // #ifdef APP-PLUS
    getClient.value = 'APP-PLUS'
    // #endif

    // #ifdef MP-WEIXIN
    getClient.value = 'MP-WEIXIN'
    // #endif

})

// Methods
const clickWithd = () => {
    // #ifdef APP-PLUS
    show.value = true
    // #endif

    // #ifdef MP-WEIXIN
    homeUser.value = true
    // #endif
}
const confirm = () => {
    plus.share.getServices((res:any) => {
        let sweixin = null
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()
            show.value = false
            sweixin.launchMiniProgram({
                id: 'gh_c2469c570746', // 小程序的原始ID
                type: 1, // 小程序版本
                path: '/pagesCnt/pages/redEnvelope/withdrawalIncome' // 小程序的页面路径
            })
        }
    })
}

// 确认提现
const submit = () => {
    // #ifdef APP-PLUS
    // Handle APP-PLUS specific logic
    show.value = true
    // #endif


    // #ifdef MP-WEIXIN
    weixinInitSubmit()
    // #endif
}

const gotaskRecord = () => {
    gotoTaskRecord({ rewardId: rewardId.value })
}
// 判断是否实名认证
const getCardId = () => {
    homePage({}).then((res: any) => {
        if (!res.cardId) {
            if (getClient.value == 'MP-WEIXIN') {
                bcNotify.value.show('因技术升级原因,请您前往保椿生活APP进行实名认证')
                return
            }
            // #ifdef APP-VUE
            const n = uni.requireNativePlugin('AP-FaceDetectModule')

            const platform = uni.getSystemInfoSync().platform

            let metaInfo = n.getMetaInfo()
            if (platform == 'ios') {
                metaInfo = JSON.stringify(metaInfo)
            }
            console.log('metaInfo', metaInfo)
            initFaceVerifyIdPlus({ metaInfo }).then((res: any) => {
                // this.certifyId = res.certifyId
                n.verify({ certifyId: res.certifyId }, (v: any) => {
                    if (v.code == 1000) {
                        console.log('人脸识别成功。。。请求接口', res.certifyId)
                        certificateByCertifyId({
                            certifyId: res.certifyId
                        }).then((res: any) => {
                            console.log('实名认证提交成功', res)
                            bcNotify.value.show(getResultString(v.code))
                        }).catch((err: any) => {
                            console.log('实名认证提交失败', err)
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
        else {
            weixinInitSubmit()
        }
    })
}

const getResultString = (code: any) => {
    const statusCode = {
        1000: '认证成功',
        1001: '系统错误',
        1003: '验证中断',
        2002: '网络错误',
        2003: '客户端设备时间错误',
        2006: '认证失败'
    }
    return statusCode[code]
}

const weixinInitSubmit = () => {

    const openid = uni.getStorageSync('openid')
    moneytransfer({
        openid,
        platformType: 2
    }).then((res:any) => {
        console.log('res', res)

        homeUser.value = false
        if (!res) {
            bcNotify.value.success('提现中...')
        }
        else {
            bcNotify.value.success('提现成功')
        }
        initReward()
        queryList(1, 10)
    }).catch((error) => {
        homeUser.value = false

        bcNotify.value.error(error.message)
    })
}

const initReward = () => {
    getmoneyDetail().then((res) => {
        cashData.value = res
        console.log('初始化钱包数据cashData.value', cashData.value)
        console.log('cashData.value.money', cashData.value.money)


    }).catch(() => {
        cashData.value = null
    })
}



const changeTabList = (e:any) => {
    incomeExpense.value = e == 1 ? 2 : e == 2 ? 1 : ''
    console.log(incomeExpense.value, e)
    queryList(1, 10)
}

const queryList = (pageNumber:number, pageSize:number) => {
    getmoneyList({
        query: {
            incomeExpense: incomeExpense.value
        },
        pageNumber,
        pageSize
    }).then((res) => {
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete(false)
    })
}

const startReflect = () => {
    initSubmit()
}

const initSubmit = () => {
    // #ifdef APP-PLUS
    uni.login({
        onlyAuthorize: true,
        provider: 'weixin',
        success: (res) => {
            if (res.code) { //微信登录成功 已拿到code
                getWechatOpenid({
                    code: res.code
                }).then((res1) => {
                    uni.setStorageSync('openid', res1)
                    weixinInitSubmit()
                })
            }
        }
    })
    // #endif

    // #ifdef MP-WEIXIN
    weixinInitSubmit()
    // #endif
}

// 活体检测
const startFacial = () => {
    callApiLocal().then(() => {
        reflectPopup.value.open(2)
    }).catch(() => {
        reflectPopup.value.open(3)
    })
}

</script>

<style lang="scss" scoped>
.withdrawalActive {
    background: #29c86f !important;
    color: #ffffff !important;
}
.regboxs {
    width: 650rpx;
    background: #ffffff;
    border-radius: 40rpx !important;
    .withdrawal_proup_text {
        font-size: 24rpx;
        color: #666666;
        display: flex;
        justify-content: center;
        line-height: 44rpx;
        padding: 0 32rpx 50rpx 32rpx;
    }
    .withdrawal_proup {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        color: #999999;
        .Withdrawal_title {
            font-size: 36rpx;
            font-weight: 600;
            margin-top: 26rpx;
            margin-bottom: 20rpx;
            color: #333333;
        }
        .withdrawal_proup_user{
            width: 100%;
            .withdrawal_proup_tax_desc{
                font-size: 28rpx;
                color: #666666;
                padding: 50rpx 0;
                padding-left: 40rpx;
                text{
                    font-size: 28rpx;
                    color: #0083F6;
                    padding-left: 8rpx;
                }
            }
            .withdrawal_proup_tax{
                display: flex;
                height: 102rpx;
                margin: 0 40rpx;
                border-bottom: 2rpx solid rgba(242, 242, 242, 1);
                justify-content: space-between;
                align-items: center;
                font-size: 30rpx;
                color: #333333;
                .withdrawal_tax_right{
                    display: flex;
                    align-items: center;
                    .withdrawal_tax_img{
                        width: 36rpx;
                        height: 36rpx;
                        margin-right: 12rpx;
                    }
                }
            }
        }
    }
    .confirm_withdrawal{
        display: flex;
        padding: 60rpx 30rpx 20rpx 30rpx;
        .confirm_withdrawal_cencel{
            width: 330rpx;
            height: 80rpx;
            background: #FFFFFF;
            border-radius: 40rpx;
            border: 2rpx solid #D1D1D1;
            margin-right: 30rpx;
            display: flex;
            font-size: 32rpx;
            color: #666666;
            justify-content: center;
            align-items: center;
        }
        .withdrawal_proup_but{
            display: flex;
            font-size: 32rpx;
            justify-content: center;
            align-items: center;
            color: #FFFFFF;
            width: 330rpx;
            height: 80rpx;
            background: #29C86F;
            border-radius: 40rpx;
        }
    }
}
::v-deep .u-tabs__wrapper__nav__line {
    background: none !important;
}
::v-deep .u-popup__content {
    border-radius: 40rpx !important;
}
.menu {
    background-color: #ffffff;
    margin: 24rpx 16rpx;
    border-radius: 24rpx;
    padding-top: 20rpx;
    &-list {
        padding: 24rpx 36rpx;
        border-bottom: 2rpx solid #f2f2f2;
        &-left {
            display: flex;
            flex-direction: column;
            .menu_left_title {
                font-size: 30rpx;
                padding-top: 8tpx;
                color: #333333;
                text{
                    margin-left: 12rpx;
                    font-size: 24rpx;
                    color: #F69C00;
                    background: #FFF5D8;
                    border-radius: 4rpx;
                    padding: 6rpx 10rpx;
                }
            }
            .menu_left_time {
                font-size: 24rpx;
                color: #999999;
                padding-top: 8rpx;
            }
        }
        .menu_list_right {
            font-size: 30rpx;
            color: #29c86f;
        }
    }
}
.withdrawal {
    height: 280rpx;
    margin: 20rpx;
    background: linear-gradient(47deg, #3dd681 0%, #29c86f 100%);
    border-radius: 24rpx;
    padding: 0 40rpx;
    .redEnvelope {
        height: 88rpx;
        font-size: 28rpx;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 2rpx solid rgba(255, 255, 255, 0.3);
    }
    .withdrawal_notice {
        display: flex;
        padding: 30rpx 0 20rpx 0;
        justify-content: space-between;
        align-items: center;
        .notice_left {
            color: #ffffff;
            display: flex;
            padding-top: 24rpx;
            flex-direction: column;
            .notice_left_title {
                font-size: 28rpx;
            }
            .notice_left_price {
                font-size: 60rpx;
            }
        }
        .notice_right {
            background: #ffffff;
            font-size: 24rpx;
            color: #29c86f;
            width: 160rpx;
            display: flex;
            justify-content: center;
            align-content: center;
            height: 58rpx;
            line-height: 58rpx;
            // padding: 12rpx 32rpx;
            border-radius: 30rpx;
        }
    }
}
.popup_box{
    width: 500rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .content_text{
        display: flex;
        text-align: center;
        margin-bottom: 40rpx;
    }
    .bottom_box{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .cancel_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            border-right: 2rpx solid #F0F0F0;
            box-sizing: border-box;
            color: #333333;
            font-weight: 400;
            font-size: 28rpx;
            width: 50%;
        }
        .confirm_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            font-size: 28rpx;
            color: #EA3E1A;
            font-weight: 400;
            width: 50%;

        }
    }
}
</style>
