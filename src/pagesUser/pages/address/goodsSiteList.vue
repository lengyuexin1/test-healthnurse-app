<template>
	<view class="container">
        <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
		<bc-page-navbar :title="'我的地址'"></bc-page-navbar>
        <view class="addres-list">
			<view class="address-item" v-for="(item, index) in data.list" :key="item.id" @click="seleSite(item)">
				<view class="item-right">
					<view class="item-option">
						<view class="contacts">
							<view class="name">{{ item.name }}</view>
							<view class="phone">{{ item.mobile }}</view>
						</view>
					</view>
					<view class="address">
						<text class="detail u-line-2">{{ item.area }}{{ item.address }}</text>
					</view>
					<view class="_right">
						<label>
                            <view class="_rigdef row i-center" @click.stop="setDef(item)">
                                <radio size="30rpx" class="radio" color="#EA3E1A" :value="item.id" :checked="data.defaultId == item.id"></radio>
                                <text :class="{ set: data.defaultId == item.id }">已设为默认</text>
                            </view>
                        </label>
						<view class="events">
							<view class="event-item" @click.stop="editGoodsAddress(item)">
								<u-icon name="edit-pen" size="18" color="#7B7B7B"></u-icon>
								<text class="title">编辑</text>
							</view>
							<view class="event-item" @click.stop="deletGoodsAddress(item.id)">
								<u-icon name="trash" size="18" color="#7B7B7B"></u-icon>
								<text class="title">删除</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<template v-if="data.unDefaultList.length > 0">
				<view class="unused-title">以下地址不在服务范围内</view>
				<view class="address-item unused" v-for="(item, index) in data.unDefaultList" :key="item.id">
					<view class="item-right">
						<view class="item-option">
							<view class="contacts">
								<view class="name">{{ item.name }}</view>
								<view class="phone">{{ item.mobile }}</view>
							</view>
						</view>
						<view class="address">
							<text class="detail u-line-2">{{ item.area }}{{ item.address }}</text>
						</view>
						<view class="_right">
							<label>
								<view class="_rigdef row i-center">
									<radio disabled size="30rpx" class="radio" color="#29C86F" :value="item.id" :checked="data.defaultId == item.id"></radio>
									<text :class="{ set: data.defaultId == item.id }">已设为默认</text>
								</view>
							</label>
							<view class="events">
								<view class="event-item" @click.stop="editGoodsAddress(item)">
									<u-icon name="edit-pen" size="18" color="#B4B4B4"></u-icon>
									<text class="title">编辑</text>
								</view>
								<view class="event-item" @click.stop="deletGoodsAddress(item.id)">
									<u-icon name="trash" size="18" color="#B4B4B4"></u-icon>
									<text class="title">删除</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>

		<!-- 底部操作按钮 -->
		<BottomSingleBtn btnName="新增地址" @clickBtn="clickAddGoodsAddress"></BottomSingleBtn>
		<BCPopup
            ref="bcPopup"
            title="删除地址"
            content="是否确定删除该地址？"
            subBtn="确认"
            cancelBtn="取消"
            @clickLeftBtn="confirmDelAddress"
            @clickRightBtn="cancel">
        </BCPopup>
		<BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAddressList, delAddress, editAddress } from '@/api/goods-api'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import BCPopup from '@/components/popup/index.vue'
import { Throttle } from '@/libs/antivibthrot'
import { pageController } from '@bc/uni-tools'
import { dispatchWEvent } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
import BCNotify from '@/components/notify/index.vue'
import { gotoAddressManage } from '@/routes/user-routes'


interface Data {
	list: any
	defaultId: null,
	unDefaultList: any
	isEmpty: boolean
	addressId: string
	shopId: string
}

const data = reactive<Data>({
    list: [],
    defaultId: null,
    unDefaultList: [],
    isEmpty: false,
    addressId: '',
    shopId: ''
})

const bcPopup = ref()

const bcNotify = ref()

const setDef = (item: any) => {
    editAddress({
        ...item,
        addressId: item.id,
        isDefault: 1
    }).then((res) => {
        bcNotify.value.show('设置成功')
        addressList()
        data.defaultId = item.id
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const seleSite = (item: any) => {
    console.log(123132, item)

    Throttle(() => {
        dispatchWEvent(CareEvents.Get__Address, item)
        pageController.back()
    }, 800)
}

const editGoodsAddress = (addressId: String) => {
    gotoAddressManage({ type: 2, item: JSON.stringify(addressId) })
}

const deletGoodsAddress = (addressId: string) => {
    data.addressId = addressId
    bcPopup.value.open()
}

const clickAddGoodsAddress = () => {
    gotoAddressManage({ type: 1 })
}

const confirmDelAddress = () => {
    delAddress({ addressId: data.addressId }).then(() => {
        bcNotify.value.show('删除成功')
        bcPopup.value.close()
        addressList()
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const cancel = () => {
    bcPopup.value.close()
}

const addressList = () => {
    getAddressList().then((res) => {
        if (data.shopId) {
            data.list = res.filter(x => x.isMatch === undefined || x.isMatch === 1)
            data.unDefaultList = res.filter(x => x.isMatch === 0)
        }
        else {
            data.list = res
        }

        const obj = res.find(x => x.isDefault === 1)
        data.defaultId = obj ? obj.id : 0
        data.isEmpty = res.length == 0
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

onShow(() => {
    addressList()
})

onLoad((options) => {
    options?.shopId && (data.shopId = options.shopId)
})

</script>

<style lang="scss" scoped>
.listbg{
    background: linear-gradient(#DFF7EF 0%, rgba(255,255,255,0) 100%);
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    height: 300rpx;
}
	.addres-list {
		padding-bottom: calc(constant(safe-area-inset-bottom) + 150rpx);
		padding-bottom: calc(env(safe-area-inset-bottom) + 150rpx);
        position: relative;
        z-index: 10;
        // margin-top: -300rpx;
	}

	.unused-title{
		margin: 40rpx 0 20rpx;
		text-align: center;
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		position: relative;

		&::before,&::after{
			content: '';
			position: absolute;
			width: 40rpx;
			height: 0rpx;
			border: 2rpx solid #CFCFCF;
		}
		&::before {
			left: 20%;
			top: 50%;
		}
		&::after {
			right: 20%;
			top: 50%;
		}
	}

	// 项目内容
	.address-item {
		margin: 20rpx auto 0rpx auto;
		padding: 30rpx;
		width: 630rpx;
		box-shadow: 0 1rpx 5rpx 0rpx rgba(0, 0, 0, 0.05);
		border-radius: 16rpx;
		background: #fff;
		display: flex;
		box-shadow: 0 0 8rpx rgba(0,0,0,0.06);

		&.unused{
			background: #ECECEC;

			.contacts{
				color: #B4B4B4;
				.phone{
					color: #B4B4B4;
				}
			}
			.address{
				color: #B4B4B4;
			}

			._right{
				._rigdef{
					color: #B4B4B4;
				}
				.events .event-item{
					color: #B4B4B4;
				}
			}
		}
	}

	.contacts {
		font-size: 30rpx;
		margin-bottom: 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		// justify-content: space-between;

		.name {
			margin-right: 16rpx;
			font-weight: 500;
			font-size: 35rpx;
			// margin-bottom: 10rpx;
		}
		.phone{
			color: #333333;
			font-size: 28rpx;
		}
	}

	.address {
		font-size: 28rpx;
		color: #7B7B7B;

		.region {
			margin-right: 10rpx;
		}
	}

	._right {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30rpx;

        ._rigdef{
            font-size: 24rpx;
            font-weight: 400;
            color: #AAAAAA;

            .set{
                color: #EA3E1A;
            }
            .radio{
                vertical-align: middle;
				transform: scale(0.76);
            }
        }

		// 操作
		.events {
			display: flex;
			line-height: 48rpx;

			.event-item {
				font-size: 29rpx;
				margin-right: 34rpx;
				color: #7B7B7B;
				display: flex;
				align-items: center;

				&:last-child {
					margin-right: 0;
				}

				.title {
					margin-left: 8rpx;
				}
			}
		}
	}

	.item-right {
		flex: 1;
		margin-left: 10rpx;
	}

	// 底部操作栏
	.footer-fixed {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		min-height: 120rpx;
		z-index: 11;
		// box-shadow: 0 -4rpx 40rpx 0 rgba(151, 151, 151, 0.24);
		background: #fff;

		// 设置ios刘海屏底部横线安全区域
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.btn-wrapper {
			height: 130rpx;
			display: flex;
			align-items: center;
			padding: 0 30rpx;
		}

		.btn-item {
			flex: 1;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			border-radius: 50rpx;
		}

		.btn-item-main {
			background: #29C86F;
		}

	}
</style>
