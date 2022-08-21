import { HStack, Icon, Text } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const JobSingleOwnRating = () => {
  return (
    <HStack px={4} py={5} borderWidth={1} borderColor={'muted.300'} rounded={'md'}>
      <Icon as={MaterialCommunityIcons} name={'form-select'} color={'muted.700'} size={5} mr={2}/>
      <Text fontFamily={'medium'} fontSize={'sm'} color={'muted.700'}>
        ระบบประเมินเครดิต
      </Text>
      <Icon as={MaterialCommunityIcons} name={'chevron-right'} color={'muted.700'} size={5} ml={'auto'}/>
    </HStack>
  )
}
