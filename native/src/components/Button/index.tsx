import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

import IButtonProps from "./types";

import styles from "./styles";
import { useTheme } from "@contexts";

function Button({
  variant,
  children,
  style,
  onPress,
  loading,
  icon,
}: IButtonProps) {
  const buttonStyles = styles(variant);
  const theme = useTheme();

  useEffect(() => {});
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={theme.shape.opacity}
      disabled={loading}
    >
      <View
        style={[
          buttonStyles.container,
          style,
          loading && buttonStyles.disabled,
        ]}
      >
        {!loading ? (
          <View style={buttonStyles.iconContainer}>
            {!!icon && (
              <>
                {icon}
                <View style={{ width: 15 }}></View>
              </>
            )}
            <Text style={buttonStyles.text}>{children}</Text>
          </View>
        ) : (
          <ActivityIndicator color={theme.colors.primary?.main} />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Button;
