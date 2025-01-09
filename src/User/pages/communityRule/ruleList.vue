<template>
	<view class="container">
        <z-paging 
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :auto-show-system-loading="true"
            :auto-scroll-to-top-when-reload="false"
            :hide-empty-view="true"
        >
            <template #top>
                <!-- #ifdef MP-WEIXIN -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" :addheight="100"></PageTopbg>
                <!-- #endif -->
                <!-- #ifdef APP || H5 -->
                <PageTopbg bgstyle="background: #fff" :zIndex="-1" :addheight="262"></PageTopbg>
                <!-- #endif -->
                <bc-page-navbar :title="'规则百科'" ></bc-page-navbar>
                <view class="inp_box">
                    <view class="inp">
                        <TnInput v-model="data.inputValue" placeholder="请输入搜索内容" :border="false" >
                            <template #prefix> 
                                <TnIcon name="search"></TnIcon>
                            </template>
                        </TnInput>
                    </view>
                    <view class="inp_btn" @click="tosearch">搜索</view>
                </view>
            </template>

            <template #left>
                <view class="left_menu">
                    <view class="menu_item" @click="changeMenu(item, index)" :class="{ 'is_select' : data.leftMenuIndex == index }" v-for="(item, index) in data.leftMenu" :key="item.id">
                        <text>{{ item.name }}</text>
                        <view class="left_select" v-if="data.leftMenuIndex == index"></view>
                    </view>
                </view>
            </template>

            <view class="scroll_box">
                <view class="scroll_item" :id="'scrollItem' + index" v-for="(item, index) in data.dataList" :key="item.id">
                    <view class="item_title">{{ item.name }}</view>
                    <view class="itemList_box" v-if="item.list.length">
                        <view class="itemList_item" @click="toruleDeatail(sonItem,item)" :class="{ 'not_bottom' : (sonIndex + 1) == item.list.length }" v-for="(sonItem,sonIndex) in item.list" :key="sonItem.id">
                            <text>{{ sonItem.title }}</text>
                            <TnIcon name="right" color="#777777"/>
                        </view>
                    </view>
                    <!-- <view class="test"></view> -->
                </view>
            </view>

		</z-paging>

        <BCNotify ref="bcNotify"></BCNotify>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"
import PageTopbg from "@/components/page-topbg/page-topbg.vue"

import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import { ruleCategory, ruleList } from '@/api/user-api'
import { gotoruleDetail } from '@/routes/user-routes'
import { inputEmits } from '@tuniao/tnui-vue3-uniapp/components'

interface Data {
    noticeList: any
    noticeData: any
    dataList: any
    inputValue:string
    leftMenu: any
    leftMenuIndex: number
    ruleList: any
}

const data = reactive<Data>({
    noticeList: [],
    noticeData: [],
    dataList: [],
    inputValue: '',
    leftMenu: [],
    leftMenuIndex: 0,
    ruleList: [],
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

onLoad((options:any) => {
})

onShow(() => {
})

const queryList = () => {
    ruleCategory({
        pid: 58
    }).then((res:any) => {
        data.leftMenu = res
        data.ruleList = []
        data.leftMenu.forEach((item:any) => {
            getruleList(item.id,item.name)
        })
    })
}

const getruleList = async (categoryId: string, categoryName: string) => {
    await ruleList({
        pageNumber: 1,
        pageSize: 10,
        query:{
            categoryId,
            title: data.inputValue
        }
    }).then((listRes:any) => {
        data.ruleList.push({
            name: categoryName,
            id: categoryId,
            list: listRes.data,
        });
        
    })
    // 对内容排序
    data.ruleList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    (paging.value as any).complete(data.ruleList);

}

const changeMenu = (item:any, index:number) => {
    data.leftMenuIndex = index
    paging.value.scrollIntoViewById(`scrollItem${index}`, 150)
    
}

const toruleDeatail = (sonitem:any,item:any) => {
    gotoruleDetail({
        title: item.name,
        categoryId: sonitem.categoryId,
        selectId: sonitem.id
    })
}

const tosearch = () => {
    if (!data.inputValue) {
        bcNotify.value.show('请输入搜索内容')
        return
    }
    ruleList({
        pageNumber: 1,
        pageSize: 10,
        query:{
            title: data.inputValue,
            categoryId: 58
        }
    }).then((res:any) => {
        if (!res.data[0]) {
            bcNotify.value.show('没有查询到内容');
            return
        }

        gotoruleDetail({
            title: res.data[0].categoryPaths[0].name,
            categoryId: res.data[0].categoryId,
            selectId: res.data[0].id
        })
        data.inputValue = ''
    })
    
}

</script>

<style lang="scss" scoped>
.container{
    height: 100%;
}
.inp_box{
    padding: 12rpx 30rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    .inp{
        background: #F5F7F9;
        border-radius: 50rpx;
        width: 576rpx;
        height: 64rpx;
    }

    .inp_btn{
        font-weight: 500;
        font-size: 32rpx;
        color: #EA3E1A;
    }
}
.left_menu{
    padding: 16rpx 12rpx;
    box-sizing: border-box;
    background: #fff;
    height: 100%;
    min-width: 208rpx;
    .menu_item{
        padding: 16rpx 20rpx;
        background: #fff;
        position: relative;
        color: #666666;
        font-size: 28rpx;
        &.is_select{
            color: #EA3E1A;
        }
        .left_select{
            position: absolute;
            top: 0;
            left: 0;
            width: 6rpx;
            height: 32rpx;
            background: #EA3E1A;
            border-radius: 4rpx;
            transform: translate(50%, 50%);
        }
    }

}
.scroll_box{
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    .scroll_item{
        margin-bottom: 30rpx;
        // .test{
        //     width: 100%;
        //     height: 300rpx;
        //     border: 2rpx solid red;
        // }
        .item_title{
            font-size: 28rpx;
            font-weight: 500;
            color: #000002;
            margin-bottom: 16rpx;
        }
        .itemList_box{
            background: #fff;
            border-radius: 16rpx;
            padding: 20rpx 24rpx;
            box-sizing: border-box;
            width: 100%;
            .itemList_item{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 20rpx;
                margin-bottom: 20rpx;
                border-bottom: 2rpx solid #F2F2F2;
                font-size: 24rpx;
                color: #666666;
                &.not_bottom{
                    padding-bottom: 0rpx;
                    margin-bottom: 0rpx;
                    border-bottom: none;
                }
            }
        }
        
    }
}

</style>
<style>
page{
    background: #F8F8F8;
    height: 100%;
}
</style>