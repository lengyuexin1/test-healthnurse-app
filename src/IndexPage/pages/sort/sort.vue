<template>
    <view class="contraner">
        <z-paging 
            ref="paging" 
            v-model="data.dataList" 
            @query="queryList" 
            :auto="false"
            :fixed="true" 
            :loading-more-enabled="false" 
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" 
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
        >
        <template #top>
            <!-- <PageTopbg></PageTopbg> -->
            <customNavbar pageTitle="适品囤" :showBack="false" bgColor="#F2F3F5"></customNavbar>
            <view class="top_inp_box">
                <view class="inp_box" @click="tosearch">
                    <TnIcon name="search" color="#666" size="26"></TnIcon>
                    <view class="inp_text">搜索</view>
                </view>
            </view>
        </template>

        <template #left>
            <scroll-view scroll-y :style="'height:' + data.height + 'px'" scroll-with-animation>
                <view class="nav-left-item tn-text-ellipsis-1" :class="{ set: item.id == data.typeId }" v-for="(item, index) in data.tabList" :key="index" @click="categoryClickMain(item,index)">
                    {{ item.name }}
                </view>
            </scroll-view>
        </template>

        <view v-for="(item, index) in data.dataList" :key="index">
            <view class="menu" v-if="item.shopItemList.length">
                <view class="tn-flex-center-between" @tap="clickShop(item.id)">
                    <view class="name tn-flex-row">
                        <image class="shop-thumb" :src="item.thumb" mode="scaleToFill" />
                        {{ item.name || '--' }}
                    </view>
                    <TnIcon name="right" color="#999999" size="28"></TnIcon>
                </view>
                <view class="menurow tn-flex-column">
                    <view v-for="(ele, idx) in item.shopItemList" :key="idx">
                        <view class="menu-list column i-center" @tap.stop="categoryClickSub(ele)">
                            <image class="menu-img" :src="item.secondIcon || ele.thumb" mode="aspectFill" resize="contain"></image>
                            <text class="menu-tit tn-text-ellipsis-1">{{ele.name}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import { ref, reactive, computed, onMounted } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getCategoryShowList, getShopProductList } from '@/api/goods-api'
import { gotogoodsDetail } from '@/routes/goods-routes'
import { gotoShopDetail } from "@/routes/service-routes"
import { gotosearch } from "@/routes/service-routes"

interface Data {
    height: number
    tabList: any
    serveList: any
    dataList: any
    typeId: string
}

const data = reactive<Data>({
    height: 0,
    tabList: [],
    serveList: [],
    dataList: [],
    typeId: ''
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    getShopProductList({ id: data.typeId }).then((res: any) => {
        paging.value.complete(res)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
        paging.value.complete([])
    })
}

const stairCategory = () => {
    getCategoryShowList({ id: '1777239405679665154' }).then((res: any) => {
        data.tabList = [{
            id: "001", name: "新品"
        }, ...res]
        // data.tabList = res
        data.typeId = data.tabList[0].id;
        paging.value.reload()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const categoryClickMain = (category: any) => {
    data.typeId = category.id
    paging.value.reload()
}

const categoryClickSub = (ele: any) => {
    gotogoodsDetail(ele.id)
}

const tosearch = () => {
    gotosearch()
}

const clickShop = (shopId: string) => {
    gotoShopDetail(shopId)
}

onMounted(() => {
    stairCategory()

    uni.getSystemInfo({
        success: res => {
            // #ifdef MP
            data.height = res.windowHeight - res?.statusBarHeight - 45
            // #endif
            // #ifndef MP
            data.height = res.windowHeight - 45
            // #endif
        }
    })
})

onLoad((options) => {
    data.typeId = options?.typeId
})

</script>

<style lang="scss" scoped>
.placeholder {
    width: 100%;
    padding: 90rpx 0
}
.nav-left-item {
    width: 200rpx;
    min-height: 50px;
    border-bottom: solid 1px #F0F0F0;
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
        color: rgb(41, 200, 111);
        font-weight:bold;

        &::before {
            content: '';
            display: block;
            height: 32rpx;
            border-left: 6rpx solid rgb(41, 200, 111);
            position: absolute;
            left: 0rpx;
            top: 50%;
            border-radius: 4rpx;
            margin-top: -16rpx;
        }
    }
}

.menu {
    padding: 20rpx 28rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    margin-top: 20rpx;
    margin-right: 20rpx;

    .name {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
        align-items: center;
        justify-content: center;
    }

    .shop-thumb {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        margin-right: 15rpx;
    }

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

        .menu-img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 12rpx;
            border: solid 1rpx #F2F2F2;
        }
        .menu-tit {
            font-size: 26rpx;
            font-weight: 400;
            color: #727375;
            margin-top: 20rpx;
            text-align: center;
        }
    }
}
.top_inp_box{
    padding: 14rpx 20rpx;
    box-sizing: border-box;

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
</style>
