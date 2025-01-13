<template>
    <view class="wrap">
        <!-- <view class="title">店铺/服务评价</view> -->
        <view class="item tn-flex-column">
            <view class="tn-flex-row">
                <view class="left">
                    <image class="cover" :src="data.orderDetail?.shopList[0]?.entityList[0]?.image" mode="aspectFill" />
                </view>
                <view class="right tn-flex-column">
                    <view class="title tn-text-ellipsis-2">{{ data.orderDetail?.shopList[0]?.entityList[0]?.title || '--' }}</view>
                    <view class="tn-flex-center-between">
                        <view class="tn-flex-row">
                            <TnRate v-model="data.shopInfo.score" :min="0" :max="5" readonly gutter="0" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="30rpx" allow-half />
                            <view class="score">{{ data.shopInfo.score }}分</view>
                        </view>
                        <view class="comment">累计服务<text>{{ data.shopInfo.saleVolume || '--' }}</text>客户</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="title">服务感受</view>
        <view class="content">
            <view class="allRate tn-flex-center-between">
                <view>评分</view>
                <TnRate v-model="data.allRate" :min="0" :max="5" gutter="10" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="lg" />
            </view>
            <view class="input">
                <TnInput v-model="data.inputValue" :border="false" :maxlength="200" :height="300" :show-word-limit="true" type="textarea" placeholder="请填写你的服务感受，为更多小伙伴做出关键性的决策。" />
                <view class="tips">请上传服务图片，最多可上传8张</view>
                <imgUpload v-model:imageArr="data.fileList" :limit="8" ref="imgUploadref" @upchange="changeisNext">
                    <template #uploadBtn>
                        <view @click="openUp" class="up_box">
                            <view class="up_icon">
                                <TnIcon name="add" color="#C9C9C9" size="60"/>
                            </view>
                            <view class="up_text">图片</view>
                        </view>
                    </template>
                </imgUpload>
            </view>
        </view>
    </view>
    <BottomSingleBtn @clickBtn="submit"></BottomSingleBtn>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import BCNotify from '@/components/notify/index.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import BottomSingleBtn  from '@/components/bottomSingleBtn/index.vue'
import { submitComment, getScoreKey } from '@/api/user-api'
import { getserviceOrderDetail } from '@/api/order-api'
import { getBaseInfo  } from '@/api/service-api'
import { gotoCommentSuccess } from '@/routes/user-routes'

interface Data {
    orderId: string
    orderDetail: any
    shopInfo: any
    dataLists: any
    fileList: any
    allRate: number
    taskId:string
    inputValue: string
}

const data = reactive<Data>({
    orderId: '',
    orderDetail: {
        shopList: [
            {
                entityList: []
            }
        ]
    },
    taskId:'',
    shopInfo: {},
    dataLists: [],
    fileList: [],
    allRate: 5,
    inputValue: ''
})

const bcNotify = ref()

const imgUploadref = ref()

const openUp = () => {
    nextTick(() => {
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const changeisNext = () => {
    console.log('data.fileList.length', data.fileList.length)
}

const submit = () => {
    if (!data.inputValue) {
        bcNotify.value.show('请填写服务感受') 
        return
    }
    getScoreKey({ templateCodeId: data.orderDetail.templateCodeId }).then((res: any) => {
        const scoreOjb = {}
        scoreOjb[res[0].id] = data.allRate
        
        submitComment({
            score: JSON.stringify(scoreOjb),
            anonymity: false,
            taskId:data.taskId,
            applyId: data.shopInfo.applyId,
            evaluates: [
                {
                    entityId: data.orderDetail.shopList[0].entityList[0].entityId,
                    comment: data.inputValue,
                    images: data.fileList
                }
            ]
        }).then((res: any) => {
            gotoCommentSuccess()
        }).catch((err: any) => {
            bcNotify.value.error(err.message)  
        })
    })
}

onLoad((option) => {
    data.orderId = option?.id
    data.taskId =option?.taskId||''
    getserviceOrderDetail({ orderId: data.orderId }).then((res: any) => {
        data.orderDetail = res

        getBaseInfo({ id: res.shopList[0].shopId }).then((res: any) => {
            data.shopInfo = res
        }).catch((err: any) => {
            bcNotify.value.error(err.message)  
        })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)  
    })
})

</script>

<style lang="scss" scoped>
:deep(.tn-input) {
    background-color: #F8F8F8;
}

.wrap {
    padding: 30rpx 30rpx 250rpx 30rpx;
}
.title {
    font-size: 32rpx;
    color: #333333;
    margin-bottom: 20rpx;
}

.subtitle {
    font-size: 26rpx;
    color: #999999;
    margin-bottom: 10rpx;
}

.item {
    margin-bottom: 20rpx;
    padding: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;

    .left {
        position: relative;

        .cover {
            width: 130rpx;
            height: 130rpx;
            border-radius: 8rpx;
            border: solid 1rpx #F2F2F2;
        }
    }

    .right {
        flex: 1;
        padding: 10rpx 0;
        margin-left: 20rpx;
        justify-content: space-between;

        .title {
            color: #1A1A1A;
            font-size: 30rpx;
            font-weight: bold;
        }

        .score {
            color: #FF9F3E;
            font-size: 24rpx;
            font-weight: bold;
            margin-left: 10rpx;
        }

        .comment {
            color: #808080;
            font-size: 24rpx;
            margin-left: 30rpx;

            text {
                color: #EA401D;
            }
        }

        .desc {
            color: #999999;
            font-size: 24rpx;
            margin-top: 14rpx;
        }

        .price {
            color: #333333;
            font-size: 26rpx;
            margin-top: 10rpx;
            align-items: flex-end;

            text {
                font-size: 32rpx;
            }
        }
    }
}

.content {
    padding: 0rpx 30rpx 30rpx 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;
}

.allRate {
    height: 100rpx;
    padding: 10rpx 0;
    border-bottom: 1rpx solid #F2F2F2;
}

.input {
    margin-bottom: 20rpx;

    

    .tips {
        margin: 30rpx 0 20rpx 0;
        font-weight: 400;
        font-size: 26rpx;
        color: #666666;

    }
}

.up_box{
    width: 180rpx;
    height: 180rpx;
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .up_text{
        margin-top: 24rpx;
        font-size: 24rpx;
        color: #C9C9C9;
        font-weight: 400;
    }
}

</style>
