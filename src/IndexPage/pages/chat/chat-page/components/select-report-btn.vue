<template>
    <view class="box tn-flex-column" @tap="selectReport">
        <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_report.png')" mode="scaleToFill" />
        <view class="txt">举报</view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

interface Events {
    (e: 'selectReport'): void
}

const emit = defineEmits<Events>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const selectReport = () => {
    emit('selectReport')
}

</script>

<style lang="scss" scoped>
.box {
    align-items: center;
}
.img {
    width: 90rpx;
    height: 90rpx;
}
.txt {
    color: #333333;
    margin-top: 8rpx;
}
</style>
