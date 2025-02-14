<template>
    <view class="supervaluepage">
        <!-- 品牌馆 -->
        <TnNavbar bgColor="transparent" :bottom-shadow="false" home-icon="" placeholder>
            <template #back>
                <TnIcon @click="gotoBack" color="#fff" name="left" size="40"></TnIcon>
            </template>
            <view class=titleCs>{{ activityTitle }}</view>
        </TnNavbar>
        <view class="gradient" :style="{ backgroundImage: `url(${activityBG})` }"></view>
        <view class="content">
            <z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="false" :defaultPageSize="10"
                :loading-more-enabled="false" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')">
                <view class="content_box" v-if="type != 4" :style="dataList.length > 10 ? 'height:99%' : 'height:94%'">
                    <view class="activity_item" v-for="item in dataList" :key="item.id" @click.stop="toactivity(item)">
                        <view class="activity_item_left">
                            <image class="imgBox" :src="item.thumb" :lazyLoad="true"></image>
                        </view>
                        <view class="activity_item_right">
                            <view class="item_title">{{ item.name }}</view>
                            <!-- 标签列表 -->
                            <!-- <view class="tag_list">
                                <view class="tag_item">标签</view>
                            </view> -->
                            <!-- 描述 -->
                            <view class="desc" v-if="item.desc">{{ item.desc }}</view>
                            <!-- 跳转店铺详情 -->
                            <view class="store_box" @click.stop="tostore(item.shopId)">
                                <image v-if="item.shopThumb" class="shopImg" :src="item.shopThumb"></image>
                                <view class="store_name">{{ item.shopName ? item.shopName : '保椿康护横沙旗舰店' }}</view>
                                <TnIcon name="right" size="20rpx"></TnIcon>
                            </view>
                            <view class="bay_card">
                                <view class="cart_left">
                                    <view class="card_top_text" v-if="item.price">
                                        <view>日常价</view>
                                        <view style="margin-left:12rpx;" class="fakePrice">￥{{ item.price | moneyFilter }}
                                        </view>
                                    </view>
                                    <view class="cart_bottom_text">
                                        <view>优惠价</view>
                                        <view style="font-size:24rpx;font-weight:bold;">￥{{ (item.couponPrice == 0 ?
                                            item.price : item.couponPrice) | moneyFilter }}</view>
                                    </view>
                                </view>
                                <view class="card_right">
                                    <u-button :customStyle="{
                                        width: '96rpx',
                                        height: '52rpx',
                                        background: '#FD2E38',
                                        borderRadius: '8rpx',
                                        fontSize: '24rpx',
                                        padding: 0
                                    }" color="#FFFFFF">抢购</u-button>
                                </view>

                            </view>
                        </view>
                    </view>
                </view>
                <view class="content_box" v-else :style="dataList.length > 10 ? 'height:99%' : 'height:94%'">
                    <view class="activity_item" v-for="item in dataList" :key="item.id" @click.stop="toactivity(item)">
                        <view class="activity_item_left">
                            <image class="imgBox" :src="item.thumb" :lazyLoad="true"></image>
                        </view>
                        <view class="activity_item_right">
                            <view class="item_title">{{ item.name }}</view>
                            <view class="desc another" v-if="item.desc">{{ item.desc }}</view>
                            <view class="bay_card anotherCard">
                                <view class="cart_left not">
                                    <view class="cart_bottom_text anotherbText">
                                        <view style="font-size:24rpx;font-weight:bold;">￥{{ moneyFilter(item.price) }}
                                        </view>
                                    </view>
                                    <view class="card_top_text anothertText" v-if="item.type != 2">
                                        <view style="color:#000;" v-if="item.type != 2">
                                            /{{ item.extend.serviceWorkingHours.unitName }}起</view>
                                        <view :style="item.type == 2 ? '' : 'margin-left:12rpx;'" class="fakePrice">￥{{
                                            moneyFilter(item.fakePrice) }}</view>
                                    </view>
                                </view>
                            </view>
                            <view class="store_box" @click.stop="tostore(item.shopId)">
                                <image class="imgStore" v-if="item.shopThumb" :src="item.shopThumb"></image>
                                <view class="store_name">{{ item.shopName ? item.shopName : '' }}</view>
                                <u-icon name="arrow-right" size="20rpx"></u-icon>
                            </view>
                        </view>
                    </view>
                </view>
            </z-paging>

        </view>
    </view>
</template>

<script setup lang="ts">
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import { getAssetsPic } from "@/common/setPicture"
import { getactiviList } from '@/api/care-api'
// import { gotoServeDetail, gotoAttendShop } from '@/route/care-routes'
// import { gotoGoodsDetails } from '@/route/goods-routes'
// import { gotoIndex } from '@/route/care-routes'
// import authGuard from '@/sys/auth-guard'
import { PlatformManage } from "@bc/sys"
import { ref, computed } from 'vue'
import { moneyFilter } from "@/common/filters"
import { onLoad } from "@dcloudio/uni-app"
const dataList: any = ref([
    {
        thumb: "https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/life/care/service/thumb/2023121144324926.jpg",
        name: "居家照护（中度失能）",
        desc: "适合行动不便的老人",
        price: 210000,
        couponPrice: 202000
    }
])
const id = ref('')
const activityTitle = ref('服务类新人立减')
const activityBG = ref('https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_prod/marketing/customerAcquisition/2024712145730181.png')
const allList = ref([])
const slicingList = ref([])
const type = ref(0) // 1 4有优惠价 2正常价
// 判断小米关 特殊处理康复辅助内容
const handleRecovery = ref(false)
const getAssetsUrl = computed(() => (src: any) => {
    return getAssetsPic(src)
})

onLoad((options: any) => {
    id.value = options.id
    queryList(1, 10)
})

const leftClick = () => {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    // 如果页面栈长度为1，则表示当前页面为首页
    pages.length === 1 ? gotoIndex() : uni.navigateBack()
}

const paging = ref()

const queryList = (start: number, end: number) => {
    if (!id.value) {
        uni.showToast({
            title: '活动不存在',
            icon: 'none'
        })
        // gotoIndex()
        return
    }

    if (start == 1) {
        getactiviList(id.value).then((res) => {
            activityTitle.value = res.name
            activityBG.value = res.mainImage
            type.value = res.type //活动类型用于决定使用的列表

            allList.value = handleRecovery.value ? res.itemList.filter(item => item.templateCode2 !== 65798) : res.itemList
            slicingList.value = allList.value.slice(0, 10)

            paging.value.complete(slicingList.value)
            // console.log('res.itemList',res.itemList,this.dataList);
            // this.$refs.paging.complete(res.itemList)
        })
    }
    else {

        slicingList.value = allList.value.slice((start - 1) * end, (start * end))
        console.log('slicingList', slicingList.value)
        paging.value.complete(slicingList.value)
    }
}

const toactivity = (shopitem, item) => {
    PlatformManage.isRequireLogin().then((needlogin) => {
        if (needlogin) {
            uni.showModal({
                title: "温馨提示",
                content: "您还没有登录，无法领取活动优惠券，是否前往登录？",
                cancelText: "直接抢购",
                confirmText: "前往登录",
                success: (res) => {
                    if (res.confirm) {
                        // authGuard.gotoLogin({ page: 1 })
                    }
                    if (res.cancel) {
                        gotoChanpinInfo(shopitem, item)
                    }
                }
            })
            return
        }
        gotoChanpinInfo(shopitem, item)
    })
}

const gotoBack = () => {
    uni.navigateBack()
}

const gotoChanpinInfo = (shopitem, item) => {
    if (item.applyId == 3) {
        gotoGoodsDetails({ id: shopitem.id })
    }
    else {
        gotoServeDetail({ itemId: shopitem.id })
    }
}
const tostore = (id) => {
    gotoAttendShop(id)
}
</script>

<style lang="scss" scoped>
// #ifdef MP-WEIXIN
.home {
    position: fixed;
    top: 360rpx;
    right: 0;
    width: 100rpx;
    height: 100rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 20rpx rgba(0, 0, 0, 0.12);
    border-radius: 16rpx 0rpx 0rpx 16rpx;
    overflow: hidden;
    z-index: 999;

    image {
        width: 100%;
        height: 100%;
        display: block;
    }
}

// #endif

.supervaluepage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

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

    .u-nav-slot {
        height: 48rpx;
        display: flex;
        align-items: center;

        .back_title {
            width: 132rpx;
            height: 100%;
            margin-left: 10rpx;
        }

    }

    .title {
        width: 100%;
        padding-top: 60rpx;
        text-align: center;
        font-size: 40rpx;
        color: #fff;

        .title_s {
            color: #FFD960;
        }
    }

    .content {
        overflow: auto;
        position: absolute;
        top: 394rpx;
        bottom: 0;
        left: 0;
        right: 0px;
        padding: 34rpx 24rpx 0rpx 24rpx;
        box-sizing: border-box;
        border-radius: 40rpx 40rpx 0rpx 0rpx !important;
        background: #F8F8F8;

        .content_box {
            width: 100%;
            height: 99%;
        }

        .activity_item {
            height: 268rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
            background: #FFFFFF;
            margin-bottom: 24rpx;

            .activity_item_left {
                width: 220rpx;
                height: 100%;
                border-radius: 12rpx;
                overflow: hidden;
                box-sizing: border-box;
                .imgBox {
                    width: 228rpx;
                    height: 228rpx;
                }
            }

            .activity_item_right {
                width: 420rpx;
                height: 100%;
                box-sizing: border-box;

                .item_title {
                    width: 100%;
                    white-space: nowrap;
                    /*强制一行内显示*/
                    overflow: hidden;
                    /*溢出隐藏*/
                    text-overflow: ellipsis;
                    /*超出部分现实省略号*/
                    font-size: 30rpx;
                    color: #333333;
                    line-height: 30rpx;
                    margin-bottom: 12rpx;
                    font-weight: bold;

                }

                .tag_list {
                    margin-bottom: 16rpx;
                    display: flex;
                    align-items: center;

                    .tag_item {
                        font-size: 20rpx;
                        color: #B3834C;
                        border: 2rpx solid #E5DAB4;
                        text-align: center;
                        padding: 4rpx 8rpx;
                        box-sizing: border-box;
                        margin-right: 12rpx;
                        border-radius: 6rpx;
                    }
                }

                .desc {
                    width: 100%;
                    white-space: nowrap;
                    /*强制一行内显示*/
                    overflow: hidden;
                    /*溢出隐藏*/
                    text-overflow: ellipsis;
                    /*超出部分现实省略号*/
                    font-size: 24rpx;
                    color: #B3834C;
                    margin-bottom: 16rpx;

                    &.another {
                        font-size: 24rpx;
                        color: #808080;
                        margin-bottom: 0rpx;
                    }
                }

                .store_box {
                    display: flex;
                    align-items: center;
                    margin-bottom: 14rpx;
                    width: 100%;
                    white-space: nowrap;
                    /*强制一行内显示*/
                    overflow: hidden;
                    /*溢出隐藏*/
                    text-overflow: ellipsis;

                    /*超出部分现实省略号*/
                    .store_name {
                        font-size: 20rpx;
                        line-height: 20rpx;
                        color: #999;
                        margin: 0rpx 4rpx 0rpx 8rpx;
                    }
                }

                .bay_card {
                    width: 100%;
                    height: 76rpx;
                    border-radius: 8rpx;
                    background: #FFF5F4;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12rpx 16rpx;
                    box-sizing: border-box;

                    &.anotherCard {
                        background: #fff;
                        padding: 0rpx 0rpx;
                        margin-bottom: 30rpx;
                    }

                    .cart_left {
                        display: flex;
                        // align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        &.not {
                            flex-direction: row;
                        }

                        .card_top_text {
                            color: #FF9E7A;
                            font-size: 20rpx;
                            display: flex;
                            align-items: center;
                            margin-bottom: 6rpx;

                            &.anothertText {
                                font-size: 18rpx;
                                color: #999999;
                                margin-bottom: 0rpx;

                            }

                            .fakePrice {
                                text-decoration: line-through;
                            }
                        }

                        .cart_bottom_text {
                            color: #FD2E38;
                            display: flex;
                            align-items: center;
                            font-size: 20rpx;

                            &.anotherbText {
                                font-size: 24rpx;
                                color: #1A1A1A;
                                margin-right: 6rpx;

                            }
                        }
                    }
                }
            }

        }
    }

}

.titleCs {
    font-size: 36rpx;
    color: #FFFFFF;
}

:deep(.tn-navbar-back) {
    display: flex;
    align-items: center;
}
:deep(.tn-navbar__content) {
    padding: 0 !important;
}
</style>
