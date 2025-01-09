<template>
    <view class="container">
        <z-paging 
		ref="paging" 
		:auto="false"
		:refresher-enabled="false"
        :use-page-scroll="true"
		>
            <view class="article_page">
                <view class="inp_box">
                    <TnInput 
                    placeholder="请输入标题(2~30个字)" 
                    :underline="true" 
                    :maxlength="30"
                    border-color="#F2F2F2"
                    clearable
                    v-model="data.titlevalue"
                    :custom-style="{ fontSize: '36rpx' }"
                    ></TnInput>
                </view>
                <view class="textarea_box">
                    <TnInput 
                    type="textarea" 
                    height="280rpx" 
                    placeholder="请输入正文" 
                    :maxlength="500" 
                    :underline="true" 
                    :show-word-limit="true" 
                    border-color="#F2F2F2" 
                    v-model="data.textvalue"
                    @change="inpChange"></TnInput>
                </view>


                <view class="channel ">
                    <view class="title">
                        <TnIcon name="share" color="#333333" size="32rpx" />选择发布渠道(必选)
                    </view>
                    
                    <view class="tag_list_box">
                        <view class="tag_item" :class="{ 'is_active' : data.channelId == item.id }" @click="changeTag(item,index)" v-for="(item, index) in data.categoryList" :key="item.id">
                            {{ item.name }}
                        </view>
                    </view>
                </view>


                <view class="up_img_inp" v-if="data.showFileBox">
                    <view class="title">上传封面图<text>每张图片大小不能超过3M</text></view>
                    <imgUpload v-model:imageArr="data.fileList1" :limit="3" ref="imgUploadref">
                        <template #uploadBtn>
                            <view @click="openUp" class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="80"/>
                                </view>
                                <view class="up_text">
                                    {{ data.fileList1.length < 1 ? '添加封面图片' : '添加图片' }}
                                </view>
                            </view>
                        </template>
                    </imgUpload>
                </view>
                
                <!-- v-if="data.keywordItem" -->
                <view class="topicText" v-if="false">
                    {{ data.keywordItem }}
                </view>

            </view>

            <template #bottom>
                <view class="bottom_box">
                    <view class="bottom_box_draft" @tap="clickBtn(1)">保存草稿</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">
                        发布文章
                    </view>
                </view>
            </template>
        </z-paging>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>
    
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import imgUpload from '@/components/upload/img-upload.vue'
import { addContent, editContent, categoryAll, getDraftDetails, articleAudit } from '@/api/create-api'
import BCNotify from '@/components/notify/index.vue'

const props = withDefaults(defineProps<{
    ischange: number
    articleId: any
    type: number,
    taskId:string,
    activityId:string|null,//活动id
    topic:string,
    categoryId:string
}>(),{
    taskId:'',
    ischange: 0,
    articleId: '',
    type: 0, // 3:图文 2：视频
    activityId:null,
    topic:'',
    categoryId: ''
})

interface Data {
    isNext:boolean
    titlevalue:string
    textvalue:string
    isloadingImg:boolean
    maxCount:number
    fileList1:any
    channelId: string
    channelName: string
    openPicker: boolean
    pickerData: any
    categoryList: any
    showFileBox: boolean,
    keywordItem:string|null,
    keywordNumber: number,
    addactivityId: string | null,

}
const data = reactive<Data>({
    isNext:false,
    titlevalue:'',
    textvalue:'',
    isloadingImg:false,
    maxCount:3,
    fileList1:[],
    channelId: '',
    channelName: '',
    openPicker: false,
    pickerData: [],
    categoryList: [],
    showFileBox: false,
    keywordItem: null,
    keywordNumber: 0,
    addactivityId: null,

})

const bcNotify = ref()

onMounted(() => {
    data.addactivityId = props.activityId
    categoryAll({ categoryType: 1, moduleType: 1 }).then((res: any) => {
        if (res.length) {
            let newArr: any[] = []
            for (const i in res) {
                for (const j in res[i].children) {
                    newArr.push(res[i].children[j])
                }
            }

            if (props.categoryId) {
                newArr = newArr.filter((item:any) => {
                    return item.id == props.categoryId
                })
            }

            data.categoryList = newArr

            const pack: any[] = []
            newArr.map((item: any) => pack.push(item.name))
            data.pickerData = pack

        }
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })

    // 图文类型
    if (props.articleId !== '' && props.type == 3) {
        getDraftDetails({
            contentId: props.articleId
        }).then((res: any) => {
            data.titlevalue = res?.title
            data.channelId = res?.categoryId
            data.channelName = res?.categoryName
            data.fileList1 = res?.images
            data.showFileBox = true;

            data.keywordItem = res.keyword[0]

            // let newStr = data.keywordItem != '' ? '#' + data.keywordItem + '#' : ''
            data.textvalue = res?.desc

            data.keywordNumber = data.keywordItem!.length
        }).catch((err: any) => {
            bcNotify.value.error(err.message)
        })
    }
    else {

        data.keywordItem = props.topic;

        let newStr = data.keywordItem != '' ? '#' + data.keywordItem + '#' : ''
        data.textvalue = newStr

        data.keywordNumber = data.keywordItem!.length

        data.showFileBox = true
    }
    
    // #ifdef MP-WEIXIN 

    // #endif
})
onLoad(()=> {
    // #ifdef MP-WEIXIN 
    uni.getPrivacySetting({
        success: (res:any) => {
            console.log(res) // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
            if (res.needAuthorization) {
                // 需要弹出隐私协议
                console.log('需要弹出隐私协议');
            } else {
                // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
                console.log('用户已经同意');
            }
        },
        fail: () => {},
        complete: () => {}
    })
    // #endif
})

const imgUploadref = ref()
const openUp = () => {
    nextTick(()=>{
        console.log('手动调用',imgUploadref ,imgUploadref.value); 
        imgUploadref.value.chooseFileFun()
    })
}

const clickBtn = (status:number) =>{
    // if (!data.isNext) {
    //     bcNotify.value.show('内容未填写完毕')
    //     return
    // }
    const regex = /^[\p{P}|\s]+$/u

    if (data.titlevalue == '') {
        bcNotify.value.show('请输入标题')
        return
    }
    else if (regex.test(data.titlevalue)) {
        bcNotify.value.show('标题不能仅有标点组成')
        return
    }
    else if (data.titlevalue.length <= 1) {
        bcNotify.value.show('标题字数不够')
        return
    }
    else if (data.textvalue == '') {
        bcNotify.value.show('请输入正文')
        return
    }
    else if (data.textvalue.length > 500) {
        bcNotify.value.show('正文须在500个字以内')
        return
    }
    else if (data.fileList1.length == 0) {
        bcNotify.value.show('请上传封面')
        return
    }
    else if (data.channelName == '') {
        bcNotify.value.show('请选择发布渠道')
        return
    }

    if (props.articleId !== '' && props.type == 3 && status == 1) {
        editContent({
            articleId: props.articleId,
            title: data.titlevalue,
            desc: data.textvalue,
            type: 3,
            cover:data.fileList1[0],
            images:data.fileList1,
            status,
            categoryId: data.channelId,
            categoryName: data.channelName,
            taskId:props.taskId,
            keyword: [data.keywordItem],
            activityId: data.addactivityId ? data.addactivityId : null,
            isAddActivity: data.addactivityId ? 1 : 0,
        }).then(() => {
            bcNotify.value.show('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        props.ischange ? editContent({
            articleId: props.articleId,
            title: data.titlevalue,
            desc: data.textvalue,
            taskId:props.taskId,
            type: 3,
            cover:data.fileList1[0],
            images:data.fileList1,
            status,
            categoryId: data.channelId,
            categoryName: data.channelName,
            keyword: [data.keywordItem],
            activityId: data.addactivityId ? data.addactivityId : null,
            isAddActivity: data.addactivityId ? 1 : 0,
        }).then(() => {
            bcNotify.value.show('发布成功,请等待平台审核!')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        }) : articleAudit({
            title:data.titlevalue,
            desc:data.textvalue,
            images:data.fileList1
        }).then(() => {
            addContent({
                title:data.titlevalue,
                type:3,
                taskId:props.taskId?props.taskId:null,
                status,
                desc:data.textvalue,
                cover:data.fileList1[0],
                images:data.fileList1,
                activityId: data.addactivityId ? data.addactivityId : null,
                categoryId: data.channelId,
                categoryName: data.channelName,
                keyword:[data.keywordItem],
                isAddActivity: data.addactivityId ? 1 : 0,
            }).then(()=>{
                const str = status == 1 ? '保存成功' : '发布成功,请等待平台审核!'
                bcNotify.value.show(str)
                setTimeout(()=>{
                    uni.navigateBack({ delta: 1 })
                },800)
            }).catch((err) => {
                bcNotify.value.error(err.message)
            })
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

const inpChange = (value:string) => {
    let matches = value.match(/#/g)?.length;

    if (!data.keywordItem) {
        return
    }

    if (matches! >= 2) {
        console.log('话题存在');
        
    }else{
        console.log('话题不存在');
        let newStr = value.slice(data.keywordNumber + 1)
        data.textvalue = newStr

        data.addactivityId = null
        data.keywordItem = ''
    }
}

const changeTag = (item:any, index:number) => {
    console.log('index',index);
    
    if (data.channelId == item.id) {
        console.log('清除');
        
        data.channelId = ''
        data.channelName = ''

    }
    data.channelId = item.id
    data.channelName = item.name
    console.log('item',item);
    
}

</script>

<style scoped>
/* tn-input tn-text-left tn-border-bottom tn-underline tn-input */
:deep(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
:global(.tn-input .tn-text-left .tn-border-bottom .tn-underline .tn-input) {
    font-size: 36rpx;
}
</style>

<style lang="scss" scoped>
.container{
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    background: #fff;
}
.article_page{
    .inp_box{
        margin-bottom: 10rpx;
    }
    .textarea_box{
        width: 100%;
    }
    .up_img_inp{
        padding: 40rpx 0;
        box-sizing: border-box;
        // border-bottom: 2rpx solid #F2F2F2;

        .title {
            font-size: 30rpx;
            font-weight: bold;
            color: #333333;
            margin-bottom: 32rpx;

            text {
                padding-left: 12rpx;
                font-weight: 400;
                font-size: 24rpx;
                color: #999999;
            }
        }

        .up_box{
            width: 228rpx;
            height: 228rpx;
            background: #F8F8F8;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .up_text{
                margin-top: 24rpx;
                font-size: 24rpx;
                color: #C9C9C9;
                font-weight: 400;
            }
        }
    }
    .channel {
        padding: 40rpx 0;
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
        border-bottom: 2rpx solid #F2F2F2;

        .title {
            flex: 1;
            margin-bottom: 32rpx;
        }

        .name {
            font-weight: 400;
            font-size: 28rpx;
            color: #999999;
        }

        .active {
            margin-right: 10rpx;
            padding: 6rpx 28rpx;
            background: #FDEBE7;
            border-radius: 38rpx;
            font-size: 28rpx;
            color: #EA3E1A ;
        }
        .tag_list_box{
            display: flex;
            align-items: center;
            .tag_item{
                padding: 12rpx 24rpx;
                box-sizing: border-box;
                font-weight: 400;
                color: #666666;
                font-size: 24rpx;
                background: #F3F3F3;
                border-radius: 28rpx;
                margin-right: 20rpx;
                &.is_active{
                    background: #EA3E1A;
                    color: #FFFFFF;
                }

            }
        }
    }
    .topicText{
        background: #FDEBE7;
        border-radius: 38rpx;
        padding: 8rpx 26rpx;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 28rpx;
        color: #EA3E1A;
        text-align: center;
        width:fit-content;
    }
}
.bottom_box{
    display: flex;
    align-items: center;
    border-top: 2rpx solid #F2F2F2;
    padding: 16rpx 30rpx;
    padding-bottom: 50rpx;
    box-sizing: border-box;
    .bottom_box_draft{
        width: 250rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 46rpx;
        border: 2rpx solid #E3E3E3;
        margin-right: 20rpx;
        font-size: 32rpx;
        color: #535353;
    }
	.bottom_box_btn {
		font-size: 32rpx;
		height: 80rpx;
		width: 420rpx;
		text-align: center;
		color: #FFFFFF;
        background: #EA3E1A;
        line-height: 80rpx;
		border-radius: 46rpx;
        // &.isnext{
		//     background: #29C86F;
        // }

	}
}

.bar {
    width: 100%;
    height: 20rpx;
    background-color: #F8F9F9;
}
</style>
  