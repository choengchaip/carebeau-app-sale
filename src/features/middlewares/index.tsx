import {useMount} from "../../hooks/core.hook";
import {Box, Spinner} from "native-base";
import {IProps} from "../../cores/types.core";
import {useMe} from "../../loaders/auths/me.loader";
import {useEffect} from "react";
import {AppPage} from "../../consts/page.const";

export const Middleware = (props: IProps) => {
  const me = useMe()

  useMount(async () => {
    me.setData({
      device_token: '203|uVyvK2U0NnOfOjcLc1PAH1OfSn7Sob4Vvqb68LF1'
    })
    console.log(me.data())
    props.navigation.push(AppPage.Job.key)

    // await me.getFromCacheSecure()
  })

  useEffect(() => {
    if (me.status().isSuccess) {
      props.navigation.push(AppPage.Login.key)
    }
  }, [me.status().isSuccess])

  return (
    <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
      <Spinner/>
    </Box>
  )
}