import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { useController } from "react-hook-form";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { formatWithMask } from "@utils/mask";

import { styles } from "./styles";
import IFormTextField from "./types";
import { useTheme } from "@contexts";

function FormTextField({
  label,
  placeholder,
  control,
  name,
  secureTextEntry = false,
  icon,
  customStyles,
  value,
  keyboardType,
  required,
  mask,
  labelSize = "sm",
  multiline = false,
  numberLines,
  onChange,
  disabled,
  onPressIn,
  onPressOut,
  onFocus,
  onBlur,
}: IFormTextField) {
  const theme = useTheme();
  const {
    field,
    fieldState: { error },
  } = useController({
    control: control ? control : undefined,
    name,
  });
  const formTextFieldStyles = styles();

  return (
    <TouchableOpacity activeOpacity={1}>
      <View
        style={[
          formTextFieldStyles.container,
          customStyles?.containerStyles,
          {
            opacity: !disabled ? 1 : 0.4,
          },
        ]}
      >
        {!!label && (
          <Text
            style={[
              formTextFieldStyles.label,
              labelSize === "sm" && { fontSize: theme.typography.size.body },
              customStyles?.labelStyles,
            ]}
          >
            {label}{" "}
            {required && (
              <Text
                style={[
                  {
                    color: theme.colors.error?.main,
                  },
                  formTextFieldStyles.label,
                ]}
              >
                *
              </Text>
            )}
            :
          </Text>
        )}
        <View
          style={[
            formTextFieldStyles.inputContainer,
            customStyles?.inputContainer,
          ]}
        >
          <>
            <TextInput
              style={[
                formTextFieldStyles.input,
                {
                  textAlign: "left",
                },
              ]}
              placeholder={placeholder}
              onChangeText={(text) => {
                if (mask) {
                  const maskedValue = formatWithMask({
                    mask: mask,
                    text: text,
                  }).masked;
                  onChange
                    ? onChange(maskedValue)
                    : field.onChange(maskedValue);
                } else {
                  onChange ? onChange(text) : field.onChange(text);
                }
              }}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              value={typeof value === "string" ? value : field.value}
              onPressIn={onPressIn}
              keyboardType={keyboardType}
              onPressOut={onPressOut}
              onFocus={onFocus}
              onBlur={(e) => {
                field.onChange(field.value?.trim());
                if (onBlur) {
                  onBlur(e);
                }
              }}
              selectionColor={theme.colors.primary?.main}
              placeholderTextColor={theme.colors.text?.light}
              secureTextEntry={secureTextEntry}
              multiline={multiline}
              numberOfLines={numberLines ? numberLines : 1}
            />
            <View style={{ marginRight: 12 }}>{!!icon && icon}</View>
          </>
        </View>
        {error?.message && (
          <Animated.Text entering={FadeIn} style={[formTextFieldStyles.error]}>
            {error?.message}
          </Animated.Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default FormTextField;
