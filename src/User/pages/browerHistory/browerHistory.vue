<template>
    <z-paging
        ref="paging"
        v-model="data.browerHistoryLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="nav_mangage" :class="[data.isEdit ? 'navRed' : '']" @tap="clickManage" v-if="data.browerHistoryLists.length">{{ data.subTitle }}</view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel type="browerHistory" btnName="删除" :list="data.browerHistoryLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="clickDelBrowerHistory"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import SelectAllCancel from '@/User/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { browerHistoryList, delBrowerHistory } from '@/api/user-api'
import { gotoserviceDetail, gotoServiceStore } from "@/routes/service-routes"
import { gotogoodsDetail } from '@/routes/goods-routes'

interface Data {
    browerHistoryLists: any
    subTitle: string,
    isEdit: boolean
}

const data = reactive<Data>({
    browerHistoryLists: [],
    subTitle: '管理',
    isEdit: false
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    browerHistoryList({
        pageSize: pageSize,
        pageNumber: pageNumber,
        query: {}
    }).then((res: any) => {
        // 给每个对象添加checked属性
        const data = res.data.map((item: any) => {
            return {
                ...item,
                checked: false
            }
        })

        let newArr = data.filter((item:any) => {
            return item.item
        })


        paging.value.complete(newArr)  
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const clickItem = (item: any) => {
    
    item.applyId == 18 && gotogoodsDetail(item.itemId)
    item.applyId == 19 && gotoServiceStore({ shopId: item.shopId })
}

const clickDelBrowerHistory = (ids: any, isAll: boolean) => {
    delBrowerHistory({ ids, isAll: isAll ? 1 : 0 }).then(() => {
        bcNotify.value.show('删除成功')
        data.isEdit = false
        data.subTitle = '管理'
        paging.value.reload()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const clickBack = () => {
    pageController.back()
}

const clickManage = () => {
    data.isEdit = !data.isEdit
    data.subTitle = data.isEdit ? '取消管理' : '管理'
}

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.nav_mangage {
    color: #333333;
    display: flex;
    justify-content: flex-end;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
}

.pb90 {
    margin-bottom: 90rpx;
}

.navRed {
    color: #EA3E1A;
}
</style>
