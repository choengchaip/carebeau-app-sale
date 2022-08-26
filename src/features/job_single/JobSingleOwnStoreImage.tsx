import {HStack, Icon, Pressable, Text} from 'native-base'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {IProps} from "../../cores/types.core";
import {useRouter} from "../../hooks/router.hook";
import {AppPage} from "../../consts/page.const";

export interface IJobSingleOwnStoreImageProps extends IProps {
  storeCode: string
}

export const JobSingleOwnStoreImage = (props: IJobSingleOwnStoreImageProps) => {
  const router = useRouter()

  return <Pressable onPress={()=>{
    router.push(AppPage.JobSingleStoreImage.key, {
      store_code: props.storeCode,
    })
  }}>
    <HStack px={4} py={5} borderWidth={1} borderColor={'muted.300'} rounded={'md'}>
      <Icon as={MaterialCommunityIcons} name={'image-edit-outline'} color={'muted.700'} size={5} mr={2}/>
      <Text fontFamily={'medium'} fontSize={'sm'} color={'muted.700'}>
        ภาพถ่ายร้านค้า
      </Text>
      <Icon as={MaterialCommunityIcons} name={'chevron-right'} color={'muted.700'} size={5} ml={'auto'}/>
    </HStack>
  </Pressable>
}
