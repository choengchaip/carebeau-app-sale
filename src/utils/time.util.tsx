import moment from "moment"
import 'moment/locale/th'

export class TimeUtil {
  static fromDateToDateTH = (str: string) => {
    if (!moment(str).isValid()) {
      return str
    }

    return moment(str).format('ll')
  }
}