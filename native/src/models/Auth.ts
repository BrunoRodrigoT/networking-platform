import { ICompany } from "./Company";
import { ICourse } from "./Course";

interface IUserSignIn {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  phone: string;
  period: string;
  specialties: string[];
  created_at: Date;
  updated_at: Date;
  company_id: string;
  course_id: string;
  company?: ICompany;
  course?: ICourse;
  accept_term: boolean;
  accept_promotions: boolean;
}

interface IUserSigned {
  user: Omit<IUser, "company" | "course" | "password">;
  token: string;
}

interface IUserSignUp
  extends Omit<
    IUser,
    "id" | "course" | "company" | "created_at" | "updated_at" | "specialties"
  > {
  password_confirm: string;
  specialties: string
}

interface IAuthReducerState {
  loading: boolean;
  data: IUserSigned;
  error: string;
}

interface IAuthReducerAction {
  type: AuthReducerEnum;
  payload?: boolean | IUserSigned | string;
}

export enum AuthReducerEnum {
  LOADING,
  SUCCESS,
  ERROR,
}



export {
  IUser,
  IUserSignUp,
  IUserSignIn,
  IUserSigned,
  IAuthReducerState,
  IAuthReducerAction,
};
