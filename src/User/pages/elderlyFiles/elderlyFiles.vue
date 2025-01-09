<template>
    <view class="container">
        <z-paging 
            ref="paging" 
            :auto="false"
            :refresher-enabled="false"
            >
            <template #top>
                <PageTopbg bgstyle="background: linear-gradient(180deg, #DFF7EF 0%, #F2F3F5 100%);"></PageTopbg>
                <bc-page-navbar :title="'被照护人档案'"></bc-page-navbar>
            </template>

            <view class="content">
                <view class="balance_info" v-for="item in data.patientList" :key="item.id">
                    <elderlyFilesItem :info="item" @delElderly="delElderly"></elderlyFilesItem>
                </view>
            </view>
            <template #bottom >
                <view class="bottom_box">
                    <view class="bottom_btn" @click="toPatientEdit">+新增被照护人</view>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from "@dcloudio/uni-app"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import elderlyFilesItem from './components/elderlyFilesItem.vue'
import { getpatientList } from "@/api/user-api"
import { gotoPatientEdit } from "@/routes/user-routes"
import BCNotify from '@/components/notify/index.vue'
import { delPatient } from '@/api/service-api'


interface Data {
    patientList:any
}
const data = reactive<Data>({
    patientList:[]
})

const bcNotify = ref()

const getelderlyList = () => {
    getpatientList().then((res)=>{
        data.patientList = res
    })
}

const toPatientEdit = () => {
    gotoPatientEdit({type:0})
}

const delElderly = (id: string | number) => {
    delPatient({ id }).then(() => {
        bcNotify.value.show('删除成功')
        getelderlyList()
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

onShow(() => {
    getelderlyList()
})

</script>
  
<style lang="scss" scoped>
.content{
    padding: 30rpx;
    box-sizing: border-box;
}
.balance_info{
    margin-bottom: 20rpx;
}
.bottom_box{
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
    .bottom_btn{
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        box-sizing: border-box;
        background: #29C86F;
        text-align: center;
        color: #fff;
        border-radius: 50rpx;

    }
}
</style>
  