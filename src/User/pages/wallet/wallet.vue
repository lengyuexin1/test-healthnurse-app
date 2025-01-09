<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="false"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :hide-empty-view="true"
    >
        <template #top></template>

        <view class="wrap">
            <view class="box sign-income" v-if="data.signDetail.isHave == 1">
                <view class="tn-flex-center-between">
                    <view>签到活动收益</view>
                    <view class="right" @tap="clickWithdrawal(1)">去提现<TnIcon name="right" color="#FFFFFF" /></view>
                </view>
                <view class="tn-flex-row detail">
                    <view class="balance">
                        <view>现金余额</view>
                        <view class="num">￥{{ formatAmount(data.signDetail.money) }}</view>
                    </view>
                    <view class="line">

                    </view>
                    <view class="entry">
                        <view>入账中</view>
                        <view class="num">￥{{ formatAmount(data.signDetail.transferring) }}</view>
                    </view>
                </view>
            </view>

            <view class="box content-income">
                <view class="tn-flex-center-between">
                    <view>内容收益</view>
                    <view class="right" @tap="clickWithdrawal(2)">去提现<TnIcon name="right" color="#FFFFFF" /></view>
                </view>
                <view class="tn-flex-row detail">
                    <view class="balance">
                        <view>现金余额</view>
                        <view class="num">￥{{ formatAmount(data.contentDetail.money) }}</view>
                    </view>
                    <view class="line">

                    </view>
                    <view class="entry">
                        <view>入账中</view>
                        <view class="num">￥{{ formatAmount(data.contentDetail.transferring) }}</view>
                    </view>
                </view>
            </view>
            <view class="box promotion-income">
                <view class="tn-flex-center-between">
                    <view>推广收益</view>
                    <view class="right" @tap="clickWithdrawal(3)">去提现<TnIcon name="right" color="#FFFFFF" /></view>
                </view>
                <view class="tn-flex-row detail">
                    <view class="balance">
                        <view>现金余额</view>
                        <view class="num">￥{{ formatAmount(data.cashData.money) }}</view>
                    </view>
                    <view class="line">

                    </view>
                    <view class="entry">
                        <view>入账中</view>
                        <view class="num">￥{{ formatAmount(data.cashData.transferring) }}</view>
                    </view>
                </view>
            </view>
        </view>
    </z-paging>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoSignWithdrawal, gotoContentWithdrawal, gotoWithdWallet } from '@/routes/user-routes'
import { getMoneyDetail, getmoneyDetail, getMoneyInfo } from '@/api/user-api'

interface Data {
    dataList: any
    signDetail: any
    contentDetail: any
    cashData:any
}
const data = reactive<Data>({
    dataList: [],
    signDetail: {},
    cashData: {},
    contentDetail: {}
})

const paging = ref()

onShow(() => {
    getWalletData()
})

/** @returns number 格式化金额 */
const formatAmount = (num: string | number) => {
    if (num) {
        return (Number(num) / 100).toFixed(2)
    }
    return 0
}

const queryList = () => {
    getWalletData()
    paging.value.complete([])
}

const getWalletData = () => {
    getMoneyDetail().then((res) => {
        data.signDetail = res
    })
    getmoneyDetail().then((res) => {
        data.contentDetail = res
    })
    getMoneyInfo().then((res:any) => {
        data.cashData = res
    })
}

const clickWithdrawal = (type: number) => {
    type == 1 && gotoSignWithdrawal()
    type == 2 && gotoContentWithdrawal()
    type == 3 && gotoWithdWallet()
}

</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.box {
    width: 690rpx;
    margin-top: 30rpx;
    padding: 40rpx;
    font-size: 30rpx;
    color: #FFFFFF;
    border-radius: 24rpx;
}

.sign-income {
    background: linear-gradient( 135deg, #EA3E1A 0%, #FF6F51 100%);
}

.content-income {
    background: linear-gradient( 135deg, #4896E4 0%, #6DAEF2 100%);
}
.promotion-income{
    background: linear-gradient( 135deg, #FBA02B 0%, #FFB95E 100%);
}

.right {
    font-size: 28rpx;
}

.detail {
    margin-top: 40rpx;
    align-items: center;
}

.balance,
.entry {
    min-width: 220rpx;
    font-size: 28rpx;

    .num {
        margin-top: 10rpx;
        font-size: 44rpx;
    }
}

.entry {
    flex: 1;
    padding-left: 100rpx;
}

.line {
    width: 1rpx;
    height: 80rpx;
    background-color: #FFFFFF;
}
</style>

