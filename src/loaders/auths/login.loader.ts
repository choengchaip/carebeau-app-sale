import {useLoader} from "../../hooks/loader.hook";
import {Core} from "../../cores/core.core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const useLogin = () => {
  return useLoader({
    method: 'post',
    getURL: () => Core.DefaultAPI('/login/token'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        'X-XSRF-TOKEN': me.csrf,
      }
    },
    onSuccess: async (data) => {
      const storage = useAsyncStorage('me')
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      await storage.setItem(JSON.stringify({
        ...me,
        ...data.data,
      }))
      await SecureStore.setItemAsync('me', JSON.stringify({
        ...me,
        ...data.data,
      }))
    },
  })
}
