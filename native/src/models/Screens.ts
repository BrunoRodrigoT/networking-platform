import { ParamListBase } from "@react-navigation/native";

export interface IRootStackParamList extends ParamListBase {
  MENU: undefined;
  PROFILE: { id: string };
  PUBLICATION_FORM: undefined;
  FAVORITES: undefined;
  MY_PUBLICATIONS: undefined;
  SEARCH: undefined;
  //Sign
  SIGN_IN: undefined;
  SIGN_UP: undefined;
}
