<template>
    <view class="entry row" @click="navServe">
        <view class="entlef">
            <image style="width: 220rpx;height: 220rpx;border-radius: 12rpx;" :src="props.info.thumb || ''"
                mode="aspectFill">
            </image>
        </view>
        <view class="entrig column j-between">
            <view class="entupper">
                <view class="entname u-line-1">
                    {{ props.info.name }}
                    <!-- <u-parse :content="props.info.name"></u-parse> -->
                </view>
                <view class="enttip u-line-1">{{ props.info.desc }}</view>
                <view class="entqian row" v-if="props.info.tag">
                    <TnTag text="满100减30" plain size="sm" color="#EC3E3E" border-color="#FFC4C4"></TnTag>
                </view>
            </view>
            <view class="entbelow">
                <view class="entprice row i-center">
                    <view class="entprice1">￥<text>{{ fillter(props.info.price) }}</text>{{ props.info.unitName || ''
                        }}起
                    </view>
                    <view class="entprice2">￥{{ fillter(props.info.fakePrice) }}</view>
                </view>
                <view class="entshop row i-center">
                    <image style="width: 28rpx;height: 28rpx;border-radius: 28rpx;" :src="props.info.shopThumb || ''"
                        mode="aspectFill">
                    </image>
                    <view class="entshpname">{{ props.info.shopName || '' }}</view>
                    <TnIcon name="right" color="#999999" size="28rpx"></TnIcon>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { gotoServeDetail } from '@/routes/care-routes'
import { gotogoodsDetail } from '@/routes/goods-routes'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { reactive, computed } from 'vue'
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
const fillter = computed(() => {
    return (e: any) => {
        if (!e) { return '0' }
        const num = parseInt(e) / 100
        const all = Number.isInteger(num) ? num : num.toFixed(2)
        return all
    }
})
// 服务详情跳转
const navServe = () => {
    if (props.info.sourceType === 2) {
        // 商品详情
        console.log('商品详情', props.info.id)

        gotogoodsDetail(props.info.id)
        return false
    }
    gotoServeDetail({ itemId: props.info.id })
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
                line-height: 42rpx;
                color: #808080;
            }

            .entqian {
                margin-top: 8rpx;
            }
        }

        .entbelow {
            .entprice1 {
                font-size: 24rpx;
                font-weight: 400;
                color: #1A1A1A;

                text {
                    font-size: 28rpx;
                }
            }

            .entprice2 {
                margin-left: 4rpx;
                font-size: 24rpx;
                font-weight: 400;
                color: #999999;
                text-decoration: line-through;
            }

            .entshop {
                margin-top: 8rpx;

                .entshpname {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                    margin: 0 12rpx 0 8rpx;
                }
            }
        }
    }
}
</style>
