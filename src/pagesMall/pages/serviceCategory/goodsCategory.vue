<template>
  <view>
    <view id="headbox">
      <customNavbar pageTitle="适品囤" bgColor="#F2F3F5"></customNavbar>
      <div class="inp_box">
        <div class="inp" @click="searKey">
          <div class="search_icon">
            <u-icon name="search" size="18"></u-icon>
          </div>
          <div class="inp_text">输入搜索内容</div>
        </div>
      </div>
    </view>
    <view class="nav" :style="{ top: navtop + 'px' }">
      <view class="nav-left">
        <scroll-view scroll-y :style="{ height: '100%' }">
          <block v-for="(item, index) in tabList" :key="index">
            <view class="nav-left-item u-line-1" :class="{ set: index == categoryActive }"
                  @click="categoryClickMain(item, index)"
                  :style="index == categoryActive ? 'color:' + activeTextColor + ';background-color:' + activeBackgroundColor + ';font-weight:bold;' : ''">
              {{ item.name }}
            </view>
          </block>
        </scroll-view>
      </view>
      <view class="nav-right">
        <scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="{ height: '100%' }"
                     scroll-with-animation>
          <!-- 新品 -->
          <!-- <categoryShop :applyId="3" v-if="idsList === '001'"></categoryShop> -->
          <view class="newshop" v-if="idsList === '001'">
            <NewProductViewVue sortId="2"></NewProductViewVue>
          </view>
          <!-- 其他一级类目 -->
          <template v-else-if="idsList != '001' && idsList != '3'">
            <categorySwiper v-if="isShow" :wperList="swiperList" :shopType="2"></categorySwiper>
            <view class="shopbox" v-if="shopList && shopList.length">
              <view class="shoptit">优选店铺</view>
              <scroll-view class="shoproll" scroll-x @scroll="scroll" scroll-with-animation>
                <view class="shopli column i-center j-center" v-for="(item, index) in shopList" :key="index"
                      @click="gotoShopDetail(item.id)">
                  <u-image :src="item.thumb" shape="circle" width="84rpx" height="84rpx"></u-image>
                  <view class="shopname u-line-1">{{ item.name }}</view>
                </view>
              </scroll-view>
            </view>
            <block v-for="(ele) in serveList" :key="ele.id">
              <view class="menu">
                <block>
                  <view class="menubox" @click="gotoShopDetail(ele.id)">
                    <view class="menusubtit row i-center j-between">
                      <text class="u-line-2">{{ ele.name }}</text>
                      <u-icon name="arrow-right" color="#999999" size="30rpx"></u-icon>
                    </view>
                  </view>
                  <view class="menurow i-center" v-if="ele.shopItemList.length > 0">
                    <block v-for="(item, index) in ele.shopItemList" :key="item.id">
                      <view class="menu-list column i-center" @click="categoryClickSub(item.id)"
                            v-if="index < 18">
                        <u-image :src="item.thumb || ''" width="120rpx" height="120rpx"
                                 radius="12rpx"></u-image>
                        <text class="menu-tit u-line-1">{{ item.name }}</text>
                      </view>
                    </block>
                  </view>
                </block>
              </view>
            </block>
            <u-empty :show="serveList.length == 0" mode="list" :icon="assets + '/empty/empty_icon_data.png'"
                     text="暂无数据~"></u-empty>
          </template>
          <!-- 适老改造类目 -->
          <view class="renovation" v-else>
            <view class="renovation_title">场景专区</view>
            <view class="renovation_list_box">
              <view class="renovation_list_item" v-for="(item) in seconnavList" :key="item.id"
                    @click="gotoGoodsTabul(item.id, item.name, 1)">
                <image class="renovation_list_img" :src="item.secondIcon" mode="scaleToFill"/>
                <view class="renovation_list_title">{{ item.name }}</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <u-toast ref="uToast"/>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCategoryByPid, shopProductList } from "@/api/goods-api"
import { gotoAttendShop, gotoChangeTab, gotoGoodsTabul } from '@/route/care-routes'
import { gotoGoodsDetails } from "@/route/goods-routes"
import categorySwiper from '@/components/categorySwiper/categorySwiper.vue'
import { getCategoryShowList, getswiperList } from '@/api/care-api'
// import categoryShop from './components/categoryShop.vue'
import customNavbar from '@/components/custom-navbar/custom-navbar.vue'
import NewProductViewVue from '@/components/NewProductView/NewProductView.vue'
import { gotoSearch } from "@/route/plateform-routes"

export default {
  name: "goodsCategory",
  components: {
    categorySwiper,
    customNavbar,
    NewProductViewVue
    // categoryShop
  },
  data() {
    return {
      objcat: {},
      navtop: 0,
      scrollTop: 0,
      scrollHeight: 0,
      categoryActive: 0,
      shopList: [],
      typeId: '',
      tabList: [],
      idsList: '',
      serveList: [],
      swiperList: [],
      seconnavList: []
    }
  },
  computed: {
    ...mapGetters(['assets']),
    isShow() {
      return this.swiperList && this.swiperList.length > 0
    },
    // 切割数组
    spliceList() {
      return (list) => {
        return list.slice(0, 6)
      }
    }
  },
  props: {
    //主分类激活索引
    defaultActive: {
      type: Number,
      default: 0
    },
    activeTextColor: {
      type: String,
      default: '#29C86F'
    },
    activeBackgroundColor: {
      type: String,
      default: 'rgba(255,255,255,0)'
    },
    imgSrc: {
      type: String,
      default: 'logo'
    },
    //主分类点击事件
    categoryMainClick: {},
    //子分类点击事件
    categorySubClick: {}
  },
  created() {
    this.typeId = 3
    this.getCategoryList()
    getswiperList(2).then((res) => {
      this.swiperList = res.find(item => {
        return item.type == 1 || item.type == 2 || item.type == 4
      })

      this.shopList = res.find((item) => {
        return item.type == 3
      })

    })
  },
  onLoad() {
    this.typeId = 3
    this.getCategoryList()
    getswiperList(2).then((res) => {
      this.swiperList = res.find(item => {
        return item.type == 1 || item.type == 2 || item.type == 4
      })

      this.shopList = res.find((item) => {
        return item.type == 3
      })

    })
  },
  methods: {
    getCategoryByPid() {
      getCategoryByPid({ pid: 3 }).then(res => {
        this.seconnavList = res
      }).catch(error => {
        console.log(error)
      })
    },
    searKey() {
      gotoSearch()
    },
    scroll(e) {
      this.scrollHeight = e.detail.scrollHeight
    },
    categoryClickMain(category, index) {
      if (category.id == '3') {
        // this.getCategoryByPid()
        gotoChangeTab(40100, 9)
        return
      }
      this.$emit('categoryMainClick', category)
      this.categoryActive = index
      this.scrollTop = -this.scrollHeight * index
      this.idsList = this.tabList[index].id

      if (category.id == '001') {
        return
      }

      this.queryList(100, 1)
    },
    categoryClickSub(id) {
      gotoGoodsDetails({ id })
    },
    gotoGoodsTabul(id, itemName, type) {
      gotoGoodsTabul(id, itemName, type)
    },
    getCategoryList() {
      getCategoryShowList({ id: '1777239405679665154' }).then(res => {
        this.tabList = [{ id: '001', name: '新品' }, ...res]
        this.objcat = this.tabList[this.tabList.length - 1]
        this.tabList = this.tabList.slice(0, this.tabList.length - 1)
        this.getCateListTwo()
      }).catch(err => {
        this.$refs.uToast.error(err.message)
      })
    },
    getCateListTwo() {
      getCategoryShowList({ id: '001' }).then(res => {
        this.tabList.push(...res)
        // this.getCateListThe()
      }).catch(err => {
        this.$refs.uToast.error(err.message)
      })
    },
    getCateListThe() {
      getCategoryShowList({ id: '1777239405679667354' }).then(res => {
        this.tabList.push(...res)
        this.tabList.push(this.objcat)
        this.idsList = this.tabList[0].id
        this.queryList(100, 1)
      }).catch(err => {
        this.$refs.uToast.error(err.message)
      })
    },
    /* 服务列表 */
    queryList() {
      if (this.idsList === '001') {
        return false
      }
      shopProductList(this.idsList).then((res) => {
        this.serveList = res.filter(item => item.shopItemList && item.shopItemList.length > 0)
      }).catch(err => {
        this.$refs.uToast.error(err.message)
      })
    },
    gotoShopDetail(shopId) {
      gotoAttendShop(shopId)
    },
    // 计算元素位置
    getElementTop() {
      uni.createSelectorQuery().select('#headbox').boundingClientRect(data => { //目标位置的节点：类class或者id
        if (data) {
          this.navtop = data.height
        }
        console.log('navbar', data)
      }).exec()
    }
  },
  mounted() {
    this.categoryActive = this.defaultActive
    this.getElementTop()
  }
}
</script>

<style scoped lang="scss">
.menu {
  padding: 20rpx 28rpx;
  background: #ffffff;
  border-radius: 32rpx;
  margin-top: 20rpx;

  .menubox {
    .menusubtit {
      font-size: 30rpx;
      font-weight: bold;
      color: #000002;
    }
  }

  .menurow {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .menu-list {
    margin-top: 40rpx;

    .menu-img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 12rpx;
    }

    .menu-tit {
      font-size: 26rpx;
      font-weight: 400;
      color: #727375;
      margin-top: 20rpx;
      text-align: center;
    }
  }
}

.nav {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  // background: linear-gradient(180deg, #dff7ef 0%, #f2f3f5 20%);
}

.nav-left {
  width: 28%;
  // background-color: #F8F9F9;
}

.nav-left-item {
  height: 50px;
  border-bottom: solid 1px #f0f0f0;
  padding: 0 6px;
  box-sizing: border-box;
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 50px;
  text-align: left;
  padding-left: 24rpx;

  &.set {
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 6rpx;
      height: 32rpx;
      background: #29c86f;
      border-radius: 4rpx;
      position: absolute;
      left: 2rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.nav-right {
  width: 72%;
  padding-top: 11px;
  box-sizing: border-box;
  padding: 20rpx 20rpx 20rpx 0;
}

.renovation {
  background: #fff;
  padding: 20rpx 24rpx;
  box-sizing: border-box;
  border-radius: 24rpx;
  overflow: hidden;

  .renovation_title {
    font-size: 32rpx;
    margin-bottom: 40rpx;
    font-weight: bold;
  }

  .renovation_list_box {
    width: 99%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .renovation_list_item {
      width: 31%;
      margin-bottom: 30rpx;

      .renovation_list_img {
        width: 100%;
        height: 142rpx;
        margin-bottom: 20rpx;
        // border: 1px solid red;
        border-radius: 16rpx;
      }

      .renovation_list_title {
        font-size: 24rpx;
        text-align: center;
      }
    }
  }
}

.recom {
  height: 200rpx;
  background: #ffffff;
  border-radius: 32rpx;
}

.shopbox {
  height: 200rpx;
  box-sizing: border-box;
  padding: 20rpx 28rpx;
  background: #ffffff;
  border-radius: 32rpx;
  margin-top: 20rpx;

  .shoptit {
    margin-bottom: 16rpx;
    font-size: 30rpx;
    font-weight: bold;
    color: #000002;
  }

  .shoproll {
    white-space: nowrap;

    .shopli {
      display: inline-flex;
      margin: 0 12rpx;

      .shopname {
        width: 80rpx;
        height: 30rpx;
        line-height: 30rpx;
        background: #ffad65;
        border: 2rpx solid #ffffff;
        border-radius: 18rpx;
        font-size: 16rpx;
        font-weight: 400;
        color: #ffffff;
        // box-sizing: border-box;
        padding: 0 10rpx;
        position: relative;
        z-index: 10;
        margin-top: -18rpx;
        text-align: center;
      }
    }

    .shopli:first-child {
      margin-left: 0;
    }

    .shopli:last-child {
      margin-right: 0;
    }
  }
}

.inp_box {
  width: 100%;
  height: 88rpx;
  // background: linear-gradient(180deg, #dff7ef 0%, #f8f9f9 160%);
  background: #F2F3F5;
  display: flex;
  align-items: center;
  justify-content: center;

  .inp {
    width: 690rpx;
    height: 64rpx;
    background: #fff;
    border-radius: 32rpx;
    box-shadow: 0rpx 0rpx 32rpx rgba(0, 0, 0, 0.05);
    padding: 16rpx 24rpx;
    box-sizing: border-box;
    display: flex;

    .search_icon {
      margin-right: 12rpx;
    }

    .inp_text {
      font-size: 24rpx;
      color: #999999;
    }
  }
}</style>
