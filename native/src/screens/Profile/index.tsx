import { Alert, CardBase, Container, GoBack } from "@components";
import { AuthContext, useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { IUser } from "@models/Auth";
import { IPublications } from "@models/Publications";
import { IError } from "@models/Request";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UseUser, usePublications } from "@services";
import { format, parseISO } from "date-fns";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useQuery } from "react-query";

type Props = NativeStackScreenProps<IRootStackParamList, "PROFILE">;

export default function Profile({ route: { params } }: Props) {
  const theme = useTheme();

  const { state } = React.useContext(AuthContext);
  const { findUserById } = UseUser();
  const { findPublicationsByUser } = usePublications();

  const userId = params?.id ? params.id : state.data.user.id;

  const userQuery = useQuery<IUser, IError, IUser>(
    ["user", userId],
    () => findUserById(userId),
    {
      enabled: !!userId,
      retry: false,
    }
  );

  const publicationsByUserQuery = useQuery<
    IPublications[],
    IError,
    IPublications[]
  >(["publicationsByUser", userId], () => findPublicationsByUser(userId), {
    retry: false,
    enabled: !!userId,
  });

  return (
    <Container styles={{ gap: 10 }}>
      <Alert
        open={userQuery.isError}
        message={userQuery.error?.message}
        severity="error"
      />

      <FlatList
        ListHeaderComponent={
          <View
            style={{
              flex: 0.5,
              backgroundColor: theme.colors.primary.dark,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              elevation: 2,
              padding: theme.shape.padding,
              marginBottom: 10,
            }}
          >
            <GoBack />
            <View style={{ flex: 1, gap: 10 }}>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  gap: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  paddingVertical: 10,
                }}
              >
                <Ionicons
                  name="person-circle-sharp"
                  color={theme.colors.common.white}
                  size={80}
                />
                <View style={{ width: 300 }}>
                  <Text
                    style={{
                      color: theme.colors.common.white,
                      fontFamily: theme.typography.fonts.primary.normal,
                      fontSize: theme.typography.size.title,
                      textAlign: "center",
                    }}
                  >
                    {userQuery.data?.username}{" "}
                    <Text style={{ color: theme.colors.secondary.main }}>
                      TSI
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.common.white,
                      fontFamily: theme.typography.fonts.primary.normal,
                      fontSize: theme.typography.size.body,
                      textAlign: "center",
                    }}
                  >
                    {userQuery.data?.specialties.map(
                      (t, i) =>
                        `${t} ${
                          i + 1 === userQuery.data?.specialties.length
                            ? ""
                            : "- "
                        }`
                    )}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 0.4,
                  gap: 5,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.secondary.main,
                    fontFamily: theme.typography.fonts.primary.normal,
                    fontSize: theme.typography.size.regular,
                  }}
                >
                  CONTATOS:
                </Text>
                <Text
                  style={{
                    color: theme.colors.common.white,
                    fontFamily: theme.typography.fonts.primary.normal,
                    fontSize: theme.typography.size.body,
                  }}
                >
                  Telefone: {userQuery.data?.phone}
                </Text>
                <Text
                  style={{
                    color: theme.colors.common.white,
                    fontFamily: theme.typography.fonts.primary.normal,
                    fontSize: theme.typography.size.body,
                  }}
                >
                  Email: {userQuery.data?.email}
                </Text>
              </View>
            </View>
          </View>
        }
        data={publicationsByUserQuery.data}
        renderItem={({ item, index }) => (
          <CardBase
            key={index}
            styles={{
              padding: theme.shape.padding,
              marginBottom: 10,
              marginHorizontal: theme.shape.padding,
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
                  <Text
                    style={{
                      fontSize: theme.typography.size.regular,
                      fontFamily: theme.typography.fonts.primary.normal,
                    }}
                  >
                    {item.user.username}
                    {" - "}
                    <Text style={{ color: theme.colors.secondary.main }}>
                      {item.course.name}
                    </Text>
                  </Text>
                  <Text>
                    {format(parseISO(item.createdAt), "dd/MM/yyyy HH:mm")}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: theme.typography.size.regular,
                color: theme.colors.secondary.main,
                fontFamily: theme.typography.fonts.primary.normal,
              }}
            >
              {item.title + ":"}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.size.body,
                fontFamily: theme.typography.fonts.primary.normal,
              }}
            >
              {item.description}
            </Text>
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
              {item.tags.map((e) => {
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
        showsVerticalScrollIndicator={false}
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
            Nenhuma publicação encontrada
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={publicationsByUserQuery.isRefetching}
            onRefresh={() => {
              publicationsByUserQuery.refetch();
            }}
          />
        }
      />
    </Container>
  );
}
