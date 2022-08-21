import {IProps} from "../../cores/types.core";
import {CardOpenStore} from "../shares/cards/CardOpenStore";
import {IJobItem} from "../../models/job.model";

export const JobListItem = (props: { item: IJobItem, type: 'new' | 'own' } & IProps) => {
  return (
    <CardOpenStore
      type={props.type}
      jobNo={props.item.job_no}
      expiredIn={props.item.time}
      storeName={props.item.store_name}
      storeCode={props.item.store_code}
      storeProvince={props.item.province}
      customerName={props.item.customer_name}
      customerMobile={props.item.customer_phone}
      appointmentDate={props.item.appointment_date}
      appointmentTime={props.item.appointment_time}
    />
  )
}
