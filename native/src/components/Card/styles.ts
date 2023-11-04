import { StyleSheet } from 'react-native';
import ICardProps from './types';
import { useTheme } from '@contexts';

const styles = (orientation: ICardProps['orientation']) => {
  const theme = useTheme();
  const verifyOrientation = orientation === 'horizontal' ? true : false;
  return StyleSheet.create({
    container: {
      flexDirection: verifyOrientation ? 'row' : 'column-reverse',
      justifyContent: verifyOrientation ? 'space-between' : 'center',
      alignItems: 'center',
      padding: 14,
      borderRadius: 20
    },
    title: {
      // color: theme.colors.primary?.main,
      fontFamily: theme.typography.fonts?.primary.normal,
      fontSize: theme.typography.size.caption + 2,
      marginTop: 10,
      marginBottom: 5,
      textAlign: verifyOrientation ? 'left' : 'center',
    },
    subTitle: {
      fontFamily: theme.typography.fonts?.primary.normal,
      fontSize: theme.typography.size?.caption,
      color: theme.colors.text?.light,
      marginTop: 3,
    },
  });
};

export default styles;
