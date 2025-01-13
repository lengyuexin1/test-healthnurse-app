<template>
    <view class="container">
        <view class="visitor_box">
            <view class="visitor_box_title">服务地址</view>
        </view>
        <view class="bala_cel tn-flex-center-between" @click="clickChooseAddress">
            <view>
                <view class="bala_cel_tit" :class="{ not: !data.location?.address }">{{ data.location?.area || '' }}{{ data.location?.address || '请选择地址' }}</view>
                <view class="bala_cel_tit" v-if="data.location?.id">{{ data.location?.name }} {{ data.location?.mobile}}</view>
            </view>
            <view class="change_box">{{ data.location?.id ? '修改' : '选择' }}</view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, reactive, defineExpose } from 'vue'
import { getAddressList, delAddress, editAddress } from '@/api/goods-api'
import { gotoAddressList } from '@/routes/user-routes'
import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'

interface Data {
    location: any,
    /** 是否可以一次下单多次使用 */
    ismany: boolean
    /** 勾选 */
    ischeck: boolean
}

const data = reactive<Data>({
    location: [],
    ismany: false,
    ischeck: false
})

const listener = () => {
    addWEventsListener(CareEvents.Get__Address, (res) => {
        data.location = res
    })
}

const clickChooseAddress =() => {
    gotoAddressList()
}

const addressList = () => {
    getAddressList().then((res) => {
        const obj = res.find(x => x.isDefault === 1 && x.isMatch === 1)

        if (data.ismany) {
            if (data.ischeck) {
                data.location = obj || {}
                return
            }
            return
        }
        else {
            data.location = obj || {}
        }
    })
}

defineExpose({
    data
})

onMounted(() => {
    listener()
    addressList()
})

</script>
  
<style lang="scss" scoped>
.container{
    background: #fff;
    padding: 30rpx;
    box-sizing: border-box;
    border-radius: 24rpx;
    .visitor_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .visitor_box_title{
            font-size: 32rpx;
            color: #333333;
            font-weight: 600;
        }
        .more_box{
            display: flex;
            align-items: center;
            .more_text{
                color: #999999;
                font-size: 28rpx;
                margin-right: 12rpx;
            }
        }
    }
    .bala_cel{
        margin-top: 40rpx;
        // align-items: flex-start;
        position: relative;
        &.bala_cel_nt{
            margin-top: 0rpx;
        }
        &.bala_cel_bod{
            margin-bottom: 24rpx;
            // border-bottom: 2rpx solid #F2F2F2;
            // padding-bottom: 28rpx;
        }
        .bala_cel_tit{
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
            &.not{
                color: #BCBCBC;
            }
        }
        .bala_cel_tip{
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            margin: 20rpx 0;
        }
        .bala_cel_inp{
            // width: 460rpx;
            flex: 1;
            margin-left: 20rpx;
            font-size: 30rpx;
            color: #666666;
            text-align: right;
        }
        .bala_cel_note{
            flex: 1;
            margin-top: 10rpx;
            font-size: 24rpx;
            color: #3E9FFF;
            // padding-top: 28rpx;
            // border-top: 2rpx solid #F2F2F2;
        }
    }
    .change_box{
        flex-shrink: 0;
        padding: 10rpx 30rpx;
        background: #fff;
        border-radius: 30rpx;
        border: 2rpx solid #EEEEEE;
        font-size: 28rpx;
        color: #666666;
    }
}
</style>
  