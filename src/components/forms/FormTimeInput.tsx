import {Badge, Box, FormControl, HStack, Icon, Pressable, Text, VStack, WarningOutlineIcon} from "native-base";
import {ComponentUtil} from "../../utils/component.util";
import {IFormInputProps} from "./types";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {get} from "lodash";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {useEffect, useState} from "react";
import {Modal} from "react-native";
import moment from "moment";

export const FormTimeInput = (props: IFormInputProps) => {
  const [isShow, setIsShow] = useState(false)
  const [isConfirm, setIsConfirm] = useState(true)
  let innerTimeOut = setTimeout(() => {
  })

  useEffect(() => {
    if (isShow) {
      if (!get(props.form.form, props.name, false)) {
        props.form.setForm({...props.form.form, [props.name]: moment().format('HH:mm')})
        props.form.setError({...props.form.error, [props.name]: undefined })
      }
    }
  }, [isShow])

  const getValue = () => {
    return moment(`2022-08-18 ${get(props.form.form, props.name, '00:00')}`).toDate()
  }

  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isShow}>
        <Box
          mt={'auto'}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'white'}
          shadow={2}>
          <Pressable
            onPress={() => {
              if (isConfirm) {
                setIsShow(false)
              }
            }}
            mt={4}
            ml={'auto'}
            mr={4}>
            <Text
              fontFamily={'medium'}
              fontSize={'sm'}
              color={isConfirm ? 'danger.500' : 'muted.200'}>
              Done
            </Text>
          </Pressable>
          <RNDateTimePicker
            display={'spinner'}
            textColor={'black'}
            mode={'time'}
            is24Hour={true}
            value={getValue()}
            onChange={(_: any, date: any) => {
              setIsConfirm(false)
              props.form.setForm({...props.form.form, [props.name]: moment(date).format('HH:mm')})
              props.form.setError({...props.form.error, [props.name]: undefined })

              clearTimeout(innerTimeOut)
              innerTimeOut = setTimeout(() => {
                setIsConfirm(true)
              }, 500)
            }}
            style={{
              width: '100%',
            }}/>
        </Box>
      </Modal>

      <FormControl
        mb={props.mb || 2}
        isRequired
        isInvalid={props.name in props.form.error}
        {...props}>
        <VStack>
          <Pressable onPress={() => {
            setIsShow(true)
          }}>
            <HStack
              borderWidth={1}
              borderColor={'muted.300'}
              py={2}
              px={3}
              rounded={'sm'}
              alignItems={'center'}
              {...props.inputStyle || {}}>
              <Text
                fontFamily={props.fontFamily || 'medium'}
                color={get(props.form.form, props.name, false) ? 'black' : 'muted.400'}
                mr={6}>
                {get(props.form.form, props.name) || props.placeholder || 'ชช:นน'}
              </Text>
              <Badge bg={'danger.500'} p={1} ml={'auto'}>
                <Icon as={MaterialCommunityIcons} name={'calendar'} color={'white'} size={5}/>
              </Badge>
            </HStack>
          </Pressable>
          {ComponentUtil.renderCondition(() => get(props.form.error, props.name, false), (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
              <Text fontFamily={'medium'} fontSize={'xs'} color={'danger'}>
                {get(props.form.error, props.name)}
              </Text>
            </FormControl.ErrorMessage>
          ))}
        </VStack>
      </FormControl>
    </>
  )
}