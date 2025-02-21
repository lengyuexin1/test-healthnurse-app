<template>
    <view class="order-content">
        <!-- :class="staCls" -->
        <view class="state-text-box" >
            <!-- mattit -->
            <view class="state-title " v-if="[65537, 131075].includes(osObj.status)">
                {{ osObj.statusName }}
            </view>
            <view class="state-text" v-if="osObj.status == 65537">
                您的订单还有
                <TnCountDown :time="Number(osObj.statusDetailIntro)" separator-mode="cn" :show-hour="false"
                    separator-color="#666666" text-color="#666666" @end="stop" />
                过期，请尽快支付
            </view>
            <view class="state-text" v-else-if="osObj.status == 131075">
                您的商品已发货请留意物流信息
            </view>
            <view class="ordsaycon_ping tn-flex-center-between" v-else-if="osObj.status == 131089">
                <view class="ordsaycon_left">
                    <view class="ordsaytit">
                        <text>{{ osObj.statusName }}</text>
                        <TnCountDown :time="osObj.utcResidual" size="lg" text-color="#FFFFFF" separator-color="#FFFFFF" @end="stop" />
                    </view>
                    <view class="ordsaytit_desc">邀请好友一起拼团吧</view>
                </view>
                <view class="ordsaycon_right row i-center">
                    <view class="shali column tn-flex-center-center" @click="sharePage">
                        <image class="icon" :src="getAssetsUrl('/leyou/icon/share.svg')" mode="aspectFit" />
                        <text class="tn-white_text tn-text-xs tn-mt-xs">拼团分享</text>

                        <!-- #ifdef MP-WEIXIN -->
                        <button open-type="share" :data-object="osObj"></button>
                        <!-- #endif -->
                    </view>
                </view>
            </view>
            <view class="state-text" v-else>
                {{ osObj.statusDetailIntro }}
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'

interface Props {
    /** 订单状态
     * status 状态号码
     * statusName 状态名称
     * statusDetailIntro 状态描述
     */
    osObj: any
}

const props = defineProps<Props>()

const staCls = computed(() => {
    // '待付款','待服务','待确认','待评价','已取消','待使用','已完成','待发货','待收货', '已收货'
    const stateArr = [65537, 131076, 131092, 131077, 196610, 262146, 131079, 196611, 131074, 131075, 196609]
    const colorArr = ['state1', 'state2', 'state2', 'state3', 'state4', 'state5', 'state6', 'state7', 'state8', 'state9', 'state7']

    const index = stateArr.indexOf(props.osObj.status)
    return index >= 0 ? colorArr[index] : colorArr[0]
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {

})

const stop = () => {

    props.osObj.status = 196610
    props.osObj.statusName = '待评价'
    props.osObj.statusDetailIntro = '待评价'
}

// app分享参数
const sharePage = () => {
    // #ifndef MP-WEIXIN
    const orderObj = props.osObj.shopList[0].entityList[0]
    uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 5,
        imageUrl: orderObj.image,
        title: '超优惠！快来和我一起拼团',
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/Order/pages/groupSplit/groupSplit?id=${orderObj.itemId}&collage_id=${props.osObj.collageRecordId}`,
            type: import.meta.env.VITE_WEIXIN_OPEN, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: "http://www.baochuncare.com" //兼容低版本的网页链接
        },
        success: (ret) => {
            console.log(JSON.stringify(ret))
        },
        fail: (err) => {
            console.log(err)
        }
    })
    //#endif
}

</script>
  
<style lang="scss" scoped>
.order-content {
    width: 100%;
    height: 120rpx;
    border-radius: 24rpx;
    padding: 12rpx;
    box-sizing: border-box;
    margin-bottom: 18rpx;

    .state-text-box {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
        display: flex;
        flex-direction: column;

        .state-title {
            font-size: 40rpx;
            color: #FFFFFF;
            margin-bottom: 8rpx;
        }

        .state-text {
            font-size: 24rpx;
            color: #FFFFFF;
        }

        &.state1 {
            background: #FFF2F2;

            .mattit {
                color: #FC2828;
            }
        }

        &.state2 {
            background: #e3f9eb;

            .mattit {
                color: #09C85D;
            }
        }

        &.state3 {
            background: #e9f5fe;

            .mattit {
                color: #2DA3FE;
            }
        }

        &.state4 {
            background: #fff9eb;

            .mattit {
                color: #FF7331;
            }
        }

        &.state5 {
            background: #f2f2f2;

            .mattit {
                color: #333333;
            }
        }

        &.state6 {
            background: #E8F5FF;

            .mattit {
                color: #2DA3FE;
            }
        }

        &.state7 {
            background: #fff9eb;

            .mattit {
                color: #FF7331;
            }
        }

        &.state8 {
            background: #e3f9eb;

            .mattit {
                color: #09C85D;
            }
        }

        &.state9 {
            background: #E8F5FF;

            .mattit {
                color: #2DA3FE;
            }
        }
    }
    .ordsaycon_ping{
        .ordsaycon_left{
            font-size: 40rpx;
            color:#FFFFFF;
            .ordsaytit {
                color:#FFFFFF;
                display: flex;
                align-items: center;
                text{
                    margin-right: 20rpx;
                }
            }
            .ordsaytit_desc{
                font-size: 28rpx;
                margin-top: 16rpx;
                color:rgba(255, 255, 255, .6);
            }
        }

        .shali {
            position: relative;

            button {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
            }
        }

        .icon {
            width: 68rpx;
            height: 68rpx;
        }

        .share_txt {

        }
    }
}</style>
  