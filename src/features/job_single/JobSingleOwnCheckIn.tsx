import {MyButton} from '../../components/uis/MyButton'
import {useRouter} from '../../hooks/router.hook'
import {AppPage} from '../../consts/page.const'
import {IProps} from "../../cores/types.core";

export interface IJobSingleOwnCheckInProps extends IProps {
  jobType: string
  jobNo: string
  storeCode: string
  address: string
  latLong: string
  nearby: string
}

export const JobSingleOwnCheckIn = (props: IJobSingleOwnCheckInProps) => {
  const router = useRouter()

  return <MyButton
    flex={1}
    colorScheme={'success'}
    fontFamily={'medium'}
    color={'white'}
    title={'Check In'}
    onPress={async () => {
      await router.push(AppPage.JobSingleCheckIn.key, {
        job_type: props.jobType,
        job_no: props.jobNo,
        store_code: props.storeCode,
        address: props.address,
        note: props.nearby,
        lat_long: props.latLong,
      })
    }}/>
}
