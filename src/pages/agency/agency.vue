<template>
    <view class="container">
        <z-paging-swiper class="swiper-item" ref="paging" :auto="false">
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'到店服务'"></bc-page-navbar>
                <div class="inp_box">
                    <div class="inp" @click="searKey">
                        <div class="search_icon">
                            <TnIcon name="search" size="20"></TnIcon>
                        </div>
                        <div class="inp_text">输入搜索信息</div>
                    </div>
                </div>
                <div class="menu">
                    <div class="menu_item" @click="changeTab(index)" v-for="(item, index) in treList" :key="index">
                        <text class="menu_item_text" :class="{ 'isclick': showregion }">{{ item.text }}</text>
                        <image class="menu_item_img"
                            :src="showregion ? getAssetsUrl('/channel/icon_down_highlig.png') : getAssetsUrl('/channel/icon_down.png')"
                            mode="scaleToFill" />
                    </div>
                </div>
            </template>

            <view id="navbarTop"></view>

            <TnPopup v-model="showPopup" :overlay-opacity="0" open-direction="top" :style="'margin-top:' + navbarTop + 'px'">
                <div class="menu_show_box">
                    <!-- 区域菜单 -->
                    <div class="region_box" v-if="showregion">
                        <div class="region_box_top">
                            <text class="region_box_top_text">当前城市:</text>
                            <text class="nowcity">广州</text>
                        </div>
                        <div class="region_box_list">
                            <u-grid col="3">
                                <u-grid-item v-for="(areaListItem, areaListIndex) in areaList" :key="areaListIndex">
                                    <div class="region_box_item" @click="clickarea(areaListItem, areaListIndex)"
                                        :class="{ 'isshow_region': districtIds.includes(areaListItem.id) }">{{
                                            areaListItem.name }}</div>
                                </u-grid-item>
                            </u-grid>
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

        </z-paging-swiper>
    </view>
</template>


<script setup lang="ts">
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { gotosearch } from "@/routes/service-routes"
import { getAssetsPic } from '@/common/setPicture'

const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const navbarTop = ref()
const showregion = ref(false)
const showPopup = ref(false)
const treList = ref([
    { text: '区域' },
    { text: '类别' },
    { text: '价格' }
])

const showcategory = ref(false)
const templateId = ref('')

onLoad((option: any) => {

})
const changeTab = (index: number) => {
    showPopup.value = true
    if (index == 0) {

    }
}
onMounted(() => {
    const rect = navbarTop.value
    console.log(rect)
})
// 获取头部高度
onShow(() => {

})


const searKey = () => {
    gotosearch()
}

</script>


<style scoped>
:deep(.tn-tabs__bar) {
    height: 6rpx;
}

:global(.tn-tabs__bar) {
    height: 6rpx;
}
</style>

<style lang="scss" scoped>
.swiper {
    flex: 1;
    height: 100%;
}

.inp_box {
    z-index: 98999;
    width: 100%;
    height: 88rpx;
    background: linear-gradient(180deg, #dff7ef 0%, #f8f9f9 160%);
    padding-top: 6rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .inp {
        width: 690rpx;
        height: 64rpx;
        background: #fff;
        border-radius: 32rpx;
        box-shadow: 0rpx 0rpx 32rpx rgba(0, 0, 0, 0.05);
        padding: 16rpx 24rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .search_icon {
            margin-right: 12rpx;
        }

        .inp_text {
            font-size: 24rpx;
            color: #999999;
        }
    }
}

.menu {
    width: 100%;
    height: 80rpx;
    background: linear-gradient(180deg, #dff7ef -190%, #f8f9f9 110%);
    display: flex;
    justify-content: center;
    z-index: 9999;

    .menu_item {
        width: 33%;
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
</style>
