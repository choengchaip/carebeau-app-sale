import {IProps} from "../../cores/types.core";
import {ScrollView} from "native-base";
import {Filter} from "./shares/Filter";
import {JobListItem} from "./JobListItem";
import {IJobItem} from "../../models/job.model";

export interface IJobListProps extends IProps {
  show?: boolean
  items: IJobItem[]
}

export const JobList = (props: IJobListProps) => {
  return (
    <ScrollView flex={1} px={2} display={props.show ? 'flex' : 'none'} _contentContainerStyle={{pb: 10}}>
      <Filter items={props.items}/>
      {props.items.map((item) => {
        return <JobListItem key={item.job_no} item={item}/>
      })}
    </ScrollView>
  )
}