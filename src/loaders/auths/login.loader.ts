import {useLoader} from "../../hooks/loader.hook";
import {Core} from "../../cores/core.core";

export const useLogin = () => {
  return useLoader({
    method: 'post',
    getURL: () => Core.DefaultAPI('/login/token'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        'X-XSRF-TOKEN': me.csrf,
        'Cookie': me.cookie,
      }
    },
    onSuccess: async (data) => {
      // const storage = useAsyncStorage('me')
      // await storage.setItem(data)
    },
  })
}