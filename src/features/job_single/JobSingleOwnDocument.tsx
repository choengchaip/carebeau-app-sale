import {HStack, Icon, Pressable, Text} from 'native-base'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useRouter} from "../../hooks/router.hook";
import {AppPage} from "../../consts/page.const";
import {IProps} from "../../cores/types.core";

export const JobSingleOwnDocument = (props: { storeCode: string, jobNo: string } & IProps) => {
  const router = useRouter()

  return <Pressable onPress={() => {
    router.push(AppPage.JobSingleDocument.key, {
      store_code: props.storeCode,
      job_no: props.jobNo,
    })
  }}>
    <HStack px={4} py={5} borderWidth={1} borderColor={'muted.300'} rounded={'md'}>
      <Icon as={MaterialCommunityIcons} name={'file-document-outline'} color={'muted.700'} size={5} mr={2}/>
      <Text fontFamily={'medium'} fontSize={'sm'} color={'muted.700'}>
        เอกสารแนบ
      </Text>
      <Icon as={MaterialCommunityIcons} name={'chevron-right'} color={'muted.700'} size={5} ml={'auto'}/>
    </HStack>
  </Pressable>
}
