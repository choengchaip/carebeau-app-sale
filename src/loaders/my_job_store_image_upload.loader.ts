import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IJob} from "../models/job.model";

export const useMyJobStoreImageUpload = () => {
  return useLoader<IJob, { store_code: string, [key: string]: any }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/upload-store-image-job'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}