<template>
    <view class="contraner">
        <z-paging ref="paging" v-model="data.dataList" @query="queryList" :auto="false" :fixed="true"
                  :defaultPageSize="10"
                  :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
                  :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
        >
        <template #top>
            <view class="shop_box">
                <!-- 店铺信息 -->
                <!--  @tap="clickShopDetail" -->
                <view class="seller_box" v-if="data.shopDetail.id">
                    <view class="seller_about row">
                        <view class="seller_pic">
                            <image :src="data.shopDetail.thumb" mode="scaleToFill" />
                        </view>
                        <view class="sel_out_rig">
                            <view class="seller_name tn-text-ellipsis-1">{{data.shopDetail.name}}</view>
                            <view class="seller_more tn-flex-center-between">
                                <view>
                                    <view class="row i-center move">
                                        <TnRate v-model="data.shopDetail.score" :min="0" :max="5" readonly gutter="0" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="30rpx" allow-half />
                                        <view class="seller_score">{{data.shopDetail.score}}分</view>
                                    </view>
                                </view>
                                <view class="seller_coll" @tap.stop="setColl">
                                    <TnButton width="160rpx" height="58rpx" shape="round" font-size="24rpx" border-color="#EA3E1A" bg-color="#EA3E1A" :plain="data.isColl" :text-color="data.isColl ? '#EA3E1A' : '#FFFFFF'" :debounce="true">
                                        {{ data.isColl ? '取消收藏' : '收藏店铺' }}
                                    </TnButton>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="seller_exp row j-between">
                        <view class="seller_exp_li">
                            <view class="seller_exp_tit">店铺等级</view>
                            <image class="seller_exp_img" mode="scaleToFit" v-if="baseGrade(data.shopDetail.level)" :src="baseGrade(data.shopDetail.level)"></image>
                            <view v-else>--</view>
                        </view>
                        <view class="seller_exp_li right_left">
                            <!-- 服务质量 服务好评率 -->
                            <view class="seller_exp_tit">商品质量</view>
                            <view class="seller_exp_desc">商品好评率<text>{{ data.shopDetail.productGoodCommentRate * 100 }}%</text></view>
                        </view>
                        <view class="seller_exp_li">
                            <view class="seller_exp_tit">客服表现</view>
                            <view class="seller_exp_desc">平均<text>20</text>秒回复</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="shop_ser_tit row i-center">为您推荐</view>
        </template>

        <view class="shop_serve">
            <view class="outserve">
                <WaterfallsFlow :wfList="data.dataList" @waterItem="clickwaterItem"></WaterfallsFlow>
            </view>
        </view>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import { addShopBrowerHistory, getBaseInfo } from "@/api/service-api"
import { addShop, unHealthShop } from "@/api/user-api"
import { productlist, servicelist } from "@/api/goods-api"
import BCNotify from '@/components/notify/index.vue'
import WaterfallsFlow from './components/WaterfallsFlow.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import { pageController } from "@bc/uni-tools"
import { gotoServiceStore } from "@/routes/service-routes"
import { gotogoodsDetail, gotoserviceDetail } from "@/routes/goods-routes"
import { PlatformManage } from "@bc/sys"
import { gotoLogin } from "@/routes/public-routes"

interface Data {
    dataList: any
    shopId: string
    shopDetail: any
    isColl: boolean
    ser: string
    ser_son: string
    tit: string
    desc: string
}

const data = reactive<Data>({
    dataList: [],
    shopId: '',
    shopDetail: {},
    isColl: false,
    ser: '',
    ser_son: '',
    tit: '',
    desc: ''
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    productlist({
        pageNumber,
        pageSize,
        query: {
            shopId: data.shopId
            // type: 1
        }
    }).then((res: any) => {
        console.log(res)
        paging.value.complete(res.data)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const baseGrade = (type: number) => {
    switch (type) {
        case 8:
            return getAssetsPic('/shop/shop_level_1.png')
        case 4:
            return getAssetsPic('/shop/shop_level_2.png')
        case 2:
            return getAssetsPic('/shop/shop_level_3.png')
        case 1:
            return getAssetsPic('/shop/shop_level_4.png')
        default:
            return getAssetsPic('/shop/shop_level_3.png')
    }
}

const changetext = () => {
    // switch (data.shopDetail.applyId) {
    //     case 2:
    //         data.ser = `累计服务`
    //         data.ser_son = '客户'
    //         data.tit = '服务质量'
    //         data.desc = `服务好评率`
    //         break
    //     case 13:
    //         data.ser = `累计售出`
    //         data.ser_son = '商品'
    //         data.tit = '商品质量'
    //         data.desc = `商品好评率`
    //         break
    //     default:
    //         break
    // }
}

// const clickShop = (shopId: string) => {
//     gotoShopDetail(shopId)
// }

const clickwaterItem = (item:any) => {
    if (data.shopDetail.applyCodeId === 3) {
        gotogoodsDetail(item.id)
    }
    else if (data.shopDetail.applyCodeId === 2) {
        gotoserviceDetail(item.id)
    }
}

const clickShopDetail = () => {
    gotoServiceStore({ shopId: data.shopId })
}

const setColl = () => {
    data.isColl ? unHealthShop({
        shopIds: [data.shopDetail.id]
    }).then(() => {
        data.isColl = false
        bcNotify.value.show('已取消收藏')
    }) : addShop({ shopId: data.shopDetail.id }).then(() => {
        data.isColl = true
        bcNotify.value.show('收藏成功')
    })
}

const getShopInfo = (shopId: any) => {
    getBaseInfo({ id: shopId }).then((res: any) => {
        console.log('店铺信息', res)
        data.shopDetail = res
        data.isColl = !!res.isFavorite
        changetext()
        paging.value.reload()
        addShopBrowerHistory({ shopId: shopId, applyId: res.applyId })
    }).catch((err: any) => {
        console.log(err)
        bcNotify.value.error(err.message)
        setTimeout(() => {
            pageController.back()
        }, 1500)
    })
}

onLoad((options) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        console.log(isRequireLogin)
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 1000)
            return
        }
        data.shopId = options?.id
        getShopInfo(options?.id)
    })
})

</script>

<style lang="scss" scoped>
.shop_bg{
    top: 0;
    right: 0;
    left: 0;
    height: 968rpx;
    background: linear-gradient(159deg, #DFF7EF 0%, #FFFFFF 100%);
    position: absolute;
    z-index: 1;
}
.shop_box{
    position: relative;
    z-index: 10;
    padding: 16rpx 20rpx;

    .seller_box{
        border-radius: 24rpx;
        background-color: #FFFFFF;
        padding: 40rpx 30rpx;
        width: 100%;
        box-sizing: border-box;
        .seller_pic {
            margin-right: 20rpx;
            flex-shrink: 0;

            image {
                width: 148rpx;
                height: 148rpx;
                border-radius: 10rpx;
            }
        }
        .sel_out_rig{
            flex: 1;
        }
        .seller_name {
            font-size: 32rpx;
            font-weight: bold;
            line-height: 52rpx;
            color: #333333;
            margin-bottom: 12rpx;
        }
        .seller_score{
            font-size: 24rpx;
            color: #999999;
            // background: linear-gradient(#FF983D,#FEE111);
            margin-left: 8rpx;
        }
        .seller_coll{
            width: 168rpx;
            height: 68rpx;
        }
        .seller_ser{
            margin-top: 16rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
        }
        .seller_ser text{
            color: #29C86F;
        }
        .seller_exp{
            width: 100%;
            margin-top: 36rpx;
            display: flex;
            align-content: center;
            justify-content: space-between;
        }
        .seller_exp_li{
            text-align: center;
            box-sizing: border-box;
            &.right_left{
                border-right: 2rpx solid #F2F2F2;
                border-left: 2rpx solid #F2F2F2;
                padding-right: 36rpx;
                padding-left: 36rpx;
                box-sizing: border-box;
            }
        }
        .seller_exp_li:last-child{
            border: none;
        }
        .seller_exp_tit{
            font-size: 24rpx;
            font-weight: 400;
            line-height: 52rpx;
            color: #8A8A8A;
        }
        .seller_exp_desc{
            font-size: 28rpx;
            text-align: center;
            font-weight: bold;
            // line-height: 52rpx;
            color: #333333;
        }
        .seller_exp_desc text{
            color: #EA3E1A;
        }
        .seller_exp_img{
            width: 140rpx;
            height: 45rpx;
        }
        .move{
            transform: translate(-12rpx,0rpx);
        }
    }
}
.shop_ser_tit{
    font-size: 32rpx;
    font-weight: bold;
    color: #1E2A34;
    margin: 20rpx 0 30rpx 0;

    &::before{
        content: '';
        display: block;
        width: 8rpx;
        height: 36rpx;
        // background-color: #29C86F;
        border-radius: 4rpx;
        margin-right: 12rpx;
    }
}

.shop_serve{
    // margin-top: 40rpx;
}
</style>
