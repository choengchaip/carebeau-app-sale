import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IJob} from "../models/job.model";

export const useMyJobCheckIn = () => {
  return useLoader<IJob, { store_code: string, job_no: string, loc_address: string, loc_lat_long: string, loc_nearby: string }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/update-store-location-job'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}