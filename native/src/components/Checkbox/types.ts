import { Control } from 'react-hook-form';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export default interface ICheckboxProps {
  name: string;
  disabled?: boolean;
  value?: string | number;
  checked?: boolean;
  label?: string;
  control: Control<any, any>;
  multiple?: boolean;
  customStyles?: {
    containerStyles?: StyleProp<ViewStyle>;
    labelStyles?: StyleProp<TextStyle>;
  };
}
