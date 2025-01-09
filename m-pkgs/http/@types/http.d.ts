/* eslint-disable no-unused-vars */
interface IApiResponse<T = any> {
    code: number;
    data: T;
    message: string;
    traceId: string;
}

interface IApiPaperResponse<T = any> extends IResList<T> {
    code: number;
    message: string;
    traceId: string;
}

type IResponse = IApiResponse | IApiPaperResponse

