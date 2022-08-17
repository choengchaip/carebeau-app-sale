import {IProps} from "../../cores/types.core";
import {MyDialogSuccess} from "./MyDialogSuccess";
import {ComponentUtil} from "../../utils/component.util";
import {IUseDialog} from "../../hooks/dialog.hook";

export interface IMyDialogProps extends IProps {
  dialog: IUseDialog
}

export const MyDialog = (props: IMyDialogProps) => {
  return <>
    {ComponentUtil.renderCondition(() => props.dialog.type === 'success', (
      <MyDialogSuccess
        title={props.dialog.title}
        description={props.dialog.description}
        isShow={props.dialog.isShow}
        onClose={props.dialog.onClose}/>
    ))}
  </>
}