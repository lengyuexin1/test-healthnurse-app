<template>
	<view class="container" v-if="props.order?.id">
		<view class="preferli tn-flex-center-between" :class="{ 'expire': overdue }">
			<view class="preferlef tn-flex-center">
				<view class="preferbox">
                    <view class="preferpic">
                        <template v-if="data.typeList.includes(props.order?.typeId)">
                            <text class="prepictex">{{props.order?.cfgOffer / 100 }}</text>
                            <text class="prepictex unit">折</text>
                        </template>
                        <template v-else>
                            <text class="prepictex unit">￥</text>
                            <text class="prepictex">{{props.order?.cfgOffer / 100 }}</text>
                        </template>
                    </view>
                    <view class="prefertype">{{props.order?.typeName}}</view>
                </view>
                <view style="flex: 1;">
                    <view class="prefername tn-text-ellipsis-1">{{props.order?.name}}</view>
                    <view class="prefrule" v-if="!overdue && props.order?.usageRules" @click="showRule(props.order?.usageRules)">
                        规则<TnIcon name="right" size="24" color="#999999"/>
                    </view>
                    <view class="prefertime tn-text-ellipsis-1">有效期至 {{ timeFormat(props.order?.utcEnd) }}</view>
                </view>
			</view>
			<view class="preferig column" :class="{ 'grey': data.info.status == 0,'welf': !props.is_recive && data.info.status == 1 }">

				<view class="preferbtn" v-if="!props.overdue && !props.is_recive" @click="getCoupon">
					<text class="prefer_b_tex">{{data.statelist[data.info.status]}}</text>
				</view>

				<!-- 已领取的优惠券 -->
				<view class="preferbtn j-center" v-if="!props.overdue && props.is_recive" @click="getCoupon">
					<text class="prefer_b_tex">去使用</text>
				</view>
                <!-- 已失效的优惠券 -->
				<view class="preferbtn j-center" v-if="overdue">
					<text class="prefer_b_tex">去使用</text>
				</view>
			</view>
		</view>
        <TnPopup v-model="data.showRuleDialog" width="80%" close-btn>
            <view class="rulebox">
                <view class="ruletit">使用规则</view>
                <view class="ruletex">{{ data.showRuleText }}</view>
                <view class="rulebtn">
                    <TnButton width="100%" height="70rpx" font-size="28rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="data.showRuleDialog = false">我知道了</TnButton>
                </view>
            </view>
        </TnPopup>
        <TnModal ref="modalRef" />
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import BCNotify from '@/components/notify/index.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnModal from '@tuniao/tnui-vue3-uniapp/components/modal/src/modal.vue'
import type { TnModalInstance } from '@tuniao/tnui-vue3-uniapp/components/modal'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { takeCoupon } from '@/api/user-api'
import { gotoCouponList } from '@/routes/user-routes'
// TODO
// import { gotoAttendShop } from '@/routes/user-routes'
import { gotoIndex } from '@/routes/public-routes'
import { gotoShopDetail } from '@/routes/service-routes'

interface Props {
    category: any,
    overdue: boolean,
    is_recive: boolean,
    order: any
}

interface Data {
    info: any
    statelist: any
    showRuleDialog: boolean
    typeList: any
    showRuleText: string
}

const props = defineProps<Props>()

const data = reactive<Data>({
    info: { ...props.order },
    statelist: {
        0: '未开始',
        1: '已领取',
        10: '领取',
        20: '已结束',
        30: '已关闭'
    },
    showRuleDialog: false,
    typeList: [1000004, 10004, 1000002, 10002],
    showRuleText: ''
})

const bcNotify = ref()

const modalRef = ref<TnModalInstance>()

const getCoupon = () => {
    if (props.is_recive) {
        data.info.shopId > 0 ? gotoShopDetail(data.info.shopId) : gotoIndex()
        return
    }
    if (data.info.status == 1) {
        modalRef.value?.showModal({
            title: '操作提示',
            content: '已领取该优惠券,可前往个人中心查看',
            confirm: () => {
                gotoCouponList()
            }
        })
        return
    }
    takeCoupon({ couponId: props.order.id }).then((res) => {
        bcNotify.value.show('领取成功')
        data.info.status = 1
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const timeFormat = (time: any) => {
    const datetime = dayjs(Number(time * 1000))
    return datetime.format('YYYY-MM-DD HH:mm')
}

const showRule = (str : any) => {
    data.showRuleDialog = true
    data.showRuleText = str
}

</script>

<style lang="scss" scoped>
.preferli {
    border-radius: 16rpx;
    margin-top: 20rpx;
    background: #F3F4F6;

    .preferlef {
        flex: 1;
        height: 170rpx;
        box-sizing: border-box;
        background-color: #FFFFFF;
        border-radius: 24rpx 0 0 24rpx;
        padding: 24rpx 30rpx 28rpx;
        position: relative;

        .prefername{
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
        }

        .prefrule{
            margin-top: 14rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
        }

        .prefertime{
            margin-top: 8rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
        }

        .preferexp{
            width: 160rpx;
            height: 100rpx;
            position: absolute;
            right: 0;
            top: 0;
        }

        .preferbox{
            margin-right: 34rpx;
            .preferpic{
                text-align: center;

                .prepictex{
                    font-size: 34rpx;
                    font-weight: bold;
                    color: #3D3D3D;
                    &.unit{
                        font-size: 30rpx;
                    }
                }
            }

            .prefertype{
                font-size: 24rpx;
                font-weight: 400;
                color: #3D3D3D;
                text-align: center;
                margin-top: 8rpx;
            }
        }

        &::before{
            content: '';
            border-right: 4px dashed #EDEEF2;
            width: 0rpx;
            height: 130rpx;
            position: absolute;
            right: -2rpx;
            top: 20rpx;
            z-index: 20;
        }
    }

    .preferig{
        width: 184rpx;
        height: 170rpx;
        padding: 12rpx 6rpx;
        box-sizing: border-box;
        border-radius: 0 24rpx 24rpx 0;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        position: relative;

        .preferbtn{
            text-align: center;
            width: 104rpx;
            height: 50rpx;
            background: #FF554A;
            border-radius: 28rpx;
            .prefer_b_tex{
                width: 100%;
                margin: 0 auto;
                color: #FFFFFF;
                font-size: 24rpx;
                font-weight: 500;
                line-height: 50rpx;
            }
        }
        &.grey{
            .preferbtn{
                background: #ECECEC;

                .prefer_b_tex{
                    color: #B2B2B2;
                }
            }
        }

        &::before,
        &::after{
            content: '';
            width: 20rpx;
            height: 20rpx;
            border-radius: 20rpx;
            background: #F1F4F5;
            position: absolute;
            left: -12rpx;
        }
        &::before{
            top: -10rpx;
        }
        &::after{
            bottom: -10rpx;
        }
    }
    &.expire {
        .preferbtn {
            background: #ECECEC;

            .prefer_b_tex {
                color: #B2B2B2;
            }
        }
    }
}
.rulebox {
    margin: 0 30rpx;
    padding: 30rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    .ruletit {
        font-size: 36rpx;
        font-weight: 500;
        color: #0B0300;
        margin-bottom: 24rpx;
        text-align: center;
    }
    .ruletex {
        font-size: 28rpx;
        font-weight: 500;
        color: #0B0300;
        margin-bottom: 24rpx;
        text-align: center;
        
    }
    .rulebtn {
        margin-top: 60rpx;
    }
}
</style>
