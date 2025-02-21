<template>
	<view class="group-box" v-if="data.collageList.length">
		<view class="group-hed tn-flex-center-between">
			<view class="group-peop"><text>{{ data.collageList.length }}</text>人在拼团，参与立即拼成</view>
			<view class="group-hed-rig tn-flex-center" @tap="data.groupShow = true">
				<text>查看全部</text>
				<TnIcon name="right" color="#BEBEBE" size="20"/>
			</view>
		</view>
		<view class="group-list" v-for="(item, index) in data.collageFirstThree" :key="index">
			<GroupBuyItem :item="item" @openJoin="openJoin"></GroupBuyItem>
		</view>
	</view>

	<TnPopup v-model="data.groupShow" width="640rpx" bg-color="#FFFFFF" radius="10">
		<view class="group-pup">
			<view class="goup-hed tn-flex-center-between">
				<view class="goup-tit"></view>
				<view class="goup-tit">可参加拼团</view>
				<view class="goup-clos">
					<TnIcon name="close" color="#333333" size="36" @tap="data.groupShow = false" />
				</view>
			</view>
			<view class="goup-con">
				<scroll-view class="group-roll" scroll-y="true">
					<view class="item-wrap" v-for="(item, index) in data.collageList" :key="index">
						<GroupBuyItem :item="item" @openJoin="openJoin" @updateCollageList="groupBuyInfo"></GroupBuyItem>
					</view>
				</scroll-view>
			</view>
		</view>
	</TnPopup>

	<TnPopup v-model="data.joinShow" width="640rpx" bg-color="#FFFFFF" radius="10">
		<view class="group-pup">
			<view class="goup-hed tn-flex-center-between">
				<view class="goup-tit"></view>
				<view class="goup-tit tn-text-ellipsis-1">参与【{{ data.joinInfo.createdName }}】的拼团</view>
				<view class="goup-clos">
					<TnIcon name="close" color="#333333" size="36" @tap="data.joinShow = false" />
				</view>
			</view>
			<view class="joinbox">
				<view class="join-tips tn-flex-center">仅剩<text>{{ data.joinInfo.cntCollage }}</text>个名额，<TnCountDown :time="data.joinInfo.utcResidual" text-color="#666666" />后结束</view>
				<view class="join-con tn-flex-center-center" v-if="data.joinInfo">
					<view class="join-li" v-for="(item, index) in data.joinInfo.recordUsers" :key="index">
						<image class="join-pic" :src="item.userThumb" mode="aspectFill"></image>
						<view class="join-up" v-if="item.isFirst">拼主</view>
					</view>
					<view class="join-li join-wait">
						<TnIcon name="help-question" color="#B1B1B1" size="46" />
					</view>
					<view class="join-li join-wait" v-if="data.joinInfo.cntCollage >= 2">
						<TnIcon name="help-question" color="#B1B1B1" size="46" />
					</view>
				</view>
				<view class="join-btn">
					<TnButton shape="round" width="100%" height="70rpx" font-size="26rpx" bg-color="#FC3848" text-color="#FFFFFF" @tap="openOrd">
						参与拼团
					</TnButton>
				</view>
			</view>
		</view>
	</TnPopup>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { getCollageItemList, getCollageRecord } from '@/api/goods-api'
import GroupBuyItem from './groupBuyItem.vue'

interface Props {
	groupInfo: any
	itemId: string
}

interface Data {
	collageList: any,
	collageFirstThree: any,
	joinInfo: any,
	groupShow: boolean,
	joinShow: boolean,
}

const data = reactive<Data>({
	collageList: [],
	collageFirstThree: [],
	joinInfo: {},
	groupShow: false,
	joinShow: false
})

const props = defineProps<Props>()

onMounted(() => {
	groupBuyInfo()
})

const groupBuyInfo = () => {
	if (props.groupInfo.isCollage == 1) {
		getCollageItemList({ productId: props.itemId }).then((res: any) => {
			data.collageList = res
			res.map((item, index) => {
				if (index <= 1) {
					data.collageFirstThree.push(item)
				}
			})
		})
	}
}

const openJoin = ({ mode, item }) => {
	data.groupShow = false
	if (mode == 'direct') {
		data.joinShow = true
		getCollageRecord({ recordId: item.id }).then((res: any) => {
			data.joinInfo = { ...item, joinCntCollage: props.groupInfo.cntCollage, recordUsers: res.recordUsers || [] }
		})
	}
	else {
		data.joinShow = false
	}
}

const openOrd = () => {
	data.joinShow = false
	data.joinInfo.joinTheteamType = 1
	data.joinInfo.optionCollages = props.groupInfo.optionCollages
	data.joinInfo.collageId = props.groupInfo.collageId

	emit('toGroupBuy', data.joinInfo, props.groupInfo.collageId)
}

const emit = defineEmits(["toGroupBuy"])

</script>

<style lang="scss" scoped>
.group-box {
    margin: 20rpx;
    padding: 30rpx 30rpx 16rpx 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;

    .group-hed {
        margin-bottom: 20rpx;

        .group-peop {
            font-size: 30rpx;
            font-weight: 400;
            line-height: 52rpx;
            color: #333333;

            text {
                color: #F32B44;
            }
        }

        .group-hed-rig {
            font-size: 28rpx;
            font-weight: 400;
            color: #999999;

            text {
                margin-right: 8rpx;
            }
        }
    }

	.group-list {
		margin-bottom: 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 2rpx solid #F2F2F2;

		&:last-child{
			border-bottom: none;
			margin-bottom: 0rpx;
			padding-bottom: 0rpx;
		}
	}
}

/* 拼团弹窗 */
.group-pup{
    background: #FFFFFF;
    border-radius: 20px;

    .goup-hed{
        padding: 30rpx;
        margin-bottom: 20rpx;
        border-bottom: 2rpx solid #F2F2F2;
        .goup-tit{
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
			text-align: center;
        }
    }
    .goup-con{
        padding: 0 30rpx 30rpx;
        .group-roll{
            min-height: 100rpx;
            max-height: 710rpx;
            overflow: hidden;

			.item-wrap {
				margin-bottom: 30rpx;
				padding-bottom: 30rpx;
				border-bottom: 2rpx solid #F2F2F2;
				&:last-child{
					border-bottom: none;
					margin-bottom: 0rpx;
					padding-bottom: 0rpx;
				}
			}
        }
    }

    .joinbox{
        padding: 0 30rpx 30rpx;
        .join-tips{
            font-size: 26rpx;
            font-weight: 400;
            line-height: 52rpx;
            color: #666666;
            text-align: center;
            text{
                color: #F32B44;
            }
        }
        .join-con{
			display: flex;
			flex-wrap: wrap;
            margin-top: 40rpx;
            .join-li{
                position: relative;
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                border: 2rpx solid #FFB24D;
				margin: 0 24rpx 24rpx 24rpx;
                &.join-wait{
                    border: 2rpx dotted #C5C5C5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .join-pic{
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 50%;
                }

                .join-up{
                    position: absolute;
                    top: -10rpx;
                    right: -28rpx;
                    width: 56rpx;
                    height: 30rpx;
                    background-color: #FF9913;
                    border: 2rpx solid #FFFFFF;
                    border-radius: 16rpx;
                    text-align: center;
                    font-size: 20rpx;
                    font-weight: 400;
                    line-height: 30rpx;
                    color: #FFFFFF;
                }
            }
        }
        .join-btn{
            margin-top: 50rpx;
        }
        .join-img{
            width: 84rpx;
            height: 84rpx;
        }
        .join-tex{
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;
            margin-top: 12rpx;
            text-align: center;
        }
        .button{
            position: absolute;
            left: 0;
            bottom: 37rpx;
            right: 0;
            opacity: 0;
        }
    }

}
</style>
