import {useLoader} from "../../hooks/loader.hook";
import {Core} from "../../cores/core.core";
import {get} from "lodash";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export const useCSRF = () => {
  return useLoader({
    key: 'csrf',
    method: 'get',
    getURL: () => Core.DefaultAPI('/sanctum/csrf-cookie'),
    onSuccess: async (data, headers) => {
      const storage = useAsyncStorage('me')

      if (get(headers, 'set-cookie[0]', false)) {
        await storage.setItem(JSON.stringify({
          'csrf': decodeURIComponent(get(headers, 'set-cookie[0]', false).replace(/;.+/g, '').replace(/.+=/g, '')),
        }))
      }
    }
  })
}