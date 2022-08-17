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
        let tokenReg = RegExp(`XSRF-TOKEN=[a-zA-Z0-9%;]+`)
        let tokenRaw = get(tokenReg.exec(get(headers, 'set-cookie[0]', false)), '[0]', '')
        let token = decodeURIComponent(tokenRaw.replace('XSRF-TOKEN=', ''))

        await storage.setItem(JSON.stringify({
          csrf: token,
        }))
      }
    }
  })
}
