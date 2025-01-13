<template>
    <z-paging
        ref="paging"
        v-model="data.memberLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="inp_box">
                <view class="inp">
                    <TnInput v-model="data.name" placeholder="输入名称进行搜索" :border="false" :clearable="true" @change="inputChange">
                        <template #prefix> 
                            <TnIcon name="search"></TnIcon>
                        </template>
                    </TnInput>
                </view>
            </view>
            <view class="nav_mangage" :class="[data.isEdit ? 'navRed' : '']" @tap="clickManage" v-if="data.memberLists.length">{{ data.subTitle }}</view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel type="memberList" btnName="确认移除" :list="data.memberLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="clickMemberLists"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { getAssetsPic } from '@/common/setPicture'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import SelectAllCancel from '@/pagesUser/components/selectAllCancel/index.vue'

import BCNotify from '@/components/notify/index.vue'
import { pageController } from '@bc/uni-tools'
import { salonMemberList, delSalonMember } from '@/api/user-api'
import { dispatchWEvent } from '@/events/event-registry'
import { CreateEvents } from '@/events/create-events'

interface Data {
    memberLists: any
    subTitle: string
    isEdit: boolean
    salonId: string
    name: string
}

const data = reactive<Data>({
    memberLists: [],
    subTitle: '管理',
    isEdit: false,
    salonId: '',
    name: ''
})

const bcNotify = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    salonMemberList({
        pageSize: pageSize,
        pageNumber: pageNumber,
        query: {
            salonId: data.salonId,
            name: data.name,
            role: 0 //0-普通成员;1-组长
        }
    }).then((res: any) => {
        console.log(res);
        
        // 给每个对象添加checked属性
        const data = res.data.map((item: any) => {
            return {
                ...item,
                checked: false
            }
        })
        paging.value.complete(data)  
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const inputChange = () => {
    paging.value.reload()
}

const clickItem = (item: any) => {
    // gotoserviceDetail(itemId)
}

const clickMemberLists = (ids: any) => {
    delSalonMember({ ids }).then(() => {
        bcNotify.value.show('移除成功')
        reload()
        dispatchWEvent(CreateEvents.Del__Member)
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

const reload = () => {
    data.isEdit = false
    data.subTitle = '管理'
    paging.value.reload()
}

onLoad((options) => {
    data.salonId = options?.id
})

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

.inp_box{
    background-color: #ffffff;
    .inp{
        background: #F6F6F6;
        border-radius: 50rpx;
    }
    padding: 30rpx;
}
</style>
