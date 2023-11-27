import React from "react";
import { Alert, Button, Container, FormTextField } from "@components";
import { useForm } from "react-hook-form";
import { IUserSignIn, AuthReducerEnum } from "@models/Auth";
import { Yup } from "@config";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "@assets/icons/svgs/icons/logo.svg";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext, useTheme } from "@contexts";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

import EyeOpen from "@assets/icons/svgs/icons/eye.svg";
import EyeClose from "@assets/icons/svgs/icons/eye_closed.svg";
import { useQuery } from "react-query";
import { useCompany } from "@services";

type Props = NativeStackScreenProps<IRootStackParamList, "SIGN_IN">;

export default ({ navigation }: Props) => {
  const theme = useTheme();
  const { findCompanies } = useCompany();
  const { SignIn, state, dispatch } = React.useContext(AuthContext);
  const [invisiblePass, setInvisiblePass] = React.useState<boolean>(true);

  const validations = Yup.object().shape({
    email: Yup.string().required("É requerido"),
    password: Yup.string().required("É requerido"),
  });
  const { control, handleSubmit } = useForm<IUserSignIn>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validations),
  });

  const onSubmit = handleSubmit((data: IUserSignIn) => {
    Keyboard.dismiss();
    SignIn(data);
  });

  return (
    <Container
      styles={{ padding: theme.shape.padding, justifyContent: "center" }}
    >
      <Alert
        open={state.error ? true : false}
        message={state.error}
        severity="error"
        onClose={() => {
          dispatch({ type: AuthReducerEnum.ERROR, payload: "" });
        }}
      />
      <View style={{ alignSelf: "center", marginBottom: 40 }}>
        <Logo />
      </View>

      <View style={{ gap: 5 }}>
        <FormTextField name="email" control={control} label="Email" required />
        <FormTextField
          required
          name="password"
          label={"Senha"}
          control={control}
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
            <TouchableOpacity onPress={() => setInvisiblePass(!invisiblePass)}>
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
      </View>

      <Button variant="primary" onPress={onSubmit} style={{ marginTop: 40 }}>
        Entrar
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("SIGN_UP")}>
        <Text
          style={{
            marginTop: 20,
            alignSelf: "center",
            fontSize: theme.typography.size.regular,
            color: theme.colors.primary.main,
          }}
        >
          Cadastre-se
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
