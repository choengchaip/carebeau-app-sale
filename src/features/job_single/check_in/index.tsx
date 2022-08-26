import {AspectRatio, Box, Center, HStack, Icon, Modal, ScrollView, Spinner, Text, useToast, VStack} from 'native-base'
import {BackBar} from '../../../components/BackBar'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import MapView, {LatLng, Marker} from 'react-native-maps'
import {MyButton} from '../../../components/uis/MyButton'
import {LegacyRef, useRef, useState} from 'react'
import {FormTextAreaInput} from '../../../components/forms/FormTextAreaInput'
import {useForm} from '../../../hooks/form.hook'
import {FormTextInput} from '../../../components/forms/FormTextInput'
import {get} from 'lodash'
import {useMount} from "../../../hooks/core.hook";
import {useRouter} from "../../../hooks/router.hook";
import {useGoogleMap} from "../../../loaders/google_map.loader";
import {useWatchErrorWithToast, useWatchSuccess} from "../../../hooks/watch.hook";
import {ComponentUtil} from "../../../utils/component.util";
import {FadeIn} from "../../../components/FadeIn";
import {useMyJobCheckIn} from "../../../loaders/my_job_check_in.loader";
import {useDialog} from "../../../hooks/dialog.hook";
import {MyDialog} from "../../../components/hooks/MyDialog";
import {AppPage} from "../../../consts/page.const";

export interface IJobSingleCheckInParams {
  job_type: string
  job_no: string
  store_code: string
  address: string
  note: string
  lat_long: string
}

export const JobSingleCheckIn = () => {
  const router = useRouter<IJobSingleCheckInParams>()
  const [isShow, setIsShow] = useState(false)
  const form = useForm<{ address: string, latitude: number, longitude: number, lat_long: string, note: string }>()
  const map: LegacyRef<MapView> = useRef(null)
  const google = useGoogleMap()
  const toast = useToast()
  const checkIn = useMyJobCheckIn()
  const dialog = useDialog()

  useMount(async () => {
    const tokens = router.params.lat_long.split(',')
    const latitude = Number(get(tokens, '[0]'))
    const longitude = Number(get(tokens, '[1]'))

    form.setForm({
      address: router.params.address,
      note: router.params.note,
      lat_long: `${latitude},${longitude}`,
      latitude,
      longitude,
    })
  })

  const getLatLong = (): LatLng => {
    if (!form.form?.latitude || !form.form?.longitude) {
      return {
        latitude: 13.736717,
        longitude: 100.523186,
      }
    }

    return {
      latitude: form.form.latitude,
      longitude: form.form.longitude,
    }
  }

  const validate = (): boolean => {
    form.setError({})

    if (!get(form.form, 'note', false)) {
      form.setError({
        ...form.error,
        note: 'กรุณากรอกจุดสังเกตุ'
      })
      return false
    }

    if (!get(form.form, 'lat_long', false)) {
      form.setError({
        ...form.error,
        lat_long: 'กรุณากรอกพิกัด'
      })
      return false
    }

    return true
  }

  const onSubmit = () => {
    if (validate()) {
      checkIn.run({
        job_no: router.params.job_no,
        loc_address: form.form!.address,
        loc_lat_long: form.form!.lat_long,
        loc_nearby: form.form!.note,
        store_code: router.params.store_code,
      })
    }
  }

  useWatchSuccess(checkIn.status, () => {
    dialog.success({
      title: 'สำเร็จ',
      description: 'บันทึกตำแหน่งร้านค้าสำเร็จ',
      onFinish: () => {
        setIsShow(false)
        router.push(AppPage.Job.key)
        router.push(AppPage.JobSingle.key, {
          type: router.params.job_type,
          job_no: router.params.job_no,
        })
      },
    })
  })

  useWatchErrorWithToast(toast, checkIn.status)

  useWatchSuccess(google.status, () => {
    const address = get(google.data, 'results[0].formatted_address', '')
    form.setForm({
      ...form.form!,
      address,
    })
  })

  useWatchErrorWithToast(toast, google.status)

  if (!form.form?.latitude || !form.form?.longitude) {
    return (
      <Box height={'100%'} width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
        <Spinner color={'danger.500'}/>
      </Box>
    )
  }

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <MyDialog dialog={dialog}/>
      <Modal isOpen={isShow} onClose={() => setIsShow(false)}>
        <Modal.Content>
          <Modal.Body>
            <HStack alignItems={'center'} pb={4}>
              <Icon as={MaterialCommunityIcons} name={'crosshairs-gps'} color={'danger.600'} size={5} mr={2}/>
              <Text fontFamily="medium" fontSize={'sm'}>
                ที่อยู่ปัจจุบัน
              </Text>
            </HStack>
            <VStack space={2}>
              <Box p={4} mb={2} bg={'muted.200'}>
                <Text fontFamily="medium" fontSize={'sm'}>
                  {form.form!.address}
                </Text>
              </Box>
              <Text fontFamily="semi_bold" fontSize={'sm'}>
                สถานที่ใกล้เคียง / จุดสังเกตุ
              </Text>
              <FormTextAreaInput
                name={'note'}
                placeholder={'สถานที่ใกล้เคียง / จุดสังเกตุ'}
                form={form}/>
              <Text fontFamily="semi_bold" fontSize={'sm'}>
                พิกัด
              </Text>
              <FormTextInput
                name={'lat_long'}
                placeholder={'พิกัด'}
                form={form}/>
            </VStack>
            <HStack space={6} mt={4}>
              <MyButton
                flex={3}
                onPress={() => {
                  setIsShow(false)
                }}
                colorScheme={'dark'}
                color={'black'}
                fontFamily={'medium'}
                title={'ยกเลิก'}/>
              <MyButton
                flex={5}
                onPress={onSubmit}
                isLoading={checkIn.status.isLoading}
                colorScheme={'danger'}
                fontFamily={'medium'}
                title={'ยืนยันการร้านค้า'}/>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <BackBar title={'Check In'}/>
      <Center pb={3} borderBottomWidth={1.5} borderBottomColor={'danger.500'}>
        <Text fontFamily={'medium'} fontSize={'sm'} color={'danger.500'}>
          กรุณาปักหมุดตำแหน่งร้านค้า
        </Text>
      </Center>
      <ScrollView flex={1}>
        <FadeIn>
          <Box p={5}>
            <HStack px={2} py={3} borderWidth={1} borderColor={'muted.500'} rounded={'md'} alignItems={'flex-start'}>
              {ComponentUtil.renderCondition(() => google.status.isLoading, (
                <Box width={'100%'} justifyContent={'center'} alignSelf={'center'} bg={'white'}>
                  <Spinner color={'danger.500'}/>
                </Box>
              ))}
              {ComponentUtil.renderCondition(() => !google.status.isError && !google.status.isLoading, (
                <>
                  <Icon as={MaterialCommunityIcons} name={'map-marker-radius'} color={'danger.600'} size={4} mt={1}
                        mr={2}/>
                  <Text fontFamily="medium" fontSize={'sm'} pr={4}>
                    {form.form?.address || 'กรุณาปักหมุดตำแหน่งร้านค้า'}
                  </Text>
                </>
              ))}
            </HStack>
          </Box>
          <AspectRatio
            width={'100%'}
            maxW={'500px'}
            ratio={1}>
            <MapView
              initialRegion={{
                latitude: form.form!.latitude,
                longitude: form.form!.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
              }}
              ref={map}
              onPress={(e) => {
                google.run({
                  latlng: `${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}`
                })
                form.setForm({
                  ...form.form!,
                  lat_long: `${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}`,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
                map.current?.animateToRegion({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.0025,
                  longitudeDelta: 0.0025,
                })
              }}>
              <Marker coordinate={getLatLong()}/>
            </MapView>
          </AspectRatio>
        </FadeIn>
      </ScrollView>
      <MyButton
        m={5}
        isDisabled={google.status.isLoading || !form.form.address}
        onPress={() => {
          setIsShow(true)
        }}
        colorScheme={'danger'}
        fontFamily={'medium'}
        title={'Check In'}/>
    </VStack>
  )
}
