<template>
    <view class="container">
        <TnNavbar bgColor="transparent" :bottom-shadow="false" home-icon="" placeholder>
            <template #back>
                <TnIcon @click="gotoBack" color="##333333" name="left" size="42"></TnIcon>
            </template>
            <view class=titleCs>{{ dataObj.name }}</view>
        </TnNavbar>
        <view class="gradient" :style="{ backgroundImage: `url(${dataObj.mainImage})` }"></view>
        <view class="centent">
            <z-paging @query="queryList" ref="paging" v-model="dataList" :auto="false" :fixed="false"
                :refresher-enabled="false" @scroll="scrollPage">
                <view class="qianUse">
                    <view class="qianUl">
                        <view class="quanLi" v-for="(item, index) in artList" :key="index">
                            <view>
                                <view class="groupMon" v-if="showTPri(item.typeId, item) == 1">
                                    <text class="unit">￥</text>
                                    <view class="numMoney">{{ moneyFilter(item.cfgOffer) }}</view>
                                </view>
                                <view class="groupMon" v-if="showTPri(item.typeId, item) == 2">
                                    <view class="numMoney">{{ item.cfgOffer / 100 }}</view>
                                    <text class="unit">折</text>
                                </view>
                                <view class="whereUse">{{ item.desc }}</view>
                            </view>
                            <view class="syuas">
                                <view class="lineBox">
                                    <view class="zonr1"></view>
                                    <view class="lineDa"></view>
                                    <view class="zonr2"></view>
                                </view>
                            </view>
                            <view class="noget" v-if="!isLogin || (isLogin && item.grantedId == 0)" @click="getUp(item)">领取
                            </view>
                            <view class="noget alseUse" v-else @click="gotoUse(item)">已领取</view>
                        </view>
                    </view>

                    <view class="centTitle" v-if="dataList.length > 0">
                        <view class="centText">特惠服务</view>
                        <view class="mornGood" @click="gotoUseList(1)">
                            <text class="mornWz">更多</text>
                            <TnIcon name="right" size="28rpx" color="#a6a6a6"></TnIcon>
                        </view>
                    </view>

                    <view class="qianGoods">
                        <WaterfallsFlow :wfList="dataList" @waterItem="clickwaterItem">
                        </WaterfallsFlow>
                    </view>

                    <view class="centTitle" v-if="dataListTow.length > 0">
                        <view class="centText">特惠商品</view>
                        <view class="mornGood" @click="gotoUseList(2)">
                            <text class="mornWz">更多</text>
                            <TnIcon name="right" size="28rpx" color="#a6a6a6"></TnIcon>
                        </view>
                    </view>

                    <view class="qianGoods">
                        <WaterfallsFlow :wfList="dataListTow" @waterItem="clickwaterItemTow">
                        </WaterfallsFlow>
                    </view>
                </view>
            </z-paging>
        </view>

    </view>
</template>
<script setup lang="ts">
import { moneyFilter } from "@/common/filters"
import { PlatformManage } from "@bc/sys"
import { ref, reactive, computed, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { activeDetail, activeDetailTow, getCoupon } from "@/api/setite-api"
import { onLoad } from "@dcloudio/uni-app"
import WaterfallsFlow from '@/IndexPage/pages/platform/components/WaterfallsFlow.vue'
import { gotoserviceDetail, gotoSellerList } from '@/routes/service-routes'
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoLogin } from "@/routes/public-routes"
const paging = ref()
const isLogin = ref(false)
const dataList = ref([])
const dataListTow = ref([])
const artList: any = ref([])
const dataObj: any = ref({})
onLoad((option: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            isLogin.value = false
            getDetail(option.id)
        } else {
            isLogin.value = true
            getDetailTow(option.id)
        }
    })
})

const getDetail = (id: any) => {
    activeDetail(id).then(res => {
        dataObj.value = res
        paging.value.complete(res.itemList)
        dataListTow.value = res.productList
        // 优惠券
        artList.value = res.couponList
    })
}

const getDetailTow = (id: any) => {
    activeDetailTow(id).then(res => {
        dataObj.value = res
        paging.value.complete(res.itemList)
        dataListTow.value = res.productList
        // 优惠券
        artList.value = res.couponList
    })
}

const gotoUseList = (num: string) => {
    gotoSellerList(
        { type: num, id: dataObj.value.id }
    )
}

const showTPri = computed(() => (cup: string, dats: any) => {
    const strPri = (cup + '').slice(-1)
    if (strPri == '0' || strPri == '1') {
        return 1
    }
    if (strPri == '4' || strPri == '2') {
        return 2
    }
})

const scrollPage = (e: any) => { }
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})

const clickwaterItem = (item: any) => {
    if (!isLogin.value) {
        return gotoLogin({})
    }
    gotoserviceDetail(item.id)
}
const clickwaterItemTow = (item: any) => {
    if (!isLogin.value) {
        return gotoLogin({})
    }
    gotogoodsDetail(item.id)
}

const queryList = (pageNumber: number, pageSize: number) => {

}

const getUp = (item: any) => {
    if (!isLogin.value) {
        return gotoLogin({})
    }
    if (item.grantedId == 0) {
        return uni.showToast({
            icon: 'none',
            title: '您不是新用户，未达到领取条件',
        })
    }
    // const sendData = {
    //     couponId: item.id
    // }
    // getCoupon(sendData).then(res => {
    //     item.status = 11
    //     uni.showToast({
    //         icon: 'none',
    //         title: '领取成功',
    //     })
    // }).catch(err => {
    //     uni.showToast({
    //         icon: 'none',
    //         title: err.message,
    //     })
    // })
}
const gotoUse = (item: any) => {

}

const gotoBack = () => {
    uni.navigateBack()
}
</script>
<style lang="scss" scoped>
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .titleCs {
        font-size: 34rpx;
    }

    .gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 440rpx;
        z-index: -1;
        background-position: center center;
        background-size: 100% 100%;
    }

    .centent {
        overflow: auto;
        position: absolute;
        top: 440rpx;
        bottom: 0;
        left: 0;
        right: 0px;
    }
}

.indexImg {
    width: 100%;
    height: 430rpx;

    .towPro_img {
        width: 100%;
        height: 430rpx;
    }
}

.qianUse {
    margin: 30rpx 0 40rpx 0;

    .centTitle {
        position: relative;
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
        display: flex;
        margin-top: 20rpx;

        .centText {
            flex: 1;
            text-align: center;
        }

        .mornGood {
            position: absolute;
            right: 10rpx;

            .mornWz {
                color: #a6a6a6;
                font-size: 26rpx;
            }
        }
    }

    .qianUl {
        margin: 0 20rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16rpx;

        .quanLi {
            position: relative;
            height: 240rpx;
            border-radius: 24rpx;
            background: #fff;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            padding: 20rpx;

            .groupMon {
                display: flex;
                align-items: center;
                justify-content: center;

                .ecad {
                    font-weight: 600;
                    font-size: 28rpx;
                    color: #000000;
                }

                .unit {
                    font-size: 24rpx;
                }

                .numMoney {
                    font-weight: 600;
                    font-size: 48rpx;
                    color: #000000;
                }
            }

            .whereUse {
                font-size: 24rpx;
                color: #666666;
                margin-top: 10rpx;
            }

            .noget {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28rpx;
                color: #333333;
                width: 108rpx;
                height: 52rpx;
                background: #FFFFFF;
                border-radius: 28rpx 28rpx 28rpx 28rpx;
                border: 2rpx solid #585858;
            }

            .alseUse {
                background: #333333;
                color: #FFFFFF;
                width: 128rpx;
            }

            .syuas {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                .lineBox {
                    width: 100%;
                    display: flex;

                    .zonr1 {
                        width: 20rpx;
                        height: 20rpx;
                        background: #F1F3F5;
                        border-radius: 50%;
                        margin-left: -30rpx;
                    }

                    .lineDa {
                        height: 0rpx;
                        margin: 10rpx auto;
                        width: 90%;
                        border-bottom: 2rpx dashed #DBDBDB;
                    }

                    .zonr2 {
                        width: 20rpx;
                        height: 20rpx;
                        background: #F1F3F5;
                        border-radius: 50%;
                        margin-right: -30rpx;
                    }
                }
            }
        }
    }

    .qianGoods {
        margin: 30rpx 18rpx 0 18rpx;
    }
}

:deep(.tn-navbar-back) {
    display: flex;
    align-items: center;
}

:deep(.tn-navbar__content) {
    padding: 0 !important;
}
</style>