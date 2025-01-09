<template>
    <view class="container">
        <z-paging-swiper :auto="false">
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="data.stateNumber == 1 ? 'background: #fff;' : 'background: linear-gradient(180deg, #FDD9CD 0%, #F2F3F5 100%);' "></pageTopbg>
                <bc-page-navbar :title=" '附近  ' " ></bc-page-navbar>
                <view class="top_box" >
                    <view class="top_swiper">
                        <TnTabs 
                        v-model="data.currentTabIndex" 
                        :scroll="false" 
                        :bottom-shadow="false"
                        font-size="28"
                        active-font-size="32"
                        bar-color="#EA3E1A"
                        active-color="#333333">
                            <TnTabsItem
                            v-for="(item, index) in data.tabsData"
                            :key="index"
                            :title="item.text"
                            @click="changeTab(item,index)"
                            color="#888888"
                            active-color="#333333"
                            />
                        </TnTabs>
                    </view>
                </view>
            </template>

            <view class="swiper_page">
                <swiper class="swiper" :current="data.currentTabIndex" @change="changeSwiper">
                    <swiper-item>
                       <enclosureLife :lat="data.mylat" :lng="data.mylng" :showIocation="data.showIocation"></enclosureLife>
                    </swiper-item>
                    <swiper-item>
                        <enclosurePeople :lat="data.mylat" :lng="data.mylng" :showIocation="data.showIocation"></enclosurePeople>
                    </swiper-item>
			    </swiper>


            </view>

        </z-paging-swiper>
    </view>
    <TnPopup v-model="data.IocationSet" :overlay-closeable="false">
        <view class="Iocation_box" v-if="data.IocationSet">
            <image
                class="Iocation_img"
                :src="getAssetsUrl('/leyou/goods/Iocation_icon.svg')"
                mode="scaleToFill"
            />
            <view class="Iocation_title">开启定位功能</view>
            <view class="Iocation_text">寻找周边的吃喝玩乐，需要开启定位功能才能正常使用。</view>
            <view class="setIocation_btn" @click="setIocation">设置定位</view>
            <view class="cancel_btn" @click="cancel">暂不设置</view>
        </view>
    </TnPopup>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, nextTick } from 'vue'
import { onLoad, onShow, onBackPress } from '@dcloudio/uni-app'
import { getAssetsPic } from '@/common/setPicture'

import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

import pageTopbg from '@/components/page-topbg/page-topbg.vue'

import enclosurePeople from './components/enclosurePeople.vue'
import enclosureLife from './components/enclosureLife.vue'

import { Postlocation } from '@/api/user-api'

interface Data {
    currentTabIndex:number,
    stateNumber: number,
    tabsData:any,
    showIocation: boolean,
    IocationSet: boolean,
    mylat: number,
    mylng: number,
}

const data = reactive<Data>({
    currentTabIndex:0,
    stateNumber: 1,
    tabsData:[
        {id: 1, text: '附近生活'},
        {id: 2, text: '附近的人'},
    ],
    showIocation : false,
    IocationSet: false,
    mylat: 0,
    mylng: 0,

})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(()=>{
    
})

onLoad((options:any) => {
    console.log('1');
    setTimeout(()=>{
        getauthorize()
    },800)
})

onShow( async ()=>{
    console.log('2');
    await getauthorize()
})

const getauthorize = async () => {
    // 获取小程序中授权情况
    uni.authorize({
        scope: 'scope.userLocation',
        fail: (res) => {
            console.log('未获取权限,');
            setTimeout(()=>{
                data.IocationSet = true
                console.log('data.IocationSet1',data.IocationSet);
            },3000)
        },
        success: () => {
            console.log('已获取权限');
            setTimeout(()=>{
                data.IocationSet = false
                console.log('data.IocationSet2',data.IocationSet);

            },3000)
            getDistancesfun().then((res:any) => {
                data.mylat = res.lat
                data.mylng = res.lng
                data.showIocation = true
                Postlocation({
                    lng: res.lng,
                    lat: res.lat,
                }).then(()=>{
                    console.log('data.mylat',data.mylat);
                    console.log('data.mylng',data.mylng);
                })

            }).catch(()=>{
                data.showIocation = false
            })
        },
    })
}

const changeTab = (item: any, index: number) => {
    
}

const changeSwiper = (e:any)=>{
    data.currentTabIndex = e.detail.current
}

const cancel = () => {
    data.IocationSet = false
    data.showIocation = false
}

const setIocation = () => {
    // #ifdef APP-PLUS
     uni.openAppAuthorizeSetting({
        success (res: any) {
            console.log(res)
        }
    })
    // #endif
    

    // #ifdef MP-WEIXIN
    uni.openSetting({
        success(res) {
            console.log(res.authSetting)
        }
    });
    // #endif

}

const getDistancesfun = () => {
    // 能获取到手机系统中授权的状态
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: "gcj02",
            isHighAccuracy: true,
            success: (res) => {
                setTimeout(()=>{
                    data.IocationSet = false
                    console.log('data.IocationSet33',data.IocationSet);

                },3000)
                console.log("定位成功")
                resolve({
                    lat: res.latitude,
                    lng: res.longitude
                })
            },
            fail: (err) => {
                data.showIocation = false
                setTimeout(()=>{
                    data.IocationSet = true
                    console.log('data.IocationSet4',data.IocationSet);

                },3000)
                console.log("定位失败")
                reject(err)
            }
        })
    })
}

</script>

<style>
page{
    background: #F8F8F8;
}
</style>

<style lang="scss" scoped>
.swiper_page{
    width: 100%;
    height: 100%;
    .swiper {
        flex: 1;
        height: 100%;
    }
}
.Iocation_box{
    width: 540rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .Iocation_img{
        width: 256rpx;
        height: 256rpx;
        margin-bottom: 12rpx;
    }
    .Iocation_title{
        font-weight: 600;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 8rpx;
    }
    .Iocation_text{
        width: 392rpx;
        text-align: center;
        font-weight: 400;
        font-size: 28rpx;
        color: #616161;
        margin-bottom: 40rpx;
    }
    .setIocation_btn{
        width: 100%;
        height: 84rpx;
        line-height: 84rpx;
        text-align: center;
        border-radius: 42rpx;
        background: #EA3E1A;
        font-weight: 400;
        font-size: 28rpx;
        color: #FFFFFF;
        margin-bottom: 32rpx;
    }
    .cancel_btn{
        font-weight: 400;
        font-size: 32rpx;
        color: #666666;
    }
}

.top_box{
    border-bottom: 2rpx solid #F2F2F2;
}
</style>