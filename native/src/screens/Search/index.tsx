import React from "react";
import { CardBase, Container, FormTextField, GoBack } from "@components";
import { useTheme } from "@contexts";
import { IUser } from "@models/Auth";
import { IError } from "@models/Request";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UseUser } from "@services";
import UseDebounce from "@utils/useDebounce";
import { useForm } from "react-hook-form";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import Logo from "@assets/icons/svgs/icons/logo.svg";
import { Ionicons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { RefreshControl } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<IRootStackParamList, "SEARCH">;

export default function Search({ navigation }: Props) {
  const theme = useTheme();
  const [params, setParams] = React.useState<string>("");
  const { findUsers } = UseUser();

  const usersQuery = useQuery<IUser[], IError, IUser[]>(
    ["users", params],
    () => findUsers(params),
    {
      retry: false,
      enabled: !!params,
    }
  );

  const { control, watch, handleSubmit } = useForm({
    defaultValues: { params: "" },
  });

  const paramsDebounced = UseDebounce(watch("params"));

  React.useEffect(() => {
    (() => {
      setParams(paramsDebounced);
    })();
  }, [paramsDebounced]);

  const onSubmit = handleSubmit(() => {
    usersQuery.refetch();
  });

  return (
    <Container styles={{ padding: theme.shape.padding }}>
      <FlatList
        data={usersQuery.data}
        ListHeaderComponent={
          <FormTextField
            control={control}
            name="params"
            placeholder="Pesquisar"
            customStyles={{ containerStyles: { marginBottom: 10 } }}
          />
        }
        renderItem={({ item, index }) => (
          <CardBase
            key={index}
            styles={{
              padding: theme.shape.padding,
              marginVertical: 5,
              gap: 7,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <Ionicons
                  name="person-sharp"
                  size={50}
                  color={theme.colors.text.dark}
                />
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PROFILE", { id: item.id })
                    }
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.size.regular,
                        fontFamily: theme.typography.fonts.primary.normal,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.username}
                      {" - "}
                      <Text style={{ color: theme.colors.secondary.main }}>
                        {item.course?.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ color: theme.colors.text.dark }}>
                    {item.email}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="ellipsis-vertical-sharp"
                  size={30}
                  color={theme.colors.text.dark}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: theme.typography.fonts.primary.normal,
                }}
              >
                TAGS :{" "}
              </Text>
              {item.specialties.map((e) => {
                return (
                  <Text
                    style={{
                      fontSize: theme.typography.size.body,
                      fontFamily: theme.typography.fonts.primary.normal,
                      color: theme.colors.text.dark,
                    }}
                  >
                    {e + " | "}
                  </Text>
                );
              })}
            </View>
          </CardBase>
        )}
        ListEmptyComponent={
          <Text
            style={{
              fontFamily: theme.typography.fonts.primary.light,
              fontSize: theme.typography.size.body,
              marginTop: 15,
              textAlign: "center",
              color: theme.colors.text?.light,
            }}
          >
            Pesquise por novos usuários...
          </Text>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={usersQuery.isRefetching}
            onRefresh={() => {
              usersQuery.refetch();
            }}
          />
        }
      />
    </Container>
  );
}
