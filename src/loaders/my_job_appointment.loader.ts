import {useLoader} from "../hooks/loader.hook";
import {Core} from "../cores/core.core";
import {IJob} from "../models/job.model";

export const useMyJobAppointment = () => {
  return useLoader<IJob, { job_no: string, appointment_date: string, appointment_time: string }>({
    method: 'post',
    getURL: () => Core.DefaultAPI('/api/sale/update-appointment-date'),
    getHeaders: async (storage) => {
      const str = await storage.getItem()
      const me = JSON.parse(str || '{}')

      return {
        Authorization: `Bearer ${me?.device_token}`,
      }
    },
  })
}