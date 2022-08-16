import {Badge, Box, Button, HStack, Icon, Text, VStack} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ICardProps} from "./types";
import {ComponentUtil} from "../../../../utils/component.util";
import {AppPage} from "../../../../consts/page.const";
import {useRouter} from "../../../../hooks/router.hook";

export const CardOpenStore = (props: ICardProps) => {
  const router = useRouter()

  return (
    <VStack
      rounded={'md'}
      overflow={'hidden'}
      borderWidth={1}
      borderColor={'coolGray.200'}
      borderTopColor={'danger.500'}
      bg={'white'}
      shadow={2}
      mb={5}>
      <HStack bg={'danger.500'} py={1} px={2}>
        <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
        <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
          เปิดร้านค้าใหม่
        </Text>
        <Text fontFamily={'medium'} fontSize={'xs'} color={'white'} ml={'auto'} pt={0.5}>
          {props.expiredIn}
        </Text>
      </HStack>
      <VStack space={'sm'} py={4} px={3}>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
            ชื่อร้านค้า
          </Text>
          <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
            {props.storeName}
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
            จังหวัด/เขต
          </Text>
          <Badge bg={'danger.200'} rounded={'xs'} py={0} px={1}>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'danger.500'}>
              {props.storeProvince}
            </Text>
          </Badge>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
            ชื่อลูกค้า
          </Text>
          <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
            {props.customerName}
          </Text>
        </HStack>
        {ComponentUtil.renderCondition(() => !!props.customerMobile, (
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
              เบอร์ติดต่อ
            </Text>
            <HStack alignItems={'center'}>
              <Text fontFamily={'semi_bold'} fontSize={'xs'} color={'tertiary.400'}>
                {props.customerMobile}
              </Text>
              <Box p={1} bg={'tertiary.400'} ml={2} rounded={'full'}>
                <Icon as={MaterialCommunityIcons} name={'phone-outline'} color={'white'} size={4}/>
              </Box>
            </HStack>
          </HStack>
        ))}
        {ComponentUtil.renderCondition(() => !!props.appointmentDate, (
          <HStack justifyContent={'space-between'}>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
              วันที่นัดหมาย
            </Text>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
              {props.appointmentDate}
            </Text>
          </HStack>
        ))}
        {ComponentUtil.renderCondition(() => !!props.appointmentTime, (
          <HStack justifyContent={'space-between'}>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
              เวลาที่นัดหมาย
            </Text>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'black'}>
              {props.appointmentTime}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Button
        mx={3}
        mb={3}
        onPress={() => {
          if (props.type === 'new') {
            router.push(AppPage.JobSingle.key, {
              type: props.type,
              data: {
                job_no: props.jobNo,
                time: props.expiredIn,
                store_name: props.storeName,
                province: props.storeProvince,
                customer_name: props.customerName,
                customer_phone: props.customerMobile,
                appointment_date: props.appointmentDate,
                appointment_time: props.appointmentTime,
              },
            })
          } else {
            router.push(AppPage.JobSingle.key, {
              type: props.type,
              job_no: props.jobNo,
            })
          }
        }}
        colorScheme={'dark'}>
        <Text fontFamily={'medium'} fontSize={'sm'} color={'black'}>
          ดูรายละเอียด
        </Text>
      </Button>
    </VStack>
  )
}