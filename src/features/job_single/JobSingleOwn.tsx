import { IProps } from '../../cores/types.core'
import { useMount } from '../../hooks/core.hook'
import { useRouter } from '../../hooks/router.hook'
import { Badge, Box, HStack, Icon, Pressable, ScrollView, Spinner, Text, useToast, VStack } from 'native-base'
import { BackBar } from '../../components/BackBar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMyJobFind } from '../../loaders/my_job_find.loader'
import { useWatchErrorWithToast, useWatchSuccess } from '../../hooks/watch.hook'
import { FadeIn } from '../../components/FadeIn'
import { FormTimeInput } from '../../components/forms/FormTimeInput'
import { useForm } from '../../hooks/form.hook'
import { FormDateInput } from '../../components/forms/FormDateInput'
import { get } from 'lodash'
import { MyButton } from '../../components/uis/MyButton'
import { useMyJobAppointment } from '../../loaders/my_job_appointment.loader'
import { MyDialog } from '../../components/hooks/MyDialog'
import { useDialog } from '../../hooks/dialog.hook'
import { AppPage } from '../../consts/page.const'
import moment from 'moment'
import { ComponentUtil } from '../../utils/component.util'
import { Linking } from 'react-native'
import { JobSingleOwnCheckIn } from './JobSingleOwnCheckIn'
import { JobSingleOwnStoreImage } from './JobSingleOwnStoreImage'
import { JobSingleOwnDocument } from './JobSingleOwnDocument'
import { JobSingleOwnRating } from './JobSingleOwnRating'

export const JobSingleOwn = (props: IProps) => {
  const form = useForm<{ date: string, time: string }>()
  const router = useRouter()
  const toast = useToast()
  const dialog = useDialog()

  const job = useMyJobFind()
  const appointment = useMyJobAppointment()

  useMount(async () => {
    await job.run({
      job_no: router.params.job_no
    })
  })

  const validate = (): boolean => {
    form.setError({})

    if (!get(form.form, 'date', false)) {
      form.setError({
        ...form.error,
        date: 'กรุณาเลือกวันนัดหมาย'
      })
      return false
    }
    if (!get(form.form, 'time', false)) {
      form.setError({
        ...form.error,
        time: 'กรุณาเลือกวันเวลา'
      })
      return false
    }

    return true
  }

  const onAppointment = async () => {
    if (validate()) {
      await appointment.run({
        job_no: job.data?.data.job_detail_data.job_no!,
        appointment_date: moment(form.form!.date).add('year', 543).format('DD-MM-YYYY'),
        appointment_time: form.form!.time
      })
    }
  }

  useWatchErrorWithToast(toast, job.status, () => {
    router.goBack()
  })

  useWatchSuccess(appointment.status, () => {
    dialog.success({
      title: 'สำเร็จ',
      description: 'ทำการยืนยันการนัดหมายลูกค้าเรียบร้อยแล้ว',
      onFinish: () => {
        router.push(AppPage.Job.key)
      }
    })
  })
  useWatchErrorWithToast(toast, appointment.status)

  if (job.status.isLoading || !job.status.isSuccess) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner color={'danger.500'}/>
      </Box>
    )
  }

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <MyDialog dialog={dialog}/>
      <BackBar title={'รายละเอียดงาน'}/>
      <ScrollView
        flex={1}
        _contentContainerStyle={{ pb: 10 }}>
        <FadeIn>
          <VStack space={4} mb={6}>
            {/* 1 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
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
                  {job.data?.data.job_detail_data.job_no}
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จังหวัด/เขต
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.province}
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'store'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ชื่อร้านค้า
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.store_name}
                </Text>
              </HStack>
              <HStack px={5}>
                <Icon as={MaterialCommunityIcons} name={'account'} color={'muted.300'} size={5} mr={2}/>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ชื่อลูกค้า
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.customer_name}
                </Text>
              </HStack>
            </VStack>

            {/* 2 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
                ที่อยู่ร้านค้า
              </Text>
            </HStack>
            <VStack space={4} mb={6}>
              <Box mx={5} px={4} py={3} borderWidth={1} borderColor={'muted.200'} rounded={'md'} bg={'muted.50'}>
                <Text fontFamily={'light'}>
                  {job.data?.data.job_detail_data.store_address}
                </Text>
              </Box>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  แขวง / ตำบล
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.store_district}
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  เขต / อำเภอ
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.store_sub_district}
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จังหวัด
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.province}
                </Text>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  รหัสไปรษณีย์
                </Text>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'}>
                  {job.data?.data.job_detail_data.store_zip_code}
                </Text>
              </HStack>
              <HStack px={5} alignItems={'center'}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  เบอร์ติดต่อ
                </Text>
                <HStack flex={1} display={'flex'} alignItems={'center'}>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'} ml={'auto'} mr={2}>
                    {job.data?.data.job_detail_data.customer_phone}
                  </Text>
                  <Badge bg={'emerald.500'} rounded={'xs'} py={0} px={1}>
                    <HStack alignItems={'center'}>
                      <Icon as={MaterialCommunityIcons} name={'phone-outline'} color={'white'} size={4} mr={1}/>
                      <Text fontFamily={'semi_bold'} fontSize={'sm'} color={'white'}>
                        โทร
                      </Text>
                    </HStack>
                  </Badge>
                </HStack>
              </HStack>
              <HStack px={5} justifyContent={'space-between'}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  ตำแหน่งที่ตั้ง
                </Text>
                <HStack alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={'map-marker-radius'} color={'info.400'} size={4} mr={1}/>
                  <Pressable onPress={async () => {
                    await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${job.data?.data.job_detail_data.store_loc_lat_long}`)
                  }}>
                    <Text fontFamily={'semi_bold'} fontSize={'sm'} color={'info.400'} underline={true}>
                      ดูแผนที่
                    </Text>
                  </Pressable>
                </HStack>
              </HStack>
              <HStack px={5}>
                <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                  จุดสังเกตุ
                </Text>
              </HStack>
              <Box mx={5} px={4} pt={3} pb={12} borderWidth={1} borderColor={'muted.200'} rounded={'md'}
                   bg={'muted.50'}>
                <Text fontFamily={'light'}>
                  {job.data?.data.job_detail_data.store_loc_nearby}
                </Text>
              </Box>
            </VStack>

            {/* 3 */}
            <HStack bg={'danger.500'} py={3} px={5}>
              <Icon as={MaterialCommunityIcons} name={'store'} color={'white'} size={5} mr={2}/>
              <Text fontFamily={'medium'} fontSize={'sm'} color={'white'}>
                การนัดหมาย
              </Text>
            </HStack>
            {ComponentUtil.renderCondition(() => !job.data?.data.job_detail_data.appointment_status, (
              <VStack space={4} mb={6}>
                <HStack px={5} alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={'briefcase-variant'} color={'muted.300'} size={5} mr={2}/>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                    กรุณาระบุวันที่นัดหมาย*
                  </Text>
                  <FormDateInput
                    w={150}
                    maxW={150}
                    ml={'auto'}
                    name={'date'}
                    form={form}
                    inputStyle={{
                      borderWidth: 1,
                      borderColor: 'danger.500'
                    }}/>
                </HStack>
                <HStack
                  px={5}
                  mb={6}
                  alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                    กรุณาระบุเวลานัดหมาย*
                  </Text>
                  <FormTimeInput
                    w={150}
                    maxW={150}
                    ml={'auto'}
                    name={'time'}
                    form={form}
                    inputStyle={{
                      borderWidth: 1,
                      borderColor: 'danger.500'
                    }}/>
                </HStack>
              </VStack>
            ))}
            {ComponentUtil.renderCondition(() => !!job.data?.data.job_detail_data.appointment_status, (
              <VStack space={4} px={5} mb={6}>
                <HStack alignItems={'center'}>
                  <Icon as={MaterialCommunityIcons} name={'briefcase-variant'} color={'muted.300'} size={5} mr={2}/>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                    กรุณาระบุวันที่นัดหมาย*
                  </Text>
                  <Box
                    bg={'muted.100'}
                    w={150}
                    p={3}
                    ml={'auto'}
                    rounded={'md'}>
                    <Text fontFamily={'medium'} fontSize={'sm'} color={'black'}>
                      {job.data?.data.job_detail_data.appointment_date}
                    </Text>
                  </Box>
                </HStack>
                <HStack
                  alignItems={'center'}
                  mb={4}>
                  <Icon as={MaterialCommunityIcons} name={'map-legend'} color={'muted.300'} size={5} mr={2}/>
                  <Text fontFamily={'light'} fontSize={'sm'} color={'black'}>
                    กรุณาระบุเวลานัดหมาย*
                  </Text>
                  <Box
                    bg={'muted.100'}
                    w={150}
                    p={3}
                    ml={'auto'}
                    rounded={'md'}>
                    <Text fontFamily={'medium'} fontSize={'sm'} color={'black'}>
                      {job.data?.data.job_detail_data.appointment_time}
                    </Text>
                  </Box>
                </HStack>
                <JobSingleOwnCheckIn
                  jobType={'own'}
                  jobNo={job.data!.data.job_detail_data.job_no}
                  storeCode={job.data!.data.job_detail_data.store_code}
                  address={job.data!.data.job_detail_data.store_address}
                  latLong={job.data!.data.job_detail_data.store_loc_lat_long}
                  nearby={job.data!.data.job_detail_data.store_loc_nearby}
                />
                <JobSingleOwnStoreImage/>
                <JobSingleOwnDocument/>
                <JobSingleOwnRating/>
              </VStack>
            ))}

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
              {ComponentUtil.renderCondition(() => !job.data?.data.job_detail_data.appointment_status, (
                <MyButton
                  flex={5}
                  isLoading={appointment.status.isLoading}
                  onPress={onAppointment}
                  colorScheme={'danger'}
                  fontFamily={'medium'}
                  title={'ยืนยันนัดหมาย'}/>
              ))}
              {ComponentUtil.renderCondition(() => !!job.data?.data.job_detail_data.appointment_status, (
                <MyButton
                  flex={5}
                  onPress={() => {
                    router.goBack()
                  }}
                  colorScheme={'danger'}
                  fontFamily={'medium'}
                  title={'เสร็จสิ้น'}/>
              ))}
            </HStack>
          </VStack>
        </FadeIn>
      </ScrollView>
    </VStack>
  )
}
