<template>
    <div class="contraner">
        <z-paging ref="paging" v-model="data.dataList" @query="queryList" :auto="true" :defaultPageSize="10"
                  :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
                  :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
        >
            <template #top>
                <!--                <customNavbar :pageTitle="data.pageTitle" bgColor="transparent"></customNavbar>-->
                <bc-page-navbar bgColor="transparent" :textColor="'#000000'" :title="data.pageTitle">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" size="34" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
                <div class="selbox row i-center">
                    <div class="selli row i-center" :class="{ set: data.dressType == 0 }" @click="openDress(0)">
                        <text>{{ data.dressList[data.dressIsds].name }}</text>
                        <TnIcon name="down-triangle" :color="data.dressType == 0 ? '#333333' : '#707070'"
                                size="34rpx"></TnIcon>
                    </div>

                    <div class="dressing" @touchmove.stop.prevent="touchstop" v-show="data.dressShow">
                        <div class="dressbox" v-show="data.dressType == 0">
                            <div class="dressli row i-center j-between" v-for="(item,index) in data.dressList"
                                 :key="item.id"
                                 @click="selList(item.id,index)">
                                <div class="dressname" :class="{ set: data.dressId == item.id }">{{ item.name }}</div>
                                <div class="dressicon" v-show="data.dressId == item.id">
                                    <TnIcon size="40rpx" color="#29C86F" name="checkmark"></TnIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="shopbox">
                <div class="shopli row" v-for="(item) in data.dataList" :key="item.id" @click="linkInfo(item.id)">
                    <div class="shopimg">
                        <image :src="item.thumb" width="210rpx" height="210rpx" radius="12rpx"></image>
                    </div>
                    <div class="shoprig">
                        <div class="shoptit u-line-1">{{ item.name }}</div>
                        <div class="shoptip u-line-1" v-if="item.desc">
                            {{ item.desc }}
                        </div>
                        <div class="shoppic">
                            <text class="shopmon">￥{{ item.price | moneyFilter }}</text>
                            <text class="shopmon left">起</text>
                            <text class="shopdel" v-if="item.fakePrice">￥{{ item.fakePrice | moneyFilter }}</text>
                        </div>
                        <div class="shopjudge row i-center">
                            <image :src="setShopPic(item.shopThumb)" width="30rpx" height="30rpx"
                                   radius="30rpx"></image>
                            <text class=" u-line-1">{{ item.shopName || '' }}</text>
                        </div>
                    </div>
                </div>
            </div>

            <!--            <u-safe-bottom slot="bottom"></u-safe-bottom>-->
        </z-paging>
        <div class="chatbox" @click="gotoChat">
            <image :src="getAssetsUrl('/platform/chatAvatar.png')" width="96rpx" height="96rpx"></image>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCateNewList, getGoodsList, getUsercaseList1 } from '@/api/goods-api'
import { getAssetsPic, setPriceVer } from "@/common/setPicture"
import { gotogoodsDetail } from "@/routes/goods-routes"
import { gotoChatPage } from '@/routes/nim-routes'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { computed, reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { gotoIndex } from "@/routes/public-routes"

interface Data {
    categoryId: string
    dataList: any[]
    pageTitle: string
    dressList: any[]
    dressIsds: number
    dressShow: boolean
    dressType: number
    dressId: number
    listType: number
    clstype: string
}

const data = reactive<Data>({
    categoryId: '',
    dataList: [],
    pageTitle: '',
    dressList: [
        { id: '1', name: '综合排序' },
        { id: '2', name: '高价优先' },
        { id: '3', name: '低价优先' },
        { id: '4', name: '销量优先' },
        { id: '5', name: '好评优先' },
        { id: '6', name: '店铺等级' }
    ],
    dressIsds: 0,
    dressShow: false,
    dressType: 0,
    dressId: 1,
    listType: 1,
    clstype: ''
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return setPriceVer(str)
    }
})
const setShopPic = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})
onLoad((options) => {
    console.log('options ===========', options)
    data.categoryId = options.id
    data.pageTitle = options.itemName || '适品囤'
    data.listType = options.listType
    data.clstype = options.clstype || ''
    // this.$refs.paging.reload()
})

const gotoChat = () => {
    gotoChatPage({ type: 1 })
}
const paging = ref()

const queryList = (pageNumber, pageSize) => {

    if (data.listType == 4) {
        // 适品囤-前台类目
        getUsercaseList1({
            pageSize,
            pageNumber,
            query: {
                categoryId: data.categoryId,
                sortType: data.dressId //排序
            }
        }).then(res => {
            paging.value.complete(res)
        }).catch(() => {
            paging.value.complete(false)
        })
    }
    else if (data.listType == 1) {
        // 普通分类列表 智护新品(普通分类) es
        getGoodsList({
            pageSize,
            pageNumber,
            query: {
                categoryIds: [data.categoryId]
            }
        }).then(res => {
            paging.value.complete(res)
        }).catch(() => {
            paging.value.complete(false)
        })
    }
    else {
        // 新品推荐列表 listType=2
        getCateNewList({
            pageSize,
            pageNumber,
            query: {
                categoryId: data.categoryId,
                sortType: data.dressId, //排序
                type: 1
            }
        }).then(res => {
            paging.value.complete(res)
        }).catch(() => {
            paging.value.complete(false)
        })
    }

}

// 刷新排序方式
const selList = (id, index) => {
    data.dressId = id
    data.dressIsds = index
    data.dressShow = false
    paging.value.reload()
}

const openDress = (dressType) => {
    if (data.dressShow) {
        data.dressShow = false
        return
    }
    data.dressType = dressType
    data.dressShow = true
}

const linkInfo = (id) => {
    gotogoodsDetail({ id })
}
const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        // data.backindex = true
        gotoIndex()
        return
    }

    uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep(.tn-navbar-back) {
    height: 22rpx !important;
}

.selbox {
    height: 84rpx;
    background: linear-gradient(180deg, #DFF7EF 0%, #FFFFFF 100%);
    padding: 0 30rpx;
    position: relative;

    .selli {
        font-size: 28rpx;
        font-weight: 500;
        line-height: 36rpx;
        color: #707070;
        margin-right: 50rpx;

        text {
            margin-right: 6rpx;
        }

        &.set {
            color: #333333;
        }
    }

    .dressing {
        position: absolute;
        top: 96%;
        right: 0;
        left: 0;
        height: 1500rpx;
        background: rgba(0, 0, 0, 0.5);
        z-index: 90;

        .dressbox {
            background: #FFFFFF;
            border-radius: 0rpx 0rpx 40rpx 40rpx;
            border-top: 2rpx solid #F2F3F5;
            overflow: hidden;
            padding-bottom: 30rpx;

            .dressli {
                height: 80rpx;
                background: #FFFFFF;
                padding: 0 30rpx;

                .dressname {
                    font-size: 28rpx;
                    font-weight: 400;
                    line-height: 36rpx;
                    color: #666666;

                    &.set {
                        font-weight: bold;
                        color: #29C86F;
                    }
                }
            }

            .dressfot {
                padding: 30rpx 30rpx 0;
                box-shadow: 0rpx -4rpx 16rpx rgba(0, 0, 0, 0.04);

                .dressreset {
                    width: 236rpx;
                }

                .dresssure {
                    width: 450rpx;
                }
            }
        }

        .adrsbox {
            .adrsnow {
                padding: 30rpx;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 36rpx;
                color: #666666;

                .adrscity {
                    font-size: 28rpx;
                    font-weight: 500;
                    line-height: 36rpx;
                    color: #333333;
                }

                .adrschange {
                    width: 92rpx;
                    margin-left: 20rpx;
                }
            }

            .adrsarea {
                padding: 25rpx 30rpx 0;
                flex-wrap: wrap;

                .adrsarli {
                    margin-bottom: 20rpx;
                    margin-right: 16rpx;
                    padding: 0 40rpx;
                    height: 68rpx;
                    line-height: 68rpx;
                    background: #F7F7F7;
                    border-radius: 8px;
                    font-size: 26rpx;
                    font-weight: 400;
                    color: #333333;

                    &.set {
                        background: #EBFBF1;
                        color: #29C86F;
                    }
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

.chatbox {
    position: fixed;
    width: 96rpx;
    height: 96rpx;
    bottom: 270rpx;
    right: 4rpx;
}
</style>
