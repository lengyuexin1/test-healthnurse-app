<template>
    <view class="content">
        <block v-for="(item) in dataList" :key="item.id">
            <view class="noticli" @click="linkNoticeDetail(item)">
                <view class="notictop row i-center j-between">
                    <view class="notictime">{{ item.utcCreated }}</view>
                    <TnIcon name="arrow-right" color="#666666" sizee="20"></TnIcon>
                </view>
                <view class="notictit">{{ item.deviceName }}</view>
                <view class="noticmation row i-center j-between">
                    <view class="noticname">房间名称</view>
                    <view class="noticdec">{{ item.patientName || "-" }}</view>
                </view>
                <view class="noticmation row i-center j-between">
                    <view class="noticname">通知数</view>
                    <view class="noticdec">{{ item.notifyReceiverNum || "-" }} 次</view>
                </view>
            </view>
        </block>
    </view>
</template>

<script lang="ts" setup>
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoNoticeDetail } from "@/routes/active-routes"

interface Props {
    dataList: any
}
const props = defineProps<Props>()
// 通知详情
const linkNoticeDetail = (item:any) => {
    gotoNoticeDetail({
        id: item.id,
        deviceName: item.deviceName,
        patientName: item.patientName,
        notifyReceiverNum: item.notifyReceiverNum,
        utcCreated: item.utcCreated
    })
}

</script>

<style lang="scss" scoped>
.content {
    padding: 20rpx;
}

.noticli {
    margin-bottom: 20rpx;
    padding: 30rpx 30rpx 40rpx;
    background-color: #ffffff;
    border-radius: 16rpx;

    .notictop {
        margin-bottom: 30rpx;

        .notictime {
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
        }
    }

    .notictit {
        font-weight: 400;
        font-size: 32rpx;
        color: #333333;
    }

    .noticmation {
        margin-top: 30rpx;

        .noticname {
            font-weight: 400;
            font-size: 30rpx;
            color: #333333;
        }

        .noticdec {
            font-weight: 400;
            font-size: 30rpx;
            color: #666666;
        }
    }
}
</style>
