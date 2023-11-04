import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import CardBase from './CardBase';
import styles from './styles';
import ICardProps from './types';
const Card: FunctionComponent<ICardProps> = ({
  onPress,
  orientation = 'horizontal',
  icon,
  subTitle,
  title,
  disabled = false,
  viewStyle,
  ...props
}) => {
  const cardStyles = styles(orientation);
  if (props.children)
    return (
      <CardBase onPress={onPress} styles={[props.styles]}>
        {props.children}
      </CardBase>
    );
  return (
    <CardBase onPress={onPress} styles={[cardStyles.container, props.styles]}>
      <View style={viewStyle}>
        <Text style={[cardStyles.title, { opacity: disabled ? 0.4 : 1 }]}>
          {title}
        </Text>
        {!!subTitle && <Text style={cardStyles.subTitle}>{subTitle}</Text>}
      </View>
      {icon}
    </CardBase>
  );
};

export default Card;
