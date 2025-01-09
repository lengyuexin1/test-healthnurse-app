<template>
	<view class="container">
		<z-paging 
			ref="paging" 
			v-model="data.dataList" 
			:auto="true" 
			:fixed="true" 
			@query="queryList"
			:defaultPageSize="10" 
			:empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" 
			empty-view-text="还没有数据哦~"
			:empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
		>
			<template #top>
				<pageTopbg :zIndex="-1"></pageTopbg>
				<view :style="'width: 100%; height:' + data.statusBar + 'px'"></view>
				<view class="top_inp_box">
					<view class="back_icon" @click="goback">
						<TnIcon name="left" size="44" color="#333333" bold />
					</view>
				</view>
				<view class="header_box">
					<view class="discuss_title">写几句邀请语：（可选）</view>
					<view class="input-wrap">
						<TnInput type="textarea" v-model="data.note" :maxlength="30" :trim="true" show-word-limit clearable height="200rpx" placeholder="输入邀请语" custom-class="input" />
					</view>
				</view>
				<view class="discuss">
					<view class="discuss_title">
						邀请好友
					</view>
					<view class="discuss_tab" @click="changeTab">
						<view class="discuss_tab_item" :style="data.isMutual==0?'background: #F4F4F4; color: #EA3E1A':''">
							关注我的
						</view>
						<view class="discuss_tab_item" :style="data.isMutual==1?'background: #F4F4F4; color: #EA3E1A':''">
							互相关注
						</view>
					</view>
				</view>
			</template>

			<view class="discussList">
				<view class="discuss_item" v-for="(item, index) in data.dataList" :key="index">
					<TnCheckboxGroup checked-shape="circle" size="lg" v-model="data.selectValue" @change="checkboxChange">
						<TnCheckbox :label="item.fansId" active-color="#EA3E1A" style="width: 1000%;">
							<view class="info tn-flex-center-center">
								<view class="tn-flex-center-center" style="flex: 1;">
									<image :src="item.fansImage" mode="scaleToFill" />
									<view class="name">{{ item.fansName }}</view>
								</view>
							</view>
						</TnCheckbox>
					</TnCheckboxGroup>
				</view>
			</view>
			<template #bottom>
				<view class="btn tn-flex-center-between">
					<TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="data.allSelect" @change="change">全选</TnCheckbox>
					<TnButton shape="round" width="220rpx" height="76rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickBtn">
						发送
					</TnButton>
				</view>
			</template>
			<BCNotify ref="bcNotify"></BCNotify>
		</z-paging>
	</view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { salonFansList, inviteFriends } from '@/api/create-api'
import { pageController } from '@bc/uni-tools'

interface Props {
	id: string
}

interface Data {
	dataList : any,
	statusBar : number,
	inputValue : string,
	note: string
	isMutual: number
	selectValue: any,
	allSelect: boolean
}

const data = reactive<Data>({
	dataList: [],
	statusBar: 45,
	inputValue: '',
	note: '',
	isMutual: 0,
	selectValue: [],
	allSelect: false
})

const bcNotify = ref()

const paging = ref() as any

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src : string) => {
	return getAssetsPic(src)
})

const queryList = (pageNumber : number, pageSize : number) => {
	salonFansList({
		pageNumber,
		pageSize,
		query: {
			isMutual: data.isMutual
		}
	}).then((res: any) => {
		paging.value.complete(res.data)
	}).catch((err) => {
		bcNotify.value.error(err.message)
	})
}

const goback = () => {
	uni.navigateBack()
}

const changeTab = () => {
	data.selectValue = []
	data.isMutual == 0 ? data.isMutual = 1 : data.isMutual = 0
	paging.value.reload()
}

const checkboxChange = () => {
	data.dataList.length === data.selectValue.length ? data.allSelect = true : data.allSelect = false
}

const change = () => {
	data.allSelect && (data.dataList.map((item: any) => data.selectValue.push(item.fansId)))
    !data.allSelect && (data.dataList.map((item: any) => data.selectValue = []))
}

// 发送邀请
const clickBtn = () => {
	if (data.selectValue.length == 0) {
		bcNotify.value.show('请选择好友')
		return
	}
	inviteFriends({ salonId: props.id, userIds: data.selectValue, note: data.note}).then(() => {
		bcNotify.value.show('发送成功')
		setTimeout(() => {
			pageController.back()
		}, 800)
	}).catch((err) => {
		bcNotify.value.error(err.message)
	})
}

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}
.top_inp_box {
	display: flex;
	align-items: center;
	padding: 8rpx 28rpx;
	box-sizing: border-box;

	.back_icon {
		margin-right: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inp_box {
		width: 458rpx;
		height: 64rpx;
		background: #fff;
		border-radius: 32rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.search_icon {
			position: absolute;
			top: 50%;
			left: 20rpx;
			transform: translate(0%, -50%);
		}

		.inp {
			margin-left: 30rpx;
			width: 80%;
			height: 100%;
			line-height: 64rpx;
			font-size: 24rpx;
			color: #A8A8A8;

		}
	}
}

.header_box {
	margin: 30rpx 30rpx 0 30rpx;
	min-height: 200rpx;
	max-height: 400rpx;

	.discuss_title {
		font-weight: bold;
		font-size: 30rpx;
		color: #333333;
	}

	.input-wrap {
		margin: 30rpx 0;
	}
	.input {
		background-color: #FFFFFF;
	}
}

.discuss {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0 30rpx 30rpx 30rpx;

	.discuss_title {
		font-weight: 500;
		font-size: 16px;
		color: #333333;
	}

	.discuss_tab {
		height: 64rpx;
		background: #fff;
		border-radius: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.discuss_tab_item {
			width: 120rpx;
			height: 54rpx;
			border-radius: 27rpx;
			text-align: center;
			line-height: 54rpx;
			font-weight: 500;
			font-size: 12px;
			color: #666666;
			background-color: #fff;
			margin: 4rpx;

		}
	}
}

.edit {
	color: #666666;
}

.discussList {
	display: flex;
	flex-direction: column;
	margin: 0 30rpx 70rpx 30rpx;

	.discuss_item {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
	}
	.info {

		image {
			width: 90rpx;
			height: 90rpx;
			margin: 0 20rpx;
			border: solid 1rpx #F6F6F6;
			border-radius: 50%;
		}

		.name {
			color: #333333;
			font-size: 28rpx;
		}
	}
}
.upsalon_img{
	position: fixed;
	bottom: 250rpx;
	right: 30rpx;
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
}
.btn {
	position: fixed;
    bottom: 0;
    left: 0;
	z-index: 10;
    width: 100%;
    height: 146rpx;
    padding: 20rpx;
    background-color: #FFFFFF;
}
</style>