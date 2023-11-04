import { useTheme } from '@contexts';
import { StyleSheet } from 'react-native';

const styles = (variant: string) => {
  const theme = useTheme();
  const condition = variant === 'primary' ? true : false;
  return StyleSheet.create({
    container: {
      backgroundColor: condition
        ? theme.colors.primary?.main
        : theme.colors.background.dark,
      padding: 12,
      borderRadius: theme.shape.borderRadius,
    },
    text: {
      color: condition
        ? theme.colors.common?.white
        : theme.colors.common?.black,
      textAlign: 'center',
      fontFamily: theme.typography.fonts?.primary.medium,
      fontSize: theme.typography.size?.regular,
    },
    disabled: {
      backgroundColor: theme.colors.text?.dark,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default styles;
