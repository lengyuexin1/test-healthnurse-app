<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'售后详细记录'"></bc-page-navbar>
            </template>
		    <view class="minubox">
                <view class="minuli" v-for="(item,index) in data.log" :key="index">
                    <view class="minutype row i-center">
                        <image
                            class="minutype_img"
                            :src="statusIcon(item.statusId)"
                            mode="aspectFill"
                        />
                        <view class="minurig">
                            <view class="minutit u-line-1">{{item.feedback}}</view>
                            <view class="minutime">{{ timeformat(item.utcCreated) }}</view>
                        </view>
                    </view>
                    <view class="bumbox" v-if="item.images.length > 0">
                        <TnPhotoAlbum :data="item.images" :column="4" :max="500" img-mode="aspectFit" />
                    </view>
                    <view class="minudesc" v-if="item.note">{{item.note}}</view>
                </view>
            </view>

            

    		<BCNotify ref="bcNotify"></BCNotify>
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { formattime } from '@/common/formatTime'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'

import { getSaleLog } from '@/api/order-api'

interface Props {
    id:string,
}
const props = defineProps<Props>()

interface Data {
    log:any,
    detail:any,
}
const data = reactive<Data>({
    log:[],
    detail:null,
})


const bcNotify = ref()

const timeformat = computed(()=>(time:number)=>{
    return formattime(time,'YYYY-MM-DD HH:mm')
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const statusIcon = computed(()=>(statusId:number)=>{
    const status = {
        10: '/sales/salea_icon_xg.png',
        30: '/sales/salea_icon_xg.png',
        10000010: '/sales/salea_icon_tj.png',
        10000030: '/sales/salea_icon_jg.png',
        10000050: '/sales/salea_icon_jg.png',
        20000011: '/sales/salea_icon_tj.png',
        20000050: '/sales/salea_icon_tj.png',
        39999990: '/sales/salea_icon_jj.png',
        40000010: '/sales/salea_icon_cg.png',
        40000050: '/sales/salea_icon_cg.png',
        41000010: '/sales/salea_icon_zc.png',
        41000020: '/sales/salea_icon_xg.png',
        41000030: '/sales/salea_icon_dd.png',
        41999950: '/sales/salea_icon_jg.png',
        41999990: '/sales/salea_icon_jg.png',
        49999990: '/sales/salea_icon_jj.png',
        50000000: '/sales/salea_icon_wc.png'
    }
    return getAssetsPic(status[statusId] ? status[statusId] : '/sales/salea_icon_xg.png')
})


onMounted(()=>{

    getSaleLog({
        id: props.id
    }).then((res:any)=>{
        data.log = res
    }).catch((err:any) => {
        bcNotify.value.error(err.message)

    })

})


</script>
  
<style lang="scss" scoped>
.container{
    .minubox{
        padding: 20rpx;
    }
    .minuli{
        margin-bottom: 20rpx;
        padding: 30rpx;
        background: #FFFFFF;
        border-radius: 24rpx;
        .minutype{
            .minutype_img{
                width: 88rpx;
                height: 88rpx;
            }
            .minurig{
                flex: 1;
                padding-left: 16rpx;
                .minutit{
                    font-size: 28rpx;
                    font-weight: 500;
                    line-height: 42rpx;
                    color: #333333;
                }
                .minutime{
                    font-size: 24rpx;
                    font-weight: 400;
                    line-height: 34rpx;
                    color: #999999;
                }
            }
        }
        .bumbox{
            margin-top: 20rpx;
        }
        .minudesc{
            background: #F8F8F8;
            border-radius: 8rpx;
            padding: 18rpx;
            margin-top: 20rpx;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 36rpx;
            color: #666666;
            word-wrap:break-word;
            word-break: break-all;
        }
    }
}
</style>
  