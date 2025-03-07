<template>
    <view class="contraner">
        <z-paging ref="paging" v-model="data.dataList" @query="queryList" :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }" :auto="true">
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="titleName">
                </bc-page-navbar>
                <!-- 自定义导航栏 -->
                <!-- <TnSticky :customNavHeight="0">
                    <div class="menu">
                        <div class="menu_item" @click="showCategory">
                            <text class="menu_item_text" :class="{ 'isclick': data.showcategory }">综合排序</text>
                            <image class="menu_item_img"
                                :src="data.showcategory ? getAssetsUrl('/channel/icon_down_highlig.png') : getAssetsUrl('/channel/icon_down.png')"
                                mode="scaleToFill" />
                        </div>
                        <div class="menu_item" @click="showRegion">
                            <text class="menu_item_text" :class="{ 'isclick': data.showregion }">区域</text>
                            <image class="menu_item_img"
                                :src="data.showregion ? getAssetsUrl('/channel/icon_down_highlig.png') : getAssetsUrl('/channel/icon_down.png')"
                                mode="scaleToFill" />
                        </div>
                        <div class="menu_item" @click="changePrice" v-if="data.templateId == 123">
                            <text class="menu_item_text" :class="{ 'isclick': data.showpriceItem }">价格</text>
                            <image class="menu_item_img"
                                :src="data.showpriceItem ? getAssetsUrl('/channel/icon_down_highlig.png') : getAssetsUrl('/channel/icon_down.png')"
                                mode="scaleToFill" />
                        </div>
                    </div>
                </TnSticky> -->
            </template>

            <!-- <listItem :agencyList="data.dataList" :coordinate="data.coordinate" :positioning="data.positioning"
                :templateId="data.templateId" :isRecommend="false" /> -->
            <div class="shopbox">
                <div class="shopli row" v-for="(item) in data.dataList" :key="item.id" @click="linkinfo(item)">
                    <div class="shopimg">
                        <!-- <view class="shopgrade" v-if="baseGrade(item.level)">
                            <u-image :src="baseGrade(item.level)" width="64rpx" height="64rpx" mode="widthFix">
                                <view slot="error"></view>
                            </u-image>
                        </view> -->
                        <image :src="item.thumb" class="dxImg"></image>
                    </div>
                    <div class="shoprig">
                        <div class="shoptit u-line-1">{{ item.name }}</div><!-- -{{item.optionName}} -->
                        <div class="shoptip u-line-1">
                            <!-- <text v-for="(item,index) in 13" :key="index">可按天</text> -->
                            {{ item.desc }}
                        </div>
                        <div class="shoppic" v-if="item.businessType !== 4">
                            <text class="shopmon">￥{{ moneyFilter(item.price) }}</text>
                            <!-- moneyFilter(item.price / item.quantity) -->
                            <text class="shopmon left">/{{ "起" }}</text>
                            <!-- item.unitName + -->
                            <text class="shopdel" v-if="item.fakePrice">￥{{ moneyFilter(item.fakePrice / item.quantity)
                            }}</text>
                        </div>
                        <div class="shopjudge row i-center">
                            <view style="display:flex;">
                                <image v-if="item.businessType !== 4" :src="setShopPic(item.shopThumb)" class="shopIcon"
                                    radius="30rpx"></image>
                                <text class=" u-line-1">{{ item.shopName || '' }}</text>
                            </view>
                            <view v-if="false" class="Learn_more" @click.stop="Learnmore(item.id)">
                                了解详情 >
                            </view>
                        </div>
                    </div>
                </div>
            </div>


            <TnPopup v-model="data.show" open-direction="top" :safeAreaInsetBottom="false" round="32rpx"
                :closeOnClickOverlay="true" @close="allClose">
                <div class="menu_show_box" :style="'margin-top:' + data.navbarTop + 'px'">
                    <!-- 区域菜单 -->
                    <div class="region_box" v-if="data.showregion">
                        <div class="region_box_top">
                            <text class="region_box_top_text">当前城市:</text>
                            <text class="nowcity">广州</text>
                        </div>
                        <div class="region_box_list">
                            <view class="gird">
                                <view v-for="(areaListItem, areaListIndex) in data.areaList" :key="areaListIndex">
                                    <div class="region_box_item" @click="clickarea(areaListItem, areaListIndex)"
                                        :class="{ 'isshow_region': data.districtIds.includes(areaListItem.id) }">{{
                                            areaListItem.name
                                        }}
                                    </div>
                                </view>
                            </view>
                        </div>
                    </div>

                    <!-- 类别菜单 -->
                    <div class="category_box" v-if="data.showcategory">
                        <div class="category_box_list">
                            <div v-for="(item, index) in data.categoryList" :key="index" class="category_box_item"
                                @click="clickcategory(item, index)"
                                :class="{ 'isshow_region': data.categoryIds.includes(item.id) }">{{ item.name }}
                            </div>
                        </div>
                    </div>

                    <!-- 价格菜单 -->
                    <div class="priceItem_box" v-if="data.showpriceItem">
                        <div class="priceItem_box_list">
                            <div class="priceItem" @click="data.priceIndex = 999"
                                :class="{ 'isshow_region': data.priceIndex == 999 }">不限
                            </div>
                            <div v-for="(item, index) in data.priceItemlist" :key="index"
                                :class="{ 'isshow_region': index == data.priceIndex }" class="priceItem"
                                @click="clickpriceItem(item, index)">
                                <text v-if="!item.minPrice">{{ item.maxPrice }}以下</text>
                                <text v-if="item.minPrice && item.maxPrice">{{ item.minPrice }}-{{ item.maxPrice }}
                                </text>
                                <text v-if="!item.maxPrice">{{ item.minPrice }}以上</text>
                            </div>
                        </div>
                    </div>

                    <!-- 选中选项 -->
                    <div class="menu_btn">
                        <div class="resetting_btn" @click="resetting">重置</div>
                        <div class="selected_btn" @click="selected">确定</div>
                    </div>
                </div>
            </TnPopup>
        </z-paging>
        <yk-authpup ref="authpup" type="top" :isNativeHead="false" @changeAuth="getLocation"
            permissionID="ACCESS_FINE_LOCATION" :animation="false"></yk-authpup>
        <view class="chatbox" @click="gotoChat" v-if="false">
            <image :src="getAssetsUrl('/platform/chatAvatar.png')" style="width: 96rpx;height: 96rpx;"></image>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { moneyFilter } from "@/common/filters"
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnSticky from '@tuniao/tnui-vue3-uniapp/components/sticky/src/sticky.vue'
import { getAssetsPic, setPriceVer } from "@/common/setPicture"
import { getCategoryShowList, getSerListAll } from "@/api/care-api"
import { gotochoiceDetails, gotohealthDetails, gotoSearch } from "@/routes/plateform-routes"
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { gotogoodsDetail } from '@/routes/goods-routes'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
// import { appear } from "@/api/user-api"
// #ifdef APP-PLUS
//阿里云一键登录sdk
// #endif
import { columnList } from "@/api/setite-api"
import { gotoserviceDetail, gotoServiceOrg } from '@/routes/service-routes'
import { recomLikeList, recommendList } from "@/api/goods-api"
import { gotoLogin } from "@/routes/public-routes"
import listItem from "./listItem/listItem.vue"
import { computed, onMounted, reactive, ref, watch } from "vue"
import { organizationList } from "@/api/service-api"
import { getSonList } from "@/api/user-api"
import { onLoad } from "@dcloudio/uni-app"
import { searListFlag } from "@/api/open-api"
import { happysearch } from '@/api/user-api'
import { activeDetail } from "@/api/setite-api"
import { PlatformManage } from "@bc/sys"

const titleName = ref('服务列表')
const authpup = ref()
const paging = ref()

interface priceItem {
    id: number,
    maxPrice: number | null,
    minPrice: number | null
}


interface Data {
    typeTitle: string,
    show: boolean,
    showregion: boolean,
    showcategory: boolean,
    showpriceItem: boolean,
    navbarTop: number,
    rateValue: number,
    areaList: Array<any>,
    areaIndex: number | null,
    categoryList: Array<any>,
    categoryIndex: number | null,
    dataList: Array<any>,
    parentId: number,
    templateId: number,
    positioning: boolean,
    coordinate: any,
    categoryId: number | null,
    categoryIds: Array<number>,
    districtId: number | null,
    districtIds: Array<number>,
    sortType: number,
    priceItemlist: Array<priceItem>,
    priceId: number,
    priceIndex: number | null,
    maxPrice: number | null,
    minPrice: number | null
}

const data = reactive<Data>({
    typeTitle: "",
    show: false,
    showregion: false,
    showcategory: false,
    showpriceItem: false,
    navbarTop: 175,
    rateValue: 3,
    areaList: [],
    areaIndex: null, //
    categoryList: [],
    categoryIndex: null, //
    dataList: [],
    parentId: 440100,
    templateId: 123,
    positioning: false,
    coordinate: {}, //经纬度
    categoryId: null,
    categoryIds: [],
    districtId: null,
    districtIds: [],
    sortType: 0, //价格排序 1升序 2降序 0未选中
    priceItemlist: [
        { id: 1, maxPrice: 100000, minPrice: null },
        { id: 2, maxPrice: 200000, minPrice: 100000 },
        { id: 3, maxPrice: 300000, minPrice: 200000 },
        { id: 4, maxPrice: 500000, minPrice: 300000 },
        { id: 5, maxPrice: 1000000, minPrice: 500000 },
        { id: 6, maxPrice: 1200000, minPrice: 1000000 },
        { id: 7, maxPrice: null, minPrice: 1200000 }
    ],
    priceId: 0,
    priceIndex: null
})

const conApi = ref(false)

const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
const setShopPic = computed(() => {
    return (str) => {
        return setPriceVer(str)
    }
})
const baseGrade = computed(() => {
    return (type: number) => {
        switch (type) {
            case 4:
                return false
            default:
                return getAssetsPic(`/shop/seller_level_${type}.png`)
        }
    }
})

const dataCates = ref('')
onLoad((options: any) => {
    if (options.type) {
        options.type == 1 ? titleName.value = '特惠服务' : titleName.value = '特惠商品'
        activeDetail(options.id).then(res => {
            getCipList(options.type, res.categoryIds)
        })
    }
    else {
        titleName.value = options.name
        kuaiRou(options.id)
    }
})

const getCipList = (type: any, dataCate: any) => {
    const objData = {
        pageSize: 100,
        pageNumber: 1,
        query: {
            sourceType: type,
            categoryIds: dataCate
        }
    }
    happysearch(objData, true).then(res =>
        data.dataList = res.data
        // paging.value.complete(res.data)
    )
}

const kuaiRou = (data: any) => {
    const dares = {
        ids: [data]
    }
    columnList(dares).then(res => {
        conApi.value = true
        dataCates.value = res[0].categoryIds
        console.log('参数', res[0].categoryIds)
        // queryList(1, 10)
        paging.value.reload()
    })
}

const showprice = computed(() => {
    return (min: number, max: number) => {
        if (min && max) {
            if (min == max) {
                return 1
            }
            else {
                return 2
            }
        }
        else if (!min && !max) {
            return 3
        }
        else {
            return 1
        }
    }
})
const priceText = computed(() => {
    return (index: number) => {
        if (index == 999) {
            return "不限"
        }
        else if (index && data.maxPrice && data.minPrice) {
            return data.minPrice / 100 + "-" + data.maxPrice / 100
        }
        else if (index == 0 && data.maxPrice && !data.minPrice) {
            return data.maxPrice / 100 + "以下"
        }
        else if (index && !data.maxPrice && data.minPrice) {
            return data.minPrice / 100 + "以上"
        }
        else {
            return "价格"
        }
    }
})

const linkinfo = (item: any) => {
    // 检查登录状态
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        if (item.businessType == 1) {
            return gotoserviceDetail(item.id)
        }
        if (item.businessType == 2) {
            return gotogoodsDetail(item.id)
        }
        if (item.businessType == 4) {
            return gotoServiceOrg(item.id)
        }

    })
}

// watch(() => data.templateId, (newVal) => {
//     if (newVal == 122) {
//         data.typeTitle = "找机构"
//         getStairCategory(12)
//     }
//     else {
//         data.typeTitle = "找康养"
//         getStairCategory(13)
//     }
// })
onMounted(() => {
    /* PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            // #ifdef APP-PLUS
            this.appLogins()
            // #endif

            // #ifdef MP-WEIXIN || H5
            this.linkLogin()
            // #endif
            console.log('重新登录')
            return
        }
    }) */


    // 区域
    hasAreaList()

    // if (data.templateId == 122) {
    //     data.typeTitle = "找机构"
    //     getStairCategory(12)
    // }
    // else {
    //     data.typeTitle = "找康养"
    //     getStairCategory(13)
    // }

    // 获取头部高度navbarTop
    getnavbarTop()

    // #ifndef APP-PLUS
    getLocation()
    // #endif
})
const goback = () => {
    uni.navigateBack()
}
// 前往登录
const linkLogin = () => {
    if (data.userinfo) {
        return
    }
    gotoLogin()
}
const getLocation = () => {
    // 获取当前位置
    getDistancesfun().then((res) => {
        data.coordinate = {
            lat: res.lat1,
            lng: res.lng1
        }
    })
}
const queryList = (pageNumber, pageSize) => {
    if (!conApi.value) {
        paging.value.complete([])
        return 
    }
    console.log('测试')
    recommendList({
        pageNumber,
        pageSize,
        query: {
            categoryIds: dataCates.value
        }
    }).then(res => {
        paging.value.complete(res.data)
    })

}
// 机构类目
const getStairCategory = (type) => {
    const action = type == 13 ? getCategoryShowList({ id: 18, appType: 1 }) : getCategoryShowList({
        id: 15, appType: 1
    })
    action.then((res) => {

        data.categoryList = []
        // if (type == 13) {
        data.categoryList = res
        // } else {
        //     const catelist = res.map((item) => {
        //         if (item.categories.length != 0) {
        //             return item.categories
        //         }
        //     })
        //     this.categoryList = catelist.flat()
        // }
    })
}

// 区域接口
const hasAreaList = () => {
    getSonList({ parentId: data.parentId }).then((res) => {
        data.areaList = res
        paging.value.reload()
    })
}

// 获取头部高度
const getnavbarTop = () => {
    uni.getSystemInfo({
        success: res => {
            const { statusBarHeight } = res
            // if (statusBarHeight > 0) {
            //     data.navbarTop += res.statusBarHeight
            // }
        }
    })
}
const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                data.positioning = true
                resolve({
                    lat1: res.latitude,
                    lng1: res.longitude
                })
            },
            fail: (err) => {
                data.positioning = false
                reject(err)
            }
        })
    })
}

// 打开区域菜单
const showRegion = () => {
    data.showcategory = false
    data.showpriceItem = false
    if (data.showregion) {
        data.showregion = false
        data.show = false
    }
    else {
        data.showregion = true
        data.show = true
    }
}
// 打开类别菜单
const showCategory = () => {
    data.showregion = false
    data.showpriceItem = false
    if (data.showcategory) {
        data.showcategory = false
        data.show = false
    }
    else {
        data.showcategory = true
        data.show = true
    }
}
// 价格菜单
// const changePrice = () => {
//     data.showcategory = false
//     data.showregion = false
//     if (data.showpriceItem) {
//         data.showpriceItem = false
//         data.show = false
//     }
//     else {
//         data.showpriceItem = true
//         data.show = true
//     }
// }

// 选中菜单选项
const clickarea = (item) => {
    if (data.districtIds.includes(item.id)) {
        data.districtIndex = data.districtIds.indexOf(item.id)
        if (data.districtIndex !== -1) {
            data.districtIds.splice(data.districtIndex, 1)
        }
        return
    }
    data.districtIds.push(item.id)
}
const clickcategory = (item) => {
    if (data.categoryIds.includes(item.id)) {
        const categoryIndex = data.categoryIds.indexOf(item.id)
        if (categoryIndex !== -1) {
            data.categoryIds.splice(categoryIndex, 1)
        }
        return
    }
    data.categoryIds.push(item.id)
}
const clickpriceItem = (item, index) => {
    if (data.priceIndex == index) {
        data.priceIndex = null
        data.maxPrice = null
        data.minPrice = null
        return
    }
    data.priceIndex = index
    data.maxPrice = item.maxPrice
    data.minPrice = item.minPrice
}
// 确认排序
const selected = () => {
    allClose()
    paging.value.reload()
}
const allClose = () => {
    data.show = false
    data.showregion = false
    data.showcategory = false
    data.showpriceItem = false
}
// 重置
const resetting = () => {
    if (data.showregion) {
        data.districtIds = []
    }
    if (data.showcategory) {
        data.categoryIds = []
    }
    if (data.showpriceItem) {
        data.priceIndex = null
        this.maxPrice = null
        this.minPrice = null
    }
}
const tochoiceDetails = (item) => {
    if (data.templateId == 122) {
        gotochoiceDetails(item.id, item.isAd)
    }
    else {
        gotohealthDetails(item.id, item.isAd)
    }
}
</script>

<style lang="scss" scoped>
.gird {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
}

.top_box {
    background: #fff;
    border-bottom: 2rpx solid #f2f2f2;

    .top_swiper {
        padding-left: 20rpx;
        box-sizing: border-box;
        width: 100%;
        border-top: 2rpx solid #f2f2f2;
        border-bottom: 2rpx solid #f2f2f2;
        box-sizing: border-box;
    }
}

.contraner {
    height: 100vh;

    .menu {
        padding: 0 24rpx;
        width: 100%;
        height: 80rpx;
        // background: linear-gradient(180deg, #dff7ef -190%, #f8f9f9 110%);
        display: flex;
        justify-content: flex-star;

        .menu_item {
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .menu_item_text {
                color: #333333;
                font-size: 28rpx;
                margin-right: 10rpx;

                &.isclick {
                    color: #29c86f;
                }
            }

            .menu_item_img {
                width: 16rpx;
                height: 16rpx;

                &.up {
                    transform: rotate(180deg);
                }
            }

            .price_icon {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
        }
    }

    .menu_show_box {
        width: 100%;
        // height: 500rpx;
        border-top: 4rpx solid #f2f3f5;
        margin-top: 175px;
        box-sizing: border-box;

        .region_box {
            padding: 30rpx;
            padding-bottom: 0rpx;
            box-sizing: border-box;

            .region_box_top {
                margin-bottom: 30rpx;

                .region_box_top_text {
                    font-size: 28rpx;
                    color: #000;
                    margin-right: 10rpx;
                }

                .nowcity {
                    font-size: 28rpx;
                    font-weight: 500;
                    line-height: 36rpx;
                    color: #333;
                }
            }

            .region_box_list {
                .region_box_item {
                    padding: 16rpx 50rpx;
                    height: 72rpx;
                    text-align: center;
                    background: #f7f7f7;
                    border-radius: 36rpx;
                    font-size: 28rpx;
                    color: #333;
                    box-sizing: border-box;
                    margin-bottom: 30rpx;
                    border: 2rpx solid #f0f0f0;

                    &.isshow_region {
                        color: #29c86f;
                        border: 2px solid rgba(41, 200, 111, 0.302);
                        background: rgba(41, 200, 111, 0.15);
                    }
                }
            }
        }

        .category_box {
            padding: 30rpx;
            padding-bottom: 0rpx;
            box-sizing: border-box;

            .category_box_list {
                display: flex;
                flex-wrap: wrap;

                .category_box_item {
                    padding: 16rpx 50rpx;
                    height: 72rpx;
                    text-align: center;
                    background: #f7f7f7;
                    border-radius: 36rpx;
                    font-size: 28rpx;
                    color: #333;
                    box-sizing: border-box;
                    margin-bottom: 30rpx;
                    margin-right: 10rpx;
                    border: 2rpx solid #f0f0f0;

                    &.isshow_region {
                        color: #29c86f;
                        border: 2px solid rgba(41, 200, 111, 0.302);
                        background: rgba(41, 200, 111, 0.15);
                    }
                }
            }
        }

        .priceItem_box {
            padding: 30rpx;
            padding-bottom: 0rpx;
            box-sizing: border-box;

            .priceItem_box_list {
                display: flex;
                flex-wrap: wrap;

                .priceItem {
                    padding: 10rpx 30rpx;
                    height: 72rpx;
                    line-height: 50rpx;
                    text-align: center;
                    background: #f7f7f7;
                    border-radius: 36rpx;
                    font-size: 28rpx;
                    color: #333;
                    box-sizing: border-box;
                    margin-bottom: 30rpx;
                    margin-right: 10rpx;
                    border: 2rpx solid #f0f0f0;

                    &.isshow_region {
                        color: #29c86f;
                        border: 2px solid rgba(41, 200, 111, 0.302);
                        background: rgba(41, 200, 111, 0.15);
                    }
                }
            }
        }

        .menu_btn {
            width: 100%;
            height: 140rpx;
            box-shadow: 0rpx -4rpx 12rpx rgba(0, 0, 0, 0.03);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30rpx;
            box-sizing: border-box;

            .resetting_btn {
                width: 236rpx;
                height: 80rpx;
                border-radius: 42rpx;
                border: 2rpx solid #eeeeee;
                background: #ffffff;
                text-align: center;
                line-height: 80rpx;
                color: #666666;
                font-size: 30rpx;
            }

            .selected_btn {
                width: 434rpx;
                height: 80rpx;
                background: #29c86f;
                border-radius: 42rpx;
                text-align: center;
                line-height: 80rpx;
                color: #ffffff;
                font-size: 30rpx;
            }
        }
    }
}

.chatbox {
    position: fixed;
    width: 96rpx;
    height: 96rpx;
    bottom: 440rpx;
    right: 4rpx;
}

.back_icon {
    margin-top: 22rpx;
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

            .dxImg {
                width: 210rpx;
                height: 210rpx;
                border-radius: 12rpx;
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
            flex: 1;

            .shoptit {
                margin-top: 10rpx;
                font-size: 32rpx;
                font-weight: 500;
                line-height: 42rpx;
                color: #333333;
            }

            .shopjudge {
                margin-top: 14rpx;
                justify-content: space-between;

                .shopIcon {
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 50%;
                }

                text {
                    margin-left: 12rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                }
            }

            .Learn_more {
                font-size: 24rpx;
                color: #999999;
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
