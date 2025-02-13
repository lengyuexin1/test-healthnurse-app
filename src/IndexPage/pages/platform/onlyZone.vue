<template>
    <view class="container" v-if="isAdorn">
        <z-paging ref="paging" :auto="false" :refresher-enabled="false" @scroll="scrollPage">
            <!-- <template #top> -->
            <view class="fixedCs">
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <bc-page-navbar :title="detailData.name"></bc-page-navbar>
            </view>
            <view class="indexImg" :style="imgStyle" v-if="closeImg">
                <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" :vertical="false"
                    @change="liveswiperChange">
                    <swiper-item class="swiper_item" v-for="(item, index) in swiperList" :key="index">
                        <image class="towPro_img" :src="item.icon" />
                    </swiper-item>
                </swiper>
                <view class="swiper_sign_box">
                    <view class="sign_item" :class="{ 'is_sign': signIndex == swiperIndex }"
                        v-for="(signItem, signIndex) in swiperList.length" :key="signIndex"></view>
                </view>
            </view>
            <!-- </template> -->
            <!-- <view class="space_box"></view> -->
            <view class="btns" v-if="detailData.couponIds">
                <view class="btnItem" @click="tapArt(item, index)" :class="{ 'acticol': curret == index }"
                    v-for="(item, index) in couDatas" key="index">
                    <view class="zoneQuan">
                        <!-- <view class="fuha">￥ <span class="monum">10</span></view> -->
                        <view class="fuha"> <span class="monum">{{ item.typeName }}</span></view>
                        <view class="textuse">{{ item.desc }}</view>
                    </view>
                    <view class="syuas">
                        <view class="zonr1"></view>
                        <view class="lineDa"></view>
                        <view class="zonr2"></view>
                    </view>
                    <view v-if="!item.status" class="goUse" @click="getQuCou(item)">领取</view>
                    <view class="alseUse" v-else @click="useCou">去使用</view>
                </view>
            </view>
            <view class="qianGoods">
                <!-- <TnTabs v-model="currentTabIndex" color="#959595" v-if="detailData.categoryList" bg-color="transparent"
                    :bottom-shadow="false" active-color="#333333" font-size="36rpx" bar-color="transparent">
                    <view class="typeLi" v-for="(item, index) in detailData.categoryList" :key="index">
                        <image class="towPro_img" :src="getAssetsUrl('/device/home/newUserwe.png')"
                            @click="changeType(item)" />
                        <view class="typeText">二级分类1</view>
                    </view>
                </TnTabs> -->
                <view v-for="(its, inds) in faList" key="index">
                    <view class="qianTitle">
                        <view>{{ its.name }}</view>
                        <view class="mornSee" @click="seeMonr(its)">
                            <view>查看更多</view>
                            <TnIcon name="right" />
                        </view>
                    </view>
                    <view class="crazy">
                        <view class="crezy_ul">
                            <view class="crezy_li" v-for="(item, index) in its.dataList" :key="index"
                                @click="gotoDetail(item)">
                                <image class="towPro_img" :src="item.thumb" mode="scaleToFill" />
                                <view class="crazy_bottom">
                                    <view>
                                        <view class="product_name">{{ item.name }}</view>
                                        <view class="product_smal">{{ item.desc }}</view>
                                    </view>
                                    <view class="difMoney">
                                        <view class="realMoney">￥{{ moneyFilter(item.price) }}</view>
                                        <!-- <view class="ageMoney">￥362</view> -->
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </z-paging>
    </view>
    <view v-else>
        <z-paging ref="paging2" v-model="norList" :auto="true" :fixed="true" @query="queryList" :defaultPageSize="6"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }">
            <template #top>
                <bc-page-navbar :title="'产品列表'"></bc-page-navbar>
            </template>
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
import { gotoCateArrList } from '@/routes/active-routes'

const norList: any = ref([])
const paging = ref()
const paging2 = ref()
const swiperIndex = ref(0)
const pageTitle = ref('产品')

const imgStyle = ref('opacity: 1')
const closeImg = ref(true)
const swiperList: any = ref([])

const isAdorn = ref(0)
const detailData: any = ref({})
const detailId = ref('')
const titleName = ref('')
onLoad((option: any) => {
    detailId.value = option.id
    columnDetail(option.id).then(res => {
        titleName.value = option.name
        detailData.value = res
        isAdorn.value = res.isAdorn
        if (res.isAdorn) {
            // 轮播图
            getBannerList(res.bannerIds)
            //类目产品
            faList.value = res.categoryList
            if (faList.value.length > 0) {
                faList.value.forEach((element: any) => {
                    channeCatelList(element, element.categoryIds)
                })
            }
            // 优惠券
            getCouList(res.couponIds)
        }

    })
})

const couDatas: any = ref([])
const getCouList = (cuoIds: any) => {
    const couData = {
        pageNumber: 1,
        pageSize: 30,
        query: {
            ids: cuoIds
        }
    }

    zqCouList(couData).then(res => {
        couDatas.value = res.data
    })
}

const faList: any = ref([])
const channeCatelList = (item: any, id: any) => {
    const sendda = {
        pageNumber: 1,
        pageSize: 10,
        query: {
            categoryIds: id
        }
    }
    productList(sendda).then(res => {
        item.dataList = res.data.length > 0 ? res.data.slice(0, 6) : res.data
    })
}

const cateList: any = ref([])
const diajCou = ref(false)
// const queryList = (pageNumber: number, pageSize: number) => {
//     columnDetail(detailId.value).then((res: any) => {
//         const sendda = {
//             pageNumber: pageNumber,
//             pageSize: pageSize,
//             query: {
//                 categoryIds: res.isAdorn || diajCou.value ? cateList.value : res.categoryIds
//             }
//         }
//         productList(sendda).then(res => {
//             // norList.value = res.data
//             (paging2.value as any).complete(res.data)
//         })
//     })
// }

const liveswiperChange = (e: any) => {
    swiperIndex.value = e.detail.current
}
const scrollPage = (e: any) => {
    // const opacity = e.detail.scrollTop / 80
    // console.log(opacity)

    // closeImg.value = true
    // if (e.detail.scrollTop < 30) {
    //     return imgStyle.value = 'opacity: 1'
    // }
    // if (opacity > 1) {
    //     imgStyle.value = 'opacity: 0'
    //     closeImg.value = false
    //     return
    // }
    // imgStyle.value = `opacity: ${opacity}`
}
const curret = ref(0)
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const tapArt = (item: any, index: number) => {
    if (index == 1) {
        paging.value.scrollIntoViewById(item.id, 200)
    }
    curret.value = index
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

const changeType = (item: any) => { }

const getQuCou = (item: any) => {
    takeCoupon({ couponId: item.id }).then(() => {
        uni.showToast({
            icon: 'none',
            text: '领取成功'
        })
        item.status = 1
    }).catch((err: any) => {
        console.log(err.message)
    })
}

const getBannerList = (data: any) => {
    const dares = {
        ids: data
    }
    bannerList(dares).then(res => {
        swiperList.value = res
        console.log(swiperList.value, '轮播图');

    })
}

const useCou = () => {
    // diajCou.value = false
    // cateList.value = []
    // isAdorn.value = 0
    gotoCateArrList({type: 1, id: detailId.value})
}
const seeMonr = (item: any) => {
    console.log(item);
    gotoCateArrList({type: 2, id: item.id})
    // gotoCateList({id: item.id})
    // diajCou.value = false
    // cateList.value = item.categoryIds
    // isAdorn.value = 0
}
</script>
<style lang="scss" scoped>
.fixedCs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}
.indexImg {
    width: 100%;
    height: 1000rpx;
    position: relative;
    // top: 0;
    // left: 0;
    // z-index: 99;

    .towPro_img {
        width: 100%;
        height: 500rpx;
    }
}

.btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16rpx;
    margin: 30rpx 20rpx 0 20rpx;
    height: 180rpx;

    .btnItem {
        position: relative;
        padding: 24rpx;
        background: #fff;
        font-size: 28rpx;
        color: #333333;
        border-radius: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goUse {
            writing-mode: vertical-rl;
            padding: 10rpx 6rpx 10rpx 4rpx;
            border-radius: 20rpx;
            border: 2rpx solid #585858;
            font-size: 28rpx;
            color: #333333;
        }

        .alseUse {
            writing-mode: vertical-rl;
            padding: 10rpx 6rpx 10rpx 4rpx;
            border-radius: 20rpx;
            border: 2rpx solid #333333;
            font-size: 28rpx;
            color: #ffff;
            background: #333333;
        }

        .zoneQuan {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 70%;

            .fuha {
                font-weight: 600;
                font-size: 28rpx;
                color: #000000;

                .monum {
                    font-weight: 600;
                    font-size: 56rpx;
                    color: #000000;
                }
            }

            .textuse {
                font-size: 24rpx;
                color: #666666;
            }
        }

        .syuas {
            position: absolute;
            top: 0;
            right: 28%;

            .zonr1 {
                width: 20rpx;
                height: 20rpx;
                background: #F1F3F5;
                border-radius: 50%;
                margin-top: -10rpx;
            }

            .lineDa {
                height: 140rpx;
                margin: 10rpx auto;
                width: 0rpx;
                border-right: 2rpx dashed #DBDBDB;
            }

            .zonr2 {
                width: 20rpx;
                height: 20rpx;
                background: #F1F3F5;
                border-radius: 50%;
                margin-bottom: -10rpx;
            }
        }
    }
}

.space_box {
    width: 100%;
    height: 700rpx;
}

.swiper {
    width: 100%;
    height: 100%;

    .swiper_item {
        width: 100%;
        height: 100%;
        position: relative;

        .towPro_img {
            width: 100%;
            height: 1000rpx;
        }
    }
}

.swiper_sign_box {
    position: absolute;
    bottom: 12rpx;
    left: 50%;
    transform: translate(-50%, 0rpx);
    display: flex;
    align-items: center;

    .sign_item {
        width: 12rpx;
        height: 12rpx;
        background: #FFFFFF;
        opacity: 0.3;
        margin-left: 8rpx;
        border-radius: 50%;

        &.is_sign {
            opacity: 1;
        }
    }

    .tow_sign {
        background: #E5E5E5;

        &.is_sign {
            background: #CE0829;
        }
    }
}

.qianGoods {
    margin: 30rpx 20rpx 40rpx 20rpx;

    .typeLi {
        width: 150rpx;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .towPro_img {
            width: 50rpx;
            height: 50rpx;
        }
    }

    .typeText {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #2B2C2E;
    }

    .qianTitle {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
        margin: 50rpx 0 20rpx 0;

        .mornSee {
            display: flex;
            font-size: 28rpx;
            color: #999999;
        }
    }

    .crazy {

        .crezy_ul {
            margin-top: 20rpx;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 16rpx;

            .crezy_li {
                background-color: #fff;
                height: 430rpx;
                border-radius: 24rpx;

                .towPro_img {
                    width: 226rpx;
                    height: 226rpx;
                    padding: 20rpx;
                }

                .crazy_bottom {
                    margin-top: 8rpx;
                    margin-left: 16rpx
                }

                .product_name {
                    font-weight: 600;
                    font-size: 24rpx;
                    color: #020202;
                }

                .product_smal {
                    margin-top: 8rpx;
                    font-size: 20rpx;
                    color: #666666;
                }

                .difMoney {
                    display: flex;
                    align-items: center;
                    margin-top: 60rpx;
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
    }
}

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