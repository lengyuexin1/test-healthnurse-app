<template>
    <view class="box tn-flex-column" @tap="selectImage">
        <image class="img" :src="getAssetsUrl('/leyou/nim/message_icon_selectImg.png')" mode="scaleToFill" />
        <view class="txt">照片</view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'

interface Events {
    (e: 'uploadImage', value: string): void
}

const emit = defineEmits<Events>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const selectImage = () => {
    emit('uploadImage', 'album')
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
