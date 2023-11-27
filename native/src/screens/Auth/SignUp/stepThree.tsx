import { Button, Checkbox, Container, Footer, GoBack } from "@components";
import { Yup } from "@config";
import { useTheme } from "@contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserSignUp } from "@models/Auth";
import { Messages } from "@utils/messages";
import React from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Platform,
  View,
} from "react-native";

interface Props {
  onSubmit: (data: IUserSignUp) => void;
  initialValues: IUserSignUp;
  onGoBack: () => void;
}

export default function StepThree({
  onSubmit,
  initialValues,
  onGoBack,
}: Props) {
  const theme = useTheme();
  const validations = Yup.object().shape({
    accept_promotions: Yup.boolean().nullable(),
    accept_term: Yup.boolean().required(Messages.required),
  });

  const { control, handleSubmit } = useForm<IUserSignUp>({
    defaultValues: initialValues,
    resolver: yupResolver(validations) as never,
  });

  return (
    <Container styles={{ padding: theme.shape.padding }} image>
      <GoBack goBacksTo={onGoBack} />
      <View style={{ gap: 10, flex: 1 }}>
        <Checkbox
          label="Li e aceito os termos de uso e política de privacidade"
          control={control}
          name="accept_term"
        />
        <Checkbox
          label="Concordo com o compartilhamento de meus dados pessoais pela OportUni para envio de oportunidades de empregos, estágios e marketing declarados na aplicação"
          control={control}
          name="accept_promotions"
        />
      </View>
      <Button variant="primary" onPress={handleSubmit(onSubmit)}>
        Cadastrar
      </Button>
    </Container>
  );
}
