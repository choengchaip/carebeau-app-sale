import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IJob} from "../models/job.model";

export const useNewJobConfirm = () => {
  return useLoader<IJob>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/confirm-job'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}