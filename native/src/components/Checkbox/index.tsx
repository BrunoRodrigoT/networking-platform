import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useController } from "react-hook-form";

import Check from "@assets/icons/svgs/icons/check.svg";
import ICheckboxProps from "./types";

import styles from "./styles";
import { useTheme } from "@contexts";

function Checkbox(props: ICheckboxProps) {
  const theme = useTheme();
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  const [checked, setChecked] = useState<boolean>(
    props.checked || field.value || false
  );
  const checkBoxStyles = styles(checked, props.disabled);

  const handleCheck = () => {
    if (!props.disabled) {
      setChecked((currentChecked) => !currentChecked);
    }
  };
  React.useEffect(() => {
    if (props.multiple) {
      if (checked) {
        field.onChange([...field.value, props.value]);
      } else {
        const newValue = field.value.filter(
          (value: ICheckboxProps["value"]) => {
            if (value !== props.value) {
              return value;
            }
          }
        );
        field.onChange(newValue);
      }
      return;
    }
    field.onChange(checked);
  }, [checked]);

  React.useEffect(() => {
    if (!field.value) {
      setChecked(false);
    }
  }, [field.value]);
  return (
    <TouchableOpacity
      style={[checkBoxStyles.container, props.customStyles?.containerStyles]}
      onPress={handleCheck}
    >
      <View
        style={[
          checkBoxStyles.checkbox,
          props.disabled && checkBoxStyles.checkBoxDisabled,
        ]}
      >
        <Check fill={checked ? theme.colors.common?.white : "none"} />
      </View>
      <Text
        style={[
          checkBoxStyles.checkboxText,
          props.disabled && checkBoxStyles.textDisabled,
          props.customStyles?.labelStyles,
        ]}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

export default Checkbox;
