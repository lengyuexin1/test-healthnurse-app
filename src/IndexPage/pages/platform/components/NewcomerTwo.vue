<template>
    <view class="activeStr">
        <view class="activeStrTop">
            <view>
                <view class="timeOver">您领取的优惠券即将到期</view>
                <view class="useplase">(请尽快使用)</view>
            </view>
            <view class="activeStrTopLset">
                <view class="left_jin">查看更多</view>
                <TnIcon name="right" />
            </view>
        </view>
        <view class="activeTimeBot">
            <view class="activeMoney">
                <view class="monyNum"><text class="fids">￥</text>60</view>
                <view class="minyName">服务满减劵</view>
            </view>
            <view class="activeCenter">
                <view class="actiCon">实际支付0元可用</view>
                <view class="allCon">全平台使用</view>
                <view class="daoTine">有效期至 2023-05-31 23:59</view>
            </view>
            <view>
                <TnButton class="btnCs">去使用</TnButton>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { ref, reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'
import { getAssetsPic } from '@/common/setPicture'
import { moneyFilter } from "@/common/filters"
// import { gotoNewcomerWelfare } from '@/routes/goods-routes'

interface Props {
    dataObjTwo: any
}

const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

// 更多
const clickMore = () => {
    gotoNewcomerWelfare()
}

</script>
  
<style lang="scss" scoped>
.activeStr {
        height: 290rpx;
        background: linear-gradient(180deg, #F7E4D4 0%, #FFFFFF 100%);
        border-radius: 24rpx 24rpx 24rpx 24rpx;

        .activeTimeBot {
            padding: 0 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 178rpx;
            background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
            border-radius: 24rpx 24rpx 24rpx 24rpx;

            .monyNum {
                font-size: 56rpx;
                color: #FF554A;
                font-weight: 600;

                .fids {
                    font-size: 28rpx;
                }
            }

            .actiCon {
                font-size: 28rpx;
                color: #333333;
            }

            .allCon {
                font-size: 24rpx;
                color: #666666;
                margin: 6rpx 0;
            }

            .daoTine {
                font-size: 24rpx;
                color: #666666;
            }

            .minyName {
                font-size: 24rpx;
                color: #3D3D3D;
            }

            .btnCs {
                height: 60rpx;
                background: #FF554A;
                border-radius: 30rpx 30rpx 30rpx 30rpx;
            }
        }

        .activeStrTop {
            padding: 20rpx;
            display: flex;
            justify-content: space-between;

            .timeOver {
                font-size: 28rpx;
                color: #5C270A;
            }

            .useplase {
                font-size: 20rpx;
                color: #FF5A00;
            }

            .activeStrTopLset {
                display: flex;
                align-items: center;
                font-size: 28rpx;
                color: #666666;

                .left_jin {
                    margin-right: 12rpx;
                }
            }
        }
    }
</style>
