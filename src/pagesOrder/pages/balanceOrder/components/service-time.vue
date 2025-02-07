<template>
    <view class="container">
        <view class="visitor_box" @click="openDateTimePicker = true">
            <view class="visitor_box_title">上门时间</view>
            <view class="more_box">
                <view class="more_text">{{ datetime || '选择' }}</view>
                <TnIcon name="right" color="#999999" size="24"></TnIcon>
            </view>
        </view>
        <view class="visitor_box bottom">
            <view class="visitor_box_title">备注信息</view>
            <view class="more_box">
                <TnInput v-model="inputValue" placeholder="请输入备注信息" size="sm" text-align="right" :border="false" clearable @blur="blur"/>
            </view>
        </view>
    </view>
    <TnDateTimePicker mode="datetime" v-model="datetime" v-model:open="openDateTimePicker" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'

const openDateTimePicker = ref(false)
const datetime = ref()

const inputValue = ref('')

interface Events {
    (e: 'inpbur', val: string): void
}
const emit = defineEmits<Events>()

const blur = () => {
    emit('inpbur', inputValue.value)
}

defineExpose({
    datetime
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
        margin-bottom: 12rpx;
        &.bottom{
            margin-bottom: 0rpx;
        }
        .visitor_box_title{
            font-size: 32rpx;
            color: #333333;
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
