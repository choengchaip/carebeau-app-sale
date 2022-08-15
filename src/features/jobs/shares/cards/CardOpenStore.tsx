import {Badge, Box, Button, HStack, Icon, Text, VStack} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ICardProps} from "./types";
import {ComponentUtil} from "../../../../utils/component.util";

export const CardOpenStore = (props: ICardProps) => {
  return (
    <VStack
      rounded={'md'}
      overflow={'hidden'}
      borderWidth={1}
      borderColor={'coolGray.200'}
      borderTopColor={'danger.500'}
      bg={'white'}
      shadow={2}
      mb={4}>
      <HStack bg={'danger.500'} py={1} px={2}>
        <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={6} mr={2}/>
        <Text fontFamily={'medium'} fontSize={'lg'} color={'white'}>
          เปิดร้านค้าใหม่
        </Text>
        <Text fontFamily={'medium'} fontSize={'sm'} color={'white'} ml={'auto'} pt={0.5}>
          {props.expiredIn}
        </Text>
      </HStack>
      <VStack space={'sm'} py={4} px={3}>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
            ชื่อร้านค้า
          </Text>
          <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
            {props.storeName}
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
            จังหวัด/เขต
          </Text>
          <Badge bg={'danger.200'} rounded={'md'}>
            <Text fontFamily={'medium'} color={'danger.500'}>
              {props.storeProvince}
            </Text>
          </Badge>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
            ชื่อลูกค้า
          </Text>
          <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
            {props.customerName}
          </Text>
        </HStack>
        {ComponentUtil.renderCondition(() => !!props.customerMobile, (
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
              เบอร์ติดต่อ
            </Text>
            <HStack alignItems={'center'}>
              <Text fontFamily={'semi_bold'} fontSize={'lg'} color={'tertiary.400'}>
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
            <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
              วันที่นัดหมาย
            </Text>
            <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
              {props.appointmentDate}
            </Text>
          </HStack>
        ))}
        {ComponentUtil.renderCondition(() => !!props.appointmentTime, (
          <HStack justifyContent={'space-between'}>
            <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
              เวลาที่นัดหมาย
            </Text>
            <Text fontFamily={'medium'} fontSize={'md'} color={'black'}>
              {props.appointmentTime}
            </Text>
          </HStack>
        ))}
      </VStack>
      <Button
        mx={3}
        mb={3}
        onPress={() => {
        }}
        bg={'muted.200'}>
        <Text fontFamily={'medium'} fontSize={16} color={'black'}>
          ดูรายละเอียด
        </Text>
      </Button>
    </VStack>
  )
}