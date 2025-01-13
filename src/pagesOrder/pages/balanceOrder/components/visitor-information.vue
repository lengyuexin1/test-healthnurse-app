<template>
    <view class="container">
        <view class="visitor_box" @click="toelderlyFiles">
            <view class="visitor_box_title">老人档案</view>
            <view class="more_box">
                <view class="more_text" v-if="data.archives.id">{{ data.archives.name }} {{ data.archives.age }}岁 <template v-if="data.archives.estimateGradeName"> {{ data.archives.estimateGradeName }}</template></view>
                <view class="more_text" v-else :class="{ not: !data.archives.id }">请选择照护人</view>
                <TnIcon name="right" color="#999999" size="24"></TnIcon>
            </view>
        </view>
        <view class="assess_title" v-if="isImproper">温馨提示：老人当前评级为{{ data.archives.estimateGradeName || ''}}，您预定的服务为{{'optionMation.categoryName'}}服务与老人身体评级有冲突，可能会导致服务水平与老人身体状况不一致的情况，请须知</view>
        <view class="assess_box" v-if="isAssess">
            <view class="assess_title">被照护人尚未进行健康评估，请先完成评估。</view>
            <view class="assess_btn" @click="linkEstimate">去评估</view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotoelderlyFiles } from '@/routes/user-routes'
import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
import { gotoEstimate } from '@/routes/user-routes'

interface Data {
    archives: any
    isAssess: boolean
    isImproper: boolean
}

const data = reactive<Data>({
    archives: {},
    isAssess: false,
    isImproper: false
})

// 照护人是否合适
const isImproper = computed(() => {
    return ''
    // return data.archives.estimateGradeCategoryIds && !data.archives.estimateGradeCategoryIds.includes(data.optionMation.categoryId)
})

// 照护人是否评估
const isAssess = computed(() => {
    return data.archives.id && !data.archives.estimateGradeCategoryIds
})

const toelderlyFiles = () => {
    gotoelderlyFiles()
}

const listener = () => {
    addWEventsListener(CareEvents.Get__Archives, (res) => {
        data.archives = res
    })
}

const linkEstimate = () => {
    gotoEstimate(JSON.stringify({
        id: data.archives.id,
        name: data.archives.name,
        age: data.archives.age,
        isPay: 1
    }))
}

defineExpose({
    data
})

onMounted(() => {
    listener()
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
    .assess_title{
        font-size: 24rpx;
        line-height: 30rpx;
        font-weight: 400;
        color: #F50606;
        margin: 20rpx 0rpx; 
    }
    .assess_box{
        .assess_btn{
            flex-shrink: 0;
            padding: 10rpx 30rpx;
            background: #fff;
            border-radius: 30rpx;
            border: 2rpx solid #EEEEEE;
            font-size: 28rpx;
            color: #666666;
            width:fit-content;
        }
    }
}
</style>
  