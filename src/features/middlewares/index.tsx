import {useMount} from "../../hooks/core.hook";
import {Box, Spinner, useToast} from "native-base";
import {IProps} from "../../cores/types.core";
import {useMe} from "../../loaders/auths/me.loader";
import {useRouter} from "../../hooks/router.hook";
import {useWatchError, useWatchErrorWithToast, useWatchSuccess} from "../../hooks/watch.hook";
import {AppPage} from "../../consts/page.const";
import {useMyJob} from "../../loaders/my_job.loader";

export const Middleware = (props: IProps) => {
  const router = useRouter()
  const toast = useToast()
  const me = useMe()
  const job = useMyJob()

  useMount(async () => {
    await me.getFromCacheSecure()
  })

  useWatchSuccess(me.statusCacheSecure, async () => {
    await job.run({})
  })
  useWatchErrorWithToast(toast, me.statusCacheSecure, () => {
    router.push(AppPage.Login.key)
  })

  useWatchSuccess(job.status, async () => {
    await me.cache()
  })
  useWatchError(job.status, () => {
    router.push(AppPage.Login.key)
  })

  useWatchSuccess(me.statusCache, () => {
    if (me.data) {
      router.push(AppPage.Job.key)
    } else {
      router.push(AppPage.Login.key)
    }
  })
  useWatchErrorWithToast(toast, me.statusCache, () => {
    router.push(AppPage.Login.key)
  })

  return (
    <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
      <Spinner color={'danger.500'}/>
    </Box>
  )
}