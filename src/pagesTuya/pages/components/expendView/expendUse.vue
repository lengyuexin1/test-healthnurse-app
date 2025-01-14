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
            <view class="rechli" v-for="(item,index) in dataList" :key="index" @click="linkNoticeDetail(item)">
                <view class="rechtop row i-center j-between">
                    <view class="rechtit">{{item.deviceName}}</view>
                    <u-icon name="arrow-right" color="#666666" size="20"></u-icon>
                </view>
                <view class="rechmore row i-center j-between">
                    <view>
                        <view class="rechsheng">通知数：{{item.notifyReceiverNum || '-'}} 丨 {{item.patientName || '-'}}</view>
                        <view class="rechtime">{{item.utcCreated}}</view>
                    </view>
                    <view class="rechnum">-{{item.notifyNum}}次</view>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script>
import { getAssetsPic } from "@/common/setPicture"
import { getLogList } from "@/api/room-api"
import { gotoNoticeDetail } from "@/routes/active-routes"
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
            getLogList({
                pageNumber,
                pageSize,
                query: {}
            }).then(res => {
                const list = res.data.map(x => ({ ...x, utcCreated: dayjs.unix(x.utcCreated).format("YYYY-MM-DD HH:mm:ss") }))
                this.$refs.paging.complete(list)
            }).catch((err) => {
                console.log(err)
                this.$refs.paging.complete(false)
            })
        },
        // 通知详情
        linkNoticeDetail(item) {
            gotoNoticeDetail({
                id: item.id,
                patientName: item.patientName,
                notifyReceiverNum: item.notifyReceiverNum,
                utcCreated: item.utcCreated
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

    .rechtit{
        font-weight: 400;
        font-size: 32rpx;
        color: #333333;
    }

    .rechnum{
        font-weight: bold;
        font-size: 32rpx;
        color: #FF4A4A;
    }

    .rechmore{
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
    }
    .rechsheng{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 12rpx;
    }
}
</style>
