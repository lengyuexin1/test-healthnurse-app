/**
 * 个性化推荐设置
 * get() 获取是否开启
 * set() 开启个性化推荐
 * clear() 关闭个性化推荐
 */
export default class recommend {
    static get() {
        // #ifndef APP-PLUS
        return true
        // #endif
        return !uni.getStorageSync('recommend')
    }
    static set() {
        uni.setStorageSync('recommend', true)
    }
    static clear() {
        uni.removeStorageSync('recommend')
    }
}
