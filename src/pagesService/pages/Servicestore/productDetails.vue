<template>
    <div class="contraner">
        <z-paging
              ref="paging"
              :auto="false"
              :defaultPageSize="10"
              :empty-view-img-style="{ width: '320rpx',height: '320rpx' }"
              :loading-more-enabled="false"
              :refresher-enabled="false"
              @query="queryList"
        >
            <template #top>
                <bc-page-navbar :title="'找机构'"></bc-page-navbar>
            </template>
            <view v-if="data.agencyObj.id" class="details_box">
                <div class="swiper_box">
                    <swiper :autoplay="true" :duration="500" :interval="5000" circular class="swiper"
                            @change="swiperchang">
                        <!-- agencyObj  mainPics ==> detailPics -->
                        <swiper-item v-for="(item,index) in showswiper(data.agencyObj.mainPics)" :key="index">
                            <image
                                  :src="item"
                                  class="swiper_item"
                                  mode="aspectFill"
                                  @click="preImage(index,showswiper(data.agencyObj.mainPics))"
                            />
                        </swiper-item>

                    </swiper>
                    <div class="swiper_indicator">
                        <div v-for="(item,index) in showswiper(data.agencyObj.mainPics)"
                             :key="index"
                             :class="{ 'isswiper': data.swiperIndex == index ,'one_notright': notright(data.agencyObj.mainPics) }"
                             class="swiper_indicator_item"></div>
                    </div>
                </div>
                <div class="introduce">
                    <div class="introduce_top">
                        <div class="introduce_title_box">
                            <div class="introduce_title">{{ data.agencyObj.name }}</div>
                            <!-- <div class="introduce_rate_box">
                              <u-rate
                                :count="5" v-model="count"
                                inactive-icon="star-fill"
                                inactiveColor="#EBEBEB" activeColor="#FF983D"
                                gutter="2"
                                :readonly="true"></u-rate>
                              <div class="introduce_num">3.2</div>
                              <div class="introduce_rate">231条</div>
                            </div> -->
                        </div>
                        <div class="introduce_icon">
                            <div v-if="false" class="icon_item_box">
                                <image
                                      :src="getAssetsUrl((false ? '/channel/collect_highlight.svg' : '/channel/collect.svg'))"
                                      class="icon_item_img"
                                      mode="scaleToFill"
                                />
                                <text>收藏</text>
                            </div>
                            <div class="icon_item_box" @click="share">
                                <image
                                      :src="getAssetsUrl('/channel/share.svg')"
                                      class="icon_item_img"
                                      mode="scaleToFill"
                                />
                                <text>分享</text>
                            </div>
                        </div>

                    </div>
                    <div class="device_list">

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/bed.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text class="device_text">{{ data.agencyObj.bedDesc }}张床</text>
                        </div>

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/house.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text class="device_text">{{ data.agencyObj.areaDesc }}平方米</text>
                        </div>

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/floor.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text class="device_text">{{ data.agencyObj.floor }}层</text>
                        </div>

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/window.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text v-if="data.agencyObj.isWindow == 1" class="device_text">有窗</text>
                            <text v-else class="device_text">没窗</text>
                        </div>

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/balcony.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text v-if="data.agencyObj.isBalcony == 1" class="device_text">有阳台</text>
                            <text v-else class="device_text">没阳台</text>
                        </div>

                        <div class="device_item">
                            <image
                                  :src="getAssetsUrl('/agency/nosmoke.svg')"
                                  class="device_icon"
                                  mode="scaleToFill"
                            />
                            <text v-if="data.agencyObj.isNoSmoke == 1" class="device_text">禁烟</text>
                            <text v-else class="device_text">不禁烟</text>
                        </div>


                    </div>

                </div>
                <div class="facilities">
                    <div class="facilities_title">
                        其他设施
                    </div>
                    <div class="facilities_list">
                        <div v-for="(item,index) in data.agencyObj.otherFacilitie" :key="index" class="facilities_item">
                            <div class="facilities_item_icon">
                                <TnIcon color="#ffffff" name="checkbox-mark" size="12"></TnIcon>
                            </div>
                            <div class="facilities_item_text">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="img_details">
                    <div class="img_details_title">图片描述</div>
                    <div class="img_list">
                        <image
                              v-for="(item,index) in data.agencyObj.detailPics"
                              :key="index"
                              :src="item"
                              class="img_item"
                              mode="widthFix"
                              @click="preImage(index,data.agencyObj.detailPics)"
                        />
                    </div>
                </div>

            </view>
            <template #bottom>
                <view class="bottom_btn">
                    <div class="contact" @click="gotoIMSessionChat">
                        <text class="contact_text">
                            立即咨询
                        </text>
                        <text class="contact_price">
                            ￥
                            <text class="contact_price_text">{{ moneyFilter(data.agencyObj.price) }}</text>
                            <text>/{{ data.agencyObj.unit == 1 ? '日' : '月' }}</text>

                        </text>
                    </div>
                </view>
            </template>

        </z-paging>
        <shareView ref="shaView" :detailObj="data.shareObj" :path="data.path" @sharePage="sharePage"></shareView>

    </div>
</template>

<script lang="ts" setup>
import { getAssetsPic } from '@/common/setPicture'
import shareView from '@/pagesService/components/shareView/shareView.vue'
import { moneyFilter } from '@/common/filters'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import { addItemBrowerHistory, agencydetail, organizationDetail } from '@/api/service-api'
import { PlatformManage } from "@bc/sys"
import { gotoproductDetails } from '@/routes/plateform-routes'
import { computed, onMounted, reactive, ref } from 'vue'
import { onLoad, onShareAppMessage, onShow } from '@dcloudio/uni-app'
import { gotoIndex } from "@/routes/public-routes"
import { createTeam } from "@/api/nim-api"
import { gotoChatPage } from '@/routes/nim-routes'

interface Data {
    swiperIndex: number,
    count: number,
    showmoreroom: boolean,
    agencyObj: object,
    shareObj: object,
    path: string,
    backChannellist: boolean,
    accountName: string,
    accountThumb: string,
    shopId: string,
    itemId: string,
    shopName: string,
    needlogin: boolean //登录状态
}

const data = reactive<Data>({
    swiperIndex: 0,
    count: 3,
    showmoreroom: false,
    agencyObj: {},
    shareObj: {},
    path: ``,
    backChannellist: false,
    accountName: '',
    accountThumb: '',
    shopId: '',
    itemId: '',
    shopName: '',
    needlogin: false //登录状态

})
onMounted(() => {
})
const getAssetsUrl = computed(() => {
    return (str) => {
        return getAssetsPic(str)
    }
})
const showswiper = computed(() => {
    return (list) => {
        if (!list.length) {
            return
        }
        if (list.length > 5) {
            return list.slice(0, 5)
        }
        else {
            return list
        }

    }
})
const notright = computed(() => {
    return (list, index) => {
        if (list.length == 1) {
            return true
        }
        else {
            return list.length == (index + 1)
        }
    }
})

onLoad((options) => {
    data.shopId = options.shopId
    data.itemId = options.itemId
    getagencydetail()

    PlatformManage.isRequireLogin().then((needlogin: any) => {
        data.needlogin = needlogin
        if (data.needlogin) {
            console.log('未登录')
        }
        else {
            addItemBrowerHistory({ itemId: data.itemId, applyId: 12 })
            console.log('已登录')
        }
    })
})


onShow(() => {
    const pages = getCurrentPages()
    console.log('pages', pages)
    if (pages.length == 1) {
        // 记录回退到首页的状态
        data.backChannellist = true
    }
    else {
        console.log('多个历史路由', pages)
        if (pages[1].route == pages[2]?.route) {
            console.log('特殊处理路由', pages)
            data.backChannellist = true
            return
        }
        data.backChannellist = false
    }
})

const shaView = ref()
// 微信小程序分享
//#ifdef MP-WEIXIN
onShareAppMessage(() => {
    console.log('微信分享')
    shaView.value.close()
    return {
        title: data.agencyObj.name,
        path: `/Channel/pages/orderConfirm/productDetails?itemId=${data.agencyObj.id}`,
        imageUrl: data.agencyObj.mainPics[0]
        // content: 'this.shopName',
    }
})
//#endif
const queryList = () => {
}
const getagencydetail = () => {
    agencydetail({
        id: data.itemId
    }).then((res) => {
        data.agencyObj = res
        data.shopName = data.agencyObj.organizationName
        data.shopId = data.agencyObj.organizationId
    })
}
const getorganizationDetail = (shopId) => {
    organizationDetail({
        shopId,
        isAd: 0
    }).then((res) => {
        console.log('res', res)
    })
}
const swiperchang = (item) => {
    data.swiperIndex = item.detail.current
    // console.log('item',item);
}
const showroom = () => {
    data.showmoreroom = !data.showmoreroom
}
const tochoiceDetails = (itemId, shopId, tologin) => {
    console.log('itemId', itemId)
    gotoproductDetails(itemId, shopId, tologin)
}
const share = () => {
    if (data.needlogin) {
        tochoiceDetails(data.agencyObj.id, true)
        return
    }

    data.shareObj = {
        id: data.agencyObj.id,
        title: data.agencyObj.name,
        accountName: data.agencyObj.organizationName,
        accountThumb: data.agencyObj.organizationThumb,
        cover: data.agencyObj.mainPics[0],
        // 自定义副标题
        Customsubtitle: true,
        price: data.agencyObj.price


    }
    this.path = `/Channel/pages/orderConfirm/productDetails?itemId=${data.agencyObj.id}`

    shaView.value.open()

}
// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.agencyObj.mainPics[0],
        title: data.agencyObj.name,
        miniProgram: {
            id: import.meta.env.VITE_WEIXIN_ORIGINAL_ID, //微信小程序原始id
            path: `/Channel/pages/orderConfirm/productDetails?itemId=${data.agencyObj.id}`, //点击链接进入的页面
            type: import.meta.env.VITE_WEIXIN_OPEN, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: 'http://www.baochuncare.com'//兼容低版本的网页链接
        },
        success: ret => {
            console.log(JSON.stringify(ret))
        }, fail: err => {
            console.log(err)
        }
    })

}
// #endif
const goback = () => {
    if (!data.backChannellist) {
        console.log('回退')
        uni.navigateBack()
    }
    else {
        console.log('回退到首页')
        gotoIndex()
    }
}
// 联系客服
const gotoIMSessionChat = () => {
    PlatformManage.getToken().then((token: any) => {
        console.log(token)
        console.log(data.agencyObj)
        createTeam({
            userId: token.id,
            userName: token.nickname,
            userThumb: token.avatar,
            flag: 1, // 1小程序用户，2服务人员
            shopId: data.shopId,
            type: 2 // 1平台，2店铺
        }).then((res: any) => {
            console.log(res)
            gotoChatPage({
                to: res.tid,
                scene: 'customer',
                originPage: 'pagesService/pages/Servicestore/healthproductDetails'
            })
        })
    })
}
// 图片预览
const preImage = (current, urls) => {
    uni.previewImage({
        current,
        urls
    })
}

</script>

<style lang="scss" scoped>
.contraner {
    .details_box {
        padding: 20rpx;
        box-sizing: border-box;

        .swiper_box {
            width: 100%;
            height: 710rpx;
            border-radius: 24rpx;
            overflow: hidden;
            position: relative;
            margin-bottom: 20rpx;

            .swiper {
                width: 100%;
                height: 100%;

                .swiper_item {
                    width: 100%;
                    height: 100%;
                    // border: 1px solid red;
                    box-sizing: border-box;
                    background: #FFFFFF;
                }
            }

            .swiper_indicator {
                position: absolute;
                bottom: 20rpx;
                right: 20rpx;
                // width: 76rpx;
                height: 28rpx;
                background: #000000;
                opacity: 0.14;
                border-radius: 24rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8rpx 12rpx;
                box-sizing: border-box;

                .swiper_indicator_item {
                    width: 12rpx;
                    height: 12rpx;
                    background: #FFFFFF;
                    border-radius: 50%;
                    opacity: 0.4;
                    margin-right: 8rpx;

                    &.isswiper {
                        background: #FFFFFF;
                        opacity: 1;
                    }

                    &.one_notright {
                        margin-right: 0rpx;
                    }
                }
            }
        }

        .introduce {
            width: 100%;
            height: 304rpx;
            border-radius: 24rpx;
            background: #FFFFFF;
            padding: 30rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;

            .introduce_top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;

                .introduce_title_box {
                    width: 75%;

                    .introduce_title {
                        color: #333333;
                        font-size: 34rpx;
                        margin-bottom: 16rpx;
                        font-weight: bold;
                    }

                    .introduce_rate_box {
                        display: flex;
                        align-items: center;

                        .introduce_num {
                            color: #FF9F3E;
                            margin-right: 16rpx;
                            margin-left: 8rpx;
                            font-size: 24rpx;
                        }

                        .introduce_rate {
                            color: #333333;
                            font-size: 24rpx;
                        }
                    }
                }

                .introduce_icon {
                    // width: 120rpx;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .icon_item_box {
                        color: #878787;
                        font-size: 20rpx;
                        display: flex;
                        flex-direction: column;

                        .icon_item_img {
                            width: 40rpx;
                            height: 40rpx;
                            margin-bottom: 6rpx;

                        }
                    }

                }
            }

            .device_list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);

                .device_item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30rpx;
                    width: 100%;
                    padding-left: 20rpx;
                    box-sizing: border-box;

                    .device_icon {
                        width: 36rpx;
                        height: 36rpx;
                        // border: 1px solid red;
                        box-sizing: border-box;
                        margin-right: 16rpx;
                    }

                    .device_text {
                        color: #666666;
                        font-size: 26rpx;
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

        }

        .facilities {
            padding: 30rpx;
            box-sizing: border-box;
            background: #FFFFFF;
            border-radius: 24rpx;
            margin-bottom: 20rpx;

            .facilities_title {
                color: #333333;
                font-size: 28rpx;
                margin-bottom: 16rpx;
                font-weight: bold;
            }

            .facilities_list {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                .facilities_item {
                    border-radius: 30rpx;
                    background: #F2F2F2;
                    color: #666666;
                    font-size: 26rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12rpx 16rpx;
                    margin-right: 16rpx;
                    margin-bottom: 20rpx;

                    .facilities_item_icon {
                        width: 28rpx;
                        height: 28rpx;
                        border: 50%;
                        background: #29C86F;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 28rpx;
                        color: #FFFFFF;
                        margin-right: 8rpx;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .facilities_item_text {
                        font-size: 26rpx;
                        color: #666666;
                    }
                }
            }
        }

        .img_details {
            padding: 30rpx;
            box-sizing: border-box;
            background: #FFFFFF;
            border-radius: 24rpx;

            .img_details_title {
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 16rpx;
            }

            .img_list {
                .img_item {
                    width: 100%;
                    // height: 200rpx;
                    display: block;
                    // border: 1px solid red;
                }
            }
        }

    }

    .bottom_btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 28rpx;
        padding-bottom: 48rpx;
        box-sizing: border-box;
        background: #FFFFFF;

        .contact {
            width: 686rpx;
            height: 84rpx;
            background: #29C86F;
            border-radius: 46rpx;
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 84rpx;
            text-align: center;

            .contact_text {
                margin-right: 12rpx;
            }

            .contact_price {
                font-size: 24rpx;

                .contact_price_text {
                    color: #FFDA46;
                    font-size: 30rpx;
                    font-weight: bold;
                }
            }
        }
    }

}


</style>
