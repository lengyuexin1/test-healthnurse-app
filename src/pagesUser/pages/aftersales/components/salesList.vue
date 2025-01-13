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
                <block v-for="item in data.dataList" :key="item.id">
                    <salesItem :info="item"></salesItem>
                </block>
            </view>
        </z-paging>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { saleableList } from '@/api/order-api'
import salesItem from './salesItem.vue'

interface Data{
    dataList:any,
    cursor:string | null
}

const data = reactive<Data>({
    dataList:[],
    cursor:null,
})

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})
const paging = ref(null)


const queryList = (pageNumber:number, pageSize:number)=>{
    getOrderList(pageNumber,pageSize)
}

const select = () =>{
    (paging.value as any).reload()

}

const getOrderList = (pageNumber:number, pageSize:number) => {
    if (pageNumber == 1) { data.cursor = null }
    saleableList({
        cursor:data.cursor,
        size:pageSize,
        query:{}
    }).then((res)=>{
        (paging.value as any).complete(res.list)
        data.cursor = res.nextCursor!
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
</style>
