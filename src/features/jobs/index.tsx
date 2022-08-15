import {IProps} from "../../cores/types.core";
import {Badge, Box, HStack, Pressable, Text, useToast, VStack} from "native-base";
import {useEffect, useState} from "react";
import {JobList} from "./JobList";
import {useMount} from "../../hooks/core.hook";
import {useNewJob} from "../../loaders/new_job.loader";
import {useMe} from "../../loaders/auths/me.loader";
import {ComponentUtil} from "../../utils/component.util";
import {JobListLoading} from "./JobListLoading";
import {useMyJob} from "../../loaders/my_job.loader";
import {AppBar} from "./appBar";

export const Job = (props: IProps) => {
  const [tabIndex, setTabIndex] = useState(0)
  const newJob = useNewJob()
  const myJob = useMyJob()
  const me = useMe()
  const toast = useToast()

  useMount(async () => {
    await me.getFromCache()
  })

  useEffect(() => {
    if (me.status.isSuccess && !me.status.isLoading) {
      Promise.all([
        newJob.run({}),
        myJob.run({}),
      ])
    }
  }, [me.status.isSuccess, me.status.isLoading])

  useEffect(() => {
    if (newJob.status.isError && !newJob.status.isLoading) {
      toast.show({
        title: 'ล้มเหลว',
        description: JSON.stringify(newJob.status.errorMessage) || 'กรุณาลองใหม่อีกครั้งภายหลัง',
      })
    }
  }, [newJob.status.isError, newJob.status.isLoading])

  return (
    <VStack flex={1} bg={'white'} safeArea>
      <AppBar/>
      <VStack width={'100%'} borderBottomWidth={1} borderBottomColor={'muted.200'}>
        <HStack py={4}>
          <Pressable flex={1} onPress={() => setTabIndex(0)}>
            <HStack justifyContent={'center'}>
              <Text fontFamily={'medium'} fontSize={'lg'} color={tabIndex === 0 ? 'danger.500' : 'muted.500'}>
                งานใหม่
              </Text>
              <Badge bg={tabIndex === 0 ? 'danger.500' : 'muted.200'} rounded={'lg'} ml={1}>
                <Text fontFamily={'medium'} color={tabIndex === 0 ? 'white' : 'muted.600'}>
                  0
                </Text>
              </Badge>
            </HStack>
          </Pressable>
          <Pressable flex={1} onPress={() => setTabIndex(1)}>
            <HStack justifyContent={'center'}>
              <Text fontFamily={'medium'} fontSize={'lg'} color={tabIndex === 1 ? 'danger.500' : 'muted.500'}
                    textAlign={'center'}>
                งานของฉัน
              </Text>
              <Badge bg={tabIndex === 1 ? 'danger.500' : 'muted.200'} rounded={'lg'} ml={1}>
                <Text fontFamily={'medium'} color={tabIndex === 1 ? 'white' : 'muted.600'}>
                  0
                </Text>
              </Badge>
            </HStack>
          </Pressable>
        </HStack>
        <Box width={'50%'} h={0.5} bg={'danger.500'} marginLeft={tabIndex === 0 ? '0%' : '50%'}/>
      </VStack>
      {ComponentUtil.renderCondition(() => newJob.status.isLoading, <JobListLoading/>)}
      {ComponentUtil.renderCondition(() => newJob.status.isSuccess && !newJob.status.isLoading, (
        <>
          <JobList key={0} show={tabIndex === 0} items={newJob.data?.data.new_job_list || []}/>
          <JobList key={1} show={tabIndex === 1} items={myJob.data?.data.my_job_list || []}/>
        </>
      ))}
    </VStack>
  )
}