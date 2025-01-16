<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg ></PageTopbg>
                <bc-page-navbar :title="'确认订单'"></bc-page-navbar>
            </template>
            <view class="conbox" v-if="data.showPage">
                <view class="locus-box">
                    <view class="locus-con row">
                        <image class="locus-icon" :src="getAssetsUrl('/mall/address-icon.png')"></image>
                        <view class="locus-rig row i-center j-between" v-if="data.delivery.id">
                            <view class="locus-info">
                                <view class="locus-name">{{data.delivery.name}}  {{data.delivery.mobile}}</view>
                                <view class="locus-desc">{{data.delivery.area}}{{data.delivery.address}}</view>
                            </view>
                            <navigator class="locus-edit" url="/pagesUser/pages/address/goodsSiteList">修改</navigator>
                        </view>
                        <navigator url="/pagesUser/pages/address/goodsSiteList" class="locus-rig row i-center j-between"
                            hover-class="none" v-else
                        >
                            <view class="locus-info">
                                <view class="locus-sele">请选择地址</view>
                            </view>
                            <TnIcon name="right" size="32rpx" color="#666666"></TnIcon>
                        </navigator>
                    </view>
                    <image class="locus-line" :src="getAssetsUrl('/mall/address-line.png')" mode="aspectFill"></image>
                </view>

                <block v-for="(item,index) in merchandise" :key="item.shopId">
                    <view class="bala-ord-li">
                        <view class="bala-ord-head">
                            <view class="bala-ord-shop row i-center">
                                <image class="balaordshopImg" :src="item.shopIcon" mode="aspectFill"></image>
                                <view class="shopname u-line-1">{{ item.shopName }}</view>
                            </view>
                            <block v-for="(ele) in item.productList" :key="ele.id">
                                <view class="bala-ord-info row">
                                    <view class="bala-ord-img">
                                        <image class="balaordimg" :src="delcomma(ele.image)"  mode="aspectFill"></image>
                                    </view>
                                    <view class="bala-ord-rig">
                                        <view class="bala-ord-tit u-line-1">{{ele.title}}</view>
                                        <view class="bala-ord-spec u-line-1">规格：{{ele.subtitle}}</view>
                                        <view class="bala-ord-pice row i-center j-between">
                                            <!-- <view v-if="pattern == 3">￥{{item.activity_price | moneyFilter}}</view> -->
                                            <view>￥{{(ele.price / 100)}}</view>
                                            <view class="bala-ord-num">
                                                <template>
                                                    <TnNumberBox v-model="ele.quantity" bg-color="#f5f5f5" :min="1" :max="100"
                                                        buttonSize="56rpx" inputWidth="66rpx" @change="editNumber">
                                                    </TnNumberBox>
                                                </template>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </block>
                            <view class="bala-ord-handle row i-center j-between" @click="showfast">
                                <view class="bala-handle-tit">订单运费</view>
                                <view class="bala-handle-rig row i-center j-between">
                                    <view class="bala-handle-tex">包邮</view>
                                </view>
                            </view>
                            <view class="bala-mon-li bala-ord-handle row i-center j-between">
                                <view class="row i-center">
                                    <view class="bala-mon-name">优惠信息</view>
                                </view>
                                <view class="row i-center" @click="getShopCouponList(item,index)" :key="updateKey">
                                    <view class="bala-mon-pref" v-if="item.coupon.cfgOffer">
                                        <template v-if="!isRebate(item.coupon.typeId)">
                                            ￥{{ (item.coupon.cfgOffer / 100) }}
                                        </template>
                                        <template v-else>
                                            {{ (item.coupon.cfgOffer / 100) }}折
                                        </template>
                                    </view>
                                    <view class="bala-mon-pref" v-else>
                                        <!-- 没有 -->
                                    </view>
                                    <view class="bala-mon-nun" style="margin-right: 12rpx;">更多优惠</view>
                                    <TnIcon name="right" size="32rpx" color="#999999"></TnIcon>
                                </view>
                            </view>
                            <view class="bala-ord-handle row j-between">
                                <view class="bala-handle-tit">订单备注</view>
                                <input v-model="item.remarks" :maxlength="150" placeholder="请输入备注" class="bala-handle-input">
                            </view>
                        </view>
                    </view>
                </block>

                <view class="bala-money" >
                    
                    <view class="bala-mon-li row i-center j-between">
                        <view class="row i-center">
                            <view class="bala-mon-name">通用优惠券</view>
                        </view>
                        <view class="row i-center" @click="getPingCouponList()">
                            <view class="bala-mon-pref" v-if="data.platCoups.cfgOffer">
                                <template v-if="!isRebate(data.platCoups.typeId)">
                                    ￥{{ (data.platCoups.cfgOffer / 100) }}
                                </template>
                                <template v-else>
                                    {{ (data.platCoups.cfgOffer / 100) }}折
                                </template>
                            </view>
                            <view class="bala-mon-nun" style="margin-right: 12rpx;">更多优惠</view>
                            <TnIcon name="right" size="32rpx" color="#999999"></TnIcon>
                        </view>
                    </view>
                </view>

                <view class="page_space"></view>

            </view>
            <template #bottom>
                <!-- 底部按钮 -->
                <view class="footer" v-if="data.showPage">
                    <view class="fotbox row">
                        <view class="fotlef column">
                            <view class="fotpic row">
                                <text class="ftpictit">需支付:</text>
                                <text class="ftpitex smal">￥</text>
                                <text class="ftpitex">{{ data.calculationObj.paidAmount ? (data.calculationObj.paidAmount / 100) : '--'  }}</text>
                            </view>
                            <text class="fotyou">已优惠  ¥{{ data.calculationObj.discountAmount ? (data.calculationObj.discountAmount / 100) : '--' }}</text>
                        </view>

                        <view class="fotbtn">
                            <TnButton width="292rpx" height="76rpx" shape="round" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="placeOrder">
                                立即支付
                            </TnButton>
                        </view>
                    </view>
                </view>
                
            </template>
            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
        <!-- 下单选择优惠券 -->
        <choiceCoupon ref="refCoup" :list="data.grantList" :coupsList="data.grantCoupsList" @selectCoup="selectCoup" />
        <currencyCoupon ref="refcurrency" :list="data.platCoupsList" :coupsList="data.platCoupsCheckList" @setcurrencyCoupon="setcurrencyCoupon"></currencyCoupon>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'
import { TempStorage } from "@bc/base"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import choiceCoupon from '@/pagesOrder/components/choiceCoupon/choiceCoupon.vue'
import currencyCoupon from '@/pagesOrder/components/choiceCoupon/currencyCoupon.vue'

import { getCouponGranted, houseOrderPay, goodsCalculation, getPlatCoupon, submitOrder } from "@/api/order-api"
import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { packPayment } from '@/libs/pay/pay-tools'

import { getAddressList, goodsPurchase, cartPurchase } from '@/api/goods-api'
import { getAssetsPic } from '@/common/setPicture'

import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
import { GoodsOrderDetail } from '@/routes/order-routes'

interface Props {
    uniqueId:any,
}


const props = defineProps<Props>()

interface Data {
    showPage:boolean,
    uniqueId:any,
    calculationInfo: any //支付信息
    quantity:number,
    type:number,//商品类型 1普通商品 2组合商品
    remark:string, //备注
    delivery:any, // 地址
    couparrList:any,//优惠券列表
    grantList:any,//店铺优惠卷列表
    grantCoupsList: any //选中的店铺优惠券id列表
    platCoupsList:any,//平台优惠券列表
    platCoups:any,//选中的平台优惠券
    platCoupsCheckList:any,// 选中的通用优惠券id
    calculationObj:any,//计算的支付金额
    livePlayId: string,//直播间id

}
const data = reactive<Data>({
    showPage:false,
    uniqueId:'',
    calculationInfo: {},
    quantity:1,
    type:1,
    remark:'',
    delivery:{},
    couparrList:[],
    grantList:[],
    grantCoupsList: [],
    platCoupsList:[],
    platCoups:{},
    platCoupsCheckList: [],
    calculationObj:{},
    livePlayId: ''
})

const updateKey = ref(0)

const merchandise = ref()
const bcNotify = ref()

const refCoup = ref()
const refcurrency = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


// 处理图片逗号
const delcomma = computed(()=>(img:string)=>{
    if (img) {
        return img.replace(/,/g, "")
    }
    else {
        return ''
    }
}) 


// 是否是折扣券
const isRebate = computed(()=>(typeId:number)=>{
    const cpuponTypeList = [1000004, 1000002, 10004, 10002, 100002, 100004]
    return cpuponTypeList.includes(typeId)
})

const placeOrder = () => {

    if (!data.delivery.id) {
        bcNotify.value.error('请选择收货地址')
        return
    }
    if (data.calculationObj.paidAmount <= 0) {
        bcNotify.value.error('当前订单无法支付')
        return
    }

    let buyData = {
        addressId: data.delivery.id,

        shopList: merchandise.value.map(x => {
            return {
                id: x.shopId,
                note: x.remarks
            }
        })
    }

    const arr = []
    const favourList = []

    /* 平台优惠券 */
    // if (this.platCoups.grantedId) {
    //     favourList.push(this.platCoups.grantedId)
    // }

    /* 店铺优惠券 */
    for (const i in merchandise.value) {
        for (const n in merchandise.value[i].productList) {
            const item = merchandise.value[i].productList[n]
            arr.push({
                optionDetailId: item.optionId,
                entityId: item.id || null,
                quantity: item.quantity,
                productType: data.type
            })
        }
        if (merchandise.value[i].coupon.id) {
            favourList.push(merchandise.value[i].coupon.grantedId)
        }
        if (data.platCoups.id) {
            favourList.push(data.platCoups.grantedId)
        }
    }

    buyData = {
        ...buyData,
        entityList: arr,
        userRelCouponIds: favourList,
        livePlayId: data?.livePlayId
    }

    console.log('buyData',buyData);
    
    /* 生成订单 */
    submitOrder(buyData).then((res:any)=>{
        uppay(res)
    }).catch((err:any)=>{
        console.log('err1',err);
        
        bcNotify.value.error(err.message)
    })

}

const editNumber = (value: number) => {
    if (!Number.isInteger(value)) {
        bcNotify.value.error('请输入正整数!')
        return
    }
    initChoice();
    calculationPrice();
    
    

}

const showfast = () => {
    // 查询物流

}

const getAdreList = () => {
    // 获取地址
    getAddressList().then((res:any)=>{
        if (res.length <= 0) { return }
        for (const i in res) {
            if (res[i].isDefault == 1) {
                data.delivery = res[i]
                return
            }
        }
    })
}

// 店铺优惠券
const getShopCouponList = (item:any, index:number, isInit: boolean = false) => {

    let money = 0
    const merchitem = merchandise.value[index]
    const itemList = merchitem.productList.map((x:any) => {
        money += x.price * x.quantity
        return x.itemId
    })

    getCouponGranted({
        pay: money,
        itemId: itemList,
        canUse: 1,
        applyId: 3
    }).then((res:any)=>{

        console.log('优惠券res',res);
        data.couparrList[0] = res
        data.grantList = res
        if (!res.length) {
            nextTick(()=>{
                isInit ? initgetCoupon(index) : getCoupon(index)
            })
            return
        }
        
        nextTick(()=>{
            isInit ? initgetCoupon(index) : getCoupon(index)
        })
    })

}

// 通用优惠券
const getPingCouponList = (isInit: boolean = false) => {
    
    // 使用店铺优惠券前价格
    let money = 0
    const itemIds = [] as any
    merchandise.value.map((shop:any) => {
        return shop.productList.map((serve:any) => {
            money += serve.price * serve.quantity
            itemIds.push(serve.itemId)
        })
    })

    // data.calculationObj.paidAmount 使用店铺优惠券计算后价格

    console.log('data.calculationObj.paidAmount',data.calculationObj.paidAmount);

    getPlatCoupon({
        // 若选用了通用优惠券就传店铺优惠前价格 没有选用就选店铺优惠后价格
        pay: data.platCoupsCheckList.length != 0 ? money : data.calculationObj.paidAmount,
        categoryId: 3,
        canUse: 1,
        itemId: itemIds
    }).then((res:any)=>{
        data.platCoupsList = res
        
        if (!res.length) {
            nextTick(()=>{
                isInit ? initgetcurrencyCoupon() : getcurrencyCoupon(0)
            })
            return
        }

        nextTick(()=>{
            isInit ? initgetcurrencyCoupon() : getcurrencyCoupon(0)
        })

    })
}

// 获取订单价格
const calculationPrice = (isInitCoupon:boolean = false) => {
    const arr = []
    const favourList = []

    // if (data.platCoups.grantedId) {
    //     favourList.push(data.platCoups.grantedId)
    // }

    for (const i in merchandise.value) {
        for (const n in merchandise.value[i].productList) {
            const item = merchandise.value[i].productList[n]
            arr.push({
                quantity: item.quantity,
                optionDetailId: item.optionId,
                productType: item.productTypeId

            })
        }
        if (merchandise.value[i].coupon.id) {
            favourList.push(merchandise.value[i].coupon.grantedId)
        }
        if (data.platCoups.id) {
            favourList.push(data.platCoups.grantedId)
        }
    }


    const goodsdata = { entityList: arr, userRelCouponIds: favourList }

    goodsCalculation(goodsdata)
        .then((res:any) => {
            data.calculationObj = res

            if (isInitCoupon && data.platCoupsCheckList.length == 0) {
                console.log('初始化获取优惠券');
                // 需要默认选中店铺优惠券算出价格后再进行默认选中通用优惠券
                getPingCouponList(true)

            }

        })
        .catch((err) => {
            console.log('err2',err);
            
            nextTick(()=>{
                bcNotify.value.error(err.message);
                refCoup.value.closeCpup();

                // 优惠券冲突或者价格异常 统一初始化通用优惠券选择
                data.platCoups = {}
                data.platCoupsCheckList = []
                calculationPrice()
                // setTimeout(() => {
                //     pageController.back()
                // }, 2000)
            })
        })
        .finally(() => {
            uni.hideLoading()
        })
}


const uppay = (orderId:string) => {
    uni.showLoading({
        title: '调起支付',
        mask: true
    })
    const openid = uni.getStorageSync('openid')

    console.log('openid', openid);
    

    /* 获取支付参数 */
    houseOrderPay({ 
        orderId, 
        openid: openid != '' ? openid : undefined,
        subAppId: 'wxba2158972baec41b',
        subopenId: openid,
    }).then(async (res:any) => {
        console.log('支付参数res',res);
        
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
            // bcNotify.value.error('支付失败')
            setTimeout(() => {
                toOrderDetail(res.orderId)
            }, 800);
        })
        // #endif
    }).catch((err) => {
        console.log('err3',err);
        
        bcNotify.value.error(err.message);
    }).finally(() => {
        uni.hideLoading()
    })
}


const toOrderDetail = (id:string) => {
    GoodsOrderDetail(id,true)
}


onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(props.uniqueId).then((res:any) => {
        data.livePlayId = res?.livePlayId
        res.isCart === 1 ? getCarPurchase(res.listData) : getGodsPurchase(res)
        if (res.adresMation) {
            // 携带地址
            data.delivery = res.adresMation
            return
        }
        getAdreList()
        tempStorage.clear()
    }).catch(() => {
        bcNotify.value.error('订单获取失败')
        setTimeout(() => {
            pageController.back()
        }, 1000)
    })

    addWEventsListener(CareEvents.Get__Address, (res) => {
        data.delivery = res
    })
})

// 购物车结算
const getCarPurchase = (list:any) => {
    console.log('购物车结算',list)
    cartPurchase({
        entityIds:list
    }).then((res:any) => {
        merchandise.value = res.shopList.map((x:any) => {
            return {
                ...x,
                remarks: '',
                coupon: {}
            }
        })

        data.showPage = true

        initChoice();
        calculationPrice();
        
    })
    
}

// 商品直接结算
const getGodsPurchase = ({optionDetailId, shopName, quantity, shopIcon, type}) => {
    data.type = type
    goodsPurchase({
        optionDetailId,
        productType: type
    }).then((res:any)=>{

        merchandise.value = [{
            shopId: res.product.shopId,
            shopName,
            title: res.product.name,
            shopIcon,
            remarks: '',
            productList: [
                {
                    itemId: res.product.id,
                    optionId: res.option.id,
                    subtitle: res.option.name,
                    image: res.option.thumb,
                    quantity,
                    price: res.option.price,
                    productTypeId: res.option.productTypeId
                }
            ],
            coupon: {}
        }]

        data.showPage = true

        initChoice();
        calculationPrice();

    }).catch((err:any) => {
        console.log('err4',err);
        
        nextTick(()=>{
            bcNotify.value.error(err.message);
            setTimeout(() => {
                pageController.back()
            }, 2000)
        })
    })

} 

// 初始化获取优惠券
const initChoice = () => {
    merchandise.value.forEach((item:any,index:number) => {
        getShopCouponList(item,index,true)
    })
    

}




// 优惠券弹窗
const getCoupon = (index:number) => {
    if (!data.couparrList.length) {
        bcNotify.value.show('暂无优惠券')
        return
    }
    refCoup.value.openCpup(index)
}

// 初始化获取优惠券
const initgetCoupon = (index:number) => {
    refCoup.value.InitCpup(index)
}


// 通用优惠券弹窗
const getcurrencyCoupon = (index:number) => {
    if (!data.platCoupsList.length) {
        bcNotify.value.show('暂无优惠券')
        return
    }
    refcurrency.value.openCpup(index)
}


// 初始化获取通用优惠券
const initgetcurrencyCoupon = () => {
    refcurrency.value.InitCpup()
}


// 选中优惠券
const selectCoup = (index:number,item:any, isInitCoupon: boolean = false) => {

    let newArr = merchandise.value
    newArr[index] = reactive({
        ...newArr[index],
        coupon:{
            ...item
        }
    })
    
    merchandise.value = [...newArr]

    updateKey.value += 1 

    // 处理默认选中的优惠券
    if (item) {
        data.grantCoupsList.splice(0,1,item.grantedId)
    }else{
        data.grantCoupsList = []
    }
    
    calculationPrice(isInitCoupon)

}

const setcurrencyCoupon = (index:number,item:any) => {
    // 处理默认选中的通用优惠券
    if (item) {
        data.platCoups = item  
        data.platCoupsCheckList.splice(0,1,item.grantedId)

    }else{
        data.platCoups = {}
        data.platCoupsCheckList = []
    }

    calculationPrice()

}

</script>
  
<style lang="scss" scoped>
.conbox{
    padding: 20rpx;
}
.locus-box{
    background: #FFFFFF;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    position: relative;

    .locus-con{
        padding: 40rpx 30rpx;

        .locus-icon{
            width: 52rpx;
            height: 52rpx;
            margin-right: 16rpx;
            flex-shrink: 0;
        }

        .locus-rig{
            flex: 1;

            .locus-info{
                .locus-name{
                    font-size: 28rpx;
                    font-weight: bold;
                    line-height: 40rpx;
                    color: #333333;
                }
                .locus-desc{
                    font-size: 24rpx;
                    font-weight: 400;
                    line-height: 32rpx;
                    color: #666666;
                    margin-top: 8rpx;
                }
                .locus-sele{
                    font-size: 28rpx;
                    font-weight: 400;
                    line-height: 40rpx;
                    color: #666666;
                }
            }

            .locus-edit{
                width: 92rpx;
                height: 48rpx;
                border: 2rpx solid #EEEEEE;
                border-radius: 24rpx;
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 48rpx;
                color: #666666;
                text-align: center;
                margin-left: 38rpx;
                flex-shrink: 0;
            }
        }
    }

    .locus-line{
        width: 100%;
        height: 6rpx;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}

.bala-ord-li{
    padding: 0 30rpx 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    margin: 20rpx 0rpx;

    .bala-ord-head{
        // margin-bottom: 40rpx;
    }
    .bala-ord-shop{
        padding: 30rpx 0 24rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;

        view{
            margin-left: 8rpx;
        }
        .balaordshopImg{
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
        }
    }

    .bala-ord-info{
        padding-top: 30rpx;


        .bala-ord-img{
            margin-right: 28rpx;
            flex-shrink: 0;
            .balaordimg{
                width: 152rpx;
                height: 152rpx;
                border-radius: 16rpx;
            }
        }

        .bala-ord-rig{
            flex: 1;

            .bala-ord-tit{
                font-size: 32rpx;
                font-weight: bold;
                color: #333333;
                margin-bottom: 4rpx;
            }
            .bala-ord-spec{
                font-size: 28rpx;
                font-weight: 400;
                color: #999999;
            }
            .bala-ord-pice{
                margin-top: 16rpx;
                font-size: 34rpx;
                font-weight: bold;
                color: #FC3848;
            }
            .bala-ord-num{
                font-size: 28rpx;
                font-weight: 400;
                color: #999999;

                input{
                    background-color: rgba(0,0,0,0) !important;
                }
            }
        }
    }

    .bala-ord-handle{
        margin-top: 40rpx;

        .bala-handle-tit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
        }

        .bala-handle-tex{
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
            margin-right: 16rpx;
        }
    }

    

    .bala-handle-tarea{
        flex: 1;
        margin-top: 20rpx;
        padding: 20rpx;
        border: 1rpx solid #F2F2F2;
        border-radius: 12rpx;
        height: 120rpx;
        font-size: 30rpx;
    }
    .bala-handle-input{
        flex: 1;
        // padding: 20rpx;
        // border: 1rpx solid #F2F2F2;
        border-radius: 12rpx;
        font-size: 30rpx;
        text-align: right;
        margin-left: 20rpx;
    }
}
.currency_Coupons{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 24rpx;
    background: #FFFFFF;
    padding: 30rpx;
    box-sizing: border-box;
    .currency_title{
        font-weight: 600;
        font-size: 30rpx;
        color: #333333;
    }
    .currency_text{
        font-weight: 400;
        font-size: 28rpx;
        color: #666666;
        display: flex;
        align-items: center;
        .bala-mon-pref{
            color: #FC3848;
            margin-right: 12rpx;
        }
    }
}

.bala-money{
    padding: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;
    margin-top: 20rpx;

    .bala-mon-tit{
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        // margin-bottom: 40rpx;
    }


    .bala-mon-all{
        padding-top: 28rpx;
        border-top: 1rpx solid #F2F2F2;
        justify-content: flex-end;

        .bala-all-tit{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            margin-right: 18rpx;
        }

        .bala-all-num{
            font-size: 34rpx;
            font-weight: bold;
            color: #F50606;
        }
    }
}
.bala-mon-li{
    // margin-top: 40rpx;

    .bala-mon-name{
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
    }
    .bala-mon-nun{
        font-size: 30rpx;
        font-weight: 400;
        color: #999999;
        margin-left: 16rpx;
    }
    .bala-mon-price{
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
    }
    .bala-mon-pref{
        font-size: 28rpx;
        font-weight: 400;
        color: #F50606;
    }
}

// 步进器自定义样式
.minus {
    width: 62rpx;
    height: 56rpx;
    background: #F5F5F5;
    border-radius:56rpx 0 0 56rpx;
    justify-content: center;
    align-items: center;

    &.forbid{
        background-color: #F5F5F5;
    }
}

.input {
    padding: 0 8px;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
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
.page_space{
    width: 100%;
    height: 300rpx;
}
</style>
  