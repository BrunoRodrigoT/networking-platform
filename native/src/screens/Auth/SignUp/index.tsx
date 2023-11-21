import React from "react";
import {
  Container,
  FormTextField,
  StrengthPasswordMeter,
  AutoComplete,
  GoBack,
} from "@components";
import { RegexOf, Yup } from "@config";
import { IUserSignUp } from "@models/Auth";
import { Messages } from "@utils/messages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ScrollView, TouchableOpacity, View } from "react-native";

import EyeOpen from "@assets/icons/svgs/icons/eye.svg";
import EyeClose from "@assets/icons/svgs/icons/eye_closed.svg";

import { useTheme } from "@contexts";

export default function SignUp() {
  const theme = useTheme();
  const [step, setStep] = React.useState<number>(1);

  const [password, setPassword] = React.useState<boolean>(false);
  const [invisiblePass, setInvisiblePass] = React.useState<boolean>(true);
  const [invisiblePassConfirmation, setInvisiblePassConfirmation] =
    React.useState<boolean>(true);

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
    period: Yup.string().required(Messages.required),
    specialties: Yup.string().required(Messages.required),
    company_id: Yup.string().required(Messages.required),
    course_id: Yup.string().required(Messages.required),
  });

  const { control, handleSubmit, watch } = useForm<IUserSignUp>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      birth_date: "",
      gender: "",
      phone: "",
      period: "",
      specialties: "",
      company_id: "",
      course_id: "",
    },
    resolver: yupResolver(validations) as never,
  });
  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const onSubmit = (data: IUserSignUp) => {
    console.log(data);
  };

  return (
    <Container styles={{ padding: theme.shape.padding }}>
      <GoBack />

      {step === 1 ? (
        <ScrollView>
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
            name="confirm_password"
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
            name="birthday"
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
            name="phone_number"
            label="Celular"
            mask={RegexOf.phone}
            control={control}
            keyboardType="numeric"
            placeholder="(00) 99999-9999"
          />
        </ScrollView>
      ) : step === 2 ? (
        <></>
      ) : step === 3 ? (
        <></>
      ) : (
        <></>
      )}
    </Container>
  );
}
