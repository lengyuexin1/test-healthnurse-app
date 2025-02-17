<template>
    <view class="container">
        <customNavbar pageTitle="产品详情"></customNavbar>
        <view class="mainbg">
            <view class="mainbox column i-center">
                <u-image :src="godsInfo.productThumb" width="270rpx" height="270rpx"></u-image>
                <view class="maintit">{{ godsInfo.productName }}</view>
                <view class="mainmore row i-center j-between">
                    <view class="mainprice">￥{{ godsInfo.price | moneyFilter }}起</view>
                    <view>
                        <u-button text="去购买" color="#F1F1F1" shape="circle" @click="gotoGoodsDetails"
                            :customStyle="{ color: '#333333', fontSize: '28rpx', fontWeight: 'bold', width: '144rpx', height: '64rpx' }"
                        ></u-button>
                    </view>
                </view>
            </view>
        </view>
        <view class="ductit">使用帮助</view>
        <view class="ducbox">
            <view class="docli row i-center j-between" @click="linkProblem">
                <view class="doctit">常见问题</view>
                <u-icon name="arrow-right" size="20" color="#818181"></u-icon>
            </view>
            <view class="docli row i-center j-between" @click="linkCaption">
                <view class="doctit">使用说明</view>
                <u-icon name="arrow-right" size="20" color="#818181"></u-icon>
            </view>
        </view>
        <u-safe-bottom></u-safe-bottom>
    </view>
</template>

<script>
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import { gotoGoodsDetails } from '@/route/goods-routes'
import { gotoCaption, gotoProblem } from '@/route/care-routes'
import { productshowDetail } from '@/api/smart-api'
export default {
    components: {
        customNavbar
    },
    data() {
        return {
            godsId: "",
            godsInfo: {}
        }
    },
    onLoad(options) {
        this.pageTitle = options.name
        this.godsId = options.id
        productshowDetail(this.godsId).then(res => {
            console.log(res)
            this.godsInfo = res
        }).catch((err) => {
            uni.$u.toast(err.message)
            setTimeout(() => {
                uni.navigateBack()
            }, 1500)
        })
    },
    methods: {
        // 商品详情
        gotoGoodsDetails() {
            gotoGoodsDetails({ id: this.godsInfo.productId })
        },
        // 使用说明
        linkCaption() {
            gotoCaption({ id: this.godsId })
        },
        // 问题列表
        linkProblem() {
            gotoProblem({ id: this.godsId })
        }
    }
}
</script>

<style lang="scss" scoped>
.mainbg{
    background: linear-gradient( 180deg, #DFF7EF 0%, transparent 50%);
    padding: 40rpx 20rpx;
}
.mainbox{
    padding: 50rpx 30rpx;
    background: #F9F9FA;
    border-radius: 16rpx;

    .maintit{
        font-weight: bold;
        font-size: 32rpx;
        color: #333333;
        margin-top: 30rpx;
        text-align: center;
    }

    .mainmore{
        border-top: 2rpx solid #F2F2F2;
        margin-top: 40rpx;
        padding-top: 40rpx;
        width: 100%;
        box-sizing: border-box;
        .mainprice{
            font-weight: bold;
            font-size: 36rpx;
            color: #333333;
        }
    }
}
.ductit{
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;
    padding: 0rpx 36rpx;
}
.ducbox{
    background: #FFFFFF;
    border-radius: 16rpx;
    margin: 20rpx;
    padding: 0 30rpx;

    .docli{
        height: 100rpx;
        border-bottom: 2rpx solid #F2F2F2;

        &:last-child{
            border-bottom: none;
        }

        .doctit{
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
        }
    }
}
</style>
