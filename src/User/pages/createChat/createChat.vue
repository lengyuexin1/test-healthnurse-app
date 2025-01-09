<template>
    <view class="container" :style="{ height: data.windowHeight + 'px', backgroundImage: `url(${data.bgSrc})` }">
        <view class="top">
            <view class="name tn-flex-center-between">
                <TnInput custom-class="tnInput" placeholder="输入您的群聊名称" height="80rpx" :underline="false" :border="false" :maxlength="15" clearable v-model="data.teamName"></TnInput>
                <TnButton shape="round" width="178rpx" height="68rpx" font-size="24rpx" plain border-color="#E6E6E6" text-color="#666666" @tap="clickRandom">
                    随机
                </TnButton>
            </view>
            <view class="type tn-flex-center-between">
                <view>群聊类型</view>
                <view class="select tn-flex-center-center" :class="[data.type == '' ? 'empty' : '']" @tap="data.tagPopup = true">
                    {{ data.type || '请选择群聊类型' }}
                     <TnIcon name="right" color="#C9C9C9" size="32"/>
                </view>
            </view>
        </view>

        <view class="tips">已创建<text>{{ data.createNum?.cntCreatedUserTeam }}/{{ data.createNum?.cntTotalUserTeam }}</text>次</view>
        <view class="btn-wrap tn-flex-center-between">
            <view class="left tn-flex-column" @tap="data.skinPopup = true">
                <image :src="getAssetsUrl('/leyou/assets/skin.png')" mode="scaleToFill" />
                <text>换背景</text>
            </view>
            <view class="btn">
                <TnButton shape="round" width="100%" height="76rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" :debounce="true" @tap="clickCreate">
                    创建房间
                </TnButton>
            </view>
        </view>

        <!-- 群聊类型 -->
        <TnPopup v-model="data.tagPopup" width="80%" height="600" close-btn open-direction="bottom">
            <view class="content">
                <view class="title">群聊类型</view>
                <view class="tag-list">
                    <view class="item tn-flex-row" v-for="(item, index) in data.categoryList" :key="index" @tap="clickTag(item, index)">
                        <view class="btn tn-flex-center-center" :class="[data.activeCategory === index ? 'active' : '']">
                            {{ item.name }}
                        </view>
                    </view>
                </view>
            </view>
        </TnPopup>
        <!-- 换背景 -->
        <TnPopup v-model="data.skinPopup" width="80%" height="1160" close-btn open-direction="bottom">
            <view class="content">
                <view class="title">换背景</view>
                <view class="skin-list">
                    <view class="item tn-flex-column" v-for="(item, index) in data.skinList" :key="index" @tap="changeSkin(item.id, item.src)">
                        <image class="bg" :src="getAssetsUrl(item.src)" mode="aspectFill" />
                        <view class="btn tn-flex-center-center" :class="[data.skinId == item.id ? 'active' : '']">
                            {{ data.skinId == item.id ? '已使用' : '免费使用' }}
                        </view>
                    </view>
                </view>
            </view>
        </TnPopup>
        <!-- 群主需知 -->
        <TnPopup v-model="data.popup" width="80%" height="1000" :overlay-closeable="false">
            <view class="content">
                <view class="title">群主须知</view>
                <view class="detail">
                    <view>1.群主应当履行对群聊房间的监督管理职责，严格依据相关法律法规、保椿生活用户协议、保椿生活用户行为规范等相关规定规范群成员的行为和信息发布;</view>
                    <view>2.群主应当积极维护群聊房间内的聊天秩序，营造良好的交流氛围，提供积极健康的聊天话题，并且及时处理群成员之间的矛盾，以维护群聊房间的安全健康，保证群成员的用户体验;</view>
                    <view>3.群主应当确保群聊房间中不存在相关法律法规、保椿生活用户协议、保椿生活用户行为规范禁止的任何不良信息或行为;</view>
                    <view>4.群主发现其群聊房间内存在不合理或不合法的行为，则群主应积极采取警告，将其踢出群聊房</view>
                    <view>5.群主在群聊房间管理过程中不得出现以下违规行为:</view>
                    <view>a.开设引战群聊，故意挑起群成员争端,破坏聊天室正常氛围，引导群成员恶意言语</view>
                    <view>b.开设群聊派对进行贩卖、传播枪械等管制物品、毒品或其他违禁品，教授、传播赌博，组织、宣传、引导群成员加入传销(或有传销嫌疑的)机构;</view>
                    <view>c.开设群聊宣扬、传播邪教、封建迷信等行为的;</view>
                    <view>d.开设群聊宣扬或传播自杀、自残等危害人身安全行为的;</view>
                    <view>e.开设群聊提供非法服务，包括但不限于:非法医疗咨询或服务、非法通讯服务等;</view>
                    <view>f.主动为群成员开展违法违规等行为提供便利，包括但不限于:色情交易、违法违禁品交易、炸房交易、传谣造谣、未经他人允许公开泄露他人隐私秘密、侵犯他人知识产权、传播涉及危害未成年人身心健康不良信息和行为的;</view>
                    <view>h.其他损害官方和平台利益的行为;</view>
                    <view>k.如果群主怠于履行上述义务，甚至为群成员开展违法违规或违反以上条例的行为提供便利的，则保椿生活官方有权根据其违法违规行为追究相关责任。</view>
                </view>
                <view class="btn tn-flex-center-center">
                    <TnButton shape="round" width="240rpx" height="70rpx" font-size="30rpx" bg-color="#EA3E1A" text-color="#FFFFFF" @tap="clickBtn">
                        我知道了
                    </TnButton>
                </view>
            </view>
        </TnPopup>
    </view>
    <BCNotify ref="bcNotify"></BCNotify>
</template>
    
<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import TnIcon from '@tuniao/tnui-vue3-uniapp/components/icon/src/icon.vue'
import TnPopup from '@tuniao/tnui-vue3-uniapp/components/popup/src/popup.vue'
import TnButton from '@tuniao/tnui-vue3-uniapp/components/button/src/button.vue'
import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import BCNotify from '@/components/notify/index.vue'
import { getAssetsPic } from '@/common/setPicture'
import { createGroupChat, createChatBaseInfo } from '@/api/user-api'
import { getsalonCategoryList } from '@/api/create-api'
import { gotoChatPage } from '@/routes/nim-routes'
import { dispatchWEvent, GlobalEvents } from '@/events/event-registry'

interface Data {
    windowHeight: number
    bgSrc: string
    popup: boolean
    skinPopup: boolean
    tagPopup: boolean
    teamName: string
    type: string
    categoryId: number | string
    categoryList: any
    activeCategory: number | string
    tagList: any
    skinId: number | string
    skinList: any
    createNum: any
}

const data = reactive<Data>({
    windowHeight: 0,
    bgSrc: '',
    popup: false,
    skinPopup: false,
    tagPopup: false,
    teamName: '',
    type: '',
    categoryId: '',
    categoryList: [],
    activeCategory: '',
    tagList: [],
    skinId: 1,
    skinList: [
        { id: 1, src: '/leyou/assets/bg-01.png' },
        { id: 2, src: '/leyou/assets/bg-02.png' },
        { id: 3, src: '/leyou/assets/bg-03.png' },
        { id: 4, src: '/leyou/assets/bg-04.png' },
        { id: 5, src: '/leyou/assets/bg-05.png' },
        { id: 6, src: '/leyou/assets/bg-06.png' },
        { id: 7, src: '/leyou/assets/bg-07.png' },
        { id: 8, src: '/leyou/assets/bg-08.png' },
        { id: 9, src: '/leyou/assets/bg-09.png' }
    ],
    createNum: {}
})

const bcNotify = ref()

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

const clickBtn = () => {
    data.popup = false
}

const clickTag = (item: any, index: number) => {
    data.activeCategory = index
    data.categoryId = item.id
    data.type = item.name
}

const changeSkin = (id: number, src: string) => {
    data.skinId = id
    data.bgSrc = getAssetsPic(src)
}

const clickRandom = () => {
    const teamName = generateChineseChars(5)
    data.teamName = teamName
}

const generateChineseChars = (numChars: number) => {
    const chineseChars = ['我', '你', '他', '她', '它', '中', '国', '欢', '迎', '来', '到', '保', '照', '护']

    // 确保请求的字符数不超过数组长度  
    numChars = Math.min(numChars, chineseChars.length)
    let selectedChars: any = []  
    while (selectedChars.length < numChars) {  
        // 生成一个随机索引  
        const randomIndex = Math.floor(Math.random() * chineseChars.length)
          
        // 检查该字符是否已被选中  
        if (!selectedChars.includes(chineseChars[randomIndex])) {  
            // 如果没有被选中，则添加到结果数组中  
            selectedChars.push(chineseChars[randomIndex])
        }  
    }  
      
    // 将字符数组转换为字符串并返回  
    return selectedChars.join('')
}

const clickCreate = () => {
    if (!data.teamName) {
        bcNotify.value.show('群聊名称不能为空')
        return
    }
    else if (!data.categoryId) {
        bcNotify.value.show('请选择群聊类型')
        return
    }
    createGroupChat({
        tname: data.teamName,
        categoryId: data.categoryId,
        backgroundImage: data.bgSrc
    }).then((res: any) => {
        bcNotify.value.show('创建成功')
        dispatchWEvent(GlobalEvents.Create_Group_chat)
        setTimeout(() => {
            gotoChatPage({
                to: res.tid,
                scene: 'friendsGroup',
                isReplace: true
            })
        }, 1200)
    }).catch((err: any) => {
        bcNotify.value.error(err.message)
    })
}

const getcategoryList = () => {
    getsalonCategoryList({ moduleType: 7 }).then((res: any) => {
        if (res.length) {
            const newArr: any[] = []
            for (const i in res) {
                for (const j in res[i].children) {
                    newArr.push(res[i].children[j])
                }
            }
            data.categoryList = newArr
        }
    })
}

onMounted(() => {
    setTimeout(() => {
        data.popup = true
    }, 500)

    uni.getSystemInfo({
        success: (result) => {
            data.windowHeight = result.windowHeight
            data.bgSrc = getAssetsPic(data.skinList[0].src)
        }
    })
    createChatBaseInfo().then((res) => {
        data.createNum = res
    })
    getcategoryList()
})
</script>
  
<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;

    .top {
        width: 92%;
        margin-left: 4%;;
        margin-top: 30rpx;
        padding: 30rpx;
        background: #FFFFFF;
        border-radius: 24rpx;

        .name {
            padding-bottom: 30rpx;
            border-bottom: solid 1rpx #F2F2F2;
        }

        .type {
            font-size: 30rpx;
            padding-top: 30rpx;
        }

        .select {
            font-size: 28rpx;
            color: #333333;
        }

        .empty {
            color: #999999;
        }
    }

    .tips {
        position: fixed;
        left: 0;
        bottom: 140rpx;
        width: 100%;
        height: 72rpx;
        line-height: 72rpx;
        background-color: #F8EEDE;
        font-weight: 400;
        font-size: 28rpx;
        color: #787878;
        text-align: center;

        text {
            color: #FF9C09;
        }
    }

    .btn-wrap {
        width: 100%;
        height: 140rpx;
        padding: 0 30rpx;
        background-color: #FFFFFF;
        position: fixed;
        left: 0;
        bottom: 0;

        .left {
            align-items: center;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;

            image {
                width: 58rpx;
                height: 58rpx;
                margin-bottom: 5rpx;
            }
        }

        .btn {
            display: flex;
            flex: 1;
            margin-left: 50rpx;
        }
    }
}

.content {
    height: 1000rpx;
    padding: 20rpx 40rpx 40rpx 40rpx;

    .title {
        height: 60rpx;
        font-weight: bold;
        font-size: 36rpx;
        color: #333333;
        text-align: center;
    }

    .tag-list {
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        display: flex;
        flex-wrap: wrap;

        .item {
            margin: 20rpx 10rpx;

            .btn {
                min-width: 190rpx;
                height: 80rpx;
                padding: 0 15rpx;
                font-size: 28rpx;
                color: #1A1A1A ;
                border: solid 1rpx #E5E5E5;
                border-radius: 12rpx;
                transition: all .2s;
            }

            .active {
                color: white;
                border: none;
                background-color: #EA3E1A;
            }
        }
    }

    .skin-list {
        height: 820rpx;
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        display: flex;
        flex-wrap: wrap;

        .item {
            align-items: center;
            margin: 0 15rpx;

            .bg {
                width: 192rpx;
                height: 240rpx;
                border-radius: 12rpx;
            }

            .btn {
                width: 128rpx;
                height: 50rpx;
                margin-top: 24rpx;
                margin-bottom: 40rpx;
                font-size: 24rpx;
                color: #EA3E1A;
                border: solid 1rpx #EA3E1A;
                border-radius: 28rpx;
                transition: all .2s;
            }

            .active {
                color: white;
                border: none;
                background-color: #EA3E1A;
            }
        }
    }

    .detail {
        height: 820rpx;
        padding: 20rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        overflow-y: auto;

        view {
            font-weight: 400;
            font-size: 28rpx;
            color: #333333;
            line-height: 44rpx;
            margin-bottom: 30rpx;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .btn {
        height: 100rpx;
    }
}

.tnInput {
    margin-right: 30rpx;
    background-color: #F5F5F5;
}
</style>
 
