export interface IJobItem {
  job_no: string
  job_type: string
  province: string
  store_code: string
  store_name: string
  customer_name: string
  customer_phone: string
  appointment_date: string
  appointment_time: string
  appointment_fulltime: string
  appointment_status: string
  time: string
}

export interface IJob {
  message: string
  status_code: number
  data: {
    new_job_list: IJobItem[]
    my_job_list: IJobItem[]
  }
}