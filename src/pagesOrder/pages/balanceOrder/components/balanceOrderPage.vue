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
                    <view class="service_time" v-if="consumerTime && ![65795,65796].includes(data.optionMation.templateCode)">
                        <!-- 服务时间\备注 -->
                    <serviceTime @inpbur="inpbur" ref="timeRef"></serviceTime>
                    </view>
                         <!-- 价格明细  -->
                    <!-- <view class="price_infoBox"  v-if="handle == 1"> -->
                        <!-- :showInfo="data.showInfo" -->
             <!-- 跑腿类 -->
             <view v-if="[65795,65796].includes(data.optionMation.templateCode)">
                <view class="bala_box">
                    <view class="bala_tit">服务确认</view>
                    <view class="bala_cel bala_cel_bod row j-btween" @click="selectHosp">
                        <view class="bala_cel_tit">就诊医院</view>
                        <view class="bala_cel_inp" v-if="data.hospital.name" style="margin-right:12rpx">{{ data.hospital.name }}</view>
                        <view class="bala_cel_inp" v-else style="margin-right:12rpx;color:#BCBCBC;">请选择就诊医院</view>
                        <u-icon name="arrow-right" color="#BEBEBE" size="34rpx"></u-icon>
                    </view>
                    <view class="bala_cel row j-between" v-if="informationVisi">
                        <view class="bala_cel_tit">就诊人</view>
                        <view class="bala_cel_inp">
                            <TnInput v-model="data.archivesName" text-align="right" size="sm" color="#BCBCBC" :border="false"   placeholder="请输入就诊人" clearable></TnInput>
                        </view>
                    </view>
                    <view class="bala_cel row j-between" v-if="informationMobile">
                        <view class="bala_cel_tit">就诊人电话</view>
                        <view class="bala_cel_inp">
                            <TnInput
                                v-model="data.mobile"
                                text-align="right" size="sm"
                                :border="false"
                                :maxlength="11"
                                placeholder="请输入就诊人电话"
                                clearable
                                type="number"
                            ></TnInput>
                        </view>
                    </view>
                    <view></view>
                    <view class="visitor_box" @click="data.openDateTimePicker = true">
                     <view class="visitor_box_title">就诊时间</view>
                        <view class="more_box">
                        <view class="more_text">{{ data.startTime || '选择' }}</view>
                        <TnIcon name="right" color="#999999" size="24"></TnIcon>
                         </view>
                     </view>
                    <view class="bala_cel bala_cel_nt">
                        <view class="bala_cel_note" v-if="data.startTime" style="color:#3E9FFF;">预约成功后陪诊人员将会与您确认具体的服务时间</view>
                        <view class="bala_cel_note" v-else style="color:#3E9FFF;">联系人信息、备注为非必填信息，如有需要请按实际情况填写</view>
                    </view>

                    <!-- 陪诊类 -->
                     <!-- <template> -->
                        <view class="bala_cel row j-between" @click="getAdres" v-if="contactVisi">
                            <view class="bala_cel_tit">联系人信息</view>
                            <view class="bala_cel_inp row i-center" style="justify-content: flex-end;">
                                <view v-if="data.location.id">{{ data.location.name }} {{ data.location.mobile}}</view>
                                <view v-else style="color:#BCBCBC;">请选择联系人</view>
                                <TnIcon name="arrow-right" color="#BEBEBE" size="34rpx"></TnIcon>
                            </view>
                        </view>
                    <!-- </template> -->

                    <!-- 跑腿类 -->
                     <template v-if="data.optionMation.templateCode == 65796">
                        <view class="bala_cel row j-between" @click="data.deliveryShow = true">
                            <view class="bala_cel_tit">代送方式</view>
                            <view class="bala_cel_inp row i-center" style="justify-content: flex-end;">
                                <view v-if="data.method.id">{{ data.method.label }}</view>
                                <view v-else>请选择</view>
                                <TnIcon name="arrow-right" color="#BEBEBE" size="34rpx"></TnIcon>
                            </view>
                        </view>
                        <view class="bala_cel row j-between" @click="getAdres">
                            <view class="bala_cel_tit">配送地址</view>
                            <view class="bala_cel_inp row i-center" style="justify-content: flex-end;text-align:right;">
                                <view v-if="data.location.id">
                                    <view>{{ data.location.name }} {{ data.location.mobile }}</view>
                                    <view>{{ data.location.area }} {{ data.location.address }}</view>
                                </view>
                                <view v-else>请选择</view>
                                <TnIcon name="arrow-right" color="#BEBEBE" size="34rpx"></TnIcon>
                            </view>
                        </view>
                        <view class="bala_cel">
                            <!-- <view class="bala_cel_tit">代送凭证</view>
                            <view class="bala_cel_tip">请截图或拍照医院取药凭证、电子就诊卡、电子处方单等资料</view>
                            <view class="bala_cel_inp" style="margin-left:0;">
                                <UploadLayout
                                    @change="handleChange"
                                    :maxCount="9"
                                    width="60px"
                                    height="60px"
                                    v-model="fileList1"
                                    uploadPath="errand"
                                    uploadIcon="plus"
                                />
                            </view> -->
                    <imgUpload v-model:imageArr="data.fileList1" :limit="3" ref="imgUploadref">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="bala_cel_tit">代送凭证</view>
                                <view class="bala_cel_tip">请截图或拍照医院取药凭证、电子就诊卡、电子处方单等资料</view>
                            </view>
                        </template>
                    </imgUpload>
                </view>
                    </template>

                    <view class="bala_cel row j-between">
                        <view class="bala_cel_tit">备注信息</view>
                        <view class="bala_cel_inp">
                            <TnInput v-model="data.remark" size="sm" placeholder="请输入备注信息" text-align="right" :border="false" clearable />
                        </view>
                    </view>
                </view>
            </view>

             <!-- 价格结算面板 -->
            <view class="bala_box balanceNures">
                <view class="bala_tit">价格明细</view>
                <view class="bala_mation row j-between">
                    <view class="bala_mation_tit">服务价格</view>
                    <view class="bala_mation_des">￥ {{ moneyFilter(data.calculationInfo.amount)}}</view>
                </view>
                <view class="bala_mation row j-between" @click="gainShopCouponList">
                    <view class="bala_mation_tit">店铺优惠</view>
                    <view class="bala_mation_des">{{ data.calculationInfo.couponName || '' }}</view>
                    <view class="row i-center">
                        <view class="bala_mation_des row i-center" style="margin-right: 10rpx">
                            <view class="bala-mon-pref bala-mon-red" v-if="data.shopCoupon.cfgOffer">
                                <template v-if="!isRebate(data.shopCoupon.typeId)">￥{{data.shopCoupon.cfgOffer }}</template>
                                <template v-else>{{discountFilter(data.shopCoupon.cfgOffer)}}折</template>
                            </view>
                            <view class="bala-mon-pref">{{!data.shopCoupList ? '暂无优惠' : '更多优惠'}}</view>
                        </view>
                        <TnIcon v-if="data.shopCoupList" name="arrow-right" size="30rpx" color="#999999"></TnIcon>
                    </view>
                </view>
                <view class="bala_mation row j-between" @click="getPingCouponList">
                    <view class="bala_mation_tit">平台优惠</view>
                    <view class="bala_mation_des">{{ data.calculationInfo.couponName || '' }}</view>
                    <view class="row i-center">
                        <view class="bala_mation_des row i-center" style="margin-right: 10rpx">
                            <view class="bala-mon-pref bala-mon-red" v-if="data.platCoups.cfgOffer">
                                <template v-if="!isRebate(data.platCoups.typeId)">￥{{data.platCoups.cfgOffer ? moneyFilter(data.platCoups.cfgOffer) : 0}}</template>
                                <template v-else>{{discountFilter(data.platCoups.cfgOffer)}}折</template>
                            </view>
                            <view class="bala-mon-pref">{{!data.platCouList ? '暂无优惠' : '更多优惠'}}</view>
                        </view>
                        <u-icon v-if="data.platCouList" name="arrow-right" size="30rpx" color="#999999"></u-icon>
                    </view>
                </view>
                <view class="bala_mation row j-between">
                    <view class="bala_mation_tit">需付款</view>
                    <view class="bala_mation_des">￥{{ moneyFilter(data.calculationInfo.paidAmount)}}</view>
                </view>
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

                    <view class="bala_box" v-if="data.agencyObj.typeId == 1">
                        <view class="play_notice">购买须知</view>
                        <view class="play_text">退款规则：随时退，过期退</view>
                    </view>

                    <div class="voucher_Notice" v-if="data.agencyObj.typeId == 2">
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
                            <div class="voucher_Notice_days">{{data.agencyObj.isRestrictTime == 0 ? '全部时间可用' : data.agencyObj.restrictTimeDesc }}</div>
                        </div>
                        <div class="voucher_Notice_row">
                            <div class="voucher_Notice_period">
                                <image class="device_icon" :src="getAssetsUrl('/leyou/static/voucherAddres.svg')" mode="scaleToFill" />
                                <div>适用范围</div>
                            </div>
                            <div
                                class="voucher_Notice_days"
                            >{{ data.agencyObj.range == 0 ? '通用' : data.agencyObj.range == 1 ? `适用${data.agencyObj.rangeData}` : data.agencyObj.range == 2 ? `不适用${data.agencyObj.rangeData}` : '' }}</div>
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
                            <div class="voucher_Notice_days">·每人最多购买{{`${data.agencyObj.isRestrictBuyQuantity == 0 ? '不限制数量' : `${data.agencyObj.restrictBuyQuantity}`}`}}张</div>
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
              <!-- 优惠券 coupon-->
            <choiceCoupon ref="recCoup" @getGroup="selectCoupon" :list="data.grantList" :coupsList="data.coupsList" />
            <TnDateTimePicker mode="datetime" v-model="data.startTime" v-model:open="data.openDateTimePicker" />
            <yk-authpup ref="authpupRef" type="top" :isNativeHead="false" @changeAuth="map" permissionID="ACCESS_FINE_LOCATION" :animation="false"></yk-authpup>
    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import imgUpload from '@/components/upload/img-upload.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import { moneyFilter, discountFilter } from "@/common/filters"
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { TempStorage } from "@bc/base"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import balanceInfo from "./balanceInfo.vue"
import agencyCardInfo from "./agencyCardInfo.vue"

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { addWEventsListener } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'
import { getAddressList } from '@/api/goods-api'
import choiceCoupon from './choiceCoupon.vue'
import visitorInformation from './visitor-information.vue'
import serviceAddress from './service-address.vue'
import { getCouponGranted, getPlatCoupon, getCalculation } from '@/api/care-api'
import serviceTime from './service-time.vue'
import { orderEntityConfig, cartEntityConfig, getBaseInfo, createOrder, cardCreateOrder, getOrderEntityConfig, houseOrderPay } from "@/api/order-api"
import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { packPayment } from '@/libs/pay/pay-tools'
import { gotoAddressList } from '@/routes/user-routes'
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
    deliveryShow:boolean,
    uniqueId:any,
    showInfo:boolean,
    balanceInfoObj:any,
    consumerAttr:any,
    coupsList:any,
    archives:any, //照护人信息
    location:any, //地址信息
    calculationInfo: any //支付信息
    carId: string
    optionMation: any, //照护服务信息
    serviceRules: any, //下单时间规则
    optionUnit: number, //下单时间单位
    quantity:number,
    archivesName:string,
    platCoups:any, //平台优惠券
    remark:string, //备注
    ismany:boolean,
    ischeck:boolean,
    grantList: any, //优惠券选择列表
    agencyObj:any, // 康养详情
    preferential:number,
    startTime:any,
    shopCoupList: any, //店铺优惠券列表
    shopCoupon:any, //店铺优惠券
    platCouList: any, //平台优惠券列表
    hospital: any, //医院信息
    shopId: string,
    fileList1:any,
    mobile:string,
    openDateTimePicker:boolean,
    method: any, //配送方式
    couponIdx: number, //-1平台优惠 1店铺优惠
    institutionitemId:string

}
const data = reactive<Data>({
    openDateTimePicker: false,
    hospital: {},
    fileList1: [],
    startTime: '',
    mobile: '',
    method: {},
    deliveryShow: false,
    shopId: '',
    platCouList: [], //平台优惠券列表
    shopCoupon: {}, //当前选中的店铺优惠信息
    couponIdx: 0, //-1平台优惠 1店铺优惠
    showInfo: true,
    archivesName: '',
    platCoups: {}, //当前选中的平台优惠信息
    showPage: false,
    uniqueId: '',
    shopCoupList: [], //店铺优惠券列表
    coupsList: ['', ''], //已选择的优惠券列表
    grantList: [], //优惠券选择列表
    balanceInfoObj: {},
    consumerAttr: [],
    optionMation: {},
    archives: {},
    location: {},
    calculationInfo: {},
    carId: '',
    ischeck: false, // 勾选
    serviceRules: {},
    optionUnit: 2, //下单时间单位
    quantity: 1,
    remark: '',
    ismany: false,
    agencyObj: {},
    preferential: 0,
    institutionitemId: ''
})
const imgUploadref = ref()
const bcNotify = ref()
const recCoup = ref()
const addressRef = ref()
const visitorRef = ref()

const timeRef = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})
const getSerTime = (e:any) => {
    data.startTime = e
}
const authpupRef = ref()
const selectHosp = () => {
    // #ifdef APP-PLUS
    authpupRef.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    // #endif
    // #ifndef APP-PLUS
    map()
    // #endif
}
/* 选择地址 or 选择联系人 */
const getAdres = (type = 0) => {
    const req = {}
    // type === 1 && (req.shopId = data.baseInfo.id)
    gotoAddressList()
}

const openUp = () => {
    nextTick(() => {
        console.log('手动调用', imgUploadref, imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}
// 优惠券初始状态
const copuInit = {
    cfgOffer: 0,
    grantedId: "",
    typeName: "请选择优惠券",
    typeId: 0,
    id: 0
}
const getCouponType = (typeId) => {
    const cpuponTypeList = [1000004, 1000002, 10004, 10002, 100002, 100004]
    return cpuponTypeList.includes(typeId)
}
const map = () => {
    uni.chooseLocation({
        keyword: '医院',
        success: (res) => {
            data.hospital = res
        },
        fail: (err) => {
            console.log(err)
            bcNotify.value.show('暂无优惠券')
        }
    })
}
const isRebate = (typeId) => {
    return getCouponType(typeId)

}
// 是否存在就诊人信息配置
const showvisitor = computed(() => {
    return ![65795, 65796].includes(data.optionMation.templateCode) && exist("visitor_information")
})
// 是否存在服务地址
const showaddress = computed(() => {
    return exist("service_address")
})
// 是否存在服务时间
// const showtime = computed(() => {
//     return exist("service_time")
// })
/* 否需要提交/渲染 就诊人信息 !陪诊 */
const consumerVisi = computed(() => {
    return ![65795, 65796].includes(data.optionMation.templateCode) && exist('visitor_information')
})
/* 否需要提交/渲染 就诊人 陪诊 */
const informationVisi = computed(() => {
    return [65795, 65796].includes(data.optionMation.templateCode) && exist('visitor_information')
})
/* 是否需要提交/渲染 就诊/服务时间 */
const consumerTime = computed(() => {
    return exist('service_time')
})
/* 否需要提交/渲染 服务地址 */
const consumerAdrs = computed(() => {
    return exist('service_address')
})
/* 否需要提交/渲染 就诊人电话 陪诊 */
const informationMobile = computed(() => {
    return [65795].includes(data.optionMation.templateCode)
})
/* 否需要提交/渲染 医院地址 */
const hospitalVisi = computed(() => {
    return exist('hospital_address')
})
/* 否需要提交/渲染 寄送方式 */
const methodVisi = computed(() => {
    return exist('delivery_method')
})
/* 否需要提交/渲染 配送地址 */
const deliveryVisi = computed(() => {
    return exist('delivery_address')
})
/* 否需要提交/渲染 凭证 */
const certificateVisi = computed(() => {
    return exist('delivery_certificate')
})
/* 否需要提交/渲染 联系人 */
const contactVisi = computed(() => {
    return exist('contact_info')
})
// 备注提示信息 住院照护/陪诊服务
const promptText = computed(() => {
    return [65800, 65795].includes(data.optionMation.templateCode) ? '请填写患者相关病情' : '请填写注意事项'
})
// 照护人是否合适
const isImproper = computed(() => {
    return data.archives.estimateGradeCategoryIds && !data.archives.estimateGradeCategoryIds.includes(data.optionMation.categoryId)
})
// 照护人是否评估
const isAssess = computed(() => {
    return data.archives.id && !data.archives.estimateGradeCategoryIds
})
// 优惠券弹窗
const showCoupon = () => {
    if (data.grantList.length == 0) {
        bcNotify.value.show('暂无优惠')
        return
    }
    recCoup.value.openCpup()
}
// 店铺优惠券列表
const initGetCouponGranted = () => {
    return getCouponGranted({
        pay: data.optionMation.optionPrice * data.quantity,
        itemId: [data.optionMation.itemId],
        canUse: 1,
        applyId: 2
    })
}
// 优惠价格大于订单价格，重置优惠券选择
const resetCoupon = () => {
    if (data.couponIdx == -1) {
        data.coupsList.splice(data.coupsList.indexOf(data.platCoups.grantedId), 1)
        data.platCoups = { ...copuInit }
    }
    else {
        data.coupsList.splice(data.coupsList.indexOf(data.shopCoupon.grantedId), 1)
        data.shopCoupon = { ...copuInit }
    }
}
/* 计算价格 */
const calculation = () => {
    const userRelCouponIds:any = []

    data.platCoups.grantedId && userRelCouponIds.push(data.platCoups.grantedId)

    data.shopCoupon.grantedId && userRelCouponIds.push(data.shopCoupon.grantedId)

    console.log('计算价格', data.platCoups.grantedId, data.shopCoupon.grantedId)

    // 没有优惠券 使用初始化的值
    /* if (!userRelCouponIds.length) {
                return Promise.resolve({
                    amount: this.optionMation.optionPrice,
                    couponName: '',
                    discountAmount: 0,
                    paidAmount: this.optionMation.optionPrice
                })
            } */

    return getCalculation({
        entity: {
            quantity: data.quantity,
            optionId: data.optionMation.optionId
        },
        userRelCouponIds
    })
}
// 选取优惠券
const getGroup = (e, state) => {
    let couponDetail = { ...copuInit }
    if (state) {
        couponDetail = {
            ...couponDetail,
            ...e
        }
        // this.coupsList.push(e.grantedId)
        if (data.couponIdx === -1) {
            data.coupsList.splice(0, 1, e.grantedId)
        }
        else {
            data.coupsList.splice(1, 1, e.grantedId)
        }

    }
    else {
        data.coupsList.splice(data.coupsList.indexOf(e.grantedId), 1, '')
    }
    if (data.couponIdx === -1) {
        data.platCoups = couponDetail
    }
    else {
        data.shopCoupon = couponDetail
    }


    return calculation()
}
const selectCoupon = (e, state) => {
    getGroup(e, state).then(res => {
        data.calculationInfo = res
    }).catch(err => {
        bcNotify.value.show(err.message)
        resetCoupon()
    })
}

/* 平台优惠券 */
const getPingCouponList = (type) => {
    if (data.platCouList === null && !type) {
        bcNotify.value.show('暂无优惠券')
        // this.$refs.uToast.error('暂无优惠券')
        return
    }
    getPlatCoupon({
        pay: data.optionMation.optionPrice * data.quantity,
        categoryId: data.optionMation.categoryId,
        canUse: 1,
        itemId: [data.optionMation.itemId]
    }).then(res => {
        data.platCouList = res.length ? res : null
        data.grantList = res
        data.couponIdx = -1

        if (type === 1) {
            console.log('没有店铺优惠券', res.length)
            if (res.length == 0) {
                getGroup(copuInit, false).then(res => {
                    data.calculationInfo = res
                }).catch(() => {
                    resetCoupon()
                })
                return
            }
            return getGroup(res[0], true).then(res => {
                data.calculationInfo = res
            }).catch(err => {
                !type && bcNotify.value.show(err.message)
                resetCoupon()
            })
        }
        showCoupon()
    })
}
// 获取店铺优惠券
const gainShopCouponList = (type:number) => {
    if (type == 1) {
        data.platCoups = copuInit
        data.shopCoupon = copuInit
    }
    if (data.shopCoupList === null && !type) {
        // this.$refs.uToast.error('暂无优惠券')
        return Promise.resolve('暂无优惠券')
    }
    return initGetCouponGranted().then(res => {
        data.shopCoupList = res.length ? res : null
        data.grantList = res
        data.couponIdx = 1
        if (type === 1) {
            console.log('this.grantList.length', data.grantList.length)
            if (data.grantList.length == 0) {
                // this.getGroup(copuInit, false)
                // 获取完店铺优惠，获取平台优惠
                getPingCouponList(1)
                return
            }
            return getGroup(res[0], true).then(res => {
                data.calculationInfo = res
                if (type === 1) {
                    // 获取完店铺优惠，获取平台优惠
                    getPingCouponList(1)
                }
            }).catch(err => {
                !type && bcNotify.value.show(err.message)

                resetCoupon()
            })
        }
        showCoupon()
    }).catch(err => {
        bcNotify.value.show(err.message)
    })
}
// 获取普通服务订单需要填写内容
const getEntityConfig = (optionId: any) => {

    getOrderEntityConfig(data.carId ? data.carId : optionId, !!data.carId).then((res: any) => {
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
        data.balanceInfoObj = {
            title: res.item.name,
            quantity: data.quantity,
            optiontitle: res.option.name,
            optionprice: res.option.price,
            servicethumb: res.item.thumb
        }
        // data.optionMation = res.item

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

        data.shopId = res.item.shopId
        getShopDetail(res.item.shopId)
        data.serviceRules = res.item.extend.serviceRules
        data.optionUnit = res.option.extend.serviceWorkingHours.unit
        data.consumerAttr = res.consumerAttr || []
        data.showPage = true

        // res.patient && (data.visitName = res.patient)

        gainShopCouponList(1)


    })
}

// 获取机构订单详情
const gethealthdetail = (id:string) => {
    healthdetail({
        id
    }).then((res:any) => {
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
    }).then((res:any) => {
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
    console.log(val)
}
const showError = (message) => {
    bcNotify.value.show(message)
}
// 校验必填项
const dataCheck = (check, message) => {
    // 服务可以多次使用并且勾选上立即使用
    if (data.ismany && data.ischeck) {
        if (check) {
            showError(message)
            return true
        }
        // 服务不是多次使用
    }
    else if (!data.ismany) {
        if (check) {
            showError(message)
            return true
        }
    }
    return false
}
const placeOrder = () => {
    // 调用子组件的属性
    if (showaddress.value && !addressRef.value?.data?.location) {
        bcNotify.value.show('请选择地址')
        return
    }
    if (!timeRef.value?.datetime && !data.startTime) {
        bcNotify.value.show('请选择上门时间')
        return
    }
    if (showvisitor.value && !visitorRef.value?.data?.archives.id) {
        bcNotify.value.show('请选择照护人')
        return
    }
    if (dataCheck(consumerVisi.value && data.archives.id, '请选择被照护人') ||
                dataCheck(consumerAdrs.value && !data.location?.id, '请选择地址') ||
                dataCheck(consumerTime.value && !data.startTime, '请选择时间') ||
                // dataCheck(hospitalVisi.value && !data.hospital.name, '请选择医院') ||
                dataCheck(methodVisi.value && !data.method.id, '请选择寄送方式') ||
                dataCheck(deliveryVisi.value && !data.location?.id, '请选择配送地址') ||
                dataCheck(certificateVisi.value && !data.fileList1.length, '请上传代送凭证') ||
                dataCheck(informationVisi.value && !data.archivesName, '请输入就诊人姓名') ||
                dataCheck(contactVisi.value && !data.location?.id, '请选择联系人') ||
                dataCheck(informationMobile.value && !data.mobile, '请输入就诊人电话')) {
        return
    }

    const location = addressRef.value?.data?.location
    const datetime = new Date(timeRef.value?.datetime ? timeRef.value?.datetime : data.startTime).getTime()
    const archives = visitorRef.value?.data?.archives

    // console.log('location',location);
    // console.log('datetime',datetime);
    // console.log('archives',archives);


    uni.showLoading({
        title: '正在下单',
        mask: true
    })

    const userRelCouponIds = [] as string[]

    console.log('data.optionMation', data.optionMation)


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
        contact: contactVisi.value ? {
            smsCode: 996, //短信（已废弃，写死为 996 ）
            mobile: data.location.mobile,
            person: data.location.name
        } : null,
        // 拓展信息
        attr: {
            utcVisitStart: datetime / 1000, //上门时间/就诊时间

            addressId: showaddress.value || deliveryVisi ? location?.id || data.location.id : null, //地址id
            patientId: showvisitor.value ? archives?.id : 0, //老人档案ID，只有居家照护需要填写照护人

            /* todo */
            hospitalId: null, //医院id


            hospital: hospitalVisi.value ? data.hospital.id ? null : {
                name: data.hospital.name,
                address: data.hospital.address,
                lat: data.hospital.latitude,
                lng: data.hospital.longitude
            } : null,

            patient: informationVisi.value ? archives?.name || data.archivesName : null, //就诊人名称
            patientMobile: archives?.mobile ||  data.mobile || null, //就诊人手机号
            deliveryMethod: null, //配送方式 id
            deliveryCertificate: null //代取凭证

        }
    }

    console.log('reqData', reqData)

    /* 生成订单 */
    createOrder(reqData).then((res:any) => {
        uppay(res)
    }).catch(err => {
        bcNotify.value.show(err.message)
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
        bcNotify.value.show(err.message)
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
        subopenId: openid
    }).then(async (res:any) => {
        /* 调起支付 */
        // #ifdef MP-WEIXIN || APP-PLUS
        packPayment(res.payParams).then((ret:any) => {
            console.log("支付结果2222", ret)
            // if (ret.isSuccess && ret.status === 'CPCN') {
            //     setTimeout(() => {
            //         toOrderDetail(res.orderId)
            //     }, 800)
            //     return false
            // }
            // bcNotify.value.success('支付成功');
            setTimeout(() => {
                toOrderDetail(res.orderId)
            }, 800)
        }).catch(() => {
            // bcNotify.value.error('支付失败');
            setTimeout(() => {
                toOrderDetail(res.orderId)
            }, 800)
        })
        // #endif
    }).catch((err) => {
        bcNotify.value.show(err.message)
    }).finally(() => {
        uni.hideLoading()
    })
}

// 跳转订单详情
const toOrderDetail = (id:string) => {
    gotoOrderDetail(id, true)
}


// 获取订单详情
// const getorderEntity = (optionId:string, quantity:number) => {
//     orderEntityConfig({
//         optionId
//     }).then((res:any) => {
//         console.log('订单详情', res)
//         data.balanceInfoObj = {
//             title: res.item.name,
//             quantity,
//             optiontitle: res.option.name,
//             optionprice: res.option.price,
//             servicethumb: res.item.thumb
//         }
//         data.optionMation = res.item
//         data.consumerAttr = res.consumerAttr
//         getShopDetail(res.item.shopId)
//     })
// }
// 获取店铺信息
const getShopDetail = (id:string) => {
    getBaseInfo({
        id
    }).then((res:any) => {
        data.balanceInfoObj = {
            ...data.balanceInfoObj,
            shopname: res.name
        }
        console.log('data', data)
    })
}

// 判断参数是否存在
const exist = (str:string) => {
    const item = data.consumerAttr.find((x:any) => {
        return x.field === str
    })
    return !!item
}
// 修改商品数量(正常服务)
// 监听数量变化
const getquantity = (quantity:number) => {
    uni.showLoading({ title: '正在加载...', mask: true })
    gainShopCouponList(1).then(() => {
        console.log('更改数量')
        // return this.calculation()
    }).then((res) => {
        data.calculationInfo = res
        console.log('计算完成')
    }).finally(() => {
        uni.hideLoading()
    })
    /*  */

    data.quantity = quantity
}


onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(props.uniqueId).then((res:any) => {
        if (props.handle == 1) {
            data.quantity = res.quantity
            // getorderEntity(res.optionId, res.quantity)
            getEntityConfig(res.optionId)
        }
        else {
            res.voucherType == 1 ? getvoucherdetail(res.itemId) : gethealthdetail(res.itemId)
        }
    }).catch(() => {
        bcNotify.value.show('订单获取失败')
        setTimeout(() => {
            pageController.back()
        }, 1000)
    })

    // 监听收货地址选择
    addWEventsListener(CareEvents.Get__Address, (res) => {
        data.location = res
        console.log('data', data.location)
    })


    // 照护人档案
    addWEventsListener(CareEvents.Get__Archives, (data) => {
        data.archives = data
    })
})



</script>

<style lang="scss" scoped>
.visitor_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 24rpx 0;
         &.bottom{
            margin-bottom: 0rpx;
        }
        .visitor_box_title{
            font-size: 32rpx;
            color: #666666;
        }
        .more_box{
            display: flex;
            align-items: center;
            .more_text{
                color: #999999;
                font-size: 28rpx;
                margin-right: 12rpx;
            }
        }
    }
.balanceNures{
    margin-bottom: 100rpx !important;
}
.content{
    padding: 20rpx;
    box-sizing: border-box;
    .balance_info{
        margin-bottom: 20rpx;
    }
    .bala_mation {
        margin-top: 40rpx;

        .bala_mation_tit {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
        }
        .bala_mation_des {
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;

            .bala-mon-red {
                color: #f50606;
                margin-right: 12rpx;
            }
        }
    }

    .bala_note {
        font-size: 24rpx;
        line-height: 30rpx;
        font-weight: 400;
        color: #f50606;
        margin-top: 20rpx;
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
        .bala_tit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        flex-shrink: 0;
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
        .bala_tit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        flex-shrink: 0;
    }
    // 多次使用勾选盒子
    .bala_ned {
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        padding: 16rpx;
        box-sizing: border-box;
    }
    .bala_entry {
        margin: 40rpx 0 10rpx;
        .bala_pic {
            margin-right: 14rpx;
            flex-shrink: 0;
        }
        .bala_more {
            flex: 1;

            .bala_about {
                margin-left: 16rpx;
                .bala_title {
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #333333;
                }
                .bala_price {
                    font-size: 32rpx;
                    font-weight: bold;
                    color: #fc3848;
                    margin-top: 20rpx;
                }
            }
            .bala_option {
                font-size: 28rpx;
                font-weight: 400;
                color: #666666;
                margin-top: 4rpx;
            }
            .bala_offer {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                margin-top: 14rpx;

                text {
                    color: #f88400;
                    height: 46rpx;
                    line-height: 46rpx;
                    background: #fff6e6;
                    border-radius: 10rpx;
                    padding: 0 16rpx;
                    display: inline-block;
                    margin: 0 6rpx;
                    max-width: 300rpx;
                }
            }
        }
    }

    .bala_cel {
        margin-top: 40rpx;
        // align-items: flex-start;
        position: relative;
        &.bala_cel_nt {
            margin-top: 0rpx;
        }
        &.bala_cel_bod {
            margin-bottom: 24rpx;
            // border-bottom: 2rpx solid #F2F2F2;
            // padding-bottom: 28rpx;
        }
        .bala_cel_tit {
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
            &.not {
                color: #bcbcbc;
            }
        }
        .bala_cel_tip {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            margin: 20rpx 0;
        }
        .bala_cel_inp {
            // width: 460rpx;
            flex: 1;
            margin-left: 20rpx;
            font-size: 30rpx;
            color: #666666;
            text-align: right;
        }
        .bala_cel_note {
            flex: 1;
            margin-top: 10rpx;
            font-size: 24rpx;
            color: #3e9fff;
            // padding-top: 28rpx;
            // border-top: 2rpx solid #F2F2F2;
        }
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
