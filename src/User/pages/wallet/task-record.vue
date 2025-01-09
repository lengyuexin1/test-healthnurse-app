<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="30"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="tips tn-flex-center-center">
                任务奖励在任务完成后次日24:00前可领取，逾期未领视为主动放弃。
            </view>
        </template>

        <view class="list-wrap">
            <view class="list">
                <view class="item tn-flex-row" v-for="(item, index) in data.dataList" :key="index">
                    <view class="date">{{ dateTime(item.utcCreated) }}</view>
                    <view class="detail">{{  item.rewardName  }}</view>
                    <view class="num add" v-if="item.incomeExpense == 1">+{{ (Number(item.reward) / 100).toFixed(2) || 0 }}元</view>
                    <view class="num min" v-else-if="item.incomeExpense == 2">-{{ (Number(item.reward) / 100).toFixed(2) || 0 }}元</view>
                </view>
            </view>
        </view>
    </z-paging>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'
import { recordList } from '@/api/user-api'
import dayjs from "dayjs"

interface Data {
    rewardId: any
    dataList: any
}

const data = reactive<Data>({
    rewardId: null,
    dataList: []
})

const paging = ref() as any

const getAssetsUrl = computed(()=>(src: string)=> {
    return getAssetsPic(src)
})

onLoad((option) => {
    data.rewardId = option?.rewardId
})

const queryList = (pageNumber: number, pageSize: number) => {
    recordList({
        query: {
            rewardId: data.rewardId,
            incomeExpense: 3
        },
        pageNumber,
        pageSize
    }).then((res: any) => {
        paging.value?.complete(res.data)
    })
}

// 时间
const dateTime = (time: number) => {
    const datetime = dayjs(time * 1000)
    return datetime.format('MM月DD日')
}

</script>

<style>
page {
    background-color: #FFFFFF;
}
</style>
<style lang="scss" scoped>
.list-wrap {
    margin-top: 30rpx;
    padding: 0 30rpx;
}

.tips {
    font-weight: 400;
    font-size: 22rpx;
    color: #999999;
}

.list {
    margin-top: 50rpx;
    margin-bottom: 100rpx;
}

.item {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 24rpx;
    color: #333333;
    border-bottom: solid 1rpx #F2F2F2;;

    .date {
        width: 25%;
        text-align: left;
    }

    .detail {
        width: 50%;
        text-align: center;
    }

    .num {
        width: 25%;
        text-align: right;
    }

    .add {
        color: #29C86F;
    }

    .min {
        color: #FB4140;
    }
}
</style>
 
