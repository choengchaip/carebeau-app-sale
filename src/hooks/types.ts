export interface IStatus {
  isLoading: boolean
  isError: boolean
  errorAlias?: string
  errorMessage: string
}

export interface ILoaderOptions<A, B> {
  method: 'get' | 'post' | 'put' | 'delete'
  getURL: (payload: B) => string
}