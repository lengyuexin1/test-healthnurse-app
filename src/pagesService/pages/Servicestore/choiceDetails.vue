<template>
<view class="contraner">
    <z-paging
        ref="paging"
        :auto="false"
        :refresher-enabled="false"
        >
        <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'机构详情'">
                    <template #back>
                        <view class="nav_back" @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>

                </bc-page-navbar>
            </template>
            <view class="details_box" v-if="detailObj.id">
                <div class="swiper_box">
                    <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" @change="swiperchang">
                        <swiper-item
                            v-for="(item, index) in showswiper(
                                detailObj.covers
                            )"
                            :key="index"
                        >
                            <image class="swiper_item" :src="item" mode="aspectFill" @click="preImage(index,showswiper(detailObj.covers))" />
                        </swiper-item>
                    </swiper>
                    <div class="swiper_indicator">
                        <div
                            class="swiper_indicator_item"
                            v-for="(item, index) in showswiper(
                                detailObj.covers
                            )"
                            :key="index"
                            :class="{
                                isswiper: swiperIndex == index,
                                one_notright: notright(detailObj.covers, index)
                            }"
                        ></div>
                    </div>
                </div>
                <div class="introduce">
                    <div class="introduce_top">
                        <div class="introduce_title_box">
                            <div class="introduce_title">{{ detailObj.shopName }}</div>
                            <!-- <div class="introduce_rate_box">
								<u-rate
									:count="5" v-model="count"
									inactive-icon="star-fill"
									inactiveColor="#EBEBEB" activeColor="#FF983D"
									gutter="2"
									:readonly="true"></u-rate>
								<div class="introduce_num">3.2</div>
								<div class="introduce_rate">231条</div>
                            </div>-->
                        </div>
                        <div class="introduce_icon">
                            <div class="icon_item_box" @click="setColl">
                                <image
                                    class="icon_item_img"
                                    :src="
                                        getAssetsUrl(
                                            isColl
                                                ? '/channel/collect_highlight.svg'
                                                : '/channel/collect.svg'
                                        )
                                    "
                                    mode="scaleToFill"
                                />
                                <text>收藏</text>
                            </div>
                            <div class="icon_item_box" @click="share">
                                <image class="icon_item_img" :src="getAssetsUrl('/channel/share.svg')" mode="scaleToFill" />
                                <text>分享</text>
                            </div>
                        </div>
                    </div>
                    <div class="introduce_item">
                        <div class="introduce_item_top">
                            <div class="introduce_item_title">
                                <div class="title_text">类型</div>
                                <div class="title_content">
                                    {{
                                    detailObj.categoryNames &&
                                    detailObj.categoryNames[0]
                                    }}
                                </div>
                            </div>
                            <div class="introduce_item_title">
                                <div class="title_text">面积</div>
                                <!-- <div class="title_content">约{{ area(detailObj.proportion) }}万平方米</div> -->
                                <div class="title_content">约{{ detailObj.proportion }}平方米</div>
                            </div>
                        </div>
                        <div class="introduce_item_title">
                            <div class="title_text">开业时间</div>
                            <div class="title_content">{{ timeFormat(detailObj.openingTime * 1000) }}</div>
                        </div>
                        <!-- <div
                            class="introduce_item_title"
                            v-if="detailObj.minPrice || detailObj.maxPrice"
                        >
                            <div class="title_text">价格</div>
                            <div class="title_content">
                                {{
                                    detailObj.minPrice
                                        ? detailObj.minPrice
                                        : detailObj.maxPrice | moneyFilter
                                }}/月
                            </div>
                        </div>-->
                        <div class="introduce_item_title">
                            <div class="title_text">床位</div>
                            <div class="title_content">{{ detailObj.bedNum }}张</div>
                        </div>
                        <div class="introduce_item_title">
                            <div class="title_text">公司</div>
                            <div class="title_content">{{ detailObj.company }}</div>
                        </div>
                        <div class="introduce_item_title">
                            <div class="title_text">收住</div>
                            <div class="tag_list">
                                <div
                                    class="tag_item"
                                    v-for="(
                                        item, index
                                    ) in detailObj.containTagNames"
                                    :key="index"
                                    :class="{
                                        not_right: index + 1 == tagList.length
                                    }"
                                >{{ item }}</div>
                            </div>
                        </div>
                        <div class="address">
                            <div class="address_title">地址</div>
                            <div class="address_box">
                                <div class="address_text_box">
                                    <div class="short">
                                        {{ detailObj.cityName }} -
                                        {{ detailObj.districtName }}
                                    </div>
                                    <div class="details">
                                        {{ detailObj.area
                                        }}{{ detailObj.address }}
                                    </div>
                                </div>
                                <image @click="address" class="address_icon" :src="getAssetsUrl('/channel/address.png')" mode="scaleToFill" />
                            </div>
                        </div>
                        <div class="more_btn" @click="totextInstitution(detailObj.shopId)">
                            <image class="more_icon" :src="getAssetsUrl('/channel/more_icon.png')" mode="scaleToFill" />
                            <div class="more_text">点击查看更多基本信息</div>
                        </div>
                    </div>
                </div>
                <!-- :class="{'have_max':!showmoreroom}" -->
                <div class="more_room">
                    <div class="more_room_title">产品列表</div>
                    <div class="more_room_item" v-for="item in showRoom(productList)" :key="item.id">
                        <div class="more_room_item_right">
                            <image class="more_right_img" :src="item.mainPics && item.mainPics[0]" mode="scaleToFill" />
                            <div class="more_right_text">
                                <div class="more_right_title">{{ item.name }}</div>
                                <div class="more_right_dace">
                                    <text>{{ item.bedDesc }}张床</text>
                                    <text>,{{ item.areaDesc }}平方米</text>
                                    <text v-if="item.isBalcony == 1">,有阳台</text>
                                    <text v-else>,没阳台</text>
                                    <text v-if="item.isWindow == 1">,有窗口</text>
                                    <text v-else>,没窗口</text>
                                    <text v-if="item.isNoSmoke == 1">,禁烟</text>
                                    <text v-else>,不禁烟</text>
                                </div>
                            </div>
                        </div>
                        <div class="more_room_item_left">
                            <div class="more_room_price_box">
                                <div class="more_room_price">￥{{ item.price | moneyFilter }}</div>
                                <div class="more_room_extend">/{{ item.unit == 1 ? "日" : "月" }}</div>
                            </div>
                            <div class="show_btn" @click="tuproduct(item.id)">查看</div>
                        </div>
                    </div>
                    <div class="show_more_room" @click="showroom" v-if="productList.length > 2">
                        <!-- {{productList.length}}个 -->
                        <div class="show_more_room_text">查看其他房型</div>
                        <!-- <u-icon name="arrow-down" v-if="!showmoreroom"></u-icon>
                        <u-icon name="arrow-up" v-else></u-icon> -->
                    </div>
                    <div class="show_more_room" v-else>
                        <div class="show_more_not_room_text">暂无更多房型</div>
                    </div>
                </div>
                <div class="img_list">
                    <div class="img_list_title">机构图集</div>
                    <div class="img_box">
                        <image class="img_box_right" :src="detailObj.albums && detailObj.albums[0]" mode="aspectFill" />
                        <div class="img_box_left">
                            <image
                                class="img_box_left_top"
                                :src="
                                    detailObj.albums && detailObj.albums[1]
                                        ? detailObj.albums &&
                                          detailObj.albums[1]
                                        : detailObj.albums &&
                                          detailObj.albums[0]
                                "
                                mode="aspectFill"
                            />
                            <div class="img_box_left_bottom" @click="toimgdetails(detailObj.shopId)">
                                <image class="view_img" :src="getAssetsUrl('/channel/view_box.png')" mode="scaleToFill" />
                                <div class="view_text_box">
                                    <image
                                        class="view_text_box_icon"
                                        :src="
                                            getAssetsUrl(
                                                '/channel/view_icon.png'
                                            )
                                        "
                                        mode="scaleToFill"
                                    />
                                    <text class="view_text">查看图片</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </view>
    </z-paging>
</view>
</template>
<script setup>

// import { getAssetsPic } from "@/common/setPicture.js"
// import {
//     gotoproductDetails,
//     gototextInstitution,
//     gotoimgdetails,
//     gotochoiceDetails
// } from "@/route/plateform-routes"
// import shareView from "@/Channel/components/shareView/shareView.vue"
// import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
// import {
//     agencylist,
//     getorganizationDetail,
//     getOrganEsList,
//     prebookSave
// } from "@/api/agency-api"
// import { gotoIMSessionChat } from "@/route/message-routes"
// import { shopAdd, shopCancel } from "@/api/care-api"
import { PlatformManage } from '@bc/sys'
// import {
//     getLoginCode,
//     sendMobileCode
// } from '@/api/open-api'
// import recommend from "@/libs/recommend"
// import { appear } from "@/api/user-api"
// import agencyItem from "@/components/agencyItem/agencyItem.vue"
import { ref, reactive, computed, onMounted } from 'vue'
import ykAuthpup from './components/ykAuthpup.vue'
import agencyItem from './components/agencyItem.vue'


const typeTitle = ref < string > ('')
const show = ref < boolean > (false)
const showregion = ref < boolean > (false)
const showcategory = ref < boolean > (false)
const showpriceItem = ref < boolean > (false)
const navbarTop = ref < number > (175)
const rateValue = ref < number > (3)
const areaList = ref([]) // Adjust the type according to the actual data structure
const areaIndex = ref(null)
const categoryList = ref([]) // Adjust the type according to the actual data structure
const categoryIndex = ref(null)
const dataList = ref([]) // Adjust the type according to the actual data structure

const parentId = ref < number > (0)
const templateId = ref(null)

const positioning = ref < boolean > (false)
const coordinate = reactive < Location > ({ lat: 0, lng: 0 })
const longitude = ref < number > (0)
const latitude = ref < number > (0)

const categoryId = ref(null)
const categoryIds = ref([])
const districtId = ref(null)
const districtIds = ref([])
const sortType = ref < number > (0) // Price sorting: 1 ascending, 2 descending, 0 not selected

const priceItemlist = [
    { id: 1, maxPrice: 100000, minPrice: null },
    { id: 2, maxPrice: 200000, minPrice: 100000 },
    { id: 3, maxPrice: 300000, minPrice: 200000 },
    { id: 4, maxPrice: 500000, minPrice: 300000 },
    { id: 5, maxPrice: 1000000, minPrice: 500000 },
    { id: 6, maxPrice: 1200000, minPrice: 1000000 },
    { id: 7, maxPrice: null, minPrice: 1200000 }
]
const priceId = ref < number > (0)
const priceIndex = ref(null)

const getAssetsUrl = computed(() => (str) => getAssetsPic(str))
const setShopPic = computed(() => (str) => setPriceVer(str))

const baseGrade = computed(() => (type) => {
    switch (type) {
        case 4:
            return false
        default:
            return getAssetsPic(`/shop/seller_level_${type}.png`)
    }
})

const getdistance = computed(() => (lat, lng) => {
    const distance = getDistances(latitude.value, longitude.value, lat, lng)
    return distance
})

const showprice = computed(() => (min, max) => {
    if (min && max) {
        if (min === max) {
            return 1
        }
        return 2
    }
    else if (!min && !max) {
        return 3
    }
    else {
        return 1
    }
})

const priceText = computed(() => (index) => {
    if (index === 999) {
        return "不限"
    }
    else if (index && maxPrice.value && minPrice.value) {
        return `${minPrice.value / 100}-${maxPrice.value / 100}`
    }
    else if (index === 0 && maxPrice.value && !minPrice.value) {
        return `${maxPrice.value / 100}以下`
    }
    else if (index && !maxPrice.value && minPrice.value) {
        return `${minPrice.value / 100}以上`
    }
    else {
        return "价格"
    }
})

onMounted(() => {
    console.log('Mounted', parentId.value)
    parentId.value = templateId.value === 122 ? options.parentId : 440100
    templateId.value = options.templateId
    hasAreaList()

    if (templateId.value === 122) {
        typeTitle.value = "找机构"
        getStairCategory(12)
    }
    else {
        typeTitle.value = "找康养"
        getStairCategory(13)
    }

    getnavbarTop()
    if (uni.getPlatform() === 'APP-PLUS') {
        $refs.authpup.open()
    }
    else {
        getLocation()
    }
})

function getLocation() {
    getDistancesfun().then((res) => {
        coordinate.lat = res.lat1
        coordinate.lng = res.lng1
    })
}

function queryList(pageNumber, pageSize) {
    getOrganEsList({
        pageNumber,
        pageSize,
        query: {
            categoryIds: categoryIds.value,
            districtIds: districtIds.value,
            businessType: templateId.value === 122 ? 4 : 3,
            maxPrice: priceIndex.value === 999 ? null : maxPrice.value || null,
            minPrice: priceIndex.value === 999 ? null : minPrice.value || null
        }
    }).then((res) => {
        res.forEach((item) => {
            appear({ shopId: item.id, eventId: 1 })
        })
        $refs.paging.complete(res)
    })
}

function getStairCategory(type) {
    const action = type === 13
        ? getCategoryShowList({ id: 18, appType: 1 })
        : getCategoryShowList({ id: 17, appType: 1 })

    action.then((res) => {
        categoryList.value = res
    })
}

function hasAreaList() {
    getAreaList(parentId.value).then((res) => {
        areaList.value = res
        $refs.paging.reload()
    })
}

function getnavbarTop() {
    $u.getRect("#navbarTop").then((res) => {
        navbarTop.value = res.height
    })
}

function getDistancesfun() {
    return new Promise() < { lat1: number, lng1: number } > ((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                positioning.value = true
                console.log("定位成功")
                resolve({ lat1: res.latitude, lng1: res.longitude })
            },
            fail: (err) => {
                positioning.value = false
                console.log("定位失败")
                reject(err)
            }
        })
    })
}

function showRegion() {
    showcategory.value = false
    showpriceItem.value = false
    showregion.value = !showregion.value
    show.value = showregion.value
}

function showCategory() {
    showregion.value = false
    showpriceItem.value = false
    showcategory.value = !showcategory.value
    show.value = showcategory.value
}

function changePrice() {
    showcategory.value = false
    showregion.value = false
    showpriceItem.value = !showpriceItem.value
    show.value = showpriceItem.value
}

function clickarea(item) {
    if (districtIds.value.includes(item.id)) {
        const districtIndex = districtIds.value.indexOf(item.id)
        if (districtIndex !== -1) {
            districtIds.value.splice(districtIndex, 1)
        }
        return
    }
    districtIds.value.push(item.id)
}

function clickcategory(item) {
    if (categoryIds.value.includes(item.id)) {
        const categoryIndex = categoryIds.value.indexOf(item.id)
        if (categoryIndex !== -1) {
            categoryIds.value.splice(categoryIndex, 1)
        }
        return
    }
    categoryIds.value.push(item.id)
}

function clickpriceItem(item, index) {
    if (priceIndex.value === index) {
        priceIndex.value = null
        maxPrice.value = null
        minPrice.value = null
        return
    }
    priceIndex.value = index
    maxPrice.value = item.maxPrice
    minPrice.value = item.minPrice
}

function selected() {
    allClose()
    $refs.paging.reload()
}

function allClose() {
    show.value = false
    showregion.value = false
    showcategory.value = false
    showpriceItem.value = false
}

function resetting() {
    if (showregion.value) {
        districtIds.value = []
    }
    if (showcategory.value) {
        categoryIds.value = []
    }
    if (showpriceItem.value) {
        priceIndex.value = null
        maxPrice.value = null
        minPrice.value = null
    }
}

function searKey() {
    gotoSearch()
}

function tochoiceDetails(item) {
    if (templateId.value === 122) {
        gotochoiceDetails(item.id, item.isAd)
    }
    else {
        gotohealthDetails(item.id, item.isAd)
    }
}
</script>


<style lang="scss" scoped>
.successful {
    position: relative;
    .successful_image {
        width: 140rpx;
        height: 140rpx;
        left: 50%;
        top: -70rpx;
        transform: translateX(-50%);
        position: absolute;
    }
    .successful_title {
        font-size: 40rpx;
        text-align: center;
        color: #29c86f;
        margin-top: 84rpx;
    }
    .successful_desc {
        font-size: 24rpx;
        color: #666666;
        width: 100%;
        text-align: center;
        margin-top: 16rpx;
    }
}
.popup_box {
    .content {
        min-height: 200rpx;
        max-height: 700rpx;
        font-size: 30rpx;
        color: #666666;
        padding: 20rpx 20rpx 5rpx 20rpx;
        line-height: 50rpx;
        margin-top: 50rpx;

        .title {
            flex-shrink: 0;
        }
    }
}
.popup_but {
    height: 90rpx;
    background: #29c86f;
    border-radius: 46rpx;
    font-size: 32rpx;
    margin-top: 50rpx;
    text-align: center;
    margin-bottom: 12rpx;
    color: #ffffff;
    line-height: 90rpx;
}
.title {
    font-size: 36rpx;
    color: #333333;
    text-align: center;
    font-weight: 500;
    margin-bottom: 6rpx;
}
.box_phone {
    font-size: 28rpx;
    color: #9e9e9e;
    padding-top: 24rpx;
    text-align: center;
}
.popup_content {
    background: #f7f7f7;
    height: 100rpx;
    padding: 0 30rpx;
    display: flex;
    font-size: 32rpx;
    color: #333333;
    margin-top: 40rpx;
    justify-content: space-between;
    border-radius: 12rpx;
    align-items: center;
    .popup_edit {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        color: #2a9cff;
    }
}
.contraner {
    .details_box {
        padding: 20rpx;
        box-sizing: border-box;
        .swiper_box {
            width: 100%;
            height: 710rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative;
            margin-bottom: 20rpx;
            .swiper {
                width: 100%;
                height: 100%;
                .swiper_item {
                    width: 100%;
                    height: 100%;
                    // border: 1px solid red;
                    box-sizing: border-box;
                    background: #ffffff;
                }
            }
            .swiper_indicator {
                position: absolute;
                bottom: 20rpx;
                right: 20rpx;
                // width: 76rpx;
                height: 28rpx;
                background: #000000;
                opacity: 0.14;
                border-radius: 24rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8rpx 12rpx;
                box-sizing: border-box;
                .swiper_indicator_item {
                    width: 12rpx;
                    height: 12rpx;
                    background: #ffffff;
                    border-radius: 50%;
                    opacity: 0.4;
                    margin-right: 8rpx;
                    &.isswiper {
                        background: #ffffff;
                        opacity: 1;
                    }
                    &.one_notright {
                        margin-right: 0rpx;
                    }
                }
            }
        }
        .introduce {
            width: 100%;
            // height: 744rpx;
            border-radius: 24rpx;
            background: #ffffff;
            padding: 30rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;
            .introduce_top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;
                .introduce_title_box {
                    width: 75%;
                    .introduce_title {
                        color: #333333;
                        font-size: 34rpx;
                        margin-bottom: 16rpx;
                        font-weight: bold;
                    }
                    .introduce_rate_box {
                        display: flex;
                        align-items: center;
                        .introduce_num {
                            color: #ff9f3e;
                            margin-right: 16rpx;
                            margin-left: 8rpx;
                            font-size: 24rpx;
                        }
                        .introduce_rate {
                            color: #333333;
                            font-size: 24rpx;
                        }
                    }
                }
                .introduce_icon {
                    width: 120rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .icon_item_box {
                        color: #878787;
                        font-size: 20rpx;
                        display: flex;
                        flex-direction: column;
                        .icon_item_img {
                            width: 40rpx;
                            height: 40rpx;
                            margin-bottom: 6rpx;
                        }
                    }
                }
            }
            .introduce_item {
                .introduce_item_top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 80rpx;
                    box-sizing: border-box;
                }
                .introduce_item_title {
                    display: flex;
                    align-items: center;
                    font-size: 26rpx;
                    margin-bottom: 36rpx;

                    .title_text {
                        color: #333333;
                        margin-right: 40rpx;
                        flex-shrink: 0;
                    }
                    .title_content {
                        color: #666666;
                    }
                    .tag_list {
                        display: flex;
                        align-items: center;
                        .tag_item {
                            padding: 8rpx 16rpx;
                            box-sizing: border-box;
                            border-radius: 26rpx;
                            background: #f8f8f8;
                            color: #999999;
                            font-size: 24rpx;
                            margin-right: 12rpx;
                        }
                    }
                }
                .address {
                    display: flex;
                    margin-bottom: 40rpx;
                    .address_title {
                        font-size: 26rpx;
                        color: #333333;
                        margin-right: 40rpx;
                    }
                    .address_box {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex: 1;
                        .address_text_box {
                            width: 85%;
                            .short {
                                font-size: 26rpx;
                                color: #666666;
                                margin-bottom: 4rpx;
                            }
                            .details {
                                color: #999999;
                                font-size: 24rpx;
                            }
                        }
                        .address_icon {
                            width: 60rpx;
                            height: 60rpx;
                        }
                    }
                }
                .more_btn {
                    border-radius: 12rpx;
                    background: #f2f3f5;
                    padding: 20rpx 0rpx;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .more_text {
                        color: #231815;
                        font-size: 30rpx;
                        font-weight: bold;
                    }
                    .more_icon {
                        width: 36rpx;
                        height: 36rpx;
                        margin-right: 10rpx;
                    }
                }
            }
        }
        .more_room {
            background: #ffffff;
            width: 100%;
            padding: 30rpx;
            padding-bottom: 80rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
            position: relative;
            margin-bottom: 20rpx;
            &.have_max {
                max-height: 480rpx;
            }
            .more_room_title {
                color: #333333;
                font-size: 28rpx;
                margin-bottom: 30rpx;
            }
            .more_room_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;
                .more_room_item_right {
                    display: flex;
                    .more_right_img {
                        width: 96rpx;
                        height: 96rpx;
                        border-radius: 8rpx;
                        // border: 1px solid red;
                        margin-right: 20rpx;
                    }
                    .more_right_text {
                        width: 338rpx;
                        .more_right_title {
                            font-weight: bold;
                            color: #333333;
                            font-size: 28rpx;
                            margin-bottom: 8rpx;
                        }
                        .more_right_dace {
                            color: #777777;
                            font-size: 24rpx;
                        }
                    }
                }
                .more_room_item_left {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .more_room_price_box {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12rpx;
                        .more_room_price {
                            color: #ff0000;
                            font-size: 28rpx;
                        }
                        .more_room_extend {
                            color: #111111;
                            font-size: 18rpx;
                        }
                    }
                    .show_btn {
                        width: 96rpx;
                        height: 44rpx;
                        text-align: center;
                        line-height: 44rpx;
                        font-size: 24rpx;
                        color: #ffffff;
                        border-radius: 24rpx;
                        background: #29c86f;
                    }
                }
            }
            .show_more_room {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                bottom: 0;
                width: 90%;
                height: 110rpx;
                background: #fff;
                .show_more_room_text {
                    color: #333333;
                    font-size: 24rpx;
                    margin-right: 4rpx;
                }
                .show_more_not_room_text {
                    color: #777777;
                    font-size: 24rpx;
                }
            }
        }
        .img_list {
            width: 100%;
            height: 490rpx;
            padding: 30rpx;
            box-sizing: border-box;
            background: #fff;
            border-radius: 24rpx;
            .img_list_title {
                color: #333333;
                font-size: 28rpx;
                margin-bottom: 30rpx;
            }
            .img_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 364rpx;
                .img_box_right {
                    width: 364rpx;
                    height: 100%;
                    border-radius: 8rpx;
                    // border: 1px solid red;
                }
                .img_box_left {
                    width: 270rpx;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    .img_box_left_top {
                        width: 100%;
                        height: 270rpx;
                        border-radius: 8rpx;
                        // border: 1px solid red;
                    }
                    .img_box_left_bottom {
                        width: 100%;
                        height: 80rpx;
                        border-radius: 8rpx;
                        overflow: hidden;
                        position: relative;
                        .view_img {
                            width: 100%;
                            height: 100%;
                        }
                        .view_text_box {
                            position: absolute;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #ffffff;
                            font-size: 28rpx;
                            width: 100%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            .view_text_box_icon {
                                width: 32rpx;
                                height: 32rpx;
                            }
                            .view_text {
                                margin-left: 4rpx;
                            }
                        }
                    }
                }
            }
        }
    }

    .bottom_btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 28rpx;
        padding-bottom: 48rpx;
        box-sizing: border-box;
        background: #ffffff;
        .contact {
            width: 340rpx;
            height: 90rpx;
            background: #ffa134;
            border-radius: 46rpx;
            font-size: 32rpx;
            color: #ffffff;
            line-height: 90rpx;
            text-align: center;
        }
        .call_yuyue {
            width: 352rpx;
            height: 76rpx;
            font-size: 28rpx;
            color: #ffffff;
            line-height: 76rpx;
            text-align: center;
            background: linear-gradient(90deg, #ffd07e 0%, #ffa033 100%);
            border-radius: 46rpx 0rpx 0rpx 46rpx;
        }
        .call {
            width: 100%; //340rpx;
            height: 76rpx;
            width: 350rpx;
            height: 76rpx;
            background: linear-gradient(90deg, #33cc85 0%, #04af50 100%);
            border-radius: 0rpx 46rpx 46rpx 0rpx;
            font-size: 28rpx;
            color: #ffffff;
            line-height: 76rpx;
            text-align: center;
        }
    }
}
</style>
