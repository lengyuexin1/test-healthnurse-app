<template>
    <view class="container">
        <bc-page-navbar :title="'通知详情'"></bc-page-navbar>
        <view class="noticbox page-public-bg">
            <view class="noticli">
                <view class="notictit">{{ notInfo.deviceName || '-' }}</view>
                <view class="noticmation row i-center j-between">
                    <view class="noticname">房间名称</view>
                    <view class="noticdec">{{ notInfo.patientName || '-' }}</view>
                </view>
                <view class="noticmation row i-center j-between">
                    <view class="noticname">通知数</view>
                    <view class="noticdec">{{ notInfo.notifyReceiverNum || '-' }} 次</view>
                </view>
                <view class="noticmation row i-center j-between">
                    <view class="noticname">通知时间</view>
                    <view class="noticdec">{{ notInfo.utcCreated || '-' }}</view>
                </view>
            </view>

            <view class="noticli" v-if="shortList.length > 0">
                <view class="notictit">短信通知</view>
                <view class="noticmation row i-center j-between" v-for="(item,index) in shortList" :key="index">
                    <view class="noticname">{{ item.name || '-' }}</view>
                    <view class="noticdec" :class="{ noticsuc: item.status === 1, noticfail: item.status === 2 }">{{ statusList[item.status] }}</view>
                </view>
            </view>

            <view class="noticli" v-if="telList.length > 0">
                <view class="notictit">电话通知</view>
                <view class="noticmation row i-center j-between" v-for="(item,index) in shortList" :key="index">
                    <view class="noticname">{{ item.name || '-' }}</view>
                    <view class="noticdec" :class="{ noticsuc: item.status === 1, noticfail: item.status === 2 }">{{ statusList[item.status] }}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getLogDetail } from "@/api/room-api"
export default {
    data() {
        return {
            notInfo: {},
            shortList: [], //短信列表
            telList: [], //电话列表
            statusList: { // 0-无需通知 1-成功 2-失败
                0: '无需通知',
                1: '成功',
                2: '失败'
            }
        }
    },
    onLoad(option) {
        this.notInfo = option
        this.getLogDetail()
    },
    methods: {
        getLogDetail() {
            getLogDetail(this.notInfo.id).then(res => {
                this.shortList = res.filter(x => x.channel === 1)
                this.telList = res.filter(x => x.channel === 2)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.noticbox{
    padding: 20rpx;

    .noticli{
        margin-bottom: 20rpx;
        padding: 30rpx 30rpx 40rpx;
        background-color: #FFFFFF;
        border-radius: 16rpx;
        .notictit{
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
        }

        .noticmation{
            margin-top: 30rpx;

            .noticname{
                font-weight: 400;
                font-size: 30rpx;
                color: #333333;
            }
            .noticdec{
                font-weight: 400;
                font-size: 30rpx;
                color: #666666;

                &.noticsuc{
                    color: #29C86F;
                }
                &.noticfail{
                    color: #FF5A5A;
                }
            }
        }
    }
}
</style>
