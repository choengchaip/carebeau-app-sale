import React, {useState} from "react";
import {IProps} from "../../../cores/types.core";
import {ComponentUtil} from "../../../utils/component.util";
import {LoginNew} from "./LoginNew";
import {LoginOption} from "./LoginOption";
import {LoginOld} from "./LoginOld";
import {useCSRF} from "../../../loaders/auths/csrf.loader";
import {useLogin} from "../../../loaders/auths/login.loader";
import {useMount} from "../../../hooks/core.hook";
import {AppPage} from "../../../consts/page.const";
import {Box, Spinner, useToast} from "native-base";
import {useWatchErrorWithToast, useWatchSuccess} from "../../../hooks/watch.hook";

export const Login = (props: IProps) => {
  const [state, setState] = useState(0)
  const csrf = useCSRF()
  const login = useLogin()
  const toast = useToast()

  useMount(async () => {
    await csrf.run({})
  })

  useWatchErrorWithToast(toast, csrf.status)

  useWatchSuccess(login.status, () => {
    props.navigation.push(AppPage.Middleware.key)
  })

  useWatchErrorWithToast(toast, login.status)

  if (csrf.status.isLoading) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner color={'danger.500'}/>
      </Box>
    )
  }

  return (
    <>
      {ComponentUtil.renderCondition(() => state === 0, <LoginOption onNext={(c) => setState(c)}/>)}
      {ComponentUtil.renderCondition(() => state === 1, <LoginNew status={login.status} onLogin={login.run}/>)}
      {ComponentUtil.renderCondition(() => state === 2, <LoginOld/>)}
    </>
  )
}