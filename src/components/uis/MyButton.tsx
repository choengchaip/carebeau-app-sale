import {IProps} from "../../cores/types.core";
import {Button, Text} from "native-base";
import {IButtonProps} from "native-base/src/components/primitives/Button/types";

export interface IMyButtonProps extends IProps, IButtonProps {
  title: string
  isLoading?: boolean
  width?: string
}

export const MyButton = (props: IMyButtonProps) => {
  return <Button
    {...props}
    isLoading={props.isLoading}
    _loading={{
      py: props._loading?.py || '12.5px',
    }}
    _disabled={{
      opacity: 0.2,
    }}
    px={props.px || 2}
    py={props.py || 3}
    colorScheme={props.colorScheme || 'danger'}>
    <Text
      fontFamily={props.fontFamily || 'semi_bold'}
      fontSize={props.fontSize || 'sm'}
      color={props.color || 'white'}>
      {props.title}
    </Text>
  </Button>
}