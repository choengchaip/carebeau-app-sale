import {IProps} from "../../cores/types.core";
import {IUseUploadImage} from "../../hooks/upload_image.hook";
import {AspectRatio, Center, HStack, Icon, Modal, Pressable, Text, useToast, VStack} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, useCameraPermissions} from "expo-image-picker";

export interface IMyUploadImageProps extends IProps {
  image: IUseUploadImage
}

export const MyUploadImage = (props: IMyUploadImageProps) => {
  const [status, requestPermission] = useCameraPermissions()

  const onPickFromGallery = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      props.image.onUpload(result)
    }
  }

  const onPickFromCamera = async () => {
    if (status?.status !== 'granted') {
      await requestPermission()
    }

    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      props.image.onUpload(result)
    }
  }

  return <>
    <Modal
      isOpen={props.image.isShow}
      onClose={() => props.image.onClose()}>
      <Modal.Content
        w={'full'}
        mt={'auto'}
        mx={0}
        mb={0}
        py={2}>
        <Modal.CloseButton pt={4}/>
        <Modal.Body>
          <VStack px={6} pb={6} space={4}>
            <HStack justifyContent={'center'} mb={2}>
              <Text fontFamily={'semi_bold'} fontSize={'lg'}>
                อัพโหลดภาพถ่าย
              </Text>
            </HStack>
            <HStack space={4}>
              <AspectRatio
                flex={1}
                maxWidth={150}
                ratio={1.25}
                borderWidth={1}
                borderColor={'danger.500'}
                bg={'danger.500'}
                rounded={'md'}>
                <Pressable onPress={onPickFromGallery}>
                  <Center w={'full'} h={'full'}>
                    <Icon as={MaterialCommunityIcons} name={'image-multiple'} color={'white'} size={10} mb={1}/>
                    <Text fontFamily={'medium'} color={'white'}>
                      อัพโหลด
                    </Text>
                  </Center>
                </Pressable>
              </AspectRatio>
              <AspectRatio
                flex={1}
                ratio={1.25}
                borderWidth={1}
                borderColor={'danger.500'}
                rounded={'md'}>
                <Pressable onPress={onPickFromCamera}>
                  <Center w={'full'} h={'full'}>
                    <Icon as={MaterialCommunityIcons} name={'image-multiple'} color={'danger.500'} size={10} mb={1}/>
                    <Text fontFamily={'medium'} color={'danger.500'}>
                      ถ่ายภาพ
                    </Text>
                  </Center>
                </Pressable>
              </AspectRatio>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  </>
}