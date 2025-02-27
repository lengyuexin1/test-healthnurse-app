<template>
    <view class="container">
        <view class="mation">
            <view class="mat_info row">
                <image :src="notesInfo.avatar" class="txImg" mode="aspectFill"></image>
                <view class="mat_vitae">
                    <view class="row i-center j-between">
                        <view class="mat_name u-line-1">{{ notesInfo.name }}</view>
                    </view>
                    <view class="mat_mation row i-center j-between">
                        <view class="column">
                            <view class="mat_more row i-center j-between">
                                <view class="row i-center">
                                    {{ notesInfo.age || '-' }}岁
                                    <view class="mat_line">|</view>
                                    <text v-if="notesInfo.sex">{{ getSex(typeMany, notesInfo.sex, 'sex') }}</text>
                                </view>
                            </view>
                            <view class="mat_more row i-center j-between">
                                <view>民族：{{ notesInfo.nation || '-' }}</view>
                            </view>
                            <view class="mat_more row i-center j-between">
                                <view>身高：{{ notesInfo.height }}cm</view>
                            </view>
                        </view>

                        <view class="column">
                            <view class="mat_more row i-center j-between">
                                <view class="row i-center">
                                    生肖：属
                                    <text v-if="notesInfo.sex">{{ getSex(typeMany, notesInfo.zodiacId, 'zodiac') }}</text>
                                </view>
                            </view>
                            <view class="mat_more row i-center j-between">
                                <view>
                                    籍贯：
                                    <text v-if="notesInfo.sex">{{ getSex(typeMany, notesInfo.originId, 'origin') }}</text>
                                </view>
                            </view>
                            <view class="mat_more row i-center j-between">
                                <view>体重：{{ notesInfo.weight }}kg</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="mat_about">
                <view class="mat_ab_tit">个人信息</view>
                <view class="mat_ab_li row i-center j-between">
                    <view>婚姻</view>
                    <view>
                        <text v-if="notesInfo.sex">{{ getSex(typeMany, notesInfo.marital, 'marital') }}</text>
                    </view>
                </view>
                <view class="mat_ab_li row i-center j-between">
                    <view>学历</view>
                    <view>
                        <text v-if="notesInfo.sex">{{ getSex(typeMany, notesInfo.educationId, 'education') }}</text>
                    </view>
                </view>
                <view class="mat_ab_li row i-center j-between">
                    <view>工作年限</view>
                    <view>{{ notesInfo.years || '-' }}年</view>
                </view>
                <view class="mat_ab_li row i-center j-between">
                    <view>语言能力</view>
                    <view>
                        <text v-if="notesInfo.sex">{{ getMul(typeMany, notesInfo.language, 'language') }}</text>
                    </view>
                </view>
                <view class="mat_ab_li row j-between">
                    <view>居住地</view>
                    <view style="flex: 1; margin-left: 20rpx;text-align: right;">{{ notesInfo.address || '-' }}</view>
                </view>
            </view>
        </view>
        <view class="agdp"></view>
        <view class="mation">
            <view class="mat_tit">工作经历</view>
            <view class="mat_desc">{{ notesInfo.experience || '无' }}</view>
        </view>
        <view class="agdp"></view>
        <view class="mation">
            <view class="mat_tit">特长</view>
            <view class="mat_desc">{{ notesInfo.specialSkill || '无' }}</view>
        </view>
        <block v-for="(item, index) in notesInfo.certificates" :key="index">
            <view class="agdp"></view>
            <view class="mation">
                <view class="mat_tit">{{ item.name }}</view>
                <view class="mat_img">
                    <TnPhotoAlbum :data="item.imgList" width="220rpx" height="150rpx"></TnPhotoAlbum>
                </view>
                <!-- <view v-else class="mat_desc">无</view> -->
            </view>
        </block>
        <view class="agdp"></view>
        <view class="mation">
            <view class="mat_tit">个人简介</view>
            <view class="mat_desc">{{ notesInfo.introduction || '无' }}</view>
            <!-- <view class="mat_img">
                <u-upload :fileList="fileList2" width="220rpx" height="150rpx" :deletable="false" disabled name="2" multiple :maxCount="5"></u-upload>
            </view>-->
        </view>
    </view>
</template>

<script lang="ts" setup>
import TnPhotoAlbum from '@tuniao/tnui-vue3-uniapp/components/photo-album/src/photo-album.vue'
import { getResumeDetail, confifList } from '@/api/hours-api'
import { ref, computed } from "vue"
import { onLoad } from "@dcloudio/uni-app"

const notesInfo: any = ref({})
const typeMany: any = ref([])

const getSex = (typeMany: any, src: string, type: string) => {
    for (let index = 0; index < typeMany.length; index++) {
        if (typeMany[index].code == type) {
            const showName = typeMany[index].value.filter(item => item.id == src)
            return showName[0].name
        }
    }
}

const getMul = (typeMany: any, src: string, type: string) => {
    let ShowTitle = ''
    for (let index = 0; index < typeMany.length; index++) {
        if (typeMany[index].code == type) {
            for (let i = 0; i < typeMany[index].value.length; i++) {
                if (src.includes(typeMany[index].value[i].id)) {
                    ShowTitle = ShowTitle + typeMany[index].value[i].name + ','
                }
            }
        }
    }
    return ShowTitle
}

const age = computed(() => (src: string) => {
    const birthday = notesInfo.value.birthday
    if (!birthday) { return '-' }
    const y = birthday.slice(0, 4) || '1970'
    const m = birthday.slice(4, 6) || '01'
    const d = birthday.slice(6) || '01'
    //出生时间 毫秒
    const birthDayTime = new Date(`${y}-${m}-${d}`).getTime()
    //当前时间 毫秒
    const nowTime = new Date().getTime()
    //一年毫秒数(365 * 86400000 = 31536000000)
    return Math.ceil((nowTime - birthDayTime) / 31536000000)
})
onLoad((options: any) => {
    confifList().then(res => {
        typeMany.value = res
    })

    getResumeDetail({ workerId: options.workerId}).then(res => {
        notesInfo.value = {
            ...res,
            originId: Number(res.originId),
            // certificates: !res.certificates.length ? [] : res.certificates.map(x => { return { ...x, imgList: x.imgList.map(item => ({ url: item })) } })
        }
        console.log(notesInfo.value, 22222222222)
    })
    .catch(err => {
        uni.showToast({
            icon: 'none',
            title: err.message
        })
        setTimeout(() => {
            uni.navigateBack()
        }, 1000)
    })
}) 
</script>

<style lang="scss" scoped>
.container {
    padding: 30rpx;
}

.mation {
    padding: 30rpx 30rpx 30rpx;
    background: #fff;
    border-radius: 24rpx;

    .txImg {
        width: 200rpx;
        height: 240rpx
    }

    .mat_vitae {
        flex: 1;
        margin-left: 30rpx;

        .mat_name {
            font-size: 34rpx;
            font-weight: bold;
            color: #292c33;
            margin: 10rpx 0 24rpx;
        }

        .mat_more {
            margin-top: 18rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #292c33;

            .mat_line {
                margin: 0 6rpx;
            }
        }
    }

    .mat_about {
        margin-top: 40rpx;

        .mat_ab_tit {
            font-size: 32rpx;
            font-weight: bold;
            color: #292c33;
            margin-bottom: 10rpx;
        }

        .mat_ab_li {
            padding: 16rpx 0;
            font-size: 28rpx;
            font-weight: 400;
            color: #292c33;

            view {
                flex-shrink: 0;
            }
        }
    }

    .mat_tit {
        font-size: 32rpx;
        font-weight: bold;
        color: #292c33;
    }

    .mat_desc {
        margin-top: 24rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #292c33;
        line-height: 44rpx;
    }

    .mat_img {
        display: flex;
        margin-top: 24rpx;

        &::v-deep .u-upload__wrap__preview {
            margin: 0 14rpx 16rpx 0;

            &:nth-child(3n) {
                margin: 0;
            }
        }
    }
}
.agdp {
    height:10px;
    background: rgba(0,0,0,0);
}
</style>
