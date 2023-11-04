import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ICardBaseProps {
  children?: React.ReactNode;
  onPress?: () => void | undefined;
  styles?: StyleProp<ViewStyle>;
}
