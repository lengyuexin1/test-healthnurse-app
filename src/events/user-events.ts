/**
 * 用户相关事件表
 */
export enum UserEvents {
    /** 账户退出 */
    User__Logout = 'User__Logout',
    /** 账户登录 */
    User__Login = 'User__Login',
    /** 一键已读 */
    User__ReadAll = 'User__ReadAll',
    /** 更新会话未读数 */
    User__UpdateSession = 'User__UpdateSession'
}
