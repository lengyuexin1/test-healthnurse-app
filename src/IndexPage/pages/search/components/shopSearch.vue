<template>
    <view class="entry row" @click="navShopDetail">
        <view class="entlef">
            <image style="width: 220rpx;height: 220rpx;border-radius: 12rpx;" :src="info.thumb || ''" mode="aspectFill">
            </image>
        </view>
        <view class="entrig column j-between">
            <view class="entupper">
                <view class="entname u-line-1">
                    {{ props.info.name }}
                    <!-- <u-parse :tagStyle="data.pStyle" :content="props.info.name"></u-parse> -->
                </view>
                <view class="enttip row i-center">
                    <TnRate size="sm" :count="5" :readonly="true" v-model="props.info.score" active-color="#FEE111"
                            inactive-color="#EBEBEB" :allowHalf="true" inactive-icon="star-fill"></TnRate>
                    <view class="entfen">{{ props.info.score }}分</view>
                </view>
                <view class="entqian row" v-if="props.info.tag">
                    <TnTag text="满100减30" plain size="sm" color="#EC3E3E" borderColor="#FFC4C4"></TnTag>
                </view>
            </view>
            <view class="entbelow">已服务{{ props.info.salesVolume }}客户</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { gotoAttendShop } from '@/routes/care-routes' // 店铺详情
import { reactive } from 'vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnTag from '@tuniao/tnui-vue3-uniapp/components/tag/src/tag.vue'

interface Data {
    pStyle: {
        p: string
    }
}

const data = reactive<Data>({
    pStyle: {
        p: `overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;`
    }
})
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
})
const navShopDetail = () => {
    // businessType 业务类型 1服务 2商品 3找康养 4找机构，5内容
    // applyId 店铺类型 2：服务 3：商品 12：机构 13：康养
    const getApplyId = (businessType: number | string) => {
        if (businessType === 1) {
            return 2
        }
        if (businessType === 2) {
            return 3
        }
        if (businessType === 3) {
            return 13
        }
        if (businessType === 4) {
            return 12
        }
    }

    const applyId = getApplyId(props.info.businessType)
    console.log(props.info.businessType)
    console.log(applyId)
    // return

    gotoAttendShop(props.info.id, applyId)
}
</script>

<style lang="scss" scoped>
.entry {
    padding: 24rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 24rpx;

    .entlef {
        margin-right: 24rpx;
    }

    .entrig {
        flex: 1;
        height: 220rpx;

        .entupper {
            .entname {
                font-size: 30rpx;
                font-weight: bold;
                line-height: 42rpx;
                color: #333333;
                width: 420rpx;
            }

            .enttip {
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
            }

            .entqian {
                margin-top: 20rpx;
            }
        }

        .entbelow {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
        }
    }
}
</style>
