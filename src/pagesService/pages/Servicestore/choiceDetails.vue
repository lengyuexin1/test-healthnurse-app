<template>
    <view class="contraner">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                    <PageTopbg></PageTopbg>
                    <bc-page-navbar :title="'机构详情'">
                        <template #back>
                            <view class="nav_back" @click="goback">
                                <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                            </view>
                        </template>

                    </bc-page-navbar>
                </template>
                <view class="details_box" v-if="detailObj.id">
                    <div class="swiper_box">
                        <swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" @change="swiperchang">
                            <swiper-item
                                v-for="(item, index) in showswiper(
                                    detailObj.covers
                                )"
                                :key="index"
                            >
                                <image class="swiper_item" :src="item" mode="aspectFill" @click="preImage(index,showswiper(detailObj.covers))" />
                            </swiper-item>
                        </swiper>
                        <div class="swiper_indicator">
                            <div
                                class="swiper_indicator_item"
                                v-for="(item, index) in showswiper(
                                    detailObj.covers
                                )"
                                :key="index"
                                :class="{
                                    isswiper: swiperIndex == index,
                                    one_notright: notright(detailObj.covers, index)
                                }"
                            ></div>
                        </div>
                    </div>
                    <div class="introduce">
                        <div class="introduce_top">
                            <div class="introduce_title_box">
                                <div class="introduce_title">{{ detailObj.shopName }}</div>
                                <!-- <div class="introduce_rate_box">
                                    <u-rate
                                        :count="5" v-model="count"
                                        inactive-icon="star-fill"
                                        inactiveColor="#EBEBEB" activeColor="#FF983D"
                                        gutter="2"
                                        :readonly="true"></u-rate>
                                    <div class="introduce_num">3.2</div>
                                    <div class="introduce_rate">231条</div>
                                </div>-->
                            </div>
                            <div class="introduce_icon">
                                <div class="icon_item_box" @click="setColl">
                                    <image
                                        class="icon_item_img"
                                        :src="
                                            getAssetsUrl(
                                                isColl
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
                            <div class="introduce_item_top">
                                <div class="introduce_item_title">
                                    <div class="title_text">类型</div>
                                    <div class="title_content">
                                        {{
                                        detailObj.categoryNames &&
                                        detailObj.categoryNames[0]
                                        }}
                                    </div>
                                </div>
                                <div class="introduce_item_title">
                                    <div class="title_text">面积</div>
                                    <!-- <div class="title_content">约{{ area(detailObj.proportion) }}万平方米</div> -->
                                    <div class="title_content">约{{ detailObj.proportion }}平方米</div>
                                </div>
                            </div>
                            <div class="introduce_item_title">
                                <div class="title_text">开业时间</div>
                                <div class="title_content">{{ timeFormat(detailObj.openingTime * 1000) }}</div>
                            </div>
                            <!-- <div
                                class="introduce_item_title"
                                v-if="detailObj.minPrice || detailObj.maxPrice"
                            >
                                <div class="title_text">价格</div>
                                <div class="title_content">
                                    {{
                                        detailObj.minPrice
                                            ? detailObj.minPrice
                                            : detailObj.maxPrice | moneyFilter
                                    }}/月
                                </div>
                            </div>-->
                            <div class="introduce_item_title">
                                <div class="title_text">床位</div>
                                <div class="title_content">{{ detailObj.bedNum }}张</div>
                            </div>
                            <div class="introduce_item_title">
                                <div class="title_text">公司</div>
                                <div class="title_content">{{ detailObj.company }}</div>
                            </div>
                            <div class="introduce_item_title">
                                <div class="title_text">收住</div>
                                <div class="tag_list">
                                    <div
                                        class="tag_item"
                                        v-for="(
                                            item, index
                                        ) in detailObj.containTagNames"
                                        :key="index"
                                        :class="{
                                            not_right: index + 1 == tagList.length
                                        }"
                                    >{{ item }}</div>
                                </div>
                            </div>
                            <div class="address">
                                <div class="address_title">地址</div>
                                <div class="address_box">
                                    <div class="address_text_box">
                                        <div class="short">
                                            {{ detailObj.cityName }} -
                                            {{ detailObj.districtName }}
                                        </div>
                                        <div class="details">
                                            {{ detailObj.area
                                            }}{{ detailObj.address }}
                                        </div>
                                    </div>
                                    <image @click="address" class="address_icon" :src="getAssetsUrl('/channel/address.png')" mode="scaleToFill" />
                                </div>
                            </div>
                            <div class="more_btn" @click="totextInstitution(detailObj.shopId)">
                                <image class="more_icon" :src="getAssetsUrl('/channel/more_icon.png')" mode="scaleToFill" />
                                <div class="more_text">点击查看更多基本信息</div>
                            </div>
                        </div>
                    </div>
                    <!-- :class="{'have_max':!showmoreroom}" -->
                    <div class="more_room">
                        <div class="more_room_title">产品列表</div>
                        <div class="more_room_item" v-for="item in showRoomList" :key="item.id">
                            <div class="more_room_item_right">
                                <image class="more_right_img" :src="item.mainPics && item.mainPics[0]" mode="scaleToFill" />
                                <div class="more_right_text">
                                    <div class="more_right_title">{{ item.name }}</div>
                                    <div class="more_right_dace">
                                        <text>{{ item.bedDesc }}张床</text>
                                        <text>,{{ item.areaDesc }}平方米</text>
                                        <text v-if="item.isBalcony == 1">,有阳台</text>
                                        <text v-else>,没阳台</text>
                                        <text v-if="item.isWindow == 1">,有窗口</text>
                                        <text v-else>,没窗口</text>
                                        <text v-if="item.isNoSmoke == 1">,禁烟</text>
                                        <text v-else>,不禁烟</text>
                                    </div>
                                </div>
                            </div>
                            <div class="more_room_item_left">
                                <div class="more_room_price_box">
                                    <div class="more_room_price">￥{{( item.price / 100).toFixed(2) }}</div>
                                    <div class="more_room_extend">/{{ item.unit == 1 ? "日" : "月" }}</div>
                                </div>
                                <div class="show_btn" @click="tuproduct(item.id)">查看</div>
                            </div>
                        </div>
                        <div class="show_more_room" @click="showroom" v-if="productList.length > 2">
                            <!-- {{productList.length}}个 -->
                            <div class="show_more_room_text">查看其他房型</div>
                            <!-- <u-icon name="arrow-down" v-if="!showmoreroom"></u-icon>
                            <u-icon name="arrow-up" v-else></u-icon> -->
                        </div>
                        <div class="show_more_room" v-else>
                            <div class="show_more_not_room_text">暂无更多房型</div>
                        </div>
                    </div>
                    <div class="img_list">
                        <div class="img_list_title">机构图集</div>
                        <div class="img_box">
                            <image class="img_box_right" :src="detailObj.albums && detailObj.albums[0]" mode="aspectFill" />
                            <div class="img_box_left">
                                <image
                                    class="img_box_left_top"
                                    :src="
                                        detailObj.albums && detailObj.albums[1]
                                            ? detailObj.albums &&
                                              detailObj.albums[1]
                                            : detailObj.albums &&
                                              detailObj.albums[0]
                                    "
                                    mode="aspectFill"
                                />
                                <div class="img_box_left_bottom" @click="toimgdetails(detailObj.shopId)">
                                    <image class="view_img" :src="getAssetsUrl('/channel/view_box.png')" mode="scaleToFill" />
                                    <div class="view_text_box">
                                        <image
                                            class="view_text_box_icon"
                                            :src="
                                                getAssetsUrl(
                                                    '/channel/view_icon.png'
                                                )
                                            "
                                            mode="scaleToFill"
                                        />
                                        <text class="view_text">查看图片</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </view>
                <template #bottom>
                <view class="bottom_btn">
                    <!-- <div class="contact" @click="gotoIMSessionChat">联系客服</div> -->
                    <div class="call_yuyue" @click="popupShow = true">点击预约</div>
                    <div class="call" @click="openAuth">拨打电话</div>
                </view>
            </template>
        </z-paging>
        <TnPopup v-model="popupShow"
                 mode="center"
                  width="94%"
                :safeAreaInsetBottom="false"
                :round="10"
                :closeable="true"
                @close="popupShow = false,makeType = 1,detailObj.phone = '',detailObj.code = ''"
               >
                    <view class="popup-box">
                    <block v-if="makeType == 1">
                        <view class="title">预约到店</view>
                        <view class="box_phone">预约后商户将通过电话联系您</view>
                        <view class="popup_content">
                            <view class="popup_phone">{{ detailObj.mobile }}</view>
                            <view class="popup_edit" @click="makeEdit">
                                点击修改
                                <u-icon name="arrow-right"></u-icon>
                            </view>
                        </view>
                    </block>
                    <block v-if="makeType == 2">
                        <view class="popup_box">
                            <view class="content">
                                <view class="item row j-between i-center">
                                    <view class="title">手机号</view>
                                    <view class="input">
                                        <TnInput
                                            maxlength="11"
                                            type="number"
                                            placeholder="请输入手机号"
                                            inputAlign="right"
                                            :clearable="true"
                                            border="none"
                                            v-model="detailObj.phone"
                                        ></TnInput>
                                    </view>
                                </view>
                                <view style="color: red; text-align: right; font-size: 24rpx;" v-if="isEmptyPhone">{{ phoneText }}</view>
                                <view class="item row j-between i-center" style="border-bottom: none; margin-top: 50rpx;">
                                    <view class="title">验证码</view>
                                    <view class="input">
                                        <TnInput
                                            type="number"
                                            placeholder="请输入验证码"
                                            inputAlign="right"
                                            :clearable="true"
                                            border="none"
                                            v-model="detailObj.code"
                                            @input="codeInput"
                                            maxlength="4"
                                        >
                                            <template v-slot:suffix>
                                                <TnButton bg-color="white" text-color="#41A0FE" font-size="26rpx" :disabled="countdown > 0" @click="getCode">
                                    {{countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码' }}
                                    </TnButton>

                                            </template>
                                        </TnInput>
                                    </view>
                                </view>
                                <!-- <view style="color: red; text-align: right; font-size: 24rpx;" v-if="isEmptyCode">请输入验证码</view> -->
                            </view>
                        </view>
                    </block>
                </view>
                <view v-if="makeType == 3" class="successful">
                    <image src="@/static/appointment.png" mode="scaleToFill" class="successful_image" />
                    <view class="successful_title">预约成功</view>
                    <view class="successful_desc">我们将很快为您处理，请留意回访电话。</view>
                </view>
                <view class="popup_healt" @click="appointment">
                    <view class="popup_but">{{makeType == 3 ? '知道了' : '立即预约' }}</view>
                </view>
                <BCNotify ref="bcNotify"></BCNotify>
            </TnPopup>
            <shareView @sharePage="sharePage" ref="shaView" :detailObj="shareObj" :path="path"></shareView>
            <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="callfun" permissionID="CALL_PHONE"></yk-authpup>
    </view>
    </template>
<script setup lang="ts">
import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import shareView from '@/pagesCnt/components/shareView/shareView.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'
import BCNotify from '@/components/notify/index.vue'

import { sendMobileCode, getDestroyInfo, unHealthShop, addShop } from '@/api/user-api'
import { organizationDetail, agencylist, getOrganEsList, prebookSave } from '@/api/service-api'
import { PlatformManage } from '@bc/sys'
import { ref, reactive, computed, onMounted, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router' // Assuming you're using vue-router

const route = useRoute()
const authpup = ref()
const countdown = ref(0)
const makeType = ref(1)
const itemId = ref('')
const swiperIndex = ref(0)
const count = ref(3)
const phoneText = ref('')
const isEmptyPhone = ref(false)
const tips = ref('获取验证码')
const popupShow = ref(false)
const showmoreroom = ref(false)
const detailObj = reactive({})
const productList = ref([])
const shareObj = ref<any>({})
const path = ref('')
const isColl = ref(false)
const backChannellist = ref(false)
const needlogin = ref(false)

const positioning = ref(false)
const coordinate = reactive({})

const dataList = ref([])
const isAd = ref(0)
const shaView = ref()
const tagList = [
    { id: 1, name: "自理" },
    { id: 2, name: "半自理" },
    { id: 3, name: "全护理" },
    { id: 4, name: "特护" },
    { id: 5, name: "临终关怀" }
]

const getAssetsUrl = computed(() => (str) => getAssetsPic(str))

const showRoomList = computed(() => () => !showmoreroom.value ? productList.value.slice(0, 2) : productList.value)


const timeFormat = computed(() => (time) => {
    return formattime(time, 'YYYY-MM-DD')
})
const slogan = computed(() => {
    const slogList = [
        '我在保椿照护，找到一家超舒适的养老机构！',
        '保椿照护上的养老机构，真的很专业！'
    ]
    return slogList[Math.floor(Math.random() * slogList.length)]
})
const area = computed(() => (area) => {
    const s = area / 10000
    return s.toFixed(1)
})
const makeEdit = () => {
    makeType.value = 2
}
// 收藏/取消收藏 机构
const setColl = () => {
    if (needlogin.value) {
        tochoiceDetails(detailObj.shopId, 0, true)
        return
    }
    setTimeout(() => {
        isColl.value ? unHealthShop({
            shopIds: [detailObj.shopId]
        }).then(() => {
            isColl.value = false
            bcNotify.value.show('取消收藏')
        }) : addShop({ shopId: detailObj.shopId }).then(() => {
            isColl.value = true
            bcNotify.value.show('收藏成功')
        })
    }, 300)
    this.$refs.paging.reload()
}
const tochoiceDetails = (itemId, tologin = false) => {
    // gotochoiceDetails(itemId, tologin)
}
const share = () => {
    if (needlogin.value) {
        tochoiceDetails(detailObj.shopId, 0, true)
        return
    }

    shareObj.value = {
        id: detailObj.shopId,
        title: detailObj.company,
        accountName: slogan.value, //this.detailObj.shopName,
        // mainPics
        accountThumb: detailObj.thumb, //头像
        cover: detailObj.covers && detailObj.covers[0], //背景
        // 自定义副标题
        Customsubtitle: false,
        price: detailObj.price
    }
    path.value = `/pagesService/pages/Servicestore/choiceDetails?itemId=${detailObj.shopId}`

    setTimeout(() => {
        shaView.value.open()
    }, 500)
}
// toColl(){
// 	if (this.isColl) {
// 		// 取消
// 		this.isColl = false
// 	}else{
// 		// 收藏

// 		this.isColl = true
// 	}
// },
// app分享参数
const sharePage = () => {
    // const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        type: 5,
        imageUrl: detailObj.albums && detailObj.albums[0],
        title: slogan.value, //this.detailObj.shopName,
        miniProgram: {
            id: 'gh_c2469c570746', //微信小程序原始id
            path: `/pagesService/pages/Servicestore/choiceDetails?itemId=${detailObj.shopId}`, //点击链接进入的页面
            type: shareType, //0-正式版； 1-测试版； 2-体验版。 默认值为0
            webUrl: "http://www.baochuncare.com" //兼容低版本的网页链接
        }
    })
}

const isForward = computed(() => recommend.get())

const showprice = computed(() => (min, max) => {
    if (min && max) {
        return min === max ? 1 : 2
    }
    else if (!min && !max) {
        return 3
    }
    else {
        return 1
    }
})

const showswiper = computed(() => (list) => {
    if (!list.length) { return }
    return list.length > 5 ? list.slice(0, 5) : list
})

const notright = computed(() => (list, index) => {
    return list.length === 1 || list.length === index + 1
})


const showroom = () => {
    showmoreroom.value = !showmoreroom.value
}
onBeforeMount(() => {
    const options = route.query
    itemId.value = options.itemId
    isAd.value = options.isAd

    PlatformManage.isRequireLogin().then((loginRequired) => {
        needlogin.value = loginRequired
        if (!needlogin.value) {
            queryList()
        }
    })

    getagencylist(itemId.value)
    getorganizationDetail(itemId.value, isAd.value)
})

onMounted(() => {
    if (process.env.PLATFORM === 'app') {
        // This will be executed in APP-PLUS
    }
    else {
        // getLocation()
    }
})

watch(() => route, (newVal) => {
    // Handle route changes if needed
})
const callfun = () => {
    uni.makePhoneCall({
        phoneNumber: this.detailObj.telephones
    })
}
//这个是自己的方法名
const openAuth = () => {
    // #ifdef APP-PLUS
    authpup.value.open() //调起自定义权限目的弹框,具体可看示例里面很详细
    // #endif

    // #ifndef APP-PLUS
    callfun()
    // #endif
}
const codeInput = () => {
    isEmptyCode.value = !code.value
}
const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^1[0-9]{10}$/
    return regex.test(phoneNumber)
}
const bcNotify = ref()
const getCode = async () => {
    if (!detailObj.phone) {
        isEmptyPhone.value = true
        bcNotify.value.show('请填写手机号码')
        return
    }
    if (!isValidPhoneNumber(detailObj.phone)) {
        isEmptyPhone.value = true
        bcNotify.value.show('请填写正确的手机号码')
        return
    }

    uni.showLoading({ title: '正在获取验证码' })
    try {
        const res = await sendMobileCode({ mobile: detailObj.phone })
        uni.hideLoading()
        if (res !== 1) {
            smsCode.value = res
        }
        if (countdown.value === 0) {
            countdown.value = 60
            const intervalId = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--
                    isEmptyPhone.value = false
                }
                else {
                    clearInterval(intervalId)
                }
            }, 1000)
        }

    }
    catch (err) {
        bcNotify.value.show(err.message)
    }


}
const getDistancesfun = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                positioning.value = true
                resolve({
                    lat1: res.latitude,
                    lng1: res.longitude
                })
            },
            fail: (err) => {
                positioning.value = false
                reject(err)
            }
        })
    })
}
const getLocation = () => {
    getDistancesfun().then((res) => {
        coordinate.lat = res.lat1
        coordinate.lng = res.lng1
    })
}

const queryList = async () => {
    try {
        const res = await getOrganEsList({
            pageNumber: 1,
            pageSize: 10,
            query: { businessType: 4 }
        })
        dataList.value = res
    }
    catch (err) {
        console.log(err)
    }
}

const appointment = async () => {
    if (makeType.value === 3) {
        popupShow.value = false
        makeType.value = 1
        return
    }
    if (makeType.value === 2 && !detailObj.phone) {
        return bcNotify.value.show('请输入正确手机号')
    }
    if (makeType.value === 2 && !detailObj.code) {
        return bcNotify.value.show('请输入验证码')
    }

    try {
        await prebookSave({ shopId: detailObj.shopId, phone: makeType.value !== 1 ? detailObj.phone : '', code: detailObj.code })
        makeType.value = 3
        detailObj.phone = ''
        detailObj.code = ''
    }
    catch (error) {
        bcNotify.value.show(error.message)
    }
}

// You can add the rest of the methods similarly...

const getorganizationDetail = async (shopId, isAd) => {
    try {
        const res = await organizationDetail({ shopId, isAd })
        getDestroyInfo().then(res => {
            detailObj.mobile = res.mobile
        })
        Object.assign(detailObj, res)
        console.log(detailObj)
        isColl.value = res.isFavorite
        appear({ shopId })
    }
    catch (err) {
        console.log(err)
    }
}

const getagencylist = async (organizationId) => {
    try {
        const res = await agencylist({ pageSize: 10, pageNumber: 1, query: { organizationId } })
        productList.value = res || []
    }
    catch (err) {
        console.log(err)
    }
}



</script>


    <style lang="scss" scoped>
    .popup-box{
       padding:30rpx;
    }
    .successful {
        padding-top: 80rpx;
        position: relative;
        .successful_image {
            width: 140rpx;
            height: 140rpx;
            left: 50%;
            top: -150rpx;
            transform: translateX(-50%);
            position: absolute;
        }
        .successful_title {
            font-size: 40rpx;
            text-align: center;
            color: #29c86f;
            margin-top: 84rpx;
        }
        .successful_desc {
            font-size: 24rpx;
            color: #666666;
            width: 100%;
            text-align: center;
            margin-top: 16rpx;
        }
    }
    .popup_box {
        .content {
            min-height: 200rpx;
            max-height: 700rpx;
            font-size: 30rpx;
            color: #666666;
            padding: 20rpx 20rpx 5rpx 20rpx;
            line-height: 50rpx;
            margin-top: 50rpx;

            .title {
                flex-shrink: 0;
                margin-right: 50rpx;
            }
        }
    }
    .popup_but {
        height: 90rpx;
        background: #29c86f;
        border-radius: 46rpx;
        font-size: 32rpx;
        margin:32rpx;
        text-align: center;
        color: #ffffff;
        line-height: 90rpx;
    }
    .title {
        font-size: 36rpx;
        color: #333333;
        text-align: center;
        font-weight: 500;
        margin-bottom: 6rpx;
    }
    .box_phone {
        font-size: 28rpx;
        color: #9e9e9e;
        padding-top: 24rpx;
        text-align: center;
    }
    .popup_content {
        background: #f7f7f7;
        height: 100rpx;
        padding: 0 30rpx;
        display: flex;
        font-size: 32rpx;
        color: #333333;
        margin-top: 40rpx;
        justify-content: space-between;
        border-radius: 12rpx;
        align-items: center;
        .popup_edit {
            display: flex;
            align-items: center;
            font-size: 32rpx;
            color: #2a9cff;
        }
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
                        // border: 1px solid red;
                        box-sizing: border-box;
                        background: #ffffff;
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
                    .introduce_item_top {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-right: 80rpx;
                        box-sizing: border-box;
                    }
                    .introduce_item_title {
                        display: flex;
                        align-items: center;
                        font-size: 26rpx;
                        margin-bottom: 36rpx;

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
                        margin-bottom: 40rpx;
                        .address_title {
                            font-size: 26rpx;
                            color: #333333;
                            margin-right: 40rpx;
                        }
                        .address_box {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex: 1;
                            .address_text_box {
                                width: 85%;
                                .short {
                                    font-size: 26rpx;
                                    color: #666666;
                                    margin-bottom: 4rpx;
                                }
                                .details {
                                    color: #999999;
                                    font-size: 24rpx;
                                }
                            }
                            .address_icon {
                                width: 60rpx;
                                height: 60rpx;
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
                            font-size: 30rpx;
                            font-weight: bold;
                        }
                        .more_icon {
                            width: 36rpx;
                            height: 36rpx;
                            margin-right: 10rpx;
                        }
                    }
                }
            }
            .more_room {
                background: #ffffff;
                width: 100%;
                padding: 30rpx;
                padding-bottom: 80rpx;
                box-sizing: border-box;
                border-radius: 24rpx;
                position: relative;
                margin-bottom: 20rpx;
                &.have_max {
                    max-height: 480rpx;
                }
                .more_room_title {
                    color: #333333;
                    font-size: 28rpx;
                    margin-bottom: 30rpx;
                }
                .more_room_item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 40rpx;
                    .more_room_item_right {
                        display: flex;
                        .more_right_img {
                            width: 96rpx;
                            height: 96rpx;
                            border-radius: 8rpx;
                            // border: 1px solid red;
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
                            }
                        }
                    }
                    .more_room_item_left {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .more_room_price_box {
                            display: flex;
                            align-items: center;
                            margin-bottom: 12rpx;
                            .more_room_price {
                                color: #ff0000;
                                font-size: 28rpx;
                            }
                            .more_room_extend {
                                color: #111111;
                                font-size: 18rpx;
                            }
                        }
                        .show_btn {
                            width: 96rpx;
                            height: 44rpx;
                            text-align: center;
                            line-height: 44rpx;
                            font-size: 24rpx;
                            color: #ffffff;
                            border-radius: 24rpx;
                            background: #29c86f;
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
                    height: 110rpx;
                    background: #fff;
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
            .img_list {
                width: 100%;
                height: 490rpx;
                padding: 30rpx;
                box-sizing: border-box;
                background: #fff;
                border-radius: 24rpx;
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
            .call_yuyue {
                width: 352rpx;
                height: 76rpx;
                font-size: 28rpx;
                color: #ffffff;
                line-height: 76rpx;
                text-align: center;
                background: linear-gradient(90deg, #ffd07e 0%, #ffa033 100%);
                border-radius: 46rpx 0rpx 0rpx 46rpx;
            }
            .call {
                width: 100%; //340rpx;
                height: 76rpx;
                width: 350rpx;
                height: 76rpx;
                background: linear-gradient(90deg, #33cc85 0%, #04af50 100%);
                border-radius: 0rpx 46rpx 46rpx 0rpx;
                font-size: 28rpx;
                color: #ffffff;
                line-height: 76rpx;
                text-align: center;
            }
        }
    }
    </style>
