<template>
    <view class="container">
        <z-paging
            ref="paging"
            v-model="data.dataList"
            :auto="false"
            :fixed="true"
            :refresher-enabled="false"
            :show-loading-more-no-more-view="false"
            :show-default-loading-more-text="false"
            :show-loading-more-no-more-line="false" 
            @query="queryList"
            :defaultPageSize="50"
            :empty-view-img="getAssetsUrl('/empty/empty_icon_data.png')"
            empty-view-text="还没有数据哦~"
            :empty-view-img-style="{ width: '320rpx', height: '320rpx' }"
        >
            <template #top>
                <PageTopbg :zIndex="-1" :bgstyle="'background: #fff;'" :addheight="150"></PageTopbg>
                
                <bc-page-navbar :title="' '">
                    <template #back>
                        <view class="back_icon" @click="backInitIndex">
                            <TnIcon name="left" color="#2F2F2F" size="38" :bold="true"/>
                        </view>
                    </template>

                    <template #default>
                        <view class="page_title">
                            发布
                        </view>
                    </template>
                </bc-page-navbar>

                <view class="top_nav">
                    <TnTabs
                        v-model="data.topNavIndex"
                        color="#666666"
                        active-color="#EA3E1A"
                        bar-color="#EA3E1A"
                        :scroll="false"
                        :bottom-shadow="false"
                        font-size="32rpx"
                    >
                        <TnTabsItem
                        v-for="(item, index) in data.topNav"
                        :key="index"
                        :title="item.name"
                        active-color="#EA3E1A"
                        @click="changeTabs(item, index)"
                        />
                    </TnTabs>
                </view>
            </template>
            <!-- 相册 -->
            <view class="file_list">
                <view class="file_item" v-for="(item, index) in data.dataList" :key="index">
                    <image
                        v-if="item.isImg"
                        class="item_img"
                        :src="item.img"
                        mode="aspectFill"
                        @click="previewImage(item.img)"
                    />
                    <image
                        v-else
                        class="item_img"
                        :src="item.img"
                        @click="previewVideo(item)"
                        mode="aspectFill"
                        style="width: 246rpx; height: 246rpx;"
                    />
                    
                    <view class="fixed_box" @click="changeSelect(item)">
                        <image
                            v-if="!item.ischeck"
                            class="fixed_img"
                            :src="getAssetsUrl('/leyou/create/check_icon.svg')"
                            mode="scaleToFill"
                        />
                        <view class="is_Select" v-else>
                            {{ item.number }}
                        </view>
                    </view>
                </view>
            </view>
            
            <template #bottom>
                <view class="bottom_box" v-if="data.selectList.length == 0">
                    <view class="bottom_nav">
                        <view class="nav_item" @click="changeBottom(item,index)" :class="{ 'bottom_isSelect' : data.bottomIndex == index }" v-for="(item,index) in data.bottomList" :key="item.id">
                            <view>{{ item.name }}</view>
                            <view class="bottom_select" v-if="data.bottomIndex == index"></view>
                        </view>
                    </view>
                </view>
                <view class="bottom_upBox" v-else>
                    <view class="up_Box">
                        <view class="up_scroll">
                            <view class="up_list">
                                <view class="up_item" v-for="(item, index) in data.selectList" :key="index">
                                    <image
                                        class="up_itemImg"
                                        :src="item.img"
                                        mode="scaleToFill"
                                    />
                                    <image
                                        @click="delSelect(item,index)"
                                        class="item_fixedImg"
                                        :src="getAssetsUrl('/leyou/create/Upclose_icon.svg')"
                                        mode="scaleToFill"
                                    />
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="next_btnBox">
                        <view class="next_btn" @click="nextUp">下一步({{ data.selectList.length }})</view>
                    </view>
                </view>
                
            </template>



        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
        <yk-authpup ref="authpup" :isNativeHead="false" type="top" @changeAuth="reloadPage" permissionID="WRITE_EXTERNAL_STORAGE"></yk-authpup>
        <TnOverlay v-model:show="data.showOverlay">
            <view class="video_box">
                <video v-if="data.showOverlay" :src="data.videoSrc"></video>
            </view>
        </TnOverlay>
        <!-- 拍摄选项 -->
        <TnOverlay v-model:show="data.showUpMenu" :overlay-closeable="false" :duration="0" :zIndex="30080" >
            <view class="upMenu_box">
                <view class="upMenu_item" @click="fromCameraVideo">拍摄视频</view>
                <view class="upMenu_item" @click="fromCameraImg">拍摄相片</view>
                <view class="bar"></view>
                <view class="upMenu_item not_bottom" @click="data.showUpMenu = false">取消</view>
            </view>

        </TnOverlay>
    </view>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted, getCurrentInstance, nextTick} from 'vue'
import { onLoad, onShow, onHide, onReady } from '@dcloudio/uni-app'

import { getAssetsPic } from '@/common/setPicture'
import PageTopbg from "@/components/page-topbg/page-topbg.vue"
import dayjs from "dayjs"

import { PlatformManage } from "@bc/sys"
import { TempStorage } from "@bc/base"

import BCNotify from '@/components/notify/index.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnTabs from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue'
import TnTabsItem from '@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue'
import TnOverlay from '@tuniao/tnui-vue3-uniapp/components/overlay/src/overlay.vue'
import { gotoCreateLive, gotoNewUpcontentPage } from '@/routes/create-routes'
import { uploadFileApi, uploadVideo } from '@/api/file-api'
import { Debounce } from '@/libs/antivibthrot'

// #ifdef APP-PLUS || H5
// #endif

import ykAuthpup from "@/components/yk-authpup/yk-authpup.vue"

import { getimageFile, getvideoFile, closeArr } from '@/utils/getfiles'

interface Props {
}
const props = defineProps<Props>()


interface Data{
    imgList: any
    dataList: any
    sumNumber: number
    topNav: any
    topNavIndex: number
    bottomList: any
    bottomIndex: number
    selectList: any
    maxImgNumber: number
    isAndroid: boolean
    showOverlay: boolean // 预览视频
    videoSrc: string
    showUpMenu: boolean
    activityId: string
    topic: string
    isjoinActivity: number
    categoryId: string
    taskId: string|null
    isBackIndex: number|null

}
const data = reactive<Data>({
    imgList: [],
    dataList: [],
    sumNumber: 110,
    topNav: [
        // { id: 1, name: '全部' },
        { id: 2, name: '相片' },
        { id: 3, name: '视频' },
    ],
    topNavIndex: 0,
    bottomList: [
        { id: 1, name: '模板' },
        { id: 2, name: '相册' },
        { id: 3, name: '拍摄' },
        { id: 4, name: '直播' },
    ],
    bottomIndex: 1,
    selectList: [],
    maxImgNumber: 9,
    isAndroid: true,
    showOverlay: false,
    videoSrc: '',
    showUpMenu: false,
    activityId: '',
    topic: '',
    isjoinActivity: 0,
    categoryId: '',
    taskId: null,
    isBackIndex: null,
})


const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})


const bcNotify = ref()
const paging = ref()
const authpup = ref()

onMounted(() => {
    let systemInfo = uni.getSystemInfoSync()
    if (systemInfo.platform != 'ios') {
        data.isAndroid = true
    }else{
        data.isAndroid = false
    }

    // 获取权限
    checkPermission()
})

onLoad((option:any)=> {
    console.log('option',option);
    data.isBackIndex = option.isBackIndex ? option.isBackIndex : null 
    if (option.isjoinActivity == 1) {
        data.activityId = option.activityId
        data.topic = option.topic
        data.isjoinActivity = option.isjoinActivity
        data.categoryId = option.categoryId

    }
    if (option.taskId) {
        data.taskId = option.taskId
    }
})

// 应用进入后台
onHide(()=>{
    closeArr()
})


onShow(()=>{
    paging.value.reload();
})

onReady(()=>{

    console.log('进入页面获取相册');
    nextTick(()=>{
        queryList(1,50)
    })
})

const queryList = (pageNumber:number, pageSize:number) => {
    // #ifdef APP-PLUS || H5
    if (data.isAndroid) {
        console.log('获取相册');
        
        data.topNavIndex == 0 && getuserImgfileList(pageNumber, pageSize)
        data.topNavIndex == 1 && getuserVideofileList(pageNumber, pageSize)
    }else{
        (paging.value as any).complete([])
    }
    
    // getAllFile(pageNumber, pageSize)
    // #endif

    // #ifdef MP-WEIXIN
    getimgList(pageNumber, pageSize)
    // #endif
}

const changeTabs = (item: any, index: number) => {
    data.selectList = [];
    paging.value.reload();
}

const reloadPage = () => {
    console.log('加载页面');
    
    if (data.imgList.length == 0) {
        // paging.value.reload();
    }
}

// 微信调试
const getimgList = (pageNumber:number, pageSize:number) => {
    let arr = data.dataList

    for (let index = 0; index < pageSize; index++) {
        arr.push({
            img: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/merchant/license/1728961298409',
            url: 'https://xcpublic.oss-cn-shenzhen.aliyuncs.com/backend/env_test/merchant/license/1728961298409',
            ischeck: false,
        })
    }
    (paging.value as any).complete(arr)

    console.log('data.dataList',data.dataList);
}

// 获取内容合并
const getAllFile = (pageNumber:number, pageSize:number) => {
    console.log('pageNumber,pageSize',pageNumber,pageSize);

    let params = {
        pageNumber,
        pageSize,
        sortOrder: 'date_added_DESC'
    }
	
    let newArr = getimageFile(params)


    console.log('相册newArr',newArr);
    
    
    
}

// 获取全部相片
const getuserImgfileList = async (pageNumber:number, pageSize:number) => {


    let params = {
        pageNumber,
        pageSize,
        sortOrder: 'date_added_DESC'
    }
	
    // 获取相片
    let newArr = await getimageFile(params);

    console.log('获取全部相片',newArr);

    data.imgList = newArr;

    console.log('获取全部相片222',data.imgList);


    (paging.value as any).complete(newArr);

    console.log('相片data.dataList',data.dataList);

}

// 获取全部视频
const getuserVideofileList = (pageNumber:number, pageSize:number) => {
    console.log('获取全部视频');

    // 处理本地视频缩略图
    const KJVideoThumbnail = uni.requireNativePlugin('KJ-VideoThumbnail');

    let params = {
        pageNumber,
        pageSize,
        sortOrder: 'date_added_DESC'
    }
	
    // 获取视频
    let newArr = getvideoFile(params);
    
    data.imgList = newArr;
    console.log('视频data.imgList',data.imgList);
    

    const promises = data.imgList.map((item:any, index: number) => {
        return new Promise((resolve) => {
            // 视频类型需要静态资源路径处理第一帧画面
            var dic = {
                "videoPath": item.videoPath,
                "saveImagePath": plus.io.convertLocalFileSystemURL(
                    "_doc/KJ-VideoThumbnail/"), //保存缩略图的路径，必须传_doc下的本地绝对路径
                "saveImageName": index + ".png",
                "second": "0.0" //单位：秒，字符串类型
            };
            KJVideoThumbnail.getVideoThumbnailImage(dic, (result:any) => {
                var img = result["imagePath"]
                img.replace(/file:\/\//g, 'file://')
                item.img = img
                resolve(true); // 确保每次成功后调用 resolve
            });
        });
    });

    Promise.all(promises).then(() => {
        (paging.value as any).complete(data.imgList);
        console.log('data.imgList',data.imgList);
        
        uni.hideLoading();
    }).catch((error) => {
        console.error('Error compressing video:', error);
        uni.hideLoading();
    });
    
}


// 获取权限
const checkPermission = () => {
    // #ifdef APP-PLUS
    authpup.value.open()
    // #endif

    // #ifndef APP-PLUS
    uni.authorize({
        scope: 'ablum',
        fail: (res) => {
            console.log('未获取相册权限,');
        },
        success: () => {
            console.log('已获取相册权限');
        },
    })
    // #endif
}

// 切换底部操作
const changeBottom = (item:any, index:number) => {
    if (item.id == 1) {
        bcNotify.value.show('敬请期待')
        return
    }
    if (item.id == 3) {
        data.showUpMenu = true
        
        return
    }
    if (item.id == 4) {
        /*#ifdef APP-PLUS*/
        gotoCreateLive()
        /*#endif*/
        return
    }
    data.bottomIndex = index
}

// 预览相片
const previewImage = (url: string) => {
    uni.previewImage({
        urls: [url]
    });
}

// 预览视频
const previewVideo = (item: any) => {
    data.showOverlay = true
    data.videoSrc = item.src
}

// 选中
const changeSelect = (item:any) => {

    if ((data.topNavIndex == 0 && data.selectList.length >= data.maxImgNumber) || (data.topNavIndex == 1 && data.selectList.length >= 1)) {
        console.log('最大值');
        return
    }

    if (!item.ischeck) {
        item.ischeck = true      
    }else{
        item.ischeck = false
    }

    // 添加或更新选中列表
    if (item.ischeck) {
        // 确保只添加一次
        if (!data.selectList.includes(item)) {
            item.number = data.selectList.length + 1
            data.selectList.push(item);
        }
    } else {
        // 移除 ischeck 为 false 的元素
        data.selectList = data.selectList.filter((selectItem: any, selectIndex: number) =>{
            return selectItem !== item
        });

        // 重置选中计数器
        data.selectList.forEach((selectItem: any, selectIndex: number) => {
            selectItem.number = (selectIndex+1)
        })
        
    }

    console.log('data.selectList',data.selectList);
    
    
}

const nextUp = () => {


    // #ifdef APP-PLUS
    uni.showLoading({
        title: '上传中...'
    });

    console.log('data.selectList',data.selectList);
    const urlList = [] as any
    
    const promises = data.selectList.map((item:any, index:number) => {
	    const url = item.file
        const name = dayjs().valueOf() + '' + index
        console.log('item',item);
        console.log('name',name);
        
        if (item.isVideo) {
            console.log('上传视频');
            return new Promise((resolve, reject) => {
                uploadVideo(url).then((res:any) => {
                    urlList.push({
                        url: res.url,
                        isImg: item.isImg,
                        isVideo: item.isVideo,
                    })
                    resolve(true)
                }).catch(err => {
                    console.log('上传err',err);
                    reject(false)
                })
            })
        }
        
        console.log('上传相片');
        return new Promise((resolve, reject) => {
            uploadFileApi(url,name,'merchant/license').then((res:any) => {
                urlList.push({
                    url: res.url,
                    isImg: item.isImg,
                    isVideo: item.isVideo,
                })
                resolve(true)
            }).catch(err => {
                console.log('上传err',err);
                reject(false)
            })
	    })
    });

    // 上传完成
    Promise.all(promises).then(() => {
        uni.hideLoading();

        console.log('urlList.urlList',urlList);

        const UpurlList = TempStorage.savewx({
            urlList
        })

        
        if (data.isjoinActivity == 1) {
            gotoNewUpcontentPage({
                UpurlList,
                isjoinActivity: data.isjoinActivity,
                activityId: data.activityId,
                topic: data.topic,
                categoryId: data.categoryId,
                isBackIndex: data.isBackIndex,
            })
            return
        }
        if (data.taskId) {
            gotoNewUpcontentPage({
                UpurlList,
                taskId: data.taskId,
                isBackIndex: data.isBackIndex,

            })
            return
        }
        gotoNewUpcontentPage({
            UpurlList,
            isBackIndex: data.isBackIndex,

        })

    }).catch((error) => {
        uni.hideLoading();

        console.error('上传Error:', error);
    });
    // #endif



    // #ifdef MP-WEIXIN
    const UpurlList = TempStorage.savewx({
        urlList: data.selectList
    })

    gotoNewUpcontentPage({
        UpurlList,
        isBackIndex: data.isBackIndex,

    })
    // #endif

}

// 取消选中
const delSelect = (item:any, index:number) => {
    
    changeSelect(item)
    console.log('data.selectList',data.selectList);
    
}

// 相机获取视频
const fromCameraVideo = () => {
    uni.chooseVideo({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
            console.log('res.tempFilePath4',res.tempFilePath);
            AlbumUpFile([res.tempFilePath],2)
        }
    })
}

// 相机获取相片
const fromCameraImg = () => {
    uni.chooseImage({
        sourceType: ['camera'],
        count: 1,
        success: function (res) {
            console.log('res.tempFilePath2',res.tempFilePaths);
            AlbumUpFile(res.tempFilePaths,1)
        }
    })
} 

const AlbumUpFile = (selectList:any, fileType:number) =>{
    uni.showLoading({
        title: '上传中...'
    });

    console.log('data.selectList11',selectList);
    const urlList = [] as any

    const promises = selectList.map((item:any, index:number) => {
	    const url = item
        const name = dayjs().valueOf() + '' + index
        console.log('item1',item);
        console.log('name1',name);
        
        if (fileType == 2) {
            console.log('上传视频');
            return new Promise((resolve, reject) => {
                uploadVideo(url).then((res:any) => {
                    console.log('res1',res);
                    
                    urlList.push({
                        url: res.url,
                        isImg: false,
                        isVideo: true,
                    })
                    console.log('urlList1',urlList);
                    
                    resolve(true)
                }).catch((err:any) => {
                    console.log('上传err',err);
                    reject(false)
                })
            })
        }
        
        console.log('上传相片');
        return new Promise((resolve, reject) => {
            uploadFileApi(url,name,'merchant/license').then((res:any) => {
                urlList.push({
                    url: res.url,
                    isImg: true,
                    isVideo: false,
                })
                console.log('urlList2',urlList);

                resolve(true)
            }).catch((err:any) => {
                console.log('上传err',err);
                reject(false)
            })
        })
    });

    // 上传完成
    Promise.all(promises).then(() => {
        uni.hideLoading();

        console.log('urlList.urlList1',urlList);

        const UpurlList = TempStorage.savewx({
            urlList
        })
 
        
        if (data.isjoinActivity == 1) {
            gotoNewUpcontentPage({
                UpurlList,
                isjoinActivity: data.isjoinActivity,
                activityId: data.activityId,
                topic: data.topic,
                isBackIndex: data.isBackIndex,

            })
            return
        }
        gotoNewUpcontentPage({
            UpurlList,
            isBackIndex: data.isBackIndex,

        })

    }).catch((error) => {
        uni.hideLoading();

        console.error('上传Error:', error);
    });
}

const backInitIndex = () => {
    uni.navigateBack()
}

</script>
  
<style lang="scss" scoped>
.back_icon{
    height: 68rpx;
    display: flex;
}
.page_title{
    font-size: 34rpx;
    color: #333333;
    font-weight: 500;
}
.top_nav{
    // border-top: 2rpx solid #F2F2F2;
    padding-bottom: 10rpx;
    box-sizing: border-box;
    background: #fff;
}

.file_list{
    display: grid;
    grid-gap: 2rpx;
    grid-template-columns: auto auto auto;
    .file_item{
        position: relative;
        background: #ACACAC;
        width: 246rpx;
        height: 246rpx;
        .item_img{
            width: 100%;
            height: 100%;
        }
        
        .fixed_box{
            position: absolute;
            width: 36rpx;
            height: 36rpx;
            top: 12rpx;
            right: 12rpx;
            .fixed_img{
                width: 100%;
                height: 100%;
            }
            .is_Select{
                width: 100%;
                height: 100%;
                background: #EA3E1A;
                line-height: 36rpx;
                text-align: center;
                font-size: 26rpx;
                color: #fff;
                border-radius: 50%;
            }
        }
    }
}
.bottom_box{
    padding: 28rpx 60rpx;
    padding-bottom: 80rpx;
    box-sizing: border-box;
    background: #fff;
    .bottom_nav{
        height: 62rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .nav_item{
            font-size: 32rpx;
            color: #333333;
            position: relative;
            &.bottom_isSelect{
                font-weight: 600;
            }
            .bottom_select{
                position: absolute;
                left: 50%;
                bottom: -12rpx;
                transform: translate(-50%,0);
                background: #EA3E1A;
                width: 36rpx;
                height: 6rpx;
                border-radius: 6rpx;
            }
        }
    }
}
.bottom_upBox{
    background: #fff;
    .up_Box{
        padding: 24rpx;
        box-sizing: border-box;
        .up_scroll{
            width: 100%;
            height: 128rpx;
            overflow: scroll; 
        }
        .up_list{
            display: flex;
            align-items: center;           
            .up_item{
                width: 128rpx;
                height: 128rpx;
                border-radius: 16rpx;
                background: #D1D1D1;
                overflow: hidden;
                margin-right: 16rpx;
                flex-shrink: 0;
                position: relative;
                .up_itemImg{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .item_fixedImg{
                    position: absolute;
                    width: 28rpx;
                    height: 28rpx;
                    top: 10rpx;
                    right: 10rpx;
                }
            }
        }
    }
    .next_btnBox{
        display: flex;
        justify-content: flex-end;
        padding: 22rpx 26rpx;
        padding-bottom: 76rpx;
        box-sizing: border-box;
        .next_btn{
            padding: 10rpx 20rpx;
            box-sizing: border-box;
            border-radius: 30rpx;
            background: #EA3E1A;
            font-size: 24rpx;
            color: #FFFFFF;
            
        }
    }

}
.video_box{
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    left: 0rpx;
    background: #fff;
    width: 100%;
    height: 424rpx;
    video{
        width: 100%;
        height: 100%;
    }
}
.upMenu_box{
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;

    width: 100%;
    border-radius: 16rpx;
    box-sizing: border-box;
    overflow: hidden;
    background: #FFFFFF;
    padding-bottom: 60rpx;

    .bar{
        width: 100%;
        height: 12rpx;
        background: #F2F2F2;
    }
    .upMenu_item{
        width: 100%;
        text-align: center;
        color: #333333;
        border-bottom: 2rpx solid #F2F2F2;
        padding: 26rpx 0rpx;
        font-size: 32rpx;
        &.not_bottom{
            border-bottom: none;
        }
    }
}
</style>