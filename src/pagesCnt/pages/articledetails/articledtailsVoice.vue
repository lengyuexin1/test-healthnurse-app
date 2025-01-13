<template>
    <z-paging
        ref="paging" 
		:auto="false"
		:refresher-enabled="false"
    >
        <template #top>
            <bc-page-navbar :title="' '"></bc-page-navbar>
        </template>

        <view class="title_box">
            {{ data.articledObj.title }}
        </view>
        <image 
            class="voice_cover"
            :src="data.articledObj.cover"
            mode="scaleToFill"
        />
        <view class="operate_box">
            <view class="articled_icon_box">
                <view class="articled_icon_item" @click="goback">
                    <image  
                        class="item_img"
                        :src="getAssetsUrl('/leyou/icon/original_icon.svg')"
                        mode="scaleToFill"
                    />
                    <view class="item_text">原文</view>
                </view>

                <view class="articled_icon_item" @click="changeSound">
                    <image  
                        class="item_img"
                        :src="getAssetsUrl('/leyou/icon/sound_icon.svg')"
                        mode="scaleToFill"
                    />
                    <view class="item_text">音色</view>
                </view>

                <view class="articled_icon_item" @click="tolike">
                    <image  
                        class="item_img"
                        :src="data.articledObj.isLike == 1 ? getAssetsUrl('/channel/like_highlight.svg') : getAssetsUrl('/channel/like.svg')"
                        mode="scaleToFill"
                    />
                    <view class="item_text" :class="{ 'like_text' : data.articledObj.isLike == 1 }">{{ data.articledObj.cntLike }}</view>
                </view>

                <view class="articled_icon_item" @click="tocollect">
                    <image  
                        class="item_img"
                        :src="data.articledObj.isFavorite == 1 ? getAssetsUrl('/channel/collect_highlight.svg') : getAssetsUrl('/channel/collect.svg')"
                        mode="scaleToFill"
                    />
                    <view class="item_text" :class="{ 'collect_text' : data.articledObj.isFavorite == 1 }">{{ data.articledObj.cntCollect }}</view>
                </view>
            </view>
            <view class="slider_box">
                <!-- :disabled="data.disabled" -->
                <TnSlider v-model="data.sliderValue" :min="0"  :max="data.maxsliderValue" size="sm" active-color="#EA3E1A" inactive-color="#FFD7CF"/>
                <!-- <slider :value="data.sliderValue" :min="0" :max="data.maxsliderValue" activeColor="#EA3E1A" backgroundColor="#FFD7CF" block-color="#EA3E1A"></slider> -->
                
                <view class="cover_box"></view>
            </view>

            <view class="slider_number_box">
                <view class="slider_number">
                    <TnCountDown :time="data.sliderValue" separator-mode="en" :auto-start="false" text-color="#999999" :show-hour="false" />
                </view>
                <view class="slider_number">
                    <TnCountDown :time="data.maxsliderValue" separator-mode="en" :auto-start="false" text-color="#999999" :show-hour="false"/>
                </view>
            </view>

            <!--  @click="playVoice" -->
            <view class="play_box">
                <image
                    @click="changeTime(false)"
                    class="voice_icon"
                    :src="getAssetsUrl('/leyou/icon/voice_back.svg')"
                    mode="scaleToFill"
                />
                <!-- /leyou/icon/voice_play.svg -->
                <image
                    @click="changePlay"
                    class="play_icon"
                    :src=" data.isplay ? getAssetsUrl('/leyou/icon/voice_play.svg') : getAssetsUrl('/leyou/icon/voice_pause.svg')"
                    mode="scaleToFill"
                />
                <image
                    @click="changeTime(true)"
                    class="voice_icon"
                    :src="getAssetsUrl('/leyou/icon/voice_front.svg')"
                    mode="scaleToFill"
                />

                
            </view>
        </view>
        

        <BCNotify ref="bcNotify"></BCNotify>
        
    </z-paging>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'


import { getAssetsPic } from '@/common/setPicture'

import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnSlider from '@tuniao/tnui-vue3-uniapp/components/slider/src/slider.vue'
import TnCountDown from '@tuniao/tnui-vue3-uniapp/components/count-down/src/count-down.vue'


import BCNotify from '@/components/notify/index.vue'
import { 
        getnewContentDetail, 
        getnewLike,
        unnewLike,
        unnewFavorite,
        newfavorite,
        voiceContentListen,
        getaudioList,
    } from '@/api/create-api'
import { PlatformManage } from "@bc/sys"

// import { getVoiceFile } from '@/common/getvoiceToken'
import { Throttler } from '@/libs/antivibthrot'
import { dispatchWEvent } from '@/events/event-registry'
import { CareEvents } from '@/events/care-events'

interface Data{
    articledId: string
    articledObj: any
    sliderValue: number
    maxsliderValue: number
    disabled: boolean
    isplay: boolean
    voiceNumber: number
}

const data = reactive<Data>({
    articledId: '',
    articledObj: {},
    sliderValue: 0,
    maxsliderValue: 0,
    disabled: false,
    isplay: false,
    voiceNumber: 0

})



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const bcNotify = ref()


// 创建播报实例
const innerAudioContext = uni.createInnerAudioContext();

onLoad((option:any)=>{
    data.articledId = option.articledId
    data.voiceNumber = option.voiceNumber
    
    PlatformManage.isRequireLogin().then((isRequireLogin) => {
        getnewContentDetail({
            id: data.articledId
        },isRequireLogin).then((res:any) =>{
            data.articledObj = res

            data.articledObj.cntLike = Math.floor(Math.random() * 900) + 100
            data.articledObj.cntCollect = Math.floor(Math.random() * 900) + 100

        })
    })

    getaudioList({
        articleId: option.articledId
    }).then((res:any) => {
        saveSrc(res)
    })

    


    

})

// 卸载播报
onUnload(()=>{
    console.log('页面关闭');
    // delVoice()
    innerAudioContext.pause()
    innerAudioContext.destroy()

    const currentTime = Math.floor(innerAudioContext.currentTime);;
    uni.setStorageSync('pageVoice', {
        isShow: true,
        currentTime: currentTime,
        voiceSrc: innerAudioContext.src
    })
    console.log('当前播放时间：', currentTime);


    // Throttle(() => {
	// 	dispatchWEvent(CareEvents.Get__Address, item)
	// 	pageController.back()
	// }, 800)

})

onMounted(()=>{
    voiceContentListen({id: data.articledId}).then(()=>{})
})


// 获取到播报事件以及参数
const saveSrc = (e:any) => {
    console.log('e11',e);
    

    innerAudioContext.autoplay = true;
    innerAudioContext.src = e[0].audioUrl;

    console.log('data.voiceNumber',data.voiceNumber);
    
    if (data.voiceNumber) {
        console.log('指定时间播报');
        
        // innerAudioContext.startTime = data.voiceNumber;
        // innerAudioContext.seek(data.voiceNumber)
    }

    
}

// 监听开始播报
innerAudioContext.onPlay(() => {
    data.isplay = true

    // 获取音频总时长
    data.maxsliderValue = Math.floor(innerAudioContext.duration)
});


// 创建 Throttler 实例，每秒只执行一次
const throttler = new Throttler(1000);

// 监听实时播报
innerAudioContext.onTimeUpdate((e:any) => {
    // console.log('innerAudioContext',innerAudioContext);

    // 获取音频总时长
    data.maxsliderValue = Math.floor(innerAudioContext.duration)

    data.sliderValue = Math.floor(innerAudioContext.currentTime);
    console.log("播报实时监听", data.sliderValue);

    // 检查是否达到最大滑动值
    if (data.sliderValue >= data.maxsliderValue) {
        data.isplay = false;
        data.sliderValue = data.maxsliderValue;
        innerAudioContext.pause();
        console.log("自动停止播放");
    }
    
    
    // throttler.execute(() => {
        
    //     // uni.hideLoading();

    //     data.sliderValue += 1;

    //     console.log("播报实时监听", data.sliderValue);

    //     // 检查是否达到最大滑动值
    //     if (data.sliderValue >= data.maxsliderValue) {
    //         data.isplay = false;
    //         data.sliderValue = data.maxsliderValue;

    //         innerAudioContext.pause();

    //         console.log("自动停止播放");
    //     }
    // });

})

// 播报停止
innerAudioContext.onStop(()=>{
    console.log('播报停止');
    
})

// 播报暂停
innerAudioContext.onPause(()=>{
    console.log('播报暂停',data.sliderValue);
    // data.isplay = false
    // innerAudioContext.pause()
})


// 切换播报状态
const changePlay = () => {
    console.log(111111111111);
    
    if (data.isplay) {
        console.log('切换暂停');
        
        // 切换暂停
        data.isplay = false
        innerAudioContext.pause()


    }else{
        console.log('切换播放');
        // 切换播放
        data.isplay = true
        
        if (data.sliderValue >= data.maxsliderValue) {
            data.sliderValue = 0
            innerAudioContext.seek(0)
        }
        innerAudioContext.play()

    }

    console.log('data.sliderValue',data.sliderValue);

}

const changeTime = (isadd : boolean) => {

    let time = 3

    if (isadd) {
        data.sliderValue = data.sliderValue + time

        if (data.sliderValue > data.maxsliderValue) {
            data.sliderValue = data.maxsliderValue
        }


    }else{
        data.sliderValue = data.sliderValue - time
        
        if (data.sliderValue < 0) {
            data.sliderValue = 0

        }
    }

    innerAudioContext.seek(data.sliderValue)


}

// 返回原文
const goback = () => {
    uni.navigateBack()
}

// 点赞 
const tolike = () => {
    
    console.log('123');
    

    if (!data.articledObj.accountId || data.articledObj.status == 4) {
        return
    }

    console.log('465');
    

    if (data.articledObj.isLike == 1) {
        unnewLike({
            articleIds: [data.articledId],
            happyType: 98,
        }).then(() => {
            data.articledObj.cntLike --
            data.articledObj.isLike = 0
        })
    }
    else {
        getnewLike({
            articleId: data.articledId,
            happyType: 98,
        }).then(() => {
            data.articledObj.cntLike ++
            data.articledObj.isLike = 1

        })
    }
}

const tocollect = () => {
    if (!data.articledObj.accountId || data.articledObj.status == 4) {
        return
    }
    if (data.articledObj.isFavorite == 1) {
        unnewFavorite({
            articleId: [data.articledId],
            happyType: 98,

        }).then(() => {
            // bcNotify.value.show('取消收藏')
            data.articledObj.cntCollect --
            data.articledObj.isFavorite = 0

        })
    }
    else {
        newfavorite({
            articleId: data.articledId,
            happyType: 98,

        }).then(() => {
            // bcNotify.value.show('收藏成功')
            data.articledObj.cntCollect ++
            data.articledObj.isFavorite = 1


        })
    }
}

const changeSound = () => {
    bcNotify.value.show('敬请期待')
}




</script>

<style lang="scss" scoped>
.title_box{
    width: 100%;
    text-align: center;
    padding: 24rpx;
    font-weight: 500;
    font-size: 40rpx;
    color: #333333;
}
.voice_cover{
    width: 750rpx;
    height: 750rpx;
    margin-bottom: 60rpx;
}
.operate_box{
    width: 100%;
    padding: 0rpx 40rpx;
    box-sizing: border-box;
    .articled_icon_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rpx 60rpx;
        box-sizing: border-box;
        margin-bottom: 38rpx;


        .articled_icon_item{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .item_img{
                width: 56rpx;
                height: 56rpx;
                margin-bottom: 8rpx;
            }
            .item_text{
                font-weight: 400;
                color: #666666;
                font-size: 24rpx;
                &.like_text{
                    color: #EA3E1A;
                }
                &.collect_text{
                    color: #FFA723;
                }
            }
        }

    }
    .slider_box{
        position: relative;
        margin-bottom: 14rpx;
        .cover_box{
            position: absolute;
            width: 100%;
            height: 30rpx;
            top: -50%;
            left: 0;
        }
    }
    .slider_number_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30rpx;
    }
    .play_box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .voice_icon{
            width: 40rpx;
            height: 34rpx;
        }
        .play_icon{
            width: 108rpx;
            height: 108rpx;
            margin: 0rpx 80rpx;
        }
    }
}




</style>
<style>
page{
    background: #fff;
}
</style>
