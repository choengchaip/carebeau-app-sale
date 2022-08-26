import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IStoreImage} from "../models/store_image.model";

export const useMyJobStoreImage = () => {
  return useLoader<IStoreImage, { store_code: string }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/get-img-store'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}