import {
  Alert,
  AutoComplete,
  Button,
  Container,
  FormTextField,
  GoBack,
} from "@components";
import { Yup } from "@config";
import { AuthContext, useTheme } from "@contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPublicationForm } from "@models/Publications";
import { IError } from "@models/Request";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCourses, usePublications } from "@services";
import { Messages } from "@utils/messages";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";

type Props = NativeStackScreenProps<IRootStackParamList, "PUBLICATION_FORM">;

export default function Publication({ navigation }: Props) {
  const theme = useTheme();
  const { state } = React.useContext(AuthContext);
  const { createPublication } = usePublications();
  const { findCourses } = useCourses();
  const queryClient = useQueryClient();
  const courseQuery = useQuery("courses", findCourses, {
    retry: false,
  });

  const createPublicationMutation = useMutation<
    IPublicationForm,
    IError,
    IPublicationForm
  >(createPublication);

  const validations = Yup.object().shape({
    title: Yup.string().required(Messages.required),
    description: Yup.string().required(Messages.required),
    tags: Yup.string().required(Messages.required),
    course_id: Yup.string(),
  });

  const { control, handleSubmit } = useForm<IPublicationForm>({
    defaultValues: {
      user_id: state.data.user.id,
      title: "",
      description: "",
      tags: "",
      company_id: state.data.user.company_id,
      course_id: "",
    },
    resolver: yupResolver(validations) as never,
  });

  const onSubmit = handleSubmit((data) => {
    const tagsArray = data.tags?.split(",").map((e) => e.trim());

    createPublicationMutation.mutate(
      { ...data, tags: tagsArray as never },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("publications");
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        },
      }
    );
  });

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: theme.shape.padding }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Alert
          open={createPublicationMutation.isError}
          message={createPublicationMutation.error?.message}
          severity="error"
        />
        <GoBack title="Publicar" />

        <ScrollView showsVerticalScrollIndicator={false} style={{ gap: 10 }}>
          <AutoComplete
            name="course_id"
            label="Curso / Área"
            control={control}
            data={courseQuery.data || []}
            keyToShow={"name"}
            keyToExtract="id"
          />
          <FormTextField name="title" control={control} label="Título" />
          <FormTextField
            name="description"
            control={control}
            label="Descrição"
            multiline
            numberLines={4}
          />
          <FormTextField
            name="tags"
            control={control}
            label="Tags"
            multiline
            numberLines={2}
          />
        </ScrollView>
        <Button variant="primary" onPress={onSubmit}>
          Publicar
        </Button>
      </KeyboardAvoidingView>
    </Container>
  );
}
