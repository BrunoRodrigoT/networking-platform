import { Alert, CardBase, Container } from "@components";
import { AuthContext, useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQuery } from "react-query";
import { useFavorite, usePublications } from "@services";
import { IPublications } from "@models/Publications";
import { IError } from "@models/Request";
import { format, parseISO } from "date-fns";
import { ICreateFavorite, IFavorite } from "@models/Favorite";

type Props = NativeStackScreenProps<IRootStackParamList, "MENU">;

export default function Menu({ navigation }: Props) {
  const theme = useTheme();

  const { findPublications } = usePublications();
  const { findFavorites, createFavorite, removeFavorite } = useFavorite();

  const publicationsQuery = useQuery<IPublications[], IError, IPublications[]>(
    ["publications"],
    findPublications,
    {
      retry: false,
    }
  );
  const favoritesQuery = useQuery<IFavorite[], IError, IFavorite[]>(
    ["favorites"],
    findFavorites,
    {
      retry: false,
    }
  );

  const favoriteMutation = useMutation<
    ICreateFavorite,
    IError,
    ICreateFavorite
  >(createFavorite, {
    onSuccess: () => {
      favoritesQuery.refetch();
    },
  });
  const unfavoriteMutation = useMutation<IError, IError, string>(
    removeFavorite,
    {
      onSuccess: () => {
        favoritesQuery.refetch();
      },
    }
  );

  return (
    <Container background>
      <Alert
        open={publicationsQuery.isError}
        message={publicationsQuery.error?.message}
        severity="error"
      />
      <Alert
        open={favoriteMutation.isError}
        message={favoriteMutation.error?.message}
        severity="error"
      />
      <Alert
        open={unfavoriteMutation.isError}
        message={unfavoriteMutation.error?.message}
        severity="error"
      />

      <FlatList
        data={publicationsQuery.data}
        style={{ flex: 1, paddingHorizontal: theme.shape.padding }}
        renderItem={({ item, index }) => (
          <CardBase
            key={index}
            styles={{
              padding: theme.shape.padding,
              marginBottom: 10,
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
                      navigation.navigate("PROFILE", { id: item.user.id })
                    }
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.size.regular,
                        fontFamily: theme.typography.fonts.primary.normal,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.user.username}
                      {" - "}
                      <Text style={{ color: theme.colors.secondary.main }}>
                        {item.course.name}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  <Text>
                    {format(parseISO(item.createdAt), "dd/MM/yyyy HH:mm")}
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
            {favoritesQuery.data?.find((e) => e.publication_id === item.id) ? (
              <TouchableOpacity
                onPress={() => unfavoriteMutation.mutate(item.id)}
                style={{
                  position: "absolute",
                  bottom: 15,
                  right: 15,
                }}
              >
                <Ionicons
                  name="heart"
                  size={30}
                  color={theme.colors.error.dark}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  favoriteMutation.mutate({ publication_id: item.id })
                }
                style={{
                  position: "absolute",
                  bottom: 15,
                  right: 15,
                }}
              >
                <Ionicons
                  name="heart"
                  size={30}
                  color={theme.colors.text.light}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            )}
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
            refreshing={publicationsQuery.isRefetching}
            onRefresh={() => {
              publicationsQuery.refetch();
            }}
          />
        }
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("PUBLICATION_FORM")}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: theme.colors.primary.main,
          padding: 10,
          borderRadius: 50,
        }}
      >
        <Ionicons
          name="add-outline"
          size={30}
          color={theme.colors.common.white}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
    </Container>
  );
}
