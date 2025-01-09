<template>
    <view class="container" >
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg></PageTopbg>
                <bc-page-navbar :title="'添加物流'"></bc-page-navbar>
            </template>
            <view class="some">
                <view class="sometit">退货信息</view>
                <view class="salebox">
                    <view class="saleli row" @click="data.openPicker = true">
                        <view class="salelef row">
                            <text class="saletit">退货物流</text>
                            <text class="saletit xing">*</text>
                        </view>
                        <view class="salerig row">
                            <view class="more_box">
                                
                                <view class="more_text">{{ data.pickerValue != 999 ? moreValue(data.pickerValue) : '选择物流公司' }}</view>
                                <TnIcon name="right" color="#999999" size="24"></TnIcon>
                            </view>
                        </view>
                    </view>
                    <view class="saleli row">
                        <view class="salelef row">
                            <text class="saletit">退货单号</text>
                            <text class="saletit xing">*</text>
                        </view>
                        <view class="salerig row">
                            <view >
                                <TnInput v-model="data.inputValue" placeholder="请输入退货单号" size="sm" text-align="right" :border="false" clearable/>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="add_btn_box">
                <view class="add_btn" @click="submit">立即提交</view>
            </view>            
            

            <template #bottom>
                <!-- 底部按钮 -->
            </template>

    		<BCNotify ref="bcNotify"></BCNotify>
            <TnPicker
                v-model="data.pickerValue"
                v-model:open="data.openPicker"
                :data="data.expressList"
            />    
        </z-paging>

    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, toRef, computed, onMounted, nextTick,  } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"


import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'

import { expressCompany, addExpress } from '@/api/order-api'


interface Data {
    afterSaleId:string,
    expressList:any,
    pickerValue:number,
    openPicker:boolean,
    inputValue:string,
}
const data = reactive<Data>({
    afterSaleId:"",
    expressList:[],
    pickerValue:999,
    openPicker:false,
    inputValue:'',
})



const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


const moreValue = computed(()=>(id:number)=>{
    const filObj = data.expressList.filter((item:any)=>{
        return item.value == id
    })
    console.log('filObj',filObj);
    
    return filObj[0].label
})


onLoad((option:any)=>{
    data.afterSaleId = option.afterSaleId

    expressCompany({}).then((res:any)=>{
        console.log('res',res);
        data.expressList = res.map((item:any)=>{
            return {
                label: item.name,
                value: item.id
            }
        })

    })
})

const bcNotify = ref()


const submit = () => {
    if (data.pickerValue == 999) {
        bcNotify.value.error('请选择物流公司')
        return
    }
    if (!data.inputValue) {
        bcNotify.value.error('请填写物流单号')
        return
    }
    
    addExpress({
        afterSaleId: data.afterSaleId,
        expressNumber: data.inputValue,
        expressCompany: data.pickerValue
    }).then(()=>{
        bcNotify.value.show('提交成功')
        setTimeout(() => {
            uni.navigateBack()
        }, 800)
    }).catch((err:any) => {
        bcNotify.value.error(err.message)
    })


}





</script>
  
<style lang="scss" scoped>
.some {
    margin-top: 16rpx;
    background-color: #FFFFFF;
    /* #ifndef APP-NVUE */
    box-shadow: 0rpx 0rpx 16rpx rgba(0, 0, 0, 0.06);
    /* #endif */
    border-radius: 24rpx;
    padding: 30rpx 30rpx 1rpx;
    .sometit {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
    }
}
.add_btn_box{
    margin-top: 50rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .add_btn{
        width: 80%;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 40rpx;
        background: #EA3E1A;
        color: #fff;
        font-size: 30rpx;
        text-align: center;

    }
}
.salebox {

    .saleli {
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30rpx;

        .saletip {
            font-size: 26rpx;
            font-weight: 400;
            color: #BCBCBC;
        }

        .salelef {
            align-items: center;
            justify-content: flex-start;

            .saletit {
                font-size: 28rpx;
                font-weight: 400;
                color: #333333;
            }

            .xing {
                color: #FC3964;
                margin-left: 4rpx;
            }
        }

        .salerig {
            align-items: center;

            .more_box{
                display: flex;
                align-items: center;
                .more_text{
                    color: #999999;
                    font-size: 28rpx;
                    margin-right: 12rpx;
                }
            }
            
            .unit {
                margin-left: 10rpx;
                font-size: 28rpx;
                font-weight: bold;
                color: #666666;
            }

            .refinp {
                text-align: right;
                color: red;
                flex: 1;
                font-size: 15px;
            }

            .refplac {
                font-size: 15px;
                color: #BCBCBC;
            }
        }
    }
}
</style>
  