import {IProps} from "../../cores/types.core";
import {Badge, Box, HStack, Pressable, Text, useToast, VStack} from "native-base";
import {useState} from "react";
import {JobList} from "./JobList";
import {useMount} from "../../hooks/core.hook";
import {useNewJob} from "../../loaders/new_job.loader";
import {useMe} from "../../loaders/auths/me.loader";
import {ComponentUtil} from "../../utils/component.util";
import {JobListLoading} from "./JobListLoading";
import {useMyJob} from "../../loaders/my_job.loader";
import {AppBar} from "../../components/AppBar";
import {useWatchError, useWatchSuccess} from "../../hooks/watch.hook";

export const Job = (props: IProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const newJob = useNewJob()
  const myJob = useMyJob()
  const me = useMe()
  const toast = useToast()

  useMount(async () => {
    await me.getFromCache()
  })

  useWatchSuccess(me.statusCache, () => {
    Promise.all([
      newJob.run({}),
      myJob.run({}),
    ])
  })

  useWatchError(newJob.status, () => {
    toast.show({
      title: 'ล้มเหลว',
      description: JSON.stringify(newJob.status.errorMessage) || 'กรุณาลองใหม่อีกครั้งภายหลัง',
    })
  })

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <AppBar/>
      <VStack width={'100%'} borderBottomWidth={1} borderBottomColor={'muted.200'}>
        <HStack py={4}>
          <Pressable flex={1} onPress={() => setTabIndex(0)}>
            <HStack justifyContent={'center'} alignItems={'center'}>
              <Text fontFamily={'medium'} fontSize={'sm'} color={tabIndex === 0 ? 'danger.500' : 'muted.500'}>
                งานใหม่
              </Text>
              <Badge bg={tabIndex === 0 ? 'danger.500' : 'muted.200'} rounded={'sm'} ml={2} py={0} px={1.5}>
                {ComponentUtil.renderCondition(() => newJob.status.isLoading, (
                  <Text fontFamily={'medium'} fontSize={'xs'} color={tabIndex === 0 ? 'white' : 'muted.600'}>
                    0
                  </Text>
                ))}
                {ComponentUtil.renderCondition(() => newJob.status.isSuccess && !newJob.status.isLoading, (
                  <Text fontFamily={'medium'} fontSize={'xs'} color={tabIndex === 0 ? 'white' : 'muted.600'}>
                    {newJob.data?.data.new_job_list.length}
                  </Text>
                ))}
              </Badge>
            </HStack>
          </Pressable>
          <Pressable flex={1} onPress={() => setTabIndex(1)}>
            <HStack justifyContent={'center'} alignItems={'center'}>
              <Text fontFamily={'medium'} fontSize={'sm'} color={tabIndex === 1 ? 'danger.500' : 'muted.500'}
                    textAlign={'center'}>
                งานของฉัน
              </Text>
              <Badge bg={tabIndex === 1 ? 'danger.500' : 'muted.200'} rounded={'sm'} ml={2} py={0} px={1.5}>
                {ComponentUtil.renderCondition(() => myJob.status.isLoading, (
                  <Text fontFamily={'medium'} fontSize={'xs'} color={tabIndex === 0 ? 'white' : 'muted.600'}>
                    0
                  </Text>
                ))}
                {ComponentUtil.renderCondition(() => myJob.status.isSuccess && !myJob.status.isLoading, (
                  <Text fontFamily={'medium'} fontSize={'xs'} color={tabIndex === 1 ? 'white' : 'muted.600'}>
                    {myJob.data?.data.my_job_list.length}
                  </Text>
                ))}
              </Badge>
            </HStack>
          </Pressable>
        </HStack>
        <Box width={'50%'} h={0.5} bg={'danger.500'} marginLeft={tabIndex === 0 ? '0%' : '50%'}/>
      </VStack>
      {ComponentUtil.renderCondition(() => me.statusCache.isLoading || newJob.status.isLoading, <JobListLoading/>)}
      {ComponentUtil.renderCondition(() => newJob.status.isSuccess && !newJob.status.isLoading, (
        <>
          <JobList key={0} show={tabIndex === 0} type={'new'} items={newJob.data?.data.new_job_list || []}/>
          <JobList key={1} show={tabIndex === 1} type={'own'} items={myJob.data?.data.my_job_list || []}/>
        </>
      ))}
    </VStack>
  )
}