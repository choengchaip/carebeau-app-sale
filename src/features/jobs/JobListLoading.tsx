import {IProps} from "../../cores/types.core";
import {ScrollView} from "native-base";
import {Filter} from "./shares/Filter";

export const JobListLoading = (props: IProps) => {
  return (
    <ScrollView flex={1} display={props.show ? 'flex' : 'none'}>
    </ScrollView>
  )
}