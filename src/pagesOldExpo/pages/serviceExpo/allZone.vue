<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            @scroll="pageScroll"
            :defaultPageSize="10"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
            :auto-show-back-to-top="true"
            :loading-more-enabled="false"
        >
            <template #top>
                <!-- <pageTopbg :zIndex="-1" :bgstyle="'background: #F2F3F5;'"></pageTopbg> -->

                <!-- #ifdef MP-WEIXIN -->
                <PageTopbg bgstyle="background: #F2F3F5" :zIndex="-1" :addheight="100"></PageTopbg>
                <!-- #endif -->
                <!-- #ifdef APP || H5 -->
                <PageTopbg bgstyle="background: #F2F3F5" :zIndex="-1" :addheight="262"></PageTopbg>
                <!-- #endif -->

                <bc-page-navbar :title="'全部专区'" ></bc-page-navbar>

                <!-- #ifdef APP-PLUS -->
                <view class="placeholder"></view>
                <!-- #endif -->

            </template>

            <template #left>
                <view class="left_nva_box" v-if="data.categoryList.length > 0">
                    <view class="navItem" @click="changeNav(index)" :class="{ 'is_select' : item.id == data.categoryList[data.categoryIndex].id }" v-for="(item, index) in data.categoryList" :key="item.id">
                        <view>
                            {{ item.name }}
                        </view>
                        <view class="select_box" v-if="item.id == data.categoryList[data.categoryIndex].id"></view>
                    </view>
                </view>
                
            </template>

            <view class="page_content">
                <view class="boxItem" v-for="(item,index) in data.dataList" :key="item.categoryId" :id="'toView' + index">
                    <view class="item_title_box" @click="toAllClass(item)">
                        <view class="item_title">{{ item.categoryName }}</view>
                        <view>
                            <TnIcon name="right" color="#1B1B1B" size="24rpx"></TnIcon>
                        </view>
                    </view>
                    <view class="list_box">
                        <view class="item_box" @click="toClassItemPage(sonItem)" v-for="sonItem in item.categorySonList" :key="sonItem.id">
                            <image
                                class="item_img"
                                :src="sonItem.thumb"
                                mode="aspectFill"
                            />
                            <view class="item_text">{{ sonItem.name }}</view>
                        </view>
                    </view>
                </view>
            </view>
           
            



            <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>

    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import PageTopbg from '@/components/page-topbg/page-topbg.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'

import { getAssetsPic } from '@/common/setPicture'
import { healthContentList } from "@/api/create-api"

import BCNotify from '@/components/notify/index.vue'
import { Debounce } from '@/libs/antivibthrot'

import { productList, oldExpoCategory, oldExpolist } from '@/api/goods-api'

import { gotoClassItemPage, gotoAllClass } from '@/routes/service-routes'


interface Data {
    dataList: any
    categoryList: any
    categoryIndex: number
}
const data = reactive<Data>({
    dataList: [],
    categoryList: [],
    categoryIndex: 0,
})


const bcNotify = ref()

onMounted(async () => {


})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


const paging = ref(null)
const queryList = async (pageNumber:number, pageSize:number) => {

    oldExpoCategory({
        pageNumber: 1,
        pageSize: 20,
        query:{
            isPid: 1
        }
    }).then((res:any) => {
        data.categoryList = res.data

        if (data.categoryList.length == 0) {
            (paging.value as any).complete([])
            return
        }

        let arr = [] as any

        const promises = data.categoryList.map((item: any) => {
            return oldExpoCategory({
                pageNumber: 1,
                pageSize: 8,
                query: {
                    isPid: 0,
                    pid: item.id
                }
            }).then((Sonres: any) => {
                arr.push({
                    categoryId: item.id,
                    categoryName: item.name,
                    categorySonList: Sonres.data
                });
            });
        });



        Promise.all(promises).then(() => {
            console.log('data.categoryList',data.categoryList);

            let sortedArray2 = data.categoryList.map((item1:any) => {
                // 从新排序
                return arr.find((item2:any) => item2?.categoryId === item1.id);
            }) as any

            (paging.value as any).complete(sortedArray2)

            console.log('data.dataList', data.dataList);
            
        }).catch((err:any) => {
            (paging.value as any).complete([])
        });

    });

}

const changeNav = (index:number) => {
    data.categoryIndex = index;
    
    (paging.value as any).scrollIntoViewById('toView' + index , 150);

}

const toClassItemPage = (item:any) => {
    gotoClassItemPage({ categoryId : item.id, categoryName: item.name })

}

const toAllClass = (item:any) => {
    gotoAllClass({pid:item.categoryId, title: item.categoryName})
}

const instance = getCurrentInstance(); // 获取组件实例
const query = uni.createSelectorQuery().in(instance);

const pageScroll = (e:any) => {

    // #ifdef APP || H5
    let scrollIndex = Math.floor(e.detail.scrollTop / 200)
    data.categoryIndex = scrollIndex
    // #endif

    // #ifdef MP-WEIXIN
    Debounce(()=>{
        data.categoryList.forEach((item:any, index:number) => {
            query.select( '#toView'+ index ).boundingClientRect((rect:any) => { 

                if (rect.top <= 150 && rect.top >= 50) {
                    data.categoryIndex = index;
                }
            }).exec()
        })
    }, 500)
    // #endif
    
}

// 退出页面
const goback = () => {
    uni.navigateBack();
}

defineExpose({
})

</script>

<style lang="scss" scoped>
.left_nva_box{
    width: 176rpx;
    height: 1500rpx;
    background: #FFFFFF;
    .navItem{
        padding: 32rpx;
        padding-right: 0rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #000002;
        font-weight: 400;
        position: relative;
        &.is_select{
            background: #F2F3F5;
            color: #EA3E1A;
        }
        .select_box{
            width: 8rpx;
            height: 36rpx;
            background: #EA3E1A;
            border-radius: 0rpx 6rpx 6rpx 0rpx;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(0rpx, -50%);
        }
    }
}
.page_content{
    padding: 20rpx;
    padding-bottom: 130rpx;

    box-sizing: border-box;
    .boxItem{
        width: 100%;
        background: #FFFFFF;
        border-radius: 32rpx;
        padding: 28rpx 0rpx;
        box-sizing: border-box;
        margin-bottom: 16rpx;

        .item_title_box{
            width: 100%;
            padding: 0rpx 32rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40rpx;
            .item_title{
                color: #000002;
                font-size: 30rpx;
                font-weight: 500;
            }
        }
        .list_box{
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            // flex-wrap: wrap;
            display: grid;
            grid-gap: 14rpx;
            grid-template-columns: auto auto auto auto;
            padding: 0rpx 8rpx;
            box-sizing: border-box;
            .item_box{
                flex-shrink: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 20rpx;

                .item_img{
                    width: 60rpx;
                    height: 60rpx;
                    margin-bottom: 12rpx;
                }
                .item_text{
                    text-align: center;
                    font-size: 24rpx;
                    color: #727375;
                    font-weight: 400;
                    width: 120rpx;
                    white-space: nowrap; /*强制一行内显示*/
                    overflow: hidden;/*溢出隐藏*/
                    text-overflow: ellipsis;/*超出部分现实省略号*/
                }
            }

        }
    }
}
.placeholder{
    width: 100%;
    padding: 90rpx 0;
}
</style>
