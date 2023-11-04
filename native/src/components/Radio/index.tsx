import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useController } from 'react-hook-form';
import ICheckboxProps from './types';

import styles from './styles';

function Radio(props: ICheckboxProps) {
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  const radioStyles = styles(
    field.value === props.value ? true : false,
    props.disabled
  );
  const handleCheck = () => {
    if (!props.disabled) {
      field.onChange(props.value);
    }
  };
  return (
    <TouchableOpacity
      style={[radioStyles.container, props?.style]}
      onPress={handleCheck}
    >
      <View
        style={[radioStyles.radio, props.disabled && radioStyles.radioDisabled]}
      >
        <View
          style={[
            radioStyles.radioBackground,
            props.disabled && radioStyles.radioBackgroundDisabled,
          ]}
        />
      </View>
      <Text
        style={[
          radioStyles.radioText,
          props.disabled && radioStyles.textDisabled,
        ]}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

export default Radio;
