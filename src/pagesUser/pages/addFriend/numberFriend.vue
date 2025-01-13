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
            <template #top>
                <pageTopbg :zIndex="-1" :bgstyle="'background:#F8F8F8'"></pageTopbg>
                <bc-page-navbar :title="'通讯录好友'"></bc-page-navbar>
                <view class="top_inp">
                    <view class="inp_box" @click="changeinpType">
                        <template v-if="!data.isinp">
                            <TnIcon name="search" size="32rpx" color="#999999"></TnIcon>
                            <view class="inp_text">搜索好友</view>
                        </template>
                        <template v-else>
                            <view class="inp_bg">
                                <TnInput
                                    v-model="data.inputValue"
                                    placeholder="搜索好友"
                                    height="72"
                                    :border="false"
                                    :focus="data.isinp"
                                    @blur="inpblur"

                                />
                            </view>                            
                        </template>
                    </view>
                </view>
            </template>

            <view class="content_page">

                <view class="article_list" >
                    <friendCard 
                    v-for="(item,index) in data.dataList" 
                    :key="item.accountId" :info="item" 
                    :index="index" 
                    :isnumber="1"
                    @followFriend="followFriend" 
                    @delfriend="delfriend"></friendCard>
                    
                </view>
            </view>

		    <BCNotify ref="bcNotify"></BCNotify>

        </z-paging>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { getAssetsPic } from '@/common/setPicture'
import { recommendationList, addressBookList } from '@/api/user-api'
import { unfollow, follow } from '@/api/create-api'
import BCNotify from '@/components/notify/index.vue'
import pageTopbg from '@/components/page-topbg/page-topbg.vue'
import friendCard from './components/friendCard.vue'

import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'


interface Data {
    dataList: any,
    inputValue: string,
    isinp: boolean,
    numberArr: any,
    nameArr: any,
    addressBooks: any
}
const data = reactive<Data>({
    dataList: [],
    inputValue: '',
    isinp: false,
    numberArr: [],
    nameArr: [],
    addressBooks: []
    
})

const paging = ref(null)

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted( async () => {
})



const queryList = (pageNumber:number, pageSize:number)=>{
    if (pageNumber == 1) {
        //#ifdef MP-WEIXIN
        console.log('微信获取');
        //#endif

        //#ifndef APP-NVUE
        plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, function( addressbook ) {
            console.log('获取通讯录对象成功')
            addressbook.find(["displayName","phoneNumbers"],function(contacts:any){

                console.log('获取联系人成功',contacts)
                data.numberArr = contacts.map((item:any)=>{
                    return item.phoneNumbers[0].value
                })
                data.nameArr = contacts.map((item:any)=>{
                    return item.displayName
                })

                data.addressBooks = contacts.map((item:any)=>{
                    let numberStr = item.phoneNumbers[0].value
                    return {
                        callName: item.displayName,
                        mobile: Number(numberStr.replace(/\s/g, ""))
                    }
                })

                console.log('处理后data.addressBooks',data.addressBooks);
                

                getList(pageNumber,pageSize)

            }, function () {
                uni.showToast({
                    title: '获取联系人失败',
                    duration: 2000
                })
            },{multiple:true});
        }, function ( e ) {
            uni.showToast({
                title: '获取通讯录对象失败:' + e.message,
                duration: 2000
            })
        });
        //#endif
    }else{
        getList(pageNumber,pageSize)

    }

}

const getList = (pageNumber:number, pageSize:number) => {
    console.log('data.numberArr',data.numberArr);
    console.log('data.nameArr',data.nameArr);
    console.log('data.addressBooks',data.addressBooks);
    
    addressBookList({
        query:{
            findName:data.inputValue,
            platformType: 2,
            isFans: null,
            addressBooks: data.addressBooks
        },
        pageNumber,
        pageSize
    }).then((res:any)=>{
        console.log('获取到的res',res);
        
        (paging.value as any).complete(res.data)
    }).catch((err:any)=>{
        console.log('err',err);
        
    })
}


const changeinpType = () => {
    data.isinp = true
}


const bcNotify = ref()

const inpblur = () =>{
    (paging.value as any).reload()
}

const delfriend = (index:number) =>{
    data.dataList.splice(index,1,0)
}

const followFriend = (item:any) => {
    console.log('item',item);
    if (item.isFans) {
        unfollow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 0
            bcNotify.value.show('取消关注')
        })
    }else{
        follow({
            accountId: item.accountId
        }).then(()=>{
	        item.isFans = 1
            bcNotify.value.show('关注成功')
        }).catch((err:any) => { 
            bcNotify.value.error('不可以给本人点关注哦')
        })
    }
}



</script>
  
<style lang="scss" scoped>
.top_inp{
    padding: 8rpx 20rpx;
    box-sizing: border-box;
    width: 100%;
    .inp_box{
        width: 100%;
        height: 72rpx;
        border-radius: 36rpx;
        background: #FFFFFF;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: center;
        .inp_bg{
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            border-radius: 36rpx;
            overflow: hidden;
        }
        .inp_text{
            margin-left: 4rpx;
        }
    }
}

.friend_from_box{
        padding: 30rpx 20rpx;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F8F8F8;

        .friend_from_item{
            width: 226rpx;
            height: 226rpx;
            background: #FFFFFF;
            border-radius: 12rpx;
            padding: 24rpx 0rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .item_icon{
                width: 88rpx;
                height: 88rpx;
                margin-bottom: 12rpx;
            }
            .item_title{
                font-weight: 500;   
                font-size: 28rpx;
                color: #333333;
                margin-bottom: 4rpx;
            }
            .item_desc{
                font-weight: 400;
                font-size: 24rpx;
                color: #808080;
            }
        }
}
.recommend_title{
        padding: 6rpx 30rpx;
        padding-bottom: 24rpx;
        font-weight: 600;
        font-size: 32rpx;
        color: #333333;
        background: #F8F8F8;

}
</style>

<style>
page{
    background: #fff;
}
</style>
  