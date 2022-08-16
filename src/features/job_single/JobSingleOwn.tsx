import {IProps} from "../../cores/types.core";
import {useMount} from "../../hooks/core.hook";
import {useRouter} from "../../hooks/router.hook";
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Text,
  useToast,
  VStack
} from "native-base";
import {BackBar} from "../../components/BackBar";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useMyJobDetail} from "../../loaders/my_job_detail.loader";
import {useWatchErrorWithToast, useWatchSuccess} from "../../hooks/watch.hook";
import {FadeIn} from "../../components/FadeIn";

export const JobSingleOwn = (props: IProps) => {
  const router = useRouter()
  const job = useMyJobDetail()
  const toast = useToast()

  useMount(async () => {
    await job.run({
      job_no: router.params.job_no,
    })
  })

  useWatchErrorWithToast(toast, job.status, () => {
    router.goBack()
  })

  if (job.status.isLoading || !job.status.isSuccess) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner color={'danger.500'}/>
      </Box>
    )
  }

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <BackBar title={'รายละเอียดงาน'}/>
      <ScrollView
        flex={1}
        _contentContainerStyle={{pb: 10}}>
        <FadeIn>
          <VStack space={4} mb={6}>
            {/* 1 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'white'}>
                เปิดร้านค้าใหม่
              </Text>
            </HStack>
            <VStack space={4} mb={2}>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'briefcase-variant'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  Job No
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  JOB010003
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จังหวัด/เขต
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  กรุงเทพฯ
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'store'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ชื่อร้านค้า
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  บิวตี้มาร์ท (ห่านพงกี่)
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'account'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ชื่อลูกค้า
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  ทวีศักดิ์ พึ่งพาใจ
                </Text>
              </HStack>
            </VStack>

            {/* 2 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'white'}>
                ที่อยู่ร้านค้า
              </Text>
            </HStack>
            <VStack space={4} mb={6}>
              <Box mx={5} px={4} py={3} borderWidth={1} borderColor={'muted.200'} rounded={'md'} bg={'muted.50'}>
                <Text fontFamily={'light'}>
                  ซอยพหลโยธิน 40 พหลโยธิน ซอย 40.
                </Text>
              </Box>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  แขวง / ตำบล
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  เสนานิคม
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  เขต / อำเภอ
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  จตุจักร
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จังหวัด
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  กรุงเทพ ฯ
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  รหัสไปรษณีย์
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  10900
                </Text>
              </HStack>
              <HStack px={5} alignItems={'center'}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  เบอร์ติดต่อ
                </Text>
                <HStack flex={1} display={'flex'} alignItems={'center'}>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'} mr={2}>
                    081-234-5678
                  </Text>
                  <Badge bg={'emerald.500'} rounded={'xs'} py={0} px={2}>
                    <HStack alignItems={'center'}>
                      <Icon as={MaterialCommunityIcons} name={'phone-outline'} color={'white'} size={4} mr={2}/>
                      <Text fontFamily={'semi_bold'} fontSize={'sm'} color={'white'}>
                        โทร
                      </Text>
                    </HStack>
                  </Badge>
                </HStack>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ตำแหน่งที่ตั้ง
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  10900
                </Text>
              </HStack>
              <HStack px={5} justifyContent={'space-between'}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  รหัสไปรษณีย์
                </Text>
                <HStack alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={'map-marker-radius'} color={'info.300'} size={4} mr={2}/>
                  <Text fontFamily={'semi_bold'} fontSize={'sm'} color={'info.300'} underline={true}>
                    ดูแผนที่
                  </Text>
                </HStack>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จุดสังเกตุ
                </Text>
              </HStack>
              <Box mx={5} px={4} pt={3} pb={12} borderWidth={1} borderColor={'muted.200'} rounded={'md'} bg={'muted.50'}>
                <Text fontFamily={'light'}>
                  ซอยพหลโยธิน 40 พหลโยธิน ซอย 40.
                </Text>
              </Box>
            </VStack>

            {/* 3 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'light'} fontSize={'sm'} color={'white'}>
                การนัดหมาย
              </Text>
            </HStack>
            <VStack space={4} mb={6}>
              <HStack px={5} alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={'briefcase-variant'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  กรุณาระบุวันที่นัดหมาย*
                </Text>
                <HStack borderWidth={1} borderColor={'danger.500'} w={150} maxW={150} py={2} px={2} rounded={'sm'}
                        ml={'auto'} alignItems={'center'}>
                  <Text fontFamily={'medium'} mr={6}>
                    27-05-2563
                  </Text>
                  <Badge bg={'danger.500'} p={1} ml={'auto'}>
                    <Icon as={MaterialCommunityIcons} name={'calendar'} color={'white'} size={5}/>
                  </Badge>
                </HStack>
              </HStack>
              <HStack px={5} alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  กรุณาระบุเวลานัดหมาย*
                </Text>
                <HStack borderWidth={1} borderColor={'danger.500'} w={150} maxW={150} py={2} px={2} rounded={'sm'}
                        ml={'auto'} alignItems={'center'}>
                  <Text fontFamily={'medium'} mr={6}>
                    10:00
                  </Text>
                  <Badge bg={'danger.500'} p={1} ml={'auto'}>
                    <Icon as={MaterialCommunityIcons} name={'clock'} color={'white'} size={5}/>
                  </Badge>
                </HStack>
              </HStack>
            </VStack>
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
        </FadeIn>
      </ScrollView>
    </VStack>
  )
}