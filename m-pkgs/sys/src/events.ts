import mitt from 'mitt'

//====================================================
// 事件定义
//====================================================
export type Events = {
    /** 登录成功 */
    "SYS_LOGIN_SUCCESS": void

    /** 退出登录 */
    "SYS_LOGIN_OUT": void

    /** token 刷新异常 */
    "REFLESH_TOKEN_FAIL": void
}



//====================================================
// 初始化
//====================================================

// 创建独立事件
export const sysEmitter = mitt<Events>()
