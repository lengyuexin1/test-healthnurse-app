<template>
    <z-paging
        ref="paging"
        v-model="data.hasChatList"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="20"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="nav_mangage tn-flex-row">
                <view :class="['edit tn-flex-center-end', data.isEdit ? 'navRed' : '']" @tap="clickManage">
                    {{ data.subTitle }}
                </view>
            </view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel btnName="删除" :list="data.hasChatList" type="hasChatList" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="delHasChatList"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import { loveChatTalkList, delLoveChatTalkList } from '@/api/user-api'
import { gotoUserInfo } from '@/routes/user-routes'
import SelectAllCancel from '@/User/components/selectAllCancel/index.vue'


interface Data {
    hasChatList: any
    subTitle: string
    isEdit: boolean
}
const data = reactive<Data>({
    hasChatList: [],
    subTitle: '管理',
    isEdit: false
})

const paging = ref() as any

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber:number, pageSize:number) => {
    loveChatTalkList({
        query:{
            talk: 1 // 1 已聊过 2 尚未聊过
        },
        pageNumber,
        pageSize
    }).then((res:any)=>{
        paging.value.complete(res.data)
    })
}

const clickItem = (item: any) => {
    gotoUserInfo(item.id)
}

const delHasChatList = (ids: any,) => {
    delLoveChatTalkList({
        loveChatAccountIds: ids,
        talk: 2
    }).then(() => {
        bcNotify.value.show('删除成功')
        reload()
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
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

onMounted(() => {

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

.nav_mangage {
    padding: 20rpx 30rpx;

    .section {
        flex: 1;
        display: flex;

        .item {
            color: #666666;
            padding: 12rpx 24rpx;
            margin-right: 30rpx;
            border-radius: 32rpx;
            font-size: 24rpx;
            background-color: #FFFFFF;
            border: solid 1rpx #F2F2F2;
        }

        .active {
            color: #EA3E1A;
            border: solid 1rpx #EA3E1A;
        }
    }

    .edit {
        width: 150rpx;
        box-sizing: border-box;
    }
}

.pb90 {
    margin-bottom: 90rpx;
}

.navRed {
    color: #EA3E1A;
}
</style>
 
