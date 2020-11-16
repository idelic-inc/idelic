import {
  Dropdown,
  IDropdownOption,
  IDropdownProps,
  Shimmer
} from '@fluentui/react';
import {EnumValueType} from '@idelic/formatron';
import {EnumType} from '@idelic/formatron/lib/dataTypes/enum';
import React from 'react';

import {useEnum} from '../../hooks/useEnum';
import {FieldObjectDataType} from '../ModelForm';

const enumValuesToDropdownOptions = (
  values: EnumValueType[]
): IDropdownOption[] =>
  values.map((value) => ({
    key: value.alias,
    text: value.display,
    disabled: value.disabled
  }));

export interface EnumProps {
  field: FieldObjectDataType<EnumType>;
  dropDownProps?: Partial<IDropdownProps>;
}

export const Enum: React.FC<EnumProps> = ({field, dropDownProps = {}}) => {
  const {value, dataType, setValue} = field;
  const [enumItem, {isLoading, error}] = useEnum({id: dataType.id});

  return (
    <Dropdown
      label={enumItem?.display}
      options={enumItem ? enumValuesToDropdownOptions(enumItem.values) : []}
      selectedKey={[value]}
      onRenderLabel={
        isLoading
          ? () => (
              <Shimmer
                styles={{
                  root: {height: 19, padding: '5px 0', width: '33%'}
                }}
              />
            )
          : undefined
      }
      onChange={(_, option) => {
        setValue(option?.key);
      }}
      disabled={isLoading || !!error}
      errorMessage={error?.message}
      {...dropDownProps}
    />
  );
};
