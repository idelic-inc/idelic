import {ITextFieldProps, TextField} from '@fluentui/react/lib/TextField';
import React from 'react';

import {FieldObjectDataType} from '../ModelForm';

export interface TextProps {
  field: FieldObjectDataType;
  textFieldProps?: ITextFieldProps;
}

export const Text: React.FC<TextProps> = ({field, textFieldProps = {}}) => {
  const {value, setValue, error, dataType} = field;

  return (
    <TextField
      value={value}
      onChange={(_, val) => setValue(val ?? '')}
      label={dataType.label}
      required={dataType.isRequired}
      errorMessage={error}
      {...textFieldProps}
    />
  );
};
