import {IProps} from "../cores/types.core";
import {Center, Text} from "native-base";

export const SubTitleBar = (props: { title: string } & IProps) => {
  return (
    <Center pb={3} borderBottomWidth={1.5} borderBottomColor={'danger.500'}>
      <Text fontFamily={'medium'} fontSize={'sm'} color={'danger.500'}>
        {props.title}
      </Text>
    </Center>
  )
}