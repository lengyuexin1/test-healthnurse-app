<template>
    <view class="container">
        <z-paging-swiper>
            <template #top>
                <view id="pageTop" class="top_box">
                    <bc-page-navbar :title="'创作者中心'"></bc-page-navbar>
                    <view class="top_swiper">
                        <TnTabs
                              v-model="data.current" :scroll="false" :bottom-shadow="false" color="#666666"
                              active-color="#333333" font-size="28rpx" active-font-size="30rpx" bar-color="#EA3E1A">
                            <TnTabsItem v-for="(item, index) in data.navList" :key="index" :title="item.name"/>
                        </TnTabs>
                    </view>
                </view>
            </template>

            <swiper class="swiper" :current="data.current" @change="onswiperchange">
                <swiper-item>
                    <upArticleswiper :categoryId="data.categoryId" :topic="data.topic" :isDratType="data.isDratType"
                                     :articleId="data.articleId" :activityId="data.activityId" :taskId="data.taskId"
                                     :type="data.type"
                                     v-if="data.current == 0"></upArticleswiper>
                </swiper-item>
                <swiper-item>
                    <upVideoswiper :categoryId="data.categoryId" :topic="data.topic" :isDratType="data.isDratType"
                                   :articleId="data.articleId" :activityId="data.activityId" :taskId="data.taskId"
                                   :type="data.type"
                                                       v-if="data.current == 1"></upVideoswiper>
                </swiper-item>
            </swiper>
        </z-paging-swiper>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script lang="ts" setup>
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import upArticleswiper from '@/pagesCnt/components/upArticleswiper/upArticleswiper.vue'
import upVideoswiper from '@/pagesCnt/components/upVideoswiper/upVideoswiper.vue'
import { addContentAccount } from "@/api/create-api"
import { reactive, ref } from "vue"
import { onLoad } from '@dcloudio/uni-app'
import BCNotify from "@/components/notify/index.vue"

const bcNotify = ref()

interface Data {
    current: number,
    navList: any[],
    isDratType: string,
    articleId: string,
    activityId: string,
    taskId: string,
    categoryId: string,
    topic: string,
    type: number
}

const data = reactive<Data>({
    topic: '',
    current: 0,
    categoryId: '',
    navList: [
        { id: 1, name: '图文' },
        { id: 2, name: '视频' }
    ],
    isDratType: '',
    activityId: '',
    taskId: "",
    articleId: '',
    type: 0
})
onLoad((options) => {
    data.articleId = options?.articleId
    data.activityId = options?.activityId
    data.taskId = options?.taskId
    data.categoryId = options?.categoryId
    data.type = Number(options?.type)
    data.isDratType = options.isDratType
    data.topic = options?.keyword
    if (options?.type == 2) {
        data.current = 1
    }
    else if (options?.type == 3) {
        data.current = 0
    }
    addContentAccount({}).then(() => {

    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
})

const goback = () => {
    uni.navigateBack({ delta: 1 })
}
const tabsChange = (e: any) => {
    data.current = e.index
}
const onswiperchange = (e: any) => {
    data.current = e.detail.current
}
</script>


<style lang="scss" scoped>
page{
    background: #ffffff;
}
.top_box {
    background: #ffffff;
    border-bottom: 2rpx solid #f2f2f2;

    .top_swiper {
        padding-left: 20rpx;
        box-sizing: border-box;
        width: 100%;
    }
}

.swiper {
    flex: 1;
    height: 100%;
}

::v-deep .u-textarea__field {
    height: 400rpx !important;
}

.draftoverlay_box {
    width: 580rpx;
    height: 265rpx;
    background: #ffffff;
    border-radius: 28rpx;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .draftoverlay_box_text {
        font-size: 32rpx;
        font-weight: 400;
        color: #333333;
    }

    .draftoverlay_boxbtn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: 40rpx;
        left: 0;
        width: 100%;
        padding: 0rpx 20rpx;
        box-sizing: border-box;

        .btn {
            width: 250rpx;
            height: 80rpx;
            border-radius: 42rpx;
            font-weight: 500;
            font-size: 28rpx;
            text-align: center;
            line-height: 80rpx;

            &.back {
                color: #333333;
                background: #ffffff;
                border: 2rpx solid #d4d4d4;
            }

            &.save {
                color: #ffffff;
                background: #29c86f;
                border: 2rpx solid #29c86f;
            }
        }
    }
}
</style>
