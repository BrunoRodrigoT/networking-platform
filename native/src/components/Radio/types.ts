import { Control } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

export default interface ICheckboxProps {
  name: string;
  disabled?: boolean;
  value: string | number | boolean;
  label: string;
  control: Control<any, any>;
  style?: StyleProp<ViewStyle>;
}
