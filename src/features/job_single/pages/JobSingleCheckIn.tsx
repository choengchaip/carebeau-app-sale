import { AspectRatio, Box, Center, HStack, Icon, Modal, ScrollView, Text, VStack } from 'native-base'
import { BackBar } from '../../../components/BackBar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapView from 'react-native-maps'
import { MyButton } from '../../../components/uis/MyButton'
import { useState } from 'react'
import { FormTextAreaInput } from '../../../components/forms/FormTextAreaInput'
import { useForm } from '../../../hooks/form.hook'
import { FormTextInput } from '../../../components/forms/FormTextInput'
import { get } from 'lodash'

export const JobSingleCheckIn = () => {
  const [isShow, setIsShow] = useState(false)
  const form = useForm<{ lat_long: string, note: string }>()

  const validate = (): boolean => {
    form.setError({})

    if (!get(form.form, 'note', false)) {
      form.setError({
        ...form.error,
        date: 'กรุณากรอกจุดสังเกตุ'
      })
      return false
    }
    if (!get(form.form, 'lat_long', false)) {
      form.setError({
        ...form.error,
        time: 'กรุณากรอกพิกัด'
      })
      return false
    }

    return true
  }

  const onSubmit = () => {
    console.log('checking..')
    if (validate()) {
      console.log(form.form)
    }
  }

  return (
    <VStack flex={1} bg={'white'} safeArea>
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
                  ซอยพหลโยธิน 40 พหลโยธิน ซอย 40. แขวงเสนานิคม จตุจักร 10900
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
                สถานที่ใกล้เคียง / จุดสังเกตุ
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
                  form.setForm({
                    note: '',
                    lat_long: '',
                  })
                }}
                colorScheme={'dark'}
                color={'black'}
                fontFamily={'medium'}
                title={'ยกเลิก'}/>
              <MyButton
                flex={5}
                onPress={() => {
                  onSubmit()
                }}
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
        <Box p={5}>
          <HStack px={2} py={3} borderWidth={1} borderColor={'muted.500'} rounded={'md'}>
            <Icon as={MaterialCommunityIcons} name={'map-marker-radius'} color={'danger.600'} size={4} mr={2}/>
            <Text>
              ...
            </Text>
          </HStack>
        </Box>
        <AspectRatio
          width={'100%'}
          maxW={'500px'}
          ratio={1}>
          <MapView/>
        </AspectRatio>
      </ScrollView>
      <MyButton
        m={5}
        onPress={() => {
          setIsShow(true)
        }}
        colorScheme={'danger'}
        fontFamily={'medium'}
        title={'Check In'}/>
    </VStack>
  )
}
