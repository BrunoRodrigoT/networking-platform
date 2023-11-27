import {
  AutoComplete,
  Button,
  Container,
  Footer,
  FormTextField,
  GoBack,
} from "@components";
import { Yup } from "@config";
import { useTheme } from "@contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserSignUp } from "@models/Auth";
import { useCompany, useCourses } from "@services";
import { Messages } from "@utils/messages";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useQuery } from "react-query";

interface Props {
  onSubmit: (data: IUserSignUp) => void;
  initialValues: IUserSignUp;
  onGoBack: () => void;
}

export default function StepTwo({ onSubmit, initialValues, onGoBack }: Props) {
  const { findCompanies } = useCompany();
  const { findCourses } = useCourses();
  const theme = useTheme();

  const companyQuery = useQuery("companies", findCompanies, {
    retry: false,
  });
  const courseQuery = useQuery("courses", findCourses, {
    retry: false,
  });

  const validations = Yup.object().shape({
    company_id: Yup.string().required(Messages.required),
    course_id: Yup.string().required(Messages.required),
    period: Yup.string().required(Messages.required),
    specialties: Yup.string().required(Messages.required),
  });

  const { control, handleSubmit } = useForm<IUserSignUp>({
    defaultValues: initialValues,
    resolver: yupResolver(validations) as never,
  });

  return (
    <Container styles={{ padding: theme.shape.padding }} image>
      <GoBack goBacksTo={onGoBack} />
      <ScrollView style={{ gap: 10, marginBottom: 10 }}>
        <View style={{ gap: 5 }}>
          <AutoComplete
            name="company_id"
            label="Universidade"
            control={control}
            data={companyQuery.data || []}
            keyToShow={"name"}
            keyToExtract="id"
          />
          <AutoComplete
            name="course_id"
            label="Curso"
            control={control}
            data={courseQuery.data || []}
            keyToShow={"name"}
            keyToExtract="id"
          />
          <FormTextField
            required
            name="period"
            label={"Período"}
            control={control}
            keyboardType="numeric"
          />
          <FormTextField
            required
            name="specialties"
            label={"Especialidades"}
            placeholder="STACK1, STACK2, STACK3"
            control={control}
            numberLines={4}
            multiline
          />
        </View>
      </ScrollView>
      <Button variant="primary" onPress={handleSubmit(onSubmit)}>
        Avançar
      </Button>
    </Container>
  );
}
