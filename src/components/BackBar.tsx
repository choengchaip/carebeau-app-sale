import {IProps} from "../cores/types.core";
import {Box, Icon, Pressable, Text} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useRouter} from "../hooks/router.hook";

export const BackBar = (props: { title: string } & IProps) => {
  const router = useRouter()

  return (
    <Box
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      pt={2}
      pb={5}>
      <Pressable
        position={'absolute'}
        top={3}
        left={5}
        onPress={() => {
          router.goBack()
        }}>
        <Icon
          as={MaterialCommunityIcons}
          name={'arrow-left'}
          color={'black'}
          size={6}/>
      </Pressable>
      <Text fontFamily={'medium'} fontSize={'md'}>
        {props.title}
      </Text>
    </Box>
  )
}