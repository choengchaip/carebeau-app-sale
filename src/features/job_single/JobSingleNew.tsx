import {IProps} from "../../cores/types.core";
import {useRouter} from "../../hooks/router.hook";
import {AspectRatio, Button, HStack, Icon, Image, ScrollView, Text, useToast, VStack} from "native-base";
import {BackBar} from "../../components/BackBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {IJobItem} from "../../models/job.model";
import {useMount} from "../../hooks/core.hook";

export interface IJobSingleNewProps extends IProps {
  data: IJobItem
}

export const JobSingleNew = (props: IJobSingleNewProps) => {
  const router = useRouter()
  const toast = useToast()

  useMount(() => {
    console.log(router.params)
  })

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <BackBar title={'รายละเอียดงาน'}/>
      <ScrollView
        flex={1}
        _contentContainerStyle={{pb: 10}}>
        <VStack space={4} mb={6}>
          <HStack bg={'danger.500'} py={3} px={5}>
            <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
            <Text fontFamily={'light'} fontSize={'sm'} color={'white'}>
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
            }}/>
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
          <Button
            flex={3}
            onPress={() => {
            }}
            height={12}
            colorScheme="dark">
            <Text fontFamily={'medium'} fontSize={'sm'} color={'black'}>
              ยกเลิก
            </Text>
          </Button>
          <Button
            flex={5}
            onPress={() => {
            }}
            height={12}
            colorScheme="danger">
            <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
              ยืนยันการรับงาน
            </Text>
          </Button>
        </HStack>
      </ScrollView>
    </VStack>
  )
}