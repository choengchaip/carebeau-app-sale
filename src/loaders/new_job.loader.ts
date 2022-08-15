import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {IJob} from "../models/job.model";
import {useMe} from "./auths/me.loader";

export const useNewJob = () => {
  return useLoader<IJob>({
    method: 'get',
    getURL: () => Core.DefaultAPI('/api/sale/get-new-job-list'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        'Authorization': `Bearer ${me?.device_token}`,
      }
    },
  })
}