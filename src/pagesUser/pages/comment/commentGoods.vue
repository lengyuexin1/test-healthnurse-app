<template>
    <view class="wrap">
        <view class="item tn-flex-column">
            <view class="tn-flex-row">
                <view class="left">
                    <image class="cover" :src="data.orderDetail?.shopList[0]?.entityList[0]?.image" mode="aspectFill" />
                </view>
                <view class="right tn-flex-column">
                    <view class="title tn-text-ellipsis-2">{{ data.orderDetail?.shopList[0]?.entityList[0]?.title || '--' }}</view>
                    <view class="desc tn-text-ellipsis-1">{{ data.orderDetail?.shopList[0]?.entityList[0]?.subtitle || '--' }}</view>
                </view>
            </view>

            <view class="tags tn-flex-center-start">
                <view class="txt">描述相符:</view>
                <view class="tn-flex-row">
                    <block v-for="(item, index) in data.tagItems" :key="index">
                        <view :class="['label tn-flex-center-center', data.currentSelectTags == item.value ? 'active' : '']" @tap="clickTag(item.value)">{{ item.label }}</view>
                    </block>
                </view>
            </view>

            <view class="input">
                <TnInput v-model="data.inputValue" :maxlength="200" :height="300" :show-word-limit="true" :border="false" type="textarea" placeholder="说说收到货的感受吧~。" />
            </view>
            <view class="tips">请上传图片，最多可上传8张</view>
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
        <view class="rate">
            <view class="list tn-flex-row" v-for="(item, index) in data.scoreList" :key="index">
                <view class="txt">{{ item.name }}</view>
                <TnRate v-model="item.value" :min="1" :max="5" gutter="10" activeColor="#FF9F3E" inactive-color="#EBEBEB" size="lg" />
            </view>
        </view>
        <view class="radio">
            <TnCheckbox v-model="data.anonymity" size="26rpx" checked-shape="circle" active-color="#EA3E1A" @change="change">匿名评价</TnCheckbox>
        </view>
    </view>
    <BottomSingleBtn @clickBtn="submit"></BottomSingleBtn>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import BCNotify from '@/components/notify/index.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import { submitComment, getScoreKey } from '@/api/user-api'
import { getserviceOrderDetail } from '@/api/order-api'
import { gotoCommentSuccess } from '@/routes/user-routes'

interface Data {
    orderId: string
    orderDetail: any
    dataLists: any
    fileList: any
    scoreList: any
    allRate: number
    inputValue: string
    anonymity: boolean
    tagItems: any,
    taskId:string,
    currentSelectTags: any
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
    dataLists: [],
    fileList: [],
    scoreList: [],
    allRate: 5,
    inputValue: '',
    anonymity: false,
    tagItems: [
        { label: '好评', value: 3 },
        { label: '中评', value: 4 },
        { label: '差评', value: 5 }
    ],
    currentSelectTags: 0
})

const bcNotify = ref()

const imgUploadref = ref()

const openUp = () => {
    nextTick(() => {
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const clickTag = (value: number) => {
    data.currentSelectTags = value
}

const changeisNext = () => {
    console.log('data.fileList.length', data.fileList.length)
}

const change = () => {
    
}

const submit = () => {
    if (data.currentSelectTags == 0) {
        bcNotify.value.show('请选择满意程度') 
        return
    }
    if (!data.inputValue) {
        bcNotify.value.show('请填写收到货的感受') 
        return
    }

    const scoreOjb = {}
    for (const i in data.scoreList) {
        scoreOjb[data.scoreList[i].id] = data.scoreList[i].value
    }
    submitComment({
        score: JSON.stringify(scoreOjb),
        anonymity: data.anonymity,
        taskId:data.taskId,
        applyId: 3, //2服务 3商品 13 康养
        evaluates: [
            {
                entityId: data.orderDetail.shopList[0].entityList[0].entityId,
                comment: data.inputValue,
                images: data.fileList,
                typeId: data.currentSelectTags
            }
        ]
    }).then(() => {
        gotoCommentSuccess()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)  
    })
}

onLoad((option) => {
    data.orderId = option?.id
    data.taskId = option?.taskId||''
    getserviceOrderDetail({ orderId: data.orderId }).then((res: any) => {
        data.orderDetail = res
        console.log(res);
        

        getScoreKey({ templateCodeId: data.orderDetail.templateCodeId }).then((res: any) => {
            data.scoreList = res.map((item: any) => {
                return {
                    ...item,
                    value: 5
                }
            })
        })
    })
})

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}
:deep(.tn-select-tags__tag-item) {
    margin-top: 0 !important;
}
:deep(.tn-input) {
    background-color: #F8F8F8;
}

.wrap {
    padding: 30rpx 30rpx 250rpx 30rpx;
}

.item {
    margin-bottom: 20rpx;
    padding: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;

    .left {
        position: relative;

        .cover {
            width: 140rpx;
            height: 140rpx;
            border-radius: 8rpx;
            border: solid 1rpx #F2F2F2;
        }
    }

    .right {
        flex: 1;
        padding: 10rpx 0;
        margin-left: 20rpx;

        .title {
            color: #1A1A1A;
            font-size: 30rpx;
            font-weight: bold;
            margin-bottom: 10rpx;
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
        }

        .desc {
            color: #999999;
            font-size: 24rpx;
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

    .allRate {
        height: 100rpx;
        margin-top: 30rpx;
        border-top: 1rpx solid #F2F2F2;
    }
}

.tags {
    margin-top: 30rpx;
    font-weight: 500;
    font-size: 28rpx;
    color: #333333;

    .txt {
        width: 230rpx;
    }

    .label {
        width: 110rpx;
        height: 56rpx;
        margin-right: 20rpx;
        color: #C0BFC0;
        font-size: 26rpx;
        background-color: #F8F7F8;
        border-radius: 10rpx;

        &.active {
            color: #FFFFFF;
            background-color: #FE6F2F;
        }
    }
}

.tips {
    margin: 30rpx 0 20rpx 0;
    font-weight: 400;
    font-size: 26rpx;
    color: #666666;
}

.input {
    margin-top: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;

    .textarea {
        background-color: #F9F9F9;
    }
}

.rate {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
    padding: 30rpx;
    border-radius: 24rpx;
    background-color: #FFFFFF;

    .txt {
        width: 144rpx;
        font-size: 28rpx;
        color: #333333;
    }

    .list {
        align-items: center;
        margin-bottom: 30rpx;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.radio {
    color: #666666;
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
