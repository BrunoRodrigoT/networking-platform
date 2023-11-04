import { Button, Container, FormTextField, GoBack, Radio } from "@components";
import { RegexOf, Yup } from "@config";
import { useTheme } from "@contexts";
import { ICheckOvertimeForm } from "@models/CheckOvertime";
import { IRootStackParamList } from "@models/Screens";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { cleanUpMask, formatWithMask } from "@utils/mask";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useBusinessDays } from "@services";

type Props = NativeStackScreenProps<IRootStackParamList, "CHECK_OVERTIME">;

const validations = Yup.object().shape({
  hours: Yup.string().required("Campo Obrigatório"),
  money: Yup.string().required("Campo Obrigatório"),
  workload: Yup.boolean().required("Campo Obrigatório"),
});

export default function CheckOvertime({ navigation }: Props) {
  const [overtimeTotal, setOvertimeTotal] = React.useState<number>();
  const [overtimePartial, setOvertimePartial] = React.useState<number>();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const businessDays = useBusinessDays(currentYear, currentMonth).length;

  const defaultValues: ICheckOvertimeForm = {
    hours: "",
    money: "",
    workload: true,
  };
  const { control, handleSubmit, reset } = useForm<ICheckOvertimeForm>({
    defaultValues: defaultValues,
    resolver: yupResolver<ICheckOvertimeForm>(validations),
  });

  const onSubmit = handleSubmit((values) => {
    const data = { ...values };
    data.money = +cleanUpMask(data.money as string, /[R$\s.]/g).replace(
      ",",
      "."
    );

    data.hours = +cleanUpMask(data.hours as string, /[R$\s.]/g).replace(
      ",",
      "."
    );

    const monthHours: number = data.workload
      ? businessDays * 8
      : businessDays * 6;

    const hourAmount = data.money / monthHours;

    const totalAmount = hourAmount * data.hours;
    const partialAmout = totalAmount - data.money;

    setOvertimeTotal(+totalAmount.toFixed(2));
    setOvertimePartial(+partialAmout.toFixed(2));
    reset(defaultValues);
  });

  const theme = useTheme();

  return (
    <Container styles={{ padding: theme.shape.padding, gap: 10 }}>
      <GoBack title="Calcular horas" />

      <FormTextField
        control={control}
        name="money"
        label="Salário"
        mask={RegexOf.price}
        keyboardType="number-pad"
      />
      <FormTextField
        control={control}
        name="hours"
        label="Horas batidas"
        mask={RegexOf.hours}
        keyboardType="number-pad"
      />

      <Text
        style={{
          color: theme.colors.text?.dark,
          fontSize: theme.typography.size?.body,
          fontFamily: theme.typography.fonts?.primary.normal,
        }}
      >
        Tipo de horário:
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Radio
          control={control}
          label="Estágio"
          name="workload"
          value={false}
        />

        <Radio control={control} label="Padrão" name="workload" value={true} />
      </View>

      <View style={{ alignSelf: "flex-end" }}>
        {overtimeTotal && (
          <Text
            style={{
              fontSize: theme.typography.size.regular,
              fontFamily: theme.typography.fonts.primary.light,

              color: theme.colors.primary.dark,
            }}
          >
            <>
              Valor total:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {
                  formatWithMask({
                    text: overtimeTotal.toString(),
                    mask: RegexOf.price,
                  }).masked
                }
              </Text>
            </>
          </Text>
        )}
        {overtimePartial && (
          <Text
            style={{
              fontSize: theme.typography.size.regular,
              fontFamily: theme.typography.fonts.primary.light,
              color: theme.colors.primary.dark,
            }}
          >
            <>
              Hora extra:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {
                  formatWithMask({
                    text: overtimePartial.toString(),
                    mask: RegexOf.price,
                  }).masked
                }
              </Text>
            </>
          </Text>
        )}
      </View>
      <Button variant="primary" onPress={onSubmit}>
        Checar
      </Button>
    </Container>
  );
}
