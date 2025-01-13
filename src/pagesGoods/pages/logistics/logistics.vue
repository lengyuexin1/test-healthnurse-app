<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'物流信息'"></bc-page-navbar>
            </template>
            <template v-if="!data.emptyExpre">
                <block v-for="(ele,els) in data.expressInfo" :key="els">
                    <view class="contbox">
                        <view class="log_head">
                            <view class="log_hed_li row i-center j-between">
                                <view><text class="log_hed_tit">{{ele.com}}</text>
                                <text class="log_hed_tex">{{ele.nu}}</text></view>
                                <view class="log_hed_copy row i-center j-center" @click="fuzhi(ele.nu)">复制</view>
                            </view>
                        </view>
                        <view class="log_content">
                            <view class="zong">
                                <view class="user_box" style="width: 100%; margin: 40rpx auto;">
                                    <view class="user_for" v-for="(list,id) in ele.data" :key="id">
                                        <view class="line_box">
                                            <!-- 圆球 -->
                                            <view class="line_radio" :style="{ 'background' : id == 0 ? '#ef6f16' : '#8e8b8d' , 'border' : id == 0 ? 'solid 6rpx #fbc293' : 'solid 6rpx #b9b7b6'}"></view>
                                            <!-- 线 -->
                                            <view class="line_for" v-for="item in 3" :key="item" :style="{ 'background' : id == 0 ? '#ef6f16' : '#8e8b8d'}"></view>
                                        </view>
                                        
                                        <view class="right_box"  :style="{ 'color' : id == 0 ? '#ef6f16' : '#8e8b8d'}">
                                            <view class="title">{{list.context}} </view>
                                            <view class="desc">
                                                {{ list.ftime }}
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </template>
            <template v-else>
                <TnEmpty mode="data">
                    <template #icon>
                        <image :src="getAssetsUrl('/empty/empty_icon_data.png')" />
                    </template>
                    <template #tips>还找不到物流哦</template>
                </TnEmpty>      
                
            </template>
            

		    <BCNotify ref="bcNotify"></BCNotify>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { realtimeLookExpress } from '@/api/goods-api'
import { onLoad, onReady } from '@dcloudio/uni-app'

import TnEmpty from '@tuniao/tnui-vue3-uniapp/components/empty/src/empty.vue'

interface Data {
    orderId:string,
    emptyExpre:boolean,
    expressInfo:any,
}
const data = reactive<Data>({
    orderId:'',
    emptyExpre:false,
    expressInfo:{},
   

})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


onLoad((option:any)=>{
    data.orderId = option.orderId
    getLogisticsList(option.orderId)
})


const bcNotify = ref()
const getLogisticsList = (orderId:string) => {
    realtimeLookExpress({
        orderId
    }).then(res => {
        data.expressInfo = res
        data.emptyExpre = !res.length
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    })
}

const fuzhi = (str:string) => {
    // 设置剪切板内容
    uni.setClipboardData({
        data: str
    })
}

</script>

<style lang="scss" scoped>
.contbox{
    margin: 24rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 30rpx;
	.log_head{
        margin-bottom: 34rpx;
        border-bottom: 2rpx solid #F2F2F2;

		.log_hed_li{
			margin-bottom: 24rpx;

			.log_hed_tit{
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
				margin-right: 30rpx;
			}
			.log_hed_tex{
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
			}
			.log_hed_copy{
				margin-left: 20rpx;
				width: 92rpx;
				height: 48rpx;
				background: #FFFFFF;
				border: 2rpx solid #EEEEEE;
				border-radius: 24rpx;
				font-size: 22rpx;
				font-weight: 400;
				color: #666666;
			}
		}
	}

	.log_content{
		.spedli{
			.spedtis{
				margin-top: 4rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: #29C86F;
			}
			.spedtim{
				margin-top: 4rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
			}
		}

        .zong{
            .user_for{
                display: flex;
            }
            .item_year {
                font-size: 34rpx;
                height: 50rpx;
            }
            .line_for {
                width: 4rpx;
                height: 24rpx;
                margin: 0 20rpx 10rpx;
                background-color:#559DFF;
            }
            .line_radio {
                width: 20rpx;
                height: 20rpx;
                border-radius: 50%;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                top: 0;
            }
            .right_box {
                padding: 0rpx 20rpx 20rpx 20rpx;
            }
            .desc{
                font-size: 30rpx;
                color: #8e8b8d;
                display: flex;
                margin-top: 20rpx;
                align-items: center;
                
            }
            image{
                margin-right: 20rpx;
                width: 34rpx;
                height: 34rpx;
                border-radius: 50%;
            }
        }
	}
}
</style>


