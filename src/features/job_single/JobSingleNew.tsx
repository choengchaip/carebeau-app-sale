import {IProps} from "../../cores/types.core";
import {useRouter} from "../../hooks/router.hook";
import {AspectRatio, Button, HStack, Icon, Image, ScrollView, Text, useToast, VStack} from "native-base";
import {BackBar} from "../../components/BackBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {IJobItem} from "../../models/job.model";
import {useNewJobConfirm} from "../../loaders/new_job_confirm.loader";
import {useWatchErrorWithToast, useWatchSuccess} from "../../hooks/watch.hook";
import {useDialog} from "../../hooks/dialog.hook";
import {MyDialog} from "../../components/hooks/MyDialog";
import {AppPage} from "../../consts/page.const";
import {MyButton} from "../../components/uis/MyButton";

export interface IJobSingleNewProps extends IProps {
  data: IJobItem
}

export const JobSingleNew = (props: IJobSingleNewProps) => {
  const router = useRouter()
  const confirm = useNewJobConfirm()
  const toast = useToast()
  const dialog = useDialog()

  useWatchSuccess(confirm.status, () => {
    dialog.success({
      title: 'สำเร็จ',
      description: 'ทำรายการประเมินเครดิตเรียบร้อยแล้ว',
      duration: 3000,
      onFinish: () => {
        router.push(AppPage.Job.key)
        router.push(AppPage.JobSingle.key, {
          type: router.params.job_type,
          job_no: router.params.job_no,
        })
      }
    })
  })
  useWatchErrorWithToast(toast, confirm.status)

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <MyDialog dialog={dialog}/>

      <BackBar title={'รายละเอียดงาน'}/>
      <ScrollView
        flex={1}
        _contentContainerStyle={{pb: 10}}>
        <VStack space={4} mb={6}>
          <HStack bg={'danger.500'} py={3} px={5}>
            <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
            <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
              เปิดร้านค้าใหม่
            </Text>
          </HStack>
          <VStack space={4}>
            <HStack px={5}>
              <Icon as={MaterialCommunityIcons} name={'briefcase-variant'} color={'muted.300'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                Job No
              </Text>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                {props.data.job_no}
              </Text>
            </HStack>
            <HStack px={5}>
              <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                จังหวัด/เขต
              </Text>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                {props.data.province}
              </Text>
            </HStack>
            <HStack px={5}>
              <Icon as={MaterialCommunityIcons} name={'store'} color={'muted.300'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                ชื่อร้านค้า
              </Text>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                {props.data.store_name}
              </Text>
            </HStack>
            <HStack px={5}>
              <Icon as={MaterialCommunityIcons} name={'account'} color={'muted.300'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                ชื่อลูกค้า
              </Text>
              <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                {props.data.customer_name}
              </Text>
            </HStack>
          </VStack>
        </VStack>
        <AspectRatio
          mx={5}
          ratio={16 / 7}>
          <Image
            rounded={'md'}
            source={{
              uri: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmV0YWlsJTIwc3RvcmV8ZW58MHx8MHx8&w=1000&q=80',
            }}
            alt={'nothing'}/>
        </AspectRatio>
        <VStack
          mx={5}
          mt={6}
          mb={16}
          px={4}
          py={6}
          space={2}
          bg={'amber.50'}
          rounded={'md'}>
          <Text fontFamily={'semi_bold'} fontSize={'md'} color={'amber.500'} mb={1}>
            เงื่อนไข
          </Text>
          <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
            1. เมื่อกดรับงานแล้วคุณต้องนัดหมายร้านได้ทันที
          </Text>
          <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
            2. คุณจะต้องเข้าไปเก็บเอกสารฉบับจริงร้านค้าและประเมินผลการให้เครดิตร้านค้า
          </Text>
          <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
            3. เมื่อคุณทำภารกิจเสร็จสมบูรณ์แล้ว
            ทุกๆการเปิดร้านค้าใหม่เป็นคะแนนสะสมการปฏิบัติงานมีรางวัลพิเศษความขยันของคุณ
          </Text>
        </VStack>
        <HStack space={6} px={5}>
          <MyButton
            flex={3}
            onPress={() => {
              router.goBack()
            }}
            colorScheme={'dark'}
            color={'black'}
            fontFamily={'medium'}
            title={'ยกเลิก'}/>
          <MyButton
            flex={5}
            isLoading={confirm.status.isLoading}
            onPress={async () => {
              await confirm.run({
                store_code: props.data.store_code,
                job_no: props.data.job_no,
              })
            }}
            colorScheme={'danger'}
            fontFamily={'medium'}
            title={'ยืนยันการรับงาน'}/>
        </HStack>
      </ScrollView>
    </VStack>
  )
}