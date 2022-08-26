import {AspectRatio, Box, Center, Icon, Pressable, Text} from "native-base";
import {IProps} from "../../../cores/types.core";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const AddImageButton = (props: { onPress: () => void } & IProps) => {
  return (
    <Pressable
      flexGrow={'0'}
      flexShrink={'0'}
      flexBasis={'33.33%'}
      px={2.5}
      onPress={props.onPress}>
      <AspectRatio ratio={1}>
        <Box
          borderWidth={1}
          borderStyle={'dashed'}
          borderColor={'danger.400'}
          rounded={'sm'}>
          <Center w={'full'} h={'full'} pb={3}>
            <Icon as={MaterialCommunityIcons} name={'plus'} color={'danger.400'} size={10}/>
            <Text fontFamily={'medium'}>
              เพิ่มรูปภาพ
            </Text>
          </Center>
        </Box>
      </AspectRatio>
    </Pressable>
  )
}
