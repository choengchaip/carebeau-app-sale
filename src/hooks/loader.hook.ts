import {useState} from "react";
import {ILoaderOptions, IStatus} from "./types.hook";
import {NewRequester} from "../cores/request.core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export const useLoader = <A = any, B = any>(options: ILoaderOptions<A, B>) => {
  const [data, setData] = useState<A | null>(null)
  const [status, setStatus] = useState<IStatus>({
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    options: {},
  })
  const [statusCache, setStatusCache] = useState<IStatus>({
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    options: {},
  })
  const [statusCacheSecure, setStatusCacheSecure] = useState<IStatus>({
    isError: false,
    isLoading: false,
    isSuccess: false,
    errorMessage: '',
    options: {},
  })

  const run = async (payload: B) => {
    setStatus((old) => ({
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
          'Content-Type': 'application/json',
          ...headers,
        }
      })

      if (response.status >= 400) {
        throw (await response.data)
      }

      setData(response.data)
      setStatus((old) => ({
        ...old,
        isSuccess: true,
      }))

      if (options.onSuccess) {
        await options.onSuccess(response.data, response.headers)
      }
    } catch (e) {
      setStatus((old) => ({
        ...old,
        isError: true,
        errorMessage: e.response?.data || e.response || e,
      }))
    }

    await new Promise<void>((r) => {
      setTimeout(() => {
        r()
      }, 750)
    })
    setStatus((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const cache = async () => {
    setStatusCache((old) => ({
      ...old,
      isSuccess: false,
      isLoading: true,
    }))
    const storage = useAsyncStorage(options.key!)

    try {
      await storage.setItem(JSON.stringify(data))
      setStatusCache((old) => ({
        ...old,
        isSuccess: true,
      }))
    } catch (e) {
      console.log('cache error', e)
      setStatusCache((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    setStatusCache((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const getFromCache = async () => {
    setStatusCache((old) => ({
      ...old,
      isSuccess: false,
      isLoading: true,
    }))
    const storage = useAsyncStorage(options.key!)

    try {
      const str = await storage.getItem()
      if (str) {
        setData(JSON.parse(str))
        setStatusCache((old) => ({
          ...old,
          isSuccess: true,
        }))
      } else {
        throw 'not found'
      }
    } catch (e) {
      console.log('get cache error', e)
      setStatusCache((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    setStatusCache((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const cacheSecure = async () => {
    setStatusCacheSecure((old) => ({
      ...old,
      isSuccess: false,
      isLoading: true,
    }))

    try {
      await SecureStore.setItemAsync(options.key!, JSON.stringify(data))
      setStatusCacheSecure((old) => ({
        ...old,
        isSuccess: true,
      }))
    } catch (e) {
      console.log('cache secure', e)
      setStatusCacheSecure((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    setStatusCacheSecure((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  const getFromCacheSecure = async () => {
    setStatusCacheSecure((old) => ({
      ...old,
      isSuccess: false,
      isLoading: true,
    }))

    try {
      const str = await SecureStore.getItemAsync(options.key!)
      if (str) {
        setData(JSON.parse(str))
        setStatusCacheSecure((old) => ({
          ...old,
          isSuccess: true,
        }))
      } else {
        throw 'not found'
      }
    } catch (e) {
      console.log('get cache secure', e)
      setStatusCacheSecure((old) => ({
        ...old,
        isError: true,
        errorMessage: e.toString(),
      }))
    }

    setStatusCacheSecure((old) => ({
      ...old,
      isLoading: false,
    }))
  }

  return {
    data,
    run,
    cache,
    getFromCache,
    cacheSecure,
    getFromCacheSecure,
    status,
    statusCache,
    statusCacheSecure,
    setData: (data: any) => {
      setData(data)
    },
  }
}