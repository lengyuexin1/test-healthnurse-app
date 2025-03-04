<template>
    <view class="container">
        <z-paging ref="paging" :auto="false" :refresher-enabled="false">
            <clUpload
                  ref="upload"
                  v-model="data.list"
                  fileType="video"
                  :listStyle="data.uploadStyle"
                  :max="1"
                  useBeforeDelete
                  useBeforeUpload
                  @onError="uploadError"
                  @onVideo="onVideo"
                  @closePreviewVideo="closePreviewVideo"
                  @beforeDelete="beforeDelete"
                  @beforeUpload="beforeUpload"
            >
                <template v-slot:addImg>
                    <view class="addVideo column">
                        <TnIcon name="camera" :size="60" color="#AAAAAA"></TnIcon>
                        <text class="txt">选择视频</text>
                    </view>
                </template>
            </clUpload>
            <view class="bar"></view>

            <view>
                <view class="up_title_inp">
                    <TnInput class="tn-input" placeholder="请输入标题(2~30个字)" :border="false" fontSize="16"
                             v-model="data.title"
                             clearable :maxlength="30"></TnInput>
                </view>
                <view class="up_title_inp">
                    <TnInput class="up_textarea tn-input" v-model="data.describe" type="textarea"
                             placeholder="添加描述（选填）"
                             :maxlength="500" show-word-limit height="300rpx" auto-height/>
                </view>
            </view>
            <view v-if="data.isloadingImg" class="up_img_inp">
                <!--                <UploadLayout :maxCount="1" width="90px" height="90px" v-model="data.fileList" uploadPath="create"-->
                <!--                              @change="handleChange">-->
                <!--                    <view class="up_inp_text" slot="up-text">{{-->
                <!--                            data.fileList.length < 1 ? '添加封面图片' : '添加图片'-->
                <!--                        }}-->
                <!--                    </view>-->
                <!--                </UploadLayout>-->
                <ClUpload
                      ref="upload"
                      v-model="data.fileList"
                      :listStyle="data.uploadStyle"
                      :max="data.maxCount"
                      fileType="image"
                      imageType="image"
                      useBeforeDelete
                      useBeforeUpload
                      @beforeDelete="imgbeforeDelete"
                      @beforeUpload="imgbeforeUpload">

                    <template v-slot:addImg>
                        <view class="up_box">
                            <view class="up_icon">
                                <TnIcon color="#C9C9C9" name="add" size="40"/>
                            </view>
                            <view class="up_text">{{ data.fileList.length < 1 ? '添加封面图片' : '添加图片' }}
                            </view>
                        </view>
                    </template>
                </ClUpload>
            </view>
            <view class="channel">
                <view class="title row i-center">
                    <TnIcon :size="20" name="tags"></TnIcon>
                    选择发布渠道
                </view>
                <view class="name row i-center" @tap="clickPick">
                    <view :class="[data.channelName !== '' ? 'active' : '']">{{ data.channelName || '请选择' }}</view>
                    <TnIcon name="right" :size="12"></TnIcon>
                </view>
            </view>

            <template #bottom>
                <view class="bottom_box">
                    <view class="bottom_box_draft" @tap="clickBtn(1)">保存草稿</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">发布文章</view>
                </view>
            </template>
        </z-paging>
        <TnPicker
              v-model="data.categoryId"
              label-ley="name"
              value-ley="id"
              :open="data.pickShow"
              ref="uPicker"
              :data="data.columns"
              @confirm="confirm"
              @cancel="data.pickShow = false"
              @close="data.pickShow = false"
        ></TnPicker>
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script setup lang="ts">
import { uploadVideo } from '@/api/file-api'
import UploadLayout from '@/libs/upload/components/upload-layout.vue'
import { categoryAll, getDraftDetails, editContent, addContent } from '@/api/create-api'
import clUpload from '@/pagesCnt/uni_modules/cl-upload/components/cl-upload/cl-upload.vue'
import BCNotify from "@/components/notify/index.vue"
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import { onMounted, reactive, ref } from "vue"
import ClUpload from "@/pagesCnt/uni_modules/cl-upload/components/cl-upload/cl-upload.vue"

const bcNotify = ref()

interface Data {
    list: any[],
    fileList: any[],
    categoryList: any[],
    columns: any[],
    title: string,
    describe: string,
    uploadStyle: {
        columns: number,
        columnGap: string,
        rowGap: string,
        padding: string,
        height: string,
        radius: string
    },
    maxCount: number,
    disabled: boolean,
    isloadingImg: boolean,
    isPreviewVideo: boolean,
    channelName: string,
    channelId: string,
    pickShow: boolean
}

interface Props {
    categoryId: String,
    topic: String,
    isDratType: String,
    activityId: String,
    taskId: String, //任务id
    articleId: String, //草稿id
    type: Number, //话题
    id: String,//ID
}

const props = defineProps<Props>()
const data = reactive<Data>({
    list: [],
    fileList: [],
    categoryList: [],
    columns: [],
    title: '',
    describe: '',
    uploadStyle: {
        columns: 1,
        columnGap: '20rpx',
        rowGap: '20rpx',
        padding: '30rpx 50rpx',
        height: '300rpx',
        radius: '20rpx'
    },
    maxCount: 3, //图片上传最大值
    disabled: false,
    isloadingImg: false,
    isPreviewVideo: false,
    channelName: '',
    channelId: '',
    pickShow: false
})
onMounted(() => {
    categoryAll({ moduleType: 1 }).then((res) => {
        if (res.length) {
            const newArr = []
            for (const i in res) {
                for (const j in res[i].children) {
                    newArr.push(res[i].children[j])
                }
            }
            data.categoryList = newArr
            if (props.categoryId) {
                data.channelId = props.categoryId
                data.channelName = data.categoryList.find(item => item.id == props.categoryId)?.name
            }
            const pack = []
            newArr.map((item) => pack.push(item.name))
            data.columns = [pack]
        }
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })

    // 视频类型
    if (props.articleId !== '' && props.type == 2) {
        console.dir(props)
        getDraftDetails({
            id: props.id
        }).then((res) => {
            console.log(res)
            const { baseInfo } = res
            data.title = baseInfo?.title
            data.describe = baseInfo?.desc
            data.channelId = baseInfo?.categoryId
            data.channelName = baseInfo?.categoryName
            data.fileList = [baseInfo.cover]
            data.list = [baseInfo.videoUrl]
            data.isloadingImg = true
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        data.isloadingImg = true
    }
})

const goback = () => {
    uni.navigateBack({ delta: 1 })
}
const clickPick = () => {
    data.pickShow = true
}
const handleChange = (item) => {
    data.fileList = item
}
const imgbeforeUpload = (tempFile: any, next: any) => {
    uni.showLoading({
        title: '正在上传..'
    })
    uploadCertificate(tempFile.path).then((res: any) => {
        data.fileList.push(res.url)
        uni.hideLoading()
    })
}

/**
 * 文件删除前钩子
 * @param {Object} item 当前删除的图片或者视频信息
 * @param {Number} index 当前删除的图片或视频索引
 * @param {Function} next 调用此函数继续执行组件删除逻辑
 * */
const imgbeforeDelete = (item: any, index: any, next: any) => {
    uni.showModal({
        title: '提示信息',
        content: '确定要删除这个文件嘛？',
        success: res => {
            if (res.confirm) {
                // 清除信息
                data.fileList = []
                next()
            }
        }
    })
}

/**
 * 删除前钩子
 * @param {Object} item 当前删除的图片或者视频信息
 * @param {Number} index 当前删除的图片或视频索引
 * @param {Function} next 调用此函数继续执行组件删除逻辑
 * */
const beforeDelete = (item, index, next) => {
    uni.showModal({
        title: '提示信息',
        content: '确定要删除视频文件嘛？',
        success: res => {
            if (res.confirm) {
                next()
            }
        }
    })
}
/**
 * 上传前钩子
 * @param {Object} tempFile 当前上传文件信息
 * @param {Function} next 调用此函数继续执行组件上传逻辑
 * */
const beforeUpload = (tempFile, next) => {
    data.disabled = true
    uni.showLoading({
        title: '正在上传..'
    })
    uploadVideo(tempFile.path).then((res) => {
        data.list.push(res.url)
        uni.hideLoading()
        data.disabled = false
    })
}
/** 上传出错 */
const uploadError = (error) => {
    bcNotify.value.error(err.message)
}
// 点击视频
const onVideo = () => {
    // this.isPreviewVideo = true
}
// 关闭视频预览
const closePreviewVideo = () => {
    // this.isPreviewVideo = false
}
const getcategoryItemId = (name: string) => {
    const item = data.categoryList.find(item => item.name === name)
    return item ? item.id : null
}
const confirm = (val) => {

    data.pickShow = false
    data.channelName = val[0]
    data.channelId = getcategoryItemId(val[0])
}

const clickBtn = (status) => {
    const regex = /^[\p{P}|\s]+$/u

    if (data.list.length == 0) {
        bcNotify.value.error('请上传视频')
        return
    }
    else if (this.title == '') {
        bcNotify.value.error('请填写标题')
        return
    }
    else if (regex.test(this.title)) {
        bcNotify.value.error('标题不能仅有标点组成')
        return
    }
    else if (this.title.length <= 1) {
        bcNotify.value.error('标题字数不够')
        return
    }
    else if (this.fileList.length == 0) {
        bcNotify.value.error('请上传视频封面')
        return
    }
    else if (this.channelName == '') {
        bcNotify.value.error('请选择发布渠道')
        return
    }

    if ((props.articleId !== '' && props.type == 3 && status == 1) || props.isDratType == 1) {
        editContent({
            articleId: props.articleId || null,
            activityId: props.activityId || null,
            title: data.title,
            desc: data.describe,
            type: 2,
            isAddActivity: data.activityId ? 1 : 0,
            status: status,
            cover: data.fileList[0],
            categoryId: data.channelId,
            categoryName: data.channelName,
            keyword: [],
            videoUrl: data.list[0]
        }).then(() => {
            bcNotify.value.success('保存成功')
            setTimeout(() => {
                goback()
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)

        })
    }
    else {
        addContent({
            taskId: props.taskId,
            title: data.title,
            type: 2,
            status: status,
            desc: data.describe,
            cover: data.fileList[0],
            videoUrl: data.list[0],
            activityId: props.activityId || null,
            isAddActivity: props.activityId ? 1 : 0,
            articleId: props.articleId || null,
            categoryId: data.channelId,
            categoryName: data.channelName,
            keyword: []
        }).then(() => {
            const str = status == 1 ? '保存成功' : '发布成功'
            bcNotify.value.success(str)
            setTimeout(() => {
                goback()
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}
</script>

<style lang="scss" scoped>
.addVideo {
    width: 100%;
    height: 300rpx;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 28rpx;
    color: #aaaaaa;

    .txt {
        margin-top: 10rpx;
    }
}

.bar {
    width: 100%;
    height: 20rpx;
    background-color: #f8f9f9;
}

// padding: 0 30rpx 30rpx 30rpx;

.up_title_inp {
    margin: 15rpx 30rpx;
    border-bottom: 2rpx solid #f2f2f2;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .tn-input {
        width: 100%;
    }

    .up_textarea {
        min-height: 300rpx;
    }
}

.up_text_inp {
    margin: 5rpx 30rpx;
    box-sizing: border-box;

    .up_textarea {
        min-height: 300rpx !important;
        max-height: 500rpx !important;
        width: 100%;
    }

    .topic_box {
        display: flex;
        align-items: center;

        .topic_item {
            padding: 12rpx 16rpx;
            box-sizing: border-box;
            background: #f3f3f3;
            border-radius: 28rpx;
            text-align: center;
            color: #7e7e7e;
            font-size: 24rpx;
            margin-right: 20rpx;
        }
    }
}

.up_img_inp {
    margin: 0rpx 30rpx 0 30rpx;
    padding-top: 30rpx;
    padding-bottom: 30rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f2f2f2;

    .up_inp_text {
        margin-top: 14rpx;
        color: #c9c9c9;
        font-size: 24rpx;
        text-align: center;
    }

    .up_box {
        width: 200rpx;
        height: 200rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid #f8f8f8;
        padding: 20rpx;

        .up_text {
            margin-top: 24rpx;
            font-size: 24rpx;
            color: #C9C9C9;
            font-weight: 400;
        }
    }
}

.channel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 30rpx;
    padding: 30rpx 0;
    font-weight: bold;
    font-size: 30rpx;
    color: #333333;

    .title {
        flex: 1;
    }

    .name {
        font-weight: 400;
        font-size: 28rpx;
        color: #999999;
    }

    .active {
        margin-right: 10rpx;
        padding: 6rpx 28rpx;
        background: #dffef0;
        color: #29c86f;
        border-radius: 38rpx;
        font-size: 28rpx;
    }
}

.bottom_box {
    padding: 20rpx 30rpx;
    padding-bottom: 60rpx;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    align-items: center;
    border-top: 2rpx solid #f2f2f2;

    .bottom_box_draft {
        width: 250rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 46rpx;
        border: 2rpx solid #e3e3e3;
        margin-right: 20rpx;
        font-size: 32rpx;
        color: #535353;
    }

    .bottom_box_btn {
        font-size: 32rpx;
        height: 80rpx;
        width: 420rpx;
        text-align: center;
        color: #ffffff;
        background: #29c86f;
        line-height: 80rpx;
        border-radius: 46rpx;

        &.isnext {
            background: #29c86f;
        }
    }
}
</style>
