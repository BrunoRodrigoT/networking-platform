import { useTheme } from '@contexts';
import { StyleSheet } from 'react-native';

const styles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.common?.white,
      borderRadius: theme.shape.borderRadius,
      shadowColor: theme.colors.primary?.dark,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 0.8,
    },
  });
};

export default styles;
