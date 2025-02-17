<template>
    <view>
        <view class="nav">
            <view class="nav-left">
                <scroll-view scroll-y :style="'height:' + height + 'px'">
                    <block v-for="(item,index) in tabList" :key="index">
                        <view class="nav-left-item u-line-1" :class="{ set: item.id == typeId }" @click="categoryClickMain(item,index)">{{item.name}}</view>
                    </block>
                </scroll-view>
            </view>
            <view class="nav-right">
                <scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:' + height + 'px'" scroll-with-animation>
                    <template v-if="typeId == 999">
                        <categoryShop></categoryShop>
                    </template>
                    <template v-else>
                        <categorySwiper @tapItem="tapSwip" :wperList="swiperList" v-if="isShow(swiperList)" :shopType="1"></categorySwiper>
                        <view class="shopbox" v-if="isShow(brandList)">
                            <view class="shoptit">优选店铺</view>
                            <scroll-view class="shoproll" scroll-x @scroll="scroll" scroll-with-animation>
                                <view
                                    class="shopli column i-center j-center"
                                    v-for="(item) in brandList"
                                    :key="item.id"
                                    @click="gotoShopDetail(item.id)"
                                >
                                    <u-image :src="item.thumb" shape="circle" width="84rpx" height="84rpx"></u-image>
                                    <view class="shopname u-line-1">{{item.name}}</view>
                                </view>
                            </scroll-view>
                        </view>
                        <view class="menu">
                            <view class="menutit">产品中心</view>
                            <view class="menurow i-center" v-if="typeId != 4">
                                <block v-for="(item,index2) in serveList" :key="index2">
                                    <view class="menu-list column i-center" @click="categoryClickSub(item)">
                                        <u-image :src="item.secondIcon || item.icon" radius="12rpx" width="120rpx" height="120rpx"></u-image>
                                        <text class="menu-tit u-line-1">{{item.name}}</text>
                                    </view>
                                </block>
                            </view>
                            <view class="renovation_list_box" v-if="typeId == 4">
                                <view
                                    class="renovation_list_item"
                                    v-for="(item) in seconnavList"
                                    :key="item.id"
                                    @click="gotoGoodsTabul(item.id,item.name,1)"
                                >
                                    <image class="renovation_list_img" :src="item.secondIcon" mode="scaleToFill" />
                                    <view class="renovation_list_title">{{ item.name }}</view>
                                </view>
                            </view>
                            <view v-if="serveList.length == 0">
                                <u-empty :show="serveList.length == 0" mode="list" :icon="getAssetsUrl('/empty/empty_icon_data.png')" text="空空如也~"></u-empty>
                            </view>
                        </view>
                    </template>
                </scroll-view>
            </view>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
import { getCategoryByPid } from "@/api/goods-api"
import { preferredList, getCategoryShowList } from "@/api/care-api"
import { gotoAttendShop, gotoSellerList, gotoGoodsTabul } from '@/route/care-routes'
import categorySwiper from '@/components/categorySwiper/categorySwiper.vue'
import categoryShop from './components/categoryShop.vue'
import { getswiperList } from '@/api/care-api'
import { gotoChoiceHospital } from '@/route/accompany-routes'
import { getAssetsPic } from "@/common/setPicture.js"

export default {
    name: "serverCategory",
    components: {
        categorySwiper,
        categoryShop
    },
    data() {
        return {
            height: 0,
            scrollTop: 0,
            scrollHeight: 0,
            categoryActive: 0,
            shopList: [],
            parentId: '',
            typeId: '', // 类目id
            tabList: [],
            city: { id: 440100, name: '广州' },
            serveList: [],
            seconnavList: [],
            swiperList: [],
            brandList: []
        }
    },
    computed: {
        isShow() {
            return (list) => {
                if (list && list.length > 0) {
                    return true
                }
                return false
            }
        },
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    props: {
        //主分类点击事件
        categoryMainClick: {},
        //子分类点击事件
        categorySubClick: {}
    },
    onLoad(options) {
        this.parentId = options.parentId
        // this.typeId = options.typeId || 1
        this.typeId = options.typeId
        this.getShopList()
        this.getStairCategory()
        getCategoryByPid({ pid: 3 }).then(res => {
            this.seconnavList = res
        }).catch(error => {
            console.log(error)
        })
    },
    mounted() {
        uni.getSystemInfo({
            success: res => {
                // #ifdef MP
                this.height = res.windowHeight - res.safeAreaInsets.bottom
                // #endif
                // #ifndef MP
                this.height = res.windowHeight
                // #endif
            }
        })
    },
    methods: {
        /* 点击轮播 */
        tapSwip(item) {
            console.log('item', item)
        },
        scroll(e) {
            this.scrollHeight = e.detail.scrollHeight
        },
        categoryClickMain(category, index) {
            this.$emit('categoryMainClick', category)
            this.categoryActive = index
            this.scrollTop = -this.scrollHeight * index

            this.typeId = category.id
            this.getCategoryList()
            this.getacticityData(this.typeId)

        },
        gotoGoodsTabul(id, itemName, type) {
            gotoGoodsTabul(id, itemName, type)
        },
        categoryClickSub(category) {
            this.$emit('categorySubClick', category)
            // gotoServeDetail({itemId:category.id})
            if (this.typeId == 8) {
                // 陪诊跳转医院列表
                gotoChoiceHospital({
                    sortId: category.id,
                    typeName: category.name,
                    typeId: this.typeId,
                    parentId: this.parentId
                })
                return
            }
            if (this.typeId == 4) {

                // 跳转适老改造列表
                // gotoChangeTab(this.city.id, this.typeId)
                // gotoChoiceHospital({
                //     sortId: category.id,
                //     typeName: category.name,
                //     typeId: this.typeId,
                //     parentId: this.parentId
                // })
                return
            }
            gotoSellerList({ sortId: category.id, typeName: category.name, parentId: this.parentId })
        },
        getShopList() {
            preferredList({
                applyId: 2,
                cityId: this.parentId
            }).then(res => {
                this.shopList = res
            }).catch(err => {
                this.$refs.uToast.error(err.message)
            })
        },
        /* 一级类目 */
        getStairCategory() {
            const sourceList = [
                { id: '11', name: '居家照护', aid: 3 },
                { id: '12', name: '陪诊', aid: 4 },
                { id: '13', name: '住院陪护', aid: 5 },
                { id: '16', name: '生活服务', aid: 7 },
                { id: '4', name: '适老改造', aid: 0 }
            ]
            this.tabList = [{
                id: "999", name: "新店", aid: 0
            }, ...sourceList]
            this.getacticityData(this.typeId)

            this.getCategoryList()
        },
        /* 二级类目 */
        getCategoryList() {
            getCategoryShowList({
                id: this.typeId,
                appType: 1
            }).then((res) => {
                this.serveList = res
            }).catch(err => {
                this.$refs.uToast.error(err.message)
            })
        },
        gotoShopDetail(shopId) {
            gotoAttendShop(shopId)
        },
        // 切换服务项获取对应服务的活动
        getacticityData(id) {
            const getId = this.tabList.find(item => item.id === id).aid

            getId && getswiperList(getId).then((res) => {
                const data = res.find(item => item.type == 3)
                this.brandList = data?.subsetList

                const data2 = res.find((item) => [1, 2, 4].includes(item.type))
                this.swiperList = data2?.subsetList
            })

        }
    }
}
</script>

<style scoped lang="scss">
.menu {
    padding: 20rpx 28rpx;
    background: #ffffff;
    border-radius: 32rpx;
    margin-top: 20rpx;

    .menutit {
        font-size: 30rpx;
        font-weight: bold;
        color: #000002;
    }
    .menurow {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .menu-list {
        margin-top: 40rpx;

        .menu-tit {
            font-size: 26rpx;
            font-weight: 400;
            color: #727375;
            margin-top: 20rpx;
            text-align: center;
        }
    }
}
.renovation_list_box {
    margin-top: 22rpx;
    width: 99%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .renovation_list_item {
        width: 31%;
        margin-bottom: 30rpx;
        .renovation_list_img {
            width: 100%;
            height: 142rpx;
            margin-bottom: 20rpx;
            // border: 1px solid red;
            border-radius: 16rpx;
        }
        .renovation_list_title {
            font-size: 24rpx;
            text-align: center;
        }
    }
}
.nav {
    display: flex;
    width: 100%;
}

.nav-left {
    width: 28%;
    // background-color: #F8F9F9;
}

.nav-left-item {
    height: 50px;
    border-bottom: solid 1px #f0f0f0;
    padding: 0 6px;
    box-sizing: border-box;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 50px;
    text-align: left;
    position: relative;
    padding-left: 24rpx;

    &.set {
        color: #29c86f;
        font-weight: bold;

        &::before {
            content: "";
            display: block;
            height: 32rpx;
            border-left: 6rpx solid #29c86f;
            position: absolute;
            left: 4rpx;
            top: 50%;
            margin-top: -16rpx;
        }
    }
}

.nav-right {
    width: 72%;
    padding-top: 11px;
    box-sizing: border-box;
    padding: 20rpx 30rpx 30rpx 0;
}

.shopbox {
    height: 200rpx;
    box-sizing: border-box;
    padding: 20rpx 28rpx;
    background: #ffffff;
    border-radius: 32rpx;
    margin-top: 20rpx;
    .shoptit {
        margin-bottom: 16rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #000002;
    }
    .shoproll {
        white-space: nowrap;

        .shopli {
            display: inline-flex;
            margin: 0 12rpx;
            .shopname {
                width: 80rpx;
                height: 30rpx;
                line-height: 30rpx;
                background: #ffad65;
                border: 2rpx solid #ffffff;
                border-radius: 18rpx;
                font-size: 16rpx;
                font-weight: 400;
                color: #ffffff;
                // box-sizing: border-box;
                padding: 0 10rpx;
                position: relative;
                z-index: 10;
                margin-top: -18rpx;
                text-align: center;
            }
        }
        .shopli:first-child {
            margin-left: 0;
        }
        .shopli:last-child {
            margin-right: 0;
        }
    }
}
</style>
