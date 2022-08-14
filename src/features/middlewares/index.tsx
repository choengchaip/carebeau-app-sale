import {useCSRF} from "../../loaders/auths/csrf.loader";
import {useMount} from "../../hooks/core.hook";
import {Box, Spinner} from "native-base";
import {IProps} from "../../cores/types.core";
import {AppPage} from "../../consts/page.const";

export const Middleware = (props: IProps) => {
  const csrf = useCSRF()

  useMount(async () => {
    await csrf.run({})
    await csrf.cache()

    props.navigation.push(AppPage.Login.key)
  })

  return (
    <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
      <Spinner/>
    </Box>
  )
}