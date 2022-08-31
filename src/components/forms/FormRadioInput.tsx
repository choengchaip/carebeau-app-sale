import {FormControl, Radio, Text, VStack, WarningOutlineIcon} from "native-base";
import {IFormInputProps} from "./types";
import {get} from "lodash";
import {ComponentUtil} from "../../utils/component.util";

export const FormTextInput = (props: IFormInputProps) => {
  return (
    <FormControl
      mb={props.mb || 2}
      isRequired
      isInvalid={props.name in props.form.error}>
      <VStack>
        <Radio.Group
          name={props.name}
          value={get(props.form.form, props.name, '')}>
          <Radio value="1" my="1">
            First
          </Radio>
          <Radio value="2" my="1">
            Second
          </Radio>
          <Radio value="3" my="1">
            Third
          </Radio>
        </Radio.Group>
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