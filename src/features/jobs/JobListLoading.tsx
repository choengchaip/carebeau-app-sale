import {IProps} from "../../cores/types.core";
import {Box, HStack, ScrollView, Skeleton, VStack} from "native-base";

export const JobListLoading = (props: IProps) => {
  return (
    <ScrollView flex={1} p={5}>
      <ScrollView horizontal={true}>
        <HStack space={'xs'}>
          <Skeleton h={6} w={20} rounded={'xs'} mb={5} startColor={'danger.200'}/>
          <Skeleton h={6} w={32} rounded={'xs'} mb={5} startColor={'danger.200'}/>
          <Skeleton h={6} w={20} rounded={'xs'} mb={5} startColor={'danger.200'}/>
          <Skeleton h={6} w={20} rounded={'xs'} mb={5} startColor={'danger.200'}/>
        </HStack>
      </ScrollView>
      <VStack h={48} borderWidth={1} borderColor={'muted.100'} rounded={'sm'} mb={5}>
        <Skeleton h={7} w={'100%'} rounded={'xs'} startColor={'danger.200'}/>
        <VStack space={'sm'} py={4} px={3}>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={9} w={'100%'} rounded={'xs'} mb={1}/>
        </VStack>
      </VStack>
      <VStack h={48} borderWidth={1} borderColor={'muted.100'} rounded={'sm'} mb={5}>
        <Skeleton h={7} w={'100%'} rounded={'xs'} startColor={'danger.200'}/>
        <VStack space={'sm'} py={4} px={3}>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={9} w={'100%'} rounded={'xs'} mb={1}/>
        </VStack>
      </VStack>
      <VStack h={48} borderWidth={1} borderColor={'muted.100'} rounded={'sm'} mb={5}>
        <Skeleton h={7} w={'100%'} rounded={'xs'} startColor={'danger.200'}/>
        <VStack space={'sm'} py={4} px={3}>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={4} w={'100%'} rounded={'xs'} mb={1}/>
          <Skeleton h={9} w={'100%'} rounded={'xs'} mb={1}/>
        </VStack>
      </VStack>
    </ScrollView>
  )
}