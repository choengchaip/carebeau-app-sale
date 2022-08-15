import {IProps} from "../../cores/types.core";
import {CardOpenStore} from "./shares/cards/CardOpenStore";
import {IJobItem} from "../../models/job.model";

export const JobListItem = (props: { item: IJobItem } & IProps) => {
  return (
    <CardOpenStore
      jobNo={props.item.job_no}
      expiredIn={props.item.time}
      storeName={props.item.store_name}
      storeProvince={props.item.province}
      customerName={props.item.customer_name}
      customerMobile={props.item.customer_phone}
      appointmentDate={props.item.appointment_date}
      appointmentTime={props.item.appointment_time}
    />
  )
}