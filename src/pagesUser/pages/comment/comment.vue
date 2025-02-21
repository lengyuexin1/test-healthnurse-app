<template>
    <view class="wrap">
        <!-- 服务人员评论 -->
        <view v-if="data.kind != 3">
            <view class="cpmpan_say">
                <text class="cpmpan_tex">服务人员评价</text>
            </view>
            <view class="company">
                <!-- <view class="cpmpan_say"><text class="cpmpan_tex">您对服务人员满意吗？</text></view> -->
                <view class="compan_box">
                    <view class="compan_tab row i-center j-center">
                        <view class="compan_tb_li">
                            <TnButton
                                  :bg-color="data.is_satisfied == 1 ? '#29C86F' : '#7D7D7D'"
                                  :plain="data.is_satisfied == 0"
                                  :border="true"
                                  border-color="#7d7d7d"
                                  @click="btnchange(1)"
                            >
                                <template #default>
                                    <!-- #ifdef MP-WEIXIN -->
                                    <view class="row">
                                        <TnIcon size="36"
                                                :name=" data.is_satisfied == 0 ? '/pagesUser/static/comon/inactive1.png' : '/pagesUser/static/comon/active1.png'"></TnIcon>
                                        <view>满意</view>
                                    </view>
                                    <!-- #endif -->
                                    <!-- #ifdef APP-PLUS || H5 -->
                                    <TnIcon size="36"
                                            :name=" data.is_satisfied == 0 ? '/src/pagesUser/static/comon/inactive1.png' : '/src/pagesUser/static/comon/active1.png'"></TnIcon>
                                    <view>满意</view>
                                    <!-- #endif -->
                                </template>
                            </TnButton>
                        </view>
                        <view class="compan_tb_li">
                            <TnButton
                                  :bg-color="data.is_satisfied == 0 ? '#29C86F' : '#7D7D7D'"
                                  :plain="data.is_satisfied == 1"
                                  :border="true"
                                  border-color="#7d7d7d"
                                  @click="btnchange(0)"
                            >
                                <template #default>
                                    <!-- #ifdef MP-WEIXIN -->
                                    <view class="row">
                                        <TnIcon size="36"
                                                :name="data.is_satisfied == 1 ? '/pagesUser/static/comon/inactive2.png' : '/pagesUser/static/comon/active2.png'"></TnIcon>
                                        <view>不满意</view>
                                    </view>
                                    <!-- #endif -->
                                    <!-- #ifdef APP-PLUS || H5-->
                                    <TnIcon size="36"
                                            :name="data.is_satisfied == 1 ? '/src/pagesUser/static/comon/inactive2.png' : '/src/pagesUser/static/comon/active2.png'"></TnIcon>
                                    <view>不满意</view>
                                    <!-- #endif -->
                                </template>
                            </TnButton>
                        </view>
                    </view>
                    <view class="compan_tag row i-center j-center" v-show="data.is_satisfied == 1">
                        <block v-for="(item, index) in data.satisList[0]" :key="item.id">
                            <view class="compan_tg_li" :class="{ 'select': item.checked }"
                                  @click="checkboxClick(0, index)">{{ item.name }}
                            </view>
                        </block>
                    </view>
                    <view class="compan_tag row i-center j-center" v-show="data.is_satisfied == 0">
                        <block v-for="(item, index) in data.satisList[1]" :key="item.id">
                            <view class="compan_tg_li" :class="{ 'select': item.checked }"
                                  @click="checkboxClick(1, index)">{{ item.name }}
                            </view>
                        </block>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="title">店铺/服务评价</view> -->
        <view class="item tn-flex-column">
            <view class="tn-flex-row">
                <view class="left">
                    <image class="cover" :src="data.orderDetail?.shopList[0]?.entityList[0]?.image" mode="aspectFill"/>
                </view>
                <view class="right tn-flex-column">
                    <view class="title tn-text-ellipsis-2">
                        {{ data.orderDetail?.shopList[0]?.entityList[0]?.title || '--' }}
                    </view>
                    <view class="tn-flex-center-between">
                        <view class="tn-flex-row">
                            <TnRate v-model="data.shopInfo.score" :min="0" :max="5" readonly gutter="0"
                                    activeColor="#FF9F3E" inactive-color="#EBEBEB" size="30rpx" allow-half/>
                            <view class="score">{{ data.shopInfo.score }}分</view>
                        </view>
                        <view class="comment">累计服务
                            <text>{{ data.shopInfo.saleVolume || '--' }}</text>
                            客户
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="title">服务感受</view>
        <view class="content">
            <view class="allRate tn-flex-center-between">
                <view>评分</view>
                <TnRate v-model="data.allRate" :min="0" :max="5" gutter="10" activeColor="#FF9F3E"
                        inactive-color="#EBEBEB" size="lg"/>
            </view>
            <view class="input">
                <TnInput v-model="data.inputValue" :border="false" :maxlength="200" :height="300"
                         :show-word-limit="true" type="textarea"
                         placeholder="请填写你的服务感受，为更多小伙伴做出关键性的决策。"/>
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
import { nextTick, reactive, ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import BCNotify from '@/components/notify/index.vue'
import TnRate from '@tuniao/tnui-vue3-uniapp/components/rate/src/rate.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnButton from "@tuniao/tnui-vue3-uniapp/components/button/src/button.vue"
import imgUpload from '@/components/upload/img-upload.vue'
import BottomSingleBtn from '@/components/bottomSingleBtn/index.vue'
import { getserviceOrderDetail } from '@/api/order-api'
import { getBaseInfo } from '@/api/service-api'
import { gotoCommentSuccess } from '@/routes/user-routes'
import { getCommentTag, getScoreKey, submitComment } from '@/api/user-api'

interface Data {
    orderId: string
    orderDetail: any
    shopInfo: any
    dataLists: any
    is_satisfied:any
    fileList: any
    allRate: number
    taskId: string
    inputValue: string,
    satisList: any[],
    kind: number
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
    taskId: '',
    shopInfo: {},
    dataLists: [],
    fileList: [],
    allRate: 5,
    inputValue: '',
    is_satisfied: 1, //是否满意 1是 0否
    satisList: [],
    kind: 1
})

const bcNotify = ref()

const imgUploadref = ref()

const openUp = () => {
    nextTick(() => {
        console.log('手动调用', imgUploadref, imgUploadref.value)
        imgUploadref.value.chooseFileFun()
    })
}
const btnchange = (type: number) => {
    data.is_satisfied = type
    console.log(data.satisList[type])
}

// 获取陪诊服务标签
const getCommentTags = () => {
    getCommentTag().then(res => {
        const arr0 = res[0].tags.map(x => {
            return {
                ...x,
                checked: false
            }
        })
        const arr1 = res[1].tags.map(x => {
            return {
                ...x,
                checked: false
            }
        })
        if (res[0].name == '满意') {
            data.satisList.push(arr0)
            data.satisList.push(arr1)

        }
        else {
            data.satisList.push(arr1)
            data.satisList.push(arr0)
        }
    })
}

const changeisNext = () => {
    console.log('data.fileList.length', data.fileList.length)
}
const checkboxClick = (inds, name) => {
    data.satisList[inds][name].checked = !data.satisList[inds][name].checked
}
const submit = () => {
    if (!data.inputValue) {
        bcNotify.value.show('请填写服务感受')
        return
    }
    getScoreKey({ templateCodeId: (data.orderDetail.templateCodeId).toString() }).then((res: any) => {
        const scoreOjb = {}
        scoreOjb[res[0].id] = data.allRate

        const tags = {}
        const arr = data.is_satisfied ? data.satisList[0] : data.satisList[1]
        for (const i in arr) {
            if (arr[i].checked) {
                tags[arr[i].name] = arr[i].id
            }
        }
        console.log('服务人员tags', tags)
        // return

        submitComment({
            score: JSON.stringify(scoreOjb),
            tags: JSON.stringify(tags),
            applyId: data.kind == 3 ? 13 : 2,
            anonymity: false,
            taskId: data.taskId,
            applyId: data.shopInfo.applyId,
            evaluates: [
                {
                    entityId: data.orderDetail.shopList[0].entityList[0].entityId,
                    typeId: data.is_satisfied == 1 ? 1 : 2, //1满意 2不满意
                    comment: data.inputValue,
                    images: data.fileList
                }
            ]
        }).then((res: any) => {
            gotoCommentSuccess()
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }).catch(err => {
        throw Error(err)
    })
}

onLoad((option) => {
    data.orderId = option?.id
    data.taskId = option?.taskId || ''
    getserviceOrderDetail({ orderId: data.orderId }).then((res: any) => {
        console.log(res)
        data.orderDetail = res
        data.kind = res.templateCodeId == 131850 ? 3 : 2

        getBaseInfo({ id: res.shopList[0].shopId }).then((res: any) => {
            data.shopInfo = res
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
    getCommentTags()
})

</script>

<style lang="scss" scoped>
:deep(.tn-input) {
    background-color: #F8F8F8;
}

.wrap {
    padding: 30rpx 30rpx 250rpx 30rpx;
}

/* 服务人员
	---------------------------------------*/
.cpmpan_say {
    height: 70rpx;
    // background-color: #FFFAEE;

    .cpmpan_tex {
        // font-size: 28rpx;
        // font-weight: 400;
        // line-height: 70rpx;
        // color: #FF7331;
        // margin: 0 30rpx;

        font-size: 33rpx;
        font-weight: bold;
        color: #333333;
        padding-left: 30rpx;
    }
}

.company {
    padding: 20rpx;
    border-radius: 24rpx;
    height: auto;
    overflow: hidden;
    background-color: #ffffff;
    margin-bottom: 20rpx;

    .compan_box {
        // padding: 40rpx 20rpx 20rpx;
        padding: 20rpx;

        .compan_tab {
            padding-bottom: 40rpx;
            border-bottom: 2rpx solid #f2f2f2;

            .compan_tb_li {
                width: 240rpx;
                height: 80rpx;
                margin: 0 25rpx;

                :deep(.tn-button) {
                    width: 100%;
                    height: 100%;
                    border-radius: 50rpx;
                    line-height: unset
                }

                :deep(.tn-icon--image) {
                    margin-right: 15rpx;
                }
            }
        }

        .compan_tag {
            padding-top: 20rpx;
            flex-wrap: wrap;

            .compan_tg_li {
                margin: 20rpx 24rpx 0 0;
                height: 54rpx;
                background-color: #efefef;
                border-radius: 8rpx;
                padding: 0 24rpx;
                font-size: 26rpx;
                font-weight: 400;
                line-height: 54rpx;
                color: #666666;

                &.select {
                    background-color: #dff5e8;
                    color: #29c86f;
                }
            }
        }
    }
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

.up_box {
    width: 180rpx;
    height: 180rpx;
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .up_text {
        margin-top: 24rpx;
        font-size: 24rpx;
        color: #C9C9C9;
        font-weight: 400;
    }
}

</style>
