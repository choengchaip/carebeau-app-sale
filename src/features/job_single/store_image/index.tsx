import {AspectRatio, Box, HStack, Image, ScrollView, Spinner, Text, useToast, VStack} from "native-base";
import {BackBar} from "../../../components/BackBar";
import {FadeIn} from "../../../components/FadeIn";
import {AddImageButton} from "./AddImageButton";
import {MyUploadImage} from "../../../components/hooks/MyUploadImage";
import {useUploadImage} from "../../../hooks/upload_image.hook";
import {useMyJobStoreImageUpload} from "../../../loaders/my_job_store_image_upload.loader";
import {useWatchErrorWithToast, useWatchSuccess} from "../../../hooks/watch.hook";
import {useRouter} from "../../../hooks/router.hook";
import {useForm} from "../../../hooks/form.hook";
import {useMyJobStoreImage} from "../../../loaders/my_job_store_image.loader";
import {useMount} from "../../../hooks/core.hook";
import {set} from "lodash";

export const JobSingleStoreImage = () => {
  const form = useForm<{ front?: { id: number, type?: string, url: string }[], inside?: { id: number, type?: string, url: string }[] }>()
  const router = useRouter<{ store_code: string }>()
  const toast = useToast()
  const image = useUploadImage()

  const storeImage = useMyJobStoreImage()
  const storeUpload = useMyJobStoreImageUpload()

  const getFrontImageURLs = (): { type?: string, url: string }[] => {
    return form.form?.front?.map((item) => item) || []
  }

  const getInsideImageURLs = (): { type?: string, url: string }[] => {
    return form.form?.inside?.map((item) => item) || []
  }

  useMount(() => {
    storeImage.run({
      store_code: router.params.store_code,
    })

  })

  useWatchSuccess(storeImage.status, () => {
    form.setForm({
      front: storeImage.data?.data.store_image.front_img.map((item) => ({
        id: item.store_image_id,
        url: item.image_path,
      })) || [],
      inside: storeImage.data?.data.store_image.inside_img.map((item) => ({
        id: item.store_image_id,
        url: item.image_path,
      })) || [],
    })
  })

  useWatchErrorWithToast(toast, storeImage.status)

  useWatchErrorWithToast(toast, storeUpload.status)

  if (storeImage.status.isLoading || !storeImage.status.isSuccess) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner color={'danger.500'}/>
      </Box>
    )
  }

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <MyUploadImage image={image}/>
      <BackBar title={'ภาพถ่ายร้านค้า'}/>
      <ScrollView flex={1}>
        <FadeIn>
          <VStack px={2.5}>
            <Text px={2.5} mb={2.5} fontFamily={'semi_bold'} fontSize={'sm'}>
              ภาพถ่ายหน้าร้านค้า<Text fontFamily={'light'} color={'danger.600'}>* (อย่างน้อย 1 ภาพ สูงสุด 10 ภาพ)</Text>
            </Text>
            <HStack flexWrap={'wrap'} mb={6}>
              {getFrontImageURLs().map((item) => {
                return (
                  <Box flexGrow={'0'} flexShrink={'0'} flexBasis={'33.33%'} px={2.5}>
                    <AspectRatio ratio={1}>
                      <Box bg={'danger.100'} overflow={'hidden'} rounded={'sm'}>
                        <FadeIn>
                          <Image
                            w={'full'}
                            h={'full'}
                            resizeMode={'cover'}
                            source={{
                              uri: item.url,
                            }}/>
                        </FadeIn>
                      </Box>
                    </AspectRatio>
                  </Box>
                )
              })}
              <AddImageButton
                onPress={() => {
                  image.show({
                    onUpload: async (file: any) => {
                      await storeUpload.run({
                        store_code: router.params.store_code,
                      })
                      form.setForm({
                        ...form.form,
                        front: [
                          ...(form.form?.front || []),
                          {
                            id: -1,
                            url: file.uri,
                          }
                        ]
                      })
                    }
                  })
                }}/>
            </HStack>

            <Text px={2.5} mb={2.5} fontFamily={'semi_bold'} fontSize={'sm'}>
              ภาพถ่ายภายในร้านค้า<Text fontFamily={'light'} color={'danger.600'}>* (อย่างน้อย 1 ภาพ สูงสุด 10
              ภาพ)</Text>
            </Text>
            <HStack flexWrap={'wrap'}>
              {getInsideImageURLs().map((item) => {
                return (
                  <Box flexGrow={'0'} flexShrink={'0'} flexBasis={'33.33%'} px={2.5}>
                    <AspectRatio ratio={1}>
                      <Box bg={'danger.100'} overflow={'hidden'} rounded={'sm'}>
                        <FadeIn>
                          <Image
                            w={'full'}
                            h={'full'}
                            resizeMode={'cover'}
                            source={{
                              uri: item.url,
                            }}/>
                        </FadeIn>
                      </Box>
                    </AspectRatio>
                  </Box>
                )
              })}
              <AddImageButton
                onPress={() => {
                  image.show({
                    onUpload: async (file: any) => {
                      await storeUpload.run({
                        store_code: router.params.store_code,
                      })
                      form.setForm({
                        ...form.form,
                        inside: [
                          ...(form.form?.inside || []),
                          {
                            id: -1,
                            url: file.uri,
                          }
                        ]
                      })
                    }
                  })
                }}/>
            </HStack>
          </VStack>
        </FadeIn>
      </ScrollView>
    </VStack>
  )
}
