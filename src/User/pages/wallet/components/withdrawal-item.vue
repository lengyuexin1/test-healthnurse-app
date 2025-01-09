<template>
    <view class="item-wrap tn-flex-center-between">
        <view class="left">
            <view class="title">
                <text v-if="type == 'sign'">{{ item.rewardName }}</text>
                <text v-else-if="type == 'content'">{{ item.desc || '--' }}</text>

                <template v-if="type == 'sign'">
                    <text class="tag process" v-if="item.rewardType == 4 && item.transferStatus == 0">提现中</text>
                    <text class="tag success" v-if="item.rewardType == 4 && item.transferStatus == 1">提现成功</text>
                </template>

                <template v-else-if="type == 'content'">
                    <text class="tag process" v-if="item.moneyType == 3 && item.transferStatus == 0">提现中</text>
                    <text class="tag success" v-if="item.moneyType == 3 && item.transferStatus == 1">提现成功</text>
                </template>
            </view>
            <view class="date">{{ dateTime(item.utcCreated) }}</view>
        </view>
        <view class="money">
            <template v-if="type == 'sign'">
                <text class="add" v-if="item.incomeExpense == 1">
                    +{{ (Number(item.reward) / 100).toFixed(2) }}元
                </text>
                <text class="minus" v-else>
                    -{{ (Number(item.reward) / 100).toFixed(2) }}元
                </text>
            </template>
            
            <template v-else-if="type == 'content'">
                <text class="add" v-if="item.incomeExpense == 1">
                    +{{ (Number(item.money) / 100).toFixed(2) }}元
                </text>
                <text class="minus" v-else>
                    -{{ (Number(item.money) / 100).toFixed(2) }}元
                </text>
            </template>
            
        </view>
    </view>
</template>

<script setup lang="ts">
import dayjs from "dayjs"

interface Props {
    item: any
    type: string
}

const props = defineProps<Props>()

// 时间
const dateTime = (time: number) => {
    const datetime = dayjs(time * 1000)
    return datetime.format('YYYY/MM/DD HH:mm:ss')
}

</script>
  
<style lang="scss" scoped>
.item-wrap {
    padding: 30rpx 0;
    border-bottom: solid 1rpx #F2F2F2;
    
    .title {
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;

        .tag {
            margin-left: 12rpx;
            padding: 8rpx 8rpx;
            font-size: 24rpx;
            font-weight: 400;
            border-radius: 4rpx;
        }

        .process {
            color: #F69C00;
            background: #FFF5D8;
        }

        .success {
            color: #31B045;
            background: #ECF7EC;
        }
    }

    .date {
        margin-top: 15rpx;
        font-size: 24rpx;
        color: #999999;
    }

    .money {
        font-size: 30rpx;

        .minus {
            color: #FB4140;
        }

        .add {
            color: #29C86F;
        }
    }
}
</style>
