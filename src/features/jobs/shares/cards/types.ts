import {IProps} from "../../../../cores/types.core";

export interface ICardProps extends IProps {
  type: 'new' | 'own'
  jobNo: string
  expiredIn: string
  storeName: string
  storeProvince: string
  customerName: string
  customerMobile?: string
  appointmentDate?: string
  appointmentTime?: string
}