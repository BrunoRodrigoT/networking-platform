import { Alert, CardBase, Container, GoBack } from "@components";
import { AuthContext, useTheme } from "@contexts";
import { Ionicons } from "@expo/vector-icons";
import { IPublications } from "@models/Publications";
import { IError } from "@models/Request";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usePublications } from "@services";
import { format, parseISO } from "date-fns";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { useMutation, useQuery, useQueryClient } from "react-query";

type Props = NativeStackScreenProps<IRootStackParamList, "MY_PUBLICATIONS">;

export default function MyPublications({ navigation }: Props) {
  const theme = useTheme();
  const modalizeRef = React.useRef<Modalize>(null);
  const { state } = React.useContext(AuthContext);
  const { findPublicationsByUser, deletePublication } = usePublications();
  const [currentPubli, setCurrentPubli] = React.useState<IPublications>();
  const queryClient = useQueryClient();

  const publicationsByUserQuery = useQuery<
    IPublications[],
    IError,
    IPublications[]
  >(
    ["publicationsByUser", state.data.user.id],
    () => findPublicationsByUser(state.data.user.id),
    {
      retry: false,
    }
  );

  const deletePublicationMutation = useMutation<IError, IError, string>(
    deletePublication,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("publications");
        publicationsByUserQuery.refetch();
      },
    }
  );

  const options = [
    {
      label: "Excluir Publicação",
      onPress: (publication: IPublications) => {
        modalizeRef.current?.close();
        deletePublicationMutation.mutate(publication.id);
      },
    },
  ];

  const onOpenModal = (publication: IPublications) => {
    setCurrentPubli(publication);
    modalizeRef.current?.open();
  };

  return (
    <Container styles={{ paddingTop: theme.shape.padding }}>
      <GoBack title="Minhas Publicações" />

      <Alert
        open={publicationsByUserQuery.isError}
        message={publicationsByUserQuery.error?.message}
        severity="error"
      />
      <Alert
        open={deletePublicationMutation.isError}
        message={deletePublicationMutation.error?.message}
        severity="error"
      />
      <Alert
        open={deletePublicationMutation.isSuccess}
        message="Publicação excluída"
        severity="success"
      />
      <FlatList
        data={publicationsByUserQuery.data}
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
              <TouchableOpacity onPress={() => onOpenModal(item)}>
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
            refreshing={publicationsByUserQuery.isRefetching}
            onRefresh={() => {
              publicationsByUserQuery.refetch();
            }}
          />
        }
      />
      <Modalize
        ref={modalizeRef}
        modalStyle={{
          flex: 0.2,
        }}
        HeaderComponent={
          <View>
            <Text
              style={{
                color: theme.colors.primary.dark,
                fontFamily: theme.typography.fonts.primary.normal,
                fontSize: theme.typography.size.regular,
                textAlign: "center",
                paddingVertical: 20,
              }}
            >
              Opções
            </Text>
          </View>
        }
      >
        <View style={{ gap: 10 }}>
          {options.map((e, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => (currentPubli ? e.onPress(currentPubli) : null)}
                style={{
                  borderBottomColor: theme.colors.text.dark,
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignSelf: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.error.dark,
                    fontFamily: theme.typography.fonts.primary.normal,
                    fontSize: theme.typography.size.regular,
                    textAlign: "center",
                  }}
                >
                  {e.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modalize>
    </Container>
  );
}
