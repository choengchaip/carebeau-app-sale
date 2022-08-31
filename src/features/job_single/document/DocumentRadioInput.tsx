import {FormControl, HStack, Radio, Text, VStack, WarningOutlineIcon} from 'native-base'
import {IUseForm} from '../../../hooks/form.hook'
import {IOption, IProps} from "../../../cores/types.core";
import {ComponentUtil} from "../../../utils/component.util";
import {get} from "lodash";

export interface IDocumentInputProps extends IProps {
  name: string
  label: string
  form: IUseForm
  options: IOption[]
  onChange: (v: string) => void
}

export const DocumentInput = (props: IDocumentInputProps) => {

  return (
    <HStack
      key={props.name}
      alignItems={'center'}
      py={2}
      px={3}
      rounded={'sm'}
      bg={'danger.50'}>
      <Text
        flex={2}
        fontFamily={'medium'}
        fontSize={'sm'}>
        {props.label}
      </Text>
      <FormControl
        flex={2}
        isRequired
        isInvalid={props.name in props.form.error}>
        <VStack>
          <Radio.Group
            name={props.name}
            colorScheme={'danger'}
            onChange={props.onChange}>
            <HStack w={'full'}>
              {props.options.map((option) => {
                return <HStack
                  key={`${props.name}_${option.value}`}
                  flex={1}
                  justifyContent={'flex-end'}>
                  <Radio
                    value={option.value}>
                    <Text fontFamily={'medium'}>
                      {option.label}
                    </Text>
                  </Radio>
                </HStack>
              })}
            </HStack>
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
    </HStack>
  )
}
