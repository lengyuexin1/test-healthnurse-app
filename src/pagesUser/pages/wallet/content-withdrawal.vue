<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="wrap">
                <view class="box">
                    <view class="top tn-flex-center-between">
                        <view class="left">
                            <view>现在余额</view>
                            <view class="num"><text class="unit">￥</text>{{ data.cashData.money ? (Number(data.cashData.money) / 100).toFixed(2) : 0 }}</view>
                        </view>
                        <view class="right">
                            <TnButton width="160rpx" height="58rpx" font-size="28rpx" shape="round" bg-color="#FFFFFF" text-color="#4C99E6" :debounce="true" @tap="clickWithdrawal">
                                立即提现
                            </TnButton>
                        </view>
                    </view>
                    <view class="bottom tn-flex-center-between">
                        <view class="entry">入账中： ￥{{ data.cashData.transferring ? (Number(data.cashData.transferring) / 100).toFixed(2) : 0 }}</view>
                    </view>
                </view>
            </view>

            <view class="type tn-flex-center-between">
                <view class="tn-flex-row">
                    <view :class="['item tn-flex-center-center', item.id == data.typeActive ? 'typeActive' : '']" v-for="(item, index) in data.typeList" :key="index" @tap="clickType(item.id)">
                        {{ item.name }}
                    </view>
                </view>
            </view>

        </template>

        <view class="list-wrap">
            <withdrawalItem v-for="(item, index) in data.dataList" :key="index" :item="item" type="content"></withdrawalItem>
        </view>

        <template #bottom>
            <TnPopup v-model="data.showPopup" open-direction="bottom" :close-btn="true">
                <view class="popup-wrap">
                    <view class="title tn-flex-center-center">提现金额</view>
                    <view class="amount"><text class="unit">￥</text>{{ data.cashData.cash ? (Number(data.cashData.cash) / 100).toFixed(2) : 0 }}</view>
                    <view class="list">
                        <view class="list-item tn-flex-center-between">
                            <view>税前所得金额</view>
                            <view>{{ data.cashData.money ? (Number(data.cashData.money) / 100).toFixed(2) : 0 }}元</view>
                        </view>
                        <view class="list-item tn-flex-center-between">
                            <view>扣税金额</view>
                            <view>{{ (Number(data.cashData.money - data.cashData.cash) / 100).toFixed(2) }}元</view>
                        </view>
                        <view class="list-item tn-flex-center-between">
                            <view>到账方式</view>
                            <view class="tn-flex-center-center"><image :src="getAssetsUrl('/leyou/icon/weixin.png')" mode="scaleToFill" /> 微信零钱</view>
                        </view>
                    </view>
                    <!-- <view class="tips">本月已提现 0 元(税前)，扣税方法请看</view> -->
                    <view class="btn tn-flex-center-between">
                        <TnButton plain width="48%" height="80rpx" font-size="28rpx" shape="round" bg-color="#FFFFFF" text-color="#666666" :border="true" border-color="#D1D1D1" @tap="data.showPopup = false">
                            取消
                        </TnButton>
                        <TnButton width="48%" height="80rpx" font-size="28rpx" shape="round" bg-color="#4A97E4" text-color="#FFFFFF" :debounce="true" @tap="submit">
                            确定提现
                        </TnButton>
                    </view>
                </view>
            </TnPopup>
        </template>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
    <BCPopup
        ref="bcPopup"
        title="温馨提示"
        content="是否前往小程序完成提现操作"
        subBtn="确认"
        cancelBtn="取消"
        subBtnColor="#29C86F"
        @clickLeftBtn="confirm"
        @clickRightBtn="cancel">
    </BCPopup>
    <ReflectPopup ref="reflectPopup" @startReflect="startReflect" @startFacial="startFacial"></ReflectPopup>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import withdrawalItem from './components/withdrawal-item.vue'
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import ReflectPopup from './components/reflect-popup.vue'
import { getmoneyDetail, getmoneyList, moneytransfer } from '@/api/user-api'
import { homePage, initFaceVerifyIdPlus, certificateByCertifyId } from '@/api/create-api'
import { getWechatOpenid } from '@/api/open-api'
import { callApiLocal } from "@/utils/client"

interface Data {
    rewardId: any
    typeList: any
    typeActive: number | string
    dataList: any
    cashData: any
    showPopup: boolean
    widthIndex: any
    getClient: string
}

const data = reactive<Data>({
    rewardId: null,
    typeList: [
        { id: '', name: '全部' },
        { id: 2, name: '支出' },
        { id: 1, name: '收入' }
    ],
    cashData: {},
    typeActive: '',
    dataList: [],
    showPopup: false,
    widthIndex: null,
    getClient: ''
})

const paging = ref() as any

const bcNotify = ref()

const bcPopup = ref()

const reflectPopup = ref()

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

onLoad((options) => {
    // #ifdef MP-WEIXIN
    data.getClient = 'WEIXIN'
    // #endif

    // #ifdef APP-PLUS
    data.getClient = 'APP'
    // #endif

    initReward()

    getWechatOpenid({
        code: '001RFFll2VIcoe4Dtknl2JK2I33RFFla'
    }).then((res1) => {
        console.log('6767676', res1)

        uni.setStorageSync('openid', res1)
        weixinInitSubmit()
    }).catch((err) => {
        console.log(err)
    })
})

const initReward = () => {
    getmoneyDetail().then((res: any) => {
        data.cashData = res
    })
}

const queryList = (pageNumber: number, pageSize: number) => {
    getmoneyList({
        pageSize,
        pageNumber,
        query: {
            incomeExpense: data.typeActive
        }
    }).then((res: any) => {
        paging.value?.complete(res.data)
    })
}

const clickType = (id: any) => {
    data.typeActive = id
    paging.value?.reload()
}

const clickWithdrawal = () => {
    data.showPopup = true
}

const submit = () => {
    homePage({}).then((res: any) => {
        if (!res.cardId) {
            if (data.getClient == 'WEIXIN') {
                data.showPopup = false
                bcNotify.value.show('因技术升级原因,请您前往保椿照护APP进行实名认证')
                return
            }
            else if (data.getClient == 'APP') {
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
                                initSubmit()
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
        }
        else {
            reflectPopup.value.open(1)
            data.showPopup = false
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
        2006: '认证失败',
    }
    return statusCode[code]
}

// 活体检测
const startFacial = () => {
    callApiLocal().then(() => {
        reflectPopup.value.open(2)
    }).catch(() => {
        reflectPopup.value.open(3)
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
                console.log('45454', res)

                if (res.code) { //微信登录成功 已拿到code
                    getWechatOpenid({
                        code: res.code
                    }).then((res1) => {
                        console.log('6767676', res1)

                        uni.setStorageSync('openid', res1)
                        weixinInitSubmit()
                    }).catch((err) => {
                        bcNotify.value.error(err)
                    })
                }
            }
        })
    // #endif

    // #ifdef MP-WEIXIN
        weixinInitSubmit()
    // #endif
}

const weixinInitSubmit = () => {
    reflectPopup.value.close()
    uni.showLoading({
        title: '处理中'
    })
    const openid = uni.getStorageSync('openid')
    moneytransfer({ openid, platformType: 2 }).then(res => {
        data.showPopup = false
        bcNotify.value.show('提现申请成功，提现审批将在24小时内完成')
        initReward()
        paging.value?.reload()
    }).catch(error => {
        bcNotify.value.error(error.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

const confirm = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    plus.share.getServices((res: any) => {
        let sweixin = null
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()

            sweixin.launchMiniProgram({
                id: 'wxba2158972baec41b',  // 小程序的原始ID，微信公众平台设置里有
                type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                path: '/pagesUser/pages/wallet/withdrawal' // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
            })
        }
    })
}

const cancel = () => {
    bcPopup.value.close()
}

</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30rpx;
}

.box {
    width: 100%;
    padding: 40rpx;
    font-size: 30rpx;
    color: #FFFFFF;
    border-radius: 24rpx;
    background: linear-gradient(135deg, #4896E4 0%, #6DAEF2 100%);

    .top {
        padding: 0 0 30rpx 0;

        .num {
            margin-top: 20rpx;
            font-size: 60rpx;

            .unit {
                font-size: 44rpx;
            }
        }
    }

    .bottom {
        padding: 30rpx 0 0 0;
        font-size: 28rpx;
        border-top: solid 1rpx #FFFFFF;

        .tips {
            font-size: 24rpx;
            color: rgba(255, 255, 255, .6);
        }
    }
}

.type {
    padding: 10rpx 30rpx 30rpx 30rpx;
    color: #666666;

    .item {
        width: 112rpx;
        height: 56rpx;
        margin-right: 20rpx;
        background: #E5E5E5;
        border-radius: 28rpx;
    }

    .typeActive {
        color: #4A97E4;
        background: #FFFFFF;
    }
}

.list-wrap {
    margin: 0 30rpx 30rpx 30rpx;
    padding: 0 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
}

.popup-wrap {
    padding: 30rpx;

    .title {
        font-size: 28rpx;
        color: #333333;
    }

    .amount {
        text-align: center;
        vertical-align: bottom;
        margin-top: 10rpx;
        font-size: 68rpx;
        font-weight: bold;
        color: #333333;

        .unit {
            font-size: 44rpx;
        }
    }

    .list {
        margin-top: 50rpx;

        .list-item {
            padding: 30rpx 0;
            border-bottom: solid 1rpx #F2F2F2;

            &:last-child {
                border-bottom: none;
            }
        }

        image {
            width: 36rpx;
            height: 36rpx;
            margin-right: 10rpx;
        }
    }

    .tips {
        margin: 60rpx 0;
        font-size: 28rpx;
        color: #666666;
    }

    .btn {
        padding: 30rpx 0;
        border-top: 1rpx solid #F2F2F2;
    }
}

.popup-wrap2 {
    width: 650rpx;
    padding: 36rpx;

    .title {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
    }

    .subtitle {
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #999999;
    }

    .amount {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40rpx;

        .item {
            width: 170rpx;
            height: 140rpx;
            color: #888888;
            margin: 10rpx;
            background: #F6F7FA;
            border-radius: 12rpx;

            .num {
                font-size: 48rpx;

                .unit {
                    font-size: 30rpx;
                }
            }
        }

        .withdrawalActive {
            color: #ffffff;
            background: #EA3E1A;
        }
    }

    .btn {
        margin-top: 60rpx;
    }

    .tips {
        margin-top: 40rpx;
        font-size: 24rpx;
        color: #666666;
        line-height: 44rpx;
    }
}

</style>

