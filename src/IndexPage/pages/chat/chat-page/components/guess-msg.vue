<template>
    <view class="column">
        <view class="consult-guess">
            <view class="consult-guess-head tn-flex-column">
                <view class="tabs-wrap">
                    <TnTabs v-model="data.currentTabIndex" :bottom-shadow="false" active-color="#398AEE" bar-color="#398AEE" @change="clickGuessTab">
                        <TnTabsItem v-for="(item, index) in data.guessTab" :key="index" :title="item.name" />
                    </TnTabs>
                </view>
                <view class="consult-box">
                    <view class="consult-guess-head-tit">
                        <view class="txt">猜您想问</view>
                    </view>
                    <view class="consult-list">
                        <block v-for="(item, index) in data.questionList" :key="index">
                            <view class="list" @tap="clickQuestion(item)">
                                <view class="u-line-1">{{ item.question }}</view>
                                <TnIcon name="right" color="#C4C4C4" />
                            </view>
                        </block>
                    </view>
                </view>
            </view>
        </view>
        <view class="guess-btn-box animate__animated animate__lightSpeedInLeft animate__delay-1s animate__faster">
            <block v-for="(item, index) in data.guessBtn" :key="index">
                <template v-if="item.selected == 1">
                    <view class="guess-btn" @tap="clickGuessBtn(item)">{{ item.name }}</view>
                </template>
            </block>
        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineEmits } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { qaContentList, shortSentenceList } from '@bc/api/im-api'

interface IProps {
    to: string
}
const props = defineProps<IProps>()

interface Data {
    currentTabIndex: number
    guessTab: any
    questionList: any
    guessBtn: any
    gotoUrl: any
}

const data = reactive<Data>({
    currentTabIndex: 0,
    guessTab: [],
    questionList: [],
    guessBtn: [],
    gotoUrl: [
        { id: 100000, name: '查看订单' },
        { id: 200000, name: '查看售后' },
        { id: 300000, name: '查看退款进度' },
        { id: 400000, name: '转人工客服' },
        { id: 500000, name: '转商家客服' },
        { id: 600000, name: '投诉与建议' },
        { id: 700000, name: '地址管理' }
    ]
})

const clickGuessTab = (val: string | number) => {
    data.questionList = data.guessTab[val].list
}

const clickQuestion = (item: any) => {
    emit('clickQuestion', item)
}

const clickGuessBtn = (item: any) => {
    for(const i in data.gotoUrl) {
        if (data.gotoUrl[i].id == item.id) {
            emit('clickGuessBtn', item)
        }
    }
}

const emit = defineEmits(["clickQuestion", 'clickGuessBtn'])

onMounted(() => {
    qaContentList({ tid: props.to, userKind: 1 }).then((res) => {
        data.guessTab = res
        data.questionList = data.guessTab[0].list
    })
    shortSentenceList({ tid: props.to, userKind: 1 }).then((res) => {
        data.guessBtn = res
    })
})

</script>

<style lang="scss" scoped>
// 猜你想问
.consult-guess {
	width: 580rpx;
	height: 460rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin: 20rpx 15rpx 15rpx 90rpx;
	
	.consult-guess-head {
		// width: 520rpx;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
		padding: 0 30rpx;
		display: flex;

        .tabs-wrap {
            border-bottom: solid 1rpx #F2F2F2;
        }

		.consult-box {
			height: 330rpx; 
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;

			.consult-guess-head-tit{
				width: 90rpx;
				height: 330rpx;
				font-size: 32rpx;
				background: #F4F7FE;
				border-radius: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.txt {
					font-size: 30rpx;
					color: #398AEE;
					writing-mode: vertical-lr;
					letter-spacing: 15rpx;
				}
			}
	
			.consult-list {
				flex: 1;
				margin-left:20rpx;
				overflow-y: auto;
	
				.list {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #333333;
					font-size: 28rpx;
					padding: 15rpx 0;
					overflow-y: auto;
					border-bottom: 2rpx solid #F2F2F2;
				}
			}
		}
	}
}

.guess-btn-box {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 15rpx;
	margin-bottom: 15rpx;
	margin-left: 90rpx;

	.guess-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333333;
		background-color: white;
		font-size: 24rpx;
		border-radius: 42rpx;
		padding: 14rpx 20rpx;
		margin: 10rpx 20rpx 5rpx 0;
	}
}
</style>
