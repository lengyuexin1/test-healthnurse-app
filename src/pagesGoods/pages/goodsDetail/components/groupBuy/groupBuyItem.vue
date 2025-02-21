<template>
	<view class="tn-flex-row tn-flex-center">
		<image class="group-pic" :src="item.createdThumb" mode="aspectFill" />
		<view class="group-mid">
			<view class="group-name tn-text-ellipsis-1">{{ item.createdName }}</view>
			<view class="group-reat tn-flex-center">
				还差<text>{{ item.cntCollage }}</text>人，剩余
				<TnCountDown :time="item.utcResidual" text-color="#666666" @end="finish" />
			</view>
		</view>
		<view class="group-btn">
			<TnButton width="100%" height="60rpx" font-size="26rpx" bg-color="#FC3848" text-color="#FFFFFF" @tap="openJoin(item)">
				去参团
			</TnButton>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'

interface Props {
	item: any
}

const props = defineProps<Props>()

const openJoin = (item: any) => {
	emit("openJoin", { mode: 'direct', item })
}

const finish = () => {
	emit("updateCollageList")
}

const emit = defineEmits(["openJoin", "updateCollageList"])

</script>

<style lang="scss" scoped>
.group-pic {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}

.group-mid {
	.group-name {
		font-size: 28rpx;
		font-weight: 400;
		line-height: 52rpx;
		color: #333333;
	}
	.group-reat {
		font-size: 24rpx;
		font-weight: 400;
		line-height: 52rpx;
		color: #666666;
		text {
			color: #F32B44;
		}
	}
}

.group-btn {
	width: 136rpx;
	height: 60rpx;
	margin-left: auto;
}
</style>
