<template>
	<view class="content">
		<TnPopup v-model="coupshow" open-direction="bottom" round="20" @close="coupshow = false">
      <view class="oldman-head">
        <view class="oldman-close" @click="coupshow = false">
          <tn-icon name="close" size="18"></tn-icon>
        </view>
        <view class="" style="text-align: center;margin:0 90rpx;">
          <text class="head-tit">优惠详情</text>
        </view>
      </view>

      <scroll-view scroll-y="true" style="width: 750rpx;height: 800rpx;">
        <view class="coupbox column">
          <!-- 可使用优惠券 -->
          <view class="coup_li_box" v-if="coupArr.length > 0">
            <tn-checkbox-group v-model="coupId" placement="column">
              <view
                class="coupli row"
                :class="{ 'unable': item.canUse === 0 }"
                v-for="(item, index) in coupArr"
                :key="item.grantedId"
              >
                <view class="couplef row">
                  <view class="">
                    <view class="coupic row">
                      <template v-if="!isRebate(item.typeId)">
                        <text class="pictex unit">￥</text>
                        <text class="pictex">{{ item.cfgOffer  }}</text>
                      </template>
                      <template v-else>
                        <text class="pictex">{{ item.cfgOffer  }}</text>
                        <text class="pictex unit">折</text>
                      </template>
                    </view>
                    <view class="couptpe row i-center j-center">
                      <text class="text">{{ item.typeName }}</text>
                    </view>
                  </view>
                  <view class="coupinfo">
                    <text class="couptit">{{ item.name }}</text>
                    <text class="couptie">有效期至 {{ timeFormat(item.utcEnd) }}</text>
                  </view>
                </view>
                <tn-checkbox
                  :size="22"
                  :model-value="item.isChecked"
                  @update:model-value="(val) => groupCoup(val, item, index)"
                  :disabled="item.canUse === 0"
                  shape="circle"
                  active-color="#FF1616"
                  inactive-color="#DBDBDB"
                ></tn-checkbox>
              </view>
            </tn-checkbox-group>
          </view>

          <!-- 不可使用优惠券 -->
          <template v-if="notCanArr.length > 0">
            <text class="coupmore">不可使用优惠劵</text>
            <view class="coup_li_box notcan">
              <tn-radio-group placement="column">
                <view
                  class="coupli unable row"
                  v-for="(item, index) in notCanArr"
                  :key="item.id"
                >
                  <view class="couplef row">
                    <view class="">
                      <view class="coupic row">
                        <template v-if="!isRebate(item.typeId)">
                          <text class="pictex unit">￥</text>
                          <text class="pictex">{{ item.cfgOffer  }}</text>
                        </template>
                        <template v-else>
                          <text class="pictex">{{ item.cfgOffer  }}</text>
                          <text class="pictex unit">折</text>
                        </template>
                      </view>
                      <view class="couptpe row i-center j-center">
                        <text class="text">{{ item.typeName }}</text>
                      </view>
                    </view>
                    <view class="coupinfo">
                      <text class="couptit">{{ item.name }}</text>
                      <text class="couptie">有效期至 {{ timeFormat(item.utcEnd) }}</text>
                    </view>
                  </view>
                  <tn-radio
                    :model-value="item.isChecked"
                    size="22"
                    active-color="#FF1616"
                    inactive-color="#DBDBDB"
                    disabled
                  ></tn-radio>
                </view>
              </tn-radio-group>
            </view>
          </template>
        </view>
      </scroll-view>
    </TnPopup>
	<BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script lang="ts" setup>
import { formattime } from '@/common/formatTime'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { ref, watch, computed, defineProps, defineEmits, nextTick } from 'vue'
import BCNotify from '@/components/notify/index.vue'

// Define Props interface
interface Props {
  granid?: string
  collageId?: string
  list: Array<any>
  coupsList: Array<any>
}

// Define the props
const props = defineProps<Props>()

// Define Emits
const emit = defineEmits<{(event: 'getGroup', item: any, checked: boolean, collageId: string | undefined): void}>()

// State variables
const bcNotify = ref<any>()
const coupshow = ref(false)
const coupId = ref<string[]>([])
const coupArr = ref<Array<any>>([])
const notCanArr = ref<Array<any>>([])

// Computed properties
const timeFormat = computed(() => (time: number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm')
})

const getCouponType = (typeId: number): boolean => {
    const cpuponTypeList = [1000004, 1000002, 10004, 10002, 100002, 100004]
    return cpuponTypeList.includes(typeId)
}

const isRebate = computed(() => (typeId: number): boolean => getCouponType(typeId))


// Methods
const openCpup = () => {

    getCoupList()
    console.log(coupshow.value)
    coupshow.value = true
}

const getCoupList = () => {
    coupArr.value = []
    notCanArr.value = []
    if (!props.list.length) { return }
    props.list.forEach((x) => {
        if (x.canUse === 1) {
            const isNowCoupon = props.coupsList.includes(x.grantedId)
            coupArr.value.push({
                ...x,
                isChecked: isNowCoupon
            })
            if (isNowCoupon) {
                coupId.value = [x.grantedId]
            }
        }
        else {
            notCanArr.value.push({
                ...x,
                isChecked: false
            })
        }
    })
}
// Watchers
watch(() => props.list, getCoupList)
watch(() => props.coupsList, getCoupList)

const receCoup = (item: any) => {
    bcNotify.value.show('领取成功')
}

const groupCoup = (e: boolean, item: any, index: number) => {
    if (e) {
        coupArr.value = coupArr.value.map((x, inds) => {
            if (index === inds) {
                x.isChecked = true
            }
            else {
                x.isChecked = false
            }
            return x
        })
        coupId.value = [item.grantedId]
    }
    else {
        coupArr.value = coupArr.value.map(x => ({ ...x, isChecked: false }))
        coupId.value = []
    }
    emit('getGroup', item, e, props.collageId)
    nextTick(() => {
        coupshow.value = false
    })
}

defineExpose({
    openCpup
})
</script>



<style lang="scss" scoped>
	.oldman-head{
		padding: 40rpx 40rpx 20rpx;
		position: relative;
		.oldman-close{
			position: absolute;
			right: 40rpx;
			top: 50rpx;
		}
		.head-tit{
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			text-align:center;
		}
		.head-tip{
			font-size: 28rpx;
			font-weight: 400;
			color: #999999;
			margin-top: 30rpx;
		}
	}
	.coupbox{
		align-items: center;
		justify-content: center;


		.coup_li_box{
			padding: 24rpx 24rpx 0;
			background-color: #FFF6E9;

			&.notcan{
				background-color: #F8F8F8;
			}
		}
		.coupmore{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
			margin: 20rpx 0;
		}
		.coupli{
			height: 170rpx;
			padding: 30rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			&.unable{
				// background-color: #F8F8F8;
				.couplef{
					.pictex{
						color: #BEBEBE;
					}
					.couptpe{
						background: #EFEFEF;
						.text{
							color: #ABABAB;
						}
					}
					.coupinfo{
						.couptit{
							color: #949494;
						}
					}
				}
			}
			.couplef{
				align-items: center;
				.coupic{
					align-items: center;
				}
				.pictex{
					font-size: 64rpx;
					font-weight: bold;
					color: #FF1616;
					align-items: center;
					&.unit{
						font-size: 40rpx;
					}
				}
				.couptpe{
					width: 106rpx;
					height: 38rpx;
					background: #FFE5C4;
					border-radius: 6rpx;
					.text{
						font-size: 18rpx;
						font-weight: 400;
						// line-height: 38rpx;
						color: #FF8A23;
						text-align: center;
					}
				}
				.coupinfo{
					margin-left: 36rpx;
					.couptit{
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;
					}
					.couptie{
						font-size: 26rpx;
						font-weight: 400;
						color: #999999;
						margin-top: 8rpx;
					}
				}
			}
            .coupbtn{
                width: 80rpx;
            }
		}
	}
</style>
