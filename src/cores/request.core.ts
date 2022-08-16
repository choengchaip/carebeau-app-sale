import axios, {AxiosInstance, AxiosRequestConfig, CancelTokenSource, CancelTokenStatic, Method} from 'axios'

export interface IResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request?: any
}

export interface IRequester {
  get<T>(path: string, options?: AxiosRequestConfig): Promise<IResponse<T>>

  put<T>(path: string, payload: any, options?: AxiosRequestConfig): Promise<IResponse<T>>

  delete<T>(path: string, options?: AxiosRequestConfig): Promise<IResponse<T>>

  post<T>(path: string, payload: any, options?: AxiosRequestConfig): Promise<IResponse<T>>

  create<T>(method: Method, path: string, payload: any, options?: AxiosRequestConfig): Promise<IResponse<T>>
}

export class Requester {
  public cancelToken: CancelTokenStatic
  public source: CancelTokenSource
  public isCancel: (value: any) => boolean
  public service: AxiosInstance
  private readonly options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig = {}) {
    this.options = options
    this.service = axios.create(options)
    this.cancelToken = axios.CancelToken
    this.source = this.cancelToken.source()
    this.isCancel = axios.isCancel
  }

  public get<T>(path: string, options: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return this.service.get<T>(path, options)
  }

  public put<T>(path: string, payload: any, options: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return this.service.put<T>(path, payload, options)
  }

  public delete<T>(path: string, options: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return this.service.delete(path, options)
  }

  public post<T>(path: string, payload: any, options: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    return this.service.post<T>(path, payload, options)
  }

  public create<T>(method: Method, path: string, payload: any, options: AxiosRequestConfig = {}): Promise<IResponse<T>> {
    let newPayload = undefined

    // TODO: Have to do this because of ios shit!
    if (Object.keys(payload).length > 0) {
      newPayload = JSON.stringify(payload)
    }

    return this.service({
      method: method,
      url: path,
      data: newPayload,
      ...this.options,
      ...options,
    }) as any
  }
}

export const NewRequester: IRequester = new Requester({})