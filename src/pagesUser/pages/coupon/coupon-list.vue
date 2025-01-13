<template>
	<view class="container">
		<z-paging
            ref="paging"
            v-model="data.dataList"
            :fixed="false"
            @query="queryList"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template v-if="props.category !== 'have'">
                <view class="order-list" v-for="(order) in data.dataList" :key="order.id">
                    <coupon-item :order="order" :is_recive="true" :overdue="props.overdue" :category="props.category"></coupon-item>
                </view>
            </template>
            <template v-else>
                <view class="order-list" v-for="(order) in data.clsList" :key="order.id">
                    <coupon-shop :order="order" :is_recive="true" :overdue="props.overdue" :category="props.category"></coupon-shop>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import BCNotify from '@/components/notify/index.vue'
import couponItem from './coupon-item.vue'
import couponShop from './coupon-shop.vue'
import { getAlreadyCoupon } from '@/api/user-api'

const props = defineProps({
    category: {
        type: [String],
        default: 'have'
    },
    overdue: {
        type: Boolean,
        default: false
    },
    tabIndex: {
        type: Number,
        default: () => 0
    },
    currentIndex: {
        type: Number,
        default: () => 0
    },
    typeId: {
        type: Number,
        default: () => 0
    }
})

interface Data {
    firstLoaded: boolean
    dataList: any
    clsList: any
}

const data = reactive<Data>({
    firstLoaded: false,
    dataList: [],
    clsList: []
})

const paging = ref() as any

const bcNotify = ref()

watch(() => props.currentIndex, (newVal) => {
    if (newVal === props.currentIndex) {
        //懒加载，当滑动到当前的item时，才去加载
        if (!data.firstLoaded) {
            nextTick(() => {
                paging.value?.reload()
            })
        }
    }
}, { immediate: true })

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const queryList = (page: number, limit: number) => {
    getAlreadyCoupon({
        pageSize: limit,
        pageNumber: page,
        query: {
            viewType: props.category,
            typeId: props.typeId ? props.typeId : undefined
        }
    }).then(res => {
        paging.value.complete(res.data)
        data.firstLoaded = true
        page === 1 && (data.clsList = [])
        if (res.data.length <= 0) { return }
        setAreaTree(res.data)
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
}

const bulidAreaTree = (res: any, shopId: any) => {
    const result = []
    for (const i in res) {
        if (res[i].shopId === shopId) {
            result.push(res[i])
        }
    }
    return result
}

const setAreaTree = (res: any) => {
    const shopList = res.map((x: any) => x.shopId)
    const uniqueArr = shopList.filter((value, index, self) => self.indexOf(value) === index)
    
    const result = []
    for (const i in uniqueArr) {
        const obj = res.find((item: any) => item.shopId === uniqueArr[i])

        const children = bulidAreaTree(res, uniqueArr[i])
        
        result.push({
            ...obj,
            children
        })
    }
    
    if (data.clsList.length) {
        if (data.clsList[data.clsList.length - 1].shopId === result[0].shopId) {
            data.clsList[data.clsList.length - 1].children.push([...result[0].children])
            data.clsList = data.clsList.concat(result.splice(0, 1))
            return
        }
    }
    
    data.clsList = data.clsList.concat(result)
}

</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		flex: 1;
	}
</style>
