import React from "react";
import { Button, Container, FormTextField } from "@components";
import { useForm } from "react-hook-form";
import { IUserSignIn } from "@models/Auth";
import { Yup } from "@config";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "@assets/icons/svgs/icons/logo.svg";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@contexts";
import { Text, TouchableOpacity, View } from "react-native";

type Props = NativeStackScreenProps<IRootStackParamList, "SIGN_IN">;

export default ({ navigation }: Props) => {
  const theme = useTheme();

  const validations = Yup.object().shape({
    email: Yup.string().required("É requerido"),
    password: Yup.string().required("É requerido"),
  });
  const { control, handleSubmit } = useForm<IUserSignIn>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validations),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Container
      styles={{ padding: theme.shape.padding, justifyContent: "center" }}
    >
      <View style={{ alignSelf: "center", marginBottom: 40 }}>
        <Logo />
      </View>

      <View style={{ gap: 5 }}>
        <FormTextField name="email" control={control} label="Email" required />
        <FormTextField
          name="password"
          control={control}
          label="Senha"
          required
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
