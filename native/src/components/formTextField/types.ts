import React from 'react';
import { Control } from 'react-hook-form';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Mask } from '@models/Regex';

interface IFormTextField {
  defaultInput?: string;
  label?: string;
  placeholder?: string;
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  icon?: React.ReactNode;
  value?: any;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  mask?: Mask;
  labelSize?: 'sm' | 'default';
  multiline?: boolean;
  numberLines?: number;
  customStyles?: {
    containerStyles?: StyleProp<ViewStyle>;
    labelStyles?: StyleProp<TextStyle>;
    inputContainer?: StyleProp<TextStyle>;
  };
  onChange?: (e: any) => void;
  onPressIn?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
  onPressOut?:
    | ((e: NativeSyntheticEvent<NativeTouchEvent>) => void)
    | undefined;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
}
export default IFormTextField;
