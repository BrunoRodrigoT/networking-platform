import {
  AutoComplete,
  Button,
  Container,
  Footer,
  FormTextField,
  GoBack,
  Steps,
  StrengthPasswordMeter,
} from "@components";
import { RegexOf, Yup } from "@config";
import { useTheme } from "@contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { Messages } from "@utils/messages";
import React from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import EyeOpen from "@assets/icons/svgs/icons/eye.svg";
import EyeClose from "@assets/icons/svgs/icons/eye_closed.svg";
import { IUserSignUp } from "@models/Auth";

interface Props {
  onSubmit: (data: IUserSignUp) => void;
  initialValues: IUserSignUp;
  onGoBack: () => void;
}

export default function StepOne({ onSubmit, initialValues, onGoBack }: Props) {
  const theme = useTheme();

  const validations = Yup.object().shape({
    username: Yup.string().required(Messages.required),
    email: Yup.string().required(Messages.required),
    password: Yup.string()
      .required(Messages.required)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        Messages.password_validation
      ),
    password_confirm: Yup.string()
      .required(Messages.required)
      .equals([Yup.ref("password")], "As senhas precisam ser iguais"),
    birth_date: Yup.string().required(Messages.required),
    gender: Yup.string().required(Messages.required),
    phone: Yup.string().required(Messages.required),
  });

  const [password, setPassword] = React.useState<boolean>(false);
  const [invisiblePass, setInvisiblePass] = React.useState<boolean>(true);
  const [invisiblePassConfirmation, setInvisiblePassConfirmation] =
    React.useState<boolean>(true);

  const { control, handleSubmit, watch } = useForm<IUserSignUp>({
    defaultValues: initialValues,
    resolver: yupResolver(validations) as never,
  });

  return (
    <Container image styles={{ padding: theme.shape.padding }}>
      <GoBack goBacksTo={onGoBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ gap: 10, marginBottom: 10 }}
      >
        <View style={{ gap: 5 }}>
          <FormTextField
            required
            name="username"
            label={"Nome e Sobrenome"}
            control={control}
          />

          <FormTextField
            required
            name="email"
            label="E-mail"
            control={control}
            keyboardType="email-address"
          />

          <FormTextField
            required
            name="password"
            label={"Senha"}
            control={control}
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            secureTextEntry={invisiblePass}
            customStyles={{
              labelStyles: {
                fontSize: theme.typography.size.body,
              },
              containerStyles: {
                marginBottom: 10,
              },
            }}
            icon={
              <TouchableOpacity
                onPress={() => setInvisiblePass(!invisiblePass)}
              >
                {!invisiblePass ? (
                  <EyeOpen
                    width={24}
                    height={24}
                    fill={theme.colors?.primary?.main}
                  />
                ) : (
                  <EyeClose
                    width={24}
                    height={24}
                    fill={theme.colors?.primary?.main}
                  />
                )}
              </TouchableOpacity>
            }
          />
          {password || watch("password").length ? (
            <StrengthPasswordMeter password={watch("password")} />
          ) : (
            <></>
          )}

          <FormTextField
            required
            name="password_confirm"
            label={"Confirmar Senha"}
            control={control}
            secureTextEntry={invisiblePassConfirmation}
            icon={
              <TouchableOpacity
                onPress={() =>
                  setInvisiblePassConfirmation(!invisiblePassConfirmation)
                }
              >
                {invisiblePassConfirmation ? (
                  <EyeClose
                    width={24}
                    height={24}
                    fill={theme.colors?.primary?.main}
                  />
                ) : (
                  <EyeOpen
                    width={24}
                    height={24}
                    fill={theme.colors?.primary?.main}
                  />
                )}
              </TouchableOpacity>
            }
          />
          <FormTextField
            required
            name="birth_date"
            label={"Data de Nascimento"}
            mask={RegexOf.date}
            control={control}
            keyboardType="numeric"
          />

          <AutoComplete
            name="gender"
            label="Gênero"
            control={control}
            data={[
              { gender: "Homem cis" },
              { gender: "Mulher cis" },
              { gender: "Homem trans" },
              { gender: "Mulher trans" },
              { gender: "Não binário" },
            ]}
            keyToShow={"gender"}
            keyToExtract="gender"
          />

          <FormTextField
            required
            name="phone"
            label="Celular"
            mask={RegexOf.phone}
            control={control}
            keyboardType="numeric"
            placeholder="(00) 99999-9999"
          />
        </View>
      </ScrollView>

      <Button variant="primary" onPress={handleSubmit(onSubmit)}>
        Avançar
      </Button>
    </Container>
  );
}
