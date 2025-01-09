import { UrlTools } from "@bc/base"

/** 初始化 */
const debug = true


import createCollectAndReport from "@/utils/collection"
import { Debounce } from '@/libs/antivibthrot'

//===============================================================
/** 核心类 */
//===============================================================

/**
 * 页面控制器
 * TODO 后续增加各种路由模式
 */
class PageController {
    // outId: null | number

    back() {
        return new Promise<void>((reslove, reject) => {
            uni.navigateBack({
                success: () => {
                    reslove()
                },
                fail: (result) => {
                    console.error('back fail: ', result)
                    const err = new Error('回退失败..')
                    err.cause = result
                    reject(err)
                }
            })
        })
    }

    push(route: IRoute) {
        const url = UrlTools.buildUrlByParams(route.path, route.query)
        return new Promise<void>((reslove, reject) => {
            uni.navigateTo({
                url,
                success: () => {
                    console.log('pushpushpush');
                    
                    reslove()
                    this.onGlance()

                },
                fail: (result) => {
                    console.error('push fail: ', result)
                    const err = new Error('跳转失败..')
                    err.cause = result
                    reject(err)
                }
            })
        })
    }

    replace(route: IRoute) {
        const url = UrlTools.buildUrlByParams(route.path, route.query)
        return new Promise<void>((reslove, reject) => {
            uni.redirectTo({
                url,
                success: () => {
                    console.log('replacereplacereplace');

                    reslove()
                    this.onGlance()
                },
                fail: (result) => {
                    console.error('replace fail: ', result)
                    const err = new Error('重定向失败..')
                    err.cause = result
                    reject(err)
                }
            })
        })
    }

    reLaunch(route: IRoute) {
        const url = UrlTools.buildUrlByParams(route.path, route.query)
        return new Promise<void>((reslove, reject) => {
            uni.reLaunch({
                url,
                success: () => {
                    console.log('reLaunchreLaunchreLaunch');

                    reslove()
                    this.onGlance()
                },
                fail: (result) => {
                    console.error('reLaunch fail: ', result)
                    const err = new Error('重新打开首屏页面失败..')
                    err.cause = result
                    reject(err)
                }
            })
        })
    }

    private getCurPage() {
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        return page
    }

    getTitle(): string {
        const page = this.getCurPage()

        // #ifdef APP-PLUS
        //@ts-ignore 已验证App-iOS
        const webView = page.$getAppWebview()
        const titleView = webView.getStyle().titleNView
        if (titleView) {
            return titleView.titleText || ''
        }
        // #endif

        // #ifdef H5
        debug && console.warn('page: ', page)
        //@ts-ignore 已验证
        return page.$holder.navigationBar.titleText
        // #endif
    }

    getCurRoute() {
        const page = this.getCurPage()
        const route = {} as IRoute
        route.path = page.route as string

        //@ts-ignore 已验证App-iOS、H5环境
        route.query = page.options
        return route
    }



    // 页面浏览上报
    onGlance() {
        // this.outId && clearTimeout(this.outId)
        // this.outId = setTimeout(() => {
        // }, 1000)
        Debounce(()=>{
            createCollectAndReport().surfReport()
        },1000)

    }

}

export const pageController = new PageController()
