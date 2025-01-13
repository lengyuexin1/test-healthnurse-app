<template>
	<TnPopup v-model="show" open-direction="bottom" @close="close" @open="open" round="40rpx" closeable>
        <view class="content">
            <view class="mation">
				<view class="gods row">
                    <view class="godimg">
                        <image class="goodimg" :src="data.comInfo.thumb"  mode="aspectFill"></image>
                    </view>
					<view class="godsrig column">
						<text class="godname u-line-2">{{data.comInfo.name}}</text>
						<text class="godopt u-line-2">{{data.comInfo.optionValueNames || ''}}</text>
                        <text class="godopt">库存: {{ maxStock }}</text>
						<view class="godpic row">
							<text class="godnow">￥{{ moneyFilter(data.comInfo.price) }}</text>
						</view>
					</view>
				</view>
				<view class="peopsome row i-center">
					<view class="peoptit" style="margin-bottom: 0;">购买数量</view>
					<view style="margin-left: auto;">
						<TnNumberBox v-model="vModelValue" bg-color="#f5f5f5" :min="1" :max="maxStock"
                            buttonSize="56rpx" inputWidth="66rpx">
                        </TnNumberBox>
					</view>
				</view>
                <!-- 单品商品 -->
				<view class="peopsome">
					<view class="peoptit">商品规格</view>
					<view class="peopspecs" v-if="type == 1">
						<scroll-view class="specs-scrol" scroll-y>
							<block v-for="(item,index) in optionList" :key="item.id">
								<view class="specs-tit">{{item.name}}</view>
								<view class="peopnorms row">
									<view class="normsli row"
										:class="{ 'set': data.idsarr.includes(ele.id) }"
										v-for="(ele,elids) in item.valueList"
										:key="ele.id"
										@click="getNorm(item,index,elids,ele)"
									>
										<text>{{ele.name}}</text>
									</view>
								</view>
							</block>
						</scroll-view>
					</view>
                    <!-- 组合商品 -->
                    <view class="peopspecs" v-else>
						<scroll-view class="specs-scrol" scroll-y>
							<block v-for="(item,index) in optionList" :key="item.id">
								<view class="peopnorms row">
									<view class="normsli row"
										:class="{ 'set': data.idsarr.includes(item.id) }"
										@click="getNorm(item,index)"
									>
										<text>{{item.name}}</text>
                                        <text v-if="item.valueNames != '' && item.valueNames">{{`(${item.valueNames})`}}</text>
        							</view>
								</view>
							</block>
						</scroll-view>
					</view>
				</view>
			</view>
            <view class="peopbtn" v-if="!isCar">
                <TnButton bg-color="#29C86F" text-color="#fff" :customStyle="btnStyle" width="100%" :disabled="isDisabled" shape="round" @click="balance">{{btnTxt}}</TnButton>
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
import { goodsSpecifications, createGoodcart } from '@/api/goods-api'
import { PlatformManage } from "@bc/sys"


const props = withDefaults(defineProps<{
	livePlayId: string
    type:number,
    info:any,
    btnTxt:string
}>(), {
	livePlayId: '',
    type:1,
    info:true,
    btnTxt:'立即下单'
})

interface Data{
	comInfo:any,
	idsarr:any,
}
const data = reactive<Data>({
	comInfo:{},
	idsarr:[]
})


const bcNotify = ref()

const emit = defineEmits(["setOption"])

const show = ref(false)
const isDisabled = ref(false)
const optionIds= ref(0)
const adresMation = ref({})
const isCar = ref(false)
const vModelValue = ref(1)
const maxStock = ref(31)
const btnStyle = {
    height: '90rpx',
    fontSize: '30rpx'
}
// const idsarr = ref()
const optionListid = ref()


const isSet = computed(() => {
    return (inds : any) => {
        return inds === optionIds.value
    }
})
const moneyPic = computed(() => {
    return (money:string) => {
        return moneyFilter(money)
    }
})

const infoUrl = computed(()=>{
    return props.info.thumb
})

//规格列表
const optionList = computed(()=>{
	if (!props.info.optionList) { return [] }

	let allList = props.info.optionList.map((x:any) => {
        return {
            ...x,
            valueList: x.valueList.map((n:any) => {
                return {
                    ...n,
                    isChecked: 0
                }
            })
        }
    })

	

	

    return allList
}) 

onMounted(()=>{
	

})

const open = () => {
	
	data.comInfo = props.info

	props.info.optionList.forEach((item:any,index:number) => {
		data.idsarr.splice(index,1,item.valueList[0].id)
		console.log('data.idsarr',data.idsarr);
	})
	getGoodsSpecifications()

}

const getGoodsSpecifications = () => {
	goodsSpecifications({
        optionValueIds: data.idsarr.toString(',')
    }).then((res:any) => {
        data.comInfo = {
            ...data.comInfo,
            ...res
        }
		// 获取最大库存
        getStock()
        emit('setOption', res.optionValueNames)
    })
}


const getNorm = (item:any, index:number, elids:number = 1, ele:any = {}) => {
            
    // this.idsarr.length = this.optionList.length

	console.log('ele',ele,index);
	

    if (props.type == 1) {
        data.idsarr.splice(index, 1, ele.id)
        ele.thumb && (data.comInfo = {
            ...data.comInfo,
            thumb: ele.thumb
        })
        const filteredArr = data.idsarr.filter(Boolean)
        filteredArr.length === optionList.value.length && getGoodsSpecifications()
    }
    else if (props.type == 2) {
        data.idsarr.splice(0, 1, item.id)
        data.comInfo = {
            ...data.comInfo,
            thumb: item.pic
        }
        console.log('item', item)
        data.comInfo.optionValueNames = item.name +  (item.valueNames && item.valueNames != '' ? `(${item.valueNames})` : '')
        data.comInfo.price = item.price
        optionListid.value = item.id
        maxStock.value = item.stock
        console.log('this.optionListid', optionListid.value)
        console.log('this.idsarr', data.idsarr)
    }
}


// 获取最大库存
const getStock = () => {
    maxStock.value = data.comInfo.stock
}


// 关闭弹窗
const close = () => {
    show.value = false
}
// 打开弹窗
const godOpen = (type: boolean) => {
	console.log('open');
	
    isCar.value = type
    show.value = true
}

// 领卷弹窗
const opennotifyRef = () => {
    bcNotify.value.show('领卷成功')
}

// 创建订单
const balance = () => {
    const goods = data.comInfo
	console.log('goods',goods);
	
    if (!data.comInfo.optionValueNames) {
		console.log('文字');
		
        uni.showToast({
            title: '请选择规格',
            icon: 'none'
        })
        return false
    }
    if (data.idsarr.length != optionList.value.length) {
		console.log('数组');

        uni.showToast({
            title: '请选择规格',
            icon: 'none'
        })
        return false
    }

    // this.close()

    const uniqueId = TempStorage.savewx({
        optionDetailId: props.type == 1 ? goods.id : optionListid.value,
        shopName: goods.shopName || '',
        quantity: vModelValue.value,
        shopIcon: goods.shopThumb,
        type: props.type,//1单品 2组合
		livePlayId: props.livePlayId
    })


	// #ifdef MP-WEIXIN
    gotoBalanceGood(uniqueId)
    // #endif



	// #ifdef APP-PLUS

	let payJSON = JSON.stringify({
        optionDetailId: props.type == 1 ? goods.id : optionListid.value,
        shopName: goods.shopName || '',
        quantity: vModelValue.value,
        shopIcon: goods.shopThumb,
        type: props.type,//1单品 2组合
		livePlayId: props.livePlayId
    })

    console.log('app跳转小程序调用半屏支付', payJSON);

    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // APP跳转小程序进行支付
    plus.share.getServices((res: any) => {
        let sweixin = null as any
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()
            
            PlatformManage.getToken().then((res:any)=>{
                console.log('获取userinfo',res);

                sweixin.launchMiniProgram({
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/Order/pages/balanceGoods/balanceGoods?payJSON=${payJSON}&userId=${res.id}`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })
            })
        }
    })
    // #endif

}

// 加入购物车
const putCar = () => {
	console.log('添加到购物车');

	if (props.type == 1 && !data.comInfo.id) {
		bcNotify.value.error('请选择商品规格')
		return
	}
	if (props.type == 2 && !optionListid.value) {
		bcNotify.value.error('请选择商品规格')
		return
	}

	createGoodcart({
        optionDetailId: props.type == 1 ? data.comInfo.id : optionListid.value,
        productType: props.type,//1单品 2组合
        quantity: vModelValue.value,
	}).then(()=>{
		uni.showToast({
            title: '添加成功',
            icon: 'none'
        })
		setTimeout(()=>{
			close()
		},800)
	}).catch((err:any)=>{
		bcNotify.value.error(err.message)
	})
   
}

defineExpose({ godOpen,opennotifyRef })
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
			width: 674rpx;
			height: 200rpx;
			.godimg{
				margin-right: 24rpx;
				.goodimg{
					width:"180rpx";
					width: 180rpx;
					height: 180rpx;
					border-radius: 16rpx;
				}
			}
			.godsrig{
				width: 430rpx;
				// height: 180rpx;
				justify-content: space-between;
				.godname{
					font-size: 32rpx;
					font-weight: bold;
					line-height: 40rpx;
					color: #333333;
				}
                .godopt{
                    font-size: 26rpx;
					line-height: 32rpx;
					color: #999999;
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
			}
		}
		.peopsome{
			margin-top: 50rpx;
			.peoptit{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				margin-bottom: 20rpx;
			}
			.peopdas{
				width: 638rpx;
				height: 68rpx;
				background: #F7F7F7;
				border-radius: 8rpx;
				padding: 0 20rpx;
				align-items: center;
				justify-content: space-between;
				font-size: 26rpx;
				font-weight: 400;
				color: #999999;
			}
			.specs-tit{
				font-size: 26rpx;
				font-weight: bold;
				color: #333333;
				margin: 40rpx 0 20rpx;
			}
			.peopnorms{
				flex-wrap: wrap;
				.normsli{
					padding: 0 20rpx;
					margin:0 16rpx 16rpx 0;
					height: 84rpx;
                    background: #F3F3F3;
					border-radius: 8rpx;
					align-items: center;
					justify-content: center;
					font-size: 22rpx;
					font-weight: 400;
					color: #666666;
					image{
						width: 48rpx;
						height: 48rpx;
						margin-right: 8rpx;
					}
					&.set{
                        border: 2rpx solid #6BE19F;
						background-color: #E4FCEF;
						color: #29C86F;
                        font-size: 24rpx;
					}
					&.without{
						background-color: #E1E1E1;
						color: #FFFFFF;
					}
				}
			}

			.peopspecs{

				.specs-scrol{
					height: 500rpx;
				}
			}

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
		}
		.peopbtn{
			margin-top: 40rpx;
		}
        .godsImg {
            width: 180rpx; 
            height: 180rpx;
        }
	}
</style>
