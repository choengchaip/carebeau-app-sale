import {IProps} from "../../cores/types.core";
import {ScrollView} from "native-base";
import {Filter} from "../shares/Filter";
import {JobListItem} from "./JobListItem";
import {IJobItem} from "../../models/job.model";
import {FadeIn} from "../../components/FadeIn";

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
      </FadeIn>
    </ScrollView>
  )
}
