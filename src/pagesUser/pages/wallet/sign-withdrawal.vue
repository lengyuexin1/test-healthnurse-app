<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="false"
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
                            <view class="num"><text class="unit">￥</text>{{ data.cashData.reward ? (Number(data.cashData.reward) / 100).toFixed(2) : 0 }}</view>
                        </view>
                        <view class="right">
                            <TnButton width="160rpx" height="58rpx" font-size="28rpx" shape="round" bg-color="#FFFFFF" text-color="#EA3E1A" :debounce="true" @tap="clickWithdrawal">
                                立即提现
                            </TnButton>
                        </view>
                    </view>
                    <view class="bottom tn-flex-center-between">
                        <view class="entry">入账中： ￥{{ data.cashData.transferring ? (Number(data.cashData.transferring) / 100).toFixed(2) : 0 }}</view>
                        <!-- <view class="tips">(金额提现需要扣除20%手续费)</view> -->
                    </view>
                </view>
            </view>

            <view class="type tn-flex-center-between">
                <view class="tn-flex-row">
                    <view :class="['item tn-flex-center-center', item.id == data.typeActive ? 'typeActive' : '']" v-for="(item, index) in data.typeList" :key="index" @tap="clickType(item.id)">
                        {{ item.name }}
                    </view>
                </view>
                <view @tap="clickTaskRecord">
                    任务记录<TnIcon name="right" color="#666666" />
                </view>
            </view>
            
        </template>

        <view class="list-wrap">
            <withdrawalItem v-for="(item, index) in data.dataList" :key="index" :item="item" type="sign"></withdrawalItem>
        </view>

        <template #bottom>
            <TnPopup v-model="data.showPopup" open-direction="center" :close-btn="true">
                <view class="popup-wrap2">
                    <view class="title tn-flex-center-center">提现至微信</view>
                    <!-- <view class="subtitle tn-flex-center-center">金额提现需要扣除20%手续费</view> -->
                    <view class="amount">
                        <view :class="['item tn-flex-center-center', data.widthIndex == index ? 'withdrawalActive' : '' ]" v-for="(item, index) in data.cashData.cashList" :key="index" @tap="data.widthIndex = index">
                            <view class="num"><text class="unit">￥</text>{{ (Number(item.cash) / 100).toFixed(2) || 0 }}</view>
                        </view>
                    </view>
                    <view class="btn tn-flex-center-center">
                        <TnButton width="100%" height="90rpx" font-size="32rpx" shape="round" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="submit">
                            提现
                        </TnButton>
                    </view>
                    <view class="tips tn-flex-center-center">微信绑定手机号需与保椿照护绑定手机号一致，显示未绑定微信，请解绑后重试，可退出登录选择【微信登录】保证一致，每人每日仅可使用1次微信提现，现金72小时内打款至微信。</view>
                </view>
            </TnPopup>
        </template>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
    <ReflectPopup ref="reflectPopup" @startReflect="startReflect" @startFacial="startFacial"></ReflectPopup>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import ReflectPopup from './components/reflect-popup.vue'
import withdrawalItem from './components/withdrawal-item.vue'
import BCNotify from '@/components/notify/index.vue'
import { gotoTaskRecordList } from '@/routes/user-routes'
import { recordList, rewardCash, getMoneyDetail, rewardTransfer } from '@/api/user-api'
import { getWechatOpenid } from '@/api/open-api'
import { callApiLocal } from "@/utils/client"

interface Data {
    rewardId: any
    typeList: any
    typeActive: number
    dataList: any
    cashData: any
    showPopup: boolean
    widthIndex: any
}

const data = reactive<Data>({
    rewardId: null,
    typeList: [
        { id: '', name: '全部' },
        { id: 2, name: '支出' },
        { id: 1, name: '收入' }
    ],
    cashData: {},
    typeActive: 0,
    dataList: [],
    showPopup: false,
    widthIndex: null
})

const paging = ref() as any

const bcNotify = ref()

const reflectPopup = ref()

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

onLoad(async (options) => {
    await getMoneyDetail().then((res: any) => {
        data.rewardId = options?.rewardId || res?.rewardId
        paging.value?.reload()

        initReward()
    })
})

const initReward = () => {
    rewardCash({ id: data.rewardId }).then((res) => {
        data.cashData = res
    })
}

const queryList = (pageNumber: number, pageSize: number) => {
    recordList({
        pageSize,
        pageNumber,
        query: {
            rewardId: data.rewardId,
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
    if (data.widthIndex == null) {
        bcNotify.value.show('请选择提现金额')
        return
    }

    // #ifdef APP-PLUS
    uni.login({
        onlyAuthorize: true,
        provider: 'weixin',
        success: (res) => {
            console.log('uniApp登录res',res);
            console.log('res.code',res.code);
            
            if (res.code) { //微信登录成功 已拿到code
                getWechatOpenid({
                    code: res.code
                }).then((res1) => {
                    uni.setStorageSync('openid', res1)
                    weixinInitSubmit()
                }).catch((err:any)=>{
                    console.log('请求code失败',err);
                    
                })
            }
        },
        fail: (err) => {
            console.log('uniApp登录err',err)
        }
    })
    // #endif

    // #ifdef MP-WEIXIN
    weixinInitSubmit()
    // #endif
}

const weixinInitSubmit = () => {
    data.showPopup = false
    reflectPopup.value.open(1)
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
    reflectPopup.value.close()
    uni.showLoading({
        title: '处理中'
    })
    const openid = uni.getStorageSync('openid')
    rewardTransfer({ 
        openid,
        rewardId: data.rewardId,
        cash: Number(data.cashData.cashList[data.widthIndex].cash)
    }).then(res => {
        data.showPopup = false
        bcNotify.value.show('提现申请成功，提现审批将在24小时内完成')
        initReward()
        paging.value?.reload()
    }).catch((error) => {
        bcNotify.value.error(error.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

// const confirm = () => {
//     plus.share.getServices((res: any) => {
//         let sweixin = null
//         for (const i in res) {
//             if (res[i].id == 'weixin') {
//                 sweixin = res[i]
//             }
//         }
//         // 唤醒微信小程序
//         if (sweixin) {
//             uni.hideLoading()
//             sweixin.launchMiniProgram({
//                 id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
//                 type: 0, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
//                 path: '/pagesUser/pages/wallet/withdrawal' // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
//             })
//         }
//     })
// }

const clickTaskRecord = () => {
    gotoTaskRecordList(data.rewardId)
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
    background: linear-gradient( 135deg, #EA3E1A 0%, #FF6F51 100%);

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
        color: #EA3E1A;
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
 
