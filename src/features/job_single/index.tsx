import {IProps} from "../../cores/types.core";
import {useRouter} from "../../hooks/router.hook";
import {ComponentUtil} from "../../utils/component.util";
import {JobSingleNew} from "./JobSingleNew";
import {JobSingleOwn} from "./JobSingleOwn";

export const JobSingle = (props: IProps) => {
  const router = useRouter()

  return (
    <>
      {ComponentUtil.renderCondition(() => router.params.type === 'new', <JobSingleNew data={router.params.data}/>)}
      {ComponentUtil.renderCondition(() => router.params.type === 'own', <JobSingleOwn/>)}
    </>
  )
}