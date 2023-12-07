import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import type IAutoCompleteProps from "./types";
import { useController } from "react-hook-form";
import styles from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  FadeIn,
  FadeOut,
  withSpring,
} from "react-native-reanimated";
import More from "@assets/icons/svgs/icons/more.svg";
import Close from "@assets/icons/svgs/icons/close.svg";
import DoubleArrow from "@assets/icons/svgs/icons/double_arrow.svg";
import { useTheme } from "@contexts";
import FormTextField from "../formTextField";
function AutoComplete<T>(props: IAutoCompleteProps<T>) {
  const [filterList, setFilterList] = useState<any>([]);
  const [openList, setOpenList] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const theme = useTheme();
  const { field } = useController({
    control: props.control,
    name: props.name,
  });
  const rotate = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value}deg`,
        },
      ],
    };
  }, []);
  const autoCompleteStyles = styles();
  useEffect(() => {
    setFilterList(
      props.data.filter((item: any) =>
        item[props.keyToShow]?.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [value]);
  useEffect(() => {
    if (!field.value) {
      setValue("");
    }
  }, [field.value]);
  useEffect(() => {
    setFilterList(props.data);
  }, [props.data]);
  const handleChange = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    if (props.disabled) {
      setOpenList(false);
    }
  }, [props.disabled]);
  useEffect(() => {
    if (props.defaultValue) {
      props.data.map((item) => {
        if (props.defaultValue[props.keyToShow] === item[props.keyToShow]) {
          if (props.keyToExtract) {
            field.onChange(item[props.keyToExtract] || "");
            setValue(item[props.keyToShow] as any);
          }
          return;
        }
      });
    }
  }, []);
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={autoCompleteStyles.input}
    >
      <View
        style={{
          width: 0,
          height: 0,
          overflow: "hidden",
          zIndex: -1,
          elevation: -1,
        }}
      >
        <TextInput value={field.value} />
      </View>
      <FormTextField
        {...props}
        onFocus={() => {
          rotate.value = withSpring(180, {
            damping: 8,
          });
          setOpenList(true);
        }}
        onBlur={() => {
          Keyboard.dismiss();
          rotate.value = withSpring(0, {
            damping: 8,
          });
          const item = props.data.find((item: any) => {
            if (item[props.keyToShow] === value) {
              return item;
            }
          });
          if (!item) {
            setValue("");
            field.onChange("");
          }
          setOpenList(false);
        }}
        value={value}
        onChange={handleChange}
        icon={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!!value?.length && (
              <TouchableOpacity
                disabled={props.disabled}
                onPress={() => {
                  field.onChange("");
                  setValue("");
                }}
              >
                <Close
                  width={16}
                  style={{
                    marginRight: 10,
                  }}
                  fill={theme.colors.error?.main}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              disabled={props.disabled}
              onPress={() => {
                setOpenList((currentOpen) => !currentOpen);
                if (openList) {
                  rotate.value = withSpring(0, {
                    damping: 8,
                  });
                } else {
                  rotate.value = withSpring(180, {
                    damping: 8,
                  });
                }
              }}
            >
              <Animated.View style={animatedStyles}>
                <More fill={theme.colors?.primary?.main} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        }
      />
      {openList && (
        <FlatList
          data={filterList}
          style={autoCompleteStyles.flatList}
          nestedScrollEnabled
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 0.5,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={[autoCompleteStyles.font, { padding: 10 }]}>
              Nada foi encontrado.
            </Text>
          }
          keyboardShouldPersistTaps="always"
          onEndReached={props.onEndScroll ? props.onEndScroll : undefined}
          onEndReachedThreshold={props.onEndScroll ? 0.1 : undefined}
          contentContainerStyle={autoCompleteStyles.container}
          keyExtractor={(item, index) => {
            if (!props.keyToExtract || !item.id) {
              return index;
            }
            return item[props.keyToExtract ? props.keyToExtract : item.id];
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  field.onChange(item[props.keyToExtract || "id"]);
                  setValue(item[props.keyToShow]);
                  setOpenList(false);
                  rotate.value = withSpring(0, {
                    damping: 8,
                  });
                }}
                key={item.key}
              >
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut.duration(50)}
                  style={{
                    alignItems: "center",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    margin: 10,
                    flexDirection: "row",
                  }}
                >
                  <DoubleArrow width={10} fill={theme.colors.text?.light} />
                  <Text style={autoCompleteStyles.font}>
                    {item[props.keyToShow] ? item[props.keyToShow] : item.name}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </TouchableOpacity>
  );
}

export default AutoComplete;
