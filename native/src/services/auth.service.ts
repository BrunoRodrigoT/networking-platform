import { IUserSignUp, IUser, IUserSignIn } from "@models/Auth";
import Instance from "src/config/api";
const DEFAULT_PATH = "/auth";

export default function UseAuth() {
  const userSignIn = async (data: IUserSignIn): Promise<IUser> => {
    return Instance.post(DEFAULT_PATH + "/login").then((res) => res.data);
  };

  const userSignUp = async (data: IUserSignUp): Promise<IUser> => {
    return Instance.post(DEFAULT_PATH + "/register").then((res) => res.data);
  };

  return { userSignIn, userSignUp };
}