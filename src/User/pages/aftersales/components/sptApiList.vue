<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <view class="content">
                <block v-for="(item,index) in data.dataList" :key="item.id">
                    <afterItem :info="item" :index="index" @closeSales="closeSales" @receiving="receiving"></afterItem>
                </block>
            </view>


            <TnPopup v-model="data.showPopup">
                <view class="popup_box">
                    <view class="content_text">
                        确认关闭售后吗?
                    </view>
                    <view class="bottom_box">
                        <view class="cancel_btn" @click="data.showPopup = false">取消</view>
                        <view class="confirm_btn" @click="saleaClose">确认</view>
                    </view>
                </view>
            </TnPopup>
            <TnPopup v-model="data.showgoodsPopup">
                <view class="popup_box">
                    <view class="content_text">
                        已经收到货确认收货?
                    </view>
                    <view class="bottom_box">
                        <view class="cancel_btn" @click="data.showgoodsPopup = false">取消</view>
                        <view class="confirm_btn" @click="saleaDelivery">确认</view>
                    </view>
                </view>
            </TnPopup>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { sptApiList, closeAftersale, afterConsent } from '@/api/order-api'
import afterItem from './afterItem.vue'
import BCNotify from '@/components/notify/index.vue'


import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'

interface Data{
    dataList:any,
    showPopup:boolean,
    afterSaleId:string,
    afterSaleIndex:number,
    showgoodsPopup:boolean,
}

const data = reactive<Data>({
    dataList:[],
    showPopup:false,
    afterSaleId:'',
    afterSaleIndex:0,
    showgoodsPopup:false,
})

interface Props {
    typeId:number,
}
const props = defineProps<Props>()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const paging = ref(null)
const bcNotify = ref()


const queryList = (pageNumber:number, pageSize:number)=>{
    getOrderList(pageNumber,pageSize)
}


const getOrderList = (pageNumber:number, pageSize:number) => {
    sptApiList({
        pageNumber,
        pageSize,
        query: {
            listType: props.typeId
        }
    }).then(res => {
        (paging.value as any).complete(res.data)
    }).catch(() => {
    
    })
}

// 关闭售后
const closeSales = (afterSaleId:string,index:number) => { 
    data.showPopup = true
    data.afterSaleId = afterSaleId
    data.afterSaleIndex = index
    reloadPage()
}
const saleaClose = () => {
    closeAftersale({
        id: data.afterSaleId
    }).then(()=>{
        data.showPopup = false
        bcNotify.value.show('取消成功')
        data.dataList.splice(data.afterSaleIndex, 1)
    })
}

// 确认收货
const receiving = (afterSaleId:string,index:number) => {
    data.showgoodsPopup = true
    data.afterSaleId = afterSaleId
    data.afterSaleIndex = index
    reloadPage()
}
const saleaDelivery = () => {
    afterConsent({
        afterSaleId:data.afterSaleId
    }).then(()=>{
        data.showgoodsPopup = false
        bcNotify.value.show('收货成功')
        (paging.value as any).reload()
    })
}


// 刷新页面
const reloadPage = () => {
    (paging.value as any).reload()
}

defineExpose({
    reloadPage,
})

</script>

<style lang="scss" scoped>
.top_box{
    display: flex;
    padding: 30rpx 24rpx;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    background: #F3F4F6;
    .navList_item{
        padding: 10rpx 20rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 28rpx;
        color: #666666;
        background: #fff;
        border-radius: 32rpx;
        &.is_select{
            background: #29C86F;
            color: #fff;
        }
    }
}
.content{
    padding: 0rpx 20rpx;
    box-sizing: border-box;
}
.test{
    width: 100%;
    height: 512rpx;
    background-color: #fff;
    border-radius: 24rpx;
}
.popup_box{
    width: 500rpx;
    padding: 50rpx 0rpx;
    padding-bottom: 0rpx;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .content_text{
        display: flex;
        text-align: center;
        margin-bottom: 40rpx;
    }
    .bottom_box{
        width: 100%;
        border-top: 2rpx solid #F0F0F0;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .cancel_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            border-right: 2rpx solid #F0F0F0;
            box-sizing: border-box;
            color: #333333;
            font-weight: 400;
            font-size: 28rpx;
            width: 50%;
        }
        .confirm_btn{
            text-align: center;
            height: 96rpx;
            line-height: 96rpx;
            font-size: 28rpx;
            color: #EA3E1A;
            font-weight: 400;
            width: 50%;

        }
    }
}
</style>
