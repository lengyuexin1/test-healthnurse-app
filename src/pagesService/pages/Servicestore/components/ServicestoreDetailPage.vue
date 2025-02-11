<template>
    <view class="contraner">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'详情'">
                    <template #back>
                        <view class="nav_back" @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>

                </bc-page-navbar>
            </template>
            <view class="details_box" v-if="data.detailObj.id">
                <div class="swiper_box">
                    <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" @change="swiperchang">
                        <swiper-item
                            v-for="(item, index) in showswiper(
                                data.detailObj.covers
                            )"
                            :key="index"
                        >
                            <image
                                class="swiper_item"
                                :src="item"
                                mode="aspectFill"
                                @click="
                                    preImage(
                                        index,
                                        showswiper(data.detailObj.covers)
                                    )
                                "
                            />
                        </swiper-item>
                    </swiper>
                    <div class="swiper_indicator">
                        <div
                            class="swiper_indicator_item"
                            v-for="(item, index) in showswiper(
                                data.detailObj.covers
                            )"
                            :key="index"
                            :class="{
                                isswiper: data.swiperIndex == index,
                                one_notright: notright(data.detailObj.covers, index)
                            }"
                        ></div>
                    </div>
                </div>
                <div class="introduce">
                    <div class="introduce_top">
                        <div class="introduce_title_box">
                            <div class="introduce_title">
                                <div class="introduce_name">{{ data.detailObj.shopName }}</div>
                                <div class="businessStatus_tag" v-if="data.detailObj.businessStatus == 1">正常营业</div>
                                <div class="businessStatus_tag red_tag" v-else>暂停营业</div>
                            </div>
                            <div class="introduce_rate_box">
                                <TnRate
                                    v-model="data.detailObj.score"
                                    inactive-color="#EBEBEB"
                                    active-color="#FEE111"
                                    gutter="4rpx"
                                    size="24rpx"
                                    :readonly="true"
                                />
                                <div class="introduce_num">{{ data.detailObj.score ? data.detailObj.score : 0 }}</div>
                                <div class="introduce_rate">
                                    {{
                                    data.detailObj.commentCnt
                                    ? data.detailObj.commentCnt + "条"
                                    : "暂无评论"
                                    }}
                                </div>
                            </div>
                        </div>
                        <div class="introduce_icon">
                            <div class="icon_item_box" @click="setColl">
                                <image
                                    class="icon_item_img"
                                    :src="
                                        getAssetsUrl(
                                            data.isColl
                                                ? '/channel/collect_highlight.svg'
                                                : '/channel/collect.svg'
                                        )
                                    "
                                    mode="scaleToFill"
                                />
                                <text>收藏</text>
                            </div>
                            <div class="icon_item_box" @click="share">
                                <image class="icon_item_img" :src="getAssetsUrl('/channel/share.svg')" mode="scaleToFill" />
                                <text>分享</text>
                            </div>
                        </div>
                    </div>
                    <div class="introduce_item">
                        <div class="price_box" v-if="data.detailObj.minPrice || data.detailObj.maxPrice">
                            ￥
                            <text class="price_number">
                                {{( data.detailObj.minPrice / 100)}}
                            </text>/月
                        </div>
                        <div class="introduce_item_title">
                            <div class="title_text">营业时间</div>
                            <div class="title_content" v-if="data.detailObj.businessTime">
                                <div v-if="data.detailObj.businessStatus == 1">
                                    <text
                                        v-if="
                                            showDays(
                                                data.detailObj.businessTime
                                                    .businessDays
                                            )
                                        "
                                    >
                                        {{
                                        formatTimeString(
                                            data.detailObj.businessTime
                                        .businessDays
                                        )
                                        }}
                                    </text>
                                    <div>
                                        {{
                                        getbusinessTime(
                                            data.detailObj.businessTime
                                        )
                                        }}
                                    </div>
                                </div>
                                <div v-else>--</div>
                            </div>
                        </div>
                        <div class="introduce_item_title">
                            <div class="title_text">{{ data.detailObj.categoryNames[0] }}</div>
                            <div class="title_content">{{ data.detailObj.districtName }}</div>
                        </div>
                        <div class="address">
                            <div>
                                <div class="address_title">{{ data.detailObj.area }} {{ data.detailObj.address }} ></div>
                                <!--  -->
                                <div class="address_bace" v-if="data.positioning">
                                    驾车
                                    {{
                                    getdistance(
                                        data.detailObj.lat,
                                        data.detailObj.lng
                                    )
                                    }}km 需约{{
                                    getdrivingtime(
                                        data.detailObj.lat,
                                        data.detailObj.lng
                                    )
                                    }}
                                </div>
                            </div>
                            <div class="address_icon_box">
                                <div class="address_icon" @click="address">
                                    <image
                                        class="address_img"
                                        :src="
                                            getAssetsUrl('/agency/address.svg')
                                        "
                                        mode="scaleToFill"
                                    />
                                    <div class="address_icon_text">地址</div>
                                </div>
                                <div class="address_icon" @click="openAuth">
                                    <image class="address_img" :src="getAssetsUrl('/agency/call.svg')" mode="scaleToFill" />
                                    <div class="address_icon_text">电话</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="more_room">
                    <div class="more_room_title">优惠套餐</div>
                    <div class="favour_box">
                        <div class="favour">券</div>
                        <div class="favour_text">超值劵</div>
                    </div>
                    <div class="more_coupon" v-for="item in showRoom(data.vouchersList)" :key="item.id">
                        <view class="more_coupon_left">
                            <view class="more_coupon_left_title">{{ item.name }}</view>
                            <view class="more_coupon_left_desc">
                                {{item.isRestrictTime == 0 ? '全部时间可用' : item.restrictTimeDesc }} | {{`${item.isAccrual == 0 ? '不可累加' : `单次可用${item.cntAccrual || 0}张`}`}}
                            </view>
                            <div class="more_coupon_left_price">￥{{ item.price / 100 }}</div>

                        </view>
                        <view class="more_coupon_right">
                            <view class="button" @click="clickVoucherDetails(item.id)">抢购</view>
                            <view class="desc">半年售 100+</view>
                        </view>
                    </div>

                    <div class="favour_box">
                        <div class="favour">惠</div>
                        <div class="favour_text">到店服务</div>
                    </div>
                    <div class="more_room_item" v-for="item in showRoom(data.productList)" :key="item.id">
                        <div class="more_room_item_right">
                            <!-- mainPics -->
                            <image class="more_right_img" :src="item.mainPics[0]" mode="aspectFill" />
                            <div class="more_right_text">
                                <div class="more_right_title">{{ item.name }}</div>
                                <div class="more_right_dace" v-if="item.isRestrictTime == 0">
                                    <text>周一至周日</text>
                                </div>
                                <div class="more_right_dace" v-else>
                                    <text>
                                        除{{ item.restrictTimeDesc }}外均可使用
                                    </text>
                                </div>
                                <div class="more_right_price">￥{{ item.price / 100 }}</div>
                            </div>
                        </div>
                        <div class="more_room_item_left">
                            <div class="show_btn" @click="tuproduct(item.id)">抢购</div>
                            <div class="more_room_text">半年售 {{ item.salesVolume }}+</div>
                        </div>
                    </div>
                    <div class="show_more_room" @click="clickshowroom" v-if="data.productList.length > 2">
                        <div class="show_more_room_text">查看其他套餐</div>
                        <TnIcon name="down" v-if="!data.showmoreroom"></TnIcon>
                        <TnIcon name="up" v-else></TnIcon>
                    </div>
                    <div class="show_more_room" v-else>
                        <div class="show_more_not_room_text">暂无更多套餐</div>
                    </div>
                </div>

                <div class="comment_box" v-if="data.commentList.length != 0 && !data.needlogin">
                    <div class="comment_box_title_box">
                        <div class="comment_box_title">全部评论 {{ `(${data.total})` }}</div>
                        <div class="comment_box_show" @click="gotohealthComment">
                            <div>查看全部</div>
                            <TnIcon name="right"></TnIcon>
                        </div>
                    </div>
                    <div
                        class="comment_box_item"
                        :class="{ not_bottom: data.commentList.length == index + 1 }"
                        v-for="(item, index) in data.commentList"
                        :key="item.id"
                    >
                        <div class="comment_top">
                            <image class="comment_top_img" :src="item.userThumb" mode="scaleToFill" />
                            <div>
                                <div class="comment_top_name">{{ item.userName }}</div>
                                <div class="comment_top_rate">
                                    <TnRate
                                        v-model="item.score"
                                        inactive-color="#EBEBEB"
                                        active-color="#FEE111"
                                        gutter="4rpx"
                                        size="24rpx"
                                        :readonly="true"

                                    />
                                </div>
                            </div>
                        </div>
                        <div class="comment_text">{{ item.comment }}</div>
                        <div class="comment_img_list" v-if="item.pictures.length > 0">
                            <image
                                v-for="(imgItem, imgIndex) in item.pictures"
                                :key="imgIndex"
                                class="comment_img"
                                :src="imgItem"
                                mode="aspectFill"
                                @click="preImage(imgIndex, item.pictures)"
                            />
                        </div>
                        <div class="shop_reply_comment" v-if="item.reply">商家回复:{{ item.reply }}</div>
                        <div class="comment_time">发布于{{ timeformat(item.utcCreated) }}</div>
                    </div>
                </div>
                <div class="not_comment_box" v-else-if="data.commentList.length == 0 && !data.needlogin">
                    <div class="not_comment_title">全部评论</div>
                    <div class="not_img_box">
                        <image class="not_img" :src="getAssetsUrl('/empty/empty_icon_data.png')" mode="scaleToFill" />
                        <div class="not_text">暂无评论</div>
                    </div>
                </div>
                <div class="login_comment" v-else-if="data.needlogin" @click="tochoiceDetails(props.shopId, 0, true)">
                    <div class="login_comment_title">登陆后查看评论</div>
                    <div class="login_btn">去登陆</div>
                </div>

                <div class="img_list">
                    <div class="img_list_title">机构图集</div>
                    <div class="img_box">
                        <image class="img_box_right" :src="data.detailObj.albums && data.detailObj.albums[0]" mode="aspectFill" />
                        <div class="img_box_left">
                            <image
                                class="img_box_left_top"
                                :src="
                                    data.detailObj.albums && data.detailObj.albums[1]
                                        ? data.detailObj.albums &&
                                          data.detailObj.albums[1]
                                        : data.detailObj.albums &&
                                          data.detailObj.albums[0]
                                "
                                mode="aspectFill"
                            />
                            <div class="img_box_left_bottom" @click="toimgdetails(data.detailObj.shopId)">
                                <image class="view_img" :src="getAssetsUrl('/channel/view_box.png')" mode="scaleToFill" />
                                <div class="view_text_box">
                                    <image
                                        class="view_text_box_icon"
                                        :src="getAssetsUrl('/channel/view_icon.png')"
                                        mode="scaleToFill"
                                    />
                                    <text class="view_text">查看图片</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 客服 -->
                <image class="shop-service" :src="getAssetsUrl('/leyou/icon/customer_service.png')" mode="scaleToFill" @tap="clickCustomerService" />


            </view>

            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

        <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="data.status" :imgUrl="data.shareimgUrl"></shareView>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>

    </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from '@/common/setPicture'
import { businessTime } from '@/utils/businessTime'
import { getDistances } from '@/utils/distance'
import { formattime } from '@/common/formatTime'

import { addShopBrowerHistory, godsCommList, healthlist, organizationDetail } from '@/api/service-api'
import { gotohealthproductDetails, serviceComment, toimgInstitution, voucherDetails } from '@/routes/service-routes'
import { addHealthShop, addShop, getQrcode, unHealthShop } from '@/api/user-api'

import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import BCNotify from '@/components/notify/index.vue'

import shareView from '@/pagesService/components/shareView/shareView.vue'

import { gotoIndex, gotoLogin } from "@/routes/public-routes"
import { drawBGIMG } from '@/libs/canvas-tools'
import { PlatformManage } from "@bc/sys"

import { createTeam } from "@/api/nim-api"
import { gotoChatPage } from "@/routes/nim-routes"


interface Props {
    shopId:string,
    isAd:number,
}

const props = defineProps<Props>()


interface Data {
    detailObj:any,
    swiperIndex:number,
    rateValue:number,
    isColl:boolean,
    positioning:boolean,
    latitude:number,
    longitude:number,
    showmoreroom:boolean,
    productList:any,
    commentList:any,
    total:number,
    needlogin:boolean,
    vouchersList:any,
    status:number,
    shareimgUrl:string,
    userId: string,
}
const data = reactive<Data>({
    detailObj: {},
    swiperIndex: 1,
    rateValue: 5,
    isColl: false,
    positioning: false,
    latitude: 0,
    longitude: 0,
    showmoreroom: false,
    productList: [],
    commentList: [],
    total: 0,
    needlogin: false,
    vouchersList: [],

    status: 1,
    shareimgUrl: '',
    userId: ''


})

const emit = defineEmits(["saveShareObj"])


const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const showswiper = computed(() => (list:any) => {
    if (!list.length) {
        return
    }
    if (list.length > 5) {
        return list.slice(0, 5)
    }
    else {
        return list
    }
})

const notright = computed(() => (list:any, index:number) => {
    if (list.length == 1) {
        return true
    }
    else if (list.length == index + 1) {
        return true
    }
    else {
        return false
    }
})

const showDays = computed(() => (dayList:any) => {
    const days = new Date().getDay()
    const findDay = dayList.find((timeItem:any) => {
        return timeItem == days
    })
    if (days == 0 && findDay == 7) {
        return true
    }
    else if (days == findDay) {
        return true
    }
    else {
        return false
    }
})

const formatTimeString = computed(() => (days:any) => {
    let timeStr = ""
    days.forEach((daysItem:any) => {
        switch (Number(daysItem)) {
            case 1:
                timeStr = timeStr + " 周一"
                break
            case 2:
                timeStr = timeStr + " 周二"
                break
            case 3:
                timeStr = timeStr + " 周三"
                break
            case 4:
                timeStr = timeStr + " 周四"
                break
            case 5:
                timeStr = timeStr + " 周五"
                break
            case 6:
                timeStr = timeStr + " 周六"
                break
            case 7:
                timeStr = timeStr + " 周日"
                break
            default:
                timeStr = ""
        }
    })
    return timeStr
})

const getbusinessTime = computed(() => (timeObj:any) => {
    return businessTime(timeObj)
})

const getdistance = computed(() => (lat:number, lng:number) => {
    // 计算距离 传入目标经纬度
    const distance = getDistances(
        data.latitude,
        data.longitude,
        lat,
        lng
    )
    return distance
})

const getdrivingtime = computed(() => (lat:number, lng:number) => {
    const distance = getDistances(
        data.latitude,
        data.longitude,
        lat,
        lng
    )
    const speed = (40 * 1000) / 60 / 60 // 速度转换为m/s
    const drivingtime = (distance * 1000) / speed
    const hours = Math.floor(drivingtime / 3600)
    const minutes = Math.floor((drivingtime % 3600) / 60)
    if (hours != 0) {
        return hours + "小时" + minutes + "分钟"
    }
    else {
        return minutes + "分钟"
    }
})


const showRoom = computed(() => (list:any) => {
    if (!data.showmoreroom) {
        return list.slice(0, 2)
    }
    else {
        return list
    }
})


const timeformat = computed(() => (time:number) => {
    return formattime(time, 'YYYY-MM-DD')
})


onMounted(() => {
    console.log(props.shopId)
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            getorganizationDetail(props.shopId)
            return
        }
        PlatformManage.getToken().then((res:any) => {
            data.userId = res.id ? res.id : ''
            getorganizationDetail(props.shopId, data.userId)
        })
    })

    gethealthlist(props.shopId)
    getgodsCommList(props.shopId)
})

const getorganizationDetail = (shopId: number, userId: string = '') => {

    organizationDetail({
        shopId,
        userId,
        isAd: props.isAd
    }).then((res:any) => {
        data.detailObj = res || {}
        data.isColl = res.isFavorite == 1

        const shareObj = {
            title: res.shopName,
            imageUrl: res.thumb,
            id: res.shopId,
            desc: ''
        }
        emit('saveShareObj', shareObj)

        addShopBrowerHistory({ shopId: data.detailObj.shopId, applyId: data.detailObj.applyId }).then((res) => {})
    })
}

const gethealthlist = (shopId:string) => {
    healthlist({
        pageSize: 10,
        pageNumber: 1,
        query: {
            shopId
        }
    }).then((res:any) => {
        data.productList = res.data.filter((item:any) => item.typeId == 1)
        data.vouchersList = res.data.filter((item:any) => item.typeId == 2)
        console.log('data.productList', data.productList)
        console.log('data.vouchersList', data.vouchersList)

    })
}

const getgodsCommList = (shopId:string) => {
    godsCommList({
        pageNumber: 1,
        pageSize: 3,
        query: {
            itemId: null,
            shopId
        }
    }).then((res:any) => {
        data.commentList = res.data
        data.total = res.total
    })
}


const swiperchang = (item:any) => {
    data.swiperIndex = item.detail.current
}
const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls
    })
}

const bcNotify = ref()

// 收藏/取消收藏 机构
const setColl = () => {

    // setTimeout(() => {
    if (data.isColl) {
        unHealthShop({
            shopIds: [data.detailObj.shopId]
        }).then(() => {
            data.isColl = false
            bcNotify.value.show('取消收藏')
        })
    }
    else {
        console.log(data.isColl)
        addHealthShop({
            shopId: Number(data.detailObj.shopId)
        }).then(() => {
            console.log('res')
            data.isColl = true
            bcNotify.value.show('收藏成功')
        }).catch((err: any) => {
            console.log(err)
        })
    }
    // }, 300)
    // getorganizationDetail(props.shopId)
}

const address = () => {
    console.log("打开地址")
    uni.openLocation({
        latitude: data.detailObj.lat, //纬度
        longitude: data.detailObj.lng, //经度
        name: data.detailObj.area,
        address: data.detailObj.address,
        success: function() {
            console.log("success")
        }
    })
}

const openAuth = () => {
    uni.makePhoneCall({
        phoneNumber: data.detailObj.telephones
    })
}


const clickVoucherDetails = (id:string) => {
    // 超值券详情
    voucherDetails({ id })
}

const tuproduct = (itemId:string) => {
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        if (isRequireLogin) {
            bcNotify.value.show('请先登录')
            setTimeout(() => {
                gotoLogin({})
            }, 2000)
        }
        else {
            gotohealthproductDetails({ itemId })
        }
    })
    // 产品详情
}

const clickshowroom = () => {
    data.showmoreroom = !data.showmoreroom
}

const gotohealthComment = () => {
    // 评论详情
    serviceComment(props.shopId)

}

const tochoiceDetails = (itemId:string, isAd:number, tologin:boolean = false) => {
    // 登录后查询详情
}

const toimgdetails = (itemId:string) => {
    // 机构图集详情
    toimgInstitution({ itemId })
}

const clickCustomerService = () => {
    PlatformManage.getToken().then((token: any) => {
        createTeam({
            userId: token.id,
            userName: token.nickname,
            userThumb: token.avatar,
            flag: 1, // 1小程序用户，2服务人员
            shopId: data.detailObj.shopId,
            type: 2 // 1平台，2店铺
        }).then((res) => {
            gotoChatPage({
                to: res.tid,
                scene: 'customer',
                originPage: 'pagesService/pages/Servicestore/Servicestore'
            })
        }).catch((err) => {
            bcNotify.value.show(err.message)
        })
    })
}

const instance = getCurrentInstance() // 获取组件实例

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.detailObj.thumb,
        title: data.detailObj.shopName,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/pagesService/pages/Servicestore/ServicestoreDetail?shopId=${data.detailObj.shopId}`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
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

const shareBox = ref()
// 分享
const share = () => {
    data.status = 1;
    (shareBox.value as any).open()
}
const closeShare = () => {
    (shareBox.value as any).close()
}

const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.detailObj.thumb)
    // 二维码链接图片
    const qrimg =  await getQrcode(`/pagesService/pages/Servicestore/ServicestoreDetail?shopId=${data.detailObj.shopId}`).then((img:any) => {
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.detailObj.thumb)

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.detailObj.company//标题
    let accountName = data.detailObj.shopName//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0, 8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0, 8) + "..."
    }

    const context = uni.createCanvasContext('mycanvas', instance)


    context.clearRect(0, 0, 254, 344)
    // 背景白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 254, 344)

    // 底部白块
    context.setFillStyle('#ffffff')
    context.fillRect(0, 258, 258, 94)

    // 底部文字
    context.setFillStyle('#333333')
    context.setFontSize(16)
    context.fillText(title, 12, 282)
    context.setFillStyle('#808080')
    context.setFontSize(14)


    // 二维码
    context.drawImage(qrimgUrl, 168, 260, 76, 76)

    context.fillText(accountName, 40, 324)
    context.setFillStyle('#999999')
    context.setFontSize(12)

    // 背景图片
    context.drawImage(coverUrl, 0, 0, 275, 255)


    context.save()
    context.arc(24, 320, 10, 0, Math.PI * 2)
    context.fill()//保证图片无bug填充
    context.clip()//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 14, 310, 20, 20)
    context.restore()

    context.draw(
        false,
        setTimeout(async () => {
            uni.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: (res:any) => {
                    data.shareimgUrl = res.tempFilePath
                    data.status = 2
                    title = ''
                },
                fail: err => {
                    console.log(err)
                    uni.showToast({
                        icon: 'none',
                        title: '生成失败,请稍后重试'
                    })
                },
                complete: (ret) => {
                    console.log('生成中....')
                    uni.hideLoading()
                }
            }, instance)
        }, 3000)
    )


}


defineExpose({
    closeShare
})


const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }

    uni.navigateBack()
}


</script>

<style lang="scss" scoped>
.nav_back {
    line-height: 34px;
    display: flex;
    align-items: center;
}
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
                    box-sizing: border-box;
                    background: #ffffff;
                }
            }
            .swiper_indicator {
                position: absolute;
                bottom: 20rpx;
                right: 20rpx;
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
                    background: #ffffff;
                    border-radius: 50%;
                    opacity: 0.4;
                    margin-right: 8rpx;
                    &.isswiper {
                        background: #ffffff;
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
            // height: 744rpx;
            border-radius: 24rpx;
            background: #ffffff;
            padding: 30rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;
            .introduce_top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 28rpx;
                .introduce_title_box {
                    width: 75%;
                    .introduce_title {
                        color: #333333;
                        font-size: 34rpx;
                        margin-bottom: 16rpx;
                        font-weight: bold;
                        display: flex;
                        .introduce_name {
                            width: 75%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .businessStatus_tag {
                            width: 24%;
                            height: 38rpx;
                            text-align: center;
                            line-height: 38rpx;
                            font-size: 22rpx;
                            font-weight: normal;
                            color: #fff;
                            box-sizing: border-box;
                            background: #29c86f;
                            border-radius: 24rpx;
                            &.red_tag {
                                background: #f32b44;
                            }
                        }
                    }
                    .introduce_rate_box {
                        display: flex;
                        align-items: center;
                        .introduce_num {
                            color: #ff9f3e;
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
                    width: 120rpx;
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
            .introduce_item {
                .price_box {
                    color: #ff0000;
                    font-size: 24rpx;
                    margin-bottom: 40rpx;
                    .price_number {
                        font-size: 40rpx;
                    }
                }
                .introduce_item_title {
                    display: flex;
                    align-items: center;
                    font-size: 26rpx;
                    margin-bottom: 14rpx;

                    .title_text {
                        color: #333333;
                        margin-right: 40rpx;
                        flex-shrink: 0;
                    }
                    .title_content {
                        color: #666666;
                    }
                    .tag_list {
                        display: flex;
                        align-items: center;
                        .tag_item {
                            padding: 8rpx 16rpx;
                            box-sizing: border-box;
                            border-radius: 26rpx;
                            background: #f8f8f8;
                            color: #999999;
                            font-size: 24rpx;
                            margin-right: 12rpx;
                        }
                    }
                }
                .address {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 30rpx;
                    padding-top: 24rpx;
                    box-sizing: border-box;
                    border-top: 2rpx solid #f0f0f0;
                    .address_title {
                        font-size: 26rpx;
                        color: #111111;
                        margin-bottom: 6rpx;
                    }
                    .address_bace {
                        color: #777777;
                        font-size: 24rpx;
                    }
                    .address_icon_box {
                        display: flex;
                        align-items: center;
                        .address_icon {
                            width: 108rpx;
                            height: 92rpx;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            .address_img {
                                width: 48rpx;
                                height: 48rpx;
                            }
                            .address_icon_text {
                                color: #777777;
                                font-size: 24rpx;
                            }
                        }
                    }
                }
                .more_btn {
                    border-radius: 12rpx;
                    background: #f2f3f5;
                    padding: 20rpx 0rpx;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .more_text {
                        color: #231815;
                        font-size: 26rpx;
                    }
                    .more_icon {
                        width: 32rpx;
                        height: 32rpx;
                        margin-right: 10rpx;
                    }
                }
            }
        }
        .more_room {
            background: #ffffff;
            width: 100%;
            // padding: 30rpx;
            padding-bottom: 80rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
            position: relative;
            margin-bottom: 20rpx;
            &.have_max {
                max-height: 480rpx;
            }
            .more_room_title {
                padding: 30rpx;
                box-sizing: border-box;
                color: #333333;
                font-size: 32rpx;
                margin-bottom: 30rpx;
                font-weight: bold;
                border-bottom: 2rpx solid #f2f2f2;
            }
            .favour_box {
                display: flex;
                align-items: center;
                padding: 0rpx 30rpx;
                padding-bottom: 20rpx;
                box-sizing: border-box;
                .favour {
                    width: 30rpx;
                    height: 30rpx;
                    background: #ff9f3e;
                    border-radius: 8rpx;
                    margin-right: 4rpx;
                    font-size: 20rpx;
                    color: #fff;
                    text-align: center;
                    line-height: 30rpx;
                }
                .favour_text {
                    color: #333333;
                    font-size: 24rpx;
                }
            }
            .more_room_item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40rpx;
                padding: 0rpx 30rpx;
                box-sizing: border-box;
                .more_room_item_right {
                    display: flex;
                    .more_right_img {
                        width: 96rpx;
                        height: 96rpx;
                        border-radius: 8rpx;
                        margin-right: 20rpx;
                    }
                    .more_right_text {
                        width: 338rpx;
                        .more_right_title {
                            font-weight: bold;
                            color: #333333;
                            font-size: 28rpx;
                            margin-bottom: 8rpx;
                        }
                        .more_right_dace {
                            color: #777777;
                            font-size: 24rpx;
                            margin-bottom: 8rpx;
                        }
                        .more_right_price{
                            font-size: 24rpx;
                            color: #FF0000;
                        }
                    }
                }
                .more_room_item_left {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    .show_btn {
                        width: 96rpx;
                        height: 44rpx;
                        text-align: center;
                        line-height: 44rpx;
                        font-size: 24rpx;
                        color: #ffffff;
                        border-radius: 24rpx;
                        background: #29c86f;
                        margin-bottom: 4rpx;
                    }
                    .more_room_text {
                        color: #777777;
                        font-size: 20rpx;
                    }
                }
            }
            .show_more_room {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                bottom: 0;
                width: 90%;
                height: 100rpx;
                background: #fff;
                margin-left: 30rpx;
                .show_more_room_text {
                    color: #333333;
                    font-size: 24rpx;
                    margin-right: 4rpx;
                }
                .show_more_not_room_text {
                    color: #777777;
                    font-size: 24rpx;
                }
            }
        }
    }
    .comment_box {
        padding: 36rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .comment_box_title_box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40rpx;
            .comment_box_title {
                color: #333333;
                font-size: 32rpx;
            }
            .comment_box_show {
                color: #999999;
                font-size: 28rpx;
                display: flex;
                align-items: center;
            }
            .not_img {
                width: 100%;
                height: 250rpx;
                margin: auto;
            }
        }
        .comment_box_item {
            margin-bottom: 30rpx;
            padding-bottom: 30rpx;
            box-sizing: border-box;
            border-bottom: 2rpx solid #f2f2f2;
            &.not_bottom {
                margin-bottom: 0rpx;
                padding-bottom: 0rpx;
                border-bottom: none;
            }
            .comment_top {
                display: flex;
                align-items: center;
                margin-bottom: 28rpx;
                .comment_top_img {
                    width: 68rpx;
                    height: 68rpx;
                    border-radius: 50%;
                    margin-right: 20rpx;
                }
                .comment_top_name {
                    color: #333333;
                    font-size: 28rpx;
                }
            }
            .comment_text {
                margin-bottom: 28rpx;
                line-height: 44rpx;
                color: #333333;
                font-size: 28rpx;
            }
            .comment_img_list {
                width: 100%;
                margin-bottom: 28rpx;
                // display: flex;
                // align-items: center;
                // justify-content: space-between;
                .comment_img {
                    width: 206rpx;
                    height: 150rpx;
                    border-radius: 8rpx;
                    margin-right: 10rpx;
                }
            }
            .shop_reply_comment {
                padding: 24rpx;
                box-sizing: border-box;
                background: #f5f5f5;
                border-radius: 6rpx;
                margin-bottom: 28rpx;
                font-size: 26rpx;
                color: #666;
            }
            .comment_time {
                font-size: 24rpx;
                color: #999999;
            }
        }
    }
    .not_comment_box {
        padding: 36rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        .not_comment_title {
            color: #333333;
            font-size: 32rpx;
        }
        .not_img_box {
            display: flex;
            align-items: center;
            flex-direction: column;
            .not_img {
                width: 350rpx;
                height: 350rpx;
            }
            .not_text {
                font-size: 28rpx;
                color: #999999;
            }
        }
    }
    .login_comment {
        padding: 36rpx 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .login_comment_title {
            color: #333333;
            font-size: 28rpx;
        }
        .login_btn {
            background: #29c86f;
            color: #fff;
            font-size: 24rpx;
            text-align: center;
            padding: 8rpx 16rpx;
            box-sizing: border-box;
            border-radius: 24rpx;
        }
    }
    .img_list {
        width: 100%;
        height: 490rpx;
        padding: 30rpx;
        box-sizing: border-box;
        background: #fff;
        border-radius: 24rpx;
        margin-top: 20rpx;
        .img_list_title {
            color: #333333;
            font-size: 28rpx;
            margin-bottom: 30rpx;
        }
        .img_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 364rpx;
            .img_box_right {
                width: 364rpx;
                height: 100%;
                border-radius: 8rpx;
                // border: 1px solid red;
            }
            .img_box_left {
                width: 270rpx;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: column;
                .img_box_left_top {
                    width: 100%;
                    height: 270rpx;
                    border-radius: 8rpx;
                    // border: 1px solid red;
                }
                .img_box_left_bottom {
                    width: 100%;
                    height: 80rpx;
                    border-radius: 8rpx;
                    overflow: hidden;
                    position: relative;
                    .view_img {
                        width: 100%;
                        height: 100%;
                    }
                    .view_text_box {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #ffffff;
                        font-size: 28rpx;
                        width: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        .view_text_box_icon {
                            width: 32rpx;
                            height: 32rpx;
                        }
                        .view_text {
                            margin-left: 4rpx;
                        }
                    }
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
        background: #ffffff;
        .contact {
            width: 340rpx;
            height: 90rpx;
            background: #ffa134;
            border-radius: 46rpx;
            font-size: 32rpx;
            color: #ffffff;
            line-height: 90rpx;
            text-align: center;
        }
        .call {
            width: 340rpx;
            height: 90rpx;
            background: #29c86f;
            border-radius: 46rpx;
            font-size: 32rpx;
            color: #ffffff;
            line-height: 90rpx;
            text-align: center;
        }
    }
}

.more_coupon {
    display: flex;
    justify-content: space-between;
    margin: 10rpx 30rpx 30rpx 30rpx;
    align-items: center;
    background-repeat: no-repeat;
    height: 140rpx;
    padding: 0 30rpx;
    background-size: cover; /* 背景图覆盖整个页面 */
    background-image: url("https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/marketing-manage/otherCenter/classManage/2024515165124690.svg");
    position: relative;

    .more_coupon_left {
        display: flex;
        flex-direction: column;
        .more_coupon_left_title {
            font-size: 28rpx;
            font-weight: 500;
            margin-bottom: 10rpx;
            color: #333333;
        }
        .more_coupon_left_desc {
            font-size: 24rpx;
            color: #666666;
            margin-bottom: 10rpx;

        }
        .more_coupon_left_price{
            font-size: 24rpx;
            color: #FF0000;
        }
    }
    .more_coupon_right {
        display: flex;
        flex-direction: column;
        .button {
            font-size: 24rpx;
            color: #ffffff;
            text-align: center;
            background: linear-gradient(90deg, #fe7d36 0%, #fe2d00 100%);
            border-radius: 24rpx;
            padding: 8rpx 24rpx;
        }
        .desc {
            margin-top: 12rpx;
            font-size: 20rpx;
            color: #777777;
            margin-top: 4rpx;
        }
    }
}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}

.shop-service {
    width: 96rpx;
    height: 96rpx;
    position: fixed;
    right: 0;
    bottom: 350rpx;
    z-index: 1000;
}
</style>

