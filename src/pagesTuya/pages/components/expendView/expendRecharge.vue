<template>
    <view class="content">
        <z-paging
            ref="paging"
            :auto="true"
            v-model="dataList"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="暂无数据~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <view class="rechli" v-for="(item,index) in dataList" :key="index">
                <view class="rechmation row i-center j-between">
                    <view class="rechmoney">{{item.money | moneyFilter}}元</view>
                    <view class="rechnum">+{{item.notifyNum || '-'}}次</view>
                </view>
                <view class="rechmore row i-center j-between">
                    <view class="rechtime">{{item.utcPay}}</view>
                    <view class="rechsheng">余额: {{item.notifyNumBalance || '-'}}次</view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture"
import { getPayList } from "@/api/room-api"
import dayjs from "dayjs"
export default {
    data() {
        return {
            dataList: []
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    methods: {
        // 充值记录列表
        queryList(pageNumber, pageSize) {
            getPayList({
                pageNumber,
                pageSize,
                query: {}
            }).then(res => {
                this.$refs.paging.complete(res.data.map(x => ({ ...x, utcPay: dayjs.unix(x.utcPay).format("YYYY-MM-DD HH:mm:ss") })))
            }).catch(() => {
                this.$refs.paging.complete(false)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.rechli{
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    margin: 20rpx;

    &:last-child{
        margin-bottom: 0;
    }

    .rechmoney{
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
    }

    .rechnum{
        font-weight: bold;
        font-size: 32rpx;
        color: #29C86F;
    }

    .rechmore{
        margin-top: 20rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
    }
}
</style>
