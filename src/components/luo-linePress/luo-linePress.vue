<template>
    <!-- // <view class="tit-box" :style="{ background: bgColor }" v-if="index + 1 == queryData.lv"></view> -->
    <view>
        <view class="line-box" :style="{ background: bgColor }">
            <view class="item-wp" :style="{ background: queryData.lv-1>=index?actBgColor:bgColor }" v-for="(item, index) in lvFlex" :key="index">
                <view class="item-line-box" ref="itemT">
                    <view
                        class="item-act"
                        :style="{
							background:queryData.lv>=index?actBgColor:bgColor,
							width: nowWidth + 'px',
							'border-bottom-left-radius': queryData.lv == 0 ? '4rpx' : '',
							'border-top-left-radius': queryData.lv == 0 ? '4rpx' : ''
						}"
                        v-if="index + 1 == queryData.lv + 1"
                    ></view>
                    <view class="circle-line" :style="{ background: queryData.lv-1>=index?actBgColor:bgColor }" v-if="lvFlex-2>=index"></view>
                </view>
            </view>

            <view class="weChatUnlock">
             
                <view class="weChatUn_lock" v-if="queryData.lv < queryData.dayTransfer">
                       <image :src="getAssetsUrl('/leyou/static/lock.svg')" mode="scaleToFill" class="weChatUn_lock_image" />
                </view>
                <view class="weChatUnlock_rawal">
                    <image :src="getAssetsUrl('/leyou/static/weChat.svg')" mode="scaleToFill" class="weChatUnlock_rawal_image" />
                    <view class="rawal_title">提现特权</view>
                </view>
                <view class="weChatUnlock_desc">{{queryData.lv>=queryData.dayTransfer?'已解锁':`第${queryData.dayTransfer||1}天解锁`}}</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, computed } from 'vue';
import { getAssetsPic } from '@/common/setPicture'

const domWidth = ref(0);
const nowWidth = ref(0);

// Define props
const props = defineProps({
  lvFlex: {
    type: Number,
    default: 3
  },
  queryData: {
    type: Object,
    default: () => ({
      // Default values
      lv: 3,
      lvNum: 20,
      lvNowNum: 2,
      dayTransfer: 1,
      nextNum: 8,
      title: 'LV.1 初级销售人员'
    })
  },
  bgColor: {
    type: String,
    default: '#FFD0C2'
  },
  actBgColor: {
    type: String,
    default: 'linear-gradient(180deg, #FD9582 0%, #FB474C 100%)'
  },
  titColor: {
    type: String,
    default: '#ffffff'
  }
});

const getAssetsUrl = computed(()=>(src:string)=> {
    return getAssetsPic(src)
})

onMounted(() => {
  const itemWp = document.querySelector('.item-wp');
  if (itemWp) {
    const rect = itemWp.getBoundingClientRect();
    domWidth.value = rect.width;
    cotLine();
  }

  for (let i = 0; i < props.queryData.lv; i++) {
    // Direct DOM manipulation should be avoided, but if necessary:
    // itemT.value[i].$el.style.background = props.actBgColor || '';
    // itemT.value[i].$children[0].$el.style.background = props.actBgColor || '';
  }
});

function cotLine() {
  const needPre = (parseFloat(props.queryData.lvNowNum) / parseFloat(props.queryData.lvNum)) * 100;
  nowWidth.value = (domWidth.value * needPre) / 100;
}
</script>

<style lang="scss" scoped>
.line-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    // background-color: #1c2633;
    border-radius: 4rpx;
    height: 16rpx;
    .weChatUnlock {
        position: relative;
        .weChatUn_lock{
         width: 32rpx;
          height: 32rpx;
          display: flex;
          justify-content: center;
          line-height: 32rpx;
            background: rgba(0, 0, 0, .4);
            border-radius: 16rpx 0rpx 8rpx 0rpx;
            position: absolute;
        .weChatUn_lock_image{
            width: 20rpx;
            height: 22rpx;
            margin-top: 6rpx;
         }
        }
        display: flex;
        flex-direction: column;
        background: #4bc067;
        border-radius: 16rpx;
        width: 144rpx;
        height: 136rpx;
        font-size: 24rpx;
        color: #ffffff;
        .weChatUnlock_rawal {
            display: flex;
            width: 120rpx;
            height: 70rpx;
            align-items: center;
            background: #fcfdfd;
            border-radius: 8rpx;
            margin: 12rpx auto;
            .weChatUnlock_rawal_image {
                width: 37rpx;
                height: 37rpx;
                margin: 0 8rpx 0 12rpx;
            }
            .rawal_title {
                width: 48rpx;
                font-size: 24rpx;
                text-align: center;
                color: #4bc067;
            }
        }
        .weChatUnlock_desc {
            text-align: center;
        }
    }
    .item-wp {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        // background-color: #1c2633;
        height: 12rpx;
        border-radius: 4rpx;

        .item-line-box {
            width: 100%;
            position: relative;
            height: 8rpx;
            border-radius: 4rpx;
            display: flex;
            flex-direction: row;
            align-items: center;
            &:not(:first-of-type) {
                border-radius: 0;
            }
            &:not(:last-of-type) {
                border-radius: 0;
            }
            &:first-of-type {
                border-radius: 4rpx !important;
            }
            .circle-line {
                position: absolute;
                right: 0;
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                // background-color: #1c2633;
                .tit-box {
                    position: absolute;
                    top: -80rpx;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 261rpx;
                    line-height: 60rpx;
                    text-align: center;
                    height: 60rpx;
                    border-radius: 30rpx;
                    font-size: 12rpx;
                    // background-color: #1c2633;
                    .after-san {
                        position: absolute;
                        content: "";
                        bottom: -19rpx;
                        left: 50%;
                        transform: translateX(-50%);
                        border-width: 10rpx 10rpx;
                        // border-color: #1c2633 transparent transparent;
                        border-style: solid;
                    }
                    // &::after {
                    // 	position: absolute;
                    // 	content: '';
                    // 	bottom: -19rpx;
                    // 	left: 50%;
                    // 	transform: translateX(-50%);
                    // 	border-width: 10rpx 10rpx;
                    // 	border-color: #1c2633 transparent transparent;
                    // 	border-style: solid;
                    // }
                }
            }
        }
        &:last-of-type {
            .item-line-box {
                .circle-line {
                    .tit-box {
                        transform: translateX(-92%);
                        .after-san {
                            left: 90%;
                        }
                    }
                }
            }
        }
    }
    .item-act {
        position: absolute;
        width: 20%;
        height: 8rpx;
        // background-color: #1093fe;
        border-top-right-radius: 4rpx;
        border-bottom-right-radius: 4rpx;
        // border-radius: 4rpx;
    }
}
</style>
