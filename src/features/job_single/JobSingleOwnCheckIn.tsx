import { MyButton } from '../../components/uis/MyButton'
import { useRouter } from '../../hooks/router.hook'
import { AppPage } from '../../consts/page.const'

export const JobSingleOwnCheckIn = () => {
  const router = useRouter()

  return <MyButton
    flex={1}
    colorScheme={'success'}
    fontFamily={'medium'}
    color={'white'}
    title={'Check In'}
    onPress={() => {
      router.push(AppPage.JobSingleCheckIn.key)
    }}/>
}
