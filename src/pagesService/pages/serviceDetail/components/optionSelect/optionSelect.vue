<template>
	<TnPopup v-model="show" open-direction="bottom" @close="close" @open="open" round="40rpx" closeable>
		<view class="content">
            <view class="mation">
                <view class="gods row" v-if="props.list.length">
                    <view class="godimg">
                        <image radius="12rpx" :src="props.list[optionIds].thumb"></image>
                    </view>
                    <view class="godsrig column">
                        <text class="godname u-line-2">{{props.list[optionIds].name}}</text>
                        <view class="godpic row j-between">
                        <text class="godnow">￥{{ moneyFilter(props.list[optionIds].price)}}</text>
                <view class="peopsome row i-center">
					<!-- <view class="peoptit" style="margin-bottom: 0;">购买数量</view> -->
					<view style="margin-left: auto;">
						<TnNumberBox v-model="vModelValue" bg-color="#f5f5f5" :min="1" :max="maxStock"
                            buttonSize="56rpx" inputWidth="66rpx">
                        </TnNumberBox>
					</view>
				</view>
                        </view>
                        <view class="godseller row i-center">
                            <text>服务由</text>
                            <view class="godselname u-line-1">{{ props.baseName }}</view>
                            <text>提供</text>
                        </view>
                    </view>
                </view>

                <view class="optionbox">
                    <view class="optiontit">服务项目</view>
                    <scroll-view scroll-y class="optionsoll">
                        <block v-for="(item,index) in props.list" :key="item.id">
                            <view class="optionli row i-center j-between" :class="{ set: isSet(index) }" @click="selectOption(index)">
                                <view class="optlef">
                                    <view class="optname">{{ item.name }}</view>
                                    <view class="optprice">￥{{ moneyFilter(item.price) }}</view>
                                </view>
                                <u-icon name="checkmark-circle-fill" size="44rpx" :color="isSet(index) ? '#29C86F' : '#C9C9C9'"></u-icon>
                            </view>
                        </block>
                    </scroll-view>
                </view>
            </view>
			<view class="peopbtn" v-if="!isCar">
                <TnButton bg-color="#29C86F" text-color="#fff" :customStyle="btnStyle" width="100%" :disabled="isDisabled" shape="round" @click="balance">领券购买</TnButton>
            </view>
            <view class="peopbtn" v-else>
                <TnButton bg-color="#29C86F" text-color="#fff" width="100%" :customStyle="btnStyle" :disabled="isDisabled" shape="round" @click="putCar">加入购物车</TnButton>
            </view>
        </view>
		<BCNotify ref="bcNotify"></BCNotify>
    </TnPopup>
</template>

<script lang="ts" setup>
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import { ref, reactive, computed, onMounted, nextTick } from "vue"
import { TempStorage } from "@bc/base"
import { moneyFilter } from '@/common/filters'
import { gotoBalanceGood } from '@/routes/order-routes'
import BCNotify from '@/components/notify/index.vue'
import { addServeCart } from '@/api/service-api'

// Props
const props = defineProps({
    list: {
        type: Array,
        required: true
    },
    info: {
        type: Object,
        required: true
    },
    baseName: {
        type: String,
        default: ''
    },
    hospital: {
        type: Object,
        default: () => ({})
    }
})

// Reactive state
const show = ref(false)
const isDisabled = ref(false)
const btnStyle = ref({
    height: '90rpx',
    fontSize: '30rpx'
})
const optionIds:unknown = ref(0)
const adresMation = ref({})
const isCar = ref(false) // Whether it's the shopping cart
const vModelValue = ref(1)
const maxStock = ref(31)
const bcNotify = ref()
// Computed property to check if an option is selected
const isSet = computed(() => {
    return (inds:any) => {
        return inds === optionIds.value
    }
})
interface Events {
    (e: 'getOptionItem', data: any): void
}
const emit = defineEmits<Events>()
// Methods (converted to functions inside `<script setup>`)
const close = () => {
    show.value = false
}

const godOpen = (type:boolean) => {
    isCar.value = type
    show.value = true
}

const submit = () => {
    if (isCar.value) {
        putCar()
    }
    else {
        balance()
    }
}

const balance = () => {
    const uniqueId = TempStorage.save({
        optionId: props.list[optionIds.value].id,
        adresMation: adresMation.value,
        hospital: props.hospital,
        quantity: vModelValue.value
    })
    //   gotoBalanceOrder(uniqueId)
    close()
}

const putCar = () => {
    const query = {
        optionId: props.list[optionIds.value].id,
        quantity: vModelValue.value
    }
    addServeCart(query)
        .then(() => {
            bcNotify.value.show('添加成功')
        })
        .catch((err) => {
            bcNotify.value.show(err.message)
        })

        .finally(() => {
            setTimeout(() => {
                close()
            }, 500)
        })
}

const setAdres = () => {
//   gotoUserLink({}, 'dizhi')
}

const selectOption = (index:number) => {
    optionIds.value = index
    vModelValue.value = 1
    emit('getOptionItem', props.list[optionIds.value])
}

// On mounted or when props change, calculate the height, etc. (if needed)
onMounted(() => {
    // Example for address fetching if needed
    // autoBCEventListener(CareEvents.Get__Address, (data) => {
    //   adresMation.value = data
    // })
})
defineExpose({ godOpen })
</script>

<style scoped>
:deep(.tn-number-box){
    border-radius: 28rpx;
    overflow: hidden;
}
:global(.tn-number-box){
    border-radius: 28rpx;
    overflow: hidden;
}

</style>

<style scoped lang="scss">
.minus{
    width: 66rpx;
    height: 56rpx;
    background-color:#F5F5F5;
    border-radius: 56rpx 0 0 56rpx;
    align-items: center;
    justify-content: center;
}
.plus{
    width: 66rpx;
    height: 56rpx;
    background-color:#F5F5F5;
    border-radius: 0 56rpx 56rpx 0;
    align-items: center;
    justify-content: center;
}
.content{
		padding: 30rpx;
		.mation{
			padding: 30rpx 6rpx 0;
		}
		.gods{
			.godimg{
				margin-right: 24rpx;
                width: 180rpx;
                height: 180rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
			}
			.godsrig{
				width: 430rpx;
				height: 180rpx;
				justify-content: space-between;
				.godname{
					font-size: 32rpx;
					font-weight: bold;
					line-height: 40rpx;
					color: #333333;
				}
				.godpic{
					align-items: center;
					.godnow{
						font-size: 40rpx;
						font-weight: 800;
						color: #FC3848;
						margin-right: 10rpx;
					}
					.godold{
						font-size: 24rpx;
						font-weight: 400;
						color: #B2B2B2;
						text-decoration: line-through;
					}
				}
                .godseller{
                    margin-top: 4rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                    text{
                        flex-shrink: 0;
                    }
                    .godselname{
                        height: 46rpx;
                        background: #FFF6E6;
                        border-radius: 8rpx;
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        line-height: 46rpx;
                        color: #F88400;
                        padding: 0 12rpx;
                        margin: 0 12rpx;
                    }
                }
			}
		}
		.peopsome{
			// margin-top: 44rpx;
			.peopdas{
                .peoplef{
                    flex: 1;
                    .peopmap{
                        width: 50rpx;
                        height: 50rpx;
                        border-radius: 50rpx;
                        background: #EEF4FF;
                        margin-right: 14rpx;
                        flex-shrink: 0;
                    }
                    .peopads{
                        .peopinfo{
                            font-size: 28rpx;
                            font-weight: bold;
                            color: #333333;
                        }
                        .peopmation{
                            font-size: 26rpx;
                            font-weight: 400;
                            color: #999999;
                            margin-top: 8rpx;
                            text{
                                margin-right: 6rpx;
                            }
                        }
                    }
                }
                .adsbtn{
                    margin-left: 64rpx;
                    flex-shrink: 0;
                }
			}
		}
        .optionbox{
            .optiontit{
                font-size: 30rpx;
                font-weight: 500;
                color: #333333;
                padding: 28rpx 0 20rpx;
            }
            .optionsoll{
                max-height: 500rpx;
                .optionli{
                    background: #F5F5F5;
                    border-radius: 8rpx;
                    padding: 18rpx 40rpx 16rpx 16rpx;
                    border: 2rpx solid #F5F5F5;
                    margin-bottom: 20rpx;
                    .optlef{
                        .optname{
                            font-size: 28rpx;
                            font-weight: 400;
                            line-height: 32rpx;
                            color: #333333;
                        }
                        .optprice{
                            font-size: 30rpx;
                            font-weight: bold;
                            line-height: 32rpx;
                            color: #FF0000;
                            margin-top: 8rpx;
                        }
                    }
                    &.set{
                        border-color: #6BE19F;
                        background: #E4FCEF;

                    }
                }
            }
        }

		.peopbtn{
			margin-top: 40rpx;
		}
	}
</style>
