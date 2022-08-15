import {IProps} from "../../cores/types.core";
import {Box, Text} from "native-base";

export const AppBar = (props: { isBack?: boolean } & IProps) => {
  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'} py={4}>
      <Text fontFamily={'semi_bold'} fontSize={'xl'} textAlign={'center'}>
        My Jobs
      </Text>
    </Box>
  )
}