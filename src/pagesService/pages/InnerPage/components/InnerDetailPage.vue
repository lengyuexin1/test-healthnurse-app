<template>
    <z-paging
        ref="paging"
        v-model="data.dataList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="6"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >

        <template #top>
            <TnSticky :customNavHeight="98">
            <bc-page-navbar title="机构详情"></bc-page-navbar>
            <view class="top_inp_box">
                <view class="inp_box" @click="tosearch">
                    <TnIcon name="search" color="#666" size="26"></TnIcon>
                    <view class="inp_text">搜索</view>
                </view>
            </view>
            <div class="menu">
                    <div class="menu_item" @click="changeTab(index)" v-for="(item, index) in treList" :key="index">
                        <text class="menu_item_text" :class="{ 'isclick': item.showregion }">{{ item.text }}</text>
                        <image class="menu_item_img"
                            :src="item.showregion ? getAssetsUrl('/channel/icon_down_highlig.png') : getAssetsUrl('/channel/icon_down.png')"
                            mode="scaleToFill" />
                    </div>
            </div>
            <!-- <view class="top_icon_list">
                <view class="top_scrool">
                    <view
                    class="scrool_item"
                    @click="changeToplist(item,index)"
                    :class="{ 'is_select': data.topIndex == index }"
                    v-for="(item,index) in data.topList" :key="item.id">
                        <image
                            class="item_img"
                            :src="data.topIndex == index ? item.secondIcon : item.icon"
                            mode="aspectFill"
                        />
                        <view class="item_name">{{ item.name }}</view>
                        <view class="select_box" v-if="data.topIndex == index"></view>
                    </view>
                </view>
            </view> -->
            </TnSticky>
        </template>
        <view class="screen_box" v-if="data.dataList.length">
            <!-- 列表 -->
            <agencyItem :agencyList="data.dataList" :coordinate="coordinate" :positioning="positioning" />
        </view>
        <!-- <institutionList :dataList="data.dataList"></institutionList> -->

        <BCNotify ref="bcNotify"></BCNotify>
        <TnPopup v-model="show"  open-direction="top" :safeAreaInsetBottom="false" round="32rpx"
        :closeOnClickOverlay="true" @close="allClose">
                <div class="menu_show_box" :style="'margin-top:' + navbarTop + 'px'">
                    <!-- 区域菜单 -->
                    <div class="region_box" v-if="showregion">
                        <div class="region_box_top">
                            <text class="region_box_top_text">当前城市:</text>
                            <text class="nowcity">广州</text>
                        </div>
                        <div class="region_box_list">
                            <!-- <u-grid col="3"> -->
                                <block v-for="(areaListItem, areaListIndex) in areaList" :key="areaListIndex">
                                    <div class="region_box_item" @click="clickarea(areaListItem, areaListIndex)"
                                        :class="{ 'isshow_region': districtIds.includes(areaListItem.id) }">{{
                                            areaListItem.name }}</div>
                                </block>
                            <!-- </u-grid> -->
                        </div>
                    </div>

                    <!-- 类别菜单 -->
                    <div class="category_box" v-if="showcategory">
                        <div class="category_box_list">
                            <div v-for="(item, index) in categoryList" :key="index" class="category_box_item"
                                @click="clickcategory(item, index)"
                                :class="{ 'isshow_region': categoryIds.includes(item.id) }">{{ item.name }}</div>
                        </div>
                    </div>

                    <!-- 价格菜单 -->
                    <div class="priceItem_box" v-if="showpriceItem">
                        <div class="priceItem_box_list">
                            <div class="priceItem" @click="priceIndex = 999"
                                :class="{ 'isshow_region': priceIndex == 999 }">不限</div>
                            <div v-for="(item, index) in priceItemlist" :key="index"
                                :class="{ 'isshow_region': index == priceIndex }" class="priceItem"
                                @click="clickpriceItem(item, index)">
                                <text v-if="!item.minPrice">{{ item.maxPrice | moneyFilter }}以下</text>
                                <text v-if="item.minPrice && item.maxPrice">{{ item.minPrice | moneyFilter }}-{{
                                    item.maxPrice | moneyFilter }}</text>
                                <text v-if="!item.maxPrice">{{ item.minPrice | moneyFilter }}以上</text>
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
        <!-- <template #bottom>

        </template> -->
    </z-paging>

            <yk-authpup ref="authpup" type="top" :isNativeHead="false" @changeAuth="getLocation"
            permissionID="ACCESS_FINE_LOCATION" :animation="false"></yk-authpup>
</template>

<script setup lang="ts">
import TnSticky from '@tuniao/tnui-vue3-uniapp/components/sticky/src/sticky.vue'
import { ref, reactive, computed, onMounted, defineExpose } from 'vue'
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import agencyItem from "../components/agencyItem.vue"
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { getAssetsPic, setPriceVer } from '@/common/setPicture'
import { getOrganEsList } from '@/api/service-api'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getCategoryShowList, getAreaList } from '@/api/care-api'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import BCNotify from '@/components/notify/index.vue'
import institutionList from './institutionList.vue'
import { getcategoryList, shoplist } from '@/api/service-api'
import { getDistances } from '@/utils/distance'
import { useRoute } from 'vue-router'
import { gotosearch } from '@/routes/service-routes'
const treList = ref([
    { text: '区域', showregion: false },
    { text: '类别', showregion: false },
    { text: '价格', showregion: false }
])
interface Data{
    dataList:any,
    topList:any,
    topIndex:number,
    screenIndex:number,
    salesType:number,
    priceType:number,
    sortType:number,
}

const data = reactive<Data>({
    dataList: [],
    topList: [],
    topIndex: 0,
    screenIndex: 1,
    salesType: 0,
    priceType: 0,
    sortType: 1
})


interface Props {
    id:string,
    pageTitle:string,
}
const props = defineProps<Props>()



onMounted(() => {
})

const route = useRoute()

// Data properties
const paging = ref()
const typeTitle = ref('')
const show = ref(false)
const showregion = ref(false)
const showcategory = ref(false)
const showpriceItem = ref(false)
const navbarTop = ref(160)
const rateValue = ref(3)
const areaList = ref([])
const areaIndex = ref(null)
const categoryList = ref([])
const categoryIndex = ref(null)
const maxPrice = ref(null)
const minPrice = ref(null)
const parentId = ref(0)
const templateId = ref(null)
const positioning = ref(false)
const coordinate = ref({})
const longitude = ref(0)
const latitude = ref(0)

const categoryId = ref(null)
const categoryIds = ref([])
const districtId = ref(null)
const districtIds = ref([])
const sortType = ref(0)

const priceItemlist = ref([
    { id: 1, maxPrice: 100000, minPrice: null },
    { id: 2, maxPrice: 200000, minPrice: 100000 },
    { id: 3, maxPrice: 300000, minPrice: 200000 },
    { id: 4, maxPrice: 500000, minPrice: 300000 },
    { id: 5, maxPrice: 1000000, minPrice: 500000 },
    { id: 6, maxPrice: 1200000, minPrice: 1000000 },
    { id: 7, maxPrice: null, minPrice: 1200000 }
])

const priceId = ref(0)
const priceIndex = ref(null)

// Computed properties
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
    return getDistances(latitude.value, longitude.value, lat, lng)
})

const showprice = computed(() => (min, max) => {
    if (min && max) {
        if (min === max) { return 1 }
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
    if (index === 999) { return '不限' }
    if (index && maxPrice.value && minPrice.value) {
        return `${minPrice.value / 100}-${maxPrice.value / 100}`
    }
    if (index === 0 && maxPrice.value && !minPrice.value) {
        return `${maxPrice.value / 100}以下`
    }
    if (index && !maxPrice.value && minPrice.value) {
        return `${minPrice.value / 100}以上`
    }
    return '价格'
})

// OnMounted
onMounted(() => {
    const options = route.query

    parentId.value = options.parentId || 440100
    templateId.value = options.templateId

    // 区域
    hasAreaList()

    if (templateId.value == 122) {
        typeTitle.value = '找机构'
        getStairCategory(12)
    }
    else {
        typeTitle.value = '找康养'
        getStairCategory(13)
    }

    // 获取头部高度navbarTop
    getnavbarTop()

    // #ifdef APP-PLUS
    $refs.authpup.open()
    // #endif
    // #ifndef APP-PLUS
    getLocation()
    // #endif
})

// Methods
const getLocation = async () => {
    const res = await getDistancesfun()
    coordinate.value = {
        lat: res.lat1,
        lng: res.lng1
    }
}

const queryList = (pageNumber, pageSize) => {
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
        (paging.value as any).complete(res.data)
    }).catch(() => {
        (paging.value as any).complete([])
    })
}

// Category Methods
const getStairCategory = (type) => {
    const action =
    type === 13
        ? getCategoryShowList({ id: 18, appType: 1 })
        : getCategoryShowList({ id: 17, appType: 1 })
    action.then((res) => {
        categoryList.value = res
    })
}

const hasAreaList = () => {
    getAreaList(parentId.value).then((res) => {
        areaList.value = res

    })
}

const getnavbarTop = () => {
    // $u.getRect('#navbarTop').then((res) => {
    //     navbarTop.value = res.height
    // })
}

const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            success: (res) => {
                positioning.value = true
                console.log('定位成功')
                resolve({
                    lat1: res.latitude,
                    lng1: res.longitude
                })
            },
            fail: (err) => {
                positioning.value = false
                console.log('定位失败')
                reject(err)
            }
        })
    })
}

// Toggle methods
const showRegion = () => {
    showcategory.value = false
    showpriceItem.value = false
    showregion.value = !showregion.value
    show.value = showregion.value
}

const showCategory = () => {
    showregion.value = false
    showpriceItem.value = false
    showcategory.value = !showcategory.value
    show.value = showcategory.value
}

const changePrice = () => {
    showcategory.value = false
    showregion.value = false
    showpriceItem.value = !showpriceItem.value
    show.value = showpriceItem.value
}

const clickarea = (item) => {
    if (districtIds.value.includes(item.id)) {
        const districtIndex = districtIds.value.indexOf(item.id)
        if (districtIndex !== -1) { districtIds.value.splice(districtIndex, 1) }
        return
    }
    districtIds.value.push(item.id)
}

const clickcategory = (item) => {
    if (categoryIds.value.includes(item.id)) {
        const categoryIndex = categoryIds.value.indexOf(item.id)
        if (categoryIndex !== -1) { categoryIds.value.splice(categoryIndex, 1) }
        return
    }
    categoryIds.value.push(item.id)
}

const clickpriceItem = (item, index) => {
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

const selected = () => {
    allClose()
    paging.value.reload()
}

const allClose = () => {
    show.value = false
    showregion.value = false
    showcategory.value = false
    showpriceItem.value = false
}

const resetting = () => {
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


const tochoiceDetails = (item) => {
    // if (templateId.value === 122) {
    //     gotochoiceDetails(item.id, item.isAd)
    // }
    // else {
    //     gotohealthDetails(item.id, item.isAd)
    // }
}
const changeTab = (index: number) => {
    show.value = true
    treList.value[index].showregion = !treList.value[index].showregion
    if (index == 0) {
        showRegion()
    }
    if (index == 1) {
        showCategory()
    }
    if (index == 2) {
        changePrice()
    }
}



const bcNotify = ref()

const changeToplist = (item:any, index:number) => {
    data.topIndex = index;
    (paging.value as any).reload()
}




// 页面刷新
const pagingReload = () => {
    (paging.value as any).reload(true)
}


const tosearch = () => {
    gotosearch()
}


defineExpose({
    pagingReload
})


</script>

<style lang="scss" scoped>
.menu {
    width: 100%;
    height: 80rpx;
    background: linear-gradient(180deg, #dff7ef -190%, #f8f9f9 110%);
    display: flex;
    justify-content: center;
    z-index: 9999999;

    .menu_item {
        width: 33%;
        height: 80rpx;
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
.top_inp_box{
    padding: 14rpx 20rpx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #dff7ef -190%, #f8f9f9 110%);
    .inp_box{
        width: 100%;
        background: #FFFFFF;
        border-radius: 36rpx;
        display: flex;
        align-items: center;
        padding: 16rpx 20rpx;
        .inp_text{
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
            margin-left: 8rpx;
        }
    }
}

.top_icon_list{
    width: 100%;
    overflow-x: scroll;
    padding: 20rpx 20rpx 0 20rpx;
    // margin-bottom: 20rpx;
    box-sizing: border-box;
    .top_scrool{
        display: flex;
        align-items: center;
        width: fit-content;

        .scrool_item{
            flex-shrink: 0;
            display: flex;
            align-items: center;
            padding: 24rpx 20rpx;
            box-sizing: border-box;
            margin-right: 20rpx;
            border-radius: 16rpx;
            background: #fff;
            color: #333;
            position: relative;
            &.is_select{
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 100%);
                color: #FFFFFF;
            }
            .item_img{
                width: 38rpx;
                height: 38rpx;
                margin-right: 8rpx;
            }
            .item_name{
                flex-shrink: 0;
                font-size: 26rpx;
                font-weight: 400;
            }
            .select_box{
                width: 64rpx;
                height: 64rpx;
                background: linear-gradient( 90deg, #FF8C74 0%, #EA3E1A 200%);
                position: absolute;
                bottom: -2rpx;
                left: 50%;
                transform: translate(-50%, 0) rotate(45deg);
                z-index: -1;
            }
        }
    }
}
.screen_box{
    width: 100%;
    padding-top: 20rpx;
    box-sizing: border-box;
    background: #fff;
}

.menu_show_box {
        width: 100%;
        // height: 500rpx;
        border-top: 4rpx solid #f2f3f5;
        // margin-top: 175px;
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
                display: flex;
                flex-wrap: wrap;
                .region_box_item {
                    padding: 16rpx 50rpx;
                    width: 30%;
                    height: 72rpx;
                    margin-right: 20rpx;
                    line-height: 28rpx;
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
                    padding: 16rpx 40rpx;
                    height: 72rpx;
                    line-height: 28rpx;
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
                    line-height: 46rpx;
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
                margin-right: 16rpx;
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
</style>
