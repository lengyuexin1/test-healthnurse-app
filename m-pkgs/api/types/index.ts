//====================================================================================
/** 用户中心 */
//====================================================================================
import type { IUserGetRequest } from "./user/get-request"
import type { IUserGetResponse } from "./user/get-response"
import type { IUserPostRequest } from "./user/post-request"
import type { IUserPostResponse } from "./user/post-response"
export interface UserApi {
    get<API extends keyof IUserGetRequest>(url: API, params?: IUserGetRequest[API], options?: ReqOptions): Promise<IUserGetResponse[API]>
    post<API extends keyof IUserPostRequest>(url: API, data?: IUserPostRequest[API], options?: ReqOptions): Promise<IUserPostResponse[API]>
    useGet<API extends keyof IUserGetRequest>(url: API, params?: IUserGetRequest[API], options?: ReqOptions): UseApi<IUserGetResponse[API]>
    usePost<API extends keyof IUserPostRequest>(url: API, data?: IUserPostRequest[API], options?: ReqOptions): UseApi<IUserPostResponse[API]>
}


//====================================================================================
/** 消息中心 */
//====================================================================================
import type { IImGetRequest } from "./im/get-request"
import type { IImGetResponse } from "./im/get-response"
import type { IImPostRequest } from "./im/post-request"
import type { IImPostResponse } from "./im/post-response"
export interface MessageApi {
    get<API extends keyof IImGetRequest>(url: API, params?: IImGetRequest[API], options?: ReqOptions): Promise<IImGetResponse[API]>
    post<API extends keyof IImPostRequest>(url: API, data?: IImPostRequest[API], options?: ReqOptions): Promise<IImPostResponse[API]>
    useGet<API extends keyof IImGetRequest>(url: API, params?: IImGetRequest[API], options?: ReqOptions): UseApi<IImGetResponse[API]>
    usePost<API extends keyof IImPostRequest>(url: API, data?: IImPostRequest[API], options?: ReqOptions): UseApi<IImPostResponse[API]>
}


//====================================================================================
/** 结算中心 */
//====================================================================================
import type { ISettlementGetRequest } from "./settlement/get-request"
import type { ISettlementGetResponse } from "./settlement/get-response"
import type { ISettlementPostRequest } from "./settlement/post-request"
import type { ISettlementPostResponse } from "./settlement/post-response"
export interface SettlementApi {
    get<API extends keyof ISettlementGetRequest>(url: API, params?: ISettlementGetRequest[API], options?: ReqOptions): Promise<ISettlementGetResponse[API]>
    post<API extends keyof ISettlementPostRequest>(url: API, data?: ISettlementPostRequest[API], options?: ReqOptions): Promise<ISettlementPostResponse[API]>
    useGet<API extends keyof ISettlementGetRequest>(url: API, params?: ISettlementGetRequest[API], options?: ReqOptions): UseApi<ISettlementGetResponse[API]>
    usePost<API extends keyof ISettlementPostRequest>(url: API, data?: ISettlementPostRequest[API], options?: ReqOptions): UseApi<ISettlementPostResponse[API]>
}


//====================================================================================
/** 订单中心 */
//====================================================================================
import type { IOrderGetRequest } from "./order/get-request"
import type { IOrderGetResponse } from "./order/get-response"
import type { IOrderPostRequest } from "./order/post-request"
import type { IOrderPostResponse } from "./order/post-response"
export interface OrderApi {
    get<API extends keyof IOrderGetRequest>(url: API, params?: IOrderGetRequest[API], options?: ReqOptions): Promise<IOrderGetResponse[API]>
    post<API extends keyof IOrderPostRequest>(url: API, data?: IOrderPostRequest[API], options?: ReqOptions): Promise<IOrderPostResponse[API]>
    useGet<API extends keyof IOrderGetRequest>(url: API, params?: IOrderGetRequest[API], options?: ReqOptions): UseApi<IOrderGetResponse[API]>
    usePost<API extends keyof IOrderPostRequest>(url: API, data?: IOrderPostRequest[API], options?: ReqOptions): UseApi<IOrderPostResponse[API]>
}


//====================================================================================
/** 内容中心 */
//====================================================================================
import type { ReqOptions, UseApi } from "@bc/http"
import type { IContentGetRequest } from "./content/get-request"
import type { IContentGetResponse } from "./content/get-response"
import type { IContentPostRequest } from "./content/post-request"
import type { IContentPostResponse } from "./content/post-response"
export interface ContentApi {
    get<API extends keyof IContentGetRequest>(url: API, params?: IContentGetRequest[API], options?: ReqOptions): Promise<IContentGetResponse[API]>
    post<API extends keyof IContentPostRequest>(url: API, data?: IContentPostRequest[API], options?: ReqOptions): Promise<IContentPostResponse[API]>
    useGet<API extends keyof IContentGetRequest>(url: API, params?: IContentGetRequest[API], options?: ReqOptions): UseApi<IContentGetResponse[API]>
    usePost<API extends keyof IContentPostRequest>(url: API, data?: IContentPostRequest[API], options?: ReqOptions): UseApi<IContentPostResponse[API]>
}
