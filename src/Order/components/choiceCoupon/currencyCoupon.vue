<template>
	<view class="content">
		<TnPopup v-model="coupshow" open-direction="bottom" round="20">
            <view class="oldman-head">
				<view class="oldman-close" @click="coupshow = false">
                    <TnIcon name="close" size="32"></TnIcon>
                </view>
				<view class="" style="text-align: center;margin:0 90rpx;"><text class="head-tit">优惠详情</text></view>
			</view>
			<scroll-view scroll-y style="height: 900rpx;padding: 20rpx 0;">
				<view class="coupbox column">
                    <view class="coup_li_box" v-if="data.coupArr.length > 0">
                        <TnCheckboxGroup v-model="data.coupId" @change="changeGroup" >
                            <view class="coupli row" :class="{ 'unable': item.canUse == 0 }" v-for="(item,index) in data.coupArr" :key="item.grantedId">
								<view class="couplef row">
									<view class="">
										<view class="coupic row">
											<template v-if="!typeList.includes(item.typeId)">
												<text class="pictex unit">￥</text>
												<text class="pictex">{{ (item.cfgOffer / 100) }}</text>
											</template>
											<template v-else>
												<text class="pictex">{{ (item.cfgOffer) / 100 }}</text>
												<text class="pictex unit">折</text>
											</template>
										</view>
										<view class="couptpe row i-center j-center"><text class="text">{{item.typeName}}</text></view>
									</view>
									<view class="coupinfo">
										<text class="couptit">{{item.name}}</text>
										<text class="couptie">有效期至 {{ timeformat(item.utcEnd) }}</text>
									</view>
								</view>
                                <TnCheckbox active-color="#FF1616" :label="item.grantedId"></TnCheckbox>
                            </view>
                        </TnCheckboxGroup>
                    </view>
				</view>
			</scroll-view>
			
		</TnPopup>
		<BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script lang="ts" setup>
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'

import BCNotify from '@/components/notify/index.vue'


import { ref, reactive, computed, watch } from "vue"
import { formattime } from '@/common/formatTime'

const props = withDefaults(defineProps<{
	list:any,
    coupsList:any
}>(),{
	list:[],
    coupsList:[]
})

interface Data {
    coupId:any,
    coupArr:any,
    notCanArr:any,
    coupIndex:number,
}
const data = reactive<Data>({
    coupId:[],
    coupArr:[],
    notCanArr:[],
    coupIndex:0,
})

const bcNotify = ref()

const emit = defineEmits(["setcurrencyCoupon"])


const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

watch(props.list, (newValue: any) => {
    getCoupList()
})
watch(props.coupsList, (newValue: any) => {
    getCoupList()
})


const getCoupList = () => {
    data.coupArr = []
    data.notCanArr = []
    console.log('展开',props.list);
    if (!props.list.length) { return }
    data.coupArr = []
    props.list.map((x) => {
        if (x.canUse == 1) {
            const isNowCoupon = props.coupsList.includes(x.grantedId)
            data.coupArr.push({
                ...x,
                isChecked: isNowCoupon //this.coupsList ? this.coupsList.includes(x.grantedId) : x.grantedId == this.granid
            })
            isNowCoupon && (data.coupId = [x.grantedId])
        }
        else {
            data.notCanArr.push({
                ...x,
                isChecked: false
            })
        }
    })
}

const coupshow = ref<boolean>(false)
const typeList = [1000004, 1000002, 10004, 10002]


// 打开弹窗
const openCpup = (index:number) => {
    coupshow.value = true
    data.coupIndex = index
    getCoupList()
}

const changeGroup = (e:any) => {
    if (data.coupId.length > 1) {
        data.coupId.splice(0, 1, data.coupId[1]); 
        data.coupId.splice(1);
    }
    let item = props.list.filter((item:any)=>{
        return item.grantedId == data.coupId[0]
    })

    emit('setcurrencyCoupon',data.coupIndex,item[0])
}


const InitCpup = () => {
    getCoupList()

	data.coupId.push(data.coupArr[0])
	
    emit('setcurrencyCoupon', 0, data.coupArr[0])
}


defineExpose({ openCpup, InitCpup })
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
			width: 95%;
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
            width: 100%;
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
