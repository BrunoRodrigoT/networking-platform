import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface IButtonVariants {
  variant: 'primary' | 'secondary';
}
export default interface IButtonProps extends IButtonVariants {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  icon?: ReactNode;
}

export { IButtonVariants };
