import {FormControl, Text, TextArea, VStack, WarningOutlineIcon} from 'native-base'
import {ComponentUtil} from "../../utils/component.util";
import {IFormInputProps} from "./types";
import {get} from "lodash";

export const FormTextAreaInput = (props: IFormInputProps) => {
  return (
    <FormControl
      mb={props.mb || 2}
      isRequired
      isInvalid={props.name in props.form.error}
      {...props}>
      <VStack>
        <TextArea
          alignItems={'flex-start'}
          numberOfLines={3}
          type={props.type}
          placeholder={props.placeholder || props.name}
          borderColor={'muted.300'}
          px={2}
          py={3}
          fontFamily={'medium'}
          fontSize={'sm'}
          placeholderTextColor={'muted.400'}
          value={get(props.form.form, props.name, '')}
          onChangeText={(v) => {
            props.form.setForm({...props.form.form, [props.name]: v})
            props.form.setError({...props.form.error, [props.name]: undefined})
          }}/>
        {ComponentUtil.renderCondition(() => get(props.form.error, props.name, false), (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
            <Text fontFamily={'medium'} fontSize={'xs'} color={'danger'}>
              {props.form.error[props.name]}
            </Text>
          </FormControl.ErrorMessage>
        ))}
      </VStack>
    </FormControl>
  )
}
