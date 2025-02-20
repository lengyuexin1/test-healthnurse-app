<template>
    <view class="content">
        <view class="shoptit">最新店铺</view>
        <view class="shopbox row i-center">
            <view class="shopli" v-for="(item) in shopList" :key="item.id" @click="tostore(item.id)">
                <view class="shopimg">
                    <u-image :src="item.thumb" width="104rpx" height="104rpx" shape="circle"></u-image>
                </view>
                <view class="shopname u-line-1">{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<script>
import { preferredList, getNewList } from "@/api/care-api"
import { gotoAttendShop } from '@/route/care-routes'
export default {
    data() {
        return {
            city: { id: 440100, name: '广州' },
            shopList: []
        }
    },
    props: {
        applyId: {
            type: Number,
            default: 2
        }
    },
    methods: {
        tostore(id) {
            gotoAttendShop(id)
        }
    },
    created() {
        this.applyId === 2 ? preferredList({
            applyId: this.applyId,
            cityId: this.city.id
        }).then((res) => {
            this.shopList = res
        }) : getNewList({
            size: 10,
            applyId: this.applyId
        }).then(res => {
            this.shopList = res
        })
    }
}
</script>

<style lang="scss" scoped>
.content{
    padding: 28rpx;
    background: #FFFFFF;
    border-radius: 32rpx;

    .shoptit{
        font-size: 30rpx;
        font-weight: 500;
        color: #000002;
    }
    .shopbox{
        flex-wrap: wrap;

        .shopli{
            margin-top: 50rpx;
            margin-right: 32rpx;

            &:nth-child(3n){
                margin-right: 0rpx;
            }

            .shopimg{
                width: 104rpx;
                height: 104rpx;
                border: 4rpx solid #FFE6D1;
                border-radius: 50%;
            }
            .shopname{
                font-size: 24rpx;
                font-weight: 400;
                line-height: 52rpx;
                color: #666666;
                margin-top: 24rpx;
                text-align: center;
                width: 120rpx;
            }
        }
    }
}
</style>
