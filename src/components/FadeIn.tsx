import {IProps} from "../cores/types.core";
import {PresenceTransition} from "native-base";

export const FadeIn = (props: IProps) => {
  return (
    <PresenceTransition
      visible={true}
      initial={{
        opacity: 0
      }} animate={{
      opacity: 1,
      transition: {
        duration: 500
      }
    }}>
      {props.children}
    </PresenceTransition>
  )
}