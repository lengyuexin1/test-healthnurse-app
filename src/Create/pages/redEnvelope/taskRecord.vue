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
                <bc-page-navbar :title="'任务记录'" bg-color="#F2F3F5">
                    <!-- <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template> -->
                </bc-page-navbar>
        </template>
            <view class="menu">
                <view class="record_title">任务奖励在任务完成后次日24:00前可领取，逾期未领视为主动放弃。</view>
                <view class="menu-list row i-center j-between" v-for="(item,index) in dataList" :key="index">
                    <view class="menu-list-left">
                        <view class="menu_left_title">{{ formatTime(item.utcCreated) }}</view>
                    </view>
                    <view class="menu_left_time">{{ item.rewardName }}</view>
                    <view class="menu_list_right">{{item.incomeExpense==1?'+':'-'}}{{(Number(item.reward)/100).toFixed(2)}}元</view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang='ts' setup>

import { onLoad } from '@dcloudio/uni-app'
import { recordList } from '@/api/user-api'
import { getAssetsPic } from '@/common/setPicture'
import { ref,computed } from 'vue';
import dayjs from 'dayjs'; // Assuming dayjs is imported separately
const paging = ref() as any
const dataList = ref([]);
const defaultPageSize = 10;
let rewardId: number | null = null;
let unseal = ref(false); // 是否开启通知

// 计算属性
const getAssetsUrl = computed(() => {
    return (str:any) => {
        return getAssetsPic(str);
    };
});

const formatTime = (number: number): string => {
    return dayjs(number * 1000).format('YYYY-MM-DD');
};

onLoad((options:any): void => {
    rewardId = options.rewardId;
});

const queryList = (pageNumber: number, pageSize: number): void => {
    recordList({
        query: {
            rewardId: rewardId!,
            incomeExpense: 3
        },
        pageNumber,
        pageSize
    }).then((res:any) => {
        // Assuming $refs.paging.complete is used in your template, handle as needed
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete(false)
    });
};
</script>

<style lang="scss" scoped>
.menu {
    background-color: #ffffff;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding-top: 20rpx;
    .record_title {
        font-size: 22rpx;
        color: #999999;
        padding: 20rpx 38rpx 20rpx 38rpx;
    }
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
</style>
