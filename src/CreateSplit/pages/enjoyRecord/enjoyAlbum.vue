<template>
	<view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="true"
            :fixed="true"
            @query="queryList"
            :defaultPageSize="10"
            :hide-empty-view="true"
            :auto-show-back-to-top="true"
        >
            <template #top>
                <PageTopbg bgstyle="background: transparent;" :zIndex="-1"></PageTopbg>
                <bc-page-navbar :title="'老友云相册'" :bgColor="'#FFFFFF'"></bc-page-navbar>

                <view class="top_nav_box">
                    <view class="nav_box">
                        <TnTabs
                            v-model="data.currentTabIndex"
                            color="#666666"
                            active-color="#29C86F"
                            bar-color="#29C86F"
                            :scroll="false"
                            :bottom-shadow="false"
                            font-size="30rpx"
                        >
                            <TnTabsItem
                                v-for="(item, index) in data.navList"
                                :key="index"
                                :title="item.name"
                                @click="navItem(item,index)"
                            />
                        </TnTabs>
                    </view>
                    <view class="Space_box"></view>
                    <view class="sort_box">
                        <view class="sort_type_box">
                            <view class="sort_type">按月</view>
                            <TnSwitch v-model="data.selectValue" active-color="#29C86F" size="sm" @change="changeSwitch"/>
                        </view>
                        <view class="save_text">
                            <text v-if="data.saveBtn" @click="data.saveBtn = false">取消 </text>
                            <text v-if="!data.saveBtn" @click="changeSave">一键下载</text>
                            <text class="save_btn" v-else @click="downloadCheck">确认下载({{ data.saveUrlList.length }})</text>
                        </view>
                    </view>
                </view>


            </template>
            
            <view class="page_content">
                <view class="cloudPhoto_item" v-for="item in data.dataList" :key="item.id">
                    <view class="cloudPhoto_title_box">
                        <view class="cloudPhoto_time">
                            {{ item.date }}
                        </view>
                        <view class="cloudPhoto_text" v-if="false">
                            拍摄于泰山
                        </view>
                    </view>
                    <!-- v-if="item.baseInfo.images && item.baseInfo.images.length != 0 && item.baseInfo.type == 3" -->
                    <view 
                        class="img_list"
                        :class="{ 'flex_list' : item.combined.length == 2, 'grid_list' : item.combined.length >= 3 }"
                    >
                            
                        <view v-for="(imgitem,index) in item.combined" :key="index" @click="previewItem(imgitem,index)" class="item_box">
                            <view class="item_checkbox" v-if="data.saveBtn">
                                <TnCheckbox size="lg" checked-shape="circle" active-color="#EA3E1A" v-model="imgitem.checked" @change="changeCheck"></TnCheckbox>
                            </view>
                            <image
                                v-if="imgitem.source == 'images'"
                                class="img_item"
                                :class="{ 'have_right_img' : item.combined.length < 3 }"
                                :src="imgitem.value"
                                mode="aspectFill"
                            />
                            <view class="combined_item" :class="{ 'have_right_img' : item.combined.length < 3 }" v-else>
                                <video v-if="getplatFrom() == 'MP-WEIXIN'" :src="imgitem.value" :controls="false" :show-center-play-btn="false" object-fit='contain'></video>
                                <mpHtml v-else :content="`<video style='width: 210rpx;height: 140rpx;background:#000;z-index:1;'
                                    poster='${imgitem.value}' src='${imgitem.value}' :controls='false' :show-center-play-btn='false' duration='10' object-fit='cover'></video>`" />
                            </view>
                        </view>
                        
                        
                    </view>

                </view>
            </view>
            
		</z-paging>
        <TnPopup v-model="data.showDownloadPopup" :overlay-opacity="1">
            <view class="download_box">
                <view class="download_title">开启保存相册功能</view>
                <view class="download_text">云相册图片需要开启保存功能才能正常下载。</view>
                <view class="setdownload_btn" @click="setdownload">设置保存</view>
                <view class="cancel_btn" @click="data.showDownloadPopup = false">暂不设置</view>
            </view>
        </TnPopup>
        <TnPopup v-model="data.showDelPopup" :overlay-opacity="1">
            <view class="video_box">
                <video v-if="getplatFrom() == 'MP-WEIXIN'" :src="data.previewUrl" controls autoplay loop :show-fullscreen-btn="false" object-fit='contain'></video>
                <mpHtml v-else :content="`<video style='width: 100%;height: 440rpx;background:#000;z-index:1;'
                    poster='${data.previewUrl}' src='${data.previewUrl}' controls autoplay loop :show-fullscreen-btn='false' duration='10' object-fit='cover'></video>`" />
            </view>
        </TnPopup>
        <BCNotify ref="bcNotify"></BCNotify>

	</view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { onLoad, onShow } from "@dcloudio/uni-app"

import TnSwitch from '@tuniao/tnui-vue3-uniapp/components/switch/src/switch.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'

import mpHtml from '@/Create/uni_modules/mp-html/components/mp-html/mp-html.vue'
import BCNotify from '@/components/notify/index.vue'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import { getAssetsPic } from '@/common/setPicture'
import { 
    circleCloudPhoto,
    enjoydetail,
} from '@/api/create-api'


interface Data {
    dataList: any,
    navList: any,
    currentTabIndex: number,
    selectValue: boolean,
    type: number,
    circleId: string,
    showDelPopup: boolean,
    previewUrl: string,
    saveUrlList: any,
    saveBtn: boolean,
    myenjoyObj: any,
    showDownloadPopup: boolean,
}

const data = reactive<Data>({
    dataList: [],
    navList: [
        {id: 1, name: '全部'},
        {id: 3, name: '照片'},
        {id: 2, name: '短视频'},
    ],
    currentTabIndex: 0,
    selectValue: false,
    type: 1,
    circleId: '',
    showDelPopup: false,
    previewUrl: '',
    saveUrlList: [],
    saveBtn: false,
    myenjoyObj: {},
    showDownloadPopup: false,
})

const bcNotify = ref()
const paging = ref()

const getAssetsUrl = computed(() => (src:string) => {
    return getAssetsPic(src)
})

const getplatFrom = computed(() => {
    return () => {
        let platFrom = ''
        // #ifdef MP-WEIXIN
        platFrom = 'MP-WEIXIN'
        // #endif

        // #ifdef APP-PLUS
        platFrom = 'APP-PLUS'
        // #endif

        return platFrom
    }
})

onLoad((options:any) => {
    data.circleId = options.circleId
    enjoydetail({}).then((res:any) => {
        data.myenjoyObj = res;
    })
})

onShow(() => {
    data.showDownloadPopup = false
})

const queryList = (pageNumber: number, pageSize: number) => {
    circleCloudPhoto({
        pageNumber,
        pageSize,
        query:{
            isMonth: data.selectValue ? 1 : 0,
            type: data.type != 1 ? data.type : null,
            circleId: data.circleId,
        }
    }).then((res:any) => {


        // 合并数组并添加来源字段
        let result = res.data.map((item:any) => {
            // 合并两个数组，并为每个元素添加来源信息
            let combinedArray = [
                ...item.images.map((value:any) => ({ value, source: 'images', checked: false })),
                ...item.urls.map((value:any) => ({ value, source: 'urls', checked: false }))
            ];

            // 返回新的对象，其中包含合并后的数组
            return {
                ...item,
                combined: combinedArray
            };
        });

        console.log('result',result);

        paging.value.complete(result)
    }).catch(()=>{
        paging.value.complete([])
    })
}

const changeSwitch = () => {
    paging.value.reload()
}

const navItem = (item:any, index:number) => {
    data.type = item.id;
    data.currentTabIndex = index;
    paging.value.reload();

}

const previewItem = (item:any,index:number) => {
    console.log('item',item);
    console.log('index',index);
    if (item.source == "images") {
        preImage(1,[item.value])
    }
    if (item.source == "urls") {
        data.showDelPopup = true
        data.previewUrl = item.value
        console.log('视频预览');
    }
} 

const preImage = (current:number, urls:any) => {
    uni.previewImage({
        current,
        urls,
        showmenu: false,
    })
}

const changeCheck = (val:any) =>{ 
    let arr = data.dataList.flatMap((item:any) => 
        item.combined.filter((c:any) => c.checked)
    );
    data.saveUrlList = Array.from(new Map(
        arr.map((obj:any) => [obj.value, {...obj, checked: true}]) // 使用 value 作为唯一键，并更新 checked 属性
    ).values());
}

const downloadCheck = () => {
    uni.authorize({
        scope: 'scope.writePhotosAlbum',
        fail: (res) => {
            console.log('未获取权限,');
            data.showDownloadPopup = true
        },
        success: () => {
            console.log('已获取权限');
            downloadFun()
        },
    })
}


const downloadFun = () => {
    console.log('data.saveUrlList',data.saveUrlList);
    data.saveUrlList.forEach((item:any) => {
        if (item.source == "urls") {
            videoDownload(item.value)
        }
        if (item.source == "images") {
            imgDownload(item.value)
        }
    });
}

// 图片下载
const imgDownload = async (url:string) => {
    await uni.showToast({
        title:"下载中",
        icon:"loading"
    })
    const result1 = await uni.downloadFile({ url });
    console.log('result1',result1);
    const tempFilePath = result1.tempFilePath;

    console.log('tempFilePath',tempFilePath);
    

    await uni.saveImageToPhotosAlbum({ filePath:tempFilePath });

    uni.hideLoading();
    await uni.showToast({
        title:"下载成功"
    })

    initList()
}

// 视频下载
const videoDownload = async (url:string) => {
    await uni.showToast({title:"下载中",icon:"loading"})

    const result1 = (await uni.downloadFile({url}))
    console.log('result1',result1);
    const tempFilePath = result1.tempFilePath;

    console.log('tempFilePath',tempFilePath);


    await uni.saveVideoToPhotosAlbum({
        filePath:tempFilePath
    });

    uni.hideLoading();//隐藏提示
    await uni.showToast({title:"下载成功",icon:"success"})

    initList()

}

// 初始化列表
const initList = () => {
    data.saveBtn = false
    data.dataList.forEach((item:any) => {
        item.combined.forEach((comItem:any) => {
            comItem.checked = false
        })
    })
}


const changeSave = () => {
    if (data.myenjoyObj.permission.isShareDownload != 1) {
        bcNotify.value.show('没有下载权限');
        return
    }
    data.saveBtn = true
}

const setdownload = () => {
     // #ifdef APP-PLUS
     uni.openAppAuthorizeSetting({
        success (res: any) {
            console.log(res)
        }
    })
    // #endif
    

    // #ifdef MP-WEIXIN
    uni.openSetting({
        success(res) {
            console.log(res.authSetting)
        }
    });
    // #endif

}

</script>

<style lang="scss" scoped>
.top_nav_box{
    background: #fff;
    box-sizing: border-box;
    .nav_box{
        width: 100%;
    }
    .sort_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        .sort_type_box{
            display: flex;
            align-items: center;
            .sort_type{
                padding: 0rpx 20rpx;
                padding-left: 0rpx;
                box-sizing: border-box;
                color: #666666;
                font-size: 28rpx;
                font-weight: 400;
            }
        }
        .save_text{
            font-weight: 400;
            color: #666666;
            font-size: 28rpx;
            .save_btn{
                color: #29C86F;
            }
        }
        
    }
    
}
.Space_box{
    width: 100%;
    height: 12rpx;
    background: #F8F9F9;
}
.page_content{
    padding: 40rpx 30rpx;
    padding-top: 10rpx;
    box-sizing: border-box;
    background: #fff;
    .cloudPhoto_item{
        margin-bottom: 40rpx;
        .cloudPhoto_title_box{
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;
            .cloudPhoto_time{
                color: #333333;
                font-size: 28rpx;
                margin-right: 18rpx;
                font-weight: 400;
            }
            .cloudPhoto_text{
                color: #999999;
                font-size: 28rpx;
                font-weight: 400;
            }
        }
        .img_list{
            width: 100%;
            margin-bottom: 30rpx;
            .item_box{
                position: relative;
                width:fit-content;
                .item_checkbox{
                    position: absolute;
                    top: 10rpx;
                    right: 12rpx;
                    z-index: 100;
                }
            }
            .combined_item{
                position: relative;
                &.have_right_img{
                    margin-right: 24rpx;
                }
                video {
                    width: 210rpx;
                    height: 140rpx;
                    object-fit: contain;
                    /* position: absolute; */
                    z-index: 99;
                }
                video:focus {
                    outline:none;
                }
            }
            &.flex_list{
                display: flex;
                align-items: center;
            }
            &.grid_list{
                display: grid;
                grid-gap: 12rpx;
                grid-template-columns: auto auto auto;
            }
            .img_item{
                width: 210rpx;
                height: 140rpx;
                border-radius: 2rpx;
                &.have_right_img{
                    margin-right: 24rpx;
                }
            }   
        }
    }
}
.download_box{
    width: 540rpx;
    background: #FFFFFF;
    border-radius: 24rpx;
    padding: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .download_title{
        font-weight: 600;
        font-size: 36rpx;
        color: #333333;
        margin-bottom: 8rpx;
    }
    .download_text{
        width: 392rpx;
        text-align: center;
        font-weight: 400;
        font-size: 28rpx;
        color: #616161;
        margin-bottom: 40rpx;
    }
    .setdownload_btn{
        width: 100%;
        height: 84rpx;
        line-height: 84rpx;
        text-align: center;
        border-radius: 42rpx;
        background: #EA3E1A;
        font-weight: 400;
        font-size: 28rpx;
        color: #FFFFFF;
        margin-bottom: 32rpx;
    }
    .cancel_btn{
        font-weight: 400;
        font-size: 32rpx;
        color: #666666;
    }
}
.video_box{
    width: 700rpx;
    height: 440rpx;
    video {
        width: 100%;
        height: 440rpx;
        object-fit: contain;
        /* position: absolute; */
        z-index: 99;
    }
    video:focus {
        outline:none;
    }
}
</style>
<style>
page{
    background: #fff;
}

</style>