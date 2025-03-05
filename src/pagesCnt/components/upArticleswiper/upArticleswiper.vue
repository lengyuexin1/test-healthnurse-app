<template>
    <view class="container">
        <view class="bar"></view>
        <z-paging ref="paging" :auto="false" :refresher-enabled="false">
            <view class="up_inp_box">
                <view class="up_title_inp">
                    <TnInput class="tn-input" placeholder="请输入标题(2~30个字)" :border="false" fontSize="16"
                             v-model="data.title"
                             clearable
                             :maxlength="30"></TnInput>
                </view>
                <view class="up_text_inp">
                    <TnInput class="up_textarea" v-model="data.desc" type="textarea" placeholder="请输入正文"
                             :maxlength="500" show-word-limit height="300rpx" auto-height/>
                    <!--                    <u&#45;&#45;textarea class="up_textarea" v-model="data.desc" :maxlength="500" placeholder="请输入正文"-->
                    <!--                                 border="none" :showWordLimit="true" count></u&#45;&#45;textarea>-->
                    <view class="topic_box" v-if="data.isaddac == 0 && props.topic.length != 0 && props.topic[0]">
                        <view class="topic_item">#{{ props.topic }}</view>
                    </view>
                </view>
                <view class="up_img_inp" v-if="data.isloadingImg">
                    <!--                    <UploadLayout :maxCount="data.maxCount" width="90px" height="90px" v-model="data.fileList"-->
                    <!--                                  uploadPath="comment" @change="handleChange">-->
                    <!--                        <view class="up_inp_text" slot="up-text">{{-->
                    <!--                                data.fileList.length < 1 ? '添加封面图片' : '添加图片'-->
                    <!--                            }}-->
                    <!--                        </view>-->
                    <!--                    </UploadLayout>-->
                    <ClUpload
                          ref="upload"
                          v-model="data.fileList"
                          :listStyle="data.uploadStyle"
                          :max="data.maxCount"
                          fileType="image"
                          imageType="image"
                          useBeforeDelete
                          useBeforeUpload
                          @beforeDelete="beforeDelete"
                          @beforeUpload="beforeUpload">

                        <template v-slot:addImg>
                            <view class="up_box">
                                <view class="up_icon">
                                    <TnIcon name="add" color="#C9C9C9" size="40"/>
                                </view>
                                <view class="up_text">{{ data.fileList.length < 1 ? '添加封面图片' : '添加图片' }}
                                </view>
                            </view>
                        </template>
                    </ClUpload>
                </view>
                <view class="channel">
                    <view class="title row i-center">
                        <TnIcon name="tags" :size="20"></TnIcon>
                        选择发布渠道
                    </view>
                    <view class="name row i-center" @tap="clickPick">
                        <view :class="[data.channelName !== '' ? 'active' : '']">{{
                                data.channelName || '请选择'
                            }}
                        </view>
                        <TnIcon name="right" :size="12"></TnIcon>
                    </view>
                </view>
            </view>

            <template #bottom>
                <view class="bottom_box">
                    <view class="bottom_box_draft" @tap="clickBtn(1)">保存草稿</view>
                    <view class="bottom_box_btn" @tap="clickBtn(2)">发布文章</view>
                </view>
            </template>
        </z-paging>
        <!--        <view v-if="data.pickShow">-->
        <TnPicker
              v-model="props.categoryId"
              label-ley="name"
              value-ley="id"
              :open="data.pickShow"
              ref="uPicker"
              :data="data.columns"
              @confirm="confirm"
              @cancel="data.pickShow = false"
              @close="data.pickShow = false"
        ></TnPicker>
        <!--        </view>-->
        <!--        <u-toast ref="uToastRef"></u-toast>-->
        <BCNotify ref="bcNotify"></BCNotify>
    </view>
</template>

<script lang="ts" setup>
import { getAssetsPic } from '@/common/setPicture'
import { addContent, articleAudit, categoryAll, editContent, getDraftDetails } from '@/api/create-api'
import { computed, onMounted, reactive, ref } from "vue"
import BCNotify from "@/components/notify/index.vue"
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import ClUpload from "@/pagesCnt/uni_modules/cl-upload/components/cl-upload/cl-upload.vue"
import { uploadCertificate } from "@/api/file-api"

const bcNotify = ref()

interface Data {
    desc: string,
    title: string,
    fileList: any[],
    uploadStyle: object,
    maxCount: number,
    isloadingImg: boolean,
    isaddac: number,
    channelName: string,
    channelId: string,
    pickShow: boolean,
    categoryList: any[],
    columns: any[]
}

interface Props {
    categoryId: String,
    topic: String,
    activityId: String,
    taskId: String, //任务id
    isDratType: String, //是否草稿发布
    articleId: String, //草稿id
    type: Number, //话题
    id: String,//ID
}

const props = defineProps<Props>()
const data = reactive<Data>({
    desc: '',
    title: '',
    fileList: [], //上传的图片列表
    uploadStyle: {
        columns: 3,
        // columnGap: '0',
        rowGap: '0',
        padding: '0',
        height: '150rpx',
        radius: '20rpx'
    },// 上传图片样式
    maxCount: 3, //图片上传最大值
    isloadingImg: false,
    isaddac: 1,
    channelName: '',
    channelId: '',
    pickShow: false,
    categoryList: [],
    columns: []
})
const getAssetsUrl = computed(() => {
    return (str: string) => {
        return getAssetsPic(str)
    }
})

onMounted(() => {
    if (props.topic) {
        data.desc = `#${props.topic}#`
    }

    categoryAll({ moduleType: 1 }).then((res: any) => {
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
            newArr.map((item: any) => pack.push(item.name))
            data.columns = [pack]
        }
    }).catch((err) => {
        bcNotify.value.error(err.message)
    })
    // 图文类型
    if (props.articleId !== '' && props.type == 3) {
        getDraftDetails({
            contentId: props.articleId
        }).then((res) => {
            console.log(res)
            data.title = res?.title
            data.desc = res?.desc
            data.channelId = res.categoryId
            data.channelName = res?.categoryName
            data.fileList = res?.images
            console.log(data.fileList)
            data.isloadingImg = true
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        data.isloadingImg = true
    }
})
const handleChange = (item) => {
    data.fileList = item
}

const beforeUpload = (tempFile: any, next: any) => {
    uni.showLoading({
        title: '正在上传..'
    })
    uploadCertificate(tempFile.path).then((res: any) => {
        data.fileList.push(res.url)
        uni.hideLoading()
    })
}

/**
 * 删除前钩子
 * @param {Object} item 当前删除的图片或者视频信息
 * @param {Number} index 当前删除的图片或视频索引
 * @param {Function} next 调用此函数继续执行组件删除逻辑
 * */
const beforeDelete = (item: any, index: any, next: any) => {
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
const goback = () => {
    uni.navigateBack({ delta: 1 })
}
const clickPick = () => {
    data.pickShow = true
}
const getcategoryItemId = (name: string) => {
    const item = data.categoryList.find(item => item.name === name)
    return item ? item.id : null
}
const confirm = (val: any) => {
    data.pickShow = false
    data.channelName = val[0]
    data.channelId = getcategoryItemId(val[0])
}
const clickBtn = (status) => {
    const regex = /^[\p{P}|\s]+$/u
    if (data.title == '') {
        bcNotify.value.error('请输入标题')
        return
    }
    else if (regex.test(data.title)) {
        bcNotify.value.error('标题不能仅有标点组成')
        return
    }
    else if (data.title.length <= 1) {
        bcNotify.value.error('标题字数不够')
        return
    }
    else if (data.desc == '') {
        bcNotify.value.error('请输入正文')
        return
    }
    else if (data.fileList.length == 0) {
        bcNotify.value.error('请上传封面')
        return
    }
    else if (data.channelName == '') {
        bcNotify.value.error('请选择发布渠道')
        return
    }
    console.log(data.type)
    if ((data.articleId !== '' && data.type == 3 && status == 1) || data.isDratType == 1) {
        editContent({
            articleId: data.articleId || null,
            activityId: data.activityId || null,
            title: data.title,
            desc: data.desc,
            type: 3,
            isAddActivity: data.activityId ? 1 : 0,
            cover: data.fileList[0],
            images: data.fileList,
            status,
            categoryId: data.channelId,
            categoryName: data.channelName,
            keyword: []
        }).then(() => {
            bcNotify.value.success('保存成功')
            setTimeout(() => {
                uni.navigateBack({ delta: 1 })
            }, 800)
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
    else {
        articleAudit({
            title: data.title,
            desc: data.desc,
            images: data.fileList
        }).then(() => {
            addContent({
                taskId: props.taskId,
                title: data.title,
                type: 3,
                status,
                desc: data.desc,
                cover: data.fileList[0],
                images: data.fileList,
                isAddActivity: props.activityId ? 1 : 0,
                articleId: props.articleId || null,
                activityId: props.activityId || null,
                categoryId: data.channelId,
                categoryName: data.channelName,
                keyword: []
            }).then(() => {
                const str = status == 1 ? '保存成功' : '发布成功'
                bcNotify.value.success(str)
                setTimeout(() => {
                    uni.navigateBack({ delta: 1 })
                }, 800)
            }).catch((err) => {
                bcNotify.value.error(err.message)
            })
        }).catch((err) => {
            bcNotify.value.error(err.message)
        })
    }
}

</script>


<style lang="scss" scoped>
.top_box {
    background: linear-gradient(180deg, #dff7ef 0%, #ffffff 170%);
    padding-bottom: 20rpx;
}

.up_inp_box {
    width: 100%;
    background: #ffffff;

    .up_title_inp {
        margin: 0rpx 30rpx;
        border-bottom: 2rpx solid #f2f2f2;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .tn-input {
            width: 100%;
        }
    }

    .up_text_inp {
        margin: 5rpx 30rpx;
        box-sizing: border-box;
        min-height: 300rpx;

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
        width: 100%;
        height: 150rpx;
        padding: 0 30rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: flex-start;

        .up_box {
            width: 150rpx;
            height: 150rpx;
            background: #F8F8F8;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .up_text {
                margin-top: 24rpx;
                font-size: 24rpx;
                color: #C9C9C9;
                font-weight: 400;
            }
        }
    }

    //.up_img_inp {
    //    margin: 0rpx 30rpx 0rpx 30rpx;
    //    padding-top: 30rpx;
    //    padding-bottom: 30rpx;
    //    box-sizing: border-box;
    //    border-bottom: 2rpx solid #f2f2f2;
    //    border-top: 2rpx solid #f2f2f2;
    //
    //    .up_img_inp {
    //        width: 150rpx;
    //        height: 150rpx;
    //        // margin-top: 20rpx;
    //
    //        .up_box {
    //            width: 150rpx;
    //            height: 150rpx;
    //            background: #F8F8F8;
    //            display: flex;
    //            align-items: center;
    //            justify-content: center;
    //            flex-direction: column;
    //
    //            .up_text {
    //                margin-top: 24rpx;
    //                font-size: 24rpx;
    //                color: #C9C9C9;
    //                font-weight: 400;
    //            }
    //        }
    //    }
    //}

    .channel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 30rpx;
        padding: 30rpx 0;
        font-size: 30rpx;
        color: #333333;

        .title {
        }

        .name {
            height: 60rpx;
            display: flex;
            justify-content: flex-end;
            flex: 1;
            font-size: 28rpx;
            color: #999999;
        }

        .active {
            margin-right: 10rpx;
            padding: 6rpx 28rpx;
            background: #dffef0;
            border-radius: 38rpx;
            font-size: 28rpx;
            color: #29c86f;
        }
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

.bar {
    width: 100%;
    height: 20rpx;
    background-color: #f8f9f9;
}
</style>
