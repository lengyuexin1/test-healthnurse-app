<template>
	<!-- 音频播放动画 -->
    <view class="wrap tn-flex-row" :style="{ height: props.height }">
        <view class="ele bar1" :style="{ backgroundColor: props.bgColor }"></view>
        <view class="ele bar2" :style="{ backgroundColor: props.bgColor }"></view>
        <view class="ele bar3" :style="{ backgroundColor: props.bgColor }"></view>
    </view>
</template>

<script lang="ts" setup>
import { ref, defineEmits, reactive, watch } from "vue"

const props = defineProps({
    height: {
        type: String,
        default: '24rpx'
    },
    /** 颜色 */
    bgColor: {
        type: String,
        default: '#F2684B'
    }
})
</script>

<style lang="scss" scoped>
.wrap {
	display: flex;
	align-items: flex-end;
	margin-right: 10rpx;
}

.ele {
    border-radius: 5rpx;
	margin: 0 2rpx;
}

.bar1 {
	width: 4rpx;
	height: 24rpx;
	animation: aniBar1 .7s linear infinite alternate;
}
.bar2 {
	width: 4rpx;
	height: 24rpx;
	animation: aniBar2 .3s linear infinite alternate;
}
.bar3 {
	width: 4rpx;
	height: 24rpx;
	animation: aniBar3 .5s linear infinite alternate;
}

@keyframes aniBar1 {
	0% {
		height: 10rpx;
	}
	100% {
		height: 24rpx;
	}
}

@keyframes aniBar2 {
	0% {
		height: 5rpx;
	}
	100% {
		height: 10rpx;
	}
}

@keyframes aniBar3 {
	0% {
		height: 5rpx;
	}
	100% {
		height: 18rpx;
	}
}
</style>
