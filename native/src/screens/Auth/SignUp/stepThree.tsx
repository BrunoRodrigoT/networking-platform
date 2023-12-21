import { Button, Checkbox, Container, GoBack } from "@components";
import { Yup } from "@config";
import { useTheme } from "@contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserSignUp } from "@models/Auth";
import { Messages } from "@utils/messages";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";

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
        <ScrollView contentContainerStyle={{ flex: 1, padding: 5 }}>
          <View>
            <Text
              style={{
                fontFamily: theme.typography.fonts.primary.normal,
                fontSize: theme.typography.size.body,
              }}
            >
              <Text>
                Termos de uso e políticas de privacidade:{"\n"}
                {"\n"}
              </Text>
              <Text>
                1.1 Ao se cadastrar no OportUni, você concorda em fornecer
                informações precisas, atualizadas e completas.{"\n"}
              </Text>

              <Text>
                1.2 Você é responsável por manter a confidencialidade de suas
                credenciais de login.{"\n"}
              </Text>

              <Text>
                1.3 Seu perfil profissional, incluindo competências,
                experiências e habilidades, será visível para outros usuários do
                OportUni.
                {"\n"}
              </Text>

              <Text>
                2.1 Você concorda em utilizar o OportUni de maneira ética e
                respeitosa.{"\n"}
              </Text>

              <Text>
                2.2 Não deve utilizar o Aplicativo para atividades ilegais,
                difamatórias, ofensivas ou prejudiciais.
              </Text>

              <Text>
                3.1 O OportUni permite a conexão com outros usuários para
                estabelecer relações profissionais.{"\n"}
              </Text>

              <Text>
                3.2 A funcionalidade de indicação de vagas deve ser utilizada de
                forma honesta e ética.{"\n"}
              </Text>

              <Text>
                4.1 A privacidade e segurança dos seus dados são prioridades. O
                OportUni implementa medidas rigorosas para proteger as
                informações dos usuários.{"\n"}
              </Text>

              <Text>
                4.2 O uso não autorizado da conta ou qualquer violação de
                segurança deve ser relatado imediatamente.{"\n"}
              </Text>

              <Text>
                5.1 Os usuários são responsáveis por suas interações no
                OportUni, incluindo conexões e indicações de vagas.{"\n"}
              </Text>

              <Text>
                5.2 A equipe de desenvolvimento e o OportUni não garantem
                OportUnidades de carreira, emprego ou networking.{"\n"}
              </Text>

              <Text>
                6.1 Todo o conteúdo presente no OportUni, incluindo textos,
                gráficos, logotipos, imagens, vídeos, é propriedade intelectual
                do OportUni ou de seus licenciantes.{"\n"}
              </Text>

              <Text>
                6.2 É proibida a reprodução, distribuição ou uso não autorizado
                de qualquer conteúdo do OportUni.{"\n"}
              </Text>

              <Text>
                7.1 Os Termos podem ser atualizados ocasionalmente. Notificações
                sobre alterações serão enviadas aos usuários.{"\n"}
              </Text>

              <Text>
                7.2 O uso contínuo do OportUni após alterações nos Termos
                constitui aceitação das modificações.{"\n"}
              </Text>

              <Text>
                8.1 O OportUni reserva-se o direito de encerrar contas que
                violem estes Termos ou prejudiquem a experiência de outros
                usuários.
                {"\n"}
              </Text>

              <Text>
                9.1 Estes Termos constituem o acordo integral entre o usuário e
                OportUni.{"\n"}
              </Text>

              <Text>
                9.2 Qualquer renúncia ou não aplicação de direitos nos Termos
                não constitui renúncia a outros direitos.{"\n"}
              </Text>

              <Text>
                9.3 Estes Termos são regidos pelas leis do [país] e quaisquer
                litígios serão resolvidos nos tribunais competentes.{"\n"}
              </Text>

              <Text>
                Ao utilizar o OportUni, você concorda integralmente com estes
                Termos de Uso. Se tiver dúvidas ou preocupações, entre em
                contato conosco. Obrigado por fazer parte da comunidade
                OportUni!{"\n"}
              </Text>
            </Text>
          </View>
        </ScrollView>

        <View style={{ gap: 10, flex: 0.3 }}>
          <Checkbox
            label="Li e aceito os termos de uso e política de privacidade"
            control={control}
            name="accept_term"
          />
          <Checkbox
            label="Concordo com o compartilhamento de meus dados pessoais pela OportUni para envio de OportUnidades de empregos, estágios e marketing declarados na aplicação"
            control={control}
            name="accept_promotions"
          />
        </View>
      </View>
      <Button variant="primary" onPress={handleSubmit(onSubmit)}>
        Cadastrar
      </Button>
    </Container>
  );
}
