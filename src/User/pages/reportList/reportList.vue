<template>
    <z-paging
        ref="paging"
        v-model="data.reportLists"
        :auto="true"
        :fixed="true"
        @query="queryList"
        :defaultPageSize="10"
        :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
        empty-view-text="还没有数据哦~"
        :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
    >
        <template #top>
            <view class="nav_mangage" :class="[data.isEdit ? 'navRed' : '']" @tap="clickManage" v-if="data.reportLists.length">{{ data.subTitle }}</view>
        </template>
        
        <view class="container" :class="[data.isEdit ? 'pb90' : '']">
            <SelectAllCancel type="reportList" btnName="删除" :list="data.reportLists" :isEdit="data.isEdit" @clickItem="clickItem" @clickBtn="clickDelReport"></SelectAllCancel>
        </view>
    </z-paging>
    <BCNotify ref="bcNotify"></BCNotify>
    <BCPopup
        ref="bcPopup"
        title="确认删除举报？"
        content="删除后无法恢复，请谨慎选择"
        subBtn="确认"
        cancelBtn="取消"
        subBtnColor="#EA3E1B"
        @clickLeftBtn="confirm"
        @clickRightBtn="cancel">
    </BCPopup>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import SelectAllCancel from '@/User/components/selectAllCancel/index.vue'
import BCNotify from '@/components/notify/index.vue'
import BCPopup from '@/components/popup/index.vue'
import { getReportList, delReport } from '@/api/user-api'
import { gotoReportDetail } from '@/routes/public-routes'

interface Data {
    reportLists: any
    subTitle: string,
    isEdit: boolean,
    ids: any
}

const data = reactive<Data>({
    reportLists: [],
    subTitle: '管理',
    isEdit: false,
    ids: []
})

const bcNotify = ref()

const bcPopup = ref()

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    getReportList({
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

        paging.value.complete(data)  
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const clickItem = (item: any) => {
    gotoReportDetail({ id: item.id })
}

const cancel = () => {
    bcPopup.value.close()
}

const confirm = () => {
    delReport({ ids: data.ids }).then(() => {
        bcNotify.value.show('删除成功')
        data.isEdit = false
        data.subTitle = '管理'
        paging.value.reload()
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    }).finally(() => {
        bcPopup.value.close()
    })
}

const clickDelReport = (ids: any) => {
    data.ids = ids
    bcPopup.value.open()
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
