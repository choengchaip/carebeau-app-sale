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
        let careReg = RegExp(`carebeauplus_session=[a-zA-Z0-9%]+`)

        let token = get(tokenReg.exec(get(headers, 'set-cookie[0]', false)), '[0]', '')
        let care = get(careReg.exec(get(headers, 'set-cookie[0]', false)), '[0]', '')

        await storage.setItem(JSON.stringify({
          csrf: decodeURIComponent(get(headers, 'set-cookie[0]', false).replace(/;.+/g, '').replace(/.+=/g, '')),
          cookie: `${token} ${care}`,
        }))
      }
    }
  })
}