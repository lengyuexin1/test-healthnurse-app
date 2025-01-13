<template>
    <view class="container" v-if="data.showPage">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
                <bc-page-navbar :title="'确认服务'"></bc-page-navbar>
            </template>

            
            <!-- 正常服务订单确认服务 -->
            <template v-if="props.handle == 1">
                <view class="content">
                    <view class="balance_info">
                        <!-- 服务信息 -->
                        <balanceInfo @getquantity="getquantity" :balanceInfoObj="data.balanceInfoObj"></balanceInfo>
                    </view>
                    <view class="visitor_information" v-if="showvisitor">
                        <!-- 老人档案 -->
                        <visitorInformation ref="visitorRef"></visitorInformation>
                    </view>
                    <view class="service_address" v-if="showaddress">
                        <!-- 服务地址 -->
                        <serviceAddress ref="addressRef"></serviceAddress>
                    </view>
                    <view class="service_time" v-if="showtime">
                        <!-- 服务时间\备注 -->
                        <serviceTime @inpbur="inpbur" ref="timeRef"></serviceTime>
                    </view>
                </view>
            </template>
            <!-- 机构服务订单确认服务 -->
            <template v-else>
                <view class="content">
                    <view class="balance_info">
                        <!-- 服务信息 -->
                        <agencyCardInfo @getquantity="getquantity" :agencyObj="data.agencyObj"></agencyCardInfo>
                    </view>
                    <view class="all_price">
                        <view class="all_price_text">产品总价</view>
                        <view class="all_price_number">
                            ￥
                            <text class="price_number">{{ (data.agencyObj.price * data.quantity) / 100 }}</text>
                        </view>
                    </view>
                    <view class="bala_box">
                        <view class="play_text_box">
                            <view class="play_title">支付方式</view>
                            <view class="play_single">微信支付</view>
                        </view>
                    </view>

                    <view class="bala_box" v-if="data.agencyObj.typeId==1">
                        <view class="play_notice">购买须知</view>
                        <view class="play_text">退款规则：随时退，过期退</view>
                    </view>

                    <div class="voucher_Notice" v-if="data.agencyObj.typeId==2">
                        <div class="voucher_Notice_title">购买须知</div>
                        <div class="voucher_Notice_row">
                            <div class="voucher_Notice_period">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/validityPeriod.svg')" mode="scaleToFill" />
                                <div>有效期</div>
                            </div>
                            <div class="voucher_Notice_days">购买后{{data.agencyObj.useEffectiveDays}}天有效</div>
                        </div>
                        <div class="voucher_Notice_row">
                            <div class="voucher_Notice_period">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherTime.svg')" mode="scaleToFill" />
                                <div>使用时间</div>
                            </div>
                            <div class="voucher_Notice_days">{{data.agencyObj.isRestrictTime==0?'全部时间可用': data.agencyObj.restrictTimeDesc }}</div>
                        </div>
                        <div class="voucher_Notice_row">
                            <div class="voucher_Notice_period">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherAddres.svg')" mode="scaleToFill" />
                                <div>适用范围</div>
                            </div>
                            <div
                                class="voucher_Notice_days"
                            >{{ data.agencyObj.range==0?'通用':data.agencyObj.range==1?`适用${data.agencyObj.rangeData}`:data.agencyObj.range==2?`不适用${data.agencyObj.rangeData}`:'' }}</div>
                        </div>
                        <div class="voucher_Notice_row">
                            <div class="voucher_Notice_period">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherRule.svg')" mode="scaleToFill" />
                                <div>使用规则</div>
                            </div>
                            <div class="voucher_Notice_days">·本单发票由商家提供，详情请咨询商家</div>
                            <div class="voucher_Notice_days">·每次仅限使用一张</div>
                            <div class="voucher_Notice_days" v-if="data.agencyObj.isExclusive == 1">·不可同时享受商家其他优惠</div>
                            <div class="voucher_Notice_days" v-if="data.agencyObj.isExclusive == 2">·可同时享受商家其他优惠</div>
                            <div class="voucher_Notice_days" v-if="data.agencyObj.isExclusive == 3">·可同时享受商家{{ data.agencyObj.exclusiveData }}优惠</div>

                            <div class="voucher_Notice_days">·有效期以具体时间为准</div>
                            <div class="voucher_Notice_days">·每人最多购买{{`${data.agencyObj.isRestrictBuyQuantity==0?'不限制数量':`${data.agencyObj.restrictBuyQuantity}`}`}}张</div>
                        </div>
                    </div>

                    <view class="sapge_bottom"></view>

                </view>
            </template>

            <template #bottom>
                <!-- 底部按钮 -->
                <view class="footer" v-if="props.handle == 1">
                    <view class="fotbox row">
                        <view class="fotlef column">
                            <view class="fotpic row">
                                <text class="ftpictit">需支付:</text>
                                <text class="ftpitex smal">￥</text>
                                <text class="ftpitex">{{ (data.calculationInfo.paidAmount && data.calculationInfo.paidAmount) / 100  }}</text>
                            </view>
                            <text class="fotyou">已优惠  ¥{{ (data.calculationInfo.discountAmount && data.calculationInfo.discountAmount) / 100 }}</text>
                        </view>

                        <view class="fotbtn">
                            <TnButton width="292rpx" height="76rpx" shape="round" font-size="30rpx" bg-color="#29C86F" text-color="#FFFFFF" :debounce="true" @tap="placeOrder">
                                立即支付
                            </TnButton>
                        </view>
                    </view>
                </view>
                <view class="footer" v-else>
                    <view class="fotbox row">
                        <view class="fotlef column">
                            <view class="fotpic row">
                                <text class="ftpictit">需支付:</text>
                                <text class="ftpitex smal">￥</text>
                                <text class="ftpitex">{{ ((data.agencyObj.price * data.quantity) / 100) }}</text>
                            </view>
                            <text class="fotyou">已优惠  ¥{{ (data.preferential * data.quantity) / 100 }}</text>
                        </view>

                        <view class="fotbtn">
                            <TnButton width="292rpx" height="76rpx" shape="round" font-size="30rpx" bg-color="#29C86F" text-color="#FFFFFF" :debounce="true" @tap="playinstitution">
                                立即支付
                            </TnButton>
                        </view>
                    </view>
                </view>
            </template>

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { TempStorage } from "@bc/base"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import balanceInfo from "./balanceInfo.vue"
import agencyCardInfo from "./agencyCardInfo.vue"

import visitorInformation from './visitor-information.vue'
import serviceAddress from './service-address.vue'
import serviceTime from './service-time.vue'
import { orderEntityConfig, cartEntityConfig, getBaseInfo, createOrder, cardCreateOrder, getOrderEntityConfig, houseOrderPay } from "@/api/order-api"
import { CareEvents } from "@/events/care-events"
import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { packPayment } from '@/libs/pay/pay-tools'

import { healthdetail, voucherdetail } from '@/api/service-api'
import { gotoOrderDetail } from '@/routes/order-routes'
import { getAssetsPic } from '@/common/setPicture'


interface Props {
    uniqueId:any,
    handle:number
}

const props = defineProps<Props>()

interface Data {
    showPage:boolean,
    uniqueId:any,   
    balanceInfoObj:any,
    consumerAttr:any,
    archives:any,//照护人信息
    location:any,//地址信息
    calculationInfo: any //支付信息
    carId: string
    optionMation: any, //照护服务信息
    serviceRules: any, //下单时间规则
    optionUnit: number, //下单时间单位
    quantity:number,
    remark:string, //备注
    ismany:boolean,
    agencyObj:any, // 康养详情
    preferential:number,
    institutionitemId:string

}
const data = reactive<Data>({
    showPage:false,
    uniqueId:'',
    balanceInfoObj:{},
    consumerAttr:[],
    optionMation:{},
    archives:{},
    location:{},
    calculationInfo: {},
    carId: '',
    serviceRules: {},
    optionUnit: 2, //下单时间单位
    quantity:1,
    remark:'',
    ismany:false,
    agencyObj:{},
    preferential:0,
    institutionitemId:'',
})

const bcNotify = ref()

const addressRef = ref()
const visitorRef = ref()

const timeRef = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

// 是否存在就诊人信息配置
const showvisitor = computed(()=>{
    return ![65795, 65796].includes(data.optionMation.templateCode) && exist("visitor_information")
})
// 是否存在服务地址
const showaddress = computed(()=>{
    return exist("service_address")
})
// 是否存在服务时间
const showtime = computed(()=>{
    return exist("service_time")
})
/* 否需要提交/渲染 就诊人信息 !陪诊 */
const consumerVisi = computed(()=>{
    return ![65795, 65796].includes(data.optionMation.templateCode) && exist('visitor_information')
})
/* 否需要提交/渲染 就诊人 陪诊 */
const informationVisi = computed(()=>{
    return [65795, 65796].includes(data.optionMation.templateCode) && exist('visitor_information')
})

/* 否需要提交/渲染 就诊人电话 陪诊 */
const informationMobile = computed(()=> {
    return [65795].includes(data.optionMation.templateCode)
})
/* 否需要提交/渲染 医院地址 */
const hospitalVisi = (()=> {
    return exist('hospital_address')
})
/* 否需要提交/渲染 寄送方式 */
const methodVisi = (()=> {
    return exist('delivery_method')
})
/* 否需要提交/渲染 配送地址 */
const deliveryVisi = (()=> {
    return exist('delivery_address')
})
/* 否需要提交/渲染 凭证 */
const certificateVisi = (()=> {
    return exist('delivery_certificate')
})
/* 否需要提交/渲染 联系人 */
const contactVisi = (()=> {
    return exist('contact_info')
})
// 备注提示信息 住院照护/陪诊服务
const promptText = (()=> {
    return [65800, 65795].includes(data.optionMation.templateCode) ? '请填写患者相关病情' : '请填写注意事项'
})
// 照护人是否合适
const isImproper = (()=> {
    return data.archives.estimateGradeCategoryIds && !data.archives.estimateGradeCategoryIds.includes(data.optionMation.categoryId)
})
// 照护人是否评估
const isAssess = (()=> {
    return data.archives.id && !data.archives.estimateGradeCategoryIds
})


// 获取普通服务订单需要填写内容
const getEntityConfig = (optionId: any) => {

    getOrderEntityConfig(data.carId ? data.carId : optionId, !!data.carId).then((res: any) => {
        console.log('res', res)
        // data.ismany = true
        data.optionMation = {
            itemId: res.item.id,
            itemName: res.item.name,
            thumb: res.item.thumb,
            optionId: res.option.id,
            optionName: res.option.name,
            optionPrice: res.option.price,
            baseName: res.item.base || '',
            categoryId: res.item.categoryId,
            categoryName: res.item.categoryName,
            templateCode: res.item.templateCode
        }

        data.serviceRules = res.item.extend.serviceRules
        data.optionUnit = res.option.extend.serviceWorkingHours.unit
        data.consumerAttr = res.consumerAttr || []

        data.calculationInfo = {
            amount: res.option.price,
            couponName: '',
            discountAmount: 0,
            paidAmount: res.option.price * data.quantity
        }
        // 订单单位为'次'
        if (res.option.extend.serviceWorkingHours.unit == 4  && res.option.extend.serviceWorkingHours.quantity != 1) {
            data.ismany = true
        }


        data.showPage = true

        // res.patient && (data.visitName = res.patient)

        // data.gainShopCouponList(1)

        // data.shopId = res.item.shopId

        // data.getBaseInfo(data.shopId)
    })
}

// 获取机构订单详情
const gethealthdetail = (id:string) => {
    healthdetail({
        id
    }).then((res:any)=>{
        data.agencyObj = res

        let sum = 0
        res.itemList.forEach((item:any) => {
            sum = sum + item.price
        })
        data.preferential = Math.abs(res.price - sum)
        data.institutionitemId = res.id

        data.showPage = true

    })
}

// 获取机构代金券详情
const getvoucherdetail = (id:string) => {
    voucherdetail({
        id
    }).then((res:any)=>{
        data.agencyObj = res

        let sum = 0
        res.itemList.forEach((item:any) => {
            sum = sum + item.price
        })
        data.preferential = Math.abs(res.price - sum)
        data.institutionitemId = res.id

        data.showPage = true

    })
}

const inpbur = (val:string) => {
    console.log(val);
}


const placeOrder = () => {
    // 调用子组件的属性
    if (!addressRef.value?.data?.location) {
        bcNotify.value.error('请选择地址')
        return
    }
    if (!timeRef.value?.datetime) {
        bcNotify.value.error('请选择上门时间')
        return
    }
    if (showvisitor && !visitorRef.value?.data?.archives.id){
        bcNotify.value.error('请选择照护人')
        return
    }

    
    const location = addressRef.value.data.location
    const datetime = new Date(timeRef.value.datetime).getTime()
    const archives = visitorRef.value.data.archives

    // console.log('location',location);
    // console.log('datetime',datetime);
    // console.log('archives',archives);
    

    uni.showLoading({
        title: '正在下单',
        mask: true
    })

    const userRelCouponIds = [] as string[]

    console.log('data.optionMation',data.optionMation);
    

    const reqData = {
        userRelCouponIds,
        note: data.remark, //备注
        useNow: null, //按次规格 必填, 立刻使用(-1, 为false，1为TRUE)
        entity: {
            entityId: data.carId ? data.carId : null, //购物车id
            optionId: data.optionMation.optionId, //规格id
            quantity: data.quantity, //购买数量
            activityId: null //data.activityId //活动id
        },
        // 联系人
        contact: contactVisi ? {
            smsCode: 996, //短信（已废弃，写死为 996 ）
            mobile: data.location.mobile,
            person: data.location.name
        } : null,
        // 拓展信息
        attr: {
            utcVisitStart: datetime / 1000, //上门时间/就诊时间

            addressId: showaddress || deliveryVisi ? location.id : null, //地址id
            patientId: showvisitor ? archives.id : 0, //老人档案ID，只有居家照护需要填写照护人

            /* todo */
            hospitalId: null, //医院id

            hospital: null,

            patient: informationVisi ? archives.name : null, //就诊人名称
            patientMobile: archives.mobile || null, //就诊人手机号
            deliveryMethod: null, //配送方式 id
            deliveryCertificate: null //代取凭证

        }
    }

    console.log('reqData',reqData);

    /* 生成订单 */
    createOrder(reqData).then((res:any) => {
        uppay(res)
    }).catch(err => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}


// 机构订单下单
const playinstitution = () => {
    cardCreateOrder({
        userRelCouponIds: [],
        entity: {
            quantity: data.quantity,
            itemId: data.institutionitemId
        }
    }).then((res:any) => {
        uppay(res)
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

const uppay = (orderId:string) => {
    uni.showLoading({
        title: '调起支付',
        mask: true
    })
    const openid = uni.getStorageSync('openid')
    /* 获取支付参数 */
    houseOrderPay({ 
        orderId, 
        openid: openid != '' ? openid : undefined,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid,
    }).then(async (res:any) => {
        /* 调起支付 */
        // #ifdef MP-WEIXIN || APP-PLUS
        packPayment(res.payParams).then((ret:any) => {
            console.log("支付结果", ret)
            if (ret.isSuccess && ret.status === 'CPCN') {
                setTimeout(() => {
                    toOrderDetail(res.orderId)
                }, 800);
                return false
            }
            // bcNotify.value.success('支付成功');
            setTimeout(() => {
                toOrderDetail(res.orderId)
            }, 800);
        }).catch(() => {
            // bcNotify.value.error('支付失败');
            setTimeout(() => {
                toOrderDetail(res.orderId)
            }, 800);
        })
        // #endif
    }).catch((err) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

// 跳转订单详情
const toOrderDetail = (id:string) => {
    gotoOrderDetail(id,true)
}


// 获取订单详情
const getorderEntity = (optionId:string)=>{
    orderEntityConfig({
        optionId,
    }).then((res:any)=>{
        data.balanceInfoObj = {
            title : res.item.name,
            optiontitle : res.option.name,
            optionprice : res.option.price,
            servicethumb : res.item.thumb,
        }
        data.optionMation = res.item
        data.consumerAttr = res.consumerAttr
        getShopDetail(res.item.shopId)
    })
}

// 获取店铺信息
const getShopDetail = (id:string) => {
    getBaseInfo({
        id
    }).then((res:any)=>{
        data.balanceInfoObj = {
            ...data.balanceInfoObj,
            shopname:res.name
        }
        console.log('data',data);
        
    })
}

// 判断参数是否存在
const exist = (str:string) => {
    const item = data.consumerAttr.find((x:any) => {
        return x.field === str
    })
    return !!item
}

// 监听数量变化
const getquantity = (quantity:number) => {
    data.quantity = quantity
}





onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(props.uniqueId).then((res:any) => {
        if (props.handle == 1) {
            getorderEntity(res.optionId)
            getEntityConfig(res.optionId)
        }else{
            res.voucherType == 1 ? getvoucherdetail(res.itemId) : gethealthdetail(res.itemId)
        }
    }).catch(() => {
        bcNotify.value.error('订单获取失败')
        setTimeout(() => {
            pageController.back()
        }, 1000)
    })
})



</script>
  
<style lang="scss" scoped>
.content{
    padding: 20rpx;
    box-sizing: border-box;
    .balance_info{
        margin-bottom: 20rpx;
    }
    .all_price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 0rpx 40rpx;
        box-sizing: border-box;
        margin: 40rpx 0rpx;
        .all_price_text {
            color: #333333;
            font-size: 30rpx;
            font-weight: 600;
        }
        .all_price_number {
            color: #f50606;
            font-size: 26rpx;
            .price_number {
                font-size: 34rpx;
            }
        }
    }
    .play_text_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .play_title {
            color: #333333;
            font-size: 30rpx;
            font-weight: 600;
        }
        .play_single {
            color: #999999;
            font-size: 28rpx;
        }
    }
    .bala_box {
        // margin: 16rpx 16rpx 0rpx;
        margin-bottom: 16rpx;
        padding: 30rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.06);
        border-radius: 24rpx;
        .play_text_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .play_title {
                color: #333333;
                font-size: 30rpx;
                font-weight: 600;
            }
            .play_single {
                color: #999999;
                font-size: 28rpx;
            }
        }
        .play_notice {
            color: #333333;
            font-size: 30rpx;
            font-weight: 600;
            margin-bottom: 24rpx;
        }
        .play_text {
            color: #999999;
            font-size: 28rpx;
        }
    }
    .voucher_Notice {
        background: #ffffff;
        padding: 30rpx;

        border-radius: 24rpx;
        // margin: 20rpx;
        .voucher_Notice_title {
            font-weight: 500;
            padding-top: 6rpx;
            font-size: 32rpx !important;
            color: #333333 !important;
        }
        .voucher_Notice_row:last-child {
            border-bottom: none !important;
        }
        .voucher_Notice_row {
            display: flex;
            flex-direction: column;
            margin-top: 32rpx;
            padding-bottom: 24rpx;
            border-bottom: 2rpx solid #f2f2f2;
            .voucher_Notice_days {
                font-size: 28rpx;
                color: #666666;
                padding-top: 12rpx;
            }
            .voucher_Notice_period {
                display: flex;
                image {
                    width: 32rpx;
                    height: 32rpx;
                    margin-right: 12rpx;
                }
                .voucher_Notice_days {
                    font-size: 28rpx;
                    color: #666666;
                    margin-top: 12rpx;
                }
                align-items: center;
            }
        }
    }
    .sapge_bottom{
        width: 100%;
        height: 150rpx;
    }

    .visitor_information{
        margin-bottom: 20rpx;
    }
    .service_address{
        margin-bottom: 20rpx;
    }
    .service_time{
        margin-bottom: 20rpx;
    }
}
.footer{
	background: #FFFFFF;
	position: fixed;
	left: 0;
	bottom: 0;
    z-index: 99;
	width: 100%;
	border-top: 1rpx solid #f2f2f2;
	&.fotbg{
		position: relative;
		opacity: 0;
		padding-bottom: 20rpx;
	}
	.fotlef{
		align-items: flex-start;
		justify-content: space-between;
		.fottip{
			font-size: 26rpx;
			font-weight: 400;
			color: #999999;
		}
		.fotpic{
			align-items: center;
			.ftpictit{
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
			}
			.ftpitex{
				font-size: 36rpx;
				font-weight: bold;
				color: #F50606;
				&.smal{
					font-size: 28rpx;
				}
			}
		}
		.fotyou{
			font-size: 26rpx;
			font-weight: 400;
			color: #999999;
		}
	}
	.fotbox{
		height: 130rpx;
		padding: 10rpx 30rpx;
		align-items: center;
		justify-content: space-between;
		&.ordinfo{
			justify-content: flex-end;
			.fotbtn{
				width: 192rpx;
				margin-left: 16rpx;
			}
		}
	}
}
</style>
  