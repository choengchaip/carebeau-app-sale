import {IProps} from "../../../cores/types.core";
import {Box, Button, FormControl, Image, Input, ScrollView, Text, VStack, WarningOutlineIcon} from "native-base";
import {useEffect, useState} from "react";
import {useLogin} from "../../../loaders/auths/login.loader";
import {ComponentUtil} from "../../../utils/component.util";
import {useCSRF} from "../../../loaders/auths/csrf.loader";
import {useMount} from "../../../hooks/core.hook";

export const LoginNew = (props: IProps) => {
  const [form, setForm] = useState<any>({})
  const [error, setError] = useState<any>({})
  const csrf = useCSRF()
  const login = useLogin()

  useMount(async () => {
    await csrf.run({})
  })

  useEffect(() => {
    console.log(login.status())
  }, [login.status()])

  const validate = (): boolean => {
    setError({})

    if (form.email === undefined || !form.email) {
      setError({
        ...error,
        email: 'กรุณากรอกอีเมล',
      })
      return false
    }
    if (form.password === undefined || !form.password) {
      setError({
        ...error,
        password: 'กรุณากรอกรหัสผ่าน',
      })
      return false
    }

    return true
  }

  const onLogin = async () => {
    if (validate()) {
      await login.run({
        "email": "phisoot@carebeau-enjoy.com",
        "password": "s@le",
        "device_name": "Postman"
      })
    }
  }

  return (
    <Box flex={1} bg={'white'} safeArea>
      <ScrollView flex={1} bg={'white'} py={'8'}>
        <VStack space={'xs'}>
          <Image source={require('../../../../assets/features/auths/img_1.png')} alt={'nothing'} height={75} width={75}
                 mx={'auto'} mb={'4'}/>
          <Text fontSize={22} fontFamily={'medium'} color={'muted.600'} textAlign={'center'}>
            ลงทะเบียนลูกค้าเก่า
          </Text>
          <Text fontSize={16} fontFamily={'light'} color={'muted.500'} textAlign={'center'} mb={6}>
            ติดต่อขอรหัสจาก Sales ที่ดูแลร้านค้าของคุณ
          </Text>
          <VStack mx={10} space={2}>
            <FormControl mb={4} isRequired isInvalid={'email' in error}>
              <VStack>
                <Input
                  placeholder="เบอร์มือถือ - อีเมล"
                  borderColor={'muted.300'}
                  px={4}
                  fontFamily={'medium'}
                  fontSize={16}
                  placeholderTextColor={'muted.400'}
                  defaultValue={'phisoot@carebeau-enjoy.com'}
                  onChangeText={(value) => setForm({...form, email: value})}/>
                {ComponentUtil.renderCondition(() => error.email, (
                  <FormControl.ErrorMessage>
                    {error.email}
                  </FormControl.ErrorMessage>
                ))}
              </VStack>
            </FormControl>
            <FormControl mb={4} isRequired isInvalid={'password' in error}>
              <VStack>
                <Input
                  type={'password'}
                  placeholder="รหัสผ่าน"
                  borderColor={'muted.300'}
                  px={4}
                  fontFamily={'medium'}
                  fontSize={16}
                  placeholderTextColor={'muted.400'}
                  onChangeText={(value) => setForm({...form, password: value})}/>
                {ComponentUtil.renderCondition(() => 'password' in error, (
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                    {error.password}
                  </FormControl.ErrorMessage>
                ))}
              </VStack>
            </FormControl>
            <Button onPress={onLogin} height={12} width={'100%'} colorScheme="danger">
              <Text fontFamily={'bold'} fontSize={16}>
                ลงชื่อเข้าใช้
              </Text>
            </Button>
          </VStack>
          <Image source={require('../../../../assets/features/auths/img_2.png')} alt={'nothing'} height={154}
                 width={310} mx={'auto'} my={8}/>
          <Text fontFamily={'light'} color={'black'} textAlign={'center'}>
            หากมีปัญหาการเข้าใช้งาน <Text fontFamily={'light'} color={'primary.600'}>ติดต่อฝ่ายลูกค้าสัมพันธ์</Text>
          </Text>
        </VStack>
      </ScrollView>
    </Box>
  )
}