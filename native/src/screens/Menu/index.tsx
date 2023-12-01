import { Alert, Button, Card, CardBase, Container } from "@components";
import { AuthContext, useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatWithMask } from "@utils/mask";
import { RegexOf } from "@config";
import { useQuery } from "react-query";
import { usePublications } from "@services";
import { IPublications } from "@models/Publications";
import { IError } from "@models/Request";
import { format, parseISO } from "date-fns";

type Props = NativeStackScreenProps<IRootStackParamList, "MENU">;

export default function Menu({ navigation }: Props) {
  const theme = useTheme();

  const { SignOut, state } = React.useContext(AuthContext);
  const { findPublications } = usePublications();

  const publicationsQuery = useQuery<IPublications[], IError, IPublications[]>(
    ["publications"],
    findPublications,
    {
      retry: false,
    }
  );

  return (
    <Container background styles={{ padding: theme.shape.padding }}>
      <Alert
        open={publicationsQuery.isError}
        message={publicationsQuery.error?.message}
        severity="error"
      />
      <FlatList
        data={publicationsQuery.data}
        style={{ flex: 1 }}
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
      <Button
        variant="primary"
        onPress={() => {
          SignOut();
        }}
      >
        logout
      </Button>
    </Container>
  );
}
