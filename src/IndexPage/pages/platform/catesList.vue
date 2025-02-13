<template>
    <view class="capoyin">
        <z-paging ref="paging2" v-model="norList" :auto="true" :fixed="true" @query="queryList" :defaultPageSize="6"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <!-- <template #top>
                <bc-page-navbar :title="'产品列表'"></bc-page-navbar>
            </template> -->
            <div class="shopbox">
                <div class="shopli row" v-for="(item, index) in norList" :key="index" @click="gotoDetail(item)">
                    <div class="shopimg">
                        <image :src="item.thumb" class="imgBox1"></image>
                    </div>
                    <div class="shoprig">
                        <div class="shoptit u-line-1">{{ item.name }}</div>
                        <div class="shoptip u-line-1" v-if="item.desc">
                            {{ item.desc }}
                        </div>
                        <div class="shoppic">
                            <text class="shopmon">￥{{ moneyFilter(item.price) }}</text>
                            <text class="shopmon left">起</text>
                            <text class="shopdel" v-if="item.fakePrice">￥{{ moneyFilter(item.fakePrice) }}</text>
                        </div>
                        <div class="shopjudge row i-center">
                            <image :src="item.shopThumb" class="imgBox2"></image>
                            <text class=" u-line-1">{{ item.shopName || '' }}</text>
                        </div>
                    </div>
                </div>
            </div>

        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { moneyFilter } from "@/common/filters"
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from '@/common/setPicture'
import { takeCoupon } from '@/api/order-api'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import { onLoad } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { columnDetail, productList, bannerList, zqCouList } from "@/api/setite-api"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"
import { gotogoodsDetail } from '@/routes/goods-routes'

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const norList: any = ref([])
const paging2 = ref()
const detailId = ref('')
const detailType = ref(0)

onLoad((option: any) => {
    detailType.value = option.type
    detailId.value = option.id
})

const queryList = (pageNumber: number, pageSize: number) => {
    columnDetail(detailId.value).then((res: any) => {
        uni.setNavigationBarTitle({ title: res.name })
        const sendda = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            query: {
                categoryIds: detailType.value == 2 ? res.categoryIds : []
            }
        }
        productList(sendda).then(res => {
            // norList.value = res.data
            (paging2.value as any).complete(res.data)
        })
    })
}

const gotoDetail = (item: any) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            uni.showToast({
                icon: "none",
                text: '登录失效,请重新登录'
            })
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        gotogoodsDetail(item.id)
    })
}

</script>
<style lang="scss" scoped>
.shopbox {
    padding: 0 24rpx 24rpx;

    .shopli {
        margin-top: 24rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 24rpx;

        .shopimg {
            position: relative;

            .imgBox1 {
                width: 210rpx;
                height: 210rpx;
            }

            .shopgrade {
                width: 64rpx;
                border-radius: 0rpx 0rpx 5rpx 5rpx;
                position: absolute;
                left: 50%;
                margin-left: -32rpx;
                top: 0;
                z-index: 50;
            }
        }

        .shoprig {
            margin-left: 24rpx;

            .shoptit {
                margin-top: 10rpx;
                font-size: 30rpx;
                font-weight: 500;
                line-height: 40rpx;
                color: #333333;
            }

            .shopjudge {
                margin-top: 14rpx;

                .imgBox2 {
                    width: 30rpx;
                    height: 30rpx;
                }

                text {
                    margin-left: 12rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                }
            }

            .shoptip {
                margin-top: 8rpx;
                font-size: 26rpx;
                font-weight: 400;
                line-height: 42rpx;
                color: #808080;

                text {
                    border-right: 2rpx solid #808080;
                    padding: 0 8rpx;

                    &:last-child {
                        border: none;
                    }
                }
            }

            .shoppic {
                margin-top: 20rpx;

                .shopmon {
                    font-size: 28rpx;
                    font-weight: 500;
                    color: #333333;

                    &.left {
                        font-size: 24rpx;
                        padding-left: 2rpx;
                    }
                }

                .shopdel {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                    margin-left: 4rpx;
                    text-decoration: line-through;
                }
            }
        }
    }
}
</style>