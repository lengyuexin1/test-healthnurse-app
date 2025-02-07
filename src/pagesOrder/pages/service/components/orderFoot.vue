<template>
    <view class="container">
        <div class="footer">
			<div class="fotbox row">
				<div class="fotbtn delbtn" v-if="actionList.includes('cancel') || actionList.includes('apply_refund') " @click="operate('showClear')">
					<view>取消订单</view>
				</div>

                <div class="fotbtn editbtn" v-if="actionList.includes('edit') && kind != 3" @click="operate('showEdit')">
					<view >修改订单</view>
				</div>

				<div class="fotbtn commentbtn" v-if="actionList.includes('comment') " @click="operate('goComment')">
					<view >去评价</view>
				</div>

				<div class="fotbtn btn" v-if="status == 196611" @click="operate('againBay')">
					<view >再来一单</view>
				</div>

				<div class="fotbtn btn" v-if="actionList.includes('pay')" @click="operate('uppay')">
					<view >立即支付</view>
				</div>

				<div class="fotbtn btn" v-if="actionList.includes('use_now')" @click="operate('goUse')">
					<view >立即使用</view>
				</div>

			</div>
		</div>

		<div class="bottom_spage"></div>

    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'

interface Props {
    actionableList: any,
    status:number,
    kind:number
}

const props = defineProps<Props>()

const actionList = computed(() => {
    if (!props.actionableList) { return [] }
    const arr = []
    for (const action in props.actionableList) {
        !['delete', 'complaint'].includes(props.actionableList[action]) && arr.push(props.actionableList[action])
    }
    return arr
})

interface Events {
    (e: 'operate', type:string): void
}
const emit = defineEmits<Events>()


onMounted(() => {

})



const operate = (type:string) => {
    emit('operate', type)
}



</script>

<style lang="scss" scoped>
.footer{
	background: #FFFFFF;
	position: fixed;
	right: 0;
	left: 0;
	bottom: 0;
	// border-top: 1rpx solid #f2f2f2;
	z-index: 100;
	&.fotbg{
		position: static;
		opacity: 0;
	}

	.fotbox{
		height: 108rpx;
		padding: 20rpx 30rpx;
        padding-bottom: 60rpx;
		align-items: center;
		justify-content: flex-end;
        box-sizing: border-box;

		.fotbtn{
			width: 192rpx;
            height: 68rpx;
			margin-left: 16rpx;
            text-align: center;
            line-height: 68rpx;
            border-radius: 34rpx;
            overflow: hidden;
            font-weight: 400;
            font-size: 28rpx;
            color: #666666;
            &.delbtn{
                border: 2rpx solid #D2D2D2;
                color: #666666;
            }
            &.editbtn{
                border: 2rpx solid #29C86F;
                color: #29C86F;
            }
            &.commentbtn{
                border: 2rpx solid #29C86F;
                color: #29C86F;
            }
            &.btn{
                background: #29C86F;
                color: #FFFFFF;
            }
		}
	}
}
.bottom_spage{
    width: 100%;
    height: 100rpx;
}
</style>

