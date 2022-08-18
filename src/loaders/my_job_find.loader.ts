import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IJob} from "../models/job.model";

export const useMyJobFind = () => {
  return useLoader<IJob, { job_no: string }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/get-my-job-detail'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}