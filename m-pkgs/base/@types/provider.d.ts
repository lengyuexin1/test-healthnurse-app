/* eslint-disable no-unused-vars */
//===============================================================
/** 相关接口 */
//===============================================================


interface IPromiseCallback<T> {
    (): Promise<T>
}

type TAsyncState = 'padding' | 'ok' | 'error'

interface IPromiseResolve<T> {
    resolve: (value: T) => void
}
interface IPromise<T> extends IPromiseResolve<T>{
    reject: (err: Error) => void
}

