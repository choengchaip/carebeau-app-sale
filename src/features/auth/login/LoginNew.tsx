import {IProps} from "../../../cores/types.core";
import {Box, Image, ScrollView, Text, VStack} from "native-base";
import {IStatus} from "../../../hooks/types.hook";
import {FormTextInput} from "../../../components/forms/FormTextInput";
import {MyButton} from "../../../components/uis/MyButton";
import {useForm} from "../../../hooks/form.hook";
import {get} from "lodash";

export const LoginNew = (props: { status: IStatus, onLogin: (form: any) => void } & IProps) => {
  const form = useForm()

  const validate = (): boolean => {
    form.setError({})

    if (!get(form.form, 'email', false)) {
      form.setError({
        ...form.error,
        email: 'กรุณากรอกอีเมล',
      })
      return false
    }
    if (!get(form.form, 'password', false)) {
      form.setError({
        ...form.error,
        password: 'กรุณากรอกรหัสผ่าน',
      })
      return false
    }

    return true
  }

  const onLogin = async () => {
    if (validate()) {
      props.onLogin({
        "email": form.form.email,
        "password": form.form.password,
        "device_name": "mobile"
      })
    }
  }

  return (
    <Box flex={1} bg={'white'} safeArea>
      <ScrollView flex={1} bg={'white'} py={'8'}>
        <VStack space={'xs'}>
          <Image
            source={require('../../../../assets/features/auths/img_1.png')}
            alt={'nothing'}
            height={60}
            width={60}
            mx={'auto'}
            mb={2}/>
          <Text fontSize={'lg'} fontFamily={'medium'} color={'muted.600'} textAlign={'center'}>
            ลงทะเบียนลูกค้าเก่า
          </Text>
          <Text fontSize={'sm'} fontFamily={'light'} color={'muted.500'} textAlign={'center'} mb={6}>
            ติดต่อขอรหัสจาก Sales ที่ดูแลร้านค้าของคุณ
          </Text>
          <VStack mx={10} space={2}>
            <FormTextInput
              name={'email'}
              placeholder={'เบอร์มือถือ - อีเมล'}
              form={form}/>
            <FormTextInput
              name={'password'}
              type={'password'}
              placeholder={'รหัสผ่าน'}
              form={form}/>
            <MyButton
              isLoading={props.status.isLoading}
              onPress={onLogin}
              title={'ลงชื่อเข้าใช้'}/>
          </VStack>
          <Image
            source={require('../../../../assets/features/auths/img_2.png')}
            alt={'nothing'}
            height={145}
            width={310} mx={'auto'} my={8}/>
          <Text
            fontFamily={'light'}
            fontSize={'sm'}
            color={'black'}
            textAlign={'center'}>
            หากมีปัญหาการเข้าใช้งาน <Text fontFamily={'light'} color={'primary.600'}>ติดต่อฝ่ายลูกค้าสัมพันธ์</Text>
          </Text>
        </VStack>
      </ScrollView>
    </Box>
  )
}