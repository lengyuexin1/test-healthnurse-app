<template>
    <view class="newHanle threeGoods" v-for="(its, ins) in allInList" :key="ins">
        <view class="getQuan">
            <view class="quanTitle">{{ its.name }}</view>
            <view class="seeMone" @click="seeGoods(its.dataIds, its)">
                <view class="left_jin">查看更多</view>
                <TnIcon name="right" />
            </view>
        </view>
        <view class="goodUl">
            <view class="goodsArea" v-for="(item, index) in its.dataList" :key="index" @click="gotoDetail(item)">
                <image class="towPro_img" :src="item.thumb" mode="scaleToFill" />
                <!-- <TnLazyLoad :src="item.thumb" class="towPro_img" /> -->
                <view class="goodsName">{{ item.name }}</view>
                <view class="difMoney">
                    <view class="realMoney">￥{{ moneyFilter(item.price) }}</view>
                    <view class="ageMoney">￥{{ item.fakePrice }}</view>
                </view>
            </view>
        </view>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import { moneyFilter } from "@/common/filters"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotoServiceStore } from '@/routes/service-routes'

interface Props {
    allInList: any
}

const swiperIndex = ref(0)
const props = defineProps<Props>()

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const liveswiperChange = (e: any) => {
    swiperIndex.value = e.detail.current
}
const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                title: '登录失效,请重新登录！', icon: 'none'
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotoServiceStore({ itemId: item.id })
    })
}

</script>
  
<style lang="scss" scoped>
.newHanle {
    height: 368rpx;
    background: #fff;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
    margin: 0 00rpx 20rpx 0rpx;
    padding: 24rpx;
    overflow: hidden;

    .getQuan {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .quanTitle {
            font-size: 36rpx;
            color: #020202;
            font-weight: 600;
        }
    }

    .towPro_img {
        width: 100%;
        height: 360rpx;
    }
}

.threeGoods {
    height: 484rpx;

    // margin-top: 40rpx;
    .goodUl {
        display: flex;
        justify-content: space-around;
        margin-top: 28rpx;
    }

    .seeMone {
        display: flex;
        font-size: 28rpx;
        color: #999999;
        min-width: 86rpx;
    }

    .left_jin {
        margin-right: 10rpx;
    }

    .goodsArea {
        display: flex;
        flex-direction: column;
        align-items: center;

        .towPro_img {
            width: 240rpx;
            height: 240rpx;
        }

        .goodsName {
            margin-top: 20rpx;
            font-weight: 600;
            font-size: 28rpx;
            color: #020202;
        }

        .difMoney {
            display: flex;
            align-items: center;
            margin-top: 20rpx;
        }

        .realMoney {
            font-weight: 600;
            font-size: 28rpx;
            color: #000000;
            padding-right: 10rpx;
        }

        .ageMoney {
            font-size: 20rpx;
            color: #999999;
            text-decoration: line-through;
        }
    }
}
</style>
