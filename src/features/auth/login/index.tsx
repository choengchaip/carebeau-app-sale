import React, {useState} from "react";
import {IProps} from "../../../cores/types.core";
import {ComponentUtil} from "../../../utils/component.util";
import {LoginNew} from "./LoginNew";
import {LoginOption} from "./LoginOption";
import {LoginOld} from "./LoginOld";

export const Login = (props: IProps) => {
  const [state, setState] = useState(0)

  return (
    <>
      {ComponentUtil.renderCondition(() => state === 0, <LoginOption onNext={(c) => setState(c)}/>)}
      {ComponentUtil.renderCondition(() => state === 1, <LoginNew/>)}
      {ComponentUtil.renderCondition(() => state === 2, <LoginOld/>)}
    </>
  )
}