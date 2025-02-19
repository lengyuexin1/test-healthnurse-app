<template>
    <view class="container">
        <bc-page-navbar title="资质规则公示"></bc-page-navbar>
        <view class="article_parse">
            <!--            <rich-text :nodes="data.articledetailsObj.content" ></rich-text>-->
            <view class="content" v-html="data.articledetailsObj.content"></view>
        </view>
        <!-- <view class="content">
            <view class="credtit">平台资质</view>
            <view class="imgbox">
                <block v-for="(item,index) in licences" :key="index">
                    <view class="zitit">{{item.title}}</view>
                    <view class="imgli" @click="seeImg(item.image)">
                        <u--image :showLoading="true" :src="item.image" width="642rpx" height="320rpx" mode="aspectFit"></u--image>
                    </view>
                </block>
            </view>
            <view class="credtit">平台规则</view>
            <view class="credagree">
                <block v-for="(item,index) in articlesList" :key="index">
                    <view class="agreeli row i-center j-between" @click="gotoCredential(item.link,item.title)">
                        <view>{{item.title}}</view>
                        <u-icon name="arrow-right" size="30rpx" color="#BEBEBE"></u-icon>
                    </view>
                </block>
            </view>
        </view> -->
        <!--        <u-safe-bottom></u-safe-bottom>-->
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script lang="ts" setup>
import { getLicence } from '@/api/user-api'
import { reactive, ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import BCNotify from "@/components/notify/index.vue"

interface Data {
    articledetailsObj: any,
    templateCode: string,
    pStyle: any
}

const bcNotify = ref()
const data = reactive<Data>({
    articledetailsObj: {},
    templateCode: '',
    pStyle: {
        div: 'opacity: 1;margin:28rpx 0 28rpx 0;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        p: 'opacity: 1;margin:28rpx 0 28rpx 0;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        span: 'opacity: 1;margin:28rpx 0 28rpx 0;line-height: 56rpx;font-size:32rpx!important;color: #333333;display: block;',
        img: 'width: 100%!important; height: auto;'
    }
})
onLoad((options) => {
    data.templateCode = options.code
    getlicence()
})
const seeImg = (url) => {
    uni.previewImage({
        content: url,
        urls: [url]
    })
}

const getlicence = () => {
    getLicence().then((res: any) => {
        console.log(res)
        data.articledetailsObj = res
    }).catch(err => {
        bcNotify.value.error(err.message)
    })
}
</script>

<style lang="scss" scoped>
.container {
    background: #ffffff;
}


.article_parse {
    min-height: 424rpx;
    // border: 1px solid red;
    margin-bottom: 26rpx;
    background: #ffffff;
    padding: 0rpx 32rpx 24rpx 32rpx;
    box-sizing: border-box;
    border-radius: 0rpx 0rpx 24rpx 24rpx;

    .parse_box {
        line-height: 56rpx;
        font-size: 32rpx !important;
        color: #333333;

        img {
            width: 100%;
            display: block;
        }

        p {
            margin: 42rpx 0rpx 42rpx 0rpx;
            display: block;
        }

        text {
            margin: 42rpx 0rpx 42rpx 0rpx;
            display: block;
        }

        span {
            margin: 42rpx 0rpx 42rpx 0rpx;
            display: block;
        }

        div {
            margin: 42rpx 0rpx 42rpx 0rpx;
            display: block;
        }
    }

    P:nth-child(1) {
        margin-top: 0rpx !important;
    }
}

.content {
    padding: 1rpx 20rpx;

    .credtit {
        padding-left: 16rpx;
        margin: 40rpx 0 20rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
    }

    .imgbox {
        background: #FFFFFF;
        border-radius: 16rpx;
        padding: 30rpx 30rpx 10rpx;
        flex-wrap: wrap;

        .zitit {
            margin-bottom: 16rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: #333333;
        }

        .imgli {
            width: 642rpx;
            height: 320rpx;
            border: 2px solid #EBEBEB;
            border-radius: 8rpx;
            margin-bottom: 40rpx;
        }
    }

    .credagree {
        background: #FFFFFF;
        border-radius: 24rpx;

        .agreeli {
            height: 100rpx;
            padding: 0 30rpx;
            font-size: 30rpx;
            font-weight: 400;
            color: #666666;
            border-bottom: 2rpx solid #F2F2F2;

            &:last-child {
                border-bottom: none;
            }
        }
    }
}
</style>
