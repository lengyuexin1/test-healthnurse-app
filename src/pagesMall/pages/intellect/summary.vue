<template>
    <view class="contraner">
        <z-paging
              ref="paging"
              :auto="true"
              v-model="data.dataList"
              @query="queryList"
              :defaultPageSize="10"
              :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
              empty-view-text="暂无数据~"
              :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <!-- #ifdef MP-WEIXIN -->
                <TnNavbar bg-color="transparent">
                    <template #back>
                        <view style="display: flex; align-items: center;width: 266px;">
                            <view @click="goback">
                                <TnIcon name="left" size="34" :bold="true"/>
                            </view>
                            <view class="search-box row i-center" @click="toSearch">
                                <TnIcon name="search" size="36rpx" color="#A8A8A8"></TnIcon>
                                <view class="search-tex">搜索</view>
                            </view>
                        </view>
                    </template>
                </TnNavbar>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <bc-page-navbar bgColor="transparent" :textColor="'#000000'" :title="' '">
                    <template #back>
                        <view style="display: flex; align-items: center;">
                            <view @click="goback">
                                <TnIcon name="left" size="34" :bold="true"/>
                            </view>
                            <view class="search-box row i-center" @click="toSearch">
                                <TnIcon name="search" size="36rpx" color="#A8A8A8"></TnIcon>
                                <view class="search-tex">搜索</view>
                            </view>
                        </view>
                    </template>
                </bc-page-navbar>
                <!-- #endif -->
            </template>
            <template #bottom>
                <view style="height: 50px;"></view>
            </template>
            <view class="cenbox">
                <view class="navbox">
                    <view class="navli column i-center j-center" @click="gotogoodstabul(item.id,item.name)"
                          v-for="(item) in data.newProductList" :key="item.id">
                        <!--#ifdef MP-WEIXIN-->
                        <image style="width: 92rpx;height: 92rpx;" :src="item.icon"/>
                        <!--#endif-->
                        <!--#ifdef APP-PLUS || H5-->
                        <image style="width: 92rpx;height: 92rpx;" :src="'/src' + item.icon"/>
                        <!--#endif-->
                        <view class="navtex">{{ item.name }}</view>
                    </view>
                </view>

                <view class="scenebox">
                    <view class="scetop row i-center j-between">
                        <view class="scetit">智慧场景</view>
                        <view class="row i-center" @click="gotoSceneManage">
                            <view class="scetex">查看更多</view>
                            <TnIcon name="arrow-right" color="#999999" size="30rpx"></TnIcon>
                        </view>
                    </view>
                    <TnScrollList class="scrolbox" v-if="data.smartList.length">
                        <view class="scroli" v-for="item in data.smartList" :key="item.id"
                              @click="linkSmartDetail(item.id)">
                            <image style="width: 260rpx;height: 260rpx;" :src="item.thumb"></image>
                            <view class="scrolcen">
                                <view class="scroltit u-line-1">{{ item.name }}</view>
                                <!-- <view class="scroltxt u-line-1">{{ item.desc }}</view> -->
                            </view>
                        </view>
                    </TnScrollList>
                </view>

                <view class="recombox">
                    <view class="recomtit">精选好物</view>
                    <WaterfallsFlow :wfList="data.dataList"></WaterfallsFlow>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { gotoSearch } from '@/routes/plateform-routes'
import { getAssetsPic } from "@/common/setPicture.ts"
import { getGoodsList } from '@/api/goods-api'
import { gotoGoodsTabul } from '@/routes/care-routes'
import { gotoSceneSmart, gotoSmartDetail } from "@/routes/wisdom-routes"
import { sceneList } from "@/api/smart-api"
import WaterfallsFlow from '@/components/GodsFlow/GodsFlow.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnScrollList from '@tuniao/tnui-vue3-uniapp/components/scroll-list/src/scroll-list.vue'
import TnNavbar from '@tuniao/tnui-vue3-uniapp/components/navbar/src/navbar.vue'
import { computed, onMounted, reactive, ref } from 'vue'

interface Data {
    dataList: any[]
    smartList: any[]
    newProductList: any[]
}

const data = reactive<Data>({
    dataList: [],
    smartList: [],
    newProductList: //单品
          [
              {
                  id: "321",
                  name: "智护床",
                  icon: "/pagesMall/static/inte-icn1.svg"
              },
              {
                  id: "1796097471933546498",
                  name: "健康监测",
                  icon: "/pagesMall/static/inte-icn2.svg"
              },
              {
                  id: "1796097685205516289",
                  name: "安防监控",
                  icon: "/pagesMall/static/inte-icn3.svg"
              }
          ]
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})

onMounted(() => {

    getNewProduct()
    sceneList({
        pageSize: 8,
        pageNumber: 1,
        query: {}
    }).then(res => {
        if (res.code === 200) {
            data.smartList = res.data
        }
    })
})

const toSearch = () => {
    gotoSearch()
}

const goback = () => {
    // this.CHANGE_SHOPORDER(0)
    uni.navigateBack()
}
const paging = ref()
// 推荐列表
const queryList = (pageNumber, pageSize) => {
    getGoodsList({
        pageSize,
        pageNumber,
        query: {
            categoryIds: [33]
        }
    }).then(res => {
        paging.value.complete(res.data)
    }).catch(() => {
        paging.value.complete(false)
    })
}

// 新品列表
const getNewProduct = () => {
    // getProductList(31).then((res) => {
    //     this.newProductList = res.filter(x => {
    //         return x.recommendProduct.length > 0
    //     })
    // })
}

// 单品跳转
const gotogoodstabul = (id, itemName) => {
    gotoGoodsTabul(id, itemName, 1)
}

// 智慧场景
const gotoSceneManage = () => {
    gotoSceneSmart()
}

const linkSmartDetail = (id) => {
    gotoSmartDetail(id)
}
</script>
<!--<style scoped>-->
<!--/* #ifdef MP-WEIXIN */-->
<!--:deep(.tn-navbar-back) {-->
<!--    width: unset !important;-->
<!--}-->

<!--/* #endif */-->
<!--</style>-->
<style lang="scss" scoped>
.centent {
    width: 100%;
    height: 100%;
}

.tn-navbar-back {
    width: unset !important;
}

:deep(.tn-navbar-back) {
    width: unset !important;
}

.search-box {
    width: calc((400 / 750) * 750rpx);
    height: 64rpx;
    border-radius: 32rpx;
    background-color: #ffffff;
    margin-left: 30rpx;
    padding: 0 20rpx;
    color: #A8A8A8;
    size: 28rpx;

    .search-tex {
        margin-left: 10rpx;
    }
}

.cenbox {
    background: linear-gradient(180deg, #DFF7EF 0, transparent 200rpx);

    .navbox {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 40rpx 20rpx;

        .navli {
            width: 164rpx;
            height: 164rpx;
            background-color: #FFFFFF;
            border-radius: 28rpx;
            margin: auto;

            .navtex {
                font-size: 28rpx;
                color: #333333;
                text-align: center;
            }
        }
    }

    .scenebox {
        margin: 0 20rpx 40rpx;

        .scetop {
            .scetit {
                font-weight: bold;
                font-size: 30rpx;
                color: #333333;
            }

            .scetex {
                font-weight: 400;
                font-size: 28rpx;
                color: #999999;
                margin-right: 10rpx;
            }
        }

        .scrolbox {
            margin-top: 24rpx;
            white-space: nowrap;

            .scroli {
                width: 260rpx;
                // height: 378rpx;
                background: #FFFFFF;
                border-radius: 16rpx;
                margin-right: 20rpx;
                display: inline-block;

                &:last-child {
                    margin-right: 0;
                }

                .scrolcen {
                    overflow: hidden;
                    // 省略号
                    text-overflow: ellipsis;
                    // 强制一行
                    white-space: nowrap;
                    width: calc(100% - 32rpx);
                    padding: 16rpx;

                    .scroltit {
                        margin-bottom: 8rpx;
                        font-weight: bold;
                        font-size: 28rpx;
                        color: #333333;
                        width: 228rpx;
                    }

                    .scroltxt {
                        font-weight: 400;
                        font-size: 24rpx;
                        color: #999999;
                    }
                }
            }
        }
    }

    .recombox {
        padding: 0 20rpx;

        .recomtit {
            font-weight: bold;
            font-size: 30rpx;
            color: #333333;
            margin-bottom: 16rpx;
        }
    }
}
</style>
