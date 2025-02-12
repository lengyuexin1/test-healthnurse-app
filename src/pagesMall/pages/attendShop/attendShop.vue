<template>
    <view class="contraner">
        <z-paging ref="paging" v-model="dataList" @query="queryList" :auto="false" :defaultPageSize="10"
                  :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')" empty-view-text="还没有数据哦~"
                  :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
        >
            <!-- <div class="shop_bg"></div> -->
            <view class="shop_box">
                <!-- 店铺信息 -->
                <view class="seller_box" v-if="baseInfo.id">
                    <view class="seller_about row">
                        <view class="seller_pic">
                            <image style="border-radius: 10rpx;width: 148rpx;height: 148rpx;"
                                   :src="baseInfo.thumb"
                            ></image>
                        </view>
                        <view class="sel_out_rig">
                            <view class="seller_name u-line-1">{{ baseInfo.name }}</view>
                            <view class="seller_more row i-center j-between">
                                <view>
                                    <view class="row i-center move">
                                        <u-rate
                                              readonly
                                              :gutter="0"
                                              size="34rpx"
                                              :count="5"
                                              v-model="baseInfo.score"
                                              inactiveColor="#EBEBEB"
                                              activeColor="#FEE111"
                                              inactiveIcon="star-fill"
                                        ></u-rate>
                                        <view class="seller_score">{{ baseInfo.score }}分</view>
                                    </view>
                                    <!-- 累计服务 -->
                                    <view class="seller_ser">{{ ser }}
                                        <text>{{ baseInfo.salesQuantity || 0 }}</text>
                                        {{ ser_son }}
                                    </view>
                                </view>
                                <view class="seller_coll">
                                    <!-- :text="isColl?'取消收藏':'收藏店铺'" -->
                                    <u-button @click="setColl" :throttleTime="1000" color="#29C86F" shape="circle"
                                              :plain="isColl" :customStyle="{ height: '68rpx',fontSize: '26rpx' }">
                                        {{ isColl ? '取消收藏' : '收藏店铺' }}
                                    </u-button>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="seller_exp row j-between">
                        <view class="seller_exp_li">
                            <view class="seller_exp_tit">店铺等级</view>
                            <image class="seller_exp_img" mode="scaleToFit" v-if="baseGrade(baseInfo.level)"
                                   :src="baseGrade(baseInfo.level)"></image>
                            <view v-else>--</view>
                        </view>
                        <view class="seller_exp_li right_left">
                            <!-- 服务质量 服务好评率 -->
                            <view class="seller_exp_tit">{{ tit }}</view>
                            <view class="seller_exp_desc">{{ desc }}
                                <text>{{
                                        baseInfo.applyCodeId == 2 ? baseInfo.serviceGoodCommentRate * 100 : baseInfo.productGoodCommentRate * 100
                                    }}%
                                </text>
                            </view>
                        </view>
                        <view class="seller_exp_li">
                            <view class="seller_exp_tit">客服表现</view>
                            <view class="seller_exp_desc">平均
                                <text>20</text>
                                秒回复
                            </view>
                        </view>
                    </view>
                </view>

                <view class="shop_serve" v-if="baseInfo.applyCodeId == 2">
                    <view class="shop_ser_tit row i-center">服务推荐</view>
                    <view class="outserve">
                        <WaterfallsFlow :is_statistics="true" :wfList="dataList" :ismore="false"></WaterfallsFlow>
                    </view>
                </view>
                <view class="shop_serve" v-if="baseInfo.applyCodeId == 3">
                    <view class="shop_ser_tit row i-center">商品列表</view>
                    <view class="outserve">
                        <GodsFlow :wfList="dataList"></GodsFlow>
                    </view>
                </view>
            </view>
        </z-paging>
        <u-toast ref="uToast"/>
    </view>
</template>

<script>
// import { getBaseInfo, getSerListAll, shopAdd, shopCancel } from '@/api/goods-api'
import { getGoodsList, recomLikeList } from '@/api/goods-api'
import { addShop, unHealthShop } from '@/api/user-api'
import { getBaseInfo } from '@/api/service-api'
import { getAssetsPic } from "@/common/setPicture.js"
// import zPaging from '@/uni_modules/z-paging/components/z-paging/z-paging.vue'
import GodsFlow from '@/components/GodsFlow/GodsFlow.vue'

export default {
    components: { zPaging, GodsFlow },
    name: 'attendShop', //店铺详情
    data() {
        return {
            isColl: false,
            dataList: [],
            shopId: '',
            baseInfo: {},

            ser: '',
            ser_son: '',
            tit: '',
            desc: ''
        }
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        },
        baseGrade() {
            return (type) => {
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
        }
    },
    onLoad(options) {
        this.shopId = options.id
        this.getBaseInfo(options.id)
        this.$store.dispatch("statistics/report", {
            shopId: this.shopId
        })
    },
    methods: {
        // 收藏/取消收藏
        setColl() {
            this.isColl ? unHealthShop({
                shopIds: [this.baseInfo.id]
            }).then(() => {
                this.isColl = false
                this.$refs.uToast.success('取消收藏')
            }) : addShop(this.baseInfo.id).then(() => {
                this.isColl = true
                this.$refs.uToast.success('收藏成功')
            })
        },
        getBaseInfo(id) {
            getBaseInfo(id).then(res => {
                this.baseInfo = res
                this.isColl = !!res.isFavorite
                this.changetext()
                this.$refs.paging.reload()
            }).catch(err => {
                this.$refs.uToast.error(err.message)
                setTimeout(() => {
                    uni.navigateBack()
                }, 1500)
            })
        },
        queryList(pageNumber, pageSize) {
            this.baseInfo.applyCodeId === 2 && recomLikeList({
                pageSize,
                pageNumber,
                query: {
                    // categoryId: 1,
                    shopId: this.shopId
                }
            }).then(res => {
                this.$refs.paging.complete(res)
            }).catch(() => {
                this.$refs.paging.complete(false)
            })

            this.baseInfo.applyCodeId === 3 && getGoodsList({
                pageSize,
                pageNumber,
                query: {
                    shopId: this.shopId
                }
            }).then(res => {
                this.$refs.paging.complete(res)
            }).catch(() => {
                this.$refs.paging.complete(false)
            })
        },
        changetext() {
            console.log('this.baseInfo.applyCodeId', this.baseInfo.applyCodeId)
            switch (this.baseInfo.applyCodeId) {
                case 2:
                    this.ser = `累计服务`
                    this.ser_son = '客户'
                    this.tit = '服务质量'
                    this.desc = `服务好评率`
                    break
                case 3:
                    this.ser = `累计售出`
                    this.ser_son = '商品'
                    this.tit = '商品质量'
                    this.desc = `商品好评率`
                    break
                default:
                    break
            }
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.shop_bg {
    top: 0;
    right: 0;
    left: 0;
    height: 968rpx;
    background: linear-gradient(159deg, #DFF7EF 0%, #FFFFFF 100%);
    position: absolute;
    z-index: 1;
}

.shop_box {
    position: relative;
    z-index: 10;
    padding: 16rpx 20rpx;

    .seller_box {
        border-radius: 24rpx;
        background-color: #FFFFFF;
        padding: 40rpx 30rpx;
        width: 100%;
        box-sizing: border-box;

        .seller_pic {
            margin-right: 20rpx;
            flex-shrink: 0;
        }

        .sel_out_rig {
            flex: 1;
        }

        .seller_name {
            font-size: 32rpx;
            font-weight: bold;
            line-height: 52rpx;
            color: #333333;
            margin-bottom: 12rpx;
        }

        .seller_score {
            font-size: 24rpx;
            color: #999999;
            // background: linear-gradient(#FF983D,#FEE111);
            margin-left: 8rpx;
        }

        .seller_coll {
            width: 168rpx;
            height: 68rpx;
        }

        .seller_ser {
            margin-top: 16rpx;
            font-size: 24rpx;
            font-weight: 400;
            color: #666666;
        }

        .seller_ser text {
            color: #29C86F;
        }

        .seller_exp {
            width: 100%;
            margin-top: 36rpx;
            display: flex;
            align-content: center;
            justify-content: space-between;
        }

        .seller_exp_li {
            text-align: center;
            box-sizing: border-box;

            &.right_left {
                border-right: 2rpx solid #F2F2F2;
                border-left: 2rpx solid #F2F2F2;
                padding-right: 36rpx;
                padding-left: 36rpx;
                box-sizing: border-box;
            }
        }

        .seller_exp_li:last-child {
            border: none;
        }

        .seller_exp_tit {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 52rpx;
            color: #8A8A8A;
        }

        .seller_exp_desc {
            font-size: 28rpx;
            text-align: center;
            font-weight: bold;
            // line-height: 52rpx;
            color: #333333;
        }

        .seller_exp_desc text {
            color: #29C86F;
        }

        .seller_exp_img {
            width: 140rpx;
            height: 45rpx;
        }

        .move {
            transform: translate(-12rpx, 0rpx);
        }
    }

    .shop_serve {
        margin-top: 40rpx;

        .shop_ser_tit {
            font-size: 32rpx;
            font-weight: bold;
            color: #1E2A34;
            margin-bottom: 20rpx;

            &::before {
                content: '';
                display: block;
                width: 8rpx;
                height: 36rpx;
                // background-color: #29C86F;
                border-radius: 4rpx;
                margin-right: 12rpx;
            }
        }
    }
}
</style>
