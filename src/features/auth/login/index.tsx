import React, {useEffect, useState} from "react";
import {IProps} from "../../../cores/types.core";
import {ComponentUtil} from "../../../utils/component.util";
import {LoginNew} from "./LoginNew";
import {LoginOption} from "./LoginOption";
import {LoginOld} from "./LoginOld";
import {useCSRF} from "../../../loaders/auths/csrf.loader";
import {useLogin} from "../../../loaders/auths/login.loader";
import {useMount} from "../../../hooks/core.hook";
import {AppPage} from "../../../consts/page.const";

export const Login = (props: IProps) => {
  const [state, setState] = useState(0)
  const csrf = useCSRF()
  const login = useLogin()

  useMount(async () => {
    await csrf.run({})
  })

  useEffect(() => {
    if (login.status().isSuccess) {
      props.navigation.push(AppPage.Job.key)
    }
  }, [login.status().isSuccess])

  return (
    <>
      {ComponentUtil.renderCondition(() => state === 0, <LoginOption onNext={(c) => setState(c)}/>)}
      {ComponentUtil.renderCondition(() => state === 1, <LoginNew onLogin={login.run}/>)}
      {ComponentUtil.renderCondition(() => state === 2, <LoginOld/>)}
    </>
  )
}