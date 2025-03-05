<template>
    <view class="entry row j-between">
        <block v-for="item in list" :key="item.id">
            <view class="entbox" @click="navArticleDetail(item.id)">
                <view class="entimg">
                    <u-image width="348rpx" height="348rpx" radius="16rpx 16rpx 0rpx 0rpx" :src="item.thumb || item.videoUrl + '?spm=qipa250&x-oss-process=video/snapshot,t_7000,f_jpg,w_400,h_0,m_fast'" bgColor="#FFFFFF" mode="aspectFill">
                        <view slot="error" class="enterr row i-center j-center">
                            <u-icon name="error-circle" size="44rpx" color="#606266"></u-icon>
                        </view>
                    </u-image>
                    <view class="entpay">
                        <u-image :src="getAssetsUrl('/channel/play_icon.png')" width="32rpx" height="32rpx" radius="32rpx"></u-image>
                    </view>
                </view>
                <view class="entinfo">
                    <!-- <u-parse :content="item.name"></u-parse> -->
                    <view class="entname u-line-2"><u-parse :tagStyle="pStyle" :content="item.name"></u-parse></view>
                    <view class="entmore">
                        <!-- <view class="entauthor row i-center">
                            <u-image :src="item.authorAvatar" width="32rpx" height="32rpx" radius="32rpx"></u-image>
                            <view class="autname u-line-1">{{item.authorName}}</view>
                        </view> -->
                        <view class="entzan row i-center">
                            <u-image :src="getAssetsUrl('/channel/like.svg')" width="26rpx" height="26rpx" radius="26rpx"></u-image>
                            <view class="zannum">{{item.cntLike || 0}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
import { gotoArticledetails } from '@/routes/plateform-routes' // 文章详情
import { getAssetsPic } from '@/common/setPicture.js'
export default {
    naem: 'videoSearch',
    data() {
        return {
            pStyle: {
                p: `overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;`
            }
        }
    },
    props: {
        list: Array
    },
    computed: {
        getAssetsUrl() {
            return (str) => {
                return getAssetsPic(str)
            }
        }
    },
    methods: {
        navArticleDetail(id) {
            gotoArticledetails(id)
        }
    }
}
</script>

<style lang="scss" scoped>
.entry{
    flex-wrap: wrap;
    .entbox{
        width: 348rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        overflow: hidden;
        margin-bottom: 14rpx;

        .entimg{
            position: relative;
            .enterr{
                width: 348rpx;
                height: 348rpx;
                background-color: #dee0e4;
            }
            .entpay{
                position: absolute;
                top: 20rpx;
                right: 20rpx;
                z-index: 30;
            }
        }
        .entinfo{
            padding: 20rpx;
            .entname{
                font-size: 30rpx;
                font-weight: bold;
                line-height: 42rpx;
                color: #333333;
                width: 300rpx;
            }
            .entmore{
                margin-top: 32rpx;
                .entauthor{
                    margin-right: 30rpx;
                    .autname{
                        font-size: 22rpx;
                        font-weight: 400;
                        color: #9F9F9F;
                        margin-left: 8rpx;
                    }
                }
                .entzan{
                    flex-shrink: 0;
                    .zannum{
                        margin-left: 6rpx;
                        font-size: 22rpx;
                        font-weight: 400;
                        color: #9E9E9E;
                    }
                }
            }
        }
    }
}
</style>
