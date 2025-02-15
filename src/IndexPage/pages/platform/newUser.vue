<template>
    <view class="container">
        <z-paging ref="paging" :auto="false" :refresher-enabled="false" @scroll="scrollPage">
            <template #top>
                <PageTopbg bgstyle="background: transparent;"></PageTopbg>
                <customNavbar pageTitle="新人特惠"></customNavbar>
            </template>
            <view class="indexImg">
                <image class="towPro_img" :src="getAssetsUrl('/device/home/newUserwe.png')" mode="scaleToFill" />
            </view>
            <view class="space_box"></view>
            <view class="btns">
                <view class="btnItem" @click="tapArt(item, index)" :class="{ 'acticol': curret == index }"
                    v-for="(item, index) in artList">{{ item.text }}</view>
            </view>
            <view class="qianUse" v-for="(items, index) in artList" :key="index" :id="items.id">
                <view class="qianTitle">
                    <view>{{ items.text }}</view>
                </view>
                <view class="qianUl">
                    <view class="quanLi" v-for="(item, index) in qianList" :key="index">
                        <view>
                            <view class="groupMon">
                                <view class="ecad">￥</view>
                                <view class="numMoney">{{ item.money }}</view>
                            </view>
                            <view class="whereUse">{{ item.text }}</view>
                        </view>
                        <view class="syuas">
                            <view class="lineBox">
                                <view class="zonr1"></view>
                                <view class="lineDa"></view>
                                <view class="zonr2"></view>
                            </view>
                        </view>
                        <view class="noget" v-if="item.isUse == 1">领取</view>
                        <view class="noget alseUse" v-else>领取</view>
                    </view>
                </view>
                <view class="qianGoods">
                    <view class="goodsList" v-for="(item, index) in qianList" :key="index">
                        <view class="goodsTitle">智能中控屏平板</view>
                        <view class="goodsCont">
                            <view class="goodsLeft">
                                <view class="goodsName">全屋监控</view>
                                <view>
                                    <view class="finalMony">￥899</view>
                                    <view class="realMony">￥1358</view>
                                </view>
                            </view>
                            <image class="towPro_img" :src="getAssetsUrl('/device/home/newUserwe.png')"
                                mode="scaleToFill" />
                        </view>
                    </view>
                </view>
            </view>
        </z-paging>
    </view>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import { getAssetsPic } from '@/common/setPicture'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'

const paging = ref()
const imgStyle = ref('opacity: 1')
const closeImg = ref(true)
const artList = ref([
    {
        text: '用券专区', list: [
            { money: 10, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 40, text: '限部分商品可用', isUse: 2 }
        ],
        id: 'nes1'
    },
    {
        text: '新人专区', list: [
            { money: 10, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 30, text: '限部分商品可用', isUse: 1 },
            { money: 40, text: '限部分商品可用', isUse: 2 }
        ],
        id: 'nes2'
    }
])
const btnList = ref([
    { text: '用券专区' },
    { text: '新人特惠' }
])
const qianList = ref([
    { money: 10, text: '限部分商品可用', isUse: 1 },
    { money: 30, text: '限部分商品可用', isUse: 1 },
    { money: 30, text: '限部分商品可用', isUse: 1 },
    { money: 30, text: '限部分商品可用', isUse: 1 },
    { money: 40, text: '限部分商品可用', isUse: 2 }
])
const scrollPage = (e: any) => {
    const opacity = e.detail.scrollTop / 30
    closeImg.value = true
    if (e.detail.scrollTop < 30) {
        return imgStyle.value = 'opacity: 1'
    }
    if (opacity > 1) {
        imgStyle.value = 'opacity: 0'
        closeImg.value = false
        return
    }
    imgStyle.value = `opacity: ${opacity}`
}
const curret = ref(0)
const getAssetsUrl = computed(() => (src: string) => {
    return getAssetsPic(src)
})
const tapArt = (item: any, index: number) => {
    if (index == 1) {
        paging.value.scrollIntoViewById(item.id, 200)
    }
    curret.value = index

}
</script>
<style lang="scss" scoped>
.indexImg {
    width: 100%;
    height: 500rpx;
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 99;

    .towPro_img {
        width: 100%;
        height: 500rpx;
    }
}

.btns {
    margin-top: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .btnItem {
        background: #E7E8EA;
        font-size: 28rpx;
        color: #333333;
        border-radius: 30rpx;
        padding: 16rpx 32rpx;
        margin-right: 40rpx;
    }

    .acticol {
        background: #18181A;
        color: #FFFFFF;
    }
}

// .space_box {
//     width: 100%;
//     height: 350rpx;
// }

.qianUse {
    margin: 60rpx 0 40rpx 0;

    .qianTitle {
        display: flex;
        justify-content: center;
        font-weight: 600;
        font-size: 32rpx;
        color: #020202;
        margin-bottom: 40rpx;
    }

    .qianUl {
        margin: 0 20rpx;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 16rpx;

        .quanLi {
            position: relative;
            height: 240rpx;
            border-radius: 24rpx;
            background: #fff;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            padding: 20rpx;

            .groupMon {
                display: flex;
                align-items: center;
                justify-content: center;

                .ecad {
                    font-weight: 600;
                    font-size: 28rpx;
                    color: #000000;
                }

                .numMoney {
                    font-weight: 600;
                    font-size: 48rpx;
                    color: #000000;
                }
            }

            .whereUse {
                font-size: 24rpx;
                color: #666666;
                margin-top: 10rpx;
            }

            .noget {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28rpx;
                color: #333333;
                width: 108rpx;
                height: 52rpx;
                background: #FFFFFF;
                border-radius: 28rpx 28rpx 28rpx 28rpx;
                border: 2rpx solid #585858;
            }

            .alseUse {
                background: #333333;
                color: #FFFFFF;
            }

            .syuas {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                .lineBox {
                    width: 100%;
                    display: flex;

                    .zonr1 {
                        width: 20rpx;
                        height: 20rpx;
                        background: #F1F3F5;
                        border-radius: 50%;
                        margin-left: -30rpx;
                    }

                    .lineDa {
                        height: 0rpx;
                        margin: 10rpx auto;
                        width: 90%;
                        border-bottom: 2rpx dashed #DBDBDB;
                    }

                    .zonr2 {
                        width: 20rpx;
                        height: 20rpx;
                        background: #F1F3F5;
                        border-radius: 50%;
                        margin-right: -30rpx;
                    }
                }
            }
        }
    }

    .qianGoods {
        margin: 30rpx 20rpx 0 20rpx;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16rpx;

        .goodsList {
            background: #fff;
            border-radius: 24rpx;
            height: 290rpx;
            padding: 24rpx;
            box-sizing: border-box;

            .towPro_img {
                width: 160rpx;
                height: 160rpx;
            }

            .goodsCont {
                display: flex;
                margin-top: 20rpx;
                justify-content: space-between;
            }

            .goodsTitle {
                font-weight: 600;
                font-size: 28rpx;
                color: #020202;
            }

            .goodsLeft {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .finalMony {
                    font-weight: 600;
                    font-size: 28rpx;
                    color: #000000;
                }

                .realMony {
                    font-size: 20rpx;
                    color: #999999;
                }
            }

            .goodsName {
                font-size: 20rpx;
                color: #666666;
            }
        }
    }
}
</style>