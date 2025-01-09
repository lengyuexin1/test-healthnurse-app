<template>
    <view class="wrap">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="false"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <view class="userList">
                <view class="user_item" v-for="(item, index) in data.dataList" :key="index">
                    <!-- 粉丝列表 -->
                    <template v-if="props.type == 'fanList'">
                        <TnCheckbox v-model="item.isCommentPermission" :label="item.fansId" checked-shape="circle" size="lg" active-color="#EA3E1A" style="width: 100%;">
                            <view class="info tn-flex-center-center">
                                <view class="tn-flex-center-center" style="flex: 1;">
                                    <image :src="item.fansImage" mode="scaleToFill" />
                                    <view class="name tn-text-ellipsis-1">{{ item.fansName }}</view>
                                </view>
                            </view>
                        </TnCheckbox>
                    </template>

                    <!-- 关注列表 -->
                    <template v-if="props.type == 'followList'">
                        <TnCheckbox v-model="item.isCommentPermission" :label="item.accountId" checked-shape="circle" size="lg" active-color="#EA3E1A" style="width: 100%;">
                            <view class="info tn-flex-center-center">
                                <view class="tn-flex-center-center" style="flex: 1;">
                                    <image :src="item.followImage" mode="scaleToFill" />
                                    <view class="name tn-text-ellipsis-1">{{ item.followName }}</view>
                                </view>
                            </view>
                        </TnCheckbox>
                    </template>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { fansList, followList } from '@/api/create-api'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'

const props = defineProps({
    type: {
        type: String,
        default: 'fanList'
    }
})

interface Data {
    dataList: any
}

const data = reactive<Data>({
    dataList: []
})

const paging = ref() as any

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (pageNumber: number, pageSize: number) => {
    if (props.type == 'fanList') {
        fansList({
            query: {},
            pageSize,
            pageNumber
        }).then((res: any) => {
            paging.value.complete(res.data)
        })
    }
    else if (props.type == 'followList') {
        followList({
            query: {},
            pageSize,
            pageNumber
        }).then((res: any) => {
            paging.value.complete(res.data)
        })
    }
}

const reload = () => {
    paging.value.reload()
}

defineExpose({ reload, data })

</script>

<style lang="scss" scoped>
:deep(.tn-gray-disabled_border) {
    border-color: #B3B3B3;
}

.wrap {
    height: 640rpx;
}
.userList {
	display: flex;
	flex-direction: column;
	margin: 0 30rpx 70rpx 30rpx;

	.user_item {
		display: flex;
		flex-direction: row;
        margin: 6rpx 0;
	}
	.info {

		image {
			width: 70rpx;
			height: 70rpx;
			margin: 0 20rpx;
			border: solid 1rpx #F6F6F6;
			border-radius: 50%;
		}

		.name {
            flex: 1;
			color: #333333;
			font-size: 28rpx;
		}
	}
}
</style>

