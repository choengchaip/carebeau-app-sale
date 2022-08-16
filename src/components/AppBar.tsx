import {IProps} from "../cores/types.core";
import {Box, Text} from "native-base";

export const AppBar = (props: IProps) => {
  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'} py={2}>
      <Text fontFamily={'medium'} fontSize={'md'} textAlign={'center'}>
        My Jobs
      </Text>
    </Box>
  )
}