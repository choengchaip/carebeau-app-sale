import {IProps} from "../../cores/types.core";
import {useRef} from "react";
import {AlertDialog, AspectRatio, Image, Text, VStack} from "native-base";
import {MyButton} from "../uis/MyButton";

export const MyDialogSuccess = (props: { title: string, description: string, isShow: boolean, onClose: () => void } & IProps) => {
  const ref = useRef()

  return (
    <AlertDialog
      leastDestructiveRef={ref}
      isOpen={props.isShow}
      onClose={() => props.onClose()}>
      <AlertDialog.Content>
        <AlertDialog.Body p={8}>
          <AspectRatio height={'100%'} width={'100%'} ratio={1}>
            <VStack space={2} alignItems={'center'}>
              <Image
                source={require('../../../assets/success.png')}
                alt={'nothing'}
                height={100}
                width={100}
                pr={6}
                mx={'auto'}
                mb={2}/>
              <Text
                fontFamily={'medium'}
                fontSize={'lg'}>
                {props.title}
              </Text>
              <Text
                fontFamily={'medium'}
                fontSize={'sm'}
                color={'muted.500'}>
                {props.description}
              </Text>
              <MyButton
                title={'ตกลง'}
                width={'100%'}
                mt={'auto'}
                colorScheme={'success'}
                onPress={() => props.onClose()}/>
            </VStack>
          </AspectRatio>
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  )
}