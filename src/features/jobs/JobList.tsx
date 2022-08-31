import {IProps} from "../../cores/types.core";
import {Center, Icon, ScrollView, Text} from "native-base";
import {Filter} from "../shares/Filter";
import {JobListItem} from "./JobListItem";
import {IJobItem} from "../../models/job.model";
import {FadeIn} from "../../components/FadeIn";
import {ComponentUtil} from "../../utils/component.util";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export interface IJobListProps extends IProps {
  show?: boolean
  type: 'new' | 'own'
  items: IJobItem[]
}

export const JobList = (props: IJobListProps) => {
  return (
    <ScrollView flex={1} px={5} display={props.show ? 'flex' : 'none'} _contentContainerStyle={{pb: 10}}>
      <FadeIn>
        <Filter items={props.items}/>
        {props.items.map((item) => {
          return <JobListItem key={item.job_no} type={props.type} item={item}/>
        })}
        {ComponentUtil.renderCondition(()=>props.items.length === 0, (
          <Center py={16}>
            <Icon as={MaterialCommunityIcons} name={'emoticon-frown-outline'} color={'muted.400'} size={10} mb={2}/>
            <Text fontFamily={'medium'} fontSize={'sm'} color={'muted.400'}>
              ไม่มีข้อมูล
            </Text>
          </Center>
        ))}
      </FadeIn>
    </ScrollView>
  )
}
