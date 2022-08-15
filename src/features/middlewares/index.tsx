import {useMount} from "../../hooks/core.hook";
import {Box, Spinner} from "native-base";
import {IProps} from "../../cores/types.core";
import {useMe} from "../../loaders/auths/me.loader";
import {useEffect} from "react";
import {AppPage} from "../../consts/page.const";

export const Middleware = (props: IProps) => {
  const me = useMe()

  useMount(() => {
    me.setData({
      device_token: '213|jOWz93sI3b2CMPtuWWIL6aVljopdGNEIENJuMcZS',
    })
  })

  useEffect(() => {
    if (me.data) {
      me.cache();
    }
  }, [me.data])

  useEffect(() => {
    if (me.status.isSuccess && !me.status.isLoading) {
      props.navigation.push(AppPage.Job.key)
      // props.navigation.push(AppPage.Login.key)
    }
  }, [me.status.isSuccess, me.status.isLoading])

  return (
    <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
      <Spinner/>
    </Box>
  )
}