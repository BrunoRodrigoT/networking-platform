import React from 'react';
import { ViewStyle } from 'react-native';
import { ICardBaseProps } from './CardBase/types';

export default interface ICardProps extends ICardBaseProps {
  orientation?: 'horizontal' | 'vertical' | undefined;
  icon?: React.ReactNode;
  title?: string;
  subTitle?: string;
  type?: string;
  disabled?: boolean;
  viewStyle?: ViewStyle;
}
