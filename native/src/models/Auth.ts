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
  birth_date: Date;
  gender: string;
  phone: string;
  period: string;
  specialties: string;
  created_at: Date;
  updated_at: Date;
  company_id: string;
  course_id: string;
  company?: ICompany;
  course?: ICourse;
}

interface IUserSignUp extends IUser, Omit<IUser, "id" | "course" | "company"> {
  password_confirm: string;
}

export { IUser, IUserSignUp, IUserSignIn };
