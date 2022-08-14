import {useState} from "react";
import {ILoaderOptions, IStatus} from "./types.hook";
import {NewRequester} from "../cores/request.core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export const useLoader = <A = any, B = any>(options: ILoaderOptions<A, B>) => {
  const [_data, _setData] = useState<A | null>(null)
  const [_status, _setStatus] = useState<IStatus>({
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    options: {},
  })

  const run = async (payload: B) => {
    _setStatus((old) => ({
      ...old,
      isSuccess: false,
      isLoading: true,
    }))

    try {
      const storage = useAsyncStorage('me')
      let headers = {}

      if (options.getHeaders) {
        headers = await options.getHeaders(storage)
      }

      const response = await NewRequester.create<any>(options.method, options.getURL(payload), payload, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        }
      })

      if (response.status >= 400) {
        throw (await response.data)
      }

      _setData(response.data)
      _setStatus((old) => ({
        ...old,
        isSuccess: true,
      }))

      if (options.onSuccess) {
        await options.onSuccess(response.data, response.headers)
      }
    } catch (e) {
      _setStatus((old) => ({
        ...old,
        isError: true,
        errorMessage: e,
      }))
    }

    _setStatus((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const cache = async () => {
    _setStatus((old) => ({
      ...old,
      isSuccess: false,
      isLoading: false,
    }))
    const storage = useAsyncStorage(options.key!)

    try {
      await storage.setItem(JSON.stringify(_data))
      _setStatus((old) => ({
        ...old,
        isSuccess: true,
      }))
    } catch (e) {
      _setStatus((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    _setStatus((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const getFromCache = async () => {
    _setStatus((old) => ({
      ...old,
      isSuccess: true,
      isLoading: false,
    }))
    const storage = useAsyncStorage(options.key!)

    try {
      const str = await storage.getItem()
      if (str) {
        _setData(JSON.parse(str))
        _setStatus((old) => ({
          ...old,
          isSuccess: true,
        }))
      }else{
        throw 'not found'
      }
    } catch (e) {
      _setStatus((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    _setStatus((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  return {
    data: () => _data,
    run,
    cache,
    getFromCache,
    status: () => _status,
  }
}