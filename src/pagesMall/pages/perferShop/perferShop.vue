<template>
    <view class="brandpage">
        <view class="gradient" :style="{ backgroundImage: `url(${data.activityBG})` }"></view>
        <view class="content">
            <z-paging
            ref="paging"
            v-model="data.dataList"
            @query="queryList"
            :auto="false"
            :fixed="false"
            :defaultPageSize="10"
            :loading-more-enabled="false"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            >
                <view v-for="item in data.dataList" :key="item.id">
                    <view class="activity_item" v-if="item.applyId == 18" @click.stop="clickItem(item)">
                        <view class="activity_item_top">
                            <view class="top_left">
                                <image :src="item.thumb" mode="scaleToFill" style="width: 100rpx; height: 100rpx;" />
                            </view>
                            <view class="top_right">
                                <view class="top_right_title">{{item.name}}</view>
                                <view class="top_right_bottom">
                                    <TnRate v-model="item.score" :min="1" :max="5" readonly gutter="0rpx" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="sm" allow-half />
                                    <view class="star_text">{{ item.score }}分</view>
                                    <!-- 标签 -->
                                    <view class="top_tag">
                                        {{item.levelName}}
                                    </view>
                                    <view class="top_tag">
                                        好评率{{(item.reputation * 100).toFixed(0)}}%
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="activity_item_bottom">
                            <view class="bottom_list" v-if="item.shopItemList && item.shopItemList[0].length > 0">
                                <!-- 返回的数据套了两层数组 -->
                                <view v-for="(shopitem,index) in item.shopItemList[0]" :key="shopitem.id">
                                    <view class="bottom_item" :class="{ enditem: index === 3 }" v-if="index < 4" @click.stop="toactivity(shopitem,item)">
                                        <view class="item_img">
                                            <image :src="shopitem.thumb" mode="scaleToFill" style="width: 152rpx; height: 152rpx;" />
                                        </view>
                                        <view class="item_text">
                                            {{shopitem.name}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view class="bottom_not" v-else>
                                <text>暂无上架产品</text>
                            </view>
                        </view>
                    </view>

                    <!-- 机构 -->
                    <view class="institution_item" v-else-if="item.applyId == 19"  @click.stop="clickItem(item)">
                        <image class="item_left_img" :src="item.thumb" mode="scaleToFill"  />
                        <view class="item_right_text">
                            <view class="right_title">{{ item.shortName }}</view>
                            <view class="score_box">
                                <TnRate
                                    v-model="item.score"
                                    inactive-color="#EBEBEB"
                                    active-color="#FEE111"
                                    gutter="4rpx"
                                    size="24rpx"
                                    :readonly="true"
                                />
                                <view class="score_number">{{ item.score }}分</view>
                                <!-- <view class="comment_number">89评论</view> -->
                            </view>
                            <view class="right_desc">
                                <view class="category_text">{{ item.categoriesName }}</view>
                                <view class="city">{{ item.districtName }}</view>
                            </view>
                            <view class="price_box">
                                <text class="price_left" v-if="item.price">
                                    {{ priceFormat(item.price) }} 起
                                </text>
                                <text v-else></text>
                                <!-- <view class="distance">{{ getdistance(item.lat,item.lng) }}</view> -->
                            </view>
                            <view class="package_list" v-if="item.shopItemList && item.shopItemList[0].length > 0">
                                <view class="package_item" v-for="sonItem in item.shopItemList[0]" :key="sonItem.id">
                                    <image
                                        class="package_icon"
                                        :src="getAssetsUrl('/leyou/serviceIcon/preferential-icon.svg')"
                                        mode="scaleToFill"
                                    />
                                    <view class="package_text">{{ sonItem.name }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </z-paging>
            <BCNotify ref="bcNotify"></BCNotify>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { gotoShopDetail, gotoServiceStore } from '@/routes/service-routes'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { pageController } from '@bc/uni-tools'
import { getActivityDetail, getActivityList } from '@/api/activity-api'
import { getDistances } from '@/utils/distance'
import { priceFormat } from '@/common/price-format'
import { gotogoodsDetail } from '@/routes/goods-routes'

interface Data {
    dataList: any
    id: string
    activityBG: string
    mylat: string
    mylng: string
}

const data = reactive<Data>({
    dataList: [],
    id: '',
    activityBG: '',
    mylat: '',
    mylng: ''

})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if (!data.id) {
        bcNotify.value.error('活动不存在')
        setTimeout(() => {
            pageController.back()
        }, 1200)
        return
    }
    getActivityDetail({ id: data.id }).then((res: any) => {
        uni.setNavigationBarTitle({ title: res?.name })
        data.activityBG = res?.mainImage
        paging.value.complete(res.shopList)
        console.log('data.dataList',data.dataList);
        
    })
}

const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                console.log("res", res)
                console.log("定位成功")
                resolve({
                    lat: res.latitude,
                    lng: res.longitude
                })
            },
            fail: (err) => {
                console.log("定位失败")
                reject(err)
            }
        })
    })
}

const getdistance = computed(() => (lat:number, lng:number) => {
    const distance = getDistances(
        data.mylat,
        data.mylng,
        lat,
        lng
    )
    return distance + 'km'
})

const toactivity = (shopitem, item) => {
    gotogoodsDetail(shopitem.id)
}

const clickItem = (item: any) => {
    item.applyId == 18 && gotoShopDetail(item.id)
    item.applyId == 19 && gotoServiceStore({ shopId: item.id })
}

onMounted(() => {
    getActivityList({ placementLocation: 8 }).then((res:any) => {
        let arr = res.filter((item:any) => {
            return item.type == 3
        })
        data.id = arr[0]?.id
        paging.value?.reload()
    })

    // 获取当前位置
    getDistancesfun().then((res: any) => {
        data.mylat = res.lat
        data.mylng = res.lng
    })
})

</script>

<style lang="scss" scoped>
.brandpage{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .gradient{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 440rpx;
        // background: linear-gradient(180deg, #FF8941 0%, #FF3C01 140%);
        z-index: -1;
        background-position:center center;
        background-size: 100% 100%;
    }

    .content{
        overflow: auto;
        position: absolute;
        top: 394rpx;
        bottom: 0;
        left: 0;
        right: 0px;
        padding: 34rpx 24rpx 0rpx 24rpx;
        box-sizing: border-box;
        border-radius: 40rpx 40rpx 0rpx 0rpx !important;
        background: #F8F8F8;
        .activity_item{
            height: 336rpx;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 24rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
            background: #FFFFFF;
            margin-bottom: 24rpx;
            .activity_item_top{
                width: 100%;
                height: 100rpx;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .top_left{
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 12rpx;
                    margin-right: 24rpx;
                    overflow: hidden;
                }
                .top_right{
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                    justify-content: center;
                    margin-bottom: 16rpx;

                    .top_right_title{
                        color: #333333;
                        font-size: 30rpx;
                        font-weight: bold;
                        margin-bottom: 16rpx;
                    }
                    .top_right_bottom{
                        display: flex;
                        align-items: center;
                        transform: translate(-8rpx, 0rpx);
                        .star_text{
                            font-size: 24rpx;
                            color: #999999;
                            margin: 0rpx 20rpx 0rpx 10rpx;
                        }
                        .top_tag{
                            font-size: 20rpx;
                            color: #B3834C;
                            border: 2rpx solid #E5DAB4;
                            text-align: center;
                            padding: 4rpx 8rpx;
                            box-sizing: border-box;
                            margin-right: 12rpx;
                            border-radius: 6rpx;
                        }
                    }
                }

            }
            .activity_item_bottom{
                flex: 1;
                width: 100%;
                box-sizing: border-box;
                padding: 20rpx 0rpx;
                .bottom_list{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    // justify-content: space-between;
                    .bottom_item{
                        position: relative;
                        border-radius: 8rpx;
                        overflow: hidden;
                        width: 89%;
                        height: 100%;
                        margin-right: 20rpx;
                        .item_img{
                            width: 100%;
                            height: 100%;
                        }
                        .item_text{
                            padding: 4rpx 8rpx;
                            box-sizing: border-box;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            text-align: center;
                            color: #FFFFFF;
                            font-size: 20rpx;
                            background-color:rgba(0,0,0,0.5);
                            width: 100%;
                            white-space: nowrap; /*强制一行内显示*/
                            overflow: hidden;/*溢出隐藏*/
                            text-overflow: ellipsis;/*超出部分现实省略号*/
                        }

                    }
                    .enditem{
                        margin-right: 0rpx;
                    }
                }
                .bottom_not{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24rpx;
                    color: #C7C7C7;
                    border: 2rpx solid #F2F2F2;
                    border-radius: 8rpx;
                }
            }

        }
    }
}

.institution_item{
    padding: 24rpx;
    box-sizing: border-box;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 24rpx;
    
    .item_left_img{
        width: 132rpx;
        height: 132rpx;
        margin-right: 20rpx;
        border-radius: 12rpx;
        overflow: hidden;
    }   
    .item_right_text{
        flex:1;
        padding-bottom:12rpx;
        // border-bottom:2rpx solid #F0F0F0;
        .right_title{
            color: #333333;
            font-size: 30rpx;
            font-weight: 500;
            margin-bottom: 12rpx;
        }
        .score_box{
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;
            .score_number{
                font-size: 24rpx;
                color: #FF9F3E;
                font-weight: 500;
                margin-left: 4rpx;
                margin-right: 16rpx;
            }
            .comment_number{
                color: #808080;
                font-size: 24rpx;
            }

        }
        .right_desc{
            color: #808080;
            font-size: 24rpx;
            font-weight: 400;
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;
            .category_text{
                padding-right: 12rpx;
                border-right: 2rpx solid #E8E8E8;;
            }
            .city{
                padding-left: 12rpx;
            }
        }
        .price_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14rpx;
            .price_left{
                display: flex;
                align-items: center;
                color: #333333;
                font-size: 20rpx;
                font-weight: 400;
                .price_number{
                    font-size: 30rpx;
                    color: #333333;
                    font-weight: 600;
                }
            }
            .distance{
                font-size: 24rpx;
                color: #999999;
                font-weight: 400;
            }
        }
        .package_list{
            .package_item{
                display: flex;
                align-items: center;
                margin-bottom: 12rpx;

                .package_icon{
                    width: 30rpx;
                    height: 30rpx;
                    border-radius: 8rpx;
                    margin-right: 12rpx;
                }
                .package_text{
                    font-weight: 400;
                    font-size: 22rpx;
                    color: #333333;
                }
            }
        }

    }
}
</style>
