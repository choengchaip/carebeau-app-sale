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

export interface IJobDetailItem {
  job_no: string
  job_type: string
  store_code: string
  store_name: string
  province: string
  customer_name: string
  store_address: string
  store_sub_district: string
  store_district: string
  store_province: string
  store_zip_code: string
  customer_phone: string
  store_loc_lat_long: string
  store_loc_nearby: string
  appointment_date: string
  appointment_time: string
  appointment_status: boolean
}

export interface IJob {
  message: string
  status_code: number
  data: {
    job_detail_data: IJobDetailItem
    new_job_list: IJobItem[]
    my_job_list: IJobItem[]
  }
}