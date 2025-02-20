<template>
    <view class="brandpage">
        <!-- 品牌馆 -->
        <TnNavbar bgColor="transparent" :bottom-shadow="false" home-icon="" placeholder>
            <template #back>
                <TnIcon color="#fff" @click="gotoBack" name="left" size="40"></TnIcon>
            </template>
            <view class=titleCs>{{ activityTitle }}</view>
        </TnNavbar>
        <view class="gradient" :style="{ backgroundImage: `url(${activityBG})` }"></view>
        <view class="content">
            <z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="false" :defaultPageSize="10"
                :loading-more-enabled="false" :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')">
                <view class="activity_item" v-for="item in dataList" :key="item.id" @click.stop="tostore(item.id)">
                    <view class="activity_item_top">
                        <view class="top_left">
                            <image :src="item.thumb" class="imgBox" :lazyLoad="true"></image>
                        </view>
                        <view class="top_right">
                            <view class="top_right_title">{{ item.name }}</view>
                            <view class="top_right_bottom">
                                <TnRate :count="5" v-model="item.score" inactive-icon="star-fill" inactiveColor="#EBEBEB"
                                    activeColor="#FF983D" gutter="2" :readonly="true"></TnRate>
                                <view class="star_text">{{ item.score }}分</view>
                                <!-- 标签 -->
                                <view class="top_tag">
                                    {{ item.levelName }}
                                </view>
                                <view class="top_tag">
                                    好评率{{ (item.reputation * 100).toFixed(0) }}%
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="activity_item_bottom">
                        <view class="bottom_list" v-if="item.shopItemList[0].length > 0">
                            <!-- 返回的数据套了两层数组 -->
                            <view v-for="(shopitem, index) in item.shopItemList[0]" :key="shopitem.id">
                                <view class="bottom_item" :class="{ enditem: index === 3 }" v-if="index < 4"
                                    @click.stop="toactivity(shopitem, item)">
                                    <view class="item_img">
                                        <image :src="shopitem.thumb" class="imgBox"></image>
                                    </view>
                                    <view class="item_text">
                                        {{ shopitem.name }}
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="bottom_not" v-else>
                            <text>暂无上架产品</text>
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
import { gotoShopDetail } from "@/routes/service-routes"
// import { gotoServeDetail, gotoAttendShop } from '@/route/care-routes'
// import { gotoGoodsDetails } from '@/route/goods-routes'
// import { gotoIndex } from '@/route/care-routes'
// import authGuard from '@/sys/auth-guard'
import { PlatformManage } from "@bc/sys"
import { ref, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
const dataList: any = ref([])
const id = ref('')
const activityTitle = ref('优选好店')
const activityBG = ref('')
const allList = ref([])
const slicingList = ref([])


const getAssetsUrl = computed(() => (src: any) => {
    return getAssetsPic(src)
})

onLoad((options: any) => {
    id.value = options.id
    queryList()
})

const leftClick = () => {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    // 如果页面栈长度为1，则表示当前页面为首页
    pages.length === 1 ? gotoIndex() : uni.navigateBack()
}

const paging = ref()

const queryList = () => {
    if (!id.value) {
        uni.showToast({
            title: '活动不存在',
            icon: 'none'
        })
        // gotoIndex()
        return
    }
    getactiviList(id.value).then((res) => {
        activityTitle.value = res.name
        activityBG.value = res.mainImage
        paging.value.complete(res.shopList)

    })
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
                        authGuard.gotoLogin({ page: 1 })
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
    gotoShopDetail(id)
}
</script>

<style lang="scss" scoped>
.brandpage {
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
        // background: linear-gradient(180deg, #FF8941 0%, #FF3C01 140%);
        z-index: -1;
        background-position: center center;
        background-size: 100% 100%;
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

        .activity_item {
            height: 336rpx;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 24rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
            background: #FFFFFF;
            margin-bottom: 24rpx;

            .activity_item_top {
                width: 100%;
                height: 100rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;

                .top_left {
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 12rpx;
                    margin-right: 24rpx;
                    overflow: hidden;

                    .imgBox {
                        width: 100rpx;
                        height: 100rpx;
                    }
                }

                .top_right {
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    justify-content: center;
                    margin-bottom: 16rpx;

                    .top_right_title {
                        color: #333333;
                        font-size: 30rpx;
                        font-weight: bold;
                        margin-bottom: 16rpx;
                    }

                    .top_right_bottom {
                        display: flex;
                        align-items: center;
                        transform: translate(-8rpx, 0rpx);

                        .star_text {
                            font-size: 24rpx;
                            color: #999999;
                            margin: 0rpx 20rpx 0rpx 10rpx;
                        }

                        .top_tag {
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
                }

            }

            .activity_item_bottom {
                flex: 1;
                width: 100%;
                box-sizing: border-box;
                padding: 20rpx 0rpx;

                .bottom_list {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    // justify-content: space-between;
                    .bottom_item {
                        position: relative;
                        border-radius: 8rpx;
                        overflow: hidden;
                        width: 89%;
                        height: 100%;
                        margin-right: 20rpx;

                        .item_img {
                            width: 100%;
                            height: 100%;

                            .imgBox {
                                width: 152rpx;
                                height: 152rpx;
                            }
                        }

                        .item_text {
                            padding: 4rpx 8rpx;
                            box-sizing: border-box;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            text-align: center;
                            color: #FFFFFF;
                            font-size: 20rpx;
                            background-color: rgba(0, 0, 0, 0.5);
                            width: 100%;
                            white-space: nowrap;
                            /*强制一行内显示*/
                            overflow: hidden;
                            /*溢出隐藏*/
                            text-overflow: ellipsis;
                            /*超出部分现实省略号*/
                        }

                    }

                    .enditem {
                        margin-right: 0rpx;
                    }
                }

                .bottom_not {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24rpx;
                    color: #C7C7C7;
                    border: 2rpx solid #F2F2F2;
                    border-radius: 8rpx;
                }
            }

        }
    }
}
.titleCs {
    font-size: 36rpx;
    color: #FFFFFF;
}
:deep(.tn-navbar-back ) {
    display: flex;
    align-items: center;
}
:deep(.tn-navbar__content) {
    padding: 0 !important;
}
</style>
