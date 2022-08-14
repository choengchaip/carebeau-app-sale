export interface IStatus {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  errorAlias?: string
  errorMessage: string
  options?: any
}

export interface ILoaderOptions<A, B> {
  key?: string
  method: 'get' | 'post' | 'put' | 'delete'
  getURL: (payload: B) => string,
  getHeaders?: (storage: AsyncStorageHook) => Promise<any>,
  onSuccess?: (data: A, headers: any) => Promise<void>,
}