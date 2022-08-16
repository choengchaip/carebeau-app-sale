import {useMount} from "../../hooks/core.hook";
import {Box, Spinner, useToast} from "native-base";
import {IProps} from "../../cores/types.core";
import {useMe} from "../../loaders/auths/me.loader";
import {useRouter} from "../../hooks/router.hook";
import {useWatchErrorWithToast, useWatchSuccess} from "../../hooks/watch.hook";
import {AppPage} from "../../consts/page.const";

export const Middleware = (props: IProps) => {
  const router = useRouter()
  const toast = useToast()
  const me = useMe()

  useMount(async () => {
    await me.getFromCacheSecure()
  })

  useWatchSuccess(me.statusCache, () => {
    if (me.data) {
      router.push(AppPage.Job.key)
    } else {
      router.push(AppPage.Login.key)
    }
  })

  useWatchErrorWithToast(toast, me.statusCache)

  useWatchSuccess(me.statusCacheSecure, async () => {
    await me.cache()
  })

  useWatchErrorWithToast(toast, me.statusCacheSecure)

  return (
    <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
      <Spinner color={'danger.500'}/>
    </Box>
  )
}