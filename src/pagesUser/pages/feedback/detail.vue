<template>
    <view class="container tn-flex-row">
        <view class="item tn-flex-center-between">
            <view>问题类型：{{ data.detail.typeName }}</view>
            <view class="status-wrap">
                <view class="unhandle" v-if="data.detail.isHandled == 0">待处理</view>
                <view class="handle" v-if="data.detail.isHandled == 1">已处理</view>
            </view>
        </view>
        <view class="item">问题原因：{{ data.detail.reason }}</view>
        <view class="item mt30">问题描述：</view>
        <view class="item">{{ data.detail.content }}</view>
        <view class="item">
            <TnPhotoAlbum :data="data.detail.images" :column="4" />
        </view>
        <view class="date">提交时间：{{ dateTime(data.detail.utcCreated) }}</view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive } from 'vue'
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import { getTypeReasonDetail } from '@/api/user-api'
import { onLoad } from '@dcloudio/uni-app'
import dayjs from "dayjs"

interface Data {
    detail: any
}

const data = reactive<Data>({
   detail: {}
})

// 时间
const dateTime = (time: number) => {
    const datetime = dayjs(time * 1000)
    return datetime.format('YYYY/MM/DD hh:mm:ss')
}

onLoad((options) => {
    getTypeReasonDetail({ complaintId: options?.id }).then((res) => {
        data.detail = res
    })
})

</script>
  
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    padding: 30rpx;
    margin: 24rpx 24rpx 0rpx 24rpx;
    background-color: white;
    border-radius: 24rpx;

    .status-wrap {
        margin-bottom: 4rpx;
        font-size: 28rpx;
        color: #333333;
        
        .date {
            font-weight: bold;
            color: #333333;
        }

        .handle {
            color: #29C86F;
        }
        
        .unhandle {
            color: #FF1010;
        }
    }

    .item {
        font-size: 28rpx;
        color: #333333;
        line-height: 36rpx;
        margin-top: 16rpx;
    }

    .date {
        font-size: 24rpx;
        color: #999999;
        margin-top: 26rpx;
    }
}

.mt30 {
    margin-top: 34rpx !important;
}
</style>
 
