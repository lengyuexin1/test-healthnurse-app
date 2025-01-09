import { BCResponseInterceptor, ErrorInterceptor } from '@bc/http'
import { BCToken401ErrorInterceptor } from './401/interceptors'
import { buildHttp } from './http-adapter'
import { BCNetworkInterceptor, BCTokenRequestInterceptor, BCURLRequestInterceptor } from './request/interceptors'


//================================================================================
/** 授权接口专用 */
//================================================================================
export const http = buildHttp()
http.TAG = 'http'
// 拦截器 安装 start
new BCURLRequestInterceptor().install(http) // baseURL拼装
new BCTokenRequestInterceptor().install(http) // token拼装
new BCNetworkInterceptor().install(http) // 网络拦截
new BCResponseInterceptor().install(http) // 接口返回数据处理
new BCToken401ErrorInterceptor().install(http) // token失效处理
// 拦截器 end


//================================================================================
/** 开放白名单接口专用 */
//================================================================================
export const openHttp = buildHttp()
openHttp.TAG = 'openHttp'
// 拦截器 安装 start
new BCURLRequestInterceptor().install(openHttp) // baseURL拼装
new BCNetworkInterceptor().install(openHttp) // 网络拦截
new BCResponseInterceptor().install(openHttp) // 接口返回数据处理
new ErrorInterceptor().install(openHttp) // 接口异常处理
// 拦截器 end


