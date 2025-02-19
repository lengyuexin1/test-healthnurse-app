<template>
    <view class="activeStr" @click.stop="clickMore">
        <view class="activeStrTop">
            <view class="toptext">
                <view class="timeOver">优先服务</view>
                <view class="useplase">服务新人下单立减80元</view>
            </view>
        </view>
        <view class="activeTimeBot">
            <swiper :indicator-dots="false" :autoplay="true" :interval="5000" class="swiper">
                <swiper-item class="swiper_item" v-for="(swiperitem, index) in swiperList(jai)" :key="index">
                    <view class="swiper_con_box_item" v-for="(item) in swiperitem" :key="item.id">
                        <image class="live_swiper_img" :src="getAssetsPic('/fare/v2/zhihui.png')" mode="scaleToFill" />
                        <view class="botTetx">
                            <view class="titleName">中度失能照护</view>
                            <view class="fova_pric" v-if="item.minPrice">低至<text class="monyeText">{{ item.minPrice ?
                                (item.minPrice / 100) :
                                '' }}</text>起
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
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
import { gotoPiMark } from '@/routes/active-routes'

interface Props {
    dataObjTwo: any
}

const jai = {
    subsetList: [{
        id: "1730484766258343937",
        name: "居家照护（轻度失能）",
        desc: "适合需要部分协助生活的老人",
        thumb: "https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/life/care/service/thumb/202312116735892.png",
        price: 210000,
        minPrice: 210000,
        categoriesName: null,
        categoriesId: "1"
    },
    {
        id: "1730484766258343937",
        name: "居家照护（轻度失能）",
        desc: "适合需要部分协助生活的老人",
        thumb: "https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/life/care/service/thumb/202312116735892.png",
        price: 210000,
        minPrice: 210000,
        categoriesName: null,
        categoriesId: "1"
    },
    {
        id: "1730484766258343937",
        name: "居家照护（轻度失能）",
        desc: "适合需要部分协助生活的老人",
        thumb: "https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/life/care/service/thumb/202312116735892.png",
        price: 210000,
        minPrice: 210000,
        categoriesName: null,
        categoriesId: "1"
    }]
}

const swiperList = (list) => {
    const arr: any = []
    for (let i = 0; i < list?.subsetList?.length; i += 2) {
        const pair = [list.subsetList[i], list.subsetList[i + 1]]
        arr.push(pair.filter((item) => {
            return item
        }))
    }
    return arr
}
const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const liveswiperChange = () => {

}

// 更多
const clickMore = () => {
    gotoPiMark('1716988256624369666')
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
        // background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
        border-radius: 24rpx 24rpx 24rpx 24rpx;

        .swiper {
            width: 100%;
            height: 178rpx;
        }

        .swiper_item {
            display: flex;
            width: 136rpx;
            // justify-content: space-between;
            margin-right: 10rpx;
            .swiper_con_box_item {
                width: 322rpx;
                display: flex;
                background: #fff;
                align-items: center;
                padding: 0 12rpx;
                margin:0 10rpx;
                border-radius: 12rpx 12rpx 12rpx 12rpx;
            }

            .live_swiper_img {
                width: 104rpx;
                height: 104rpx;
            }

            .botTetx {
                margin-left: 8rpx;

                .titleName {
                    font-weight: 600;
                    font-size: 26rpx;
                    color: #64290A;
                    margin-bottom: 12rpx;
                }

                .fova_pric {
                    font-size: 24rpx;
                    color: #717171;
                }

                .monyeText {
                    font-size: 24rpx;
                    color: #F51F1F;
                }
            }
        }
    }

    .activeStrTop {
        padding: 20rpx;
        display: flex;
        justify-content: space-between;

        .toptext {
            display: flex;
            align-items: center;
        }

        .timeOver {
            font-weight: 500;
            font-size: 34rpx;
            color: #333333;
        }

        .useplase {
            font-size: 24rpx;
            color: #B47143;
            padding-left: 16rpx;
        }
    }
}
</style>
