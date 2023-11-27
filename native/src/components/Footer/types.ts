import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export default interface IFooterProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}
