<template>
    <view class="tn-flex-column" @tap="clickMsg">
        <view class="tips">为您推荐以下护工</view>
        <view class="tn-flex-row resume">
            <image :src="item.attach?.thumb" mode="aspectFill" />
            <view class="tn-flex-column info-box">
                <view>{{ item.attach?.name }}</view>
                <view class="subtitle">
                    <view>{{ sex }}</view>
                    <view>{{ item.attach?.age }}岁</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    /** 数据 */
    item: any
}

interface Events {
    (e: 'clickResumeMsg', workerId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Events>()

const sex = computed(() => {
    return props.item.attach?.sex === 1 ? "男" : props.item.attach?.sex === 2 ? "女" : "未知"
})

const clickMsg = () => {
    emit('clickResumeMsg', props.item.attach.id)
}

</script>

<style lang="scss" scoped>
.tips {
    margin-bottom: 30rpx;
    color: #333333;
    font-size: 26rpx;
}

.resume {
    padding: 20rpx;
    border: solid 1rpx rgba(0, 0, 0, .1);
}

image {
    width: 150rpx;
    height: 150rpx;
    margin-right: 20rpx;
    border-radius: 12rpx;
    border: solid 1rpx rgba(0, 0, 0, .01);
}
.info-box {
    flex: 1;

    .subtitle {
        margin-top: 10rpx;
        color: #666666;
        font-size: 26rpx;
    }
}
</style>
