<template>
    <view>
        <view class="list_box">
            <!-- <div class="recommend_title" >为您推荐</div> -->
            <div class="list_item" v-for="item in agencyList" :key="item.id" @click="tochoiceDetails(item)">
                <image class="item_img" :src="item.thumb" mode="aspectFill"/>
                <div class="item_text_box">
                    <div>
                        <div class="item_text_title">{{ item.name }}</div>
                        <div class="descCs" v-if="templateId == 122">{{ item.desc }}</div>
                        <text class="item-info-pric" v-if="templateId == 122">￥{{
                                (item.price / item.quantity) |
                                      moneyFilter
                            }}
                        </text>
                        <text class="item-info-optionName" v-if="templateId == 122">/起</text>
                        <text class="item-info-fakePrice" v-if="item.fakePrice">￥{{
                                (item.fakePrice / item.quantity) |
                                      moneyFilter
                            }}
                        </text>

                        <view class="customer row i-center j-center" v-if="templateId == 122">
                            <u-image src="/static/custip.svg" width="22rpx" height="22rpx" mode="aspectFill"></u-image>
                            <text class="custtxt">客服</text>
                        </view>

                        <view class="seller row i-center" @click="navShopDetail" v-if="templateId == 122">
                            <u-image v-if="item.shopThumb" :src="getShopPic(item.shopThumb) || ''"
                                     errorIcon="error-circle"
                                     width="30rpx" height="30rpx" radius="20" mode="aspectFill"></u-image>
                            <view class="sel-tit u-line-1">{{ item.shopName || '' }}</view>
                        </view>

                        <div class="item_rate" v-if="isKangyang(item)">
                            <!-- 康养评分 -->
                            <u-rate :count="5" v-model="item.score" inactive-icon="star-fill" inactiveColor="#EBEBEB"
                                    activeColor="#FF983D" gutter="1" :readonly="true"></u-rate>
                            <text class="rate_num">{{ item.score }}</text>
                            <text class="comment_text">{{
                                    item.commentCnt ? (item.commentCnt + '条') : '暂无评论'
                                }}
                            </text>
                        </div>
                        <div class="item_text_deca">
                            <text class="item_text_institution" v-if="item.categoryNames">{{
                                    item.categoryNames[0]
                                }}
                            </text>
                            <text class="item_text_area">{{ getAreaName(item.districtName) }}</text>
                        </div>
                    </div>
                    <div>
                        <div class="item_text_price_box" v-if="templateId !== 122"
                             :class="{ have_price: isKangyang(item) }">
                            <div class="item_text_price" v-if="(item.minPrice || item.maxPrice) && item.applyId != 13">
                                ￥
                                <div class="item_text_pricenumber">{{
                                        item.minPrice ? item.minPrice : item.maxPrice |
                                              moneyFilter
                                    }}
                                </div>
                                <div class="item_text_extend">/月</div>
                            </div>
                            <div class="item_distance" v-if="positioning">{{ getdistance(item.lat, item.lng) }}</div>
                        </div>
                    </div>
                    <div class="recovered" v-if="templateId !== 122">
                        <view class="recovered_benefit" v-for="(v, index) in item.items" :key="index">
                            <view class="recovered_desc">惠</view>
                            <view class="recovered_price">￥{{ (Number(v.price) / 100).toFixed(2) }}</view>
                            <view class="recovered_title">{{ v.name }}</view>
                        </view>
                    </div>
                </div>
                <div class="advertisement_tag" v-if="item.isAd == 1">广告</div>
            </div>
        </view>
    </view>
</template>

<script setup lang="ts">
import { getAreaDict } from "@/api/care-api"
import { computed, onMounted, ref } from 'vue'
import { setPriceVer } from '@/common/setPicture'
import { gotoServiceOrg, gotoServiceStore } from '@/routes/service-routes'
import { getDistances } from '@/utils/distance'
import { gotohealthDetails } from "@/routes/plateform-routes"

const props = defineProps({
    templateId: Number,
    agencyList: Array,
    positioning: Boolean,
    coordinate: Object,
    isRecommend: {
        type: Boolean,
        default: false
    }
})

// Data
const areaList = ref([])

// Computed properties
const getShopPic = computed(() => (str) => {
    return str ? setPriceVer(str) : ''
})

const getdistance = computed(() => (lat, lng) => {
    if (!props.coordinate.lat) {
        return ''
    }
    // Calculate distance
    const distance = getDistances(
          props.coordinate.lat,
          props.coordinate.lng,
          lat,
          lng
    )
    return distance + 'km'
})

const getAreaName = computed(() => (ids) => {
    if (ids) {
        const obj = areaList.value.find(x => ids.includes(x.id))
        return obj ? obj.name : ""
    }
})

const isKangyang = computed(() => (item) => {
    return item.businessType === 3
})

// Lifecycle hooks
onMounted(() => {
    hasAreaList()
})

// Methods
const tochoiceDetails = (item) => {
    console.log(item)
    if (props.templateId === 122) {
        gotoServiceStore({ itemId: item.id })
        return
    }
    if (item.businessType === 4) {
        gotoServiceOrg(item.id)
    }
    else {
        gotohealthDetails(item.id, item.isAd)
    }
}

const hasAreaList = () => {
    getAreaDict(props.parentId).then((res) => {
        areaList.value = res
    })
}
</script>

<style lang="scss" scoped>
.recommend_title {
    color: #333333;
    font-weight: 600;
    font-size: 34rpx;
    padding: 0rpx 0rpx 20rpx 0rpx;
    box-sizing: border-box;
}

.recovered {
    // display: flex;
    padding-top: 24rpx;

    // // padding-bottom: 24rpx;
    // margin-top: 24rpx;
    // flex-direction: column;
    .recovered_benefit {
        display: flex;
        margin-bottom: 12rpx;

        .recovered_desc {
            font-size: 18rpx;
            background-color: #fff2ea;
            padding: 0rpx 6rpx;
            height: 30rpx;
            margin-right: 8rpx;
            color: #f64911;
        }

        .recovered_price {
            font-size: 24rpx;
            color: #f94f12;
            margin-right: 8rpx;
        }

        .recovered_title {
            font-size: 22rpx;
            color: #333333;
        }
    }
}

.list_box {
    // padding:0 20rpx 20rpx 20rpx;
    box-sizing: border-box;
    width: 100%;

    .list_item {
        padding: 24rpx;
        box-sizing: border-box;
        width: 100%;
        // height: 224rpx;
        background: #ffffff;
        border-radius: 24rpx;
        position: relative;
        display: flex;
        margin-bottom: 20rpx;

        .item_img {
            width: 176rpx;
            height: 176rpx;
            border-radius: 12rpx;
            overflow: hidden;
            margin-right: 24rpx;
        }

        .item_text_box {
            display: flex;
            // align-items: center;
            // justify-content: space-between;
            flex-direction: column;
            width: 65%;

            .item_text_title {
                color: #333333;
                font-size: 32rpx;
                margin-bottom: 6rpx;
                font-weight: bold;
                width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .descCs {
                font-size: 28rpx;
                color: #808080;
                margin-bottom: 16rpx;
            }

            .item-info-pric {
                font-size: 28rpx;
                font-weight: bold;
                color: #333333;

            }

            .item-info-optionName {
                font-size: 22rpx;
                color: #1A1A1A;
            }

            .item-info-fakePrice {
                margin-left: 6rpx;
                font-size: 22rpx;
                color: #999999;
                text-decoration: line-through;
            }

            .customer {
                width: 72rpx;
                height: 34rpx;
                background: #E6F2FF;
                border-radius: 6rpx 0rpx 0rpx 6rpx;
                position: absolute;
                right: 0;
                top: 60%;
                transform: translateY(-50%);

                .custtxt {
                    font-weight: 400;
                    font-size: 16rpx;
                    color: #4E8AF3;
                    margin-left: 4rpx;
                }
            }

            .seller {
                margin-top: 10rpx;

                .sel-tit {
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #999999;
                    line-height: 30rpx;
                    padding-left: 10rpx;
                }
            }

            .item_rate {
                display: flex;
                align-items: center;
                margin-bottom: 14rpx;

                .rate_num {
                    margin-left: 8rpx;
                    margin-right: 16rpx;
                    color: #ff9f3e;
                    font-size: 24rpx;
                }

                .comment_text {
                    color: #333333;
                    font-size: 24rpx;
                }
            }

            .item_score_box {
                display: flex;
                align-items: center;
                margin-bottom: 12rpx;

                .rate_text {
                    color: #ff9f3e;
                    font-size: 24rpx;
                    margin-right: 16rpx;
                    margin-left: 10rpx;
                }

                .item_score_num {
                    font-size: 24rpx;
                    color: #333333;
                }
            }

            .item_text_deca {
                color: #777777;
                font-size: 24rpx;
                display: flex;
                align-items: center;
                margin-bottom: 12rpx;

                .item_text_institution {
                    margin-right: 16rpx;
                }
            }

            .item_text_price_box {
                // text-align: end;
                display: flex;
                padding-bottom: 16rpx;
                justify-content: space-between;

                &.have_price {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .item_text_price {
                    font-size: 28rpx;
                    color: #111111;
                    display: flex;
                    align-items: center;

                    .item_text_pricenumber {
                        font-weight: bold;
                        margin-right: 6rpx;
                    }

                    .item_text_extend {
                        font-size: 18rpx;
                        color: #111111;
                    }
                }

                .item_distance {
                    position: absolute;
                    right: 24rpx;
                    // bottom: 24rpx;
                    font-size: 24rpx;
                    color: #333333;
                }
            }
        }

        .advertisement_tag {
            width: 56rpx;
            height: 32rpx;
            border: 2rpx solid #e3e3e3;
            border-radius: 6rpx;
            color: #e3e3e3;
            font-size: 20rpx;
            text-align: center;
            line-height: 32rpx;
            position: absolute;
            top: 20rpx;
            right: 20rpx;
        }
    }
}
</style>

