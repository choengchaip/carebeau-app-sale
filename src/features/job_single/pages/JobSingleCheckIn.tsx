import { Box, Center, HStack, Icon, ScrollView, Text, VStack } from 'native-base'
import { BackBar } from '../../../components/BackBar'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const JobSingleCheckIn = () => {
  return (
    <VStack flex={1} bg={'white'} safeArea>
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
      </ScrollView>
    </VStack>
  )
}
