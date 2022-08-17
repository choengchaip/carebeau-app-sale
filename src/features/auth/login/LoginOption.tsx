import {IProps} from "../../../cores/types.core";
import {Box, HStack, Icon, Image, Pressable, ScrollView, Text, VStack} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const LoginOption = (props: { onNext: (c: number) => void } & IProps) => {
  return (
    <Box flex={1} bg={'muted.100'} safeArea>
      <ScrollView flex={1} bg={'white'} pb={'8'}>
        <HStack
          justifyContent={'center'}
          bg={'muted.100'}
          pt={12}
          pb={8}>
          <Image
            source={require('../../../../assets/app.png')}
            alt={'Carebeau'}
            height={75}
            style={{
              resizeMode: 'contain',
            }}/>
        </HStack>
        <VStack bg={'white'} px={8} py={6} space={6}>
          <Text fontSize={'md'} fontFamily={'medium'} color={'black'} textAlign={'center'}>
            ยินดีต้อนรับ
          </Text>
          <Pressable
            rounded={'md'}
            px={8}
            py={4}
            bg={'primary.50'}
            onPress={() => props.onNext(1)}>
            <HStack space={'lg'} justifyContent={'space-between'}>
              <Box>
                <Text
                  fontSize={'lg'}
                  fontFamily={'semi_bold'}
                  color={'primary.600'}>
                  ร้านค้า/ตัวแทนเข้าสู่ระบบ
                </Text>
                <Text
                  fontSize={'xs'}
                  fontFamily={'medium'}
                  color={'muted.500'}>
                  หากคุณมีบัญชีร้านค้าอยู่แล้วเข้าสู่ระบบที่นี่
                </Text>
              </Box>
              <Box
                rounded={'100'}
                bg={'primary.600'}
                width={45}
                height={45}
                justifyContent={'center'}
                alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={'login'} color={'white'} size={5}/>
              </Box>
            </HStack>
          </Pressable>
          <Pressable
            rounded={'md'}
            px={8}
            py={4}
            bg={'danger.50'}
            onPress={() => props.onNext(2)}>
            <HStack space={'lg'} justifyContent={'space-between'}>
              <Box>
                <Text
                  fontSize={'lg'}
                  fontFamily={'semi_bold'}
                  color={'danger.600'}>
                  สมัครเป็นตัวแทนแคร์บิว
                </Text>
                <Text
                  fontSize={'xs'}
                  fontFamily={'medium'}
                  color={'muted.500'}>
                  คุณยังไม่มีบัญชีใช่ไหม? สมาชิกได้ที่นี่
                </Text>
              </Box>
              <Box rounded={'100'} bg={'danger.600'} width={45} height={45} justifyContent={'center'}
                   alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={'card-account-details-outline'} color={'white'} size={5}/>
              </Box>
            </HStack>
          </Pressable>
          <Pressable rounded={'md'} px={8} py={4} bg={'warning.50'}>
            <HStack space={'lg'} justifyContent={'space-between'}>
              <Box>
                <Text
                  fontSize={'lg'}
                  fontFamily={'semi_bold'}
                  color={'warning.600'}>
                  ร้านค้า/ตัวแทนเข้าสู่ระบบ
                </Text>
                <Text
                  fontSize={'xs'}
                  fontFamily={'medium'}
                  color={'muted.500'}>
                  หากคุณมีบัญชีร้านค้าอยู่แล้วเข้าสู่ระบบที่นี่
                </Text>
              </Box>
              <Box rounded={'100'} bg={'warning.600'} width={45} height={45} justifyContent={'center'}
                   alignItems={'center'}>
                <Icon as={MaterialCommunityIcons} name={'book-account-outline'} color={'white'} size={5}/>
              </Box>
            </HStack>
          </Pressable>
          <Image
            rounded={'md'}
            source={require('../../../../assets/features/auths/img.png')}
            alt={'nothing'}
            width={'100%'}
            height={120}/>
          <HStack space={'xs'} justifyContent={'center'} alignItems={'center'} mt={6}>
            <Icon as={MaterialCommunityIcons} name={'help-circle-outline'} color={'primary.600'} size={4}/>
            <Text fontSize={'md'} fontFamily={'medium'} color={'black'}>
              ศูนย์ช่วยเหลือ
            </Text>
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  )
}