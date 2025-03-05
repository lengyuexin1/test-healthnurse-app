<template>
    <view class="container" >
        <z-paging
            ref="paging"
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'申请售后'"></bc-page-navbar>
            </template>
            <view class="content">
                <view class="serbox">
                    <view class="sertit">需售后商品</view>
                    <view class="sercon row" v-if="data.serveDetail">
                        <image
                            class="sercon_img"
                            :src="data.serveDetail.image"
                            mode="aspectFill"
                        />
                        <view class="serig">
                            <view class="sername u-line-1">{{data.serveDetail.title}}</view>
                            <view class="sersub u-line-1">{{data.serveDetail.subtitle}}</view>
                            <view class="serprice">￥{{(data.serveDetail.paidAmount / 100)}}</view>
                        </view>
                    </view>
                </view>
                <template v-if="data.status == 0">
                    <view class="waybox">
                        <view class="waytit">售后方式</view>
                        <block v-for="(item) in data.salesType" :key="item.id">
                            <view class="aply_mode row i-center" @click="setType(item.id)">
                                <view class="aply_mod_img">
                                    <image
                                        class="aply_img"
                                        :src="item.icon"
                                        mode="scaleToFill"
                                    />
                                </view>
                                <view class="aply_middle">
                                    <view class="aply_mod_tit">{{item.name}}</view>
                                    <view class="aply_mod_tex">{{item.desc}}</view>
                                </view>
                                <TnIcon name="right" color="#CECECE" size="32rpx"></TnIcon>
                            </view>
                        </block>
                    </view>
                </template>
                <template v-if="data.status === 1">
                    <view class="some">
                        <view class="sometit">{{ data.typeId === 4 ? '换货信息' : '退款信息'}}</view>
                        <view class="salebox">
                            <view class="saleli row" @click="data.show = true">
                                <view class="salelef row">
                                    <text class="saletit">售后原因</text>
                                    <text class="saletit xing">*</text>
                                </view>
                                <view class="salerig row">
                                    <view class="more_text">{{ data.pickerValue != 999 ? moreValue(data.pickerValue) : '请选择售后原因' }}</view>
                                    <TnIcon name="right" size="32rpx" color="#CCCCCC"></TnIcon>
                                </view>
                            </view>
                            <template v-if="data.typeId !== 4">
                                <view class="saleli row">
                                    <view class="salelef row">
                                        <text class="saletit">退款金额</text>
                                        <text class="saletit xing">*</text>
                                    </view>
                                    <view class="salerig row">
                                        <input type="digit" :maxlength="8" v-model="data.refund"
                                            placeholder="请输入退款金额" class="refinp" placeholder-class="refplac"
                                            placeholder-style="color:#c0c4cc;">
                                        <text class="unit">元</text>
                                    </view>
                                </view>
                                <view class="saleli row">
                                    <text class="saletip">已支付 ¥{{ (data.serveDetail.paidAmount / 100) }}</text>
                                </view>
                                <view class="saleli row">
                                    <text class="saletip">可修改，最多可退 ¥{{ (data.serveDetail.paidAmount / 100) }}</text>
                                </view>
                            </template>
                            <template v-if="data.typeId === 4">
                                <view class="saleli row j-between">
                                    <view class="salelef row">
                                        <text class="saletit">换货件数</text>
                                        <text class="saletit xing">*</text>
                                    </view>
                                    <TnNumberBox v-model="data.quantity" bg-color="#f5f5f5" :min="1" :max="data.serveDetail.purchaseQuantity"
                                        buttonSize="56rpx" inputWidth="66rpx" @change="editNumber()">
                                    </TnNumberBox>

                                </view>
                            </template>
                        </view>
                    </view>
                    <view class="some">
                        <view class="sometit">补充描述和证据</view>
                        <view class="salebox">
                            <view class="saleli row">
                                <textarea
                                class="saleli_textarea"
                                maxlength="200"
                                :count="true"
                                height="120"
                                border="none"
                                v-model="data.desc"
                                :customStyle="{ backgroundColor: '#F9F9F9', paddingBottom: '20px' }"
                                placeholder="补充描述，有助于保椿客服更好的助力售后问题"
                                />
                            </view>
                            <view class="saleli row" v-if="data.fileList.length < data.count">
                                <text class="saletip">请上传服务图片，最多可上传{{ data.count }}张</text>
                            </view>
                            <view class="up_img">
                                <view class="up_img_inp">
                                    <imgUpload v-model:imageArr="data.fileList" :limit="data.count" ref="imgUploadref" @upchange="changeisNext">
                                        <template #uploadBtn>
                                            <view @click="openUp" class="up_box">
                                                <view class="up_icon">
                                                    <TnIcon name="add" color="#C9C9C9" size="40"/>
                                                </view>
                                                <view class="up_text">图片</view>
                                            </view>
                                        </template>
                                    </imgUpload>
                                </view>
                            </view>
                        </view>
                    </view>
                </template>
            </view>

            <template #bottom >
                <view class="bottom_box" v-if="data.status === 1">
                    <view class="btn" @click="submit">立即申请</view>
                </view>
            </template>


            <TnPicker
                v-model="data.pickerValue"
                v-model:open="data.show"
                :data="data.expressList"
            />
    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick  } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnNumberBox from '@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue'

import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { formattime } from '@/common/formatTime'
import { TempStorage } from "@bc/base"
import imgUpload from '@/components/upload/img-upload.vue'


import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'

import { getAftersaleReason, saleAgainAdd, applyAftersale } from '@/api/order-api'
import { gotowaitingSales } from "@/routes/user-routes"


interface Props {
    salesObj:string,
}
const props = defineProps<Props>()

interface Data {
    salesType:any,
    serveDetail:any,
    status:number,
    typeId:number,
    show:boolean,
    fileList:any,
    count:number,
    pickerValue:number,
    expressList:any,
    desc:string,
    refund:number | null,
    quantity:number,
    align:number,
    afterSaleId:string,

}
const data = reactive<Data>({
    salesType: [
        {
            id: 2,
            name: '仅退款(无需退货)',
            desc: '未收到货，或与商家协商一致不退货只退款',
            icon: getAssetsPic('/sales/sale_type_1.png')
        },
        {
            id: 3,
            name: '退货退款',
            desc: '已收到货，需退还收到的货物',
            icon: getAssetsPic('/sales/sale_type_2.png')
        },
        {
            id: 4,
            name: '换货',
            desc: '已收到货，需更换收到的货物',
            icon: getAssetsPic('/sales/sale_type_3.png')
        }
    ],

    serveDetail: null,
    status: 0,
    typeId: 2,
    show: false,
    fileList: [],
    count: 3,
    pickerValue: 999,
    expressList: [],
    desc: '',
    refund: null,
    quantity: 1,
    align: 0,
    afterSaleId: ''
})


const bcNotify = ref()

const timeformat = computed(() => (time:number) => {
    return formattime(time, 'YYYY-MM-DD HH:mm')
})

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const moreValue = computed(() => (id:number) => {
    const filObj = data.expressList.filter((item:any) => {
        return item.value == id
    })
    console.log('filObj', filObj)

    return filObj[0].label
})

onMounted(() => {
    const tempStorage = new TempStorage()
    tempStorage.get(props!.salesObj).then((res:any) => {
        data.serveDetail = res.info
        data.afterSaleId = res.afterSaleId
        data.align = res.align

    }).catch(() => {
        bcNotify.value.error('售后信息获取失败')
    })
})


const getAfterSalesReason = () => {
    getAftersaleReason({
        typeId: data.typeId
    }).then((res:any) => {
        data.expressList = res.map((item:any) => {
            return {
                label: item.name,
                value: item.id
            }
        })
    })
}

const setType = (id:number) => {
    data.typeId = id
    data.status = 1
    // 获取售后原因列表
    getAfterSalesReason()
}


const imgUploadref = ref()
const openUp = () => {
    nextTick(() => {
        imgUploadref.value.chooseFileFun()
    })
}

const isValidNumber = (str: string) => {
    const numberPattern = /^-?\d+(\.\d+)?$/ // 匹配整数和小数
    return numberPattern.test(str)
}

const submit = () => {
    const numberPattern = /^-?\d+(\.\d+)?$/ // 匹配整数和小数

    if (data.pickerValue == 999) {
        bcNotify.value.error('请选择售后原因')
        return
    }
    if ((data.typeId == 2 || data.typeId == 3)) {
        if (!data.refund) {
            bcNotify.value.error('请输入售后退款金额')
            return
        }
        else if (isValidNumber(data.refund + '') == false) {
            bcNotify.value.error('请输入正确的金额')
            return
        }
        else {
            if (data.refund <= 0) {
                bcNotify.value.error('售后退款金额不能小于0')
                return
            }
            if (data.refund > (data.serveDetail.paidAmount / 100)) {
                bcNotify.value.error('售后退款金额不能大于支付金额')
                return
            }
        }
    }

    if (!data.desc) {
        bcNotify.value.error('请补充描述')
        return
    }

    if (data.fileList.length == 0) {
        bcNotify.value.error('请上传图片作为售后证据依据')
        return
    }

    addAftersale()


}

const addAftersale = () => {

    const saleData = {
        entityId: data.serveDetail.entityId,
        reasonId: data.pickerValue,
        typeId: data.typeId,
        desc: data.desc,
        images: data.fileList,
        refund: data.refund ? (data.refund * 100) : data.serveDetail.paidAmount,
        quantityReturned: data.quantity,
        id: data.afterSaleId
    }

    if (!data.align) {
        // 再次售后
        saleAgainAdd(saleData).then((res) => {
            bcNotify.value.show('申请成功')
            setTimeout(() => {
                gotowaitingSales({
                    id: res,
                    status: 2
                })
            }, 800)
        }).catch(err => {
            bcNotify.value.error(err.message)
        })
        return
    }
    // 申请/修改售后
    applyAftersale(saleData).then((res) => {
        bcNotify.value.show('申请成功')
        setTimeout(() => {
            gotowaitingSales({
                id: res,
                status: 2
            })
        }, 800)
    }).catch(err => {
        bcNotify.value.error(err.message)
    })
}


const changeisNext = () => {

}
const editNumber = () => {

}






</script>

<style lang="scss" scoped>
.container{
    padding: 0 24rpx;
}
.content{
    padding: 24rpx;
}
.serbox{
    padding: 30rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 20rpx;
    .sertit{
        font-size: 32rpx;
        font-weight: bold;
        line-height: 42rpx;
        color: #333333;
    }
    .sercon{
        margin-top: 30rpx;
        .sercon_img{
            width: 180rpx;
            height: 180rpx;
            border-radius: 12rpx;
        }
        .serig{
            flex: 1;
            padding-left: 30rpx;
            .sername{
                font-size: 30rpx;
                font-weight: bold;
                line-height: 40rpx;
                color: #333333;
            }
            .sersub{
                font-size: 28rpx;
                margin-top: 8rpx;
                font-weight: 400;
                color: #666666;
            }
            .serprice{
                font-size: 32rpx;
                font-weight: 500;
                color: #FC3848;
                margin-top: 46rpx;
            }
        }
    }
}



.orderbox {
    margin-top: 24rpx;
    height: 298rpx;
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.06);
    /* #endif */
    border-radius: 16rpx;
    padding: 30rpx 40rpx;
}

.somebtn {
    margin-top: 16rpx;
    padding: 30rpx;
}

.some {
    margin-top: 16rpx;
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.06);
    /* #endif */
    border-radius: 24rpx;
    padding: 30rpx;

    .sometit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
    }

    .salebox {

        .saleli {
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30rpx;
            .saleli_textarea{
                width: 100%;
                padding: 24rpx;
                box-sizing: border-box;
                background: #FBFBFB;
            }


            .saletip {
                font-size: 26rpx;
                font-weight: 400;
                color: #BCBCBC;
            }

            .salelef {
                align-items: center;
                justify-content: flex-start;

                .saletit {
                    font-size: 28rpx;
                    font-weight: 400;
                    color: #333333;
                }

                .xing {
                    color: #FC3964;
                    margin-left: 4rpx;
                }
            }

            .salerig {
                align-items: center;
                .more_text{
                    color: #999999;
                    font-size: 28rpx;
                    margin-right: 12rpx;
                }

                .unit {
                    margin-left: 10rpx;
                    font-size: 28rpx;
                    font-weight: bold;
                    color: #666666;
                }

                .refinp {
                    text-align: right;
                    color: red;
                    flex: 1;
                    font-size: 15px;
                }

                .refplac {
                    font-size: 15px;
                    color: #BCBCBC;
                }
            }
        }
        .up_img{
            .up_img_inp{
                .up_box{
                    width: 152rpx;
                    height: 152rpx;
                    background: #F8F8F8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    .up_text{
                        margin-top: 14rpx;
                        font-size: 24rpx;
                        color: #C9C9C9;
                        font-weight: 400;
                    }
                }
            }
        }

    }
}

// 售后方式
.waybox{
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;

    .waytit{
        font-size: 32rpx;
        font-weight: 500;
        line-height: 42rpx;
        color: #333333;
        margin-top: 8rpx;
    }
}
.aply_mode {
    margin-top: 24rpx;
    background-color: #F8F8F8;
    border-radius: 6rpx;
    padding: 34rpx 24rpx;

    .aply_mod_img {
        width: 76rpx;
        height: 76rpx;
        margin-right: 16rpx;
        .aply_img{
            width: 100%;
            height: 100%;
        }
    }

    .aply_middle {
        flex: 1;

        .aply_mod_tit {
            font-size: 30rpx;
            font-weight: 500;
            color: #333333;
        }

        .aply_mod_tex {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;
            margin-top: 8rpx;
        }
    }
}

// 步进器自定义样式
.minus {
    width: 62rpx;
    height: 56rpx;
    background: #F5F5F5;
    border-radius:56rpx 0 0 56rpx;
    // @include flex;
    justify-content: center;
    align-items: center;

    &.forbid{
        background-color: #F5F5F5;
    }
}

.input {
    padding: 0 8px;
    font-size: 28rpx;
    font-weight: bold;
    color: #333333;
}

.plus {
    width: 62rpx;
    height: 56rpx;
    background-color: #F5F5F5;
    border-radius: 0 56rpx 56rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &.forbid{
        background-color: #F5F5F5;
    }
}

.bottom_box{
    padding: 16rpx 30rpx;
    padding-bottom: 46rpx;
    box-sizing: border-box;
    background: #fff;
    .btn{
        width: 100%;
        height: 80rpx;
        border-radius: 40rpx;
        background: #EA3E1A;
        color: #FFFFFF;
        font-size: 30rpx;
        font-weight: 400;
        text-align: center;
        line-height: 80rpx;

    }
}
</style>
