<template>
    <view class="contraner">
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'服务详情'">
                    <template #back>
                        <view @click="goback">
                            <TnIcon name="left" color="#333333" size="38" :bold="true"/>
                        </view>
                    </template>
                </bc-page-navbar>
            </template>
            <view class="details_box" v-if="data.agencyObj.id">
                <div class="swiper_box">
                    <swiper
                        class="swiper"
                        circular
                        :autoplay="true"
                        :interval="5000"
                        :duration="500"
                        @change="swiperchang"
                    >
                        <swiper-item
                            v-for="(item, index) in showswiper(data.agencyObj.mainPics)"
                            :key="index"
                        >
                            <image
                                class="swiper_item"
                                :src="item"
                                mode="aspectFill"
                                @click="preImage(index,showswiper(data.agencyObj.mainPics))"
                            />
                        </swiper-item>
                    </swiper>
                    <div class="swiper_indicator">
                        <div
                            class="swiper_indicator_item"
                            v-for="(item, index) in showswiper(
                                data.agencyObj.mainPics
                            )"
                            :key="index"
                            :class="{
                                isswiper: data.swiperIndex == index,
                                one_notright: notright(
                                    data.agencyObj.mainPics,
                                    index
                                )
                            }"
                        ></div>
                    </div>
                </div>

                <div class="introduce">
                    <div class="introduce_top">
                        <div class="introduce_title_box">
                            <div class="introduce_title">
                                {{ data.agencyObj.name }}
                            </div>
                        </div>
                        <div class="introduce_icon">
                            <div class="icon_item_box" @click="share">
                                <image
                                    class="icon_item_img"
                                    :src="getAssetsUrl('/channel/share.svg')"
                                    mode="scaleToFill"
                                />
                                <text>分享</text>
                            </div>
                        </div>
                    </div>
                    <div class="device_list">
                        <div class="price_box">
                            <div class="price_text">
                                ￥
                                <text class="price_number">{{
                                    (data.agencyObj.price / 100)
                                }}</text>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <div class="rule_title_box">
                            <div class="rule_title">{{ "限制" }}</div>
                            <div
                                class="rule_text"
                                v-if="data.agencyObj.isRestrictBuyQuantity == 0"
                            >
                                {{ "不限制购买" }}
                            </div>
                            <div class="rule_text" v-else>
                                {{
                                    `每人限制${data.agencyObj.restrictBuyQuantity}张`
                                }}
                            </div>
                        </div>
                        <div class="rule_title_box">
                            <div class="rule_title">{{ "须知" }}</div>
                            <div
                                class="rule_text"
                                v-if="data.agencyObj.isRestrictTime == 0"
                            >
                                {{ "周一至周日全天可用·购买后" }}
                            </div>
                            <div class="rule_text" v-else>
                                {{ data.agencyObj.restrictTimeDesc }}不可用·购买后
                            </div>
                        </div>
                        <div class="rule_title_box">
                            <div class="rule_title">{{ "保障" }}</div>
                            <div class="rule_text">{{ "随时退·过期退" }}</div>
                        </div>
                    </div>
                </div>
                <div class="package">
                    <div class="package_title">套餐详情</div>
                    <div class="package_list">
                        <div
                            class="package_item"
                            v-for="item in data.agencyObj.itemList"
                            :key="item.id"
                        >
                            <div class="package_item_left">
                                {{ item.name }}
                            </div>
                            <div class="package_item_right">
                                <div class="package_item_right_number">
                                    {{ `(${item.quantity}份)` }}
                                </div>
                                <div class="package_item_right_price">
                                    ￥{{ (item.price / 100) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="comment_box"
                    v-if="data.commentList.length != 0 && !data.needlogin"
                >
                    <div class="comment_box_title_box">
                        <div class="comment_box_title">
                            全部评论 {{ `(${data.total})` }}
                        </div>
                        <div class="comment_box_show" @click="tohealthComment">
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
                            <image
                                class="comment_top_img"
                                :src="item.userThumb"
                                mode="scaleToFill"
                            />
                            <div>
                                <div class="comment_top_name">
                                    {{ item.userName }}
                                </div>
                                <div class="comment_top_rate">
                                    <TnRate
                                        v-model="item.score"
                                        :readonly="true"
                                        inactive-color="#EBEBEB"
                                        active-color="#FEE111"
                                        gutter="4rpx"
                                        size="24rpx"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="comment_text">
                            {{ item.comment }}
                        </div>
                        <div
                            class="comment_img_list"
                            v-if="item.pictures.length > 0"
                        >
                            <image
                                v-for="(imgItem, imgIndex) in item.pictures"
                                :key="imgIndex"
                                class="comment_img"
                                :src="imgItem"
                                mode="aspectFill"
                                @click="preImage(imgIndex, item.pictures)"
                            />
                        </div>
                        <div class="shop_reply_comment" v-if="item.reply">
                            商家回复:{{ item.reply }}
                        </div>
                        <div class="comment_time">
                            发布于{{ timeformat(item.utcCreated) }}
                        </div>
                    </div>
                </div>
                <div
                    class="not_comment_box"
                    v-else-if="data.commentList.length == 0 && !data.needlogin"
                >
                    <div class="not_comment_title">全部评论</div>
                    <div class="not_img_box">
                        <image
                            class="not_img"
                            :src="getAssetsUrl('/empty/empty_icon_data.png')"
                            mode="scaleToFill"
                        />
                        <div class="not_text">暂无评论</div>
                    </div>
                </div>
                <div
                    class="login_comment"
                    v-else-if="data.needlogin"
                    @click="tochoiceDetails(itemId, true)"
                >
                    <div class="login_comment_title">登陆后查看评论</div>
                    <div class="login_btn">去登陆</div>
                </div>

                <div class="img_details">
                    <div class="img_details_title_box">
                        <div class="details_title_left"></div>
                        <div class="img_details_title">图片描述</div>
                        <div class="details_title_right"></div>
                    </div>

                    <div class="img_list">
                        <image
                            v-for="(item, index) in data.agencyObj.detailPics"
                            :key="index"
                            class="img_item"
                            :src="item"
                            mode="widthFix"
                            @click="preImage(index, data.agencyObj.detailPics)"
                        />
                    </div>
                </div>
            </view>

            <template #bottom>
                <div class="bottom_btn">
                    <div class="contact" @click="tobay">
                        <text class="contact_text"> 立即抢购 </text>
                    </div>
                </div>
            </template>

        </z-paging>

        <shareView ref="shareBox" @sharePage="sharePage" @sharePoster="sharePoster" :status="data.status" :imgUrl="data.shareimgUrl"></shareView>
        <canvas class="bilvas" canvas-id="mycanvas" id="mycanvas" width="254" height="344" style="width:254px; height:344px"></canvas>


    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { healthdetail, godsCommList } from '@/api/service-api'
import { gotoBalanceOrder } from '@/routes/order-routes'
import { serviceComment } from '@/routes/service-routes'

import { getAssetsPic } from '@/common/setPicture'
import { formattime } from '@/common/formatTime'
import { TempStorage } from "@bc/base"

import shareView from '@/pagesService/components/shareView/shareView.vue'
import { drawBGIMG } from '@/libs/canvas-tools'
import { getQrcode } from "@/api/user-api"
import { gotoIndex } from "@/routes/public-routes"
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import { PlatformManage } from "@bc/sys"


interface Props {
    itemId: string
}

const props = defineProps<Props>()

interface Data {
    swiperIndex:number,
    agencyObj:any,
    commentList:any,
    total:number,
    needlogin:boolean,
    status:number,
    shareimgUrl:string,
}

const data = reactive<Data>({
    swiperIndex:0,
    agencyObj:{},
    commentList:[],
    total:0,
    needlogin:false,
    status: 0,
    shareimgUrl: '',
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const timeformat = computed(()=>(time:number)=>{
    return formattime(time ,'YYYY-MM-DD')
})

const showswiper = computed(()=>(list:any)=>{
    if (!list?.length) {
        return
    }
    if (list.length > 5) {
        return list.slice(0, 5)
    }
    else {
        return list
    }
})

const notright = computed(()=>(list:any, index:number)=>{
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

const emit = defineEmits(["saveShareObj"])

onMounted(() => {
    gethealthdetail(props.itemId)
    getgodsCommList(props.itemId)
})


const gethealthdetail = (id:string) => {
    healthdetail({
        id
    }).then((res:any)=>{
        data.agencyObj = res;
        const shareObj = {
            title: res.name,
            imageUrl: res.mainPics[0],
            id: res.id,
            desc: '',
        }
        emit('saveShareObj',shareObj)

        // data.priceItem = res.itemList[0]
    })
}
const getgodsCommList = (itemId:string) => {
    godsCommList({
        pageNumber: 1,
        pageSize: 3,
        query: {
            itemId,
            shopId: null
        }
    }).then((res:any)=>{
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

const tohealthComment = () => {
    // 评论列表详情
    serviceComment(props.itemId,2)
}

const tochoiceDetails = (itemId:string, tologin:boolean = false) => {
    // 登录后查询详情
}

const tobay = () => {
    // 跳转购买页面传入2表示机构订单
    const uniqueId = TempStorage.savewx({
        itemId: data.agencyObj.id
    })
    // #ifdef MP-WEIXIN
    gotoBalanceOrder(uniqueId, 2)
    // #endif


    // #ifdef APP-PLUS
    let payJSON = JSON.stringify({
        itemId: data.agencyObj.id
    })
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    // APP跳转小程序进行支付
    plus.share.getServices((res: any) => {
        let sweixin = null as any
        for (const i in res) {
            if (res[i].id == 'weixin') {
                sweixin = res[i]
            }
        }
        // 唤醒微信小程序
        if (sweixin) {
            uni.hideLoading()

            PlatformManage.getToken().then((res:any)=>{
                console.log('获取userinfo',res);

                sweixin.launchMiniProgram({
                    id: 'gh_fd20b530cb94',  // 小程序的原始ID，微信公众平台设置里有
                    type: shareType, // 小程序版本  0-正式版； 1-测试版； 2-体验版。
                    path: `/pagesOrder/pages/balanceOrder/balanceOrder?payJSON=${payJSON}&userId=${res.id}&handle=2`, // 小程序的页面，使用传递的参数在小程序内部判断跳转到指定页面
                    extraData: {
                        'payJSON': payJSON,
                    }
                })
            })
        }
    })

    // #endif
}



const instance = getCurrentInstance(); // 获取组件实例

// app分享参数
// #ifndef MP-WEIXIN
const sharePage = () => {
    const shareType = import.meta.env.VITE_WEIXIN_OPEN

    uni.share({
        provider: 'weixin',
        scene: "WXSceneSession",
        type: 5,
        imageUrl: data.agencyObj.mainPics[0],
        title: data.agencyObj.name,
        miniProgram: {
            id: 'gh_fd20b530cb94', //微信小程序原始id
            path: `/pagesService/pages/Servicestore/healthproductDetails?itemId=${data.agencyObj.id}`, //点击链接进入的页面
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

const shareBox = ref();
// 分享
const share = () => {
    data.status = 1;
    (shareBox.value as any).open();
}
const closeShare = () => {
    (shareBox.value as any).close()
}

const sharePoster = async () => {

    const coverUrl = await drawBGIMG(data.agencyObj.mainPics[0])
    // 二维码链接图片
    let qrimg =  await getQrcode(`/pagesService/pages/Servicestore/healthproductDetails?itemId=${data.agencyObj.id}`).then((img:any)=>{
        return img
    })
    const qrimgUrl = await drawBGIMG(qrimg)

    const accountThumb = await drawBGIMG(data.agencyObj.mainPics[0])

    if (qrimgUrl == '') {
        uni.showToast({
            icon: 'none',
            title: '生成二维码失败,请稍后重试'
        })
        return
    }

    let title = data.agencyObj.name//标题
    let accountName = data.agencyObj.name//作者，店铺名

    if (title.length > 8) {
        title = title.slice(0,8) + "..."
    }
    if (accountName.length > 8) {
        accountName = accountName.slice(0,8) + "..."
    }

    const context = uni.createCanvasContext('mycanvas',instance)


    context.clearRect(0, 0, 254, 344);
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
    context.arc(24, 320, 10, 0, Math.PI * 2);
    context.fill()//保证图片无bug填充
    context.clip();//画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内

    context.drawImage(accountThumb, 14, 310, 20, 20)
    context.restore()

    context.draw(
        false,
        setTimeout( async () => {
            uni.canvasToTempFilePath({
                canvasId:'mycanvas',
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
                    console.log('生成中....');
                    uni.hideLoading()
                }
            },instance)
        }, 3000)
    )
}

const goback = () => {
    const pages = getCurrentPages()
    if (pages.length == 1) {
        gotoIndex()
        return
    }

    uni.navigateBack()
}

defineExpose({
    closeShare,
})


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
            border-radius: 24rpx;
            background: #ffffff;
            padding: 30rpx;
            box-sizing: border-box;
            margin-bottom: 20rpx;
            .introduce_top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20rpx;
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
                padding-bottom: 40rpx;
                border-bottom: 1px solid #f0f0f0;
                .discount_tag {
                    padding: 4rpx 8rpx;
                    box-sizing: border-box;
                    border: 2rpx solid #ffd5aa;
                    background: #fff6ec;
                    font-size: 20rpx;
                    color: #ff9f3e;
                    border-radius: 8rpx;
                    margin-bottom: 8rpx;
                    width: fit-content;
                }
                .price_box {
                    display: flex;
                    align-items: center;
                    .price_text {
                        font-size: 24rpx;
                        color: #ff0000;
                        margin-right: 10rpx;
                        .price_number {
                            color: #ff0000;
                            font-size: 40rpx;
                        }
                    }
                    .price_through {
                        text-decoration: line-through;
                        font-size: 24rpx;
                        color: #999999;
                    }
                }
            }
            .rule {
                padding-top: 30rpx;
                box-sizing: border-box;
                width: 100%;
                .rule_title_box {
                    display: flex;
                    align-items: center;
                    font-size: 28rpx;
                    margin-bottom: 16rpx;
                    width: 100%;
                    .rule_title {
                        color: #333333;
                        // margin-right: 30rpx;
                        width: 10%;
                    }
                    .rule_text {
                        color: #777777;
                        width: 89%;
                    }
                }
            }
        }
        .package {
            padding: 30rpx;
            box-sizing: border-box;
            background: #ffffff;
            border-radius: 24rpx;
            margin-bottom: 20rpx;
            .package_title {
                color: #333333;
                font-size: 32rpx;
                margin-bottom: 40rpx;
                font-weight: bold;
            }
            .package_list {
                width: 100%;
                .package_item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 30rpx;
                    .package_item_left {
                        color: #333333;
                        font-size: 28rpx;
                    }
                    .package_item_right {
                        display: flex;
                        align-items: center;
                        .package_item_right_number {
                            font-size: 28rpx;
                            color: #999999;
                            margin-right: 20rpx;
                        }
                        .package_item_right_price {
                            color: #ff0000;
                            font-size: 28rpx;
                        }
                    }
                }
            }
        }

        .comment_box {
            padding: 36rpx 30rpx;
            box-sizing: border-box;
            background: #fff;
            border-radius: 24rpx;
            margin-bottom: 40rpx;
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
                    .comment_top_box {
                        height: 68rpx;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
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
                .shop_reply_comment{
                    padding: 24rpx;
                    box-sizing: border-box;
                    background: #F5F5F5;
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
            margin-bottom: 20rpx;
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
            margin-bottom: 20rpx;

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

        .img_details {
            // padding: 30rpx;
            // box-sizing: border-box;
            // background: #FFFFFF;
            // border-radius: 24rpx;
            .img_details_title_box {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20rpx;
                .details_title_left {
                    width: 52rpx;
                    height: 2px;
                    background: linear-gradient(
                        90deg,
                        #f2f3f5 0%,
                        #8d8d8d 100%
                    );
                    margin-right: 20rpx;
                }
                .img_details_title {
                    font-size: 28rpx;
                    color: #333333;
                }
                .details_title_right {
                    width: 52rpx;
                    height: 2px;
                    background: linear-gradient(
                        90deg,
                        #8d8d8d 0%,
                        #f2f3f5 100%
                    );
                    margin-left: 20rpx;
                }
            }

            .img_list {
                .img_item {
                    width: 100%;
                    // height: 200rpx;
                    // border: 2rpx solid red;
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
        background: #ffffff;
        .contact {
            width: 686rpx;
            height: 84rpx;
            background: linear-gradient( 90deg, #FE7D36 0%, #FE2D00 100%);
            border-radius: 46rpx;
            font-size: 32rpx;
            color: #ffffff;
            line-height: 84rpx;
            text-align: center;
            .contact_text {
                margin-right: 12rpx;
            }
            .contact_price {
                font-size: 24rpx;
                .contact_price_text {
                    color: #ffda46;
                    font-size: 30rpx;
                    font-weight: bold;
                }
            }
        }
    }

    .chatbox {
        position: fixed;
        width: 96rpx;
        height: 96rpx;
        bottom: 400rpx;
        right: 4rpx;
    }
}
.bilvas{
    border-radius: 20rpx;
    position: relative;
    left: -750px;
}
</style>

