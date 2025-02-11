<template>
    <view class="tn-flex-column" v-if="isJsonStr">
        <view class="title" v-if="isTitle">{{ isTitle }}</view>
        <view v-if="isImage" @tap="showImg">
            <image class="img" :src="isImage" />
        </view>
    </view>
    <view class="txt" v-else>
        {{ props.item.body }}
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
    /** 数据 */
    item: any
}

const props = defineProps<IProps>()


// 是否为json文本
const isJsonStr = computed(() => {
    if (typeof props.item.body === 'string') {
        try {
            const obj = JSON.parse(props.item.body)
            if (typeof obj === 'object' && obj) {
                return true
            }
            else {
                return false
            }
        }
        catch (e) {
            return false
        }
    }
    else {
        return false
    }
})

// 是否有标题
const isTitle = computed(() => {
    return JSON.parse(props.item.body)?.title
})

// 是否有图片
const isImage = computed(() => {
    return JSON.parse(props.item.body)?.image
})

// 图片预览
const showImg = () => {
    uni.previewImage({
        indicator: "none",
        urls: [JSON.parse(props.item.body)?.image],
        complete: res => {
            console.log(res)
        }
    })
}

</script>

<style lang="scss" scoped>
.img {
    width: 100rpx;
    height: 100rpx;
    margin-top: 10rpx;
}
.title {
    font-size: 30rpx;
}
.txt {
    font-size: 30rpx;
    word-break: break-all
}
</style>
