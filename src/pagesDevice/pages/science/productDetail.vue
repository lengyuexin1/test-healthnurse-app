<template>
    <view class="container">
        <!--        <customNavbar pageTitle="产品详情"></customNavbar>-->
        <bc-page-navbar title="产品详情"></bc-page-navbar>
        <view class="mainbg">
            <view class="mainbox column i-center">
                <image style="width: 270rpx;height: 270rpx;" :src="data.godsInfo.productThumb"></image>
                <view class="maintit">{{ data.godsInfo.productName }}</view>
                <view class="mainmore row i-center j-between">
                    <view class="mainprice">￥{{ data.godsInfo.price }}起</view>
                    <view>
                        <TnButton bg-color="#F1F1F1" shape="round" @click="gotoGoodsDetails"
                                  :custom-style="{ color: '#333333', fontSize: '28rpx', fontWeight: 'bold', width: '144rpx', height: '64rpx' }">
                            去购买
                        </TnButton>
                    </view>
                </view>
            </view>
        </view>
        <view class="ductit">使用帮助</view>
        <view class="ducbox">
            <view class="docli row i-center j-between" @click="linkProblem">
                <view class="doctit">常见问题</view>
                <TnIcon name="right" size="20" color="#818181"></TnIcon>
            </view>
            <view class="docli row i-center j-between" @click="linkCaption">
                <view class="doctit">使用说明</view>
                <TnIcon name="right" size="20" color="#818181"></TnIcon>
            </view>
        </view>
        <!--        <u-safe-bottom></u-safe-bottom>-->
    </view>
</template>

<script lang="ts" setup>
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoCaption, gotoProblem } from '@/routes/care-routes'
import { productshowDetail } from '@/api/smart-api'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { reactive } from "vue"
import { onLoad } from "@dcloudio/uni-app"

interface Data {
    pageTitle: string,
    godsId: string,
    godsInfo: any
}

const data = reactive<Data>({
    godsId: "", pageTitle: "",
    godsInfo: {}
})
onLoad((options) => {
    data.pageTitle = options.name
    data.godsId = options.id
    productshowDetail(data.godsId).then(res => {
        console.log(res)
        data.godsInfo = res
    }).catch((err) => {
        console.log(err)
        uni.showToast({
            title: err.message,
            icon: 'none'
        })
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    })
})
// 商品详情
const gotoGoodsDetails = () => {
    gotogoodsDetail(data.godsInfo.productId)
}
// 使用说明
const linkCaption = () => {
    gotoCaption({ id: data.godsId })
}
// 问题列表
const linkProblem = () => {
    gotoProblem({ id: data.godsId })
}
</script>

<style lang="scss" scoped>
.mainbg {
    background: linear-gradient(180deg, #DFF7EF 0%, transparent 50%);
    padding: 40rpx 20rpx;
}

.mainbox {
    padding: 50rpx 30rpx;
    background: #F9F9FA;
    border-radius: 16rpx;

    .maintit {
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        margin-top: 30rpx;
        text-align: center;
    }

    .mainmore {
        border-top: 2rpx solid #F2F2F2;
        margin-top: 40rpx;
        padding-top: 40rpx;
        width: 100%;
        box-sizing: border-box;

        .mainprice {
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
        }
    }
}

.ductit {
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;
    padding: 0rpx 36rpx;
}

.ducbox {
    background: #FFFFFF;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 0 30rpx;

    .docli {
        height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;

        &:last-child {
            border-bottom: none;
        }

        .doctit {
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
        }
    }
}
</style>
