import React from "react";
import { Alert, Container, GoBack } from "@components";

import { AuthReducerEnum, IUserSignUp } from "@models/Auth";

import { AuthContext, useTheme } from "@contexts";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import cleanObject from "@utils/cleanObject";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = NativeStackScreenProps<IRootStackParamList, "SIGN_UP">;

export default function SignUp({ navigation }: Props) {
  const theme = useTheme();
  const { SignUp, state, dispatch } = React.useContext(AuthContext);
  const [step, setStep] = React.useState<number>(1);

  const [initialValues, setInitialValues] = React.useState<IUserSignUp>({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    birth_date: "",
    gender: "",
    phone: "",
    company_id: "",
    course_id: "",
    period: "",
    specialties: "",
    accept_promotions: false,
    accept_term: false,
  });

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((step) => step - 1);
    } else {
      navigation.goBack();
    }
  };

  const onSubmit = (data: IUserSignUp) => {
    const dataCleaned = cleanObject(data);

    if (step === 1) {
      const date = dataCleaned.birth_date?.split("/");
      dataCleaned.birth_date = `${date[2]}-${date[1]}-${date[0]}`;
      setInitialValues({ ...dataCleaned });
      setStep((step) => step + 1);
    } else if (step === 2) {
      setInitialValues({ ...dataCleaned });
      setStep((step) => step + 1);
    } else {
      SignUp({
        ...initialValues,
        ...dataCleaned,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Alert
        open={state.error ? true : false}
        message={state.error}
        severity="error"
        onClose={() => {
          dispatch({ type: AuthReducerEnum.ERROR, payload: "" });
        }}
      />

      {step === 1 ? (
        <StepOne
          onGoBack={handlePreviousStep}
          onSubmit={(data) => onSubmit(data)}
          initialValues={initialValues}
        />
      ) : step === 2 ? (
        <StepTwo
          onSubmit={(data) => onSubmit(data)}
          initialValues={initialValues}
          onGoBack={handlePreviousStep}
        />
      ) : step === 3 ? (
        <StepThree
          onSubmit={(data) => onSubmit(data)}
          initialValues={initialValues}
          onGoBack={handlePreviousStep}
        />
      ) : (
        <></>
      )}
    </KeyboardAvoidingView>
  );
}
