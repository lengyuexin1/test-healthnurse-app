// import Vue from "vue"
// const debug = false

interface Callback<T> {
    (obj: T): void
}

export class VueTools {

    /**
     * 监听vue.destroyed生命周期
     */
    static onDestroyed(vue: any, callback: Callback<void>) {
        vue.$once('hook:destroyed', () => {
            callback()
        })
    }

    static getComponentTag(vue: any) {
        const strs = (vue.$vnode && vue.$vnode.tag && vue.$vnode.tag.split('-')) as string[] || []
        if (strs.length === 0) {
            return 'unknown'
        }
        return strs.slice(1, strs.length).join('-')
    }

}
