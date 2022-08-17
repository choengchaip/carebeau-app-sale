import {IProps} from "../../cores/types.core";
import {IViewProps} from "native-base/lib/typescript/components/basic/View/types";
import {IUseForm} from "../../hooks/form.hook";

export interface IFormInputProps extends IProps, IViewProps {
  name: string
  type?: string
  placeholder?: string
  form: IUseForm
  mb?: number
  inputStyle?: IViewProps
}